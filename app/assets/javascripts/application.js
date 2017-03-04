// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require bootstrap
//= require local_time
//= require chosen-jquery
//= require jquery.raty
//= require_tree .

// landing page 动画效果
new WOW().init();

// 购物车效果
$(function() {
    var offset = $("#end").offset();
    $(".addCartBtn").click(function(event){
        var addcar = $(this);
        var img = addcar.closest('.productList-item').find('.productList-item-pic img').attr('src');
        if (!img) img = $('#thumb').attr('src');
        var flyer = $('<img class="u-flyer" src="'+img+'">');
        flyer.fly({
            start: {
                left: event.pageX - 20, //开始位置（必填）#fly元素会被设置成position: fixed
                top: event.clientY - 20 //开始位置（必填）
            },
            end: {
                left: $('.fa-shopping-cart').offset().left, //结束位置（必填）
                top: $('.fa-shopping-cart').offset().top - $(window).scrollTop(), //结束位置（必填）
                width: 10, //结束时宽度
                height: 10 //结束时高度
            },
            onEnd: function(){ //结束回调
                this.destory(); //移除dom
            }
        });
    });
});

// 首页轮播
$(document).ready(function() {
    $('#myCarousel').carousel({interval: 4000})
    $(window).trigger('scroll') // 一开始就触发一下滚动事件
});

// 点击事件
$(document).on('click', '.backtop', function () {
  $('body').animate({'scrollTop': 0}, 500) // 在500ms内，慢慢地回到顶部
}).on('mouseenter', '.support', function () {
  $('.ewm').show().stop().animate({left: '-136px', opacity: 1}, 500)
}).on('mouseleave', '.support', function () {
  $('.ewm').stop().animate({opacity: 0}, 500, function () {
    $(this).css('left', 0).hide()
  })
})

// 下拉时显示「顶部导航栏」和「侧边栏」
var $header = $('.header')
var $sidebar = $('#sidebar')
var $category_sidebar = $('.category_sidebar')
var $lp_navbar = $('.lp-navbar')

$(window).scroll(function () {
  if ($(this).scrollTop() > 500) {
    $sidebar.fadeIn()
    $category_sidebar.fadeIn() // 慢慢地显示侧边栏
  } else {
    $sidebar.fadeOut()
    $category_sidebar.fadeOut() // 慢慢地隐藏侧边栏
  }

  if ($(this).scrollTop() > 120) {
    if ($header.is(':animated')) {
      return false
    }
    $('.header_placeholder').show() // 显示「用来占位」的header
    $header.addClass('header_fixed') // 让导航栏固定在顶部
    $header.stop().animate({top: 0}, 600) // 在600ms内，慢慢地出来
  } else {
    $('.header_placeholder').hide()
    $header.removeClass('header_fixed')
    $header.css({top: -80})
  }
})

// 详情菜单栏切换
$(document).on('click', '.productDetail-tabList-tab', function () {
  $(this).addClass('productDetail-tabList-activeTab').siblings().removeClass('productDetail-tabList-activeTab')
  $('.productDetail-content').eq($(this).index()).show().siblings().hide()
})


// 评论图片放大
$('.comment-image').click(function () {
  if ($(this).hasClass('comment-image-scale')) {
    $(this).removeClass('comment-image-scale')
  } else {
    $(this).addClass('comment-image-scale')
  }
})

// 投票
$('.star-look').raty({
  path: '/ratyrate/',
    readOnly: true,
    score: function() {
    return $(this).attr('data-score');
  }
});

$('.star-price').raty({
  path: '/ratyrate/',
    readOnly: true,
    score: function() {
    return $(this).attr('data-score');
  }
});

$('.star-rating').raty({
  path: '/ratyrate/',
    readOnly: true,
    score: function() {
    return $(this).attr('data-score');
  }
});

$('#star-rating').raty({
  path: '/ratyrate/',
  scoreName: 'post[rating]'
});

$('#star-look').raty({
  path: '/ratyrate/',
  scoreName: 'post[look]'
});

$('#star-price').raty({
  path: '/ratyrate/',
  scoreName: 'post[price]'
});

$('#star-rating img').eq(0).trigger('click')
$('#star-look img').eq(0).trigger('click')
$('#star-price img').eq(0).trigger('click')

// 放大镜
$('#preview').css('visibility', 'hidden')
var evt = new Event(),
    m = new Magnifier(evt);
m.attach({
    thumb: '#thumb',
    large: $('.intro-preview-activeItem img').attr('src'),
    largeWrapper: 'preview',
    zoom: 2
})

// 评论图选择
$('.commentImage').click(function () {
  if ($(this).hasClass('selected')) {
    $(this).parent().find('.commentBigImage').hide()
    $(this).removeClass('selected')
    return false
  }
  $(this).addClass('selected').siblings().removeClass('selected')

  $(this).parent().find('.commentBigImage').attr('src', $(this).attr('src')).fadeIn()
})

// 预览图选择
$(document).on('mouseover', '.intro-preview-item', function () {
  var src = $(this).find('img').attr('src')
  $('.intro-bigPic img').attr('src', src)
    $('#thumb-lens').css('background-image', 'url(' + src + ')')
  $(this).addClass('intro-preview-activeItem').siblings().removeClass('intro-preview-activeItem')
  m.attach({
        thumb: '#thumb',
        large: src,
        largeWrapper: 'preview'
  })
})

$('.intro-preview-activeItem').trigger('mouseover')
$(document).on('mouseover', '.magnifier-thumb-wrapper', function (e) {
    $('#preview').css('visibility', 'visible')
})
$(document).on('mouseout', '.magnifier-thumb-wrapper', function (e) {
    $('#preview').css('visibility', 'hidden')
})
