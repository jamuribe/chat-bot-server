import fetch from 'node-fetch';
import StoredToken from '../db/messageSchema.js';
import 'dotenv/config.js';
const apiKey = process.env.API_KEY;

const sendMessage = async (message) => {
  const store = await StoredToken.findOne({ apiKey: apiKey });
  const yodaResponse = {};
  await fetch(`${store.api}/v1/conversation/message`, {
    method: 'POST',
    headers: {
      'x-inbenta-key': `${apiKey}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.token}`,
      'x-inbenta-session': `Bearer ${store.sessionToken}`
    },
    body: JSON.stringify(message)
  })
    .then(response => {
      if (response.status !== 200) throw new Error('Not able to send message');
      return response.json();
    })
    .then(result => {
      yodaResponse.message = result.answers[0].message;
    })
    .catch(error => {
      console.error('Error: 9 ', error);
    });
  return yodaResponse;
};

export default sendMessage;
