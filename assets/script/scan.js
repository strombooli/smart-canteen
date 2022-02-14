






if (window.location.search == "") {
	$("#order-panel").hide();
	$("#verify-msg").hide();
}
else {
	let wkid = parseInt(window.location.search.substring(1, 4), 16).toString(10);
	let stud = parseInt(window.location.search.substring(4), 16).toString(10);

	function doPrompt(n) {
		let scanClr = ["text-red", "text-red", "text-success"];
		let scanPrompt = ["已有核验记录", "核验失败", "核验成功"];
		document.getElementById("msg").innerText = scanPrompt[n];
		document.getElementById("msg").className += " " + scanClr[n];
	}

	$.ajax({
		url: './assets/ord-get-all.php',
		type: 'post',
		data: { userid: stud, wkid: wkid },
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result == "success_empty") {
				$("#order-panel").hide();
				doPrompt(1);
				return;
			}
			for (let i = 0; i < 5; i++) {
				document.getElementById("order-name").innerText += String.fromCharCode('A'.charCodeAt() + parseInt(result.split(";")[i]));
			}
			doPrompt(2);
		},
		error: function () {
			throwError("ERR_ORDGA_PHP");
		}
	})
	QRCode.toDataURL(window.location.href, { errorCorrectionLevel: "M" }, function (rtt, url) {
		document.getElementById("qrc").src = url;
	});
	let weekdayList = ["日", "一", "二", "三", "四", "五", "六"];
	document.getElementById("user-name").innerText = getUserInfo(stud, "id", "name");
	document.getElementById("week-id").innerHTML = wkid.toString() + document.getElementById("week-id").innerHTML;
	let thisDay = new Date(firstWkStart + wkid * 604800000);
	document.getElementById("week-start").innerText = (parseInt(thisDay.getMonth()) + 1).toString() + "/" + thisDay.getDate() + " 周" + weekdayList[thisDay.getDay()];
	thisDay = new Date(firstWkStart + wkid * 604800000 + 604800000 - 3 * 86400000);
	document.getElementById("week-end").innerText = (parseInt(thisDay.getMonth()) + 1).toString() + "/" + thisDay.getDate() + " 周" + weekdayList[thisDay.getDay()];
}