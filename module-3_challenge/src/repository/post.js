import PostSchema from "../schema/post.js";
import { connect } from "./assets/mongo.db.js";

async function createPost(post) {
  const mongoose = await connect();
  const Post = mongoose.model("posts", PostSchema);

  post = new Post(post);
  return await post.save();
}

async function getPostList() {
  const mongoose = await connect();
  const Post = mongoose.model("posts", PostSchema);

  const query = Post.find();
  return await query.exec();
}

async function getPostById(id) {
  const mongoose = await connect();
  const Post = mongoose.model("posts", PostSchema);

  const query = Post.findOne({ _id: id });
  return await query.exec();
}

async function updatePost(post) {
  const mongoose = await connect();
  const Post = mongoose.model("posts", PostSchema);

  return await Post.findOneAndUpdate({ _id: post._id }, post);
}

async function createComment(comment) {
  const post = await getPostById(comment.id);

  const content = {
    nome: comment.nome,
    conteudo: comment.conteudo,
  };
  post.comentarios.push(content);

  await updatePost(post);
  return "ok";
}

export default {
  createPost,
  getPostList,
  createComment,
};
