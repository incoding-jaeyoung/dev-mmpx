(function ($) {
   'use strict'

   var UI = UI || {

      headerNaviSwiper: null,
      progressSwiper: null,
      dialogCallback: null,
      device: 'pc',

      /*
      * 레이어 팝업 오픈
      * @params
      *   href : string 팝업 호출 경로
      * @options
      *   animation : 'up' | null 팝업 애니메이션
      *   customSelector : #popup이 아닌 다른곳에 열어야 할 경우 
      */
      openPopup: function( href, option ) {
         var opt = option || {};
         console.log(opt)
         var target = $(opt.customSelector ? opt.customSelector : "#popup");
         target.load(href, function () {
            $(this).show();
            $(this).find('.modal').css('transition', 'none');
            $(this).find('.modal').show().addClass('scroll')
            $(this).find('.overlay').show();
            $('body').css('overflow','hidden');
            if(opt.animation === 'up') {
               gsap.set($(this).find('.modal-dialog'), {y: $(window).height()});
               gsap.to($(this).find('.modal-dialog'), 0.8, { y: 0, ease: Cubic.easeInOut });
            }
            initUi();
         });
         return false;
      },

      /*
      * 레이어 팝업 클로즈
      */
      closePopup: function ( customSelector ) {
         $('#popup .gallery-swiper').each(function (){
            $(this).data("gallerySwiper").destroy(true, true);
         });
         var target = $(customSelector ? customSelector : '#popup');
         target.empty();
         target.removeAttr('style').hide();
         target.find('.overlay').hide().removeAttr('style');
         $('body').css('overflow','');
      },

      /*
      * 다이알로그 오픈
      * @params
      *   href : string 팝업 호출 경로
      *   callback :콜백
      */
      openDialog: function(href, callback) {
         var target = $("#dialog");
         UI.dialogCallback = callback;
         target.load(href, function () {
            $(this).show();
            $(this).find('.modal').css('transition', 'none');
            $(this).find('.modal').show().addClass('scroll')
            $(this).find('.overlay').show();
            $('body').css('overflow','hidden');
            if(animation === 'up'){
               gsap.set($(this).find('.modal-dialog'), {y: $(window).height()});
               gsap.to($(this).find('.modal-dialog'), 0.8, { y: 0, ease: Cubic.easeInOut });
            }
            initUi();
         });
         return false;
      },

      /*
      * 다이알로그 클로즈
      */
      closeDialog: function ( enter ) {
         $('#popup .gallery-swiper').each(function (){
            $(this).data("gallerySwiper").destroy(true, true);
         });
         var target = $('#dialog');
         target.empty();
         target.removeAttr('style').hide();
         target.find('.overlay').hide().removeAttr('style');
         if(UI.dialogCallback){
            UI.dialogCallback(enter);
            UI.dialogCallback = null;
         }
         $('body').css('overflow','');
      },

      /*
      * 메인 네비 생성
      */
      setMainNavi: function () {
         $("#header.main-hader .navi-list").on("mouseenter", function () {
            gsap.to($(".main-navi"), 0.6, {height: 268, ease: Cubic.easeOut});
            $("#header .login").hide();
            $("#header .navi-close").show();
         });
         $("#header .navi-close").on("click", function () {
            gsap.to($(".main-navi"), 0.6, {height: 0, ease: Cubic.easeOut});
            $("#header .login").show();
            $("#header .navi-close").hide();
         });
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
      * 모바일 네비 생성
      */
      setMobileNavi: function () {
         $("#header .m-menu").on("click", function ( e ) {
            $(".mobile-navi").show();
            $('body').css('overflow','hidden');
            gsap.set($(".mobile-navi .navi-wrap"), {x: $(window).width()});
            gsap.to($(".mobile-navi .navi-wrap"), 0.6, {x: 0, ease: Cubic.easeInOut});
         });
         $(".mobile-navi .close").on("click", function ( e ) {
            gsap.to($(".mobile-navi .navi-wrap"), 0.6, {x: $(window).width(), ease: Cubic.easeOut, onComplete: function () {
               $(".mobile-navi").hide();
               $('body').css('overflow','');
            }});
         });
      },

      /*
      * 마이페이지 진행상태 스와이퍼
      */
      setProgressSwiper: function () {
         if($(".progress-swiper")) {
            UI.progressSwiper = new Swiper(".progress-swiper", {
               slidesPerView: "auto",
               freeMode: true,
            });
            var idx = $(".progress-swiper .swiper-slide.active").index();
            var len = $(".progress-swiper .swiper-slide").length - UI.progressSwiper.snapGrid.length;
            if(len < idx) UI.progressSwiper.slideTo(idx - len, 0);
         }
      },

      /*
      * 갤러리 스와이퍼 생성
      */
      setGallerySwiper: function () {
         $(".gallery-swiper").each(function () {
            if(!$(this).data("gallerySwiper")){
               var gallerySwiper = new Swiper($(this)[0], {
                  pagination: {
                     el:$(this).find(".pagination .page")[0],
                     type: "fraction",
                     formatFractionCurrent: function (number) {
                        return ('0' + number).slice(-2);
                     },
                     formatFractionTotal: function (number) {
                        return ('0' + number).slice(-2);
                     },
                     renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                              '<span class="center">/</span>' +
                              '<span class="' + totalClass + '"></span>';
                     }
                  },
                  navigation: {
                     nextEl: ".swiper-button-next",
                     prevEl: ".swiper-button-prev",
                  },
               });
               $(this).find(".pagination .button-prev").off("click").on("click", function () {
                  gallerySwiper.slidePrev();
               });
               $(this).find(".pagination .button-next").off("click").on("click", function () {
                  gallerySwiper.slideNext();
               });

               $(this).data("gallerySwiper", gallerySwiper);
            }
         });
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
      },

      // gotoTop
      gotoTop: function () {
         $("html, body").scrollTop(0);
      },

      // 스텝1 트림 셀렉트 
      setPriceSelect: function () {
         $(".price-select .total-price").on("click", function ( e ) {
            if(!$(".price-select .total-price").is(".active")){
               $(".price-select .total-list").slideDown();
               setTimeout(function () {$(".price-select .total-price").addClass("active")}, 100);
            } else {
               $(".price-select .total-list").slideUp();
               setTimeout(function () {$(".price-select .total-price").removeClass("active")}, 100);
            }
            e.preventDefault();
            e.stopPropagation();
         });
         $(".price-select .total-list .list").on("click", function () {
            $(".price-select .total-list .list").removeClass("active");
            $(this).addClass("active");
            $(".price-select .total-price .name").text($(this).find(".name").text());
            $(".price-select .total-price .price .text").text($(this).find(".price .text").text());
            $(".price-select .total-list").slideUp();
            setTimeout(function () {$(".price-select .total-price").removeClass("active")}, 100);
            $(".price-select").trigger("change", $(this).attr("value"));
         });
      }
   }

   window.UI = UI;

   $(document).ready(function () {
      initUi();
      UI.setMainNavi();
      UI.setMobileNavi();
      UI.sethaderNavi();
      UI.setPriceSelect();

      var oldWinTop = 0;
      $(window).on("scroll", function () {
         var winTop = $(window).scrollTop();
         if(oldWinTop < winTop){
            if(!$(".goto-top").is(":visible")){
               $(".goto-top").show();
            }
         } else {
            if($(".goto-top").is(":visible")){
               $(".goto-top").hide();
            }
         }
         oldWinTop = winTop;
      });

      $(window).on("resize", function () {
         var winWidth = $(window).width();
         if(winWidth > 1200) {
            UI.device = "pc";
         } else if(winWidth < 1200 && winWidth > 767) {
            UI.device = "tablet";
         } else {
            UI.device = "mobile";
         }
         if(winWidth > 880){
            if(UI.progressSwiper) {
               UI.progressSwiper.destroy();
               UI.progressSwiper = null;
            }
         } else {
            if(!UI.progressSwiper) {
               UI.setProgressSwiper();
            } else {
               UI.progressSwiper.update();
            }
         }
      });

      $(window).trigger("resize");
      
   });


   function initUi() {
      UI.setAcoddion();
      UI.setCustomSelect();
      UI.setGallerySwiper();
   }


   

})(jQuery);

