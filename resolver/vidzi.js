var DeanEdwardsUnpacker = require('../utils/Dean-Edwards-Unpacker').unpacker;

function resolve(link)
{
	try{
	    var postresponse = showtime.httpReq(link);
	     
	    // find Dean Edwards packed content
	    var FindPackedContent = /eval\(function\(p,a,c,k,e,d\)([\s\S]*?)<\/script>/g;
	    var packed = "eval(function(p,a,c,k,e,d)" + FindPackedContent.exec(postresponse.toString())[1];
	    
	    // unpack the packed content
	  	var unpacked = DeanEdwardsUnpacker.unpack(packed);
	  	
	  	// find file entries
	  	var filesRegex = /file:"(.*?)"/g;
	  	
	  	// Assumes second entry is the vid
	  	var entries = filesRegex.exec(unpacked);
	  	var entries = filesRegex.exec(unpacked);

	    return [link,entries[1]];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;