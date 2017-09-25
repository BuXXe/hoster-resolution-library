function openloadDecrypt(cypherText, const1, const2, const3, const4) {
  var numArray = [];
  var t = cypherText;
  var later = "";
  var pos = 9*8;
  var val = t.length;
  var key = t.substring(0, pos);
  _ref2 = {
    "k" : key,
    "ke" : []
  };

  for (var i = 0; i<pos; i+=8) {
    var subs = cypherText.substring(i, i + 8);
    numArray.push(parseInt(subs, 16));
  }

  var t = cypherText.substring(pos);
  key = 0;
  var nonWhitespaceOrBookmarkEval = 0;

  for (; key < t.length;) {
    var tagName = 64;
    var depId = 127;
    var k = 0;
    var v = 0;
    var elem = 0;
    var _ref2 = {
      "mm" : 128,
      "xx" : 63
    };

    do {
      var camelKey = t.substring(key, key+2);
      key++;
      key++;
      elem = parseInt(camelKey, 16);

      with(_ref2) {
        if (v < 30) {
          var queue = elem & xx;
          k += (queue << v);
        } else {
          queue = elem & xx;
          k += (queue * Math.pow(2, v));
        }
      }

      v += 6;
    } while (elem >= tagName);

    var _0x59ce16 = 681741804;
    var pdataOld = parseInt(const4, 8);
    var pdataCur = (k ^ numArray[nonWhitespaceOrBookmarkEval % 9]);
    pdataCur = ((pdataCur ^ (parseInt(const1, 8) - const2 + 4) / (const3 - 8)) ^ pdataOld);
    var dep = ((tagName * 2) + depId);

    i = 0;
    for (; i < 4;i++) {
      var prefix = pdataCur & dep;
      var index = ((pos / 9) * i);
      prefix = prefix >> index;
      var tc = String.fromCharCode(prefix - 1);
      if (tc != "%") {
        later += tc;
      }
      dep = (dep << (pos / 9));
    }

    nonWhitespaceOrBookmarkEval += 1;
  }

  return later;
}

function resolve(link) {
  // Since the openload API is now protected by a captcha we need to get the link
  // by the more difficult way using the webpage.

  try {
    var postresponse = showtime.httpReq(link).toString();

    cypherText = postresponse.match(/[0-9a-f]{72,}/)[0];
    constArray = postresponse.match(/parseInt\(\'(\d+)\',8\)-(\d+)\+0x4\)\/\((\d+)/);
    const4 = postresponse.match(/parseInt\('(\d+)',8\);/)[1];

    var finallink = openloadDecrypt(cypherText, constArray[1], constArray[2], constArray[3], const4);
    //print(finallink);

    return [
      link,
      "https://openload.co/stream/" + finallink + "?mime=true"
    ];
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;
