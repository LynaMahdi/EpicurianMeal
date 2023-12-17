<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';
include 'config.php';

// Vérifie si les données nécessaires sont présentes dans la requête POST
if (isset($_POST['userEmail']) && isset($_POST['newUserName']) && isset($_POST['password'])) {
    $email_user = $_POST['userEmail'];
    $newUserName = $_POST['newUserName'];
    $password = $_POST['password'];

    // Hachage du mot de passe avec md5
    $hashed_password = md5($password);

    // Effectue le traitement des données (mettre à jour le nom d'utilisateur et le mot de passe)
    $updateQuery = "UPDATE Utilisateurs SET nom = '$newUserName', mdp = '$hashed_password' WHERE adressemail = '$email_user'";
    $result = mysqli_query($conn, $updateQuery);

    if ($result) {
        // Si la mise à jour est réussie, retournez un message de succès
        echo json_encode(['success' => 'Données utilisateur mises à jour avec succès']);
    } else {
        // En cas d'échec, retournez un message d'erreur
        echo json_encode(['error' => 'Erreur lors de la mise à jour des données utilisateur']);
    }
} else {
    // Si des données sont manquantes, retournez un message d'erreur
    echo json_encode(['error' => 'Données utilisateur manquantes']);
}

?>
