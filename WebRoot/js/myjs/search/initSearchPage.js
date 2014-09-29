/*
 * 显示搜索区域，这个完全动态创建，是为了方便以后可以将多种
 * 搜索方式均方在此处；
 */
function showSearchArea() {
	
	$("<input id='searchtext' size='50'/>").appendTo($("#header"));
	$("<input id='searchbutton' name='searchbutton' type='button' value='开始查询'/>").appendTo($("#header"));
	$("<div id='twiceSearch'><input type='checkbox' id='twiceSearchSelection' /><span id='twiceSearchWord'></div>").appendTo($("#middle"));
	
	$("#twiceSearchSelection").click(function() {
		var obj	=	document.getElementById("twiceSearchSelection");
		var flag	=	$("#hideTwiceSearchSelection").html();
		if(flag=="true") {
			obj.checked	=	false;
			$("#hideTwiceSearchSelection").html("false");
		} else {
			obj.checked	=	true;
			$("#hideTwiceSearchSelection").html("true");
		}
	});
	
	$("#searchbutton").click(function() {
		if($("#searchtext").val()=='') {
			alertMessage("搜索内容不能为空，请重新输入");
		} else {
			var searchkey	=	$("#searchtext").val();
			if($("#hideTwiceSearchSelection").html() == "true") {
				searchkey =	$("#hidecurKey").html()+" "+searchkey;
			}
			var searchstate	=	[null, searchkey];
			setSearchState(searchstate);
			newSearch();
		}
	});
	
	var marginleft	=	($("#header").width()-900)/2;
	var margintop	=	($("#header").height()-45)/2;
	var textcss	=	{"float":"left",
					 "margin-left":marginleft,
					 "margin-top":margintop,
					 "width":"750px",
					 "height":"38px",
					 "border-top":"2px solid orange",
					 "border-left":"2px solid orange",
					 "border-bottom":"2px solid orange",
					 "border-right":"0px solid orange",
					 "font-size":"25px"};	
	$("#searchtext").css(textcss);
	
	var buttoncss	=	{"float":"left",
						 "margin-left":"0px",
						 "margin-top":margintop,
						 "width":"146px",
						 "height":"41px",
						 "background":"skyblue",
						 "border":"2px solid orange"};
	$("#searchbutton").css(buttoncss);
	
	/*$("<div id='tmpsupersearchdiv'>高级搜索</div>").appendTo($("#header"));
	
	var supercss	=	{"position":"absolute",
						 "right":"0px",
						 "top":"0px",
						 "width":"100px",
						 "height":"35px",
						 "font-size":"20px"};
	$("#tmpsupersearchdiv").css(supercss);				 
	
	$("#tmpsupersearchdiv").click(function() {
		superSearch();
	});*/
}

/*
 * 初始化最初的事件
 */
function initBasicEvent() {
	$("#timesort").click(function() {
			$("#hidetimeSort").html("true");
			$(this).animate({borderWidth:"2px"});
			$("#relationsort").animate({borderWidth:"0px"});
			$('#hidecurPage').html(1);
			updateSearch();
	});
	
	$("#relationsort").click(function() {
			$("#hidetimeSort").html("false");
			$("#timesort").animate({borderWidth:"0px"});
			$(this).animate({borderWidth:"2px"});
			$('#hidecurPage').html(1);
			updateSearch();			
	});
	
	$("#startDate").change(function() {
				$("#timesort").animate({borderWidth:"0px"});
				$("#relationsort").animate({borderWidth:"0px"});
				$("#hidestartTime").html($("#startDate").attr("value"));
				if(document.getElementById("endDate").value!="") {
						$('#hidecurPage').html(1);
						updateSearch();					
				}
			});
			
	/*
	 * 现在只能两个时间都有，才能提交
	 */
	$("#endDate").change(function() {
				$("#timesort").animate({borderWidth:"0px"});
				$("#relationsort").animate({borderWidth:"0px"});
				$("#hideendTime").html($("#endDate").attr("value"));
				if(document.getElementById("startDate").value!="") {
						$('#hidecurPage').html(1);
						updateSearch();					
				}
			});
			
	$("#searchtext").change(function() {
			resetSearchState();
	});
			
	$("#startDate").datepicker({dateFormat:"yy-mm-dd"});
	$("#endDate").datepicker({dateFormat:"yy-mm-dd"});
}

function showDocType() {
	$("<div id='checkbox'></div>").appendTo($("#doctype"));
	
	$("<input type='checkbox' id='typeinput1'>").appendTo($("#checkbox"));
	$("<label for='typeinput1' class='docTypeCheckBox'>.DOC</label>").appendTo($("#checkbox"));
	
	$("<input type='checkbox' id='typeinput2'>").appendTo($("#checkbox"));
	$("<label for='typeinput2' class='docTypeCheckBox'>.PDF</label>").appendTo($("#checkbox"));
	
	$("<input type='checkbox' id='typeinput3'>").appendTo($("#checkbox"));
	$("<label for='typeinput3' class='docTypeCheckBox'>.TXT</label>").appendTo($("#checkbox"));
	
	$("<input type='checkbox' id='typeinput4'>").appendTo($("#checkbox"));
	$("<label for='typeinput4' class='docTypeCheckBox'>.PPT</label>").appendTo($("#checkbox"));
	
	$("#checkbox").buttonset();
	
	$("<input id='docTypeSubmit'value='确认'/>").appendTo($("#rightside3"));
	$("#docTypeSubmit").css({"float":"right","width":"40px","height":"20px","margin-top":"20px"});
	$("#docTypeSubmit").button();
	
	
	$("#docTypeSubmit").click(function() {
		var typearray	=	new Array();
		var $checkarray	=	$("#checkbox>input");
		var $checkradio	=	null;
		var name	=	null;
			$checkarray.each(function() {
				if($(this).attr("checked")) {
					typearray.push($(this).next("label").text());
				} 
			});
		var str	=	'';
		for(var i=0; i<typearray.length; i++) {
			str	+=	typearray[i]+(i==typearray.length-1?'':',');
		}
		$("#hidedocType").html(str);
//		alert(str);
		updateSearch();
		typearray	=	null;
	});
}

/*
 * 设置普通搜索与动态搜索切换
 */
function initSwitchSearchArea() {
	//暂未完成
}