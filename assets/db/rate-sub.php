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



$sql = mysqli_query($conn, "select id from user where name='$user'");
$row = mysqli_fetch_array($sql);
$user_id = $row[0];

$dish_id = $_POST["id"];
$rate = $_POST["rate"];
$week_id = $_POST["wk"];

$sql = mysqli_query($conn, "select count(*) from rate where rater_id=$user_id and wk_id=$week_id and dish_id=$dish_id");
$row = mysqli_fetch_array($sql);
$rated = $row[0];

if ($rated) {
	$sql = mysqli_query($conn, "select rate from rate where rater_id=$user_id and wk_id=$week_id and dish_id=$dish_id");
	$row = mysqli_fetch_array($sql);
	$prev_rate = $row[0];
	mysqli_query($conn, "update dish set rating=(rating-$prev_rate+$rate)/ratecnt where id=$dish_id");
	mysqli_query($conn, "update rate set rate=$rate where rater_id=$user_id and wk_id=$week_id and dish_id=$dish_id");
} else {
	mysqli_query($conn, "insert into rate(rater_id,wk_id,dish_id,rate) values($user_id,$week_id,$dish_id,$rate)");
	mysqli_query($conn, "update dish set rating=(rating+$rate)/(ratecnt+1),ratecnt=ratecnt+1 where id=$dish_id");
}

if (false) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}
