$(window).on('load', function () {
  $preloader = $('.preloader'),
  $loader = $preloader.find('.preloader__load');
  $loader.fadeOut();
  $preloader.delay(350).fadeOut('slow');
  //new WOW().init();
  setTimeout(function() {
    $loader.remove();
    $preloader.remove();
  }, 2500);
});


$(document).ready(function(){

    $('.hamburger--collapse').click(function() {
      console.log('gfg');
        $(this).toggleClass('is-active');
        $('.header__nav').toggleClass('header__nav-active');
    });

    $('.gallery-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });

    heightPersonal();

    $(window).resize( function() {
      heightPersonal();
    });

    function heightPersonal() {
      if ($(window).width() <= 1200 ) {
        $('.proposal__item').matchHeight();
      }
      else {
        $('.proposal__item').matchHeight({
          remove: true
        });
        
      }  
    }


    // Initialize the plugin
    $('#my_popup').popup();

    $('.modal').popup({ transition: 'all 0.3s' });

    $('input[type=tel]').mask('+38 (000) 000-00-00');

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        singleItem : true,
        slideSpeed : 1000,
        navigation: true,
        navigationText : ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke:#0ab8b6;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #0ab8b6;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        pagination: true,
        afterAction : syncPosition,
        responsiveRefreshRate : 200,
    });

    sync2.owlCarousel({
        items: 5,
        itemsDesktop      : [1199,4],
        itemsDesktopSmall     : [979,4],
        itemsTablet       : [768,3],
        itemsMobile       : [479,3],
        pagination: false,
        autoWidth: false,
        margin: 30,
        responsiveRefreshRate : 100,
        afterInit : function(el){
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el){
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if($("#sync2").data("owlCarousel") !== undefined){
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo",number);
    });

    function center(number){
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for(var i in sync2visible){
            if(num === sync2visible[i]){
                var found = true;
            }
        }

        if(found===false){
            if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
            }else{
                if(num - 1 === -1){
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if(num === sync2visible[sync2visible.length-1]){
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if(num === sync2visible[0]){
            sync2.trigger("owl.goTo", num-1)
        }

    }


    var galleryLeft = new Swiper('.gallery__left', {
        spaceBetween: 10,
        initialSlide: 2,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var galleryThumbs = new Swiper('.gallery-thumbs__left', {
        spaceBetween: 10,
        initialSlide: 2,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
    });
    galleryLeft.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryLeft;

    var galleryLeft = new Swiper('.gallery__right', {
        spaceBetween: 10,
        initialSlide: 2,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var galleryThumbs = new Swiper('.gallery-thumbs__right', {
        spaceBetween: 10,
        initialSlide: 2,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
    });
    galleryLeft.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryLeft;

    /* Валидация телефона */
jQuery.validator.addMethod("phoneno", function(phone_number, element) {
   return this.optional(element) || phone_number.match(/\+[0-9]{2}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
}, "Введите Ваш телефон");

/* Валидация формы */
$(".callback-form").validate({
  messages: {
    name: "Введите Ваше имя",
    phone: "Введите Ваш телефон",
  },
  rules: {
    "phone": {
      required: true,
      phoneno: true
    }
  },
  submitHandler: function(form) {
    var t = {
      name: jQuery(".callback-form").find("input[name=name]").val(),
      phone: jQuery(".callback-form").find("input[name=phone]").val(),
      subject: jQuery(".callback-form").find("input[name=subject]").val()
    };
    ajaxSend('.callback-form', t);
  }
});

$(".offer-form").validate({
  messages: {
    name: "Введите Ваше имя",
    phone: "Введите Ваш телефон",
  },
  rules: {
    "phone": {
      required: true,
      phoneno: true
    }
  },
  submitHandler: function(form) {
    var t = {
      name: jQuery(".offer-form").find("input[name=name]").val(),
      phone: jQuery(".offer-form").find("input[name=phone]").val(),
      subject: jQuery(".offer-form").find("input[name=subject]").val()
    };
    ajaxSend('.offer-form', t);
  }
});


$(".skin-form").validate({
  messages: {
    name: "Введите Ваше имя",
    phone: "Введите Ваш телефон",
  },
  rules: {
    "phone": {
      required: true,
      phoneno: true
    }
  },
  submitHandler: function(form) {
    var t = {
      name: jQuery(".skin-form").find("input[name=name]").val(),
      phone: jQuery(".skin-form").find("input[name=phone]").val(),
      subject: jQuery(".skin-form").find("input[name=subject]").val()
    };
    ajaxSend('.skin-form', t);
  }
});


$(".example-form").validate({
  messages: {
    email: "Введите Ваш email",
    phone: "Введите Ваш телефон",
  },
  rules: {
    "phone": {
      required: true,
      phoneno: true
    }
  },
  submitHandler: function(form) {
    var t = {
      email: jQuery(".example-form").find("input[name=email]").val(),
    };
    ajaxSend('.example-form', t);
  }
});


$(".welcome-form").validate({
  messages: {
    name: "Введите Ваше имя",
    phone: "Введите Ваш телефон",
  },
  rules: {
    "phone": {
      required: true,
      phoneno: true
    }
  },
  submitHandler: function(form) {
    var t = {
      name: jQuery(".welcome-form").find("input[name=name]").val(),
      phone: jQuery(".welcome-form").find("input[name=phone]").val(),
      subject: jQuery(".welcome-form").find("input[name=subject]").val()
    };
    ajaxSend('.welcome-form', t);
  }
});


$(".modal-form").validate({
  messages: {
    name: "Введите Ваше имя",
    phone: "Введите Ваш телефон",
  },
  rules: {
    "phone": {
      required: true,
      phoneno: true
    }
  },
  submitHandler: function(form) {
    var t = {
      name: jQuery(".modal-form").find("input[name=name]").val(),
      phone: jQuery(".modal-form").find("input[name=phone]").val(),
      subject: jQuery(".modal-form").find("input[name=subject]").val()
    };
    ajaxSend('.modal-form', t);
  }
});
/* Функцыя для отправки формы */
function ajaxSend(formName, data) {
  jQuery.ajax({
    type: "POST",
    url: "sendmail.php",
    data: data,
    success: function() {
      $(".modal").popup("hide");
      $("#thanks").popup("show");
      setTimeout(function() {
        $(formName).trigger('reset');
      }, 2000);
    }
  });
}


      var id = $('#woman-cosmetology select option:selected').data('id');
        $('#woman-cosmetology').find('div#'+id).slideDown();

        $('#woman-cosmetology select').change(function() {
          id = $('#woman-cosmetology select option:selected').data('id');

          $('#woman-cosmetology .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetology').find('div#'+id).slideDown();
          // console.log(id);
        });

var id2 = $('#woman-cosmetologic select option:selected').data('id');
        $('#woman-cosmetologic').find('div#'+id2).slideDown();

        $('#woman-cosmetologic select').change(function() {
          id2 = $('#woman-cosmetologic select option:selected').data('id');

          $('#woman-cosmetologic .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetologic').find('div#'+id2).slideDown();
          // console.log(id);
        });

var id3 = $('#woman-cosmetology5 select option:selected').data('id');
        $('#woman-cosmetology5').find('div#'+id3).slideDown();

        $('#woman-cosmetology5 select').change(function() {
          id3 = $('#woman-cosmetology5 select option:selected').data('id');

          $('#woman-cosmetology5 .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetology5').find('div#'+id3).slideDown();
          // console.log(id);
        });
var id4 = $('#woman-cosmetology6 select option:selected').data('id');
        $('#woman-cosmetology6').find('div#'+id4).slideDown();

        $('#woman-cosmetology6 select').change(function() {
          id4 = $('#woman-cosmetology6 select option:selected').data('id');

          $('#woman-cosmetology6 .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetology6').find('div#'+id4).slideDown();
          // console.log(id);
        });
var id5 = $('#woman-cosmetology7 select option:selected').data('id');
        $('#woman-cosmetology7').find('div#'+id5).slideDown();

        $('#woman-cosmetology7 select').change(function() {
          id5 = $('#woman-cosmetology7 select option:selected').data('id');

          $('#woman-cosmetology7 .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetology7').find('div#'+id5).slideDown();
          // console.log(id);
        });

var id7 = $('#woman-cosmetology8 select option:selected').data('id');
        $('#woman-cosmetology8').find('div#'+id7).slideDown();

        $('#woman-cosmetology8 select').change(function() {
          id7 = $('#woman-cosmetology8 select option:selected').data('id');

          $('#woman-cosmetology8 .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetology8').find('div#'+id7).slideDown();
          // console.log(id);
        });        

var id6 = $('#woman-cosmetology9 select option:selected').data('id');
        $('#woman-cosmetology9').find('div#'+id6).slideDown();

        $('#woman-cosmetology9 select').change(function() {
          id6 = $('#woman-cosmetology9 select option:selected').data('id');

          $('#woman-cosmetology9 .content').each(function(index, el) {
            $(el).slideUp();
            $(el).find('input[type=checkbox]').prop('checked', false);
          });

          $('#woman-cosmetology9').find('div#'+id6).slideDown();
          // console.log(id);
        });


  //anchor
  $('.nav-list').on('click','a', function(event){
    event.preventDefault();
    var id = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top -50}, 600);
  });

  //Sticky header
  var height = $('.header__top').innerHeight();
  $(window).scroll(function(){
    if($(this).scrollTop()>150){
      $('header').css('padding-top', height);
      $('.header__top').addClass('sticky');
    }
    else if ($(this).scrollTop()<150){
      $('header').css('padding-top', 0);
      $('.header__top').removeClass('sticky');
    }
  });

});


