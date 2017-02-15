/**
 * Created by Administrator on 2017/2/13.
 */
//全局变量
var i;
var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],len = versions.length; //声明版本及其长度

//创建XHR对象
function createXHR() {
    var request = false;
    if (window.XMLHttpRequest) {         //Firefox
        for (i=0,len=versions.length; i < len; i++) {
            try {
                request = new XMLHttpRequest(versions[i]);
                break;
            }
            catch (ex) {} //跳过
        }
        if (request.overrideMimeType) {
            request.overrideMimeType('text/xml'); //XHR对象作为非纯文本处理
        }
    }
    else if (window.ActiveXObject) {    //IE
        try {
            for (i=0,len=versions.length; i < len; i++) {
                try {
                    request = new XMLHttpRequest(versions[i]);
                    break;
                }
                catch (ex) {} //跳过
            }
        } catch (ex) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ex) {}
        }
    }
    if (!request) {
        window.alert("服务器发送请求失败，请换一个浏览器尝试");
        return false;
    }
    return request;
}
var xhr = createXHR();
//JavaScript实现
//登录按钮获取帐号密码信息
// var responseResult;
// xhr.onreadystatechange=function()
// {
//     if(xhr.readyState==4)
//     {
//         responseResult = JSON.parse(xhr.responseText);  // 从服务器的response获得数据
//         if (responseResult.message == "success") {
//             alert("您好，id为"+result.uid+"的用户");
//         }
//         else {
//             $(".alert").html("用户名密码错误").css('color','red');
//         }
//     }
// };
//登录事件
// $("#btn-login").click(  function() {
//     var username = $("#username").val();
//     var password = $("#password").val();
//     if (username.length >= 6 && password.length >= 6 && username != password) {
//         console.log(username,password);
//         xhr.open("post","/skill-ajax/a/login",true);
//         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded" );
//         xhr.send('mobile='+username+'&pwd='+password);
//     }
//     else {
//         $(".alert").html("用户名密码错误").css('color','red');
//     }
// });
//jQuery实现
$("#btn-login").click(  function() {
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        type: 'Post',
        url:'/skill-ajax/a/login',
        dataType: "json",
        data: {
            mobile:username,
            pwd:password
        },
        //data:'mobile='+username+'&pwd='+password,
        success: function(result) {
            if (result.code == -2006) {
                $(".alert").html("用户名或密码错误").css('color','red');
            }
            else if (result.code == -2000) {
                $(".alert").html("请先注册").css('color','red');
            }
            else {
                alert("您好，id为"+result.uid+"的用户");
            }
        }
    }
);
});
// 回车登录
$("body").keydown(function() {if (event.keyCode==13) { //回车键的键值为13
    $("#btn-login").click();// 调用登录按钮的登录事件
}});


