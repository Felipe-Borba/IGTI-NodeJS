import mongoose from "mongoose";
import env from "dotenv";

env.config();

async function connect() {
  const uri = process.env.MONGO_URI;
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connect };
