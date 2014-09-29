/*
 * 设置隐藏页面的信息。用于持久化
 */
function setHiddenState($obj, content) {
	$obj.html(content);
}

/*
 * 获取隐藏页面的信息。
 */
function getHiddenState($obj) {
//	alert($obj.html());
	return $obj.html();
}

/*
 * 清空右边区域，用于重组页面。
 */
function clearRightZone() {
	$("#right").empty();
}