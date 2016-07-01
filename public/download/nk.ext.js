(function(){
    if(!nk)throw  "error,no load nk.js";
    nk.move = function (ele,parent) {
        if(!ele)return;
        var ele=$(ele),parent = ele.parent(),conf =  {H:parent.outerHeight(),W:parent.outerWidth()};
        ele.on("mousedown",function (e) {//鼠标按下
            conf.move = $(this);
            conf.move.addClass("is-move");
            conf.moveX = e.pageX - conf.move.position().left;
            conf.moveY = e.pageY - conf.move.position().top;
        }).on("mouseup",function(){//鼠标松开
            try{
                conf.move.removeClass("is-move");
                conf.move= null;
            }catch(e){
                conf.move= null;
            }
        });//.on("contextmenu",function () {/*屏蔽浏览器弹出菜单*/ return !1; });
        parent.on("mousemove",ele,function(e){//鼠标移动
            var offsetX = e.pageX - conf.moveX, offsetY = e.pageY - conf.moveY;
            e.preventDefault();
            offsetX < 0 && (offsetX = 0);
            offsetX > conf.W && (offsetX = conf.W);
            offsetY < 0 && (offsetY = 0);
            offsetY > conf.H && (offsetY = conf.H);
            if (conf.move) {
                conf.move.css({left: offsetX, top: offsetY});
                console.log(conf);
            }
            offsetX = offsetY = null;
        })
    }
}(nk));


