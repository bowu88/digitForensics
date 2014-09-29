/*这里负责验证用户输入或用户操作的有效性*/

/*
 * 这个用于整个searchPage中以alert形式提示出错信息
 * 暂时只有一条alert语句，设计这个函数，主要是为了以后
 * 方便更改，可以改为dialog提示错误信息，或者其他
 */
function alertMessage(errormessage) {

	$("<div id='alertDialog' title='提示信息'>"+errormessage+"</div>").appendTo($("#right"));
	$("#alertDialog").dialog({show:'clip',modal: true,
								   overlay: {opacity: 0.5, background: "green"},
								   beforeClose: function(event, ui) {
   											$("#alertDialog").empty();
   											$("#alertDialog").remove();
   									}});
}

/*
 * 确认信息提示框，buttonVal为button的显示名称，clickFun为点击后调用的函数
 */
function confirmMessage(message, clickFun) {
	$("<div id='alertDialog' title='确认信息'>"+message+"</div>").appendTo($("#right"));
	$("#alertDialog").dialog({show:'clip',modal: true,
								   overlay: {opacity: 0.5, background: "green"},
								   buttons: {
                    					"确认":function() {
                    							$("#alertDialog").empty().remove();
                    							clickFun();
                    						}
                    					},
                    				beforeClose: function(event, ui) {
   											$("#alertDialog").empty();
   											$("#alertDialog").remove();
   									}
                				});
}