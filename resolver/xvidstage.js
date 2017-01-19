var DeanEdwardsUnpacker = require('../utils/Dean-Edwards-Unpacker');

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
			method_free : inputs[5].attributes.getNamedItem("value").value
  		};
	  	      
	    // POSTING DATA
	    var postresponse = showtime.httpReq(link, { postdata: postdata, method: "POST" });
	    
	    // find Dean Edwards packed content
	    var dom = html.parse(postresponse.toString());
		var packedcode = dom.root.getElementById("player_code").textContent;
	    	    
	    // unpack the packed content
	  	var unpacked = DeanEdwardsUnpacker.unpack(packedcode);
	  	
	  	// video source
	  	var src = /src="(.*?)"/g;
	  	var vid = src.exec(unpacked);
	    return [link,vid[1]];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
module.exports = resolve;