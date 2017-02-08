/**
 * Created by Administrator on 2017/2/2.
 */
//读取字符串再转为数组
TotalArrStr = localStorage.totalArr;
TotalArr = JSON.parse(TotalArrStr);
console.log("读取数组" + TotalArrStr);
//读取词组
var word1 =localStorage.getItem('word1');
var word2 =localStorage.getItem('word2');
var word3 =localStorage.getItem('word3');
var word4 =localStorage.getItem('word4');

// 全局变量
var n = 1; //页面序号
var order = 1; //玩家序号
var flop = $(".content-flop"); //翻页页面内容
var role = $(".content-role"); //角色页面内容
var word = $(".word"); //词组内容
var buttonCheck = $('.check'); //按钮内容

//切换到身份页
role.hide(); //隐藏角色页
function jumpToRole() {
    flop.hide(); //隐藏翻页页面
    role.show(); //显示角色页
    $(".role").html("角色:" + TotalArr[order - 1]); //角色内容
    var nextOrder = order + 1;
    if (n == 2 * TotalArr.length-1){
        buttonCheck.html("查看法官日记");
    }
    else {
        buttonCheck.html("隐藏并传递给" + nextOrder + "号");
    }
    wordInput(); // 词组与角色匹配
    order++;
}

//跳转到下个页面
function jumpToNext() {
    flop.show();
    role.hide();
    $(".order").html(order); //序号内容
    buttonCheck.html("查看" + order + "号玩家身份");
}

//按钮点击页面变化
console.log(TotalArr.length);
function check() {
    if (n == 2 * TotalArr.length) {
        location.href = "/4/task4.html";
    }
    else {
        if (n % 2 == 1){jumpToRole()}
        else {jumpToNext()}
        n++;
    }
}

// 词组与角色匹配
function wordInput() {
    switch ($(".role").text()) {
        case "角色:杀手":
            word.html("词组:" + word1);
            break;
        case "角色:警察":
            word.html("词组:" + word2);
            break;
        case "角色:医生":
            word.html("词组:" + word3);
            break;
        case "角色:水民":
            word.html("词组:" + word4);
            break;
    }
}
buttonCheck.click(check);
