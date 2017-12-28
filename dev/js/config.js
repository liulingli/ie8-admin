/**
 * Created by liulingli on 2017/12/27
 * description
 */
var config = {
    baseUrl : "/dev",
    ADMIN_MENU_ARRAY : [{ //管理员菜单
        url:  "componentHtml/userManagement.html",
        icon: "glyphicon-user",
        text: "用户管理",
        method:"userManagement"
    }, {
        url: "componentHtml/analysisManage.html",
        icon: "glyphicon-stats",
        text: "统计分析",
        method:"analysisManage"
    }]
};