<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">




<html>

<head>
	<title>End of Study</title>
	
<cfform action="spatialforaging.cfm" method="post" name="field_form"> 
<cfinput type="hidden" id="angle_changes" name="angle_changes" value=#angle_changes#>
<cfinput type="hidden" id="subject_id" name="subject_id" value=#subject_id#>
<cfinput type="hidden" id="times_switched_away" name="times_switched_away" value=#times_switched_away#>
<cfinput type="hidden" id="total_time_unfocused" name="total_time_unfocused" value=#total_time_unfocused#>
<cfinput type="hidden" id="completed_fields" name="completed_fields" value=#completed_fields#>
<cfinput type="hidden" id="resources_gathered" name="resources_gathered" value=#resources_gathered#>
<cfinput type="hidden" id="grid_cells_visited" name="grid_cells_visited" value=#grid_cells_visited#>

</cfform> 

<!--- when link() is activated (which is achieved by clicking the continue button that appear on line 75), people will be directed to 
welcome.cfm page--->
<script>	
	function link(){
	/*
	<cfoutput>location.href='spatialforaging.cfm?subject_id=#subject_id#'</cfoutput>;*/
	}
</script>
	
</head> 

<body>

<br>






<div style="text-align:center">
<table width="800" align="center">
<tr>
<td width="150">&nbsp;</td>
<td width="500">

<div style="font-family:arial; font-size:14px; text-align:left">
<p>End of study.</p>
</div>
<br>


</td>

<td width="150">&nbsp;</td>
</tr>
</table>
	</div>



</body>

<cfquery datasource="exmind">
update dbo.sf
set completed_fields=#completed_fields#, times_switched_away=#times_switched_away#, total_time_unfocused = #total_time_unfocused#
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set angle_changes = <cfqueryparam value=#angle_changes# cfsqltype="cf_sql_nvarchar">
where subject_id = #subject_id#
</cfquery>


<cfquery datasource="exmind">
update dbo.sf
set resources_gathered = <cfqueryparam value=#resources_gathered# cfsqltype="cf_sql_nvarchar">
where subject_id = #subject_id#
</cfquery>


<cfquery datasource="exmind">
update dbo.sf
set grid_cells_visited = <cfqueryparam value=#grid_cells_visited# cfsqltype="cf_sql_nvarchar">
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set number_angle_changes = <cfqueryparam value=#number_angle_changes# cfsqltype="cf_sql_nvarchar">
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set number_resources_gathered = <cfqueryparam value=#number_resources_gathered# cfsqltype="cf_sql_nvarchar">
where subject_id = #subject_id#
</cfquery>

<cfquery datasource="exmind">
update dbo.sf
set number_grid_cells_visited = <cfqueryparam value=#number_grid_cells_visited# cfsqltype="cf_sql_nvarchar">
where subject_id = #subject_id#
</cfquery>

</html>