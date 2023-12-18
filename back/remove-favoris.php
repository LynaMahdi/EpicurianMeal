<?php
// Autoriser les requêtes CORS depuis https://epicureanmeal.alwaysdata.net
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Load Composer's autoloader
require 'vendor/autoload.php';

include 'config.php';

class RecipeHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function removeRecipeFromFavorites() {
        if (isset($_POST['id'], $_POST['userEmail'])) {
            $id_recette = $_POST['id'];
            $email_user = $_POST['userEmail'];

            $id_user = null;
            $getUserIDQuery = "SELECT iduser FROM Utilisateurs WHERE adressemail= '$email_user'";
            $result = mysqli_query($this->conn, $getUserIDQuery);

            if ($result && mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                $id_user = $row['iduser'];
            }

            if ($id_user !== null) {
                $deleteQuery = "DELETE FROM favoris WHERE iduser = '$id_user' AND Idrecette = '$id_recette'";

                if (mysqli_query($this->conn, $deleteQuery)) {
                    echo 'Recette supprimée des favoris avec succès';
                } else {
                    echo 'Erreur lors de la suppression de la recette des favoris : ' . mysqli_error($this->conn);
                }
            } else {
                echo 'Utilisateur non trouvé';
            }
        } else {
            echo 'Données manquantes';
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipeHandler = new RecipeHandler($conn);
    $recipeHandler->removeRecipeFromFavorites();
}
?>
