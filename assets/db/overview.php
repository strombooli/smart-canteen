<?php
@header("content-type:text/html;charset=uft8");
$conn = mysqli_connect("localhost", "root", "123456") or die("err_conn" . mysqli_error($conn));
$select = mysqli_select_db($conn, "canteen") or die("err_conn" . mysqli_error($conn));
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


$wkid = $_POST["wkid"];

$sql1 = mysqli_query($conn, "select count(*) from rule");
$row1 = mysqli_fetch_array($sql1);
$num1 = $row1[0];

$sql2 = mysqli_query($conn, "select count(*) from rule where calorie>2 or fat>2 or protein>2 or carbon>2 or calorie<-2 or fat<-2 or protein<-2 or carbon<-2");
$row2 = mysqli_fetch_array($sql2);
$num2 = $row2[0];

$sql3 = mysqli_query($conn, "select count(*) from dish where typ=0 and onsel=1");
$row3 = mysqli_fetch_array($sql3);
$num3 = $row3[0];

$sql4 = mysqli_query($conn, "select count(*) from dish where typ=1 and onsel=1");
$row4 = mysqli_fetch_array($sql4);
$num4 = $row4[0];

$sql5 = mysqli_query($conn, "select count(*) from dish where typ=2 and onsel=1");
$row5 = mysqli_fetch_array($sql5);
$num5 = $row5[0];

$sql6 = mysqli_query($conn, "select count(*) from dish where typ=3 and onsel=1");
$row6 = mysqli_fetch_array($sql6);
$num6 = $row6[0];

$sql7 = mysqli_query($conn, "select count(*) from combo where wk_id='$wkid'");
$row7 = mysqli_fetch_array($sql7);
$num7 = $row7[0];

$nummin = 1000;
$nummax = 0;
for ($i = 0; $i < $num1; $i++) {
	$sql = mysqli_query($conn, "select count(*) from combo where rule_id='$i'");
	$row = mysqli_fetch_array($sql);
	$nummin = min($nummin, $row[0]);
	$nummax = max($nummax, $row[0]);
}

$sql = mysqli_query($conn, "select ordered from user");
$i = 0;
$row = mysqli_fetch_array($sql);
do {
	$rows[$i] = $row;
	$i++;
} while ($row = mysqli_fetch_array($sql));
$rowall = '';
for ($i = 0; $i < count($rows) - 1; $i++) {
	$rowall = $rowall . $rows[$i][0] . ',';
}
$rowall = $rowall . $rows[count($rows) - 1][0];
echo json_encode($num1 . ";" . $num2 . ";" . $num3 . ";" . $num4 . ";" . $num5 . ";" . $num6 . ";" . $num7 . ";" . $nummin . ";" . $nummax . ";" . $rowall);
