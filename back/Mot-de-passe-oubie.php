<?php
header('Access-Control-Allow-Origin: *');
session_start();

if (isset($_SESSION['SESSION_EMAIL'])) {
    die();
}

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

include 'config.php';
$msg = "";

    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $code = mysqli_real_escape_string($conn, md5(rand()));

    if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM Utilisateurs WHERE adressemail='{$email}'")) > 0) {
        $query = mysqli_query($conn, "UPDATE Utilisateurs SET code='{$code}' WHERE adressemail='{$email}'");

        if ($query) {        
          
            //Create an instance; passing `true` enables exceptions
            $mail = new PHPMailer(true);

            try {
                //Server settings
               //Server settings
               $mail->SMTPDebug = 0;
               $mail->SMTPSecure='ssl';                      //Enable verbose debug output
               $mail->isSMTP();                                            //Send using SMTP
               $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
               $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
               $mail->Username   = 'eepicureanmeal@gmail.com';                     //SMTP username
               $mail->Password   = '******';                               //SMTP password
               $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
               $mail->Port = 465; // Port SMTP pour Gmail (587 pour TLS)
               //Recipients
               $mail->setFrom('eepicureanmeal@gmail.com');
                $mail->addAddress($email);

                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'no reply Changing Password ';
                $mail->Body = '
                <!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <title>Password Reset</title>
                </head>
                
                <body style="font-family: Arial, sans-serif;">
                
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color:#F27054;">
                        <img src="https://linamahdi.alwaysdata.net/logo.png" alt="Logo" style="display: block; margin: 0 auto; max-width: 100%;">
                        <h2 style="text-align: center; color: #F27054;">Verification Email</h2>
                        <p style="color: #F27054;">
                            Welcome!<br>
                            Here is the verification link to change your password:<br>
                            <a href="http://epicureanmeal.alwaysdata.net/reset-mot-de-passe.php?verification='.$code.'"  target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Change Password</a>
                        </p>
                        <p style="color: #333;">If the button above doesn\'t work, you can also click the link below:</p>
                        <p style="color: #333; margin-top: -10px;">
                            <a href="http://epicureanmeal.alwaysdata.net/reset-mot-de-passe.php?verification='.$code.'"  style="color: #007bff; text-decoration: underline;" target="_blank">https://epicureanrecipes.alwaysdata.net/connexion/?verification=' . $code . '</a>
                        </p>
                    </div>
                
                </body>
                
                </html>
                ';
                $mail->send();
              //  echo 'Message has been sent';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error";
            }
            echo "We've send a verification link on your email address.";
        }
    } else {
        echo " This email address do not exist. ";
    }


    ?>