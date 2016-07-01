/*!@Name：日历插件 @Author：Wmi @Date：2016-02-05 v2.0  */
(function () {
    var util = {

        //组件事件冒泡
        stope: function (e) {
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        }

        //在焦点处插入内容
        , focusInsert: function (obj, str) {
            var result, val = obj.value;
            obj.focus();
            if (document.selection) { //ie
                obj.focus();
                result = document.selection.createRange();
                document.selection.empty();
                result.text = str;
            } else {
                result = [
                    val.substring(0, obj.selectionStart),
                    str,
                    val.substr(obj.selectionEnd)
                ];
                obj.focus();
                obj.value = result.join('');
            }
        }

    };

    var global = {
        faces: {
            "[微笑]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_thumb.gif",
            "[嘻嘻]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif",
            "[哈哈]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif",
            "[可爱]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_thumb.gif",
            "[可怜]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif",
            "[挖鼻]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_thumb.gif",
            "[吃惊]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_thumb.gif",
            "[害羞]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif",
            "[挤眼]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_thumb.gif",
            "[闭嘴]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_thumb.gif",
            "[鄙视]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_thumb.gif",
            "[爱你]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif",
            "[泪]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif",
            "[偷笑]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif",
            "[亲亲]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif",
            "[生病]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_thumb.gif",
            "[太开心]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_thumb.gif",
            "[白眼]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_thumb.gif",
            "[右哼哼]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_thumb.gif",
            "[左哼哼]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_thumb.gif",
            "[嘘]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_thumb.gif",
            "[衰]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif",
            "[委屈]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_thumb.gif",
            "[吐]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_thumb.gif",
            "[哈欠]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_thumb.gif",
            "[抱抱]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_thumb.gif",
            "[怒]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_thumb.gif",
            "[疑问]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_thumb.gif",
            "[馋嘴]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_thumb.gif",
            "[拜拜]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_thumb.gif",
            "[思考]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_thumb.gif",
            "[汗]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif",
            "[困]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_thumb.gif",
            "[睡]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_thumb.gif",
            "[钱]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_thumb.gif",
            "[失望]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_thumb.gif",
            "[酷]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/cool_thumb.gif",
            "[色]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_thumb.gif",
            "[哼]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_thumb.gif",
            "[鼓掌]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_thumb.gif",
            "[晕]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_thumb.gif",
            "[悲伤]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_thumb.gif",
            "[抓狂]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_thumb.gif",
            "[黑线]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_thumb.gif",
            "[阴险]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_thumb.gif",
            "[怒骂]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_thumb.gif",
            "[互粉]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_thumb.gif",
            "[心]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_thumb.gif",
            "[伤心]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif",
            "[猪头]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/pig.gif",
            "[熊猫]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/panda_thumb.gif",
            "[兔子]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/81/rabbit_thumb.gif",
            "[ok]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_thumb.gif",
            "[耶]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_thumb.gif",
            "[good]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_thumb.gif",
            "[NO]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif",
            "[赞]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_thumb.gif",
            "[来]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_thumb.gif",
            "[弱]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_thumb.gif",
            "[草泥马]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7a/shenshou_thumb.gif",
            "[神马]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/horse2_thumb.gif",
            "[囧]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/j_thumb.gif",
            "[浮云]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/fuyun_thumb.gif",
            "[给力]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/geiliv2_thumb.gif",
            "[围观]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_thumb.gif",
            "[威武]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/vw_thumb.gif",
            "[奥特曼]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/otm_thumb.gif",
            "[礼物]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c4/liwu_thumb.gif",
            "[钟]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d3/clock_thumb.gif",
            "[话筒]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9f/huatongv2_thumb.gif",
            "[蜡烛]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/lazhuv2_thumb.gif",
            "[蛋糕]": "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3a/cakev2_thumb.gif"
        }
        //简易编辑器
        , editor: function (options) {
            var html = '<div class="chat-tool-top">'
                + '<span type="face" title="插入表情"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEUAAAAnJTUlJTUnJjYlJTUkJDQoIDAmJTUmJTUmJjYnJDQmJTUnJTUgIDAmJjYmJjYmJTUmJTUmJTUlJTUnJTUkJDUnJjZnZ9rcAAAAFnRSTlMAwDDgYEAg8FCAcO+QENCwoJ/Pj28/j78LpAAAAOtJREFUOMutUtuSwyAILYIomqRNu83/f+p2xFlwU6cv5UGFw+UAXr4q4QF4HAiP8BYmxCW+oBAXRDpH3yGaFjfgEc+1jIaSwoCrOjWFaorzsCqb5fdV4I+/vk6CcXhEVyY2S8bOQG/QPP6NymJZZg63opqWEsdURBvpicJsOVEdjun2OH12+FxCSU4kg7XJNGIUWps2KLbl2foSu1HTxh4nvyO6tzP9dH0VpB7YBUoLg7oLkVzrrSUTcP1GvV/oVYg1b1pdzZTPn3xkrQRM5P8vZcDsw2E9jw1xz8+Vn3mvk+GGAnAkgMKXb8ove6oFp2T03fwAAAAASUVORK5CYII="></span>'
                + '<span type="picture" title="插入表情"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAKlBMVEUAAAAnJTUmJjYkJDUlJTUgIDAmJTUkJDQmJTUlJTUmJTUmJjYnJDQmJjbspI9rAAAADnRSTlMAwIA/MBCgQNBgkLBwUPFpBLkAAAB9SURBVCjPY6AGYDFGAQ4MjEooQICBEVUDiQKuaAKBiQtQBdIZ1CECrC0w7UUQgcCKALDASobtYAFWERYBsEC0xAGwQKADwywUa0UYGNgmMPAmwAUcgJQI67JjKA6LKJwAVIUkwA60eS+60wMd0ARYFTA8R76AIAoQYKAFAAAqsxZMQSlL5QAAAABJRU5ErkJggg=="></span>'
                + '</div>';
            var mod = {
                picture: function (editor, self) { //插入图片
                    var isImg = function (val) {
                        if (!/^http:\/\/[\S]+\.(jpg|png|gif|jpeg)/.test(val)) {
                            alert('这不是图片地址，不要骗我。');
                        } else {
                            util.focusInsert(editor[0], 'img[' + val + ']');
                        }
                    }, callback = function (res) {
                        (typeof res !== "object") && (res = $.parseJSON(res));
                        isImg('http://' + location.host + res.url);
                    }, progress = function () {
                        var eme = $(".chat-tools >i");
                        eme.show().width(arguments[3] + '%');
                        if (arguments[3] === 100)setTimeout(function () {
                            eme.hide()
                        }, 1000);
                    }, op = {
                        trigger: $(self),
                        action: '/upload',
                        progress: progress
                    };
                    if (typeof Uploader === "function") {
                        new Uploader(op).success(callback);
                    } else {
                        $.getScript("/download/Uploader.js", function () {
                            new Uploader(op).success(callback);
                        });
                    }
                }
                , face: function (editor, self) { //插入表情
                    var str = '', ul, face = global.faces;

                    for (var key in face) {
                        str += '<li title="' + key + '"><img src="' + face[key] + '"></li>';
                    }
                    str = '<ul class="chat-tool-face">' + str + '</ul>';
                    var faceTool = $('.chat-tool-face');
                    if (!faceTool.length) {
                        $(self).parent().parent().prepend(str);
                        faceTool = $('.chat-tool-face');
                        faceTool.find("li").on('click', function () {
                            var title = $(this).attr('title') + ' ';
                            util.focusInsert(editor[0], 'face' + title);
                            faceTool.hide();
                        });
                        faceTool.show();
                    } else {
                        faceTool.show();
                    }
                    $(document.body).on("click", function () {
                        faceTool.hide();
                    });
                }
            };

            $(options.elem).each(function (index) {
                var _this = this, that = $(_this), parent = that.parent();
                parent.prepend(html);
                parent.find('.chat-tool-top span').each(function () {
                    if ($(this).attr('type') === 'picture') mod.picture(that, this);
                });// 先用着
                parent.find('.chat-tool-top span').on('click', function (event) {
                    var type = $(this).attr('type');
                    mod[type].call(_this, that, this);
                    if (type === 'face') util.stope(event);
                });
            });

        }
        , escape: function (html) {
            return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
        }

        //内容转义
        , content: function (content) {
            //支持的html标签
            var html = function (end) {
                return new RegExp('\\n*\\[' + (end || '') + '(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
            };
            content = global.escape(content || '') //XSS
                .replace(/img\[http\:\/\/([^\s]+?)\.(jpg|png|gif|jpeg)\]/g, function (img) {  //转义图片
                    return '<img src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
                }).replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;" class="fly-aite">$1</a>$2') //转义@
                .replace(/face\[([^\s\[\]]+?)\]/g, function (face) {  //转义表情
                    var alt = face.replace(/^face/g, '');
                    return '<img alt="' + alt + '" title="' + alt + '" src="' + global.faces[alt] + '">';
                }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function (str) { //转义链接
                    var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
                    var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
                    if (!href) return str;
                    var rel = /^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(href.replace(/\s/g, ''));
                    return '<a href="' + href + '" target="_blank"' + (rel ? ' rel="nofollow"' : '') + '>' + (text || href) + '</a>';
                }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移代码
                .replace(/\n/g, '<br>') //转义换行
            return content;
        }

        //时间
        , timeFormat: function (time, fmt) {
            // "yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423
            // "yyyy-M-d h:m:s.S"      ==> 2006-7-2 8:9:4.18
            var _this = time ? new Date(time) : new Date(), ymd = fmt || ( new Date() - _this > 86400000 ? "yyyy-M-d h:mm:ss" : "h:mm:ss");
            var o = {
                "M+": _this.getMonth() + 1,
                "d+": _this.getDate(),
                "h+": _this.getHours(),
                "m+": _this.getMinutes(),
                "s+": _this.getSeconds(),
                "S": _this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(ymd))
                ymd = ymd.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(ymd))
                    ymd = ymd.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return ymd;
        }
        , chatTpl: function (string, values) {
            for (var key in values) string = string.replace(new RegExp("\{{" + key + "}}", "g"), values[key]);
            return string;
        }
        , isNull: function (val) {
            return '' !== val.replace(/\s/g, '');
        }
        , tpl: {
            text: function (text, isThis) {
                text = global.content(text);
                if (global.isNull(text))return global.chatTpl('\
                <li class="{{isThis}}">\
                    <div class="chat-main-user">\
                        <img src="{{userImg}}">\
                        <cite> {{user}} <i>{{time}}</i></cite>\
                    </div>\
                    <div class="chat-main-text">{{text}}</div>\
                </li>', {
                    text: text,
                    time: global.timeFormat(),
                    user: "游客",
                    userImg: "http://placeholder.qiniudn.com/40x40/ddd/ddd",
                    isThis: (isThis ? "this" : "")
                })
            }
        }
    };


    //加载编辑器
    global.editor({elem: '.chat-tool-textarea'});
    //test
    var socket, fn = function () {
        socket = io('ws://192.168.1.22:3001');
        socket.on('connect', function () {
            nk.debug("WebSocket connect", "info");
            socket.on('message', function (d) {
                nk.debug(d, "info");
                var ul = $('.chat-main ul');
                ul.append(global.tpl.text(d.text),true);
                ul.parent().animate({scrollTop: ul.parent()[0].scrollHeight}, 500);
            });
        });
    };
    (typeof io === "undefined") ? $.getScript("/download/socket.io.js", fn) : fn();
    var send = function () {
        var ul = $('.chat-main ul'), text = $(".chat-tool-textarea"), val = text.val();
        text.val('');
        // ul.append(global.tpl.text(val, true));
        //ul.parent().animate({scrollTop: ul.parent()[0].scrollHeight}, 500);
        if (typeof socket !== "undefined") {
            socket.send({text: val});
        }
    };
    $(".chat-tool-bottom span").on("click", send);
    $(".chat-tool-textarea").on("keydown", function (e) {
        (e.keyCode == 13) && send();
    });

//    'function' == typeof define ? define(function (require, exports, module) { module.exports = chat; return chat; }) : (window.chat = chat);    //seajs 加载
}());