var _debug = function( obj ) {
	window.console && console.log( obj );
};

var CodeGenerator = function( options ) {
    
    var options = {
    	tags : options.tags || null,
    	score : options.score || 10
    }
    
    return {
    
    	tags : options.tags,
    	
    	score : options.score,
    	collection : [],
    	rollers : 3,
    
	    roll : function( number ) {
	    	this.makeCollection( number );
			this.setScore();
			_debug( this.collection );
	    },
	    
	    makeCollection : function( number ) {
	    	this.collection = [];
	    	var number = ++number * this.rollers;
			while( --number ) {
				var item = this.randomize();
				this.collection.push( item );
			}
	    },
	    
	    check : function() {
	    
	    },
	    
	    reset : function() {
	   		this.collection = [];
	   		this.score = options.score;
	    },
	    
	    randomize : function() {
	    	return this.tags[Math.floor(this.tags.length * Math.random())]
	    },
	    
	    setScore : function( ) {
	    	
	    	var total = 0;
	    	
	    	var keys = [];
	    	
	    	// Dirty dirty hack
	    	for( var i in this.collection[8] ) {
	    		keys.push( i );
				total += this.collection[8][i];
				_debug( i );
			};
			
			for( var i in this.collection[18] ) {
				keys.push( i );
				total += this.collection[18][i];
				_debug( i );
			};
			
			for( var i in this.collection[28] ) {
				keys.push( i );
				total += this.collection[28][i];
				_debug( i );
			};
			// end dirty hack, have a cry, try to forget it!
	    	
	    	
	    	if( total == 3 ) {
	    		this.score++;
	    		
	    		// if we have all the same then extra point!!
	    		if( ( keys[0] == keys[1] ) && ( keys[1] == keys[2] ) ) {
	    			this.score += 2;
	    		}
	    		    		
	    	} else {
	    		this.score--;
	    	}
	    	
	    	return this.score;
	    
	    }
	    
	};
    
};