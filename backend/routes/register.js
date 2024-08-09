const mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.post('/checkname', function(req, res) {
    let userbody=req.body;
    let name = userbody.username;
    let IfAllow=-1;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    const sql1 = `SELECT user.password FROM user WHERE username='${name}'`;
    //const sql2 = `INSERT INTO user (id,username,password,nickname) VALUES (0, '${name}', '${pw}', '${nickname}');`
    connection.query(sql1, (error, result) => {
        IfAllow=0;
        if (error) {
            throw error;
        }
        if(IfAllow===0){
            if (result.length > 0) {
                res.send({message:'用户名已存在'})
            }else{
                res.send({message:'用户名可用'})
            }
        }
    })
    connection.end();
});
router.post('/', function(req, res) {
    let userbody=req.body;
    let name = userbody.username;
    let pw = userbody.pw;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    const sql2 = `INSERT INTO user (id,username,password) VALUES (0,'${name}', '${pw}');`
    connection.query(sql2, (error, result) => {
        if (error) {
            throw error;
        }
        res.send({message:'注册成功'})
    })
    connection.end();
});
module.exports = router;