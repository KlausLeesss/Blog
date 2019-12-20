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
                var p1 = document.createElement("p");
                a1.innerText = a['commentList'][i]['userName'];
                a2.setAttribute("class","reply-button");
                a2.setAttribute("style","position: absolute;right: 0px");
                a2.innerText = "REPLY";
                h6.appendChild(a1);
                p1.innerText = " - "+a['commentList'][i]['creatTime'];
                var p = document.createElement("p");
                p.innerText = a['commentList'][i]['commentMsg'];
                contentTopDiv.appendChild(h6);
                contentTopDiv.appendChild(p1);
                contentTopDiv1.appendChild(a2);
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
                            var Rp1 = document.createElement("p");
                            Rp1.innerText = " - "+a['commentList'][i]['replyVO'][n]['creatTime'];
                            Ra1.innerText = a['commentList'][i]['replyVO'][n]['userName'];
                            Ra3.innerText = " @ " + a['commentList'][i]['replyVO'][n]['replyUserName'];
                            Ra2.setAttribute("class","reply-button");
                            Ra2.setAttribute("style","position: absolute;right: 0");
                            Ra2.innerText = "REPLY";
                            Rh6.appendChild(Ra1);
                            Rh6.appendChild(Ra3);
                            var Rp = document.createElement("p");
                            Rp.innerText = a['commentList'][i]['replyVO'][n]['commentMsg'];
                            contentTopRDiv.appendChild(Rh6);
                            contentTopRDiv.appendChild(Rp1);
                            contentTopRDiv1.appendChild(Ra2);
                            contentRDiv.appendChild(contentTopRDiv);
                            contentRDiv.appendChild(Rp);
                            contentRDiv.appendChild(contentTopRDiv1);
                            commentRDiv.appendChild(imgRDiv);
                            commentRDiv.appendChild(contentRDiv);
                            commentListDiv.appendChild(commentRDiv);
                        }
                }
            }


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
                replyUserId :'',
                pid         :0
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

// <input class="button" onclick="insertComment()" value="SEND COMMENT" style="font-family:Dosis, sans-serif;width: 157px;height: 45px">


