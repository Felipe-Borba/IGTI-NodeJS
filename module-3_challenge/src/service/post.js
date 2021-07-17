import PostRepository from "../repository/post.js";

async function createPost(post) {
  return await PostRepository.createPost(post);
}

async function getPostList() {
  return await PostRepository.getPostList();
}

async function createComment(comment) {
  return await PostRepository.createComment(comment);
}

export default {
  createPost,
  getPostList,
  createComment,
};
