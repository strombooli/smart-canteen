var dish = new Array();
var dish_all = new Array();
var rk_rule = new Array();
var rule = new Array();
var rk = new Array();
var sel = new Array();
var sel_res = new Array();
var sel_arr = new Array();
var sel_sub = "";

var total_dish_len = 0;

var tmp = 0;
var checked = new Array();
var ckd_cnt = new Array();


var comboModel =
	"<div>" +
	"<ul class=\"px-3 combo-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\" style=\"whitespace:pre; width:0.8rem\"><input id=\"CKID\" type=\"checkbox\" checked=\"true\" onclick=\"checkUpd();\"></input> ID</div>" +
	"<div class=\"col\">MAIN</div>" +
	"<div class=\"col\">DISH1</div>" +
	"<div class=\"col\">DISH2</div>" +
	"<div class=\"col\">DISH3</div>" +
	"<div class=\"col\">DISH4</div>" +
	"<div class=\"col\">SOUP</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var comboDisplayModel =
	"<div>" +
	"<ul class=\"px-3 combo-list\">" +
	"<li class=\"py-2\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col-1\">ID</div>" +
	"<div class=\"col\">MAIN</div>" +
	"<div class=\"col\">DISH1</div>" +
	"<div class=\"col\">DISH2</div>" +
	"<div class=\"col\">DISH3</div>" +
	"<div class=\"col\">DISH4</div>" +
	"<div class=\"col\">SOUP</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var ruleTitleModel =
	"<div>" +
	"<ul class=\"px-3 rule-title\">" +
	"<li class=\"py-2\" style=\"border-bottom: solid 1px #ccc\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col\">规则ID RULEID</div>" +
	"<div class=\"col\" style=\"whitespace:pre\">套餐总数 <span id=\"CNTID\">CBCNT</span></div>" +
	"</div>" +
	"</li>" +
	"</ul>" +
	"</div>";

var ruleTitleDisplayModel =
	"<div>" +
	"<ul class=\"px-3 rule-title\">" +
	"<li class=\"py-2\" style=\"border-bottom: solid 1px #ccc\">" +
	"<div class=\"row no-gutters\">" +
	"<div class=\"col\">规则ID RULEID</div>" +
	"<div class=\"col\" style=\"whitespace:pre\">套餐总数 <span>CBCNT</span></div>" +
	"</div>" +
	"</li>" +
	"</ul>" +
	"</div>"

var comboAll = "";

function checkUpd() {
	for (let i = 0; i < tmp; i++) {
		ckd_cnt[sel_arr[i][0]] = 0;
	}
	for (let i = 0; i < tmp; i++) {
		checked[i] = document.getElementById("ck-" + i.toString()).checked;
		if (checked[i]) { ckd_cnt[sel_arr[i][0]]++; }
	}
	for (let i = 0; i < tmp; i++) {
		if (i == tmp - 1) {
			document.getElementById("cnt-" + sel_arr[i][0].toString()).innerText = ckd_cnt[sel_arr[i][0]];
			continue;
		}
		if (sel_arr[i][0] !== sel_arr[i + 1][0]) document.getElementById("cnt-" + sel_arr[i][0].toString()).innerText = ckd_cnt[sel_arr[i][0]];
	}
}

var done = 0;

let dish_id_in_rk = new Array();
let id_in_dish_all = new Array();
for (let i = 0; i < 1000; i++)dish_id_in_rk[i] = -1;
$(function () {
	$.ajax({
		url: '../assets/db/phs-get.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			done = parseInt(result.split(";")[2]);
			if (done) {
				document.getElementById("combo-gen").parentElement.style.display = "none";
				document.getElementById("combo-submit").parentElement.style.display = "none";
				document.getElementById("combo-no").parentElement.style.display = "block";
			}
		},
		error: function () {
			throwError("ERR_PHSG_PHP");
		}
	})
	if (!done) {
		$("#combo-gen").click(function () {
			for (let i = 0; i <= 3; i++) {
				var datas = { typ: i };
				$.ajax({
					url: '../assets/db/dish-get-typ.php',
					type: 'post',
					dataType: 'json',
					data: datas,
					async: false,
					success: function (result_dish) {
						dish[i] = new Array();
						//存储数据dish
						for (let j = 0; j < result_dish.split(";").length - 1; j++) {
							dish[i][j] = result_dish.split(";")[j].split(",");//dish[餐食类][序号]=
						}
						total_dish_len += result_dish.split(";").length - 1;
					},
					error: function () {
						throwError("ERR_DGT_PHP");
					}
				})
			}
			$.ajax({
				url: '../assets/db/rule-get.php',
				type: 'post',
				dataType: 'json',
				async: false,
				success: function (result_rule) {
					//存储数据rule
					for (let i = 0; i < result_rule.split(";").length - 1; i++) {
						rk_rule[i] = new Array();
						sel_res[i] = new Array();
						rule[i] = result_rule.split(";")[i].split(",");//rule[编号]=id,indx0123
					}

					for (let i = 0; i < total_dish_len; i++) {
						rk[i] = new Array();
						for (let j = 0; j < result_rule.split(";").length - 1; j++) {
							rk_rule[j][i] = { id: -1, rank: -1, typ: -1 }
						}
						for (let j = 0; j <= 3; j++) {
							rk[i][j] = { id: -1, rank: -1, typ: -1 };
						}
					}
					//各个营养素 各种餐食 按值排序
					let cnt_tmp = 0;
					for (let j = 3; j <= 6; j++) {
						for (let k = 0; k <= 3; k++) {
							dish[k].sort(function (a, b) { return a[j] - b[j]; });
							for (let l = 0; l < dish[k].length; l++) {
								if (dish_id_in_rk[parseInt(dish[k][l][0]) - 1] == -1) dish_id_in_rk[parseInt(dish[k][l][0]) - 1] = cnt_tmp++;
								rk[dish_id_in_rk[parseInt(dish[k][l][0]) - 1]][j - 3].id = parseInt(dish[k][l][0]) - 1;
								rk[dish_id_in_rk[parseInt(dish[k][l][0]) - 1]][j - 3].rank = l;
								rk[dish_id_in_rk[parseInt(dish[k][l][0]) - 1]][j - 3].typ = parseInt(dish[k][l][2]);//rk[菜品编号][营养素]=排名，餐食类
							}
						}
					}

					//各规则 各菜品 排序
					for (let r = 0; r < rule.length; r++) {
						for (let k = 0; k < rk.length; k++) {
							for (let l = 1; l < rule[r].length; l++) {
								rk_rule[r][k].id = rk[k][l - 1].id;
								rk_rule[r][k].rank += rk[k][l - 1].rank * parseInt(rule[r][l]);//rk_rule[规则编号][序号]=id,排名,餐食类
								rk_rule[r][k].typ = rk[k][l - 1].typ;
							}
						}
						rk_rule[r].sort(function (a, b) { return a.rank - b.rank; });
						let rice0_cnt = 0, vege1_cnt = 0, meat2_cnt = 0, soup3_cnt = 0;
						let rice0 = [], vege1_0 = [], vege1_1 = [], meat2_0 = [], meat2_1 = [], soup3 = [];
						for (let k = 0; k < rk_rule[r].length; k++) {
							let rkrtyp = rk_rule[r][k].typ;
							let rkrid = rk_rule[r][k].id;
							if (rkrtyp == 0 && rice0_cnt < 1) {
								rice0.push(rkrid);
								rice0_cnt++;
							}
							if (rkrtyp == 1) {
								if (vege1_cnt < 2) vege1_0.push(rkrid);
								if (vege1_cnt > 1 && vege1_cnt < 4) vege1_1.push(rkrid);
								vege1_cnt++;
							}
							if (rkrtyp == 2) {
								if (meat2_cnt < 2) meat2_0.push(rkrid);
								if (meat2_cnt > 1 && meat2_cnt < 4) meat2_1.push(rkrid);
								meat2_cnt++;
							}
							if (rkrtyp == 3 && soup3_cnt < 1) {
								soup3.push(rkrid);
								soup3_cnt++;
							}
						}

						sel[0] = rice0, sel[1] = vege1_0, sel[2] = vege1_1, sel[3] = meat2_0, sel[4] = meat2_1, sel[5] = soup3;

						//前两种全排列
						function doCombination(arr) {
							var count = arr.length - 1;
							var tmp = [];
							var totalArr = [];
							return doCombinationCallback(arr, 0);
							function doCombinationCallback(arr, curr_index) {
								for (val of arr[curr_index]) {
									tmp[curr_index] = val;
									if (curr_index < count) {
										doCombinationCallback(arr, curr_index + 1);
									} else {
										totalArr.push(tmp);
									}
									oldTmp = tmp;
									tmp = [];
									for (index of oldTmp) {
										tmp.push(index);
									}
								}
								return totalArr;
							}
						}
						//调用方法
						sel_res[r] = doCombination(sel);
					}
				},
				error: function () {
					throwError("ERR_RG_PHP");
				}
			})
			$.ajax({
				url: '../assets/db/dish-get-onsel.php',
				type: 'post',
				dataType: 'json',
				async: false,
				success: function (result_dish_all) {
					//存储数据dish
					for (let i = 0; i < result_dish_all.split(";").length - 1; i++) {
						dish_all[i] = result_dish_all.split(";")[i].split(",");
					}


					for (let i = 0; i < dish_all.length; i++) {
						id_in_dish_all[parseInt(dish_all[i][0]) - 1] = i;
					}
					tmp = 0;
					for (let r = 0; r < rule.length; r++) {
						let rtm = ruleTitleModel;
						rtm = rtm.replace(/RULEID/g, (r + 1).toString());
						rtm = rtm.replace(/CNTID/g, "cnt-" + r.toString())
						rtm = rtm.replace(/CBCNT/g, sel_res[r].length);
						comboAll += rtm;
						for (let i = 0; i < sel_res[r].length; i++) {
							let cbm = comboModel;
							cbm = cbm.replace(/CKID/g, "ck-" + tmp.toString());
							cbm = cbm.replace(/ID/g, (i + 1).toString());
							cbm = cbm.replace(/MAIN/g, dish_all[id_in_dish_all[sel_res[r][i][0]]][1]);
							cbm = cbm.replace(/DISH1/g, dish_all[id_in_dish_all[sel_res[r][i][1]]][1]);
							cbm = cbm.replace(/DISH2/g, dish_all[id_in_dish_all[sel_res[r][i][2]]][1]);
							cbm = cbm.replace(/DISH3/g, dish_all[id_in_dish_all[sel_res[r][i][3]]][1]);
							cbm = cbm.replace(/DISH4/g, dish_all[id_in_dish_all[sel_res[r][i][4]]][1]);
							cbm = cbm.replace(/SOUP/g, dish_all[id_in_dish_all[sel_res[r][i][5]]][1]);
							comboAll += cbm;
							tmp++;
						}
						document.getElementById("sel-list").innerHTML = comboAll;
					}
					document.getElementById("combo-gen").parentElement.style.display = "none";
					document.getElementById("combo-submit").parentElement.style.display = "block";

					tmp = 0;
					for (let r = 0; r < rule.length; r++) {
						ckd_cnt[r] = sel_res[r].length;
						for (let i = 0; i < sel_res[r].length; i++) {
							sel_arr[tmp] = sel_res[r][i];
							sel_arr[tmp].unshift(r);
							checked[tmp] = true;
							tmp++;
						}
					}
				},
				error: function () {
					throwError("ERR_DGO_PHP");
				}
			})
			return false;
		})
		$("#combo-submit").click(function () {
			for (let i = 0; i < sel_arr.length; i++) {
				if (!checked[i]) continue;
				for (let j = 0; j < sel_arr[i].length - 1; j++) {
					sel_sub += sel_arr[i][j].toString() + ',';
				}
				sel_sub += sel_arr[i][sel_arr[i].length - 1].toString() + ';';
			}
			sel_sub = sel_sub.slice(0, -1);
			$.ajax({
				url: '../assets/db/sel-sub.php',
				type: 'post',
				data: { sel: sel_sub, wkid: getThisWk() + 1, all: 100 },
				dataType: 'json',
				async: false,
				success: function (result) {
					if (result !== "success") throwError("ERR_SLS_REP");
					else {
						updPhs("2.1");
					}
				},
				error: function () {
					throwError("ERR_SLS_REP");
				}
			})
			return false;
		})
	}
	else {
		let combo = new Array();
		let dishDisplay = new Array();
		let comboDisplayAll = "";
		function cbcnt(n) {
			let cnt = 0;
			for (let i = 0; i < combo.length; i++) {
				if (parseInt(combo[i][2]) === n) cnt++;
			}
			return cnt;
		}

		$.ajax({
			url: '../assets/db/dish-get-onsel.php',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function (result) {
				for (let i = 0; i < result.split(";").length - 1; i++) {
					dishDisplay[i] = result.split(";")[i].split(",");
				}
			},
			error: function () {
				throwError("ERR_DGO_PHP");
			}
		})
		$.ajax({
			url: '../assets/db/combo-get.php',
			type: 'post',
			data: { wkid: getThisWk() + 1 },
			dataType: 'json',
			success: function (result) {
				for (let i = 0; i < result.split(";").length - 1; i++) {
					combo[i] = result.split(";")[i].split(",");
				}
				combo.sort(function(a,b){return a[2]<b[2];});

				let id_in_dish_display = new Array();
				for (let i = 0; i < dishDisplay.length; i++) id_in_dish_display[parseInt(dishDisplay[i][0]) - 1] = i;
				for (let i = 0; i < combo.length; i++) {
					let ruleAdd = false;
					if (i > 0) {
						if (parseInt(combo[i][2]) !== parseInt(combo[i - 1][2])) ruleAdd = true;
					}
					else ruleAdd = true;

					if (ruleAdd) {
						let rtdm = ruleTitleDisplayModel;
						rtdm = rtdm.replace(/RULEID/g, combo[i][2]);
						rtdm = rtdm.replace(/CBCNT/g, cbcnt(parseInt(combo[i][2])));
						comboDisplayAll += rtdm;
					}
					let cbdm = comboDisplayModel;
					cbdm = cbdm.replace(/ID/g, combo[i][0]);
					cbdm = cbdm.replace(/MAIN/g, dishDisplay[id_in_dish_display[parseInt(combo[i][3])]][1]);
					cbdm = cbdm.replace(/DISH1/g, dishDisplay[id_in_dish_display[parseInt(combo[i][4])]][1]);
					cbdm = cbdm.replace(/DISH2/g, dishDisplay[id_in_dish_display[parseInt(combo[i][5])]][1]);
					cbdm = cbdm.replace(/DISH3/g, dishDisplay[id_in_dish_display[parseInt(combo[i][6])]][1]);
					cbdm = cbdm.replace(/DISH4/g, dishDisplay[id_in_dish_display[parseInt(combo[i][7])]][1]);
					cbdm = cbdm.replace(/SOUP/g, dishDisplay[id_in_dish_display[parseInt(combo[i][8])]][1]);
					comboDisplayAll += cbdm;
				}
				document.getElementById("sel-list").innerHTML = comboDisplayAll;
			},
			error: function () {
				throwError("ERR_CBG_PHP");
			}
		})
	}
})