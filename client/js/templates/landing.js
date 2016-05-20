Template.landing.onRendered(function() {
    $('body').attr('id',"page-top");
    $('body').attr('class',"index");
    
    var cbpAnimatedHeader = (function() {
        var docElem = document.documentElement,
            header = document.querySelector( '.navbar-fixed-top' ),
            didScroll = false,
            changeHeaderOn = 300;

        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }

        function scrollPage() {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                classie.add( header, 'navbar-shrink' );
            }
            else {
                classie.remove( header, 'navbar-shrink' );
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        init();

    })();
    
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('body').on('click', '.page-scroll a', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });
});

Template.landing.helpers({
    userCount: function() {
        return Users.find().count();
    }
});