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
//= require turbolinks
//= require_tree .

!function(a){a.fly=function(b,c){var d={version:"1.0.0",autoPlay:!0,vertex_Rtop:20,speed:1.2,start:{},end:{},onEnd:a.noop},e=this,f=a(b);e.init=function(a){this.setOptions(a),!!this.settings.autoPlay&&this.play()},e.setOptions=function(b){this.settings=a.extend(!0,{},d,b);var c=this.settings,e=c.start,g=c.end;f.css({marginTop:"0px",marginLeft:"0px",position:"fixed"}).appendTo("body"),null!=g.width&&null!=g.height&&a.extend(!0,e,{width:f.width(),height:f.height()});var h=Math.min(e.top,g.top)-Math.abs(e.left-g.left)/3;h<c.vertex_Rtop&&(h=Math.min(c.vertex_Rtop,Math.min(e.top,g.top)));var i=Math.sqrt(Math.pow(e.top-g.top,2)+Math.pow(e.left-g.left,2)),j=Math.ceil(Math.min(Math.max(Math.log(i)/.05-75,30),100)/c.speed),k=e.top==h?0:-Math.sqrt((g.top-h)/(e.top-h)),l=(k*e.left-g.left)/(k-1),m=g.left==l?0:(g.top-h)/Math.pow(g.left-l,2);a.extend(!0,c,{count:-1,steps:j,vertex_left:l,vertex_top:h,curvature:m})},e.play=function(){this.move()},e.move=function(){var b=this.settings,c=b.start,d=b.count,e=b.steps,g=b.end,h=c.left+(g.left-c.left)*d/e,i=0==b.curvature?c.top+(g.top-c.top)*d/e:b.curvature*Math.pow(h-b.vertex_left,2)+b.vertex_top;if(null!=g.width&&null!=g.height){var j=e/2,k=g.width-(g.width-c.width)*Math.cos(j>d?0:(d-j)/(e-j)*Math.PI/2),l=g.height-(g.height-c.height)*Math.cos(j>d?0:(d-j)/(e-j)*Math.PI/2);f.css({width:k+"px",height:l+"px","font-size":Math.min(k,l)+"px"})}f.css({left:h+"px",top:i+"px"}),b.count++;var m=window.requestAnimationFrame(a.proxy(this.move,this));d==e&&(window.cancelAnimationFrame(m),b.onEnd.apply(this))},e.destory=function(){f.remove()},e.init(c)},a.fn.fly=function(b){return this.each(function(){void 0==a(this).data("fly")&&a(this).data("fly",new a.fly(this,b))})}}(jQuery);

// 购物车效果
$(function() { 
    var offset = $("#end").offset(); 
    $(".addCartBtn").click(function(event){ 
        var addcar = $(this); 
        var img = addcar.closest('.productList-item').find('.productList-item-pic img').attr('src'); 
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
                $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息 
                addcar.css("cursor","default").removeClass('orange').unbind('click'); 
                this.destory(); //移除dom 
            } 
        }); 
    }); 
}); 

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
    $header.stop().animate({top: 0}, 600)
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
