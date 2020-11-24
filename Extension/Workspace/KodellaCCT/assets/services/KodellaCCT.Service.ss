
function service(request, response)
{
	'use strict';
	try 
	{
		require('Kodella.KodellaCCT.KodellaCCT.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Kodella.KodellaCCT.KodellaCCT.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}