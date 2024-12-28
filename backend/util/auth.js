import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NotAuthError } from "./errors.js";
import dotenv from "dotenv";

import { get as getUserByUsername } from "../data/user.js";

dotenv.config();

const { compare } = bcrypt;
const { sign, verify } = jwt;

const KEY = process.env.JWT_KEY;

// JWT token creation
function createJSONToken(username) {
  return sign({ username }, KEY, { expiresIn: "1h" });
}

// token validation
function validateJSONToken(token) {
  return verify(token, KEY);
}

// Password validation
function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

// Middleware for checking authorization
function checkAuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  // checking if auth header exists
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated.")); // error if no auth header
  }

  const authFragments = req.headers.authorization.split(" "); // splitting header

  // checking if auth header is valid
  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated.")); // error if header is invalid
  }

  const authToken = authFragments[1];

  // checking if token is valid
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken; // adding token to request
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated.")); // error if token is invalid
  }

  next(); // next middleware
}

// Middleware for checking if user is admin
async function checkAdminMiddleware(req, res, next) {
  if (!req.token) {
    return next(new NotAuthError("Not authenticated."));
  }

  const username = req.token.username;
  try {
    const user = await getUserByUsername(username, req.app.locals.pool);
    if (!user || !user.is_admin) {
      return next(new NotAuthError("Not authorized."));
    }
    next();
  } catch (error) {
    next(error);
  }
}

export {
  createJSONToken,
  validateJSONToken,
  isValidPassword,
  checkAuthMiddleware,
  checkAdminMiddleware,
};
