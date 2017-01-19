function resolve(link)
{
	try{
		var postdata;
		var validentries = false;
		  	
	  	var getEmissionsResponse = showtime.httpGet(link);
	  	var pattern = new RegExp('<input type="hidden" name="op" value="(.*?)">[^<]+<input type="hidden" name="usr_login" value="(.*?)">[^<]+<input type="hidden" name="id" value="(.*?)">[^<]+<input type="hidden" name="fname" value="(.*?)">[^<]+<input type="hidden" name="referer" value="(.*?)">[^<]+<input type="hidden" name="hash" value="(.*?)">[^<]+<input type="submit" name="imhuman" id="btn_download" class="button gray" value="(.*?)">');
	    var res = pattern.exec(getEmissionsResponse.toString());
	    
	    // File Not Found (404) Error 
	    if(res != null)
	    {
	    	postdata = {op:res[1], usr_login:res[2], id: res[3],fname:res[4],referer: res[5],hash:res[6],imhuman:res[7]};
	    	validentries = true;
	    }
	    
	    if(!validentries)
	      	return null;
	    
	    // POST DATA COLLECTED
	    // WAIT 11 SECONDS
	    for (var i = 0; i < 12; i++) {
	    	showtime.notify("Waiting " + (11-i).toString() +" Seconds",1);
	        showtime.sleep(1);
	    }
	     
	    // POSTING DATA
	    var postresponse = showtime.httpReq(link, { postdata: postdata, method: "POST" });
			    	
	  	var videopattern = new RegExp('file: "(.*?)",');
	  	var res2 = videopattern.exec(postresponse.toString());
	   	
	  	return [link,res2[1]];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
module.exports = resolve;