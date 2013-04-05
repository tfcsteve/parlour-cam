<?php
	
 	//connect to local db
	$con = mysqli_connect("localhost", "theshoe", "asdlkd2013!", "theshoe_cam_data");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	//$visiting = $_POST["option"];
	$guest 	 = ucfirst($_POST["name"]);
	$to      = $_POST["email"];
	// Init dataURL variable
	$dataURL = $_POST["photo"];
	$image = base64_decode( str_replace('data:image/png;base64,', '', $dataURL ));  //store in DB as image type
	//$today = date('Y-m-d-H-i-s');
	$today = date('c');	 	
	//$randomtag = rand();
	//$imgname = $guest.'-'.$randomtag.'-'.$today.'.png';  
	//$fp = fopen('gifts/'.$imgname,'w');
	//fwrite($fp, $image);  
	//fclose($fp);
	
	//create new record 
	$sql = "INSERT INTO `theshoe_cam_data`.`data` (`name`, `email`, `image`, `date`) VALUES ('$guest', '$to', '$dataURL', '$today')";
	
	if (!mysqli_query($con, $sql)) {
		die('Error: ' . mysqli_error());
	}

	mysqli_close($con);
	
	//create email
	$subject = 'Your Photograph is ready to view!';
	$imgroot = 'http://www.cultofpoopsy.net/cam3/uploads/gifts';
	$message =  $guest.'. You can view and download your photo by following <a href="http://www.cultofpoopsy.net/parlourcam/guests.php?email='.$to.'">this link</a>'. "\r\n" .'Thank you from Channel Islands Whale Watching.';
	$headers = 'From: ranger85@channelislandswhalewatching.com' . "\r\n" .
	    'Reply-To: ranger85@channelislandswhalewatching.com' . "\r\n" .
		'MIME-Version: 1.0' . "\r\n" .
		'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	mail($to, $subject, $message, $headers);
	
	function dataXfer()
	{
		//copy local database contents to remote db.
		//try connection
		//create sql export
		//save it to localdisk
		//upload to remote host 
		//request to update.php to run update script **update.php can send emails.
		//return thank you message
	} 
?>



