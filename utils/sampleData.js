var random_name = require('node-random-name');

var data = {};

var madLat = 43.074;
var madLong = -89.385;
var margin = 0.5;
var specialties = [
	'UROLOGY', 'SURGERY', 'RADIATION ONCOLOGY', 'PSYCHIATRY', 'PREVENTIVE MEDICINE', 
	'PHYSICAL MEDICINE & REHABILITATION', 'PEDIATRICS', 'PATHOLOGY', 'OPHTHALMOLOGY', 
	'OBSTETRICS AND GYNECOLOGY', 'NUCLEAR MEDICINE', 'NEUROLOGY', 'MEDICAL GENETICS', 
	'INTERNAL MEDICINE', 'FAMILY MEDICINE', 'EMERGENCY MEDICINE', 'DIAGNOSTIC RADIOLOGY', 
	'DERMATOLOGY', 'ANESTHESIOLOGY', 'ALLERGY & IMMUNOLOGY'
]

var generateProviders = function(num) {
	console.log("Generating " + num + " sample providers");
	var list = new Array();
	for (var i = 0; i < num; i++) {
		var id = Math.round(Math.random() * 100000);
		var gender = getRandomGender()
		var name = random_name({seed: id, gender: gender})
		var image = gender == 'male' 
			? 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg' 
			: 'https://img.freepik.com/free-vector/doctor-background-design_1270-62.jpg?size=338&ext=jpg';
		list.push({
			id: id,
			name: name,
			gender: gender,
			specialty: getRandomSpecialty(),
			image: image,
			longitude: getRandomInRange(madLong - margin, madLong + margin, 3),
			latitude: getRandomInRange(madLat - margin, madLat + margin, 3)
		})
	}
	return list;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function getRandomSpecialty() {
	return specialties[Math.floor(Math.random() * specialties.length)];
}

function getRandomGender() {
	if (Math.random() >= 0.5) {
		return "male";
	}
	return "female";
}

data.init = function(num) {
	data.providers = generateProviders(num)
};

module.exports = data;