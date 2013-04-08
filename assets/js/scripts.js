$(document).ready(function(){
	
	
	/*----------------------------------
	Set up the variables
	----------------------------------*/
	/*var ts = new Date(2012, 0, 1); */ // Move the somewhere else
	
	/**
	 *	Make an array of the divs in centerCol to cycle through 
	 */
	var $frame = [$('.instructions'), $('.camera'), $('.form')];
	
	/**
	 * Set up the button queries 
	 */
	var $button = [$('.contButton'), $('.helpButton'), $('.videoButton'), $('.shootButton'), $('.formButton'), $('.keepButton'), $('.retakeButton')];
	
	var $input = [$('#firstName'), $('#lastName'), $('#firstEmail'), $('#confirmEmail')];
	
	var $countdownBox = $('.headerTab');	
	var $countdownDigit = $('.countdown');
	var $previewButtons = $('.previewButtons');
	
	
	/*----------------------------------
	Bind event listeners
	----------------------------------*/
	
	
	
	/**
	 * Continue Button from Instructions Frame 
	 */	
	$button[0].click(function(){
		$frame[0].hide();		
		$frame[1].show();
		$frame[2].hide();
		$button[3].css('background-image', 'url("/parlourcam/assets/img/shoot-button-active.png")');
		$button[3].addClass('shoot-ready');
	});
	
	
	
	/**
	 * Photobooth Instructions Button in Left Column 
	 */	
	$button[1].click(function(){
		alert("You clicked continue. Yay!");
	});	
	
	
	/**
	 * Watch Channel Islands Marine Life Video Button in Left Column  
	 */	
	$button[2].click(function(){
		alert("You clicked continue. Yay!");
	});	
	
	
	/**
	 * Take Picture Button in Right Column
	 */	
	$button[3].click(function(){		
		if ($button[3].hasClass('shoot-ready')){
			$button[3].css('background-image', 'url("/parlourcam/assets/img/shoot-button-inactive.png")');
			$countdownBox.show();
			var count = 1;
			countdown = setInterval(function(){
				$countdownDigit.html(count);
				if (count == 0){
					document.getElementById('shutter').play();
					video.pause();
					$countdownBox.hide();
					clearInterval(countdown);
					$previewButtons.show();
					return;				
				}
				count--;
			},1000);
		}else{
			console.log('The Camera is not ready.');
		}
	});	
	
	
	
	/**
	 * Form "CONTINUE" Button from User Input Form 
	 */	
	$button[4].click(function(){
		alert("You clicked continue. Yay!");
	});	
	
	
	
	/**
	 * Kepp Button from Picture Preview Controls
	 */	
	$button[5].click(function(){
		$frame[0].hide();		
		$frame[1].hide();
		$frame[2].show();
		//focus the name field to start keyboard.
		$input[0].show();
		$input[0].focus();
	});	
	
	
	
	/**
	 * Re-Take Button from Picture Preview Controls 
	 */	
	$button[6].click(function(){
		//reload camera
		$previewButtons.hide();
		$button[3].click();
	});
	


	
	/*----------------------------------
	Setup Onscreen Keyboard
	----------------------------------*/
	
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
		resetDefault: true,
		stayOpen: true,
		acceptValid: true,
		accepted: function(e, keyboard, el){
			if (keyboard.$el.hasClass('firstName')){
				$input[0].hide();									
				$input[1].show();
				$input[1].focus();
			}else if(keyboard.$el.hasClass('lastName')){
				$input[1].hide();
				$input[2].show();
				$input[2].focus();			
			}else if(keyboard.$el.hasClass('firstEmail')){
				$input[2].hide();
				$input[3].show();
				$input[3].focus();			
			}else{
				takePicture();
			}
		},
		//validate: ,
		//switchInput : function(keyboard, goToNext, isAccepted) {},
		position: {
	        of: null, // null = attach to input/textarea; use $(sel) to attach elsewhere
	        my: 'left top',
	        at: 'right top',
	        at2: '0 bottom' // used when "usePreview" is false
		},
		validate: function(keyboard, value, isClosing){
			if (keyboard.$el.hasClass('firstName') || keyboard.$el.hasClass('lastName') ){
				return keyboard.$el.val();
			}else{		
				var validInput = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
				if (!isClosing && !validInput){			
					//alert("Please Enter a valid email address");
				}else{
					return validInput;
				}
			}
		},	
		layout: 'custom',
		customLayout: {
			'default': [
				'1 2 3 4 5 6 7 8 9 0 ',
				'q w e r t y u i o p ',
				'a s d f g h j k l .',
				'{s} z x c v b n m {bksp}',
				'_ - @ .com .net .org {accept}'
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
	
	
	
	
	function takepicture() {
		
		//jcanvas object to put on watermark
		$("#c1").addLayer({
			method : "drawImage",
			source : "assets/img/ciwwlogo.png",
			x : 1000,
			y : 840,
			height:100,
			width:400,
			fromCenter : false,
			name : "watermark"
		}).drawLayer("watermark");	
		
		// The canvas element storing the webcam.
		var canv = document.getElementById("c1");
		
		//convert canvas data to encoded data url string.
		var data = canv.toDataURL('image/png');
		
        //refrence image to store snap shot.
		var photo = document.getElementById("photo");
		
		//assign data url to image source.		 		
 		photo.setAttribute('src', data);
 		
 		var encoded = encodeURIComponent( $inptPhoto.attr( "src" ) );
		var formData = "&name="+$input[0].val()+"&photo="+encoded+"&email="+$input[2].val();
 		
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
		
		//clear fields
		document.getElementById("dataForm").reset();		
 		return false;
 	}
	
	
	
		
});
