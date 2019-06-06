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
	var oSea = document.getElementById('search');
	var oSeUl = document.getElementById('seaUl');
	var aSeaLi = oSea.getElementsByTagName('li');
	var oCon = document.getElementById('content');	
	var oNav = oCon.getElementsByTagName('ul')[0];
	var aLi = oNav.getElementsByTagName('li');
	var aSp = oCon.getElementsByTagName('span');
	var aSpic = oSea.getElementsByTagName('img');
	var oInp = oSea.getElementsByTagName('input')[0];
	
	//初始化导入导航链接
	link = sortArr(link);
	var link_html = ''
	for (var i=0; i<link.length; i++) {
		link_html += '<li sort="'+link[i]['sort_n']+'"><a 1target="_blank" href="'+link[i]['url']+'"><img src="imgs/n' + link[i]['pic'] + '.png"></a><p>'+link[i]['name']+'</p></li>'
	}
	oNav.innerHTML += link_html


	//按下shift键焦点聚集的搜索框，我真是越来越会享受了
	document.onkeydown = function (e) {
		if (e.keyCode == 16) {
			oInp.focus()
		}
	}

	//对数组排序
	function sortArr (thisA){
	    var len = thisA.length,
	        i, j, tmp;
	    for(i=1; i<len; i++){
	        tmp = thisA[i];
	        j = i - 1;
	        while(j>=0 && tmp['sort_n'] < thisA[j]['sort_n']){
	            thisA[j+1] = thisA[j];
	            j--;
	        }
	        thisA[j+1] = tmp;
	    }
	    return thisA;
	};

	//导航span定位出去
	for (var i=0; i<aSp.length; i++) {
		aSp[i].style.top = 10 + 118 * i + 'px';
	};
	
	//2搜索功能
	oInp.onkeyup = function (ev) {
		var ev = ev || window.event;
		if (ev.keyCode == 13) {
			var searchWord = this.value;

			window.open('http://www.baidu.com/s?wd=' + searchWord);

			this.value = '';
		};

		var oScript = document.createElement('script');//跨域请求
		oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.value+'&json=1&p=3&sid=1447_16102_12824_10812_14429_12868_16166_14667_16322_16211_14958_16427_16279_16460_15311_11875_13932_14925&req=2&cb=sRemind';
		document.body.appendChild(oScript);

	};

	//点击页面其他部分搜索提示消失
	document.body.onclick = function () {
		oSeUl.innerHTML = '';
		oSeUl.style.display = 'none';
	};
	
	
};