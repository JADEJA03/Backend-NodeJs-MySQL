const { json } = require('body-parser');
const mysql = require('mysql2')
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'your_actual_password',
    database:'family'
})

mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in database Connection:::'+JSON.stringify(err,undefined,2));
    }else{
        console.log('Database Connected Successfully');
    }
})

module.exports=mysqlConnection;