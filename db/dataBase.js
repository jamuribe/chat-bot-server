import mongoose from 'mongoose';
import "dotenv/config.js";

const uri = process.env.MONGODB_URI;
await mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));
export default mongoose;