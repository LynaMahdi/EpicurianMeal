<?php
// Connexion à la base de données et autres configurations
use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer-master/src/Exception.php';
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';
  

header('Access-Control-Allow-Origin: *');

$hostname = "mysql-epicureanrecipes.alwaysdata.net";
$username = "334101";
$password = "devWeb123";
$dbname = "epicureanrecipes_database";

header('Content-Type: application/json'); 

// Récupération des données du formulaire
$nom = $_POST['nom'];
$adressemail = $_POST['adressemail'];
$mdp = $_POST['mdp'];

try {
    $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
    exit;
}

// Traitement des données du formulaire
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupération des données du formulaire (nom, adressemail, mdp)

    // Vérification si l'email existe déjà dans la base de données
    $checkEmailQuery = "SELECT COUNT(*) as count FROM Utilisateurs WHERE adressemail = :adressemail";
    $stmt = $conn->prepare($checkEmailQuery);
    $stmt->bindParam(':adressemail', $adressemail);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        echo json_encode(["success" => false, "message" => "Cet email est déjà utilisé."]);
        exit;
    }

    // Génération d'un code de vérification unique
    $verificationCode = md5(uniqid());

    // Insertion de l'utilisateur avec le code de vérification
    $insertQuery = "INSERT INTO Utilisateurs (nom, adressemail, mdp, code) VALUES (:nom, :adressemail, :mdp, :code)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bindParam(':nom', $nom);
    $insertStmt->bindParam(':adressemail', $adressemail);
    $insertStmt->bindParam(':mdp', $mdp);
    $insertStmt->bindParam(':code', $verificationCode);
    $insertStmt->execute();

    if ($insertStmt->rowCount() > 0) {
        // Envoi de l'email de vérification
        $mail = new PHPMailer(true);

        try {
            // Configuration de l'email

            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP(); 
                        //Server settings
                                           //Send using SMTP
                        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                        $mail->Username   = 'linamahdi001@gmail.com';                     //SMTP username
                        $mail->Password   = 'Linchka1234&';                               //SMTP password
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
            // Configurer les paramètres SMTP
                        //Recipients
                        $mail->setFrom('YOUR_EMAIL_HERE');
                        $mail->addAddress($email);

                        //Content
                        $mail->isHTML(true);                                  //Set email format to HTML
                        $mail->Subject = 'no reply';
                        $mail->Body    = 'Here is the verification link <b><a href="http://localhost/inscription/?verification='.$code.'">http://localhost/login/?verification='.$code.'</a></b>';

                        $mail->send();
                        echo 'Message has been sent';
            exit;
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => "Erreur lors de l'envoi de l'email de vérification"]);
            exit;
        }
      
        echo "</div>";
        $msg = "<div class='alert alert-info'>We've send a verification link on your email address.</div>";
    } else {
        $msg = "<div class='alert alert-danger'>Something wrong went.</div>";
    }
?>
