utils = require('../utils/utils');

function resolve(link) {
  try {
    // If there is no referer page will only contain a js redirect to itself.
    var postresponse = showtime.httpReq(link, {headers: {'Referer': 'http://www.bitporno.com'}}).toString();

    return utils.findSourcesList(postresponse, 'file', 'label');
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;
