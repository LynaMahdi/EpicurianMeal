<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require 'vendor/autoload.php';
include 'config.php';

if (isset($_GET['userEmail'])) {

    $email_user = $_GET['userEmail'];
    $getUserIDQuery= "SELECT * FROM Utilisateurs WHERE adressemail='$email_user'";

    $result = mysqli_query($conn, $getUserIDQuery);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $id_user = $row['iduser'];
        $utili = array();
        $utili= array(
          'nom' => $row['nom'],
        );
        $utili[] = $utili;
    
        header('Content-Type: application/json');
        echo json_encode($utili);
        } else {
            echo 'Erreur lors de la récupération des favoris : ' . mysqli_error($conn);
        }
        
} else {
        echo 'Utilisateur non trouvé';
}
    
?>
