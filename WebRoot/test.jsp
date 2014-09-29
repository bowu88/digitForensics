<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'test.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
   <form class="form-horizontal" name="loginform" method="post" action="core/MySuspectInfo">
					<fieldset>
						<legend>Welcome</legend>
						<div class="control-group">
							<label class="control-label" for="input01">用户名</label>
							<div class="controls">
								<input type="text" name='username' class="input-large" >
								<p class="help-block"></p>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="input01">密     码</label>
							<div class="controls">
								<input type="password" name="password" class="input-large">
								<p class="help-block"></p>
							</div>
						</div>
						<div class="control-group">
							
						</div>
						<div class="form-actions">
							<button type="submit" class="btn btn-primary" onclick="logsubmit()">确认登录</button>
							<button class="btn">Cancel</button>
						</div>
					</fieldset>
				</form>
  </body>
</html>
