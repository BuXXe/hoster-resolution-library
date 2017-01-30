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
	    // WAIT 7 SECONDS
	    for (var i = 0; i < 8; i++) {
	    	showtime.notify("Waiting " + (7-i).toString() +" Seconds",1);
	        showtime.sleep(1);
	    }
	     
	    // POSTING DATA
	    var postresponse = showtime.httpReq(link, { postdata: postdata, method: "POST" });
	     
	    // find Dean Edwards packed content
	    var FindPackedContent = /eval\(function\(p,a,c,k,e,d\)([\s\S]*?)<\/script>/g;
	    var packed = "eval(function(p,a,c,k,e,d)" + FindPackedContent.exec(postresponse.toString())[1];
	    
	    // unpack the packed content
	  	var unpacked = DeanEdwardsUnpacker.unpack(packed);
	  	
	  	// find hd object data and parse JSON as object
	  	var hdRegEx = /hd:\[(.*?)\]/g;
	  	var JSONcontent = hdRegEx.exec(unpacked)[1].replace(/file/g,'"file"').replace(/label/g,'"label"');
	  	var hdobj = showtime.JSONDecode('['+JSONcontent+']');
	  	
	  	// the hd object has entries for the video links in different resolutions (label, file)
	  	// Assumption: the last one is the highest resolution.
	    return [link,hdobj[hdobj.length-1].file];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;