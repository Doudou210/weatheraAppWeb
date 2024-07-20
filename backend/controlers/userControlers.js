const bcrypt = require("bcrypt");
const pool = require("../db");

const createUser = async(req,res)=>{
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)
    try {
      const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
      const values = [username, email, hashPassword];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
      console.log(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create user" });
    }
}

const loginUser = async (req,res) => {
    const { email, password} = req.body;
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const result = await pool.query(query, values);
    
        if (result.rows.length === 0) {
          return res.status(400).json({ error: "User not found, create an account" });
        }
    
        const user = result.rows[0];
        const passVerif = await bcrypt.compare(password, user.password);
    
        if (passVerif) {
          res.status(200).json({ message: "Connexion réussie!" });
        } else {
          res.status(405).json({ error: "Email or password is invalid, try again" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to login user" });
      }
}
module.exports = {
    createUser,
    loginUser
}