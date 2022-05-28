<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'canteen');
$utf = mysqli_query($conn, "set names utf8");

$username = $_POST['username'];
$pwd = $_POST['pwd'];

$sql = mysqli_query($conn, "select count(*) from user where name='$username'");
$row = mysqli_fetch_row($sql);
$num = $row[0];

if (!$num) {
	echo json_encode('err_verify');   
} else {
	$sql = mysqli_query($conn, "select pwd from user where name='$username'");
	$row = mysqli_fetch_row($sql);
	$pwdnum = $row[0];
	if ($pwdnum != $pwd) {
		echo json_encode('err_verify');
	} else {
		echo json_encode('success');
	}
}	