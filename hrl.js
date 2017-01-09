var Base64  = require('./utils/Base64');

//returns list [link, filelink] or null if no valid link
function resolveVivosx(StreamSiteVideoLink)
{
	 	var responsse = showtime.httpReq(StreamSiteVideoLink,{
			  compression: true,
			  noFollow:false,
			  method: "GET",
			});
	  	try
	  	{
		  	var re = /Core\.InitializeStream \(\'(.*?)\'\)/g;
		  	var res2 = re.exec(responsse.toString());
	    	var ob = showtime.JSONDecode(Base64.decode(res2[1]))
	  	}
	  	catch(e)
	  	{
	  		return null;
	  	}
	  	if(ob[0])
	  		return [StreamSiteVideoLink,ob[0]];
	  	else
	  		return null;
}
module.exports.vivo = resolveVivosx;