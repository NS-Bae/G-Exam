var subject = document.getElementById("subject");
var labelText = document.querySelector(".board label");

subject.addEventListener('change', function()
{
    var option = subject.options[subject.selectedIndex].text;
    labelText.textContent = option + " 시험 결과";
});