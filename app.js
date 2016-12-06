document.addEventListener('DOMContentLoaded', function(e){
	startTime();
	getLocation();
	getReddit();
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
		navigator.geolocation.getCurrentPosition(getLocationWeather);
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
	document.body.className = dayNight;
	var tempFar = response.weather.main.temp * 9/5 - 459.67;
	// document.getElementById("weather").innerHTML = Math.round( tempFar * 10) / 10 + '&deg; <span>' + response.weather.weather[0].description + '</span>'; //[°F] = [K] × 9/5 − 459.67
	console.log(response);
	document.getElementById('location').innerHTML = response.weather['name'];
	document.getElementById('temperature').innerHTML =  Math.round( tempFar * 10) / 10 + '&deg; F';
	document.getElementById('weather-description').innerHTML = '<i class="wi wi-' + dayNight + '-' + response.weather.weather[0].main.toLowerCase() + '" title="' + response.weather.weather[0].main.toLowerCase() +'"></i> '+response.weather.weather[0].description;
}

function getLocationWeather(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showWeather(JSON.parse(this.response));
		}
	};
	var url = "/weather.php?lat="+lat+"&lon="+lon;
	console.log(url);
	oReq.open("GET", url, true);
	oReq.send();
}

function getReddit(){
	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showReddit(JSON.parse(this.response));
		}
	};
	var url = "/reddit.php";
	console.log(url);
	oReq.open("GET", url, true);
	oReq.send();
}
function showReddit(response){
	var module = document.getElementById('module');
	module.innerHTML = '';
	for(var i = 1; i < response.length; i++)
	{
		isValidImageUrl(response[i], function(checkedPost, valid){
			if (!valid){
				return;
			}
			var post = document.createElement('div');
			post.className = "post";
			var link = document.createElement('a');
			link.setAttribute('href', checkedPost.permalink);
			link.className = 'post-title';
			link.innerHTML = checkedPost.title + ' --<small>'+checkedPost.author+'</small>';
			post.appendChild(link);

			var imgLink = document.createElement('a');
			imgLink.setAttribute('href', checkedPost.link.replace('http:','https:'));
			imgLink.className = 'post-img';
			var img = document.createElement('img');
			img.setAttribute('src', checkedPost.link.replace('http:','https:').replace('gifv','gif'));
			imgLink.appendChild(img);
			post.appendChild(imgLink);
			module.appendChild(post);
		});

	}
}
function isValidImageUrl(response, callback) {
	var img = new Image();
	img.onerror = function () {
		callback(response, false);
	};
	img.onload = function () {
		callback(response, true);
	};
	img.src = response.link.replace('http:','https:');
}