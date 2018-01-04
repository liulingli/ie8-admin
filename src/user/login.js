$(function(){
    //绑定tabs切换
    $("body").on("click",".ant-tabs-tab",function(){
        var index = $(this).index();
        $(this).addClass("ant-tabs-tab-active").siblings().removeClass("ant-tabs-tab-active");
        $(this).parents(".antd-tabs").find(".antd-tabs-tabpanel").eq(index).addClass("antd-tabs-tabpanel-active").siblings().removeClass("antd-tabs-tabpanel-active");
    })
})