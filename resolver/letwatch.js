var DeanEdwardsUnpacker = require('../utils/Dean-Edwards-Unpacker');

function resolve(link)
{
	try{
	    var postresponse = showtime.httpReq(link);
	     
	  	// find file entries
	  	var filesRegex = /file:"(.*?)"/g;
	  	var entries = filesRegex.exec(postresponse.toString());
	  	
	    return [link,entries[1]];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
module.exports = resolve;