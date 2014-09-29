<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'userManage.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
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
		function showSuspect() {
				var rowid = $("#navgrid").getGridParam("selrow");   
				if(rowid==null) {
					alert("请先选择一个用户！");
					return false;
				}
				var rowData = $("#navgrid").getRowData(rowid);
				$("#right").empty();
				$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
			   
			    var editOptions={
			   		 top: '150', left: "100", width: '300'  
			   		 ,closeOnEscape: true, closeAfterEdit:true,mtype:"POST",
			   		onclickSubmit:function(params){
			   			var sr = jQuery("#navgrid").getGridParam('selrow');
			   			rowdata = jQuery("#navgrid").getRowData(sr);
			   			return {oldid:rowdata.suspect_ID};
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
			   };
			   
			   
			   var delOptions={
			   		top: '150', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST",
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
		    var colNames	=	["No", "嫌疑人ID","嫌疑人姓名", "嫌疑人身份号","备注"];
		  	var colModel	=	[{name : "id",index : "id",width : 60,editable : false,editoptions : {readonly : true,size : 10}},
		  	 					 {name : "suspect_ID",index : "suspect_ID",hidden:true,editable : false,editoptions : {readonly : true,size : 10}},
		  	 					 {name : "name",index : "name",width : 210,editable : true,editoptions : {readonly:false,size : 15}},
		  	 					 {name : "identity",index : "identity",width : 310,editable : true,editoptions : {readonly:false,size : 15}},
		  	 					 {name:"notes",index:"notes",width:590,editable:true,edittype: "textarea",editoptions : {readonly : false,size : 15}}];
			assembleGrid($("#navgrid"),"servlet/Certain_user", "GET", {ID:rowData.userid,page:"1"}, "#pagernav","", "servlet/Edit_suspect", "1200px", "409px", colNames, colModel, false, false)
			.navGrid("#pagernav",{edit:true,add:false,del:true,search:true,refresh:true},editOptions,addOptions,delOptions).navButtonAdd("#pagernav",{caption:"返回上一级",buttonicon:"ui-icon-newwin",onClickButton:function() {
			    	showUserInfo();
			 }});
			$("#navgrid").resetSelection();
			return true;
		}
	
	
	
		function showUserInfo() {
			$("#right").empty();
			$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
		
			  var editOptions={
    		 top: "10", left: "100", width: '300'  
    		 ,closeOnEscape: true, closeAfterEdit:true,
    		 beforeShowForm: function(form) { 
    			 $('#userid',form).attr('readonly','readonly');
    			 $('#name',form).attr('readonly','readonly');
                
    		 },
    		 afterSubmit:function(response, postdata) {
    			 var success =	true;
    			 var message = "";
    			 
    			 jQuery("#navgrid").trigger("reloadGrid");
    			 var new_id	=	"1";
    			 return [success,message,new_id] ;
    		 }
    };
    
		    var addOptions={top: "10", left: "100", width: '300'  
		       		 ,addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
		    		beforeShowForm: function(form) { 
		    			 $("#userid",form).removeAttr("readonly");
		    			 $("#name",form).removeAttr("readonly");
		    		},
		    		afterSubmit:function(response, postdata) {
		   			 var success =	true;
		   			 var message = "";
		   			 
		   			 jQuery("#navgrid").trigger("reloadGrid");
		   			 var new_id	=	"1";
		   			 return [success,message,new_id] ;
		   		 }
		    };
		    
		    
		    var delOptions={
		    		top: "10", left: "100", width: '300',reloadAfterSubmit: true,
		    		onclickSubmit:function(params){
		    			var sr = jQuery("#navgrid").getGridParam("selrow");
		    			rowdata = jQuery("#navgrid").getRowData(sr);
		    			return {name:rowdata.name};
		    		},
		    		afterSubmit:function(response, postdata) {
		   			 var success =	true;
		   			 var message = "";
		   			 
		   			 jQuery("#navgrid").trigger("reloadGrid");
		   			 var new_id	=	"1";
		   			 return [success,message,new_id] ;
		   		 }
		    };
		    //1080width
			var searchOptions	=	{};
			var colNames	=	["No", "用户ID", "用户名", "创建时间","用户权限" ];
		  	var colModel	=	[ {name : "id",index : "id",width : 55,editable : false,editoptions : {readonly : true,size : 10}},
								  {name : "userid",index : "userid",hidden : true,editable : false,editoptions : {readonly : true,size : 20}}, 
								  {name : "name",index : "name",width : 415,editable : true,editoptions : {readonly : false,size : 20}},
								  {name : "created_time",index : "created_time",width : 300,editable : false,editoptions : {readonly : true,size : 10}}, 
								  {name : "authority",index : "authority",width : 310,editable : true,edittype : "select",editoptions : {value : "admin:管理员;normal:普通用户"}}];
			assembleGrid($("#navgrid"),"servlet/Userinfo", "POST", {page:"1"}, "#pagernav","", "servlet/Edit_user", "1200px", "409px", colNames, colModel, false, false)
			.navGrid('#pagernav',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions,searchOptions).navButtonAdd("#pagernav",{caption:"查看嫌疑人",buttonicon:"ui-icon-newwin",onClickButton:function() {
    				showSuspect();    	
    		}})
    		.navButtonAdd("#pagernav",{caption:"修改用户密码",buttonicon:"ui-icon-newwin",onClickButton:function() {
    			$("<div id='changeInfoDialog' title='修改用户密码'></div>").appendTo($("#right"));
    			$("<h4 id='passwordword'>新密码</h4>").appendTo($("#changeInfoDialog"));
    			$("<input type='password' id='passwordinput'/>").appendTo($("#changeInfoDialog"));
    			$("<h4 id='passwordword2'>再次输入密码</h4>").appendTo($("#changeInfoDialog"));
    			$("<input type='password' id='passwordinput2'/>").appendTo($("#changeInfoDialog"));

   					$("#changeInfoDialog").dialog({width:250,height:430,show:'clip',modal: true,
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
   							$.post("servlet/AjaxChangePassword", { Action: "POST",password:firstpasswd,username:username},
   								function (data, textStatus){
   									eval("var newdata="+data.toString());
   									alert(newdata.message);
   							}); 
   							$("#changeInfoDialog").empty();
   							$("#changeInfoDialog").remove();
   						}
					}});
					$( "#changeInfoDialog").dialog({
   						beforeClose: function(event, ui) {
   							$("#changeInfoDialog").empty();
   							$("#changeInfoDialog").remove();
   						}
					});
	}});
		}
	</script>
		<style type='text/css'>
			html ,body {
				padding:0px;
				margin:0px;
				over-flow:hidden;
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
  
  <body onload="showUserInfo();">
    <div id='right'></div>
  </body>
</html>
