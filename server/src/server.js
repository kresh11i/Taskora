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
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigin = process.env.FRONTEND_URL;

    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
  
const port = parseInt(process.env.PORT || 3000);

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



