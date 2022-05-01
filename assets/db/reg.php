<?php
@header("content-type:text/html;charset=uft8");
$conn = mysqli_connect("localhost", "root", "123456") or die("err_conn" . mysqli_connect_error());
$select = mysqli_select_db($conn, "myDB") or die("err_conn" . mysqli_error($conn));
$utf = mysqli_query($conn, "set names utf8");

$username = $_POST['username'];
$pwd = $_POST['pwd'];
$gender = $_POST['gender'];
$id_num = $_POST['id_num'];
$usr_typ = $_POST['usr_typ'];

$ok = 0;
$sql  = mysqli_query($conn, "select count(*) from user where name='$username'");
$row = mysqli_fetch_row($sql);
$num = $row[0];
$ok += $num;
$sql  = mysqli_query($conn, "select count(*) from user where id_num='$id_num'");
$row = mysqli_fetch_row($sql);
$num = $row[0];
$ok += $num;

if ($ok >= 1) {
	echo json_encode('err_repeat');
} else {
	mysqli_query($conn, "insert into user(name,gender,id_num,pwd,usr_typ) values('$username','$gender','$id_num','$pwd','$usr_typ')");

	echo json_encode('success');
}
