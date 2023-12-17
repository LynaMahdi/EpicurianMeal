<?php
// Autoriser les requêtes CORS depuis votre domaine frontend
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Définir les credentials à true
//Load Composer's autoloader
require 'vendor/autoload.php';



include 'config.php';

$msg = "";
$response = [];
session_start();


if (isset($_POST['verification'])) {
    $verificationCode = $_POST['verification'];
    // Votre logique de vérification du code ici
    if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM Utilisateurs WHERE code='{$verificationCode}'")) > 0) {
        $query = mysqli_query($conn, "UPDATE Utilisateurs SET code='' WHERE code='{$_POST['verification']}'");
        if ($query) {
            $response['message'] = "Account verification has been successfully completed.";
            echo json_encode($response);
            exit; // Arrêter l'exécution ici car la vérification est terminée
        }
    }
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, md5($_POST['password']));

    $sql = "SELECT * FROM Utilisateurs WHERE adressemail='{$email}' AND mdp='{$password}'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        if (empty($row['code'])) {
             // Si la connexion réussit et qu'il n'y a pas de code de vérification
            $_SESSION['userEmail'] = $email;
            $response['message'] = 'bienvenue';
        } else {
            $response['message'] = 'First verify your account and try again.';
        }
    } else {
        $response['message'] = 'Email or password do not match.';
    }
    echo json_encode($response);
    exit; // Arrêter l'exécution ici après avoir envoyé la réponse JSON
}

// En cas d'erreur ou de problème
$response['message'] = 'Error occurred.';
echo json_encode($response);
?>
