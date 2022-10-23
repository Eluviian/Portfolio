<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<style>
.pointer {cursor: pointer;}
</style>
<title>Welcome</title>

<head>
	<meta charset="UTF-8">
	<title>Welcome</title>
	<link rel="stylesheet" href="styles.css">


	<cfoutput>
	<SCRIPT LANGUAGE = "JavaScript">
		
		function sendTo1() {
			location.href='tutorial.cfm?subject_id=#subject_id#&device='+resp+'';
		}
	</SCRIPT>
	</cfoutput>

</head>



<div style="font-family:arial; font-size:18px; text-align:center">


<p style="font-size:20px"><strong>What type of device are you using right now?</strong></p>

<table align="center" border="0">
  <tbody>
    <tr>
		<td align="center" ><button class="pointer" style="height: 50px; width: 110px;" onclick='resp = 1;'><font face="arial" size="3">Smartphone</button></td>
		<td width="20"></td>
		<td align="center" ><button class="pointer" style="height: 50px; width: 110px;" onclick='resp = 2;'><font face="arial" size="3">Laptop</button></td>
   		<td width="20"></td>
		<td align="center" ><button class="pointer" style="height: 50px; width: 110px;" onclick='resp = 3;'><font face="arial" size="3">Tablet</button></td>
   		<td width="20"></td>
		<td align="center" ><button class="pointer" style="height: 50px; width: 110px;" onclick='resp = 4;'><font face="arial" size="3">Desktop Computer</button></td>
   		<td width="20"></td>		
		<td align="center" ><button class="pointer" style="height: 50px; width: 110px;" onclick='resp = 5;'><font face="arial" size="3">Some Other Device</font></button></td>
    </tr>
  </tbody>
</table>
</div>


<br>
<div style="text-align:center">
	<input type="button" value = "CONTINUE" onclick="sendTo1()">
</div>

</body>


</body>


</html>
