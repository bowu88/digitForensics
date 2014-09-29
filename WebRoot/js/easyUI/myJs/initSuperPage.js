function addTab(title, url){  
    if ($('#tt').tabs('exists', title)){  
        $('#tt').tabs('select', title);  
    } else {  
        var content = '<iframe scrolling="no" src="'+url+'" style="width:100%;height:100%;"></iframe>';  
        $('#tt').tabs('add',{  
            title:title,  
            content:content,  
            closable:true  
        });  
    }  
}