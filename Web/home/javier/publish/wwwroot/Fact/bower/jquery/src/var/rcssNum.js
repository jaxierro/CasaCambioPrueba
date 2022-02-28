define( [
	"./arr"
], function( arr ) {
	"use strict";

	return arr.push;
} );
define( [
	"../var/pnum"
], function( pnum ) {

"use strict";

return new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );

} );
