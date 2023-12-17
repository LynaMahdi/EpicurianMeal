<?php
header('Access-Control-Allow-Origin: *');


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

include 'config.php';
$msg = "";


        $name = mysqli_real_escape_string($conn, $_POST['nom']);
        $email = mysqli_real_escape_string($conn, $_POST['adressemail']);
        $password = mysqli_real_escape_string($conn, md5($_POST['mdp']));
        $code = mysqli_real_escape_string($conn, md5(rand()));

        if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM Utilisateurs WHERE adressemail='{$email}'")) > 0) {
            echo "This email address has been already exists.";
        } else {
                $sql = "INSERT INTO Utilisateurs (nom, adressemail, mdp, code) VALUES ('{$name}', '{$email}', '{$password}', '{$code}')";
                $result = mysqli_query($conn, $sql);

                if ($result) {
                   
                    //Create an instance; passing `true` enables exceptions
                    $mail = new PHPMailer(true);

                    try {
                        //Server settings
                        $mail->SMTPDebug = 0;
                        $mail->SMTPSecure='ssl';                      //Enable verbose debug output
                        $mail->isSMTP();                                            //Send using SMTP
                        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                        $mail->Username   = 'eepicureanmeal@gmail.com';                     //SMTP username
                        $mail->Password   = '*****';                               //SMTP password
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
                        $mail->Port = 465; // Port SMTP pour Gmail (587 pour TLS)
                        //Recipients
                        $mail->setFrom('eepicureanmeal@gmail.com');
                        $mail->addAddress($email);

                        //Content
                        $mail->isHTML(true);                                  //Set email format to HTML
                        $mail->Subject = 'no reply Registration code';
                        $mail->Body = '
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

                        $mail->send();
                        echo "We've send a verification link on your email address.";

                    } catch (Exception $e) {
                        echo "Message could not be sent. Mailer Error";
                    }
                } else {
                    echo "Something wrong went.";
                }
            } 
?>