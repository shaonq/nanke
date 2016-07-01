/*!@Name：日历插件 @Author：Wmi @Date：2016-02-05 v2.0  */
(function (win) {
    var doc = document, creat = 'createElement',  tags = 'getElementsByTagName',ui = {},as = {css:"date_table",id:"date_table",box:"#date_table",toolCss:"date_tool"};
    as.td = {prev:"td_prev",next:"td_next",curr:"td_this"};
    var global = {each : function (arr, fn) { var i = 0, len = arr.length; for (; i < len; i++) { if (fn(i, arr[i]) === false) { break } } } };
    var config = {
        format: 'YYYY-MM-DD', //日期格式
        festival: true  //  节日开关
    };
    //位数补齐
    global.digit = function (num) {
        return num < 10 ? '0' + (num | 0) : num;
    };
    //判断闰年
    global.isleap = function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    global.parse = function (ymd, hms, format) {
        ymd = ymd.concat(hms);
        format = format || config.format;
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (str, index) {
            ymd.index = ++ymd.index | 0;
            return global.digit(ymd[ymd.index]);
        });
    };
    global.now = function (timestamp, format) {
        var De = new Date((timestamp | 0) ? function (tamp) {
            return tamp < 86400000 ? (+new Date + tamp * 86400000) : tamp;
        }(parseInt(timestamp)) : +new Date);
        return global.parse(
            [De.getFullYear(), De.getMonth() + 1, De.getDate()],
            [De.getHours(), De.getMinutes(), De.getSeconds()],
            format
        );
    };

    global.check = function (value) {//得到当前日期
        var reg = config.format.replace(/YYYY|MM|DD|hh|mm|ss/g, '\\d+\\').replace(/\\$/g, '');
        var exp = new RegExp(reg);//时间格式是否正确
        var arr = !!exp.test(value) ? (value.match(/\d+/g)) : (global.now().match(/\d+/g));
        global.each(arr, function (i) {
            arr[i] = parseInt(arr[i])
        });
        return arr;
    };

    //重要节日
    global.festival = function (td, md) { var str;td=$(td).find("p"); switch (md) { case '1.1': str = '元旦'; break; case '3.8': str = '妇女'; break; case '4.5': str = '清明'; break; case '5.1': str = '劳动'; break; case '6.1': str = '儿童'; break; case '9.10': str = '教师'; break; case '10.1': str = '国庆'; break; } str && (td.html(str)); str = null; };
    //数据接口

    //生成表格
    ui.table = function (bool) {
        var tr, view = [], weeks = ['日', '一', '二', '三', '四', '五', '六', '星期'];
        var log = {}, table = doc[creat]('table'), thead = doc[creat]('thead');
        thead.appendChild(doc[creat]('tr'));
        log.creath = function (i) {
            var th = doc[creat]('th');
            th.innerHTML = !bool ? weeks[i] : weeks[7] + weeks[i];
            thead[tags]('tr')[0].appendChild(th);
            th = null;
        };

        global.each(new Array(6), function (i) {
            view.push([]);
            tr = table.insertRow(0);
            global.each(new Array(7), function (j) {
                view[i][j] = 0;
                i === 0 && log.creath(j);
                tr.insertCell(j);
            });
        });

        table.insertBefore(thead, table.children[0]);
        table.id = as.id;
        table.className = as.css;
        tr = view = null;
        return table.outerHTML.toLowerCase();
    };

    //生成日期
    global.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    global.viewDate = function (Y, M, D) {
        var  log = {}, De = new Date();
        De.setFullYear(Y, M, D);
        log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];
        global.months[1] = global.isleap(log.ymd[0]) ? 29 : 28;
        De.setFullYear(log.ymd[0], log.ymd[1], 1);
        log.FDay = De.getDay();
        log.PDay = global.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
        log.NDay = 1;
        //渲染日
        var add,table = $(as.box);
        add = function(a,b){ this.innerHTML = ("<p class="+(b||'')+">"+a+"</p>") };
        table.find("td").each(function (i) {
            var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
            if (i < log.FDay) {//上一月
                DD = i + log.PDay;
                add.call(this,DD,as.td.prev);

                MM === 1 && (YY -= 1);
                MM = MM === 1 ? 12 : MM - 1;
            } else if (i >= log.FDay && i < log.FDay + global.months[log.ymd[1]]) {//这个月
                DD = i - log.FDay + 1;
                add.call(this, DD, DD == D ? as.td.curr:!1); // 当前:其他

                global.click  && $(this).on("click",function(){ global.click([YY,MM,DD]) });//鼠标点击事件

                if (i - log.FDay + 1 === log.ymd[2]) { log.thisDay = this; }
            } else {//其他
                DD = log.NDay++;
                add.call(this,DD,as.td.next);

                MM === 12 && (YY += 1);
                MM = MM === 12 ? 1 : MM + 1;
            }

            config.festival && global.festival(this, MM + '.' + DD);//加载节日

            global.data && global.data.call(this,[YY,global.digit(MM),global.digit(DD)],global.ajax?global.ajax.data:!1);//加载外部参数

            this.setAttribute('y', YY);
            this.setAttribute('m', MM);
            this.setAttribute('d', DD);
        })
    };
    //入口 加载视图
    global.init = function (options) {
        /* 表格 */
        global.table=ui.table(options.week||!1);//表格基本样式 此处可修改表格
        this.innerHTML = global.table;//加载表格
        global.ymd = global.check(options.date||!1);
        /* 配置 */
        options.url && (global.url =  options.url);// ajax
        options.header && mod.header(options.header);//头部菜单
        options.click && typeof  options.click === "function" && (global.click = options.click);//点击事件
        options.data && typeof  options.data === "function" && ( global.data = options.data);//外部数据
        /* 运行 */
        global.start();
    };
    //运行 运行功能

    global.start = function(){
        var start =function(){
            var MM = parseInt(global.ymd [1] ) -1;
            global.viewDate(global.ymd [0], MM, global.ymd [2]);//月份减去1
        };

        if (global.url) {
            var Y = global.ymd[0],M = global.ymd[1],D = global.months[(parseInt(M)-1)]||(global.isleap(Y) ? 29 : 28);
            M = global.digit(M);D = global.digit(D);
            var stat = [Y,M,"01"].join("-"),end =[Y,M,D].join("-");  //当月时间
            $.ajax({url:global.url, data:{stat:stat,end:end},success: function (e) {
                (e && (e.status === 0))&&(global.ajax = e),start();
            },timeout:1e4,error:function(){start()},dataType:"json",type:"get",cache:false})
        } else {
            start()
        }
    };

    /* 外部交互 */
    var mod = {
        header : function(s){
            var header = {
                left:s.left,
                right:s.right
            };
            var box,table = $(as.box);
            box = $("<div><span>"+global.ymd[0]+"年"+global.ymd[1]+"月</span></div>").addClass(as.toolCss);
            header.left&&box.prepend($('<cite>'+header.left+'</cite>'));
            header.right&&box.append($('<em>'+header.right+'</em>'));
            table.before(box);

            var toolBox =$("."+as.toolCss),text = toolBox.find('span');
            toolBox.find("cite").on("click",function(){
                global.ymd [1] === 1 && ( global.ymd [0] -= 1);
                global.ymd [1] =  global.ymd [1] === 1 ? 12 :  global.ymd [1] - 1;
                global.start();
                text.html(global.ymd[0]+"年"+global.ymd[1]+"月");
            });
            toolBox.find("em").on("click",function(){
                global.ymd [1] === 12 && (global.ymd [0] += 1);
                global.ymd [1] = global.ymd [1] === 12 ? 1 : global.ymd [1] + 1;
                global.start();
                text.html(global.ymd[0]+"年"+global.ymd[1]+"月");
            })
        }
    };

    //加载接口
    var date = function (a, options) {
        options = options ||{};
        global.init.call(a,options)
    };
    date.now = global.now;
    //seajs 加载
    'function' == typeof define ? define(function(require, exports, module){ module.exports = date;return date;}):(win.date = date);
}(window));
/*
 依赖：jQuery
 API:
 header:表头字段 {left:"", right:""}
 date:当前时间
 url：ajax提交URL
 data：数据处理fn(a,b) a表格数据，b ajax返回数据
 click： fn表格数据 a 当前日期
 DEMO:
 $("#f_date").each(function(){
 date(this, {
 //date: "2016-02-05",
 header: {left:"left",right:"right"},
 url:"date.json",
 data: function (e,d) {
 if(d){for(var i= 0,j= d.length;i<j;i++){
 if(e.join('-') == d[i].date){this.innerHTML+="<i style='color:orangered'>·</i>"}
 }}else{
 window.console && console.log(e.join('-'),d) ;
 }
 },
 click: function (e) {
 window.console && console.log(e.join('-'))
 }
 });
 })
 接口：date.json
 {"status":0,
 "data":[
 {"date":"2016-02-01"},
 {"date":"2016-02-02"},
 {"date":"2016-02-03"},
 {"date":"2016-02-04"},
 {"date":"2016-02-05"},
 {"date":"2016-02-06"}
 ]
 }
 */