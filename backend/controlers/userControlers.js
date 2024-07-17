const bcrypt = require("bcrypt");
const User = require("../models/users");

const createUser = async(req,res)=>{
    try {
        const { username, email, password} =req.body;
        const existUserEm = await User.findOne({ username })
        if (existUserEm) {
            return res.status(400).json({error: "email is already existing"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
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