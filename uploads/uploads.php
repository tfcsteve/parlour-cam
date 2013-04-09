<?php
	
	$con = mysqli_connect("your_db_host", "your_db_user", "your_db_pw", "your_db_name");

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$guest 	 = ucfirst($_POST["name"]);
	$to      = $_POST["email"];

	$dataURL = $_POST["photo"];
	$image = base64_decode( str_replace('data:image/png;base64,', '', $dataURL ));  //store in DB as image type

	$today = date('c');	 	

	//create new record 
	$sql = "INSERT INTO `your_db_name`.`data` (`name`, `email`, `image`, `date`) VALUES ('$guest', '$to', '$dataURL', '$today')";
	
	if (!mysqli_query($con, $sql)) {
		die('Error: ' . mysqli_error());
	}

	mysqli_close($con);
	
	//create email
	$subject = 'Your Photograph is ready to view!';
	$imgroot = 'http://www.yourdomain.com/parlourcam/uploads/gifts';
	$message =  $guest.'. You can view and download your photo by following <a href="http://www.yourdomain.net/parlourcam/guests.php?email='.$to.'">this link</a>'. "\r\n" .'Thank you from Channel Islands Whale Watching.';
	$headers = 'From: parlourcam@yourdomain.com' . "\r\n" .
	    'Reply-To: parlourcam@yourdomain.com' . "\r\n" .
		'MIME-Version: 1.0' . "\r\n" .
		'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	mail($to, $subject, $message, $headers);
	
?>



