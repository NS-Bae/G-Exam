var level = document.getElementById("level");
var labelText = document.querySelector(".board label");

level.addEventListener('change', function()
{
    var option = level.options[level.selectedIndex].text;
    labelText.textContent = option + " 영단어 시험 결과";
});