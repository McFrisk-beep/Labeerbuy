
define(
	'Kodella.KDLAgeVerification.HomePage'
,   [
		'AgeVerification.View'
	,	'SC.Configuration'
	]
,   function (
		AgeVerificationView
	,	Configuration
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
				var enableFeature = Configuration.get('kdlageverification.enable');
				var v = document.cookie.match('(^|;) ?' + 'ageverification' + '=([^;]*)(;|$)');
				var hasCookie = v ? v[2] : false;
				if(enableFeature && !hasCookie){
					layout.addChildView('Header', function() {
						return new AgeVerificationView({ container: container });
					});
				}

			}

		}
	};
});
