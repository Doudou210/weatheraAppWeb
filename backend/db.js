const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect()
.then(() => console.log("DB is connected"))
.catch(err => console.error('Connection error', err.stack));

module.exports = pool;
