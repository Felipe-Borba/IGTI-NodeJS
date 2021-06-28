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

async function updateProductInfo(info) {
  const client = getClient();
  try {
    await client.connect();
    await client
      .db("store")
      .collection("productInfo")
      .updateOne({ productId: info.productId }, { $set: { ...info } });
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

async function getProductInfo(productId) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("store")
      .collection("productInfo")
      .findOne({ productId });
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

export default { createProductInfo, updateProductInfo, getProductInfo };
