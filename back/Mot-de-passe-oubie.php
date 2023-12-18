<?php
header('Access-Control-Allow-Origin: *');
session_start();

if (isset($_SESSION['SESSION_EMAIL'])) {
    die();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
include 'config.php';

class PasswordReset {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function sendResetLink($email) {
        $email = mysqli_real_escape_string($this->conn, $email);
        $code = mysqli_real_escape_string($this->conn, md5(rand()));

        $query = mysqli_query($this->conn, "SELECT * FROM Utilisateurs WHERE adressemail='{$email}'");

        if ($query && mysqli_num_rows($query) > 0) {
            $updateQuery = mysqli_query($this->conn, "UPDATE Utilisateurs SET code='{$code}' WHERE adressemail='{$email}'");

            if ($updateQuery) {
                $mail = new PHPMailer(true);

                try {
                    $mail->SMTPDebug = 0;
                    $mail->SMTPSecure = 'ssl';
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'eepicureanmeal@gmail.com';
                    $mail->Password = '******'; // Entrez votre mot de passe Gmail ici
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port = 465;

                    $mail->setFrom('eepicureanmeal@gmail.com');
                    $mail->addAddress($email);

                    $mail->isHTML(true);
                    $mail->Subject = 'no reply Changing Password';
                    $mail->Body = $this->buildEmailBody($code);

                    $mail->send();
                    echo "We've sent a verification link to your email address.";
                } catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
            } else {
                echo "Failed to update code in the database.";
            }
        } else {
            echo "This email address does not exist.";
        }
    }

    private function buildEmailBody($code) {
        return '
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Password Reset</title>
        </head>
        
        <body style="font-family: Arial, sans-serif;">
        
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F27054;">
                <img src="https://linamahdi.alwaysdata.net/logo.png" alt="Logo" style="display: block; margin: 0 auto; max-width: 100%;">
                <h2 style="text-align: center; color: #F27054;">Verification Email</h2>
                <p style="color: #F27054;">
                    Welcome!<br>
                    Here is the verification link to change your password:<br>
                    <a href="http://epicureanmeal.alwaysdata.net/reset-mot-de-passe.php?verification='.$code.'" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Change Password</a>
                </p>
                <p style="color: #333;">If the button above doesn\'t work, you can also click the link below:</p>
                <p style="color: #333; margin-top: -10px;">
                    <a href="http://epicureanmeal.alwaysdata.net/reset-mot-de-passe.php?verification='.$code.'" style="color: #007bff; text-decoration: underline;" target="_blank">https://epicureanrecipes.alwaysdata.net/connexion/?verification=' . $code . '</a>
                </p>
            </div>
        
        </body>
        
        </html>';
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $passwordReset = new PasswordReset($conn);
    $passwordReset->sendResetLink($_POST['email']);
}
?>