/*
 * url:servlet pattern
 * txdata: 要传输的数据，包括action传输方式
 * 注意：这个param是序列化，将对象变为param1=value1&param2=value2的形式，
 * 		  如果不这样做，数据始终传不到后台
 * 注意: ajax与其他函数是异步的，即使还没有获取完数据甚至没有获取到，函数就已经返回了，
 *       $.post()函数没有提供同步异步选择，所以换用$.ajax（），async参数true,则为异步
 *       异步时，即使还没有返回值，函数继续执行，如果为false，则只有返回值后，才继续执行。
 *       这里用同步。
 */
function syncAjaxPost(url, txdata) {
	var retdata	=	null;
	var serializedData	=	jQuery.param(txdata);
	$.ajax({
		  async:false,
		  type: 'POST',
		  url: url,
		  data: serializedData,
		  success: function (data, textStatus){
						if(textStatus == "error") {
							alert(url.toString()+" ajax"+ textStatus.toString());
						} else {
							retdata	=	JSON.stringify(data);
						}
  	 				},
		  dataType: "json"	
	});
	
  	return retdata;
}

/*
 * 这个是异步ajax函数
 */
function asyncAjaxPost(url, txdata) {
	var retdata	=	null;
	var serializedData	=	jQuery.param(txdata);
	$.ajax({
		  async:true,
		  type: 'POST',
		  url: url,
		  data: serializedData,
		  success: function (data, textStatus){
						if(textStatus == "error") {
							alert(url.toString()+" ajax"+ textStatus.toString());
						} else {
							retdata	=	JSON.stringify(data);
						}
  	 				},
		  dataType: "json"	});
	return retdata;
	
  	/*$.post(url, serializedData, 
  			function (data, textStatus){
				if(textStatus == "error") {
					alert(url.toString()+" ajax"+ textStatus.toString());
				} else {
					retdata	=	JSON.stringify(data);
					alert(retdata);
				}
  	 		},"json");*/

}


function asyncAjax4Export(url, txdata) {
	var serializedData	=	jQuery.param(txdata);
	$.ajax({
		  async:true,
		  type: 'POST',
		  url: url,
		  data: serializedData,
		  success: function (data, textStatus){
						if(textStatus == "error") {
							alertMessage('导出失败,请稍后再试');
						} else {
							if(typeof data.error !== 'undefined') {
								alertMessage(data.error);
								return ;
							}
							window.open("/2011-7-18/ExplorFile/"+data.fileName+".xls");  
						}
  	 				},
		  dataType: "json"	});
}

/*
 * 组装表格
 * jObject是jquery对象，将其组装为表格，即jquery("#navgrid)
 * url:后台servlet地址
 * mtype:传送方式post/get
 * txdata:向后台发送的数据
 * pagerid:pager的id
 * caption:表格头标题
 * editurl: 需要编辑时servlet地址，如果不需要编辑，赋值''
 * width:表格宽度
 * height:表格高度
 * dynamicCols:是否需要根据返回的结果动态生成colNames和colModal，如果是则置该项为true,否则false;
 */
function assembleGrid(jObject, url, mtype, txdata, pagerid, caption, editurl, width, height, colNames, colModel, dynamicCols, multiSel, onSelectRow, loadComplete, onSelectAll) {
   	var serializedData	=	jQuery.param(txdata);
//   	alert(serializedData);
   	var noFound	=	'';
	$.ajax({
    	async:false,
        type: mtype,
        url: url,
        data: serializedData,	//对象{}
        dataType: 'json',
        success: function (result) {
        	if(result.rows.length==0) {
        		noFound	=	"您所选择的对象没有此类数据";
        	}
        	alert(result);
        	if(dynamicCols==true) {
        		//根据返回结果，动态改变colNames和colModel
        	}
       
        	jObject.jqGrid({
	 			url : url,
	 			mtype: mtype,
	 			datatype : "json",
                jsonReader: { repeatitems: false },
                shrinkToFit: false,
                colNames: colNames,
                colModel: colModel,
                viewrecords: true,
                rowNum:10,
                pager:pagerid,
                postData:serializedData,
				sortname:'id',
                sortorder:'desc',
				caption:caption,
				editurl:editurl,
				postData:txdata,			//Array
				width:width,
				height:height,
				scrollOffset:0,
				multiselect: multiSel,
				onSelectRow:onSelectRow,
				loadComplete:loadComplete,
				onSelectAll:onSelectAll
				/*onPaging:function(pgButton) {
					saveSelState();
				}*/
            });
        },
        error: function (x, e) {
            alert(x.readyState + ' ' + x.status + ' ' + e.msg);
        }
    });
    if(noFound != "") {
    	alertMessage(noFound);
    }
    /*if(noFound != "" && $("#hideIsFirstShowRepoSearch").html() === "false") {
    	alertMessage(noFound);
    } else {
    	$("#overlayRight").empty().remove();
    }*/
    return jObject;
}

/*
 * gridid:表格id
 * pagerid:pager的id
 * editable:true/false
 * editOptions:如果editable为false，则应为null;
 * addable:true/false;
 * addOptions:不需要添加时，为null;
 * delable:true/false;
 * delOptions:不需要删除时，为null;
 * searchOptions：搜索选项
 */
function setGridEditable(jObject, gridid, pagerid, editable, editOptions, addable, addOptions, delable, delOptions, searchOptions) {
//	alert(gridid+pagerid+editable+addable+delable);
	jObject.jqGrid(gridid, pagerid,{edit:editable,add:addable,del:delable,search:true,refresh:true}, editOptions, addOptions, delOptions, searchOptions);
}

/*
 * 表格自定义按键
 */
function addCustomButton(jObject, pagerid, caption, customFunc) {
//	alert(pagerid);
	jObject.navButtonAdd(pagerid,{caption:caption,buttonicon:"ui-icon-newwin",onClickButton:function(){}});
}

/*
 * 获取grid高度
 */
function getGridHeight() {
	var  gridheight	=	$("#right").height()-25-30-35;
	return gridheight;
}

/*
 * 获取某行信息
 */
function getRowData() {
	var rowid = $("#navgrid").getGridParam("selrow");   
	if(rowid==null) {
		alertMessage("请先选择要查看的信息！");
			return false;
	}
	var rowdata	=	$("#navgrid").getRowData(rowid);
	return rowdata;
}

function getSearchOptions() {
	return {
   		top: '50', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST",
   		sopt:['eq','ne','cn']
   		/*onclickSubmit:function(params){
   			var sr = jQuery("#navgrid").getGridParam('selrow');
   			rowdata = jQuery("#navgrid").getRowData(sr);
   		
   			return {chatmessageid:rowdata.chatid};
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id];
  		 }*/
   };
}