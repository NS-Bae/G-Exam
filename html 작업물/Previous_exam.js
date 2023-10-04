function hideButtons() {
    var school = document.getElementById("school").value;
    var count = document.getElementById("count").value;
    var type = document.getElementById("type").value;

    console.log("학교:", school);
    console.log("문항 수:", count);
    console.log("문항 유형:", type);


    if(school == "select" || count == "select" || type == "select")
    {
        alert("모든 항목을 선택해주세요.");
    }
    else if(school != "select" && count != "select" && type == "essay_question")
    {
        var sel_pro = document.querySelector(".select_problem");
        sel_pro.style.display = "none";
        var sector = document.querySelector(".container");
        sector.style.display = "flex";
        var multi = document.querySelector(".half_2");
        multi.style.display = "none";
        var essay = document.querySelector(".half_3");
        essay.style.display = "flex";
        var move_btn = document.querySelector(".pre_ne_space");
        move_btn.style.display = "flex";
        event.preventDefault();
        
    }   else if(school != "select" && count != "select" && type == "multiple_choice")
    {
        var sel_pro = document.querySelector(".select_problem");
        sel_pro.style.display = "none";
        var sector = document.querySelector(".container");
        sector.style.display = "flex";
        var multi = document.querySelector(".half_2");
        multi.style.display = "flex";
        var essay = document.querySelector(".half_3");
        essay.style.display = "none";
        var move_btn = document.querySelector(".pre_ne_space");
        move_btn.style.display = "flex";
        event.preventDefault();
        
    }
    else
    {
        var sel_sch = document.querySelector(".select_problem");
        sel_sch.style.display = "none";
        var essayQuestion = document.querySelector(".container");
        essayQuestion.style.display = "flex";
        var move_btn = document.querySelector(".pre_ne_space");
        move_btn.style.display = "flex";
        event.preventDefault();
    }
}

function go_Prev()
{
    var button = event.target;
    var buttonId = button.id;
    console.log("클릭한 버튼의 id 값: " + buttonId);
}

function go_Next()
{
    var button = event.target;
    var buttonId = button.id;
    console.log("클릭한 버튼의 id 값: " + buttonId);
}

function adjustFontSize() {
    const cells = document.querySelectorAll('.question_line');
    cells.forEach(cell => {
        const textLength = cell.textContent.length;
        console.log(textLength);
        const fontSize = 2.5 - textLength * 0.04; // 글자 수에 따라 크기를 조절하는 예제
        cell.style.fontSize = fontSize + 'vh';
    });
}

function adjustTextareaHeight(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}

window.onload = adjustFontSize;
/*모바일인지 아니지 판독하기 */
var userAgent = navigator.userAgent;
var os;
var deviceType;

if (userAgent.indexOf("Windows") !== -1) {
    os = "Windows";
    deviceType = "PC";
} 
else if (userAgent.indexOf("Macintosh") !== -1) {
    os = "macOS";
    deviceType = "맥";
} 
else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceType = "모바일";
    os = "ios";
} 
else if (/Android/i.test(userAgent)) {
    deviceType = "모바일";
    os = "linux";
}
else {
    os = "기타";
    deviceType = "기타";
}

if (deviceType == "모바일") {
    // 모바일 기기용 CSS 파일 로드
    var mobileCSS = document.createElement("link");
    mobileCSS.rel = "stylesheet";
    mobileCSS.href = "css/Previous_Exam_Mobile.css"; // 모바일용 CSS 파일 경로
    document.head.appendChild(mobileCSS);
} else {
    // 데스크톱 기기용 CSS 파일 로드 (기본 CSS 파일)
    var desktopCSS = document.createElement("link");
    desktopCSS.rel = "stylesheet";
    desktopCSS.href = "css/Previous_Exam_PC.css"; // 데스크톱용 CSS 파일 경로
    document.head.appendChild(desktopCSS);
}

console.log("운영 체제:", os);
console.log("기기 유형:", deviceType);