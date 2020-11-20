
function service(request, response)
{
	'use strict';
	try 
	{
		require('Kodella.KDLAgeVerification.HomePage.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Kodella.KDLAgeVerification.HomePage.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}