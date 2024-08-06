import {base_connect} from "./util/database.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const http=require('http');
const querystring=require('querystring');
const server = http.createServer((req,res)=>{
    let postValue='';
    req.on('data',chunk => {
        postValue+=chunk;
    })
    req.on('end',()=>{
        let formVal=querystring.parse(postValue);
        let name=formVal.username;
        let pw=formVal.pw;
        let connection=base_connect('user_data');
        connection.connect();
        const sql=`SELECT user.password FROM user WHERE username='${name}'`;
        connection.query(sql,(error,result,fields)=>{
            if (error) {
                res.writeHead(200,{'Content-Type':"text/html;charset=utf8"});
                res.write('登录失败！');
                throw error;
            }
            let password='';
            if(result.length!=0){
                password=result[0].password;
            }
            if (password===pw){
                res.writeHead(200,{'Content-Type':"text/html;charset=utf8"});
                res.write('登陆成功！');
            }else{
                res.writeHead(200,{'Content-Type':"text/html;charset=utf8"});
                res.write('登录失败！');
            }
            res.end();
        })
        connection.end();
    })
});

// 监听端口
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// 如果你的应用还包含其他配置或中间件，也可以在这里引入和设置
// 例如，设置模板引擎、配置数据库连接等