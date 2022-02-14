<?php
@header("content-type:text/html;charset=uft8");
$conn = mysqli_connect("localhost", "root", "123456") or die("err_conn" . mysqli_error($conn));
$select = mysqli_select_db($conn, "myDB") or die("err_conn" . mysqli_error($conn));
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



$wkid = $_POST["wkid"];

$sql = mysqli_query($conn, "select id from user where name='$user'");
$row = mysqli_fetch_array($sql);
$userid = $row[0];

$sql = mysqli_query($conn, "select count(*) from ord where user_id='$userid' and wk_id='$wkid'");
$row = mysqli_fetch_array($sql);
$num = $row[0];
if ($num) {
	$sql = mysqli_query($conn, "select combo_id from ord where user_id='$userid' and wk_id='$wkid'");

	$i = 0;
	$row = mysqli_fetch_array($sql);
	do {
		$rows[$i] = $row;
		$i++;
	} while ($row = mysqli_fetch_array($sql));
	$rowall = '';
	for ($i = 0; $i < count($rows); $i++) {
		$rowall = $rowall . $rows[$i][0] . ';';
	}

	echo json_encode($rowall);
} else {
	echo json_encode("success_empty");
}
