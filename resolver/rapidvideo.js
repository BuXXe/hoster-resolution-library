function resolve(link)
{
	try {
		// Standard html5 player
		var html = require('showtime/html');
		var pagecontent = showtime.httpReq(link).toString();
		var dom = html.parse(pagecontent);

		var finallink = dom.root.getElementByTagName('source')[0].attributes.getNamedItem('src').value;

		return [link, finallink];
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;
