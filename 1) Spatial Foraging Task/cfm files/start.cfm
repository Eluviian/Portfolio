<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">



<!--- get ip address --->
<cfset ip_address = cgi.remote_addr>

<!--- Assigns a unique subject id --->
<cfset subject_id=RandRange(100000,999999)>

<!---assigns mode randomly--->
<cfset mode=RandRange(1,2)>

<!--- Checks if the subject id is already assigned and refreshes the template if so --->
<cfquery name="record_exist_check_1" datasource="exmind">
        select *
        from dbo.sf
        where subject_id = #subject_id#
</cfquery>

<cfif record_exist_check_1.RecordCount gt 0>
    <cfoutput>
    <META HTTP-EQUIV="refresh" CONTENT="0;URL='start.cfm'">
    </cfoutput>
<cfabort>
</cfif>


<cfquery name="IP_check" datasource="exmind">
        select *
        from dbo.sf
        where ip_address = '#ip_address#'
</cfquery>
<cfset ip = 0> 

<html>

<head>
	<title>Start</title>

<!--- when link() is activated (which is achieved by clicking the continue button that appear on line 75), people will be directed to 
welcome.cfm page--->
<script>	
	function link(){
	
	<cfoutput>location.href='welcome.cfm?subject_id=#subject_id#&id=#id#&ip_address=#ip_address#'</cfoutput>;
	}
</script>
	
</head>
<body>

<br>

<!--- record variables to database --->

<cfquery datasource="exmind">
insert 	into dbo.sf (subject_id, id, ip_address, mode)
		values ('#subject_id#','#id#', '#ip_address#', '#mode#')
</cfquery>





<div style="text-align:center">
<table width="800" align="center">
<tr>
<td width="150">&nbsp;</td>
<td width="500">

<div style="font-family:arial; font-size:14px; text-align:left">
<p>Start of the study</p>
</div>
<br>

<!--- create a button with "continue" on it, and when it is clicked, function "link()" is activated --->
<div style="text-align:center">
	<input type="button" value = "CONTINUE" onclick="link()">
</div>
</td>

<td width="150">&nbsp;</td>
</tr>
</table>
	</div>



</body>
</html>