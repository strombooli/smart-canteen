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
	"<div class=\"col-12\" onclick=\"showChoice(ID);\">" +
	"<div class=\"px-3\" id=\"cp-ID\">" +
	"<div class=\"text-muted text-center mt-4\">点击这里选餐</div>" +
	"</div></div></div></div></div>" +
	"<ul class=\"supply-list shadow-sm\" id=\"cl-ID\"></ul>" +
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

let dish = new Array();
let combo = new Array();
$.ajax({
	url: './assets/dish-get-onsel.php',
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
$.ajax({
	url: './assets/combo-get-rule.php',
	type: 'post',
	data: { rul: getInfo("rule") },
	dataType: 'json',
	async: false,
	success: function (result) {
		for (let i = 0; i < result.split(";").length - 1; i++) {
			combo[i] = result.split(";")[i].split(",");
		}
	},
	error: function () {
		throwError("ERR_CBGR_PHP");
	}
})

let chosen = [-1, -1, -1, -1, -1];
let done = parseInt(getInfo("ordered"));
if (done) {
	document.getElementsByClassName("nav-link")[1].className = document.getElementsByClassName("nav-link")[1].className.replace("disabled","");
	document.getElementById("order").parentElement.style.display = "none";
	document.getElementById("order-no").parentElement.style.display = "block";
	$.ajax({
		url: './assets/ord-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result === "success_empty") throwError("ERR_ORD_DATA");
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
}

function genChosenPanelModel(d, c) {
	let cpm = chosenPanelModel;
	cpm = cpm.replace(/COMBOID/g, String.fromCharCode('A'.charCodeAt() + parseInt(combo[c][0]) - 1));
	let remain = combo[c][8];
	cpm = cpm.replace(/REMAIN/g, remain);
	if (remain <= 0) cpm = cpm.replace(/LEVEL/g, "red");
	else if (remain <= 10) cpm = cpm.replace(/LEVEL/g, "orange");
	else cpm = cpm.replace(/LEVEL/g, "green");
	let dishList = "";
	for (let i = 2; i <= 7; i++) {
		dishList += dish[parseInt(combo[c][i])][1] + " ";
	}
	dishList = dishList.slice(0, -1);
	cpm = cpm.replace(/DISHLIST/g, dishList);
	return cpm;
}

let thisWeekStart = Math.floor(new Date().getTime() / 604800000) * 604800000 - 8 * 60 * 60 * 1000 - 3 * 24 * 60 * 60 * 1000;
for (let i = 0; i < 5; i++) {
	let thisDay = new Date(thisWeekStart + i * 24 * 60 * 60 * 1000);
	let cbpm = chooseBigPanelModel;

	cbpm = cbpm.replace(/DATE/g, (parseInt(thisDay.getMonth()) + 1).toString() + "/" + thisDay.getDate());
	cbpm = cbpm.replace(/WEEKDAY/g, "周" + weekdayList[thisDay.getDay()]);
	cbpm = cbpm.replace(/ID/g, i.toString());
	document.getElementById("order-list").innerHTML += cbpm;
	if (done) document.getElementById("cp-" + i.toString()).innerHTML = genChosenPanelModel(i, chosen[i]);
}

function genChoiceModel(choiceModel, day, op) {
	let choiceAll = "";
	for (let i = 0; i < combo.length; i++) {
		let cm = choiceModel;
		cm = cm.replace(/COMBOID/g, String.fromCharCode('A'.charCodeAt() + parseInt(combo[i][0]) - 1));

		let remain = combo[i][8];
		if (remain <= 0) {
			cm = cm.replace(/BTNCLASS/g, "btn-gray disabled");
			cm = cm.replace(/BTNINFO/g, "已选完");
		}
		else if (op === i || chosen[day] === i) {
			cm = cm.replace(/BTNCLASS/g, "btn-orange");
			cm = cm.replace(/BTNINFO/g, "已选择");
			chosen[day][op] = 1;
		}
		else {
			cm = cm.replace(/BTNCLASS/g, "btn-outline-secondary");
			cm = cm.replace(/BTNINFO/g, "选餐");
		}

		if (remain <= 0) cm = cm.replace(/LEVEL/g, "red");
		else if (remain <= 10) cm = cm.replace(/LEVEL/g, "orange");
		else cm = cm.replace(/LEVEL/g, "green");

		cm = cm.replace(/DAYID/g, day.toString());
		cm = cm.replace(/ID/g, i.toString());
		cm = cm.replace(/REMAIN/g, remain);

		let dishList = "";
		for (let j = 2; j <= 7; j++) {
			dishList += dish[parseInt(combo[i][j])][1] + " ";
		}
		dishList = dishList.slice(0, -1);
		cm = cm.replace(/DISHLIST/g, dishList);

		choiceAll += cm;
	}
	return choiceAll;
}



let choiceOpen = [0, 0, 0, 0, 0];
function showChoice(s) {
	choiceOpen[s] = 1 - choiceOpen[s];
	if (choiceOpen[s]) {
		if (done) document.getElementById("cl-" + s.toString()).innerHTML = genChoiceModel(orderedChoiceModel, s, -1);
		else document.getElementById("cl-" + s.toString()).innerHTML = genChoiceModel(choiceModel, s, -1);
	}
	else {
		document.getElementById("cl-" + s.toString()).innerHTML = "";
	}
}

function chooseTyp(d, c) {
	chosen[d] = c;
	document.getElementById("cl-" + d.toString()).innerHTML = genChoiceModel(choiceModel, d, c);
	showChoice(d);
	document.getElementById("cp-" + d.toString()).innerHTML = genChosenPanelModel(d, c);
}

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
		url: './assets/ordered-sub.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result !== "success") throwError("ERR_ORDDS_REP");
		},
		error: function () {
			throwError("ERR_ORDDS_PHP");
		}
	})

	$.ajax({
		url: './assets/ord-sub.php',
		type: 'post',
		data: { ord: orderAll, usrid: getInfo("id") },
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
})