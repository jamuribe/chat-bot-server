import express, { json } from 'express';
import router from './router.js';
import cors from 'cors';
import 'dotenv/config.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});
