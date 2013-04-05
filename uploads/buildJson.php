<?php
   /* $file = "../xfer/data.json";  //name and location of json file. if the file doesn't exist, it   will be created with this name

    $fh = fopen($file, 'a');  //'a' will append the data to the end of the file. there are other arguemnts for fopen that might help you a little more. google 'fopen php'.


    $new_data = $_POST["newImage"]; //put POST data from ajax request in a variable
    //$new_data = "Hello World!";

    fwrite($fh, $new_data);  //write the data with fwrite

    fclose($fh);  //close the dile*/

	$postedDate = $_POST["newLog"];  //ajax data containing name for new json file.
	$file_dir = "uploads/json/";
	$file = $file_dir.$postedDate.".json"; //create a filename string so we can create multiple daily logs.
	//iterative check for file name existence
	$i = 1; 
	do  {		
		$file = $file_dir.$postedDate."-".$i.".json";  //rename the the file
		$i++;
	}while (file_exists($file));
	
	$fh = fopen($file, 'w+'); //create the file

	$new_data = '{"uploads": []}'; //create json string for new file. date-2, date-3, date-4, etc.
	
	fwrite($fh, $new_data);  //write and save
	
	fclose($fh);  //close file


?>
