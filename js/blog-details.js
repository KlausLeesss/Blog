window.onload = function () {
    console.log(UrlParm.parm("blogId"));
    $.ajax({
        headers: {
            "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
        },
        url: "http://cinscby.natapp1.cc/article/getDetail",
        type: "post",
        dataType: "json",
        data: {
            blogId:UrlParm.parm("blogId"),
        },
        success: function(data) {
            console.log(data);
            var a = data['data'];
            document.getElementById("title").innerText = a['title'];
            document.getElementById("theMainBlog").innerHTML = a['article'];
            document.getElementById("authorA").innerText = a['author'];
            document.getElementById("commentA").innerText = a['comments'];
            document.getElementById("dateLi").append(a['creatTime']);
            document.getElementById("likeA").innerText = a['likes'];
            document.getElementById("likeLi").append(" likes");
            document.getElementById("readLi").append(a['reading']+" reading");
        },
        error: function() {
            alert("失败，请稍后再试");
        }
    });
};

UrlParm = function() { // url参数
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

function changeLike(){
    var i = document.getElementById("heart");
    var likeA = document.getElementById("likeA");
    if(i.className === "fa fa-heart"){
        i.className = "fa fa-heart-o";
        document.getElementById("likeA").innerText = parseInt(likeA.innerText)-1;
    }
    else {
        i.className = "fa fa-heart";
        console.log(parseInt(likeA.innerText)+1);
        document.getElementById("likeA").innerText = parseInt(likeA.innerText)+1;
    }
}


