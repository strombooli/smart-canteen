<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'myDB');
$utf = mysqli_query($conn, "set names utf8");



$MAXLVL = 2;
$cook = $_COOKIE["acc"];
$cook_arr = explode("@", $cook);
$user = $cook_arr[0];
$pass = $cook_arr[1];
$sql = mysqli_query($conn, "select count(*) from user where name='$user'");
$row = mysqli_fetch_row($sql);
$num = $row[0];
if (!$num) {
	echo json_encode('err_authorization');
	return;
}
$sql = mysqli_query($conn, "select usr_typ from user where name='$user'");
$row = mysqli_fetch_row($sql);
$lvl = $row[0];
if ($lvl > $MAXLVL) {
	echo json_encode('err_authorization');
	return;
}
$sql = mysqli_query($conn, "select pwd from user where name='$user'");
$row = mysqli_fetch_row($sql);
$pwdnum = $row[0];
if ($pwdnum != $pass) {
	echo json_encode('err_authorization');
	return;
}



$title = $_POST["title"];
$start = $_POST["start"];
$end = $_POST["end"];
$content = $_POST["content"];
$rng = $_POST["rng"];

mysqli_query($conn, "insert into warn(title,time_start,time_end,content,rang) values('$title','$start','$end','$content','$rng')");

if (false) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}
