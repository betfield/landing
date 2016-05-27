Template.landing.onCreated(function() {    
    $(window).resize(function() {
        setUserCount();
    });
});

function setUserCount() {
    var x = $(window).width();
    switch (true) {
        case (x <= 420):
            resizeUserCount("225px","22px");
            $('#login').css('padding-top',"0px");
            break;
        case (x <= 560):
            console.log(x);
            resizeUserCount("315px","66px");
            $('#login').css('padding-top',"0px");
            break;
        case (x <= 640):
            resizeUserCount("330px","156px");
            $('#login').css('padding-top',"0px");
            break;
        case (x < 710):
            resizeUserCount("330px","200px");
            $('#login').css('padding-top',"0px");
            break;
        case (x < 975):
            resizeUserCount("530px","268px");
            $('#login').css('padding-top',"190px");
            break;
        case (x < 1183):
            resizeUserCount("230px","488px");
            $('#login').css('padding-top',"190px");
            break;
        default:
            resizeUserCount("230px","690px");
            $('#login').css('padding-top',"190px");
            break;
    }
}

function resizeUserCount(heigth, width) {
    $('#user-count').css('top',heigth);
    $('#user-count').css('left',width);
    $('#user-count').show();
}

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
            'admin@fctwister.ee',
            template.find("#name").value,
            template.find("#message").value,
            function(err) {
                if(err) {
                    Bert.alert( 'Sõnumi saatmine ebaõnnestus!', 'danger', 'fixed-top', 'fa-frown-o' );
                } else {
                    Bert.alert( 'Sõnum saadetud! Täname tagasiside eest.', 'success', 'fixed-top', 'fa-smile-o' );
                    template.find("form").reset();
                }
            });
    }
});

Template.landing.helpers({
    userCount: function() {
        return Users.find().count();
    }
});