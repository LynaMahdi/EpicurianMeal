<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
session_start();
if (isset($_SESSION['SESSION_EMAIL'])) {
    die();
}

include 'config.php';
$msg = "";

class UserVerification {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function verifyAndUpdatePassword() {
        try {
            if (isset($_POST['verification'])) {
                $verificationCode = mysqli_real_escape_string($this->conn, $_POST['verification']);

                $result = mysqli_query($this->conn, "SELECT * FROM Utilisateurs WHERE code='{$verificationCode}'");

                if (mysqli_num_rows($result) > 0) {
                    $password = mysqli_real_escape_string($this->conn, md5($_POST['password']));
                    $repassword = mysqli_real_escape_string($this->conn, md5($_POST['repassword']));

                    if ($password === $repassword) {
                        $query = mysqli_query($this->conn, "UPDATE Utilisateurs SET mdp='{$password}', code='' WHERE code='{$verificationCode}'");

                        if ($query) {
                            echo "connexion";
                        } else {
                            echo "Something went wrong while updating password.";
                        }
                    } else {
                        echo 'Password and Confirm Password do not match';
                    }
                } else {
                    echo "Code does not exist";
                }
            }
        } catch (PDOException $e) {
            // Réponse JSON en cas d'erreur
            echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userVerification = new UserVerification($conn);
    $userVerification->verifyAndUpdatePassword();
}
?>
