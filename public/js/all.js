!function () {
    //tree
    $(".tree").find("li").on("click",function () {
        $(this).addClass("this").siblings().removeClass("this");
    });
    //窗口scroll
    !function(){
        var main = $('.layout-main');
        var scroll = function(){
            var stop = $(window).scrollTop();
            if(stop > 61){
                if(!main.hasClass('layout-fix')){
                    main.addClass('layout-fix');
                }
            } else {
                if(main.hasClass('layout-fix')){
                    main.removeClass('layout-fix');
                }
            }
            stop = null;
            return arguments.callee;
        }();
        $(window).on('scroll', scroll);
    }();
    //runjs or runcss
    $(window).on("load",function () {
        $("pre.runjs").each(function () {
            var arr={'lt':'<','gt':'>'};
            try{new Function($(this).html().replace(/&(lt|gt);/ig,function(all,t){return arr[t]}))($)}catch(e){alert('语句异常：'+e.message)}
        });
        $("pre.runcss").one("click",function () {
            $("head").append("<style>"+$(this).html()+"<style>")
        });
    });
}();

if(typeof nk === "object"){
    nk.fix({
        top:{content:'<img src="/images/top.png">'}
        ,list:[
            {content:'<img src="/images/code.png">',drop:'<img src="http://qr.liantu.com/api.php?text=http://192.168.1.22:3000/chat" width="150">'}
            ,{content:'欢迎光临',drop:'<p>你好啊，小伙伴</p>',click:function () {}}
        ]
        ,contentCss:"background-color:#f4f4f4;"
        ,dropCss:"background-color:#666;color:#fff;"
    });
}