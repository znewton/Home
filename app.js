document.addEventListener('DOMContentLoaded', function(e){
	startTime();
	getLocationWeather();
});

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
//        var s = today.getSeconds();
	m = checkTime(m);
//        s = checkTime(s);
	var pmam = h < 12 ? 'AM' : 'PM';
	document.getElementById('clock').innerHTML =
		(h%12 != 0 ? h%12 : 12) + ":" + m + ' <span id="pmam">' + pmam + '</span>'; // + ":" + s
	var greeting = '';
	if(h < 12){
		greeting = 'Good Morning';
	}
	else if(h < 18){
		greeting = 'Good Afternoon';
	}
	else{
		greeting = 'Good Evening';
	}
	document.getElementById('greeting').innerHTML = greeting;
	var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
	if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
	return i;
}


function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather);
	} else {
		document.getElementById('weather').innerHTML = "Geolocation is not supported by this browser.";
	}
}

function getWeather(position)
{
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showWeather(JSON.parse(this.response));
		}
	};
	var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=70e28cbfd09c43fb50059e727b9e0fa2";
	oReq.open("GET", url, true);
	oReq.send();
}
function showWeather(response){
	var today = new Date();
	var dayNight = today.getHours() > 6 && today.getHours() < 18 ? 'day' : 'night';
	var tempFar = response.weather.main.temp * 9/5 - 459.67;
	// document.getElementById("weather").innerHTML = Math.round( tempFar * 10) / 10 + '&deg; <span>' + response.weather.weather[0].description + '</span>'; //[°F] = [K] × 9/5 − 459.67

	document.getElementById('location').innerHTML = response.location.city + ', ' + response.location.region_code;
	document.getElementById('temperature').innerHTML =  Math.round( tempFar * 10) / 10 + '&deg;';
	document.getElementById('weather-description').innerHTML = '<i class="wi wi-' + dayNight + '-' + response.weather.weather[0].main.toLowerCase() + '" title="' + response.weather.weather[0].main.toLowerCase() +'"></i>';
}

function getLocationWeather(){
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showWeather(JSON.parse(this.response));
		}
	};
	var url = "/weather.php";
	oReq.open("GET", url, true);
	oReq.send();
}