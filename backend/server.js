const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');
const router = require("./routes/routes");

const port = 5000;

const app =express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://siaka18doumbia:ZSE7tY1qXOxm7skK@cluster0.vgclkq2.mongodb.net/')
.then(()=>console.log("DB is connecting"))
.catch( err => console.error(err));

app.listen(port, () => {
    console.log("Server is runing on port:", port);
});

app.use(router)