//这个是superuser暂时最终版

//某一用户管理的所有嫌疑人
function showSuspect() {
	var rowid = $("#navgrid").getGridParam("selrow");   
	if(rowid==null) {
		alert("请先选择一个用户！");
		return false;
	}
	var rowData = $("#navgrid").getRowData(rowid);
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	var rightwidth	=	father.offsetWidth-13;
    var rightheight	=	father.offsetHeight;
    rightheight	=	rightheight-110;
	
	
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
   
    var editOptions={
   		 top: '150', left: "100", width: '300'  
   		 ,closeOnEscape: true, closeAfterEdit:true,
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
    
	jQuery("#navgrid").jqGrid({
        url : 'servlet/Certain_user?ID='+rowData.userid,
        mtype:'GET',
        datatype : "json",
        colNames : ['Inv No', '嫌疑人ID','嫌疑人姓名', '嫌疑人身份号','备注'],
        colModel : [{
            name : 'id',
            index : 'id',
            width : 50,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'suspect_ID',
            index : 'suspect_ID',
            width : 300,
            height:95,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'name',
            index : 'name',
            width : 360,
            height:95,
            editable : true,
            editoptions : {
            	readonly:false,
                size : 15
            }
        },{
            name : 'identity',
            index : 'identity',
            width : 360,
            height:95,
            editable : true,
            editoptions : {
            	readonly:false,
                size : 15
            }
        },{
        	name:'notes',
        	index:'notes',
        	width:500,
        	height:95,
        	editable:true,
        	edittype: "textarea",
        	editoptions : {
        		readonly : false,
        		size : 15
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : rowData.name+"的对象信息",
        editurl:"servlet/Edit_suspect",       //这里设置表更新时，要发送到的地址
        shrinkToFit:false,
        width:rightwidth,
        height : rightheight,
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav',{edit:true,add:false,del:true,search:true,refresh:true},editOptions,addOptions,delOptions).navButtonAdd("#pagernav",{caption:"返回上一级",buttonicon:"ui-icon-newwin",onClickButton:function() {
    	showUserInfo();
    }});
	
	$("#navgrid").resetSelection();
	return true;
}

function showUserInfo() {
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    var father  =   document.getElementById("right");
	var rightwidth	=	father.offsetWidth-13;
    var rightheight	=	father.offsetHeight;
    rightheight	=	rightheight-110;
    
    father.innerHTML	=	"";
    father.appendChild(table);
    father.appendChild(navpager);
    
    var editOptions={
    		 top: '150', left: "100", width: '300'  
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
    
    var addOptions={
    		top: '150', left: "100", width: '300'  
       		 ,addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
    		beforeShowForm: function(form) { 
    			 $('#userid',form).removeAttr('readonly');
    			 $('#name',form).removeAttr('readonly');
    			//$('#name', form).attr("readonly","false"); 
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
    		top: '150', left: "100", width: '300',reloadAfterSubmit: true,
    		onclickSubmit:function(params){
    			var sr = jQuery("#navgrid").getGridParam('selrow');
    			rowdata = jQuery("#navgrid").getRowData(sr);
    			//alert(params);
    			//alert(rowdata.name);
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
    
    
    var searchOptions={
    		 top: '150', left: "100", width: '300' , 
    		 caption: "Search...",
    		 Find: "Find",
    		 Reset: "Reset",
    		 odata : ['equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],
    		 groupOps: [ { op: "AND", text: "all" }, { op: "OR", text: "any" } ],
    		 matchText: " match",
    		 rulesText: " rules"
    };
    
    jQuery("#navgrid").jqGrid({
        url : 'servlet/Userinfo',
        mtype:'POST',
        datatype : "json",
        colNames : ['Inv No', '用户ID', '用户名','创建时间','用户权限'],
        colModel : [{
            name : 'id',
            index : 'id',
            width : 80,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            },
            search:true, 
            stype:'text', 
            searchoptions:{ attr:{title:'Select Date'}}
        },{
            name : 'userid',
            index : 'userid',
            width : 450,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'name',
            index : 'name',
            width : 410,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'created_time',
        	index:'created_time',
        	width:270,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'authority',
            index : 'authority',
            width : 370,
            height:90,
            editable : true,
            edittype:"select",
            editoptions:{
            	value:"admin:管理员;normal:普通用户"
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "用户信息",
        editurl:"servlet/Edit_user",       //这里设置表更新时，要发送到的地址
        shrinkToFit:false,
        width:rightwidth,
        height :rightheight,
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions,searchOptions).navButtonAdd("#pagernav",{caption:"查看嫌疑人",buttonicon:"ui-icon-newwin",onClickButton:function() {
    	showSuspect();    	
    }}).navButtonAdd("#pagernav",{caption:"修改用户密码",buttonicon:"ui-icon-newwin",onClickButton:function() {
    	var father	=	document.getElementById("right");
   		var changeInfoDialog	=	document.createElement("div");
   		changeInfoDialog.id		=	"changeInfoDialog";
   		changeInfoDialog.title	=	"修改用户密码";
   					
   		var passwordword	=	document.createElement("h3");
   		passwordword.id	=	"passwordword";
   		passwordword.innerHTML	=	"新密码";
   		var passwordinput	=	document.createElement("input");
   		passwordinput.type	=	"password";
   		passwordinput.id	=	"passwordinput";
   					
   		var passwordword2	=	document.createElement("h3");
   		passwordword2.id	=	"passwordword2";
   		passwordword2.innerHTML	=	"再次输入密码";
   		var passwordinput2	=	document.createElement("input");
   		passwordinput2.type	=	"password";
   		passwordinput2.id	=	"passwordinput2";
   					
   		changeInfoDialog.appendChild(passwordword);
   		changeInfoDialog.appendChild(passwordinput);
   		changeInfoDialog.appendChild(passwordword2);
   		changeInfoDialog.appendChild(passwordinput2);
   		father.appendChild(changeInfoDialog);
   					
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

/*function regExpRule() {
	
	var father  =   document.getElementById("right");
	father.innerHTML	=	"";
	var rightwidth	=	father.offsetWidth-13;
    var rightheight	=	father.offsetHeight;
    rightheight	=	rightheight-110;
	
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
	
    var editOptions={
    		 top: '150', left: "100", width: '300',reloadAfterSubmit: true,mtype:"GET"  
    		 ,closeOnEscape: true, closeAfterEdit:true,
    		 beforeShowForm: function(form) {              
    		 },
    		 onclickSubmit:function(params){
    			var sr = jQuery("#navgrid").getGridParam('selrow');
    			rowdata = jQuery("#navgrid").getRowData(sr);
    			//alert(params);
    			//alert(rowdata.name);
    			return {hideid:rowdata.hideid};
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
    		top: '150', left: "100", width: '300'  
       		 ,addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
    		beforeShowForm: function(form) { 
    			 $('#userid',form).removeAttr('readonly');
    			 $('#name',form).removeAttr('readonly');
    			//$('#name', form).attr("readonly","false"); 
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
    		top: '150', left: "100", width: '300',reloadAfterSubmit: true,
    		onclickSubmit:function(params){
    			var sr = jQuery("#navgrid").getGridParam('selrow');
    			rowdata = jQuery("#navgrid").getRowData(sr);
    			//alert(params);
    			//alert(rowdata.name);
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
    

    jQuery("#navgrid").jqGrid({
        url : 'servlet/Matchruleinfo',
        mtype:'GET',
        datatype : "json",
        colNames : ['hidediskid','hideid','No.','类型名称','提取规则'],
        colModel : [{
            name : 'hidediskid',
            index : 'hidediskid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'hideid',
            index : 'hideid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:60,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'typename',
            index : 'typename',
            width:350,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'rule',
        	index:'rule',
        	width:650,
        	editable:true,
        	editoptions : {
        		readonly :false,
        		size : 10
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "模糊匹配规则查看",
        editurl:"servlet/Edit_Matchruleinfo",       //这里设置表更新时，要发送到的地址
        shrinkToFit:false,
        width:rightwidth,
        height :rightheight,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:true,add:false,del:false,search:true,refresh:true},editOptions,null,null).navButtonAdd("#pagernav",{caption:"修改规则",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		var sel	=	$("#navgrid").getGridParam("selrow");
   		var rowdata	=	$("#navgrid").getRowData(sel);
   		alert(rowdata.hideid);
   }});
   
   
   $("#navgrid").navButtonAdd("#pagernav",{caption:"修改规则",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		var father	=	document.getElementById("right");

   		var sel	=	$("#navgrid").getGridParam("selrow");
   		var rowdata	=	$("#navgrid").getRowData(sel);
   		/*
   		if(rowdata.typename=="QQ号") {
   			var removeid	=	document.getElementById("rulechange");
   			if(removeid!=null) {
   				$("#rulechange").remove();
   			}
   			var rulechange	=	document.createElement("div");
   			rulechange.id	=	"rulechange";
   			rulechange.title	=	"QQ号";
   			
   			var formdiv	=	document.createElement("div");
   			formdiv.id	=	"formdiv";
   			var qqform	=	document.createElement("form");

   			var qqMaxdiv	=	document.createElement("div");
   			qqMaxdiv.id	=	"qqMaxdiv";
   			var qqMaxword	=	document.createElement("div");
   			qqMaxword.id	=	"qqMaxword";
   			qqMaxword.innerHTML	=	"QQ位数上限";
   			var qqMax	=	document.createElement("input");
   			qqMax.id	=	"qqMax";
   			qqMax.type	=	"text";
   			qqMaxdiv.appendChild(qqMaxword);
   			qqMaxdiv.appendChild(qqMax);
   			
   			var qqMindiv	=	document.createElement("div");
   			qqMindiv.id	=	"qqMindiv";
   			var qqMinword	=	document.createElement("div");
   			qqMinword.id	=	"qqMinword";
   			qqMinword.innerHTML	=	"QQ位数下限";
   			var qqMin	=	document.createElement("input");
   			qqMin.id	=	"qqMin";
   			qqMin.type	=	"text";
   			qqMindiv.appendChild(qqMinword);
   			qqMindiv.appendChild(qqMin);
   			
   			var qqStartNodiv	=	document.createElement("div");
   			qqStartNodiv.id	=	"qqStartNodiv";
   			var qqStartNoword	=	document.createElement("div");
   			qqStartNoword.id	=	"qqStartNoword";
   			qqStartNoword.innerHTML	=	"起始数字";
   			var qqStartNo	=	document.createElement("input");
   			qqStartNo.id	=	"qqStartNo";
   			qqStartNo.type	=	"text";
   			qqStartNodiv.appendChild(qqStartNoword);
   			qqStartNodiv.appendChild(qqStartNo);
   			
   			var qqButton	=	document.createElement("input");
   			qqButton.id	=	"qqButton";
   			qqButton.type	=	"Submit";
   			qqButton.value	=	"确认";
   			
   			var qqCancel	=	document.createElement("input");
   			qqCancel.id	=	"qqCancel";
   			qqCancel.type	=	"Button";
   			qqCancel.value	=	"取消";
   			
   			qqform.appendChild(qqMaxdiv);
   			qqform.appendChild(qqMindiv);
   			qqform.appendChild(qqStartNodiv);
   			qqform.appendChild(qqButton);
   			qqform.appendChild(qqCancel);
   			formdiv.appendChild(qqform);
   			
   			rulechange.appendChild(formdiv);
   			
   			father.appendChild(rulechange);
   			$("#rulechange").dialog({width:400,height:300,show:'slide'});
   			
   			
   			//注意，必须所有都append到最后的father后，再修改css,否则没效果
   			$("#formdiv").css("float","left");
   			$("#formdiv").css("width","350px");
   			$("#formdiv").css("height","200px");
   			$("#formdiv").css("margin-left","10px");
   			$("#formdiv").css("margin-top","5px");

   			$("#qqMaxdiv").css("float","left");
   			$("#qqMaxdiv").css("width","340px");
   			$("#qqMaxdiv").css("height","40px");
   			$("#qqMaxdiv").css("margin-left","0px");
   			$("#qqMaxdiv").css("margin-top","3px");
   			
   			$("#qqMaxword").css("float","left");
   			$("#qqMaxword").css("width","130px");
   			$("#qqMaxword").css("height","35px");
   			$("#qqMaxword").css("margin-left","0px");
   			$("#qqMaxword").css("margin-top","0px");
   			$("#qqMaxword").css("font-family","黑体");
   			$("#qqMaxword").css("font-size","20px");
   			$("#qqMaxword").css("padding-top","4px");
   			
   			$("#qqMax").css("float","left");
   			$("#qqMax").css("width","170px");
   			$("#qqMax").css("height","30px");
   			$("#qqMax").css("margin-left","5px");
   			$("#qqMax").css("margin-top","0px");
   			
   			$("#qqMindiv").css("float","left");
   			$("#qqMindiv").css("width","340px");
   			$("#qqMindiv").css("height","40px");
   			$("#qqMindiv").css("margin-left","0px");
   			$("#qqMindiv").css("margin-top","8px");
   			
   			$("#qqMinword").css("float","left");
   			$("#qqMinword").css("width","130px");
   			$("#qqMinword").css("height","35px");
   			$("#qqMinword").css("margin-left","0px");
   			$("#qqMinword").css("margin-top","0px");
   			$("#qqMinword").css("font-family","黑体");
   			$("#qqMinword").css("font-size","20px");
   			$("#qqMinword").css("padding-top","4px");
   			
   			$("#qqMin").css("float","left");
   			$("#qqMin").css("width","170px");
   			$("#qqMin").css("height","30px");
   			$("#qqMin").css("margin-left","5px");
   			$("#qqMin").css("margin-top","0px");
   			
   			
   			$("#qqStartNodiv").css("float","left");
   			$("#qqStartNodiv").css("width","340px");
   			$("#qqStartNodiv").css("height","40px");
   			$("#qqStartNodiv").css("margin-left","0px");
   			$("#qqStartNodiv").css("margin-top","8px");
   			
   			$("#qqStartNoword").css("float","left");
   			$("#qqStartNoword").css("width","130px");
   			$("#qqStartNoword").css("height","35px");
   			$("#qqStartNoword").css("margin-left","0px");
   			$("#qqStartNoword").css("margin-top","0px");
   			$("#qqStartNoword").css("font-family","黑体");
   			$("#qqStartNoword").css("font-size","20px");
   			$("#qqStartNoword").css("padding-top","4px");
   			
   			$("#qqStartNo").css("float","left");
   			$("#qqStartNo").css("width","170px");
   			$("#qqStartNo").css("height","30px");
   			$("#qqStartNo").css("margin-left","5px");
   			$("#qqStartNo").css("margin-top","0px");
   			
   			$("#qqButton").css("clear","both");
   			$("#qqButton").css("float","left");
   			$("#qqButton").css("width","120px");
   			$("#qqButton").css("height","40px");
   			$("#qqButton").css("margin-left","40px");
   			$("#qqButton").css("margin-top","20px");
   			
   			
   			$("#qqCancel").css("float","left");
   			$("#qqCancel").css("width","120px");
   			$("#qqCancel").css("height","40px");
   			$("#qqCancel").css("margin-left","30px");
   			$("#qqCancel").css("margin-top","20px");  
   		
   			$("#qqButton").button();
   			$("#qqCancel").button();	
   			
   			
   			
   		} else if(rowdata.typename=="手机号") {
   			var removeid	=	document.getElementById("rulechange");
   			if(removeid!=null) {
   				$("#rulechange").remove();
   			}
   			var rulechange	=	document.createElement("div");
   			rulechange.id	=	"rulechange";
   			rulechange.title	=	"手机号";
   			
   			var formdiv	=	document.createElement("div");
   			formdiv.id	=	"formdiv";
   			var phoneform	=	document.createElement("form");
			
   			
   			var headNodiv	=	document.createElement("div");
   			headNodiv.id	=	"headNodiv";
   			var headNoword	=	document.createElement("div");
   			headNoword.id	=	"headNoword";
   			headNoword.innerHTML	=	"手机号前3位";
   			var headNo	=	document.createElement("input");
   			headNo.id	=	"headNo";
   			headNo.type	=	"text";
   			headNodiv.appendChild(headNoword);
   			headNodiv.appendChild(headNo);
   			
   			var tailNodiv	=	document.createElement("div");
   			tailNodiv.id	=	"tailNodiv";
   			var tailNoword	=	document.createElement("div");
   			tailNoword.id	=	"tailNoword";
   			tailNoword.innerHTML	=	"手机号后4位";
   			var tailNo	=	document.createElement("input");
   			tailNo.id	=	"tailNo";
   			tailNodiv.appendChild(tailNoword);
   			tailNodiv.appendChild(tailNo);
   			
   			var phoneButton	=	document.createElement("input");
   			phoneButton.id	=	"phoneButton";
   			phoneButton.type	=	"Submit";
   			phoneButton.value	=	"确认";
   			
   			var phoneCancel	=	document.createElement("input");
   			phoneCancel.id	=	"phoneCancel";
   			phoneCancel.type	=	"Button";
   			phoneCancel.value	=	"取消";
   			
   			phoneform.appendChild(headNodiv);
   			phoneform.appendChild(tailNodiv);
   			phoneform.appendChild(phoneButton);
   			phoneform.appendChild(phoneCancel);
   			
   			formdiv.appendChild(phoneform);
   			
   			rulechange.appendChild(formdiv);
   			
   			father.appendChild(rulechange);
   			$("#rulechange").dialog({width:400,height:300,show:'slide'});
   			//注意，必须所有都append到最后的father后，再修改css,否则没效果
   			$("#formdiv").css("float","left");
   			$("#formdiv").css("width","350px");
   			$("#formdiv").css("height","200px");
   			$("#formdiv").css("margin-left","10px");
   			$("#formdiv").css("margin-top","5px");
   			
   			$("#headNodiv").css("float","left");
   			$("#headNodiv").css("width","340px");
   			$("#headNodiv").css("height","40px");
   			$("#headNodiv").css("margin-left","0px");
   			$("#headNodiv").css("margin-top","3px");
   			//$("#qqMaxdiv").css("background","blue");
   			
   			$("#headNoword").css("float","left");
   			$("#headNoword").css("width","130px");
   			$("#headNoword").css("height","35px");
   			$("#headNoword").css("margin-left","0px");
   			$("#headNoword").css("margin-top","0px");
   			//$("#qqMaxword").css("background","green");
   			$("#headNoword").css("font-family","黑体");
   			$("#headNoword").css("font-size","20px");
   			$("#headNoword").css("padding-top","4px");
   			
   			$("#headNo").css("float","left");
   			$("#headNo").css("width","170px");
   			$("#headNo").css("height","30px");
   			$("#headNo").css("margin-left","5px");
   			$("#headNo").css("margin-top","0px");
   			//$("#qqMax").css("background","red");
   			
   			$("#tailNodiv").css("float","left");
   			$("#tailNodiv").css("width","340px");
   			$("#tailNodiv").css("height","40px");
   			$("#tailNodiv").css("margin-left","0px");
   			$("#tailNodiv").css("margin-top","8px");
   			//$("#qqMindiv").css("background","blue");
   			
   			$("#tailNoword").css("float","left");
   			$("#tailNoword").css("width","130px");
   			$("#tailNoword").css("height","35px");
   			$("#tailNoword").css("margin-left","0px");
   			$("#tailNoword").css("margin-top","0px");
   			//$("#qqMaxword").css("background","green");
   			$("#tailNoword").css("font-family","黑体");
   			$("#tailNoword").css("font-size","20px");
   			$("#tailNoword").css("padding-top","4px");
   			
   			$("#tailNo").css("float","left");
   			$("#tailNo").css("width","170px");
   			$("#tailNo").css("height","30px");
   			$("#tailNo").css("margin-left","5px");
   			$("#tailNo").css("margin-top","0px");
   			
   			$("#phoneButton").css("clear","both");
   			$("#phoneButton").css("float","left");
   			$("#phoneButton").css("width","120px");
   			$("#phoneButton").css("height","40px");
   			$("#phoneButton").css("margin-left","40px");
   			$("#phoneButton").css("margin-top","20px");
   			
   			
   			$("#phoneCancel").css("float","left");
   			$("#phoneCancel").css("width","120px");
   			$("#phoneCancel").css("height","40px");
   			$("#phoneCancel").css("margin-left","30px");
   			$("#phoneCancel").css("margin-top","20px");  
   		
   			$("#phoneButton").button();
   			$("#phoneCancel").button();
   		}
   		
   		
   }});
   
   var data =	[{'hidediskid':'sdjfk;asdjfkasdf','hideid':'dsjkfj;asdjf','id':'1','typename':'QQ号','rule':'最高位数：8位，最低位数7位 ，起始数字：8'},
   				 {'hidediskid':'sdjfk;asdjfkasdf','hideid':'dsjkfj;asdjf','id':'2','typename':'手机号','rule':'前三位：135，后四位：1433'}];
   $("#navgrid").jqGrid('addRowData',1,data[0]);
   $("#navgrid").jqGrid('addRowData',2,data[1]);
	
}*/

function showAllSuspect() {
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	var rightwidth	=	father.offsetWidth-13;
    var rightheight	=	father.offsetHeight;
    rightheight	=	rightheight-110;
	
	
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
   
    var editOptions={
   		 top: '150', left: "100", width: '300'  
   		 ,closeOnEscape: true, closeAfterEdit:true,
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
   		top: '150', left: "100", width: '300'  
      		 ,addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
      	onclickSubmit:function(params){
       			return {managerid:null};
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
    
	jQuery("#navgrid").jqGrid({
        url : 'servlet/ShowAllSuspect',
        mtype:'GET',
        datatype : "json",
        colNames : ['Inv No', '嫌疑人ID','嫌疑人姓名', '嫌疑人身份号','备注'],
        colModel : [{
            name : 'id',
            index : 'id',
            width : 50,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'suspect_ID',
            index : 'suspect_ID',
            hidden:true,
            width : 300,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'name',
            index : 'name',
            width : 360,
            height:95,
            editable : true,
            editoptions : {
            	readonly:false,
                size : 15
            }
        },{
            name : 'identity',
            index : 'identity',
            width : 360,
            height:95,
            editable : true,
            editoptions : {
            	readonly:false,
                size : 15
            }
        },{
        	name:'notes',
        	index:'notes',
        	width:500,
        	height:95,
        	editable:true,
        	edittype: "textarea",
        	editoptions : {
        		readonly : false,
        		size : 15
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "嫌疑人信息",
        editurl:"servlet/Edit_suspect",       //这里设置表更新时，要发送到的地址
        shrinkToFit:false,
        width:rightwidth,
        height : rightheight,
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions).navButtonAdd("#pagernav",{caption:"分配嫌疑人",buttonicon:"ui-icon-newwin",onClickButton:function() {
    	var rowid = $("#navgrid").getGridParam("selrow");   
		if(rowid==null) {
			alert("请先选择一个嫌疑人！");
			return false;
		}
		var rowData = $("#navgrid").getRowData(rowid); 
    	
    	
    	$.post("servlet/ShowAllUser", {Action:"POST"}, 
  				function (data, textStatus){ 
  					//alert(data.rows.length);
  					var allusers	=	new Array();
					for(var i=0; i<data.rows.length; i++) {
						//alert(data.rows[i].name);
						allusers.unshift(data.rows[i].name);
					}
					//alert(allusers.toString());
					
					
  					
  					var father	=	document.getElementById("right");
  					var addDialog	=	document.createElement("div");
  					addDialog.id	=	"addSuspectDialog";
  					addDialog.title	=	"分配嫌疑人";
  					
  					var addDialogword	=	document.createElement("h2");
  					addDialogword.id	=	"addSuspectDialogword";
  					addDialogword.innerHTML	=	"用户名";
  					
  					var addDialogtext	=	document.createElement("input");
  					addDialogtext.id	=	"addSuspectDialogtext";
  					addDialog.appendChild(addDialogword);
  					addDialog.appendChild(addDialogtext);
  					father.appendChild(addDialog);
  					
  					$("#addSuspectDialogword").css("font-weight","bold");
  					$("#addSuspectDialogtext").css("float","left");
  					$("#addSuspectDialogtext").css("margin-top","20px");
  					$("#addSuspectDialogtext").css("margin-left","30px");
  					$("#addSuspectDialogtext").css("height","35px");
  					$("#addSuspectDialogtext").css("width","300px");
  					$("#addSuspectDialogtext").css("font-size","30px");
  					
  					$("#addSuspectDialog").dialog({width:400,height:250,show:'clip',modal: true,
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
					//.ui-autocomplete { height: 200px; overflow-y: scroll; overflow-x: hidden;}
					$(".ui-autocomplete").css("height","100px");
					$(".ui-autocomplete").css("overflow-y","scroll");
					$(".ui-autocomplete").css("overflow-x","hidden");
						
					//$( "#addSuspectDialogtext" ).autocomplete( "option", "position", { my : "right top", at: "right left" } );
						
						
					$('#addSuspectDialog').dialog('option', 'buttons', { "确认": function() {
							var username	=	$("#addSuspectDialogtext").val();
							if(username!="") {
								$.post("servlet/InsertSuspect", {Action:"POST",suspectid:rowData.suspect_ID,username:username}, 
  									function (data, textStatus){
  										
  									},"json"); 
  									
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
}


/*function fileClassifyRule(whichclass) {
	$("#hidemenu").fadeOut();
	
	var father  =   document.getElementById("right");
	father.innerHTML	=	"";
	var rightwidth	=	father.offsetWidth-13;
    var rightheight	=	father.offsetHeight;
    rightheight	=	rightheight-110;
	
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
	
    jQuery("#navgrid").jqGrid({
        url : 'servlet/ClassifyRuleinfo?class='+whichclass,
        mtype:'GET',
        datatype : "json",
        colNames : ['hideclassid','No.','规则大类','规则信息'],
        colModel : [{
            name : 'classid',
            index : 'classid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'ruleid',
            index : 'ruleid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:60,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'rulename',
            index : 'rulename',
            width:350,
            editable : false,
            editoptions : {
            	readonly : true,
                size : 20
            }
        },{
        	name:'ruleinfo',
        	index:'ruleinfo',
        	width:650,
        	editable:false,
        	editoptions : {
        		readonly :true,
        		size : 10
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "文件分类规则",
        editurl:"",       //这里设置表更新时，要发送到的地址
        shrinkToFit:false,
        width:rightwidth,
        height :rightheight,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:true,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"修改规则",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		
   		
   }});
}*/

function showClassMain() {
	$("#right").bind('resize', function() {
				$("#navgrid").setGridWidth($("#right").width());
				/*$("#navgrid").setGridHeight(getGridHeight());*/
		});
	
	/*$("<div id='mainClassArea'></div>").appendTo($("#right"));*/
	$("<div id='mainClassArea'></div>").insertBefore($("#left")); 

	$("#mainClassArea").animate({width:$("#right").width()-851+'px'},2000);
	var timer	=	setInterval("$('#right').trigger('resize')",3);
	$("#right").animate({width:"850px"},2000);

	var animateTimer=	setInterval(isAnimate,3);
	function isAnimate() {
		if(!$("#right").is(":animated")) {
			/*clearInterval(timer);*/
			clearInterval(animateTimer);
			fillClassMain();
		}
	}	
	
	
}

function addClass() {
	$("<div id='addClassDialog' title='增加类别'></div>").appendTo($("#maincontent"));
	$("<h3>类别名称</h3><input id='newClassName' name='newClassName'/>").appendTo($("#addClassDialog"));
	$("<input type='button' id='addClassSubmit' name='addsubmit' value='增加' />").appendTo($("#addClassDialog"));
	$("#addClassDialog").dialog({show:'clip',modal: true,
								   overlay: {opacity: 0.5, background: "green"},
								  /* buttons: {
                    			   "确认":function() {
                    			   		  addClassSubmit();
                    					}
                    			   },*/
								   beforeClose: function(event, ui) {
   											$("#addClassDialog").empty();
   											$("#addClassDialog").remove();
   									}});
   	$("#addClassSubmit").click(function() {
   		var newMainClassName	=	$("#newClassName").val();
    	if(newMainClassName != '') {
    		syncAjaxPost("servlet/ManipulMainClass",{manOper:"add",newMainClassName:newMainClassName});
    	}			                 			   		
    	$("#addClassDialog").empty().remove();
    	refreshClassMain();
   	});
}

function delClass(delId) {
    var delClassId	=	delId;
	var delFunc	=	function() {
		syncAjaxPost("servlet/ManipulMainClass",{manOper:"del",delClassId:delClassId});		
		refreshClassMain();
	};
	confirmMessage("确认要删除该类？",delFunc);
}

function refreshClassMain() {
	$("#mainClassArea").empty();
	fillClassMain();
}

function removeClassMain() {
	$("#mainClassArea").empty();
	$("#mainClassArea").animate({width:'0px'},2000);
	var timer	=	setInterval("$('#right').trigger('resize')",3);
	$("#right").animate({width:"1100px"},2000);

	var animateTimer=	setInterval(isAnimate,3);
	function isAnimate() {
		if(!$("#right").is(":animated")) {
			/*clearInterval(timer);*/
			clearInterval(animateTimer);
			$("#mainClassArea").remove();
		}
	}	
}

function fillClassMain() {
	$("<div id='controlClass'></div>").appendTo($("#mainClassArea"));	
	$("<div id='addClassButton' onclick='addClass()'>增加</div>").appendTo($("#controlClass"));
	$("<div id='cancelClassButton' onclick='removeClassMain()'>返回</div>").appendTo($("#controlClass"));
	
	var mainClassStr	=	syncAjaxPost("servlet/GetMainClassThruAjax",{});
	var mainClassObj	=	JSON.parse(mainClassStr);
	var mainClassArray	=	mainClassObj.classlist;
	for(var i=0; i<mainClassArray.length; i++) {
		var classObj	=	mainClassArray[i];
		$("<div class='fileClass' id='"+classObj.classId+"'>"+classObj.className+"<div class='delX' style='display:block;float:right;border:1px solid skyblue;'>-x-</div></div>").appendTo($("#mainClassArea"));
	}
	
	$(".fileClass").click(function() {
		showFileClassRule($(this).attr("id"));
	});
	$(".delX").click(function(event) {
		delClass($(this).parent(".fileClass").attr("id"));
		event.stopPropagation();
	});
	
}

function showFileClassRule(mainClassId) {
	$("#right").empty();
	$("#right").append($("<table id='navgrid'></table>")).append($("<div id='pagernav'></div>"));
	var gridheight	=	getGridHeight();
  	var colNames	=	['hideClassRuleId','No.','分类规则','所属大类'];
  	var colModel	=	[{name : 'classRuleId',index : 'classRuleId',width:20,height:90,hidden:true,editable : false},
  						 {name : 'id',index : 'id',width:50,height:90,editable : false},
  						 {name : 'classifyRule',index : 'classifyRule',width:350,height:90,editable : false},
  						 {name : 'mainClassName',index : 'mainClassName',height:90,width:400,editable : false}];
	
	assembleGrid($("#navgrid"),'servlet/ClassRule', 'POST', {page:'1',mainClassId:mainClassId}, '#pagernav','分类信息', '', $("#right").width(), gridheight, colNames, colModel, false, true)
  	.navGrid('#pagernav',{edit:false,add:true,del:true,search:true,refresh:true},{},{},{},{});
}