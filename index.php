<?php
    require 'app/config/config.php';
    $index = VIEW . '/home/test.php';
    header("Location: $index");
    die();