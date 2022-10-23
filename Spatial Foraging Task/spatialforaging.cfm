<!doctype html> 
<html lang="en"> 

<head>
	<title> Spatial Foraging Task </title>
	<style>
		canvas {
			border:2px solid white;
			background-colour: #87ceeb;
		display: block;
		margin: auto;
		width: 600px;
			}
	</style>
	<script>  //this script taken from https://stackoverflow.com/questions/68434937/countdown-timer-stops-when-switching-tabs from user Sourabh Kumar
				//Sourabh's Stack OVerflow page: https://stackoverflow.com/users/11549855/sourabh-kumar
				//it overrides JS's default behaviour of setting setInterval to 1000 ms when the user switches tabs
				//i.e. - the timer will work the same and the player will move the same regardless of whether the tab has focus
    (function() {
      var $momentum;

      function createWorker() {
        var containerFunction = function() {
          var idMap = {};

          self.onmessage = function(e) {
            if (e.data.type === 'setInterval') {
              idMap[e.data.id] = setInterval(function() {
                self.postMessage({
                  type: 'fire',
                  id: e.data.id
                });
              }, e.data.delay);
            } else if (e.data.type === 'clearInterval') {
              clearInterval(idMap[e.data.id]);
              delete idMap[e.data.id];
            } else if (e.data.type === 'setTimeout') {
              idMap[e.data.id] = setTimeout(function() {
                self.postMessage({
                  type: 'fire',
                  id: e.data.id
                });
                // remove reference to this timeout after is finished
                delete idMap[e.data.id];
              }, e.data.delay);
            } else if (e.data.type === 'clearCallback') {
              clearTimeout(idMap[e.data.id]);
              delete idMap[e.data.id];
            }
          };
        };

        return new Worker(URL.createObjectURL(new Blob([
          '(',
          containerFunction.toString(),
          ')();'
        ], {
          type: 'application/javascript'
        })));
      }

      $momentum = {
        worker: createWorker(),
        idToCallback: {},
        currentId: 0
      };

      function generateId() {
        return $momentum.currentId++;
      }

      function patchedSetInterval(callback, delay) {
        var intervalId = generateId();

        $momentum.idToCallback[intervalId] = callback;
        $momentum.worker.postMessage({
          type: 'setInterval',
          delay: delay,
          id: intervalId
        });
        return intervalId;
      }

      function patchedClearInterval(intervalId) {
        $momentum.worker.postMessage({
          type: 'clearInterval',
          id: intervalId
        });

        delete $momentum.idToCallback[intervalId];
      }

      function patchedSetTimeout(callback, delay) {
        var intervalId = generateId();

        $momentum.idToCallback[intervalId] = function() {
          callback();
          delete $momentum.idToCallback[intervalId];
        };

        $momentum.worker.postMessage({
          type: 'setTimeout',
          delay: delay,
          id: intervalId
        });
        return intervalId;
      }

      function patchedClearTimeout(intervalId) {
        $momentum.worker.postMessage({
          type: 'clearInterval',
          id: intervalId
        });

        delete $momentum.idToCallback[intervalId];
      }

      $momentum.worker.onmessage = function(e) {
        if (e.data.type === 'fire') {
          $momentum.idToCallback[e.data.id]();
        }
      };

      window.$momentum = $momentum;

      window.setInterval = patchedSetInterval;
      window.clearInterval = patchedClearInterval;
      window.setTimeout = patchedSetTimeout;
      window.clearTimeout = patchedClearTimeout;
    })();
	</script> 
	
	<script type="math.js" type="text/javascript"></script>
</head>

<body>

 
	<cfform action="field_transition.cfm" method="post" name="field_form" id="field_form"> 
	<cfinput type="hidden" id="angle_changes" name="angle_changes" value=#angle_changes#>
	<cfinput type="hidden" id="subject_id" name="subject_id" value=#subject_id#>
	<cfinput type="hidden" id="times_switched_away" name="times_switched_away" value=#times_switched_away#>
	<cfinput type="hidden" id="total_time_unfocused" name="total_time_unfocused" value=#total_time_unfocused#>
	<cfinput type="hidden" id="completed_fields" name="completed_fields" value=#completed_fields#>
	<cfinput type="hidden" id="resources_gathered" name="resources_gathered" value=#resources_gathered#>
	<cfinput type="hidden" id="resources_not_gathered" name="resources_not_gathered" value=#resources_not_gathered#>
	<cfinput type="hidden" id="grid_cells_visited" name="grid_cells_visited" value=#grid_cells_visited#>

	<cfinput type="hidden" id="number_angle_changes" name="number_angle_changes" value=#number_angle_changes#>
	<cfinput type="hidden" id="number_resources_gathered" name="number_resources_gathered" value=#number_resources_gathered#>
	<cfinput type="hidden" id="number_grid_cells_visited" name="number_grid_cells_visited" value=#number_grid_cells_visited#>
	
	</cfform> 
	

	<div id="canvas"></div>
	<body onload = "startGame()">
	<h1 style="text-align:center"> Spatial Foraging Task </h1>
	<p id="demo"></p>

	<p id="total_points"> Total Points </p>
	
	<script type="text/javascript">
			
		var canvasWidthNoScoreText = 404;
		var canvasWidthWithScoreText = 410;  //set to 800 if you are going to show points on right side of screen
		var canvasHeight = 444;
		var player;
		var playerAngle = 0;
		var angleChanges = [];
		var pixelSize = 2;    //doubling size of everything
		var gridCellSize = 3;  //number of "pixels" per grid cell
		var resources = [];
		var grid = [];
		var resourcesGathered = 0;
		
		var lineWidth = 2; //for borders
		var xoffset = lineWidth;
		var yoffset = 42  //to account for space for clock
		
		var time = 0;     //milliseconds
		var mode;   //resource distirubtion - 1 for clustered, 2 for disperse

		var timeFocused = 0;   //in milliseconds
		var timeUnfocused = 0;  //in milliseconds
		var timesSwitchedAway = 0;  //for this field, will be added to total
		var switchedAway = false;
		
		var times_switched_away;
		var total_time_unfocused;
		
		//getting values from pre-sf task if this is first field, or from previous fields
		var angleChangesFormString = document.getElementById("angle_changes").value;
		var resourcesFormString = document.getElementById("resources_gathered").value;
		var resourcesNotGatheredFormString = document.getElementById("resources_not_gathered").value;
		var gridCellsFormString = document.getElementById("grid_cells_visited").value;
		var numberAngleChangesFormString = document.getElementById("number_angle_changes").value;
		var numberResourcesGatheredFormString = document.getElementById("number_resources_gathered").value;
		var numberGridCellsVisitedFormString = document.getElementById("number_grid_cells_visited").value;
		
	
		//updates every 20 frames
		var interval = setInterval(updateCanvas,20);
		
		document.getElementById("total_points").innerHTML = " ";
		document.getElementById("total_points").style.textAlign = "center";
		document.getElementById("total_points").style.fontSize = "18px";
		
		
		
		function startGame() {
			gameCanvas.start();
			player = new createPlayer(16,20,0,canvasWidthNoScoreText/2,(canvasHeight/2)+(yoffset/2));  //base,height,angle,coords of base-height intersection
			
			//blank spaces are to prevent us from seeing when player icon goes out of bounds
			blankSpaceTop = new createRectangle(0,0,canvasWidthNoScoreText,yoffset-lineWidth+1,"white");
			blankSpaceBottom = new createRectangle(0,canvasHeight-lineWidth+1,canvasWidthNoScoreText,canvasHeight,"white");
			blankSpaceLeft = new createRectangle(0,0,1,canvasHeight,"white");
			blankSpaceRight = new createRectangle(canvasWidthNoScoreText-lineWidth+1,0,1,canvasHeight,"white");
			blankSpaceTextArea = new createRectangle(canvasWidthNoScoreText,0,canvasWidthWithScoreText,canvasHeight,"white")
			
			clockFace = new createClockFace(380,20,18,0,2*Math.PI);
			clockHand = new createClockHand(379,8,3,12,377,8,384,8,380.5,3); //rect x,y,width,height,3 points for triangle
			
			<!---update values in db, based on previous field, or initial values of 0 if this is first field--->
			<cfquery datasource="exmind">
			update dbo.sf
			set times_switched_away = #times_switched_away#, total_time_unfocused = #total_time_unfocused#
			where subject_id = #subject_id#
			</cfquery>
			
			setResources();
			setGrid();	
			
			}
			
			
		function setResources(){
			<!---get mode from db--->
			<cfquery name="getMode" datasource="exmind" result="result">
				select mode from dbo.sf
				where subject_id=#subject_id#
			</cfquery>  
			<cfset record = getMode>
			
			mode = parseInt(JSON.stringify(eval(<cfoutput>#record.mode#</cfoutput>)));

			if (mode == 1) {   //clumped, 4 large clusters
				var numClusters = 4;
				var diamondSize = 19;
				}
				
			if (mode == 2) {   //disperse, 624 small clusters
				var numClusters = 624;
				var diamondSize = 1;
				}
			
			//coords - resources cannot be created outside these bounds
			var xmin = 4;
			var xmax = 392;
			var ymin = 46;
			var ymax = 432;  
			
			for (var i = 0; i < numClusters; i++) {
				resourceXLocation = Math.floor(Math.random() * (xmax-xmin+1) + xmin);
				resourceYLocation = Math.floor(Math.random() * (ymax-ymin+1) + ymin);
				for (var j = -diamondSize; j<diamondSize+1; j++) {
					for (var k = -diamondSize; k<diamondSize+1 ;k++) {
						if ((Math.abs(j) + Math.abs(k)) <= diamondSize) {
							resource = new createResource(resourceXLocation+(j*pixelSize),resourceYLocation+(k*pixelSize),pixelSize,false,"black");
							resources.push(resource);
							}
						}
						
					}	
					
				}
					
				
		}
		
		function setGrid(){
			canvasGridWidth = (canvasWidthNoScoreText-xoffset);
			canvasGridHeight = (canvasHeight-(2*lineWidth));
			for (var i = xoffset-1+lineWidth; i < canvasGridWidth-8; i+= (pixelSize*gridCellSize)) {
				for (var j = yoffset+lineWidth; j < canvasGridHeight; j+= (pixelSize*gridCellSize)) {
					cell = new createGridCell(i,j,(pixelSize*gridCellSize),false,"green");
					grid.push(cell);
					}
				}
				
		}
			
		function updateTimesSwitchedTimeUnfocusedCompletedFields() {
			<cfquery name="getField" datasource="exmind" result="result">
				select completed_fields,total_time_unfocused,times_switched_away from dbo.sf
				where subject_id=#subject_id#
			</cfquery>  
			<cfset record = getField>
			
			completed_fields = parseInt(JSON.stringify(eval(<cfoutput>#record.completed_fields#</cfoutput>)));
			completed_fields += 1;
			
						
			timesSwitchedAway += parseInt(JSON.stringify(eval(<cfoutput>#record.times_switched_away#</cfoutput>)));
			timeUnfocused += parseInt(JSON.stringify(eval(<cfoutput>#record.total_time_unfocused#</cfoutput>)));
			times_switched_away = timesSwitchedAway.toString();
			total_time_unfocused = timeUnfocused.toString();
			
			document.getElementById("times_switched_away").value = times_switched_away;
			document.getElementById("total_time_unfocused").value = total_time_unfocused;
			document.getElementById("completed_fields").value = completed_fields.toString();
			
		}
		
		
		function updateAngleChangesData() {
			//adding each angle change to a string to add to database
			var i = 0;
			var j = 0;   //records number of angle changes, resources gathered, grid cells visited
			
			for (; i < angleChanges.length; i++) {
				//alert(i);
				angleChangesFormString += angleChanges[i].toString();
				if (angleChanges[i] != 0) {
					j += 1;
				}
				angleChangesFormString += "|";
				}
				
			angleChangesFormString += "#";	  //signals end of this field
			angleChangesFormString = angleChangesFormString.replace("undefined","");
			document.getElementById("angle_changes").value = angleChangesFormString.toString();
					
			numberAngleChangesFormString += j.toString();
			numberAngleChangesFormString += "#";
			numberAngleChangesFormString = numberAngleChangesFormString.replace("undefined","");
			document.getElementById("number_angle_changes").value = numberAngleChangesFormString.toString();
			
		}
		
		function updateResourcesGatheredData(){
			var j = 0;
			var i = 0;
			for (; i<resources.length; i++) {
				if (resources[i].visibility == true){
					j += 1;
					resourcesFormString += "x";
					resourcesFormString += resources[i].x.toString();
					resourcesFormString += "y";
					resourcesFormString += resources[i].y.toString();
					resourcesFormString += "|";
				} else {
					//add to resources not gathered
					resourcesNotGatheredFormString += "x";
					resourcesNotGatheredFormString += resources[i].x.toString();
					resourcesNotGatheredFormString += "y";
					resourcesNotGatheredFormString += resources[i].y.toString();
					resourcesNotGatheredFormString += "|";
				}
				
			}
			
			resourcesFormString += "#";   //signals end of this field
			document.getElementById("resources_gathered").value = resourcesFormString.toString();
			
			resourcesNotGatheredFormString += "#"; 
			document.getElementById("resources_not_gathered").value = resourcesNotGatheredFormString.toString();
			
			numberResourcesGatheredFormString += j.toString();
			numberResourcesGatheredFormString += "#";
			numberResourcesGatheredFormString = numberResourcesGatheredFormString.replace("undefined","");
			document.getElementById("number_resources_gathered").value = numberResourcesGatheredFormString.toString();
			
		}
		
		function updateGridCellsVisitedData(){
			var j = 0;
			var i = 0;
			for (; i<grid.length; i++) {
				if (grid[i].visited == true) {
					j += 1;
					gridCellsFormString += "x";
					gridCellsFormString += grid[i].x.toString();
					gridCellsFormString += "y";
					gridCellsFormString += grid[i].y.toString();
					gridCellsFormString += "|";
				}
				
			}
			
			gridCellsFormString += "#"; //signals end of this field
			document.getElementById("grid_cells_visited").value = gridCellsFormString.toString();

			numberGridCellsVisitedFormString += j.toString();
			numberGridCellsVisitedFormString += "#";
			numberGridCellsVisitedFormString = numberGridCellsVisitedFormString.replace("undefined","");
			document.getElementById("number_grid_cells_visited").value = numberGridCellsVisitedFormString.toString();
			
			
			
			
		}
		
		
			
		function endGame() {
			
			//the following functions update all form data that will be sent to field_transition
			updateTimesSwitchedTimeUnfocusedCompletedFields();
			updateAngleChangesData();
			updateResourcesGatheredData();
			updateGridCellsVisitedData();
				
			var button = document.createElement('button');
			button.textContent = "Next Field";
			if (completed_fields >= 5) {	
				button.textContent = "End";
				document.getElementById("field_form").action="end.cfm";
			}
			
			button.style = "height: 50px; width: 110px;";
			
			//centers button horizontally
			button.style.position = "absolute";
			button.style.left = "50%";
			button.style.transform = "translateX(-50%)";
			
			button.onclick = sendTo1;
			document.body.appendChild(button);		
		}
		

		
		function sendTo1() {
			
			document.getElementById("field_form").submit();
			
		}
			
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
					} else {
					ctx.strokeStyle = this.colour;
					ctx.strokeRect(this.x,this.y,this.size,this.size);
					}
				}
				
			
			}
		
		function createClockFace(x,y,radius,startAngle,endAngle,startTime) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.startAngle = startAngle;
			this.endAngle = endAngle;
			this.startTime = startTime;
			this.currentTime = startTime;
			
			this.draw = function() {
				ctx = gameCanvas.context;
				ctx.fillStyle = "grey";
				ctx.beginPath();
				ctx.moveTo(this.x,this.y);
				ctx.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,false);
				ctx.fill();
				}
			
			}
			
		function createClockHand(rectx,recty,rectWidth,rectHeight,pointx1,pointy1,pointx2,pointy2,pointx3,pointy3){
			this.rectx = rectx;
			this.recty = recty;
			this.rectWidth = rectWidth;
			this.rectHeight = rectHeight;
			
			//line
			this.rectx1 = this.rectx;
			this.recty1 = this.recty;
			this.rectx2 = this.rectx;
			this.recty2 = this.recty + this.rectHeight;
			this.rectx3 = this.rectx + this.rectWidth;
			this.recty3 = this.recty + this.rectHeight;
			this.rectx4 = this.rectx + this.rectWidth;
			this.recty4 = this.recty;
			
			//triangle
			this.pointx1 = pointx1;
			this.pointy1 = pointy1;
			this.pointx2 = pointx2;
			this.pointy2 = pointy2
			this.pointx3 = pointx3;
			this.pointy3 = pointy3;
			
			this.setPoints = function(rectx1,recty1,rectx2,recty2,rectx3,recty3,rectx4,recty4,pointx1,pointy1,pointx2,pointy2,pointx3,pointy3) {
				this.rectx1 = rectx1;
				this.recty1 = recty1;
				this.rectx2 = rectx2;
				this.recty2 = recty2;
				this.rectx3 = rectx3;
				this.recty3 = recty3;
				this.rectx4 = rectx4;
				this.recty4 = recty4;
				
				
				this.pointx1 = pointx1;
				this.pointy1 = pointy1;
				this.pointx2 = pointx2;
				this.pointy2 = pointy2
				this.pointx3 = pointx3;
				this.pointy3 = pointy3;
				}
			
			this.draw = function() {
				ctx = gameCanvas.context;
				ctx.fillStyle = "white";
				
				ctx.beginPath();
				ctx.moveTo(this.rectx1,this.recty1);
				ctx.lineTo(this.rectx2,this.recty2);
				ctx.lineTo(this.rectx3,this.recty3);
				ctx.lineTo(this.rectx4,this.recty4);
				ctx.fill();
				
				ctx.beginPath();
				ctx.moveTo(this.pointx1, this.pointy1);
				ctx.lineTo(this.pointx2, this.pointy2);
				ctx.lineTo(this.pointx3, this.pointy3);
				ctx.fill();
				}
				
		
			}



		function moveClockHand() {
			cx = clockHand.rectx + (clockHand.rectWidth/2);
			cy = clockHand.recty + clockHand.rectHeight;
			angleChange = 360/120;
			
			rectx1 = rotateX(cx,cy,angleChange,clockHand.rectx1,clockHand.recty1);
			recty1 = rotateY(cx,cy,angleChange,clockHand.rectx1,clockHand.recty1);
			
			rectx2 = rotateX(cx,cy,angleChange,clockHand.rectx2,clockHand.recty2);
			recty2 = rotateY(cx,cy,angleChange,clockHand.rectx2,clockHand.recty2);
			
			rectx3 = rotateX(cx,cy,angleChange,clockHand.rectx3,clockHand.recty3);
			recty3 = rotateY(cx,cy,angleChange,clockHand.rectx3,clockHand.recty3);
			
			rectx4 = rotateX(cx,cy,angleChange,clockHand.rectx4,clockHand.recty4);
			recty4 = rotateY(cx,cy,angleChange,clockHand.rectx4,clockHand.recty4);
			
			pointx1 = rotateX(cx,cy,angleChange,clockHand.pointx1,clockHand.pointy1);
			pointy1 = rotateY(cx,cy,angleChange,clockHand.pointx1,clockHand.pointy1);
			
			pointx2 = rotateX(cx,cy,angleChange,clockHand.pointx2,clockHand.pointy2);
			pointy2 = rotateY(cx,cy,angleChange,clockHand.pointx2,clockHand.pointy2);
			
			pointx3 = rotateX(cx,cy,angleChange,clockHand.pointx3,clockHand.pointy3);
			pointy3 = rotateY(cx,cy,angleChange,clockHand.pointx3,clockHand.pointy3);
			
			clockHand.setPoints(rectx1,recty1,rectx2,recty2,rectx3,recty3,rectx4,recty4,pointx1,pointy1,pointx2,pointy2,pointx3,pointy3);
			
		}
		

		/*
		//code from when points where drawn on canvas - keeping just in caseys
		function drawTotalPoints(){
			
			ctx = gameCanvas.context;
			ctx.font = "20px Arial";
			ctx.fillStyle = "black"
			//text = "Press J once to make a left turn";
			//ctx.fillText(text,470,70);
			text = "Total Point(s):"
			ctx.fillText(text,498,200);
			text = resourcesGathered;
			ctx.fillText(text,545,250);
			
		}*/
		
		function drawBorders(){
			ctx = gameCanvas.context;
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
		
		function drawBlankSpaces(){
			ctx = gameCanvas.context;
			//blank spaces are to prevent us from seeing the player if it goes out of bounds, while it wraps around screen
			blankSpaceTop.draw();
			blankSpaceBottom.draw();
			blankSpaceLeft.draw();
			blankSpaceRight.draw();
			blankSpaceTextArea.draw();
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
			
			this.hitXList = [];
			this.hitYList = [];
			/*
			this.hitXList.push(this.x3);
			this.hitYList.push(this.y3);
			
			for (var i = 1; i<8; i++) {
				this.hitXList.push(this.x3 - (i*(this.height/8)));
				this.hitYList.push(this.y3 - (i*(this.base/28)));
				}
				
			for (var i = 7; i>0; i--) {
				this.hitXList.push(this.x3 - (i*(this.height/8)));
				this.hitYList.push(this.y3 + (i*(this.base/28)));
				}*/
			
			/*
			this.hitXList.push(this.x3 - 2);
			this.hitXList.push(this.x3 - 4);
			this.hitXList.push(this.x3 - 4);
			this.hitXList.push(this.x3 - 2);
			
			this.hitYList.push(this.y3 - 2);
			this.hitYList.push(this.y3 - 2);
			this.hitYList.push(this.y3 + 2);
			this.hitYList.push(this.y3 + 2);*/
			
			for (var i = -2; i> -5; i -- ) {
				for (var j = -1; j< 2; j++) {
					this.hitXList.push(this.x3 + i);
					this.hitYList.push(this.y3 + j);
					}
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
				ctx.fillStyle = "orange";
				ctx.beginPath();
				ctx.moveTo(this.hitXList[0], this.hitYList[0]);
				for (var i = 1; i<this.hitXList.length; i++) {
					ctx.lineTo(this.hitXList[i], this.hitYList[i]);
					}
				ctx.fill();	*/		
				}	 		

				
			this.calculateCentreX = function() {   //calculates centre to rotate around centre point of player icon
				return (this.x1+this.x2+this.x3)/3 
				}
				
			this.calculateCentreY = function() {   //calculates centre to rotate around centre point of player icon
				return (this.y1+this.y2+this.y3)/3 
				}
					
			this.move = function() {
				ctx = gameCanvas.context;
				angle = this.angleFacing*(Math.PI/180);
				distance = 1;
				
				//move all drawing points
				this.x1 = this.x1 + Math.cos(angle) * distance;
				this.y1 = this.y1 + Math.sin(angle) * distance;
				this.x2 = this.x2 + Math.cos(angle) * distance;
				this.y2 = this.y2 + Math.sin(angle) * distance;
				this.x3 = this.x3 + Math.cos(angle) * distance;
				this.y3 = this.y3 + Math.sin(angle) * distance;
				this.x4 = this.x4 + Math.cos(angle) * distance;
				this.y4 = this.y4 + Math.sin(angle) * distance;

				//move all hitbox points
				for (var i = 0; i<this.hitXList.length; i++) {
					this.hitXList[i] = this.hitXList[i] + Math.cos(angle) * distance;
					this.hitYList[i] = this.hitYList[i] + Math.sin(angle) * distance;

					}
				
				
				
				}
				
			this.setPoints = function(x1,y1,x2,y2,x3,y3,x4,y4,hitboxPointsX, hitboxPointsY) { //sets player icon points after rotation or wrap around screen
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
				
			this.checkPoints = function(xmin,ymin,xmax,ymax) {  //checks if player needs to wrap around screen
				xchange = 0;
				ychange = 0;
				
				if (this.x1 < xmin && this.x2 < xmin && this.x3 < xmin){
					xchange = xmax;
					}
					
				if (this.x1 > xmax && this.x2 > xmax && this.x3 > xmax) {
					xchange = -xmax;
					}
				
				if (this.y1 < ymin && this.y2 < ymin && this.y3 < ymin){
					ychange = ymax-ymin+lineWidth;
					}
					
				if (this.y1 > ymax && this.y2 > ymax && this.y3 > ymax) {
					ychange = -(ymax-ymin+lineWidth*2);
					}	
				
				//moves all drawing points of player icon based on if a wrap around was done
				x1 = this.x1 + xchange;
				y1 = this.y1 + ychange;
				x2 = this.x2 + xchange;
				y2 = this.y2 + ychange;
				x3 = this.x3 + xchange;
				y3 = this.y3 + ychange;
				x4 = this.x4 + xchange;
				y4 = this.y4 + ychange;
			
			
				//moves all hitbox points of player icon based on if a wrap around was done
				hitboxPointsX = [];
				hitboxPointsY = [];
				for (var i = 0; i<this.hitXList.length; i++) {
					hitboxPointsX.push(this.hitXList[i] + xchange);
					hitboxPointsY.push(this.hitYList[i] + ychange);
					}

					
				this.setPoints(x1,y1,x2,y2,x3,y3,x4,y4,hitboxPointsX,hitboxPointsY);
			
				}
			}
			
			
		function detectCollision(t,r) {  //t for triangle (player), r for rectangle
			intersection = false
			
			for (var i = 0; i< t.hitXList.length; i++) {
				if (t.hitXList[i] >= r.x1 && t.hitXList[i] <= r.x4 && t.hitYList[i] >= r.y1 && t.hitYList[i] <= r.y4) {
					intersection = true;
					}
			
				}
				
			return intersection
			
			}
		
		//turn player
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
		
		
		function rotateX(cx,cy,angle,px,py) {  //rotates the x coord of a point (p) around a centre point (c)
			angle = angle*(Math.PI/180);
			x = Math.cos(angle)*(px-cx) - Math.sin(angle)*(py-cy) + cx
			return x
			}
			
		function rotateY(cx,cy,angle,px,py) {   //rotates the y coord of a point (p) around a centre point (c)
			angle = angle*(Math.PI/180)
			y = Math.sin(angle)*(px-cx) + Math.cos(angle)*(py-cy) + cy
			return y
			}
			
		function rotatePlayer(angleChange) {
			//rotates player around its center
			cx = player.calculateCentreX();
			cy = player.calculateCentreY();
			
			//rotating all points of player icon around its centre
			x1 = rotateX(cx,cy,angleChange,player.x1,player.y1);
			x2 = rotateX(cx,cy,angleChange,player.x2,player.y2);
			x3 = rotateX(cx,cy,angleChange,player.x3,player.y3);
			x4 = rotateX(cx,cy,angleChange,player.x4,player.y4);
			y1 = rotateY(cx,cy,angleChange,player.x1,player.y1);
			y2 = rotateY(cx,cy,angleChange,player.x2,player.y2);
			y3 = rotateY(cx,cy,angleChange,player.x3,player.y3);
			y4 = rotateY(cx,cy,angleChange,player.x4,player.y4);
			
			//rotating all hitbox points around the player icon's centre
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
		

			
		function updateCanvas(){
			ctx = gameCanvas.context;
			ctx.clearRect(0,0,canvasWidthWithScoreText,canvasHeight);
			

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

			for (var i = 0; i < grid.length; i++) {
				//grid[i].draw();     //grid should only be drawn for visual testing purposes
				
				if (detectCollision(player,grid[i])) {
					grid[i].visited = true;
					}
				}
			
			
			for (var i = 0; i < resources.length; i++) {
				if (resources[i].visibility == true) {
				resources[i].draw();
					}
				
				if (detectCollision(player,resources[i])) {
					if (resources[i].visibility == false) {
						resources[i].visibility = true;
						//resources[i].colour = "red";
						resourcesGathered += 1;
						}
					}
				}
				
			player.draw();
			
			drawBlankSpaces();
			drawBorders();
			
			clockFace.draw();
			clockHand.draw();
			
			
			

			
			time += 20;     //game updates every 20 ms - change this if setInterval changes
			if (time <= 120000){			//time limit = 120 seconds
			//if (time <= 1200) {	     //lower timer limit of 1.2 seconds for testing - do not use!
				player.checkPoints(lineWidth,yoffset+lineWidth,canvasWidthNoScoreText-lineWidth,canvasHeight-lineWidth); //check if out of bounds
				player.move();
				
				if (time%300 == 0) {   //records the change in player icon's angle every 300 ms
					angleToPush = player.angleFacing - playerAngle;
					/*    //include this if angles like 650 are unacceptable
					while (angleToPush >= 360) {
						angleToPush -= 360;
						}*/
					angleChanges.push(angleToPush);
					playerAngle = player.angleFacing;	
					
					}
				
				if (time%1000 == 0){  //once per second
					
					moveClockHand();
					
					}
					
				} else {
					
					//drawTotalPoints();
					document.getElementById("total_points").innerHTML = "Total Points: "+resourcesGathered;
					endGame();
					clearInterval(interval);
					
					
					}
					
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





