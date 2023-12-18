<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';
include 'config.php';

class FavoritesHandler {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getUserFavorites() {
        if (isset($_GET['userEmail'])) {
            $email_user = $_GET['userEmail'];

            $getUserIDQuery = "SELECT iduser FROM Utilisateurs WHERE adressemail = '$email_user'";
            $result = mysqli_query($this->conn, $getUserIDQuery);

            if ($result && mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                $id_user = $row['iduser'];
                $favorisQuery = "SELECT * FROM favoris WHERE iduser = '$id_user'";
                $result = mysqli_query($this->conn, $favorisQuery);

                if ($result) {
                    $favoris = array();
                    while ($row = mysqli_fetch_assoc($result)) {
                        $favori = array(
                            'idfav' => $row['idfav'],
                            'iduser' => $row['iduser'],
                            'Idrecette' => $row['Idrecette'],
                            'image_favorie' => $row['image_favorie'],
                            'titre_favorie' => $row['titre_favorie']
                        );
                        $favoris[] = $favori;
                    }
                    header('Content-Type: application/json');
                    echo json_encode($favoris);
                } else {
                    echo 'Erreur lors de la récupération des favoris : ' . mysqli_error($this->conn);
                }
            } else {
                echo 'Utilisateur non trouvé';
            }
        } else {
            echo 'Email utilisateur manquant';
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $favoritesHandler = new FavoritesHandler($conn);
    $favoritesHandler->getUserFavorites();
}
?>
