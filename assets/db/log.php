<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'canteen');
$utf = mysqli_query($conn, "set names utf8");

$name = $_POST["name"];
$time = $_POST["time"];
$inout = $_POST["inout"];

if($inout == "1")mysqli_query($conn, "update user set logined=1,last_login='$time' where name='$name'");
else mysqli_query($conn, "update user set logined=0 where name='$name'");

if (false) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}
