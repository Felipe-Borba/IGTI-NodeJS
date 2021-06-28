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
      .findOne({ productId: parseInt(productId) });
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

async function createReview(review, productId) {
  try {
    const productInfo = await getProductInfo(productId);
    productInfo.reviews.push(review);

    await updateProductInfo(productInfo);
  } catch (error) {
    throw error;
  }
}

async function deleteReview(productId, index) {
  try {
    const productInfo = await getProductInfo(productId);
    productInfo.reviews.splice(index, 1);

    await updateProductInfo(productInfo);
  } catch (error) {
    throw error;
  }
}

export default {
  createProductInfo,
  updateProductInfo,
  getProductInfo,
  createReview,
  deleteReview,
};
