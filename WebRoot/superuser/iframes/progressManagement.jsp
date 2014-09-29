<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">    
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type='text/javascript' src='<%=basePath%>js/json/json2.js'></script>
	<script type='text/javascript' src='<%=basePath%>js/easyUI/jquery-1.7.2.min.js'></script>
	<script type='text/javascript' src='<%=basePath%>js/myjs/utils/jqGridUtil.js'></script>
	<style type='text/css'>
		body {
			background:white;
		}
	
		#container {
			position:relative;
			width:1065px;
			height:470px;
		}
		
		#title {
			float:left;
			position:relative;
			height:13%;
			width:100%;
		}
		
		#main {
			float:left;
			height:85%;
			width:100%;
			overflow:auto;
		}
		
		.bar {
			float:left;
			display:block;
			margin-top:3px;
			width:100%;
			height:60px;
			background:url(<%=basePath%>css/superuser/resources2/progressbar.png) no-repeat;			
		}
		
		.idno {
			float:left;
			position:relative;
			padding-top:18px;
			margin-left:5px;
			width:89px;
			height:38px;
			overflow:hidden;
		}
		
		.classifyprogress {
			float:left;
			position:relative;
			margin-top:6px;
			margin-left:20px;
			width:311px;
			height:40px;
			overflow:hidden;
			background:url(<%=basePath%>css/superuser/resources2/classifyprogress.png) no-repeat;	
		}
		
		.parseprogress {
			float:left;
			position:relative;
			margin-top:6px;
			width:311px;
			height:40px;
			overflow:hidden;
			background:url(<%=basePath%>css/superuser/resources2/parseprogress.png) no-repeat;	
		}
		
		.indexprogress {
			float:left;
			position:relative;
			margin-top:6px;
			width:311px;
			height:40px;
			overflow:hidden;
			background:url(<%=basePath%>css/superuser/resources2/indexprogress.png) no-repeat;	
		}
		
		.percent {
			float:left;
			position:relative;
			width:208px;
			margin-left:102px;
			height:22px;			
		}
		
		.curpath {
			float:left;
			position:relative;
			width:208px;
			margin-left:102px;
			height:10px;
		}
	</style>
  	<script type='text/javascript'>
  		function createAProgressBar(task) {
  			$("<div class='bar curbar' id='"+task.diskid+"'></div>").appendTo($("#main"));
  			$("<span class='idno'>"+task.idno+"</span>").appendTo($(".curbar"));
  			$("<span class='classifyprogress'><div class='percent'>未开始</div><div class='curpath'></div></span>").appendTo($(".curbar"));
  			$("<span class='parseprogress'><div class='percent'>未开始</div><div class='curpath'></div></span>").appendTo($(".curbar"));
  			$("<span class='indexprogress'><div class='percent'>未开始</div><div class='curpath'></div></span>").appendTo($(".curbar"));
  			$(".curbar").removeClass("curbar");
  		}
  		
  		function updateProcecessingTask(task) {
  			$(".bar").each(function() {
  				if(task.classify != undefined) {
  					for(var i=0; i<task.classify.length; i++) {
		  				if($(this).attr("id") ===  task.classify[i].diskid) {
	  						$($($(this).children()[1]).children()[0]).html(task.classify[i].percent);
		  				}
	  				}
	  				/* if($(this).attr("id") === task.classify.diskid) {
	  					$($($(this).children()[1]).children()[0]).html(task.classify.percent);
	  				} */
	  			}
  				if(task.parse != undefined) {
	  				for(var i=0; i<task.parse.length; i++) {
		  				if($(this).attr("id") ===  task.parse[i].diskid) {
	  						$($($(this).children()[2]).children()[0]).html(task.parse[i].percent);
		  				}
	  				}
	  			}
	  			
	  			if(task.index != undefined) {
	  				//alert(task);
	  				for(var i=0; i<task.index.length; i++) {
		  				if($(this).attr("id") ===  task.index[i].diskid) {
	  						$($($(this).children()[3]).children()[0]).html(task.index[i].percent);
		  				}
	  				}
	  			}
  				/* if($($(this).children()[0]).html() === task.idno) {
  					//alert(task.percent);
  					$($($(this).children()[1]).children()[0]).html(task.percent);
  				} */
  			});	
  		}
  		
  		$(function() {
  			var data	=	{querytask:"true", queryProgress:"false"};
  			$.get("servlet/queryClassifyProgress", data, function(data, status) {
  				var tasks	=	data;
  				var obj	=	JSON.parse(data);
  				$("#main").html();
				for(var i=0; i<obj.tasklist.length; i++) {
					createAProgressBar(obj.tasklist[i]);
				}
				if(obj.tasklist.length == 0) {
					$("#main").html("没有可以展示的任务");
				} else {
					function queryProcessingTask() {
						var txdata	=	{querytask:"false", queryProgress:"true", curTasks:tasks};
						$.get("servlet/queryClassifyProgress", txdata, function(data, status) {
		  					var obj	=	JSON.parse(data);
		  					//alert(data);
		  					//alert(data);
		  					updateProcecessingTask(obj);
  						});						
					}
					var timer	=	setInterval(queryProcessingTask, 5);
				}
  			});
  			
  			//$($(".bar")[2]).fadeOut(1500);
  			//1.getTasksAndTaskProgress assemble an array
  			//2.createProgressBar setTimeInterval to updateTaskProgress
  			//3.if get 3 100% remove the finished bar
  		});
  	</script>
  
  </head>
  
  <body>
	<div id='container'>
		<div id='title'>
			<img src='<%=basePath%>css/superuser/resources2/progressTitle.png' />
		</div>
		<div id='main'>
			<!-- <div class='bar'>
				<span class='idno'>IDNoafdsafdasfsd</span>
				<span class='classifyprogress'>
					<div class='percent'>10%</div>
					<div class='curpath'>C:\abc\abc\abc</div>
				</span>
				<span class='parseprogress'>
					<div class='percent'>10%</div>
					<div class='curpath'>C:\abc\abc\abc</div>
				</span>
				<span class='indexprogress'>
					<div class='percent'>10%</div>
					<div class='curpath'>C:\abc\abc\abc</div>
				</span>
			</div> -->
		</div>
	</div>
  </body>
</html>
