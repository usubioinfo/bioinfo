<?php
// Variables
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);
$contact_num = trim($_POST['contact_num']);
// $subject= trim($_POST['subject']);
$subject = 'Message From Rashmore';

$to = "ontor004@gmail.com"; // Change with your email address
//echo "{$to}";
if( isset($email) ) {

	// Avoid Email Injection and Mail Form Script Hijacking
	$pattern = "/(content-type|bcc:|cc:|to:)/i";
	if( preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $message) ) {
		exit;
	}
	// Email will be send
	
	$sub = $subject; // You can define email subject
	// HTML Elements for Email Body
	$body = <<<EOD
	<strong>Name:</strong> $name <br>
	<strong>Email:</strong> <a href="mailto:$email?subject=feedback" "email me">$email</a> <br> <br>
	<strong>Phone:</strong> $contact_num <br>
	<strong>Message:</strong> $message <br> <br> <br>
	<p> This email was sent from: http://authlab.io </p>
EOD;
//Must end on first column
	
	$headers = "From: $name <$email>\r\n";
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// PHP email sender
	$response=mail($to, $sub, $body, $headers);
}
if (isset($response)) {
	echo json_encode(array(
		    'status' => $body,
		    'message' => 'Your message have been sent successfully'
		));
	    die();
}


echo json_encode(array(
    'status' => false,
    'message' => 'Please Check your name and email'
));
die();

?>

