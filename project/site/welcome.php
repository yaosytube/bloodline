<?php
/* Private welcome destination for a successful registration in this session. */
session_start();

if (empty($_SESSION["bloodline_joined"])) {
    header("Location: index.html");
    exit;
}

readfile(__DIR__ . "/welcome.html");
