/*
 * repository文件导入rightImport区域
 */
function showRightImportFormOld() {
		if($("#rightImport").length > 0) {
			return ;
		}
		animateShowRightImportArea();
		//下面创建importForm
		//$("<div id='repoUploadFormDiv'><form id='repoUploadForm' action='servlet/FileUploadServlet' method='POST' enctype='multipart/form-data'><div id='hideUploadText'><input type='file' name='file1' id='uploadinput' multiple/><input type='text' value='Unknown' id='selSuspName' name='selSuspName' style='display:none;'/></div></form></div>").appendTo($("#rightImport"));
		$("<div id='repoUploadFormDiv'><input type='file' name='file1' id='uploadinput' /><input type='text' value='Unknown' id='selSuspName' name='selSuspName' style='display:none;'/></div>").appendTo($("#rightImport"));
		$("<div id='uploadSuspSelDiv'><select id='uploadSuspSel'></select></div>").appendTo($("#rightImport"));
		$("<div class='progress'><div class='bar'></div><div class='percent'>0%</div></div>").appendTo($("#rightImport"));
		$("<div id='uploadButton'></div>").appendTo($("#rightImport"));
		$("<div id='cancelButton'></div>").appendTo($("#rightImport"));
		$("<div id='status'></div>").appendTo($("#rightImport"));
		
		$("#cancelButton").click(animateRemoveRightImportArea);
		
		var suspObj	=	getAllSuspInfo4Sel();
		var suspArray	=	decodeURIComponent(JSON.stringify(suspObj)).split(','); 
		for(var i=0; i<suspArray.length; i++) {
			var array	=	suspArray[i].split(':');
			var namestr	=	array[1].replace(/\"/g,'').replace(/[\{|\}]/g,'');
			$("<option title='"+array[0].replace(/\{/g,'')+"'>"+namestr+"</option>").appendTo($("#uploadSuspSel"));
		}
		
		 $("#uploadinput").uploadify({
		        "swf"      : "/hibernateEdition/Plug-ins/uploadify/uploadify.swf",
				"uploader" : "servlet/FileUploadServlet",
				"width" : 80,
				"height" : 17,
				"auto" : false
				
				// "uploader" : "uploadify/uploadify.php"
		        // Put your options here
		 });
		
		$("#uploadButton").click(function() {
			confirmMessage("请确认，即将上传的文件属于"+$("select :selected").html()+",若需修改，请关闭该提示框后重新选择", submitUploadFile);
			/*submitUploadFile();*/
		});
		
		function submitUploadFile() {
			var bar = $('.bar');
			var percent = $('.percent');
			var status = $('#status');
			var timer	=	null;
			
			if(!checkValidateSuffix(getFileSuffix($("#uploadinput").val()))) {
				alertMessage("您选择了非法的文件格式，请选择csv或eml后缀的文件");
				return;
			}

			var suspName	=	window.encodeURIComponent($("select :selected").html());
			$("#selSuspName").val(suspName);
			var options = {
							dataType : 'json',
							success : function(data) {
								alertMessage("上传成功");
							},
							error : function(data) {
								alertMessage('上传失败!可能您上传了非csv与eml格式的文件');
							},
							data : {
								/*selSuspName:$("select :selected").html()*/
							},
							beforeSend : function() {
								status.empty();
								var percentVal = '0%';
								bar.width(percentVal);
								percent.html(percentVal);
							},
							uploadProgress : function(event, position, total, percentComplete) {							
								
							},
							complete : function(xhr) {
								clearInterval(timer);
								bar.width("100%");
								percent.html("100%");
							}
				}; 
				
				$('#repoUploadForm').submit(function(){  
       				 $(this).ajaxSubmit(options);
        			 return false;  
    			}); 
    			$("#repoUploadForm").trigger("submit");
    			
    			timer = window.setInterval(showUploadInfo,1000);  
    			function showUploadInfo(){  
    				var state	=	syncAjaxPost("servlet/GetUploadState",{});
    				if(state != null) {
    					$("#status").empty();
    					var obj	=	JSON.parse(state);
    					$("<div class='statusInfo'>"+obj.uploadCurFileName+"</div>").appendTo($("#status"));
    					$("<div class='statusInfo'>"+parseInt(obj.uploadSpeedKb/1024)+" Mb/s</div>").appendTo($("#status"));
    					$("<div class='statusInfo'>"+obj.uploadState+"</div>").appendTo($("#status"));
    					$("<div class='statusInfo'>"+obj.uploadRemainTime+"  H:M:S</div>").appendTo($("#status"));
    					$("<div class='statusInfo'>"+obj.uploadTotalSizeMKB+" Mb</div>").appendTo($("#status"));
    					$("<div class='statusInfo'>"+parseInt(obj.uploadReceivedSize/(1024))+" Kb</div>").appendTo($("#status"));
    					
						var percentVal = obj.uploadProgressPercent + '%';
						bar.width(percentVal);
						percent.html(percentVal);
    				}
    			}
		}	
}

function showRightImportForm() {
	if($("#rightImport").length > 0) {
			return ;
		}
		animateShowRightImportArea();
		//下面创建importForm
		$("<div id='importTop'><input type='file' name='file1' id='uploadinput' /><div id='uploadSuspName'><select id='uploadSuspSel'></select></div></div>").appendTo($("#rightImport"));
		$("<div id='bottomButtons'><span id='uploadSubmit'></span><span id='uploadReset'></span><span id='uploadHide'></span></div>").appendTo($("#rightImport"));
		
		
		var suspObj	=	getAllSuspInfo4Sel();
		var suspArray	=	decodeURIComponent(JSON.stringify(suspObj)).split(','); 
		for(var i=0; i<suspArray.length; i++) {
			var array	=	suspArray[i].split(':');
			var namestr	=	array[1].replace(/\"/g,'').replace(/[\{|\}]/g,'');
			$("<option title='"+array[0].replace(/\{/g,'')+"'>"+namestr+"</option>").appendTo($("#uploadSuspSel"));
		}
		
		
		var usernameStr	=	syncAjaxPost("servlet/GetUserNameAjax", {});
		var usernameObj 	=	JSON.parse(usernameStr);
		var username	=	usernameObj.username;
		var usernameEncode	=	encodeURIComponent(username);		
		
		 $("#uploadinput").uploadify({
		        "swf"      : "/hibernateEdition/Plug-ins/uploadify/uploadify.swf",
				"uploader" : "../servlet/FileUploadServlet",
				"width" : 80,
				"height" : 17,
				"auto" : false,
				'buttonText' : '选择',
				'onUploadComplete' : function(file) {
            			alertMessage("上传完毕");
        		}
		 });

		$("#uploadSubmit").click(function() {
			var selSuspName	=	$("select :selected").html();
			var selSuspNameEncode	=	encodeURIComponent($("select :selected").html());
			confirmMessage("请确认，即将上传的文件属于"+selSuspName+",若需修改，请关闭该提示框后重新选择", submitUploadFile);
			$('#uploadinput').uploadify('settings','formData', {'selSuspName' : selSuspNameEncode, "username" : usernameEncode});
			function submitUploadFile() {
				//ajax set session selsupName or id ,if success then upload
				//syncAjaxPost("servlet/GetSelSuspNameAjax", {selSuspName: selSuspName});				
				$("#uploadinput").uploadify('upload','*');
			}			
		});
		$("#uploadReset").click(function() {
			$('#uploadinput').uploadify('cancel', '*');
		});
		$("#uploadHide").click(function() {
			$('#uploadinput').uploadify('destroy');
			animateRemoveRightImportArea();
		});		
}


function animateShowRightImportArea() {
	$("<div id='rightImport'></div>").appendTo($("#main"));

	//$("#rightImport").animate({width:$("#right").width()-801+'px'},2000);
	$("#rightImport").animate({width:'270px'}, 2000);
	var timer	=	setInterval("$('#right').trigger('resize')",3);
	//$("#right").animate({width:"800px"},2000);
	$("#right").animate({width:$("#right").width()-270+'px'},2000);
	var animateTimer=	setInterval(isAnimate,3);
	function isAnimate() {
		if(!$("#right").is(":animated")) {
			clearInterval(timer);
			clearInterval(animateTimer);
			//$("#uploadSuspSelDiv").show();
			$("#uploadSuspName").show();
		}
	}	
}

function animateRemoveRightImportArea() {

	$("#rightImport").empty();
	$("#rightImport").animate({width:'0px'},2000);
	
	var timer	=	setInterval("$('#right').trigger('resize')",3);
	var rightWid	=	document.body.clientWidth-$("#left").width()-$("#leftClass").width()-5+'px';
	$("#right").animate({width: rightWid},2000);
	var animateTimer=	setInterval(isAnimate,3);
	function isAnimate() {
		if(!$("#right").is(":animated")) {
			clearInterval(timer);
			clearInterval(animateTimer);
			$("#rightImport").remove();
		}
	}	
}

function getFileSuffix(fakepath) {
	return fakepath.substring(fakepath.lastIndexOf('.')+1,fakepath.length);
}

function checkValidateSuffix(suffix) {
	var valArray	=	['csv','eml'];
	for(var k in valArray) {
		if(suffix===valArray[k]) {
			return true;
		}
	}
	return false;
}

/*
 * className为要导出数据表对应的类名
 */
function exportGridData(className, txdata) {
	txdata.className	=	className;
	asyncAjax4Export("servlet/ExportGridData",txdata);
	window.open("/files/exportGridData.xls");
}
