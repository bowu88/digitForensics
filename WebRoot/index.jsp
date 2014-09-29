<!DOCTYPE html>
<html>
  <head>
    <title>欢迎登陆电子证据管理与分析系统</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link type='text/css' rel='stylesheet' href='css/webfont/Dosis/stylesheet.css'/>
	<link type='text/css' rel='stylesheet' href='bootStrap/css/bootstrap.css'/>
	<link type='text/css' rel='stylesheet' href='bootStrap/css/test.css'/>
  </head>
  
  <body>
     <div class='navbar navbar-fixed-top'>
  		<div class='navbar-inner'>
  			<div class='container'>
  				<!-- <div style='height:50px;'></div> -->
  				<div style='height:50px'><a class="brand"><img src='bootStrap/images/kippt-150.png' style='width:160px;height:30px'/></a></div>
  			</div>
  		</div>
  	</div>
  	
  	<div class="container-fluid">
  		<div class="row-fluid" id='mainbgimage'>
  			<div class='span6' id='advertise'>				
  				<img src='bootStrap/images/advertise.png'/>
  			</div>
  			<div class='span4' style='margin-top:120px;margin-left:120px;width:430px;'>		
				<form class="form-horizontal" name="loginform" method="post" action="core/Login">
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
			</div>
  		</div>
  	</div>
 
  	<footer>
	  	<div style="margin:0px auto; width:400px;height:80px;">
	        <div style='margin:0px auto;width:180px;'>
	        	<p>
	        		<a href="">About us</a> &middot;
	        		<a href="">Contact</a> &middot;
	        		<a href="" target="_blank">Blog</a>
	        	</p>
	        </div>
	        <div style='margin:0px auto;width:370px;'>
	        	<p>&copy; 2011-2012. Designed and developed in Nanjing, China.</p>
	        </div>
	     </div>
     </footer>
     
    <script type="text/javascript">
		function logsubmit() {
			if(document.loginform.username.value==""||document.loginform.password.value==""){
				alert("请先输入用户名和密码");
			}
			else {
				document.loginform.submit();
			}
		}
	</script>
  </body>
</html>
