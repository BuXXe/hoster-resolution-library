function resolve(link) {
  try {
    var postresponse = showtime.httpReq(link).toString();

    // Make the anti adblock happy
    var antiantiadblock = postresponse.match(/counter\.cgi\?fx=([^"]+)/)[1];
    showtime.httpReq('https://flashx.tv/counter.cgi?fx='+antiantiadblock.replace('\n', ''));

    // Wait 5 seconds
    for (var i = 0; i < 5; i++) {
      showtime.notify("Waiting " + (6-i).toString() +" seconds", 1);
      showtime.sleep(1);
    }

    // Collect post data...
    var dom = html.parse(postresponse);
    var forms = dom.root.getElementByTagName('form');
    var postparams = {}
    for (var i = 0; i<forms.length; i++) {
      if (forms[i].attributes.getNamedItem('action').value == 'https://www.flashx.tv/dl?playnow') {
        var inputs = forms[i].getElementByTagName('input');
        for (var j = 0; j<inputs.length; j++) {
          postparams[inputs[j].attributes.getNamedItem('name').value] = inputs[j].attributes.getNamedItem('value').value;
        }
      }
    }

    // ... and do the request
    postresponse = showtime.httpReq('http://www.flashx.tv/dl?playnow', {postdata: postparams, method: "POST"}).toString();

    // Find sources list
    var retval = [];
    reg = /\{.*src *:.+label *:.+\}|\{.*label *:.+src *:.+\}/g;
    do {
      m = reg.exec(postresponse);

      if (m) {
        retval.push(m[0].match(/label *: *["']([^"']*)/)[1]);
        retval.push(m[0].match(/src *: *["']([^"']*)/)[1]);
      }
    } while(m);

    if (retval.length > 0) {
      return retval;
    } else {
      return null;
    }
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;
