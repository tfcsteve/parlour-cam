/**
 * @author Steve
 */
var processor = {
	timerCallback: function() {
	    if (this.webcam.paused || this.webcam.ended) {          
	        return;
	    }
	    this.computeFrame();
	    var self = this;
	    setTimeout(function () {
	        self.timerCallback();
	    }, 0);
	},
	doLoad: function() {
	    this.webcam = document.getElementById("webcam");
	    this.c1 = document.getElementById("c1");
	    this.ctx1 = this.c1.getContext("2d"); 
	    var self = this;
	    this.webcam.addEventListener("play", function() {
	        self.width = 1200;
	        self.height = 950;
	        self.timerCallback();
	    }, false);
	},
	computeFrame: function() {
	    this.ctx1.drawImage(this.webcam, 0, 0, 1200, 950); //draw webcam to canvas	  
	    return;
	}
};

