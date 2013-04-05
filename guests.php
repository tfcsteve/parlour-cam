<?php
/**
 * This file should be on the remote host.
 */
 	//connect to local db
	$con = mysqli_connect("localhost", "theshoe", "asdlkd2013!", "theshoe_cam_data");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$guest = $_GET['email'];
	$sql = "SELECT * FROM `theshoe_cam_data`.`data` WHERE `email` = '$guest'";
	$result = mysqli_query($con, $sql);
	
	/* numeric array */
	$row = mysqli_fetch_array($result, MYSQLI_NUM);
	//printf ("%s %s %s %s %s %s \n", $row[0], $row[1], $row[2], $row[3], $row[4], $row[5]);
	if ($row[5] == 0){
		//update confirmed datafield 
		$confirmed = "UPDATE `theshoe_cam_data`.`data` SET `confirmed` = '1' WHERE `data`.`id` =$row[0];";
		mysqli_query($con, $confirmed);
	}
	
	/* free result set */
	mysqli_free_result($result);
	
	/* close connection */
	mysqli_close($con);
		
	/*if (!mysqli_query($con, $sql)) {
		die('Error: ' . mysqli_error());
	}*/
	
	/* Select queries return a resultset */
	//$result = mysqli_query($con, $sql);
	
	//printf(mysqli_fetch_array($result, 0));

    /* free result set */
    //mysqli_free_result($result);

	//mysqli_close($con);
	
	$dataURL = $row[3];
	
	$image = base64_decode( str_replace('data:image/png;base64,', '', $dataURL ));  //store in DB as image type	 	
	$randomtag = rand();
	//$imgname = $row[1].'-'.$randomtag.'-'.$row[4].'.png';  
	$imgname = $row[1].'-'.$row[4].'.png';
	$fp = fopen('uploads/gifts/'.$imgname,'w');
	fwrite($fp, $image);  
	fclose($fp);
	
	$siteRoot = "http://".$_SERVER['SERVER_NAME'];	
	$imgDir = $siteRoot."/parlourcam/uploads/gifts/";
	
	$imgUrl = $imgDir.$imgname;
		
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Ranger 85 Photobooth</title>

<link rel="stylesheet" type="text/css" href="assets/css/styles.css" media="screen"/>
<link rel="stylesheet" type="text/css" href='http://fonts.googleapis.com/css?family=Coda+Caption:800' media="screen">
<script type="text/javascript" src="assets/js/jquery-latest.min.js"></script>

</head>
<body style="overflow:scroll !important">	
	<script type="text/javascript">
	$(function() {
		var $target = $('.actionBar');
		if (!$target.size()) return;
		
		var sns = {
	    'st_fblike_large': 'Facebook Like',
	    'st_facebook_large': 'Facebook',
	    'st_twitter_large': 'Tweet',
	    'st_googleplus_large': 'Google +',
	    'st_pinterest_large': 'Pinterest',
	    'st_email_large': 'Email'
		};
		
		var $sharethis = $('<div></div>');
		$.each(sns, function(cl, tx) {
			$('<span></span>').addClass(cl).attr('displayText', tx).appendTo($sharethis);
		});
		$sharethis.appendTo($target);
	});
	</script>	
	<div id="topBar">
		<img src="assets/img/ciwwlogo.png" />			
	</div>
	<div class="contentContainer">		
		<img class="photoFinal" src="<?php echo $imgUrl; ?>"/>				
	</div>
	<section class="actionBar">
		
		<!--<a id="downloadButton" href=<?php echo $imgroot; ?> download=<?php echo $row[3]; ?>>Download Your Photo<img style="display:none;" src=<?php echo $imgurl; ?> /></a>-->
	</section>
	<script type="text/javascript">var switchTo5x=true;</script>
	<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
	<script type="text/javascript">stLight.options({publisher: "cb7ee273-8e7f-4d2f-85c0-9a4e8c12ffaa", doNotHash: false, doNotCopy: false, hashAddressBar: false, onhover:false});</script>
	
</body>
</html>