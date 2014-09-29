/*
 * 对象管理--信息查看
 * 查看对象信息
 */
function showSuspectGrid() {
	alert("yes");
	showMiddleArea();
	switchMiddleGridData("对象信息");
	var tipsArray	=	new Array();
	tipsArray.push("点击表格下的确认键，以选择某一对象");
	tipsArray.push("可以多选");
	windowTimeIntevalFunc(tipsArray);
	
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
  	var gridheight	=	getGridHeight();
  	var colNames	=	['No','hideID','嫌疑人姓名','嫌疑人身份号','备注'];
  	var colModel	=	[{name : 'id',index : 'id',width : 50,editable : false, resizable:false, align:'center',search:false},
  						 {name : 'suspectId',index : 'suspectId',width : 280,hidden:true,editable : false},
  						 {name : 'suspectname',index : 'suspectname',width : 280,editable : false, align:'center'},
				         {name : 'idno',index : 'idno',width : 280,editable : false, align:'center'},
				         {name:'notes',index:'notes',width:500,editable:false,edittype: "textarea"}];
    var selAllSusp	=	function() {
    	var state	=	$("#hideSelAllSuspect").html();
    	if(state == "true") {
    		$("#hideSelAllSuspect").html("false");
    	} else {
    		$("#hideSelAllSuspect").html("true");
    		$("#hideSelectedSuspect").html("checkall");
    	}
    	$("#navgrid").trigger("reloadGrid");
    	createBetterTip($("#middlesuspect"), "全部");
    };
    
    var removeFromSelState	=	function(id) {
    		var str	=	"("+id+",)|("+id+"$)";
			var regexp	=	new RegExp(str);
			var state	=	$("#hideSelectedSuspect").html();
			var newstate	=	state.replace(regexp, "");
			newstate	=	newstate.replace(/,$/,"");
			$("#hideSelectedSuspect").html(newstate);
			if($("#hideSelectedSuspect").html()=="") {
				$("#hideSelectedSuspect").html("checkall");
			}
    };
    
    var removeSuspNameFromSelState	=	function(name) {
    	var uniname	=	escape(name);
    	var str	=	uniname+",|"+uniname+"$";
    	var regexp	=	new RegExp(str);
    	var state	=	$("#hideSelectedSuspectName").html();
    	var newstate	=	state.replace(regexp, "");
    	newstate	=	newstate.replace(/,$/,"");
    	$("#hideSelectedSuspectName").html(newstate);
    	if($("#hideSelectedSuspectName").html()=="") {
				$("#hideSelectedSuspectName").html("全部");
			}
    };
    
    var addToSelState	=	function(id) {
    	var newstate	=	$("#hideSelectedSuspect").html()+","+id;
		$("#hideSelectedSuspect").html(newstate);
    };
    
    var addNameToSelState	=	function(name) {
 		var state	=	$("#hideSelectedSuspectName").html();
    	var newstate	=	state+(state===""?"":",")+escape(name);
    	$("#hideSelectedSuspectName").html(newstate);
    	
    };
				         
	var isInSelState	=	function(id) {
		var array	=	$("#hideSelectedSuspect").html().split(",");
		for(var i=0; i<array.length; i++) {
			if(array[i] === id) {
				return true;
			}
		}
		return false;
	};
	
	var isInSelNameState	=	function(name) {
		var array	=	$("#hideSelectedSuspectName").html().split(",");
		for(var i=0; i<array.length; i++) {
			if(array[i] === escape(name)) {
				return true;
			}
		}
		return false;
	};
    
	var onSelectRow	=	function(rowid, status) {
		var state	=	$("#hideSelectedSuspect").html();
		var row	=	$("#navgrid").getRowData(rowid);
		var newstate	=	"";
		if(status == false) {
			if(state !== "checkall") {
				var id	=	row.suspect_ID;
				removeFromSelState(id);
			}	
			if($("#hideSelectedSuspectName").html() !== "") {
				removeSuspNameFromSelState(row.name);
			}
			var tmparray	=	$("#hideSelectedSuspectName").html().split(",");
			if(tmparray.length==1&&tmparray[0]!='全部') {
				var id	=	$("#navgrid").getGridParam("selrow");
				switchMiddleSuspectData($("#navgrid").getRowData(id).name);
			}
			if(tmparray.length==1&&tmparray[0]=='全部') {
				switchMiddleSuspectData("全部");
			}
		} else {
			if(state == "checkall") {
				$("#hideSelectedSuspect").html(row.suspect_ID);
				$("#hideSelectedSuspectName").html(escape(row.name));
			} else {
				var id	=	row.suspect_ID;
				addToSelState(id);
				addNameToSelState(row.name);
			}
			if($("#hideSelectedSuspectName").html().split(",").length>1) {
				switchMiddleSuspectData("多个");
			} else {
				switchMiddleSuspectData(row.name);
			}
		}
		createBetterTip($("#middlesuspect"), unescape($("#hideSelectedSuspectName").html()));
	};
	
	var onSelectAll	=	function(aRowids, status) {
		if(status == false) {
			//remove
			var array	=	$("#navgrid").getRowData();
			for(var i=0; i<array.length; i++) {
				if(isInSelState(array[i].suspect_ID)) {
					removeFromSelState(array[i].suspect_ID);
				}		
				if(isInSelNameState(array[i].name)) {
					removeSuspNameFromSelState(array[i].name);
				}
			}
		} else {
			//add
			var selrow	=	jQuery("#navgrid").jqGrid('getGridParam','selarrrow');
			for(var i=0; i<selrow.length; i++) {
   				var $selObj	=	jQuery("#navgrid").getRowData(selrow[i]);
   				if(!isInSelState($selObj.suspect_ID)) {
   					addToSelState($selObj.suspect_ID);
   					addNameToSelState($selObj.name);
   				}
   			}
		}
		createBetterTip($("#middlesuspect"), unescape($("#hideSelectedSuspectName").html()));
	};
	
	var loadComplete	=	function() {
		var array	=	$("#navgrid").getRowData();
		var isInSelection	=	function(id) {
		var hiddenstate		=	$("#hideSelectedSuspect").html();
			if(hiddenstate == "checkall") {
				if($("#hideSelAllSuspect").html() === "true") {
					return true;
				} else {
					return false;
				}
			} else {
				var suspArray	=	hiddenstate.split(",");
				for(var i=0; i<suspArray.length; i++) {
					if(suspArray[i] == id) {
						return true;
					}
				}
				return false;
			}
		}
		
		for(var i=0; i<array.length; i++) {
			var row	=	array[i];
			if(isInSelection(row.suspect_ID)) {
				$("#navgrid").setSelection(row.id, false);
			}
		}
	};
	
  	assembleGrid($("#navgrid"),'core/MySuspectInfo', 'POST', {page:'1'}, '#pagernav','对象信息', '', $("#right").width(), gridheight, colNames, colModel, false, true, onSelectRow, loadComplete, onSelectAll)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},getSearchOptions())
  	.navButtonAdd("#pagernav",{caption:"全选/重置",buttonicon:"ui-icon-newwin",onClickButton:selAllSusp});
}

/*
 * 以下为敏感信息部分
 */


/*
 * 生成普通数据检索界面。
 */
function datasearch() {
	hideMiddleArea();
	clearRightZone();
	var $right	=	$("#right");
	$("<div id='title'>ContentSearch</div>").appendTo($right);
	$("<div id='wholearea'></div>").appendTo($right);
	
	var $wholearea	=	$("#wholearea");
	$("<div id='searchTop'></div>").appendTo($wholearea);
	$("<div id='searchTopMiddle'></div>").appendTo($("#searchTop"));
	$("<input id='searchtext'/>").appendTo($("#searchTopMiddle"));
	$("<input id='searchbutton' type='button' value='查询'/>").appendTo($("#searchTopMiddle"));
	
	$("<fieldset><legend>选  项</legend><div id='sortWay'>排序方式: </div><div id='fileType'>文件格式: </div><div id='date'>时间段筛选：</div></fieldset").appendTo($(wholearea));
	$("<label for='timeSortRadio'>时间排序</label><input class='sortOnly' type='checkbox' id='timeSortRadio' value='timesort'/>").appendTo($("#sortWay"));
	$("<label for='relateSortRadio'>相关度排序</label><input class='sortOnly' type='checkbox' id='relateSortRadio' value='relatesort'/>").appendTo($("#sortWay"));
	//$("#sortWay input").button();
	
	$("<input type='checkbox' id='filetype1' value='.TXT'/><label for='filetype1'>.Txt</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype2' value='.PDF'/><label for='filetype2'>.Pdf</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype3' value='.DOC'/><label for='filetype3'>.Doc</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype4' value='.DOCX'/><label for='filetype4'>.Docx</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype5' value='.WPS'/><label for='filetype5'>.Wps</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype1' value='.XLS'/><label for='filetype1'>.Xls</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype2' value='.XLSX'/><label for='filetype2'>.Xlsx</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype3' value='.PPT'/><label for='filetype3'>.Ppt</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype4' value='.PPTX'/><label for='filetype4'>.Pptx</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype5' value='.HTM'/><label for='filetype5'>.Htm</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype1' value='.HTML'/><label for='filetype1'>.Html</label>").appendTo($("#fileType"));
	$("<input type='checkbox' id='filetype2' value='.XML'/><label for='filetype2'>.Xml</label>").appendTo($("#fileType"));
	
	$("<label for='dateStart'>起始时间</label><input type='text' id='dateStart'/>").appendTo($("#date"));
	$("<label for='dateEnd'>结束时间</label><input type='text' id='dateEnd'/>").appendTo($("#date"));
	$("#date input").datepicker({dateFormat:"yy-mm-dd"});
	
	$("<hr/>").appendTo($("#wholearea fieldset"));
	
	$("<input type='button' name='reset' id='resetbutton' value='重置'/>").appendTo($("#wholearea fieldset"));
	$("#resetbutton").button();
	
	$(".sortOnly").click(function() {
		if($(this).attr("id") === 'timeSortRadio') {
			document.getElementById("timeSortRadio").checked	=	true;
			document.getElementById("relateSortRadio").checked	=	false;
			$("#hidetimeSort").html("true");
		} else {
			document.getElementById("timeSortRadio").checked	=	false;
			document.getElementById("relateSortRadio").checked	=	true;
			$("#hidetimeSort").html("false");
		}
	});
	
	$("#resetbutton").click(function() {
		var checkArray	=	document.getElementsByTagName("fieldset")[0].getElementsByTagName("input");
		for(var k in checkArray) {
			if(checkArray[k].checked === true) {
				checkArray[k].checked	=	false;
			}
		}
		$("#dateStart, #dateEnd").val("");
	}); 
	
	$("#searchbutton").click(function() {
		if($("#searchtext").val() === "") {
			alertMessage("请先输入关键字");
			return false;
		} else {
			searchsubmit();
		}
 	});	
}

function dataReposearch () {
	hideMiddleArea();
	clearRightZone();
	var $right	=	$("#right");
	$("<div id='repopicker'></div>").appendTo($right);
	
	var $repopicker	=	$("#repopicker");
	$("<div id='searchTop'></div>").appendTo($repopicker);
	$("<div id='searchTopMiddle'></div>").appendTo($("#searchTop"));
	$("<input id='searchtext'/>").appendTo($("#searchTopMiddle"));
	$("<input id='searchbutton' type='button' value='查询'/>").appendTo($("#searchTopMiddle"));
	
	$("<div id='repoLabel'>码址库: </div>").appendTo($repopicker);
	
	$("<label for='repo1'>Fetion</label><input type='checkbox' id='repo1' value='1'/>").appendTo($("#repoLabel"));
	$("<label for='repo2'>QQ</label><input type='checkbox' id='repo2' value='4'/>").appendTo($("#repoLabel"));
	$("<label for='repo3'>MSN</label><input type='checkbox' id='repo3' value='3'/>").appendTo($("#repoLabel"));
	$("<label for='repo4'>Skype</label><input type='checkbox' id='repo4' value='2'/>").appendTo($("#repoLabel"));
	
	$("<div id='searchRepo'></div>").appendTo($right);
	var timer	=	setInterval(testAnimate, 100);
	function testAnimate() {
		if(!$("#main").is(":animated")) {
			clearInterval(timer);
			searchRepoSubmit("~","1");
		}
	}
	
	$("#searchbutton").click(function() {
		if($("#searchtext").val() === "") {
			alertMessage("请先输入关键字");
			return false;
		} else {
			var checkedarray	=	$("input:checked");
			var str	=	"";
			for(var i=0; i<checkedarray.length; i++) {
				str +=	$(checkedarray[i]).val()+(i===(checkedarray.length-1)?"":",");
			}
			if(checkedarray.length===0) {
				str	=	"1,2,3,4";
			}
			searchRepoSubmit($("#searchtext").val(), str);
		}
 	});	
}

function searchRepoSubmit(searchKey, repoArrayStr) {
	$("#searchRepo").empty();
	$("#searchRepo").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	

	gridheight = $("#searchRepo").height() - 30 + "px";
	//alert(gridheight);
	
	/*搜索结果，是搜索im_account与im_name两个字段的结果，用like，*/
  	var colNames	=	['hidesuspectname','hidelinkaccount','hideid','No','帐号','昵称','所属对象','帐号类型','解析时间'];
  	var colModel	=	[{name : 'hidesuspectname',index : 'hidesuspectname',hidden:true},
  						 {name : 'hidelinkaccount',index : 'hidelinkaccount',hidden:true},
  						 {name : 'hideid',index : 'hideid',hidden:true},
  						 {name : 'id',index : 'id',width:50,height:90},
  						 {name : 'repoaccount',index : 'repoaccount',width:250},
  						 {name : 'reponickname',index : 'reponickname',width:250},
  						 {name : 'suspectname',index : 'suspectname',width:170},
  						 {name : 'im_type',index : 'im_type',width:150},
  						 {name : 'parsedate',index : 'parsedate',width:200}];
	assembleGrid($("#navgrid"),'servlet/DispRepoIM', 'POST', {page:'1',searchKey:searchKey, repoArrayStr: repoArrayStr}, '#pagernav','', '', $("#right").width(), gridheight, colNames, colModel, false, false)
	.navGrid('#pagernav',{edit:false,add:false,del:false,search:false,refresh:true},{},{},{},{});
	$("#hideIsFirstShowRepoSearch").html("false");
}

function compare_time(a,b) {
   var arr=a.split("-");
   var starttime=new Date(arr[0],arr[1],arr[2]);
   var starttimes=starttime.getTime(); 
   var arrs=b.split("-"); 
   var endtime=new Date(arrs[0],arrs[1],arrs[2]);
   var endtimes=endtime.getTime();
   if(starttimes>endtimes)//开始大于结束
   {
     	return false;
   } 
   else{ 
    	return true; 
   }
}

function searchsubmit() {
	var ready	=	false;
	var errorMessage		=	"";

	var searchkey	=	null;
	
	searchkey	=	document.getElementById("searchtext").value; /*注意这里如果继续getAttribute("value")，则只有IE能正常，其余浏览器都是null*/
	
	var timesort	=	document.getElementById("hidetimeSort").innerHTML;
	var relationsort	=	document.getElementById("hiderelationSort").innerHTML;
	
	var startTime	=	document.getElementById("dateStart").value;
	var endTime	=	document.getElementById("dateEnd").value;

	if(startTime!=""&&endTime!="") {
		if(compare_time(startTime,endTime)==false) {
			errorMessage	+=	"起始时间不能大于结束时间，请重新输入";
		}
	}
	
	if(errorMessage!="") {
		var errorDialog	=	document.createElement("div");
		errorDialog.id	=	"errorDialog";
		errorDialog.title	=	"错误信息";
		var errordiv	=	document.createElement("div");
		errordiv.innerHTML	=	errorMessage;
		var father	=	document.getElementById("right");
		errorDialog.appendChild(errordiv);
		father.appendChild(errorDialog);
		$("#errorDialog").dialog({width:380,height:200,show:'slide'});
		return false;
	} 
	
	var typearray	=	new Array();
	var $checkarray	=	$("#fileType>input");
	var $checkradio	=	null;
	var name	=	null;
	$checkarray.each(function() {
		if($(this).attr("checked")) {
			typearray.push($(this).next("label").text());
		} 
	});
	var typearraystr	=	typearray.toString();
	var selSuspStr	=	$("#hideSelectedSuspect").html();
	$("<form id='tmpform' name='tmpform' action='servlet/SearchAllTrans' method='POST' target='_blank'></form>").appendTo($("#right"));
	$("<input type='hidden' name='searchKey' value='"+searchkey+"' />").appendTo($("#tmpform"));
	$("<input type='hidden' name='docType' value='"+typearraystr+"' />").appendTo($("#tmpform"));
	$("<input type='hidden' name='startTime' value='"+startTime+"' />").appendTo($("#tmpform"));
	$("<input type='hidden' name='endTime' value='"+endTime+"' />").appendTo($("#tmpform"));
	$("<input type='hidden' name='timesort' value='"+timesort+"' />").appendTo($("#tmpform"));
	$("<input type='hidden' name='selSuspStr' value='"+selSuspStr+"' />").appendTo($("#tmpform"));
	
	document.tmpform.submit();
	document.getElementById("tmpform").innerHTML	=	"";
	$("#tmpform").remove();
}

/*
 * 邮件信息查看。
 */
function mails() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['下载', 'hidediskid','hideid','No.','来源账户','邮件主题','发送人地址','收件人地址','抄送人地址','时间', '文件路径','关联磁盘序列号','所属对象','来源方式','附件名称','来源客户端'];
  	var colModel	=	[{name : 'downloadAddr', index:'downloadAddr', width:40, editable:false, search:false},
  						 {name : 'diskid',index : 'diskid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'mailid',index : 'mailid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:20,height:90,editable : false, search:false},
  						 {name : 'accountname',index : 'accountname',width:70,height:90,editable : false},
  						 {name : 'mailtheme',index : 'mailtheme',height:90,editable : false},
  						 {name:'senderaddr',index:'senderaddr',height:90,editable:false},
  						 {name : 'receiveraddr',index : 'receiveraddr',height:90,editable : false},
  						 {name : 'otheraddr',index : 'otheraddr',height:90,editable : false},
  						 {name : 'time',index : 'time',height:90,editable : false},
  						 {name : 'filepath',index : 'filepath',height:90,editable : false},
  						 {name : 'diskserialno',index : 'diskserialno',height:90,editable : false, search:false},
  						 {name : 'suspectname', index: 'suspectname', editable:false},
  						 {name : 'srctype', index:'srctype', editable:false},
  						 {name : 'attachment',index : 'attachment',height:90,editable : false},
  						 {name : 'sourceclient',index : 'sourceclient',height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/Mailinfo', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','邮件信息', '', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},getSearchOptions())
  	.navButtonAdd("#pagernav",{caption:'导出邮件信息',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("MailRecord",{suspectid:"checkall"});
  	}});
}

/*
 * 邮件信息
 */
function mailAccount() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hidediskid','hideid','No.','邮箱帐号','邮箱密码','来源类型','关联磁盘序列号','来源文件路径','客户端类型'];
  	var colModel	=	[{name : 'diskid',index : 'diskid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'accountid',index : 'accountid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:50,height:90,editable : false, search:false},
  						 {name : 'mailaccount',index : 'mailaccount',width:130,editable : false},
  						 {name:'password',index:'password',width:120,editable:false},
  						 {name : 'sourcetype',index : 'sourcetype',width:180,editable : false},
  						 {name : 'relatedisk',index : 'relatedisk',width:140,editable : false, search:false},
  						 {name : 'sourcefile',index : 'sourcefile',width:280,editable : false},
  						 {name : 'clienttype',index : 'clienttype',width:180,editable : false}];
	assembleGrid($("#navgrid"),'servlet/MailAccountInfo', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','邮箱帐号信息', '', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},getSearchOptions())
  	.navButtonAdd("#pagernav",{caption:'导出邮箱帐号',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("MailAccountRecord",{suspectid:"checkall"});
  	}});	
}

/*
 * 即时通信工具
 */
function imclient() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideimid','No.','帐号','密码','关联磁盘id','关联磁盘序列号','帐号类型','来源类型'];
  	var colModel	=	[{name : 'imid',index : 'imid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:30,height:90,editable : false, search:false},
  						 {name : 'account',index : 'account',width:240,height:90,editable : true},
  						 {name:'password',index:'password',width:240,height:90,editable:false},
  						 {name : 'relatedisk',index : 'relatedisk',width:400,height:90,hidden:true,editable : false, search:false},
  						 {name : 'relatediskserialno',index : 'relatediskserialno',width:400,height:90,editable : false, search:false},
  						 {name : 'accounttype',index : 'accounttype',width:180,height:90,editable : false},
  						 {name : 'srctype',index : 'srctype',width:180,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/IMinfo', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','即时通信工具信息', '', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"查看聊天记录",buttonicon:"ui-icon-newwin",onClickButton:checkChatRecord})
  	.navButtonAdd("#pagernav",{caption:"查看好友列表",buttonicon:"ui-icon-newwin",onClickButton:checkFriendList})
  	.navButtonAdd("#pagernav",{caption:'导出通信工具信息',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("IMRecord",{suspectid:"checkall"});
  	}});	
}

function checkFriendList() {
	var selrow	=	$("#navgrid").getGridParam("selrow");  
   	if(selrow==null) {
   		alertMessage("请先选择一个帐号！");
   		return false;
   	}
   	var rowdata = jQuery("#navgrid").getRowData(selrow);
   	var imid	=	rowdata.imid;
   	var account	=	rowdata.account;
	
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideaccountlistid','No.','好友帐号','帐号类型','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'hideaccountlistid',index : 'hideaccountlistid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,editable : false, search:false},
  						 {name : 'friendaccount',index : 'friendaccount',width:140,editable : false},
  						 {name : 'accounttype',index : 'accounttype',width:140,editable : false},
  						 {name : 'suspectname',index : 'suspectname',width:340,editable : false},
  						 {name : 'srctype',index : 'srctype',width:120,editable : false},
  						 {name : 'datasrc',index : 'datasrc',width:100,editable : false},
  						 {name : 'inputtime',index : 'inputtime',width:200,editable : false}];
	assembleGrid($("#navgrid"),'servlet/RealFriendList', 'POST', {page:'1',accountid:imid}, '#pagernav',account+'的好友列表', '', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: true,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {imclient();}});
}


/*
 * 查看聊天记录
 */
function checkChatRecord() {
	var selrow	=	$("#navgrid").getGridParam("selrow");  
   	if(selrow==null) {
   		alertMessage("请先选择一个帐号！");
   		return false;
   	}
   	var rowdata = jQuery("#navgrid").getRowData(selrow);
   	var imid	=	rowdata.imid;
   	var account	=	rowdata.account;
	
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideimid','hidechatid','No.','发信人帐号','收信人帐号','聊天内容','聊天时间','来源类型','来源路径'];
  	var colModel	=	[{name : 'imid',index : 'imid',hidden:true,editable : false, search:false},
  						 {name : 'chatid',index : 'chatid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'senderaccount',index : 'senderaccount',width:140,height:90,editable : false},
  						 {name : 'receiveraccount',index : 'receiveraccount',width:140,height:90,editable : false},
  						 {name : 'chatmessage',index : 'chatmessage',width:340,height:90,editable : false},
  						 {name : 'chattime',index : 'chattime',width:120,height:90,editable : false},
  						 {name : 'sourcetype',index : 'sourcetype',width:100,height:90,editable : false},
  						 {name : 'sourcepath',index : 'sourcepath',width:200,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/FriendList', 'POST', {page:'1',accountid:imid}, '#pagernav',account+'的聊天记录', '', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: true,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {imclient();}})
  	.navButtonAdd("#pagernav",{caption:'导出聊天记录',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("FriendListRecord",{itemId:imid});
  	}});
}

/*
 * 浏览器信息
 */
function browserInfo() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','浏览器名称','查看种类','来源类型','来源路径','关联磁盘','关联磁盘序列号'];
  	var colModel	=	[{name : 'checktypeid',index : 'checktypeid',hidden:true,editable : false, search:false},
  					  	 {name : 'id',index : 'id',width:30,height:90,editable : false, search:false},
  					  	 {name : 'browserName',index : 'browserName',width:200,height:90,editable : false},
  					  	 {name:'checkType',index:'checkType',width:200,height:90,editable:false},
  					  	 {name : 'srcType',index : 'srcType',width:100,height:90,editable : false},
  					  	 {name : 'srcPath',index : 'srcPath',width:300,height:90,editable : false},
  					  	 {name : 'relateDisk',index : 'relateDisk',width:240,height:90,hidden:true,editable : false, search:false},
  					  	 {name : 'relateDiskserialno',index : 'relateDiskserialno',width:240,height:90,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/Browserinfo', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','浏览器信息', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"查看选择信息",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:checkBrowserRelInfo});
}

/*
 * 查看浏览器相应信息
 */
function checkBrowserRelInfo() {
	var selrow	=	$("#navgrid").getGridParam("selrow");  
   	if(selrow==null) {
   		alertMessage("请先选择查看种类！");
   		return false;
   	}
   	var rowdata = jQuery("#navgrid").getRowData(selrow);
   	var checktypeid	=	rowdata.checktypeid;
   	var checkType	=	rowdata.checkType;
   
	var relFunc	=	createBrowserRelTable(checkType);
	relFunc(checktypeid);
}

/*
 * 选择查看浏览器的哪种信息
 */
function createBrowserRelTable(checkType) {
	var relFunc	=	null;
	switch(checkType) {
		case "历史记录": relFunc	=	browserHistory;break;
		case "书签": relFunc	=	browserBookmark;break;
		case "下载管理": relFunc	=	browserDownload;break;
		case "搜索关键字": relFunc	=	browserSearchKey;break;
		case "表单信息":relFunc	=	browserForm;break;
		case "帐号密码":relFunc	=	browserAccount;break;
		default: break;
	}
	return relFunc;
}

function browserHistory(checktypeid) {
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','访问网址URL','标题Title','访问时间','关联ID'];
  	var colModel	=	[{name : 'hideid',index : 'hideid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'url',index : 'url',width:350,height:90,editable : false},
  						 {name : 'title',index : 'title',width:480,height:90,editable : false},
  						 {name : 'time',index : 'time',width:230,height:90,editable : false},
  						 {name : 'relateBrowser',index : 'relateBrowser',width:230,height:90,hidden:true,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/Browserhistoryinfo', 'GET', {page:'1',browserid:checktypeid}, '#pagernav','浏览器历史记录', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:browserInfo})
  	.navButtonAdd("#pagernav",{caption:'导出历史记录',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("BrowserhistoryRecord",{itemId:checktypeid});
  	}});
}

function browserBookmark(checktypeid) {
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','网址URL','标题Title','关联磁盘ID'];
  	var colModel	=	[{name : 'hideid',index : 'hideid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'url',index : 'url',width:400,height:90,editable : false},
  						 {name : 'title',index : 'title',width:300,height:90,editable : false},
  						 {name : 'relateBrowser',index : 'relateBrowser',width:260,height:90,hidden:true,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/Browserbookmarksinfo', 'GET', {page:'1',browserid:checktypeid}, '#pagernav','浏览器书签', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:browserInfo})
  	.navButtonAdd("#pagernav",{caption:'导出书签',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("BrowserbookmarksRecord",{itemId:checktypeid});
  	}});
}

function browserDownload(checktypeid) {
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','存放位置','源地址','时间','文件大小','关联ID'];
  	var colModel	=	[{name : 'hideid',index : 'hideid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'saveplace',index : 'saveplace',width:400,height:90,editable : false},
  						 {name : 'url',index : 'url',width:400,height:90,editable : false},
  						 {name : 'time',index : 'time',width:300,height:90,editable : false},
  						 {name : 'size',index : 'size',width:300,height:90,editable : false},
  						 {name : 'relateBrowser',index : 'relateBrowser',width:260,height:90,hidden:true,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/BrowserDownloadinfo', 'GET', {page:'1',browserid:checktypeid}, '#pagernav','下载内容', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:true, multipleGroup:false,showQuery: true,sopt:['eq','ne'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:browserInfo})
  	.navButtonAdd("#pagernav",{caption:'导出下载内容',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("BrowserdownloadRecord",{itemId:checktypeid});
  	}});	
}

function browserSearchKey(checktypeid) {
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','搜索关键字','搜索网站','关联ID'];
  	var colModel	=	[{name : 'hideid',index : 'hideid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'keyword',index : 'keyword',width:400,height:90,editable : false},
  						 {name : 'url',index : 'url',width:600,height:90,editable : false},
  						 {name : 'relateBrowser',index : 'relateBrowser',width:260,height:90,hidden:true,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/Browserkeyword', 'GET', {page:'1',browserid:checktypeid}, '#pagernav','搜索关键字', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:browserInfo})
  	.navButtonAdd("#pagernav",{caption:'导出搜索关键字',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("BrowserkeywordRecord",{itemId:checktypeid});
  	}});	
}

function browserForm(checktypeid) {
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','表单名','表单值','使用次数','使用时间','关联ID'];
  	var colModel	=	[{name : 'hideid',index : 'hideid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'formname',index : 'formname',width:400,height:90,editable : false},
  						 {name : 'formvalue',index : 'formvalue',width:400,height:90,editable : false},
  						 {name : 'accessaccount',index : 'accessaccount',width:260,height:90,editable : false},
  						 {name : 'time',index : 'time',width:260,height:90,editable : false},
  						 {name : 'relateBrowser',index : 'relateBrowser',width:260,height:90,hidden:true,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/Browserforminfo', 'GET', {page:'1',browserid:checktypeid}, '#pagernav','表单信息', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:browserInfo})
  	.navButtonAdd("#pagernav",{caption:'导出浏览器表单',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("BrowserformRecord",{itemId:checktypeid});
  	}});	
}

function browserAccount(checktypeid) {
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideid','No.','网站URL','用户名','密码','关联ID'];
  	var colModel	=	[{name : 'hideid',index : 'hideid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:35,height:90,editable : false, search:false},
  						 {name : 'url',index : 'url',width:400,height:90,editable : false},
  						 {name : 'name',index : 'name',width:400,height:90,editable : false},
  						 {name : 'password',index : 'password',width:260,height:90,editable : false},
  						 {name : 'relateBrowser',index : 'relateBrowser',width:260,height:90,hidden:true,editable : false, search:false}];
	assembleGrid($("#navgrid"),'servlet/BrowserAccountinfo', 'GET', {page:'1',browserid:checktypeid}, '#pagernav','帐号密码', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:browserInfo})
  	.navButtonAdd("#pagernav",{caption:'导出浏览器帐号',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("BrowserAccountRecord",{itemId:checktypeid});
  	}});
}

/*
 * 系统信息
 */
function sysInfo() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
	var colNames	=	['hidediskid','No.','磁盘序列号','所属对象','磁盘大小','镜像状态','录入人员','录入时间','案件代号','时间','地点','来源','单位','备注'];
  	var colModel	=	[{name : 'diskid',index : 'diskid',hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:20,height:90,editable : false, search:false},
  						 {name : 'diskcode',index : 'diskcode',height:90,editable : false, search:false},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : false},
  						 {name : 'diskcapacity',index : 'diskcapacity',height:90,editable : false},
  						 {name : 'imagestate',index : 'imagestate',height:90,editable : false, search:false},
  						 {name : 'instaff',index : 'instaff',height:90,editable : false},
  						 {name : 'intime',index : 'intime',height:90,editable : false},
  						 {name : 'casecode',index : 'casecode',height:90,editable : false},
  						 {name:'time',index:'time',height:90,editable:false},
  						 {name : 'place',index : 'place',height:90,editable : false},
  						 {name : 'source',index : 'source',height:90,editable : false},
  						 {name : 'bureau',index : 'bureau',height:90,editable : false},
  						 {name : 'notes',index : 'notes',height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/Sysinfo', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','系统信息', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] });	
}


/*
 * 以下为码址仓库部分
 */


/*
 * 码址：邮箱地址
 */
function allEmailAddr() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoEmail"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideemailid','hidesuspectid','No.','邮箱地址','用户姓名1','用户姓名2','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'emailid',index : 'emailid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'mailaddr',index : 'mailaddr',width:150,height:90,editable : true, edittype:'text', editoptions: {size:35},editrules:{required:true, email:true}},
  						 {name : 'username1',index : 'username1',height:90,editable : true, edittype:'text', editoptions: {size:35}},
  						 {name:'username2',index:'username2',height:45,editable:true, edittype:'text', editoptions: {size:35}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoEmail', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','邮件信息','servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出邮件信息',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoEmails",{suspectid:"checkall"});
  	}});
}

/*
 * 码址：手机号码
 */
function allPhoneNos() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoPhoneNos"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hidephoneid','hidesuspectid','No.','手机号码','用户姓名','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'phoneid',index : 'phoneid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'phoneno',index : 'phoneno',width:200,height:90,editable : true,edittype:'text', editoptions: {size:35},editrules:{required:true, number:true}},
  						 {name : 'username1',index : 'username1',height:90,width:140, editable : true, edittype:'text', editoptions: {size:35}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',width:200,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoPhoneNos', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','手机号码', 'servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出电话号码',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoPhoneNos",{suspectid:"checkall"});
  	}});
}

/*
 * 码址：QQ号码
 */
function allQQNos() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoQQNos"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideqqid','hidesuspectid','No.','QQ号码','用户昵称','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'qqid',index : 'qqid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'qqno',index : 'qqno',width:200,height:90,editable : true, edittype:'text', editoptions: {size:35},editrules:{required:true, number:true}},
  						 {name : 'nickname',index : 'nickname',height:140,editable : true, edittype:'text', editoptions: {size:35}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',width:200,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoQQNos', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','QQ号码', 'servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出QQ号码',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoQQNos",{suspectid:"checkall"});
  	}});
}

/*
 * 码址：Skype号码
 */
function allSkypeNos() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoSkypeNos"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideskypeid','hidesuspectid','No.','Skype号码','用户昵称','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'skypeid',index : 'skypeid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'skypeno',index : 'skypeno',width:200,height:90,editable : true, edittype:'text', editoptions: {size:35},editrules:{required:true}},
  						 {name : 'nickname',index : 'nickname',height:140,editable : true, edittype:'text', editoptions: {size:35}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',width:200,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoSkypeNos', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','Skype号码', 'servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出Skype号码',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoSkypeNos",{suspectid:"checkall"});
  	}});
}

/*
 * 码址：MSN号码
 */
function allMSNNos() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoMSNNos"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hidemsnid','hidesuspectid','No.','MSN帐号','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'msnid',index : 'msnid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'msnno',index : 'msnno',width:200,height:90,editable : true, edittype:'text', editoptions: {size:35},editrules:{required:true}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',width:200,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoMSNNos', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','MSN号码', 'servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出MSN号码',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoMSNNos",{suspectid:"checkall"});
  	}});
}

/*
 * 码址：Fetion号码
 */
function allFetionNos() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoFetionNos"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hidefetionid','hidesuspectid','No.','Fetion帐号','昵称','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'fetionid',index : 'fetionid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'fetionno',index : 'fetionno',width:200,height:90,editable : true, edittype:'text', editoptions: {size:35},editrules:{required:true}},
  						 {name : 'nickname',index : 'nickname',width:150,height:90,editable : true, edittype:'text', editoptions: {size:35}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',width:200,height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',height:140,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoFetionNos', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','Fetion号码', 'servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出Fetion号码',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoFetionNos",{suspectid:"checkall"});
  	}});
}

/*
 * 码址：网址类信息
 */
function allUrls() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var addOptions	=	getAddOptionsObj(100, 300, 350,{className:"RepoURLs"});
	var suspObj	=	getAllSuspInfo4Sel();
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideurlid','hidesuspectid','No.','网址URL','标题','访问时间','关联对象姓名','来源方式','数据来源','添加时间'];
  	var colModel	=	[{name : 'urlid',index : 'urlid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'suspectid',index : 'suspectid',width:20,height:90,hidden:true,editable : false, search:false},
  						 {name : 'id',index : 'id',width:40,height:90,editable : false,align:'center', search:false},
  						 {name : 'url',index : 'url',width:250,height:90,editable : true, edittype:'text', editoptions: {size:35}},
  						 {name : 'title1',index : 'title',width:150,height:90,editable : true,edittype:'text', editoptions: {size:35}},
  						 {name : 'accessTime',index : 'accessTime',width:150,height:90,editable : true,edittype:'text', editoptions: {size:35}},
  						 {name : 'relSuspName',index : 'relSuspName',height:90,editable : true, edittype:'select', editoptions: { value:suspObj}},
  						 {name : 'srcType',index : 'srcType',height:90,editable : false},
  						 {name : 'dataType',index : 'dataType',height:90,editable : false, search:false},
  						 {name : 'parsedate',index : 'parsedate',width:200,height:90,editable : false}];
	assembleGrid($("#navgrid"),'servlet/DispRepoURls', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','网址类信息', 'servlet/RepoEdit', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:true,del:false,search:true,refresh:true},{},addOptions,{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] })
  	.navButtonAdd("#pagernav",{caption:"上传文件",buttonicon:"ui-icon-newwin",onClickButton:showRightImportForm})
  	.navButtonAdd("#pagernav",{caption:'导出网址信息',buttonicon:"ui-icon-newwin",onClickButton:function() {
  		exportGridData("RepoURLs",{suspectid:"checkall"});
  	}});
}


/*
 * 这个是高级管理，删除某个对象的某个磁盘，这个是调用数据库触发器，将相关信息一并删除
 * 和其他表一样，如果没有选定对象，则默认展示所有对象信息，否则，只显示选定对象的所有磁盘信息
 * 这个表和系统信息表有重复，只是展示的信息的侧重点不同，和这个表带删除操作。
 */
function superManagement() {
	showMiddleArea();
	clearRightZone();
	var hideIds	=	getHiddenState($("#hideSelectedSuspect"));
	var suspIds	=	hideIds=='checkall'?'checkall':hideIds;
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
	var colNames	=	['hidediskid','No.','磁盘序列号','所属对象','案件代号','来源','录入人员','录入时间','备注'];
  	/*var colNames	=	['hidediskid','No.','案件代号','时间','地点','来源','单位', '录入人员' ,'录入时间','磁盘序列号','磁盘大小','镜像状态', '备注'];*/
  	var colModel	=	[{name : 'diskid',index : 'diskid',hidden:true,editable : false},
  						 {name : 'id',index : 'id',width:20,height:90,editable : false},
  						 {name : 'diskcode',index : 'diskcode',height:90,editable : false},
  						 {name : 'suspetname', index : 'suspectname', height:90, editable:false},
  						 {name : 'casecode',index : 'casecode',height:90,editable : false},
  						 {name : 'source',index : 'source',height:90,editable : false},
  						 {name : 'instaff',index : 'instaff',height:90,editable : false},
  						 {name : 'intime',index : 'intime',height:90,editable : false},
  						 {name : 'notes',index : 'notes',height:90,editable : false}]
	assembleGrid($("#navgrid"),'servlet/Sysinfo4Del', 'POST', {page:'1',suspectid:suspIds}, '#pagernav','磁盘信息', '', $("#right").width(), gridheight, colNames, colModel, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: true,sopt:['eq','ne'] })
  	.navButtonAdd("#pagernav",{caption:"删除磁盘相关信息",buttonicon:"ui-icon-newwin",onClickButton:delDiskRelInfo});
}

/*
 * 删除磁盘所有相应信息
 */
function delDiskRelInfo() {
	var rowdata	=	getRowData();
	var delDiskRelAjax	=	function() {
		//alert(rowdata.diskid);
		syncAjaxPost("servlet/DelDiskRelInfo",{diskid:rowdata.diskid});
		$("#navgrid").trigger("reloadGrid");
	}
	confirmMessage("您即将删除磁盘 "+rowdata.diskcode+" 的所有相关信息，请确认后再删除",delDiskRelAjax);
}

/*
 * 人工处理报告展示：
 * 1.从后台数据库读filesys表中读出人工处理类的文件，找出对应的对象名，然后产生对应的文件夹图标
 * 2.对图标设置双击事件，双击后再次获取对应文件，产生对应文件图标，设置相应事件。
 */
function showManualReport() {
	showMiddleArea();
	clearRightZone();
	$("<div id='displayManualReportMenu'><span id='uploadManualReport' onclick='uploadManualReportDialog()'></span><span onclick='showManualReport()' id='manualReportMenuBack'></span></div>").appendTo($("#right"));
	$("<div id='displayManualReport'></div>").appendTo($("#right"));
	
	//把嫌疑人ID写进来，加入onclick事件
	$.get("servlet/ManualReportSuspName", {}, function(data, status) {
		if(status == "error") {
			alert(" ajax"+ status.toString());
		} else {
			var obj	=	JSON.parse(data);
			var decodeName	=	"";
			for(var i=0; i<obj.length; i++) {
				decodeName	=	decodeURIComponent(obj[i].suspName);
				$("<span class='folderArea' id='"+obj[i].suspId+"'><span class='folderPic'></span><span class='folderName'>"+decodeName+"</span></span>").appendTo($("#displayManualReport"));
			}
			$(".folderArea").dblclick(function() {
				showMiddleArea();
				$("#displayManualReport").empty();
				var suspId	=	$(this).attr("id");
				$.get("servlet/SuspManualReport", {suspId:suspId}, function(data, status) {
					var obj	=	JSON.parse(data);
					for(var i=0; i<obj.length; i++) {
						var decodeName	=	decodeURIComponent(obj[i].fileName);
						var addr	=	obj[i].curPath.substring(17, obj[i].curPath.length);
						$("<a target='_blank' href='/files"+addr+"' class='fileArea'><span class='filePic'></span><span class='folderName'>"+decodeName+"</span></a>").appendTo($("#displayManualReport"));
					}
				});
			});
		}
	});
}

function uploadManualReportDialog() {
	$("<div id='uploadDialog' title='上传人工处理文档'><div id='suspName'><div id='suspNameWord'>对象姓名</div><select id='suspSel'></select></div><div id='selManualFile'><div id='selManualFileWord'>选择文件</div><div id='uploadManualForm'></div></div></div>").appendTo($("#right"));
	$.get("servlet/ShowCertainSuspect", {}, function(data, status) {
		var obj	=	JSON.parse(data);
		for(var i=0; i<obj.rows.length; i++) {
			var cell	=	obj.rows[i];
			$("<option value='"+cell.suspect_ID+"'>"+cell.name+"</option>").appendTo($("#suspSel"));
		}
	});
	//$("<form name='uploadManualForm' id='uploadManualForm' action='servlet/Upload' method='post' enctype='multipart/form-data'></form>").appendTo($("#uploadManualForm"));
	$("<input type='file' name='myfile' id='myfile' />").appendTo($("#uploadManualForm"));
	$("#myfile").uploadify({
		        "swf"      : "/hibernateEdition/Plug-ins/uploadify/uploadify.swf",
				"uploader" : "/hibernateEdition/servlet/Upload",
				"width" : 80,
				"height" : 17,
				"auto" : false,
				'buttonText' : '选择',
				'onUploadComplete' : function(file) {
            			alertMessage("上传完毕");
        		}
		 });
	
	$("#uploadDialog").dialog({show:'clip',modal: false,
		   overlay: {opacity: 0.5, background: "green"},
		   buttons: {
				"确认":function() {
					var suspId	=	$("#suspSel").val();
					$('#myfile').uploadify('settings','formData', {'selSuspId' : suspId});
					$('#myfile').uploadify('upload','*');
				}
			},
		   beforeClose: function(event, ui) {
					$("#uploadDialog").empty();
					$("#uploadDialog").remove();
			}});
}
