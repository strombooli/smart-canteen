$(function () {
	$.ajax({
		url: '../assets/phs-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			done = parseInt(result.split(";")[3]);
			if (done) {
				document.getElementById("overview-confirm").parentElement.style.display = "none";
				document.getElementById("overview-no").parentElement.style.display = "block";
			}
		},
		error: function () {
			throwError("ERR_PHSG_PHP");
		}
	})
	$.ajax({
		url: '../assets/overview.php',
		type: 'post',
		data: { wkid: getThisWk() + 1 },
		dataType: 'json',
		async: false,
		success: function (result) {
			let overviewArray = new Array();
			overviewArray = result.split(";");

			document.getElementById("overview-rule").innerText = "共有" + overviewArray[0] + "条规则。";
			if (parseInt(overviewArray[0]) <= 1) document.getElementById("overview-rule-warn").innerText += "规则过少；";
			if (parseInt(overviewArray[1]) > 0) document.getElementById("overview-rule-warn").innerText += "权重过大；";
			if (parseInt(overviewArray[0]) > 1 && parseInt(overviewArray[1]) === 0) {
				document.getElementById("overview-rule-warn").className = document.getElementById("overview-rule-warn").className.replace("text-red", "text-green");
				document.getElementById("overview-rule-warn").innerText = "一切正常。";
			}

			document.getElementById("overview-upload").innerText = "共有" + overviewArray[2] + "种主食，" + overviewArray[3] + "种素食，" + overviewArray[4] + "种荤食和" + overviewArray[5] + "种汤。";
			if (parseInt(overviewArray[2]) <= 3) document.getElementById("overview-upload-warn").innerText += "主食过少；";
			if (parseInt(overviewArray[3]) <= 20) document.getElementById("overview-upload-warn").innerText += "素食过少；";
			if (parseInt(overviewArray[4]) <= 20) document.getElementById("overview-upload-warn").innerText += "荤食过少；";
			if (parseInt(overviewArray[5]) <= 10) document.getElementById("overview-upload-warn").innerText += "汤类过少；";
			if ((Math.max(parseInt(overviewArray[3]), parseInt(overviewArray[4])) - Math.min(parseInt(overviewArray[3]), parseInt(overviewArray[4]))) / Math.min(parseInt(overviewArray[3]), parseInt(overviewArray[4])) > 0.6) document.getElementById("overview-upload-warn").innerText += "荤素数量差别过大；";
			if (parseInt(overviewArray[2]) > 3 && parseInt(overviewArray[3]) > 20 && parseInt(overviewArray[4]) > 20 && parseInt(overviewArray[5]) > 10 && (Math.max(parseInt(overviewArray[3]), parseInt(overviewArray[4])) - Math.min(parseInt(overviewArray[3]), parseInt(overviewArray[4]))) / Math.min(parseInt(overviewArray[3]), parseInt(overviewArray[4])) <= 0.6) {
				document.getElementById("overview-upload-warn").className = document.getElementById("overview-upload-warn").className.replace("text-red", "text-green");
				document.getElementById("overview-upload-warn").innerText = "一切正常。";
			}

			document.getElementById("overview-combo").innerText = "共有" + overviewArray[6] + "种套餐。";
			if (parseInt(overviewArray[7]) < 6) document.getElementById("overview-combo-warn").innerText += "部分规则套餐过少；";
			if (parseInt(overviewArray[8]) > 10) document.getElementById("overview-combo-warn").innerText += "部分规则套餐过多；";
			if (parseInt(overviewArray[7]) >= 6 && parseInt(overviewArray[8]) <= 10) {
				document.getElementById("overview-combo-warn").className = document.getElementById("overview-combo-warn").className.replace("text-red", "text-green");
				document.getElementById("overview-combo-warn").innerText = "一切正常。";
			}

			let overviewReset = overviewArray[9].split(',');
			let overviewNeedReset = false;
			document.getElementById("overview-reset").innerText = "共有" + overviewReset.length + "个用户。";
			for (let i = 0; i < overviewReset.length; i++)
				if (overviewReset[i] != '0') overviewNeedReset = true;
			if (overviewNeedReset) document.getElementById("overview-reset-warn").innerText = "有订餐数据需要重置。";
			else{
				document.getElementById("overview-reset-warn").innerText = "一切正常。";
				document.getElementById("overview-reset-warn").className = document.getElementById("overview-reset-warn").className.replace("text-red", "text-green");
			}
		},
		error: function () {
			throwError("ERR_PHSG_PHP");
		}
	})
	$("#overview-confirm").click(function () {
		$.ajax({
			url: '../assets/phs-sub.php',
			type: 'post',
			data: { phs: "3.1" },
			dataType: 'json',
			async: false,
			success: function (result_cbg) {
				if (result_cbg === "success") window.location.reload();
				else throwError("ERR_PHSS_REP");
			},
			error: function () {
				throwError("ERR_PHSS_PHP");
			}
		})
		$.ajax({
			url: '../assets/usr-reset.php',
			type: 'post',
			data: { phs: "3.1" },
			dataType: 'json',
			async: false,
			success: function (result_rst) {
				if (result_rst === "success");
				else throwError("ERR_USRR_REP");
			},
			error: function () {
				throwError("ERR_USRR_PHP");
			}
		})
	})
})