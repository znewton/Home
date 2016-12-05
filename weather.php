<?php
session_start();

function get_client_ip() {
	$ipaddress = '';
	if (isset($_SERVER['HTTP_CLIENT_IP']))
		$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
	else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
		$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
	else if(isset($_SERVER['HTTP_X_FORWARDED']))
		$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
	else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
		$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
	else if(isset($_SERVER['HTTP_FORWARDED']))
		$ipaddress = $_SERVER['HTTP_FORWARDED'];
	else if(isset($_SERVER['REMOTE_ADDR']))
		$ipaddress = $_SERVER['REMOTE_ADDR'];
	else
		$ipaddress = 'UNKNOWN';
	return $ipaddress;
}
function getLocationWeather()
{
	$PublicIP = get_client_ip();
	$location = file_get_contents("https://freegeoip.net/json/");
	$arr = json_decode($location, true);

	$weather = file_get_contents("http://api.openweathermap.org/data/2.5/weather?lat=" . $arr['latitude'] . "&lon=" . $arr['longitude'] . "&APPID=70e28cbfd09c43fb50059e727b9e0fa2");

	return json_encode(['weather' => json_decode($weather), 'location' => json_decode($location)]);
}


header('Content-Type: application/json');
if(isset($_SESSION['WEATHER']) && false)
{
	echo $_SESSION['WEATHER'];
}
else
{
	$_SESSION['WEATHER'] = getLocationWeather();
	echo $_SESSION['WEATHER'];
}