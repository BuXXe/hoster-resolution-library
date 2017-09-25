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

	    // Find link (assume that the first one is the highest resolution)
		  var finallink = postresponse.toString().match(/http[^"]+\.mp4/)[0];

	    return [link, finallink];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;
