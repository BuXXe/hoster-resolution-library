var Base64  = require('../utils/Base64');

function resolve(link)
{
 	var response = showtime.httpReq(link,{compression: true,noFollow:false,method: "GET"});
 	try{
	  	var regEx = /Core\.InitializeStream \(\'(.*?)\'\)/g;
	  	var result = regEx.exec(response.toString());
    	var ob = showtime.JSONDecode(Base64.decode(result[1]))
    	return ob[0] ? [link,ob[0]] : null;
  	}
  	catch(e){return null;}
}

//Export resolve function
module.exports = resolve;