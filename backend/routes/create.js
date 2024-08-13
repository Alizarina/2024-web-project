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
router.post('/huoyue', function(req, res){
    let userbody=req.body;
    let username=userbody.username;
    let circle=userbody.circle;
    let user_table=circle+'_user';
    const sql=`SELECT * FROM ${user_table} WHERE username='${username}'`;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    connection.query(sql, (error, result) => {
        IfAllow=0;
        if (error) {
            throw error;
        }
        if(IfAllow===0){
            if (result.length > 0) {
                res.send({id:1})//存在
            }else{
                res.send({id:0})//不存在
            }
        }
    })
    connection.end();
});
router.post('/jiaruhuoyue', function(req, res){
    let userbody=req.body;
    let username=userbody.username;
    let circle=userbody.circle;
    let user_table=circle+'_user';
    const sql=`INSERT INTO ${user_table} (username,huoyuedu) VALUES ('${username}', 3);`;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error){
            throw error;
        }
        res.send({finish:1});
    })
    connection.end();
});
router.post('/blog', function(req, res){
    let userbody=req.body;
    let username=userbody.username;
    let circle=userbody.circle;
    let title=userbody.title;
    let about=userbody.about;
    let pic=userbody.pic;
    const sql=`INSERT INTO ${circle} (blog_id,author_name,content,pic1,pic2) VALUES (0,'${username}','${about}','${title}','${pic}');`;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error){
            throw error;
        }
        res.send({finish:1});
    })
    connection.end();
});
router.post('/jingyanzhi', function(req, res){
    let userbody=req.body;
    let username=userbody.username;
    let circle=userbody.circle;
    let user_table=circle+'_user';
    const sql=`UPDATE ${user_table} SET huoyuedu = huoyuedu + 3 WHERE username = '${username}';`;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error){
            throw error;
        }
        res.send({finish:1});
    })
    connection.end();
});
router.post('/jingyanzhimini', function(req, res){
    let userbody=req.body;
    let username=userbody.username;
    let circle=userbody.circle;
    let user_table=circle+'_user';
    const sql=`UPDATE ${user_table} SET huoyuedu = huoyuedu + 1 WHERE username = '${username}';`;
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error){
            throw error;
        }
        res.send({finish:1});
    })
    connection.end();
});
router.post('/checkpinglun', function(req, res){
    let userbody=req.body;
    let number=userbody.number;
    let circle=userbody.circle;
    let connection= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    const sql=`SELECT * FROM ${circle} WHERE blog_id=${number}`;
    connection.connect();
    connection.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        res.send(result);
    });
    connection.end();
});
router.post('/pinglun', function(req, res){
    let userbody=req.body;
    let number=userbody.number;
    let circle=userbody.circle;
    let count=userbody.count;
    let username=userbody.username;
    let about=userbody.about;
    let str=username+': '+about;
    let connection= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database:'user_data',
        port:3306
    })
    const sql1=`UPDATE ${circle} SET com1 = '${str}' WHERE blog_id=${number} `;
    const sql2=`UPDATE ${circle} SET com2 = '${str}' WHERE blog_id=${number} `;
    const sql3=`UPDATE ${circle} SET com3 = '${str}' WHERE blog_id=${number} `;
    connection.connect();
    if(count===0){
        connection.query(sql1, (error, result) => {
            if (error) {
                throw error;
            }
            res.send(result);
        });
    }else if(count===1){
        connection.query(sql2, (error, result) => {
            if (error) {
                throw error;
            }
            res.send(result);
        });
    }else if(count===2){
        connection.query(sql3, (error, result) => {
            if (error) {
                throw error;
            }
            res.send(result);
        });
    }
    connection.end();
});
module.exports = router;