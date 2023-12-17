
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
    
            // Si la recette n'est plus favorisée, supprimez-la de la table des favoris
            $deleteQuery = "DELETE FROM favoris WHERE iduser = '$id_user' AND Idrecette = '$id_recette'";

            // Exécution de la requête de suppression dans la base de données
            if (mysqli_query($conn, $deleteQuery)) {
                echo 'Recette supprimée des favoris avec succès';
            } else {
                echo 'Erreur lors de la suppression de la recette des favoris : ' . mysqli_error($conn);
            }
    } else {
        echo 'Utilisateur non trouvé';
    }
} else {
    echo 'Données manquantes';
}
?>
