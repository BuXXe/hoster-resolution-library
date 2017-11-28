function resolve(link) {
  try {
    var postresponse = showtime.httpReq(link);

    // Find links
    var links = []
    try {
      links.push('HLS');
      var url = postresponse.toString().match(/http[^"]+\.m3u8/)[0];
      url = url.replace(/\\/g, '');
      links.push(url);
    } catch(e) {}
    try {
      links.push('mp4');
      var url = postresponse.toString().match(/http[^"]+\.mp4/)[0];
      url = url.replace(/\\/g, '');
      links.push(url);
    } catch(e) {}

    return links;
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;
