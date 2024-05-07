const express = require('express');
require('dotenv').config();
const dayjs = require('dayjs');
const fs = require('fs');
const router = express.Router();
const app = express();
const logFilePath = process.env.LOG_FILE_PATH;
const connection = require('../database');


router.get("/", (req, res) => {
    const logMsg = `${dayjs().format("YYYY-MM-DD-HH:mm:ss")} New request\n`
    fs.appendFile(logFilePath, logMsg, (err, data) => {
        res.send("Hello from autohub")
    })
})

router.get("/makes", (req, res) => {
    connection.query("SELECT code, make FROM makes;", (error, result) => {
        if (error) {
            const logMsg = `${dayjs().format("YYYY-MM-DD-HH:mm:ss")} Error while qualifying mysql: get makes\n`
            fs.appendFile(logFilePath, logMsg, (err, data) => {
                res.status(500).send("Error while qulifying mysql");
                return
            })
        }
        res.json(result)
    });
})

module.exports = router;