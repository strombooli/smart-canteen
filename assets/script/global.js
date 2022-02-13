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
		url: window.location.origin + '/assets/error.php',
		type: 'post',
		data: { code: s },
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

// warning functions

function showWarning(s) {
	let newElement = document.createElement("div");
	newElement.className = "alert alert-warning";
	newElement.style = "margin-bottom: 0.3rem";
	newElement.innerText = s;
	document.getElementsByClassName("content-bg")[0].firstElementChild.insertBefore(newElement, document.getElementsByClassName("content-bg")[0].firstElementChild.firstElementChild);
}

let autoWarn = false;
let warningList = new Array();
let onRng = new Array();

if (autoWarn) {
	$.ajax({
		url: window.location.origin + '/assets/warn-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result !== "success") throwError("ERR_WRNG_REP");
			for (let i = 0; i < result.split(";").length - 1; i++) {
				warningList[i] = result.split(";")[i].split(",");
				if (pathVerify(warningList[i][4])) onRng[i] = true;
				else onRng[i] = false;
			}
			for (let i = 0; i < warningList.length; i++) {
				let warnStart = new Date(warningList[i][1]);
				let warnEnd = new Date(warningList[i][2]);
				let now = new Date();
				if (onRng[i] && now >= warnStart && now <= warnEnd) showWarning(warningList[i][3]);
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
	return window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] === s;
}

function cooVerify() {
	let coo_name = document.cookie.split('@')[0].split('acc=')[1];
	let coo_pwd = document.cookie.split('@')[1];
	var cooVerRes = false;
	$.ajax({
		url: window.location.origin + '/assets/user.php',
		type: 'post',
		dataType: 'json',
		async: false,
		data: { username: coo_name, pwd: coo_pwd },
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
	if (window.location.href.split('login.html?p=/').length == 2) window.location.href = './' + window.location.href.split('login.html?p=/')[1];
	else window.location.href = './index.html';
}

function goLogin() {
	if (pathVerify("login.html")) return;
	window.location.href = './login.html?p=' + window.location.href.substring(window.location.href.lastIndexOf(window.location.pathname), window.location.href.length);
}

if (!cooVerify() && !pathVerify("login.html")) goLogin();
if (cooVerify() && pathVerify("login.html")) goIndex();

function delCookie() {
	let d = new Date();
	d.setTime(d.getTime() - 1);
	document.cookie = document.cookie + ";expires=" + d.toUTCString();
}

// User functions

function getName() {
	return document.cookie.split('@')[0].split('acc=')[1];
}
function getUserInfo(req, reqtyp, reptyp) {
	let rep = "";
	$.ajax({
		url: window.location.origin + '/assets/user-get.php',
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
			url: window.location.origin + '/assets/user-get-self.php',
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

let typName = ["ROOT", "SUPERADMIN", "ADMIN", "HELPER", "USER", "TRIAL", "TEMP", "BANNED"];
let typNameZhCn = ["根用户", "管理员", "运维", "食堂人员", "普通用户", "试用用户", "测试账户", "封禁账户"];

// Time functions

function getCurrentTime() {
	d = new Date();
	return d.getFullYear() + "/" + (parseInt(d.getMonth()) + 1).toString() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}