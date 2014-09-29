/*
 * 在每次显示搜索结果或错误提示信息前，清空searchcontent块
 */
function clearSearchContent() {
	$("#searchcontent").empty();
}

/*
 * 该函数用于在content部分，即搜索结果部分，输出错误或提示消息
 * 参数message为要显示的内容。
 */
function alertContentMessage(message) {
	var $message	=	$("<h2 id='noFound'></h2>");
	$message.text(message);
	$("#searchcontent").append($message);
	
	var css	=	{"position":"relative",
				 "width":"600px",
				 "height":"70px",
				 "margin-left":"240px",
				 "margin-top":"20px",
				 "border":"3px dash orange",
				 "z-index":"100"};
	$message.css(css);
}

/*
 * data:通过ajax获得的data,将data.rows传入这个函数作为data
 */
function displaySearchData(data) {
	clearSearchContent();
    if (data.length == 0) {
		alertContentMessage("很遗憾，我们未能为您查询出任何结果");
	}
	for (var i = 0; i < 10 && i < data.length; i++) {
		var str	=	'eachResult'+i.toString();
		var addr	=	"files/"+data[i].path.substring(15, data[i].path.length);
		
		$("<div id='"+str+"' class='eachResult'><a target='_blank' href='"+addr+"'></a></div>").appendTo($("#searchcontent"));
		if(data[i].filename != null) {
			$("<div class='eachfilename'></div>").html(data[i].filename).appendTo($('#'+str));
		}
		if(data[i].digest != null) {
			$("<div class='eachfileDigest'></div>").html(data[i].digest).appendTo($('#'+str));
		}
		if(data[i].date != null) {
			$("<div class='eachtime'></div>").html(data[i].date).appendTo($('#'+str));
		}
		
		
		//$("<div class='eachfilepath'></div>").html(data[i].path).appendTo($('#'+str));
		
	}
}

/*
 * 重置隐藏于searchpage.jsp中的存储搜索状态的标签；
 */
function resetSearchState() {
	$('.searchState').each(function() {
		if($(this).hasClass('searchStateBoolean')) {
			$(this).html('false');
		} else if($(this).hasClass('searchStateNumber')) {
			$(this).html('1');
		} else if($(this).hasClass('selSuspStr')) {
			//do nothing
		} else if($(this).hasClass('searchStateRemain')) {
			//do nothing
		} else {
			$(this).html('');
		}
	});
}

/*
 * 设置更新搜索状态，如果某项不需要更新，那么传入null即可
 * 注意：这里对顺序有要求，否则就无法正确更新；
 */
function setSearchState(stateArray) {
	var tmp	=	null;
	for(var i=0 ;i<stateArray.length; i++) {
		tmp	=	stateArray[i];
		if(tmp!=null) {
			$('.searchState:eq('+i+')').html(tmp);
		}
	}
}

/*
 * 获取当前搜索状态，返回结果数组
 * 注意：这个是获取页面中的隐藏信息，区别getSearchInput()函数
 */
function getSearchState() {
	var curpage	=	$("#hidecurPage").html();
	var object	=	{	Action:"POST",
						searchKey:$("#hidecurKey").html(),
						timesort:$("#hidetimeSort").html(),
						relationsort:"false",
						startTime:$("#hidestartTime").html(),
						endTime:$("#hideendTime").html(),
						docType:$("#hidedocType").html(),
						selSuspStr:$("#hidesupersearchSuspect").html(),
						curpage:curpage};
	return object;
}

/*
 * 获取用户输入信息，高级搜索时包括搜索关键字，排序方式，筛选时间段，文件格式等
 * 如果是普通搜索，则只包括关键字；
 * superbool:true表示高级搜索，否则表示普通搜索
 */
function getSearchInput(superbool) {
	var inputArray	=	new Array();
	if(superbool=='true') {
		$('.').each(function() {         		//未完成 .是所有高级搜索用户输入的class
			inputArray.push($(this).html());
		});
	} else {
		var newKey	=	$('#searchtext').val();
		if($("#hideTwiceSearchSelection").html()=="true") {
			newKey	=	$("#hidecurKey").html(); 
		}
		inputArray.push(null,newKey);
	}
	return inputArray;
}

/*
 * 清楚已经触发的事件，如：搜索前，已经点击事件搜索，
 * 此时，去除时间搜索的边框
 */
function clearEvents() {
	var borderwidth	=	'0px';
	$("#timesort").animate({borderWidth:borderwidth});
	$("#relationsort").animate({borderWidth:borderwidth});
}
