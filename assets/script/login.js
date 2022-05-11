function getCurrentTime() {
	d = new Date();
	return d.getFullYear() + "/" + (parseInt(d.getMonth()) + 1).toString() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

function pathVerify(s) {
	let path = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
	if (path === "" && s === "index.html") return true;
	return path === s;
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function cooVerify() {
	let coo_name = getCookie("acc").split("@")[0];
	let coo_pwd = getCookie("acc").split('@')[1];
	var cooVerRes = false;
	$.ajax({
		url: window.location.origin + '/assets/db/user.php',
		type: 'post',
		dataType: 'json',
		async: false,
		data: { username: decodeURI(coo_name), pwd: coo_pwd },
		success: function (result) {
			if (result === 'success') cooVerRes = true;
		},
		error: function () {
			return;
		}
	})
	return cooVerRes;
}

function goIndex() {
	if (window.location.href.split('login.html?p=/').length == 2) window.location.href = window.location.origin + '/' + window.location.href.split('login.html?p=/')[1];
	else window.location.href = window.location.origin + '/index.html';
}
if (cooVerify() && pathVerify("login.html")) goIndex();

function validateIdCard(idCard) {
	var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if (regIdCard.test(idCard)) {
		if (idCard.length == 18) {
			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
			var idCardWiSum = 0;
			for (var i = 0; i < 17; i++) {
				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
			}
			var idCardMod = idCardWiSum % 11;
			var idCardLast = idCard.substring(17);
			if (idCardMod == 2) {
				if (idCardLast == "X" || idCardLast == "x") return 1;
				else return 0;
			} else {
				if (idCardLast == idCardY[idCardMod]) return 1;
				else return 0;
			}
		}
		else {
			return -1;
		}
	} else {
		return -1;
	}
}

function checkStrongEnough(sValue) {
	var modes = 0;
	if (sValue.length < 1) return false;
	if (/\d/.test(sValue)) modes++;
	if (/[a-z]/.test(sValue)) modes++;
	if (/[A-Z]/.test(sValue)) modes++;
	if (/\W/.test(sValue)) modes++;
	return modes >= 2;
}

$(function () {
	$("#l-submit").click(function () {
		var $username = $("#l-name").val(),
			$pwd = $("#l-pwd").val();
		if ($username == '' || $pwd == '') {
			alert("用户名及密码不能为空");
			return false;
		} else {
			var datas = {
				username: $username,
				pwd: $pwd
			};
			$.ajax({
				url: './assets/db/user.php',
				type: 'post',
				dataType: 'json',
				data: datas,
				async: false,
				success: function (result) {
					if (result == 'err_verify') {
						alert('用户名或密码错误');
					} else if (result == 'success') {
						let coo_name = encodeURI(document.getElementById("l-name").value);
						let coo_pwd = document.getElementById("l-pwd").value;
						let coo_long = document.getElementById("remember");
						let coo_exp;
						if (coo_long.checked) {
							coo_exp = 30;
						} else {
							coo_exp = 7;
						}
						let d = new Date();
						let time_now = d.getTime();
						d.setTime(time_now + (coo_exp * 24 * 60 * 60 * 1000));
						let coo_expire = d.toUTCString();
						let cookie = "acc=" + coo_name + "@" + coo_pwd + ";expires=" + coo_expire;
						document.cookie = cookie;
						$.ajax({
							url: './assets/db/log.php',
							type: 'post',
							data: { name: coo_name, time: getCurrentTime(), inout: 1 },
							dataType: 'json',
							async: false,
							success: function (result) {
								if (result !== 'success') alert("核心故障：ERR_LOG_REP");
							},
							error: function () {
								alert("核心故障：ERR_LOG_PHP");
							}
						})
						goIndex();
					}
				},
				error: function () {
					alert("核心故障：ERR_USR_PHP");
				}
			})
		} return false;
	})
	$("#submit").click(function () {
		var $username = $("#name").val(),
			$pwd = $("#pwd").val(),
			$gender = $('#gdr').val(),
			$id_num = $('#id').val(),
			$usr_typ = $('#usr_typ').val();
		if ($username == '' || $pwd == '' || $gender == -1 || $id_num == '' || $usr_typ == -1) {
			alert("不能为空");
			return false;
		} else if (validateIdCard($id_num) != 1) {
			if (validateIdCard($id_num) == 0) alert("身份证验证失败！");
			if (validateIdCard($id_num) == -1) alert("系统仅支持18位长度的二代身份证，请检查格式是否正确。");
		} else if (!checkStrongEnough($pwd)) {
			alert("密码应至少包含两种字符，如小写字母与数字");
		} else if ($pwd.length < 6) {
			alert("密码太短");
		}
		else {
			var datas = {
				username: $username,
				pwd: $pwd,
				gender: $gender,
				id_num: $id_num,
				usr_typ: $usr_typ
			}
			$.ajax({
				url: './assets/db/reg.php',
				type: 'post',
				data: datas,
				dataType: 'json',
				async: false,
				success: function (result) {
					if (result == "err_repeat") {
						alert("该用户名或身份证已存在");
					} else if (result == 'success') {
						alert("注册成功");
						$("#reg").hide();
						$("#login").show();
					}
					else {
						alert("核心故障：ERR_REG_PHP");
					}
				}
			})
		} return false;
	})
	$("#l-reg").click(function () {
		$("#login").hide();
		$("#reg").show();
	})
	$("#l-login").click(function () {
		$("#login").show();
		$("#reg").hide();
	})
})