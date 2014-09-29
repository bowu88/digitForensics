<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
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

	<link rel="stylesheet" type="text/css" href="/hibernateEdition/css/webfont/Dosis/stylesheet.css" />
   	<link rel="stylesheet" type="text/css" href="/hibernateEdition/css/normaluser/normaluser.css"/>
    <link href="/hibernateEdition/css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="/hibernateEdition/css/webfont/websymbols/stylesheet.css" type="text/css" charset="utf-8"/>       
    <link rel="stylesheet" type="text/css" media="screen" href="/hibernateEdition/css/jqGrid/ui.jqgrid.css" />
    
    <script src="/hibernateEdition/js/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="/hibernateEdition/js/jquery/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
    
    <script src="/hibernateEdition/js/jquery/jquery.form.js" type="text/javascript"></script>  <!-- 上传插件 -->
    <script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-en.js" type="text/javascript"></script>
    <script src="/hibernateEdition/js/jqgrid/i18n/grid.locale-cn.js" type="text/javascript"></script>
    <script src="/hibernateEdition/js/jqgrid/jquery.jqGrid.js" type="text/javascript"></script>
    <script type="text/javascript" src="/hibernateEdition/js/jquery/jquery.scrollTo-1.4.2-min.js"></script>
	<script type="text/javascript" src="/hibernateEdition/js/jquery/jquery.delay.js"></script>
	<script src="/hibernateEdition/js/jquery/jquery.easing.1.3.js" type="text/javascript"></script>
    <script src="/hibernateEdition/js/myjs/normaluser/normaluser.js" type="text/javascript"></script>
    
      <script type="text/javascript">
      $(function() {
      			//javascript:window.history.forward(1);   //禁止浏览器后退 
      			self.moveTo(0,0);
				self.resizeTo(screen.availWidth,screen.availHeight);
      
      			window.onresize = function() {  
   					 // do something 
   					 //alert("yes"); 
   					var totalheight	=	document.getElementById("body").scrollHeight;
  					var footerheight	=	document.getElementById("footer").offsetWidth;
  					var mainheight	=	totalheight-132-footerheight;
  					$("#main").css("height",mainheight);
  					//$("#navgrid").setGridHeight(mainheight-30-30-34);
					suspect();
				}  
      
      			var father		=	$("body");
      			var fatherwidth	=	window.screen.width;
      			var fatherheight	=	window.screen.height;
      			//var mainheight	=	totalheight-159;
  				//var gridheight	=	mainheight-30-30-34;
      			//$("body").css("min-height",fatherheight);
      			$("body").css("min-width",fatherwidth-4);
      			var right	=	document.getElementById("right");
      			var rightheight	=	right.offsetHeight;
      			$("#main").css("min-height",rightheight);
      			document.getElementById("body").style.cursor=	'POINTER';   //改变鼠标样式
      			showRuleInfo();
      			
      			var tmp	=	'<%=session.getAttribute("userid")%>'; //这里一定要带引号，否则出错
      			//alert(tmp);
      			
      			if(tmp==null) {
      				$("#logout").click();
      			}
  				var leftwidth	=	document.getElementById("left").offsetWidth;
  				var totalwidth	=	document.getElementById("body").offsetWidth;
  				//alert(leftwidth+" "+totalwidth);
  				var totalheight	=	document.getElementById("body").offsetHeight;
  				//alert(totalheight);
  				var mainheight	=	totalheight-159;
  				
  				$("#main").css("height",mainheight);
  				$("#leftClass").css("height",mainheight);

  				var rightwidth	=	totalwidth-leftwidth-$("#leftClass").width();
  				//$("#right").css("width",rightwidth-1);
  				$("#right").css("width",rightwidth-1);
  				
  				//alert(tmp);
                showusername(tmp);
               
                $( "#accordion1" ).accordion({ collapsible: true,clearStyle: true,autoHeight:false,active: false});
                   
               	suspect();
               	
               $("#mainDisplayClass2").click(function() {
               		$("#header").fadeOut();
               		$("#footer").fadeOut();
               		$("#header").css("background","url(/hibernateEdition/css/normaluser/resources/changeheaderbg.png)");
               		$("#footer").css("background","url(/hibernateEdition/css/normaluser/resources/changefooterbg.png)");
               		$("#header").fadeIn();
               		$("#footer").fadeIn();
               });
               
               $("#mainDisplayClass1").click(function() {
               		$("#header").fadeOut();
               		$("#footer").fadeOut();
               		$("#header").css("background","url(/hibernateEdition/css/normaluser/resources/header-bg.png)");
               		$("#footer").css("background","url(/hibernateEdition/css/normaluser/resources/footer.png)");
               		$("#header").fadeIn();
               		$("#footer").fadeIn();
               });
               	 	
            });  
      
      </script>
  </head>
  <!-- 给body标签加onbeforeunload="history.go(0)" 就可以让浏览器无法后退，始终停留在这个页面-->
  <body id="body">
 <!--  <div id="testmiddle"></div>-->
 <div id="hidetimeSort" style="display:none">false</div>
  <div id="hiderelationSort" style="display:none">false</div>
  <div id="welcome"><div id="welcomeword">welcome</div></div>
     <div id="header">
     	
            <h2 id="dosis2">
            	<img style="margin-top:30px; margin-left:20px;" src="/animateEdition/css/normaluser/resources/newtitle.png"/>
              	<!-- 电子证据管理与分析系统-->
            </h2>
            <div id="userinfo">
              <img src="/animateEdition/css/normaluser/resources/username.png" alt="Username"/>
            </div>
            <div id="chosensuspect">
            	<img src="/animateEdition/css/normaluser/resources/suspect3.png" alt="Username"/>
            </div>
        </div>
       <div id="middle">
       		<!-- 
       		<div id="middleinfo">
       			<div style="font-family:'幼圆','黑体','微软雅黑';font-size:19px;font-weight:bold">当前信息:</div><div id="flowCurrentGrid"></div>
       		</div>
       		 -->
        </div>
        <div id="main">
        
        	<div id="leftClass">
        		<div id='mainDisplayClass1' class='mainDisplayClass'></div>
        		<div id='mainDisplayClass2' class='mainDisplayClass'></div>
        	</div>
            <div id="left">
                <div style="position:relative;width:100%;height:97%;float:left;margin-left:0px;">
                    <div id="accordion1" style="position:relatvie;height:100%; ">
                        <h3><a href="#">对象管理</a></h3>
                        <div style="padding:0px;">
                        	<ul style="margin-left:0px;width:100%;">
                        	 	<li id="suspectinfo" class="rule_manage">
                               	 	<a onclick="suspect()" class="wordlist">   信息查看</a>                        
                           		</li>
                            </ul>
                        </div>
                        <h3><a href="#">文档内容</a></h3>
                         <div style="padding:0px;">
                        	<ul style="margin-left:0px;width:100%;">
                        		<li id="contentsearch" class="rule_manage">
                        			<a class="wordlist" style="text-decoration:none" onclick="datasearch()">   内容检索</a>                  
                        		</li>
                        	</ul>
                        </div>
                       
                        
                        <h3><a href="#">行为分析</a></h3>
                        <div style="padding:0px">
                        	<ul style="margin-left:0px;width:100%;">
                       			<li class="rule_manage2">
                                	<a style="text-decoration:none" class="wordlist" id="dataBrowser" onclick="obscureInfo();">   模糊信息浏览</a>
                               		<div id="backcolorskyblue"></div>
                            	</li>
                            	<li class="rule_manage2">
                                	<a style="text-decoration:none" class="wordlist" id="addrlist" onclick="mailcontactInfo();">   通讯录</a>
                            	</li>
                           		<li class="rule_manage2">
                                	<a style="text-decoration:none" class="wordlist" onclick="sysInfo();">   系统信息</a>
                              
                            	</li>
                            	<li class="rule_manage2">
                                	<a style="text-decoration:none" class="wordlist" onclick="imclient();">   即时通信工具</a>
                                
                            	</li>
                            	
                            	<li class="rule_manage2">
                                	<a style="text-decoration:none" class="wordlist" onclick="browserInfo();">   浏览器</a>
                                
                            	</li>
                            	
                            	<li class="rule_manage2">
                          			<a style="text-decoration:none" class="wordlist" onclick="mails();">   邮件信息</a>
                            	</li>
                            	<li class="rule_manage2">
                                	<a style="text-decoration:none" class="wordlist" onclick="mailAccount();">   邮箱帐号</a>
                            	</li>
                            </ul>

                            
                        </div>
                        <h3><a href="#">文档管理</a></h3>
                         <div style="padding:0px;">
                        	<ul style="margin-left:0px;width:100%;">
                            	<li class="rule_manage">
                                	<a style="text-decoration:none" onclick="checkAllFile(0);" class="wordlist">   MSOffice</a>
                               
                            	</li>
                           		<li class="rule_manage">
                                	<a style="text-decoration:none" onclick="checkAllFile(1);" class="wordlist">   OpenOffice</a>
                              
                            	</li>
                            	<li class="rule_manage">
                                	<a style="text-decoration:none" onclick="checkAllFile(2);" class="wordlist">   其他格式</a>
                              
                            	</li>
                            </ul>
                        </div>
                        <h3><a href="#">规则信息</a></h3>
                         <div style="padding:0px;" id="transfather">
                        	<ul style="margin-left:0px;width:100%;" id="transruleinfo"> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="right"></div>
        </div>
        <div id="footer">
            <center>
                <h3><font color="#595959">Copyright</font></h3>
            </center>
        </div>
  </body>
</html>
