/**
 * @method  生成菜单
 */
function createMenu(){
   var MENU = config.ADMIN_MENU_ARRAY;
   var menuHtml = "";
   for(var i=0; i<MENU.length; i++){
      if(MENU[i].children){
          var children = MENU[i].children;
          menuHtml += "<li class='menu-sub'>"
                   +  "<div class='menu-sub-title'><span><i class='anticon'>"+MENU[i].icon+"</i><span class='text'>"+MENU[i].text+"</span></span><i class='anticon anticon-arrow'></i></div>"
                   +  "<ul class='menu-sub-content'>"
          for(var j=0;j<children.length;j++){
              menuHtml += "<li data-url='" +children[j].url +"' data-method='"+children[j].method+ "'>"
                       +  "<span>" + children[j].text + "</span>"
                       +  "</li>"
          }
          menuHtml += "</ul>";
      }else{
          menuHtml += "<li data-url='" +MENU[i].url +"' data-method='"+MENU[i].method+ "'>"
                   +  "<i class='anticon'>" + MENU[i].icon + "</i>"
                   +  "<span class='text'>" + MENU[i].text + "</span>"
                   +  "</li>"
      }
   }
   $("#menu").html(menuHtml);

   //菜单绑定方法
    $("body").off("click","#menu li");
    $("body").on("click","#menu li",function (e) {
        e.stopPropagation();
        //判断是否有二级菜单
        if($(this).hasClass("menu-sub")){
            var isOpen = $(this).hasClass("open");
            if(isOpen){
                $(this).removeClass("open")
            }else{
                $(this).addClass("open")
            }
        }else{
            $("#menu li").removeClass("selected");
            var url = $(this).attr("data-url"); //attr() 方法设置或返回被选元素的属性值
            var method=$(this).attr("data-method");//获得函数名的字符串
            if (url) {
                if(window.location.hash == "#method="+ method +"&page="+url){
                    // eval(method+"()");
                }
                window.location.hash = "method="+ method +"&page="+url;
                $(this).addClass("selected")
            }
        }
    });
}



