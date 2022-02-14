var err = new Array();

var errModel =
	"<div>" +
	"<ul class=\"px-3 err-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">ERRID</div>" +
	"<div class=\"col\">TIME</div>" +
	"<div class=\"col\">CODE</div>" +
	"<div class=\"col\">PATH</div>" +
	"<div class=\"col\">USER</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var errAll = "";

$(function () {
	$.ajax({
		url: '../assets/err-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			for (let i = 0; i < result.split(";").length - 1; i++) {
				err[i] = result.split(";")[i].split(",");
				let em = errModel;
				em = em.replace(/ERRID/g, (i + 1).toString());
				em = em.replace(/TIME/g, err[i][0]);
				em = em.replace(/CODE/g, err[i][1]);
				em = em.replace(/PATH/g, err[i][2]);
				if (err[i][3] !== "") em = em.replace(/USER/g, err[i][3]);
				else em = em.replace(/USER/g, "未登录");
				errAll += em;
			}
			document.getElementById("err-list").innerHTML = errAll;
		},
		error: function () {
			throwError("ERR_EG_PHP");
		}
	})
	$("#err-clear").click(function () {
		$.ajax({
			url: '../assets/err-clear.php',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (result) {
				if (result !== "success") throwError("ERR_EC_REP");
				else window.location.reload();
			},
			error: function () {
				throwError("ERR_EC_PHP");
			}
		})
	})
})