Template.landing.onRendered(function() {
    setUserCount();

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

Template.landing.events({
    'submit #contactForm': function(event, template) {
        event.preventDefault();
        
        Meteor.call('sendEmail',
            'info@fctwister.ee',
            'info@fctwister.ee',
            template.find("#name").value,
            template.find("#message").value,
            function(err) {
                if(err) {
                    Bert.alert( 'Sõnumi saatmine ebaõnnestus!', 'danger', 'fixed-top', 'fa-frown-o' );
                } else {
                    Bert.alert( 'Sõnum saadetud! Täname tagasiside eest.', 'success', 'fixed-top', 'fa-smile-o' );
                    template.find("form").reset();
                    $(".floating-label-form-group").removeClass("floating-label-form-group-with-value");
                }
            });
    }
});

Template.landing.helpers({
    userCount: function() {
        return Users.find().count();
    }
});