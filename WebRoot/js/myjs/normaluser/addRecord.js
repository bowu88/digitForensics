/*
 * 用于创建一个对话框，供用户输入信息
 * $contentDiv是对话框中的内容，各表根据输入内容
 * 构建它，并将其作为参数，传至对话框中。
 */
function createAddDialog($contentDiv, title) {
	var $addRecordDialog	=	$("<div id='addRecordDialog' title="+title+"></div>");
	$addRecordDialog.append($contentDiv).appendTo($(body));;
	$("#addRecordDialog").dialog({show:'clip'});
}

/*
 * 码址：邮箱地址的添加
 */
function addAllEmailAddr() {
	var $contentDiv	=	$("<div class='addDialogDiv'></div>");
	createAddDialog($contentDiv, '请填写需要添加的邮箱信息');
}

function getAddOptionsObj(top, left, width, txdata) {
	var addOptions={
   		top: top, left: left, width: width,
   		mtype:"POST",addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
      	onclickSubmit:function(params) {
      		return txdata;
//          return {managerid:rowData.userid};
       	},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
   return addOptions;
}

/*
 * 获取所管理嫌疑人信息，包括：对象姓名和id,供用户选择
 * 并组成jqgrid要求的格式。
 */
function getAllSuspInfo4Sel() {
	var suspMapstr	=	syncAjaxPost("servlet/QuerySuspinfo", {});
	var suspMapObj	=	JSON.parse(suspMapstr);
	var retObj	=	suspMapObj.suspMap;
	return retObj;
}
