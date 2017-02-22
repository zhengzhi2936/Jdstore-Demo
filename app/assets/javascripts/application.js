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
//= require bootstrap/alert
//= require bootstrap
//= require local_time
//= require chosen-jquery
//= require jquery.raty
//= require turbolinks
//= require_tree .

console.log('test compile')

// 首页轮播
$(document).ready(function() {
    $('#myCarousel').carousel({interval: 4000})
});

// 点击事件
$(document).on('click', '.backtop', function () {
  $('body').animate({'scrollTop': 0}, 500)
}).on('mouseenter', '.support', function () {
  $('.ewm').show().stop().animate({left: '-136px', opacity: 1}, 500)
}).on('mouseleave', '.support', function () {
  $('.ewm').stop().animate({opacity: 0}, 500, function () {
    $(this).css('left', 0).hide()
  })
})

// 拉票小功能
var $header = $('.header')
var $sidebar = $('#sidebar')
var $category_sidebar = $('.category_sidebar')

$(window).scroll(function () {
  if ($(this).scrollTop() > 500) {
    $sidebar.fadeIn()
    $category_sidebar.fadeIn()
  } else {
    $sidebar.fadeOut()
    $category_sidebar.fadeOut()
  }

  if ($(this).scrollTop() > 300) {
    if ($header.is(':animated')) {
      return false
    }
    $header.addClass('header_fixed')
    $header.stop().animate({top: 0})
    $('.header_placeholder').show()
  } else {
    $header.css({top: -80})
    $header.removeClass('header_fixed')
    $('.header_placeholder').hide()
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
    $('.commentBigImage').hide()
    return false
  }
  $(this).addClass('selected').siblings().removeClass('selected')
  $('.commentBigImage').attr('src', $(this).attr('src')).fadeIn()
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


