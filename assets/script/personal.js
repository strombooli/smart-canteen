var rule = new Array();

var ruleModel =
	"<div>" +
	"<ul class=\"px-3 rule-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\" style=\"whitespace:pre; width:0.8rem\"><input id=\"ck-CKID\" type=\"checkbox\" CHECK></input> RULEID</div>" +
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

$(function () {
	$.ajax({
		url: './assets/db/personal-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			let mySel = new Array();
			mySel = result.split(";");
			for (let i = 0; i < mySel.length; i++) {
				seled[parseInt(mySel[i])] = true;
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
	$("#rul-submit").click(function () {
		let ruleSel = "";
		for (let i = 0; i < ruleCnt; i++) {
			if (document.getElementById("ck-" + i.toString()).checked) ruleSel += i.toString() + ";";
		}
		ruleSel = ruleSel.slice(0, -1);
		$.ajax({
			url: './assets/db/personal-sub.php',
			type: 'post',
			data: { sel: ruleSel + ";"},
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success") throwError("ERR_PERS_REP");
				else window.location.reload();
			},
			error: function () {
				throwError("ERR_PERS_PHP");
			}
		})

	})
})