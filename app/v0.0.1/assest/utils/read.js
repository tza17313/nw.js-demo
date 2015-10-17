/*
 @name: read.js
 @description: 获取网页，正文内容工具函数
 @date: 2015/10/17
 @author: Nero(Nero@nero-zou.com)
 */
var Read = _Read();
function _Read() {
    var Read = {};
    var node_read = require('node-read');
    Read.getPage = getPage;

    /**
     * 获取网页正文
     * @param url
     */
    function getPage(url) {

        return new Promise(function (resolve, reject) {
            node_read(url, function (err, article, res) {

                if(err){
                    reject(err);
                    return;
                }

                resolve(article);

            });
        });

    }

    return Read;
}