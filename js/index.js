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

		run: function(){
			var code = this.runBtn.siblings('.code-box').html();
			code = code.replace(/\<xmp\>/g,'').replace(/\<\/xmp\>/g,'').replace(/<br>/g,'');
			console.log(code);
			
			//tinymce.activeEditor = tinyMCE.activeEditor = null;
			$('.mce-tinymce').remove();
			$('.content-tinyarea').attr('id','');
			eval(code);
			var interval = setInterval(function(){
				if($('.mce-tinymce').length){
					$('.mce-tinymce').show();
					clearInterval(interval);
				}
			},50);
			
		},

		bindEvent: function(){
			var This = this;
			This.runBtn.on('click', function(){
				This.run();
			});
		},

		init: function(){
			this.bindEvent();
		}
	};
	runCode.init();

	//全屏切换
	var page = 1;
	var toTop = function(){
		if(page == $('.content').length){
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
	var toBottom = function(){
		if(page == 1){
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

	$(document).bind('keydown', function(e){
		console.log(e.keyCode);
		var keyCode = e.keyCode;
		if(keyCode == 27){
			resize.smaller();
		}else if(keyCode == 122){
			resize.bigger();
		}else if(keyCode == 38){ //shang
			toBottom();
		}else if(keyCode == 40){ //xia	
			toTop();
		}else if(keyCode == 37){ //zuo	

		}else if(keyCode == 39){ //you

		}
	});
})