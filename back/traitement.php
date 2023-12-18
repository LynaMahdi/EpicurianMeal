<?php
header('Access-Control-Allow-Origin: *');

// Import des classes PHPMailer dans l'espace de noms global
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Chargement de l'autoloader de Composer
require 'vendor/autoload.php';

include 'config.php';
$msg = "";

class Mailer {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function sendVerificationEmail($name, $email, $password) {
        $name = mysqli_real_escape_string($this->conn, $name);
        $email = mysqli_real_escape_string($this->conn, $email);
        $password = mysqli_real_escape_string($this->conn, md5($password));
        $code = mysqli_real_escape_string($this->conn, md5(rand()));

        if (mysqli_num_rows(mysqli_query($this->conn, "SELECT * FROM Utilisateurs WHERE adressemail='{$email}'")) > 0) {
            echo "This email address already exists.";
        } else {
            $sql = "INSERT INTO Utilisateurs (nom, adressemail, mdp, code) VALUES ('{$name}', '{$email}', '{$password}', '{$code}')";
            $result = mysqli_query($this->conn, $sql);

            if ($result) {
                $mail = new PHPMailer(true);

                try {
                    $mail->SMTPDebug = 0;
                    $mail->SMTPSecure = 'ssl';
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'eepicureanmeal@gmail.com';
                    $mail->Password = '*****'; // Entrez votre mot de passe Gmail ici
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port = 465;

                    $mail->setFrom('eepicureanmeal@gmail.com');
                    $mail->addAddress($email);

                    $mail->isHTML(true);
                    $mail->Subject = 'no reply Registration code';
                    $mail->Body = $this->buildEmailBody($code);

                    $mail->send();
                    echo "We've sent a verification link to your email address.";
                } catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
            } else {
                echo "Something went wrong.";
            }
        }
    }

    private function buildEmailBody($code) {
        return '
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Verification Email</title>
        </head>
        
        <body style="font-family: Arial, sans-serif;">
        
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
                <h2 style="text-align: center; color: #333;">Verification Email</h2>
                <p style="color: #333;">
                    Welcome!<br>
                    Here is the verification link to complete your registration:<br>
                    <a href="https://epicureanmeal.alwaysdata.net/connexion?verification=' . $code . '" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Verify Email</a>
                </p>
                <p style="color: #333;">If the button above doesn\'t work, you can also click the link below:</p>
                <p style="color: #333; margin-top: -10px;">
                    <a href="https://epicureanmeal.alwaysdata.net/connexion?verification=' . $code . '" style="color: #007bff; text-decoration: underline;" target="_blank">https://epicureanrecipes.alwaysdata.net/connexion/?verification=' . $code . '</a>
                </p>
            </div>
        
        </body>
        
        </html>';
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mailer = new Mailer($conn);
    $name = $_POST['nom'];
    $email = $_POST['adressemail'];
    $password = $_POST['mdp'];

    $mailer->sendVerificationEmail($name, $email, $password);
}
?>
