/*
 *	Adapter for interacting with the database. 
 *
 *	8/16 - just dummy data for a proof of concept, no real db yet
 */
var data = require('../utils/sampleData');

var db = {};

/*
 * Select a provider from the database by id
 *
 * @param 	id - the id to look for
 */
db.getProvider = function(id) {
	for (var i = 0; i < data.providers.length; i++) {
		if (data.providers[i].id == id) {
			return data.providers[i];
		}
	}
	return '';
}

/*
 * Select a list of providers from the database
 *
 * @param 	preferences - object containing preferences for the search. 
 * 				longitude (REQ) - longitude of search origin
 *				latitude (REQ) - latitude of search origin
 * 				range (REQ) - range in miles to search
 */
db.getProviders = function(preferences) {
	var results = { data:[] };
	if (preferences == null) {
		results.errorMessage = "Must provide preferences object";
		return results;
	}
	if (preferences.longitude == null || preferences.latitude == null || preferences.range == null) {
		results.errorMessage = "Must provide location information (longitude, latitude, range)";
		return results
	}

	// TODO: generate SQL with correct filters

	// Here's some proof of concept code that uses the sample data
	var list = new Array();
	for (var i = 0; i < data.providers.length; i++) {
		if (distance(preferences.latitude, preferences.longitude, data.providers[i].latitude, data.providers[i].longitude) < preferences.range) {

			//filter on gender
			if (preferences.gender != null && data.providers[i].gender != preferences.gender) {
				continue;
			}

			//filter on specialty
			if (preferences.specialty != null && data.providers[i].specialty != preferences.specialty.toUpperCase()) {
				continue;
			}

			list.push(data.providers[i]);
		}
	}
	results.data = list;

	return results;
};

/**
 *	proof of concept function that returns all the sample data
 * 	SELECT * FROM PROVIDERS;
 */
db.getAllSampleProvicers = function() {
	return data.providers;
}



/**
 *	proof of concept function to get distance from sample data
 */
function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist
}

module.exports = db;