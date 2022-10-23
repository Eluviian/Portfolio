<!doctype html> 
<html lang="en"> 
<head>
	<title> Advanced Maze Game </title>
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
	<h1 style="text-align:center"> Maze Game </h1>
	<script type="text/javascript">
		
		var canvasWidth = 400;
		var canvasHeight = 400;
		var player;
		var startWall;
		var interval = 20;
		var mazeWalls = [];
		var goalFound = false;
		var timeFocused = 0;   //in milliseconds
		var timeUnfocused = 0;  //in milliseconds
		var timesSwitchedAway = 0;
		var switchedAway = false;
	
		//updates every 20 frames
		var interval = setInterval(updateCanvas,interval);
		
		
		function endGame(){
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
		
		function sendTo1() {
			var game = 0;
			
			<cfquery datasource="exmind">
				update dbo.sf
				set completed_fields = 0
				where subject_id = #subject_id#
			</cfquery>
			<cfoutput>
			location.href='pre_sftask.cfm?subject_id=#subject_id#';
			//'premaze.cfm?subject_id=#subject_id#&times_switched_away='+timesSwitchedAway+'&total_time_unfocused='+timeUnfocused+''
			</cfoutput>
			}
			
			
		function startGame() {
			gameCanvas.start();
			player = new createPlayer(16,20,0,5,100);  //base,height,angle,coords of base-height intersection
			goalSpace = new createGoalSpace(264,395,66,6);
			
			//impassable wall to prevent player from going off screen
			startWall = new createImpassableMazeWall(0,67,6,65);
			
			//create maze walls
			mazeWalls.push(new createMazeWall(0,0,400,6));
			mazeWalls.push(new createMazeWall(0,0,6,66));
			mazeWalls.push(new createMazeWall(0,66,66,6));
			mazeWalls.push(new createMazeWall(394,0,6,400));
			mazeWalls.push(new createMazeWall(330,394,66,6));
			mazeWalls.push(new createMazeWall(0,394,264,6));
			mazeWalls.push(new createMazeWall(198,0,6,198));
			mazeWalls.push(new createMazeWall(0,132,6,264));
			mazeWalls.push(new createMazeWall(0,132,132,6));
			mazeWalls.push(new createMazeWall(132,72,6,66));
			mazeWalls.push(new createMazeWall(0,330,66,6));
			mazeWalls.push(new createMazeWall(66,204,6,132));
			mazeWalls.push(new createMazeWall(198,264,6,132));
			mazeWalls.push(new createMazeWall(132,330,66,6));
			mazeWalls.push(new createMazeWall(138,198,66,6));
			mazeWalls.push(new createMazeWall(132,198,6,66));
			mazeWalls.push(new createMazeWall(264,66,66,6));
			mazeWalls.push(new createMazeWall(198,132,66,6));
			mazeWalls.push(new createMazeWall(264,198,66,6));
			mazeWalls.push(new createMazeWall(198,264,132,6));
			mazeWalls.push(new createMazeWall(330,66,6,204));
			mazeWalls.push(new createMazeWall(264,330,132,6));
			
			
			}
			
		function createGoalSpace(x,y,width,height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			 
			this.x1 = this.x;
			this.y1 = this.y;
			
			this.x2 = this.x + this.width;
			this.y2 = this.y;
			
			this.x3 = this.x;
			this.y3 = this.y + this.height;
			
			this.x4 = this.x + this.width;
			this.y4 = this.y + this.height;
			/*
			//for testing purposes
			this.draw = function() {
				ctx = gameCanvas.context;
				ctx.fillStyle = "green";
				ctx.fillRect(this.x,this.y,this.width,this.height);
				}	*/
			}  
		
		
		function createRectangle(x,y,width,height) {	//this function for testing purposes
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
			this.x1 = bhCentreX;
			this.y1 = bhCentreY - (this.base/2);
			//triangle bottom right
			this.x2 = bhCentreX;
			this.y2 = bhCentreY + (this.base/2);
			//traingle top tip
			this.x3 = bhCentreX + this.height;
			this.y3 = bhCentreY;
			//divet
			this.x4 = bhCentreX + (this.height/4);
			this.y4 = bhCentreY;
			
			//hitbox points to detect collisions
			this.hitXList = [];
			this.hitYList = [];
			
			this.hitXList.push(this.x3-1);
			this.hitYList.push(this.y3-1);
			
			for (var i = 1; i<5; i++) {
				this.hitXList.push(this.x3 - (i*(this.height/8)));
				this.hitYList.push(this.y3 - (i*(this.base/20)));
				}
				
			for (var i = 4; i>0; i--) {
				this.hitXList.push(this.x3 - (i*(this.height/8)));
				this.hitYList.push(this.y3 + (i*(this.base/20)));
				}
			
			this.draw = function(){
				ctx = gameCanvas.context;
				
				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.moveTo(this.x1, this.y1);
				ctx.lineTo(this.x4, this.y4);
				ctx.lineTo(this.x2, this.y2);
				ctx.lineTo(this.x3, this.y3);
				ctx.fill();	
				/*  
				//drawing hitbox for testing purposes
				ctx.strokeStyle = "orange";
				ctx.beginPath();

				ctx.moveTo(this.hitXList[0], this.hitYList[0]);
				for (var i = 1; i<this.hitXList.length; i++) {
					ctx.lineTo(this.hitXList[i], this.hitYList[i]);
					}
				ctx.stroke();*/				
				} 

			//centre needs to be calculated for rotating player icon	
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

				//move all hitbox points whenever player icon moves
				for (var i = 0; i<this.hitXList.length; i++) {
					this.hitXList[i] = this.hitXList[i] + Math.cos(angle) * distance;
					this.hitYList[i] = this.hitYList[i] + Math.sin(angle) * distance;

					}
				
				}
				
			this.setPoints = function(x1,y1,x2,y2,x3,y3,x4,y4,hitboxPointsX,hitboxPointsY) { //used afterplayer icon rotates
				this.x1 = x1;
				this.y1 = y1;
				this.x2 = x2;
				this.y2 = y2;
				this.x3 = x3;
				this.y3 = y3;
				this.x4 = x4;
				this.y4 = y4;

				for (var i = 0; i<this.hitXList.length; i++) {
					this.hitXList[i] = hitboxPointsX[i];
					this.hitYList[i] = hitboxPointsY[i];
					}
				}
				
			this.setAngleFacing = function(newAngle) {
				this.angleFacing = newAngle;
				}
			}
			
			
		function createMazeWall(x, y, width, height){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			
			this.x1 = this.x;
			this.y1 = this.y;
			
			this.x2 = this.x + this.width;
			this.y2 = this.y;
			
			this.x3 = this.x;
			this.y3 = this.y + this.height;
			
			this.x4 = this.x + this.width;
			this.y4 = this.y + this.height;
			
			this.draw = function(){
				ctx = gameCanvas.context;
				ctx.fillStyle = "black";
				ctx.fillRect(this.x, this.y, this.width, this.height);
				}
			}

		//this is for beginning, so that player cannot go off screen
		function createImpassableMazeWall(x, y, width, height){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			
			this.x1 = this.x;
			this.y1 = this.y;
			
			this.x2 = this.x + this.width;
			this.y2 = this.y;
			
			this.x3 = this.x;
			this.y3 = this.y + this.height;
			
			this.x4 = this.x + this.width;
			this.y4 = this.y + this.height;
			
			this.draw = function(){   //this function for testing purposes
				ctx = gameCanvas.context;
				ctx.fillStyle = "red";
				ctx.fillRect(this.x, this.y, this.width, this.height);
				}
			}
			
		
		function detectCollision(t,r) {
			intersection = false
			
			for (var i = 0; i<t.hitXList.length; i++) {
				if (t.hitXList[i] >= r.x1 && t.hitXList[i] <= r.x4 && t.hitYList[i] >= r.y1 && t.hitYList[i] <= r.y4) {
					intersection = true;
					}
				}
				
			return intersection
			
			}

		
		document.onkeydown = function (event) {
			switch (event.keyCode) {
				case 74:
					//J - turn counter clockwise
					rotatePlayer(360-35);
					break;
				
				case 76:
					//L - turn clockwise
					rotatePlayer(35);
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
			
			hitboxPointsX = [];
			hitboxPointsY = [];
			for (var i = 0; i<player.hitXList.length; i++) {
				hitboxPointsX.push(rotateX(cx,cy,angleChange,player.hitXList[i],player.hitYList[i]));
				hitboxPointsY.push(rotateY(cx,cy,angleChange,player.hitXList[i],player.hitYList[i]));
				}
			
			player.setPoints(x1,y1,x2,y2,x3,y3,x4,y4,hitboxPointsX,hitboxPointsY);
			newAngle = player.angleFacing+angleChange;
			player.setAngleFacing(newAngle);
		
			}
		
		
		function rotateX(cx,cy,angle,px,py) {  //rotate x coord of point(p) around centre (c)
			angle = angle*(Math.PI/180);
			x = Math.cos(angle)*(px-cx) - Math.sin(angle)*(py-cy) + cx
			return x
			}
			
		function rotateY(cx,cy,angle,px,py) {  //rotate y coord of point (p) around centre (c)
			angle = angle*(Math.PI/180)
			y = Math.sin(angle)*(px-cx) + Math.cos(angle)*(py-cy) + cy
			return y
			}
			
		function updateCanvas(){
			ctx = gameCanvas.context;
			ctx.clearRect(0,0,canvasWidth,canvasHeight);
			var mazeWallsLength = mazeWalls.length;
			var collision = false;
		
			if (detectCollision(player,goalSpace)){
				goalFound = true;
				endGame();
				clearInterval(interval);
				
				}
				
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
							
			player.draw();
			
			if (goalFound == false){
				collision = false;
				for (var i = 0; i < mazeWallsLength; i++) {
					if (detectCollision(player,mazeWalls[i])){
						collision = true;
						}
					}
					
				//invisible wall at start should also result in collision
				if (detectCollision(player,startWall)) {
					collision = true;
					}
							
				if (collision == false){
					player.move();
					}
				}
				
				for (var i = 0; i< mazeWallsLength; i++) {
					mazeWalls[i].draw();
					}
				
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
