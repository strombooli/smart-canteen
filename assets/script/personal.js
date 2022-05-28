var rule = new Array();

var ruleModel =
	"<div>" +
	"<ul class=\"px-3 rule-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\" style=\"whitespace:pre; width:0.8rem\"><input id=\"ck-CKID\" type=\"checkbox\" CHECK> RULEID</div>" +
	"<div class=\"col\">CALORIE</div>" +
	"<div class=\"col\">FAT</div>" +
	"<div class=\"col\">PROTEIN</div>" +
	"<div class=\"col\">CARBON\</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var ruleAll = "";
var ruleCnt = 0;
var seled = new Array();
let sensi = new Array();
let sensiCnt = 0;

$.ajax({
	url: './assets/db/personal-get.php',
	type: 'post',
	dataType: 'json',
	async: false,
	success: function (result) {
		let mySel = new Array(), mySensi = new Array();
		mySel = result.split("/")[0].split(";");
		mySensi = result.split("/")[1].split(";");
		for (let i = 0; i < mySel.length; i++) {
			seled[parseInt(mySel[i])] = true;
		}
		for (let i = 0; i < mySensi.length; i++) {
			sensi[parseInt(mySensi[i])] = true;
		}
	},
	error: function () {
		throwError("ERR_PERG_PHP");
	}
})
$.ajax({
	url: './assets/db/rule-get-all.php',
	type: 'post',
	dataType: 'json',
	async: false,
	success: function (result_rule) {
		for (let i = 0; i < result_rule.split(";").length - 1; i++) {
			rule[i] = result_rule.split(";")[i].split(",");
			let rm = ruleModel;
			rm = rm.replace(/CKID/g, i.toString());
			rm = rm.replace(/RULEID/g, (i + 1).toString());
			rm = rm.replace(/CALORIE/g, rule[i][1]);
			rm = rm.replace(/FAT/g, rule[i][2]);
			rm = rm.replace(/PROTEIN/g, rule[i][3]);
			rm = rm.replace(/CARBON/g, rule[i][4]);
			if (seled[i]) rm = rm.replace(/CHECK/g, "checked=\"true\"");
			else rm = rm.replace(/CHECK/g, "");
			ruleAll += rm;
		}
		document.getElementById("rul-list").innerHTML = ruleAll;
		ruleCnt = rule.length;
	},
	error: function () {
		throwError("ERR_RGA_PHP");
	}
})


let dish = new Array();

let dishModel =
	"<div>" +
	"<ul class=\"px-3 dish-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\" style=\"whitespace:pre; width:0.8rem\"><input id=\"ckd-CKID\" type=\"checkbox\" CHECK> DISHID</div>" +
	"<div class=\"col\">DISHNAME</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

let dishAll = "";

$.ajax({
	url: '../assets/db/dish-get-name.php',
	type: 'post',
	dataType: 'json',
	async: false,
	success: function (result_dish) {
		for (let i = 0; i < result_dish.split(";").length - 1; i++) {
			dish[i] = result_dish.split(";")[i].split(",");
			let dm = dishModel;
			dm = dm.replace(/CKID/g, (i + 1).toString());
			dm = dm.replace(/DISHID/g, (i + 1).toString());
			dm = dm.replace(/DISHNAME/g, dish[i][1]);
			if (sensi[dish[i][0]]) dm = dm.replace(/CHECK/g, "checked=\"true\"");
			else dm = dm.replace(/CHECK/g, "");
			dishAll += dm;
		}
		sensiCnt = dish.length;
		document.getElementById("dish-list").innerHTML = dishAll;
	},
	error: function () {
		throwError("ERR_DGN_PHP");
	}
})

$("#rul-submit").click(function () {
	let ruleSel = "";
	for (let i = 0; i < ruleCnt; i++) {
		if (document.getElementById("ck-" + i.toString()).checked) ruleSel += i.toString() + ";";
	}
	ruleSel = ruleSel.slice(0, -1);
	$.ajax({
		url: './assets/db/personal-sub-rule.php',
		type: 'post',
		data: { sel: ruleSel + ";" },
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result !== "success") throwError("ERR_PERSR_REP");
			else window.location.reload();
		},
		error: function () {
			throwError("ERR_PERSR_PHP");
		}
	})
	let ruleSensi = "";
	for (let i = 1; i <= sensiCnt; i++) {
		if (document.getElementById("ckd-" + i.toString()).checked) ruleSensi += i.toString() + ";";
	}
	ruleSensi = ruleSensi.slice(0, -1);
	$.ajax({
		url: './assets/db/personal-sub-sensi.php',
		type: 'post',
		data: { sel: ruleSensi + ";" },
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result !== "success") throwError("ERR_PERSS_REP");
			else window.location.reload();
		},
		error: function () {
			throwError("ERR_PERSS_PHP");
		}
	})
})