const http = require('http'); //we wont use http we use express to create server
const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const routes = require('./controller');
const app = express();

app.use('/', routes);

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