/**
 * Created by Administrator on 2017/2/2.
 */
//读取字符串再转为数组
TotalArrStr = localStorage.totalArr;
TotalArr = JSON.parse(TotalArrStr);
console.log("读取数组" + TotalArrStr);

// 全局变量
var i;
total = TotalArr.length; //角色数组长度，玩家总数
console.log(total);
//克隆人数数量的牌数并填充
function cloneDiv(){
    for (i = 1;i < total;i++) {
        $("#sourcediv").clone().appendTo($(".main")); //复制牌数
    }
    for (i = 0;i < total;i++) {
        document.getElementsByClassName("status")[i].innerHTML = TotalArr[i];
        document.getElementsByClassName("number")[i].innerHTML = i +1 + "号";
    }
}
$(document).ready(cloneDiv());

window.onunload = function() {
        var start;
        start = new Date();
        sessionStorage.setItem('startTime',start.getTime());
        //存储timeArr数组
        var timeArr = [];
        timeStr = JSON.stringify(timeArr);
        sessionStorage.timesArr = timeStr;
    };


