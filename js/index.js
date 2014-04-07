$(function(){
	//全屏\退出全屏
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

	
	var turnPage = {

		mainPage: 1,
		page: 0,
		textPage: 1,

		//开始、过程、结尾三主屏切换
		mainToTop: function(){
			if(this.mainPage == 2 && this.page != $('.content').length){
				this.pageToTop();
				return;
			}
			if(this.mainPage == $('.screen').length){
				return;
			}
			var currDom = $('.main'+this.mainPage);
			currDom.addClass('pt-page-moveToTop');
			currDom.next().addClass('pt-page-moveFromBottom');
			currDom.next().addClass('main-page-current');
			setTimeout(function(){
				currDom.removeClass('pt-page-moveToTop');
				currDom.removeClass('main-page-current');
				currDom.next().removeClass('pt-page-moveFromBottom');
			},700);
			this.mainPage++;
		},
		mainToBottom: function(){
			if(this.mainPage == 2 && this.page != 0){
				this.pageToBottom();
				return;
			}
			if(this.mainPage == 1){
				return;
			}
			var currDom = $('.main'+this.mainPage);
			currDom.addClass('pt-page-moveToBottom');
			currDom.prev().addClass('pt-page-moveFromTop');
			currDom.prev().addClass('main-page-current');
			setTimeout(function(){
				currDom.removeClass('pt-page-moveToBottom');
				currDom.removeClass('main-page-current');
				currDom.prev().removeClass('pt-page-moveFromTop');
			},700);
			this.mainPage--;
		},

		//page全屏切换
		pageToTop: function(){
			if(this.page == 0){
				resize.smaller();
				this.menuToLeft();
				return;
			}
			var currDom = $('.page'+this.page);
			currDom.addClass('pt-page-moveToTop');
			currDom.next().addClass('pt-page-moveFromBottom');
			currDom.next().addClass('pt-page-current');
			setTimeout(function(){
				currDom.removeClass('pt-page-moveToTop');
				currDom.removeClass('pt-page-current');
				currDom.next().removeClass('pt-page-moveFromBottom');
			
			},700);
			if(currDom.next().find('.content-pageBar-item').length){
				console.log(turnPage.page);
				syncMenu.changeStyle(turnPage.page,0);
				turnPage.textChangePage($(currDom.next().find('.content-pageBar-item')[0]));
			}else{
				syncMenu.changeStyle(turnPage.page);
			}
			turnPage.textPage = 1;
			this.page++;
		},
		pageToBottom: function(){
			if(this.page == 1){
				resize.smaller();
				this.menuToRight();
				return;
			}
			var currDom = $('.page'+this.page);
			currDom.addClass('pt-page-moveToBottom');
			currDom.prev().addClass('pt-page-moveFromTop');
			currDom.prev().addClass('pt-page-current');
			setTimeout(function(){
				currDom.removeClass('pt-page-moveToBottom');
				currDom.removeClass('pt-page-current');
				currDom.prev().removeClass('pt-page-moveFromTop');
			},700);
			if(currDom.prev().find('.content-pageBar-item').length){
				console.log(turnPage.page);
				syncMenu.changeStyle(turnPage.page-2,0);
				turnPage.textChangePage($(currDom.prev().find('.content-pageBar-item')[0]));
			}else{
				syncMenu.changeStyle(turnPage.page-2);
			}
			turnPage.textPage = 1;
			this.page--;
		},

		//目录展开收起
		menuToLeft: function(){
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
				$('.menu-li').css({'border-color':'#ebebeb','cursor':'pointer'});
				syncMenu.changeStyle(turnPage.page-1);
			},time);
			this.page++;
		},
	    menuToRight: function(){
	    	var time = 600;
	    	$('.left').animate({width:'100%'},time);
	    	$('.menu').animate({width:'1000px',marginTop:'70px'},time);
			$('.menu-title').animate({fontSize:'30px',borderWidth:'2px',lineHeight:'70px'},time);
			$('.menu-li').animate({lineHeight:'50px'},time);
			$('.menu-li-icon').animate({width:'14px',marginRight:'15px'},time);
			$('.menu-li-ul').hide();
			$('.left').css('background-color','#fff');
			$('.menu-li').css({'border-color':'#fff','cursor':'default'});
			$('.right').animate({left:'100%'},time);
			$('.active').removeClass('active');
	    	this.page--;
	    },

	    //textPage翻页
		// textToLeft: function(parent){
		// 	if(this.textPage == parent.find('.content-text').length){
		// 		return;
		// 	}
		// 	var currDom = parent.find('.textPage'+textPage);
		// 	currDom.addClass('pt-page-moveToLeft');
		// 	currDom.next().addClass('pt-page-moveFromRight');
		// 	currDom.next().addClass('text-page-current');
		// 	setTimeout(function(){
		// 		currDom.removeClass('pt-page-moveToLeft');
		// 		currDom.removeClass('text-page-current');
		// 		currDom.next().removeClass('pt-page-moveFromRight');
		// 	},700);
		// 	this.textPage++;
		// },

		textChangePage: function(currDom){
			var index = currDom.index();
			$('.bg-white').removeClass('bg-white');
			currDom.addClass('bg-white');
			var list = currDom.parents('.content-box').find('.content-text');
			for(var i = 0 ; i < list.length ; i++){
				if(i == index){
					$(list[i]).addClass('text-page-current');
				}else{
					$(list[i]).removeClass('text-page-current');
				}
			}
			this.textPage = index + 1;
		},

	    bindEvent: function(){
	    	var This = this;
	    	$('.screen').bind('click', function(){
	    		//This.mainToTop();
	    	});

	    	$('.content-pageBar-item').bind('click', function(e){
				e.stopPropagation();
				syncMenu.changeStyle(This.page-1,$(this).index());
				This.textChangePage($(this));
			})
	    },

	    init: function(){
	    	this.bindEvent();
	    }
	};
	turnPage.init();

    //同步菜单
    var syncMenu = {

    	changeStyle: function(page, textPage){
	    	
	    	$('.active').removeClass('active');
	    	if(textPage+1){
	    		console.log($('.menu-li-title')[page]);
	    		$($($('.menu-li-title')[page]).siblings('.menu-li-ul').children('li')[textPage]).addClass('active');
	    	}else{
		    	$($('.menu-li-title')[page]).addClass('active');
		    }
	    },

	    sync: function(page,textPage){
	    	
	    	$('.pt-page-current').removeClass('pt-page-current')
	    	$('.page'+(page+1)).addClass('pt-page-current')
	    	if(textPage+1){
	    		var pageBar = $($('.page'+(page+1)).find('.content-pageBar-item')[textPage]);
	    		pageBar.click();
	    	}else{
	    		
	    	}
	    },

	    bindEvent: function(){
	    	var This = this;
	    	$('.menu-ableClick').bind('click', function(e){
		    	e.stopPropagation();
		    	if(turnPage.page == 0){
		    		return;
		    	}
		    	var childMenu = $(this).siblings('.menu-li-ul');
		    	var menuLiLi = $(this).siblings('.menu-li-li');
		    	
		    	if(childMenu.length){ //有二级菜单，且target为一级
		    		turnPage.textPage = 1;
		    		turnPage.page = $(this).parent().index()+1;
		    		This.changeStyle(turnPage.page-1,0);
		    		This.sync(turnPage.page-1,0);
		    	}else{
		    		if(menuLiLi.length){ //有二级菜单，且target为二级
		    			turnPage.textPage = $(this).index() + 1;
		    			turnPage.page = $(this).parent().parent().index()+1;
		    			This.changeStyle(turnPage.page-1,turnPage.textPage-1);
		    			This.sync(turnPage.page-1,turnPage.textPage-1);
		    		}else{ //无二级菜单，且target为一级
		    			turnPage.page = $(this).parent().index()+1;
		    			This.changeStyle(turnPage.page-1);
		    			This.sync(turnPage.page-1);
		    		}
		    		
		    	}
		    });

	    },

	    init: function(){
	    	this.bindEvent();
		}  
	};
	syncMenu.init();


	$(document).bind('keydown', function(e){
		var keyCode = e.keyCode;
		if(keyCode == 27){
			resize.smaller();
		}else if(keyCode == 122){
			resize.bigger();
		}else if(keyCode == 38){ //shang
			turnPage.mainToBottom();
		}else if(keyCode == 40){ //xia	
			turnPage.mainToTop();
		}else if(keyCode == 37){ //zuo	

		}else if(keyCode == 39){ //you

		}
	}).bind('mousewheel', function(e,delta){
		var delta = e.originalEvent.deltaY;
		if(delta > 0){
			turnPage.mainToTop();
		}else{
			turnPage.mainToBottom();
		}
		console.log(delta);
	});
})