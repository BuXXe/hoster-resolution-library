utils = require('../utils/utils');

exports.resolve = function resolve(link) {
  try {
    var postresponse = showtime.httpReq(link).toString();
    if (postresponse == 'File was deleted') {
        console.log('Vidoza: File was deleted');
        return null;
    }

    var list = utils.findSourcesList(postresponse, 'file', 'label');

    // Filter SRT files
    var filteredList = [];
    for (var i = 0; i < list.length; i += 2) {
      if (list[i+1].toLowerCase().substr(-4) != '.srt') {
        filteredList.push(list[i]);
        filteredList.push(list[i+1]);
      }
    }
    if (filteredList.length == 0) {return null;}

    return filteredList;
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}
