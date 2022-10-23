<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>

<title>Visualize Data</title>


<cfquery name="getField" datasource="exmind" result="result">
	select * from dbo.sf
	where subject_id=#subject_id#
</cfquery>  
<cfset record = getField>

<cfform action="spatialforaging.cfm" method="post" name="field_form" id="field_form"> 
	<cfinput type="hidden" id="angle_changes" name="angle_changes" value=#record.angle_changes#>
	<cfinput type="hidden" id="subject_id" name="subject_id" value=#subject_id#>
	<cfinput type="hidden" id="field_number" name="field_number" value=#field_number#>
	<cfinput type="hidden" id="completed_fields" name="completed_fields" value=#record.completed_fields#>
	<cfinput type="hidden" id="resources_gathered" name="resources_gathered" value=#record.resources_gathered#>
	<cfinput type="hidden" id="resources_not_gathered" name="resources_not_gathered" value=#record.resources_not_gathered#>
	<cfinput type="hidden" id="grid_cells_visited" name="grid_cells_visited" value=#record.grid_cells_visited#>
	
	<cfinput type="hidden" id="number_resources_gathered" name="number_resources_gathered" value=#record.number_resources_gathered#>
	<cfinput type="hidden" id="number_grid_cells_visited" name="number_grid_cells_visited" value=#record.number_grid_cells_visited#>
	<cfinput type="hidden" id="number_angle_changes" name="number_angle_changes" value=#record.number_angle_changes#>
	
	</cfform> 
	
<script>	

	//alert(document.getElementById("resources_not_gathered").value);
	function link_resources(){
	document.getElementById("field_form").action = "visualize_resources.cfm"
	document.getElementById("field_form").submit();

	}
	
	function link_grid_cells(){
	document.getElementById("field_form").action = "visualize_grid_cells.cfm"
	document.getElementById("field_form").submit();

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
<p><strong>Choose what to visualize</font>.</strong><br>


<div style="text-align:center">
	<input type="button" value = "VISUALIZE RESOURCES" onclick="link_resources()">
</div>
<div style="text-align:center">
	<input type="button" value = "VISUALIZE GRID CELLS" onclick="link_grid_cells()">
</div>




</body>




</html>
