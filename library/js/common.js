var game;

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
            e.preventDefault();

            if (!running) {

                running = true;
                $start.addClass('disabled');

                $roller.each(function() {

					var start = 0;
					var stop = 0;
					
                    // give each a different animation
                    switch(numRunning) {
                        case 0:
                            $(this).addClass('medium');
                            start = 0;
                            stop = 9;
                            break;
                        case 1:
                            $(this).addClass('short');
                            start = 10;
                            stop = 19;
                            break;
                        case 2:
                        default:
                            $(this).addClass('long');
                            start = 20;
                            stop = 29;
                            break;
                    };

                    numRunning++;

                    $(this).addClass('finish');

                    $(this).on(transEndEventName, function() {

                        if ($(this).hasClass('finish')) {

                            numRunning--;

                            $(this).removeClass('short medium long finish').children().slice(0,7).remove();

                            var html = '';
                                                        
                            for(var i=start; i<stop; i++) {
                            	for( var k in game.collection[i] ) {
									html += '<li>' + k + '</li>';
								};
                            }
                            
                            $(this).append(html);

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
        init: (function() {


            $(document).ready(function() {
				
				game = new CodeGenerator( { "tags" : codeGeneratorTags } );
				
                $start = $('#start');
                $roller = $('.roller');
										
                $start.on('click', function(e) {

                    roller.start(e);
                    game.roll( 10 );

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