define('KDLHeaderMenu.View', [
    'Header.Menu.View',

    'kdl_header_menu.tpl',

    'Categories.Utils',
	'SC.Configuration',
    'underscore'
], function (
    View,

    kdl_header_menu_tpl,

    CategoriesUtils,
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
            
            var brand = {
                beer: {},
                liquor: {},
                seltzer: {},
                cider: {},
            };

            brand.beer.data = [];
            brand.beer.bs = [];
            brand.liquor.data = [];
            brand.liquor.bs = [];
            brand.seltzer.data = [];
            brand.cider.data = [];

            _.each(Configuration.navigationData, function(value, key) {
                switch ( value.parentId ) {
                    case "Beer":
                        brand.beer.data.push( value );
                        break;
                    case "Beer-Bestseller-Item":
                        brand.beer.bs.push( value );
                        break;
                    case "Liquor":
                        brand.liquor.data.push( value );
                        break;
                    case "Liquor-Bestseller-Item":
                        brand.liquor.bs.push( value );
                        break;
                    case "Seltzer":
                        brand.seltzer.data.push( value );
                        break;
                    case "Cider":
                        brand.cider.data.push( value );
                        break;
                }

                // BEER
                if( value.text == 'Beer Category Image') {
                    brand.beer.categoryimage = value.featuredimage;
                }
                if( value.text == 'Beer Category Brand') {
                    brand.beer.brandimage = value.featuredimage;
                }
                if( value.text == 'Beer Category Bestseller') {
                    brand.beer.bestsellerimage = value.featuredimage;
                }
                if( value.text == 'Beer Category Shop') {
                    brand.beer.shopimage = value.featuredimage;
                }

                // LIQUOR
                if( value.text == 'Liquor Category Image') {
                    brand.liquor.categoryimage = value.featuredimage;
                }
                if( value.text == 'Liquor Category Brand') {
                    brand.liquor.brandimage = value.featuredimage;
                }
                if( value.text == 'Liquor Category Bestseller') {
                    brand.liquor.bestsellerimage = value.featuredimage;
                }
                if( value.text == 'Liquor Category Shop') {
                    brand.liquor.shopimage = value.featuredimage;
                }

            });

            _.each(Configuration.navigationData, function(value, key) {
                if( value.text == 'Beer' ) {
                    value.brand = brand.beer.data;
                    value.bestseller = brand.beer.bs;
                    value.categoryimage = brand.beer.categoryimage;
                    value.brandimage = brand.beer.brandimage;
                    value.bestsellerimage = brand.beer.bestsellerimage;
                    value.shopimage = brand.beer.shopimage;
                } else if (value.text == 'Liquor') {
                    value.brand = brand.liquor.data;
                    value.bestseller = brand.liquor.bs;
                    value.categoryimage = brand.liquor.categoryimage;
                    value.brandimage = brand.liquor.brandimage;
                    value.bestsellerimage = brand.liquor.bestsellerimage;
                    value.shopimage = brand.liquor.shopimage;
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
