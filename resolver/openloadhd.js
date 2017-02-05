function resolve(link)
{
	try{
	    var postresponse = showtime.httpReq(link);
	    var filehash = /embed\/(.*?)\//g.exec(postresponse.toString())[1];
	    var filerequest = showtime.JSONDecode(showtime.httpReq("https://api.openload.co/1/streaming/get?file=" + filehash));	    
	    if (filerequest.status == 200)
	    {
	    	return [filerequest.result.name,filerequest.result.url];
	    }
	    else
    	{
	    	showtime.notify(filerequest.msg,5);
    		return null;
    	}
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;