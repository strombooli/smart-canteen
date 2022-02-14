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
				url: './assets/user.php',
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
							url: './assets/log.php',
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
		if ($username == '' || $pwd == '' || $gender == '' || $id_num == '' || $usr_typ == '') {
			alert("不能为空");
			return false;
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
				url: './assets/reg.php',
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