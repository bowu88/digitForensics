/*
 * 该函数用于解决多选时，跨页的问题，即多选位于不同页的多个记录。
 * 存储格式如下：[[页数,[该页选择项id..]],[页数,[该页选择项id....]]];
 */
function saveSelState() {
	//存放当页选择的记录id.
	var recordArray	=	[];
	
	
}

/*
 * 该函数用户重新选择该页时，回复当初的选择状态。
 * 遍历saveSelState，每次显示后，动态选择列
 */
function recurSelState(pageno) {

}