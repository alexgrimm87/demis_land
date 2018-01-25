//Height Items
function heightItems(){
  var desc_height = 0;
  $('.rates-list > li').each(function() {
      var cur_desc = $(this).find('.rates-text').innerHeight();
      if (cur_desc > desc_height) {
          desc_height = cur_desc;
      }
  });
  $('.rates-text').css('height', desc_height);
}


//Pages Menu Scroll
function onScroll(event){
  var scrollPos = $(document).scrollTop()+500;

  $('#menu li').find('a').each(function () {
    var currLink = $(this);
    var refElement = $( currLink.attr('data-href') );
    if (refElement.position().top <= scrollPos) {
      $('#menu li').removeClass('active');
      currLink.parent().addClass('active');
    } else {
      currLink.parent().removeClass("active");
    }
  });

  var hrefCheck = $('#menu li.active').find('a').attr('data-href');
  if(hrefCheck == '#examples_1' || hrefCheck == '#reviews_1' || hrefCheck == '#rates_1' || hrefCheck == '#about_1') {
    $('#menu').addClass('black');
  } else {
    $('#menu').removeClass('black');
  }
}

function examplesSlider(selector, prev, next){
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  });

  $(prev).on('click', function(e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function(e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

function reviewsSlider(selector){
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.reviews-nav'
  });
};

function reviewsNav(selector, prev, next){
  $(selector).slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.reviews-slider',
    centerMode: true,
    focusOnSelect: true,
    responsive: [
    {
      breakpoint: 1152,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      }
    }
  ]
  });

  $(prev).on('click', function(e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function(e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function(){
    var center = $('.reviews-nav li.slick-current.slick-active');
    $('.reviews-nav li').removeClass('anim');
    center.addClass('anim');
  });

};


function sectionScroll(){
  if( $(window).width() > 1340 && $(window).height() > 649 ) {
  
    $('.main').fullpage({
      anchors: ['main_slider', 'guarantees', 'examples', 'reviews', 'works', 'rates', 'about', 'footer'],
      menu: '#menu',
      hybrid: true,
      fitToSection: false,
      controlArrows: false,
      // verticalCentered: true,
      slideSelector: '.slide-selector',
      afterLoad: function(anchorLink, index){
        if (index == 3 || index == 4 || index == 6 || index == 7) {
          $('#menu').addClass('black');
        } else {
          $('#menu').removeClass('black');
        }
      }
    });
  } else {
    $(document).on('scroll', onScroll);
    if ( $('.fp-enabled').length ) {
      $.fn.fullpage.destroy('all');
  }
    goTo();
  }
}



$(document).ready(function(){
  heightItems();
  examplesSlider('.examples-slider', '.examples-prev', '.examples-next');
  reviewsSlider('.reviews-slider');
  reviewsNav('.reviews-nav', '.reviews-prev', '.reviews-next');
  $('.reviews-nav li.slick-current.slick-active').addClass('anim');
  $('.reviews-show').click(function(e) {
    e.preventDefault();
    $('.reviews-slider li').addClass('show');
    $(this).remove();
  });


  //data-id
  $('.js-popup').click(function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    $('#make-request input[name="id"]').val(id);
    $.fancybox.open({
      src: "#make-request"
    })
  });

  //rates
  $('.js-rates-popup').click(function(e) {
    e.preventDefault();
    var rate = $(this).closest('li').find('.rates-title h3').text();
    $('#make-request input[name="rate"]').val(rate);
    $.fancybox.open({
      src: "#make-request"
    })
  });

  //fullpage

  //AOS Animation
  AOS.init({
    disable: 'mobile'
  });
  sectionScroll();
});

$(window).load(function(){

});

$(window).resize(function(){
  if( $(window).width() > 1340 && $(window).height() > 649 )  {
    sectionScroll();
    $.fn.fullpage.reBuild();
  } else {
    if ( $('.fp-enabled').length ) {
      $.fn.fullpage.destroy('all');
    }    
    goTo();
  };
});