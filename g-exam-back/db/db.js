var mysql = require('mysql2');
var db = mysql.createConnection({
    host : 'ls-871065b9c9342f4acf6e413c7cc3ada6eea9665a.cpw4ceaicfs0.ap-northeast-2.rds.amazonaws.com', 
    port: 3306,
    user : 'dbmasteruser', 
    password : 'C&r5`q-FFv[uw4+oK5l4F7iaVgZs&H`|', 
    database : 'new_g-exam', 
});
db.connect(); 

module.exports = db;