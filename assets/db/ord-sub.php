<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'canteen');
$utf = mysqli_query($conn, "set names utf8");



$MAXLVL = 6;
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


$sql = mysqli_query($conn, "select id from user where name = '$user'");
$row = mysqli_fetch_array($sql);
$userid = $row[0];

$ord = $_POST["ord"];
$wkid = $_POST["wkid"];

$ord_arr = explode(';', $ord);

for ($i = 0; $i < count($ord_arr); $i++) {
	$combo = $ord_arr[$i];
	mysqli_query($conn, "insert into ord(day,user_id,combo_id,wk_id) values('$i','$userid','$combo','$wkid')");
	$combo = $combo - 1;
	mysqli_query($conn, "update combo set lft = lft-1 where id=$combo");
}

if (false) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}
