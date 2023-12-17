<?php
// Autoriser les requêtes CORS depuis http://localhost:3000
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: POST"); // Ajoutez d'autres méthodes si nécessaire
header("Access-Control-Allow-Headers: Content-Type");


//Load Composer's autoloader
require 'vendor/autoload.php';

include 'config.php';

// Vérifier si la requête est de type POST
if (isset($_POST['id']) ) {
    echo "hhhhh";
    $id_recette=$_POST['id'];
    $email_user = $_POST['userEmail']; // Récupération de l'email depuis la requête POST
    $id_user = null; // Initialisation de l'ID utilisateur
    // Requête SQL pour récupérer l'ID utilisateur en fonction de l'email
    $getUserIDQuery = "SELECT iduser FROM Utilisateurs WHERE adressemail= '$email_user'";

    $result = mysqli_query($conn, $getUserIDQuery);

    if ($result && mysqli_num_rows($result) > 0) {
        // Si l'utilisateur existe, récupérez son ID
        $row = mysqli_fetch_assoc($result);
        $id_user = $row['iduser'];
    }
    echo $id_user;

    // Vérifiez si vous avez récupéré l'ID de l'utilisateur avant de continuer
    if ($id_user !== null) {
    // Si la recette est favorisée, insérez-la dans la table des favoris
            // Vos variables pour l'image et le titre de la recette
            $image_favorie = $_POST['image']; // Remplacez par le chemin réel de l'image
            $titre_favorie = $_POST['title']; // Remplacez par le titre de la recette

            // Requête d'insertion pour ajouter la recette aux favoris
            $insertQuery = "INSERT INTO favoris (iduser, Idrecette, image_favorie, titre_favorie) VALUES ('$id_user', '$id_recette', '$image_favorie', '$titre_favorie')";

            // Exécution de la requête d'insertion dans la base de données
            if (mysqli_query($conn, $insertQuery)) {
                echo 'Recette ajoutée aux favoris avec succès';
            } else {
                echo 'Erreur lors de l\'ajout de la recette aux favoris : ' . mysqli_error($conn);
            }
        } else {
        echo 'Utilisateur non trouvé';
    }
} else {
    echo 'Données manquantes';
}
?>
