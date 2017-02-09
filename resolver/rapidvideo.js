var DeanEdwardsUnpacker = require('../utils/Dean-Edwards-Unpacker').unpacker;

function resolve(link)
{
	try{
		var getEmissionsResponse = showtime.httpGet(link);
	  	var dom = html.parse(getEmissionsResponse.toString());
	  	var inputs = dom.root.getElementByTagName('form')[1].getElementByTagName("input");
  		
	  	var postdata = {
			op : inputs[0].attributes.getNamedItem("value").value, 
			usr_login : inputs[1].attributes.getNamedItem("value").value,
			id : inputs[2].attributes.getNamedItem("value").value,
			fname : inputs[3].attributes.getNamedItem("value").value,
			referer : inputs[4].attributes.getNamedItem("value").value,
			hash : inputs[5].attributes.getNamedItem("value").value,
			imhuman : inputs[6].attributes.getNamedItem("value").value
  		};
	  	    
	    // POST DATA COLLECTED
	    // WAIT 10 SECONDS
	    for (var i = 0; i < 11; i++) {
	    	showtime.notify("Waiting " + (10-i).toString() +" Seconds",1);
	        showtime.sleep(1);
	    }
	     
	    // POSTING DATA
	    var postresponse = showtime.httpReq(link, { postdata: postdata, method: "POST" });
	     
	    // find Dean Edwards packed content
	    var FindPackedContent = /eval\(function\(p,a,c,k,e,d\)([\s\S]*?)<\/script>/g;
	    var packed = "eval(function(p,a,c,k,e,d)" + FindPackedContent.exec(postresponse.toString())[1];
	    
	    // unpack the packed content
	  	var unpacked = DeanEdwardsUnpacker.unpack(packed);
	  	
	  	// find source entries
	  	var json = /sources:([\s\S]*?)image/g.exec(unpacked)[1].replace("],","]").replace(/file:/g,'"file":').replace(/label:/g,'"label":');
	  	var sourceobj = showtime.JSONDecode(json);

	  	// sources object holds reference to mp4 files and m3u8
	  	// return the first mp4
	  	// TODO: in the future we need an architecture which allows multiple links to be returned by the resolver
	  	for(var k=0; k< sourceobj.length; k++)
	  	{
	  		if (sourceobj[k].file.indexOf(".m3u8") > -1)
	  			continue;
	  		else
  			{
	  			return [link,sourceobj[k].file];
  			}
	  	}
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;