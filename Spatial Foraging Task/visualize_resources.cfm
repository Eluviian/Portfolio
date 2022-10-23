<!doctype html> 
<html lang="en"> 
<head>
	<title> Visualize Resource Data </title>
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
	<h1 style="text-align:center"> Visualize Resource Data </h1>
	<p id="demo"></p>
	<script type="text/javascript">
		var canvasWidthNoScoreText = 404;
		var canvasWidthWithScoreText = 410;
		var canvasHeight = 444;

		var pixelSize = 2;    //doubling size of everything
		var gridCellSize = 3;  //number of "pixels" per grid cell
		var resources = [];
		
		var lineWidth = 2; //for borders
		var xoffset = lineWidth;
		var yoffset = 42  //to account for space for clock
		
		var resourcesGatheredX = []
		var resourcesGatheredY = []
		
		var resourcesNotGatheredX = []
		var resourcesNotGatheredY = []
		

		
	
		//updates every 20 frames
		var interval = setInterval(updateCanvas,20);
		
		function startGame() {
			gameCanvas.start();
					
			var xmin = 4;
			var xmax = 392;
			var ymin = 46;
			var ymax = 432;
			
			var size = 2;

			
			resourcesGatheredString = document.getElementById("resources_gathered").value;
			resourcesNotGatheredString = document.getElementById("resources_not_gathered").value;
			//alert(resourcesNotGatheredString);
			numberResourcesString = document.getElementById("number_resources_gathered").value;
			
			
			
			//makeResourceArrays(resourcesGatheredString, resourcesGatheredX, resourcesGatheredY, true, "black");
			//makeResourceArrays(resourcesNotGatheredString, resourcesNotGatheredX, resourcesNotGatheredY, false, "red");
			
			var field = parseInt(document.getElementById("field_number").value);
			//go through string and create all resources with coords, size=pixelSize, visibility=true

			
			
			
			
			
			
			//for resources not gathered
			var field_index = 1;
			for (j=0; j<resourcesNotGatheredString.length; j++) {
				if (resourcesNotGatheredString[j] == '#') {
					field_index += 1;
				}
				if (resourcesNotGatheredString[j] == '|' && field_index == field) {
					j += 1;
				}
				if (resourcesNotGatheredString[j] == 'x' && field_index == field) {
					x_string = ""
					j += 1;
					while (resourcesNotGatheredString[j] != 'y' && field_index == field) {
						x_string = x_string + resourcesNotGatheredString[j];
						j += 1;
					}
					resourcesNotGatheredX.push(parseInt(x_string));
				}
				if (resourcesNotGatheredString[j] == 'y' && field_index == field) {
					y_string = "";
					j +=1;
					while (resourcesNotGatheredString[j] != '|' && field_index == field) {
						//alert(y_string.length);
						//alert(resourcesNotGatheredString.length);
						y_string = y_string + resourcesNotGatheredString[j];
						j+=1;
					}
					resourcesNotGatheredY.push(parseInt(y_string));
				}
					
			}
			
			for (i=0; i<resourcesNotGatheredX.length; i++) {
				resource = new createResource(resourcesNotGatheredX[i],resourcesNotGatheredY[i],pixelSize,true,"red");
				resources.push(resource);
				
			}
			
			
			//for resources gathered
			field_index = 1;
			for (j=0; j<resourcesGatheredString.length; j++) {
				if (resourcesGatheredString[j] == '#') {
					field_index += 1;
				}
				if (resourcesGatheredString[j] == '|' && field_index == field) {
					j += 1;
				}
				if (resourcesGatheredString[j] == 'x' && field_index == field) {
					x_string = ""
					j += 1;
					while (resourcesGatheredString[j] != 'y' && field_index == field) {
						x_string = x_string + resourcesGatheredString[j];
						j += 1;
					}
					resourcesGatheredX.push(parseInt(x_string));
				}
				if (resourcesGatheredString[j] == 'y' && field_index == field) {
					y_string = "";
					j +=1;
					while (resourcesGatheredString[j] != '|' && field_index == field) {
						y_string = y_string + resourcesGatheredString[j];
						j+=1;
					}
					resourcesGatheredY.push(parseInt(y_string));
				}
					
			}
			//add to resources
			for (i=0; i<resourcesGatheredX.length; i++) {
				resource = new createResource(resourcesGatheredX[i],resourcesGatheredY[i],pixelSize,true,"black");
				resources.push(resource);
				
			}
			
			

		
					
		}
		
		/*
		function makeResourceArrays(resourcesString, resourcesArrayX, resourcesArrayY, visibility, colour) {
			
			var field = parseInt(document.getElementById("field_number").value);
			//go through string and create all resources with coords, size=pixelSize, visibility=true
			var field_index = 1;
			
			for (j=0; j<resourcesString.length; j++) {
				if (resourcesString[j] == '#') {
					field_index += 1;
				}
				if (resourcesString[j] == '|' && field_index == field) {
					j += 1;
				}
				if (resourcesString[j] == 'x' && field_index == field) {
					x_string = ""
					j += 1;
					while (resourcesString[j] != 'y' && field_index == field) {
						x_string = x_string + resourcesString[j];
						j += 1;
					}
					resourcesArrayX.push(parseInt(x_string));
				}
				if (resourcesString[j] == 'y' && field_index == field) {
					y_string = "";
					j +=1;
					while (resourcesString[j] != '|' && field_index == field) {
						y_string = y_string + resourcesString[j];
						j+=1;
					}
					resourcesArrayY.push(parseInt(y_string));
				}
					
			}
			
			for (i=0; i<resourcesArrayX.length; i++) {
				resource = new createResource(resourcesArrayX[i],resourcesArrayY[i],pixelSize,visibility,colour);
				resources.push(resource);
				
			}
			
		}*/

			
		function createResource(x,y,size,visibility,colour) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.visibility = visibility;
			this.colour = colour;
			
			//wrap around screen
			xmin = lineWidth;
			ymin = yoffset;
			xmax = canvasWidthNoScoreText-lineWidth;
			ymax = canvasHeight-lineWidth;
			xchange = 0;
			ychange = 0;
			if (this.x < xmin){
				xchange = xmax;
				}	
			if (this.x + this.size > xmax) {
				xchange = -xmax;
				}
			if (this.y < ymin){
				ychange = ymax-yoffset;
				}	
			if (this.y + this.size > ymax) {
				ychange = -(ymax-yoffset);
				}	
			this.x += xchange;
			this.y += ychange;
			
			//points for collision detection
			this.x1 = this.x;
			this.y1 = this.y;
			this.x2 = this.x;
			this.y2 = this.y + this.size;
			this.x3 = this.x + this.size;
			this.y3 = this.y;
			this.x4 = this.x + this.size;
			this.y4 = this.y + this.size;
			
			this.draw = function() {
				ctx = gameCanvas.context;
				ctx.fillStyle = this.colour;
				ctx.fillRect(this.x,this.y,this.size,this.size);
				}
				
			}
		
		

			
		
		
		//this function not used - for testing purposes
		function createRectangle(x,y,width,height,colour = "purple") {	
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.colour = colour;
			
			this.draw = function() {
				ctx = gameCanvas.context;
				ctx.fillStyle = colour;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				}	
			}  
			
				
		function updateCanvas(){
			ctx = gameCanvas.context;
			ctx.clearRect(0,0,canvasWidthWithScoreText,canvasHeight);
			
			var resourcesLength = resources.length;

			
			for (var i = 0; i < resourcesLength; i++) {
				//if (resources[i].visibility == true) {
				resources[i].draw();
					//}

				}
				
			
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(xoffset-1, yoffset);   //corner looks nicer if use x=1 instead of 2 here
			ctx.lineTo(canvasWidthNoScoreText-xoffset, yoffset);
			ctx.lineTo(canvasWidthNoScoreText-xoffset,canvasHeight-lineWidth);
			ctx.lineTo(xoffset, canvasHeight-lineWidth);
			ctx.lineTo(xoffset, yoffset);
			ctx.stroke();
			
			
					
			}
					
		var gameCanvas = {
			canvas: document.createElement("canvas"),
			start: function(){
				this.canvas.width = canvasWidthWithScoreText;
				this.canvas.height = canvasHeight;
				this.context = this.canvas.getContext("2d");
				document.body.insertBefore(this.canvas,document.body.childNodes[0]);
				}
			}
			
		
	
	</script>
	
</body>


<cfform action="spatialforaging.cfm" method="post" name="field_form" id="field_form"> 
<cfinput type="hidden" id="angle_changes" name="angle_changes" value=#angle_changes#>
<cfinput type="hidden" id="subject_id" name="subject_id" value=#subject_id#>
<cfinput type="hidden" id="completed_fields" name="completed_fields" value=#completed_fields#>
<cfinput type="hidden" id="resources_gathered" name="resources_gathered" value=#resources_gathered#>
<cfinput type="hidden" id="resources_not_gathered" name="resources_not_gathered" value=#resources_not_gathered#>
<cfinput type="hidden" id="grid_cells_visited" name="grid_cells_visited" value=#grid_cells_visited#>
<cfinput type="hidden" id="number_resources_gathered" name="number_resources_gathered" value=#number_resources_gathered#>

<cfinput type="hidden" id="field_number" name="field_number" value=#field_number#>

</cfform> 





