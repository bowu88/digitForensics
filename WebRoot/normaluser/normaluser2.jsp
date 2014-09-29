<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>"/>    
    <title>普通用户</title>
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache,must-revalidate"/>
	<meta http-equiv="expires" content="0"/>    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3"/>
	<meta http-equiv="description" content="This is my page"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/webfont/Dosis/stylesheet.css" />
	<link rel='stylesheet' type='text/css' href='<%=basePath%>css/webfont/youyuan/stylesheet.css'/>
   	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/normaluser/normaluser.css"/>
    <link href="<%=basePath%>css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="<%=basePath%>css/webfont/websymbols/stylesheet.css" type="text/css" charset="utf-8"/>
     
    <link rel="stylesheet" type="text/css" media="screen" href="<%=basePath%>css/jqGrid/ui.jqgrid.css" />
    <link rel='stylesheet' type='text/css' media='screen' href='<%=basePath%>css/awesomenessTips/awesomenessTips.css' />
    <link rel="stylesheet" type="text/css" href="<%=basePath%>Plug-ins/uploadify/uploadify.css" />
   
   <script src="<%=basePath%>js/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/jquery/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
    
   <!--  <script src="http://malsup.github.com/jquery.form.js"></script> -->
    <script src='<%=basePath%>js/jquery/jquery.ui.core.js' type='text/javascript'></script>
    <script src='<%=basePath%>js/jquery/jquery.ui.widget.js' type='text/javascript'></script>
    <script src='<%=basePath%>js/jquery/jquery.ui.button.js' type='text/javascript'></script>
    <!--  <script src="/hibernateEdition/js/jquery/jquery.form.js" type="text/javascript"></script> --> <!-- 上传插件 -->
    <script src="<%=basePath%>js/jqgrid/i18n/grid.locale-en.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/jqgrid/i18n/grid.locale-cn.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/jqgrid/jquery.jqGrid.js" type="text/javascript"></script>
    <script type="text/javascript" src="<%=basePath%>js/jquery/jquery.scrollTo-1.4.2-min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/jquery/jquery.delay.js"></script>
	<script src="<%=basePath%>js/jquery/jquery.easing.1.3.js" type="text/javascript"></script>
    <!-- <script src="/hibernateEdition/js/myjs/normaluser/normaluser.js" type="text/javascript"></script> -->
    <script src="<%=basePath%>js/awesomenessTips/jquery.betterTooltip.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/json/json2.js" type="text/javascript"></script>
    <script type="text/javascript" src="<%=basePath%>Plug-ins/uploadify/jquery.uploadify-3.1.min.js"></script>
    <script src="<%=basePath%>js/myjs/utils/initUtils.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/myjs/utils/validateUtil.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/myjs/utils/jqGridUtil.js" type="text/javascript"></script>  
    <script src="<%=basePath%>js/myjs/normaluser/import.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/myjs/normaluser/stateUtil.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/myjs/normaluser/addRecord.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/myjs/normaluser/functional.js" type="text/javascript"></script>
    <script src="<%=basePath%>js/myjs/normaluser/initNormalUserPage.js" type="text/javascript"></script>
   <script type="text/javascript">
      $(function() {
      			//javascript:window.history.forward(1);   //禁止浏览器后退 
      			adjustWindowSize();
      			initComponentSize();
				initComponentEvent();
				<%-- var tmp	=	'<%=session.getAttribute("userid")%>'; //这里一定要带引号，否则出错
                showUserInfo(tmp); --%>
                showSuspectGrid();
                showAccordionInfoAbstract();
      });  
      
      </script>
  </head>
  <!-- 给body标签加onbeforeunload="history.go(0)" 就可以让浏览器无法后退，始终停留在这个页面-->
  <body id="body">
 <div id='hidecurTipsNo' style='display:none'>0</div>
 <div id="hidetimeSort" style="display:none">false</div>
  <div id="hiderelationSort" style="display:none">false</div>
  <!-- 默认查看所有管理对象信息 -->
  <div id='hideSelectedSuspect' style='display:none'>checkall</div>
  
  <!-- 用于显示bettertooltip -->
  <div id='hideSelectedSuspectName' style='display:none'></div>
  <div id='hideSelAllSuspect' style='display:none'>false</div>
  <div id='hideClassifyMainId' style='display:none'></div>
  <div id='hideIsFirstShowRepoSearch' style='display:none'>true</div>
     <div id="header">     	
            <h2 id="dosis2">
            	<img style="margin-top:15px; margin-left:20px;" src="/hibernateEdition/css/normaluser/resources/newtitle.png"/>
            </h2>
           <!--  <div id="userinfo">
              <img src="/hibernateEdition/css/normaluser/resources/username.png" alt="Username"/>
            </div> -->
            <!-- <div id="chosensuspect">
            	<img src="/hibernateEdition/css/normaluser/resources/suspect3.png" alt="Username"/>
            </div> -->
        </div>
       <div id="middle">    		
       		<div id="middleinfo">
       			<div id='middletips' class='middleflow' style="height:100%;width:698px;float:left;margin-left:0px;background:url(/hibernateEdition/css/normaluser/resources/tipsinfo2.png);"></div>
       			<div id='middlegrid' class='middleflow' style="width:249px;height:100%;float:left;margin-left:10px; background:url(/hibernateEdition/css/normaluser/resources/currentGridWord2.png);"></div>
       			<div id='middlesuspect' class='middleflow' style="height:100%;width:235px;float:left;margin-left:10px;background:url(/hibernateEdition/css/normaluser/resources/currentSuspect2.png);"></div>
       		</div>
        </div> 
        <div id="main">    
        	<div id="leftClass">
        		<!-- 这里的图片要改，一个是按对象查看信息，一个是按码字查看-->
        		<div id='mainDisplayClass1' class='mainDisplayClass'></div>
        		<div id='mainDisplayClass2' class='mainDisplayClass'></div>
        	</div>
            <div id="left">
                <div id='accordionArea' style="position:relative;width:100%;height:97%;float:left;margin-left:0px;"></div>
            </div>
            <div id="right"></div>
        </div>
        <div id="footer">
            <center>
                <h3><font style='font-weight:normal;' color="#595959">Copyright</font></h3>
            </center>
        </div>   
  </body>
</html>
