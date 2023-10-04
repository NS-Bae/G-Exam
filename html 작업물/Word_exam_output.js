// HTML에서 요소들을 가져옴
const levelSelect = document.getElementById("level");
const labelText = document.querySelector(".board label");
const loadingBars = document.querySelectorAll(".bar");
const progressText = document.getElementById("per");
const totalRate = document.getElementById("total_rate");
const myRate = document.getElementById("my_rate");
const explain = document.getElementById("explain");
const gap = document.getElementById("gap");
const explain1 = document.getElementById("explain1");
const scoreSection = document.getElementById("score_section");
const wrongSection = document.getElementById("wrong_section");
const compareZone = document.getElementById("compare_zone");
const const_rate = document.getElementById("const_rate");
const ele_load = document.getElementById("ele_load");
const mid_load = document.getElementById("mid_load");
const high_load = document.getElementById("high_load");
const toeic_load = document.getElementById("toeic_load");
const result_list = document.getElementById("result_list");
const TContainer = document.querySelector(".T_container");
const selectProblem = document.querySelector(".select_problem");
const loading = document.querySelector(".loading_container");
const compareForm = document.querySelector(".compare_form");
const wrong = document.getElementById("wrong");
const ele_h4 = document.getElementById("ele");
const mid_h4 = document.getElementById("mid");
const high_h4 = document.getElementById("high");
const toeic_h4 = document.getElementById("toeic");
const ele_rate = document.getElementById("ele_rate");

    // 초기에는 점수를 숨김
scoreSection.style.display = "none";
ele_load.style.display = "none";
mid_load.style.display = "none";
high_load.style.display = "none";
toeic_load.style.display = "none";

    // 레벨 선택 이벤트 리스너
    levelSelect.addEventListener('change', function () 
    {
        const option = levelSelect.options[levelSelect.selectedIndex].text;
        if (option === "초등" || option === "중등" || option === "고등" || option === "토익") 
        {
            TContainer.style.height = "65%";
            selectProblem.style.height = "25%";
            labelText.textContent = option + " 영단어 시험 결과";
            loading.style.display = "flex";
            compareForm.style.display = "flex";
            wrong.style.display = "flex";
            const_rate.style.display = "flex";
            compareZone.style.display = "flex";
            result_list.style.display = "flex";
            wrongSection.style.display = "flex";
            
            scoreSection.style.display = "none";
            ele_load.style.display = "none";
            mid_load.style.display = "none";
            high_load.style.display = "none";
            toeic_load.style.display = "none";

            switch (option) {
                case "초등":
                    updateLoadingBar(0, 95);
                    updateRate(87.5, 95);
                    break;
                case "중등":
                    updateLoadingBar(0, 80);
                    updateRate(80, 80);
                    break;
                case "고등":
                    updateLoadingBar(0, 70);
                    updateRate(87.5, 70);
                    break;
                case "토익":
                    updateLoadingBar(0, 50);
                    updateRate(87.5, 50);
                    break;
            }
        } 
        else if (option === "선택하세요") 
        {
            TContainer.style.height = "65%";
            selectProblem.style.height = "25%";
            labelText.textContent = "시험 결과";
            loading.style.display = "none";
            compareForm.style.display = "none";
            wrong.style.display = "none";
        } 
        else 
        {
            totalResult();
            changeHead();
            updateLoadingBar(0, 95);
        }
    });

    // 점수를 보여주는 함수
    function totalResult() 
    {
        TContainer.style.height = "85%";
        selectProblem.style.height = "7%";

        loading.style.display = "flex";
        compareForm.style.display = "flex";
        wrong.style.display = "flex";
        result_list.style.display = "none";
        wrongSection.style.display = "none";
        compareZone.style.display = "none";
        const_rate.style.display = "none";
        scoreSection.style.display = "flex";
        ele_load.style.display = "flex";
        mid_load.style.display = "flex";
        high_load.style.display = "flex";
        toeic_load.style.display = "flex";
        ele_rate.style.display = "flex";
    }
    function changeHead()
    {
        ele_h4.textContent = "초등 영단어 결과"
        mid_h4.textContent = "중등 영단어 결과"
        high_h4.textContent = "고등 영단어 결과"
        toeic_h4.textContent = "토익 영단어 결과"
    }

    // 로딩 바 업데이트 함수
    function updateLoadingBar(index, percentage) 
    {
        loadingBars[index].style.width = percentage + "%";
        progressText.textContent = percentage + "%";
    }

    // 정답률 업데이트 함수
    function updateRate(Tpercentage, Mpercentage) 
    {
        totalRate.textContent = "전체 정답률 : " + Tpercentage + "%";
        myRate.textContent = "나의 정답률 : " + Mpercentage + "%";
        explain.textContent = "당신은 평균 정답률보다";
        explain1.textContent = "";
        gap.style.display = "flex";

        if (Tpercentage > Mpercentage) 
        {
            const gapPercent = parseInt(Tpercentage - Mpercentage);
            gap.textContent = gapPercent + "%";
            explain1.textContent = "낮습니다.";
            console.log(gapPercent);
        } 
        else if (Tpercentage < Mpercentage) 
        {
            const gapPercent = parseInt(Mpercentage - Tpercentage);
            gap.textContent = gapPercent + "%";
            explain1.textContent = "높습니다.";
            console.log(gapPercent);
        } 
        else if (Tpercentage === Mpercentage) 
        {
            explain.textContent = "당신은 평균 정답률과";
            gap.style.display = "none";
            explain1.textContent = "같습니다.";
        }
    }
