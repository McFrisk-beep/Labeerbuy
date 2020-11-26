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
            self.configureCategories();
        })

    ,   configureCategories: function getBrand() {
            var brand = {};
            brand.beer = [];
            brand.liquor = [];
            brand.seltzer = [];
            brand.cider = [];

            _.each(Configuration.navigationData, function(value, key) {
                switch ( value.parentId ) {
                    case "Beer":
                        brand.beer.push( value );
                        break;
                    case "Liquor":
                        brand.liquor.push( value );
                        break;
                    case "Seltzer":
                        brand.seltzer.push( value );
                        break;
                    case "Cider":
                        brand.cider.push( value );
                        break;
                }
            });

            _.each(Configuration.navigationData, function(value, key) {
                if( value.text == 'Beer') {
                    value.brand = brand.beer;
                    value.featuredimage = brand.beer[0].featuredimage;
                    value.item = brand.beer[0].href;
                }
            })

            return brand;
        }

    ,	getContext: _.wrap(View.prototype.getContext, function extendContext(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));
			var self = this;

			return _.extend(context, {
				defaultImg: 'img/default.jpg'
			});
		}) 
		    
    });
});
