import mongodb from "mongodb";
import env from "dotenv";

env.config();

function getClient() {
  const uri = process.env.MONGO_URI;
  return new mongodb.MongoClient(uri);
}

export { getClient };
