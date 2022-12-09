// class
(function () {

   var initializing = false, fnTest = /xyz/.test(function () {
      xyz;
      }) ? /\b_super\b/ : /.*/;
      this.Class = function () {
   };

   Class.extend = function (prop) {

      var _super = this.prototype;
      initializing = true;
      var prototype = new this();
      initializing = false;

      for (var name in prop) {
         prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
            return function () {
               var tmp = this._super;
               this._super = _super[name];
               var ret = fn.apply(this, arguments);
               this._super = tmp;
               return ret;
            };
         })(name, prop[name]) : prop[name];
      };

      function Class() {
         if (!initializing && this.init)
            this.init.apply(this, arguments);
      };

      Class.prototype = prototype;
      Class.prototype.constructor = Class;
      Class.extend = arguments.callee;

      return Class;
   };

})();



// vr360
(function ($){
    'use strict';

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


    var Vr360 = Vr360 || (function () {

      function initVr360() {
         this.$el.on(touchstart, $.proxy(onTouchStart, this));
         $(window).on(touchmove, $.proxy(onTouchMove, this));
         $(window).on(touchend, $.proxy(onTouchEnd, this));
         $(window).on("touchcancel", $.proxy(onTouchEnd, this));  
      }

      function onTouchStart( e ){
         var pageX = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientX : e.pageX;
         this.startX = pageX;
         this.oldX = this.startX;
         this.isTouch = true;
         this.startFrame = this.currentFrame
         e.preventDefault();
         e.stopPropagation();
      }

      function onTouchMove( e ){
         if(this.isTouch) {
            var pageX = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientX : e.pageX;
            var targetX = this.startX - pageX;
            if(!this.arrow) {
               if(targetX > 0)         this.arrow = 'left';
               else if(targetX < 0)    this.arrow = 'right';
            }

            if(this.arrow == 'right') {

               var frame = parseInt((targetX) / 10);
               this.currentFrame = (this.totalFrames-1) + frame;
               if(this.currentFrame < 0){
                  this.currentFrame = this.totalFrames-1;
                  this.startX = pageX;
               }
            }

            if(this.arrow == 'left') {

               var frame = parseInt((targetX) / 20);
               this.currentFrame = frame;
               if(this.currentFrame > this.totalFrames-1){
                  this.currentFrame = 0;
                  this.startX = pageX;
               }
            }
            
            setImage.call(this);
            
            if(this.arrow == "right" && targetX > this.oldX) {
               this.arrow = null;
               this.startX = pageX;
            }
            if(this.arrow == "left" && targetX < this.oldX) {
               this.arrow = null;
               this.startX = pageX;
            }

            this.oldX = targetX;
            
         }
      }

      function onTouchEnd( e ){
         var pageX = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].clientX : e.pageX;
         this.isTouch = false;
         this.arrow = null;
      }

      function pad(num, size) {
			 var s = "0000" + num;
			return s.substr(s.length - size);
        }

      function preloadImages(source, name) {
         var owner = this;
         var count = 0;
         
         for(var i=0; i<this.totalFrames; i++) {
            var image = new Image();
            image.src = source + '/'+ name + pad(i+1, 3)+'.png';
            this.images.push(image);
            $(image).one("load error", function ( e ) {
               count++;
               if(count == owner.totalFrames) {
                  owner.$el.trigger("loadcomplete");
                  setImage.call(owner);
               }
            });
         }
      }

      function setImage() {
         this.img.attr("src", this.images[this.currentFrame].src);
      }

      return Class.extend({
         init : function ( el ) {
            this.$el = el;
            this.currentFrame = 0;
            this.startFrame = 0;
            this.totalFrames = 35;
            this.images = [];
            this.startX = 0;
            this.arrow = null;
            this.isTouch = false;
            this.img = $('<img src="" />');
            this.$el.append(this.img);
            initVr360.call(this);
         },

         loadCar: function ( meta ) {
            this.images = [];
            preloadImages.call(this, meta.source, meta.name);
         }
      });
   })();

   function Plugin(option, params) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('vr360');
            if(!data || typeof data == 'string') $this.data('vr360', (data = new Vr360($this)));
            if(typeof option == 'string') data[option](params);
        });
    }

	window.Vr360 = Vr360;
   $.fn.vr360 = Plugin;
   $.fn.vr360.Constructor = Vr360;

})(jQuery);