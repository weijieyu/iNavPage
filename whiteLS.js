/*

程序写入localStorage,省去调试过程中每次还得手动键入
有时间写个导出的，以备份

*/

//<script src="whiteLS.js"></script> 使用链接

if (!window.localStorage.length || window.localStorage.length == 2) {//避免重复添加

	var name1 = ['微博','虎扑','知乎','新浪','果壳','腾讯','天猫','Quora','好123','维基百科','QQ邮箱','淘宝','京东','亚马逊','印象笔记','有道云','前端网','拉勾','博客园','GitHub','segmentfault','FireFox','Html5','YouTube','V2EX','百度云','stackoverflow','慕课网','CSDN','推酷','开源中国','伯乐在线'];

	var link = ['http://weibo.com/u/2562606833/home?wvr=5&sudaref=passport.weibo.com',
		'http://www.hupu.com/','http://www.zhihu.com/','http://www.sina.com.cn/','http://www.guokr.com/','http://www.qq.com/','https://www.tmall.com/','http://www.quora.com/','http://www.hao123.com/?src=skycn_xzq','https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5','http://mail.qq.com/cgi-bin/frame_html?sid=6RfW9ejfEdJ5T1UA&r=0e74d04fccb4b42da4ad79a28375c430','https://www.taobao.com/','http://www.jd.com/','http://www.amazon.cn/?tag=baiduiclickcn-23&ref=pz_ic_bd_u_0328pp24','https://app.yinxiang.com/Home.action#n=ee349c91-d6bf-40fa-a7cc-428d23db6271&ses=4&sh=2&sds=5&','http://note.youdao.com/web/list?notebook=%2F&sortMode=0&note=%2FSVR018730A41A884ACF812BAEB401946485%2Fweb1431446437572','http://www.w3cfuns.com/portal.php','http://www.lagou.com/','http://www.cnblogs.com/','https://github.com/','http://segmentfault.com/','https://developer.mozilla.org/zh-CN/','http://www.html5cn.org/','https://www.youtube.com/','http://www.v2ex.com/','http://pan.baidu.com/disk/home#from=share_pan_logo&render-type=list-view','http://stackoverflow.com/','http://www.imooc.com/','http://www.csdn.net/','http://www.tuicool.com/a/','http://www.oschina.net/','http://www.jobbole.com/'
	];

	var src = [];

	for (var i=1; i<=link.length; i++) {
		src.push('imgs/n'+i+'.png');
	};

	//固定排序版
	for (var i=0; i<name1.length; i++) {
		var time = i + 10;//保证了他们都是两位数，所以sort有效
		var json = {
			"name":name1[i],
			"link":link[i],
			"src":src[i]
		};
		window.localStorage.setItem(time,JSON.stringify(json));//
	};

	//调试用
	/*for (var i=0; i<window.localStorage.length; i++) {
		console.log(window.localStorage.getItem(window.localStorage.key(i)));
	};*/
	
};