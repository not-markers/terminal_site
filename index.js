/* JavaScript in this file */

var typer =
{
	text: null,
	access_count_timer: null,
	index: 0, 
	speed: 3,
	file: "", 
	access_count: 0,
	deniedCount: 0, 

	init: function()
    {
		access_count_timer=setInterval(function(){typer.updLstChr();},500); 
		$.get(typer.file,function(data)
        {
			typer.text=data;
			typer.text = typer.text.slice(0, typer.text.length-1);
		});
	},
 
	content:function()
    {
		return $("#console").html();
	},
 
	write:function(str)
    {
		$("#console").append(str);
		return false;
	},
 
	addText:function(key)
    {
		
		if(key.keyCode==18)
        {
			typer.access_count++; 
			
			if(typer.access_count>=3)
            {
				typer.makeAccess(); 
			}
		}
		
    		else if(key.keyCode==20)
            {
			typer.deniedCount++; 
			
			if(typer.deniedCount>=3)
            {
				typer.makeDenied(); 
			}
		}
		
    		else if(key.keyCode==27)
            { 
			typer.hidepop(); 
		}
		
    		else if(typer.text)
            { 
			    var cont = typer.content(); 
			    if(cont.substring(cont.length-1, cont.length) == "|") 
				    $("#console").html($("#console").html().substring(0,cont.length-1)); 
			    if(key.keyCode != 8){ 
				    typer.index += typer.speed;	
			}
      		else
            {
                if(typer.index > 0) 
                    typer.index -= typer.speed;
			}

			var text = typer.text.substring(0, typer.index)
			var rtrn = new RegExp("\n", "g"); 
	
			$("#console").html(text.replace(rtrn,"<br/>"));
			window.scrollBy(0,50); 
		}
		
		if (key.preventDefault && key.keyCode != 122)
        { 
			key.preventDefault()
		};  
		
        // prevent key default behavior
		if(key.keyCode != 122)
        {
			key.returnValue = false;
		}
	},
 
	updLstChr:function(){ 
		var cont=this.content(); 
		
		if(cont.substring(cont.length-1,cont.length)=="|") 
			$("#console").html($("#console").html().substring(0,cont.length-1)); 
		
		else
			this.write("|");
	}
}

function replace_urls(text)
{
	var http  = text.indexOf("http://");
	var space = text.indexOf(".me ", http);
	
	if (space != -1)
    { 
		var url = text.slice(http, space-1);

		return text.replace(url, "<a href=\""  + url + "\">" + url + "</a>");
	} 
	
	else
    {
		return text
	}
}

typer.speed=4;
typer.file="landers.txt";
typer.init();
 
var timer = setInterval("t();", 30);

function t()
{
	typer.addText({"keyCode": 123748});
	
	if (typer.index > typer.text.length)
    {
		clearInterval(timer);
	}
}
