console.clear();
/***
	@Title: Simple Simon Game
	@Author: Tom Lorimer (Remirol / Ellf)
	
	Uses oCanvas.js
	
	// Sounds Used in the game
	https://s3.amazonaws.com/freecodecamp/simonSound1.mp3 	GREEN	
	https://s3.amazonaws.com/freecodecamp/simonSound2.mp3	YELLOW
	https://s3.amazonaws.com/freecodecamp/simonSound3.mp3	BLUE
	https://s3.amazonaws.com/freecodecamp/simonSound4.mp3	RED
*/

/**
 * Define some variables
 */
var score = 0;
var sequence = [];
var playerSequence = [];
var playerTurn = false;
var strictMode = "off";
var onOffStatus = "off";
var defaultSpeed = 300; // in MS
var speed = 2;          // multiplier
var gameDelay = 1000;    // delay between sequence
var tempScore = 0;

oCanvas.domReady(function() {
	var canvas = oCanvas.create({
		canvas: "#canvas",
		background: "#000"
	});

	// Draw Casing
	var casing = canvas.display.arc({
		x: 260,
		y: 260,
		radius: 260,
		start: 0,
		end: 360,
		fill: "#linear-gradient(45deg, #0e0e0e 0%, #7d7e7d 100%);"
	});

	canvas.addChild(casing);

	/*
	  =================================================================================
	 */

	/**
	 * Draw Green Button
	 */
	var green = canvas.display.arc({
		x: 240,
		y: 240,
		radius: 140,
		start: 180,
		end: 270,
		stroke: "140px #53D06A"
	});

	canvas.addChild(green);

	/**
	 * Detect Green Button click
	 */
	green.bind("click tap", function() {
		if (onOffStatus == "on") {
			guess = greenPush();
			getUserInput(guess);
		}
	});

	function greenPush() {
		green.stroke = "137px #aaffaa";
		var v = document.getElementsByTagName("audio")[0];
		v.play();
		console.log("green");
		canvas.redraw();
		setTimeout(function() {
			green.stroke = "140px #53D06A";
			canvas.redraw();
		}, defaultSpeed * speed);
		return 1;
	}

	/**
	 * Draw Red Button
	 */
	var red = canvas.display.arc({
		x: 280,
		y: 240,
		radius: 140,
		start: 270,
		end: 0,
		stroke: "140px #DA392F"
	});

	canvas.addChild(red);

	/**
	 * Detect Red Button click
	 */
	red.bind("click tap", function() {
		if (onOffStatus == "on") {
			guess = redPush();
			getUserInput(guess);
		}
	});

	function redPush() {
		red.stroke = "137px #ffaaaa";
		var v = document.getElementsByTagName("audio")[3];
		v.play();
		console.log("red");
		canvas.redraw();
		setTimeout(function() {
			red.stroke = "140px #DA392F";
			canvas.redraw();
		}, defaultSpeed * speed);
		return 2;
	}

	/**
	 * Draw Blue Button
	 */
	var blue = canvas.display.arc({
		x: 280,
		y: 280,
		radius: 140,
		start: 0,
		end: 90,
		stroke: "140px #005B98"
	});

	canvas.addChild(blue);

	/**
	 * Detect Blue Button click
	 */
	blue.bind("click tap", function() {
		if (onOffStatus == "on") {
			guess = bluePush();
			getUserInput(guess);
		}
	});

	function bluePush() {
		blue.stroke = "137px #aaaaff";
		var v = document.getElementsByTagName("audio")[2];
		v.play();
		console.log("blue");
		canvas.redraw();
		setTimeout(function() {
			blue.stroke = "140px #005B98";
			canvas.redraw();
		}, defaultSpeed * speed);
		return 3;
	}

	/**
	 * Draw Yellow Button
	 */
	var yellow = canvas.display.arc({
		x: 240,
		y: 280,
		radius: 140,
		start: 90,
		end: 180,
		stroke: "140px #FFF340"
	});

	canvas.addChild(yellow);

	/**
	 * Detect Yellow Button click
	 */
	yellow.bind("click tap", function() {
		if (onOffStatus == "on") {
			guess = yellowPush();
			getUserInput(guess);
		}
	});

	function yellowPush() {
		yellow.stroke = "137px #ffffaa";
		var v = document.getElementsByTagName("audio")[1];
		v.play();
		console.log("yellow");
		canvas.redraw();
		setTimeout(function() {
			yellow.stroke = "140px #FFF340";
			canvas.redraw();
		}, defaultSpeed * speed);
		return 4;
	}

	/*
	  =================================================================================
	 */

	/**
	 * Draw Inner Gray Disc
	 */
	var innerBlack = canvas.display.arc({
		x: 260,
		y: 260,
		radius: 130,
		start: 0,
		end: 360,
		fill: "linear-gradient(45deg, #303030 23%, #555555 50%);"
	});

	canvas.addChild(innerBlack);

	/**
	 * Draw Inner Center Disc
	 */
	var innerDisc = canvas.display.arc({
		x: 260,
		y: 260,
		radius: 100,
		start: 0,
		end: 360,
		fill: "radial-gradient(center, center, #b5bdc8 0%, #d0d8e5 22%, #828c95 47%, #bac0c6 71%, #28343b 100%);"
	});

	canvas.addChild(innerDisc);

	/**
	 * Bottom panel semicircle
	 */
	var semiDisc = canvas.display.arc({
		x: 260,
		y: 262,
		radius: 100,
		start: 25,
		end: 155,
		fill: "linear-gradient(45deg, #333333 0%, #000000 100%);"
	});

	canvas.addChild(semiDisc);
	
	// Score value text
	var scoreValueText = canvas.display.text({
		x: 260,
		y: 328,
		origin: {
			x: "center",
			y: "middle"
		},
		font: "30px Orbitron",
		text: "00",	
		fill: "#33f"
	});
		
	canvas.addChild(scoreValueText);
	canvas.redraw();

	// Write the score value
	updateScore(score);
	
	/**
	 * On/Off Label
	 */
	var onOffText = canvas.display.text({
		x: 190,
		y: 280,
		origin: {
			x: "center",
			y: "middle"
		},
		font: "12px Orbitron",
		text: "On/Off",
		fill: "#000"
	});

	canvas.addChild(onOffText);

	/**
	 * Reset Button
	 */
	var onOffOuter = canvas.display.arc({
		x: 190,
		y: 260,
		radius: 19,
		start: 0,
		end: 360,
		fill: "#000"
	});

	canvas.addChild(onOffOuter);

	var onOffButton = canvas.display.arc({
		x: 190,
		y: 258,
		radius: 15,
		start: 0,
		end: 360,
		fill: "radial-gradient(center, center, #a90329 0%, #8f0222 32%, #8f0222 32%, #6d0019 100%);"
	});

	canvas.addChild(onOffButton);

	/**
	 * Detect On or Off Click
	 */
	onOffButton.bind("click tap", function() {
		//updateScore(score);
		this.radius = 15;
		this.fill = "#radial-gradient(center, center, #e07272 0%, #ce2b2b 57%, #6d0019 100%)";
		onOffStatus = onOffStatus === "on" ? "off" : "on";
		this.fill = onOffStatus === "on" ? "#radial-gradient(center, center, #e07272 10%, #ce2b2b 90%, #e07272 100%)" : "#radial-gradient(center, center, #a90329 0%, #8f0222 32%, #8f0222 32%, #6d0019 100%)";
		scoreText.fill = onOffStatus === "on" ? "#888" : "#333";
		scoreValueText.fill = onOffStatus === "on" ? "#f22" : "#333";
		updateScore(score);
		canvas.redraw();
		resetGame();
	});

	/**
	 * Strict Mode Label
	 */
	var strictText = canvas.display.text({
		x: 260,
		y: 280,
		origin: {
			x: "center",
			y: "middle"
		},
		font: "12px Orbitron",
		text: "Strict",
		fill: "#000"
	});

	canvas.addChild(strictText);

	/**
	 * Strict Mode Outer Layout
	 */
	var strictModeButton = canvas.display.rectangle({
		x: 220,
		y: 244,
		width: 80,
		height: 34,
		fill: "#333"
	});

	canvas.addChild(strictModeButton);

	var strictModeInnerButton = canvas.display.rectangle({
		x: 221,
		y: 244,
		width: 78,
		height: 30,
		fill: "#000"
	});

	canvas.addChild(strictModeInnerButton);

	var modeButton = canvas.display.rectangle({
		x: 222,
		y: 247,
		width: 38,
		height: 26,
		fill: "linear-gradient(top, #b4e391 0%, #61c419 36%, #b4e391 100%)"
	});

	canvas.addChild(modeButton);

	/**
	 * Strict Button click
	 */
	modeButton.bind("click tap", function() {

		// prevent button from working unless turned on.
		if (onOffStatus == "on") {
			// Stop any previous running animation
			this.stop();
			console.log("Strict Toggle");

			// Slide the button right or left and change colour
			this.animate({
				x: this.currentPosition === "left" ? 222 : 261
			}, {
				easing: "ease-in-out-cubic"
			});

			// Change the button colour on each click
			this.fill = this.currentPosition === "left" ? "#linear-gradient(top, #b4e391 0%, #61c419 36%, #b4e391 100%)" : "#linear-gradient(top, #ffa3a3 0%, #c41919 36%, #e08f8f 100%)";
			// Toggle the position for the next click
			this.currentPosition = this.currentPosition === "left" ? "right" : "left";
			strictMode = this.currentPosition === "left" ? "on" : "off";
			console.log("Strict Mode: ", strictMode);
			canvas.redraw();
		}
	});

	/**
	 * Reset Label
	 */
	var resetText = canvas.display.text({
		x: 330,
		y: 280,
		origin: {
			x: "center",
			y: "middle"
		},
		font: "12px Orbitron",
		text: "Reset",
		fill: "#000"
	});

	canvas.addChild(resetText);

	/**
	 * Reset Button
	 */
	var resetButtonOuter = canvas.display.arc({
		x: 330,
		y: 260,
		radius: 19,
		start: 0,
		end: 360,
		fill: "#000"
	});

	canvas.addChild(resetButtonOuter);

	var resetButton = canvas.display.arc({
		x: 330,
		y: 258,
		radius: 15,
		start: 0,
		end: 360,
		fill: "#radial-gradient(center, center, #f2825b 0%, #e55b2b 50%, #f07146 100%)"
	});

	canvas.addChild(resetButton);

	/**
	 * Detect Reset Click
	 */

	resetButton.bind("click tap", function() {

		if (onOffStatus == "on") {
			this.radius = 15;
			this.fill = "#radial-gradient(center, center, #fac695 0%, #f5ab66 47%, #ef8d31 100%)";
			canvas.redraw();

			setTimeout(function() {
				resetButton.fill = "#radial-gradient(center, center, #f2825b 0%, #e55b2b 50%, #f07146 100%)";
				canvas.redraw();
			}, 300);

			// Do some reset stuff
			resetGame();
		}

	});

	/*
	  =================================================================================
	 */

	// Simon Name display
	var simonText = canvas.display.text({
		x: 260,
		y: 190,
		origin: {
			x: "center",
			y: "middle"
		},
		font: "46px Orbitron",
		text: "simon",
		fill: "#222"
	});

	canvas.addChild(simonText);

	// Score Label
	var scoreText = canvas.display.text({
		x: 260,
		y: 305,
		origin: {
			x: "center",
			y: "middle"
		},
		font: "24px Orbitron",
		text: "Score",
		fill: "#333"
	});

	canvas.addChild(scoreText);
	
	function updateScore(tempScore) {
		// Score value
		// convert to 2 digit string
		if (tempScore < 10) {
			tempScore = "0" + tempScore;
		} else {
			tempScore = tempScore;
		}
		scoreValueText.text = tempScore;
	}
	/*
	  =================================================================================
	 */

	/**
	 * Run Game
	 */
	function gameStart() {
		if (onOffStatus === "on") {
			do {

				// generate a random number between 1 and 4
				rand = Math.floor((Math.random() * 4) + 1);

				// Save the random number to the sequence array
				sequence.push(rand);
				console.log(sequence);

				switch (rand) {
					case 1: // Green
						greenPush();
						//green.unbind();
						getUserInput();
						playerTurn = false;
						break;
					case 2: // Red
						redPush();
						//red.unbind();
						getUserInput();
						playerTurn = false;
						break;
					case 3: // Blue
						bluePush();
						//blue.unbind();
						getUserInput();
						playerTurn = false;
						break;
					case 4: // Yellow
						yellowPush();
						//yellow.unbind();
						getUserInput();
						playerTurn = false;
						break;
				}
				
			} while (sequence.length < 20 && playerTurn);

		} else {
			console.log("Simon is powered off");
		}

	}

	function getUserInput(guess) {

		var check = 0;
		if (guess != null ) {
		
			do {
					if (guess == sequence[check]) {
						console.log("you got it!");
						score++;
						updateScore(score);
						setTimeout(function() {
							getNew();
							playSequence();
						}, gameDelay);
					} 
					else if (strictMode === "on") 
					{
						console.log("You lose!");
					} 
					else 
					{
						playSequence();
					}
				check++;;
			} while (check < sequence.length);
		}
	}

	
	function playSequence() {
		
		for (var x = 0; x < sequence.length; x++) {
			console.log(sequence.length);
			console.log(sequence);
			switch (sequence[x]) {
					case 1: // Green
						setTimeout(function() {
							console.log("replay green ...");
							greenPush();
						}, 2000);
						break;
					case 2: // Red
						setTimeout(function() {
							console.log("replay red ...");
							redPush();
						}, 2000);
						break;
					case 3: // Blue
						setTimeout(function() {
							console.log("replay blue ...");
							bluePush();
						}, 2000);
						break;
					case 4: // Yellow
						setTimeout(function() {
							console.log("replay yellow ...");
							yellowPush();		
						}, 2000);
						break;
				}
		}
	}
	
	function getNew() {
		// generate a random number between 1 and 4
		rand = Math.floor((Math.random() * 4) + 1);
		// Save the random number to the sequence array
		sequence.push(rand);
		console.log(sequence);
	}
	
	function resetGame() {

		sequence = [];
		score = 0;
		scoreValueText.text = "00";
		gameStart();

	}

});