(function ($) {
   'use strict'
   headerScroll()
   var UI = UI || {

      headerNaviSwiper: null,
      progressSwiper: null,
      channelSwiper: null,
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
            $(".main-navi").addClass('open')
            gsap.to($(".main-navi"), 0.6, {height: 268, ease: Cubic.easeOut});
            $("#header .login").hide();
            $("#header .navi-close").show();
            $("#header.main-hader").css("background-color", "#fff");
            $("#header.transparent .navi-list li a").css("color", "#000");
            $("#header.transparent .navi-list li a img").attr("src", "../img/ico-arrow-down.svg");
            $("#header.transparent h1 a").css("background-image", "url('../img/img-logo.png')");
            $("#header.transparent .login").css("color", "#000");
         });
         $("#header .navi-close").on("click", function () {
            $(".main-navi").removeClass('open')
            gsap.to($(".main-navi"), 0.6, {height: 0, ease: Cubic.easeOut});
            $("#header .login").show();
            $("#header .navi-close").hide();
            $("#header.main-hader").css("background-color", "");
            $("#header.transparent .navi-list li a").css("color", "");
            $("#header.transparent .navi-list li a img").attr("src", "../img/ico-arrow-down-white.svg");
            $("#header.transparent .login").css("color", "");
             $("#header.transparent h1 a").css("background-image", "url('../img/img-logo-white.png')");
             $(window).trigger("scroll");
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
         if($(".progress-swiper").length>0) {
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
      * 메인 포토 스와이퍼 생성
      */
      setMainPhotoSwiper: function () {
         $(".main-photo-swiper").each(function () {
            var swiper = new Swiper($(this)[0], {
               slidesPerView: 3,
               spaceBetween: 10,
               grid: {
                  rows: 2,
               },
               breakpoints: {
                  1200: {
                     slidesPerView: 4,
                     spaceBetween: 20,
                     grid: {
                        rows: 1,
                     },
                  },
                  767: {
                     slidesPerView: 4,
                     spaceBetween: 20,
                     grid: {
                        rows: 2,
                     },
                  }
               },
               pagination: {
                  el: ".main-photo .control .pagination",
               },
               navigation: {
                  nextEl: ".main-photo .control .button-next",
                  prevEl: ".main-photo .control .button-prev",
               },
            });

            $(".main-photo .control .current").text('01');
            $(".main-photo .control .total").text(('0' + swiper.snapGrid.length).slice(-2));
            swiper.on("slideChange", function () {
               $(".main-photo .control .total").text(('0' + swiper.snapGrid.length).slice(-2));
               $(".main-photo .control .current").text(('0' + (swiper.activeIndex+1)).slice(-2));
            });
            swiper.on("resize", function () {
               $(".main-photo .control .total").text(('0' + swiper.snapGrid.length).slice(-2));
               $(".main-photo .control .current").text(('0' + (swiper.activeIndex+1)).slice(-2));
            })
         });
      },


      /*
      * 기본형 스와이퍼 생성
      */
      setDefaultSwiper: function () {
         $(".default-swiper").each(function () {
            var swiper = new Swiper($(this).find(".swiper")[0], {
               slidesPerView: 1,
               spaceBetween: 10,
               breakpoints: {
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  767: {
                     slidesPerView: 2,
                     spaceBetween: 20,
                  }
               },
               
               pagination: {
                  el: $(this).find(".swiper-pagination")[0],
                  clickable: true
               },
               navigation: {
                  nextEl: $(this).find(".swiper-button-next")[0],
                  prevEl: $(this).find(".swiper-button-prev")[0],
               },
            });
         });
      },

      /*
      * channel 스와이퍼 생성
      */
      setChannelSwiper: function () {
         $(".channel-swiper").each(function () {
            UI.channelSwiper = new Swiper($(this)[0], {
               slidesPerView: 1,
               spaceBetween: 10,
               pagination: {
                  el: ".channel-wrap .swiper-pagination",
                  clickable: true
               },
               
            });
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
      },

      // 3D쇼룸 열기
      show3dShowrooom: function () {
         $("#wrapper").css("position", "fixed");
         gsap.to($("#wrapper"), 0.8, {top: $(window).height(), onComplete: function () {
            $("#wrapper").hide();
         }});
         $(".showroom-banner").hide();
         if(UI.device == "pc"){
            gsap.killTweensOf($(".main-navi"));
            gsap.set($(".main-navi"), {height: 0});
            $(".main-navi").removeClass('open');
            $("#header .navi-close").hide();
            $("#header.main-hader").css("background-color", "");
            $("#header.transparent .navi-list li a").css("color", "");
            $("#header.transparent .navi-list li a img").attr("src", "../img/ico-arrow-down-white.svg");
            $("#header.transparent h1 a").css("background-image", "url('../img/img-logo-white.png')");
            $("#header.transparent .login").css("color", "");
            $('body').css('overflow','hidden');
         }
      },

      // 3D쇼룸배너 닫기
      hide3dShowrooomBanner: function () {
         $(".showroom-banner").hide();
         $('body').removeClass("show-banner");
      },

      // 3D쇼룸 닫기
      hide3dShowrooom: function () {
         $("#wrapper").show();
         $("#wrapper").css("position", "");
         gsap.to($("#wrapper"), 0.8, {top: 0, onComplete: function () {
            $(".showroom-banner").show();
         }});
         $('body').css('overflow','');
      },

      // 360vr 메뉴
      setVrMenu: function () {
         $(".vr-menu li").each(function (i) {
            if($(this).find(".sub").length > 0) {
               $(this).find(" > button").on("click", function ( e ) {
                  $(".vr-menu li .sub").css("display", "");
                  if(!$(this).is(".active")){
                     $(".vr-menu li > button").removeClass("active");
                     $(this).addClass("active").parent().find(".sub").css("display", "flex");
                     $(this).parent().find(".sub > button").each(function (j) {
                        gsap.set($(this), {x:-10, opacity:0});
                        gsap.to($(this), 0.2, {x:0, opacity:1, delay: 0.1 * j});
                     });
                  } else {
                     $(".vr-menu li > button").removeClass("active");
                  }
               });
            } else {
               $(this).find(" > button").on("click", function ( e ) {
                  $(".vr-menu li .sub").css("display", "");
                  $(".vr-menu li > button").removeClass("active");
               });
            }
         });
      }
   }

   window.UI = UI;

   $(function () {
      initUi();
      UI.setMainNavi();
      UI.setMobileNavi();
      UI.sethaderNavi();
      UI.setPriceSelect();
      UI.setMainPhotoSwiper();
      UI.setDefaultSwiper();
      UI.setChannelSwiper();
      UI.setVrMenu();

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
         if($(".progress-swiper").length > 0){
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
         }
         if($(".channel-swiper").length > 0){
            if(winWidth > 767){
               if(UI.channelSwiper) {
                  UI.channelSwiper.destroy();
                  UI.channelSwiper = null;
               }
            } else {
               if(!UI.channelSwiper) {
                  UI.setChannelSwiper();
               } else {
                  UI.channelSwiper.update();
               }
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

function headerScroll() {
    

   var didScroll;
   var lastScrollTop = 0;
   var delta = 5;
   var navbarHeight = $('#header').outerHeight();
   
   console.log(navbarHeight)
   $(window).scroll(function (event) {
       didScroll = true;
   });

   setInterval(function () {
       if (didScroll) {
           hasScrolled();
           didScroll = false;
           
       }
   }, 0);

   function hasScrolled() {
       var st = $(window).scrollTop();
       lastScrollTop = st;
       if (st <= 10) {
           $('.transparent').addClass('nav-default')
           $('.transparent').removeClass('nav-down')
           if($('.main-navi').hasClass('open')){
                  $(".transparent .navi-list li a img").attr("src", "../img/ico-arrow-down.svg");
                  $(".transparent h1 a").css("background-image", "url('../img/img-logo.png')");
                  $(".transparent .m-menu img").attr("src", "../img/mobile-menu.svg")
            }else{
                  $(".transparent .navi-list li a img").attr("src", "../img/ico-arrow-down-white.svg");
                  $(".transparent h1 a").css("background-image", "url('../img/img-logo-white.png')");
                  $(".transparent .m-menu img").attr("src", "../img/mobile-menu-white.svg")
            }
       } else {
           $('.transparent').removeClass('nav-default')
           $('.transparent').addClass('nav-down')
           if($('.main-navi').hasClass('open')){
               $(".transparent .navi-list li a img").attr("src", "../img/ico-arrow-down.svg");
               $(".transparent h1 a").css("background-image", "url('../img/img-logo.png')");
               $(".transparent .m-menu img").attr("src", "../img/mobile-menu.svg")
            }else{
               $(".transparent .navi-list li a img").attr("src", "../img/ico-arrow-down.svg");
               $(".transparent h1 a").css("background-image", "url('../img/img-logo.png')");
               $(".transparent .m-menu img").attr("src", "../img/mobile-menu.svg")
            }
       }
       
   }
}