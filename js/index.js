window.onload = function () {
    $.ajax({
        headers: {
            "Authorization": eval("(" + localStorage.getItem('Authorization') + ")")
        },
        url: "http://cinscby.natapp1.cc/article/selectAll",
        type: "get",
        dataType: "json",
        data: {
            pageNum:1,
            pageSize:6,
        },
        success: function(data) {
            console.log(data);
            var a = data['code'];
            var b = data['msg'];
            var c = data['data'];
            var d = c['list'];
            var blogContainer = document.getElementById("blogContainer");
            if (a == 0) {
                console.log(c['list']);
                for(var i = 0;i<d.length;i++){
                    var bigDiv = document.createElement("div");
                    bigDiv.setAttribute("class","col-lg-4 col-md-6 col-12 portfolio-item portfolio-filter-graphic portfolio-filter-design");
                    var article = document.createElement("article");
                    article.setAttribute("class","blog-item sticky");
                    var header = document.createElement("header");
                    header.setAttribute("class","blog-item-header");
                    var a1 = document.createElement("a");
                    a1.setAttribute("href","blog-details.html?"+"blogId="+d[i]['blogId']);
                    var h2 = document.createElement("h2");
                    h2.innerText = d[i]['title'];
                    a1.appendChild(h2);
                    header.appendChild(a1);
                    var smallDiv = document.createElement("div");
                    smallDiv.setAttribute("class","blog-item-body");
                    var h6 = document.createElement("h6");
                    h6.setAttribute("class","blog-item-title");
                    h6.innerText = "文章类型："+d[i]['typeMsg']+" "+" "+" "+"标签："+d[i]['tagsMsg'];
                    var p = document.createElement("p");
                    p.innerText = d[i]['digest'];
                    smallDiv.appendChild(h6);
                    smallDiv.appendChild(p);
                    var footer = document.createElement("footer");
                    footer.setAttribute("class","blog-item-footer");
                    var ul = document.createElement("ul");
                    ul.setAttribute("class","blog-item-meta");
                    var li1 = document.createElement("li");
                    var li2 = document.createElement("li");
                    var li3 = document.createElement("li");
                    var i1 = document.createElement("i");
                    i1.setAttribute("class","fa fa-user-o");
                    var i2 = document.createElement("i");
                    i2.setAttribute("class","fa fa-calendar-o");
                    var i3 = document.createElement("i");
                    i3.setAttribute("class","fa fa-comments-o");
                    var a2 = document.createElement("a");
                    a2.setAttribute("href","#");
                    a2.innerText = d[i]['author'];
                    var a3 = document.createElement("a");
                    a3.setAttribute("href","#");
                    a3.innerText = d[i]['commentSum']+" Comments";
                    li1.appendChild(i1);
                    li1.append("By ");
                    li1.appendChild(a2);
                    li2.appendChild(i2);
                    li2.append(d[i]['creatTime']);
                    li3.setAttribute("style","margin-right: 0");
                    li3.appendChild(i3);
                    li3.appendChild(a3);
                    ul.appendChild(li1);
                    ul.appendChild(li2);
                    ul.appendChild(li3);
                    footer.appendChild(ul);
                    article.appendChild(header);
                    article.appendChild(smallDiv);
                    article.appendChild(footer);
                    bigDiv.appendChild(article);
                    blogContainer.appendChild(bigDiv);
                    var clearDiv = document.createElement("div");
                    clearDiv.setAttribute("style","clear:both");
                    blogContainer.appendChild(clearDiv);
                    blogContainer.style.height = "100%";
                };
            } else {
                swal("错误提醒", b, "warning");
            }
        },
        error: function() {
            swal("错误提醒", "请确认后重试", "warning");
        }
    })
};