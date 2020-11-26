
function service(request, response)
{
	'use strict';
	try 
	{
		require('Kodella.KodellaCCT.ProductCarousel.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Kodella.KodellaCCT.ProductCarousel.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}