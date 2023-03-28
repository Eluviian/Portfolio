<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>

<title>Pre-SF Task</title>
<cfform action="spatialforaging.cfm" method="post" name="field_form"> 
	<cfinput type="hidden" id="angle_changes" name="angle_changes" value="">
	<cfinput type="hidden" id="subject_id" name="subject_id" value=#subject_id#>
	<cfinput type="hidden" id="resources_gathered" name="resources_gathered" value="">
	<cfinput type="hidden" id="resources_not_gathered" name="resources_not_gathered" value="">
	<cfinput type="hidden" id="grid_cells_visited" name="grid_cells_visited" value="">
	
	<cfinput type="hidden" id="number_angle_changes" name="number_angle_changes" value="">
	<cfinput type="hidden" id="number_resources_gathered" name="number_resources_gathered" value="">
	<cfinput type="hidden" id="number_grid_cells_visited" name="number_grid_cells_visited" value="">

	</cfform>
<script>	
	function link(){
	<!---initial values are passed to sf task--->
	<cfoutput>
	location.href="spatialforaging.cfm?subject_id=#subject_id#&grid_cells_visited="+grid_cells_visited.value+"&resources_not_gathered="+resources_not_gathered.value+"&resources_gathered="+resources_gathered.value+"&completed_fields=0&times_switched_away=0&total_time_unfocused=0&angle_changes="+angle_changes.value+"&number_angle_changes="+number_angle_changes.value+"&number_resources_gathered="+number_resources_gathered.value+"&number_grid_cells_visited="+number_grid_cells_visited.value+"";</cfoutput>
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
<p><strong>You are about to start the spatial foraging task. Once you click continue, the spatial foraging task will start.<br>You will complete five fields</font>.</strong><br>

<div style="text-align:center">
	<input type="button" value = "CONTINUE" onclick="link()">
</div>




</body>


</html>
