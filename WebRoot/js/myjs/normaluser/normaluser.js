function showusername(tmp){
	
	$buildingup = false;
	
	$(".rule_manage").hover(function() {
		$(this).css("border-left","5px solid orange");
	}, function() {
		$(this).css("border-left","5px solid #CCCCCC");
	});
	
	$(".rule_manage").click(function() {
		$(this).css("border-left","5px solid skyblue");
	});
	
	$(".rule_manage2").click(function() {
		$(this).css("border-left","5px solid skyblue");
	});
	
	$(".rule_manage2").hover(function() {
		$(this).css("border-left","5px solid orange");
	}, function() {
		$(this).css("border-left","5px solid #CCCCCC");
	});
	
	/*$("#welcome").show(2000).delay(2000).fadeOut(3000);
	$("#userinfo").stop().animate({right:'45px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
	$buildingup = true;	
	*/
	var username	=	document.createElement("div");
   	username.id	=	"username";
   	username.innerHTML	=	tmp;
   	
   	var logout	=	document.createElement("div");
   	logout.id	=	"logout";
   	logout.innerHTML	=	"logout";
   	
   	var changeinfo	=	document.createElement("div");
   	changeinfo.id	=	"changeinfo";
   	changeinfo.innerHTML	=	"Userinfo";
   		
   	var father 	=	document.getElementById("userinfo");
   	father.appendChild(username);
   	father.appendChild(logout);
   	father.appendChild(changeinfo);
   		
   				$("#username").css("position","absolute");
   				$("#username").css("font-family","TerminalDosisLight");
   				$("#username").css("font-size","30px");
   				$("#username").css("left","50px");
   				$("#username").css("top","15px"); 
   				
   				$("#logout").css("display","block");
   				$("#logout").css("position","absolute");
   				$("#logout").css("bottom","15px");
   				$("#logout").css("left","20px");
   				$("#logout").css("color","blue");
   				$("#logout").css("font-family","TerminalDosisLight");
   				$("#logout").css("font-size","20px");
   				$("#logout").click(function(){
   					alert("logout");
   					var logoutForm	=	document.createElement("form");
   					logoutForm.id	=	"logoutForm";
   					logoutForm.name	=	"logoutForm";
   					logoutForm.action		=	"servlet/Logout";
   					logoutForm.method	=	"post";
   					
   					var tmpfather	=	document.getElementById("right");
   					tmpfather.appendChild(logoutForm);
   					
   					document.logoutForm.submit();
   				});
   				
   				$("#changeinfo").css("display","block");
   				$("#changeinfo").css("position","absolute");
   				//$("#changeinfo").css("float","right");
   				$("#changeinfo").css("bottom","15px");
   				$("#changeinfo").css("right","120px");
   				$("#changeinfo").css("font-family","TerminalDosisLight");
   				$("#changeinfo").css("font-size","20px");
   				$("#changeinfo").click(function(){
   					var father	=	document.getElementById("right");
   					var changeInfoDialog	=	document.createElement("div");
   					changeInfoDialog.id		=	"changeInfoDialog";
   					changeInfoDialog.title	=	"修改用户信息";
   					
   					
   					
   					var passwordword	=	document.createElement("h3");
   					passwordword.id	=	"passwordword";
   					passwordword.innerHTML	=	"新密码";
   					var passwordinput	=	document.createElement("input");
   					passwordinput.type	=	"password";
   					passwordinput.id	=	"passwordinput";
   					
   					var passwordword2	=	document.createElement("h3");
   					passwordword2.id	=	"passwordword2";
   					passwordword2.innerHTML	=	"再次输入密码";
   					var passwordinput2	=	document.createElement("input");
   					passwordinput2.type	=	"password";
   					passwordinput2.id	=	"passwordinput2";
   					
   					changeInfoDialog.appendChild(passwordword);
   					changeInfoDialog.appendChild(passwordinput);
   					changeInfoDialog.appendChild(passwordword2);
   					changeInfoDialog.appendChild(passwordinput2);
   					father.appendChild(changeInfoDialog);
   					
   					
   					//$("#changeInfoDialog").dialog({width:400,height:400,show:'clip'});
   					
   					$("#changeInfoDialog").dialog({width:400,height:400,show:'clip',modal: true,
						overlay: {  
            				opacity: 0.5,
            				background: "green"  
						} });
					
					$('#changeInfoDialog').dialog('option', 'buttons', { "确认": function() {
						var firstpasswd	=	$("#passwordinput").val();
   						var secondpasswd	=	$("#passwordinput2").val();
   						var username	=	$("#username").val();
   						if(firstpasswd!=secondpasswd) {
   							alert("两次密码输入不同,请重新输入");
   							return false;
   						} else {
   							//ajax修改密码
   						//var password	=	escape(firstpasswd);
   						//alert(password);
   						//return false;
   						var transusername	=	document.getElementById("username").innerHTML;
   						//alert(transusername);
   						$.post("servlet/AjaxChangePassword", { Action: "POST",password:firstpasswd,username:transusername},
   							function (data, textStatus){
   								//var tmpmessage	=	data.toString();
   								//var message	=	data.message;
   								eval("var newdata="+data.toString());
   								alert(newdata.message);
   							}); 
   							$("#changeInfoDialog").empty();
   							$("#changeInfoDialog").remove();
   						}
					}});
					
   					$("#passwordword").css("float","left");
   					$("#passwordword").css("margin-top","10px");
   					$("#passwordword2").css("clear","both");
   					$("#passwordword2").css("float","left");
   					$("#passwordword2").css("width","200px");
   					$("#passwordword2").css("margin-top","10px");
   					
   					$("#passwordinput").css("float","left");
   					$("#passwordinput").css("margin-left","30px");
   					$("#passwordinput").css("margin-top","30px");
   					$("#passwordinput").css("width","300px");
   					$("#passwordinput").css("height","30px");
   					$("#passwordinput2").css("float","left");
   					$("#passwordinput2").css("margin-left","30px");
   					$("#passwordinput2").css("margin-top","30px");
   					$("#passwordinput2").css("width","300px");
   					$("#passwordinput2").css("height","30px");
					/*
   					$("#passwordinput2").blur(function() {
   						
   					});*/
   				});
		
   				
   	var windowwidth	=	$("#body").width();
   	var windowheight	=	$("#body").height();
    var welcomewordwidth	=	$("#welcomeword").width();
    var welcomewordheight	=	$("#welcomeword").height();
 	$("#welcomeword").css("top",(windowheight-welcomewordheight)/2);
   	$("#welcomeword").css("left",(windowwidth-welcomewordwidth)/2);
	$(this).delay(1500,function(){
		$("#welcome").show(1000).delay(1000,function() {
			$("#welcome").fadeOut(2000)
		});
		//$buildingup = true;	
    });

	$(this).delay(1500,function(){
		//$("#userinfo").fadeIn(2000)
		$("#userinfo").stop().animate({right:'15px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
		$buildingup = true;	
    });
    /*
    $("#secondaryMenu").hover(function(){
		//$(this).children("ul").fadeIn();
    	$("#changeMenu1").fadeOut();
    	$("#changeMenu2").fadeOut();
    	
    	
	}, function() {
		$("#changeMenu1").fadeIn();
		$("#changeMenu2").fadeIn();
	});*/
}

function showRuleInfo() {
	var	father	=	document.getElementById("transruleinfo");
	var li1	=	document.createElement("li");
	li1.id	=	"li1";
	
	var innerli1	=	document.createElement("a");
	innerli1.id	=	"innerli1";
	innerli1.innerHTML	=	"   匹配规则查看";
	li1.appendChild(innerli1);
	father.appendChild(li1);
	
	var li2	=	document.createElement("li");
	li2.id	=	"li2";
	
	var innerli2	=	document.createElement("a");
	innerli2.id	=	"innerli2";
	//innerli2.onclick	=	"transRuleInfo();";
	innerli2.innerHTML	=	"   文件分类规则";
	li2.appendChild(innerli2);
	father.appendChild(li2);
	
	$("#li1").addClass('rule_manage');
	$("#li1").click(ruleView);
	$("#innerli1").css("text-decoration","none");
	$("#innerli1").addClass('wordlist');
	$("#li2").addClass('rule_manage');
//	$("#li2").click(transRuleInfo);
	$("#innerli2").css("text-decoration","none");
	$("#innerli2").addClass('wordlist');
	
	$("#li2").toggle(function(){
			transRuleInfo();
			$("#hidemenu").show();
		},function() {
			$("#hidemenu").hide();
			var deletevar	=	document.getElementById("hidemenu");
			var father	=	document.getElementById("main");
			father.removeChild(deletevar);
//			$("#main").remove("div[id='hidemenu']");
//			$("#hidemenu").remove();
		});
}

/*function transRuleInfo() {
	$("#transfather").css("z-index","-10");
	$("#transfather").animate({top:'-83px'}, {queue:false, duration:1500, easing: 'swing'});
	var father	=	document.getElementById("transruleinfo");
	
	var ruleli1	=	document.createElement("li");
	ruleli1.id	=	"ruleli1";
	var rulea1	=	document.createElement("a");
	rulea1.id	=	"rulea1";
	rulea1.innerHTML	=	"   MSOffice";
	ruleli1.appendChild(rulea1);
	father.appendChild(ruleli1);
	
	
	
	var ruleli2	=	document.createElement("li");
	ruleli2.id	=	"ruleli2";
	var rulea2	=	document.createElement("a");
	rulea2.id	=	"rulea2";
	rulea2.innerHTML	=	"   OpenOffice";
	ruleli2.appendChild(rulea2);
	father.appendChild(ruleli2);
	
	
	var ruleli3	=	document.createElement("li");
	ruleli3.id	=	"ruleli3";
	var rulea3	=	document.createElement("a");
	rulea3.id	=	"rulea3";
	rulea3.innerHTML	=	"   其他格式";
	ruleli3.appendChild(rulea3);
	father.appendChild(ruleli3);
	
	var ruleli4	=	document.createElement("li");
	ruleli4.id	=	"ruleli4";
	var rulea4	=	document.createElement("a");
	rulea4.id	=	"rulea4";
	rulea4.innerHTML	=	"   返回上级";
	ruleli4.appendChild(rulea4);
	father.appendChild(ruleli4);
	
	$("#ruleli1").css("display","none");
	$("#ruleli1").addClass('rule_manage');
	$("#rulea1").css("text-decoration","none");
	$("#rulea1").addClass('wordlist');
	
	$("#ruleli2").css("display","none");
	$("#ruleli2").addClass('rule_manage');
	$("#rulea2").css("text-decoration","none");
	$("#rulea2").addClass('wordlist');
	
	$("#ruleli3").css("display","none");
	$("#ruleli3").addClass('rule_manage');
	$("#rulea3").css("text-decoration","none");
	$("#rulea3").addClass('wordlist');
	
	$("#ruleli4").css("display","none");
	$("#ruleli4").addClass('rule_manage');
	$("#rulea4").css("text-decoration","none");
	$("#rulea4").addClass('wordlist');
	
	$("#ruleli1").show().delay(350,function() {
		$("#ruleli2").show().delay(350,function() {
			$("#ruleli3").show().delay(350,function() {
				$("#ruleli4").show();
			});
		});
	});
	
	$(".rule_manage").hover(function() {
		$(this).animate({borderLeftWidth:"10px"});
	}, function() {
		$(this).animate({borderLeftWidth:"0px"});
	});
	
	$("#ruleli1").click(function() {
		ClassifyRule(0);
	});
	
	$("#ruleli2").click(function() {
		ClassifyRule(1);
	});
	
	$("#ruleli3").click(function() {
		ClassifyRule(2);
	});
	
	
	$("#ruleli4").click(function() {
		$("#transfather").animate({top:'0px'}, {queue:false, duration:1500, easing: 'swing'});
		
		$("#ruleli4").fadeOut(1000).delay(500,function() {
			$("#ruleli3").fadeOut(1000).delay(1000,function() {
				$("#ruleli2").fadeOut(1000).delay(1500,function() {
					$("#ruleli1").fadeOut(1000);
				});
			});
		});
		$("#ruleli4").empty().remove();
		$("#ruleli3").empty().remove();
		$("#ruleli2").empty().remove();
		$("#ruleli1").empty().remove();	
	});
}*/

function transRuleInfo() {
	var tmpX = $('#innerli2').offset().top;
	var tmp	=	$('#header').height()+$('#middle').height();
	var X	=	tmpX-tmp;
	var Y = $('#left').width();
	var $hidediv	=	$("<div id='hidemenu'></div>");
	var $ruleli1	=	$("<li class='rule_manage' id='ruleli1'></li>");
	var $rulea1	=	$("<a id='rulea1' class='wordlist'>   MSOffice</a>");
	$ruleli1.append($rulea1);
	$hidediv.append($ruleli1);
	
	
	var $ruleli2	=	$("<li class='rule_manage' id='ruleli2'></li>");
	var $rulea2	=	$("<a id='rulea2' class='wordlist'>   OpenOffice</a>");
	$ruleli2.append($rulea2);
	$hidediv.append($ruleli2);
	
	var $ruleli3	=	$("<li class='rule_manage' id='ruleli3'></li>");
	var $rulea3	=	$("<a id='rulea3' class='wordlist'>   其他格式</a>");
	$ruleli3.append($rulea3);
	$hidediv.append($ruleli3);
	
	$("#main").append($hidediv);
	
	$("#ruleli1").css({"display":"block","margin-top":"8px","width":"96%"});
	$("#rulea1").css({"text-decoration":"none","font-size":"20px"});
	
	$("#ruleli2").css({"display":"block","margin-top":"8px","width":"96%"});
	$("#rulea2").css({"text-decoration":"none","font-size":"20px"});
	
	$("#ruleli3").css({"display":"block","margin-top":"8px","width":"96%"});
	$("#rulea3").css({"text-decoration":"none","font-size":"20px"});
	
	$("#hidemenu").css({"display":"none",
						"height":"150px",
						"width":"260px",
						"position":"absolute",
						"z-index":"10000",
						"top":X+"px",
						"left":Y+"px",
						"background":"url(/animateEdition/css/normaluser/resources/menu.png)"});
		
	$("#ruleli1").click(function() {
		ClassifyRule(0);
//		$("#hidemenu").hide();
	});
	
	$("#ruleli2").click(function() {
		ClassifyRule(1);
//		$("#hidemenu").hide();
	});
	
	$("#ruleli3").click(function() {
		ClassifyRule(2);
//		$("#hidemenu").hide();
	});
	
	$(".rule_manage").hover(function() {
		$(this).animate({borderLeftWidth:"10px"});
	}, function() {
		$(this).animate({borderLeftWidth:"0px"});
	});
}

function ClassifyRule(whichclass) {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
   
    jQuery("#navgrid").jqGrid({
        url : 'servlet/ClassifyRuleinfo?class='+whichclass,
        mtype:'GET',
        datatype : "json",
        colNames : ['hideclassid','hideruleid','No.','分类规则名称','规则信息'],
        colModel : [{
            name : 'classid',
            index : 'classid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'ruleid',
            index : 'ruleid',
            width:30,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:30,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'rulename',
            index : 'rulename',
            width:240,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'ruleinfo',
        	index:'ruleinfo',
        	width:760,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "文件分类规则",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        /*altRows:true,       //隔行变色
        altclass:'redrowClass',//隔行变色样式               测试了，没成功*/
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true});
}

function datasearch() {		
	
	$("#middle").animate({height:"0px"},{duration:1000});
	$("#main").animate({height:"80%"});
	
	$("#right").css("background","url(/hibernateEdition/css/normaluser/resources/left.png)");
	var father  =   document.getElementById("right");
    father.innerHTML	=	"";
	var title	=	document.createElement("div");
	title.id	=	"title";
	title.innerHTML	=	"ContentSearch";
	
	father.appendChild(title);
	$("#title").css("font-family","TerminalDosisLight");
	$("#title").css("margin-top","5px");
	$("#title").css("margin-left","15px");
	$("#title").css("font-size","35px");
	$("#title").css("color","orange");
	//title style
	$("#title").fadeIn(3000);
	
	var wholearea	=	document.createElement("div");
	wholearea.id	=	"wholearea";
	father.appendChild(wholearea);
	$("#wholearea").css("position","absolute");
	$("#wholearea").css("margin-left","0px");
	$("#wholearea").css("margin-top","30px");
	$("#wholearea").css("height","370px");	
	$("#wholearea").css("width",$("#right").width());
	//alert(middle);
	/*
	var searcharea	=	document.createElement("div");
	searcharea.id	=	"searcharea";
	wholearea.appendChild(searcharea);
	$("#searcharea").css("float","left");
	$("#searcharea").css("margin-left",middle);  //120px
	$("#searcharea").css("margin-left",middle);  //200px !important
	$("#searcharea").css("margin-top","15px");
	$("#searcharea").css("padding","0px");
	$("#searcharea").css("width","520px");
	$("#searcharea").css("height","50px");
	$("#searcharea").css("border","2px solid black");
	*/
	var searchtext	=	document.createElement("input");
	searchtext.id	=	"searchtext";
	wholearea.appendChild(searchtext);
	
	var Obj	=	document.getElementById("right");
	var rightwidth	=	Obj.offsetWidth;
	var middle	=	(rightwidth-520)/2;
	//动态计算居中，每种浏览器，每台电脑获取的宽度都不同；
	
	$("#searchtext").css("float","left");
	$("#searchtext").css("margin-left",middle-50);    //marin:0px;
	$("#searchtext").css("padding","0px");
	$("#searchtext").css("width","400px");
	$("#searchtext").css("height","40px");
	$("#searchtext").css("border","1px solid orange");
	$("#searchtext").css("font-size","25px");
	$("#searchtext").css("font-family","微软雅黑");
	
	var searchbutton	=	document.createElement("input");
	searchbutton.id	=	"searchbutton";
	searchbutton.type	=	"button";
	searchbutton.value	=	"查询";
	wholearea.appendChild(searchbutton);

	$("#searchbutton").css("float","left");
	$("#searchbutton").css("margin-left","0px");
	$("#searchbutton").css("padding","0px");
	$("#searchbutton").css("width","100px");
	$("#searchbutton").css("height","43px");
	$("#searchbutton").css("font-family","TerminalDosisLight");
	$("#searchbutton").css("border","1px solid orange");
	
	var bottomside1	=	document.createElement("div");
	bottomside1.id	=	"bottomside1";
	var bottomside2	=	document.createElement("div");
	bottomside2.id	=	"bottomside2";
	var bottomside3	=	document.createElement("div");
	bottomside3.id	=	"bottomside3";
	
	var tmp	=	document.createElement("div");
	tmp.id	=	"timesort";
	bottomside1.appendChild(tmp);
	
	tmp	=	document.createElement("div");
	tmp.id	=	"relationsort";
	bottomside1.appendChild(tmp);
	
	tmp	=	document.createElement("div");
	tmp.id	=	"start";
	bottomside2.appendChild(tmp);
	
	var inputtmp	=	document.createElement("input");
	inputtmp.id	=	"startDate";
	tmp.appendChild(inputtmp);
	
	tmp	=	document.createElement("div");
	tmp.id	=	"end";
	bottomside2.appendChild(tmp);
	
	inputtmp	=	document.createElement("input");
	inputtmp.id	=	"endDate";
	tmp.appendChild(inputtmp);
	
	
	tmp	=	document.createElement("div");
	tmp.id	=	"checkbox";
	
	var typeinput1	=	document.createElement("input");
	typeinput1.type	=	"checkbox";
	typeinput1.id	=	"typeinput1";
	
	var typelabel1	=	document.createElement("label");
	typelabel1.innerHTML	=	".DOC";
	tmp.appendChild(typeinput1);
	tmp.appendChild(typelabel1);
	
	var typeinput2	=	document.createElement("input");
	typeinput2.type	=	"checkbox";
	typeinput2.id	=	"typeinput2";
	
	var typelabel2	=	document.createElement("label");
	typelabel2.innerHTML	=	".PDF";
	tmp.appendChild(typeinput2);
	tmp.appendChild(typelabel2);
	
	var typeinput3	=	document.createElement("input");
	typeinput3.type	=	"checkbox";
	typeinput3.id	=	"typeinput3";
	
	var typelabel3	=	document.createElement("label");
	typelabel3.innerHTML	=	".TXT";
	tmp.appendChild(typeinput3);
	tmp.appendChild(typelabel3);
	
	bottomside3.appendChild(tmp);

	var $options	=	$("<div id='options'></div>");
	$options.css({"position":"relative","width":$("#right").width(),"height":"300px"});
	$(wholearea).append($options);
	
	$options.append($(bottomside1)).append($(bottomside3)).append($(bottomside2));

	/*wholearea.appendChild(bottomside1);
	wholearea.appendChild(bottomside3);
	wholearea.appendChild(bottomside2);*/
	
	$("#checkbox").css("float","left");
	$("#checkbox").css("margin-top","60px");
	$("#checkbox").css("margin-left","30px");
	$("#checkbox").css("width","270px");
	$("#checkbox").css("height","50px");
	$(typelabel1).attr("for","typeinput1");
	$(typelabel2).attr("for","typeinput2");
	$(typelabel3).attr("for","typeinput3");
	$("#checkbox").buttonset();
	
/*	$("#bottomside1").css("float","left");
	$("#bottomside1").css("margin-left","20px");
	$("#bottomside1").css("margin-top","30px");
	$("#bottomside1").css("width","307px");
	$("#bottomside1").css("height","100px");
	$("#bottomside1").css("background","url(/animateEdition/css/search/resources/rightside1.png)");*/
	
	$("#bottomside1").css("float","left");
	$("#bottomside1").css("margin-top","30px");
	$("#bottomside1").css("width","307px");
	$("#bottomside1").css("height","100px");	
	$("#bottomside1").css("background","url(/animateEdition/css/search/resources/rightside1.png)");
	
	/*$("#bottomside2").css("float","left");
	$("#bottomside2").css("margin-left","20px");
	$("#bottomside2").css("margin-top","30px");
	$("#bottomside2").css("width","307px");
	$("#bottomside2").css("height","100px");
	$("#bottomside2").css("background","url(/animateEdition/css/search/resources/rightside2.png)");*/
	
	$("#bottomside2").css("float","left");
	$("#bottomside2").css("margin-top","30px");
	$("#bottomside2").css("width","307px");
	$("#bottomside2").css("height","100px");
	$("#bottomside2").css("background","url(/animateEdition/css/search/resources/rightside2.png)");
	
	/*$("#bottomside3").css("float","left");
	$("#bottomside3").css("margin-left","20px");
	$("#bottomside3").css("margin-top","30px");
	$("#bottomside3").css("width","307px");
	$("#bottomside3").css("height","200px");
	$("#bottomside3").css("background","url(/animateEdition/css/search/resources/rightside3.png)");*/
	
	$("#bottomside3").css("float","left");
	$("#bottomside3").css("margin-top","30px");
	$("#bottomside3").css("width","307px");
	$("#bottomside3").css("height","200px");
	$("#bottomside3").css("background","url(/animateEdition/css/search/resources/rightside3.png)");
	
	$("#bottomside1, #bottomside2, #bottomside3").css("margin-left",($("#right").width()-$("#bottomside1").width()-$("#bottomside2").width()-$("#bottomside3").width())/4);
	
	$("#timesort").css("display","block");
	$("#timesort").css("float","left");
	$("#timesort").css("margin-top","43px");
	$("#timesort").css("width","150px");
	$("#timesort").css("height","55px");
	$("#timesort").css("border","0px solid orange");
	
	
	$("#relationsort").css("display","block");
	$("#relationsort").css("float","right");
	$("#relationsort").css("margin-top","43px");
	$("#relationsort").css("width","150px");
	$("#relationsort").css("height","55px");
	$("#relationsort").css("border","0px solid orange");
	
	
	$("#start").css("display","block");
	$("#start").css("float","left");
	$("#start").css("margin-top","63px");
	$("#start").css("width","150px");
	$("#start").css("height","35px");
	$("#start").css("border","0px solid orange");
	
	
	$("#end").css("display","block");
	$("#end").css("float","right");
	$("#end").css("margin-top","63px");
	$("#end").css("width","150px");
	$("#end").css("height","35px");
	$("#end").css("border","0px solid orange");
	
	$("#startDate").css("float","left");
	$("#startDate").css("margin-top","63px");
	$("#startDate").css("width","148px");
	$("#startDate").css("height","35px");
	$("#startDate").css("margin","0px");
	$("#startDate").css("font-size","20px");
	
	$("#endDate").css("float","left");
	$("#endDate").css("width","148px");
	$("#endDate").css("height","35px");
	$("#endDate").css("margin","0px");
	$("#endDate").css("font-size","20px");
	
	
	
			$("#timesort").click(function() {	
				document.getElementById("hidetimeSort").innerHTML	=	"true";
				document.getElementById("hiderelationSort").innerHTML	=	"false";
				$(this).animate({borderWidth:"2px"});
				$("#relationsort").animate({borderWidth:"0px"});
			});
	
			$("#relationsort").click(function() {			
				document.getElementById("hiderelationSort").innerHTML	=	"true";
				document.getElementById("hidetimeSort").innerHTML	=	"false";
				$("#timesort").animate({borderWidth:"0px"});
				$(this).animate({borderWidth:"2px"});
			});
			
			$("#startDate").datepicker({dateFormat:"yy-mm-dd"});
			$("#endDate").datepicker({dateFormat:"yy-mm-dd"});
			$("#searchbutton").button();
			
			$("#searchbutton").click(function() {
				if(document.getElementById("searchtext").value=="") {
					
					var alertdialog	=	document.createElement("div");
					alertdialog.id	=	"alertdialog";
					var father	=	document.getElementById("right");
					alertdialog.innerHTML	=	"请先输入关键字";
					father.appendChild(alertdialog);
					
					
					$("#alertdialog").dialog({width:300,height:100,show:'slide',modal: true,
					overlay: {  
            			opacity: 0.5,  
            			background: "orange"  
					} });
					return false;
				} else {
					searchsubmit();
					
				}
			});			
}

function checkAllFile(whichclass) {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;        //这里是不是用offsetWidth?，浏览器大小变化后，页面布局出现问题
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
    
    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
   
    jQuery("#navgrid").jqGrid({
        url : 'servlet/CheckFileinfo?class='+whichclass+'&suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hidefileid','No.','文件名称','原文件路径','分类文件路径','文件磁盘序列号'],
        colModel : [{
            name : 'fileid',
            index : 'fileid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:30,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'filename',
            index : 'filename',
            width:240,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'originpath',
        	index:'originpath',
        	width:300,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
        	name:'classifypath',
        	index:'classifypath',
        	width:300,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
        	name:'diskserialno',
        	index:'diskserialno',
        	width:300,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "文件信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        /*altRows:true,       //隔行变色
        altclass:'redrowClass',//隔行变色样式               测试了，没成功*/
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"下载文件",buttonicon:"ui-icon-newwin",onClickButton:function() {
   			//下载文件
   	
   }});
}

function compare_time(a,b) {
   var arr=a.split("-");
   var starttime=new Date(arr[0],arr[1],arr[2]);
   var starttimes=starttime.getTime(); 
   var arrs=b.split("-"); 
   var endtime=new Date(arrs[0],arrs[1],arrs[2]);
   var endtimes=endtime.getTime();
   if(starttimes>endtimes)//开始大于结束
   {
     	return false;
   } 
   else{ 
    	return true; 
   }
}

function searchsubmit() {
	var ready	=	false;
	var errorMessage		=	"";

	var searchkey	=	null;
	
	searchkey	=	document.getElementById("searchtext").value; /*注意这里如果继续getAttribute("value")，则只有IE能正常，其余浏览器都是null*/
	
	var timesort	=	document.getElementById("hidetimeSort").innerHTML;
	var relationsort	=	document.getElementById("hiderelationSort").innerHTML;
	
	var startTime	=	document.getElementById("startDate").value;
	var endTime	=	document.getElementById("endDate").value;
	
	
	if(startTime!=null&&endTime!=null) {
		if(compare_time(startTime,endTime)==false) {
			errorMessage	+=	"起始时间不能大于结束时间，请重新输入";
		}
	}
	
	if(errorMessage!="") {
		var errorDialog	=	document.createElement("div");
		errorDialog.id	=	"errorDialog";
		errorDialog.title	=	"错误信息";
		var errordiv	=	document.createElement("div");
		errordiv.innerHTML	=	errorMessage;
		var father	=	document.getElementById("right");
		errorDialog.appendChild(errordiv);
		father.appendChild(errorDialog);
		$("#errorDialog").dialog({width:380,height:200,show:'slide'});
		return false;
	} 
	
	var typearray	=	new Array();
	var $checkarray	=	$("#checkbox>input");
	var $checkradio	=	null;
	var name	=	null;
	$checkarray.each(function() {
		if($(this).attr("checked")) {
			typearray.push($(this).next("label").text());
		} 
	});
	var typearraystr	=	typearray.toString();
	
	var tmpform	=	document.createElement("form");
	tmpform.id	=	"tmpform";
	tmpform.name	=	"tmpform";				//document.formname而不是formid，注意
	tmpform.action	=	"servlet/SearchAllTrans";
	tmpform.method	=	"POST";
	tmpform.target="_blank";     //新窗口打开
	var father	=	document.getElementById("right");
	father.appendChild(tmpform);
	
	var tmpsearchkey	=	document.createElement("input");
	tmpsearchkey.type	=	"hidden";
	tmpsearchkey.name	=	"searchKey";
	tmpsearchkey.value	=	searchkey;
	tmpform.appendChild(tmpsearchkey);
	
	var tmpdoctype	=	document.createElement("input");
	tmpdoctype.type	=	"hidden";
	tmpdoctype.name	=	"docType";
	tmpdoctype.value	=	typearraystr;
	tmpform.appendChild(tmpdoctype);
	
	var tmpstartTime	=	document.createElement("input");
	tmpstartTime.type	=	"hidden";
	tmpstartTime.name	=	"startTime";
	tmpstartTime.value	=	startTime;
	tmpform.appendChild(tmpstartTime);
	
	var tmpendTime	=	document.createElement("input");
	tmpendTime.type	=	"hidden";
	tmpendTime.name	=	"endTime";
	tmpendTime.value	=	endTime;
	tmpform.appendChild(tmpendTime);
	
	var tmptimesort	=	document.createElement("input");
	tmptimesort.type	=	"hidden";
	tmptimesort.name	=	"timesort";
	tmptimesort.value	=	timesort;
	tmpform.appendChild(tmptimesort);
	
	var tmprelationsort	=	document.createElement("input");
	tmprelationsort.type	=	"hidden";
	tmprelationsort.name	=	"relationsort";
	tmprelationsort.value	=	relationsort;
	tmpform.appendChild(tmprelationsort);
	
	//window.open( "http://localhost:8080/animateEdition/servlet/SearchAll", "searchPage", "fullscreen=no,resizable=yes,toolbar=yes, menubar=yes, scrollbars=yes,scrollbars=yes ");
	/*
	var obj = new Object();
    obj.name="searchPage";
    window.showModalDialog("http://localhost:8080/animateEdition/servlet/SearchAll",obj,"dialogWidth=200px;dialogHeight=100px");
	
	
	window.showModalDialog('2.jsp'+带的参数,'',"dialogWidth=700px;dialogHeight=300px"); 
	*
	*/
	document.tmpform.submit();
	document.getElementById("tmpform").innerHTML	=	"";
	$("#tmpform").remove();
	
	
}

function mails() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	
	var rightwidth	=	father.offsetWidth;
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagermail";
    table.id    =   "mailgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
    //alert("suspect id is:" +suspectid);

    jQuery("#mailgrid").jqGrid({
        url : 'servlet/Mailinfo?suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hidediskid','hideid','No.','来源账户','邮件主题','发送人地址','收件人地址','抄送人地址','时间', '文件路径','关联磁盘序列号','附件名称','来源客户端'],
        colModel : [{
            name : 'diskid',
            index : 'diskid',
            width:20,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'mailid',
            index : 'mailid',
            width:20,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:20,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'accountname',
            index : 'accountname',
            width:70,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'mailtheme',
            index : 'mailtheme',
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'senderaddr',
        	index:'senderaddr',
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'receiveraddr',
            index : 'receiveraddr',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'otheraddr',
            index : 'otheraddr',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'time',
            index : 'time',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'filepath',
            index : 'filepath',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'diskserialno',
            index : 'diskserialno',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'attachment',
            index : 'attachment',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'sourceclient',
            index : 'sourceclient',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagermail',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "邮件信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        height :"375px",
        autowidth:false,
        shrinkToFit:false,
        scroll:true,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagermail',{edit:false,add:true,del:true,search:true,refresh:true});
    
      $("#mailgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-x' : 'scroll' });
}
/*
function imclient() {
	//alert("yes");
	var father  =   document.getElementById("right");
    father.innerHTML	=	"";
    //$("#right").css("background","/animateEdition/css/normaluser/resources/stripe.png");
    
    var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
    
    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
   // alert(suspectid);
    
    $.post("servlet/IMclient", { Action: "POST", Suspectid:"'"+suspectid+"'"}, function (data, textStatus){ 
  				var i	=	0;
  				//alert(data.length+data[0]+data[1]+data[2]);			
  				while(i<data.length) {
  					if(data[i]=="QQ") {
  						var imdiv	=	document.createElement("div");
  					 	imdiv.id	=	"imclient1";
  					 	
  					 	//var parent	=	document.getElementById("right");
  					 	//$("#right").css("background","url(/animateEdition/css/normaluser/resources/mbg5.jpg)");
  					 	father.appendChild(imdiv);
  					 	$("#imclient1").css("display","block");
  					 	$("#imclient1").css("float","left");
  					 	$("#imclient1").css("margin-left","160px");
  					 	$("#imclient1").css("margin-top","60px");
  					 	$("#imclient1").css("height","298px");
  					 	$("#imclient1").css("width","130px");
  					 	$("#imclient1").css("background","url(/animateEdition/css/normaluser/resources/qq.png)");		 	
  					 	
						imdiv.onclick	=	function (){
							var table   =   document.createElement("table");
   							var navpager    =   document.createElement("div");
    						navpager.id     =   "pagernav";
   							table.id    =   "navgrid";
    						var father = document.getElementById("right");
							father.innerHTML = "";
							father.appendChild(table);
							father.appendChild(navpager);

							var editOptions = {
								top : '150',
								left : "100",
								width : '300',
								closeOnEscape : true,
								closeAfterEdit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).attr('readonly','readonly');
									//$('#name', form).attr('readonly','readonly');

								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var addOptions = {
								top : '150',
								left : "100",
								width : '300',
								addedrow : 'first',
								closeOnEscape : true,
								closeAfterAdd : true,
								reloadAfterSubmit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).removeAttr('readonly');
									//$('#name', form).removeAttr('readonly');
									// $('#name',
									// form).attr("readonly","false");
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var delOptions = {
								top : '150',
								left : "100",
								width : '300',
								reloadAfterSubmit : true,
								onclickSubmit : function(params) {
									var sr = jQuery("#navgrid").getGridParam('selrow');
									rowdata = jQuery("#navgrid").getRowData(sr);
									// alert(params);
									// alert(rowdata.name);
									return {
										name : rowdata.name
									};
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							jQuery("#navgrid").jqGrid({
								url : '',
								mtype : 'POST',
								datatype : "json",
								colNames : ['Inv No', '帐号', '昵称', '来源类型','来源路径','关联帐号'],
								colModel : [{
											name : 'id',
											index : 'id',
											width : 60,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'account',
											index : 'account',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}, {
											name : 'nickname',
											index : 'nickname',
											width : 150,
											height : 90,
											editable : true,
											editoptions : {
												readonly : false,
												size : 20
											}
										}, {
											name : 'sourcetype',
											index : 'sourcetype',
											width : 150,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'sourcepath',
											index : 'sourcepath',
											width : 170,
											height : 90,
											editable : true,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'relateaccount',
											index : 'relateaccount',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}],
								rowNum : 10,
								rowList : [10, 20, 30],
								pager : '#pagernav',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								caption : "QQ信息",
								editurl : "", // 这里设置表更新时，要发送到的地址
								height : "375px",
								scrollOffset : 0,
								jsonReader : {
									repeatitems : false
									// 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
								}
							}).navGrid('#pagernav', {
										edit : true,
										add : true,
										del : true,
										search : true,
										refresh : true
									}, editOptions, addOptions, delOptions);
						};
  					 	
  					} else if(data[i]=="Skype") {
  						var imdiv	=	document.createElement("div");
  					 	imdiv.id	=	"imclient3";
  					 	//var parent	=	document.getElementById("right");
  					 	//$("#right").css("background","url(/animateEdition/css/normaluser/resources/mbg5.jpg)");
  					 	father.appendChild(imdiv);
  					 	$("#imclient3").css("float","left");
  					 	$("#imclient3").css("margin-left","30px");
  					 	$("#imclient3").css("margin-top","60px");
  					 	$("#imclient3").css("height","298px");
  					 	$("#imclient3").css("width","130px");
  					 	$("#imclient3").css("background","url(/animateEdition/css/normaluser/resources/skype.png)");
  					 	
  					 	imdiv.onclick	=	function (){
							var table   =   document.createElement("table");
   							var navpager    =   document.createElement("div");
    						navpager.id     =   "pagernav";
   							table.id    =   "navgrid";
    						var father = document.getElementById("right");
							father.innerHTML = "";
							father.appendChild(table);
							father.appendChild(navpager);

							var editOptions = {
								top : '150',
								left : "100",
								width : '300',
								closeOnEscape : true,
								closeAfterEdit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).attr('readonly','readonly');
									//$('#name', form).attr('readonly','readonly');

								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var addOptions = {
								top : '150',
								left : "100",
								width : '300',
								addedrow : 'first',
								closeOnEscape : true,
								closeAfterAdd : true,
								reloadAfterSubmit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).removeAttr('readonly');
									//$('#name', form).removeAttr('readonly');
									// $('#name',
									// form).attr("readonly","false");
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var delOptions = {
								top : '150',
								left : "100",
								width : '300',
								reloadAfterSubmit : true,
								onclickSubmit : function(params) {
									var sr = jQuery("#navgrid").getGridParam('selrow');
									rowdata = jQuery("#navgrid").getRowData(sr);
									// alert(params);
									// alert(rowdata.name);
									return {
										name : rowdata.name
									};
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							jQuery("#navgrid").jqGrid({
								url : '',
								mtype : 'POST',
								datatype : "json",
								colNames : ['Inv No', '帐号', '昵称', '来源类型','来源路径','关联帐号'],
								colModel : [{
											name : 'id',
											index : 'id',
											width : 60,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'account',
											index : 'account',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}, {
											name : 'nickname',
											index : 'nickname',
											width : 150,
											height : 90,
											editable : true,
											editoptions : {
												readonly : false,
												size : 20
											}
										}, {
											name : 'sourcetype',
											index : 'sourcetype',
											width : 150,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'sourcepath',
											index : 'sourcepath',
											width : 170,
											height : 90,
											editable : true,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'relateaccount',
											index : 'relateaccount',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}],
								rowNum : 10,
								rowList : [10, 20, 30],
								pager : '#pagernav',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								caption : "QQ信息",
								editurl : "", // 这里设置表更新时，要发送到的地址
								height : "375px",
								scrollOffset : 0,
								jsonReader : {
									repeatitems : false
									// 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
								}
							}).navGrid('#pagernav', {
										edit : true,
										add : true,
										del : true,
										search : true,
										refresh : true
									}, editOptions, addOptions, delOptions);
						};
						
  					} else if(data[i]=="MSN") {
  						var imdiv	=	document.createElement("div");
  					 	imdiv.id	=	"imclient4";
  					 	
  					 	father.appendChild(imdiv);
  					 	$("#imclient4").css("float","left");
  					 	$("#imclient4").css("margin-left","30px");
  					 	$("#imclient4").css("margin-top","60px");
  					 	$("#imclient4").css("height","298px");
  					 	$("#imclient4").css("width","130px");
  					 	$("#imclient4").css("background","url(/animateEdition/css/normaluser/resources/msn.png)");
  					 	
  					 	imdiv.onclick	=	function (){
							var table   =   document.createElement("table");
   							var navpager    =   document.createElement("div");
    						navpager.id     =   "pagernav";
   							table.id    =   "navgrid";
    						var father = document.getElementById("right");
							father.innerHTML = "";
							father.appendChild(table);
							father.appendChild(navpager);

							var editOptions = {
								top : '150',
								left : "100",
								width : '300',
								closeOnEscape : true,
								closeAfterEdit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).attr('readonly','readonly');
									//$('#name', form).attr('readonly','readonly');

								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var addOptions = {
								top : '150',
								left : "100",
								width : '300',
								addedrow : 'first',
								closeOnEscape : true,
								closeAfterAdd : true,
								reloadAfterSubmit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).removeAttr('readonly');
									//$('#name', form).removeAttr('readonly');
									// $('#name',
									// form).attr("readonly","false");
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var delOptions = {
								top : '150',
								left : "100",
								width : '300',
								reloadAfterSubmit : true,
								onclickSubmit : function(params) {
									var sr = jQuery("#navgrid").getGridParam('selrow');
									rowdata = jQuery("#navgrid").getRowData(sr);
									// alert(params);
									// alert(rowdata.name);
									return {
										name : rowdata.name
									};
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							jQuery("#navgrid").jqGrid({
								url : '',
								mtype : 'POST',
								datatype : "json",
								colNames : ['Inv No', '帐号', '昵称', '来源类型','来源路径','关联帐号'],
								colModel : [{
											name : 'id',
											index : 'id',
											width : 60,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'account',
											index : 'account',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}, {
											name : 'nickname',
											index : 'nickname',
											width : 150,
											height : 90,
											editable : true,
											editoptions : {
												readonly : false,
												size : 20
											}
										}, {
											name : 'sourcetype',
											index : 'sourcetype',
											width : 150,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'sourcepath',
											index : 'sourcepath',
											width : 170,
											height : 90,
											editable : true,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'relateaccount',
											index : 'relateaccount',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}],
								rowNum : 10,
								rowList : [10, 20, 30],
								pager : '#pagernav',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								caption : "QQ信息",
								editurl : "", // 这里设置表更新时，要发送到的地址
								height : "375px",
								scrollOffset : 0,
								jsonReader : {
									repeatitems : false
									// 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
								}
							}).navGrid('#pagernav', {
										edit : true,
										add : true,
										del : true,
										search : true,
										refresh : true
									}, editOptions, addOptions, delOptions);
						};
  					 	
  					} else if(data[i]=="AliWangwang") {
  						var imdiv	=	document.createElement("div");
  					 	imdiv.id	=	"imclient5";
  					 	//var parent	=	document.getElementById("right");
  					 	//$("#right").css("background","url(/animateEdition/css/normaluser/resources/mbg5.jpg)");
  					 	father.appendChild(imdiv);
  					 	$("#imclient5").css("float","left");
  					 	$("#imclient5").css("margin-left","30px");
  					 	$("#imclient5").css("margin-top","60px");
  					 	$("#imclient5").css("height","298px");
  					 	$("#imclient5").css("width","130px");
  					 	$("#imclient5").css("background","url(/animateEdition/css/normaluser/resources/Aliwangwang.png)");
  					 	
  					 	imdiv.onclick	=	function (){
							var table   =   document.createElement("table");
   							var navpager    =   document.createElement("div");
    						navpager.id     =   "pagernav";
   							table.id    =   "navgrid";
    						var father = document.getElementById("right");
							father.innerHTML = "";
							father.appendChild(table);
							father.appendChild(navpager);

							var editOptions = {
								top : '150',
								left : "100",
								width : '300',
								closeOnEscape : true,
								closeAfterEdit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).attr('readonly','readonly');
									//$('#name', form).attr('readonly','readonly');

								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var addOptions = {
								top : '150',
								left : "100",
								width : '300',
								addedrow : 'first',
								closeOnEscape : true,
								closeAfterAdd : true,
								reloadAfterSubmit : true,
								beforeShowForm : function(form) {
									//$('#userid', form).removeAttr('readonly');
									//$('#name', form).removeAttr('readonly');
									// $('#name',
									// form).attr("readonly","false");
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							var delOptions = {
								top : '150',
								left : "100",
								width : '300',
								reloadAfterSubmit : true,
								onclickSubmit : function(params) {
									var sr = jQuery("#navgrid").getGridParam('selrow');
									rowdata = jQuery("#navgrid").getRowData(sr);
									// alert(params);
									// alert(rowdata.name);
									return {
										name : rowdata.name
									};
								},
								afterSubmit : function(response, postdata) {
									var success = true;
									var message = "";

									jQuery("#navgrid").trigger("reloadGrid");
									var new_id = "1";
									return [success, message, new_id];
								}
							};

							jQuery("#navgrid").jqGrid({
								url : '',
								mtype : 'POST',
								datatype : "json",
								colNames : ['Inv No', '帐号', '昵称', '来源类型','来源路径','关联帐号'],
								colModel : [{
											name : 'id',
											index : 'id',
											width : 60,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'account',
											index : 'account',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}, {
											name : 'nickname',
											index : 'nickname',
											width : 150,
											height : 90,
											editable : true,
											editoptions : {
												readonly : false,
												size : 20
											}
										}, {
											name : 'sourcetype',
											index : 'sourcetype',
											width : 150,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'sourcepath',
											index : 'sourcepath',
											width : 170,
											height : 90,
											editable : true,
											editoptions : {
												readonly : true,
												size : 10
											}
										}, {
											name : 'relateaccount',
											index : 'relateaccount',
											width : 250,
											height : 90,
											editable : false,
											editoptions : {
												readonly : true,
												size : 20
											}
										}],
								rowNum : 10,
								rowList : [10, 20, 30],
								pager : '#pagernav',
								sortname : 'id',
								viewrecords : true,
								sortorder : "desc",
								caption : "QQ信息",
								editurl : "", // 这里设置表更新时，要发送到的地址
								height : "375px",
								scrollOffset : 0,
								jsonReader : {
									repeatitems : false
									// 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
								}
							}).navGrid('#pagernav', {
										edit : true,
										add : true,
										del : true,
										search : true,
										refresh : true
									}, editOptions, addOptions, delOptions);
						};
  					 	
  					} else {
  						
  					}			
  					i++;
  				}
  			},"json");	
}
*/


function imclient() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagermail";
    table.id    =   "mailgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    var suspectid	=	document.getElementById("suspectname").getAttribute("title");    
    
    
    var editOptions={
   		//不可编辑
   };
   
   //var selectdisk	=	new Object();
    
   var addOptions={
   		top: '150', left: "100", width: '300',
   		mtype:"POST",addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
      	onclickSubmit:function(params){
       			return {managerid:rowData.userid};
       		},
   		beforeShowForm: function(form) {
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#mailgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
   
   
   var delOptions={
   		//不可删除
   };
       
    jQuery("#mailgrid").jqGrid({
        url : 'servlet/IMinfo?suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hideimid','No.','帐号','密码','关联磁盘id','关联磁盘序列号','帐号类型','来源类型'],
        colModel : [{
            name : 'imid',
            index : 'imid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:30,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'account',
            index : 'account',
            width:240,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'password',
        	index:'password',
        	width:240,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'relatedisk',
            index : 'relatedisk',
            width:400,
            height:90,
            hidden:true,
            editable : true,
            editoptions : {
            	readonly:true
            }
        },{
            name : 'relatediskserialno',
            index : 'relatediskserialno',
            width:400,
            height:90,
            editable : true,
            editoptions : {
            	readonly:true
            }
        },{
            name : 'accounttype',
            index : 'accounttype',
            width:180,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'srctype',
            index : 'srctype',
            width:180,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagermail',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "即时通信工具信息",
        editurl:"servlet/Edit_IMinfo",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        /*altRows:true,       //隔行变色
        altclass:'redrowClass',//隔行变色样式               测试了，没成功*/
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagermail',{edit:false,add:true,del:false,search:true,refresh:true},editOptions,addOptions,delOptions).navButtonAdd("#pagermail",{caption:"查看聊天记录",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		var selrow	=	$("#mailgrid").getGridParam("selrow");  
   		if(selrow==null) {
   			alert("请先选择一个帐号！");
   			return false;
   		}
   		var rowdata = jQuery("#mailgrid").getRowData(selrow);
   		//alert(rowdata.imid);
   		var imid	=	rowdata.imid;
   		var account	=	rowdata.account;
   		
   		var father	=	document.getElementById("right");
   		father.innerHTML	=	"";
   		
   		var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
   		
   		var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    
    var editOptions	=	{};
    
    var addOptions={
   		top: '150', left: "100", width: '300',height:'1500',mtype:"POST",
   		addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
      	onclickSubmit:function(params){
       			return {transimid:imid};
       		},
   		beforeShowForm: function(form) { 
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
   
   
   var delOptions={
   		top: '50', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST",
   		onclickSubmit:function(params){
   			var sr = jQuery("#navgrid").getGridParam('selrow');
   			rowdata = jQuery("#navgrid").getRowData(sr);
   		
   			return {chatmessageid:rowdata.chatid};
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id];
  		 }
   };
   
   
    jQuery("#navgrid").jqGrid({
        url : 'servlet/FriendList?accountid='+imid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hideimid','hidechatid','No.','发信人帐号','收信人帐号','聊天内容','聊天时间','来源类型','来源路径'],
        colModel : [{
            name : 'imid',
            index : 'imid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'chatid',
            index : 'chatid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:35,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'senderaccount',
            index : 'senderaccount',
            width:140,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
            name : 'receiveraccount',
            index : 'receiveraccount',
            width:140,
            height:90,
            editable : true,
            editoptions : {
                readonly : false,
                size : 20
            }
        },{
            name : 'chatmessage',
            index : 'chatmessage',
            width:340,
            height:90,
            editable : true,
            edittype:'textarea',
            editoptions : {
                readonly : false,
                rows:"4",cols:"35"
            }
        },{
            name : 'chattime',
            index : 'chattime',
            width:120,
            height:90,
            editable : true,
            editoptions : {
                readonly : false,
                size : 20
            }
        },{
            name : 'sourcetype',
            index : 'sourcetype',
            width:100,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'sourcepath',
            index : 'sourcepath',
            width:200,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "帐号为"+account+"的好友记录",
        editurl:"servlet/Edit_friendlist",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		imclient(); 		
   	}});
   }});
    
      //$("#mailgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-x' : 'scroll' });

}


function suspect() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});

	var father  =   document.getElementById("right");
    father.innerHTML	=	"";
	
   	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	
  	var gridheight	=	mainheight-30-30-34;
  	
  	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    
    father.appendChild(table);
    father.appendChild(navpager);
    
    	jQuery("#navgrid").jqGrid({
        url : 'servlet/ShowCertainSuspect',
        mtype:'POST',
        datatype : "json",
        colNames : ['Inv No', 'hideID','嫌疑人姓名', '嫌疑人身份号','备注'],
        colModel : [{
            name : 'id',
            index : 'id',
            width : 50,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'suspect_ID',
            index : 'suspect_ID',
            width : 280,
            height:95,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'name',
            index : 'name',
            width : 280,
            height:95,
            editable : false,
            editoptions : {
            	readonly:true,
                size : 15
            }
        },{
            name : 'identity',
            index : 'identity',
            width : 280,
            height:95,
            editable : false,
            editoptions : {
            	readonly:true,
                size : 15
            }
        },{
        	name:'notes',
        	index:'notes',
        	width:500,
        	height:95,
        	editable:false,
        	edittype: "textarea",
        	editoptions : {
        		readonly : true,
        		size : 15
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "嫌疑人信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height : gridheight,
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"确认",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		var selrow	=	$("#navgrid").getGridParam("selrow");  
   		if(selrow==null) {
   			alert("请先选择一个用户！");
   			return false;
   		}
   		
   		var flag	=	false;
   		var cleardiv	=	document.getElementById("suspectname");
   		if(cleardiv!=null) {
   			cleardiv.innerHTML	=	"";
   		
   			document.getElementById("chosensuspect").removeChild(cleardiv);
   			flag	=	true;
   		}
   		var rowdata = jQuery("#navgrid").getRowData(selrow);
   		var suspect	=	rowdata.name;
   		var suspectid	=	rowdata.suspect_ID;
   		
   		
   		//hide.name	=	suspectid;
   		//hide.id	=	"suspectid";
   		//$("#suspectid").hide();

   		var word	=	document.createElement("div");
   		word.id	=	"suspectname";
   		word.title	=	suspectid;
   		word.innerHTML	=	suspect;
   		
   		var father 	=	document.getElementById("chosensuspect");
   		father.appendChild(word);
   		
   		$("#suspectname").css("position","absolute");
   		$("#suspectname").css("font-family","TerminalDosisLight");
   		$("#suspectname").css("font-size","30px");
   		$("#suspectname").css("right","200px");
   		$("#suspectname").css("top","35px");
   		//$("#suspectname").css("border-radius","5px");
   		if(flag	==false) {
   			$buildingup = false;
			//$("#userinfo").stop().animate({right:'190px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
			$("#chosensuspect").stop().animate({top:'2px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});
			
			$("#username").hide();
			$("#logout").hide();
			$("#changeinfo").hide();
			$("#suspectname").mousedown(function() {
					$("#chosensuspect").stop().animate({top:'-200px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});			
					$("#username").fadeIn(600);
					$("#logout").fadeIn(600);
					$("#changeinfo").fadeIn(600);
			});
			
			$("#username").mousedown(function() {
					$("#chosensuspect").stop().animate({top:'2px'}, {queue:false, duration:2000, easing: 'easeInOutBack'});	
					//$("#titlebar").fadeOut(100);
					$("#username").fadeOut(600);
					$("#logout").fadeOut(600);
					$("#changeinfo").fadeOut(600);
			});
			
			//$("#chosensuspect").fadeIn(2000);
			$buildingup = true;
		}
    }});

}


function sysInfo() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	//$(".content").css("background","rgba(255,255,255, 0.3)");
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	
	/*var rowid = $("#navgrid").getGridParam("selrow");   
	if(rowid==null) {
		alert("请先选择一个用户！");
		//$(".content").css("background","url(/animateEdition/css/superuser/resources/sky-bg.jpg)");
		/*var tmpinfo	=	document.getElementById("suspectinf");
	    tmpinfo.innerHTML	=	"";
		$("#suspectinfo").click();
		return false;
	}*/
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	
  	var gridheight	=	mainheight-30-30-34;
	
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
   // $("#userinf").css("margin-left","100px");
	//$("#userinf").css("margin-top","0px");
   /*
    var tmpinfo	=	document.getElementById("userinf");
    tmpinfo.innerHTML	=	"";
    */
    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
    //alert(suspectid);
   	//var myPostdata	=	[{"suspectid4post":suspectid}];
 
    
    jQuery("#navgrid").jqGrid({
        url : 'servlet/Sysinfo?suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hidediskid','No.','案件代号','时间','地点','来源','单位', '录入人员' ,'录入时间','磁盘序列号','磁盘大小','镜像状态', '备注'],
        colModel : [{
            name : 'diskid',
            index : 'diskid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:20,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'casecode',
            index : 'casecode',
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'time',
        	index:'time',
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'place',
            index : 'place',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'source',
            index : 'source',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'bureau',
            index : 'bureau',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'instaff',
            index : 'instaff',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'intime',
            index : 'intime',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'diskcode',
            index : 'diskcode',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'diskcapacity',
            index : 'diskcapacity',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'imagestate',
            index : 'imagestate',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'notes',
            index : 'notes',
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "系统信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        height :gridheight,  //375px;
        autowidth:false,
        shrinkToFit:false,
        scroll:true,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"查看分析文件",buttonicon:"ui-icon-newwin",onClickButton:function(){
   			/*
   			var father	=	document.getElementById("right");
   			var dialog	=	document.createElement("div");
   			dialog.id	=	"dialog";
   			dialog.title	=	"上传分析文件";
   			
   			
   			father.appendChild(dialog);   			
   			var uploadform	=	document.createElement("form");
   			uploadform.name	=	"uploadform1";
   			uploadform.id	=	"uploadform1";			
   			uploadform.action	=	"servlet/Upload";
   			uploadform.method	=	"POST";
   			
   			
   			var uploadinput	=	document.createElement("input");
   			uploadinput.type="file";
   			uploadinput.name	=	"myfile";
   			uploadinput.id	=	"myfile";
   			
   			var uploadbutton	=	document.createElement("input");
   			uploadbutton.type	=	"submit";
 			uploadbutton.id	=	"uploadbutton";
 			uploadbutton.value	=	"开始上传";
   			
   			uploadform.appendChild(uploadinput);
   			uploadform.appendChild(uploadbutton); 	

   			dialog.appendChild(uploadform);
   			document.getElementById("uploadform1").setAttribute("enctype","multipart/form-data");
   			
   			//document.getElementById("uploadform1").setAttribute("onsubmit","return startupload();");
   			$("#dialog").css("width","180px");
   			$("#dialog").css("height","160px");
   			$("#uploadbutton").button();
   			$("#uploadbutton").css("float","left");
   			$("#uploadbutton").css("left","20px");
   			$("#uploadbutton").css("top","25px");
   			$("#dialog").dialog({width:380,height:200,show:'slide'});
   			/*
   			var startupload	=	function() {
   				$("#uploadform1").ajaxSubmit(function(message) {  
   				 	alert("yes");
          			// 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容  
       			});  
      
    			return false; 
   			};
   			//document.getElementById("uploadform1").addEventListener('onsubmit',startupload, false);
   			var options = {success:function(){
            	alert("上传成功");
			}};
   			$('#uploadform1').submit(function() { 
   			//history.go(-1);
       			$(this).ajaxSubmit(options); 
        		return false; 
    		}); 
    		*/
   			var rowid = $("#navgrid").getGridParam("selrow");   
			if(rowid==null) {
				alert("请先选择要查看的磁盘！");
				//$(".content").css("background","url(/animateEdition/css/superuser/resources/sky-bg.jpg)");
				//var tmpinfo	=	document.getElementById("suspectinf");
	   			//tmpinfo.innerHTML	=	"";
				return false;
			}
			
			var rowdata	=	$("#navgrid").getRowData(rowid);
   			//alert(rowdata.diskid);
			
   			var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
   // $("#userinf").css("margin-left","100px");
	//$("#userinf").css("margin-top","0px");
   /*
    var tmpinfo	=	document.getElementById("userinf");
    tmpinfo.innerHTML	=	"";
    */
    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
    //alert(suspectid);
   	//var myPostdata	=	[{"suspectid4post":suspectid}];
 
    
    jQuery("#navgrid").jqGrid({
        url : 'servlet/Analyzefileinfo?diskid='+rowdata.diskid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hidefileid','hidediskid','No.','分析文件名','上传时间','文件大小/KB','上传用户'],
        colModel : [{
            name : 'fileid',
            index : 'fileid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'diskid',
            index : 'diskid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:50,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'filename',
            index : 'filename',
            width:340,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'time',
        	index:'time',
        	width:200,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'size',
            index : 'size',
            width:200,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'uploaduser',
            index : 'uploaduser',
            width:250,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "分析文件信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"下载分析文件",buttonicon:"ui-icon-newwin",onClickButton:function(){
   			var downloadform	=	document.createElement("form");
   			downloadform.id	=	"downloadform";
   			downloadform.name	=	"downloadform";
   			downloadform.action	=	"servlet/Download";
   			downloadform.method	=	"POST";
   			
   			var hideinput1	=	document.createElement("input");
   			hideinput1.type	=	"hidden";
   			hideinput1.name	=	"diskid";
   			hideinput1.value=	rowdata.diskid;
   			//alert(rowdata.diskid);
   			
   			var hideinput2	=	document.createElement("input");
   			hideinput2.type	=	"hidden";
   			hideinput2.name	=	"filename";
   			
   			var downRow	=	$("#navgrid").getGridParam("selrow");
   			//alert(downRow);
   			
   			if(downRow==null) {
   				alert("请先选择要下载的文件！");
   				return false;
   			}
   			var downFilename	=	$("#navgrid").getRowData(downRow);
   			hideinput2.value	=	downFilename.filename;
   			//alert(downFilename.filename);
   			
   			downloadform.appendChild(hideinput1);
   			downloadform.appendChild(hideinput2);
   			
   			var father	=	document.getElementById("right");
   			father.appendChild(downloadform);
   			
   			document.downloadform.submit();
   			
   			$("#downloadform").remove();
   	
   	
   	
   }}).navButtonAdd("#pagernav",{caption:"上传分析文件",buttonicon:"ui-icon-newwin",onClickButton:function(){
   			
   			var father	=	document.getElementById("right");
   			var dialog	=	document.createElement("div");
   			dialog.id	=	"dialog";
   			dialog.title	=	"上传分析文件";
   			
   			
   			father.appendChild(dialog);   			
   			var uploadform	=	document.createElement("form");
   			uploadform.name	=	"uploadform1";
   			uploadform.id	=	"uploadform1";			
   			uploadform.action	=	"servlet/Upload";
   			uploadform.method	=	"POST";
   			
   			
   			var uploadinput	=	document.createElement("input");
   			uploadinput.type="file";
   			uploadinput.name	=	"myfile";
   			uploadinput.id	=	"myfile";
   			
   			var uploadbutton	=	document.createElement("input");
   			uploadbutton.type	=	"submit";
   			uploadbutton.name	=	"uploadbutton";
 			uploadbutton.id	=	"uploadbutton";
 			uploadbutton.value	=	"开始上传";
   			
   			uploadform.appendChild(uploadinput);
   			uploadform.appendChild(uploadbutton); 	

   			dialog.appendChild(uploadform);
   			document.getElementById("uploadform1").setAttribute("enctype","multipart/form-data");
   			
   			//document.getElementById("uploadform1").setAttribute("onsubmit","return startupload();");
   			$("#dialog").css("width","180px");
   			$("#dialog").css("height","160px");
   			$("#uploadbutton").button();
   			$("#uploadbutton").css("float","left");
   			$("#uploadbutton").css("left","20px");
   			$("#uploadbutton").css("top","25px");
   			$("#dialog").dialog({width:380,height:200,show:'slide'});
   			
   			//alert(rowdata.diskid);
   			//var filename	=	null;
   			var username	=	document.getElementById("username").innerHTML;
   			//salert(username);
   			//var submitname	=	document.getElementById("uploadbutton").getAttribute("value");				
    		//document.getElementById("uploadbutton").setAttribute("value",encodeURI(encodeURI(submitname)));
    		
   			$("#myfile").change(function() {
   				//alert("we got the file value");
   				var filename	=	document.getElementById("myfile").getAttribute("value");
   				
   				var realpath=filename.split("\\");     //这里从路径中获取文件名
   				var realFilename	=	realpath[realpath.length-1]
   				//alert(realFilename);
   				
   				$.post("servlet/CheckFileName", {Action:"POST",diskid:rowdata.diskid,filename:realFilename}, 
  				function (data, textStatus){ 
  					if(data.Message=="duplicateName") {
    					alert("该文件名已存在，请修改文件名后重新上传！");
    					$("#dialog").remove();
  					} else if(data.Message=="ready2Upload") {
  						alert("ready2Upload");
  						var options = {   
   							dataType:  'json',
    						success:function(data) { 
        						alert("上传成功");			
        						$("#navgrid").trigger("reloadGrid")
        						$("#dialog").remove();
    						},
    						error: function(data) {					
    							alert('上传失败!');
    						},
    						data:{'diskid':rowdata.diskid,'username':username}
						}; 
   						$('#uploadform1').ajaxForm(options);
  					} else {
  						//出错
  					}
  				},"json");
   				
   			});
   			/*
    		$.post("servlet/CheckFileName", {Action:"POST",Diskid:rowdata.diskid,filename:}, 
  				function (data, textStatus){ 
    				for(var i=0; i<data.length; i++) {
    					jQuery("#navgrid").jqGrid('addRowData',i+1,data[i]);
    				}
  			},"json");
   			alert("yes");
   			
   			var options = {   
   				dataType:  'json',
    			success:function(data) { 
        			alert(data.Message);
    				//alert('上传成功!'); 
        			
        			$("#navgrid").trigger("reloadGrid")
        			$("#dialog").remove();
    			},
    			error: function(data) {
    				//alert(data.erroMessage);
    				alert('上传失败!');
    			},
    			data:{'diskid':rowdata.diskid,'username':username}
			}; 
   			$('#uploadform1').ajaxForm(options);
   				*/
   }}).navButtonAdd("#pagernav",{caption:"返回上级菜单",buttonicon:"ui-icon-newwin",onClickButton:function(){
   			sysInfo();
   }});
   	
   	/*
   			var father	=	document.getElementById("right");
   			var uploadform	=	document.createElement("form");
   			uploadform.name	=	"uploadform1";
   			uploadform.id	=	"uploadform1";
   			
   			uploadform.action	=	"servlet/Upload";
   			uploadform.method	=	"POST";
   			var uploadinput	=	document.createElement("input");
   			uploadinput.type="file";
   			uploadinput.name	=	"myfile";
   			uploadinput.id	=	"myfile";
   			$("#myfile").css("display","none");
   			//uploadinput.style=   "display:none";
   			uploadinput.onpropertychange	=	function() {
   				document.uploadform1.submit();
   			};
   			$("#myfile").css("z-index","500");
   			$("#uploadform1").css("opacity","0");
   			uploadform.appendChild(uploadinput);	
   			father.appendChild(uploadform);
   			
   			document.uploadform1.myfile.click();
   			
   			//var filename	=	document.getElementById("myfile").getAttribute("value");
   			
   			//document.uploadform1.submit();*/

}});
    
     // $("#navgrid").closest(".ui-jqgrid-bdiv").css({ 'overflow-x' : 'scroll' });
}


function mailcontactInfo() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    var suspectid	=	document.getElementById("suspectname").getAttribute("title"); 
    var username	=	document.getElementById("username").innerHTML;
    alert("yes");
    $.post("servlet/Contactinfo", { Action: "GET",suspectid:suspectid}, 
  			function (data, textStatus){ 
    			alert(data);
  			},"json");
}

/*function addresslist() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	
	
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    var suspectid	=	document.getElementById("suspectname").getAttribute("title"); 
    var username	=	document.getElementById("username").innerHTML;
    
    
    var editOptions={
   		 top: '150', left: "100", width: '300'  ,mtype:"POST"
   		 ,closeOnEscape: true, closeAfterEdit:true,
   		onclickSubmit:function(params){
   			var sr = jQuery("#navgrid").getGridParam('selrow');
   			rowdata = jQuery("#navgrid").getRowData(sr);
   			return {editid:rowdata.imid};
   		},
   		  beforeShowForm: function(form) { 
    			 $('#sourceemail',form).attr('readonly','readonly');
    		 },
   		 afterSubmit:function(response, postdata) {
   			 var success =	true;
   			 var message = "";
   			 jQuery("#navgrid").trigger("reloadGrid");
   			 var new_id	=	"1";
   			 return [success,message,new_id] ;
   		 }
   };
   
   var addOptions={
   		top: '150', left: "100", width: '300' ,mtype:"POST"
      		 ,addedrow:'first',closeOnEscape: true,closeAfterAdd:true,reloadAfterSubmit: true,
      	onclickSubmit:function(params){
   			var sr = jQuery("#navgrid").getGridParam('selrow');
   			rowdata = jQuery("#navgrid").getRowData(sr);
   			
   			return {addid:rowdata.imid,username:username,emailid:rowdata.mailid};
   		},
   		beforeShowForm: function(form) { 
    			 $('#sourceemail',form).removeAttr('readonly');
    		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
   
   
   var delOptions={
   		top: '150', left: "100", width: '300',reloadAfterSubmit: true,mtype:"POST",
   		onclickSubmit:function(params){
   			var sr = jQuery("#navgrid").getGridParam('selrow');
   			rowdata = jQuery("#navgrid").getRowData(sr);
   			return {delid:rowdata.imid};
   		},
   		afterSubmit:function(response, postdata) {
  			 var success =	true;
  			 var message = "";
  			 jQuery("#navgrid").trigger("reloadGrid");
  			 var new_id	=	"1";
  			 return [success,message,new_id] ;
  		 }
   };
    
   var rowheight	=	"92px";	
   
    jQuery("#navgrid").jqGrid({
        url : 'servlet/Contactinfo?suspect='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hideimid','hideemailid','hideallemails','No.','联系人','电话','邮件','QQ','来源邮箱','来源'],
        colModel : [{
            name : 'imid',
            index : 'imid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'mailid',
            index : 'mailid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'allemails',
            index : 'allemails',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:30,
            height:rowheight,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'contact',
            index : 'contact',
            width:120,
            height:rowheight,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'phonenumber',
        	index:'phonenumber',
        	width:240,
        	height:rowheight,
        	editable:true,
        	editoptions : {
        		readonly :false,
        		size : 10
        	}
        },{
            name : 'mailaddr',
            index : 'mailaddr',
            width:240,
            height:rowheight,
            editable : true,
            editoptions : {
                readonly : false,
                size : 20
            }
        },{
            name : 'qqnumber',
            index : 'qqnumber',
            width:200,
            height:rowheight,
            editable : true,
            editoptions : {
                readonly : false,
                size : 20
            }
        },{
            name : 'sourceemail',
            index : 'sourceemail',
            width:120,
            height:rowheight,
            editable : true,
            
            edittype:"select",
            editoptions:{
            	value: "admin:管理员;normal:普通用户"
            },
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
            name : 'source',
            index : 'source',
            width:90,
            height:rowheight,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "联系人信息",
        editurl:"servlet/Edit_contactinfo",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:true,add:true,del:true,search:true,refresh:true},editOptions,addOptions,delOptions).navButtonAdd("#pagernav",{caption:"查看所有邮箱",buttonicon:"ui-icon-newwin",onClickButton:function() {
   		var sel		=	jQuery("#navgrid").getGridParam("selrow");
   		var rowdata	=	jQuery("#navgrid").getRowData(sel);
   		alert(rowdata.allemails);
   	
   }});
}
*/


function ruleView() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);
	
    jQuery("#navgrid").jqGrid({
        url : 'servlet/Matchruleinfo',
        mtype:'POST',
        datatype : "json",
        colNames : ['hideid','No.','类型名称','提取规则'],
        colModel : [{
            name : 'hideid',
            index : 'hideid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:60,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'typename',
            index : 'typename',
            width:240,
            editable : false,
            editoptions : {
            	readonly : true,
                size : 20
            }
        },{
        	name:'rule',
        	index:'rule',
        	width:770,
        	editable:false,
        	editoptions : {
        		readonly :true,
        		size : 10
        	}
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "规则查看",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:false,refresh:true});
   /*
   var data =	[{'hidediskid':'sdjfk;asdjfkasdf','hideid':'dsjkfj;asdjf','id':'1','typename':'QQ号','rule':'最高位数：8位，最低位数7位 ，起始数字：8'},
   				 {'hidediskid':'sdjfk;asdjfkasdf','hideid':'dsjkfj;asdjf','id':'2','typename':'手机号','rule':'最高位数：8位，最低位数2位 ，起始数字：121'}];
   $("#navgrid").jqGrid('addRowData',1,data[0]);
   $("#navgrid").jqGrid('addRowData',2,data[1]);*/
}

function browserInfo() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	var gridheight	=	mainheight-30-30-34;
	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    var suspectid	=	document.getElementById("suspectname").getAttribute("title");    
    
    
    var editOptions={
   		//不可编辑
   };
   
   //var selectdisk	=	new Object();
    
   var addOptions={
   		//不可增加
   };
   
   
   var delOptions={
   		//不可删除
   };
       
	var changecaption	=	"查看相应信息";   
   
    jQuery("#navgrid").jqGrid({
        url : 'servlet/Browserinfo?suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hideid','No.','浏览器名称','查看种类','来源类型','来源路径','关联磁盘','关联磁盘序列号'],
        colModel : [{
            name : 'checktypeid',
            index : 'checktypeid',
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:30,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'browserName',
            index : 'browserName',
            width:200,
            height:90,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'checkType',
        	index:'checkType',
        	width:200,
        	height:90,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'srcType',
            index : 'srcType',
            width:100,
            height:90,
            editable : true,
            editoptions : {
            	readonly:true
            }
        },{
            name : 'srcPath',
            index : 'srcPath',
            width:300,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'relateDisk',
            index : 'relateDisk',
            width:240,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'relateDiskserialno',
            index : 'relateDiskserialno',
            width:240,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "浏览器信息",
        editurl:"",       //这个表不需要编辑
        width:rightwidth,
        shrinkToFit:false,
        height :gridheight,
        /*altRows:true,       //隔行变色
        altclass:'redrowClass',//隔行变色样式               测试了，没成功*/
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        },
        onSelectRow: function(rowid,status) {
        	/*
        	rowdata = jQuery("#navgrid").getRowData(rowid);
        	changecaption	=	"查看"+rowdata.checkType;
        	alert(changecaption);
        	$("#changenameButton").innerHTML	=	changecaption;
        	*/
        }
   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true});
   /*
   var selrow	=	$("#navgrid").getGridParam("selrow");
   var rowdata	=	null;	
   var changecaption	=	"查看";
   if(selrow!=null) {
   		rowdata = jQuery("#navgrid").getRowData(selrow);
   		caption += rowdata.checkType;
   }
  
    
   var data =	[{'checktypeid':'sdjfk;asdjfkasdf','id':'dsjkfj;asdjf','browserName':'1','checkType':'历史记录','srcType':'8','srcPath':'12321','relateDisk':'sadfsdafdsf'},
   				 {'checktypeid':'sdjfk;asdjfkasdf','id':'dsjkfj;asdjf','browserName':'2','checkType':'书签','srcType':'1','srcPath':'12321','relateDisk':'sadfsdafdsf'}];
   $("#navgrid").jqGrid('addRowData',1,data[0]);
   $("#navgrid").jqGrid('addRowData',2,data[1]);
   
  */
   
   jQuery("#navgrid").navButtonAdd("#pagernav",{caption:changecaption,buttonicon:"ui-icon-lightbulb",id:"changenameButton",onClickButton:function() {
   		var selrow	=	$("#navgrid").getGridParam("selrow");  
   		if(selrow==null) {
   			alert("请先选择查看种类！");
   			return false;
   		}
   		var rowdata = jQuery("#navgrid").getRowData(selrow);
   		//alert(rowdata.imid);
   		var checktypeid	=	rowdata.checktypeid;
   		var checkType	=	rowdata.checkType;
   		  		
   		var father	=	document.getElementById("right");
   		father.innerHTML	=	"";
   		
   		var rightwidth	=	father.offsetWidth;
   		var totalheight	=	document.getElementById("body").offsetHeight;
  		var mainheight	=	totalheight-159;
  		var gridheight	=	mainheight-30-30-34;
   		
   		var table   =   document.createElement("table");
    	var navpager    =   document.createElement("div");
   	 	navpager.id     =   "pagernav";
   	 	table.id    =   "navgrid";
    	father.appendChild(table);
    	father.appendChild(navpager);
    	
    	if(checkType=='历史记录') {
    		jQuery("#navgrid").jqGrid({
        		url : 'servlet/Browserhistoryinfo?browserid='+checktypeid,
        		mtype:'GET',
        		datatype : "json",
        		colNames : ['hideid','No.','访问网址URL','标题Title','访问时间','关联ID'],
        		colModel : [{
           	 		name : 'hideid',
            		index : 'hideid',
            		hidden:true,
            		editable : false,
            		editoptions : {
               		 	readonly : true,
                		size : 10
            		}
        		},{
            		name : 'id',
            		index : 'id',
            		width:35,
            		height:90,
            		editable : false,
            		editoptions : {
                		readonly : true,
               	 		size : 10
            		}
        		},{
            		name : 'url',
            		index : 'url',
            		width:350,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
           			name : 'title',
            		index : 'title',
            		width:480,
            		height:90,
            		editable : true,
            		editoptions : {
               	 		readonly : false,
                		size : 20
            		}
        		},{
		            name : 'time',
		            index : 'time',
		            width:230,
		            height:90,
		            editable : true,
		            edittype:'textarea',
		            editoptions : {
		                readonly : false,
		                rows:"4",cols:"35"
		            }
		        },{
		            name : 'relateBrowser',
		            index : 'relateBrowser',
		            width:230,
		            height:90,
		            hidden:true,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        }],
		        rowNum : 10,
		        rowList : [10],
		        pager : '#pagernav',
		        sortname : 'id',
		        viewrecords : true,
		        sortorder : "desc",
		        caption : "历史记录",
		        editurl:"",       // 这里设置表更新时，要发送到的地址
		        width:rightwidth,
		        shrinkToFit:false,
		        height :gridheight,
		        jsonReader: {  
		            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		        }
		   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
		   		browserInfo(); 		
		   	}});
    	} else if(checkType=='书签') {
    		jQuery("#navgrid").jqGrid({
        		url : 'servlet/Browserbookmarksinfo?browserid='+checktypeid,
        		mtype:'GET',
        		datatype : "json",
        		colNames : ['hideid','No.','网址URL','标题Title','关联磁盘ID'],
        		colModel : [{
           	 		name : 'hideid',
            		index : 'hideid',
            		hidden:true,
            		editable : false,
            		editoptions : {
               		 	readonly : true,
                		size : 10
            		}
        		},{
            		name : 'id',
            		index : 'id',
            		width:35,
            		height:90,
            		editable : false,
            		editoptions : {
                		readonly : true,
               	 		size : 10
            		}
        		},{
            		name : 'url',
            		index : 'url',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
           			name : 'title',
            		index : 'title',
            		width:300,
            		height:90,
            		editable : true,
            		editoptions : {
               	 		readonly : false,
                		size : 20
            		}
        		},{
		            name : 'relateBrowser',
		            index : 'relateBrowser',
		            width:260,
		            height:90,
		            hidden:true,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        }],
		        rowNum : 10,
		        rowList : [10],
		        pager : '#pagernav',
		        sortname : 'id',
		        viewrecords : true,
		        sortorder : "desc",
		        caption : "书签",
		        editurl:"",       // 这里设置表更新时，要发送到的地址
		        width:rightwidth,
		        shrinkToFit:false,
		        height :gridheight,
		        jsonReader: {  
		            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		        }
		   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
		   		browserInfo(); 		
		   	}});
    	} else if(checkType=='下载管理') {
    		jQuery("#navgrid").jqGrid({
        		url : 'servlet/BrowserDownloadinfo?browserid='+checktypeid,
        		mtype:'GET',
        		datatype : "json",
        		colNames : ['hideid','No.','存放位置','源地址','时间','文件大小','关联ID'],
        		colModel : [{
           	 		name : 'hideid',
            		index : 'hideid',
            		hidden:true,
            		editable : false,
            		editoptions : {
               		 	readonly : true,
                		size : 10
            		}
        		},{
            		name : 'id',
            		index : 'id',
            		width:35,
            		height:90,
            		editable : false,
            		editoptions : {
                		readonly : true,
               	 		size : 10
            		}
        		},{
            		name : 'saveplace',
            		index : 'saveplace',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
            		name : 'url',
            		index : 'url',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
           			name : 'time',
            		index : 'time',
            		width:300,
            		height:90,
            		editable : true,
            		editoptions : {
               	 		readonly : false,
                		size : 20
            		}
        		},{
           			name : 'size',
            		index : 'size',
            		width:300,
            		height:90,
            		editable : true,
            		editoptions : {
               	 		readonly : false,
                		size : 20
            		}
        		},{
		            name : 'relateBrowser',
		            index : 'relateBrowser',
		            width:260,
		            height:90,
		            hidden:true,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        }],
		        rowNum : 10,
		        rowList : [10],
		        pager : '#pagernav',
		        sortname : 'id',
		        viewrecords : true,
		        sortorder : "desc",
		        caption : "下载内容",
		        editurl:"",       // 这里设置表更新时，要发送到的地址
		        width:rightwidth,
		        shrinkToFit:false,
		        height :gridheight,
		        jsonReader: {  
		            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		        }
		   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
		   		browserInfo(); 		
		   	}});
    	} else if(checkType=='搜索关键字') {
    		jQuery("#navgrid").jqGrid({
        		url : 'servlet/Browserkeyword?browserid='+checktypeid,
        		mtype:'GET',
        		datatype : "json",
        		colNames : ['hideid','No.','搜索关键字','搜索网站','关联ID'],
        		colModel : [{
           	 		name : 'hideid',
            		index : 'hideid',
            		hidden:true,
            		editable : false,
            		editoptions : {
               		 	readonly : true,
                		size : 10
            		}
        		},{
            		name : 'id',
            		index : 'id',
            		width:35,
            		height:90,
            		editable : false,
            		editoptions : {
                		readonly : true,
               	 		size : 10
            		}
        		},{
            		name : 'keyword',
            		index : 'keyword',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
            		name : 'url',
            		index : 'url',
            		width:600,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
		            name : 'relateBrowser',
		            index : 'relateBrowser',
		            width:260,
		            height:90,
		            hidden:true,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        }],
		        rowNum : 10,
		        rowList : [10],
		        pager : '#pagernav',
		        sortname : 'id',
		        viewrecords : true,
		        sortorder : "desc",
		        caption : "搜索关键字",
		        editurl:"",       // 这里设置表更新时，要发送到的地址
		        width:rightwidth,
		        shrinkToFit:false,
		        height :gridheight,
		        jsonReader: {  
		            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		        }
		   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
		   		browserInfo(); 		
		   	}});
    	} else if(checkType=='表单信息') {
    		jQuery("#navgrid").jqGrid({
        		url :'servlet/Browserforminfo?browserid='+checktypeid,
        		mtype:'GET',
        		datatype : "json",
        		colNames : ['hideid','No.','表单名','表单值','使用次数','使用时间','关联ID'],
        		colModel : [{
           	 		name : 'hideid',
            		index : 'hideid',
            		hidden:true,
            		editable : false,
            		editoptions : {
               		 	readonly : true,
                		size : 10
            		}
        		},{
            		name : 'id',
            		index : 'id',
            		width:35,
            		height:90,
            		editable : false,
            		editoptions : {
                		readonly : true,
               	 		size : 10
            		}
        		},{
            		name : 'formname',
            		index : 'formname',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
            		name : 'formvalue',
            		index : 'formvalue',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
		            name : 'accessaccount',
		            index : 'accessaccount',
		            width:260,
		            height:90,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        },{
		            name : 'time',
		            index : 'time',
		            width:260,
		            height:90,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        },{
		            name : 'relateBrowser',
		            index : 'relateBrowser',
		            width:260,
		            height:90,
		            hidden:true,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        }],
		        rowNum : 10,
		        rowList : [10],
		        pager : '#pagernav',
		        sortname : 'id',
		        viewrecords : true,
		        sortorder : "desc",
		        caption : "表单信息",
		        editurl:"",       // 这里设置表更新时，要发送到的地址
		        width:rightwidth,
		        shrinkToFit:false,
		        height :gridheight,
		        jsonReader: {  
		            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		        }
		   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
		   		browserInfo(); 		
		   	}});
    	} else if(checkType=='帐号密码') {
    		jQuery("#navgrid").jqGrid({
        		url : 'servlet/BrowserAccountinfo?browserid='+checktypeid,
        		mtype:'GET',
        		datatype : "json",
        		colNames : ['hideid','No.','网站URL','用户名','密码','关联ID'],
        		colModel : [{
           	 		name : 'hideid',
            		index : 'hideid',
            		hidden:true,
            		editable : false,
            		editoptions : {
               		 	readonly : true,
                		size : 10
            		}
        		},{
            		name : 'id',
            		index : 'id',
            		width:35,
            		height:90,
            		editable : false,
            		editoptions : {
                		readonly : true,
               	 		size : 10
            		}
        		},{
            		name : 'url',
            		index : 'url',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
            		name : 'name',
            		index : 'name',
            		width:400,
            		height:90,
            		editable : true,
            		editoptions : {
            			readonly : false,
                		size : 20
            		}
       	 		},{
		            name : 'password',
		            index : 'password',
		            width:260,
		            height:90,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        },{
		            name : 'relateBrowser',
		            index : 'relateBrowser',
		            width:260,
		            height:90,
		            hidden:true,
		            editable : true,
		            editoptions : {
		                readonly : false,
		                size : 20
		            }
		        }],
		        rowNum : 10,
		        rowList : [10],
		        pager : '#pagernav',
		        sortname : 'id',
		        viewrecords : true,
		        sortorder : "desc",
		        caption : "帐号密码",
		        editurl:"",       // 这里设置表更新时，要发送到的地址
		        width:rightwidth,
		        shrinkToFit:false,
		        height :gridheight,
		        jsonReader: {  
		            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		        }
		   }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true}).navButtonAdd("#pagernav",{caption:"返回上级",buttonicon:"ui-icon-newwin",onClickButton:function() {
		   		browserInfo(); 		
		   	}});
    	} else {
    		//var alertDialog	=	document.createElement("div");
    		alert("该类型无法查看");
    	}
    
   }});
}

function mailAccount() {
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father	=	document.getElementById("right");
	father.innerHTML	=	"";
	
	
	var rightwidth	=	father.offsetWidth;
	//alert(rightwidth);
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    father.appendChild(table);
    father.appendChild(navpager);

    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
    
    jQuery("#navgrid").jqGrid({
        url : 'servlet/MailAccountInfo?suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hidediskid','hideid','No.','邮箱帐号','邮箱密码','来源类型','关联磁盘序列号','来源文件路径','客户端类型'],
        colModel : [{
            name : 'diskid',
            index : 'diskid',
            width:20,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'accountid',
            index : 'accountid',
            width:20,
            height:90,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width:50,
            height:90,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'mailaccount',
            index : 'mailaccount',
            width:130,
            editable : true,
            editoptions : {
            	readonly : false,
                size : 20
            }
        },{
        	name:'password',
        	index:'password',
        	width:120,
        	editable:false,
        	editoptions : {
        		readonly : true,
        		size : 10
        	}
        },{
            name : 'sourcetype',
            index : 'sourcetype',
            width:180,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'relatedisk',
            index : 'relatedisk',
            width:140,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'sourcefile',
            index : 'sourcefile',
            width:280,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        },{
            name : 'clienttype',
            index : 'clienttype',
            width:180,
            editable : false,
            editoptions : {
                readonly : true,
                size : 20
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "邮箱帐号信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        height :"375px",
        shrinkToFit:false,
        scroll:true,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
   }).navGrid('#pagernav',{edit:false,add:true,del:true,search:true,refresh:true});
}

function obscureInfo() {
	//名称，内容，来源文件
	$("#middle").animate({height:"5%"},{duration:1000});
	$("#main").animate({height:"75%"});
	
	
	var suspectname		=	document.getElementById("suspectname");
	if(suspectname==null) {
		alert("请先选择一个用户！");
		$("#suspectinfo").click();
		return false;
	}
	
	var father  =   document.getElementById("right");
    father.innerHTML	=	"";
	
   	var rightwidth	=	father.offsetWidth;
   	var totalheight	=	document.getElementById("body").offsetHeight;
  	var mainheight	=	totalheight-159;
  	
  	var gridheight	=	mainheight-30-30-34;
  	
  	
	var table   =   document.createElement("table");
    var navpager    =   document.createElement("div");
    navpager.id     =   "pagernav";
    table.id    =   "navgrid";
    
    father.appendChild(table);
    father.appendChild(navpager);
    
    var suspectid	=	document.getElementById("suspectname").getAttribute("title");
    
    	jQuery("#navgrid").jqGrid({
        url : 'servlet/ObscureInfo?suspectid='+suspectid,
        mtype:'GET',
        datatype : "json",
        colNames : ['hidefileid','hidetypeid','hideid','Inv No','名称','内容','来源文件'],
        colModel : [{
            name : 'fileid',
            index : 'fileid',
            width : 50,
            height:95,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'typeid',
            index : 'typeid',
            width : 50,
            height:95,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'hideid',
            index : 'hideid',
            width : 50,
            height:95,
            hidden:true,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'id',
            index : 'id',
            width : 50,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'rulename',
            index : 'rulename',
            width : 280,
            height:95,
            editable : false,
            editoptions : {
                readonly : true,
                size : 10
            }
        },{
            name : 'content',
            index : 'content',
            width : 280,
            height:95,
            editable : false,
            editoptions : {
            	readonly:true,
                size : 15
            }
        },{
            name : 'sourcefile',
            index : 'sourcefile',
            width : 500,
            height:95,
            editable : false,
            editoptions : {
            	readonly:true,
                size : 15
            }
        }],
        rowNum : 10,
        rowList : [10],
        pager : '#pagernav',
        sortname : 'id',
        viewrecords : true,
        sortorder : "desc",
        caption : "模糊匹配信息",
        editurl:"",       //这里设置表更新时，要发送到的地址
        width:rightwidth,
        shrinkToFit:false,
        height : gridheight,
        scrollOffset:0,
        jsonReader: {  
            repeatitems : false        // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设  
        }
    }).navGrid('#pagernav',{edit:false,add:false,del:false,search:true,refresh:true});
}