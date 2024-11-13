function isInt(n){
    return Number(n) === n && n % 1 === 0;
  }
  
  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }
  
  // Zubair Coding
  $(document).ready(function(){
    customScript.init({});
  });
  
  var self;
  var customScript = {
    init: function(settings){
      this.settings = settings;
      self = this;
          
      this.utilities();
      this.nav_menu();
      this.search_form();
      this.work_slider();
      this.pro_slider();
      this.touchspin();
      this.side_bar();
    },
    nav_menu: function() {
      if($(window).width() >= 767) {
        $('#menu-toggle').hover(function() {
            $(this).toggleClass('active');
            $('.navigation').addClass('active');
        });
        $('.navigation').hover(function() {
            $(this).addClass('active');
        });
        $('#menu-toggle').mouseleave(function() {
            $(this).removeClass('active');
            $('.navigation').removeClass('active');
        });
        $('.navigation').mouseleave(function() {
            $(this).removeClass('active');
            $('#menu-toggle').removeClass('active');
        });
      }
      if ($(window).width() <= 767) {
          $('#menu-toggle').click(function() {
              $(this).toggleClass("active");
              $('.navigation').toggleClass("active");
          });
      }
    },
    search_form: function() {
      $(".search-icon").click(function() {
          $(this).next().slideToggle(150);
          setTimeout(function() {
              $('.search-form input.form-control').focus();
          }, 200);
      });
    },
    work_slider: function() {
      $("body.rtl .work-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        rtl: true
      });
  
      $("body:not(.rtl)  .work-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      });
    },
    pro_slider: function() {
      $("body.rtl .pro-slider .main-img").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.pro-slider .thumb-img',
        dots: false,
        adaptiveHeight: true,
        rtl: true
      });
      $("body.rtl .pro-slider .thumb-img").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.pro-slider .main-img',
        dots: false,
        focusOnSelect: true,
        arrows: false,
        rtl: true,
        responsive: [
          {
            breakpoint: 577,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
  
      $(window).resize(function() {
          $(".slider-for-mobile").slick("refresh");
          $(".sliderfor-addone").slick("refresh");
      });
  
      if($(window).width() <= 815) {
          $("body:not(.rtl) .slider-for-mobile").slick({
              dots: false,
              arrows: true,
              slidesToShow: 2,
              infinite: false,
              autoplay: false,
              adaptiveHeight: true,
              responsive: [
                  {
                      breakpoint: 600,
                      settings: {
                          slidesToShow: 1,
                      },
                  },
              ],
          });
      }
  
      // if($(window).width() <= 812) {
      //     $("body:not(.rtl) .slider_for_mobile").slick({
      //         dots: false,
      //         arrows: true,
      //         slidesToShow: 1,
      //         infinite: false,
      //         autoplay: false,
      //     });
      // }
  
  
      if($(window).width() <= 815) {
          $("body.rtl .slider-for-mobile").slick({
              dots: false,
              arrows: true,
              slidesToShow: 2,
              infinite: false,
              autoplay: false,
              adaptiveHeight: true,
              rtl: true,
              responsive: [
                  {
                      breakpoint: 600,
                      settings: {
                          slidesToShow: 1,
                      },
                  },
              ],
          });
      }
  
      $('.testimonial-slider').slick({
        dots: false,
        arrows: true,
        autoplay: true,
        slidesToShow: 1,
        infinite: true,
        autoplay: false,
        adaptiveHeight: false,
      })
  
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
          if( scroll > 500){
              $('.scrolltop').addClass("active");
          }
          else {
            $('.scrolltop').removeClass("active"); 
          }
      });
  
  
      $(".scrolltop").click(function() {
          $("html, body").animate({ 
              scrollTop: 0 
          }, "slow");
          return false;
      });
  
      $("body:not(.rtl) .pro-slider .main-img").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.pro-slider .thumb-img',
        dots: false,
        adaptiveHeight: true
      });
      $("body:not(.rtl) .pro-slider .thumb-img").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.pro-slider .main-img',
        dots: false,
        focusOnSelect: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 577,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
    },
    utilities: function(){
  
      $(document).mouseup(function (e) { 
          var container = $(".account-dropdown"); 
          if(!container.is(e.target) &&  container.has(e.target).length === 0) { 
              $(".account-dropdown .navigation").slideUp();
          } 
      }); 
  
      $(document).mouseup(function (e) { 
          var container2 = $("#srchForm"); 
          if(!container2.is(e.target) &&  container2.has(e.target).length === 0) { 
              $("#srchForm .search-form").slideUp();
          } 
      }); 
  
      $(".account-dropdown > a").on("click", function (e) {
        e.preventDefault();
        $(this).parent().find("ul").slideToggle();
      });
  
      $(".custom-dropdown .toggler").on("click", function(e){
        e.preventDefault();
        if($(window).width() <= 767) {
          $(this).parent().find(".nav-tabs").slideToggle();
  
          $(".nav-tabs li a").on("click", function(){
            var tab_html = $(this).html();
            $(".toggler").html(tab_html);
            $(".nav-tabs").slideUp();          
          });
        }
      });
  
      $(".selectpicker").selectpicker();
  
      $("body.rtl .bundl-slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        variableWidth: true,
        rtl: true
      });
  
      $("body:not(.rtl) .bundl-slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        variableWidth: true
      });
  
      $(".dashboard-dropdown .toggler").on("click", function(e){
        e.preventDefault();
        if($(window).width() <= 767) {
          $(this).parent().find(".dashboard-links").slideToggle();
        }
      });
  
  
      $(".range-slider").on("change", function(){
        var slider_value = $(this).val();
        if($(this).val() < 30) {
          $(this).parent().find(".label-left").addClass("active");
          $(this).parent().find(".label-right").removeClass("active")
        }
        else if($(this).val() > 70) {
          $(this).parent().find(".label-right").addClass("active");
          $(this).parent().find(".label-left").removeClass("active");
        }
        else if($(this).val() > 40 && $(this).val() < 60) {
          $(this).parent().find(".label-center").addClass("active");
          $(this).parent().find(".label-right").removeClass("active");
          $(this).parent().find(".label-left").removeClass("active");
        }
        else {
         $(this).parent().find(".active").removeClass("active"); 
        }
      });
  
  
      if($(window).width() <= 815) {
        $(".slider-for-mobile .nav-link").removeClass('active');
        $(".slider-for-mobile .nav-link").on("click", function() {
            if ($(".nav-link").removeClass("active")) {
                $(this).removeClass("active");
            }
            // $(this).addClass("active");
        });
      }
  
      $(".dropdown-for-mobile .toggler").on("click", function(e){
        e.preventDefault();
        if($(window).width() <= 767) {
          $(this).parent().find(".hide-show").slideToggle();
        }
      });
  
      if($(window).width() <= 815) {
       $('.dashboard-tabs .nav-link').on("click", function(){
            $(this).tab('show');
            $('.hide-show').slideUp();
        });
     }
  
     $(".bunbl-box .body h3").on("click", function() {
        console.log("yes");
        $(this).toggleClass("active");
        $(this).parent('.box-child').find(".list").slideToggle();
      });
  
      $(window).scroll( function(){
        $(".section-title").each(function(){
        var bottom_of_object = $(this).offset().top - 400;
        var bottom_of_window = $(window).scrollTop();
          if( bottom_of_window >= bottom_of_object ){
              $(this).addClass("active");
          }
          else {
           $(this).removeClass("active"); 
          }
        });
      });
  
      $(".navigation-links .inner > li > a").on("click", function(e){
          e.preventDefault();
          $(".navigation-links .inner").find(".active").removeClass("active");
          $(this).addClass("active");
          var  data_id = $(this).attr("href");
          $("html, body").animate({ scrollTop: $(data_id).offset().top }, 1000);
      });
  
      $(".file-icon input").on('change', function (event) {
        var pre_val = $(this).val();
        //console.log(pre_val);
        var countFiles = $(this)[0].files.length;
        var image_holder = $(this).parents(".uploader-wrapper").find(".files-holder");
        image_holder.empty();
        if (typeof (FileReader) != "undefined") {
          for (var i = 0; i < countFiles; i++) {
            var fileType = $(this)[0].files[i].type;
            var extn = fileType.substring(fileType.lastIndexOf('/') + 1).toLowerCase();
            var li;
            alert(extn);
            switch(extn) {
              case "gif":
              case "png":
              case "jpg":
              case "jpeg":
                var reader = new FileReader();
                reader.onload = function (e) {
                  var src = e.target.result;
                  li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='"+src+"' /></li>";
                  image_holder.append(li);
                }
                reader.readAsDataURL($(this)[0].files[i]);
                break;
              
              case "pdf":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/pdf-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "psd":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/psd-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "ai":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/ai-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "doc":
              case "docx":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/docx-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "ppt":
              case "pptx":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/pptx-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "xls":
              case "xlsx":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/xlsx-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "eps":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/eps-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              case "indd":
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/id-icon.png' /></li>";
                image_holder.append(li);
                break;
  
              default:
                li = "<li class='selected'><a href='#' class='remove-img'></a><img class='thumb-image' src='assets_user/images/file-icons/text-icon.png' /></li>";
                image_holder.append(li);
            } 
          }
        } else {
          alert("Pls select correct format");
        } 
        
        $(document).on("click", ".remove-img", function(e) {
          e.preventDefault();
          $(this).parent().remove();
        });
      });
  
      $(window).scroll(function () {
          var position = $(this).scrollTop();
          $('.link-right').each(function () {
              var target = $(this).offset().top - 100;
              var id = $(this).attr('id');
              //console.log(id);
  
              if (position >= target) {
                var elem = $('.navigation-links a[href="#' + id + '"] ');
                elem.parents().find(".current").removeClass("current");
                elem.addClass("current");
                elem.removeClass("disable");
                var elem_position = $(".current").position(); 
                // var elem_position_top = elem_position.top - 0;
                // $(".navigation-wrapper").css("top", "-"+elem_position_top+"px");
              }
          });
      });
  
  
      $(".select-btns input").on("change", function(){
        var input_id = $(this).attr("data-id");
        if($(this).attr("checked", "true")) {
          $("#"+input_id).toggleClass("active");
        }
      });
  
      $(".show-register").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("disabled");
        $(".sign-in").slideUp();
        $(".register").fadeIn();
      });
  
      $('#login-modal').on('hidden.bs.modal', function () {
        $(".show-register").removeClass("disabled");
        $(".register").fadeOut();
      });
  
      $(".back-link").on("click", function() {
        $(".sign-in").slideDown();
        $(".show-register").removeClass("disabled");
        $(".register").fadeOut();
      });
  
    }
  
      /* Qty increment decrement start*/
      $('.qty_inc_btn').click(function(event){
        event.preventDefault();
        
        eInput = $(this).closest('.plus-minus-input').find('input.page_range');
        var preValue = eInput.data('preval');
        preValue = parseInt(preValue)+1;
        eInput.val(preValue);
        eInput.data('preval',preValue);
          if(preValue > 0){
          $(this).parent().find('input').addClass('green-color');
        }else{
          $(this).parent().find('input').removeClass('green-color');
        }
      });
      
      $('.qty_dec_btn').click(function(event){
        event.preventDefault();
        
        eInput = $(this).closest('.plus-minus-input').find('input.page_range');
        var preValue = eInput.data('preval');
        preValue = parseInt(preValue)-1;
        if(preValue < 0){return false;}
        eInput.val(preValue);
        eInput.data('preval',preValue);
          if(preValue > 0){
          $(this).parent().find('input').addClass('green-color');
        }else{
          $(this).parent().find('input').removeClass('green-color');
        }
      });
      /* Qty increment decrement end*/
  
      $('.page_dec_btn').click(function(event){
        //event.preventDefault();
        //alert('run');
  
        var eInput = $(this).closest('.plus-minus-input').find('input.page_range');
        var preValue = eInput.data('preval');
        
        if(preValue < 1){ return false;}
  
        preValue = parseInt(preValue)-1;
  
        if(preValue == 0){
          preValue = 1;
          var range = "1 - 10";
        }else{
          var new_value = parseInt(preValue)-1;
          if(new_value > 0){
            var range = new_value*10+" - "+(new_value*10+10);
          }else{
            preValue = 1;
            var range = "1 - 10";
          }
        }
        
        eInput.val(preValue);
        eInput.data('preval',preValue);
      });
  
      $('.page_inc_btn').click(function(event){
        event.preventDefault();
        //alert('run');
  
        eInput = $(this).closest('.plus-minus-input').find('input.page_range');
        var preValue = eInput.data('preval');
        if(preValue == 0){preValue = 1;}
  
        var range = parseInt(preValue)*10+" - "+(parseInt(preValue)*10+10);
        preValue = parseInt(preValue)+1;
        eInput.val(preValue);
        
        eInput.data('preval',preValue);
  
        if(preValue > 0){
          $(this).parent().find('input').addClass('green-color');
        }else{
          $(this).parent().find('input').removeClass('green-color');
        }
      });
  
      $('.logo_lang_single').click(function(event){
        $( "ul.logo-lang-class li:eq(0)" ).find('div').text(4400);
        $( "ul.logo-lang-class li:eq(1)" ).find('div').text(30);
        $(this).closest("form").find("input[name='price']").val(4400);
        $(this).closest("form").find("input[name='init_price']").val(4400);
        $(this).closest("form").find("input[name='time']").val(30);
        $(this).closest("form").find("input[name='init_time']").val(30);
      });
  
      $('.logo_lang_both').click(function(event){
        $( "ul.logo-lang-class li:eq(0)" ).find('div').text(6400);
        $( "ul.logo-lang-class li:eq(1)" ).find('div').text(40);
        $(this).closest("form").find("input[name='price']").val(6400);
        $(this).closest("form").find("input[name='init_price']").val(6400);
        $(this).closest("form").find("input[name='time']").val(40);
        $(this).closest("form").find("input[name='init_time']").val(40);
      });
  
      $(document).on("click", ".add-cart", function() {
        var eml = $(this);
        eml.parents("tr").find(".statics.brand").addClass("change-color");
        setTimeout(function(){
          eml.parents("tr").find(".change-color").removeClass("change-color");
        }, 1200);
      });
  
      $(".payment-page #bundl-form .bootstrap-touchspin .btn-primary").on("click", function() {
        var text = $(this).parents(".bootstrap-touchspin").find(".form-control").val();
        //console.log(text);
        $(this).parents("tr").find(".show-on-quantity").removeClass("show-on-quantity");
        if(text == "1") {
          $(this).parents("tr").find(".statics").addClass("show-on-quantity");
        }
      });
  
      $(document).on("click", ".color-picker", function(){
        var height1 = $(".color-pallete .relative").height();
        var height2 = $(".color-pallete .selected-colors").height();
        $(".surprise-color figure").css("height", height1+height2);
      });
    },
    side_bar: function(){
      $(document).on("click", ".pro-info .has-child, .cart-items .has-child", function() {
        $(this).toggleClass("active");
        $(this).next(".sub-menu").slideToggle();
      });
    }
  }