import UserService from "../services/user.service.js";

async function getUsers(req, res, next) {
  try {
    res.send(await UserService.getUser());
    logger.info("GET /getUsers");
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    let user = req.body;

    if (!user.username || user.password == null || user.role == null) {
      throw new Error("Username, Password and role are mandatory");
    }

    user = await UserService.createUser(user);

    res.status(201).json({ message: `User ${user.username} created.` });

    logger.info(`POST /createUser - ${JSON.stringify(user)}`);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    let user = req.body;

    if (!user.username || user.password == null) {
      throw new Error("Username and Password are mandatory");
    }

    res.send(await UserService.login(user));

    logger.info(`POST /login - ${JSON.stringify(user)}`);
  } catch (error) {
    next(error);
  }
}

export default {
  getUsers,
  createUser,
  login,
};
