import axios from 'axios';
import fetch from 'node-fetch';
import StoredToken from '../db/messageSchema.js';
import "dotenv/config.js";

const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET;
const authApi = process.env.AUTH_API;

const storedinDB = await StoredToken.create({
  apiKey: apiKey,
});

const getAccessToken = async () => {
  const body = { 'secret': `${apiSecret}` };
  let reqStatus = {}
  try {
    await fetch(`${authApi}auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-inbenta-key': `${apiKey}`,
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.status !== 200) throw new Error('Not able to get token');
        return response.json()
      })
      .then(async (result) => {
        await StoredToken.findOneAndUpdate({ 'apiKey': apiKey }, {
          token: result.accessToken,
          api: result.apis['chatbot']
        });
        await storedinDB.save()
        reqStatus['message'] = 'Success';
        startConversation(storedinDB['token'], storedinDB['api'], apiKey)
      })
  } catch (error) {
    console.log('Error: 6 ', error)
    reqStatus['message'] = 'Failed';
  } finally {
    return reqStatus;
  }
}

const startConversation = async (token, api, apiKey) => {
  let message = {};
  let store = await StoredToken.findOne({ 'apiKey': apiKey })
  try {
    await axios.post(`${store['api']}/v1/conversation`, {}, {
      headers: {
        'x-inbenta-key': `${apiKey}`,
        'Authorization': `Bearer ${store['token']}`
      }
    })
      .then(async (result) => {
        if (result.status !== 200) throw new Error('Not able to start conversation');
        await StoredToken.findOneAndUpdate({ 'apiKey': apiKey }, { sessionToken: result.data['sessionToken'] })
        await storedinDB.save()
        message['text'] = 'Success in start conversation';
      })
  } catch (error) {
    message['text'] = 'Couldn\'t start conversation';
    console.log('Error: 8 ', error)
  }
  finally {
    return message;
  }
};

const refreshToken = async () => {
  let message = {};
  let store = await StoredToken.find({ apiKey })
  try {
    await fetch(`${authApi}refreshToken`, {
      method: 'POST',
      headers: {
        'x-inbenta-key': `${apiKey}`,
        'Authorization': `Bearer ${store[0]['token']}`
      }
    }).then(response => {
      if (response.status !== 200) {
        throw new Error('Not able to refresh token');
      }
      return response.json();
    })
      .then(async (result) => {
        await StoredToken.findOneAndUpdate({ apiKey }, { token: result.accessToken })
        await storedinDB.save()
        message['text'] = 'Success';
      })
  } catch (error) {
    console.log('Error: 7 ', error)
    message['text'] = "Failed";
  }
  finally {
    return message;
  }
};

export default {
  getAccessToken,
  refreshToken,
  startConversation,
};
