<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';
include 'config.php';

class FavoriteHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function addToFavorites($idRecette, $userEmail, $image, $title) {
        $id_recette = mysqli_real_escape_string($this->conn, $idRecette);
        $email_user = mysqli_real_escape_string($this->conn, $userEmail);
        $image_favorie = mysqli_real_escape_string($this->conn, $image);
        $titre_favorie = mysqli_real_escape_string($this->conn, $title);

        $getUserIDQuery = "SELECT iduser FROM Utilisateurs WHERE adressemail = '$email_user'";
        $result = mysqli_query($this->conn, $getUserIDQuery);

        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $id_user = $row['iduser'];

            $insertQuery = "INSERT INTO favoris (iduser, Idrecette, image_favorie, titre_favorie) VALUES ('$id_user', '$id_recette', '$image_favorie', '$titre_favorie')";

            if (mysqli_query($this->conn, $insertQuery)) {
                echo 'Recette ajoutée aux favoris avec succès';
            } else {
                echo 'Erreur lors de l\'ajout de la recette aux favoris : ' . mysqli_error($this->conn);
            }
        } else {
            echo 'Utilisateur non trouvé';
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id'], $_POST['userEmail'], $_POST['image'], $_POST['title'])) {
    $favoriteHandler = new FavoriteHandler($conn);
    $favoriteHandler->addToFavorites($_POST['id'], $_POST['userEmail'], $_POST['image'], $_POST['title']);
} else {
    echo 'Données manquantes';
}
?>
