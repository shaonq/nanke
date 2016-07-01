/*mysql
var mysql = require('mysql');
var mysql_config ={ host: 'localhost', user: 'root', password: '', database:'yy_jiangnan', port: 3306 };
 */
var fs = require("fs");
module.exports = {
    index: function (req, res, next) {
        var data = {
            diy: {
                title: "自定义组件"
                , data: [
                    {name: "date 小型日历插件", url: "/date", bgColor: "#5C6BC0"}
                    , {name: "search 异步搜索插件", url: "/search", bgColor: "#8bc34a"}
                    , {name: "chat 简易聊天插件", url: "/chat", bgColor: "#32DF83"}
                    , {name: "fix 右下角浮动工具", url: "/nk#fix", bgColor: "#7DB9DE"}
                ]
            }
            , pc: {
                title: "第三方组件 - PC"
                , data: [
                    {name: "Query API 中文文档", url: "http://www.css88.com/jqapi-1.9/", bgColor: "#0769ad"}

                ]
            }
            , mobile: {
                title: "第三方组件 - MOBILE"
                , data: [
                    {name: "Zepto API 中文文档", url: "http://www.runoob.com/manual/zeptojs.html", bgColor: "#724dff"}
                    , {name: "WeUI 微信组件", url: "http://lihongxun945.github.io/jquery-weui/", bgColor: "#00c000"}
                ]
            }
            , node: {
                title: "笔记本"
                , data: [
                    {name: "nodeJS  by mcwm", url: "/nodejs", bgColor: "#03a9f4"}
                ]
            }
        };
        data.cookies = req.cookies;
        res.render('index', data);
    }
    , demo: function (req, res) {
        res.render('demo');
    }
    ,chat:function (req,res) {
        var data = {};data.lib = {
            title: "search 简易聊天插件",
            baseUrl: "/chat"
        };
        var WebSocket = require("../models/WebSocket");
        res.render('jsapi/chat', data);
    }
    ,upload:function (req, res) {
        var data ={status:4};
        if(req.files&&req.files.file){
            var d =req.files.file;
            var file = "./public",newPath = "/uploads/"+(new Date()/1)+d.name;
            try{
                fs.renameSync(d.path, file+newPath);
                data.status = 0;
                data.url = newPath;
            }catch(e){
                data.errpr = "文件移动失败";
            }
        }
        res.json(data);
    }
    ,nodejs:function(req, res, next) {
        var data ={};data.lib={
            title:"search 简易聊天插件",
            baseUrl:"/chat"
        };
        res.render('jsapi/nodejs',data);
    }
    ,dateJson:function (req, res, next) {
        res.json({ "status":0, "data":["2016-06-01", "2016-07-01", "2016-08-01", "2016-09-01", "2016-10-01", "2016-11-01", "2016-12-01"]});
    }
    ,date: function(req, res, next) {
        var data ={};data.lib={
            title:"小型日历插件 data.js",
            baseUrl:"/data"
        };
        res.render('jsapi/data',data);
    }
    ,searchJson:function (req, res, next) {
        res.json({"status": 0,"data": [[req.body.name+"1",req.body.name+"read1"],[req.body.name+"2",req.body.name+"read2"],[req.body.name+"3",req.body.name+"read3"]]})
    }
    ,search:function(req, res, next) {
        var data ={};data.lib={
            title:"search 异步搜索插件",
            baseUrl:"/search"
        };
        res.render('jsapi/search',data);
    }
    ,nk:function (req,res) {
        var data ={};data.lib={
            title:"nk 异步搜索插件",
            baseUrl:"/nk"
        };
        res.render('jsapi/nk',data);
    }
};