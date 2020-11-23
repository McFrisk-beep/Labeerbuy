define('KDLHeaderMenu.View', [
    'Header.Menu.View',

    'kdl_header_menu.tpl',

	'SC.Configuration',
    'underscore'
], function (
    View,

    kdl_header_menu_tpl,

    Configuration,
    _
) {
    'use strict';
    // alert('KDLHeaderMenu.View.js')
    
    _.extend(View.prototype, {
    	initialize: _.wrap(View.prototype.initialize, function initFunc(fn) {
            fn.apply(this, Array.prototype.slice.call(arguments, 1));
            var self = this;
            console.log('Configuration.navigationData', Configuration.navigationData);
            self.template = kdl_header_menu_tpl;
        })

    ,	getContext: _.wrap(View.prototype.getContext, function extendContext(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));
			var self = this;

			return _.extend(context, {
				defaultImg: 'img/default.jpg'
			});
		}) 
		    
    });
});
