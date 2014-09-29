function certain_user() {
	var rowid = $("#navgrid").getGridParam("selrow");   
	if(rowid==null) {
		alert("请先选择一个用户！");
		//$(".content").css("background","url(/animateEdition/css/superuser/resources/sky-bg.jpg)");
		var tmpinfo	=	document.getElementById("suspectinf");
	    tmpinfo.innerHTML	=	"";
	    tmpinfo	=	document.getElementById("ruleManage");
		tmpinfo.innerHTML	=	"";
		return false;
	}
	
	var tmpinfo	=	document.getElementById("suspectinf");
	tmpinfo.innerHTML	=	"";
	//$(".content").css("background","rgba(255,255,255, 0.3)");
	
	var rowData = $("#navgrid").getRowData(rowid); 
	document.getElementById("username").innerHTML	=	"Selected:"+rowData.name;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav2";
    table.id    =   "navgrid2";
    var father  =   document.getElementById("suspectinf");
    father.appendChild(table);
    father.appendChild(navpager);
    $("#suspectinf").css("margin-left","80px");
	$("#suspectinf").css("margin-top","0px");
    
    /*var tmpinfo	=	document.getElementById("sel_info");
    tmpinfo.innerHTML	=	"您当前选择的用户是："+rowData.name;
    */
    var editOptions={
   		 top: '150', left: "100", width: '300'  
   		 ,closeOnEscape: true, closeAfterEdit:true,
   		onclickSubmit:function(params){
   			var sr = jQuery("#navgrid2").getGridParam('selrow');
   			rowdata = jQuery("#navgrid2").getRowData(sr);
   			return {oldid:rowdata.suspect_ID};
   		},
   		 beforeShowForm: function(form) { 
   		 },
   		 afterSubmit:function(response, postdata) {
   			 var success =	true;
   			 var message = "";
   			 jQuery("#navgrid2").trigger("reloadGrid");
   			 var new_id	=	"1";
   			 return [success,message,new_id] ;
   		 }
   };
   
   var addOptions={
   		top: '150', left: "100", width: '300'  
      		 ,addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
      	onclickSubmit:function(params){
       			return {managerid:rowData.userid};
       		},
   		beforeShowForm: function(form) {
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid2").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
   
   
   var delOptions={
   		top: '150', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST",
   		onclickSubmit:function(params){
   			var sr = jQuery("#navgrid2").getGridParam('selrow');
   			rowdata = jQuery("#navgrid2").getRowData(sr);
   			return {suspectid:rowdata.suspect_ID};
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid2").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
    
	jQuery("#navgrid2").jqGrid({
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
            width : 250,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'name',
            index : 'name',
            width : 100,
            height:95,
            editable : true,
            editoptions : {
            	readonly:false,
                size : 15
            }
        },{
            name : 'identity',
            index : 'identity',
            width : 100,
            height:95,
            editable : true,
            editoptions : {
            	readonly:false,
                size : 15
            }
        },{
        	name:'notes',
        	index:'notes',
        	width:300,
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
        pager : '#pagernav2',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "嫌疑人信息",
        editurl:"servlet/Edit_suspect",       //这里设置表更新时，要发送到的地址
        height : "375px",
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav2',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions);
	
	$("#navgrid").resetSelection();
	return true;
}





function user_manage() {
	//$(".content").css("background","rgba(255,255,255, 0.3)");
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    var father  =   document.getElementById("userinf");
    father.innerHTML	=	"";
    father.appendChild(table);
    father.appendChild(navpager);
    $("#userinf").css("margin-left","100px");
	$("#userinf").css("margin-top","0px");
   /*
    var tmpinfo	=	document.getElementById("userinf");
    tmpinfo.innerHTML	=	"";
    */
   
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
            width : 60,
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
            width : 250,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'name',
            index : 'name',
            width : 150,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'created_time',
        	index:'created_time',
        	width:150,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'authority',
            index : 'authority',
            width : 140,
            height:90,
            editable : true,
            edittype:"select",
            editoptions:{
            	value:"admin:管理员;normal:普通用户"
            }
        }],
        rowNum : 10,
        rowList : [10, 20, 30],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "用户信息",
        editurl:"servlet/Edit_user",       //这里设置表更新时，要发送到的地址
        height :"375px",
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions,searchOptions);

}



function ruleView() {
	var rowid = $("#navgrid").getGridParam("selrow"); 
	var tmpinfo	=	null;
	if(rowid==null) {
		alert("请先选择一个用户！");
		//$(".content").css("background","url(/animateEdition/css/superuser/resources/sky-bg.jpg)");
		tmpinfo	=	document.getElementById("suspectinf");
	    tmpinfo.innerHTML	=	"";
	    tmpinfo	=	document.getElementById("ruleManage");
		tmpinfo.innerHTML	=	"";
		return false;
	}
	
	tmpinfo	=	document.getElementById("ruleManage");
	tmpinfo.innerHTML	=	"";
	
	var father  =   document.getElementById("ruleManage");
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernavRuleManage";
    table.id    =   "navgridRuleManage";
    father.appendChild(table);
    father.appendChild(navpager);
    
    $("#ruleManage").css("margin-left","100px");
	$("#ruleManage").css("margin-top","0px");
	
    jQuery("#navgridRuleManage").jqGrid({
        url : '',
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
            width:240,
            editable : false,
            editoptions : {
            	readonly : true,
                size : 20
            }
        },{
        	name:'rule',
        	index:'rule',
        	width:450,
        	editable:false,
        	editoptions : {
        		readonly :true,
        		size : 10
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernavRuleManage',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "规则查看",
        editurl:"",       //这里设置表更新时，要发送到的地址
        height :"375px",
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernavRuleManage',{edit:false,add:false,del:false,search:false,refresh:true}).navButtonAdd("#pagernavRuleManage",{caption:"修改规则",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		var father	=	document.getElementById("ruleManage");

   		var sel	=	$("#navgridRuleManage").getGridParam("selrow");
   		var rowdata	=	$("#navgridRuleManage").getRowData(sel);
   		
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
   			$("#rulechange").dialog({width:380,height:300,show:'slide'});
   			
   			
   			//注意，必须所有都append到最后的father后，再修改css,否则没效果
   			$("#formdiv").css("float","left");
   			$("#formdiv").css("width","350px");
   			$("#formdiv").css("height","200px");
   			$("#formdiv").css("margin-left","10px");
   			$("#formdiv").css("margin-top","5px");
   			//$("#formdiv").css("background","yellow");
   			
   			
   			
   			
   			$("#qqMaxdiv").css("float","left");
   			$("#qqMaxdiv").css("width","340px");
   			$("#qqMaxdiv").css("height","40px");
   			$("#qqMaxdiv").css("margin-left","0px");
   			$("#qqMaxdiv").css("margin-top","3px");
   			//$("#qqMaxdiv").css("background","blue");
   			
   			$("#qqMaxword").css("float","left");
   			$("#qqMaxword").css("width","130px");
   			$("#qqMaxword").css("height","35px");
   			$("#qqMaxword").css("margin-left","0px");
   			$("#qqMaxword").css("margin-top","0px");
   			//$("#qqMaxword").css("background","green");
   			$("#qqMaxword").css("font-family","黑体");
   			$("#qqMaxword").css("font-size","20px");
   			$("#qqMaxword").css("padding-top","4px");
   			
   			$("#qqMax").css("float","left");
   			$("#qqMax").css("width","170px");
   			$("#qqMax").css("height","30px");
   			$("#qqMax").css("margin-left","5px");
   			$("#qqMax").css("margin-top","0px");
   			//$("#qqMax").css("background","red");
   			
   			$("#qqMindiv").css("float","left");
   			$("#qqMindiv").css("width","340px");
   			$("#qqMindiv").css("height","40px");
   			$("#qqMindiv").css("margin-left","0px");
   			$("#qqMindiv").css("margin-top","8px");
   			//$("#qqMindiv").css("background","blue");
   			
   			$("#qqMinword").css("float","left");
   			$("#qqMinword").css("width","130px");
   			$("#qqMinword").css("height","35px");
   			$("#qqMinword").css("margin-left","0px");
   			$("#qqMinword").css("margin-top","0px");
   			//$("#qqMaxword").css("background","green");
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
   			//("#qqStartNodiv").css("background","blue");
   			
   			$("#qqStartNoword").css("float","left");
   			$("#qqStartNoword").css("width","130px");
   			$("#qqStartNoword").css("height","35px");
   			$("#qqStartNoword").css("margin-left","0px");
   			$("#qqStartNoword").css("margin-top","0px");
   			//$("#qqMaxword").css("background","green");
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
   			$("#rulechange").dialog({width:380,height:300,show:'slide'});
   			//注意，必须所有都append到最后的father后，再修改css,否则没效果
   			$("#formdiv").css("float","left");
   			$("#formdiv").css("width","350px");
   			$("#formdiv").css("height","200px");
   			$("#formdiv").css("margin-left","10px");
   			$("#formdiv").css("margin-top","5px");
   			//$("#formdiv").css("background","yellow");
   			
   			
   			
   			
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
   $("#navgridRuleManage").jqGrid('addRowData',1,data[0]);
   $("#navgridRuleManage").jqGrid('addRowData',2,data[1]);
}