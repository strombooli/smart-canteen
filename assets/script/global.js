// Database Init functions

function init() {
	$.ajax({
		url: window.location.origin + '/assets/db/init.php',
		type: 'post',
		async: false
	})
}

// gAlert functions

function gAlert(txt) {
	document.getElementById("gAlertModal").style.display = "block";
	document.getElementById("gAlertBack").style.display = "block";
	document.getElementById("gAlertMsg").innerHTML = txt;
	setTimeout(function () {
		document.getElementById("gAlertModal").classList.add("show");
		document.getElementById("gAlertBack").classList.add("show");
	}, 10);
}

function gAlertClose() {
	document.getElementById("gAlertModal").classList.remove("show");
	document.getElementById("gAlertBack").classList.remove("show");
	setTimeout(function () {
		document.getElementById("gAlertModal").style.display = "none";
		document.getElementById("gAlertBack").style.display = "none";
	}, 160);
}

// Error functions

function throwError(s) {
	gAlert("系统故障，请联系管理员。<br>故障代码：" + s);
	$.ajax({
		url: window.location.origin + '/assets/db/error.php',
		type: 'post',
		data: { code: s, path: getPath() },
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result !== "success") gAlert("系统核心故障，请联系管理员。");
		},
		error: function () {
			gAlert("系统核心故障，请联系管理员。");
		}
	})
}

function jumpError(s) {
	window.location.href = "./error.html?" + s;
}

let pathArray =
	["index.html", "updlog.html", "help.html", "my.html",
		"manage.html", "combo-gen.html", "overview.html", "rule.html", "upload.html",
		"order.html", "sql.html", "settings.html", "err.html", "warn.html"];
let maxPermArray =
	[6, 6, 6, 6,
		2, 2, 2, 2, 2,
		6, 1, 6, 2, 2];
for (let i = 0; i < pathArray.length; i++) {
	if (getPath() == pathArray[i] && getInfo("usr_typ") > maxPermArray[i]) jumpError("401.01");
}

// warning functions

function showWarning(s) {
	let newElement = document.createElement("div");
	newElement.className = "alert alert-warning";
	newElement.style = "margin-bottom: 0.3rem";
	newElement.innerHTML = s;
	document.getElementsByClassName("content-bg")[0].firstElementChild.insertBefore(newElement, document.getElementsByClassName("content-bg")[0].firstElementChild.firstElementChild);
}

let autoWarn = true;

if (autoWarn) {
	$.ajax({
		url: window.location.origin + '/assets/db/warn-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			let warnList = new Array();
			for (let i = 0; i < result.split(";").length - 1; i++) {
				warnList[i] = result.split(";")[i].split(",");
			}
			for (let i = 0; i < warnList.length; i++) {
				let warnRng = warnList[i][5].slice(0, -1);
				let warnRngArr = warnRng.split("|");
				let onRng = false;
				for (let j = 0; j < warnRngArr.length; j++) {
					if (pathVerify(warnRngArr[j])) onRng = true;
				}
				let warnStart = new Date(warnList[i][2]);
				let warnEnd = new Date(warnList[i][3]);
				let now = new Date();
				if (onRng && now >= warnStart && now <= warnEnd) showWarning(warnList[i][4]);
			}
		},
		error: function () {
			throwError("ERR_WRNG_PHP");
		}
	})
}

// nav functions

function goTab(id) {
	if (id >= document.getElementsByClassName("nav-link").length) return false;
	for (let i = 0; i < document.getElementsByClassName("nav-link").length; i++) {
		document.getElementsByClassName("nav-link")[i].className = document.getElementsByClassName("nav-link")[i].className.replace("active", "");
		$("#tab-" + i.toString()).hide();
	}
	document.getElementsByClassName("nav-link")[id].className += " active";
	$("#tab-" + id.toString()).show();

}

// sleep functions

function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

// login functions

function pathVerify(s) {
	let path = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
	if (path === "" && s === "index.html") return true;
	return path === s;
}

function getPath() {
	let path = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
	if (path === "") return "index.html";
	else return path;
}

function goIndex() {
	if (window.location.href.split('login.html?p=/').length == 2) window.location.href = window.location.origin + '/' + window.location.href.split('login.html?p=/')[1];
	else window.location.href = window.location.origin + '/index.html';
}

function goLogin() {
	if (pathVerify("login.html")) return;
	window.location.href = window.location.origin + '/login.html?p=' + window.location.href.substring(window.location.href.lastIndexOf(window.location.pathname), window.location.href.length);
}

if (!cooVerify() && !pathVerify("login.html")) goLogin();

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
function delCookie(cname) {
	setCookie(cname, "", -365);
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

// User functions

function getName() {
	return decodeURI(document.cookie.split('@')[0].split('acc=')[1]);
}
function getUserInfo(req, reqtyp, reptyp) {
	let rep = "";
	$.ajax({
		url: window.location.origin + '/assets/db/user-get-all.php',
		type: 'post',
		data: { req: req, reqtyp: reqtyp, reptyp: reptyp },
		dataType: 'json',
		async: false,
		success: function (result) {
			rep = result;
		},
		error: function () {
			throwError("ERR_USRG_PHP");
		}
	})
	return rep;
}
function getInfo(reptyp) {
	let rep = "";
	if (reptyp === "name") return getName();
	else {
		$.ajax({
			url: window.location.origin + '/assets/db/user-get-self.php',
			type: 'post',
			data: { reptyp: reptyp },
			dataType: 'json',
			async: false,
			success: function (result) {
				rep = result;
			},
			error: function () {
				throwError("ERR_USRG_PHP");
			}
		})
	}
	return rep;
}

let typName = ["ROOT", "SUPERADMIN", "ADMIN", "HELPER", "USER", "TRIAL", "TMP", "BANNED"];
let typNameZhCn = ["根用户", "管理员", "运维", "食堂人员", "普通用户", "试用用户", "测试账户", "封禁账户"];

// Time functions

function getCurrentTime() {
	d = new Date();
	return d.getFullYear() + "/" + (parseInt(d.getMonth()) + 1).toString() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

var firstWkStart = 1644163201000;
function getThisWk() {
	d = new Date();
	return Math.round((d.getTime() - firstWkStart) / 604800000);
}

// phs function

function updPhs(s) {
	$.ajax({
		url: window.location.origin + '/assets/db/phs-sub.php',
		type: 'post',
		data: { phs: s },
		dataType: 'json',
		async: false,
		success: function (result_phs) {
			if (result_phs !== "success") throwError("ERR_PHSS_REP");
			else window.location.reload();
		},
		error: function () {
			throwError("ERR_PHSS_PHP");
		}
	})
}