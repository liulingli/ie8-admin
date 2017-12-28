/**
 * Created by liulingli on 2017/12/27
 * description
 */
var config = {
    baseUrl : "<%=baseUrl%>",
    ADMIN_MENU_ARRAY : [{ //管理员菜单
        url:  "componentHtml/dashboard.html",
        icon: "&#xe60c;",
        text: "主页",
        method:"userManagement"
    },{ //管理员菜单
        url:  "componentHtml/userManagement.html",
        icon: "&#xe618;",
        text: "用户管理",
        method:"userManagement"
    }, {
        url: "componentHtml/analysisManage.html",
        icon: "&#xe601;",
        text: "统计分析",
        method:"analysisManage"
    }]
};