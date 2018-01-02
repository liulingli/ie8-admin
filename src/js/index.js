$(function(){
    createMenu(); //初始化菜单
    //监听hashChange事件

    onHashChange();//刷新页面

    $(window).off("hashchange");
    $(window).on("hashchange",function(){
        onHashChange();
    });

    function onHashChange(){
        //getParam获得链接中XX的参数值
        var method = getParam("method");//获得链接中"method"的值
        var page = getParam("page");//获得连接中"page"的值
        if(method && page ){
            $("#menu li").removeClass("selected");
            $("[data-url='" + page + "']").addClass("selected");
            $.ajax({
                method :"get",
                url: page,
                beforeSend:function(){
                    showLoading()
                },
                success : function(response){
                    $("#main-content").html(response);
                    eval(method+"()");
                    hideLoading()
                },
                error : function(error){
                    if(error.status == 404){
                        $("#main-content").html("<p>正在开发中</p>");
                    }
                    hideLoading();
                }
            });
        }
    }
    $("body").off("click","#unfoldControl");
    $("body").on("click","#unfoldControl",function(){
         $("#app").toggleClass("collapse");
    })

    $(window).off("resize");
    $(window).on("resize",function(){
        getFormWidth();
    })
});