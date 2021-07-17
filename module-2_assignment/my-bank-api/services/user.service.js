import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

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

  return { username: user.username, ...users[user.username] };
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

  const privatekey = fs.readFileSync(
    "./module-2_assignment/my-bank-api/security/private.key",
    "utf-8"
  );

  return jwt.sign(
    {
      role: databaseUser.role,
    },
    privatekey,
    {
      expiresIn: 300,
      algorithm: "RS256",
    }
  );
}

export default {
  getUser,
  createUser,
  login,
};
