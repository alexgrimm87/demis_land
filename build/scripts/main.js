'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
var w = $(window).width();

function goTo() {
    if (w <= 1365) {
        $('.main_nav a, .page-menu a,.down a').click(function (e) {
            e.preventDefault();
            var href = $(this).attr('data-href');
            var target = $(href).offset().top;
            $('body,html').stop().animate({ scrollTop: target }, 500);
        });
        $('.main_nav a').click(function (e) {
            e.preventDefault();
            var href = $(this).attr('data-href');
            var target = $(href).offset().top;
            $('body,html').stop().animate({ scrollTop: target }, 500);

            if (w <= 991) {
                $('.main_nav').slideUp();
            }
        });
        $('.logo a').click(function (e) {
            e.preventDefault();
            var href = $(this).attr('data-href');
            var target = $(href).offset().top;
            $('body,html').stop().animate({ scrollTop: target }, 500);
        });
    }
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
function mainSlider(selector) {

    var it = $('.slider_bg_line').find('.outer');
    $('.slider').on('init', function () {
        setTimeout(function () {
            it.removeClass('step1').addClass('step2');
        }, 3000);
    });
    $(selector).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnFocus: false,
        dots: true,
        fade: true
    });
    // requestAnimationFrame Shim
    $(selector).slick('slickGoTo', 0);

    var determin = 800;

    var canvas = $('.chart')[0];
    $('.chart').attr('width', $(canvas).width());
    $('.chart').attr('height', $(canvas).height());
    var context = canvas.getContext('2d');
    var width = $(canvas).width();
    var height = $(canvas).height();
    var x = width / 2;
    var y = height / 2;
    var radius = height / 2 - 2;
    var endPercent = determin;
    var curPerc = 0;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;
    var array_lister = [1, determin / 4, determin / 2 + 3, determin / 4 * 3 + 3, 1];
    context.lineWidth = 4;
    context.strokeStyle = '#fff';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    var stop = false;
    var method = true;

    function animate(current) {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(x, y, radius, -quart, circ * current - quart, false);
        context.stroke();
        curPerc++;
        var index = $(array_lister).index(curPerc);
        if (index != -1) {
            $(selector).slick('slickGoTo', index);
        }
        if (curPerc <= endPercent) {
            requestAnimationFrame(function () {
                if (!stop) {
                    animate(curPerc / determin);
                } else {
                    return 0;
                }
            });
        } else {
            curPerc = 0;
            requestAnimationFrame(function () {
                if (!stop) {
                    animate(curPerc / determin);
                } else {
                    return 0;
                }
            });
        }
    }
    function revers_move(current, stop_point) {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(x, y, radius, -quart, circ * current - quart, false);
        context.stroke();
        if (method) {
            curPerc++;
            curPerc++;
            curPerc++;
            curPerc++;
            curPerc++;
        } else {
            curPerc--;
            curPerc--;
            curPerc--;
            curPerc--;
            curPerc--;
        }

        if (method) {
            if (curPerc + 5 <= stop_point) {
                requestAnimationFrame(function () {
                    revers_move(curPerc / determin, stop_point);
                });
            } else {
                stop = false;
                animate(curPerc / determin);
            }
        } else {
            if (curPerc - 5 >= stop_point) {
                requestAnimationFrame(function () {
                    revers_move(curPerc / determin, stop_point);
                });
            } else {
                stop = false;
                animate(curPerc / determin);
            }
        }
    }
    animate();
    $(document).on('click', '.slick-dots li', function (e) {
        var cur_index = parseInt($(this).find('button').html());
        stop = true;
        if (curPerc < array_lister[cur_index]) {
            method = true;
        } else {
            method = false;
        }

        revers_move(curPerc / determin, array_lister[cur_index]);
    });
}

function menuActive() {
    $('.menu_btn').on('click', function () {
        $('.main_nav').slideDown();
    });
    $('.main_nav .close').on('click', function () {
        $('.main_nav').slideUp();
    });
}
function getStyle(style) {
    if ($(styleSheetElement).length) {
        $(styleSheetElement).remove();
        setTimeout(function () {
            var styleSheetElement = document.createElement("style"),
                customStyleSheet;
            document.head.appendChild(styleSheetElement);
            customStyleSheet = document.styleSheets[0];
            customStyleSheet.insertRule(style);
        }, 100);
    } else {
        var styleSheetElement = document.createElement("style"),
            customStyleSheet;
        document.head.appendChild(styleSheetElement);
        customStyleSheet = document.styleSheets[0];
        customStyleSheet.insertRule(style);
    }
}
$(document).ready(function () {

    // getStyle("@keyframes show75 { from {stroke-dashoffset: 1900} to {stroke-dashoffset: 0}}");
    $('.slider_bg_line').find('.outer').addClass('step1');
    mainSlider('.slider');

    menuActive();

    $('.js-popup_call').click(function (e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        $('#call-request input[name="id"]').val(id);
        $.fancybox.open({
            src: "#call-request2"
        });
    });

    $('.open_phone').on('click', function () {
        if ($(this).hasClass('active')) {
            $('.footer .centr_links').slideUp();
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $('.footer .centr_links').slideDown();
        }
    });

    $(document).on('click', 'main_nav a', function () {
        $.fn.fullpage.moveTo($(this).attr('href'), 1);
    });
    // $(document).on('click', '.mouse', function(){
    //   $.fn.fullpage.moveSectionDown();
    // });
    // $(document).on('click', '.logo a', function(){
    //   $.fn.fullpage.moveTo('main_slider', 1);
    // });
});

$(window).load(function () {});

$(window).resize(function () {});
'use strict';

//Height Items
function heightItems() {
  var desc_height = 0;
  $('.rates-list > li').each(function () {
    var cur_desc = $(this).find('.rates-text').innerHeight();
    if (cur_desc > desc_height) {
      desc_height = cur_desc;
    }
  });
  $('.rates-text').css('height', desc_height);
}

//Pages Menu Scroll
function onScroll(event) {
  var scrollPos = $(document).scrollTop() + 500;

  $('#menu li').find('a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr('data-href'));
    if (refElement.position().top <= scrollPos) {
      $('#menu li').removeClass('active');
      currLink.parent().addClass('active');
    } else {
      currLink.parent().removeClass("active");
    }
  });

  var hrefCheck = $('#menu li.active').find('a').attr('data-href');
  if (hrefCheck == '#examples_1' || hrefCheck == '#reviews_1' || hrefCheck == '#rates_1' || hrefCheck == '#about_1') {
    $('#menu').addClass('black');
  } else {
    $('#menu').removeClass('black');
  }
}

function examplesSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

function reviewsSlider(selector) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.reviews-nav'
  });
};

function reviewsNav(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.reviews-slider',
    centerMode: true,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 1152,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 3
      }
    }]
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function () {
    var center = $('.reviews-nav li.slick-current.slick-active');
    $('.reviews-nav li').removeClass('anim');
    center.addClass('anim');
  });
};

function sectionScroll() {
  if ($(window).width() > 1340 && $(window).height() > 649) {

    $('.main').fullpage({
      anchors: ['main_slider', 'guarantees', 'examples', 'reviews', 'works', 'rates', 'about', 'footer'],
      menu: '#menu',
      hybrid: true,
      fitToSection: false,
      controlArrows: false,
      // verticalCentered: true,
      slideSelector: '.slide-selector',
      afterLoad: function afterLoad(anchorLink, index) {
        if (index == 3 || index == 4 || index == 6 || index == 7) {
          $('#menu').addClass('black');
        } else {
          $('#menu').removeClass('black');
        }
      }
    });
  } else {
    $(document).on('scroll', onScroll);
    if ($('.fp-enabled').length) {
      $.fn.fullpage.destroy('all');
    }
    goTo();
  }
}

$(document).ready(function () {
  heightItems();
  examplesSlider('.examples-slider', '.examples-prev', '.examples-next');
  reviewsSlider('.reviews-slider');
  reviewsNav('.reviews-nav', '.reviews-prev', '.reviews-next');
  $('.reviews-nav li.slick-current.slick-active').addClass('anim');
  $('.reviews-show').click(function (e) {
    e.preventDefault();
    $('.reviews-slider li').addClass('show');
    $(this).remove();
  });

  //data-id
  $('.js-popup').click(function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    $('#make-request input[name="id"]').val(id);
    $.fancybox.open({
      src: "#make-request"
    });
  });

  //rates
  $('.js-rates-popup').click(function (e) {
    e.preventDefault();
    var rate = $(this).closest('li').find('.rates-title h3').text();
    $('#make-request input[name="rate"]').val(rate);
    $.fancybox.open({
      src: "#make-request"
    });
  });

  //fullpage

  //AOS Animation
  AOS.init({
    disable: 'mobile'
  });
  sectionScroll();
});

$(window).load(function () {});

$(window).resize(function () {
  if ($(window).width() > 1340 && $(window).height() > 649) {
    sectionScroll();
    $.fn.fullpage.reBuild();
  } else {
    if ($('.fp-enabled').length) {
      $.fn.fullpage.destroy('all');
    }
    goTo();
  };
});