<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" href="/hibernateEdition/css/jqGrid/ui.jqgrid.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/ui-lightness/jquery-ui-1.8.16.custom.css" type="text/css"></link>
	
	<script src="/hibernateEdition/js/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jquery/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-en.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-cn.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/jquery.jqGrid.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/validateUtil.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/jqGridUtil.js" type="text/javascript"></script>
	
	
	<script type='text/javascript'>
   		function beginShow() {
   			var classId	=	'<%=request.getParameter("classId").toString()%>';
   			showFileClassRule(classId);
   		}

   		function showFileClassRule(mainClassId) {
			$("#right").empty();
			$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));

			var editOptions={
			   		 top: '150', left: "100", width: '300'  
			   		 ,closeOnEscape: true, closeAfterEdit:true,mtype:"POST",
			   		onclickSubmit:function(params){
			   			var sr = jQuery("#navgrid").getGridParam('selrow');
						rowdata = jQuery("#navgrid").getRowData(sr);
						return {oldid:rowdata.classRuleId};
			   		},
			   		 beforeShowForm: function(form) { 
			   		 },
			   		 afterSubmit:function(response, postdata) {
			   			 var success =	true;
			   			 var message = "";
			   			 jQuery("#navgrid").trigger("reloadGrid");
			   			 var new_id	=	"1";
			   			 return [success,message,new_id] ;
			   		 }
			   }; 
			  
			   var addOptions={
			   	 	top: '150', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST", closeAfterEdit:true,
			   		onclickSubmit:function(params){
			   			var sr = jQuery("#navgrid").getGridParam('selrow');
			   			rowdata = jQuery("#navgrid").getRowData(sr);
			   			return {mainClassId:mainClassId};
			   		} 
			   };
			   
			   
			   var delOptions={
			   		top: '150', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST", closeAfterEdit:true,
			   		onclickSubmit:function(params){
			   			var sr = jQuery("#navgrid").getGridParam('selrow');
			   			rowdata = jQuery("#navgrid").getRowData(sr);
			   			return {classRuleId:rowdata.classRuleId};
			   		},
			   		afterSubmit:function(response, postdata) {
			  			 var success =	true;
			  			 var message = "";
			  			 jQuery("#navgrid").trigger("reloadGrid");
			  			 var new_id	=	"1";
			  			 return [success,message,new_id] ;
			  		 }
			   };
			
		  	var colNames	=	["hideClassRuleId","classid","No.","分类规则","规则名称","类型"];
		  	var colModel	=	[{name : "classRuleId",index : "classRuleId",hidden:true,editable : false},
		  					     {name : "classid" ,index:"classid", hidden:true, editable:false},
		  						 {name : "id",index : "id",width:50,editable : false},
		  						 {name : "classifyRule",index : "classifyRule",width:430,editable : true,editoptions : {readonly:false,size : 15}},
		  						 {name : "mainClassName",index : "mainClassName",width:300,editable : true,editoptions : {readonly:false,size : 15}},
		  					     {name : "property",index:"property", width:300,editable:true, edittype:"select", editoptions:{value:{0:"后缀",1:"文件名",2:"文件夹名"}}}];
			
			assembleGrid($("#navgrid"),"servlet/ClassRule", "POST", {page:"1",mainClassId:mainClassId}, "#pagernav","", "servlet/Edit_rule","1200px", "409px", colNames, colModel, false, true)
		  	.navGrid('#pagernav',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions,{});
		}
   	</script>
   	<style type='text/css'>
			html ,body {
				padding:0px;
				margin:0px;
			}
			body {
				width:1065px;
				height:370px;
				overflow:hidden;
			}
			#right {
				position:absolute;
				width:100%;
				height:100%;
			}
	</style>
  </head>
  
  <body onload='beginShow()'>
   	<div id='right'></div>
  </body>
</html>
