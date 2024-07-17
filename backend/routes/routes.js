const express = require("express");
const { createUser, loginUser } = require("../controlers/userControlers");
const router = express.Router();

router.get("/", (req,res) =>{
    res.status(200).send('Hello world')
});

//User
router.post("/create", createUser)
router.post("/login", loginUser)

//Product

module.exports = router;