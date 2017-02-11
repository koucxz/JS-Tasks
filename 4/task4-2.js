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

// 非首次跳转至本页面时运行
var NotFirst = typeof (sessionStorage.deadsArr);
if (NotFirst != "undefined") {
    $().ready(
        function() {
            //获得死亡玩家数组
            DeadStr = sessionStorage.deadsArr;
            DeadArr = JSON.parse(DeadStr);
            //更改天数
            console.log(DeadArr);
            $("#dayNum").html(Math.ceil(DeadArr.length / 2) +1);
        });
}





