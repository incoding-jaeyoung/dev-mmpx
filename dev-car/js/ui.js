(function ($) {
    'use strict'

    $(document).ready(function() {
        UI.setAcoddion();
    });

    var UI = UI || {
        /*
        * 레이어 팝업 오픈
        * @prams
        *   selector : string 팝업 로드 컨테이너
        *   href : string 팝업 호출 경로
        *   animation : 'up' 팝업 애니메이션
        *
        */
        openLayer: function(selector, href, animation) {
            var flag = selector;
            flag = $(flag);
            flag.load(href, function () {
                $(this).show();
                $(this).find('.modal').css('transition', 'none');
                $(this).find('.modal').show().addClass('scroll')
                $('.overlay').show();
                $('body').css('overflow','hidden');
                if(animation === 'up'){
                    gsap.set($(this).find('.modal'), {y: $(window).height()});
                    gsap.to($(this).find('.modal'), 0.8, { y: 0, ease: Cubic.easeInOut });
                }
            });
            return false;
        },

        /*
        * 레이어 팝업 클로즈
        */
        closeLayer: function () {
            $('.popup-wrap').empty()
            $('.popup-wrap').removeAttr('style').hide();
            $('.overlay').hide().removeAttr('style');
            $('body').css('overflow','');
        },

        /*
        * 아코디언 ui 생성
        */
        setAcoddion: function () {
            $(".accodion").each(function () {
                var owner = $(this);
                var header = $(this).find(".accodion-header");
                var body = $(this).find(".accodion-body");
                header.off("click").on("click", function () {
                    if(!owner.is(".active")){
                        owner.addClass("active");
                        body.slideDown();
                    } else {
                        owner.removeClass("active");
                        body.slideUp();
                    }
                });
            });
        }
    }

    window.UI = UI;

})(jQuery);

