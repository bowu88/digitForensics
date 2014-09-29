<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="net.sf.json.JSONObject"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>"/>
    
    <title>搜索页</title>
    
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"/>
	<meta http-equiv="description" content="This is my page"/>
	<link href="/hibernateEdition/css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
	<link rel="stylesheet" type="text/css" href="/hibernateEdition/css/search/searchPage.css"/>
	<link rel="stylesheet" type="text/css" href="/hibernateEdition/css/pagination/pagination.css"/>
	
	<link rel="stylesheet" type="text/css" href="/hibernateEdition/css/flexiGrid/flexigrid.css"/>

	<script src="/hibernateEdition/js/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="/hibernateEdition/js/jquery/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/hibernateEdition/js/jquery/jquery.scrollTo-1.4.2-min.js"></script>
	<script type="text/javascript" src="/hibernateEdition/js/jquery/jquery.delay.js"></script>
	<script src="/hibernateEdition/js/jquery/jquery.easing.1.3.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/pagination/jquery.pagination.js" type="text/javascript"></script>
	
	<script src="/hibernateEdition/js/flexiGrid/flexigrid.js" type="text/javascript"></script>
	
    
    <script src="/hibernateEdition/js/json/json2.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/search/searchPage.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		$(document).ready(function() {
				
				 window.moveTo(0,0);	
				 window.resizeTo(screen.availWidth,screen.availHeight);
				 	//窗口最大化
				 
				showSearchArea();
				
		<%   /*
			JSONObject tmp	=	(JSONObject)request.getAttribute("jsondata");
			System.out.println("i'm in front now:"+tmp);
			String finaldata	=	java.net.URLEncoder.encode(tmp.toString(), "UTF-8");   //这里内容很多是""和标签或者特殊字符，所有编码下才能传，否则传到前台总出错
			
			System.out.println("i'm in front now:"+finaldata);
			
			String curkey	=	(String)request.getAttribute("curKey");*/
		%>
  			
  			var curKey	=	'<%=request.getAttribute("curKey")%>';
  			var startTime	=	'<%=request.getAttribute("startTime")%>';
  			var endTime	=	'<%=request.getAttribute("endTime")%>';
  			var timesort	=	'<%=request.getAttribute("timesort")%>';
  			var docType	=	'<%=request.getAttribute("docType")%>'
			//alert(curKey);
			showTransJsonData(curKey,startTime, endTime, timesort, docType);
			
			//document.onkeydown = searchsubmit; //回车事件
			/*
			document.onkeydown	=	function() {
				 if ( event.keyCode=='13' ) { //13是回车
				 	searchsubmit(1);
				 }	 	
			}
			
			
			 $("#searchtext").keydown(function(event) {  //这个用于捕捉用户回车事件，没试成功
	        		if (event.keyCode == "13") {
		        		e = $(this).val();
						searchsubmit(1,e);   
	      			  }
	   		 });			
			*/
			$("#timesort").click(function() {
				document.getElementById("hidetimeSort").innerHTML	=	"true";
				//document.getElementById("hiderelationSort").innerHTML	=	"false";
				$(this).animate({borderWidth:"2px"});
				$("#relationsort").animate({borderWidth:"0px"});
				
				//alert(document.getElementById("hidetimeSort").innerHTML+document.getElementById("hidesearchState").innerHTML);
				if(document.getElementById("hidesearchState").innerHTML=="true") {   /*出结果时，置hidesearchState为true*/
					//调用另外的函数更新搜索结果；			
					updateSearchResult(true,null);
				}
			});
	
			$("#relationsort").click(function() {
				document.getElementById("hiderelationSort").innerHTML	=	"true";
				document.getElementById("hidetimeSort").innerHTML	=	"false";
				$("#timesort").animate({borderWidth:"0px"});
				$(this).animate({borderWidth:"2px"});
				if(document.getElementById("hidesearchState").innerHTML=="true") {   /*出结果时，置hidesearchState为true*/
					//调用另外的函数更新搜索结果；
					
					updateSearchResult(true, null);
				}
			});
			
			$("#startDate").change(function() {
				$("#timesort").animate({borderWidth:"0px"});
				$("#relationsort").animate({borderWidth:"0px"});
				document.getElementById("hidetimeSort").innerHTML	=	"false";
				document.getElementById("hidestartTime").innerHTML	=	document.getElementById("startDate").getAttribute("value");
				if(document.getElementById("hidesearchState").innerHTML=="true") {   /*出结果时，置hidesearchState为true*/
					if(document.getElementById("endDate").value!="") {
						updateSearchResult(false, null);
					}
				}
			});
			
			$("#endDate").change(function() {
				$("#timesort").animate({borderWidth:"0px"});
				$("#relationsort").animate({borderWidth:"0px"});
				document.getElementById("hidetimeSort").innerHTML	=	"false";
				document.getElementById("hideendTime").innerHTML	=	document.getElementById("endDate").getAttribute("value");
				if(document.getElementById("hidesearchState").innerHTML=="true") {   /*出结果时，置hidesearchState为true*/
					//searchsubmit(1);
					if(document.getElementById("startDate").value!="") {
						updateSearchResult(false, null);
					}
				}
			});
			
			$("#searchtext").change(function() {
				document.getElementById("hidecurKey").innerHTML	=	"";
				document.getElementById("hidestartTime").innerHTML	=	"";
				document.getElementById("hidetimeSort").innerHTML	=	"false";
				document.getElementById("hideendTime").innerHTML	=	"";
			});
			
			$("#startDate").datepicker({dateFormat:"yy-mm-dd"});
			$("#endDate").datepicker({dateFormat:"yy-mm-dd"});
			
			showDocType();			
	});   
		
	</script>
  
  </head>
  
  
  <body>
  	<!-- 注意这个搜索状态顺序不能变，要插入，只能在最后插入 -->
  	<div id="hidesearchState" class="searchState searchStateBoolean" style="display:none">false</div>
  	<div id="hidecurKey" class="searchState searchStateBoolean" style="display:none"></div>
  	<div id="hidetimeSort" class="searchState searchStateBoolean" style="display:none">false</div>
  	<div id="hiderelationSort" class="searchState searchStateBoolean" style="display:none">false</div>
  	<div id="hidestartTime" class="searchState" style="display:none"></div>
  	<div id="hideendTime" class="searchState" style="display:none"></div>
  	<div id="hidedocType" class="searchState" style="display:none"></div>
  	<div id="hidesupersearchSuspect" class="searchState" style="display:none"></div>
  	<div id="hidecurPage" class="searchState searchStateNumber" style="display:none">1</div>
   	<div id="header">
   	</div>
   	<div id="middle"></div>
   	<div id="content">
   		<div id="searchcontent"></div>
   		<div id="rightside1">
   			<!--  <img src="/animateEdition/css/search/resources/rightside1.png"/>-->
   			<div id="timesort" style="display:block;float:left;margin-top:43px;width:150px;height:55px;border:0px solid black;"></div>
   			<div id="relationsort" style="display:block;float:right;margin-top:43px;width:150px;height:55px;border:0px solid black;"></div>
   		</div>
   		<div id="rightside2">
   			<div id="start" style="display:block;float:left;margin-top:63px;width:150px;height:35px;border:0px solid black; background:red;">
   				<input id="startDate" style="float:left;width:100%;height:35px;margin:0px;font-size:20px;"></input>
   			</div>
   			<div id="end" style="display:block;float:right;margin-top:63px;width:150px;height:35px;border:0px solid black;background:yellow;">
   				<input id="endDate" style="float:left;width:100%;height:35px;margin:0px;font-size:20px;"></input>
   			</div>
   		</div>
   		<div id="rightside3">
   			<div id="doctype" style="float:left;margin-top:63px;margin-left:15px;padding-left:15px;color:black;font-size:25px;"></div> 
   		</div>
   		<div id="pagearea"><div id="Pagination" class="pagination"></div></div>
   	</div>
   	<div id="footer"></div>
  </body>
</html>
