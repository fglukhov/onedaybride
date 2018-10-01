var isIE9OrBelow = function() {
  return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

var numFormat = wNumb({
  thousand: ' '
});

$(window).scroll(function () {

  anchorsMenu();

  stickySidebar();

});

$(window).resize(function () {

  makeUp();

  swapProductSidebar();

  slickResponsive();

});

$(window).on("load", function () {

  makeUp();

});

$(document).ready(function () {

  // Callback modal

  $(".btn-callback").click(function () {

    $("#order_name").valid()

    if ($("#order_name").valid()) {
      $("#callbackModal").modal("show");
    }

    return false;

  });

  $(".order-form form").submit(function () {

    $("#order_name").valid()

    if ($("#order_name").valid()) {
      $("#callbackModal").modal("show");
    }

    return false;

  });

  // Meet modal name

  if ($(".model-card").length) {

    if ($(".model-card h1").length) {

      $(".meet-modal-name").text($(".model-card h1").text());

    } else if ($(".model-card .h1").length) {

      $(".meet-modal-name").text($(".model-card .h1").text());

    }


  }

  // Select form timer

  var filter_form_timer;

  $(".select-form form input, .select-form select").on("change",function( event ) {
    if (!$(this).hasClass("range-slider-input") || ($(this).hasClass("range-slider-input") && $(this).hasClass("initialized"))) {
      if(!!filter_form_timer) {
        clearTimeout(filter_form_timer);
      }
      filter_form_timer = setTimeout(function(){
        $(".select-form form").submit();
      }, 1000);
    }
  });

  // Select form submit and get results

  $(".select-form form").on("submit", function () {

    $.ajax({
      url: "load/select-result.html",
      dataType: "html"
    }).done(function (data) {


      var response = $('<html />').html(data);

      var selectItems = response.find(".select-item"),
          itemsArr = [];



      selectItems.each(function () {

        itemsArr.push($(this));

      });

      for (i = 0; i < itemsArr.length; i++) {

        $(".select-pic").eq(i).html(itemsArr[i]);

      }

      //$(".select-pics-caption").hide();

      $(".select-button").show();

    });

    return false;

  });

  // Filter form timer

  var filter_form_timer;

  $(".filter-form form input, .filter-form filter").on("change input",function( event ) {
    if (!$(this).hasClass("range-slider-input") || ($(this).hasClass("range-slider-input") && $(this).hasClass("initialized"))) {
      if(!!filter_form_timer) {
        clearTimeout(filter_form_timer);
      }
      filter_form_timer = setTimeout(function(){

        console.log("submit")

        //$(".filter-form form").submit();
      }, 1000);
    }
  });
  
  // Form lister

  $(".form-lister-wrapper").each(function () {

    var listerWrapper = $(this),
        listerSelect = $(this).find("select");

    listerWrapper.append('<div class="lister"></div>');

    var lister = listerWrapper.find(".lister");

    listerSelect.find("option").each(function () {

      lister.append('<div class="lister-item" data-value="' + $(this).attr("value") + '">' + $(this).text() +'</div>');

    });

    lister.on('afterChange', function(event, slick, currentSlide){

      listerSelect.val(lister.find("[data-slick-index=" + currentSlide + "]").data("value")).change();

    });

    lister.slick({
      fade: true,
      speed: 0
    })

  });
  
  // From to selector
  
  $(".from-to-selector input").on("focus click", function () {

    return false;

  });

  // Range slider

  $(".range-slider").each(function () {
    
    var $rangeSlider = $(this);
    
    var rangeSlider = document.getElementById($rangeSlider.attr("id"));

    var rangeSliderStart = $rangeSlider.data("start");
    var rangeSliderFinish = $rangeSlider.data("finish");
    var rangeSliderMin = $rangeSlider.data("min");
    var rangeSliderMax = $rangeSlider.data("max");

    $rangeSlider.before('<div class="range-slider-label range-slider-label-start">' + rangeSliderMin + '</div>')
    $rangeSlider.after('<div class="range-slider-label range-slider-label-finish">' + rangeSliderMax + '</div>')

    noUiSlider.create(rangeSlider, {
      start: [rangeSliderStart, rangeSliderFinish],
      connect: true,
      step: 1,
      range: {
        'min': rangeSliderMin,
        'max': rangeSliderMax
      }
    });

    var $inputFrom = $rangeSlider.closest(".range-slider-wrapper").find(".input-from");
    var $inputTo = $rangeSlider.closest(".range-slider-wrapper").find(".input-to");

    rangeSlider.noUiSlider.on('update', function (values, handle) {

      $rangeSlider.find(".noUi-handle-lower").html('<div class="handle-label">' + Math.round(values[0]) + '</div>')
      $rangeSlider.find(".noUi-handle-upper").html('<div class="handle-label">' + Math.round(values[1]) + '</div>')

    });

    rangeSlider.noUiSlider.on('slide', function (values, handle) {

      $inputFrom.val(Math.round(values[0]));
      $inputTo.val(Math.round(values[1]));
      
      if (!$inputFrom.hasClass("initialized")) {
        $inputFrom.addClass("initialized");

      } else {
        $inputFrom.change();

      }

      if (!$inputTo.hasClass("initialized")) {
        $inputTo.addClass("initialized");
      } else {
        $inputTo.change();
      }

    });
    
  });
  

  

  


  slickResponsive();

  stickySidebar();

  // Header dropdowns

  if ($("#mobile-indicator").css("display") != "block") {

    $("[data-dropdown-hover]").on("mouseenter", function (e) {

      var dropdown = $($(this).data("dropdown-hover"));

      dropdown.fadeIn(150);

    });

    $("[data-dropdown-hover]").on("mouseleave", function (e) {

      var dropdown = $($(this).data("dropdown-hover"));

      dropdown.fadeOut(150);

    });

  } else {

    $("[data-dropdown-hover='.header-dropdown-user']").on("click", function (e) {

      var dropdown = $($(this).data("dropdown-hover"));

      dropdown.fadeIn(150);

    });

    $("body").on("click", function (e) {

      if ($(e.target).data("dropdown-hover") != ".header-dropdown-user" && $(e.target).closest("li").data("dropdown-hover") != ".header-dropdown-user") {

        $(".header-dropdown.dropdown-hover").fadeOut(150, function () {
          $(".header-dropdown.dropdown-hover").removeClass("active");
        });

      }

    });

  }

  $("[data-dropdown]").click(function (e) {

    if ($($(this).data("dropdown")).length && !$(e.target).hasClass("btn-ok")) {

      var dropdown = $($(this).data("dropdown"));

      $(".header-dropdown").not(dropdown).fadeOut(150, function () {
        $(".header-dropdown").not(dropdown).removeClass("active");
      });

      if (!dropdown.hasClass("active")) {
        dropdown.fadeIn(150, function () {
          dropdown.addClass("active");
        });
      } else {
        dropdown.fadeOut(150, function () {
          dropdown.removeClass("active");
        });
      }
    }

  });

  $("body").on("click", function (e) {

    if (!$(e.target).hasClass("dropdown-trigger") && !$(e.target).parents().hasClass("dropdown-trigger") && !$(e.target).hasClass("header-dropdown") && !$(e.target).parents().hasClass("header-dropdown") && !$(e.target).hasClass("dropdown-hover") && !$(e.target).parents().hasClass("dropdown-hover")) {

      $(".header-dropdown").not(".dropdown-hover").fadeOut(150, function () {
        $(".header-dropdown").not(".dropdown-hover").removeClass("active");
      });

    }

  });

  $(".header-dropdown .btn-ok").click(function () {

    var dropdown = $(this).closest(".header-dropdown");

    dropdown.fadeOut(150, function () {
      dropdown.removeClass("active");
    });

  });

  // Form reset

  $("body").on("click", ".form-reset", function () {

    $(this).closest("form")[0].reset();

    if ($(this).closest("form").find(".picker__input").length) {

      $(this).closest("form").find(".picker__input").data( 'pickadate' ).clear();

    }

    $(this).closest(":checked").attr("checked",false);

    $(this).closest("form").find("select").each(function () {

      $(this).val($(this).find("option:first-child").attr("value")).change();

    });

    return false;

  });

  // Full menu

  $(".submenu-trigger").click(function () {

    $(".full-menu").fadeIn(350);

  });

  $(".full-menu .close").click(function () {

    $(".full-menu").fadeOut(150);

  });

  // Main slider

  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    fade: true,
    dots: true
  });

  // Main slider END

  // Catalog slider

  $(".catalog-slider-prev").click(function () {

    $(".catalog-slider").slick("slickPrev");

  });

  $(".catalog-slider-next").click(function () {

    $(".catalog-slider").slick("slickNext");

  });

  $(".catalog-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 1000,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  // Catalog slider END

  // Model slider

  $(".model-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 350,
    fade: true,
    dots: true
  });

  $(".model-slider-thumbs .tmb").click(function () {

    $(".model-slider").slick("slickGoTo", $(this).prevAll().length);

  });


  $(".contacts-item h2, .contacts-item .h2").click(function () {

    var contactsItem = $(this).closest(".contacts-item");
    var contactsItemDescr = $(this).closest(".contacts-item").find(".contacts-item-descr");

    contactsItemDescr.slideToggle(500,function () {

      contactsItem.toggleClass("active");

    });

  });

  $(".expandable-form-trigger").click(function () {

    $($(this).data("target")).fadeIn(150);

  });

  $(".expandable-form .close").click(function () {

    $(this).closest(".expandable-form").fadeOut(250);

  });

  $(".expandable-form").click(function (e) {

    var exForm = $(this);

    if (!$(e.target).hasClass("expandable-form-inner") && !$(e.target).parents().hasClass("expandable-form-inner")) {

      exForm.fadeOut(250);

    }


  });

  $(".trust-list .row").slick({
    adaptiveHeight: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });


  // Mobile
  
  // Form tabs
  
  $(".form-tabs").each(function () {

    var formTabs = $(this);

    var triggerText = $(this).find("li.active").text();

    var formTabsTrigger = $('<div class="form-tabs-trigger">' + triggerText + '</div>');

    formTabs.before(formTabsTrigger);

    formTabsTrigger.on("click", function () {

      formTabs.fadeToggle(150, function () {

        formTabsTrigger.toggleClass("active");

      });

    });
    
  });

  $(".form-tabs a").click(function () {

    if ($("#mobile-indicator").css("display") == "block") {

      $(".form-tabs").fadeOut(150);

    }

  });

  // Gear table

  $(".gear-table td").each(function() {

    var thisTd = $(this);

    var thisTh = thisTd.closest("table").find("th").filter(function() {

      return $(this).prevAll().length == thisTd.prevAll().not(".td-th").length

    });

    thisTd.before('<td class="td-th">' + thisTh.text() + '</td>');

  });

  swapProductSidebar();

  // All-link


  $(".page-section-header .all-link").each(function () {

    var allLinkClone = $(this).clone();

    allLinkClone.addClass("all-link-mob")

    $(this).closest(".page-section-header").append(allLinkClone);

  });

  // Section header button


  $(".section-header .section-header-button").each(function () {

    var buttonClone = $(this).clone();

    buttonClone.addClass("section-header-button-mob")

    $(this).closest(".section-header").append(buttonClone);

  });

  // Main menu

  $(".menu-trigger").click(function () {

    $(".header-menu").fadeToggle(150);
    $(this).toggleClass("active");

  });

  $(".header-menu .close").click(function () {

    $(".header-menu").fadeOut(150);

  });

  $(".header-menu").click(function (e) {

    if (!$(e.target).hasClass("header-menu-inner") && !$(e.target).parents().hasClass("header-menu-inner")) {

      $(".header-menu").fadeOut(150);

    }


  });

  // Sidebar menu

  var sideMenu = $(".side-menu");

  if (sideMenu.find("a.active").length) {
    var triggerText = sideMenu.find("a.active").text();
  } else {
    if ($(".page-header h1").length) {
      var triggerText = $(".page-header h1").text();
    } else if ($(".page-header .h1").length) {
      var triggerText = $(".page-header .h1").text();
    }
  }

  var sideMenuTrigger = $('<div class="side-menu-trigger">' + triggerText + '</div>');

  sideMenu.before(sideMenuTrigger);

  sideMenuTrigger.on("click", function () {

    sideMenu.fadeToggle(150, function () {

      sideMenuTrigger.toggleClass("active");

    });

  });

  // Catalog filter

  $(".filter-trigger").click(function () {

    $(".catalog-filter").fadeIn(200,function () {

      $(window).trigger("resize");

    });

  });

  $(".catalog-filter .close").click(function () {

    $(".catalog-filter").fadeOut(200);

  });



  // Mobile END

  // Intext video

  $(".intext-video").click(function () {

    $(this).html($(this).data("url"));

  });

  // Anchors menu

  $(".anchors-menu a").click(function () {
    if ($("a[name='"+ $(this).attr("href").replace("#","") +"']").length) {
      $("html,body").animate({
        scrollTop: $("a[name='"+ $(this).attr("href").replace("#","") +"']").offset().top - 80
      },1000);
    }
  });

  $(".program-list .li-name").click(function () {

    var parentLi = $(this).closest("li"),
        liContent = $(this).closest("li").find(".li-content");

    if (!parentLi.hasClass("active")) {
      liContent.slideDown(350, function () {
        parentLi.addClass("active");
      });
    } else {
      liContent.slideUp(350, function () {
        parentLi.removeClass("active");
      });
    }

  });
  
  // Enroll members
  
  $(".enroll-form .count-radios input").on("change", function () {

    $(".enroll-price-val").html(numFormat.to($(".enroll-form .count-radios input:checked").val() * $(".enroll-form .count-radios input:checked").data("price")));

    $(".enroll-price-old-val").html(numFormat.to($(".enroll-form .count-radios input:checked").val() * $(".enroll-form .count-radios input:checked").data("price-old")));

    membersFields($(".enroll-form .count-radios input:checked").val());

  });
  
  $(".enroll-form .btn-enroll-add").click(function () {

    //membersFields($(".enroll-members .form-group").length + 1);

    if ($(".enroll-members .form-group").length + 1 <= 6 ) {
      $(".enroll-form .count-radios input").filter(function () {
        return $(this).val() == $(".enroll-members .form-group").length + 1;
      }).attr("checked", true).change();
    } else {
      membersFields($(".enroll-members .form-group").length + 1);
    }


  });

  // Catalog item gallery

  $(".catalog-gallery-slider").on("init", function () {

    $(".catalog-gallery-thumbs .thumbs-item").click(function () {

      $(".catalog-gallery-slider").slick("slickGoTo", $(this).prevAll().length);

    });

  });

  $('.catalog-gallery-slider').on('afterChange', function(event, slick, currentSlide){

    $(".catalog-gallery-thumbs .thumbs-item").removeClass("active");
    $(".catalog-gallery-thumbs .thumbs-item").filter(function () {
      return $(this).prevAll().length == currentSlide;
    }).addClass("active");

  });

  $(".catalog-gallery-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
    adaptiveheight: true,
    fade: true
  });

  // Item count

  $("body").on("click", ".catalog-tmb .count-units-item", function () {

    $(this).closest(".count-units").find(".count-units-item").removeClass("active");
    $(this).addClass("active");

    countCatalogItem($(this).closest(".catalog-tmb"));
  });

  $("body").on("click", ".btn-count-minus, .btn-count-plus", function () {

    var btn = $(this),
      field = $(this).closest(".count").find("input[type=text]");

    if (field.data("min")) {
      var minVal = field.data("min");
    } else {
      minVal = 0;
    }

    if (btn.hasClass("btn-count-minus") && field.val()*1 > minVal) {

      var newVal = field.val()*1 - 1;
      field.val(newVal).change();

      if (field.hasClass("input-to") && field.closest(".from-to-selector").find(".input-from").val() > field.val()) {
        field.closest(".from-to-selector").find(".input-from").val(field.val());
      }

    }

    if (btn.hasClass("btn-count-plus")) {

      var newVal = field.val()*1 + 1;
      field.val(newVal).change();

      if (field.hasClass("input-from") && field.closest(".from-to-selector").find(".input-to").val() < field.val()) {
        field.closest(".from-to-selector").find(".input-to").val(field.val());
      }

    }

    if ($(this).closest(".catalog-tmb").length) {

      countCatalogItem($(this).closest(".catalog-tmb"));

    }

    if ($(this).closest(".cart-item").length) {

      countCartItem($(this).closest(".cart-item"));

      cartTotal();

    }

    if ($(this).closest(".buy-form").length) {
      buyTotal();
    }

    //cartTotal();


  });

  // Expandable

  $(".expandable-trigger").click(function () {

    var exTrigger = $(this),
        exWrapper = $(this).closest(".expandable"),
        exContent = $(this).closest(".expandable").find(".expandable-content");

    if (!$(this).hasClass("active")) {

      exContent.slideDown(350, function () {
        exTrigger.addClass("active");
        exWrapper.addClass("open");
      });

    } else {
      exContent.slideUp(350, function () {
        exTrigger.removeClass("active");
        exWrapper.removeClass("open");
      });
    }

  });

  $(".top-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true
  });

  // Map

  $("#map area, .map-num").on("mouseenter", function () {

    $(".map-regions").css({
      backgroundPosition: "0 -" + $(this).data("index")*507 + "px"
    });

    $(".map-num[data-index='" + $(this).data("index") + "']").addClass("active");
    $(".map-region-tmb[data-index='" + $(this).data("index") + "']").addClass("active");

  }).on("mouseleave", function () {
    $(".map-regions").css({
      backgroundPosition: "0 0"
    });

    $(".map-num").removeClass("active");
    $(".map-region-tmb").removeClass("active");

  });

  $(".map-region-tmb").on("mouseenter", function () {

    $(".map-regions").css({
      backgroundPosition: "0 -" + $(this).data("index")*507 + "px"
    });

    $(".map-num[data-index='" + $(this).data("index") + "']").addClass("active");

  }).on("mouseleave", function () {

    $(".map-regions").css({
      backgroundPosition: "0 0"
    });

    $(".map-num").removeClass("active");

  });

  $("#map area").click(function () {
    return false;
  });

  $(".side-menu .li-arrow").click(function () {

    var parentLi = $(this).closest("li"),
        submenu = $(this).closest("li").children("ul"),
        liArrow = $(this);

    liArrow.toggleClass("active");

    if (!parentLi.hasClass("active")) {

      submenu.slideDown(250, function () {
        parentLi.addClass("active");
      });

    } else {

      submenu.slideUp(250, function () {
        parentLi.removeClass("active");
      });

    }

  });
  

  
  // News filter
  
  $("#filter_date").pickadate({
    monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    format: 'd.mm.yyyy',
    selectYears: true,
    selectMonths: true,
    onStart: function () {
      $("#filter_date").next(".picker").find("select").prop("disabled", false);
    },
    onSet: function () {
      $("#filter_date").next(".picker").find("select").prop("disabled", false);
    }
  });

  // OLD --------------------------------------------------------------------------

  reviewsMakeup();

  // Reviews list gallery slider

  $(".review-tmb-gallery-slider").slick({
    variableWidth: true,
    slidesToScroll: 3,
    infinite: false
  });

  // Reviews slider

  $(".reviews-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true
  });

  // Restaurant menu

  $(".rest-menu-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 4
  });

  $(".rest-menu-slider").on("init", function () {

    $(".rest-menu-nav .menu-nav-tmb").click(function () {

      $(this).closest(".rest-menu-nav").find(".menu-nav-tmb").removeClass("active");
      $(this).addClass("active");

      $(".rest-menu-slider").slick("slickGoTo", $(this).closest(".slick-slide").prevAll().not(".slick-cloned").length)

    });

  });

  $(".rest-menu-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: false,
    arrows: false,
    adaptiveHeight: true
  });

  // Features gallery

  $(".features-galleries-slider").on("init", function () {

    var slider = $(this);

    var navTmbs = $(this).closest(".features-gallery-wrapper").find(".nav-tmb");

    navTmbs.click(function () {

      navTmbs.removeClass("active");

      $(this).addClass("active");

      slider.slick("slickGoTo", $(this).prevAll().length);

    });

  });

  $(".features-galleries-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: false,
    arrows: false
  });

  $(".features-gallery").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });


  $(".guests-select").each(function () {

    var gSelect = $(this);

    gSelect.on('loaded.bs.select changed.bs.select', function (e) {

      console.log(gSelect.find("option:selected").html());

      var formattedVal = "<span class='select-num'>" + gSelect.val() + "</span>" + "<span class='select-text'>" + declOfNum(gSelect.val(), ['гость', 'гостя', 'гостей']) + "</span>";


      gSelect.siblings(".dropdown-toggle").find(".filter-option").html(formattedVal);

    });


  });


  // Expandable

  $("body").on("click", ".expandable-trigger", function () {

    var exTrigger = $(this);

    if (!exTrigger.hasClass("active")) {

      exTrigger.closest(".expandable").find(".expandable-content").slideDown(500, function () {
        exTrigger.addClass("active").html(exTrigger.data("collapsetext"))
      });

    } else {

      exTrigger.closest(".expandable").find(".expandable-content").slideUp(500, function () {
        exTrigger.removeClass("active").html(exTrigger.data("expandtext"))
      });

    }

  });

  // Photo-slider

  $(".photo-slider-thumbs .slide").click(function () {

    var slider = $(this).closest(".photo-slider-wrapper").find(".photo-slider");

    slider.slick("slickGoTo", $(this).prevAll().length);

    $(this).closest(".photo-slider-thumbs").find(".slide").removeClass("active");
    $(this).addClass("active");

  });

  $(".photo-slider").on("afterChange", function(event, slick, currentSlide) {

    var slider = $(this);
    var sliderThumbs = $(this).closest(".photo-slider-wrapper").find(".photo-slider-thumbs");

    sliderThumbs.find(".slide").removeClass("active");

    sliderThumbs.find(".slide[data-slick-index='" + currentSlide + "']").addClass("active");

    if (!sliderThumbs.find(".slide[data-slick-index='" + currentSlide + "']").hasClass("slick-active")) {

      sliderThumbs.slick("slickGoTo", currentSlide);

    }

  });

  $(".photo-slider-thumbs").on("init", function () {

    $(this).find(".slick-slide[data-slick-index=0]").addClass("active");

  });

  $(".photo-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: 'ondemand'
  });

  $(".photo-slider-thumbs").slick({
    slidesToShow: 7,
    slidesToScroll: 6,
    infinite: false,
    lazyLoad: 'ondemand'
  });

  $(".object-tmb a").click(function (e) {

    if ($(e.target).hasClass("slick-arrow")) {
      return false;
    }

  });

  $(".object-tmb-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });

  // Side menu

  $(".side-menu-arrow").click(function () {

    var parentLi = $(this).closest("li");

    parentLi.find(".side-submenu").slideToggle(250, function () {
      parentLi.toggleClass("active");
    });

  });

  // Restaurants slider

  $('.restaurants-slider').on('afterChange', function(event, slick, currentSlide){

    if ($(".restaurants-slider .slick-prev").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .prev-custom").addClass("disabled");
    } else {
      $(".restaurants-slider-wrapper .prev-custom").removeClass("disabled");
    }

    if ($(".restaurants-slider .slick-next").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .next-custom").addClass("disabled");
    } else {
      $(".restaurants-slider-wrapper .next-custom").removeClass("disabled");
    }

  });

  $(".restaurants-slider").on("init", function () {

    if ($(".restaurants-slider .slick-prev").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .prev-custom").addClass("disabled");
    }

    if ($(".restaurants-slider .slick-next").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .next-custom").addClass("disabled");
    }

    $(".restaurants-slider-wrapper .prev-custom").click(function () {
      $(".restaurants-slider").slick("slickPrev");
    });

    $(".restaurants-slider-wrapper .next-custom").click(function () {
      $(".restaurants-slider").slick("slickNext");
    });

  });


  // Main menu

  $(".submenu li").on("mouseenter", function () {

    if ($(this).find("a.has-submenu").length) {
      $(this).addClass("open");
      $(this).find(".sub-submenu").fadeIn(150);

      if ($(this).find(".sub-submenu").offset().left + $(".sub-submenu").width() > $(window).width()) {
        $(this).find(".sub-submenu").addClass("sub-submenu-l");
      }

    }

  });

  $(".submenu li").on("mouseleave", function () {

    if ($(this).find("a.has-submenu").length) {
      $(this).removeClass("open");
      $(this).find(".sub-submenu").fadeOut(150);
    }

  });

  // Main menu END



  // Actions slider

  $('.actions-slider').on('afterChange', function(event, slick, currentSlide){

    if ($(".actions-slider .slick-prev").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .prev-custom").addClass("disabled");
    } else {
      $(".actions-slider-wrapper .prev-custom").removeClass("disabled");
    }

    if ($(".actions-slider .slick-next").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .next-custom").addClass("disabled");
    } else {
      $(".actions-slider-wrapper .next-custom").removeClass("disabled");
    }

  });

  $(".actions-slider").on("init", function () {

    if ($(".actions-slider .slick-prev").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .prev-custom").addClass("disabled");
    }

    if ($(".actions-slider .slick-next").hasClass("slick-disabled")) {
      $(".actions-slider-wrapper .next-custom").addClass("disabled");
    }

    $(".actions-slider-wrapper .prev-custom").click(function () {
      $(".actions-slider").slick("slickPrev");
    });

    $(".actions-slider-wrapper .next-custom").click(function () {
      $(".actions-slider").slick("slickNext");
    });

  });

  $(".actions-slider").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    swipe: false
  });

  // Actions slider END

  // Datepicker

  var monthsRus = ["янавря", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  // Range highlight

  $("body").on("mouseover", ".picker__day", function () {

    if ($(this).closest(".picker").hasClass("filter-date-to") && $(this).closest(".picker").find(".range-selected-edge").length == 1) {

      var fromDate = new Date($(this).closest("form").find(".filter-date-from").pickadate("picker").get("select", "yyyy"), $(this).closest("form").find(".filter-date-from").pickadate("picker").get("select", "m") - 1, $(this).closest("form").find(".filter-date-from").pickadate("picker").get("select", "d"));

      var dateString = $(this).attr("aria-label").split(".");

      var overDate = new Date(dateString[2], parseInt(dateString[1]) - 1, dateString[0]);

      var highlightElements = $(this).closest("form").find(".picker__day").filter(function () {

        var dateString = $(this).attr("aria-label").split(".");

        var thisDate = new Date(dateString[2], parseInt(dateString[1]) - 1, dateString[0]);

        return thisDate > fromDate && thisDate <= overDate;

      });

      $(this).closest(".picker").find(".range-selected").removeClass("range-selected");

      highlightElements.addClass("range-selected");

    }

  });

  $("body").on("mousedown", ".picker-clear", function (event) {

    $(this).closest("form").find(".filter-date").each(function () {

      $(this).next(".picker").find(".range-selected").removeClass("range-selected");

      $(this).data( 'pickadate' ).clear();
      $(this).html("");
    });

  });

  $(".filter-date").each(function () {

    var pickerField = $(this);

    pickerField.pickadate({
      monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      format: 'd.mm.yyyy',
      min: new Date(),
      selectYears: true,
      selectMonths: true,
      onRender: function () {
        pickerField.next(".picker").find(".picker__box").append("<div class='button-wrapper'><div class='picker-clear'>Очистить даты</div></div></div>");
      },
      onSet: function () {

        // Максимальная и минимальная даты

        var fromDate = new Date(pickerField.closest("form").find(".filter-date-from").pickadate("picker").get("select", "yyyy"), pickerField.closest("form").find(".filter-date-from").pickadate("picker").get("select", "m") - 1, pickerField.closest("form").find(".filter-date-from").pickadate("picker").get("select", "d"));

        var toDate = new Date(pickerField.closest("form").find(".filter-date-to").pickadate("picker").get("select", "yyyy"), pickerField.closest("form").find(".filter-date-to").pickadate("picker").get("select", "m") - 1, pickerField.closest("form").find(".filter-date-to").pickadate("picker").get("select", "d"));

        //console.log(toDate);

        if (pickerField.hasClass("filter-date-from") && ( toDate <= fromDate && pickerField.closest("form").find(".filter-date-to").html() != "")) {
          var datePlusDay = addDays(fromDate, 1);
          pickerField.closest("form").find(".filter-date-to").pickadate("picker").set("select", datePlusDay)
        }

        toDate = new Date(pickerField.closest("form").find(".filter-date-to").pickadate("picker").get("select", "yyyy"), pickerField.closest("form").find(".filter-date-to").pickadate("picker").get("select", "m") - 1, pickerField.closest("form").find(".filter-date-to").pickadate("picker").get("select", "d"));

        if (pickerField.hasClass("filter-date-from")) {
          pickerField.closest("form").find(".filter-date-to").pickadate("picker").set("min", addDays(fromDate, 1))
        }

        var fromDateFormatted = fromDate.getDate() + "." + ("0" + (fromDate.getMonth() + 1)).slice(-2) + "." + fromDate.getFullYear();
        var toDateFormatted = toDate.getDate() + "." + ("0" + (toDate.getMonth() + 1)).slice(-2) + "." + toDate.getFullYear();


        var rangeElements = pickerField.closest("form").find(".picker__day").filter(function () {

          var dateString = $(this).attr("aria-label").split(".");

          var thisDate = new Date(dateString[2], parseInt(dateString[1]) - 1, dateString[0]);

          return thisDate > fromDate && thisDate < toDate;

        });

        var edgeElements = pickerField.closest("form").find(".picker__day").filter(function () {

          var dateString = $(this).attr("aria-label").split(".");

          var thisDate = new Date(dateString[2], parseInt(dateString[1]) - 1, dateString[0]);

          return thisDate.getTime() == fromDate.getTime() || thisDate.getTime() == toDate.getTime();

        });

        pickerField.closest("form").find(".range-selected").removeClass("range-selected");
        pickerField.closest("form").find(".range-selected-edge").removeClass("range-selected-edge");

        if (pickerField.closest("form").find(".filter-date-from").html() != "") {
          rangeElements.addClass("range-selected");
          edgeElements.addClass("range-selected-edge");
        }

        //pickerField.closest("form").find("[aria-label='" + fromDateFormatted + "']").addClass("range-selected");
        //pickerField.closest("form").find("[aria-label='" + toDateFormatted + "']").addClass("range-selected");

      }
    });



  });

  $("input[type=file]").fileinput({
    rtl: false,
    showUpload: false,
    showPreview: true,
    showCancel: false,
    browseLabel: "Выбрать фото",
    msgPlaceholder: "",
    dropZoneEnabled: false,
    mainClass: "input-group-lg"
  });

  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });


  // Fancybox

  $("a.fancybox").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  // Forms

  $("body").on("mouseup", "li.dropdown-header", function () {
    $(this).toggleClass("active");
    $(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
    return false;
  });

  $("select").not(".picker__select--month, .picker__select--year").each(function () {
    if ($(this).attr("multiple")) {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор",
        selectedTextFormat: "count",
        countSelectedText: function(count) {
          return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
        }
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
      dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
    }
  });

  $("select.select-grantee-add").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-top-button").length) {
      dropdownHeader = '\
      <div class="dropdown-top-button">\
        <a class="link-add" href="#" data-toggle="modal" data-target="#addGranteeModal"><span>Добавить нового</span></a>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").prepend(dropdownHeader);
    }
  });

  $("select.select-operator-add").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-top-button").length) {
      dropdownHeader = '\
      <div class="dropdown-top-button">\
        <a class="link-add" href="#" data-toggle="modal" data-target="#addOperatorModal"><span>Добавить нового</span></a>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").prepend(dropdownHeader);
    }
  });

  $("body").on("click",".bootstrap-select .btn-save", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
    return false;
  });

  $("body").on("click",".bootstrap-select .btn-cancel", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
    return false;
  });

  $("#contest_operators").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['оператор', 'оператора', 'операторов']);
    }
  });

  $("#search_brand").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['бренд', 'бренда', 'брендов']);
    }
  });

  $("#search_price").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['цена', 'цены', 'цен']);
    }
  });

  $(".select-grantees").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['грантополучатель', 'грантополучателя', 'грантополучателей']);
    }
  });

  $("#search_stock").selectpicker({
    selectAllText: "Выбрать всё",
    deselectAllText: "Снять выбор",
    selectedTextFormat: "count",
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['вариант', 'варианта', 'вариантов']);
    }
  });

  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  })

  $("input.input-phone").mask("+7 (999) 999-99-99");

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

});

function yearsName(age) {
  var txt;
  count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = 'лет';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'год';
    } else if (count >= 2 && count <= 4) {
      txt = 'года';
    } else {
      txt = 'лет';
    }
  }
  return txt;
}

function calcCredit(S,p,n){

  p = +p / 1200;
  n = +n * 12;

  return Math.round(+S * p / (1 - Math.pow(1 + p, -n)));

}

function validateForms() {

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    if (!$(this).closest(".picker").length && !$(this).closest(".form-lister-wrapper").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: true,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.closest(".form-item").addClass("error");
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            error.insertAfter(element);
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-item").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".form-item").removeClass("error");
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if ($(element).closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
            $(element).closest(".form-item").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).next(".error").remove();
          if ($(element).attr("type") == "checkbox") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function cartTotal() {

  var cartTotal = 0;

  $(".cart-item").each(function () {

    if ($(this).data("price")) {
      var itemPrice = $(this).data("price") * $(this).find(".count-input").val();
      cartTotal += itemPrice;
    }

  });

  $(".cart-total-price .price").html(numFormat.to(cartTotal));
  $(".cart-total-all").html(numFormat.to(cartTotal - $(".cart-discount .price").html().replace(/\s+/g, '')));

}

function calcOrder() {

  var orderPrice = $(".order-price-val").html();
  orderPrice = orderPrice.replace(/\s+/g, '');

  var orderDiscount = 0;

  var orderTotal = +orderPrice;

  $(".order-form [data-price]").each(function () {
    if ($(this).attr("type") != "radio") {
      orderTotal += $(this).data("price") - 0;
    } else {
      if ($(this).is(":checked")) {
        orderTotal += $(this).data("price") - 0;
      }
    }
  });

  $(".order-form [data-discount]").each(function () {
    orderDiscount -= $(this).data("discount") - 0;
  });

  //console.log(orderDiscount)

  var orderCouponDiscount = +Math.floor(orderPrice.replace(/\s+/g, '')*(+$("#order_coupon_discount").val()/100));

  orderDiscount -= orderCouponDiscount;

  console.log(orderTotal)

  $(".order-shipping-val").html($("[name='order_shipping_1']:checked").data("price"));

  $(".order-coupon-val").html(orderCouponDiscount);
  $(".order-coupon-percent").html("-"+$("#order_coupon_discount").val());

  $(".order-total-val").html(numFormat.to(orderTotal + orderDiscount));

}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function resizeVideo() {
  $(".home-section-video").css({
    height: $(window).height()
  });

  $(".home-section-video-wrapper").css({
    height: $(window).height() + 800
  });

}

function parallax(obj, objOffset, speed) {

  var objPos = - $(window).scrollTop() + obj.closest(".parallax-wrapper").offset().top + objOffset

  obj.css({
    transform: "translateY(" + objPos + "px)"
  });

}

function fancyboxFix() {

  if($('#mobile-indicator').css('display') == 'block') {
    $('.gallery-big .fancybox').off("click.fb-start");
    $('.gallery-big .fancybox').click(function () {
      return false;
    });
  } else {

    $('.gallery-big .fancybox').fancybox();

  }

}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    $(".docs-list .tr").slick({
      slidesToShow: 2,
      slidesToScroll: 2
    });

  } else {

    if ($(".docs-list .tr").hasClass("slick-initialized")) {
      $(".docs-list .tr").slick("unslick");
    }

  }

}

function readURL(input, img) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function fixElements() {
  var scrollPos = $(window).scrollTop();

  if ($(".data-table").length) {

    if (scrollPos > $(".data-table").offset().top) {
      $(".data-table-over-wrapper").css({
        marginTop: $(".data-table .table-header").height()
      });

      $(".data-table .table-header").addClass("table-header-fixed");



    } else {
      $(".data-table-over-wrapper").css({
        marginTop: 0
      });

      $(".data-table .table-header").removeClass("table-header-fixed");

    }

    if($(".data-table-wrapper .mCSB_container").length > 0) {
      $(".data-table .table-header-fixed tr").css({
          marginLeft: $(".data-table-wrapper .mCSB_container").position().left
      });
    }

  }


  if ($(".data-table").length && $(".data-table-footer").length) {
    if (scrollPos + $(window).height() < $(".data-table").offset().top + $(".data-table").height() + $(".data-table-footer").outerHeight()) {
      $(".data-table-footer").addClass("data-table-footer-fixed");
      $(".data-table-wrapper .mCSB_scrollTools").addClass("scroll-tools-fixed").css({
        bottom: $(".data-table-footer").outerHeight()
      });
    } else {
      $(".data-table-footer").removeClass("data-table-footer-fixed");
      $(".data-table-wrapper .mCSB_scrollTools").removeClass("scroll-tools-fixed").css({
        bottom: 0
      });
    }
  }
}

function datepickerRender(datepicker) {

  if (!datepicker.hasClass("rendered")) {
    datepicker.addClass("rendered");
    datepicker.next(".picker").find("select").selectpicker();
    datepicker.next(".picker").find("div.picker__select--year").wrap("<div class='select-wrapper select-wrapper-year'></div>").before("<label>Год</label>");
    datepicker.next(".picker").find("div.picker__select--month").wrap("<div class='select-wrapper select-wrapper-month'></div>").before("<label>Месяц</label>");
    datepicker.next(".picker").find(".picker__header").append("<div class='picker-table-header'>Дата</div>");
  }
  
}

function fixTables() {

  $(".data-table").each(function () {
    $(this).css({
      width: "0"
    })
  });

  $(".data-table td").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table th").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table tr").each(function () {
    $(this).css({
      width: "auto"
    });
  });



  $(".data-table").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table td").each(function () {
    $(this).css({
      width: $(this).outerWidth()
    });
  });

  $(".table-header tr").each(function () {
    $(this).css({
      width: $(this).outerWidth()
    });
  });

  $(".data-table").css({
    display: "block",
    width: $(".data-table").width()
  }).css({
    display: "table"
  });

  $(".data-table th").each(function () {
    th = $(this);
    th.css({
      width: $(this).closest("table").find("td").filter(function () {return $(this).prevAll().length == th.prevAll().length}).outerWidth()
    });
  });

}

function addDays(startDate,numberOfDays)
{
  var returnDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()+numberOfDays,
    startDate.getHours(),
    startDate.getMinutes(),
    startDate.getSeconds());
  return returnDate;
}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function reviewsMakeup() {

  $(".review-tmb-text").each(function () {

    if ($(this).closest(".review-tmb").find(".review-tmb-gallery").length) {
      var galHeight = 50;
    } else {
      var galHeight = 0;
    }

    $(this).css({
      height: $(this).closest(".review-tmb").height()
            - $(this).closest(".review-tmb").find(".review-tmb-author").outerHeight(true)
            - $(this).closest(".review-tmb").find(".h3").outerHeight(true)
            - galHeight
            - 28
            - 20
    })

  });

}

function countCatalogItem(catalogItem) {

  catalogItem.find(".price-val").html(numFormat.to(catalogItem.find(".count input").val() * catalogItem.find(".count-units-item.active").data("price")))

}

function countCartItem(cartItem) {

  cartItem.find(".cart-item-total-val").html(numFormat.to(cartItem.find(".count input").val() * cartItem.find(".count-units-item.active").data("price")))

}

function cartTotal() {

  var totalPrice = 0;

  $(".cart-item").each(function () {

    totalPrice += $(this).find(".count input").val() * $(this).find(".count-units-item.active").data("price");

  });

  $(".cart-total-price-val").html(numFormat.to(totalPrice));

}

function membersFields(count) {

  var membersItems = $(".enroll-members .form-group");

  membersItems.filter(function () {

    return $(this).prevAll().length >= count;

  }).remove();

  var newFields = '';

  for (i = membersItems.length + 1; i <= count; i++) {

    newFields += '\
    <div class="form-group">\
      <label for="enroll_member_' + i + '">ФИО участника ' + i + '</label>\
      <input type="text" name="enroll_members[]" name="enroll_member_' + i + '">\
    </div>\
    ';

  }

  console.log(newFields);

  $(".enroll-members").append(newFields);

}

function anchorsMenu() {

  var scrollPos = $(window).scrollTop();

  if ($(".anchors-menu").length) {

    if (scrollPos > $(".page-sidebar").offset().top - 20) {
      $(".anchors-menu").addClass("anchors-menu-fixed")
    } else {
      $(".anchors-menu").removeClass("anchors-menu-fixed")
    }

    if ($(".menu-stop").length) {
      var menuStop = $(".menu-stop");
    } else {
      var menuStop = $("footer");
    }

    if (scrollPos > menuStop.offset().top - $(".anchors-menu").outerHeight() - 40) {
      $(".anchors-menu").css({
        marginTop: -scrollPos + menuStop.offset().top - $(".anchors-menu").outerHeight() - 40
      });
    } else {
      $(".anchors-menu").css({
        marginTop: 0
      });
    }

    $("a").filter(function () {
      return $(this).attr("name") != undefined;
    }).each(function () {

      if ($(this).offset().top - scrollPos >= 0 && $(this).offset().top - scrollPos < $(window).height() / 2) {
        $(".anchors-menu a").removeClass("active");
        $(".anchors-menu a[href='#" + $(this).attr("name") + "']").addClass("active");
      }

    });

  }

}

function makeUp() {

  if ($(".page-sidebar").length) {

    $(".page-content").css({
      minHeight: $(".page-sidebar").outerHeight(true)
    });

  }


}

function swapProductSidebar() {

  if ($(".catalog-item-sidebar").length) {

    if ($("#sm-indicator").css("display") == "block") {

      if (!$(".catalog-item-col-descr .catalog-item-sidebar").length) {

        var sidebar = $(".catalog-item-sidebar");

        var sidebarClone = $(".catalog-item-sidebar").clone();

        sidebar.remove();

        $(".catalog-item-col-descr").append(sidebarClone);

      }

    } else {

      if (!$(".page-wrapper-cols-alt > .container > .row > .col-md-3 .catalog-item-sidebar").length) {

        var sidebar = $(".catalog-item-sidebar");

        var sidebarClone = $(".catalog-item-sidebar").clone();

        sidebar.remove();

        $(".page-wrapper-cols-alt > .container > .row > .col-md-3").append(sidebarClone);

      }

    }

  }

}

function stickySidebar() {
  
  if ($(".sticky-sidebar").length) {

    var scrollPos = $(window).scrollTop();
  
    if ($(".sticky-sidebar").outerHeight() < $(window).height()) {
  
      if (scrollPos > $(".sticky-sidebar").parent().offset().top) {
  
        $(".sticky-sidebar").css({
          width: $(".sticky-sidebar").parent().width(),
          position: "fixed",
          top: 0
        });
  
        if (scrollPos > $("footer").offset().top - $(".sticky-sidebar").height() - 40) {
  
          $(".sticky-sidebar").css({
            marginTop: $("footer").offset().top - $(".sticky-sidebar").height() - scrollPos - 40
          });
  
        } else {
  
          $(".sticky-sidebar").css({
            marginTop: 0
          });
  
        }
  
      } else {
  
        $(".sticky-sidebar").css({
          marginTop: 0,
          width: "auto",
          position: "relative",
          top: "auto"
        });
  
      }
  
    } else {
  
      $(".sticky-sidebar").css({
        marginTop: 0,
        width: "auto",
        position: "relative",
        top: "auto"
      });
  
    }

  }

}

function buyTotal() {

  var totalPrice = 0;

  $(".buy-form-item").each(function () {

    var thisPrice = parseInt($(this).find(".buy-price span").html().replace(/\s/g, '')) * parseInt($(this).find(".count input").val());

    totalPrice += thisPrice;

    if ($(this).find(".buy-sub-total-val").length) {

      $(this).find(".buy-sub-total-val").html(numFormat.to(thisPrice));

    }


  });

  $(".buy-form-val").html(numFormat.to(totalPrice));

  if (totalPrice == 0) {

    $(".buy-total").fadeOut(150);

  } else {

    $(".buy-total").fadeIn(150);

  }

}