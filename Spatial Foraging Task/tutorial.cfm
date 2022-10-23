<!doctype html> 
<html lang="en"> 
<head>
	<title> Tutorial </title>
	<style>
		canvas {
			border:2px solid white;
			background-colour: #87ceeb;
		display: block;
		margin: auto;
		width: 600px;
			}
	</style>
	<script type="math.js" type="text/javascript"></script>

</head>
<body>
	<div id="canvas"></div>
	<body onload = "startGame()">
	<h1 style="text-align:center"> Tutorial </h1>
	<p id="instructions"> Instructions </p>
	<script type="text/javascript">
		
		var canvasWidth = 400;
		var canvasHeight = 400;
		var player;
		var text;
		var pause = false;
		var keyPressAllowed = true;
		
		var interval = 20;
		var timeFocused = 0;   //in milliseconds
		var timeUnfocused = 0;  //in milliseconds
		var timesSwitchedAway = 0;
		var switchedAway = false;
		var tutorialStep = 0;
	
		//updates every 20 frames
		var interval = setInterval(updateCanvas,interval);


		function endGame() {
			
			var button = document.createElement('button');
			button.textContent = "Continue";
			button.style = "height: 50px; width: 110px;";
			
			//centers button horizontally
			button.style.position = "absolute";
			button.style.left = "50%";
			button.style.transform = "translateX(-50%)";
			
			button.onclick = sendTo1;
			document.body.appendChild(button);
			
			}
			
		function sendTo1(){
			<cfoutput>
			location.href='premaze.cfm?subject_id=#subject_id#';
			</cfoutput>
		}
		
		function startGame() {
			gameCanvas.start();
			player = new createPlayer(16,20,0,200,200);  //base,height,angle,coords of base-height intersection
			document.getElementById("instructions").style.textAlign = "center";
			document.getElementById("instructions").style.fontSize = "18px";
			}
			
		
		
		function createRectangle(x,y,width,height) {   //for testing purposes	
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		
			this.draw = function() {
				ctx = gameCanvas.context;
				ctx.fillStyle = "purple";
				ctx.fillRect(this.x,this.y,this.width,this.height);
				}	
			}  
			
		
		
		function createPlayer(base,height,angleFacing,bhCentreX,bhCentreY) {
			this.base = base;
			this.height = height;
			this.angleFacing = angleFacing;
			this.bhCentreX = bhCentreX;
			this.bhCentreY = bhCentreY;

			
			//triangle bottom left
			this.x1 = bhCentreX - (this.base/2);
			this.y1 = bhCentreY;
			//triangle bottom right
			this.x2 = bhCentreX + (this.base/2);
			this.y2 = bhCentreY;
			//traingle top tip
			this.x3 = bhCentreX;
			this.y3 = bhCentreY - this.height;
			//divet
			this.x4 = bhCentreX;
			this.y4 = bhCentreY - (this.height/4);
			
			
			this.draw = function(){
				ctx = gameCanvas.context;
				
				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.moveTo(this.x1, this.y1);
				ctx.lineTo(this.x4, this.y4);
				ctx.lineTo(this.x2, this.y2);
				ctx.lineTo(this.x3, this.y3);
				ctx.fill();	
			
				} 

				
			this.calculateCentreX = function() {
				return (this.x1+this.x2+this.x3)/3 
				}
				
			this.calculateCentreY = function() {
				return (this.y1+this.y2+this.y3)/3 
				}
					
			this.move = function() {
				ctx = gameCanvas.context;
				angle = this.angleFacing*(Math.PI/180);
				distance = 1;
				this.x1 = this.x1 + Math.cos(angle) * distance;
				this.y1 = this.y1 + Math.sin(angle) * distance;
				this.x2 = this.x2 + Math.cos(angle) * distance;
				this.y2 = this.y2 + Math.sin(angle) * distance;
				this.x3 = this.x3 + Math.cos(angle) * distance;
				this.y3 = this.y3 + Math.sin(angle) * distance;
				this.x4 = this.x4 + Math.cos(angle) * distance;
				this.y4 = this.y4 + Math.sin(angle) * distance;

				
				}
				
			this.setPoints = function(x1,y1,x2,y2,x3,y3,x4,y4) {
				this.x1 = x1;
				this.y1 = y1;
				this.x2 = x2;
				this.y2 = y2;
				this.x3 = x3;
				this.y3 = y3;
				this.x4 = x4;
				this.y4 = y4;

				}
				
			this.setAngleFacing = function(newAngle) {
				this.angleFacing = newAngle;
				}
			}
			
			


		
		
		document.onkeydown = function (event) {
			switch (event.keyCode) {
				case 74:
				
					//J - turn counter clockwise
					if (keyPressAllowed) {
						
						if (tutorialStep == 1) {
							keyPressAllowed = false;
							rotatePlayer(360-35);
							setTimeout(function(){   //setTimeout slighty delays the instructions updating
							tutorialStep += 1;
							keyPressAllowed = true;
							//rotatePlayer(35*2);    //rotating player back to facing up in this way is clunky
							},500);
							
							

							
							}
						if (tutorialStep == 0) {
							keyPressAllowed = false;
							rotatePlayer(360-35);
							setTimeout(function(){
							tutorialStep += 1;
							keyPressAllowed = true;
							},500);
							
							}
					
					}
					break;
				
				case 76:
					//L - turn clockwise
					if (keyPressAllowed) {
						
						if (tutorialStep == 2 || tutorialStep == 3) {
							
							keyPressAllowed = false;
							rotatePlayer(35);					
							setTimeout(function(){
							tutorialStep += 1;
							keyPressAllowed = true;
							},500);
							if (tutorialStep == 3){
								
								
								//p = document.getElementById("instructions").innerHTML;
								//p.remove();
								/*
								instructions = document.getElementById("instructions");
								document.removeChild(instructions);*/
							}
							
							
							}
						/*
						if (tutorialStep > 3) {    //probably not necessary to allow player to turn after tutorial completes
							rotatePlayer(35);
							
						}*/
					}	
					break;
					
				default:
					break;
			}
		};
		
		function rotatePlayer(angleChange){

			cx = player.calculateCentreX();
			cy = player.calculateCentreY();
			
			x1 = rotateX(cx,cy,angleChange,player.x1,player.y1);
			x2 = rotateX(cx,cy,angleChange,player.x2,player.y2);
			x3 = rotateX(cx,cy,angleChange,player.x3,player.y3);
			x4 = rotateX(cx,cy,angleChange,player.x4,player.y4);
			y1 = rotateY(cx,cy,angleChange,player.x1,player.y1);
			y2 = rotateY(cx,cy,angleChange,player.x2,player.y2);
			y3 = rotateY(cx,cy,angleChange,player.x3,player.y3);
			y4 = rotateY(cx,cy,angleChange,player.x4,player.y4);
			
			player.setPoints(x1,y1,x2,y2,x3,y3,x4,y4);
			newAngle = player.angleFacing+angleChange;
			player.setAngleFacing(newAngle);
		
			}
		
		
		function rotateX(cx,cy,angle,px,py) {
			angle = angle*(Math.PI/180);
			x = Math.cos(angle)*(px-cx) - Math.sin(angle)*(py-cy) + cx
			return x
			}
			
		function rotateY(cx,cy,angle,px,py) {
			angle = angle*(Math.PI/180)
			y = Math.sin(angle)*(px-cx) + Math.cos(angle)*(py-cy) + cy
			return y
			}
			
		function updateCanvas(){
			ctx = gameCanvas.context;
			ctx.clearRect(0,0,canvasWidth,canvasHeight);		
			ctx.font = "20px Arial";
			ctx.fillStyle = "black"
				
			if (document.hasFocus()) {
				timeFocused += 20;
				switchedAway = false;
				} else {  //if not hasFocus
				timeUnfocused += 20;
				if (switchedAway == false){
					timesSwitchedAway += 1;
					switchedAway = true;
					}
				}
			
			if (tutorialStep > 3){
				//resp = '8';
				endGame()
				clearInterval(interval);
				}
			
			switch (tutorialStep) {
				case 0:
					/*
					text = "Press J once to make a left turn";
					ctx.fillText(text,70,70);
					text = "of the icon below";
					ctx.fillText(text,70,100);*/
					text = "Press J once to make a left turn of the icon above";
					document.getElementById("instructions").innerHTML = text;
					break;
					
				case 1:
					/*
					text = "Now press J again to make another";
					ctx.fillText(text,70,70);
					text = "left turn of the icon below";
					ctx.fillText(text,70,100);*/
					text = "Now press J again to make another left turn of the icon above";
					document.getElementById("instructions").innerHTML = text;
					break;
				
				case 2:
					/*
					text = "Press L once to make a right turn";
					ctx.fillText(text,70,70);
					text = "of the icon below";
					ctx.fillText(text,70,100);*/
					text = "Press L once to make a right turn of the icon above";
					document.getElementById("instructions").innerHTML = text;
					break;
					
				case 3:
					/*
					text = "Now press L again to make another";
					ctx.fillText(text,70,70);
					text = "right turn of the icon below";
					ctx.fillText(text,70,100);*/
					text = "Now press L again to make another right turn of the icon above";
					document.getElementById("instructions").innerHTML = text;
					break;
					
				case 4:  //tutorial over, remove instructions
					text = " ";
					document.getElementById("instructions").innerHTML = text;
					break;
					
				default:
					break;
				}
				
				player.draw();
			}
					
		var gameCanvas = {
			canvas: document.createElement("canvas"),
			start: function(){
				this.canvas.width = canvasWidth;
				this.canvas.height = canvasHeight;
				this.context = this.canvas.getContext("2d");
				document.body.insertBefore(this.canvas,document.body.childNodes[0]);
				}
			}
			
		
		
	</script>
	
</body>


<cfquery datasource="exmind">
update dbo.sf
set device=#device#
where subject_id = #subject_id#
</cfquery>