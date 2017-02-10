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


// 全局变量
var i;
total = TotalArr.length; //角色数组长度，玩家总数
console.log(total);

// 音频播放函数
function PlayPause() {
    var audio = document.getElementById('music');
    if (audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
}
$(".triangle-circle").click(PlayPause);

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

//标记已死亡玩家
for (i=0;i<DeadArr.length;i++) {
    document.getElementsByClassName("statusblock")[DeadArr[i]].className = "statusblock border-red";
}

//点击后选中，若是杀手则提示请选择其他玩家
var boxs = $(".statusblock");
boxs.each(function() {
    var boxNumber = $(".main .statusblock").index(this); //用于判断角色是否存活
    $(this).click(function (){
        if ( $.inArray(boxNumber,DeadArr) != -1) {
            alert("英雄放我一马")
        }
        else {
            $(".statusblock").addClass("border-white").removeClass("border-gray");
            $(this).addClass("border-gray").removeClass("border-white");
            console.log("选中了" + boxNumber);
        }
    })
});

// 记录本次死亡的玩家并存储
$("#nextPage").click(function() {
    var deadBoy = boxs.index($(".border-gray"));
    console.log(deadBoy);
    if ( deadBoy == -1) {
        alert("请选择一个玩家");
    }
    else {
        DeadArr.push(parseInt(deadBoy)); //将本次死亡角色添加进数组
        deadStr = JSON.stringify(DeadArr);
        sessionStorage.deadsArr = deadStr;
        location.href = "task4-2.html";}
});