var express = require('express');
const mysql = require("mysql");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database:'user_data',
    port:3306
  })
  const sql=`SELECT * FROM circle_list`;
  connection.connect();
  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  })
  connection.end();
});

module.exports = router;
