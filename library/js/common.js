var game; // in global scope for easy debugging

var roller = (function() {

    var $start,
        $roller,
        running = false,
        numRunning = 0;
	
	var transSpeeds = [
		'short',
		'medium',
		'long'
	];
	
    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd',
        'msTransition'     : 'MsTransitionEnd',
        'transition'       : 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    return {
        start: function( noScore ) {
            
            var self = this;
            
            // Setup the game rollers
            game.roll( noScore );
						
            if (!running && !noScore) {
				
                running = true;
                $start.addClass('disabled');

                $roller.each(function( i, v ) {
					
					$(this).addClass( 'rolling' );
                    
                    // Choose a random speed for each roller for the transition
                    var tsChoice = Math.floor((Math.random()*transSpeeds.length)+0);
                    $(this).addClass( transSpeeds[tsChoice] );
                    
                    // Re-populate the rollers with new data
                    $(this).html( roller.makeElements( i ) );
                    $('li', $(this)).hide().fadeIn( 'fast' );

                });
            }
            

        },
        
        makeElements : function( i ) {
        
        	var html = '';
        	var valid = '';
			for( var k in game.collection[i] ) {
        		for( kk in game.collection[i][k] ) {
        			valid = game.collection[i][k][kk] ? ' class="valid"' : '';
        			
        			html += '<li' + valid + '>'
        			
        			if( valid != '' ) {
        				html += '<a href="https://developer.mozilla.org/en/HTML/Element/' + kk + '" target="_blank">';
        			}
        			
					html += kk;
					
					if( valid != '' ) {
						html += '</a>';
					}
					
					html += '</li>';
				}
			};
			
			return html;
        
        },
        
        init: (function() {


            $(document).ready(function() {
				
				// Out game object (global scope for easy debugging)
				game = new CodeGenerator( { "tags" : codeGeneratorTags } );
				
                $start = $('#start');
                $roller = $('.roller');
                $reset = $('#reset');
				
				$('#counter').text( game.score );
				
				// Ready to store original state of game
				var originalItems = [];
				var originalTitle = $('h1').text();
				
				// Binding the transition events here rather than in the start method
				// to prevent multpile binds happening
				var rollingCount = 0;
				$roller.each(function( i, v ) {
					$(this).on(transEndEventName, function() {
                         
                        // First time transistion runs, add new class to get it roll back up again                            
		                if( $(this).hasClass( 'rolling' ) ) {
		                	$(this).removeClass( 'rolling' );
		                	$(this).addClass( 'rolled' );
		                // Second time transition runs, remove transistion classes
		                // and log that this roller has rolled (rollingCount)
		                } else {      
		                	$(this).removeClass('short medium long rolled');
		                	rollingCount++;
		                			                	
		                	// Only run this code when all rollers have stopped rolling
		                    if( rollingCount == $roller.length ) {
		                        running = false;
		                        $('#counter').text( game.score );
		                        
		                        // If the score reaches zero, they lose :(
		                        if( game.score === 0 ) {
		                        	// Change the text of the title & set class to re-style
		                        	$('h1').text( 'You lose!' ).addClass( 'loser' );
		                        } else {
		                        	// Allow another play
		                        	$start.removeClass('disabled');
		                        }
		                        
		                        rollingCount = 0;
		                    }
		               }
		             });
		             
		             // Store the original items in rollers before the game starts
		             originalItems.push( $(this).html() );
		             
                });
				
				// Start the game
				roller.start( true );
									
                $start.on('click', function(e) {
                    roller.start();
                    e.preventDefault();
                });
                
                $reset.on( 'click', function( e ) {
                	// Reset game engine
                	game.reset();
                	// Reset title
                	$('h1').text( originalTitle ).removeClass( 'loser' );
                	// Put the original html into each roller
                	$roller.removeClass( 'short medium long rolled rolling' ).each(function( i, v ) {
                		$(this).html( originalItems[i] );
                	});
                	// Display the reset score
                	$('#counter').text( game.score );
                	// Make sure the user can actually click the play button
                	$start.removeClass('disabled');
                	
                	e.preventDefault();
                });
                
            });
        })()
    }

})();