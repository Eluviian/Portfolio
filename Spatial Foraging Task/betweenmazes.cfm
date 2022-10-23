<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>

<title>Between Mazes</title>

<script>	
	function link(){
	<cfoutput>location.href='advanced_maze.cfm?subject_id=#subject_id#'</cfoutput>;
	}
</script>
	
<style>
.pointer {cursor: pointer;}
</style>
<head>
	<meta charset="UTF-8">
	<title>Welcome</title>
	<link rel="stylesheet" href="styles.css">


</head>


<div style="font-family:arial; font-size:18px; text-align:center">
<br>
<p><strong>You are about to start the next maze game. Once you click continue, the next maze game will start</font>.</strong><br>

<div style="text-align:center">
	<input type="button" value = "CONTINUE" onclick="link()">
</div>




</body>


</html>
