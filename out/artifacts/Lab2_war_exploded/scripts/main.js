let xField = document.forms["main-form"]["X"];
let yField = document.forms["main-form"]["Y"];
let rField = document.forms["main-form"]["R"];
let offsetField = document.forms["main-form"]["offset"];
let warn_y_nan = document.getElementsByClassName("warn-checkbox")[3];
let warn_y_int = document.getElementsByClassName("warn-checkbox")[4];
let warn_x_nan = document.getElementsByClassName("warn-checkbox")[1];
let warn_x_int = document.getElementsByClassName("warn-checkbox")[2];
let warn_r = document.getElementsByClassName("warn-checkbox")[0];
let submitButton = document.getElementsByClassName("submit-button")[0];
let clearButton = document.getElementsByClassName("submit-button")[1];
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');
let xChecked = false;
let yChecked = false;
let rChecked = false;
let i = 25;

for (let button of document.getElementsByClassName("r-button")){
    button.addEventListener("click", rButtonsOnClick)
}
submitButton.addEventListener("click", check);
clearButton.addEventListener("click", clear);
xField.addEventListener("keyup", checkX);
yField.addEventListener("keyup", checkY);
canvas.addEventListener("click", handleCanvasClick);

blockButton();
offsetField.value = new Date().getTimezoneOffset();
drawAxis();


function rButtonsOnClick(event) {
    for (let button of document.getElementsByClassName("r-button")){
        button.classList.remove("pressed");
    }
    event.target.classList.add("pressed");
    rField.value = ""+event.target.value;
    checkR(event);
    if(rChecked){
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        drawArea(Number(rField.value));
        drawAxis();
    }
    drawPointsFromTable();
}
function blockButton() {
    if (!(xChecked && yChecked && rChecked)) {
        submitButton.setAttribute("disabled", "disable");
    } else {
        submitButton.removeAttribute("disabled")
    }
}
function clear() {
    xField.value = "";
    yField.value = "";
    rField.value = "";
    for (let button of document.getElementsByClassName("r-button")){
        button.classList.remove("pressed");
    }
    warn_r.hidden = true;
    yField.classList.remove("warn-text");
    xField.classList.remove("warn-text");
    submitButton.setAttribute("disabled", "disable");
    xChecked = false;
    yChecked = false;
    rChecked = false;
    warn_y_nan.hidden = true;
    warn_y_int.hidden = true;
    warn_x_nan.hidden = true;
    warn_x_int.hidden = true;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawAxis();
}
function checkY(event) {
    yField.value = yField.value.replace(",", ".");
    if (!isFinite(Number(yField.value)) || !(/0*/).test(yField.value) && Number(yField.value) === 0 || (/^ *$/).test(yField.value)) {
        event.preventDefault();
        yField.classList.add("warn-text");
        yChecked = false;
        warn_y_nan.hidden = false;
        warn_y_int.hidden = true;
    } else if (Number(yField.value) < -5 || Number(yField.value) > 5) {
        event.preventDefault();
        yField.classList.add("warn-text");
        yChecked = false;
        warn_y_int.hidden = false;
        warn_y_nan.hidden = true;
    } else {
        yField.classList.remove("warn-text");
        yChecked = true;
        warn_y_nan.hidden = true;
        warn_y_int.hidden = true;
    }
    blockButton();
}
function checkX(event) {
    xField.value = xField.value.replace(",", ".");
    if (!isFinite(Number(xField.value)) || !(/0*/).test(xField.value) && Number(xField.value) === 0 || (/^ *$/).test(xField.value)) {
        event.preventDefault();
        xField.classList.add("warn-text");
        xChecked = false;
        warn_x_nan.hidden = false;
        warn_x_int.hidden = true;
    } else if (Number(xField.value) < -4 || Number(xField.value) > 4) {
        event.preventDefault();
        xField.classList.add("warn-text");
        xChecked = false;
        warn_x_int.hidden = false;
        warn_x_nan.hidden = true;
    } else {
        xField.classList.remove("warn-text");
        xChecked = true;
        warn_x_nan.hidden = true;
        warn_x_int.hidden = true;
    }
    blockButton();
}
function checkR(event) {
    if(!(rField.value==="1" || rField.value==="1.5" || rField.value==="2" || rField.value==="2.5" || rField.value==="3")){
        rChecked = false;
        warn_r.hidden = false;
        event.preventDefault();
    }
    else{
        rChecked = true;
        warn_r.hidden = true;
    }
    blockButton();
}
function check(event) {
    checkR(event);
    checkY(event);
    checkY(event);
    event.preventDefault();
    doAjax(xField.value, yField.value, rField.value, true)
}
function handleCanvasClick(event) {
    checkR(event);
    if(rChecked){
        let obj = event.target;
        let x = Number(((event.pageX - window.pageXOffset - obj.getBoundingClientRect().x - obj.width/2)/i).toFixed(2));
        let y = Number((-(event.pageY - window.pageYOffset - obj.getBoundingClientRect().y - obj.height/2)/i).toFixed(2));
        if(x>=-4 && x<=4 && y>=-5 && y<=5){
            doAjax(x,y,rField.value, true)
        }
    }
}



