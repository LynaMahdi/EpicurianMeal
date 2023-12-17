
<?php
header('Access-Control-Allow-Origin: https://epicureanmeal.alwaysdata.net');
session_start();
if (isset($_SESSION['SESSION_EMAIL'])) {
    
    die();
}


include 'config.php';
$msg = "";
try {

    if (isset($_POST['verification'])) {
        
    if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM Utilisateurs WHERE code='{$_POST['verification']}'")) > 0) {
            $password = mysqli_real_escape_string($conn, md5($_POST['password']));
            $Repassword = mysqli_real_escape_string($conn, md5($_POST['repassword']));
            if($password=== $Repassword){
                $query = mysqli_query($conn, "UPDATE Utilisateurs SET mdp='{$password}', code='' WHERE code='{$_POST['verification']}'");
                if ($query) {
                    echo "connexion ";
                }
            }  else {
                echo 'Password and Confirm Password do not match';
             }
            

        } else{
            echo "code do not exist";
        }  }

} catch (PDOException $e) {
    // Réponse JSON en cas d'erreur
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
?>