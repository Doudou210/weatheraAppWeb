const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');
const router = require("./routes/routes");
const { Pool } = require("pg");
require('dotenv').config(); 

const port = process.env.PORT||5000;

const app =express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect()
.then(()=>{
  console.log("DB is connecting");
})
// .then(()=>{
//   pool.query("CREATE DATABASE users", (err,res)=>{
//     if (!err) {
//       console.log(res.rows);
//     } else {
//       console.log(err.message);
//     }
//   })
// })
// .then(()=>{
//   pool.query(`CREATE TABLE IF NOT EXISTS users 
//     (
//       id SERIAL PRIMARY KEY,
//       username VARCHAR(100) NOT NULL,
//       email VARCHAR(100) NOT NULL,
//       password VARCHAR(100) NOT NULL
//   )`)
// })
.catch(err=> console.log(err));
app.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [username, email, password];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
    console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(port, () => {
    console.log("Server is runing on port:", port);
});

app.use(router)