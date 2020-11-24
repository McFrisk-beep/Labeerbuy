
function service(request, response)
{
	'use strict';
	try 
	{
		require('Kodella.KodellaCCT.Quote.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Kodella.KodellaCCT.Quote.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}