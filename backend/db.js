const { Client } = require("pg");

export const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'weatherapp',
    user: 'postgres',
    password: 'doudou',
  });
  
  client.connect()
  .then(()=>{
    console.log("DB is connecting");
  })
  .then(()=>{
    client.query("SELECT * FROM users", (err,res)=>{
      if (!err) {
        console.log(res.rows);
      } else {
        console.log(err.message);
      }
    })
  })
  .catch(err=> console.log(err));
// module.exports = client;
