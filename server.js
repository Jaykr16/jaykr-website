
// server.js (use this exact code)
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Frontend"));

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "jay123",
  database: process.env.DB_NAME || "jaykr",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message || err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

app.post("/contact", (req, res) => {
  console.log("Request body:", req.body);
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).send("Database Error");
    }
    console.log("Message inserted, id:", result.insertId);
    res.send("Message Saved");
  });
});

app.get("/messages", (req, res) => {
  db.query("SELECT * FROM contacts ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM contacts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send("Error deleting");
    res.send("Message deleted");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});