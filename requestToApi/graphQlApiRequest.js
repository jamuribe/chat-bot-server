import axios from 'axios';
import 'dotenv/config.js';

const allCharacters = [];
const allMovies = [];
const api = process.env.GRAPHQL_API;

const getCharacters = async () => {
  try {
    axios.get(api, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        query: '{allPeople{people{name}}}', variables: {}
      }
    }).then(res => {
      for (const key in res.data) {
        allCharacters.push(res.data[key].allPeople.people);
      }
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getFilms = async () => {
  try {
    await axios.get(api, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        query: '{allFilms{films{title}}}', variables: {}
      }
    }).then(res => {
      for (const key in res.data) {
        allMovies.push(res.data[key].allFilms.films);
      }
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

getCharacters();
getFilms();

export default { allMovies, allCharacters };
