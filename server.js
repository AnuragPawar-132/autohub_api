const http = require('http'); //we wont use http we use express to create server
const fs = require('fs');
const dayjs = require('dayjs');
const mysql = require('mysql');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const logFilePath = process.env.LOG_FILE_PATH;


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    return console.log("Error while connecting to mysql");
  }
  console.log("Connected to mysql");
})

app.get("/", (req, res) => {
  const logMsg = `${dayjs().format("YYYY-MM-DD-HH:mm:ss")} New request\n`
  fs.appendFile(logFilePath, logMsg, (err, data) => {
    res.send("Hello from autohub")
  })
})

app.get("/makes", (req, res)=>{
  connection.query("SELECT code, make FROM makes;", (error, result)=>{
    if(error){
      const logMsg = `${dayjs().format("YYYY-MM-DD-HH:mm:ss")} Error while qualifying mysql: get makes\n`
      fs.appendFile(logFilePath, logMsg, (err, data) => {
        res.status(500).send("Error while qulifying mysql");
        return
      })
    }
    res.json(result)
  });
})

app.listen(port, () => {
  console.log("connected to 8000")
})


// const server = http.createServer((req, res) => {

//   const logMsg = `${dayjs().format("YYYY-MM-DD-HH:mm:ss")} New request\n`
//   fs.appendFile(logFilePath, logMsg, (err, data)=>{
//       res.end("Hello from node")
//   })
// });

// server.listen(port, () => {
//   console.log(`Server running at ${port}`);
// });