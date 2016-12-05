<?php

class profile {

	private $config = [
		'display_name' => 'Sample User',
		'links' => [
			'YouTube' => [
				'icon' => 'chevron-left',
				'url' => 'https://www.youtube.com/subscriptions',
			],
			'Napster' => [
				'icon' => 'chevron-left',
				'url' => 'https://app.napster.com',
			],
			'Facebook' => [
				'icon' => 'chevron-left',
				'url' => 'https://www.facebook.com',
			],
			'Twitter' => [
				'icon' => 'chevron-left',
				'url' => 'https://www.twitter.com',
			],
			'Reddit' => [
				'icon' => 'chevron-left',
				'url' => 'https://www.reddit.com',
			],
			'Keep' => [
				'icon' => 'chevron-left',
				'url' => 'https://keep.google.com',
			],
		],
	];

	public function setConfig(){

	}

	public function getConfig(){
		return $this->config;
	}

}