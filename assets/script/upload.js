var dish = new Array();

var dishModel =
	"<div>" +
	"<ul class=\"px-3 dish-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">DISHID</div>" +
	"<div class=\"col\">NAME</div>" +
	"<div class=\"col\">TYPE</div>" +
	"<div class=\"col-1\"><input id=\"ck-ID\" type=\"checkbox\" ONSEL></input></div>" +
	"<div class=\"col-3\">RATING</div>" +
	"<div class=\"col\">RATECNT</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

/*var ruleModelNew =
	"<div>" +
	"<ul class=\"px-3 rule-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">RULEID</div>" +
	"<div class=\"col\"><input id=\"rul-ID-0\" class=\"fodm-control\" style=\"height:1.4rem\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-1\" class=\"fodm-control\" style=\"height:1.4rem\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-2\" class=\"fodm-control\" style=\"height:1.4rem\"></input></div>" +
	"<div class=\"col\"><input id=\"rul-ID-3\" class=\"fodm-control\" style=\"height:1.4rem\"></input></div>" +
	"</li>" +
	"</ul>" +
	"</div>";*/

var dishAll = "";

$(function () {
	$.ajax({
		url: '../assets/db/phs-get.php',
		type: 'post',
		dataType: 'json',
		success: function (result) {
			let done = result.split(";")[1];
			if (parseInt(done)) {
				$("#dish-confirm").hide();
				$("#dish-no").show();
			}
		},
		error: function () {
			throwError("ERR_PHSG_PHP");
		}
	})
	$.ajax({
		url: '../assets/db/dish-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result_dish) {
			for (let i = 0; i < result_dish.split(";").length - 1; i++) {
				dish[i] = result_dish.split(";")[i].split(",");
				let dm = dishModel;
				let typeArray = ["主食", "素食", "荤食", "汤类"];
				dm = dm.replace(/DISHID/g, (i + 1).toString());
				dm = dm.replace(/ID/g, i.toString());
				dm = dm.replace(/NAME/g, dish[i][1]);
				dm = dm.replace(/TYPE/g, typeArray[parseInt(dish[i][2])]);
				if (parseInt(dish[i][7])) dm = dm.replace(/ONSEL/g, "checked=\"checked\"");
				else dm = dm.replace(/ONSEL/g, "");

				let rateStr = "";
				let rateModel0 = "<i class=\"fas fa-star\"></i>";
				let rateModel1 = "<i class=\"far fa-star\"></i>";
				for (let j = 0; j < parseInt(dish[i][8]); j++) rateStr += rateModel0;
				for (let j = parseInt(dish[i][8]); j < 5; j++) rateStr += rateModel1;
				dm = dm.replace(/RATING/g, rateStr + " " + dish[i][8]);

				dm = dm.replace(/RATECNT/g, dish[i][9]);
				dishAll += dm;
			}
			document.getElementById("dish-list").innerHTML = dishAll;
		},
		error: function () {
			throwError("ERR_DG_PHP");
		}
	})
	$("#dish-confirm").click(function () {
		let dishOnSel = "";
		for (let i = 0; i < dish.length; i++) {
			let dishChecked = document.getElementById("ck-" + i.toString()).checked;
			if (dishChecked) dishOnSel += "1;";
			else dishOnSel += "0;";
		}
		dishOnSel = dishOnSel.slice(0, -1);
		$.ajax({
			url: '../assets/db/dish-sub-onsel.php',
			type: 'post',
			data: { dish: dishOnSel },
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success" && result !== "success_empty") throwError("ERR_DSBO_REP")
				else {
					updPhs("1.1");
				}
			},
			error: function () {
				throwError("ERR_DSBO_PHP");
			}
		})

	})
})