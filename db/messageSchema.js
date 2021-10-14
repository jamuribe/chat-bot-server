import mongoose from "./dataBase.js";
import "dotenv/config.js";
const apiKey = process.env.API_KEY;


const sessionSchema = new mongoose.Schema({
  apiKey: String,
  sessionToken: String,
  token: String,
  api: String
}, // eslint-disable-next-line comma-dangle
  {
    timestamps: true
  });

const StoredToken = mongoose.model('StoredToken', sessionSchema);

const storedinDB = await new StoredToken({
  apiKey: apiKey,
});

export default StoredToken;