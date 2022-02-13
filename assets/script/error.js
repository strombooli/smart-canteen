let errTyp = [401, 404];
let errPrompt = ["访问被拒绝", "页面建设中"];
let errAlert = [["请使用本地连接"], []];

let defaultErrTyp = 1;
let defaultErrSon = -1;

let errTypId = 0, errSonId = 0;
let urlDat = window.location.search.substring(1, 10);
if (urlDat === "") {
		errTypId = defaultErrTyp;
		errSonId = defaultErrSon;
}
else {
	let urlTyp = urlDat.split('.')[0];
	if (urlDat.split('.').length == 2) {
		let urlSon = urlDat.split('.')[1];
		errSonId = parseInt(urlSon);
	}
	else {
		errSonId = defaultErrSon;
	}
	errTypId = urlTyp.indexOf(urlTyp);
}


document.getElementById("err-typ").innerText = errTyp[errTypId];
if (errSonId !== defaultErrSon) document.getElementById("err-prompt").innerText = errPrompt[errTypId] + "（" + errAlert[errTypId][errSonId] + "）";
else document.getElementById("err-prompt").innerText = errPrompt[errTypId];