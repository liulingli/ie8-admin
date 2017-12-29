/**
 * @method 封装ajax 请求
 * @param json
 */
function fetchAjax(json){
    var newJson = jQuery.extend(true, {}, json);
    if(json.method == "delete" || json.method == "DELETE"|| json.type == "delete" || json.type == "DELETE"){
        newJson.url = json.url+"&token="+window.LS.get("token");
    }else{
        newJson.data.token = window.LS.get("token");
    }
    newJson.beforeSend = function(xhr){
        xhr.setRequestHeader('token',window.LS.get("token"));
        if(json.url != AJAX_URL + "/chat/list" && json.url != AJAX_URL + "/mentor/meeting/check/state"){ //主题聊天记录不需要展示loading
            showLoading();
        }
    };
    newJson.error = function(xhr,status,error){
        hideLoading();
        console.log(xhr,status,error)
        var responseJSON = xhr.responseText==""?{}:JSON.parse(xhr.responseText);
        if(xhr.status == 500 && responseJSON.message != "无效token禁止访问"){
            alert(xhr.statusText);
            return;
        }
        if(xhr.status == 0 || xhr.status == 502){
            alert("与服务器的连接中断，请尝试重新登录后操作");
            return;
        }
        if(responseJSON.message == "无效token禁止访问"){
            window.LS.clear();
            window.LS.set("invalidToken","invalidToken");
            window.location.href = window.domainName + "pages/login.html";
        }else{
            alert(responseJSON.message);
        }
        if(json.error){
            json.error(xhr,status,error);
        }
    };
    newJson.success = function(response,textStatus, request){
        //新获取token值，更改
        var token = request.getResponseHeader("token");
        if(token){
            window.LS.set("token",token);
            window.LS.set("invalidToken","")
        }
        json.success(response,textStatus, request);
        hideLoading();
    };
    $.ajax(newJson);
}

/**
 * @method 显示正在加载动画
 */
function showLoading(){
    var loadingHtml = "<div id='loading'>" +
        "<div class='loading-content'>" +
        "<img src='images/Ellipsis.svg' />" +
        "<p>正在加载中...</p>" +
        "</div>" +
        "</div>";
    if($("#loading").length==0){
        $("#main-content").append(loadingHtml);
    }else{
        $("#loading").show();
    }
}

/**
 * @method 隐藏正在加载动画
 */
function hideLoading(){
    $("#loading").hide();
}

/**
 * @method 判断数组中是否存在某个数，数组内可以是json
 * @param item 数组中的项
 * @param array 数组
 * @param callback 比较方法
 */
function isInArray(item,array,callback){
    for(var i=0;i<array.length;i++){
        if( typeof callback === 'function' ){
            if(callback(item) === callback(array[i])){
                return true;
            }
        }else{
            if(item === array[i]){
                return true;
            }
        }
    }
    return false;
}

/**
 * @method 数组中如果存在某个数（可以是json），删除
 * @param item 数组中的项
 * @param array 数组
 * @param callback 比较方法
 */

function deleteArray(item,array,callback){
    for(var i=0;i<array.length;i++){
        if( typeof callback === 'function' ){
            if(callback(item) === callback(array[i])){
                return true;
            }
        }else{
            if(item === array[i]){
                return true;
            }
        }
    }
    return false;
}

/**
 * @method 获取hash参数
 * @param name 参数名
 * @return 返回参数值，如果没有返回null
 **/
function getParam(name){
    var hash = window.location.hash;
    var regExp = new RegExp('([#]|&)' + name + '=([^&]*)(&|$)');
    var result = hash.match(regExp);
    if (result) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}

/**
 * @method 对Date的扩展，将 Date 转化为指定格式的String
 * @param fmt 格式 例 'YYYY-MM-DD HH:mm:ss'
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "D+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * @method 将字符串日期转换成Date类型
 * @returns {Date}
 */
String.prototype.stringToDate = function(){
    return new Date(Date.parse(this.replace(/-/g, "/")));
}

/**
 * @method 判断浏览器
 * @returns {*}
 */
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {//判断是否Opera浏览器
        return "Opera"
    }
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    } //判断是否IE浏览器
}

/**
 * @method 计算文件大小
 * @param limit
 * @returns {string}
 */
function conver(limit){
    var size = "";
    if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    }else{ //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if(dec == "00"){//当小数点后为00时 去掉小数部分
        return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
    }
    return sizestr;
}

/**
 * @method 插入字符
 * @param html 插入字符
 */
function insertHtmlAtCaret(html,$input) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            var startContainer = range.startContainer;
            var parentElement = startContainer.parentElement;
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        console.log("ie9 range",document.selection.createRange());
        document.selection.createRange().pasteHTML(html);
    }
}


/**
 * @method 判断光标是否在指定输入框
 * @return BOOL
 */
function isInCursor(){
    var sel, range;
    var bool = true;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var startContainer = range.startContainer;
            var parentElement = startContainer.parentElement;
            if(!($(parentElement).hasClass("input-box")||$(startContainer).hasClass("input-box"))){
                bool = false;
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        var parentElement = document.selection.createRange().parentElement();
        if(!$(parentElement).hasClass("input-box")){
            bool = false;
        }
    }
    return bool;
}

/**
 * @method div(contenteditable = "true")光标移动到末尾
 * @method obj
 */
function cursorMoveToEnd(obj) {
    if (window.getSelection) {//ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection();//创建range
        range.selectAllChildren(obj);//range 选择obj下所有子内容
        range.collapseToEnd();//光标移至最后
    }
    else if (document.selection) {//ie10 9 8 7 6 5
        var range = document.selection.createRange();//创建选择对象
        range.moveToElementText(obj);//range定位到obj
        range.collapse(false);//光标移至最后
        range.select();
    }
}
