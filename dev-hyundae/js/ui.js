'use strict';
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
gsap.registerPlugin(ScrollTrigger);
// JavaScript Document
window.onload = function () {
    //$('body').imagesLoaded().done(function (instance) {
        setTimeout(function(){
            $('#header').addClass('load')
        },500)
        const sections = gsap.utils.toArray('.data-black-header');
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: sections,
                start: 'top 10%',
                end: 'bottom 0%',
                toggleClass: {
                    targets: '#header',
                    className: 'has-scrolled'
                },
                
            })
            
        });
        commonTween()
        init();
        // headerScroll();
        // navTrigger()
        gsap.utils.toArray(".section").forEach((panel, i) => {
            ScrollTrigger.create({
              trigger: panel,
              start: "bottom bottom", 
              pin: true, 
              pinSpacing: false,
              //markers: true
            });
          });

        $('.page-nav').each(function (e) {
            gsap.to($(this), 0.4, {
                scrollTrigger: {
                    trigger: $('.section-content'),
                    start: "0 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: 'bottom 100%',
                    // scrub: true, //스크롤에 반응 (없으면 자동재생)
                    // markers: true,
                    toggleActions: "play none none reverse",
                    toggleClass: {targets:".page-nav", className: "active"},
                },
                ease: 'Power3.easeOut'
            })
        })
        var winw = $(window).width();
        if (winw > 768) {
            
        } else if (winw <= 768) {
            $('.page-nav').on('click',function (){
                $(this).toggleClass('open')
            });
            
            $('.m-menu a').on('click',function (){
                $('.mob-menu').addClass('active')
            });
            $('.mob-menu .close a').on('click',function (){
                $('.mob-menu').removeClass('active')
            });
        }


        let links = gsap.utils.toArray(".page-nav li a");
        links.forEach(a => {
        let element = document.querySelector(a.getAttribute("href")),
            linkST = ScrollTrigger.create({
                    trigger: element,
                    start: "top top"
                });
        ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onToggle: self => self.isActive && setActive(a)
        });
        a.addEventListener("click", e => {
            e.preventDefault();
            gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
        });
        });

        function setActive(link) {
        links.forEach(el => el.classList.remove("active"));
        link.classList.add("active");
        }
    ///});
}

// 데이트피커
$(document).ready(function () {
    $("body").append('<script src="../js/jquery-ui/jquery-ui.min.js"></script>');
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
    $('.datepicker').datepicker();
})
// 헤더 픽스
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
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
        if (st <= 10) {
            $('header').addClass('nav-default')
        } else {
            $('header').removeClass('nav-default')
        }
    }
}

function init() {
    ScrollTrigger.matchMedia({
        "(min-width:601px)": function () {
            gsap.to($(".float"),{
                scrollTrigger: {
                    trigger: $('footer'),
                    start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "0% 85%",
                    // markers: true,
                    toggleActions: "play pause  reverse pause",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
                css:{bottom: '30rem'},
                ease:"none",
            })
        },
        "(max-width:600px)": function () {
            
        },
    })
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            var ran = gsap.timeline ()
            .to('.obj-move',{
                x: "random(-30, 30)", 
                y: "random(-30, 30)",
                scale: "random(0.9, 1)",
                duration:3,
                ease:"none",
                repeat:-1,
                repeatRefresh:true 
            })
        },
        "(max-width:850px)": function () {
            var ran = gsap.timeline ()
            .to('.obj-move',{
                x: "random(-10, 10)", 
                y: "random(-10, 10)",
                scale: "random(0.9, 1)",
                duration:3,
                ease:"none",
                repeat:-1,
                repeatRefresh:true 
            })
        },
    })
    
    const videos = gsap.utils.toArray('.video-block video')
    videos.forEach(function(video, i) {
        ScrollTrigger.create({
            trigger: video,
            scroller: 'body',
            start: '30% center',
            end: '120% 0%',
            // markers: true,
            onEnter: () => video.play(),
            onEnterBack: () => video.play(),
            onLeave: () => video.pause(),
            onLeaveBack: () => video.pause(),
        });
    })
}

$(document).mouseup(function (e){
    var menuList = $(".location dl");
    if(menuList.has(e.target).length === 0)
    $('.location dl').removeClass('active')
})

function headerScroll() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
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
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
        if (st <= 10) {
            $('header').addClass('nav-default')
        } else {
            $('header').removeClass('nav-default')
        }
    }
}
function commonTween() {
    var ran = gsap.timeline ()
    .to('.move',{
        x: "random(-50, 50)", 
        y: "random(-50, 50)",
        scale: "random(0.8, 1)",
        opacity: "random(0.3, 1)",
        duration:5,
        ease:"none",
        repeat:-1,
        repeatRefresh:true 
    })
    


    $('.tada').each(function (e) {
        let tada = $(this)
        gsap.set(tada, {
            opacity: 0,
            scale:0.5
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 50%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play  none none none",
            },
        });
        upmotion.to(tada, 0.5, {
            opacity: 1,
            scale:1.2,
            ease: "power3.out",
        })
        .to(tada, 0.5, {
            scale:1,
            ease: "power3.out",
        })

    })
    $('.fade, .section h2').each(function (e) {
        let text = $(this)
        gsap.set(text, {
            opacity: 0,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.to(text, 1, {
            opacity: 1,
            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-down').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: -50,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-up, .art-list li, .thumb-img-list li').each(function (e) {
        let text = $(this).wrapInner('<div class="over-text-con"></div>')
        let target = text.find('.over-text-con')
        gsap.set(target, {
            y:40,
            opacity: 0,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 85%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //scrub: true, //스크롤에 반응 (없으면 자동재생)
                //markers: true,
                toggleActions: "play none none reverse",
            },
        });
        upmotion.to($(this), 0, {
            opacity: 1,
        })
        upmotion.to(target, 1, {
            y:0,
            opacity: 1,
            ease: "power3.out",
        })

    })
    ScrollTrigger.matchMedia({
        "(min-width:768px)": function () {
            $('.left-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '-200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
        "(max-width:767px)": function () {
            $('.left-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '-200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
    })
    ScrollTrigger.matchMedia({
        "(min-width:768px)": function () {
            $('.right-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        // scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set($('.mySwiper .swiper-slide'), {
                    y:'0px',
                    x: '0%',
                    opacity: 1,
                    onComplete: function () {
        
                    }
                })
                gsap.set(text, {
                    y:'0px',
                    x: '50%',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
        "(max-width:767px)": function () {
            $('.right-slide .swiper-slide').each(function (e) {
                var stagger = $(this)
                gsap.set($('.mySwiper'), {
                    x: '0%',
                    opacity: 1,
                    onComplete: function () {
        
                    }
                })
                gsap.set(stagger, {
                    y:'20px',
                    x: '0%',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                gsap.to(stagger, {
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                        // scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        toggleActions: "play none none reverse",
                    },
                    y:'0px',
                    opacity:1,
                    stagger: 0.1,
                    ease: 'Power1.easeOut'
                })
                
            })
        },
    })
    
    $('.over-text-wrap').each(function (e) {
        $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
        let text = $(this).find('.over-text-con')
        const textmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        textmotion.to(text, 0.5, {
            y: 0,
            stagger: 0.3,
            opacity: 1,
            //            ease: "power2.inOut",
            onComplete: function () {

            }
        })
    })
    $('.up-slide-stagger > *').each(function (e) {
        var stagger = $(this)
        gsap.from(stagger, {
            scrollTrigger: {
                trigger: $(this),
                start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity:0,
            stagger: 0.1,
            ease: 'Power1.easeOut'
        })
    })

}


function navTrigger() {
    $('.navTrigger').on('click', function () {
        // $(this).toggleClass('active');
        // $('.m-menu').toggleClass('active')
        // $('html').toggleClass('fixed')
        // $('#header').removeClass('nav-down')
        $('html').toggleClass('fixed');
        $(this).toggleClass('active');
        $('.m-menu').toggleClass('active')
        $('#header').removeClass('nav-down')
        if ($('.m-menu').hasClass('active')) {
            gsap.set($('.m-menu li'), {
                x: '-50%',
                opacity:0,
            })
            gsap.to($('.m-menu li'), 0.4, {
                stagger: 0.1,
                delay: 0.2,
                x: 0,
                opacity: 1,
                ease: 'Power1.easeOut'
            })
        } 
    });
}



function openLayer(selector, href) {
    var flag = selector,
        target = href;
    flag = $(flag);
    flag.load(href, function () {
        $(this).show();
        $(this).find('.modal').show().addClass('scroll')
        $('.overlay').show();
        //        $('body').css('overflow','hidden');
    });
    //    $('body').addClass('scroll')
    return false;
}

function closeLayer(no) {
    var no = no;
    if (no) {
        $('#popup' + no).removeClass('show').hide().removeAttr('style');
    } else {
        $('.popup-wrap').empty()
        $('.popup-wrap').removeAttr('style').hide();
        $('.overlay').hide().removeAttr('style');
        //        $('body').css('overflow','').removeAttr('style');
    }
    //    $('body').removeClass('fixed')
}

function openModal(number) {
    $('.overlay').show();
    $('.modal-inside' + '.' + number).show();
    return false;
}

function closeModal(no) {
    $('.overlay').hide();
    $('.modal-inside').hide();
}

function counter() {
    var counter = {
        var: 0
    };
    var tal = document.getElementById("cx1");

    TweenMax.to(counter, 3, {
        var: 1000000,
        onUpdate: function () {
            tal.innerHTML = numberWithCommas(Math.ceil(counter.var));
        },
        ease: 'Power4.easeOut'
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function setAcoddion() {
    $(".accodion").each(function () {
        var owner = $(this);
        var header = $(this).find(".accodion-header");
        var body = $(this).find(".accodion-body");
        header.on("click", function () {
            if(!owner.is(".active")){
                owner.addClass("active");
                body.slideDown();
            } else {
                owner.removeClass("active");
                body.slideUp();
            }
        });
    })
}

$(document).ready(function(){
    var winWidth = $(window).width()
    if(winWidth <= 600){
      $('.zoom img').on('click',function(){
        $('.sub-contents .row').addClass('active')
      })
      new Zooming({
      }).listen('.zoom img')
    }
    setAcoddion();
});


