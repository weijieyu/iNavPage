# personalNavPage

![image](https://github.com/yujieyu7/personalNavPage/blob/master/demo.png)

personal browser HomePage

业余时间写的一个自己用的浏览器主页

界面模仿的是ipad版safari的homepage

实现了基本的添加导航，删除导航功能，同时以天为单位随机切换背景图片

因为是本地文件，所以用的是html5的localStorage来存储导航数据

导航图片和背景图片也均是本地图片，需要自己添加

只是实现了初步的功能，后续有时间，计划再加上拖拽改变排序，天气预报(这次网上找半天api都是json接口的，没有jsonp的，)

#4 v1.2 功能没有变化，只是对代码进行了优化

1.iNav的弹窗动态添加，因为用的时候不是特别多，所以改为动态创建来简化dom

2.将导li的点击和右键事件委托给父级ul，提升性能

#4 v3.0     较之前有较大更新，所以版本号为此直接跳到v3.0

更新内容

1.页面样式进行较大调整，美化，看起来能看了，不再是功能性的了

2.增加拖拽排序功能

3.由于js代码的增多，所以把原来写在html里的js和css分离出来

下次有空计划更新的

1.拖拽排序增加检测进入方向的功能，不再是单一的剪切到后面，前面也可以实现

2.使用jsonp代理增加天气预报，背景使用bing每日一图

#4 v3.1  主要是针对Firefox/safari做了兼容

更新内容

1.修正由于ff下localStorage的key方法返回值不按key值在localStorage中的排序来的坑

2.修正safari的localStorege自动添加consoleHistory，lastActivePanel，resource-history，resourcesFramesExpanded导致对于localStorage的length判断错误的问题
