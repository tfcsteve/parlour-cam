/**
 * @author Steve
 */

var streaming = false, video = document.querySelector('#webcam');

navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

navigator.getMedia({

	video : true,

	audio : false

}, function(stream) {

	if (navigator.mozGetUserMedia) {

		video.mozSrcObject = stream;

	} else {

		var vendorURL = window.URL || window.webkitURL;

		video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;

	}

	video.play();

	console.log("stream is running 2");

	console.log("loading processes");

	processor.doLoad();

}, function(err) {

	console.log("An error occured! " + err);

});

console.log("stream queued");
