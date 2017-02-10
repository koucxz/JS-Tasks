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

var i;
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
