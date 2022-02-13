let timeStart = [60, 60, 84, 0];
let timeEnd = [72, 84, 92, 168];

let statArray = ["未开始", "进行中 未完成", "进行中 已完成", "已结束 未完成", "已结束 已完成"];
let statDone = [-1, 0, 1, 0, 1];
let statTime = [-1, 0, 0, 1, 1];
let statWarnLevel = [0, 1, 0, 2, 0];
let statWarnColor = ["", " text-green", " text-red"];
let statButtonLevel = [0, 1, 2, 2, 2];
let statButtonText = ["进入", "进入", "查看"];
let statButtonClass = ["btn-disabled", "btn-green", "btn-green"];

let done = new Array();

function add0(s) {
	return ("00" + s).slice(-2);
}
function toDisplayTime(d) {
	return d.getFullYear() + "/" + (parseInt(d.getMonth()) + 1).toString() + "/" + d.getDate() + " " + add0(d.getHours()) + ":" + add0(d.getMinutes());
}

$(function () {
	$.ajax({
		url: './assets/phs-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			done = result.split(";").slice(0, 4);
			let now = new Date();
			let thisWeekStart = Math.floor(new Date().getTime() / 604800000) * 604800000 - 8 * 60 * 60 * 1000 - 3 * 24 * 60 * 60 * 1000;
			for (let i = 0; i < 4; i++) {
				let startElem = document.getElementById("phs-" + i.toString() + "-s");
				let startTime = new Date(thisWeekStart + timeStart[i] * 3600 * 1000);
				startElem.innerText = toDisplayTime(startTime);
				let endElem = document.getElementById("phs-" + i.toString() + "-e");
				let endTime = new Date(thisWeekStart + timeEnd[i] * 3600 * 1000);
				endElem.innerText = toDisplayTime(endTime);

				let timeLabel = -2;
				if (now < startTime && now < endTime) timeLabel = -1;
				if (now >= startTime && now <= endTime) timeLabel = 0;
				if (now > startTime && now > endTime) timeLabel = 1;

				let doneLabel = parseInt(done[i]);

				let statElem = document.getElementById("phs-" + i.toString() + "-stat");
				let enterElem = document.getElementById("phs-" + i.toString() + "-n");
				for (let j = 0; j < 5; j++) {
					if (timeLabel === statTime[j] && (doneLabel === statDone[j] || statDone[j] === -1)) {
						statElem.innerText = statArray[j];
						statElem.classList += statWarnColor[statWarnLevel[j]];
						enterElem.innerText = statButtonText[statButtonLevel[j]];
						enterElem.className.replace("btn-green", statButtonClass[statButtonLevel[j]]);
					}
				}
			}
		},
		error: function () {
			throwError("ERR_PHSG_PHP");
		}
	})
})