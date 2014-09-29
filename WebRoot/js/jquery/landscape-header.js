// JavaScript Document
function landscape(username){
	
	$buildingup = false;
	
	$("#sliders>*").show();
	document.getElementById("adminname").innerHTML	=	"admin:"+username;		
	
	$(this).delay(2000,function(){
		$("#titlebar").fadeOut(1000);
	});
	
	$(this).delay(3500,function(){
		
		//Show the elements	
		//$(".village").stop().animate({top:'30px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
		$(".cloudbar").stop().animate({top:'0px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
		$buildingup = true;	
		
    });
}