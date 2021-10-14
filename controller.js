import requestToApi from './requestToApi/authentication.js';
import graphqlApi from './requestToApi/graphQlApiRequest.js';
import sendAMessage from './requestToApi/message.js';

const startConversation = async (req, res) => {
  try {
    const response = await requestToApi.getAccessToken();
    res.send(response);
    res.status(200);
  } catch (error) {
    console.log('Error: 1 ', error);
    res.status(500);
  }
};

const sendMessage = async (req, res) => {
  try {
    const message = req.body;
    const yodaMessage = await sendAMessage(message);
    res.send(yodaMessage);
    res.status(200);
  } catch (error) {
    res.status(500);
    console.log('Error: 2 ', error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const response = await requestToApi.refreshToken();
    res.send(response);
    res.status(201);
  } catch (error) {
    console.log('Error: 3 ', error);
    res.status(500);
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await graphqlApi.allMovies;
    res.send(movies);
  } catch (error) {
    res.status(500);
    console.log('Error: 4 ', error);
  }
};

const getCharacters = async (req, res) => {
  try {
    const characters = await graphqlApi.allCharacters;
    res.send(characters);
  } catch (error) {
    res.status(500);
    console.log('Error: 5 ', error);
  }
};

export default {
  startConversation,
  sendMessage,
  refreshToken,
  getMovies,
  getCharacters
};
