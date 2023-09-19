var level = document.getElementById("level");
var labelText = document.querySelector(".board label");

level.addEventListener('change', function()
{
    var option = level.options[level.selectedIndex].text;
    var board = document.querySelector(".board");
    var T_container = document.querySelector(".T_container");
    var loading = document.querySelector(".loading_container");
    var select_problem = document.querySelector(".select_problem");
    var compare_form = document.querySelector(".compare_form");
    var wrong = document.getElementById("wrong");

    if(option == "초등" ||option == "중등" ||option == "고등" ||option == "토익")
    {
        T_container.style.height = "65%";
        select_problem.style.height = "25%";
        board.style.display = "flex";
        labelText.textContent = option + " 영단어 시험 결과";
        loading.style.display = "flex";
        compare_form.style.display = "flex";
        wrong.style.display = "flex";

        switch(option)
        {
            case "초등" :
                updateLoadingBar(0, 95);
                updateRate(87.5, 95);
                break;
            case "중등" :
                updateLoadingBar(0, 80);
                updateRate(80, 80);
                break;
            case "고등" :
                updateLoadingBar(0, 70);
                updateRate(87.5, 70);
                break;
            case "토익" :
                updateLoadingBar(0, 50);
                updateRate(87.5, 50);
                break;
        }
    }
    else if(option == "선택하세요")
    {
        T_container.style.height = "65%";
        select_problem.style.height = "25%";
        board.style.display = "flex";
        labelText.textContent = "시험 결과";
        loading.style.display = "none";
        compare_form.style.display = "none";
        wrong.style.display = "none";
    }
    else
    {
        T_container.style.height = "85%";
        select_problem.style.height = "7%";
        board.style.display = "none";
        loading.style.display = "flex";
        compare_form.style.display = "flex";
        wrong.style.display = "flex";
        total_result();
    }
});

function total_result()
{

}
/*로딩바*/ 
const loadingBar = document.querySelectorAll(".bar");
const progressText = document.getElementById("per");
const total_rate = document.getElementById("total_rate");
const my_rate = document.getElementById("my_rate");
const explain = document.getElementById("explain");
const gap = document.getElementById("gap");
const explain1 = document.getElementById("explain1");

function updateLoadingBar(index, percentage) 
{
    loadingBar[index].style.width = percentage + "%";
    progressText.textContent = percentage + "%";
}

function updateRate(Tpercentage, Mpercentage)
{
    total_rate.textContent = "전체 정답률 : " +  Tpercentage + "%";
    my_rate.textContent = "나의 정답률 : " + Mpercentage + "%";
    explain.textContent = "당신은 평균 정답률보다";
    explain1.textContent = "";
    gap.style.display = "flex";

    if(Tpercentage>Mpercentage)
    {
        var gapPercent = parseInt(Tpercentage - Mpercentage);
        gap.textContent = gapPercent + "%";
        explain1.textContent = "낮습니다.";
    }
    else if(Tpercentage<Mpercentage)
    {
        var gapPercent = parseInt(Mpercentage - Tpercentage);
        gap.textContent = gapPercent + "%";
        explain1.textContent = "높습니다.";
    }
    else if(Tpercentage == Mpercentage)
    {
        explain.textContent = "당신은 평균 정답률과";
        gap.style.display = "none";
        explain1.textContent = "같습니다.";
    }
}
