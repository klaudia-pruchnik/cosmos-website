import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
// import commentRoutes from "./routes/comments.js";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// db connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
app.locals.pool = pool; // connection in multiple files

// routes
app.use(authRoutes);
app.use(articleRoutes);
// app.use("/comments", commentRoutes);

// error handling
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Coś poszło nie tak.";
  res.status(status).json({ message });
});

// server start
app.listen(PORT, () => {
  console.log(`Backend działa na http://localhost:${PORT}`);
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("JWT_KEY:", process.env.JWT_KEY);
});
