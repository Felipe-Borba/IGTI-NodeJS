import mongoose from "mongoose";
import commentSchema from "./comment.js";

const PostSchema = new mongoose.Schema(
  {
    titulo: String,
    conteudo: String,
    comentarios: [commentSchema],
  },
  { collection: "posts" }
);

export default PostSchema;
