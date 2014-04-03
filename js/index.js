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

				//全屏切换
	$('.content').on('click', function(){
		$(this).addClass('changeColor');
		setTimeout(function(){
			console.log(1);
			$(this).hide();
			//$(this).removeClass('.changeColor');
		},2020);
	});
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


})