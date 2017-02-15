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
//= require bootstrap/dropdown
//= require bootstrap/modal
//= require local_time
//= require chosen-jquery
//= require jquery.raty
//= require ratyrate
//= require turbolinks
//= require_tree .


// 放大镜
$('#preview').css('visibility', 'hidden')
var evt = new Event(),
    m = new Magnifier(evt);
m.attach({
    thumb: '#thumb',
    large: $('.intro-preview-activeItem img').attr('src'),
    largeWrapper: 'preview',
    zoom: 1.5,
    onthumbenter: function () {
        console.log('onthumbenter')
        $('#preview').css('visibility', 'visible')
    },
    onthumbleave: function () {
        $('#preview').css('visibility', 'hidden')
    }
})

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

// 预览图选择
$(document).on('click', '.intro-preview-item', function () {
	var src = $(this).find('img').attr('src')
	$('.intro-bigPic img').attr('src', src)
    $('#thumb-lens').css('background-image', 'url(' + src + ')')
	$(this).addClass('intro-preview-activeItem').siblings().removeClass('intro-preview-activeItem')
	m.attach({
        thumb: '#thumb',
        large: src,
        largeWrapper: 'preview',
        onthumbenter: function () {
            $('#preview').css('visibility', 'visible')
        },
        onthumbleave: function () {
        	$('#preview').css('visibility', 'hidden')
        }
	})
})

// 拉票小功能
$(window).scroll(function () {
	if ($(this).scrollTop() > 500) {
		$('#sidebar').fadeIn()
	} else {
		$('#sidebar').fadeOut()
	}
})

// 详情菜单栏切换
$(document).on('click', '.productDetail-tabList-tab', function () {
	$(this).addClass('productDetail-tabList-activeTab').siblings().removeClass('productDetail-tabList-activeTab')
	$('.productDetail-content').eq($(this).index()).show().siblings().hide()
})

