function refresh_box()
{
    var questionSubDiv = document.querySelector(".question_sub");
    var inputElements = questionSubDiv.querySelectorAll("textarea");
    var school = document.getElementById("school").value;
    var grade = document.getElementById("grade").value;
    var major = document.getElementById("major").value;
    var q_type = document.getElementById("q_type").value;

    if(inputElements[1].value == "" || school == "" || grade == "" || major == "" || q_type == "")
    {
        alert("필수정보 혹은 지문이 등록되지 않았습니다. \n필수정보 혹은 지문을 등록해주세요.");
    }
    else
    {
        for (var i = 0; i < inputElements.length; i++) 
        {
            console.log("등록내용 : ", inputElements[i].value, "   ", i);
            inputElements[i].value = "";
        }

        console.log("학교:", school, "학년 : ", grade, "과목 : ", major, "문제유형 : ", q_type, "의 출제를 완료하였습니다");
        alert("문제를 등록 완료하였습니다.");
    }
}

function change_view()
{
    var check_screen = document.querySelector(".inside_wrap");
    var register_screen = document.querySelector(".inside_wrap1");
    var management_screen = document.querySelector(".inside_wrap2");
    
    check_screen.style.display = "none";
    register_screen.style.display = "none";
    management_screen.style.display = "flex";
    alert("문제수정으로 이동합니다.");
}

function check_register()
{
    var btn = event.target;
    var btnId = btn.id;
    var check_screen = document.querySelector(".inside_wrap");
    var register_screen = document.querySelector(".inside_wrap1");
    var management_screen = document.querySelector(".inside_wrap2");
    if(btnId == "register")
    {
        check_screen.style.display = "none";
        register_screen.style.display = "flex";
    }
    else if(btnId == "management")
    {
        check_screen.style.display = "none";
        management_screen.style.display = "flex";
    }
    else
    {
        alert("에러발생. 새로고침하세요");
    }
}

function changeFn()
{
    var school = document.getElementById("sel_school").value;
    var semester = document.getElementById("semester").value;
    var subject = document.getElementById("subject").value;
    var year = document.getElementById("year").value;
    var labelChange = document.querySelector(".question_list label");

    if(school == "select" || semester == "select" || subject == "select")
    {
        alert("모든 항목을 선택해주세요.");
    }
    labelChange.textContent = school + " " + year + " "  + semester + " " + subject + "문제";
    console.log("학교:", school,"년도 : ", year,  "학기 : ", semester, "과목 : ", subject, "의 조회를 완료하였습니다");
    event.preventDefault();
}
function situation()
{
    var con_btn = event.target;
    var con_btnId = con_btn.id;
    
    if(con_btnId == "delete")
    {
        alert("문제가 삭제 되었습니다.");
    }
    else if(con_btnId == "change")
    {
        alert("문제가 수정 되었습니다.");
    }
    else if(con_btnId == "regist")
    {
        alert("문제등록으로 이동합니다.");
        var check_screen = document.querySelector(".inside_wrap");
        var register_screen = document.querySelector(".inside_wrap1");
        var management_screen = document.querySelector(".inside_wrap2");

        check_screen.style.display = "none";
        register_screen.style.display = "flex";
        management_screen.style.display = "none";
    }
    else
    {
        alert("에러발생. 새로고침하세요");
    }
}
function new_Tab()
{
    window.open('OCR_page.html');
}