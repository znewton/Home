<?php

$reddit = file_get_contents("http://www.reddit.com/r/aww/hot/.json?limit=100");


header('Content-Type: application/json');
//echo $reddit;

$reddit = json_decode($reddit,true);
$posts = [];
foreach ($reddit['data']['children'] as $post){
	$posts[] = [
		'author' => $post['data']['author'],
		'title' => $post['data']['title'],
		'permalink' =>  'http://reddit.com'.$post['data']['permalink'],
		'link' => $post['data']['url'],
	];
}
echo json_encode($posts);