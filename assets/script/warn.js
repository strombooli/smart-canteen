function localGoTab(n) {
	if (n === 1) document.getElementById("warn-add").parentElement.style.display = "block";
	else document.getElementById("warn-add").parentElement.style.display = "none";
}

var warn = new Array();

var warnModel =
	"<div>" +
	"<ul class=\"px-3 warn-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">WARNID</div>" +
	"<div class=\"col-3\" style=\"padding-left: 0.2rem; padding-right: 0.2rem\">TITLE</div>" +
	"<div class=\"col-2\" style=\"padding-left: 0.2rem; padding-right: 0.2rem\">START</div>" +
	"<div class=\"col-2\" style=\"padding-left: 0.2rem; padding-right: 0.2rem\">END</div>" +
	"<div class=\"col-2 CLR\" style=\"padding-left: 0.2rem; padding-right: 0.2rem\">STAT</div>" +
	"<div class=\"col-1\">" +
	"<span class=\"btn btn-block btn-green\" style=\"padding: 0; height: 1.4rem; font-size: 0.9rem\" onclick=\"showCont(ID);\">查看</span>" +
	"</div>" +
	"<div class=\"col-1\">" +
	"<span class=\"btn btn-block btn-green\" style=\"padding: 0; height: 1.4rem; font-size: 0.9rem\" onclick=\"showRng(ID);\">查看</span>" +
	"</div></div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var warnAll = "";

var toggleAll = "";
var toggleOn = new Array();
for (let i = 0; i < document.getElementsByClassName("tgl").length; i++) {
	toggleOn[i] = false;
}
function toggle(n) {
	let toggleHtml = document.getElementById("tog-" + n.toString()).innerText.substring(1) + "|";
	if (toggleOn[n]) {
		toggleAll = toggleAll.replace(toggleHtml, "");
		document.getElementById("tog-" + n.toString()).firstElementChild.className = document.getElementById("tog-" + n.toString()).firstElementChild.className.replace("on", "off").replace("success", "muted");
		toggleOn[n] = false;
	} else {
		toggleAll = toggleHtml + toggleAll;
		document.getElementById("tog-" + n.toString()).firstElementChild.className = document.getElementById("tog-" + n.toString()).firstElementChild.className.replace("off", "on").replace("muted", "success");
		toggleOn[n] = true;
	}
}

function showRng(n) {
	gAlert(warn[n][5]);
}
function showCont(n) {
	gAlert(warn[n][4]);
}

$(function () {
	$.ajax({
		url: '../assets/db/warn-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			let warnIdMax = 0;
			for (let i = 0; i < result.split(";").length - 1; i++) {
				warn[i] = result.split(";")[i].split(",");
				warnIdMax = Math.max(warnIdMax, parseInt(warn[i][0]));
				let wm = warnModel;
				wm = wm.replace(/WARNID/g, warn[i][0]);
				wm = wm.replace(/ID/g, (parseInt(warn[i][0]) - 1).toString());
				wm = wm.replace(/TITLE/g, warn[i][1]);
				let warnStart = new Date(warn[i][2].replace(/-/g, "/"));
				let warnEnd = new Date(warn[i][3].replace(/-/g, "/"));
				let now = new Date();
				wm = wm.replace(/START/g, warnStart.toLocaleString().slice(5));
				wm = wm.replace(/END/g, warnEnd.toLocaleString().slice(5));
				if (now <= warnStart) {
					wm = wm.replace(/STAT/g, "未开始");
					wm = wm.replace(/CLR/g, "");
				} else if (now >= warnStart && now <= warnEnd) {
					wm = wm.replace(/STAT/g, "进行中");
					wm = wm.replace(/CLR/g, "text-green");
				} else {
					wm = wm.replace(/STAT/g, "已结束");
					wm = wm.replace(/CLR/g, "text-red");
				}
				wm = wm.replace(/CONTENT/g, warn[i][4]);
				warnAll += wm;
			}
			document.getElementById("warn-list").innerHTML = warnAll;
			document.getElementById("warn-newid").value = warnIdMax + 1;
		},
		error: function () {
			throwError("ERR_WRNG_PHP");
		}
	})
	$("#warn-add").click(function () {
		let warnTitle = document.getElementById("warn-ttl").value;
		let warnStart = document.getElementById("warn-start").value;
		let warnEnd = document.getElementById("warn-end").value;
		let warnContent = document.getElementById("warn-content").value;

		if (warnTitle == "" || warnStart == "" || warnEnd == "" || warnContent == "" || toggleAll == "") {
			gAlert("不能为空。");
			return;
		}
		let startTime = new Date(warnStart.replace(/-/g, "/"));
		let endTime = new Date(warnEnd.replace(/-/g, "/"));
		let now = new Date();
		if (startTime >= endTime) {
			gAlert("结束时间不得早于开始时间。");
			return;
		} else if (endTime <= now) {
			gAlert("结束时间不得早于当前时间。");
			return;
		}
		$.ajax({
			url: '../assets/db/warn-sub.php',
			type: 'post',
			data: { title: warnTitle, start: warnStart, end: warnEnd, content: warnContent, rng: toggleAll },
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success") throwError("ERR_WRNS_REP");
				else window.location.reload();
			},
			error: function () {
				throwError("ERR_WRNS_PHP");
			}
		})
	})
})