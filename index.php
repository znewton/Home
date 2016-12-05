<?php

include 'renderView.php';
include 'profile.php';

$profile = new profile();

$view = new renderView($profile->getConfig());
echo $view->pageStart();

include 'view.phtml';

echo $view->pageEnd();

?>