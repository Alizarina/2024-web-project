import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const database=require('mysql');
export function base_connect(databasename){
    const connection=database.createConnection({
        host:'localhost',
        user:'root',
        password:'1234',
        database:`${databasename}`,
        port:3306
    })
    return connection;
}
// connection=base_connect('user_data');
// connection.connect()
// var name='Alizarina';
// const sql=`SELECT user.password FROM user WHERE username='${name}'`;
// connection.query(sql,(error,result)=>{
//     if (error) throw error;
//     console.log(result[0].password);
// })
// connection.end();