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
	<link rel="stylesheet" href="/hibernateEdition/css/jqGrid/ui.jqgrid.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/ui-lightness/jquery-ui-1.8.16.custom.css" type="text/css"></link>
	
	<script src="/hibernateEdition/js/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jquery/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-en.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-cn.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/jquery.jqGrid.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/validateUtil.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/jqGridUtil.js" type="text/javascript"></script>
	<script type="text/javascript">
			function showAllSuspect() {
				$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
			    var colNames	=	["No", "嫌疑人ID","嫌疑人姓名", "嫌疑人身份号","备注"];
		  		//1080width
		  		var colModel	=	[{name : "id",index : "id",width : 50,editable : false,editoptions : {readonly : true,size : 10}},
		  							 {name : "suspect_ID",index :"suspect_ID",hidden:true,editable : false,editoptions :{readonly : true,size : 10}},
		  							 {name : "name",index : "name",width : 200,editable : true,editoptions : {readonly:false,size : 15}},
		  							 {name : "identity",index:"identity",width:250,editable:true,editoptions:{readonly:false,size:15}},
		  							 {name:"notes",index:"notes",width:580,editable:true,edittype: "textarea",editoptions : {readonly : false,size : 15}}];
			    var editOptions={top:"30", left: "100", width: "300",closeOnEscape: true, closeAfterEdit:true,
   									onclickSubmit:function(params){
								   			var sr = jQuery("#navgrid").getGridParam('selrow');
								   			rowdata = jQuery("#navgrid").getRowData(sr);
								   			return {oldid:rowdata.suspect_ID};
   									},
							   		 afterSubmit:function(response, postdata) {
							   			 var success =	true;
							   			 var message = "";
							   			 jQuery("#navgrid").trigger("reloadGrid");
							   			 var new_id	=	"1";
							   			 return [success,message,new_id] ;
							   		 }
  				};
   
			   var addOptions={top: "30", left: "100", width: "300",closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
							      	onclickSubmit:function(params){
							       			return {managerid:null};
							       		},
							   		afterSubmit:function(response, postdata) {
							  			 var success =	true;
							  			 var message = "";
							  			 jQuery("#navgrid").trigger("reloadGrid");
							  			 var new_id	=	"1";
							  			 return [success,message,new_id] ;
							  		 }
			   };
   
   
			   var delOptions={top: "30", left: "100", width: "300",reloadAfterSubmit: true,mtype:"POST",
							   		onclickSubmit:function(params){
							   			var sr = jQuery("#navgrid").getGridParam('selrow');
							   			rowdata = jQuery("#navgrid").getRowData(sr);
							   			return {suspectid:rowdata.suspect_ID};
							   		},
							   		afterSubmit:function(response, postdata) {
							  			 var success =	true;
							  			 var message = "";
							  			 jQuery("#navgrid").trigger("reloadGrid");
							  			 var new_id	=	"1";
							  			 return [success,message,new_id] ;
							  		 }
			   };
			    
			    assembleGrid($("#navgrid"),"servlet/ShowAllSuspect", "GET", {page:"1"}, "#pagernav","", "servlet/Edit_suspect", "1200px", "409px", colNames, colModel, false, false)
			    .navGrid("#pagernav",{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions)
			    .navButtonAdd("#pagernav",{caption:"分配嫌疑人",buttonicon:"ui-icon-newwin",onClickButton:function() {
				    	var rowid = $("#navgrid").getGridParam("selrow");   
						if(rowid==null) {
							alert("请先选择一个嫌疑人！");
							return false;
						}
						var rowData = $("#navgrid").getRowData(rowid);    	
    	
					    	$.post("servlet/ShowAllUser", {Action:"POST"}, 
					  				function (data, textStatus){ 
					  					var allusers	=	new Array();
										for(var i=0; i<data.rows.length; i++) {
											allusers.unshift(data.rows[i].name);
										}
										$("<div id='addSuspectDialog' title='分配嫌疑人'><div>").appendTo($("#right"))
										$("<h4 id='addSuspectDialogword'>用户名</h4>").appendTo($("#addSuspectDialog"));
										$("<input id='addSuspectDialogtext'/>").appendTo($("#addSuspectDialog"));
					  					
					  					$("#addSuspectDialogword").css("font-weight","bold");
					  					$("#addSuspectDialogtext").css("float","left");
					  					$("#addSuspectDialogtext").css("margin-top","20px");
					  					$("#addSuspectDialogtext").css("margin-left","30px");
					  					$("#addSuspectDialogtext").css("height","35px");
					  					$("#addSuspectDialogtext").css("width","300px");
					  					$("#addSuspectDialogtext").css("font-size","30px");
					  					
					  					$("#addSuspectDialog").dialog({width:"400",height:"380",show:'clip',modal: true,
											overlay: {  
					            				opacity: 0.5,
					            				background: "green"  
											} });
											
										$("#addSuspectDialogtext").autocomplete({
											source:allusers,
											minChars: 1,
											width: 300,  
											matchContains: true
										});
										$(".ui-autocomplete").css("height","100px");
										$(".ui-autocomplete").css("overflow-y","scroll");
										$(".ui-autocomplete").css("overflow-x","hidden");
											
											
											
										$('#addSuspectDialog').dialog('option', 'buttons', { "确认": function() {
												var username	=	$("#addSuspectDialogtext").val();
												for(var i=0; i<allusers.length; i++) {
													if(allusers[i]==username) {
														break;
													}
												}
												if(i===allusers.length) {
													alert("用户不存在，请确认后重新输入");
													return ;
												}
												
												if(username!="") {
													$.post("servlet/InsertSuspect", {Action:"POST",suspectid:rowData.suspect_ID,username:username}, 
					  									function (data, textStatus){},"json"); 
					  									
					  								$("#addSuspectDialog").empty();
										 			$("#addSuspectDialog").remove();
												} else {
													$("#addSuspectDialog").empty();
										 			$("#addSuspectDialog").remove();
													alert("请先填写用户名");
												}
											
										}});
										
										$(".ui-dialog-titlebar-close").click(function(){
										 	$("#addSuspectDialog").empty();
										 	$("#addSuspectDialog").remove();
										 });
					   		},"json");
    				}});
			    ;
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
  
  <body onload="showAllSuspect();">
    <div id='right'></div>
  </body>
</html>
