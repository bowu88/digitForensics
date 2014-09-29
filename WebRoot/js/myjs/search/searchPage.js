function showSearchArea() {
	
	
	var father	=	document.getElementById("header");
	/*   不要把input 放到div里
	var searchform	=	document.createElement("form");
	searchform.id		=	"searchform";
	searchform.name		=	"searchform";
	searchform.method	=	"POST";
	searchform.action	=	"servlet/SearchAllAjax";
	father.appendChild(searchform);
	*/
	var searchtext	=	document.createElement("input");
	searchtext.id	=	"searchtext";
	searchtext.id	=	"searchtext";
	searchtext.size	=	"50";
	father.appendChild(searchtext);
	
	var searchbutton	=	document.createElement("input");
	searchbutton.id	=	"searchbutton";
	searchbutton.name	=	"searchbutton";
	searchbutton.type	=	"button";
	searchbutton.value	=	"Query";
	father.appendChild(searchbutton);
	
	$("#searchbutton").click(function() {
		searchsubmit(1);
		//testAnimate(1);
	});
	
	
	var headerwidth	=	father.offsetWidth;
	var marginleft	=	(headerwidth-900)/2;
	
	var headerheight	=	father.offsetHeight;
	var margintop	=	(headerheight-45)/2;
	/*
	$("#searchform").css("float","left");
	$("#searchform").css("margin-left",marginleft);
	$("#searchform").css("margin-top",margintop);
	$("#searchform").css("width","900px");
	$("#searchform").css("height","50px");
	$("#searchform").css("background","black");
	*/
	$("#searchtext").css("float","left");
	$("#searchtext").css("margin-left",marginleft);
	$("#searchtext").css("margin-top",margintop);
	$("#searchtext").css("width","750px");
	$("#searchtext").css("height","38px");
	$("#searchtext").css("border-top","2px solid orange");
	$("#searchtext").css("border-left","2px solid orange");
	$("#searchtext").css("border-bottom","2px solid orange");
	$("#searchtext").css("border-right","0px solid orange");
	$("#searchtext").css("font-size","25px");
	
	$("#searchbutton").css("float","left");
	$("#searchbutton").css("margin-left","0px");
	$("#searchbutton").css("margin-top",margintop);
	$("#searchbutton").css("width","146px");
	$("#searchbutton").css("height","41px");
	$("#searchbutton").css("background","skyblue");
	$("#searchbutton").css("border","2px solid orange");
	
	var tmpdiv	=	document.createElement("div");
	tmpdiv.id	=	"tmpsupersearchdiv";
	tmpdiv.innerHTML	=	"高级搜索";
	father.appendChild(tmpdiv);
	
	$("#tmpsupersearchdiv").css("position","absolute");
	$("#tmpsupersearchdiv").css("right","0px");
	$("#tmpsupersearchdiv").css("top","0px");
	$("#tmpsupersearchdiv").css("width","100px");
	$("#tmpsupersearchdiv").css("height","35px");
	$("#tmpsupersearchdiv").css("font-size","20px");
	
	$("#tmpsupersearchdiv").click(function() {
		supersearch();	
	});
}
/*
function showTransJsonData(data,curkey) {
	//alert(jsondata.records+jsondata.rows[0]);
		//alert(data.total);
		document.getElementById("hidesearchState").innerHTML	=	"true";
		document.getElementById("hidecurKey").innerHTML	=	curkey;
		
		
		document.getElementById("startDate").value	=	"";
  		document.getElementById("endDate").value	=	"";
    	var tmpResult	=	null;
    	var father	=	document.getElementById("searchcontent");
    	father.innerHTML	=	"";
    			// alert(data.rows[0].filename);
    	
    	if (data.rows.length == 0) {
				var noFound = document.createElement("h2");
				noFound.innerHTML = "很遗憾，我们未能为您查询出任何结果";
				noFound.id = "noFound";
				father.appendChild(noFound);
				$("#noFound").css("position","relative");
				$("#noFound").css("width", "600px");
				$("#noFound").css("height", "70px");
				$("#noFound").css("margin-left","240px");
				$("#noFound").css("margin-top", "20px");
				$("#noFound").css("border","3px dash orange");
				$("#noFound").css("z-index", "100");
		}
    	
    	
    	for(var i=0; i<10&&i<data.rows.length; i++) {
    		tmpResult	=	document.createElement("div");
    		tmpResult.id	=	"eachResult";
    		var filename	=	document.createElement("div");
    		filename.id	=	"eachfilename";
    				// filename.innerHTML = "Java数据持久化《科技资讯》2006年13期";
    		filename.innerHTML	=	data.rows[i].filename;
    				
    		var fileDigest	=	document.createElement("div");
    		fileDigest.id	=	"eachfileDigest";
    				// fileDigest.innerHTML = "数据持久 对象串行化 Hiernate
					// EJB...【摘要】数据持久化能够把数据的状态保存下来,延长数据的生存周期,备后期使用。Java语言是比较流行的一种面对对象编程语言,Java...【摘要】：数据持久化能够把数据的状态保存下来,延长数据的生存周期,备后期使用。Java语言是比较流行的一种面对对象编程语言,Java...";
    		fileDigest.innerHTML	=	data.rows[i].digest;
    				
    		var filepath	=	document.createElement("div");
    		filepath.id	=	"eachfilepath";
    				// filepath.innerHTML = "D:\\filename\\java\\tmp\\abc\\";
    		filepath.innerHTML	=	data.rows[i].path;
    				
    				
    		var time	=	document.createElement("div");
    		time.id	=	"eachtime";
    				// time.innerHTML = "2012-1-4";
    		time.innerHTML	=	data.rows[i].date;
    				
    		tmpResult.appendChild(filename);
    		tmpResult.appendChild(fileDigest);
    		tmpResult.appendChild(filepath);
    		tmpResult.appendChild(time);
    		father.appendChild(tmpResult);	
    	}
    	
    	$("#Pagination").pagination(data.total, {
								num_edge_entries : 1,
								num_display_entries : 4,
								callback:loadContents,
								items_per_page:1,
								current_page:0
							});
							
}
*/

function showTransJsonData(curKey,startTime, endTime, timesort, docType) {
	document.getElementById("hidesearchState").innerHTML	=	"true";
	document.getElementById("hidecurKey").innerHTML	=	curKey;
	document.getElementById("hidestartTime").innerHTML	=	startTime;
	document.getElementById("hidetimeSort").innerHTML	=	timesort;
	document.getElementById("hideendTime").innerHTML	=	endTime;
	document.getElementById("hidedocType").innerHTML	=	docType;
	searchsubmit(1);
}

function showDocType() {
	var $father	= $("#doctype");	
	var tmp	=	document.createElement("div");
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
	
	var typeinput4	=	document.createElement("input");
	typeinput4.type	=	"checkbox";
	typeinput4.id	=	"typeinput4";
	
	var typelabel4	=	document.createElement("label");
	typelabel4.innerHTML	=	".PPT";
	tmp.appendChild(typeinput4);
	tmp.appendChild(typelabel4);
	
	var $typearea	=	$(tmp);
	$father.append($typearea);
	
	$("#checkbox").css("float","left");
	$("#checkbox").css("position","relative");
	$("#checkbox").css("top","3px");
	$("#checkbox").css("left","0px");
	$("#checkbox").css("width","270px");
	$("#checkbox").css("height","50px");
	$(typelabel1).attr("for","typeinput1");
	$(typelabel2).attr("for","typeinput2");
	$(typelabel3).attr("for","typeinput3");
	$(typelabel4).attr("for","typeinput4");
	$("#checkbox").buttonset();
	
	$("#checkbox >label").addClass("docTypeCheckBox");
	
	var $rightside3	=	$("#rightside3");
	var $button	=	$("<input id='docTypeSubmit'value='确认'/>");
	$rightside3.append($button);
	$("#docTypeSubmit").css({"float":"right","width":"40px","height":"20px","margin-top":"20px"});
	$button.button();
	var typearray	=	new Array();
	$button.click(function() {
//		alert("yes");
		var $checkarray	=	$("#checkbox>input");
		var $checkradio	=	null;
		var name	=	null;
			$checkarray.each(function() {
				if($(this).attr("checked")) {
					typearray.push($(this).next("label").text());
				} 
			});
		
		updateSearchResult(false, typearray);
		typearray	=	null;
	});
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

function updateSearchResult(updatetype, docTypeArray) {
	//如果allsuspect 为“”,则在后台默认全部嫌疑人；
	var allSuspect	=	"";
	var searchkey	=	document.getElementById("hidecurKey").innerHTML;
	
	var startTime	=	null;
	var endTime	=	null;
	
	var timesort	=	null;
	var relationsort	=	"false";
	
	var curpage	=	"1";
	
	var doctypeStr	=	null;
	if(docTypeArray!=null) {
		doctypeStr	=	docTypeArray.toString();
	}
	if(updatetype=="true") {
		startTime	=	"";
		endTime	=	"";
		timesort	=	document.getElementById("hidetimeSort").innerHTML;
	} else {
		startTime	=	document.getElementById("startDate").value;
		endTime	=	document.getElementById("endDate").value;
		timesort	=	document.getElementById("hidetimeSort").innerHTML;
	}
	//Action: "POST",allSuspect:allSuspect,searchKey:searchkey,startTime:startTime,endTime:endTime,timesort:timesort,relationsort:relationsort,curpage:curpage, docType:doctypeStr
	
	$.post("servlet/SearchAllAjax", {Action: "POST",allSuspect:allSuspect,searchKey:searchkey,startTime:startTime,endTime:endTime,timesort:timesort,relationsort:relationsort,curpage:curpage, docType:doctypeStr}, 
  			function (data, textStatus){
  				
  				document.getElementById("startDate").value	=	"";
  				document.getElementById("endDate").value	=	"";
    			var tmpResult	=	null;
    			var father	=	document.getElementById("searchcontent");
    			father.innerHTML	=	"";
    			//alert(data.rows[0].filename);
    			if(data.rows.length==0) {
    				var noFound	=	document.createElement("h2");
    				noFound.innerHTML	=	"很遗憾，我们未能为您查询出任何结果";
    				noFound.id	=	"noFound";
    				father.appendChild(noFound);
    				$("#noFound").css("position","relative");
    				$("#noFound").css("width","600px");
    				$("#noFound").css("height","70px");
    				$("#noFound").css("margin-left","240px");
    				$("#noFound").css("margin-top","20px");
    				$("#noFound").css("border","3px dash orange");
    				$("#noFound").css("z-index","100");
  					
  					
  				}	
    			for(var i=0; i<10&&i<data.rows.length; i++) {
    				tmpResult	=	document.createElement("div");
    				tmpResult.id	=	"eachResult";
    				var filename	=	document.createElement("div");
    				filename.id	=	"eachfilename";
    				//filename.innerHTML	=	"Java数据持久化《科技资讯》2006年13期";
    				filename.innerHTML	=	data.rows[i].filename;
    				
    				var fileDigest	=	document.createElement("div");
    				fileDigest.id	=	"eachfileDigest";
    				//fileDigest.innerHTML	=	"数据持久 对象串行化 Hiernate EJB...【摘要】数据持久化能够把数据的状态保存下来,延长数据的生存周期,备后期使用。Java语言是比较流行的一种面对对象编程语言,Java...【摘要】：数据持久化能够把数据的状态保存下来,延长数据的生存周期,备后期使用。Java语言是比较流行的一种面对对象编程语言,Java...";
    				fileDigest.innerHTML	=	data.rows[i].digest;
    				
    				var filepath	=	document.createElement("div");
    				filepath.id	=	"eachfilepath";
    				//filepath.innerHTML	=	"D:\\filename\\java\\tmp\\abc\\";
    				filepath.innerHTML	=	data.rows[i].path;
    				
    				
    				var time	=	document.createElement("div");
    				time.id	=	"eachtime";
    				//time.innerHTML	=	"2012-1-4";
    				time.innerHTML	=	data.rows[i].date;
    				
    				tmpResult.appendChild(filename);
    				tmpResult.appendChild(fileDigest);
    				tmpResult.appendChild(filepath);
    				tmpResult.appendChild(time);
    				father.appendChild(tmpResult);	
    				
    				//第一个参数是新一页的ID，第二个参数是pagination容器（一个DOM元素）；
    			
    				/*分页*/
    				$("#Pagination").pagination(data.total, {
								num_edge_entries : 2,
								num_display_entries : 4,
								callback:loadContents,
								items_per_page:1,
								current_page:curpage-1,
								link_to:"#"
							});

    			}
  	 },"json");
}

function searchsubmit(curpage) {
	var ready	=	false;
	var errorMessage		=	"";
	
	var hidesearchkey	=	document.getElementById("hidecurKey").innerHTML;
    var searchkey	=	null;
	searchkey	=	document.getElementById("searchtext").value;
    if(searchkey=="") {
    	searchkey	=	hidesearchkey;
    }
    	document.getElementById("hidecurKey").innerHTML	=	searchkey;
	
	var docType	=	document.getElementById("hidedocType").innerHTML;
	
	var timesort	=	document.getElementById("hidetimeSort").innerHTML;
	var relationsort	=	document.getElementById("hiderelationSort").innerHTML;
	
	var startTime	=	document.getElementById("startDate").value; 
	if(startTime=="") {
		startTime	=	document.getElementById("hidestartTime").innerHTML;
	}
	var endTime	=	document.getElementById("endDate").value;
	if(endTime=="") {
		endTime	=	document.getElementById("hideendTime").innerHTML;
	}
	
	if(startTime!=""&&endTime!="") {
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
		var father	=	document.getElementById("content");
		errorDialog.appendChild(errordiv);
		father.appendChild(errorDialog);
		$("#errorDialog").dialog({width:380,height:200,show:'slide'});
		return false;
	}
	
	 
	 
	 var allSuspect	=	"";
	 $.post("servlet/SearchAllAjax", {Action: "POST",allSuspect:allSuspect,searchKey:searchkey,startTime:startTime,endTime:endTime,timesort:timesort,relationsort:relationsort,curpage:curpage,docType:docType}, 
  			function (data, textStatus){
  				var totalpage	=	data.total;
  				document.getElementById("startDate").value	=	"";
  				document.getElementById("endDate").value	=	"";
    			var tmpResult	=	null;
    			var father	=	document.getElementById("searchcontent");
    			father.innerHTML	=	"";

    			if(data.rows.length==0) {
    				var noFound	=	document.createElement("h2");
    				noFound.innerHTML	=	"很遗憾，我们未能为您查询出任何结果";
    				noFound.id	=	"noFound";
    				father.appendChild(noFound);
    				$("#noFound").css("position","relative");
    				$("#noFound").css("width","600px");
    				$("#noFound").css("height","70px");
    				$("#noFound").css("margin-left","240px");
    				$("#noFound").css("margin-top","20px");
    				$("#noFound").css("border","3px dash orange");
    				$("#noFound").css("z-index","100");
  					
  					
  				}	
    			for(var i=0; i<10&&i<data.rows.length; i++) {
    				tmpResult	=	document.createElement("div");
    				tmpResult.id	=	"eachResult";
    				var filename	=	document.createElement("div");
    				filename.id	=	"eachfilename";
    				filename.innerHTML	=	data.rows[i].filename;
    				
    				var fileDigest	=	document.createElement("div");
    				fileDigest.id	=	"eachfileDigest";
    				fileDigest.innerHTML	=	data.rows[i].digest;
    				
    				var filepath	=	document.createElement("div");
    				filepath.id	=	"eachfilepath";
    				filepath.innerHTML	=	data.rows[i].path;
    				
    				
    				var time	=	document.createElement("div");
    				time.id	=	"eachtime";
    				time.innerHTML	=	data.rows[i].date;
    				
    				tmpResult.appendChild(filename);
    				tmpResult.appendChild(fileDigest);
    				tmpResult.appendChild(filepath);
    				tmpResult.appendChild(time);
    				father.appendChild(tmpResult);	
    				
    				/*分页*/
    				$("#Pagination").pagination(data.total, {
								num_edge_entries : 1,
								num_display_entries : 4,
								callback:loadContents,
								items_per_page:1,
								current_page:curpage-1,
								link_to:"#"
							});
    			}
  	 },"json"); 
}


function loadContents(page_index, jq) {
	//alert(page_index);	
	var clickpage	=	page_index+1;
	searchsubmit(clickpage);
	return false;
}

//flexigrid
function supersearch() {
	if(document.getElementById("superdialog")!=null) {
		document.getElementById("superdialog").innerHTML="";
	}
	var superdialog	=	document.createElement("div");
	superdialog.id	=	"superdialog";
	superdialog.title	=	"Step1.选择嫌疑人";
	var father	=	document.getElementById("content");
	var table   =   document.createElement("table");
   
    table.id    =   "navgrid";
    
    superdialog.appendChild(table);
   // superdialog.appendChild(navpager);
    father.appendChild(superdialog);
	$("#navgrid").css("display","none");
	
	$("#superdialog").dialog({width:620,height:530,show:'clip',modal: true,
		overlay: {  
            opacity: 0.5,  
            background: "black"  
		} });
	
	
	
    	 $("#navgrid").flexigrid({
                url: 'servlet/ShowCertainSuspectFlexi',
                dataType: 'json',
                colModel : [
                        {display: 'ID', name : 'id', width : 40, sortable : true, align: 'left'},
                        {display: '嫌疑人ID', name : 'suspect_ID', hide:true},
                        {display: '嫌疑人姓名', name : 'name', width : 150, sortable : true, align: 'left'},
                        {display: '嫌疑人身份号', name : 'identity', width : 150, sortable : true, align: 'left'},
                        {display: '备注', name : 'notes', width : 220, sortable : true, align: 'left'}
                ],
                buttons : [
                		{name: '下一步', bclass: 'add', onpress : function() {
                			var data = new Array();  
                			var grid	=	$("#navgrid");
                			var j	=	0;
           					//var record	=	new Object();
           					$('.trSelected td', grid).each(function(i) {  
           						var hidesuspectid	=	document.getElementById("hidesupersearchSuspect");
                				if(i%5==1) {                  //获取选取行的嫌疑人ID
                					data[j] = $(this).children('div').text();  
  									//alert(data[j]);
  									hidesuspectid.innerHTML	+=	"-"+data[j];   //用-间隔两个id；
  									j++;
           						}		//data数组为选取行数的嫌疑人ID数组 ，这里暂时只试了一页，不知道多页是什么情况
            				});   
            				
            				//第二步step2
            				var curdialog	=	document.getElementById("superdialog");
            				curdialog.innerHTML	=	"";
            				
            				
            				
            				$("#superdialog").dialog("option","title","step2.条件查询").dialog("open"); //必须用这种方法修改title
            				
            				
            				var step2div	=	document.createElement("div");
            				step2div.id	=	"step2div";
            				curdialog.appendChild(step2div);
            				$("#step2div").css("float","left");
            				$("#step2div").css("margin-top","10px");
            				$("#step2div").css("margin-left","10px");
            				$("#step2div").css("width","590px");
            				$("#step2div").css("height","390px");
            				
            				
            				
            				var timearea	=	document.createElement("div");
            				timearea.id		=	"step2timearea";
            				step2div.appendChild(timearea);
            				var sortarea	=	document.createElement("div");
            				sortarea.id	=	"step2sortarea";
            				step2div.appendChild(sortarea);
            				
            				var doctypearea	=	document.createElement("div");
            				doctypearea.id	=	"step2doctypearea";
            				step2div.appendChild(doctypearea);
            				
            				var searcharea	=	document.createElement("div");
            				searcharea.id	=	"step2searcharea";
            				step2div.appendChild(searcharea);
            		
            				
            				var timeword	=	document.createElement("div");
            				timeword.id	=	"step2timeword";
            				timeword.innerHTML	=	"时间范围";
            				timearea.appendChild(timeword);
            				
            				var startTime	=	document.createElement("input");
            				startTime.id	=	"step2startTime";
            				timearea.appendChild(startTime);
            				
            				var endTime	=	document.createElement("input");
            				endTime.id	=	"step2endTime";
            				timearea.appendChild(endTime);
            				
            				var sortword	=	document.createElement("div");
            				sortword.id	=	"step2sortword";
            				sortword.innerHTML	=	"排序方式";
            				
            				var timesort	=	document.createElement("div");
            				timesort.id	=	"step2timesort";
            				timesort.innerHTML	=	"按时间排序";
            				var relatesort	=	document.createElement("div");
            				relatesort.id	=	"step2relatesort";
            				relatesort.innerHTML	=	"按相关度排序";
            				
            				step2sortarea.appendChild(sortword);
            				step2sortarea.appendChild(timesort);
            				step2sortarea.appendChild(relatesort);
            				
            				$("#step2timesort").click(function() {
								$(this).animate({borderLeftWidth:"6px"});
								$("#step2relatesort").animate({borderLeftWidth:"0px"});
								var hidetimesort	=	document.getElementById("hidetimeSort");
								hidetimesort.innerHTML	=	"true";
								var hiderelatesort	=	document.getElementById("hiderelationSort");
								hiderelatesort.innerHTML	=	"false";
							});
	
							$("#step2relatesort").click(function() {
								$("#step2timesort").animate({borderLeftWidth:"0px"});   //这个动画必须先在css中设置border:0px solid yellow;
								$(this).animate({borderLeftWidth:"6px"});
								var hidetimesort	=	document.getElementById("hidetimeSort");
								hidetimesort.innerHTML	=	"false";
								var hiderelatesort	=	document.getElementById("hiderelationSort");
								hiderelatesort.innerHTML	=	"true";
							});
            				
            				var doctypeword	=	document.createElement("div");
            				doctypeword.id	=	"step2doctypeword";
            				doctypeword.innerHTML	=	"文件格式";
            			
            				doctypearea.appendChild(doctypeword);
            				
            				var tmpdiv	=	document.createElement("div");
            				tmpdiv.id	=	"step2tmpdiv";
            				tmpdiv.innerHTML	=	".pdf .docx .txt .png";
            				doctypearea.appendChild(tmpdiv);
            				
            				var searchword	=	document.createElement("div");
            				searchword.id	=	"step2searchword";
            				searchword.innerHTML	=	"搜索关键字";
            				searcharea.appendChild(searchword);
				
            				var step2searchtext	=	document.createElement("input");      //注意：input不要放在单独的div里，否则IE显示偏移，直接单独放INPUT
            				step2searchtext.id	=	"step2searchtext";
            				searcharea.appendChild(step2searchtext);
      
            				
            				
            				
            				$("#step2startTime").datepicker({dateFormat:"yy-mm-dd"});
							$("#step2endTime").datepicker({dateFormat:"yy-mm-dd"});
            				$('#superdialog').dialog('option', 'buttons', { "确认": function() {
            						var searchkey	=	document.getElementById("step2searchtext").value;
            						var startTime	=	document.getElementById("step2startTime").value;
            						var endTime	=	document.getElementById("step2endTime").value;
            						var timesort	=	document.getElementById("hidetimeSort").innerHTML;							
									var relationsort	=	document.getElementById("hiderelationSort").innerHTML;
									var curpage	=	document.getElementById("hidecurPage").innerHTML;
            						var allSuspect	=	document.getElementById("hidesupersearchSuspect").innerHTML;
									 $.post("servlet/SearchAllAjax", { Action: "POST",allSuspect:allSuspect,searchKey:searchkey,startTime:startTime,endTime:endTime,timesort:timesort,relationsort:relationsort,curpage:curpage}, 
  											function (data, textStatus){ 
  											
    										var tmpResult	=	null;
    										var father	=	document.getElementById("searchcontent");
    										father.innerHTML	=	"";
    										
    										
    										if (data.rows.length == 0) {
												var noFound = document.createElement("h2");
												noFound.innerHTML = "很遗憾，我们未能为您查询出任何结果";
												noFound.id = "noFound";
												father.appendChild(noFound);
												$("#noFound").css("position","relative");
												$("#noFound").css("width", "600px");
												$("#noFound").css("height", "70px");
												$("#noFound").css("margin-left","240px");
												$("#noFound").css("margin-top", "20px");
												$("#noFound").css("border","3px dash orange");
												$("#noFound").css("z-index", "100");
											}
											
											
    										for(var i=0; i<10&&i<data.rows.length; i++) {
    											tmpResult	=	document.createElement("div");
    											tmpResult.id	=	"eachResult";
    											var filename	=	document.createElement("div");
    											filename.id	=	"eachfilename";
    											filename.innerHTML	=	data.rows[i].filename;
    				
    											var fileDigest	=	document.createElement("div");
    											fileDigest.id	=	"eachfileDigest";
    											fileDigest.innerHTML	=	data.rows[i].digest;
    				
    											var filepath	=	document.createElement("div");
    											filepath.id	=	"eachfilepath";
    											filepath.innerHTML	=	data.rows[i].path;
    				
    				
    											var time	=	document.createElement("div");
    											time.id	=	"eachtime";
    											time.innerHTML	=	data.rows[i].date;
    				
    											tmpResult.appendChild(filename);
    											tmpResult.appendChild(fileDigest);
    											tmpResult.appendChild(filepath);
    											tmpResult.appendChild(time);
    											father.appendChild(tmpResult);	
    				
    				
    											/*分页*/
    											$("#Pagination").pagination(data.total, {
													num_edge_entries : 2,
													num_display_entries : 4,
													callback:loadContents,
													items_per_page:1,
													current_page:curpage-1,
													link_to:"#"
												});
												
    										}
  									 },"json");
  									 var tmp	=	document.getElementById("superdialog");
  									 tmp.innerHTML	=	"";					    //先要清空dialog中的内容，然后才能remove，否则remove不了；
  									 $("#superdialog").remove();
  									// $("#superdialog").dialog('close');
  									 document.getElementById("hidesupersearchSuspect").innerHTML	=	"";
  									 
							} });
                		}},   //需要修改默认doctype html IE才能显示出button，否则显示不出来
                        {separator: true}
                ],
                sortname: "id",
                sortorder: "asc",
                usepager: true,
                title: "嫌疑人信息",
                useRp: true,
                rp: 10,
                striped: true,
                rpOptions:[10],
                showTableToggleBtn: true,
                multiSelect:true,
                resizable: false,
                width:610,
                height: 350
        });
        $(".flexigrid").css("margin","0px");
        $("#superdialog").css("padding","0px");
       
        $(".ui-dialog-titlebar-close").click(function() {
			$("#navgrid").remove();
			$("#superdialog").remove();
		
		});
}