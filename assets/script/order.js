function jumpWk(n) {
	window.location.search = "?" + n.toString();
}

function getWk() {
	return parseInt(window.location.search.slice(1));
}

if (window.location.search == "") {
	jumpWk(getThisWk());
}

if (getWk() <= 0) {
	jumpWk(1);
}
if (getWk() > getThisWk()) {
	jumpWk(getThisWk());
}

document.getElementById("title").innerText = "本周订餐（第" + getWk().toString() + "周）";
$("#title-fr").click(function () { jumpWk(getWk() - 1); })
$("#title-re").click(function () { jumpWk(getWk() + 1); })



let noStartBigPanelModel = "<h4 class=\"text-center text-muted mt-5\">订餐尚未开始，请耐心等待</h4>";
let noChooseBigPanelModel = "<h4 class=\"text-center text-muted mt-5\">本周不提供订餐</h4>";
let chooseBigPanelModel =
	"<div>" +
	"<ul class=\"supply-date-list px-3\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-3\">" +
	"<div class=\"date-icon\" id=\"date\">DATE<br>WEEKDAY</div>" +
	"</div>" +
	"<div class=\"col-9\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-12\" onclick=\"showChoice(DAYID);\">" +
	"<div class=\"px-3\" id=\"cp-DAYID\">" +
	"<div class=\"text-muted text-center mt-4\">点击这里选餐</div>" +
	"</div></div></div></div></div>" +
	"<ul class=\"supply-list shadow-sm\" id=\"cl-DAYID\"></ul>" +
	"</li></ul></div>";

let chosenPanelModel =
	"<b class=\"title\">套餐COMBOID</b>" +
	"<span class=\"float-right\">" +
	"<span class=\"badge badge-orange\">" +
	"已选餐" +
	"</span>" +
	"</span>" +
	"<br>" +
	"<div>" +
	"<i class=\"fa fa-exclamation-triangle icon-LEVEL\"></i>" +
	"<small class=\"mr-1\">" +
	"剩余REMAIN份" +
	"</small>" +
	"</div>" +
	"<div style=\"width:60%\">" +
	"<small class=\"mr-1\">DISHLIST</small>" +
	"</div>";

let orderedPanelModel =
	"<b class=\"title\">套餐COMBOID</b>" +
	"<span class=\"float-right\">" +
	"<span class=\"badge badge-green\">" +
	"已确认" +
	"</span>" +
	"</span>" +
	"<br>" +
	"<div>" +
	"<i class=\"fa fa-exclamation-triangle icon-LEVEL\"></i>" +
	"<small class=\"mr-1\">" +
	"剩余REMAIN份" +
	"</small>" +
	"</div>" +
	"<div style=\"width:60%\">" +
	"<small class=\"mr-1\">DISHLIST</small>" +
	"</div>";

let noChoosePanelModel = "<div class=\"text-muted text-center mt-4\">点击这里选餐</div>";

let choiceModel =
	"<li>" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-12\">" +
	"<div class=\"px-3\">" +
	"<b class=\"title\">套餐COMBOID</b>" +
	"<a class=\"btn btn-sm BTNCLASS\"" +
	"onclick=\"chooseTyp(DAYID, ID)\">BTNINFO</a>" +
	"<br>" +
	"<div>" +
	"<i class=\"fa fa-exclamation-triangle icon-LEVEL\"></i>" +
	"<small class=\"mr-1\">" +
	"剩余REMAIN份" +
	"</small>" +
	"</div>" +
	"<div>DISHLIST</div>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"</li>";

let orderedChoiceModel =
	"<li>" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-12\">" +
	"<div class=\"px-3\">" +
	"<b class=\"title\">套餐COMBOID</b>" +
	"<a class=\"btn btn-sm BTNCLASS disabled\"" +
	">BTNINFO</a>" +
	"<br>" +
	"<div>" +
	"<i class=\"fa fa-exclamation-triangle icon-LEVEL\"></i>" +
	"<small class=\"mr-1\">" +
	"剩余REMAIN份" +
	"</small>" +
	"</div>" +
	"<div>DISHLIST</div>" +
	"</div>" +
	"</div>" +
	"</div>" +
	"</li>";

let weekdayList = ["日", "一", "二", "三", "四", "五", "六"];



// 获取基本数据
let dish = new Array();
let combo = new Array();
$.ajax({
	url: './assets/db/dish-get-onsel.php',
	type: 'post',
	dataType: 'json',
	async: false,
	success: function (result) {
		for (let i = 0; i < result.split(";").length - 1; i++) {
			dish[i] = result.split(";")[i].split(",");
		}
	},
	error: function () {
		throwError("ERR_DGO_PHP");
	}
})
let start = true;
$.ajax({
	url: './assets/db/combo-get-rule.php',
	type: 'post',
	data: { rul: getInfo("rule"), wkid: getWk() },
	dataType: 'json',
	async: false,
	success: function (result) {
		if (result === "success_empty") start = false;
		for (let i = 0; i < result.split(";").length - 1; i++) {
			combo[i] = result.split(";")[i].split(",");
		}
	},
	error: function () {
		throwError("ERR_CBGR_PHP");
	}
})

let chosen = [-1, -1, -1, -1, -1];
// 获取是否订餐和订餐记录
let done = true;
$.ajax({
	url: './assets/db/ord-get.php',
	type: 'post',
	data: { wkid: getWk() },
	dataType: 'json',
	async: false,
	success: function (result) {
		if (result === "success_empty") done = false;
		else {
			let ord = new Array();
			for (let i = 0; i < result.split(";").length - 1; i++) {
				ord[i] = result.split(";")[i];
				chosen[i] = parseInt(ord[i]);
			}
		}
	},
	error: function () {
		throwError("ERR_ORDG_PHP");
	}
})



if (!start) { // 无套餐可供选择
	if (getWk() < getThisWk()) document.getElementById("order-list").innerHTML = noChooseBigPanelModel;
	else document.getElementById("order-list").innerHTML = noStartBigPanelModel;
} else {
	// 生成日期部分
	for (let i = 0; i < 5; i++) {
		let thisDay = new Date(firstWkStart + getWk() * 604800000 + i * 86400000);
		let cbpm = chooseBigPanelModel;

		cbpm = cbpm.replace(/DATE/g, (parseInt(thisDay.getMonth()) + 1).toString() + "/" + thisDay.getDate());
		cbpm = cbpm.replace(/WEEKDAY/g, "周" + weekdayList[thisDay.getDay()]);
		cbpm = cbpm.replace(/DAYID/g, i.toString());
		document.getElementById("order-list").innerHTML += cbpm;
		if (done) document.getElementById("cp-" + i.toString()).innerHTML = genChosenPanelModel(i, chosen[i]);
	}

	function genChosenPanelModel(d, c) {
		let cpm = chosenPanelModel;
		cpm = cpm.replace(/COMBOID/g, String.fromCharCode('A'.charCodeAt() + c));
		let remain = combo[c - parseInt(combo[0][0]) + 1][10];
		cpm = cpm.replace(/REMAIN/g, remain);
		if (remain <= 0) cpm = cpm.replace(/LEVEL/g, "red");
		else if (remain <= 10) cpm = cpm.replace(/LEVEL/g, "orange");
		else cpm = cpm.replace(/LEVEL/g, "green");
		let dishList = "";
		for (let i = 3; i <= 8; i++) {
			dishList += dish[parseInt(combo[c - parseInt(combo[0][0]) + 1][i])][1] + " ";
		}
		dishList = dishList.slice(0, -1);
		cpm = cpm.replace(/DISHLIST/g, dishList);
		return cpm;
	}
	function genChoiceModel(choiceModel, day, op) {
		let choiceAll = "";
		for (let i = 0; i < combo.length; i++) {
			let cm = choiceModel;
			cm = cm.replace(/COMBOID/g, String.fromCharCode('A'.charCodeAt() + i));

			let remain = combo[i][10];
			if (remain <= 0) {
				cm = cm.replace(/BTNCLASS/g, "btn-gray disabled");
				cm = cm.replace(/BTNINFO/g, "已选完");
			}
			else if (op === parseInt(combo[0][0]) + i - 1 || chosen[day] === parseInt(combo[0][0]) + i - 1) {
				cm = cm.replace(/BTNCLASS/g, "btn-orange");
				cm = cm.replace(/BTNINFO/g, "已选择");
				chosen[day] = op;
			}
			else {
				cm = cm.replace(/BTNCLASS/g, "btn-outline-secondary");
				cm = cm.replace(/BTNINFO/g, "选餐");
			}

			if (remain <= 0) cm = cm.replace(/LEVEL/g, "red");
			else if (remain <= 10) cm = cm.replace(/LEVEL/g, "orange");
			else cm = cm.replace(/LEVEL/g, "green");

			cm = cm.replace(/DAYID/g, day.toString());
			cm = cm.replace(/ID/g, (parseInt(combo[i][0]) - 1).toString());
			cm = cm.replace(/REMAIN/g, remain);

			let dishList = "";
			for (let j = 3; j <= 8; j++) {
				dishList += dish[parseInt(combo[i][j])][1] + " ";
			}
			dishList = dishList.slice(0, -1);
			cm = cm.replace(/DISHLIST/g, dishList);

			choiceAll += cm;
		}
		return choiceAll;
	}

	// 控制备选列表
	var choiceOpen = [0, 0, 0, 0, 0];
	function showChoice(s) {
		if (getWk() != getThisWk()) {
			gAlert("该周订餐已关闭");
			return;
		}
		choiceOpen[s] = 1 - choiceOpen[s];
		if (choiceOpen[s]) {
			if (done) document.getElementById("cl-" + s.toString()).innerHTML = genChoiceModel(orderedChoiceModel, s, -1);
			else document.getElementById("cl-" + s.toString()).innerHTML = genChoiceModel(choiceModel, s, -1);
		}
		else {
			document.getElementById("cl-" + s.toString()).innerHTML = "";
		}
	}

	// 控制选择操作及记录选项
	function chooseTyp(d, c) {
		chosen[d] = c;
		document.getElementById("cl-" + d.toString()).innerHTML = genChoiceModel(choiceModel, d, c);
		showChoice(d);
		document.getElementById("cp-" + d.toString()).innerHTML = genChosenPanelModel(d, c);
	}

	// 提交订餐记录
	$("#order").click(function () {
		let orderAll = "";
		let oneNull = false;
		for (let i = 0; i < 5; i++) {
			if (chosen[i] === -1) oneNull = true;
			orderAll += chosen[i].toString() + ";";
		}
		orderAll = orderAll.slice(0, -1);

		if (oneNull) {
			gAlert("请选满本周！");
			return;
		}

		$.ajax({
			url: './assets/db/ordered-sub.php',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success") {
					throwError("ERR_ORDDS_REP");
					return;
				}
				$.ajax({
					url: './assets/db/ord-sub.php',
					type: 'post',
					data: { ord: orderAll, wkid: getWk() },
					dataType: 'json',
					async: false,
					success: function (result) {
						if (result !== "success") throwError("ERR_ORDS_REP");
						else window.location.reload();
					},
					error: function () {
						throwError("ERR_ORDS_PHP");
					}
				})
			},
			error: function () {
				throwError("ERR_ORDDS_PHP");
			}
		})
	})
}



let dishesId = new Set();
if (done) {
	document.getElementsByClassName("nav-link")[1].className = document.getElementsByClassName("nav-link")[1].className.replace("disabled", "");
	document.getElementsByClassName("nav-link")[2].className = document.getElementsByClassName("nav-link")[2].className.replace("disabled", "");
	document.getElementById("order").parentElement.style.display = "none";
	document.getElementById("order-no").parentElement.style.display = "block";
	let wkid = getWk();
	let urlqr = window.location.origin + "/scan.html?" + ("000" + wkid.toString(16)).substring(("000" + wkid.toString(16)).length - 3) + ("00000" + parseInt(getInfo("id")).toString(16)).substring(("00000" + parseInt(getInfo("id")).toString(16)).length - 5);
	QRCode.toDataURL(urlqr, { errorCorrectionLevel: "M" }, function (rtt, url) {
		document.getElementById("qrc").src = url;
	});
	for (let i = 0; i < 5; i++) {
		document.getElementById("order-name").innerText += String.fromCharCode('A'.charCodeAt() + chosen[i]);
	}
	document.getElementById("user-name").innerText = getName();
	document.getElementById("week-id").innerHTML = getWk().toString() + document.getElementById("week-id").innerHTML;
	let thisDay = new Date(firstWkStart + wkid * 604800000);
	document.getElementById("week-start").innerText = (parseInt(thisDay.getMonth()) + 1).toString() + "/" + thisDay.getDate() + " 周" + weekdayList[thisDay.getDay()];
	thisDay = new Date(firstWkStart + wkid * 604800000 + 604800000 - 3 * 86400000);
	document.getElementById("week-end").innerText = (parseInt(thisDay.getMonth()) + 1).toString() + "/" + thisDay.getDate() + " 周" + weekdayList[thisDay.getDay()];

	let rateModel = "<div class=\"px-5 py-3\">NAME<div style=\"float: right\"><i id=\"rateID-1\" class=\"far fa-2x fa-star\"></i><i id=\"rateID-2\" class=\"far fa-2x fa-star\"></i><i id=\"rateID-3\" class=\"far fa-2x fa-star\"></i><i id=\"rateID-4\" class=\"far fa-2x fa-star\"></i><i id=\"rateID-5\" class=\"far fa-2x fa-star\"></i></div></div>";
	for (let i = 0; i < 5; i++) {
		for (let j = 3; j <= 8; j++) {
			dishesId.add(dish[parseInt(combo[chosen[i] - parseInt(combo[0][0]) + 1][j])][0] - 1);
		}
	}
	dishesId.forEach(function (v) {
		let rm = rateModel;
		rm = rm.replace(/ID/g, v);
		rm = rm.replace(/NAME/g, dish[v][1]);
		document.getElementById("tab-2").innerHTML += rm;
	})
	dishesId.forEach(function (v) {
		$.ajax({
			url: './assets/db/rate-get.php',
			type: 'post',
			data: { id: v + 1, wk: getWk() },
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success_empty") {
					result = parseInt(result);
					for (let i = 0; i <= result; i++) {
						$("#rate" + v.toString() + "-" + i.toString()).removeClass("far");
						$("#rate" + v.toString() + "-" + i.toString()).addClass("fas");
					}
					for (let i = result + 1; i <= 5; i++) {
						$("#rate" + v.toString() + "-" + i.toString()).removeClass("fas");
						$("#rate" + v.toString() + "-" + i.toString()).addClass("far");
					}
				}
			},
			error: function () {
				throwError("ERR_RTG_PHP");
			}
		})
	})
	dishesId.forEach(function (v) {
		for (let i = 1; i <= 5; i++) {
			$("#rate" + v.toString() + "-" + i.toString()).on("click", function () {
				for (let j = 0; j <= i; j++) {
					$("#rate" + v.toString() + "-" + j.toString()).removeClass("far");
					$("#rate" + v.toString() + "-" + j.toString()).addClass("fas");
				}
				for (let j = i + 1; j <= 5; j++) {
					$("#rate" + v.toString() + "-" + j.toString()).removeClass("fas");
					$("#rate" + v.toString() + "-" + j.toString()).addClass("far");
				}
				$.ajax({
					url: './assets/db/rate-sub.php',
					type: 'post',
					data: { id: v + 1, rate: i, wk: getWk() },
					dataType: 'json',
					async: false,
					success: function (result) {
						if (result !== "success") {
							throwError("ERR_RTS_REP");
							return;
						}
					},
					error: function () {
						throwError("ERR_RTS_PHP");
					}
				})
			});
		}
	})
}

