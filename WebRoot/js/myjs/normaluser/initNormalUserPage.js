/*
 * 当浏览器大小变化时，重新计算部件长宽，以适应新的大小
 */
function initComponentSize() {
      	document.getElementById("body").style.cursor=	'POINTER';   //改变鼠标样式
      	
		var leftwidth	=	document.getElementById("left").offsetWidth;
		var totalwidth	=	document.getElementById("body").offsetWidth;

		var rightwidth	=	document.body.clientWidth-$("#left").width()-$("#leftClass").width();
		$("#right").css("width",rightwidth-5);
		$("#right").bind('resize', function() {
				$("#navgrid").setGridWidth($("#right").width());
				var timer	=	setInterval(isAnimated, 30);
				function isAnimated() {
					if(!$("#right").is(":animated")) {
						if($("#searchRepo").length > 0) {
							$("#navgrid").setGridHeight($("#searchRepo").height() - 30);
						} else {
							$("#navgrid").setGridHeight(getGridHeight()-8);
						}
					}
				}
		});
		window.onresize = function() {   
   		/*	var timer	=	setInterval("$('#right').trigger('resize')",3);*/
			/*$('#right').trigger('resize');*/
		}  
}

/*
 * 初始化normaluserpage的控件事件
 */
function initComponentEvent() {
	$("#mainDisplayClass1").click(function() {
		showAccordionThemeClassify();
	});
	$("#mainDisplayClass2").click(function() {
		showAccordionInfoAbstract();
	});
	$("#mainDisplayClass0").click(function() {
		showAccordionSuspManagement();
    });
}

function showClassifyFile(mainClassId) {
	var classId=		mainClassId;
	showMiddleArea();
	clearRightZone();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	
	var gridheight	=	getGridHeight();
  	var colNames	=	['hidefileid','hidediskid','No.','文件名称','文件所属对象','原文件路径','最后一次修改时间','文件创建时间','备注','文件磁盘序列号'];
  	var colModel	=	[{name : 'fileid',index : 'fileid',hidden:true,editable : false, search:false},
  						 {name : 'diskid',index : 'diskid',hidden:true,width:30,height:90,editable : false, search:false},
  						 {name : 'id',index : 'id',width:30,height:90,editable : false, search:false},
  						 {name : 'filename',index : 'filename',width:240,height:90,editable : false},
  						 {name : 'suspectname',index : 'suspectname',width:240,height:90,editable : false},
  						 {name:'originpath',index:'originpath',width:300,height:90,editable:false},
  						 {name:'lastmodified',index:'lastmodified',width:300,height:90,editable:false},
  						 {name:'createTime',index:'createTime',width:300,height:90,editable:false},
  						 {name:'notes',index:'notes',width:300,height:90,editable:false},
  						 {name:'diskserialno',index:'diskserialno',width:300,height:90,editable:false, search:false}];
	assembleGrid($("#navgrid"),'servlet/ClassifyFile', 'POST', {page:'1',classId: classId}, '#pagernav','文件信息', '', $("#right").width(), gridheight, colNames, colModel, false, false)
  	.navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true},{},{},{},{multipleSearch:false, multipleGroup:false,showQuery: false,sopt:['eq','ne','cn'] });
}

function showAccordionThemeClassify() {
	//首先通过ajax获取动态数据，然后显示
	//这里的码址仓库和文件分类都是比较大的类型，所以放在一起。文件分类整个系统就一个
	
	//通过ajax获取文件分类列表
	var mainClassStr	=	syncAjaxPost("servlet/GetMainClassThruAjax",{});
	var mainClassObj	=	JSON.parse(mainClassStr);
	var mainClassArray	=	mainClassObj.classlist;

	var mainClassSecondaryArray	=	[];
	for(var i=0; i<mainClassArray.length; i++) {
		var classObj	=	mainClassArray[i];
		var tmpArray	=	[];
		var classId	=	classObj.classId;
		/*alert(classId);*/
		var funcStr	=	"showClassifyFile('"+classId+"')";
		tmpArray.push("   "+classObj.className);
		tmpArray.push(funcStr);
		mainClassSecondaryArray.push(tmpArray);
	}	
	
	var accordionObj	=	[{title:'码址仓库', 
		secondaryTitle	:	[['   邮箱地址',"allEmailAddr()"],['   手机号码',"allPhoneNos()"],['   QQ号码',"allQQNos()"],['   Skype号码',"allSkypeNos()"],['   MSN号码',"allMSNNos()"],['   Fetion号码',"allFetionNos()"],['   网址类信息',"allUrls()"]]},
							 {title:'文件分类',
		secondaryTitle	:	mainClassSecondaryArray}];
	$("#accordionArea").empty();
	fillAccordionContent(accordionObj);
	$("#accordion").accordion({ collapsible: true,clearStyle: true,autoHeight:false,active: false});
}

function showAccordionInfoAbstract() {
	var accordionObj	=	[{title:'系统检索', 
		secondaryTitle	:	[['   文档内容检索',"datasearch()"],['   码址库检索',"dataReposearch()"],['   高级检索',"datasearch()"]]},
							 {title:'信息抽取', 
		secondaryTitle	:	[['   邮件信息',"mails()"],['   邮箱帐号',"mailAccount()"],['   即时通信工具',"imclient()"],['   浏览器信息',"browserInfo()"],['   系统信息',"sysInfo()"]]}];
	
	$("#accordionArea").empty();
	fillAccordionContent(accordionObj);
	$("#accordion").accordion({ collapsible: true,clearStyle: true,autoHeight:false,active: false});
}

function showAccordionSuspManagement() {
	var accordionObj	=	[{title:'对象管理', 
		secondaryTitle	:	[['   信息查看',"showSuspectGrid()"], ['   人工报告', "showManualReport()"]]}];
	$("#accordionArea").empty();
	fillAccordionContent(accordionObj);
	$("#accordion").accordion({ collapsible: true,clearStyle: true,autoHeight:false,active: false});
}

function fillAccordionContent(accordionObj) {
	$leftdiv	=	$("<div id='accordion'></div>");
	$leftdiv.css({"position":"relative","height":"100%","overflow":"auto"});
	$leftdiv.appendTo($("#accordionArea"));
	for(var i=0; i<accordionObj.length; i++) {
		var curObj	=	accordionObj[i];
		$("<h3><a>"+curObj.title+"</a></h3>").appendTo($leftdiv);
		$ul	=	$("<ul></ul>");
		$div	=	$("<div></div>");
		for(var j=0; j<curObj.secondaryTitle.length; j++) {
			var curSecondaryObj	=	curObj.secondaryTitle[j];
			$li	=	$("<li class='rule_manage'></li>");
			$("<a class='wordlist' onclick=\""+curSecondaryObj[1]+"\">"+curSecondaryObj[0]+"</a>").appendTo($li);
			$li.appendTo($ul);
		}
		$ul.appendTo($div);
		$div.appendTo($leftdiv);	
		$ul.css({'margin-left':'0px','width':'100%'});
		$div.css({'padding':"0px"});
	}
}

/*
 * 显示用户信息
 */
function showUserInfo(tmp){
	$("<div id='username'></div>").html(tmp).appendTo($('#userinfo'));
	$("<div id='logout'>logout</div>").appendTo($('#userinfo'));
	$("<div id='changeinfo'>Userinfo</div>").appendTo($('#userinfo'));

	$("#logout").click(function(){
		alert("logout");
		$("<form id='logoutForm' name='logoutForm' action='servlet/Logout' method='post'></form>").appendTo($('#right'));
		document.logoutForm.submit();
	});
   				
   				
	$("#changeinfo").click(function(){
		$("<div id='changeInfoDialog' title='修改用户信息'></div>").appendTo($("#right"));
		$("<h3 id='passwordword'>新密码<h3>").appendTo($('#changeInfoDialog'));
		$("<input type='password' id='passwordinput'/>").appendTo($('#changeInfoDialog'));
		$("<h3 id='passwordword2'>再次输入密码<h3>").appendTo($('#changeInfoDialog'));
		$("<input type='password' id='passwordinput2'/>").appendTo($('#changeInfoDialog'));

		$("#changeInfoDialog").dialog({width:400,height:400,show:'clip',modal: true,
			overlay: {  
				opacity: 0.5,
				background: "green"  
			} });
		
		$('#changeInfoDialog').dialog('option', 'buttons', { "确认": function() {
			var firstpasswd	=	$("#passwordinput").val();
			var secondpasswd	=	$("#passwordinput2").val();
			var username	=	$("#username").val();
			if(firstpasswd!=secondpasswd) {
				alert("两次密码输入不同,请重新输入");
				return false;
			} else {
				//ajax修改密码
				var transusername	=	document.getElementById("username").innerHTML;
				$.post("servlet/AjaxChangePassword", { Action: "POST",password:firstpasswd,username:transusername},
					function (data, textStatus){
						eval("var newdata="+data.toString());
						alert(newdata.message);
				}); 
				$("#changeInfoDialog").empty();
				$("#changeInfoDialog").remove();
			}
		}});
	});
}

/*
 * 动画：隐藏middle区域
 */
function hideMiddleArea() {
	$("#middleinfo").hide();
	$("#middle").animate({height:"0px"},{duration:1000});
	$("#main").animate({height:"530px"});
	$('#right').trigger('resize')
}

/*
 * 动画：显示middle区域
 */
function showMiddleArea() {
	$("#middle").animate({height:"30px"},{duration:1000});
	$("#middleinfo").show();
	$("#main").animate({height:'500px'});
	$('#right').trigger('resize');
}

/*
 * 用户名与嫌疑人名切换动画
 */
function switchUserInfo() {
	$("#chosensuspect").stop().animate({top:'2px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
	$("#username").hide();
	$("#logout").hide();
	$("#changeinfo").hide();
	$("#suspectname").mousedown(function() {
			$("#chosensuspect").stop().animate({top:'-200px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});			
			$("#username").fadeIn(600);
			$("#logout").fadeIn(600);
			$("#changeinfo").fadeIn(600);
	});
	
	$("#username").mousedown(function() {
			$("#chosensuspect").stop().animate({top:'2px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});	
			$("#username").fadeOut(600);
			$("#logout").fadeOut(600);
			$("#changeinfo").fadeOut(600);
	});
}

/*
 * 更新middle的当前数据表信息
 */
function switchMiddleGridData(gridName) {
	$("<div id='middlegriddata'></div>").html($("<font face='幼圆'>"+gridName+"</font>")).appendTo($("#middlegrid"));
	$("#middlegriddata").animate({marginTop:"5px"});
}

/*
 * 更新middle的当前对象信息
 */
function switchMiddleSuspectData(suspectName) {
	$("#middlesuspectdata").empty().remove();
	$("<div id='middlesuspectdata'></div>").html($("<font face='幼圆'>"+suspectName+"</font>")).appendTo($("#middlesuspect"));
	$("#middlesuspectdata").animate({marginTop:"5px"});
}

/*
 * 更新middle的提示信息
 * message是一个str数组
 */
function switchMiddleTipsData(message) {
	if($("#middletipsdata").length>0) {
		$("#middletipsdata").animate({marginTop:'-35px'}).remove();
	}
	var num	=	$("#hidecurTipsNo").html();
	$("<div id='middletipsdata'></div>").html($("<font face='幼圆'>"+message[num]+"</font>")).appendTo($("#middletips"));
	$("#middletipsdata").animate({marginTop:"5px"});
	$("#hidecurTipsNo").html((num==message.length-1?0:++num));
}

function windowTimeIntevalFunc(tipsArray) {
	var _switchMiddleTipsData	=	function(tips) {
		return function() {
			switchMiddleTipsData(tips);
		}
	};
	//技巧：这里因为setInterval不好调用带参数的函数，所以写了一个中介函数，返回一个无参的函数；
	window.setInterval(_switchMiddleTipsData(tipsArray),3000);
}