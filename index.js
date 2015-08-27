function sRemind(a) {//jsonp添加百度搜索提示
	var oSeUl = document.getElementById('seaUl');
	var oInp = document.getElementById('search').getElementsByTagName('input')[0];
	oSeUl.innerHTML = '';
	oSeUl.style.display = 'none';
	if (!a.g) return;
	oSeUl.style.display = 'block';
	var len1 = Math.min(5,a.g.length);
	for (var i=0; i<len1; i++) {
		var oLi = document.createElement('li');
		oLi.innerHTML = a.g[i].q;
		oLi.index = i;
		oLi.onclick = function (ev) {
			var ev = ev || window.event;
			ev.cancelBubble = true;
			window.open('http://www.baidu.com/s?wd=' + a.g[this.index].q);
			oInp.value = '';
			oSeUl.innerHTML = '';
			oSeUl.style.display = 'none';
		};
		oSeUl.appendChild(oLi);
	};
};

window.onload = function () {
	var oMain = document.getElementById('main');	
	var oPut = document.getElementById('put');
	var oAdd = document.getElementById('add');
	var aInp = oPut.getElementsByTagName('input');	
	var oSea = document.getElementById('search');
	var oSeUl = document.getElementById('seaUl');
	var aSeaLi = oSea.getElementsByTagName('li');
	var oCon = document.getElementById('content');	
	var oNav = oCon.getElementsByTagName('ul')[0];
	var aLi = oNav.getElementsByTagName('li');
	var aSp = oCon.getElementsByTagName('span');
	var aSpic = oSea.getElementsByTagName('img');
	var oInp = oSea.getElementsByTagName('input')[0];
	var searchNum = 0;
	var day = new Date().getDay();
	
	//个人推荐(原生出厂)导航添加
	if (!window.localStorage.length || window.localStorage.length == 2) {
		var oS = document.createElement('script');
		oS.src = 'whiteLS.js';
		document.body.appendChild(oS);
		window.location.reload();
	};
	//读取本地存储
	if (window.localStorage.length) {
		for (var i=0,count=window.localStorage.length; i<count; i++) {
			var json = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
			if (typeof json != 'object') {//读取背景图片
				document.body.style.backgroundImage = 'url(bgImg/'+window.localStorage.getItem('num')+'.jpg)';
			} else {//添加导航
				var oLi = document.createElement('li');
				oLi.innerHTML = '<img src="' + json.src + '"><p>' + json.name + '</p>';
				oLi.link = json.link;
				oPut.style.display = 'none';
				oNav.appendChild(oLi);
			};
		};
	};
	//随机生成背景
	function randomBg() {
		var num = Math.floor(Math.random()*7+1);
		document.body.style.backgroundImage = 'url(bgImg/'+num+'.jpg)';
		window.localStorage.setItem('num',num);
	};
	//每天只随机生成背景一次
	if (day != window.localStorage.getItem('day')) {
		randomBg();
		window.localStorage.setItem('day',day);
	};
	//导航span定位出去
	for (var i=0; i<aSp.length; i++) {
		aSp[i].style.top = 10 + 118 * i + 'px';
	};
	//搜索图标切换
	aSpic[0].style.display = 'none';
	for (var i=0; i<aSpic.length; i++) {
		aSpic[i].index = i;
		aSpic[i].onclick = function () {
			for (var i=0; i<aSpic.length; i++) {
				aSpic[i].style.display = 'inline';
			};
			this.style.display = 'none';
			searchNum = this.index;
		};
	};
	//2搜索功能
	oInp.onkeyup = function (ev) {
		var ev = ev || window.event;
		if (ev.keyCode == 13) {
			var searchWord = this.value;
			if (searchNum) {
				window.open('http://www.baidu.com/s?wd=' + searchWord);
			} else {
				window.open('https://www.google.com/?gws_rd=ssl#newwindow=1&safe=strict&hl=zh-CN&site=webhp&source=hp&q=' + searchWord);
			};
			this.value = '';
		};
		if (searchNum) {
			var oScript = document.createElement('script');//跨域请求
			oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.value+'&json=1&p=3&sid=1447_16102_12824_10812_14429_12868_16166_14667_16322_16211_14958_16427_16279_16460_15311_11875_13932_14925&req=2&cb=sRemind';
			document.body.appendChild(oScript);
		};
	};
	//点击页面其他部分搜索提示消失
	document.body.onclick = function () {
		oSeUl.innerHTML = '';
		oSeUl.style.display = 'none';
	};
	//添加导航板块出现
	oAdd.onclick = function () {
		oAdd.style.transform = 'rotate(405deg)';
		oPut.style.display = 'block';
		setTimeout(function(){
			oPut.style.opacity = 1
		},50)
		oMain.style.transform = 'translateX(-100px)';
		oPut.innerHTML = '<input type="text" placeholder="名称"><input type="text" placeholder="网址"><input type="text" placeholder="图片名"><input type="button" value="添加"><input type="button" value="取消">';
		//add导航
		aInp[3].onclick = function () {
			var name = aInp[0].value;
			var link = aInp[1].value;
			var src = 'imgs/'+ aInp[2].value + '.png';
			var time = aLi.length + 10;
			if (!name || !link || !aInp[2].value) {
				alert('内容不能为空');
				return false;
			};
			var oLi = document.createElement('li');
			var json = {
				'name':name,
				'link':link,
				'src':src
			};
			window.localStorage.setItem(time,JSON.stringify(json));
			oLi.innerHTML = '<img src="' + src + '"><p>' + name + '</p>';
			oLi.link = link;
			oLi.index = aLi.length
			setTimeout(function(){
				oPut.style.display = 'none';
			},800)
			oPut.style.opacity = 0
			oNav.appendChild(oLi);
			aInp[0].value = aInp[1].value = aInp[2].value = '';
			oMain.style.transform = '';
			oAdd.style.transform = '';
			for (var i=0; i<aLi.length; i++) {
				aLi[i].style.float = 'left'
				aLi[i].style.margin = '10px 20px'
				aLi[i].style.position = ''
			}
			setTimeout(function(){
				toAbs()
				addDrag()
			},50)
		};
		//cancle添加
		aInp[4].onclick = function () {
			for (var i=0; i<3; i++) {
				aInp[i].value = '';
			};
			setTimeout(function(){
				oPut.style.display = 'none';
			},800)
			oPut.style.opacity = 0
			oMain.style.transform = '';
			oAdd.style.transform = '';
		};
	};
	//li点击跳转和右键删除，事件委托给父级
	liClick();
	function liClick() {
		for (var i=0; i<aLi.length; i++) {
			aLi[i].index = i;
		};
		oNav.onclick = function (ev) {
			var ev = ev || window.event;
			var srcLi = whichLi(ev)
			if (!srcLi) return;
			window.open(srcLi.link);
		};
		oNav.oncontextmenu = function (ev) {
			var ev = ev || window.event;
			var srcLi = whichLi(ev)
			if (!srcLi) return;
			if (confirm('删除导航？')) {
				oNav.removeChild(srcLi);
				window.localStorage.removeItem(window.localStorage.key(srcLi.index));
			};
			for (var i=0; i<aLi.length; i++) {//改变后重新安排位置
				aLi[i].style.left = pos[i].l + 'px'
				aLi[i].style.top = pos[i].t + 'px'
			}
			return false;
		};
	};
	function whichLi(ev) {//用于判断事件委托中的事件来源li
		var target = ev.srcElement || ev.target;
		var srcLi;
		if (target.nodeName.toLowerCase() == 'li') {
			srcLi = target;
		} else if (target.nodeName.toLowerCase() == 'img' || target.nodeName.toLowerCase() == 'p') {
			srcLi = target.parentNode;
		};
		return srcLi
	}

	/* 添加拖拽排序 */
	//布局转换
	var pos = []
	toAbs()
	function toAbs() {
		pos = []
		for (var i=0; i<aLi.length; i++) {//采集信息
			pos.push({
				"l": aLi[i].offsetLeft,
				"t": aLi[i].offsetTop
			})
		}
		for (var i=0; i<aLi.length; i++) {//设置float为定位
			aLi[i].style.position = 'absolute'
			aLi[i].style.margin = '0'
			aLi[i].style.left = pos[i].l + 'px'
			aLi[i].style.top = pos[i].t + 'px'
		}
	}
	
	function Drag(ev) {
		
	}
	Drag.prototype.init = function (obj) {
		var This = this
		this.obj = obj
		this.obj.onmousedown = function (ev) {
			var ev = ev || window.event
			if (ev.button == 2) {
				return
			}
			This.obj.style.zIndex = '1'//让他在拖拽时能够显示在上面
			This.down(ev)
			ev.cancelBubble = true
		}
	}
	Drag.prototype.down = function (ev) {
		var This = this
		this.l = ev.clientX - this.obj.offsetLeft
		this.t = ev.clientY - this.obj.offsetTop
		document.onmousemove = function (ev) {
			var ev = ev || window.event
			This.move(ev)
			This.obj.parentNode.onclick = null//暂时禁止点击事件
		}
		document.onmouseup = function (ev) {
			var ev = ev || window.event
			This.up(ev)
			setTimeout(liClick,50)//恢复点击事件
		}
	}
	Drag.prototype.move = function (ev) {
		var This = this
		ev.preventDefault()
		this.obj.style.left = ev.clientX - this.l + 'px'
		this.obj.style.top = ev.clientY - this.t + 'px'
		if (!collLi(this.obj) || This.onoff) {//判断碰撞li是否存在
			return
		} else {
			this.tmp = collLi(this.obj)
			sortLi()
		}
		function collLi(This) {//检测那个li离拖拽元素最近，返回值为对应的索引
			for (var i=0; i<aLi.length; i++) {
				if (This.obj == aLi[i]) {
					continue
				}
				var dis = Math.sqrt(Math.pow(This.offsetLeft - aLi[i].offsetLeft,2) + Math.pow(This.offsetTop - aLi[i].offsetTop,2))
				if (dis < This.offsetWidth/2) {
					return i
				}
			}
		}
		function sortLi() {
			This.onoff = true
			readLs(This)
			if (This.obj.index > This.tmp) {
				oNav.insertBefore(oNav.children[This.obj.index],oNav.children[This.tmp])
			} else {
				oNav.insertBefore(oNav.children[This.obj.index],oNav.children[This.tmp+1])
			}
			setTimeout(function(){
				for (var i = 0; i < aLi.length; i++) {//重新添加索引
					aLi[i].index = i;
				};
				for (var i=0; i<aLi.length; i++) {//改变后重新安排位置
					if (This == aLi[i]) {
						continue
					}
					aLi[i].style.left = pos[i].l + 'px'
					aLi[i].style.top = pos[i].t + 'px'
				}
				This.onoff = false
				This.storeCg(This)//将排序写入到localstorage
			},100)
		}
		function readLs(This) {
			for (var i=0,count=This.obj.parentNode.children.length; i<count; i++) {
				var json = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
				if (typeof json == 'object') {
					This.obj.parentNode.children[i].src = json.src
					This.obj.parentNode.children[i].name = json.name
					This.obj.parentNode.children[i].link = json.link
				};
			};
		}
	}
	Drag.prototype.up = function () {
		var This = this
		this.obj.onmousedown = document.onmousemove = document.onmouseup = null
		this.obj.style.left = pos[this.obj.index].l + 'px'
		this.obj.style.top = pos[this.obj.index].t + 'px'
		addDrag()//给拖拽完的加上下次的拖拽
	}
	Drag.prototype.storeCg = function (This) {
		var aLi = This.obj.parentNode.children
		for (var i=0; i<aLi.length; i++) {
			var json = {
				'name':aLi[i].name,
				'link':aLi[i].link,
				'src':aLi[i].src
			};
			window.localStorage.setItem(i+10,JSON.stringify(json));
		}
	}
	addDrag()
	function addDrag() {//添加拖拽
		for (var i=0; i<aLi.length; i++) {
			var dragLi = new Drag()
			dragLi.init(aLi[i])
		}
	}
	
};
