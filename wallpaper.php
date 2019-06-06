<?php

//请求bing官方接口获得url地址
$dt = file_get_contents('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
$img_url = 'http://cn.bing.com/'.json_decode($dt, true)['images'][0]['url'];

//下载bing图片
$curl = curl_init($img_url);
curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
$imageData = curl_exec($curl);
curl_close($curl);

//写入本地文件
$filename = "/Users/alpha/server/iNav/bgImg/bing.jpg";
$tp = fopen($filename, 'w');
fwrite($tp, $imageData);
fclose($tp);
?>
