$(function (){

   
   var isMobile = false;
   
   if('ontouchstart' in window){
      isMobile = true;
   }

   var touchstart = "mousedown";
   var touchmove = "mousemove";
   var touchend = "mouseup";

   if( isMobile ) {
      touchstart = "touchstart";
      touchmove = "touchmove";
      touchend = "touchend";
   }


   var owner = this;
   var button = $(".main-visual .control button");
   var line = $(".main-visual .control .line");
   var isTouch = false;
   var timer = null;
   var xPercent = 0;
   var activeIndex = 0;
   var prevIndex = 0;
   

   button.on(touchstart, $.proxy(onTouchStart, owner));
   $(window).on(touchmove, $.proxy(onTouchMove, owner));
   $(window).on(touchend, $.proxy(onTouchEnd, owner));
   $(window).on("touchcancel", $.proxy(onTouchEnd, owner));  

   var swiper = new Swiper(".main-visual .swiper", {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      loop: true
    });


   function onTouchStart(e){
      isTouch = true;
      timer = setInterval($.proxy(onUpdate, owner), 800);
      setTimeout($.proxy(onUpdate, owner), 100);
      e.preventDefault();
      e.stopPropagation();
   }

   function onTouchMove( e ) {
      if(isTouch) {
         var pageX = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientX : e.pageX;
         var targetX = pageX - ($(window).width()/2);
         var maxMove = (line.width()/2) - ($(window).width() < 767 ? 60 : 100);
         
         if(targetX <= -maxMove) targetX = -maxMove;
         if(targetX >= maxMove) targetX = maxMove;
         if(targetX <= -($(window).width()/2)+50) targetX = -($(window).width()/2)+ ($(window).width() < 767 ? 40 : 50);
         if(targetX >= ($(window).width()/2)-50) targetX = ($(window).width()/2)- ($(window).width() < 767 ? 40 : 50);
         var ro = $(window).width() > 1200 ? 68 : $(window).width() > 767 ? 60 : 70;
         var rotation = toRadian(ro * Math.abs(targetX/maxMove));
         gsap.to(button, 0.2, {
            x: targetX, 
            y: (line.height()/2-20) * Math.cos(rotation)-($(window).width() <= 767 ? 30 : 85),
            rotation:toDegree(targetX > 0 ? -rotation: rotation)/7, 
            ease:Cubic.easeOut,
         });
         xPercent = targetX/maxMove;
      }
   }

   function onTouchEnd( e ) {
      isTouch = false;
      gsap.to(button, 0.6, {x: 0, rotation:0, ease:Cubic.easeOut, onUpdate: function () {
         var ro = $(window).width() > 1200 ? 68 : $(window).width() > 767 ? 60 : 75;
         var maxMove = (line.width()/2) - ($(window).width() < 767 ? 60 : 100);
         var targetX = parseInt(button[0]._gsap.x);
         var rotation = toRadian(ro * Math.abs(targetX/maxMove));
         gsap.set(button, { y: (line.height()/2-20) * Math.cos(rotation)-($(window).width() <= 767 ? 30 : 85)});
      }});
      clearInterval(timer);
      xPercent = 0;
   }

   function onUpdate() {
      if(xPercent > 0.2)         changeCar('next');
      else if(xPercent < -0.2)   changeCar('prev');
   }

   function changeCar( arrow ) {
      if(arrow === "next") {
         activeIndex++;
         swiper.slideNext();
         if(activeIndex === 8) {
            activeIndex = 0;
         }
      } else {
         activeIndex--;
         swiper.slidePrev();
         if(activeIndex === -1) {
            activeIndex = 7;
         }
      }
      
      $(".main-visual .bg").css("z-index", 0);
      $(".main-visual .bg.car"+(prevIndex+1)).css("z-index", 1);
      $(".main-visual .bg.car"+(activeIndex+1)).css("z-index", 2);
      gsap.set($(".main-visual .bg.car"+(activeIndex+1)), {opacity: 0});
      gsap.to($(".main-visual .bg.car"+(activeIndex+1)), 0.4, {opacity: 1});
      $(".main-visual .top-info").css("display", "none");
      $(".main-visual .top-info.car"+(activeIndex+1)).css("display", "flex");
      $(".main-visual .swiper-slide").removeClass("active").eq(activeIndex).addClass("active");
      
      prevIndex = activeIndex;
      console.log('changeCar', arrow, activeIndex)
   }

   function toRadian( d ) {
      return Math.PI * d/180;
   }

   function toDegree( r ) {
      return 180/Math.PI * r;
   }
   
   
});