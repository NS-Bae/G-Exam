function refresh_box()
{
    var questionSubDiv = document.querySelector(".question_sub");
    
    // "question_sub" 내부의 모든 <input type="text"> 요소를 가져옵니다.
    var inputElements = questionSubDiv.querySelectorAll("textarea");
    
    // 가져온 모든 <input> 요소의 값을 비웁니다.
    for (var i = 0; i < inputElements.length; i++) {
        inputElements[i].value = "";
    }

    var school = document.getElementById("school").value;
    var grade = document.getElementById("grade").value;
    var major = document.getElementById("major").value;
    var q_type = document.getElementById("q_type").value;

    console.log("학교:", school, "학년 : ", grade, "과목 : ", major, "문제유형 : ", q_type, "의 출제를 완료하였습니다");
}