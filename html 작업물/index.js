var cors = require('cors')

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());///cors 괄호 공란 = 모든 html허용. 특정 html 기술시 지정 허용 가능.

app.get('/', function (req, res)
{
    res.send('지플랜에 어서오세요')
})

app.get('/results/:student_id', function (req, res)///:가 붙으면 변수가 된다.
{
    const { student_id } = req.params;
    const q = req.query;
    console.log(q);
    console.log(student_id);
    if(student_id == 1)
    {
        res.send({'id' : '원장'});
    }
    else if(student_id == 2)
    {
        res.send({'id' : '학부모'});
    }
    else if(student_id == 3)
    {
        res.send({'id' : '학생'});
    }
    else
    {
        res.send({'id' : '당신은 외부인입니다.'})
    }
})

function call_id_info()
{
    
}

app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)///포트연결 확인 로그메세지
})

function move_main()
{
    
}
