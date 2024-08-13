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
router.post('/details', function(req, res, next) {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database:'user_data',
    port:3306
  })
  let name=req.body.name;
  const sql=`SELECT circle_list.description FROM circle_list WHERE name='${name}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result[0].description);
  })
});
router.post('/blogs', function(req, res, next) {
  let name=req.body.name;
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database:'user_data',
    port:3306
  })
  const sql=`SELECT * FROM ${name}`;
  connection.connect();
  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  })
  connection.end();
});
router.post('/huoyue', function(req, res){
  let name=req.body.name;
  let base=name+'_user'
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database:'user_data',
    port:3306
  })
  const sql=`SELECT * FROM ${base}`;
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
