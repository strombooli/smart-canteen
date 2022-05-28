<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("数据库用户名密码错误" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'canteen');
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



$rul = $_POST["rule"];
if ($rul != "") {
	$rul_arr = explode(';', $rul);

	mysqli_query($conn, "delete from rule where config=1"); // DANGEROUS ACTION

	for ($i = 0; $i < count($rul_arr); $i++) {
		$rul_sin_arr = explode(',', $rul_arr[$i]);
		list($calorie, $fat, $protein, $carbon) = $rul_sin_arr;
		$sql = mysqli_query($conn, "select count(*) from rule where calorie='$calorie' and fat='$fat' and protein='$protein' and carbon='$carbon'");
		$row = mysqli_fetch_row($sql);
		$num = $row[0];
		if ($num) continue;
		mysqli_query($conn, "insert into rule(calorie,fat,protein,carbon) values('$calorie','$fat','$protein','$carbon')");
	}

	if (false) {
		echo json_encode('err');
	} else {
		echo json_encode('success');
	}
} else {
	echo json_encode('success_empty');
}
