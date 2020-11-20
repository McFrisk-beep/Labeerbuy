
define(
	'Kodella.KDLAgeVerification.HomePage'
,   [
		'AgeVerification.View'
	,	'Home.View'
	,	'GlobalViews.Confirmation.View'
	]
,   function (
		AgeVerificationView
	,	HomeView
	,	GlobalViewsConfirmationView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			
			if(layout)
			{

			    _.extend(HomeView.prototype, {
			        initialize: _.wrap(HomeView.prototype.initialize, function initialize (fn) {
			            fn.apply(this, _.toArray(arguments).slice(1));
			            this.on('afterViewRender', function () {
			                var view = new AgeVerificationView();
			                layout.showContent(view, {showInModal: false});
			            });
			        })
			    });

			}

		}
	};
});
