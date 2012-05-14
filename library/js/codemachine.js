var _debug = function( obj ) {
	window.console && console.log( obj );
};

var CodeGenerator = function( options ) {
    
    var options = {
    	tags : options.tags || null,
    	score : options.score || 10,
    	rollers : options.rollers || 3,
    	elements : options.elements || 10
    }
    
    return {
    
    	tags : options.tags,
    	
    	score : options.score,
    	collection : [],
    	rollers : options.rollers,
    	elements : options.elements,
    
	    roll : function( noScore ) {
	    
	    	var noScore = noScore || false;
	    	
	    	if( !noScore ) {
	    		this.makeCollection();
	    		this.setScore();
	    	}
			//_debug( this.collection );
	    },
	    
	    makeCollection : function( ) {
	    	this.collection = [];
	    	
	    	var rollers = this.rollers;
	    	
	    	while( rollers > 0 ) {
	    		
	    		var numberOfElems = this.elements;
	    		rollers--;
	    		
	    		if( this.collection[rollers] == undefined ) {
    				this.collection[rollers] = [];
    			}
	    		
	    		while( numberOfElems > 0 ) {
	    			var item = this.randomize();
					this.collection[rollers].push( item );
	    			numberOfElems--;	    			
	    		}
    			
	    	}
	    	
	    	//_debug( this.collection );
	    	
	    },
	    
	    check : function() {
	    
	    },
	    
	    reset : function() {
	   		this.collection = [];
	   		this.score = options.score;
	    },
	    
	    randomize : function() {
	    	return this.tags[Math.floor(this.tags.length * Math.random())];
	    },
	    
	    setScore : function( ) {
	    	
	    	var total = 0;
	    	
	    	var keys = [];
	    	
	    	for( var i = 0, len = this.collection.length; i < len; i++ ) {
	    		
	    		// Just choosing the 5th item as our winner!
	    		for( var k in this.collection[i][5] ) {
	    			_debug( this.collection[i][5] );
	    			keys.push( this.collection[i][5] );
	    			total += this.collection[i][5][k];
	    		}
	    		
	    	}
	    	
	    	_debug( 'Total: ' + total );
	    	
	    	// If all three elements are valid - you score!
	    	if( total == 3 ) {
	    		this.score++;
	    		
	    		// if we have all the same then extra point!!
	    		if( ( keys[0] == keys[1] ) && ( keys[1] == keys[2] ) ) {
	    			this.score += 2;
	    		}
	    	
	    	// Otherwise - you lose a point :(    		
	    	} else {
	    		this.score--;
	    	}
	    	
	    	return this.score;
	    
	    }
	    
	};
    
};