const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : 'My19971108!', 
    database : 'g-exam'
});

const connectionDB = () => {
    connection.connect((error) => {
        if(error)
        {
            console.error('데이터베이스에 연결하는데 오류가 발생했습니다.', error);
        }
        else
        {
            console.log('데이터베이스에 연결 되었습니다.');
        }
    });
};

const executeQuery = (query, callback) => {
    connection.query(query, (error, results, fields) => {
        if(error)
        {
            console.error('쿼리문을 실행하는데 문제가 발생하였습니다.', error);
            callback(error, null);
        }
        else
        {
            callback(null, results);
        }
    });
};

const disconnectDB = () => {
    connection.end((error) => {
        if(error)
        {
            console.error('DB와 연결을 해제하는데 문제가 발생하였습니다.', error);
        }
        else
        {
            console.log('데이터베이스와 연결을 해제하는데 성공하였습니다.');
        }
    });
};

module.exports = {
    connectionDB, 
    executeQuery, 
    disconnectDB
};

/* connection.connect();

connection.query('select id, pw from user_student', function (error, results, fields){
    if (error) 
    {
        console.log(error);
    }

    console.log(results);
});

connection.end();

module.exports = mysql_connect; */