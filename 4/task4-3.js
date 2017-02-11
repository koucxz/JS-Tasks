/**
 * Created by Administrator on 2017/2/9.
 */
//读取字符串再转为数组
TotalArrStr = localStorage.totalArr;
TotalArr = JSON.parse(TotalArrStr);
console.log("读取数组" + TotalArrStr);

// 全局变量
var i;
var total = TotalArr.length; //角色数组长度，玩家总数
console.log("总人数为"  + total);

// 音频播放函数
$(".triangle-circle").click(function() {
    var audio = document.getElementById('music');
    if (audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
});

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

// 非首次跳转至本页面时运行
var NotFirst = typeof (sessionStorage.deadsArr);
if (NotFirst != "undefined") {
    //获得死亡玩家数组
    DeadStr = sessionStorage.deadsArr;
    DeadArr = JSON.parse(DeadStr);
    //标记已死亡玩家
    for (i=0;i<DeadArr.length;i++) {
        document.getElementsByClassName("statusblock")[DeadArr[i]].className = "statusblock border-red";
    }
}



//点击后选中，若是杀手则提示请选择其他玩家
var boxs = $(".statusblock");
boxs.each(function() {
    var role = $(this).find(".status").text(); //用于判断角色内容
    var boxNumber = $(".main .statusblock").index(this); //用于判断是否存活
    $(this).click(function (){
        if (NotFirst != "undefined") {
            if ($.inArray(boxNumber, DeadArr) != -1) {
                alert("该角色已死亡")
            }
            else {
                if (role == "杀手") {
                    alert("不能杀同伴，请选择其他玩家")
                }
                else{
                    $(".statusblock").addClass("border-white").removeClass("border-gray")
                        .find(".icon").addClass("hide").removeClass("unhide");
                    $(this).addClass("border-gray").removeClass("border-white")
                        .find(".icon").addClass("unhide").removeClass("hide");
                    console.log("选中了" + boxNumber);
                }
            }
        }
        else {
            if (role == "杀手") {
                alert("不能杀同伴，请选择其他玩家")
            }
            else{
                $(".statusblock").addClass("border-white").removeClass("border-gray");
                $(this).addClass("border-gray").removeClass("border-white");
                console.log("选中了" + boxNumber);
            }
        }
    })
});

var deadArr = [];
// 记录本次死亡的玩家并存储
$("#nextPage").click(function() {
    var deadBoy = boxs.index($(".border-gray"));
    console.log(deadBoy);
    if ( deadBoy == -1) {
        alert("请选择一个玩家");
    }
    else {
        if (NotFirst == "undefined") {
            deadArr.push(parseInt(deadBoy)); //将首次死亡角色添加进数组
            var deadStr;
            deadStr = JSON.stringify(deadArr);
            sessionStorage.deadsArr = deadStr;
        }
        else {
            DeadArr.push(parseInt(deadBoy)); //将本次死亡角色添加进数组
            deadStr = JSON.stringify(DeadArr);
            sessionStorage.deadsArr = deadStr;
        }
        location.href = "task4-4.html";}
});


