/**
 * Created by Administrator on 2017/1/18.
 */

var rolePlayer = document.getElementsByClassName("player");
var len = rolePlayer.length;
var i;

/* 将玩家配比默认设置为只读 */
for (i = 0;i < len;i ++) {
    rolePlayer[i].readOnly=true;
    rolePlayer[i].style.border="2px solid transparent";
}

/* 按键改变玩家配比的只读属性和样式 */
var term = true;
function readwrite(){
    if (term){
        for (i = 0;i < len;i ++) {
            rolePlayer[i].readOnly=false;
            rolePlayer[i].style.backgroundColor="#eee";
            rolePlayer[i].style.border="2px solid #ddd";
        }
      document.getElementById("set").innerHTML="设置完成";
        term = false;
    }
    else {
        for (i = 0;i < len;i ++) {
            rolePlayer[i].readOnly=true;
            rolePlayer[i].style.backgroundColor="transparent";
            rolePlayer[i].style.border="2px solid transparent";
        }
        document.getElementById("set").innerHTML="点击设置";
        term = true;
    }
}

/* 用角色人数建立数组 */
var roleArr = []; //定义一个空数组
function newArr() {
    for (i = 0;i < len;i ++) {
        roleArr.push(parseInt(rolePlayer[i].value));
    }
}
newArr();

/* 数组求和函数 */
function getSum() {
    Array.prototype.sum = function (){
        var result = 0;
        for(var i = 0; i < this.length; i++) {
            result += this[i];
        }
        return result;
    };
}
getSum();
console.log(roleArr.sum());


var range = document.getElementById("player-no"); /* 玩家人数和 */
var num = document.getElementById("range"); /* 滑动条数值 */
/* 设置  玩家总人数=各角色人数和 */

range.value =  roleArr.sum();
function sumPlayer() {
    roleArr = [];
    newArr();
    range.value = roleArr.sum();
    num.value = roleArr.sum();
}


/* 设置  滑动条值=玩家人数  的函数 */

function change() {
    range.value = num.value;
}

function slide() {
    num.value = range.value ;
}



