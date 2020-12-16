define('KDLHeader.View', [
    'Header.View'
,   'kdl_header.tpl'
,   'underscore'
,   'Utils'
,   'jQuery'
], function (
    View
,   kdl_header_tpl
,   _
,   Utils
,   jQuery
) {
    'use strict';
    // alert('KDLHeader.View.js')
    _.extend(View.prototype, {

        initialize: _.wrap(View.prototype.initialize, function initFunc(fn) {
            fn.apply(this, Array.prototype.slice.call(arguments, 1));
            var self = this;
            self.template = kdl_header_tpl;
            jQuery(window).on("scroll", self.kdDetectScroll);
            Backbone.history.on('all', self.toggleHomeClass, this);
            $(window).on("resize", self.toggleHomeClass);

            if (SC.ENVIRONMENT.jsEnvironment === 'browser') {
                window.setTimeout(function timeout() {
                    this.headerSize = jQuery('#site-header').height();
                    self.kdDetectScroll();
                    self.toggleHomeClass();
                },0);
            }
        })
    ,   toggleHomeClass: _.debounce(function(e) {
            if(window.location.pathname == "/") {
                if(_.isDesktopDevice()) {
                    jQuery('#main-container').css('margin-top', -Math.abs(jQuery('#site-header').outerHeight()-jQuery('.header-top-content').outerHeight()));
                } else {
                    jQuery('#main-container').css('margin-top', 0);
                }
            } else {
                jQuery('#main-container').css('padding-top', 0);
                jQuery('#main-container').css('margin-top', 0);
            }
        }, 50)
    ,   kdDetectScroll: function() {
            if (window.pageYOffset > this.headerSize) {
                jQuery("#site-header").addClass("kdSticky");
                jQuery('#main-container').css('padding-top', Math.abs(jQuery('#site-header').outerHeight()));

                var topPosition = $('.header-logo-nav-container').position();

                jQuery(".header-logo-image").css("width", "85px");
                jQuery(".header-logo-image").css("height", "34px");

                if(window.screen.availWidth >= 992){
                    jQuery(".header-logo-nav-container").css("height", "60px");
                }

                jQuery(".header-menu-level-container").css("top", (topPosition.top + 58) + "px");
                jQuery(".header-profile-menu-myaccount-container").css("top", (topPosition.top + 58) + "px");
                console.log('top', jQuery(".header-profile-menu-myaccount-container").css("top"));
            } else {
                jQuery("#site-header").removeClass("kdSticky");
                jQuery('#main-container').css('padding-top', 0);

                var topOffset = $('.header-logo-nav-container').offset().top;

                jQuery(".header-logo-image").css("width", "135px");
                jQuery(".header-logo-image").css("height", "53px");

                if(window.screen.availWidth >= 992){
                    jQuery(".header-logo-nav-container").css("height", "100px");
                }

                // console.log('topOffset + 100', topOffset + 100)
                // jQuery(".header-menu-level-container").css("top", (topOffset + 100) + "px");
                //jQuery(".header-profile-menu-myaccount-container").css("top", (topOffset + 100) + "px");
                jQuery(".header-menu-level-container").css("top", "100px");
                jQuery(".header-profile-menu-myaccount-container").css("top", "100pxpx");
                console.log('top', jQuery(".header-profile-menu-myaccount-container").css("top"));
            }
        }
    });
});
