import PostService from "../service/post.js";

async function createPost(req, res, next) {
  try {
    let post = req.body;

    if (!post.titulo || !post.descricao) {
      throw new Error("titulo and descricao are missing");
    }

    post = await PostService.createPost(post);
    res.send(post);

    logger.info(`POST /post - ${JSON.stringify(post)}`);
  } catch (error) {
    next(error);
  }
}

async function getPostList(req, res, next) {
  try {
    res.send(await PostService.getPostList());

    logger.info(`GET /post`);
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const comment = req.body;

    if (!comment.id || !comment.nome || !comment.conteudo) {
      throw new Error("id, nome, conteudo are missing");
    }

    res.send(await PostService.createComment(comment));

    logger.info(`POST /post - ${JSON.stringify(comment)}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createPost,
  getPostList,
  createComment,
};
