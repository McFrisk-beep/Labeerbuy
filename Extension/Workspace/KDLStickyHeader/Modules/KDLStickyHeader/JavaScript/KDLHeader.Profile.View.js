define('KDLHeader.Profile.View', [
    'Header.Profile.View',
    'kdl_header_profile.tpl',
    'underscore'
], function (
    View,
    kdl_header_profile_tpl,
    _
) {
    'use strict';
    // alert('KDLHeaderMenu.View.js')
    
    _.extend(View.prototype, { 
        initialize: _.wrap(View.prototype.initialize, function initFunc(fn) {
            fn.apply(this, Array.prototype.slice.call(arguments, 1));
            var self = this;
            self.template = kdl_header_profile_tpl;
        })
    ,   getContext: _.wrap(View.prototype.getContext, function HeaderView(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;

            return _.extend(context, {
                kdlDesktop: _.isDesktopDevice()
            });
        })
    });
});
