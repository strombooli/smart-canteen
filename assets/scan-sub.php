<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'myDB');
$utf = mysqli_query($conn, "set names utf8");



$MAXLVL = 3;
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



$userid = $_POST["userid"];
$wkid = $_POST["wkid"];
$day = $_POST["day"] - 1;
$time = $_POST["time"];

$sql = mysqli_query($conn, "select count(*) from ord where wk_id='$wkid' and user_id='$userid' and day='$day'");
$row = mysqli_fetch_array($sql);
$num = $row[0];
if (!$num) {
	echo json_encode("err_empty");
	return;
}

$sql = mysqli_query($conn, "select time_scan from ord where wk_id='$wkid' and user_id='$userid' and day='$day'");
$row = mysqli_fetch_array($sql);
$num = $row[0];
if ($num != "0000-00-00 00:00:00") {
	$sql = mysqli_query($conn, "select scanner_name from ord where wk_id='$wkid' and user_id='$userid' and day='$day'");
	$row = mysqli_fetch_array($sql);
	$num = $row[0];
	echo json_encode("err_repeat" . $num);
	return;
}

mysqli_query($conn, "update ord set time_scan='$time',scanner_name='$user' where wk_id='$wkid' and user_id='$userid' and day='$day'");

if (false) {
	echo json_encode("err");
} else {
	echo json_encode('success');
}
