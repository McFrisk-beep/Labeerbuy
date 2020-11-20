
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
			console.log('layout')
			var layout = container.getComponent('Layout');
			
			if(layout)
			{
				/*layout.addChildView('Header.Logo', function() { 
					return new HomePageView({ container: container });
				});*/

				//var view = new HomePageView({ container: container });
				//layout.showContent(view, {showInModal: true});

				/*HomeView.afterInitialize.install({
			        name: 'showAgeVerificationModal',
			        priority: 99,
			        execute: function () {
			            this.on('afterViewRender', function () {
			                var view = new HomePageView();
			                layout.showContent(view, {showInModal: true});
			            });
			            console.log('asdfasfd');            
			        }
			    });*/

			    _.extend(HomeView.prototype, {
			        initialize: _.wrap(HomeView.prototype.initialize, function initialize (fn) {
			            fn.apply(this, _.toArray(arguments).slice(1));
			            this.on('afterViewRender', function () {
			                var view = new AgeVerificationView();
			                layout.showContent(view, {showInModal: false});

			                /*var view = new GlobalViewsConfirmationView({
						        title: 'Welcome to La Beer Buy!',
						        body: "By entering this website, you agree that you're of legal drinking age which is 21 or older.",
						        cancelCallBack: function() {
						        	//window.location = "google.com";
						        	layout.notFound().showContent();
						        },
						        autohide: true
						    });
						    layout.showContent(view, {showInModal: true});*/


			            });
			        })
			    });


			}

		}
	};
});
