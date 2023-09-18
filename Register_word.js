
var categoryLevel2 = document.getElementById("sel_level2");
var labelText = document.querySelector(".board label");

categoryLevel2.addEventListener('change', function()
{
    var originText = labelText;
    var option = categoryLevel2.options[categoryLevel2.selectedIndex].text;
    labelText.textContent = option + " 영단어 문제 리스트";
});

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

function refresh_box()
{
    var sel_option = document.getElementById("sel_level").value;
    var word_tag = document.getElementById("tag").value;
    var each_textarea = document.querySelectorAll("textarea");

    if(sel_option == "select" || word_tag == "")
    {
        alert("영단어의 유형을 선택해주세요.");
        throw new Error("영단어의 유형을 선택해주세요.");
    }
    for(var i=0;i<each_textarea.length;i++)
    {
        each_textarea[i].value = "";
    }
    alert("작성된 모든 영단어가 등록 완료되었습니다.");
    
}

function change_view()
{
    var check_screen = document.querySelector(".btn_space");
    var register_screen = document.querySelector(".word_test_regist_form");
    var management_screen = document.querySelector(".management_word");
    
    check_screen.style.display = "none";
    register_screen.style.display = "none";
    management_screen.style.display = "flex";
    alert("문제수정으로 이동합니다.");
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
        var check_screen = document.querySelector(".btn_space");
        var register_screen = document.querySelector(".word_test_regist_form");
        var management_screen = document.querySelector(".management_word");

        check_screen.style.display = "none";
        register_screen.style.display = "flex";
        management_screen.style.display = "none";
    }
    else
    {
        alert("에러발생. 새로고침하세요");
    }
}

function check_register()
{
    var btn = event.target;
    var btnId = btn.id;
    var check_screen = document.querySelector(".btn_space");
    var register_screen = document.querySelector(".word_test_regist_form");
    var management_screen = document.querySelector(".management_word");
    if(btnId == "register")
    {
        check_screen.style.display = "none";
        register_screen.style.display = "flex";
        management_screen.style.display = "none";
    }
    else if(btnId == "management")
    {
        check_screen.style.display = "none";
        management_screen.style.display = "flex";
        register_screen.style.display = "none";
    }
    else
    {
        alert("에러발생. 새로고침하세요");
    }
}