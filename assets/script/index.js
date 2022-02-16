$(function () {
	let permArray = [6, 6, 3, 2, 1, 2];
	for (let i = 0; i < permArray.length; i++) {
		if (getInfo("usr_typ") >= permArray[i]) $("#tab" + i.toString()).hide();
	}
	if(parseInt(getInfo("usr_typ")) <= 3) gAlert("服务器没备份，不要瞎搞");
})