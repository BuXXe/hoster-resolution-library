var openload = require('./openload');

function resolve(link)
{
  return openload.resolve(link);
}

//Export resolve function
exports.resolve = resolve;
