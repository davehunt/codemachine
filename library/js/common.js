var game; // in global scope for easy debugging

var roller = (function() {

    var $start,
        $roller,
        running = false,
        numRunning = 0;

    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd',
        'msTransition'     : 'MsTransitionEnd',
        'transition'       : 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    return {
        start: function(e) {
            
            if( e ) {
            	e.preventDefault();
            }

            if (!running) {

                running = true;
                $start.addClass('disabled');

                $roller.each(function( i, v ) {
					
					var rollerIndex = i;
								
					var start = 0;
					var stop = 0;
					
                    // give each a different animation
                    switch(numRunning) {
                        case 0:
                            $(this).addClass('medium');
                            break;
                        case 1:
                            $(this).addClass('short');
                            break;
                        case 2:
                        default:
                            $(this).addClass('long');
                            break;
                    };

                    numRunning++;

                    $(this).addClass('finish');

                    $(this).on(transEndEventName, function() {

                        if ($(this).hasClass('finish')) {

                            numRunning--;

                            $(this).removeClass('short medium long finish').children().slice(0,7).remove();
                            
                            $(this).append( roller.makeElements( rollerIndex ) );

                            if (numRunning === 0) {
                                running = false;
                                $start.removeClass('disabled');
                                $('#counter').text( game.score );
                            }
                        }
                    })

                });
            }

        },
        
        makeElements : function( i ) {
        
        	var html = '';
			for( var k in game.collection[i] ) {
        		for( kk in game.collection[i][k] ) {
					html += '<li>' + kk + '</li>';
				}
			};
			
			return html;
        
        },
        
        init: (function() {


            $(document).ready(function() {
				
				game = new CodeGenerator( { "tags" : codeGeneratorTags } );
				
                $start = $('#start');
                $roller = $('.roller');
				
				// populate the rollers with html
				$roller.each(function(i,v) {
					$(this).html( roller.makeElements( i ) );
				});
				
				roller.start();
				game.roll( true );
									
                $start.on('click', function(e) {

                    roller.start(e);
                    game.roll();

                });
                
                
                /*
				game = new CodeGenerator( { "tags" : codeGeneratorTags } );
				game.roll( 10 );
				_debug( 'SCORE: ' + game.score );
				*/
				
                
                //console.log( codeGeneratorTags );
                
                
            });
        })()
    }

})();