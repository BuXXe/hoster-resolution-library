function resolve(link)
{
	try {
		// Standard html5 player embedded on page, sometimes there are different
		// resolutions linked. They will be requested if they are there.
		var html = require('showtime/html');
		var pagecontent = showtime.httpReq(link).toString();

		// Check if there are different resolutions linked.
		// Match links with q= parameter
		var links = []
		var reg = /http.+[&?]q=([^&?"]+)/g;
		var m;
		while (m = reg.exec(pagecontent)) {
			links.push(m[1]);
			links.push(m[0]);
		} while(m);

		// Get streams from links
		if (links.length > 2) {
			for (var i = 0; i < links.length; i += 2) {
				var dom = html.parse(showtime.httpReq(links[i+1]).toString());
				links[i+1] = dom.root.getElementByTagName('source')[0].attributes.getNamedItem('src').value;
			}
		} else {
			var dom = html.parse(pagecontent);
			links[1] = dom.root.getElementByTagName('source')[0].attributes.getNamedItem('src').value;
		}

		return links;
	}
	catch(e){
		showtime.trace(e.message);
		return null;
	}
}

//Export resolve function
exports.resolve = resolve;
