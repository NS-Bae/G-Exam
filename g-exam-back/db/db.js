var mysql = require('mysql2');
var db = mysql.createConnection({
    host : 'ls-ca55893ba6d2224690c5161971f88beb5c1f3af7.ctwkii6wuxm1.ap-northeast-2.rds.amazonaws.com', 
    port: 3306,
    user : 'dbmasteruser', 
    password : 'RooTUsEr!1020', 
    database : 'new_g-exam', 
});
db.connect(); 

module.exports = db;