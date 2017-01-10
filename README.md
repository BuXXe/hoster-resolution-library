# hoster-resolution-library
This module provides hoster resolution helper functions which are used in the movian plugins.
The main script (hrl.js) serves as a helper script which provides functions to check if a resolver
exists and select the correct resolver for a given host and resolve the link.
The resolvers are small scripts in the resolver directory which provide a single function to resolve 
site links. The file names have to be lowercase names of the hosters.

# Usage
```javascript
// Import the main script
var resolvers = require('./hoster-resolution-library/hrl');
var videolink="";

// Check if hoster is implemented
if(resolvers.check(hostername))
	// resolve the given link with hostername
	videolink = resolvers.resolve(hosterlink, hostername);
else
	// Resolver is not implemented
	...
```