import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

var users = {
  //mocked database
  admin: {
    encryptedPwd:
      "$2b$04$6QMi5QUg22eylDA4Q1taKOc70ZIuFMy8U9bOxhztploi8hdzIIWT.",
    role: "admin",
  },
};

function getUser() {
  return users; //warning: do not return encrypted password
}

async function createUser(user) {
  const encryptedPwd = await bcrypt.hash(user.password, 1);

  users[user.username] = {
    encryptedPwd: encryptedPwd,
    role: user.role,
  };

  return users;
}

function login(user) {
  const databaseUser = users[user.username];

  if (!databaseUser) {
    throw new Error("User not found");
  }

  const pwdMatches = bcrypt.compareSync(
    user.password,
    databaseUser.encryptedPwd
  );

  if (!pwdMatches) {
    throw new Error("password incorrect");
  }

  return jwt.sign(
    {
      role: databaseUser.role,
    },
    "secretKey",
    {
      expiresIn: 300,
    }
  );
}

export default {
  getUser,
  createUser,
  login,
};
