const mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.post('/checkname', function(req, res) {
    let userbody=req.body;
    let name = userbody.name;
    let IfAllow=-1;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    const sql1 = `SELECT * FROM circle_list WHERE name='${name}'`;
    //const sql2 = `INSERT INTO user (id,username,password,nickname) VALUES (0, '${name}', '${pw}', '${nickname}');`
    connection.query(sql1, (error, result) => {
        IfAllow=0;
        if (error) {
            throw error;
        }
        if(IfAllow===0){
            if (result.length > 0) {
                res.send({message:'兴趣圈已存在',id:0})
            }else{
                res.send({message:'名称可用',id:1})
            }
        }
    })
    connection.end();
});
router.post('/', function(req, res) {
    let userbody=req.body;
    let name = userbody.name;
    let d = userbody.d;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    let nameA=name+'_user';
    let check=0;
    const sql3=`CREATE TABLE ${name} LIKE xxx_demo`;
    const sql4=`CREATE TABLE ${nameA} LIKE xxxuser_demo`;
    connection.query(sql3,(error, result) => {
        if(error){throw error;}
    })
    connection.query(sql4,(error, result) => {
        if(error){throw error;}
    })
    const sql2 = `INSERT INTO circle_list (circle_id,name,description) VALUES (0,'${name}', '${d}');`
    connection.query(sql2, (error, result) => {
        if (error) {
            throw error;
        }
        res.send({message:'创建成功'})
    })
    connection.end();
});
module.exports = router;