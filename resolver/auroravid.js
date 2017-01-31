
//returns list [link, filelink] or null if no valid link
function resolve(link)
{
  	try
  	{
  		var head = {'User-Agent':'Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0'};
 		var getEmissionsResponse = showtime.httpReq(link,{				  
 			headers:head,
 			compression:true}
 		);
  		var dom = html.parse(getEmissionsResponse.toString());
  		
  		var stepkey = dom.root.getElementByTagName('form')[0].getElementByTagName("input")[0].attributes.getNamedItem("value").value;
  		postdata = {stepkey:stepkey};
  	 
	    // POSTING DATA
	    var postresponse = showtime.httpReq(link, {headers:head,compression:true,postdata: postdata, method: "POST" });
	    
	    // find parameters for api call
	    var file = /flashvars.file="(.*?)"/g.exec(postresponse.toString())[1];
	    var filekey = /flashvars.filekey="(.*?)"/g.exec(postresponse.toString())[1];
	    var params = {cid:1, cid3:"auroravid.to", cid2:"undefined", pass:"undefined", file:file, key:filekey, numOfErrors:0, user:"undefined"};
 		var apiResponse = showtime.httpReq("http://www.auroravid.to/api/player.api.php", {headers:head,args:params, noFollow:true,compression:true});
 
	  	finallink = /url=(.*?)&/g.exec(apiResponse.toString())[1];
	  	
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



