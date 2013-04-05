$(document).ready(function(){
	
	var ts = new Date(2012, 0, 1);
	
	//Hide the cam on startup
	$( ".contentContainer" ).fadeOut();
	$( "#thankyouBox" ).fadeOut();
	
	/*----------------------------------
		Setting up the form pop keyboard
	----------------------------------*/
	$( "#dataForm" ).dialog({
		autoOpen: false,
		show: {
			effect: "blind",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		}
	});
		
	// Custom email layout for keyboard
	$('.qwerty').keyboard({
		display: {
			's' : 'Shift',
			'bksp' : 'Delete',
			'enter' : '\u21d3',
			'default' : 'ABC',
			'meta1' : 'Caps',
			'meta2' : '#+=',
			'accept' : 'enter'
		},
		openOn: 'focus',
		autoAccept: true,
		usePreview: false,
    	lockInput: false,
    	restrictInput: false,
    	stayOpen: false,
    	acceptValid  : true,
    	//validate: ,
    	//switchInput : function(keyboard, goToNext, isAccepted) {},
    	position: {
	        of: null, // null = attach to input/textarea; use $(sel) to attach elsewhere
	        my: 'center top',
	        at: 'center top',
	        at2: '0 bottom' // used when "usePreview" is false
    	},
		layout: 'custom',
		customLayout: {
			'default': [
				'1 2 3 4 5 6 7 8 9 0 ',
				'q w e r t y u i o p @',
				'a s d f g h j k l .',
				'{s} z x c v b n m {bksp}',
				'_ - .com .net .org {accept}'
			],
			'shift': [
				'1 2 3 4 5 6 7 8 9 0 ',
				'Q W E R T Y U I O P @',
				'A S D F G H J K L .',
				'{s} Z X C V B N M {bksp}',
				'_ - .com .net .org {accept}'
			],
			'meta1': [
				'1 2 3 4 5 6 7 8 9 0 {bksp}',
				'` | { } % ^ * / \' {accept}',
				'{meta2} $ & ~ # = + . {meta2}',
				'{default} {space} ! ? '
			],
			'meta2': [
				'[ ] { } \u2039 \u203a ^ * " , {bksp}',
				'\\ | / < > $ \u00a3 \u00a5 \u2022 {accept}',
				'{meta1} \u20ac & ~ # = + . {meta1}',
				'{default} {space} ! ? '
			]
		}
	}); 

	/*----------------------------------
		Binding event listeners
	----------------------------------*/
	
	$('.helpButton').click(function(){
		$( ".contentContainer" ).fadeOut();
		$( "#instructionsBox" ).fadeIn();		
	});
	
	$('.nextButton').click(function(){
		$( "#instructionsBox" ).fadeOut();
		$( ".contentContainer" ).fadeIn();		
	});
	
	$('#shootButton').click(function(){
		$('#photos').hide();
		ts = (new Date()).getTime() + 6*1000;
			   
	    $('#buttons').append('<div id="countdown"></div>');
	    $('#countdown').countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){				
				if (seconds == 0){									 														
					$('#countdown').remove();
					togglePane();
					video.pause();																		
				}
			}
		});
		return false;				 	   
	});
	$('#cancelButton').click(function(){
		togglePane();
		video.play();
		return false;
	});
	
	$('#uploadButton').click(function(){
		//jcanvas object to put on watermark
		$("#c1").addLayer({
			method : "drawImage",
			source : "assets/img/ciwwlogo.png",
			x : 800,
			y : 850,
			height:100,
			width:400,
			fromCenter : false,
			name : "watermark"
		}).drawLayer("watermark");
		
		//capture video frame to image element
		takepicture();
		
		//open popup submit form
		$( "#dataForm" ).dialog( "open" );
		
		//clear fields
		document.getElementById("dataForm").reset();
		
		return false;
	});
	
	$('#confirmButton').click(function(){
		var $inptPhoto = $("#photo");
		var $inptName = $("#inptName"); 
		var $inptEmail = $("#inptEmail");
		var $inptConfirm = $("#inptConfirm");
		//var $thanksBox = $( ".thankyouMessage" );
		$( ".thankyouMessage" ).remove('p');
		
		
		var pattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
		var inputError; //error message			    
	    
    	//check to make sure all fields are used
		if ($inptName.val() == ""){
			inputError = "You did not enter your Name. Please fix this field to continue.";
			console.log(inputError);
		}else if(!pattern.test($inptEmail.val())){//check for text 
	    	if($inptEmail.val() == ""){ //check email input against regexp	    		
	    		inputError = "You did not enter an Email Address. Please fix this field to continue.";
				console.log(inputError);	
    		}else{//text has been input. check email input value against regexp    			
    			inputError = "Invalid email address format. Please fix this field to continue.";
    			console.log(inputError);	
    		}			
		}else if($inptConfirm.val() == ""){
			inputError = "You did not enter your Confirmed Email Address. Please fix this field to continue.";
			console.log(inputError);
		}else{
			inputError = "none";
			console.log(inputError);
		}				

		//check for error messages and compare email inputs
		if ( inputError == "none" && $inptEmail.val() == $inptConfirm.val() ) { //all fields are entered and emails match
			//get all field values
			var encoded = encodeURIComponent( $inptPhoto.attr( "src" ) );
			var formData = "&name="+$inptName.val()+"&photo="+encoded+"&email="+$inptEmail.val();						
			var $mssg = $("<p>Thanks for stopping by, "+$inptName.val()+".</p><p>We have your email address as: "+$inptEmail.val()+".</p><p>If you don't recieve an email soon, please check your spam folders for a message from the Ranger 85.</p>");			
			$mssg.prependTo(".thankyouMessage");
			$( '#dataForm' ).dialog( "close" );
			$( ".contentContainer" ).fadeOut();
			$( "#thankyouBox" ).fadeIn();
			$('.thankyouButton').click(function(mssg){
				$( "#thankyouBox" ).fadeOut();
				$( ".contentContainer" ).fadeIn();
				$.ajax({			
					type: "POST",
					url: "uploads/uploads.php",
					data: formData,					
					success: function() {
						console.log("success");
						togglePane();
						video.play();																		
						return false;						
					}				
				});						
			});			                               		
			return false;								
		} else if ( inputError != "none" ) { //display error message if not none
			alert( inputError );
			return false;						
		} else if ( $inptEmail.val() != $inptConfirm.val() ) { //reset email fields if not match
			$inptEmail.attr( "value", "" );			
			$inptConfirm.attr( "value", "" );
			alert( "Your Email Addresses do not match. Please correct them to continue." );
			return false;							
		}		
	});

	/*----------------------
		Helper functions
	------------------------*/
	
	function oopsError(errorId,errorMsg) {
		//alerts user with of the first reason their submit form is incorrect.	    
		alert(errorMsg);
	}
	
	
	
	function togglePane(){
		/* This function toggles the two
		 .buttonPane divs into visibility: */
		var $visible = $('#camera .buttonPane:visible:first');
		var $hidden = $('#camera .buttonPane:hidden:first');
		
		$visible.fadeOut('fast',function(){
			$hidden.show();
		});
	}
	
	function takepicture() {
		// The canvas element storing the webcam.
		var canv = document.getElementById("c1");
		
		//convert canvas data to encoded data url string.
		var data = canv.toDataURL('image/png');
		
        //refrence image to store snap shot.
		var photo = document.getElementById("photo");
		
		//assign data url to image source.		 		
 		photo.setAttribute('src', data);
 		
 	}
});
