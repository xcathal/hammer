<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);  
$mail->CharSet = "UTF-8";// Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 1;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'odhammer18@gmail.com';                 // SMTP username
    $mail->Password = '1234qwer1';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to


$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
    
    
    
    
    //Recipients
    $mail->setFrom('odhammer18@gmail.com', 'Mailer');
    $mail->addAddress('odhammer18@gmail.com', 'Joe User');         


    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body = "Wiadomosc od \n".$name ."\n Treść wiadomości:".$message."\n Odpowiedź zwrotna na e-mail: ".$email;
    $mail->AltBody = $message;

    

    $mail->send();
  
print("Mail został wysłany. Za 5 sekund zostaniesz przekierowany do strony głównej.");
header('Refresh: 5; url=kontakt.html');

  
   
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    
}