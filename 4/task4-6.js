/**
 * Created by Administrator on 2017/2/2.
 */
//读取字符串再转为数组
TotalArrStr = localStorage.totalArr;
TotalArr = JSON.parse(TotalArrStr);
console.log("读取数组" + TotalArrStr);
RoleArrStr = localStorage.numRoleArr;
RoleArr = JSON.parse(RoleArrStr);
console.log("读取数组" + RoleArrStr);
//获得死亡玩家数组
DeadStr = sessionStorage.deadsArr;
DeadArr = JSON.parse(DeadStr);
console.log(DeadArr);
console.log("读取死亡玩家数组" + DeadStr);
//获得游戏开始时间
var StartTime = sessionStorage.getItem('startTime');
//读取timeArr数组
TimeArrStr = sessionStorage.timesArr;
TimeArr = JSON.parse(TimeArrStr);
console.log("时间数组" + TimeArr);


//读取词组
var word1 =localStorage.getItem('word1');
var word2 =localStorage.getItem('word2');
var word3 =localStorage.getItem('word3');
var word4 =localStorage.getItem('word4');
//读取胜利信息
var winInfo = sessionStorage.getItem('wininfo');
//读取天数
var dayNum = sessionStorage.getItem('day');

//全局变量
var words = document.getElementsByClassName("word");

//输入信息
$(".txt").html(winInfo);  //胜利角色
for (i = 0;i < 4;i++) {
    document.getElementsByClassName("rolenum")[i].innerHTML = RoleArr[i]; //角色人数
}
words[0].innerHTML = word1;
words[1].innerHTML = word2;
words[2].innerHTML = word3;
words[3].innerHTML = word4
;
//每天事件
for (i=1;i< dayNum;i++) {
    $("#day").clone().appendTo($(".main-bottom"));
}
for (i=0;i < dayNum;i++) {
    document.getElementsByClassName("days")[i].innerHTML = "第" + (i + 1) + "天";
}

for (i=0;i < DeadArr.length;i++) {
    if (i % 2 == 0) {document.getElementsByClassName("killevent")[i].innerHTML= "晚上：" + (DeadArr[i] + 1) + "号被杀手杀死，真实身份是" + TotalArr[DeadArr[i]]}
    else {document.getElementsByClassName("killevent")[i].innerHTML= "白天：" + (DeadArr[i] + 1) + "号被全民投死，真实身份是" + TotalArr[DeadArr[i]]}
}


if ( winInfo == "杀手胜利") {
    $('.wintip').html("太棒了!你知道么？在捉鬼游戏中只有20%的卧底取得游戏最终的胜利哦！")
}
else {
    $('.wintip').html("本轮游戏共抓住杀手" + RoleArr[0] + "人，共经历了" + dayNum + "个白天，在杀人游戏中击败了67%的玩家")
}


// 转换毫秒获取秒分时的函数
function  getTimeSecond(sTime) {
    var s = Math.floor((sTime)/1000);// 秒
    if (s > 60) {
        s = parseInt(s%60);
    }
    return s;
}
function getTimeMin(mTime) {
    var s = Math.floor((mTime)/1000);// 秒
    var min;
    min = parseInt(s/60);
    if (min> 60) {
        min = parseInt(min%60);
    }
    return min;
}
function getTimeHour(hTime) {
    var s = Math.floor((hTime)/1000);// 秒
    var hour;
    hour = parseInt(s/3600);
    return hour;
}
// 填充时间
for (i=0;i < TimeArr.length;i++) {
    document.getElementsByClassName("daytime")[i].innerHTML = getTimeHour(TimeArr[i]) + "小时" + getTimeMin(TimeArr[i]) +"分" + getTimeSecond(TimeArr[i]) + "秒";
}

$(".onemore").click(function() {
    localStorage.clear();
    sessionStorage.clear();
    location = "../2/task2-1.html";
});