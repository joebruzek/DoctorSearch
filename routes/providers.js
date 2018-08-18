var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var controller = require('../controllers/providersController');

// GET ************************************************************************

router.get('/', function(req,res,next) {
	//check for latitude, longitude, and range in query
	if (req.query.longitude == null || req.query.latitude == null || req.query.range == null) {
		next(createError(400, 'Longitude, latitude, and range must be provided to get a list of providers.'));
		return;
	}

	var list = controller.getProviders(req,res)

	res.send({providers: list});
});

router.get('/:id', function(req,res) {
	var response = controller.getProvider(req,res,req.params.id);
	res.send(response);
});

// POST ***********************************************************************

router.post('/', function(req,res) {
	res.status(501);
	res.send({
		message: "POST not implemented yet"
	});
});

module.exports = router;