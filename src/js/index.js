$(function(){
    var user = window.LS.get("user");
    console.log("进入页面")
    if(!user){
       window.location.href = "../user/login.html";
       return;
    }
    //初始化菜单
    createMenu();

    //获取菜单路由对应文本
    var menuUrlToText = JSON.parse(window.LS.get("menuUrlToText"));

    //刷新页面
    onHashChange();

    //监听hashChange事件
    $(window).off("hashchange");
    $(window).on("hashchange",function(){
        onHashChange();
    });
    /**
     * @method hash改变时切换
     */
    function onHashChange(){
        //getParam获得链接中XX的参数值
        var method = getParam("method");//获得链接中"method"的值
        var page = getParam("page");//获得连接中"page"的值
        var $curLi =  $("[data-url='" + page + "']");

        if(method && page && $curLi.length >0){
            $("#menu li").removeClass("selected");
            $curLi.addClass("selected");
            //如果存在父菜单则需要展开
            if($curLi.parents(".menu-sub").length > 0 ){
                $curLi.parents(".menu-sub").addClass("open")
            }
            $("#curNav").attr({"to":page,method:method}).html(menuUrlToText[page]);
            $.ajax({
                method :"get",
                url: page,
                beforeSend:function(){
                    showLoading()
                },
                success : function(response){
                    $("#main-content").html(response);
                    try{
                        selectivizr(window); //css3伪类选择符兼容ie8
                    }catch(error){}
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
        }else{
            $("#main-content").html("<p>页面不存在</p>");
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