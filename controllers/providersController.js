var db = require('../db/dbAdapter');

var controller = {};

/**
 * Get a provider by id. For now just gives sample data
 *
 * Returns:
 * 		the provider object
 */
controller.getProvider = function(req, res, id) {
	var result = db.getProvider(id);
	if (result == '') {
		res.status(404);
	} else {
		res.status(200);
	}
	return { provider: result };
}

/**
 * Get a list of providers near you. 
 *
 * Returns:
 * 		List of providers
 */
controller.getProviders = function(req, res) {
	var preferences = {
		longitude: req.query.longitude,
		latitude: req.query.latitude,
		range: req.query.range,
		gender: req.query.gender,
		specialty: req.query.specialty
	}

	var results = db.getProviders(preferences);

	res.status(200);
	return results.data;
}

module.exports = controller;