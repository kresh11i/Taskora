import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all the credentials" });
  }

  try {
    const userExists = await pool.query(
      "SELECT * FROM taskUsers WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "This user already exists, try logging in" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO taskUsers (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPass]
    );

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all the credentials" });
  }

  try {
    const user = await pool.query(
      "SELECT * FROM taskUsers WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist, please register" });
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userID: userData.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour in ms
    });

    return res.status(200).json({
      message: "Login successful",
      name: userData.name   // 👈 add this
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function logoutUser(req, res) {
  try {
    res.clearCookie("token", { httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}