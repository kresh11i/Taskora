import express from 'express';
import cors from "cors";
import pool from './config/db.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { jwtCookie } from './middleware/authMiddleware.js';
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();
const app = express();
let corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}
  
const port = parseInt(process.env.PORT || 3000);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("server running success")
});

app.use("/api/auth/", authRoutes);
app.use("/api/task/", jwtCookie, taskRoutes);
pool.connect() 
  .then(client => {
    console.log("Database pool connected successfully!");
    client.release(); // Release the client back to the pool
    // Start Express server here
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection error, server not started:", err.stack);
    process.exit(1); 
  });



