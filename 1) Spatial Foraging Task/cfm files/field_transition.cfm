<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>

<title>Field Transition</title>
<cfform action="spatialforaging.cfm" method="post" name="field_form"> 
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
<script>	
	function link(){
	
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
<p><strong>Click to advance to the next field</font>.</strong><br>

<div style="text-align:center">
	<input type="button" value = "NEXT FIELD" onclick="link()">
</div>




</body>




<cfquery datasource="exmind">
update dbo.sf
set times_switched_away = #times_switched_away#, total_time_unfocused = #total_time_unfocused#, completed_fields = #completed_fields#
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set number_angle_changes = <cfqueryparam value=#number_angle_changes# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set number_resources_gathered = <cfqueryparam value=#number_resources_gathered# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set number_grid_cells_visited = <cfqueryparam value=#number_grid_cells_visited# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set angle_changes = <cfqueryparam value=#angle_changes# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>


<cfquery datasource="exmind">
update dbo.sf
set resources_gathered = <cfqueryparam value=#resources_gathered# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set resources_not_gathered = <cfqueryparam value=#resources_not_gathered# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>


<cfquery datasource="exmind">
update dbo.sf
set grid_cells_visited = <cfqueryparam value=#grid_cells_visited# cfsqltype=cf_sql_nvarchar>
where subject_id = #subject_id#
</cfquery>


</html>
