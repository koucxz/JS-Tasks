/**
 * Created by Administrator on 2017/2/9.
 */
//读取字符串再转为数组，获得玩家数组
TotalArrStr = localStorage.totalArr;
TotalArr = JSON.parse(TotalArrStr);
console.log("读取数组" + TotalArrStr);
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
//定义时间相关内容
var dayTime = new Date();
var duration = dayTime.getTime() - StartTime;
// 全局变量
var i;
//标题
if(DeadArr.length % 2 == 0) {
    $("h3").html("投票结果")
}
else {
    $("h3").html("黑夜解密")
}
//将玩家死亡信息显示出来
$(document).ready(function(){
    for (i = 0;i < DeadArr.length;i++) {
        if (i % 2 == 0) {
            $(".dead p").append(DeadArr[i] + 1 +
                "号被杀手杀死了,真实身份是"
                + TotalArr[DeadArr[i]] + "<br/>" );
        }
        else {
            $(".dead p").append(DeadArr[i] + 1 +
                "号被投票出局了,真实身份是"
                + TotalArr[DeadArr[i]] + "<br/>" );
        }
            }
});

//杀手玩家数组
var killArr = [];
for (i=0;i < TotalArr.length;i++){
    if (TotalArr[i] == "杀手") {killArr.push(i)}
}
console.log("杀手数组"  + killArr);
console.log("死亡玩家数组" + DeadArr);
//水民胜利条件判断
var deadKillerArr = DeadArr.filter(function(v){ return killArr.indexOf(v) > -1}); //获得死亡杀手数组
console.log("死亡杀手数组" + deadKillerArr);
console.log(deadKillerArr);
if (deadKillerArr.sort().toString() == killArr.sort().toString()) {
    console.log("水民胜利");
    sessionStorage.setItem('wininfo',"水民胜利");
}
//杀手胜利条件判断
if (TotalArr.length - DeadArr.length <= (killArr.length - deadKillerArr.length) *2 ) { //存活水民数不大于存活杀手数
    console.log("杀手胜利");
    sessionStorage.setItem('wininfo',"杀手胜利");
}

if (deadKillerArr.sort().toString() == killArr.sort().toString()||
    TotalArr.length - DeadArr.length <= (killArr.length - deadKillerArr.length) *2){
    $(".check").html("游戏结果").click(function() {location = "task4-6.html"});
    sessionStorage.setItem('day', Math.ceil(DeadArr.length / 2));
    // 确认进入下一天的时间
    TimeArr.push(duration);
    timeStr = JSON.stringify(TimeArr);
    sessionStorage.timesArr = timeStr;
}
else {
    $(".check").html(function(){if (DeadArr.length % 2 == 0){$(this).html("第&thinsp;" + (Math.ceil(DeadArr.length / 2) + 1) +"&thinsp;天")}})
    .click(function () {
        if(DeadArr.length % 2 == 1) {
            location = "task4-5.html";
        }
        else {
            location = "task4-2.html";
            // 确认进入下一天的时间
            TimeArr.push(duration);
            timeStr = JSON.stringify(TimeArr);
            sessionStorage.timesArr = timeStr;
        }
    }
)}


