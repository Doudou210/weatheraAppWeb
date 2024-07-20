const express = require ("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const router = require("./routes/routes");

const port = process.env.PORT || 5000;

const app =express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server is runing on port:", port);
});

app.use(router)