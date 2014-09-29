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
<!-- 	<script src="/hibernateEdition/js/myjs/search/searchPage.js" type="text/javascript"></script> -->
	<script src="/hibernateEdition/js/json/json2.js" type="text/javascript"></script>
	
	<script src="/hibernateEdition/js/myjs/utils/validateUtil.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/jqGridUtil.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/initUtils.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/search/searchUtil.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/search/searchPage2.js" type="text/javascript"></script>
	<script src='/hibernateEdition/js/myjs/search/dynamicUtil.js' type='text/javascript'></script>
	<script src='/hibernateEdition/js/myjs/search/initSearchPage.js' type='text/javascript'></script>

	<script type="text/javascript">
		function getTxSearchData() {
			var tmp	=	null;
			tmp	=	'<%=request.getAttribute("curKey")%>';
  			var curKey	=	tmp==null?"":tmp;
  		
  			tmp	=	'<%=request.getAttribute("startTime")%>';
  			var startTime	=	tmp==null?"":tmp;
  			
  			tmp	=	'<%=request.getAttribute("endTime")%>';
  			var endTime	=	tmp==null?"":tmp;
  			
  			tmp	=	'<%=request.getAttribute("timesort")%>';
  			var timesort	=	tmp==null?"":tmp;
  			
  			tmp	=	'<%=request.getAttribute("docType")%>';
  			var docType	=	tmp==null?"":tmp;
  			
  			tmp	=	'<%=request.getAttribute("selSuspStr")%>';
  			var selSuspStr	=	tmp==null?"":tmp;
  			
  			var txdata	=	new Array();
  			txdata.push("true", curKey, timesort, "false", startTime, endTime, docType, selSuspStr, "1");
  			return txdata;	
		}
		
		$(document).ready(function() {
				adjustWindowSize();//窗口最大化 
				showSearchArea();  //显示搜索区域
  				initBasicEvent();
  				txSearch(getTxSearchData()); //开始搜索
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
  	<div id="hidesupersearchSuspect" class="searchState selSuspStr" style="display:none"></div>
  	<div id="hidecurPage" class="searchState searchStateNumber" style="display:none">1</div>
   	
   	<div id="header"></div>
   	<div id="middle"></div>
   	<div id="content">
   		<div id="searchcontent"></div>
   		<div id="rightside1">
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
