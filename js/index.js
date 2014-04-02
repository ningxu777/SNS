$(function(){
	//全屏
	var resize = {
		
		floatBar: $('.floatBar'),
		left: $('.left'),
		right: $('.right'),
		
		bigger: function(){
			this.left.animate({left: "-20%"},100);
			this.right.animate({left: "0",width: "100%"},100);
		},

		smaller: function(){
			this.right.animate({left: "20%",width: "80%"},100);
			this.left.animate({left: "0"},100);
			
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
})