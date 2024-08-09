const mysql = require('mysql');
const express = require('express');
const router = express.Router();

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
    const sql = `SELECT user.password FROM user WHERE username='${name}'`;
    connection.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        let password = '';
        let nick='';
        let id=0;
        if (result.length>0) {
            password = result[0].password;
            nick=result.nickname;
            id=result.id;
            if (password === pw) {
                res.send({
                    nickname:nick,
                    username: name,
                    id:id,
                    check:1,
                    message:'登陆成功'
                })
            } else {
                res.send({
                    check:0,
                    message:'登陆失败，密码错误'
                })
            }
        }
    })
    connection.end();
});

module.exports = router;