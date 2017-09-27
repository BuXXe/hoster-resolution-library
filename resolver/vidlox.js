function resolve(link) {
  try {
    var postresponse = showtime.httpReq(link);

    // Find link
    var finallink = postresponse.toString().match(/http[^"]+\.mp4/)[0];
    finallink = finallink.replace(/\\/g, '');

    return [link, finallink];
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;