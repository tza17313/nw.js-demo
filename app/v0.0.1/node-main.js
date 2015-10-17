/*
 @name: node-main.js
 @description: 客户端 异常捕获
 @date: 2015/10/17
 @author: Nero(Nero@nero-zou.com)
 */
var hasSaved={};//是否已经触发过这个错误
process.on("uncaughtException", function (e) {
    var errText=e.stack;
    var fs = require('fs');
    var md5 = require('MD5');
    var key=md5(errText);

    if(hasSaved[key]){
        return;
    }
    if(window && window.localStorage){
        var historyError=window.localStorage.getItem('_uncaughtException_'+key);
        if(historyError!=null){
            return;//曾经触发过这个BUG 忽略
        }
    }
    if(errText.match(/dns.js|net.js/)!=null){
        return;//网络原因引起的BUG 忽略
    }

    hasSaved[key]=true;
    if(window && window.localStorage){
        var historyError=window.localStorage.setItem('_uncaughtException_'+key,errText);
    }
    var nwPath = process.cwd();
    var date = new Date();
    var errText = "\r\n## 日期：" + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() +
        "\r\n##### 客户端版本： V" + process._nw_app.manifest.version +
        "\r\n##### 错误详情： \r\n```javascript\r\n" + errText + "\r\n```\r\n";
    fs.appendFile(nwPath + '/errorLogs.md', errText, function (err) {
        if (err) throw err;
    });
});
