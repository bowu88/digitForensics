function refreshClassMain() {
				$("#classification").empty();
				fillClassMain();
		}

		function addClass() {
			$("<div id='dialog' title='增加类别' style='width:220px;height:140px'></div>").appendTo($("div[region=center]"));
			$("#dialog").append($("<input id='newClassName' style='width:80%;height:20px;margin:10px 20px;' name='newClassName'/>"));
			$("#dialog").append($("<a id='btn' style='float:right; margin-top:20px;' iconCls='icon-save'>确认</a>"));
			$("#btn").linkbutton({enable:"true"});
			$("#dialog").dialog({modal:true,
								 beforeClose:function() {
								 	$("#dialog").dialog("destroy");
								 	$("#dialog").empty().remove();
								 }});  
			$("#btn").click(function() {
				var newMainClassName	=	$("#newClassName").val();
				if(newMainClassName != "") {
					//syncAjaxPost("http://localhost:8080/hibernateEdition/servlet/ManipulMainClass2",{"manOper":"add","newMainClassName":newMainClassName});
					var encodeNewMainClassName	=	encodeURIComponent(newMainClassName);
					var txdata	=	{manOper:"add", newMainClassName:encodeNewMainClassName};
					$.get("../servlet/ManipulMainClass", txdata, function(data, status) {});
					alert("添加成功");
					$("#dialog").dialog("destroy");
					$("#dialog").empty().remove();
					refreshClassMain();
				} else {
					alert("请先输入新类名称");
				}			                 			   		
			});
		}
		
		function delClass() {
			$("<div id='dialog' title='删除类别' style='width:220px;height:140px'></div>").appendTo($("div[region=center]"));
			$("#dialog").append($("<select name='delsel' id='delsel' style='width:80%; margin-top:20px; margin-left:20px;'></select>"));
			var mainClassStr	=	syncAjaxPost("../servlet/GetMainClassThruAjax",{});
			var mainClassObj	=	JSON.parse(mainClassStr);
			var mainClassArray	=	mainClassObj.classlist;
			for(var i=0; i<mainClassArray.length; i++) {
				var classObj	=	mainClassArray[i];
				$("<option value='"+classObj.classId+"'>"+classObj.className+"</option>").appendTo($("#delsel"));
			}	
			$("#dialog").append($("<a id='btn' style='float:right; margin-top:20px;' iconCls='icon-save'>确认</a>"));
			$("#btn").linkbutton({enable:"true"});
			$("#dialog").dialog({modal:true,
								 beforeClose:function() {
								 	$("#dialog").dialog("destroy");
								 	$("#dialog").empty().remove();
								 }});  
			$("#btn").click(function() {
				var delMainClassId	=	$("#delsel").val();
				if(delMainClassId != "") {
					var txdata	=	{manOper:"del", delMainClassId:delMainClassId};
					$.get("../servlet/ManipulMainClass", txdata, function(data, status) {});
					alert("删除成功");
					$("#dialog").dialog("destroy");
					$("#dialog").empty().remove();
					refreshClassMain();
				} else {
					alert("请先输入类别名称");
				}			                 			   		
			});
		}
		
		
		function fillClassMain() {
			$("<ul class='ca-menu' id='classmenu'></ul>").appendTo($("#classification"));
			var mainClassStr	=	syncAjaxPost("../servlet/GetMainClassThruAjax",{});
			var mainClassObj	=	JSON.parse(mainClassStr);
			var mainClassArray	=	mainClassObj.classlist;
			$("<li id='classControl'></li>").appendTo($("#classmenu"));
			$("<span class='conspan'><a class='conbtn' id='addbtn' onclick='addClass();' iconCls='icon-add'>增加</a></span>").appendTo($("#classControl"));
			$("<span class='conspan'><a class='conbtn' id='delbtn' onclick='delClass();' iconCls='icon-remove'>删除</a></span>").appendTo($("#classControl"));
			$(".conbtn").linkbutton({
				plain:false
			});  

			for(var i=0; i<mainClassArray.length; i++) {
				var classObj	=	mainClassArray[i];
				$("<li><a id='"+classObj.classId+"' class='fileClass leftmenu'><div class='ca-content'><span class='ca-main'>"+classObj.className+"</span></div></a></li>").appendTo($("#classmenu"));
			}	
			
			$(".fileClass").click(function() {
					var name	=	$(this).attr("id");
					addTab($("#"+name+" div span").html()+"规则","../superuser/iframes/classifyRule.jsp?classId="+$(this).attr("id"));
			});
		}