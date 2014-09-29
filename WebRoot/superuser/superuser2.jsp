<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base href="<%=basePath%>" />

<title>管理员</title>

<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="cache-control" content="no-store" />
<meta http-equiv="cache-control" content="must-revalidate" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3" />
<meta http-equiv="description" content="This is my page" />
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" href="/hibernateEdition/css/webfont/Dosis/stylesheet.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/ui-customGreenFinal/jquery-ui-1.8.18.custom.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/jqGrid/ui.jqgrid.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/webfont/websymbols/stylesheet.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/superuser/superuser2.css" type="text/css"></link>
	<link rel="stylesheet" href="/hibernateEdition/css/superuser/leftMenu/leftMenu.css" type="text/css"></link>
	<link rel="stylesheet" type="text/css" href="/hibernateEdition/css/superuser/reset-min.css"></link>
	
	
	<script src="/hibernateEdition/js/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jquery/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-en.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-cn.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jqgrid/jquery.jqGrid.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/validateUtil.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/myjs/utils/jqGridUtil.js" type="text/javascript"></script>
	
	
	<script src="/hibernateEdition/js/myjs/superuser/superuser2.js" type="text/javascript"></script>
	<script type="text/javascript" src="/hibernateEdition/js/jquery/jquery.scrollTo-1.4.2-min.js"></script>
	<script src="/hibernateEdition/js/jquery/jquery.delay.js" type="text/javascript"></script>
	<script src="/hibernateEdition/js/jquery/jquery.easing.1.3.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(function(){
			self.moveTo(0,0);
			self.resizeTo(screen.availWidth,screen.availHeight);
      
      		var father		=	$("body");
      		var fatherwidth	=	window.screen.width;
      		var fatherheight	=	window.screen.height;
      		$("body").css("min-width",fatherwidth-4);
      		var right	=	document.getElementById("right");
      		var rightheight	=	right.offsetHeight;
      		$("#maincontent").css("min-height",rightheight);
      		document.getElementById("body").style.cursor=	'POINTER';   //改变鼠标样式
		
		
		
			var body	=	document.getElementById("body");
			var bodywidth		=	body.offsetWidth;
			var right	=	document.getElementById("right");
			var rightwidth	=	right.offsetWidth;
			//判断浏览器类型
			var Sys = {}; 
       		var ua = navigator.userAgent.toLowerCase(); 
        	window.ActiveXObject ? Sys.ie = ua.match(/msie ([\d.]+)/)[1] : 
        		document.getBoxObjectFor ? Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1] : 
        			window.MessageEvent && !document.getBoxObjectFor ? Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1] : 
        				window.opera ? Sys.opera = ua.match(/opera.([\d.]+)/)[1] : 
        					window.openDatabase ? Sys.safari = ua.match(/version\/([\d.]+)/)[1] : 0; 
			
			if(Sys.ie) {
				$("#left").css("width",bodywidth-rightwidth-30);
				$(".ca-menu").css("width",bodywidth-rightwidth-30);
			} else if(Sys.chrome) {
				/* $("#left").css("width",bodywidth-rightwidth-13);
				$(".ca-menu").css("width",bodywidth-rightwidth-13);
				$("#hidemenu").css("left",bodywidth-rightwidth); */
				$("#left").css("width",bodywidth-rightwidth-18);
				$(".ca-menu").css("width",bodywidth-rightwidth-18);
				$("#hidemenu").css("left",bodywidth-rightwidth);
			}
			
			$("#hoverMenu").toggle(function() {
  				$("#hidemenu").fadeIn();
			}, function() {
  				$("#hidemenu").fadeOut();
			});
			showUserInfo();
		});
	</script>
</head>
  <!--onbeforeunload="history.go(0)"  -->
  <body id="body">
    <div id="header">
    	<div id="title" style="margin-top:10px;"><img src="/animateEdition/css/superuser/resources2/title.png"/></div>
    </div>
	<div id="middle"></div>  
    <div id="maincontent">
    	
    	<div id="right"></div>
    	<div id="left">
    		<ul class="ca-menu">
    					<li class="leftmenu">
        					<a onclick="showUserInfo();"> 
           						<div class="ca-content">
                					<h2 class="ca-main">S  用户管理</h2>
            					</div>
        					</a>
    					</li>
						<li class="leftmenu">
							<a onclick="showAllSuspect();"> 
								<div class="ca-content">
									<h2 class="ca-main">Q  嫌疑人管理</h2>
								</div>
							</a>
						</li>
						<li class="leftmenu" id="hoverMenu">
							<a onclick="showClassMain();"> 
								<div class="ca-content">
									<h2 class="ca-main">.  文件分类规则</h2>
								</div> 
							</a>
						</li>
					</ul>
    	
    	</div>
    	
    </div>
		
	
	<div id="footer">
		<center>
			<div id="copyright">
			<h1>
				<font color="yellow">Copyright</font>
			</h1>
			</div>
		</center>
	</div>
  </body>
</html>
