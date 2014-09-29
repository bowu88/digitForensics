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
<link rel="stylesheet"
	href="/animateEdition/css/webfont/Dosis/stylesheet.css" type="text/css"></link>
<link rel="stylesheet"
	href="/animateEdition/css/ui-lightness/jquery-ui-1.8.16.custom.css"
	type="text/css"></link>
<link rel="stylesheet" href="/animateEdition/css/jqGrid/ui.jqgrid.css"
	type="text/css"></link>
<link rel="stylesheet"
	href="/animateEdition/css/webfont/websymbols/stylesheet.css"
	type="text/css"></link>
<link rel="stylesheet"
	href="/animateEdition/css/superuser/superuser.css" type="text/css"></link>

<link rel="stylesheet" type="text/css"
	href="/animateEdition/css/superuser/reset-min.css"></link>
<link rel="stylesheet" type="text/css"
	href="/animateEdition/css/superuser/layout.css"></link>
<link rel="stylesheet" type="text/css"
	href="/animateEdition/css/superuser/landscape-header.css"></link>

<script src="/animateEdition/js/jquery/jquery-1.7.1.min.js"
	type="text/javascript"></script>
<script src="/animateEdition/js/jquery/jquery-ui-1.8.16.custom.min.js"
	type="text/javascript"></script>

<script src="/animateEdition/js/jqgrid/i18n/grid.locale-en.js"
	type="text/javascript"></script>
<script src="/animateEdition/js/jqgrid/i18n/grid.locale-cn.js"
	type="text/javascript"></script>
<script src="/animateEdition/js/jqgrid/jquery.jqGrid.js"
	type="text/javascript"></script>
<script src="/animateEdition/js/myjs/superuser/superuser.js"
	type="text/javascript"></script>

<script type="text/javascript"
	src="/animateEdition/js/jquery/jquery.scrollTo-1.4.2-min.js"></script>
<script src="/animateEdition/js/jquery/jquery.delay.js"
	type="text/javascript"></script>
<script src="/animateEdition/js/jquery/jquery.easing.1.3.js"
	type="text/javascript"></script>
<script src="/animateEdition/js/jquery/landscape-header.js"
	type="text/javascript"></script>
<script type="text/javascript">
  		$(function() {
  			
      		var username	=	'<%=session.getAttribute("userid")%>';
      		//document.getElementById('userlarge').innerHTML	=	'AdminID:'+username;
			landscape(username);
			$('a.link').click(function () {  
				$('#wrapper').scrollTo($(this).attr('href'), 800);
				return false;  
			});  
			
			user_manage();
		});
	</script>
<script type="text/javascript">
		function closeWin() {
			window.opener=null;     
    		//window.opener=top;     
    		window.open("","_self");     
    		window.close();       
		}
		function infohide() {
			var pos	=	$(".cloudbar").css("top");
			
			if(pos=="0px") {
				hide();
			} else{
				show();
			}
		}
		
		function hide() {
			$(".cloudbar").stop().animate({top:'-225px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
		}
		
		function show() {
			$(".cloudbar").stop().animate({top:'0px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
		}
		
		function switchContent() {
			var flag	=	certain_user();
			if(flag==false) {
				alert("yes");
				$("#box1href").click();
				return false;			
			}else {
				return true;
			}
		}
	</script>
</head>
<body>
	<% 
  	response.setHeader("Cache-Control","no-cache");  
	response.setHeader("Cache-Control","no-store");  
 	response.setDateHeader("Expires", 0); 
     
    System.out.println("yes"); 
    System.out.println("current userid:"+session.getAttribute("userid")); 
  	if(session.getAttribute("userid")== null || session.getAttribute("userid").equals("")){ 
		response.sendRedirect("http://f6724fc54d:8080/SysFinal_1/index.jsp"); 
	} 
  %>
	<div id="header">
		<div id="dosis2">电子证据管理与分析系统</div>

		<div id="titlebar">
			<h1>Welcome</h1>
		</div>
		<div id="sliders">

			<div class="cloudbar">
				<div class="cloud-padding">
					<div class="landscapeinfo" id="adminname"></div>
					<div class="landscapeinfo" id="username">&nbsp;&nbsp;</div>
					<div class="landscapeinfo2" id="landscapelogout">X </div>
					<div class="landscapeinfo2" id="landscapehide" onclick="infohide();">~ </div>
				</div>
			</div>
		</div>
		<!--  
            <div class="userinfo" onmouseover="this.className='userinfo_opacity'" onmouseout="this.className='userinfo'">
                <ul style="list-style-type:none;">
                    <li id="userlarge">
                    </li>
                    <li id="usersmall" onclick="closeWin();">
                        <font color="blue">Logout</font>
                    </li>
                </ul>
            </div>-->
	</div>
	<div id="middle">
		<ul id="menu">
			<li>
				<a href="#box1" id="box1href" onclick="user_manage();" class="link">用户信息</a>
			</li>
			<li><a href="#box2" id="box2href"
				onclick="certain_user();" class="link">嫌疑人信息</a>
			</li>
			<li><a href="#box3" id="box3href"  onclick="ruleView();" class="link">规则管理</a>
			</li>
			<li><a href="#box4" id="box4href" class="link">暂无</a>
			</li>
		</ul>
	</div>
	<!--  
        <div id="main">
        	<div id="prev"><<</div>
        	<div id="usergrid"></div>
        	<div id="next" onclick="certain_user();">>></div>
        </div>-->

	<div id="wrapper">
		<ul id="mask">
		
			<li id="box1" class="box">
				<a name="box1"></a>
					<div class="content">
						<div id="userinf" class="inner">
						</div>
					</div>
			</li>
			<!-- end box1 -->
			<li id="box2" class="box"><a name="box2"></a>
				<div class="content">
					<div id="suspectinf" class="inner"></div>
				</div></li>
			<!-- end box2 -->
			<li id="box3" class="box"><a name="box3"></a>
				<div class="content">
					<div id="ruleManage" class="inner">规则管理</div>
				</div></li>
			<!-- end box3 -->
			<li id="box4" class="box"><a name="box4"></a>
				<div class="content">
					<div class="inner">暂无</div>
				</div></li>
			<!-- end box4 -->
		</ul>
		<!-- end mask -->
	</div>
	<!-- end wrapper -->


	<div id="footer">
		<center>
			<div id="copyright">
			<h1>
				<font color="skyblue">Copyright</font>
			</h1>
			</div>
		</center>
	</div>

</body>
</html>
