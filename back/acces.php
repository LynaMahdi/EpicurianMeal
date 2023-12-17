<?php 
// Autoriser les requêtes CORS depuis http://localhost:3000
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Définir les credentials à true

//Load Composer's autoloader
require 'vendor/autoload.php';

include 'config.php';
// Example PHP code in acces.php

session_start();
var_dump($_SESSION); // Vérifiez toutes les variables de session


// Check if SESSION_MAIL is set
if (isset($_SESSION['userEmail'])) {

    echo $_SESSION['userEmail']; // Output the value if it exists

} else {

    echo "SESSION_MAIL is not set in the session."; // Handle if the variable is not set

}


?>
