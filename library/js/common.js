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

                            var html = '';
                            for (var i=0; i<7; i++) {
                                html += '<li>' + Math.floor(Math.random() * 100) + '</li>';
                            }
                            $(this).append(html);

                            if (numRunning === 0) {
                                running = false;
                                $start.removeClass('disabled');
                            }
                        }
                    })

                });
            }

        },
        init: (function() {


            $(document).ready(function() {

                $start = $('#start');
                $roller = $('.roller');

                $start.on('click', function(e) {

                    roller.start(e);

                });
            });
        })()
    }

})();