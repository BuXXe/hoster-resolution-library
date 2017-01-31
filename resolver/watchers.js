var DeanEdwardsUnpacker = require('../utils/Dean-Edwards-Unpacker').unpacker;

function resolve(link)
{
	try{
  		// Use this header to get 720p stream sources
		// var head = {'User-Agent':'Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0'};

		var postresponse = showtime.httpReq(link,{				  
 			//headers:head,
 			compression:true}
 		);

	    // find Dean Edwards packed content
	    var FindPackedContent = /eval\(function\(p,a,c,k,e,d\)([\s\S]*?)<\/script>/g;
	    var packed = "eval(function(p,a,c,k,e,d)" + FindPackedContent.exec(postresponse.toString())[1];
	    
	    // unpack the packed content
	  	var unpacked = DeanEdwardsUnpacker.unpack(packed);

	  	// find source entries
	  	var json = /sources:([\s\S]*?)image/g.exec(unpacked)[1].replace("],","]").replace(/file:/g,'"file":').replace(/label:/g,'"label":');
	  	var sourceobj = showtime.JSONDecode(json);

	  	// sources object holds reference to mp4 files and m3u8
	  	// return the first mp4
	  	// TODO: in the future we need an architecture which allows multiple links to be returned by the resolver
	  	for(var k=0; k< sourceobj.length; k++)
	  	{
	  		if (sourceobj[k].file.indexOf(".m3u8") > -1)
	  			continue;
	  		else
  			{
	  			return [link,sourceobj[k].file];
  			}
	  	}
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;