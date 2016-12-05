<?php

class renderView {

	private $profile_config = [];

	public function __construct($config)
	{
		$this->profile_config = $config;
	}

	public function pageStart(){
		return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Home</title>
	<meta name="description" content="A lil home page" />
	<meta name="keywords" content="homepage, php, js, css, html" />
	<meta name="author" content="znewton" />
	<link rel="stylesheet" href="/stylesheet.css">
	<link rel="icon" href="/lib/favicon-home.ico">
	<link rel="stylesheet" href="/lib/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="/lib/weather-icons/css/weather-icons.min.css">
	<script src="/app.js"></script>
</head>
<body>
HTML;
	}

	public function pageEnd(){
		return <<<HTML
</body>
HTML;
	}

	public function renderSideBar(){
		$list = '';
		foreach ($this->profile_config['links'] as $label => $link)
		{
			$list .= '<a href="'.$link['url'].'"><i class="fa fa-fw fa-'.$link['icon'].'"></i>'.$label.'</a>';
		}
		return <<<HTML
<div class="sidebar">
{$list}
</div>
HTML;

	}
}