/**
 * Created by Administrator on 2017/1/15.
 */
/* 获取box数组 */
var arr = document.getElementsByClassName("box");
var l = arr.length;

/* 通过类名box定位数组内随机数 */
function randomNumber(arr){
    return arr[Math.floor(Math.random() * l)]
}

/* 随机颜色 */
function randomColor() {
    var i;
    var color = "#";
    var colorArray = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]; //16进制数组
    for (i = 0; i < 6; i++) {
        var cur = randomNum(15, 0);
        color += colorArray[cur];
    }
    function randomNum(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return color;
}

//清空所有颜色
function clearColor(){
    for(i = 0;i < l;i ++){
        arr[i].style.background = "orange";
    }
}

function randomBackground() {
    clearColor();
    var i;
     do {
         var ram1 = randomNumber(arr);//获取到的随机box
         ram2 = randomNumber(arr);
         ram3 = randomNumber(arr);
     }
     while (ram1 == ram2 || ram2 == ram3 || ram3 == ram1); //去掉重复选中
    ram1.style.backgroundColor = randomColor();
    ram2.style.backgroundColor = randomColor();
    ram3.style.backgroundColor = randomColor();
}


var intMain;
function start(){
    randomBackground();
    intMain = setInterval(randomBackground,1000);
    btnStart.onclick = false;
    // document.getElementById("btnStart").disabled=true;
}
function stop(){
    clearColor();
    clearInterval(intMain);
    btnStart.onclick = true;
    // document.getElementById("btnStart").disabled=false;
}