<?php require_once("./includes/session.php"); ?>
<?php require_once("./includes/db_connection.php"); ?>
<?php require_once("./includes/functions.php"); ?>

<?php
	header('Content-Type: application/json');

if(!isset($_COOKIE["cryptlogin"]) || !isset($_SESSION["cryptlogin"]) || !isset($_SESSION["cryptusername"]) || !isset($_SESSION["cryptname"])){
  	$return["status"] = -1;
	echo json_encode($return);
	exit;
}
?>

<?php

	if(!isset($_POST["input"]))
	{
		redirect_to("index.php");
	}

	if ($_POST["input"] == "Update Notify"){
		$tobe = $_SESSION["cryptusername"];
		$query = "UPDATE lognoti set ckey=1 where usnid='{$tobe}'";
		$result = mysqli_query($connection, $query);
		$return["success"] = 1;
		echo json_encode($return);
		exit;
	}

	if ($_POST["input"] == "UShout"){
		$upsid = $_POST["u"];
		$query = "SELECT s.sid,p.name,s.shout,date_format(s.stime,'%b %d %h:%i %p') as stime,p.year from profile p,shoutout s 
		where p.usnid=s.usnid and s.sid>{$upsid} order by s.sid";
		$result = mysqli_query($connection, $query);
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
   			 $rows[] = $r;
		}
		echo json_encode($rows);
		exit;
	}

	if ($_POST["input"] == "PShout"){
		$shout = trim(injection_ready($_POST["shout"]));//Post the shout
		$tobe = $_SESSION["cryptusername"];
		if($shout != ""){
			$query = "INSERT into shoutout(usnid,shout) values('{$tobe}','{$shout}')";
			$result = mysqli_query($connection, $query);
		}
		$return["status"] = 1;
		echo json_encode($return);
		exit;
	}

	if($_POST["input"] == "InitialShout"){
		$query = "SELECT s.sid,p.name,s.shout,date_format(s.stime,'%b %d %h:%i %p') as stime,p.year from profile p,shoutout s where p.usnid=s.usnid order by s.sid desc LIMIT 30";
		$result = mysqli_query($connection, $query);
		while($r = mysqli_fetch_assoc($result)) {
   			 $rows[] = $r;
		}
		echo json_encode($rows);
		exit;
	}

	if($_POST["input"] == "LShout"){
		$downsid = $_POST["d"];
		$query = "SELECT s.sid,p.name,s.shout,date_format(s.stime,'%b %d %h:%i %p') as stime,p.year from profile p,shoutout s where p.usnid=s.usnid and s.sid<{$downsid} order by s.sid desc LIMIT 30";
		$result = mysqli_query($connection, $query);
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
   			 $rows[] = $r;
		}
		echo json_encode($rows);
		exit;


	}
?>