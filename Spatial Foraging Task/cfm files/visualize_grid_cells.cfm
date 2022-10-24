<!doctype html> 
<html lang="en"> 
<head>
	<title> Visualize Grid Cell Data </title>
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
	<h1 style="text-align:center"> Visualize Grid Cell Data </h1>
	<p id="demo"></p>
	<script type="text/javascript">
		var canvasWidthNoScoreText = 404;
		var canvasWidthWithScoreText = 410;
		var canvasHeight = 444;
		
		var pixelSize = 2;    //doubling size of everything
		var gridCellSize = 3;  //number of "pixels" per grid cell

		var grid = [];
		var visibleGrid = [];
		
		var lineWidth = 2; //for borders
		var xoffset = lineWidth;
		var yoffset = 42  //to account for space for clock
		

		
	
		//updates every 20 frames
		var interval = setInterval(updateCanvas,20);
		
		function startGame() {
			gameCanvas.start();
					
			var xmin = 4;
			var xmax = 392;
			var ymin = 46;
			var ymax = 432;
			
			var size = 2;
			

					
			canvasGridWidth = (canvasWidthNoScoreText-xoffset);
			canvasGridHeight = (canvasHeight-(2*lineWidth));
			for (var i = xoffset-1+lineWidth; i < canvasGridWidth-8; i+= (pixelSize*gridCellSize)) {
				for (var j = yoffset+lineWidth; j < canvasGridHeight; j+= (pixelSize*gridCellSize)) {
					cell = new createGridCell(i,j,(pixelSize*gridCellSize),false,"black");
					grid.push(cell);
					}
				}

			
			gridString = document.getElementById("grid_cells_visited").value;
			var field = parseInt(document.getElementById("field_number").value);

					
			gridArrayX = [];
			gridArrayY = [];
			
			var field_index = 1;
			//go through string and create all resources with coords, size=pixelSize, visibility=true
			for (j=0; j<gridString.length; j++) {
				if (gridString[j] == "#") {
					field_index += 1;
				}
				
				if (gridString[j] == 'x' && field_index == field) {
					x_string = ""
					j += 1;
					while (gridString[j] != 'y' && field_index == field) {
						x_string = x_string + gridString[j]
						j += 1;
					}
					gridArrayX.push(parseInt(x_string));
				}
				if (gridString[j] == 'y' && field_index == field) {
					y_string = "";
					j +=1;
					while (gridString[j] != '|' && field_index == field) {
						y_string = y_string + gridString[j]
						j+=1;
					}
					gridArrayY.push(parseInt(y_string));
				}
					
			}

			
			for (i=0; i<gridArrayX.length; i++) {
				cell = new createGridCell(gridArrayX[i],gridArrayY[i],pixelSize*gridCellSize,true,"black");
				visibleGrid.push(cell);
				
			}

		
					
		}


		
		function createGridCell(x,y,size,visited,colour) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.visited = visited;
			this.colour = colour;
			
			//points for collision detection
			this.x1 = this.x;
			this.y1 = this.y;
			this.x2 = this.x;
			this.y2 = this.y + this.size;
			this.x3 = this.x + this.size;
			this.y3 = this.y;
			this.x4 = this.x + this.size;
			this.y4 = this.y + this.size;
			
			//this function for visual testing only, grid should not be drawn for player
			this.draw = function() {
				ctx = gameCanvas.context;
				if (this.visited) {
					ctx.fillStyle = this.colour;
					ctx.fillRect(this.x,this.y,this.size,this.size);
					} 
					//else statement shows outline of grid cells which have not been visited
					/*
					else {
					ctx.strokeStyle = this.colour;
					ctx.strokeRect(this.x,this.y,this.size,this.size);
					}*/
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

			
			for (var i = 0; i < grid.length; i++) {
				grid[i].draw();

				}
			for (var i = 0; i< visibleGrid.length; i++) {
				visibleGrid[i].draw();
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
<cfinput type="hidden" id="subject_id" name="subject_id" value=#subject_id#>
<cfinput type="hidden" id="field_number" name="field_number" value=#field_number#>
<cfinput type="hidden" id="grid_cells_visited" name="grid_cells_visited" value=#grid_cells_visited#>
<cfinput type="hidden" id="number_grid_cells_visited" name="number_grid_cells_visited" value=#number_grid_cells_visited#>
</cfform> 





