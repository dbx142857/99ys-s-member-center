<?php
	header("content-type:text/html;charset=utf-8");
	// $dir=$_SERVER['SERVER_NAME']."/html";
	// $handle=opendir($dir);
	// while($file=readdir($handle)){
		// echo $file."<br>";
	// }
	$dir="./html/会员中心/";
	$h=opendir($dir);
	while($file=readdir($h)){
		if($file!="."&&$file!=".."){
            if(mb_strlen($file,'utf-8')!=strlen($file)){
				$arr[]=$file;
            }else{
            	$arr1[]=$file;
            }
		}
	}
	foreach ($arr as $key => $value) {
		echo "<h1>$value:</h1>";
		$ml="./html/会员中心/".$value;
		$hh=opendir($ml);
		while($file=readdir($hh)){
			if($file!="."&&$file!=".."){
				$href=$ml."/".$file;
				echo "&nbsp;&nbsp;<a href='$href' target='_BLANK'>".$file."</a><br>";
			}
		}
		echo "<br><br>";
	}
	foreach ($arr1 as $key => $value) {
		echo "<h1>$value:</h1>";
		$ml="./html/会员中心/".$value;
		$hh=opendir($ml);
		while($file=readdir($hh)){
			if($file!="."&&$file!=".."){
				$href=$ml."/".$file;
				echo "&nbsp;&nbsp;<a href='$href' target='_BLANK'>".$file."</a><br>";
			}
		}
		echo "<br><br>";
	}
?>