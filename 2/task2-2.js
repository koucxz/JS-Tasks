/**
 * Created by Administrator on 2017/1/18.
 */

//全局变量声明
var rolePlayer = document.getElementsByName("player"); //得到四个角色input的数组
var roleWord = document.getElementsByName("word"); //得到四个角色的词组；
var len = rolePlayer.length;
var i;
var num = document.getElementById("player-no"); /* 玩家人数和 */
var range = document.getElementById("range"); /* 滑动条数值 */

/* 将玩家配比中数字默认设置为只读 */
for (i = 0;i < len;i ++) {
    rolePlayer[i].readOnly=true;
}

/* 按键改变玩家配比的只读属性和样式 */
var term = true;
function readwrite(){
    //var term = true; //在此处声明局部变量，if语句内term的赋值不能被传到嵌套外；
    if (term){
        for (i = 0;i < len;i ++) {
            rolePlayer[i].readOnly = false;
            rolePlayer[i].className = "player-write";
        }
      document.getElementById("set").innerHTML="设置完成";
        term = false;
    }
    else {
        for (i = 0;i < len;i ++) {
            rolePlayer[i].readOnly = true;
            rolePlayer[i].className = "player";
        }
        document.getElementById("set").innerHTML="点击设置";
        term = true;
    }
}
document.getElementById("set").onclick=readwrite;
/* 用角色人数建立数组 */
var roleArr = []; //定义一个空数组
function newArr() {
    roleArr.splice(0,roleArr.length); //清空数组以免数据堆积
    for (i = 0;i < len;i ++) {
        roleArr.push(parseInt(rolePlayer[i].value)); //将角色人数输入数组
    }
}
newArr(); //运行建立数函数


/* 数组求和函数 */
Array.prototype.sum = function (){
    var result = 0;
    for(var i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
};

/* 设置  玩家总人数=各角色人数和 */
num.value =  roleArr.sum();
function sumPlayer() {
    roleArr = [];
    newArr();
    range.value = roleArr.sum();
    num.value = roleArr.sum();
}
for (i = 0;i < len;i ++) {
    rolePlayer[i].oninput = sumPlayer;
}

/* 重设四个角色人数函数 */
function randomRole() {
    var numOfKiller = Math.ceil(num.value/4);
    var numOfDoc = Math.ceil(Math.random()*2);
    var numOfCop = Math.ceil(Math.random()*2);
    var numOfCitizen = Math.floor(num.value - numOfKiller - numOfDoc - numOfCop);
    rolePlayer[0].value = numOfKiller;
    rolePlayer[1].value = numOfCop;
    rolePlayer[2].value = numOfDoc;
    rolePlayer[3].value = numOfCitizen;
}

/* 设置  滑动条值=玩家人数  的函数 */
function change() {
    num.value = range.value;
    randomRole();  //重设角色人数
    newArr(); //更新数组数值
    console.log(roleArr);
}
document.getElementById("range").onchange=change;

function slide() {
    range.value = num.value;
    randomRole();
    newArr();
}
document.getElementById("player-no").oninput=slide;

function alertNum() { //限制输入框输入人数
    while (num.value < 6 || num.value > 18){
        while (num.value < 6) {
            num.value = 6;
        }
        while (num.value > 18) {
            num.value = 18;
        }
            alert('请输入6-18之内的数');
            randomRole();
            range.value = num.value;
    }
}
document.getElementById("player-no").onchange=alertNum;

//洗牌算法
Array.prototype.shuffle = function () {
    var input = this;

    for (i= input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

//玩家角色分配
function distribute() {
    var n;
    var totalRoleArr = []; //总人数数组 roleArr = [ 杀手 , 警察 , 医生 , 水民]
    for (n=0;n<roleArr[0];n++) {
        totalRoleArr[n] = "杀手";
    }
    for (n=roleArr[0];n<roleArr[0] + roleArr[1];n++) {
        totalRoleArr[n] = "警察";
    }
    for (n=roleArr[0] + roleArr[1];n<roleArr[0] + roleArr[1] + roleArr[2];n++) {
        totalRoleArr[n] = "医生";
    }
    for (n=roleArr[0] + roleArr[1] + roleArr[2];n<roleArr.sum();n++) {
        totalRoleArr[n] = "水民";
    }
    totalRoleArr.shuffle();
    //存储内容至下个页面
    str = JSON.stringify(totalRoleArr);
    localStorage.totalArr = str;
    str1 = JSON.stringify(roleArr);
    localStorage.numRoleArr = str1;
    localStorage.setItem('word1',roleWord[0].value);
    localStorage.setItem('word2',roleWord[1].value);
    localStorage.setItem('word3',roleWord[2].value);
    localStorage.setItem('word4',roleWord[3].value);
    //页面跳转
    location.href = "../3/task3.html";
}

window.onload = function() {document.getElementById("nextpage").onclick = distribute;};





