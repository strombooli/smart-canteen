<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'canteen');
$utf = mysqli_query($conn, "set names utf8");



$cook = $_COOKIE["acc"];
$cook_arr = explode("@",$cook);
$user = $cook_arr[0];
$code = $_POST["code"];
$path = $_POST["path"];

mysqli_query($conn, "insert into error(code,path,username) values('$code','$path','$user')");

if (false) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}