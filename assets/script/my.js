document.getElementById("quit").onclick = function () {
	$.ajax({
		url: './assets/log.php',
		type: 'post',
		data: { name: getName(), time: -1, inout: 0 },
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result !== 'success') throwError("ERR_LOG_REP");
		},
		error: function () {
			throwError("ERR_LOG_PHP");
		}
	})
	delCookie();
	window.location.replace("./login.html");
}

document.getElementById("user-name").innerText = getName();
document.getElementById("user-type").innerText = typName[parseInt(getInfo("usr_typ"))];

$.ajax({
	url: './assets/log-get.php',
	type: 'post',
	dataType: 'json',
	async: false,
	success: function (result) {
		document.getElementById("user-last-login").innerText = "上次登录：" + result;
	},
	error: function () {
		throwError("ERR_LOGG_PHP");
	}
})