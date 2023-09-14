function changeFn(){
    var position  = document.getElementById("position");
    var value = (position.options[position.selectedIndex].value);
    console.log(value);
    const form = document.getElementById('select_position');
    const sinfoDip = document.getElementById('student_infoInp');
    const pinfoDip = document.getElementById('parent_infoInp');
    const tinfoDip = document.getElementById('teacher_infoInp');
    
    if(value == "teacher")
    {
        /* alert("교사용으로 넘어갑니다."); */
        tinfoDip.style.display = 'block';
        pinfoDip.style.display = 'none';
        sinfoDip.style.display = 'none';
        
    }
    else if(value == "student")
    {/* 
        alert("학생용으로 넘어갑니다."); */
        tinfoDip.style.display = 'none';
        pinfoDip.style.display = 'none';
        sinfoDip.style.display = 'block';
        
    }
    else if(value == "parent")
    {/* 
        alert("학부모용으로 넘어갑니다."); */
        tinfoDip.style.display = 'none';
        pinfoDip.style.display = 'block';
        sinfoDip.style.display = 'none';
        
    }
    else
    {
        console.log("역할을 골라주세요.");
        alert("역할을 골라주세요.");
        tinfoDip.style.display = 'none';
        pinfoDip.style.display = 'none';
        sinfoDip.style.display = 'none';
    }
    event.preventDefault();
}
function unvisibleInp()
{
    const display = document.getElementById("");
}