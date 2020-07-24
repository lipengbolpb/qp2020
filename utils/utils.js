function transformFromWGSToGCJ(latitude, longitude) {
	var lat = "";
	var lon = "";
	var ee = 0.00669342162296594323;
	var a = 6378245.0;
	var pi = 3.14159265358979324;

	if (isLocationOutOfChina(latitude, longitude)) {
		lat = latitude;
		lon = longitude;
	} else {
		var adjustLat = transformLatWithXY(longitude - 105.0, latitude - 35.0);
		var adjustLon = transformLonWithXY(longitude - 105.0, latitude - 35.0);
		var radLat = latitude / 180.0 * pi;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		adjustLat = (adjustLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
		adjustLon = (adjustLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		latitude = latitude + adjustLat;
		longitude = longitude + adjustLon;
	}
	return {
		latitude: latitude,
		longitude: longitude
	};
}

function isLocationOutOfChina(latitude, longitude) {
	if (longitude < 72.004 || longitude > 137.8347 || latitude < 0.8293 || latitude > 55.8271) {
		return true;
	}
	return false;
}

function transformLatWithXY(x, y) {
	var pi = 3.14159265358979324;
	var lat = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
	lat += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
	lat += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
	lat += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
	return lat;
}

function transformLonWithXY(x, y) {
	var pi = 3.14159265358979324;
	var lon = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
	lon += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
	lon += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
	lon += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
	return lon;
}
module.exports = {
	transformFromWGSToGCJ: transformFromWGSToGCJ
}
