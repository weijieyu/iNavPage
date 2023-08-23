function sRemind(a) {//jsonp添加百度搜索提示
	var oSeUl = document.getElementById('seaUl');

	var oInp = document.getElementById('search').getElementsByTagName('input')[0];
	oSeUl.innerHTML = '';
	oSeUl.style.display = 'none';

	if (!a.g) return;

	oSeUl.style.display = 'block';
	var len1 = Math.min(7,a.g.length);
	for (var i=0; i<len1; i++) {
		var oLi = document.createElement('li');
		oLi.innerHTML = a.g[i].q;
		oLi.index = i;
		oLi.onclick = function (ev) {
			var ev = ev || window.event;
			ev.cancelBubble = true;
			oInp.value = '';
			oSeUl.innerHTML = '';
			oSeUl.style.display = 'none';

			window.open('http://www.baidu.com/s?wd=' + a.g[this.index].q);
		};
		oSeUl.appendChild(oLi);
	};


	/*$('#seaUl li').hover(function(){
		searchMoveIn($(this));
	}, function(){
		searchMoveOut($(this));
	})*/

	liHoverIndex = -1;
};

// 搜索项的焦点进入
function searchMoveIn($li) {
	$li.addClass('li_hover');
	$('#searchInput').val($li.html());
}

// 搜索项的焦点移出
function searchMoveOut($li) {
	$li.removeClass('li_hover');
	$('#searchInput').val($li.html());
}

var liHoverIndex = -1;

document.onkeyup = function (e) {
	if (e.keyCode != 38 && e.keyCode != 40) {console.log('非上下键返回');
		return;
	}

	var $li = $('#seaUl li').eq(liHoverIndex);

	// 当前li移出
	searchMoveOut($li);

	// 下一个li移入
	if (e.keyCode == 38) {
		liHoverIndex--;
		$li = $('#seaUl li').eq(liHoverIndex);
		searchMoveIn($li);
	} else if (e.keyCode == 40) {
		liHoverIndex++;
		$li = $('#seaUl li').eq(liHoverIndex);
		searchMoveIn($li);
	}
}



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
			oInp.focus();
		}
	}

	// 上来就把焦点聚集到搜索框
	oInp.focus();

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
	
	//搜索功能
	oInp.onkeyup = function (ev) {
		var ev = ev || window.event;

		if (ev.keyCode == 13) {
			var searchWord = this.value;

			displaySearch();
			this.value = '';

			window.open('http://www.baidu.com/s?wd=' + searchWord);
			
		} else if (ev.keyCode == 38 || ev.keyCode == 40 || ev.keyCode == 93) {//上下方向键,cmd不搜索
			return;
		}

		var oScript = document.createElement('script');//跨域请求
		oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.value+'&json=1&p=3&sid=1447_16102_12824_10812_14429_12868_16166_14667_16322_16211_14958_16427_16279_16460_15311_11875_13932_14925&req=2&cb=sRemind';
		document.body.appendChild(oScript);

	};

	//点击页面其他部分搜索提示消失
	document.body.onclick = displaySearch;

	function displaySearch() {
		oSeUl.innerHTML = '';
		oSeUl.style.display = 'none';
	};

} 

