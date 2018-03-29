var Index = {
	init(){
		this.setBannerHeight();
		
		this.eventListener.addEvent();
	},
	setBannerHeight(){
		var menuHeight = $(".header").height();// 导航高度
		var footer = $("footer").height();
		var windowHeight = window.innerHeight;
		$(".con").css("min-height",(windowHeight - menuHeight) + "px");
//		$(".con").height((windowHeight - menuHeight - footer) + "px");
		
	},
	eventListener : {
		addEvent(){
			console.log(66);
			$(".xs_menu").click(function(event){
				event.stopPropagation();
				if($(this).parent().hasClass("active")){
					$(this).parent().removeClass("active");
					$(this).parent().addClass("hidden_menu");
				}else{
					$(this).parent().addClass("active");
					$(this).parent().removeClass("hidden_menu");
				}
			});// 菜单点击事件
		},
	}
}
