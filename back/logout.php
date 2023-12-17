<?php
// Autoriser les requêtes CORS depuis http://localhost:3000
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Autoriser les credentials
// Démarre la session
session_start();

// Vérifie si l'utilisateur est connecté
if (isset($_SESSION['userEmail'])) {
    // Détruit la session en cours
    session_unset(); // Supprime toutes les variables de session
    session_destroy(); // Détruit la session
    
    // Redirige l'utilisateur vers une page après la déconnexion (facultatif)
    header("Location: /accueil"); // Redirige vers la page d'accueil après la déconnexion
    exit();
} else {
    // L'utilisateur n'est pas connecté ou la session est déjà détruite
    echo "Vous êtes déjà déconnecté.";
}
?>
