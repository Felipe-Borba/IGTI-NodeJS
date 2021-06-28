import { getClient } from "./mongo.db.js";

async function createProductInfo(info) {
  const client = getClient();
  try {
    await client.connect();
    await client.db("store").collection("productInfo").insertOne(info);
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

export default { createProductInfo };
