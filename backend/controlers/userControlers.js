const bcrypt = require("bcrypt");
const User = require("../models/users");
const { Pool } = require("pg");

const createUser = async(req,res)=>{
    const { username, email, password} =req.body;
    try {
        const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [username, email, password];
    const result = await Pool.query(query, values);
    res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
}

const loginUser = async (req,res) => {
    const { username, email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({error:"User not found, create a counte"})
    }
    const passVerif= await bcrypt.compare(password, user.password)
    if (passVerif) {
        res.status(200).json({messages:"Connexion réussie!"})
    } else {
        res.status(405).json({error:"Email or password is invalide, again"});
    }
}
module.exports = {
    createUser,
    loginUser
}