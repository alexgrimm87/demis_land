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

function menuActive (){
    $('.menu_btn').on('click', function(){
        $('.main_nav').slideDown();
    });
    $('.main_nav .close').on('click', function(){
        $('.main_nav').slideUp();
    });
}
function getStyle(style){
    if($(styleSheetElement).length){
        $(styleSheetElement).remove();
        setTimeout(function(){
            var styleSheetElement = document.createElement("style"), customStyleSheet;
            document.head.appendChild(styleSheetElement);
            customStyleSheet = document.styleSheets[0];
            customStyleSheet.insertRule(style)
        },100)
    }else{
        var styleSheetElement = document.createElement("style"), customStyleSheet;
        document.head.appendChild(styleSheetElement);
        customStyleSheet = document.styleSheets[0];
        customStyleSheet.insertRule(style)
    }
}
$(document).ready(function(){
    
    // getStyle("@keyframes show75 { from {stroke-dashoffset: 1900} to {stroke-dashoffset: 0}}");
    $('.slider_bg_line').find('.outer').addClass('step1');
    mainSlider('.slider');

    menuActive ();


    $('.js-popup_call').click(function(e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        $('#call-request input[name="id"]').val(id);
        $.fancybox.open({
          src: "#call-request2"
        })
    });


    $('.open_phone').on('click', function(){
        if($(this).hasClass('active')){
            $('.footer .centr_links').slideUp();
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
            $('.footer .centr_links').slideDown();
        }
    });


    $(document).on('click', 'main_nav a', function(){
        $.fn.fullpage.moveTo($(this).attr('href'), 1);
    });
      // $(document).on('click', '.mouse', function(){
  //   $.fn.fullpage.moveSectionDown();
  // });
  // $(document).on('click', '.logo a', function(){
  //   $.fn.fullpage.moveTo('main_slider', 1);
  // });
});

$(window).load(function(){

});

$(window).resize(function(){

});