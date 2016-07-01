(function(win){
    var f = {}, load_one,as = {box: "#mk_search",id: "mk_search"};
    f.each = function (arr, fn) { var i = 0, len = arr.length; for (; i < len; i++) { if (fn(i, arr[i]) === false) { break } } };
    f.UI = (function(){
        if (!$(as.box)[0]&&!load_one) {
            var ul = document.createElement('ul');
            ul.id = as.id;
            document.getElementsByTagName("body")[0].appendChild(ul);
            var css = '#mk_search:before { content: ""; position: absolute; } #mk_search {display:none;position: absolute;-webkit-transition: .5s; transition: .5s;top: 37px; left: 0; width: 215px; background-color: #fff; font-size: 13px;color:#999;    border: 1px solid #ddd;border-bottom-color: #bbb; } #mk_search li {     line-height: 22px; overflow: hidden; cursor: pointer; padding: 1px 6px; } #mk_search li:hover {     color: #666; background-color: #FFF8E1; }';
            $("head").append("<style>"+css+"</style>");
            load_one = true;
            return true;
        }
    }());

    // 数据绑定
    f.box = function (msg, options) {
        var that = $(this), box = $(as.box), str = '', arr = [];
        try { msg = eval('(' + msg + ')') } catch (e) { }
        if (msg.data) {
            box.css({"top": that.offset().top +  this.offsetHeight, left: that.offset().left, width: this.offsetWidth-2});
            if (msg.data.length !== 0) {
                f.each(msg.data, function (i, li) {
                    typeof li === "object" ?
                        (str += '<li>' + li[0] + '</li>') :
                        (str += '<li>' + li + '</li>');
                    arr.push(li);
                });
                box.html(str).show();
                box.find("li").each(function (index) {
                    $(this).on("click", function () {
                        that.val($(this).text());
                        typeof options !== "object" ?//id存在，且数据的长度大于1
                            (
                                $(options)[0] && (arr[index].length > 1) && $(options).val(arr[index][1])

                            ) : (
                            f.each(options, function (i, li) {
                                $(li)[0] && $(li).val(arr[index][++i])
                            })
                        );
                        box.hide();
                    })
                });
                $("body").on("click",function () {box.hide();})
            } else {
                var help =$("<li style='color: #888'>没有匹配项...</li>");
                box.html(help).show();
                help.on("click",function(){box.fadeOut();that.val('')})
            }
        }
    };
    // 真实入口
    f.init = function (c,arr) {
        var _this = this, name = this.getAttribute("name"), data = c.data||{};
        data[name]=this.value;
        return $.ajax({
            type: c.type||"post",
            url: c.url,
            data: data,dataType:"json",
            success: function(msg){
                f.box.call(_this,msg,arr)
            },error:function(e){
                win.console&&console.error("搜索插件错误提示：",e);
            }
        });
    };

    // 参数名称和入口
    var search ;
    search = function(t,options,arr){
        options = options||{};
        arr = arr||{};
        f.init.call(t,options,arr);
    };
    search.v = "2.0";
    'function' == typeof define ? define(function(require, exports, module){ module.exports = search;return search;}):(win.search = search);
}(window));

/*
 依赖：JQ
 js：
 $("#in4").on("keyup",function(){
 search(this,{url: "/search/json"})
 });
 api:
 search(this,a,b)
 a:ajax请求op
 b:可选，当匹配的文字多余1个时使用，对应url中data字段数组中的1以后的字段，必选填写id字段。
 url:
 {
 "status": 0,
 "data": [
 ["aaaaaa",1,"- -"],
 ["bbbbbbbb",2,"T v T"],
 ["cccccc",3,"O.O"]
 ]
 }*//**
 * Created by Administrator on 2016/6/21.
 */
