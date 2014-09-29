/*
 * 提交搜索信息，包括筛选方式，关键字等
 */
function searchsubmit(curpage) {
	var ready	=	false;
	var errorMessage		=	"";
	var searchval	=	$("#searchtext").val();
	var searchkey	=	searchval==''?$('#hidecurKey').html():searchval;
	$('#hidecurKey').html(searchkey);
}

/*
 * 搜索方式一：重新查询，只与当前新的搜索状态有关；
 */
function newSearch() {
	resetSearchState();	//重置搜索状态
	clearEvents();	//清楚已经触发的事件
	setSearchState(getSearchInput('false'));   //获取用户输入信息，并将用户输入信息写入当前搜索状态
	updateSearch();		//调用更新搜索，更新搜索按照设置的搜索状态搜索
}

/*
 * 搜索方式二：更新查询，保持前一搜索状态搜索
 */
function updateSearch() {
	var object	=	getSearchState();
	var jsonstr	=	syncAjaxPost('servlet/SearchAllAjax',object);
	var jsonobj	=	JSON.parse(jsonstr);
	if(jsonobj!=null) {
		displaySearchData(jsonobj.rows);
		showPagination(jsonobj.total, $('#hidecurPage').html());	//开始分页,显示pagination	
	}
}

/*
 * 搜索方式三：用于接收normaluser页面传入的搜索参数，并将其作为新的搜索状态搜索
 */
function txSearch(stateArray) {
	resetSearchState();
	setSearchState(stateArray);
	updateSearch();
}

/*
 * 搜索方式四：高级搜索
 */
function superSearch() {
//	$("#header").empty().animate({height:'400px'},'10000');
//	暂未完成，调用initSearchPage.js中的initSwitchSearchArea（），初始化事件
}

/*
 * 显示分页条
 */
function showPagination(totalPage, curPage) {
	$("#Pagination").pagination(totalPage, {
				num_edge_entries : 1,
				num_display_entries : 4,
				callback : loadContents,
				items_per_page : 1,
				current_page : curPage - 1,
				link_to : "#"
	});
}

/*
 * 分页的回调函数，更新hidecurPage后，重新搜索
 */
function loadContents(page_index, jq) {
	$('#hidecurPage').html(page_index+1);
	updateSearch();
	return false;	//return false，禁止页面跳转
}