<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
$targetFolder = 'uploads'; // Relative to the root

//$verifyToken = md5('unique_salt' . $_POST['timestamp']);
// && $_POST['token'] == $verifyToken
if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	if(!file_exists($targetPath)){
		mkdir($targetPath);
	}
	$targetPath=$targetPath."/";
	$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
	$name=$_FILES['Filedata']['name'];
	// Validate the file type
	$fileTypes = array('jpg','jpeg','gif','png'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		if(move_uploaded_file($tempFile,$targetFile)){
			echo $targetFile;
		}
	} else {
		echo "文件".$name.'类型不合法，请上传jpg，jpeg，gif，png格式';
	}
}
?>