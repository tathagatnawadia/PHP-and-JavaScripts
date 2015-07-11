<?php
	function injection_ready($string){
		global $connection;
		return (mysqli_real_escape_string($connection,$string));
	}
	function redirect_to($new_location){
		header("Location: ".$new_location);
		exit;
	}
	function confirm_query($result_set){
		if(!$result_set){
			die("Database Failed !!");
		}
	}
	
	
	function time12($time){
		$hour = null;
		$meridian = 'AM';
		if($time >= 12)
			$meridian = 'PM';
		if($time > 12)
			$hour = $time%12;
		else
			$hour = $time;
		return $hour.' '.$meridian;
	}
?>