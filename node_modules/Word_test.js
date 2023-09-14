function hideButtons() {
    var button = event.target;
    var buttonId = button.id;
    console.log("클릭한 버튼의 id 값: " + buttonId);

    // 모든 버튼을 숨깁니다.
    var buttons = document.querySelectorAll(".volume_btn");
    buttons.forEach(function(btn) {
        btn.style.display = "none";
    });
    
    // 주관식 문제를 표시합니다.
    var essayQuestion = document.querySelector(".subjective_question");
    essayQuestion.style.display = "flex";

    var move_btn = document.querySelector(".pre_ne_space");
    move_btn.style.display = "flex";

    // 폼의 기본 동작을 중단시킵니다.
    event.preventDefault();
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
window.onload = adjustFontSize;