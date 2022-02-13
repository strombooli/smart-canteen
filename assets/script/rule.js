var rule = new Array();
var ruleNew = "";

var ruleModel =
	"<div>" +
	"<ul class=\"px-3 rule-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">RULEID</div>" +
	"<div class=\"col\"><input id=\"rul-ID-0\" class=\"form-control\" style=\"height:1.4rem\" value=\"CALORIE\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-1\" class=\"form-control\" style=\"height:1.4rem\" value=\"FAT\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-2\" class=\"form-control\" style=\"height:1.4rem\" value=\"PROTEIN\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-3\" class=\"form-control\" style=\"height:1.4rem\" value=\"CARBON\"></input></div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var ruleModelNoConfig =
	"<div>" +
	"<ul class=\"px-3 rule-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">RULEID</div>" +
	"<div class=\"col\">CALORIE</div>" +
	"<div class=\"col\">FAT</div>" +
	"<div class=\"col\">PROTEIN</div>" +
	"<div class=\"col\">CARBON\</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var ruleModelNew =
	"<div>" +
	"<ul class=\"px-3 rule-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">RULEID</div>" +
	"<div class=\"col\"><input id=\"rul-ID-0\" class=\"form-control\" style=\"height:1.4rem\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-1\" class=\"form-control\" style=\"height:1.4rem\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-2\" class=\"form-control\" style=\"height:1.4rem\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-3\" class=\"form-control\" style=\"height:1.4rem\"></input></div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var ruleAll = "";
var ruleCnt = 0;

$(function () {
	$.ajax({
		url: '../assets/phs-get.php',
		type: 'post',
		dataType: 'json',
		success: function (result) {
			let done = parseInt(result.split(";")[0]);
			if (done) {
				$("#rul-add").hide();
				$("#rul-submit").hide();
				$("#rul-no").show();
			}
		},
		error: function () {
			alert('error');
		}
	})
	$.ajax({
		url: '../assets/rule-get-all.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result_rule) {
			for (let i = 0; i < result_rule.split(";").length - 1; i++) {
				rule[i] = result_rule.split(";")[i].split(",");
				let rm = "";
				if (rule[i][5] == "0") rm = ruleModelNoConfig;
				else rm = ruleModel;
				rm = rm.replace(/RULEID/g, (i + 1).toString());
				rm = rm.replace(/ID/g, i.toString());
				rm = rm.replace(/CALORIE/g, rule[i][1]);
				rm = rm.replace(/FAT/g, rule[i][2]);
				rm = rm.replace(/PROTEIN/g, rule[i][3]);
				rm = rm.replace(/CARBON/g, rule[i][4]);
				ruleAll += rm;
			}
			document.getElementById("rul-list").innerHTML = ruleAll;
			ruleCnt = rule.length;
		},
		error: function () {
			alert('error');
		}
	})
	$("#rul-submit").click(function () {
		let ruleTmp = "";
		let allZero = true;
		let allNull = true;
		for (let i = 0; i < ruleCnt; i++) {
			ruleTmp = "";
			if (i < rule.length) {
				if (rule[i][5] == 0) continue;
			}

			for (let j = 0; j < 3; j++) {
				ruleTmp += document.getElementById("rul-" + i.toString() + "-" + j.toString()).value + ",";
				if (document.getElementById("rul-" + i.toString() + "-" + j.toString()).value !== "0") allZero = false;
				if (document.getElementById("rul-" + i.toString() + "-" + j.toString()).value !== "") allNull = false;
			}
			ruleTmp += document.getElementById("rul-" + i.toString() + "-3").value + ";";
			if ((allZero || allNull) && i) continue;
			allZero = true;
			allNull = true;
			ruleNew += ruleTmp;
		}
		ruleNew = ruleNew.slice(0, -1);
		$.ajax({
			url: '../assets/rul-sub.php',
			type: 'post',
			data: { rule: ruleNew },
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success" && result !== "success_empty") alert("error");
				else{
					$.ajax({
						url: '../assets/phs-sub.php',
						type: 'post',
						data: { phs: "0.1" },
						dataType: 'json',
						async: false,
						success: function (result_phs) {
							if(result_phs === "success") window.location.reload();
						},
						error: function () {
							alert('error');
						}
					})
				}
			},
			error: function () {
				alert('error');
			}
		})

	})
	$("#rul-add").click(function () {
		let rmn = ruleModelNew;
		rmn = rmn.replace(/RULEID/g, (ruleCnt + 1).toString());
		rmn = rmn.replace(/ID/g, ruleCnt.toString());
		document.getElementById("rul-list").innerHTML += rmn;
		ruleCnt++;
	})
})