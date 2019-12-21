window.onload = function () {
    console.log(UrlParm.parm("blogId"));
    $.ajax({                                        //获取指定博客详情
        headers: {
            "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
        },
        url: "http://cinscby.natapp1.cc/article/getDetail",
        type: "get",
        dataType: "json",
        data: {
            blogId:UrlParm.parm("blogId"),
        },
        success: function(data) {
            console.log(data);
            var a = data['data'];
            var commentListDiv = document.getElementById("commentListDiv");


            var ii = document.getElementById("heart");//点赞按钮初始化
            if(a['isLike'] === false){
                ii.className = "fa fa-heart-o";
            }
            else{
                ii.className = "fa fa-heart";
            }


            console.log(a['commentList']);
            document.getElementById("title").innerText = a['title'];
            document.getElementById("theMainBlog").innerHTML = a['article'];
            document.getElementById("authorA").innerText = a['author'];
            document.getElementById("commentA").innerText = a['comments'];
            document.getElementById("dateLi").append(a['creatTime']);
            document.getElementById("likeA").innerText = a['likes'];
            document.getElementById("likeLi").append(" likes");
            document.getElementById("readLi").append(a['reading']+" reading");
            for(var i = 0;i<a['commentList'].length;i++) {          //动态生成父级评论
                var commentDiv = document.createElement("div");
                commentDiv.setAttribute("class", "single-comment");
                var imgDiv = document.createElement("div");
                imgDiv.setAttribute("class", "single-comment-thumb");
                var imgHead = document.createElement("img");
                imgHead.setAttribute("src", "http://cinscby.natapp1.cc" + a['commentList'][i]['headPortrait']);
                imgHead.setAttribute("alt","hastech logo");
                imgDiv.appendChild(imgHead);
                var contentDiv = document.createElement("div");
                contentDiv.setAttribute("class","single-comment-content");
                contentDiv.setAttribute("style","width:100%");
                var contentTopDiv = document.createElement("div");
                contentTopDiv.setAttribute("class","single-comment-content-top");
                var contentTopDiv1 = document.createElement("div");
                contentTopDiv1.setAttribute("class","single-comment-content-top");
                contentTopDiv1.setAttribute("style","position: relative;height: 29px");
                var h6 = document.createElement("h6");
                var a1 = document.createElement("a");
                var a2 = document.createElement("a");
                var a3 = document.createElement("a");
                a3.setAttribute("style","display:none");
                var a4 = document.createElement("a");
                a4.setAttribute("style","display:none");
                a3.innerHTML = a['commentList'][i]['userId'];
                a4.innerHTML = a['commentList'][i]['commentId'];
                var p1 = document.createElement("p");
                a1.innerText = a['commentList'][i]['userName'];
                a2.setAttribute("class","reply-button");
                a2.setAttribute("style","position: absolute;right: 0px;color:white");
                a2.addEventListener("click", insertSecCom);
                a2.innerText = "REPLY";
                h6.appendChild(a1);
                p1.innerText = " - "+a['commentList'][i]['creatTime'];
                var p = document.createElement("p");
                p.innerText = a['commentList'][i]['commentMsg'];
                contentTopDiv.appendChild(h6);
                contentTopDiv.appendChild(p1);
                contentTopDiv1.appendChild(a2);
                contentTopDiv1.appendChild(a3);
                contentTopDiv1.appendChild(a4);
                contentDiv.appendChild(contentTopDiv);
                contentDiv.appendChild(p);
                contentDiv.appendChild(contentTopDiv1);
                commentDiv.appendChild(imgDiv);
                commentDiv.appendChild(contentDiv);
                commentListDiv.appendChild(commentDiv);
                if(a['commentList'][i]['replyVO']!==''){            //动态生成子级评论
                        for(var n = 0;n<a['commentList'][i]['replyVO'].length;n++){
                            var commentRDiv = document.createElement("div");
                            commentRDiv.setAttribute("class", "single-comment single-comment-reply");
                            commentRDiv.setAttribute("style", "margin-left: 90px");
                            var imgRDiv = document.createElement("div");
                            imgRDiv.setAttribute("class", "single-comment-thumb");
                            var imgRHead = document.createElement("img");
                            imgRHead.setAttribute("src", "http://cinscby.natapp1.cc" + a['commentList'][i]['replyVO'][n]['headPortrait']);
                            imgRHead.setAttribute("alt","hastech logo");
                            imgRDiv.appendChild(imgRHead);
                            var contentRDiv = document.createElement("div");
                            contentRDiv.setAttribute("class","single-comment-content");
                            contentRDiv.setAttribute("style","width:100%;padding: 10px");
                            var contentTopRDiv = document.createElement("div");
                            contentTopRDiv.setAttribute("class","single-comment-content-top");
                            contentTopRDiv.setAttribute("style","height: 33px");
                            var contentTopRDiv1 = document.createElement("div");
                            contentTopRDiv1.setAttribute("class","single-comment-content-top");
                            contentTopRDiv1.setAttribute("style","position: relative;height: 29px");
                            var Rh6 = document.createElement("h6");
                            var Ra1 = document.createElement("a");
                            var Ra2 = document.createElement("a");
                            var Ra3 = document.createElement("a");
                            var Ra4 = document.createElement("a");
                            Ra4.setAttribute("style","display:none");
                            var Ra5 = document.createElement("a");
                            Ra5.setAttribute("style","display:none");
                            Ra4.innerHTML = a['commentList'][i]['replyVO'][n]['userId'];
                            Ra5.innerHTML = a['commentList'][i]['replyVO'][n]['commentId'];
                            var Rp1 = document.createElement("p");
                            Rp1.innerText = " - "+a['commentList'][i]['replyVO'][n]['creatTime'];
                            Ra1.innerText = a['commentList'][i]['replyVO'][n]['userName'];
                            Ra3.innerText = " @ " + a['commentList'][i]['replyVO'][n]['replyUserName'];
                            Ra2.setAttribute("class","reply-button");
                            Ra2.setAttribute("style","position: absolute;right: 0;color:white");
                            Ra2.addEventListener("click", insertSecCom);
                            Ra2.innerText = "REPLY";
                            Rh6.appendChild(Ra1);
                            Rh6.appendChild(Ra3);
                            var Rp = document.createElement("p");
                            Rp.innerText = a['commentList'][i]['replyVO'][n]['commentMsg'];
                            contentTopRDiv.appendChild(Rh6);
                            contentTopRDiv.appendChild(Rp1);
                            contentTopRDiv1.appendChild(Ra2);
                            contentTopRDiv1.appendChild(Ra4);
                            contentTopRDiv1.appendChild(Ra5);
                            contentRDiv.appendChild(contentTopRDiv);
                            contentRDiv.appendChild(Rp);
                            contentRDiv.appendChild(contentTopRDiv1);
                            commentRDiv.appendChild(imgRDiv);
                            commentRDiv.appendChild(contentRDiv);
                            commentListDiv.appendChild(commentRDiv);
                        }
                }
            }
            var CountDiv = document.createElement("div");
            CountDiv.setAttribute("class","xxx");
            commentListDiv.appendChild(CountDiv);


        },
        error: function() {
            alert("失败，请稍后再试");
        }
    });
};

UrlParm = function() { // 获取url中的参数
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof(p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [p[1]];
                    } else if (typeof(index[p[0]]) == 'undefined') { // c=aaa
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()
        parm : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        parmValues : function(o) { //  o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {}
        },
        //是否含有parmName参数
        hasParm : function(parmName) {
            return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        parmMap : function() {
            var map = {};
            try {
                for (var p in index) {  map[p] = data[index[p]];  }
            } catch (e) {}
            return map;
        }
    }
}();

function changeLike(){                  //点赞功能
    var i = document.getElementById("heart");
    var likeA = document.getElementById("likeA");
    if(i.className === "fa fa-heart"){
        i.className = "fa fa-heart-o";
        document.getElementById("likeA").innerText = parseInt(likeA.innerText)-1;
        $.ajax({
            headers: {
                "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
            },
            url: "http://cinscby.natapp1.cc/article/giveLike",
            type: "get",
            dataType: "json",
            data: {
                blogId:UrlParm.parm("blogId"),
                isLike:false,
            },
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
    else {
        i.className = "fa fa-heart";
        document.getElementById("likeA").innerText = parseInt(likeA.innerText)+1;
        $.ajax({
            headers: {
                "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
            },
            url: "http://cinscby.natapp1.cc/article/giveLike",
            type: "get",
            dataType: "json",
            data: {
                blogId:UrlParm.parm("blogId"),
                isLike:true,
            },
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
}

function insertComment() {
    console.log(document.getElementById("new-review-textbox").value);
    console.log(eval("(" + localStorage.getItem('Authorization') + ")"));
    if(document.getElementById("new-review-textbox").value === ''){
        alert("评论不可为空");
    }
    else if(eval("(" + localStorage.getItem('Authorization') + ")") === null){
        alert("用户未登录不可评论");
    }
    else{
        $.ajax({
            headers: {
                "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
            },
            url: "http://cinscby.natapp1.cc/comment/insert",
            type: "post",
            dataType: "json",
            data: {
                blogId      :UrlParm.parm("blogId"),
                commentMsg  :document.getElementById("new-review-textbox").value,
                replyUserId :"",
                pid         :0,
            },
            success: function(data) {
                console.log(data);
                var commentListDiv = document.getElementById("commentListDiv");
                var commentDiv = document.createElement("div");
                commentDiv.setAttribute("class", "single-comment");
                var imgDiv = document.createElement("div");
                imgDiv.setAttribute("class", "single-comment-thumb");
                var imgHead = document.createElement("img");
                imgHead.setAttribute("src", "http://cinscby.natapp1.cc"+window.localStorage.getItem("headPortrait").replace(/^\"|\"$/g,''));
                imgHead.setAttribute("alt","hastech logo");
                imgDiv.appendChild(imgHead);
                var contentDiv = document.createElement("div");
                contentDiv.setAttribute("class","single-comment-content");
                contentDiv.setAttribute("style","width:100%");
                var contentTopDiv = document.createElement("div");
                contentTopDiv.setAttribute("class","single-comment-content-top");
                var contentTopDiv1 = document.createElement("div");
                contentTopDiv1.setAttribute("class","single-comment-content-top");
                contentTopDiv1.setAttribute("style","position: relative;height: 29px");
                var h6 = document.createElement("h6");
                var a1 = document.createElement("a");
                var a2 = document.createElement("a");
                var a3 = document.createElement("a");
                a3.setAttribute("style","display:none");
                var a4 = document.createElement("a");
                a4.setAttribute("style","display:none");
                var p1 = document.createElement("p");
                a1.innerText = eval("(" + localStorage.getItem('username') + ")").replace(/^\"|\"$/g,'');
                a2.setAttribute("class","reply-button");
                a2.setAttribute("style","position: absolute;right: 0px;color:white");
                a2.addEventListener("click", insertSecCom);
                a2.innerText = "REPLY";
                h6.appendChild(a1);
                p1.innerText = " - "+CurentTime();
                var p = document.createElement("p");
                p.innerText = document.getElementById("new-review-textbox").value;
                contentTopDiv.appendChild(h6);
                contentTopDiv.appendChild(p1);
                contentTopDiv1.appendChild(a2);
                contentTopDiv1.appendChild(a3);
                contentTopDiv1.appendChild(a4);
                contentDiv.appendChild(contentTopDiv);
                contentDiv.appendChild(p);
                contentDiv.appendChild(contentTopDiv1);
                commentDiv.appendChild(imgDiv);
                commentDiv.appendChild(contentDiv);
                commentListDiv.appendChild(commentDiv);
                document.getElementById("new-review-textbox").value = "";
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
}


function insertSecCom(e) {
    console.log(e.target.nextElementSibling.innerText);
    console.log(e.target.nextElementSibling.nextElementSibling.innerText);
    var k = document.createElement("div");
    k.setAttribute("class","replyBox")
    k.innerHTML = "<form action=\"#\" class=\"karigor-form single-comment-content\" style=\"text-align: right\">\n" +
        "                <div class=\"karigor-form-inner\">\n" +
        "                    <div class=\"karigor-form-input\" style=\"margin-top: 0\">\n" +
        "                        <textarea cols=\"30\" rows=\"5\" placeholder=\"Comment\" style=\"max-height: 50px;min-height: 50px\"></textarea>\n" +
        "                    </div>\n" +
        "                    <div class=\"karigor-form-input\" style=\"margin-top: 0;margin-bottom: 10px\">\n" +
        "                        <input  type=\"button\" value=\"SEND REPLY\" style=\"font-family:Dosis, sans-serif;height: 33px;background-color: #555;border: 1px solid #555;color:#FFF;font-size: 14px;font-weight: 700\">\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </form>";

    if(e.target.parentElement.parentElement.parentElement.nextElementSibling.className !== "replyBox") {
        e.target.parentElement.parentElement.parentElement.after(k);
    }
    else if(e.target.parentElement.parentElement.parentElement.nextElementSibling.className === "replyBox"){
        e.target.parentElement.parentElement.parentElement.nextElementSibling.remove();
    }
}

function CurentTime() {
    var now = new Date(); //获取时间
    var date_time = Array(); //定义数组
    var status = 0; //状态
    var clock;
    date_time.push(now.getFullYear()); //年
    date_time.push(now.getMonth() + 1); //月
    date_time.push(now.getDate()); //日
    date_time.push(now.getHours()); //时
    date_time.push(now.getMinutes()); //分
    do {
        if (status > 0 && status <= 2) {//处理月日
            if (date_time[status] < 10) {
                clock += "0";
            }
            if (status < 2) {
                str = '-';
            } else {
                str = ' ';
            }
            clock += date_time[status] + str;
        } else if (status > 2 && status <= 4) {//处理时分秒
            if (date_time[status] < 10) {
                clock += "0";
            }
            if (status < 4) {
                str = ':';
            } else {
                str = ' ';
            }
            clock += date_time[status] + str;
        } else {//处理年
            clock = date_time[status] + "-";
        }
        status++;
    } while (status <= 4);

    return clock;
}