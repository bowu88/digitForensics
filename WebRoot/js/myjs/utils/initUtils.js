//注意：这个文件是所有页面共用，不能设计到具体的标签

/*
 * 调整屏幕全屏
 */
function adjustWindowSize() {
	window.moveTo(0,0);	
	window.resizeTo(screen.availWidth,screen.availHeight);
}

function createBetterTip(jObject, message) {
	if($('.tip').length>0) {
		$('.tip').empty().remove();
	}
	$("<div class='tip'><div class='tipMid'></div><div class='tipBtm'></div></div>").appendTo($("body"));
	var $this = jObject;
	var tip = $('.tip');
	var tipInner = $('.tip .tipMid');
		
	var tTitle = message;
	var offset = $this.offset();
	var tLeft = offset.left;
	var tTop = offset.top;
	var tWidth = $this.width();
	var tHeight = $this.height();
		
	/* Mouse over and out functions*/
	$this.hover(
		function() {
			tipInner.html(tTitle);
			setTip(tTop, tLeft);
			tip.show();
//			setTimer();
		}, 
		function() {
//			stopTimer();
			tip.hide();
		}
	);	
	
	/* Position the tooltip relative to the class 
		   associated with the tooltip                */
	setTip = function(top, left){
		var topOffset = tip.height();
		var xTip = (left-30)+"px";
		var yTip = (top+40)+"px";
		tip.css({'top' : yTip, 'left' : xTip});
	}
}
