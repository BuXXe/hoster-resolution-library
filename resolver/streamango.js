function streamangoDecrypt(_0x5ecd00, _0x184b8d) {
      var _0x59b81a = '';
      var _0x2e4782, _0x2c0540, _0x5a46ef;
      var _0x4a2f3a, _0x29d5bf, _0x3b6833, _0x426d70;
      var _0x1598e0 = 0x0;
      var k = '=/+9876543210zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA';
      _0x5ecd00 = _0x5ecd00.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      while (_0x1598e0 < _0x5ecd00.length) {
        _0x4a2f3a = k.indexOf(_0x5ecd00.charAt(_0x1598e0++));
        _0x29d5bf = k.indexOf(_0x5ecd00.charAt(_0x1598e0++));
        _0x3b6833 = k.indexOf(_0x5ecd00.charAt(_0x1598e0++));
        _0x426d70 = k.indexOf(_0x5ecd00.charAt(_0x1598e0++));
        _0x2e4782 = ((_0x4a2f3a << 0x2) | (_0x29d5bf >> 0x4));
        _0x2c0540 = (((_0x29d5bf & 0xf) << 0x4) | (_0x3b6833 >> 0x2));
        _0x5a46ef = ((_0x3b6833 & 0x3) << 0x6) | _0x426d70;
        _0x2e4782 = (_0x2e4782 ^ _0x184b8d);
        _0x59b81a = (_0x59b81a + String.fromCharCode(_0x2e4782));
        if (_0x3b6833 != 0x40) {
          _0x59b81a = (_0x59b81a + String.fromCharCode(_0x2c0540))
        }
        if (_0x426d70 != 0x40) {
          _0x59b81a = (_0x59b81a + String.fromCharCode(_0x5a46ef))
        }
      }

      return _0x59b81a;
    }

function resolve(link) {
  try {
    var postresponse = showtime.httpReq(link).toString();

    // Find encrypted links, .mpd doesn't seem to work so filter it.
    var reg = /d\('(.+)' *, *(\d+)/g;
    var finallink = '';
    var m;

    do {
      m = reg.exec(postresponse);

      if (m) {
        finallink = streamangoDecrypt(m[1], m[2]);

        if (finallink.substring(finallink.length-4) != '.mpd') {
          if (finallink.indexOf('http') != 0) {
            finallink = 'http:' + finallink;
          }

          return [link, finallink];
        }
      }
    } while(m);

    // If we are here, nothing was found.
    return null;
  }
  catch(e) {
    showtime.trace(e.message);
    return null;
  }
}

//Export resolve function
exports.resolve = resolve;
