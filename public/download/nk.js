(function(){
    var global = {}, debug = location.hostname === "localhost";
    global.debug =function (a,b) {
        if(debug&&window.console){
            var log={ type:"日志",color:"#ffffff",bg:"#52433D",text:a};switch (b){
                case "error":
                    log.type="错误",log.bg="#EB7A77";
                    break;
                case "info":
                    log.type="信息",log.bg="#33A6B8";
                    break;
            }
            console.log('%c '+log.type+' %c','background:'+log.bg+';color:'+log.color+'','',a||"debug消息");
        }
    };
    global.getUrl = function (name) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#\\?]*)(&|#|$|\\?)");
        var m = window.location.href.match(r);
        if ((!m || m == "")) {
            m = top.location.href.match(r);
        }
        return decodeURIComponent(!m ? "" : m[2]);
    };
    global.json = function (url, data, success, options) {/*AJAX请求和回调*/
        var that = this, type = typeof data === 'function';
        if (type) {options = success;success = data;}
        options = options || {};
        data = data || {}; var _data = { data: JSON.stringify(data) };
        debug && console.log("发送数据：", _data)
        return $.ajax({
            type: options.type || 'post',
            dataType: options.dataType || 'json',
            data: _data,
            url: url,
            timeout: 1e4,
            success: function (res) {
                debug && console.log("数据返回：", res)
                if (res && res.body ) {
                    success && success(res)
                }

            },
            error: function (a) {
                // window.console&&console.log(a.responseText);
                options.error || (debug&&console.log('请求异常，请重试'));
            }
        });
    };

    global.cookie = function (e, o, t) {//('fly-style', 'stretch', { path: '/' , expires : 365});
        e = e || ""; var n, i, r, a, c, p, s, d, u; if ("undefined" == typeof o) { if (p = null, document.cookie && "" != document.cookie) for (s = document.cookie.split(";"), d = 0; d < s.length; d++) if (u = $.trim(s[d]), u.substring(0, e.length + 1) == e + "=") { p = decodeURIComponent(u.substring(e.length + 1)); break } return p } t = t || {}, null === o && (o = "", t.expires = -1), n = "", t.expires && ("number" == typeof t.expires || t.expires.toUTCString) && ("number" == typeof t.expires ? (i = new Date, i.setTime(i.getTime() + 864e5 * t.expires)) : i = t.expires, n = "; expires=" + i.toUTCString()), r = t.path ? "; path=" + t.path : "", a = t.domain ? "; domain=" + t.domain : "", c = t.secure ? "; secure" : "", document.cookie = [e, "=", encodeURIComponent(o), n, r, a, c].join("");
    };
    global.form = function (e, fn) {
        var mod = {
            charLen: function (val) {
                var arr = val.split(''), len = 0;
                for (var i = 0; i < val.length; i++) {
                    arr[i].charCodeAt(0) < 299 ? len++ : len += 2;
                }
                return len;
            }
            , check: { //验证
                regexp: {
                    speChar: new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$") //特殊字符
                    , cn: new RegExp("^[a-zA-Z0-9_\s·]+$") //特殊字符
                }
                , username: function (value) { //用户名
                    value = (value || '').replace(/\s/g, '');
                    var len = mod.charLen(value);
                    if (len < 3 || len > 12) return '用户名必须为3到14个字符长度';
                    if (!this.regexp.cn.test(value)) return '用户名不能出现中文';
                    if (/(^\_)|(\__)|(\_+$)/.test(value)) return '用户名首尾不能出现下划线\'_\'，且最多只能出现一个下划线';
                    if (/^\d+\d+\d$/.test(value)) return '用户名不能全为数字';
                }
                , name: function (value) { //昵称
                    value = (value || '').replace(/\s/g, '');
                    var namelen = mod.charLen(value);
                    if (namelen < 3 || namelen > 12) return '必须为3到14个字符长度，1个中文占用2个长度';
                    if (!this.regexp.speChar.test(value)) return '不能有特殊字符';
                    if (/(^\_)|(\__)|(\_+$)/.test(value)) return '首尾不能出现下划线\'_\'，且最多只能出现一个下划线';
                    if (/^\d+\d+\d$/.test(value)) return '不能全为数字';
                }
                , pass: function (value) {  //密码
                    value = (value || '').replace(/\s/g, '');
                    if (value.length < 6 || value.length > 16) return '密码必须为6到16个字符';
                    if (/[\u4e00-\u9fa5]/.test(value)) return '密码不能出现中文';
                }
                , repass: function (value, revalue) {  //确认密码
                    if (revalue !== value) return '两次密码并不一致';
                }
                , email: function (value) { //邮箱
                    value = (value || '').replace(/\s/g, '');
                    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
                        return '邮箱格式不正确'
                    }
                }
                , phone: function (value) { //手机
                    if (!/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(value)) return '输入的手机号码有误';
                }
                , card: function (value) { //身法证
                    if (!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value)) return '请输入正确的身份证号码';
                }
                , len: function (value, length) { //最小长度
                    if (mod.charLen(value) < length) return (length === 1) ? '内容不能为空！' : '至少还需输入' + (length - parseInt(mod.charLen(value))) + '个字符';
                }

            },
            form: function (fn) {
                var othat = $(this), action = othat.attr('action'), method = othat.attr('method');
                var data = {}, go;
                var msg, msg_span, msg_this;
                try {
                    othat.find('[name]').each(function () {
                        var that = $(this), check = that.attr('check'), val = that.val(), p = that.parent();
                        msg_span = that.next("span");msg_this= this;
                        if (typeof mod.check[check] === 'function') {
                            msg = mod.check[check](val, othat.find('[check="pass"]').val());
                            log = !0;

                        } else if (that.attr('length')) {
                            msg = mod.check.len(val, parseInt(that.attr('length') || 1));
                            log = !0;
                        }
                        if (msg) {
                            p.addClass('error');
                            msg_span&&msg_span.text(msg);
                            that.focus();
                            go = true;
                            return !1;
                        }else{
                            p.removeClass('error');
                            msg_span&&msg_span.text('');
                        }
                        if(that.attr('type') === "radio"||that.attr('type') === "checkbox"){
                            that.prop('checked')&&(data[that.attr('name')] = val);
                        }else{
                            data[that.attr('name')] = val;
                        }
                    });
                    if (!go) {
                        var str = typeof fn === 'function';
                        str && (f.json(action, data, function (msg) {msg && fn(msg)}));
                        return str ? !1 : !0;
                    }else {
                        fn&&fn.call(msg_this,!1,msg)
                    }
                } catch (e) {debug&&console.log(e) }
                return !1;
            }
        };
        return mod.form.call(e, fn);
    };
    global.fix = function (op) {
        var css = function (content,drop) {
        return '<style>\
        .fix-block{ position: fixed; right: 12px; bottom: 55px; z-index: 2147483647; width: 40px; line-height: 16px; font-size: 13px; text-align: center; ; -webkit-animation:fadeIn .5s; animation:fadeIn .5s;}\
        .fix-block .block-link{ position: relative; display: inline-block; vertical-align: top; border-radius: 2px; padding: 4px 2px; width: 36px; height: 32px; background-color: #eee; color: #666; margin-top: 2px; -webkit-user-select: none; user-select: none; cursor: pointer;'+(content?content:"")+'}\
        .fix-block .block-link-drop{ display: none; text-align: left;  position: absolute; background-color: #eee; border-radius: 2px; padding: 8px; min-width: 100px; min-height:20px; right: 0;bottom:0; margin-right: 50px; -webkit-animation:fadeInTop .35s; animation:fadeInTop .35s;'+(drop?drop:"")+'}\
        .fix-block .block-link-drop img{max-width: inherit;}\
        .fix-block .block-link .block-link-drop:after{content: ""; border: 7px solid transparent; position: absolute; right: -14px; bottom: 7px; border-left-color: #eee;}\
        .fix-block .block-link:hover{opacity: .9}\
        .fix-block .block-link:hover .block-link-drop{ display: block; }</style>'},__loadCss;
        if($(".fix-block").length)return;
        var op = op || {}, fix = $('<div class="fix-block"></div>'),
            convert = function (str, obj) {
                for (var key in obj) str = str.replace(new RegExp("\{" + key + "}", "g"), obj[key]);
                return str;
            },
            echo = function (obj) {
                var text = '<div class="block-link" style="'+(obj.bgcolor?"background-color:"+obj.bgcolor:"")+'">{content}' + (obj.drop ? '<span class="block-link-drop">{drop}</span>' : '') + '</div>';
                return convert(text, obj);
            },
            bind = function (obj,show) {
                if (obj) {
                    obj.bgcolor = op.bgcolor;
                    var eme = $(echo(obj));
                    eme.appendTo(fix);
                    obj.click && eme.on("click", obj.click);
                    obj.each && eme.each(obj.each);
                    eme = null;
                }
            },
            conf = {
                top: op.top
                , list: op.list || {}
            };

        if(!__loadCss)$("head").append(css(op.contentCss,op.dropCss)),__loadCss=true;
        if(conf.top){
            conf.top.click= function () {
                $('html, body').animate({scrollTop: 0}, 300);
            },conf.top.each= function () {
                var that = $(this),w=$(window);
                that.hide();
                var scroll = function () {
                    (w.scrollTop() > 80)?that.show():that.hide();
                };
                w.on("scroll",scroll);
            },bind(conf.top,true);
        }
        for (var i in conf.list)bind(conf.list[i]);
        $("body").append(fix);
    };
    /**
     *  DEMO ：
     *  nk&&nk.fix({
        top:{content:'<img src="/images/top.png">'}
        ,list:[
            {content:'<img src="/images/code.png">',drop:'<img src="http://qr.liantu.com/api.php?text=http://192.168.1.22:3000/chat" width="150">'}
            ,{content:'欢迎光临',drop:'<p>你好啊，小伙伴</p>',click:function () {}}
        ]
        ,contentCss:"background:#666;"
        ,dropCss:"background:#666;"
    });
     */
    $(window).on("load", function () {
        var __ = {};__.tab = function () {//nk-tab=".btn/this/.box"
            global.debug("tab loading");
            var s = "nk-tab", t = $('[' + s + ']');
            t.each(function () {
                var that = $(this), o = that.attr(s).split("/"), item = that.find(o[0]);
                item.each(function (i) {
                    var self = $(this), box = $(o[2]).eq(i);
                    self.on("click", function () {
                        self.addClass(o[1]).siblings().removeClass(o[1]);
                        box.length && box.show().siblings(o[2]).hide();
                    });
                })
            })
        }();
        __.scroll = function () {// 普通锚链接即可
            global.debug("scroll loading");
            var t = $('[href^="#"]');
            t.each(function () {
                var that = $(this), o = that.attr('href');
                that.on("click", function () {
                    var top = o === "#" ? 0 : $(o).offset().top;
                    $('html, body').animate({scrollTop: top}, that.offset().top / 9);
                })
            });
        }();
        __.store = function () {
            global.debug("store loading");
            var s = "nk-store", t = $('[' + s + ']');
            window.localStorage && t.each(function () {
                var that = $(this), name = that.attr(s);
                that.on('input', function () {
                    localStorage[name] = this.value;
                });
                that.val(localStorage[name] || '');
            })
        }();
    });
    window.laytpl && (global.tpl = function (tpl, data, callback) { laytpl(tpl).render(data, function (html) { callback && callback(html) }) });
//seajs 加载
    'function' == typeof define ? define(function (require, exports, module) { module.exports = global}):(window.nk = global);
}());


