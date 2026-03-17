const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Frontend"));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jay123",
  database: "jaykr"
});

// connect to database
db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

// contact form API
app.post("/contact", (req, res) => {

  console.log("Request body:", req.body);

  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {

    if (err) {
      console.log("Insert error:", err);
      res.status(500).send("Database Error");
    } else {
      console.log("Message inserted successfully");
      res.send("Message Saved");
    }

  });

});
app.get("/messages",(req,res)=>{

const sql = "SELECT * FROM contacts ORDER BY id DESC"

db.query(sql,(err,result)=>{

if(err){
res.json({error:"Database error"})
}

else{
res.json(result)
}

})

})
app.delete("/delete/:id",(req,res)=>{

const id = req.params.id

const sql = "DELETE FROM contacts WHERE id=?"

db.query(sql,[id],(err,result)=>{

if(err){
res.send("Error deleting")
}

else{
res.send("Message deleted")
}

})

})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running")
})

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});