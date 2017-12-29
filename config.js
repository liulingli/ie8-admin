/**
 * Created by liulingli on 2017/12/27
 * description
 */
var config = {
    baseUrl : "<%=baseUrl%>",
    ADMIN_MENU_ARRAY : [{
        url:  "componentHtml/dashboard.html",
        icon: "&#xe60c;",
        text: "主页",
        method:"dashboard"
    },{
        text:'详情页',
        icon: "&#xe606;",
        children: [
            {
                url:  "componentHtml/baseDetail.html",
                text: "基础详情页",
                method:"baseDetail"
            }, {
                url:  "componentHtml/advancedDetail.html",
                text: "高级详情页",
                method:"advancedDetail"
            }
        ]
    },{
        url:  "componentHtml/tableList.html",
        icon: "&#xe617;",
        text: "查询表格",
        method:"tableList"
    }, {
        url: "componentHtml/analysisManage.html",
        icon: "&#xe601;",
        text: "统计分析",
        method:"analysisManage"
    }]
};