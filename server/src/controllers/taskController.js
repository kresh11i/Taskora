import pool from "../config/db.js";

export async function createTask(req, res) {
  const { title, description } = req.body;
  const userID = req.userID;
  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Please enter the details" });
    }
    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, userID]
    );
    return res.status(201).json({
      message: "Task created successfully",
      task: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getTasks(req, res) {
  const userID = req.userID;
  try {
    const userData = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC",
      [userID]
    );
    return res.status(200).json({ tasks: userData.rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateTask(req, res) {
  const userID = req.userID;
  const taskID = req.params.id;
  const { title, description, status } = req.body;

  try {
    // At least one field must be provided
    if (title === undefined && description === undefined && status === undefined) {
      return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    // Fetch existing task to fill in any missing fields
    const existing = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskID, userID]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const current = existing.rows[0];

    // Use incoming value if provided, otherwise keep existing DB value
    const updatedTitle       = title       !== undefined ? title       : current.title;
    const updatedDescription = description !== undefined ? description : current.description;
    const updatedStatus      = status      !== undefined ? status      : current.status;

    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [updatedTitle, updatedDescription, updatedStatus, taskID, userID]
    );

    return res.status(200).json({
      message: "Task updated successfully",
      task: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteTask(req, res) {
  const userID = req.userID;
  const taskID = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [taskID, userID]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}