<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';
include 'config.php';

class UserUpdater {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function updateUser($email, $newUserName, $password) {
        $email_user = mysqli_real_escape_string($this->conn, $email);
        $newUserName = mysqli_real_escape_string($this->conn, $newUserName);
        $hashed_password = md5($password);

        $updateQuery = "UPDATE Utilisateurs SET nom = '$newUserName', mdp = '$hashed_password' WHERE adressemail = '$email_user'";
        $result = mysqli_query($this->conn, $updateQuery);

        if ($result) {
            return ['success' => 'Données utilisateur mises à jour avec succès'];
        } else {
            return ['error' => 'Erreur lors de la mise à jour des données utilisateur'];
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['userEmail'], $_POST['newUserName'], $_POST['password'])) {
    $userUpdater = new UserUpdater($conn);
    $result = $userUpdater->updateUser($_POST['userEmail'], $_POST['newUserName'], $_POST['password']);
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'Données utilisateur manquantes']);
}
?>
