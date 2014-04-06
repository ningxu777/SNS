$(function(){
	//全屏
	var resize = {
		
		floatBar: $('.floatBar'),
		left: $('.left'),
		right: $('.right'),
		
		bigger: function(){
			this.left.animate({left: "-20%"},200);
			this.right.animate({left: "0",width: "100%"},200);
			this.floatBar.html('退出');
		},

		smaller: function(){
			this.right.animate({left: "20%",width: "80%"},200);
			this.left.animate({left: "0"},200);
			this.floatBar.html('全屏');
		},

		bindEvent: function(){
			var This = this;
			This.floatBar.on('click', function(){
				var leftLeft = This.left.css('left');
				if(leftLeft == '0px'){
					This.bigger();
				}else{
					This.smaller();
				}

				
			});
		},

		init: function(){
			this.bindEvent();
		}
	};
	resize.init();

	//运行代码
	var runCode = {

		runBtn: $('.code-run'),

		show: function(){
			var interval = setInterval(function(){
				console.log($('.mce-tinymce').length);
				if($('.mce-tinymce').length){
					$('.mce-tinymce').css('visibility','visible');
					clearInterval(interval);
				}
			},50);
		},

		run: function(){
			var code = this.runBtn.siblings('.code-box').html();
			code = code.replace(/\<xmp\>/g,'').replace(/\<\/xmp\>/g,'').replace(/<br>/g,'');
			$('.mce-tinymce').remove();
			$('.content-tinyarea').attr('id','');
			eval(code);
		},

		bindEvent: function(){
			var This = this;
			This.runBtn.on('click', function(){
				This.run();
			});
		},

		init: function(){
			this.bindEvent();
			this.show();
		}
	};
	runCode.init();

	//开始、过程、结尾三主屏切换
	var mainPage = 1;
	var page = 0;

	var mainToTop = function(){
		if(mainPage == 2 && page != $('.content').length){
			pageToTop();
			return;
		}
		if(mainPage == $('.screen').length){
			return;
		}
		var This = $('.main'+mainPage);
		This.addClass('pt-page-moveToTop');
		This.next().addClass('pt-page-moveFromBottom');
		This.next().addClass('main-page-current');
		setTimeout(function(){
			This.removeClass('pt-page-moveToTop');
			This.removeClass('main-page-current');
			This.next().removeClass('pt-page-moveFromBottom');
		},700);
		mainPage++;
	};
	var mainToBottom = function(){
		if(mainPage == 2 && page != 0){
			pageToBottom();
			return;
		}
		if(mainPage == 1){
			return;
		}
		var This = $('.main'+mainPage);
		This.addClass('pt-page-moveToBottom');
		This.prev().addClass('pt-page-moveFromTop');
		This.prev().addClass('main-page-current');
		setTimeout(function(){
			This.removeClass('pt-page-moveToBottom');
			This.removeClass('main-page-current');
			This.prev().removeClass('pt-page-moveFromTop');
		},700);
		mainPage--;
	};

	//page全屏切换
	var pageToTop = function(){
		if(page == 0){
			menuToLeft();
			return;
		}
		var This = $('.page'+page);
		This.addClass('pt-page-moveToTop');
		This.next().addClass('pt-page-moveFromBottom');
		This.next().addClass('pt-page-current');
		setTimeout(function(){
			This.removeClass('pt-page-moveToTop');
			This.removeClass('pt-page-current');
			This.next().removeClass('pt-page-moveFromBottom');
		},700);
		page++;
	};
	var pageToBottom = function(){
		if(page == 1){
			menuToRight();
			return;
		}
		var This = $('.page'+page);
		This.addClass('pt-page-moveToBottom');
		This.prev().addClass('pt-page-moveFromTop');
		This.prev().addClass('pt-page-current');
		setTimeout(function(){
			This.removeClass('pt-page-moveToBottom');
			This.removeClass('pt-page-current');
			This.prev().removeClass('pt-page-moveFromTop');
		},700);
		page--;
	};

	//目录展开收起
	var menuToLeft = function(){
		var time = 600;
		$('.left').animate({width:'20%'},time);
		$('.menu').animate({width:'80%',marginTop:'130px'},time);
		$('.menu-title').animate({fontSize:'25px',borderWidth:'0px',lineHeight:'40px'},time);
		$('.menu-li').animate({lineHeight:'30px'},time);
		$('.menu-li-icon').animate({width:'0px',marginRight:'0px'},time);
		$('.right').animate({left:'20%'},time);
		setTimeout(function(){
			$('.menu-li-ul').show();
			$('.left').css('background-color','#f1f1f1');
			$('.menu-li').css('border-color','#ebebeb');
		},time);
		page++;
	};
    var menuToRight = function(){
    	var time = 600;
    	$('.left').animate({width:'100%'},time);
    	$('.menu').animate({width:'1000px',marginTop:'70px'},time);
		$('.menu-title').animate({fontSize:'30px',borderWidth:'2px',lineHeight:'70px'},time);
		$('.menu-li').animate({lineHeight:'50px'},time);
		$('.menu-li-icon').animate({width:'14px',marginRight:'15px'},time);
		$('.menu-li-ul').hide();
		$('.left').css('background-color','#fff');
		$('.menu-li').css('border-color','#fff');
		$('.right').animate({left:'100%'},time);
    	page--;
    };



	//textPage翻页
	var textPage = 1;
	var toLeft = function(parent){
		if(textPage == parent.find('.content-text').length){
			return;
		}
		var This = parent.find('.textPage'+textPage);
		This.addClass('pt-page-moveToLeft');
		This.next().addClass('pt-page-moveFromRight');
		This.next().addClass('text-page-current');
		setTimeout(function(){
			This.removeClass('pt-page-moveToLeft');
			This.removeClass('text-page-current');
			This.next().removeClass('pt-page-moveFromRight');
		},700);
		textPage++;
	};

	$('.content-pageBar-item').bind('click', function(){
		var index = $(this).index();
		var list = $(this).parents('.content-box').find('.content-text');
		for(var i = 0 ; i < list.length ; i++){
			if(i == index){
				$(list[i]).addClass('text-page-current');
			}else{
				$(list[i]).removeClass('text-page-current');
			}
		}
		textPage = index + 1;
	})

	$(document).bind('keydown', function(e){
		var keyCode = e.keyCode;
		if(keyCode == 27){
			resize.smaller();
		}else if(keyCode == 122){
			resize.bigger();
		}else if(keyCode == 38){ //shang
			mainToBottom();
		}else if(keyCode == 40){ //xia	
			mainToTop();
		}else if(keyCode == 37){ //zuo	

		}else if(keyCode == 39){ //you

		}
	}).bind('mousewheel', function(e,delta){
		var delta = e.originalEvent.deltaY;
		if(delta > 0){
			mainToTop();
		}else{
			mainToBottom();
		}
		console.log(delta);
	});
})