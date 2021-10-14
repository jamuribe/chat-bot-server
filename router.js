import express from 'express';
import controller from './controller.js';

const router = express.Router();

router
  .get('/', function (req, res) {
    res.send('Server is working');
  })
  .get('/characters', controller.getCharacters)
  .get('/movies', controller.getMovies)
  .get('/start', controller.startConversation)
  .get('/refresh', controller.refreshToken)
  .post('/message', controller.sendMessage);

export default router;
