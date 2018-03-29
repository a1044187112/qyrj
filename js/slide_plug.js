var slide = {

	entry(imgData) {
		this.initHtml(imgData); // 初始化Dom
		document.getElementsByClassName("radius_item")[0].style.background = "#ff7417"; // 加载时将第一个圆点设为选中状态
		
		slide.bannerList = document.getElementById("banner_list"); //  父选择器
		slide.count = 0; // 当前播放的图片是第几张
		slide.moveDistance = 100;  // 每一次滚动的距离 默认为100%


		this.imgPlaying();

		this.addEvent.eventList();

	},

	imgPlaying() {
		var self = this;
		var imgList = document.getElementsByClassName("banner_item");
		slide.fTimer = setInterval(function() {
			slide.count++;
			self.setRadius();
			// 移动的时候监听同时对应圆点 count 是表示当前图片显示的是第几张
			if(slide.count % slide.imgData.length == 0) {
				slide.bannerList.style.marginLeft = "0";
				slide.count = 0;
			}
			self.everyImgAnim();

		}, 5000);

	},
	everyImgAnim() {
		var initMoveDistance = Math.abs(parseInt(slide.bannerList.style.marginLeft)); // 每一次移动的初始位置
		var evetyTimeDistance = slide.moveDistance / 100; // 每一次移动的距离
		var moveCount = 0; //移动的次数
		slide.moveTimer = setInterval(function() {
			moveCount++;
			slide.bannerList.style.marginLeft = (-initMoveDistance - evetyTimeDistance * moveCount) + "%";
			if(moveCount == 100) { // 动画播放  每一次执行时间0.015
				clearInterval(slide.moveTimer); // 移动完以后清除计时器 
				moveCount = 0;
			}
		}, 600 / 100);
	},

	setRadius() {
		var radiusSelected = document.getElementsByClassName("radius_item");
		for(var i = 0; i < radiusSelected.length; i++) {
			radiusSelected[i].style.background = "#969696";
		}
		radiusSelected[slide.count % slide.imgData.length].style.background = "#23978a";
	},
	
	clickPro(i){
		clearInterval(slide.fTimer); // 点击之后清除滚动的计时器
		slide.moveDistance = -(slide.count-i)*100;  // 移动的距离
		slide.everyImgAnim();	
		slide.count = i; // 当前显示的图片为当前点击id
	},

	addEvent: {
		eventList() {
			window.onfocus = function(){ // 浏览器窗口获得焦点
				this.imgPlaying();
			},
			window.onblur = function(){ // 浏览器窗口失去焦点
				clearInterval(slide.fTimer);
			}
		},

		radiusItemClick(event) {
			var i = event.target.getAttribute("data-id");
			var radiusItem = document.getElementsByClassName("radius_item");
			for(var j = 0;j<radiusItem.length ;j++){
				radiusItem[j].style.background = "#969696";
			}
			radiusItem[i].style.background = "#23978a";
			
			
			if(slide.count > i) { // 当前显示的图片id大于点击的圆点的id  要向右移
				slide.clickPro(i);
			} else if(slide.count < i) { // 当前显示的图片id小于点击的圆点的id  要向左移
				slide.clickPro(i);
			} else { // 当前显示的图片是点击的圆点对应的图片  不处理

			}
			// 获取当前显示的图片是第几张

		},
		
	},




	initHtml(imgData) { // 初始化doma
		slide.imgData = imgData;
		var element = document.getElementById("banner");
		element.setAttribute("style", "overflow: hidden;position: relative;");
		var bannerList = document.createElement("ul");
		bannerList.setAttribute("id", "banner_list");
		bannerList.setAttribute("style", "width: " + (imgData.length + 2) * 100 + "%;font-size:0;margin-left:-100%");
		element.appendChild(bannerList);

		this.initImg(bannerList, imgData.length - 1, imgData); // 生成第一张

		for(var i = 0; i < imgData.length; i++) { // 生成中间图片
			this.initImg(bannerList, i, imgData);
		}
		this.initImg(bannerList, 0, imgData); // 生成最后一张

		this.createRadisIcon(element, imgData); // 生成滚动图下方的圆点


	},

	initImg(bannerList, num, imgData) { // 生成滚动的图片
		var bannerItem = document.createElement("li");
		bannerItem.classList.add("banner_item");
		bannerList.appendChild(bannerItem);
		bannerItem.setAttribute("style", "display: inline-block;width:" + 100 / (imgData.length + 2) + "%;");

		var imgElement = document.createElement("img");
		imgElement.setAttribute("data-id", "img" + num); // 给每一张图片一个唯一id
		imgElement.setAttribute("src", imgData[num]);
		bannerItem.appendChild(imgElement);
		imgElement.setAttribute("style", "display: block;width: 100%;");
	},
	createRadisIcon(element, imgData) {
		var radiusList = document.createElement("ul");
		radiusList.setAttribute("id", "radius_list");
		radiusList.setAttribute("style", "position: absolute; width: 100%;text-align: center;bottom: 15px;z-index: 10;");
		element.appendChild(radiusList);
		for(var i = 0; i < imgData.length; i++) {
			var radiusItem = document.createElement("li");
			radiusItem.setAttribute("class", "radius_item");
			radiusItem.setAttribute("data-id", i); // 给每一个圆点一个唯一id  与图片的id对应

			radiusItem.addEventListener("click", function(event) { // 每个圆点添加点击事件
				slide.addEvent.radiusItemClick(event)
			});

			radiusList.appendChild(radiusItem);
			radiusItem.setAttribute("style", "opacity: 0.8;display: inline-block;width: 15px;height: 15px;background: #969696;border-radius: 50%;margin-left: 8px;");
		}

	},

}