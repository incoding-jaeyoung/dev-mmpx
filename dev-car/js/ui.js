(function ($) {
   'use strict'

   var UI = UI || {

      headerNaviSwiper: null,

      /*
      * 레이어 팝업 오픈
      * @params
      *   selector : string 팝업 로드 컨테이너
      *   href : string 팝업 호출 경로
      *   animation : 'up' | null 팝업 애니메이션
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
            initUi();
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
      * 헤더 네비 스와이퍼 생성
      */
      sethaderNavi: function () {
         if($(".header-navi-swiper")) {
            UI.headerNaviSwiper = new Swiper(".header-navi-swiper", {
               slidesPerView: "auto",
               spaceBetween: 0,
               breakpoints: {
                  600: {
                     spaceBetween: 0,
                  },
               },
               freeMode: true,
            });
            var idx = $(".header-navi-swiper .swiper-slide.active").index();
            var len = $(".header-navi-swiper .swiper-slide").length - UI.headerNaviSwiper.snapGrid.length;
            if(len < idx) UI.headerNaviSwiper.slideTo(idx - len, 0);
         }
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
      },

      /*
      * 커스텀 셀렉트 ui 생성
      */
      setCustomSelect: function () {

         $("select.custom-select").each(function () {
            if(!$(this).data("customSelect")) {
               let modifier = '';
               if($(this).is(".select-s")) modifier += 'select-s ';
               if($(this).attr("disabled")) modifier += 'disabled ';
               $(this).customSelect({
                  includeValue: true,
                  transition: 200,
                  modifier: modifier,
                  placeholder: $(this).attr("placeholder") 
                     ? `<span class="placeholder">${$(this).attr("placeholder")}</span>` 
                     : undefined
               });
            }
         });
      }
   }

   window.UI = UI;

   $(document).ready(function () {
      initUi();
      UI.sethaderNavi();
   });


   function initUi() {
      UI.setAcoddion();
      UI.setCustomSelect();
   }


   

})(jQuery);

