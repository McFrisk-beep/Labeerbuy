
define(
	'Kodella.KodellaCCT.KodellaCCT'
,   [
		'Kodella.KodellaCCT.KodellaCCT.View'
	,	'Kodella.KodellaCCT.Quote'
	,	'Kodella.KodellaCCT.FullBanner'
	,	'Kodella.KodellaCCT.HalfBanner'
	]
,   function (
		KodellaCCTView
	,	KodellaCCTQuote
	,	KodellaCCTFullBanner
	,	KodellaCCTHalfBanner
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
			KodellaCCTQuote.mountToApp(container);
			KodellaCCTFullBanner.mountToApp(container);
			KodellaCCTHalfBanner.mountToApp(container);
			
			if(layout)
			{
				layout.addChildView('Header.Logo', function() { 
					return new KodellaCCTView({ container: container });
				});
			}

		}
	};
});
