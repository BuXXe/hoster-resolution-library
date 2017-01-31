
function resolve(link)
{
 	var response = showtime.httpReq(link,{compression: true,noFollow:false,method: "GET"});
	try{
		var regEx = /file:"(.*?)",/g;
	  	var result = regEx.exec(response.toString());
    	return result[1] ? [link,result[1]] : null;
  	}
  	catch(e){
  		showtime.trace(e.message);
  		return null;
  	}
}

//Export resolve function
exports.resolve = resolve;