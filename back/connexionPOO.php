<?php
class Database
{
    private $conn;

    public function __construct()
    {
        // Autoriser les requêtes CORS depuis votre domaine frontend
        header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true"); // Définir les credentials à true

        // Load Composer's autoloader
        require 'vendor/autoload.php';

        include 'config.php';

        $this->conn = $conn;
        session_start();
    }

    public function verifyAccount($verificationCode)
    {
        if (mysqli_num_rows(mysqli_query($this->conn, "SELECT * FROM Utilisateurs WHERE code='{$verificationCode}'")) > 0) {
            $query = mysqli_query($this->conn, "UPDATE Utilisateurs SET code='' WHERE code='{$verificationCode}'");
            if ($query) {
                $response['message'] = "Account verification has been successfully completed.";
                echo json_encode($response);
                exit;
            }
        }
    }

    public function loginUser($email, $password)
    {
        $email = mysqli_real_escape_string($this->conn, $email);
        $password = mysqli_real_escape_string($this->conn, md5($password));

        $sql = "SELECT * FROM Utilisateurs WHERE adressemail='{$email}' AND mdp='{$password}'";
        $result = mysqli_query($this->conn, $sql);

        if (mysqli_num_rows($result) === 1) {
            $row = mysqli_fetch_assoc($result);
            if (empty($row['code'])) {
                $_SESSION['userEmail'] = $email;
                $response['message'] = 'Welcome';
            } else {
                $response['message'] = 'First verify your account and try again.';
            }
        } else {
            $response['message'] = 'Email or password do not match.';
        }

        echo json_encode($response);
        exit;
    }
}

// Usage de la classe
$database = new Database();

if (isset($_POST['verification'])) {
    $database->verifyAccount($_POST['verification']);
} elseif (isset($_POST['email']) && isset($_POST['password'])) {
    $database->loginUser($_POST['email'], $_POST['password']);
} else {
    $response['message'] = 'Error occurred.';
    echo json_encode($response);
    exit;
}
?>
