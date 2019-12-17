window.onload = function () {
    $.ajax({
        headers: {
            "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
        },
        url: "http://cinscby.natapp1.cc/types/all",
        type: "get",
        dataType: "json",
        success: function(data) {
            var a = data['data'];
            var select1 = document.getElementById("recipient-name");
            for(var i = 0;i<a.length;i++){
                var b = document.createElement("option");
                b.setAttribute("value",a[i]['id']);
                b.innerText = a[i]['typeMsg'];
                select1.appendChild(b);
            }
        },
        error: function(err) {
            console.log(err);
            //alert("失败，请稍后再试");
        }
    });
    $.ajax({
        headers: {
            "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
        },
        url: "http://cinscby.natapp1.cc/tags/all",
        type: "get",
        dataType: "json",
        success: function(data) {
            var c = data['data'];
            var select2 = document.getElementById("message-text");
            for(var m = 0;m<c.length;m++){
                var d = document.createElement("option");
                d.setAttribute("value",c[m]['id']);
                d.innerText = c[m]['tagsMsg'];
                select2.appendChild(d);
            }
        },
        error: function(err) {
            console.log(err);
            //alert("失败，请稍后再试");
        }
    })
};


function subBlog() {
    console.log(document.getElementsByClassName('ck-content')[0].innerHTML,document.getElementsByClassName('ck-content')[0].innerText,getString(document.getElementsByClassName('ck-content')[0].innerText,25),$('#recipient-name')[0].value,$('#message-text')[0].value);
    console.log($('#title')[0].value);
    eval("(" + localStorage.getItem('Authorization') + ")");
    $.ajax({
        headers: {
            "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
        },
        url: "http://cinscby.natapp1.cc/article/insertArticle",
        type: "post",
        dataType: "json",
        data: {
            digest : getString(document.getElementsByClassName('ck-content')[0].innerText,25),
            title  : $('#title')[0].value,
            tagsId : $('#recipient-name')[0].value,
            typeId : $('#message-text')[0].value,
            article: document.getElementsByClassName('ck-content')[0].innerHTML,
            author : $('#author')[0].value,
        },
        success: function(data) {
            console.log(data);
            var a = data['code'];
            var b = data['msg'];
            if (a == 0) {
                swal("成功提醒", b, "success");
            } else {
                swal("错误提醒", b, "warning");
            }
        },
        error: function() {
            swal("错误提醒", "请确认后重试", "warning");
        }
    })
}

function getString(s,n){
    s =  delHtmlTag(s);  //html替换
    if(s.length > n){
        return s.substring(0,n);
    }
    return s;
}

function delHtmlTag(str)
{
    return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}
