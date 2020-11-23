
function service(request, response)
{
	'use strict';
	try
	{
		require('Kodella.KDLSuggestABeer.Main.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('Kodella.KDLSuggestABeer.Main.ServiceController', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
