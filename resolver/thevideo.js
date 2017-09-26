function resolve(link) {
  try {
    var postresponse = showtime.httpReq(link).toString();

    // Let's play a game O_o
    var game = postresponse.match(/lets_play_a_game ?= ?'(.+)'/)[1];
    var video = postresponse.match(/http[^"]+\.mp4/)[0];
    postresponse = showtime.httpReq('https://thevideo.me/vsign/player/'+game).toString();

    var gewurschtel = postresponse.match(/\|([0-9a-z]{20,})\|/)[1];

    var finallink = video + '?direct=false&ua=1&vt=' + gewurschtel;

    return [link, finallink];
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;
