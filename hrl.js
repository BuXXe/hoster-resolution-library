/* 
 * Each host has a resolution function which returns list [link, filelink] or null if no valid link 
 * The hoster name corresponds to the filename of the resolver in the resolver directory (lowercase!)
 */

/*
 * Support functions
 */

// import resolver and resolve link
function selectResolver(link, hostername)
{
	try{
		return require('./resolver/'+hostername.toLowerCase())(link);
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

// check if the resolver for the given hoster is implemented
function checkResolver(hostername)
{
	try{
		require('./resolver/'+hostername.toLowerCase());
		return true;
	}catch(e){
		showtime.trace(e.message);
		return false;
	}
}

// Export module functions / variables
module.exports.resolve = selectResolver;
module.exports.check = checkResolver;