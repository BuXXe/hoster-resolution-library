var Base64  = require('../utils/Base64').Base64;

//returns list [link, filelink] or null if no valid link
function resolve(link)
{
  	try
  	{
 		var getEmissionsResponse = showtime.httpReq(link,{noFollow:true,compression:true});
  		var dom = html.parse(getEmissionsResponse.toString());
  		var stepkey = dom.root.getElementByTagName('form')[0].getElementByTagName("input")[0].attributes.getNamedItem("value").value;
  		postdata = {stepkey:stepkey};
  	 
	    // POSTING DATA
	    var postresponse = showtime.httpReq(link, {noFollow:true,compression:true,postdata: postdata, method: "POST" });
	  	var dom = html.parse(postresponse.toString());
	  	
	  	// Cloudtime provides multiple links - resolver will use the first one
	  	finallink = dom.root.getElementByTagName('source')[0].attributes.getNamedItem("src").value;
	  	
	  	return [link,finallink];
  	}
  	catch(e)
  	{
  		showtime.trace(e.message);
  		return null;
  	}
}

//Export resolve function
exports.resolve = resolve;



