<?php require_once("./includes/session.php"); ?>
<?php require_once("./includes/db_connection.php"); ?>
<?php require_once("./includes/functions.php"); ?>
<?php
require './cloudinary/Cloudinary.php';
require './cloudinary/Uploader.php';
require './cloudinary/Api.php';

\Cloudinary::config(array( 
  "cloud_name" => "dpajddz7m", 
  "api_key" => "435125884625687", 
  "api_secret" => "UIVS3MO_QNsh4GKGXG8WcFt9JAw" 
));

?>
<?php
	header('Content-Type: application/json');
?>

<?php
	if(isset($_COOKIE["cryptlogin"]) && isset($_SESSION["cryptlogin"]) && isset($_SESSION["cryptusername"]) && isset($_SESSION["cryptname"])){
 			 $return["status"] = 1;
			echo json_encode($return);
			exit;
}

	if(!isset($_POST["input"]) && !isset($_GET["cszzmk"]))
	{
		redirect_to("index.php");
	}

	function aSuccesfullLogin($usnid,$mashallah) {	
			$_SESSION["checkpoint"] = null;
			$_SESSION["cryptlogin"] = 1;//stores 1 and 0 based on login state 1:login 0:logout
			$_SESSION["cryptusername"] = $usnid;//stores the usnid 
			$_SESSION["cryptname"] = $mashallah;//should store the actual name of the user
			$expire = time() + (60*30);
			setcookie("cryptlogin",1,$expire);
			$_SESSION["cryptusername"] = $usnid;
			$_SESSION["cryptlogin"] = 1;
	}
	if($_POST["input"] == "Check"){
		if(isset($_COOKIE["cryptlogin"]) && isset($_SESSION["cryptlogin"]) && !isset($_SESSION["cryptusername"]) && isset($_SESSION["cryptname"])){
		  	$return["status"] = 1;
			echo json_encode($return);
			exit;
		}
		else{
			$return["status"] = -1;
			echo json_encode($return);
			exit;

		}
	}
	if($_POST["input"] == "Reset Password"){
		if(!isset($_SESSION["stupid"])){
			redirect_to("index.php");
		}
		$finalusn = $_SESSION["stupid"];
		$password = trim(injection_ready($_POST["password"]));
		$rpassword = trim(injection_ready($_POST["rpassword"]));
		$pattern = '/^.{8,}/';
		preg_match($pattern, $password, $matches, PREG_OFFSET_CAPTURE);
		if(!$matches){
			echo '<script> alert("Password Reset failed due to inconsistency of data !");
			 window.location="http://localhost/home.php";
			<script>';
		}
		if($password != $rpassword){
			echo '<script> alert("Password Reset failed due to inconsistency of data !");
			 window.location="http://localhost/home.php";
			<script>';
		}

		$query = "UPDATE credentials set passwd = '{$password}' where usnid = '{$finalusn}'";//Update password query here
		$result = mysqli_query($connection, $query);
		confirm_query($result);
		echo '<script> alert("Password Reset succesfull !");
			 window.location="http://localhost/home.php";
			<script>';
	}
	if($_POST["input"] == "Contact Us"){
		$name = $_POST["Name"];
		$hemail = $_POST["Email"];
		$number = $_POST["Number"];
		$hmessage = $_POST["Message"];
		$from = "help@technoholix-bit.com";
		$headers = "From: " . strip_tags($from) . "\r\n";
		$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$subject = "Admin Help - ".$number;
		$message = "Name : ".$name."<br/> <br/>"."Email : ".$hemail."<br/> <br/>"."Phone Number : ".$number."<br/> <br/>"."Message : ".$hmessage;
		//mail("tathagatnawadia1234@yahoo.com",$subject,$message,$headers);
		$return["status"] = -2;
  		echo json_encode($return);
  		exit;
		
	}
	if ($_POST["input"] == "Login"){		
		$userid = strtoupper(injection_ready($_POST["userid"]));
		$password = injection_ready($_POST["password"]);
		$query = "SELECT * from credentials WHERE usnid='{$userid}'";
		$result = mysqli_query($connection, $query);
		confirm_query($result);
		$row = mysqli_fetch_assoc($result);
		if(!$row){ 
			$return["status"] = -2;
  			echo json_encode($return);
  			exit;
		}
		$usnid = $row["usnid"];
		$passwd = $row["passwd"];
		$status = $row["status"];
		if($usnid[3] == 0){
			$return["fac"] = 1;
		}
		else{
			$return["fac"] = 0;
		}

		if(($password == $passwd) && ($status == 0)){
			
			$_SESSION["checkpoint"] = $usnid;
			$expire = time() + (60*10);//10 minutes to do stuff
			setcookie("checkpoint",1,$expire);
			$return["userid"] = $usnid;
			$return["status"] = 0;
		  	echo json_encode($return);
		  	exit;
		}
		elseif(($password == $passwd) && ($status == 1)){
			$query = "UPDATE lognoti set ltime = now() where usnid = '{$usnid}'";
			$result = mysqli_query($connection, $query);
			$query = "SELECT name from profile where usnid = '{$usnid}'";
			$result = mysqli_query($connection,$query);
			$row = mysqli_fetch_assoc($result);
			aSuccesfullLogin($usnid,$row["name"]);
			$return["userid"] = $_POST["userid"];
			$return["status"] = 2;
		  	echo json_encode($return);
		  	exit;
		}
		else{
			$return["userid"] = $_POST["userid"];
			$return["status"] = -1;
		  	echo json_encode($return);
		  	exit;
		}

	}

	if ($_POST["input"] == "Sign Up" /*&& isset($_SESSION["checkpoint"]) && $_COOKIE["checkpoint"] == 1*/){
		$usnid = $_SESSION["checkpoint"];
		$username = ucfirst(strtolower(trim(injection_ready($_POST["name"]))));
		$email = trim(injection_ready($_POST["email"]));
		$password = trim(injection_ready($_POST["password"]));
		$rpassword = trim(injection_ready($_POST["rpassword"]));
		$dob = trim(injection_ready($_POST["dob"]));
		$phonenumber = trim(injection_ready($_POST["phonenumber"]));
		$sex = $_POST["radios"];

		//$sex = $_POST["radios"];
		//print_r($_FILES);
		//exit;
/*
		if (!$_FILES['uimage']) {
		   $return["status"] = 9;
		   echo json_encode($return);
		   exit;
		}*/

			if($username!="" || $email!="" || $password!="" || $rpassword!=""||$dob!=""||$phonenumber!=""){
				$pattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@(yahoo|gmail|live|outlook).(com|in)/';
				preg_match($pattern, $email, $matches, PREG_OFFSET_CAPTURE);
				if(!$matches){
					$return["status"] = -1;
				}
				$pattern = '/^.{8,}/';
				preg_match($pattern, $password, $matches, PREG_OFFSET_CAPTURE);
				if(!$matches){
					$return["status"] = -1;
				}
				if($password != $rpassword){
					$return["status"] = -1;
				}
				$pattern = '/^(7|8|9)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/';
				preg_match($pattern, $phonenumber, $matches, PREG_OFFSET_CAPTURE);
				if(!$matches){
					$return["status"] = -1;
				}
				$pattern = '/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/';
				preg_match($pattern, $dob, $matches, PREG_OFFSET_CAPTURE);
				if(!$matches){
					$return["status"] = -1;
				}
				if(isset($return["status"])){
					echo json_encode($return);
					exit;
				}
			}

			else{
				$return["status"] = -1;
				echo json_encode($return);
				exit;
			}
			
			$query = "SELECT usnid from profile WHERE email='{$email}'";
			$result = mysqli_query($connection, $query);
			$row = mysqli_fetch_assoc($result);
			if($row){ 
				$return["status"] = -2;
	  			echo json_encode($return);
	  			exit;
			}
			$query = "SELECT usnid from profile WHERE phone={$phonenumber}";
			$result = mysqli_query($connection, $query);
			$row = mysqli_fetch_assoc($result);
			if($row){ 
				$return["status"] = -2;
	  			echo json_encode($return);
	  			exit;
			}

			//Set the status in credentials to be 1
			
			$query = "UPDATE credentials set status=1 WHERE usnid='{$usnid}'";
			$result = mysqli_query($connection, $query);
			
			//write code for insertion into faculty and student profile tables
			if($_SESSION["checkpoint"][3] != 0){
				//Insert into student profile
				$year = injection_ready($_POST["year"]);
				$section = injection_ready($_POST["section"]);
				$query = "INSERT into profile values('{$usnid}','{$username}','{$email}','{$dob}',{$phonenumber},'$sex',{$year},'{$section}')";
				$result = mysqli_query($connection, $query);
				confirm_query($result);
				$query = "UPDATE credentials set passwd='{$password}' WHERE usnid='{$usnid}'";
				$result = mysqli_query($connection, $query);
				confirm_query($result);
			}
			else if($_SESSION["checkpoint"][3] == 0){
				//Insert into faculty profile
				$query = "INSERT into f_profile values('{$usnid}','{$username}','{$email}','{$dob}',{$phonenumber},'{$sex}')";
				$result = mysqli_query($connection, $query);
				confirm_query($result);
				$query = "UPDATE credentials set passwd='{$password}' WHERE usnid='{$usnid}'";
				$result = mysqli_query($connection, $query);
				confirm_query($result);
			}
			$query = "INSERT into lognoti(usnid) values('{$usnid}')";
			$result = mysqli_query($connection, $query);
			$_SESSION["checkpoint"] = null;//unset all the cookies used for checkpoint 
			setcookie("checkpoint",null,time()-36000000000);
			$query = "UPDATE lognoti set ltime = now() where usnid = '{$usnid}'";
			$result = mysqli_query($connection, $query);
			$query = "SELECT name from profile where usnid = '{$usnid}'";
			$result = mysqli_query($connection,$query);
			$row = mysqli_fetch_assoc($result);
			aSuccesfullLogin($usnid,$row["name"]);//set all the cookies necessary to access the localhost/home.php*/ 
			$return["status"] = 2; 
			echo json_encode($return);
			exit;
}
	
	if ($_POST["input"] == "Proceed"){

		$email = injection_ready($_POST["email"]);
		$query = "SELECT usnid from profile WHERE email='{$email}'";
		$result = mysqli_query($connection, $query);
		$row = mysqli_fetch_assoc($result);	
		if(!$row){ 
				$return["status"] = -1;
	  			echo json_encode($return);
	  			exit;
		}
		//if the email exists 
		$query = "SELECT usnid from profile where email='{$email}'";
		$result = mysqli_query($connection, $query);
		$row = mysqli_fetch_assoc($result);	
		$usn = $row["usnid"];
		$u1 = $usn["3"];
		$u2 = $usn["4"];
		$u3 = $usn["5"].$usn["6"];
		$u4 = $usn["7"];
		$u5 = $usn["8"];
		$u6 = $usn["9"];
		$urlform = "";
		//Add the year after random 3 characters year=[4][3]

		for($i=1;$i<=9;$i++){
			$urlform = $urlform.rand(0,9);
		}
		$urlform = $urlform.$u2;
		

		//$key1 at [5] for adding the USNNO[3]
		$key1 = rand(4,9);
		$urlform = $urlform.$key1;
		for($i=1;$i<=$key1;$i++){
			$urlform = $urlform.rand(0,9);
		}
		$urlform = $urlform.$u6;

		//$key2 at [5]+$key1+1+1
		$key2 = rand(4,9);
		$urlform = $urlform.$key2;
		for($i=1;$i<=$key2;$i++){
			$urlform = $urlform.rand(0,9);
		}
		$urlform = $urlform.$u5;

		//$key3 at ([5]+$key1+1+1)+($key2+1+1)
		$key3 = rand(4,9);
		$urlform = $urlform.$key3;
		for($i=1;$i<=$key3;$i++){
			$urlform = $urlform.rand(0,9);
		}
		$urlform = $urlform.$u4;

		//$key4 at ([5]+$key1+1)+($key2+1+1)+($key3+1+1)
		$key4 = rand(4,9);
		$urlform = $urlform.$key4;
		for($i=1;$i<=$key4;$i++){
		$urlform = $urlform.rand(0,9);
}
$urlform = $urlform.$u3;

$key5 = rand(4,9);
$urlform = $urlform.$key5;
for($i=1;$i<=$key5;$i++){
	$urlform = $urlform.rand(0,9);
}
$urlform = $urlform.$u1;
		//autogenerate algorithms for forget password link 

		//Send the message through the SMTP server

		$subject = "Forget Password - Team Technoholix !";
		$message = '<html>
		<head>
		<style>
		#emailbody{
			font-family: Georgia, "Times New Roman", Times, serif;
			font-size: 23px;
		}

		.container{
			position: relative;
			text-align: center;
		}
		.submit {
		    appearance: button;
		    display:inline-block;
			color: rgb(30, 205, 151);
		    cursor: pointer;
			height: 60px;
		    letter-spacing: 2px;
		    width: 250px;
		    perspective-origin: 125px 35px;
		    transform-origin: 125px 35px;
		    background: white;
		    border: 2px solid rgb(30, 205, 151);
		    border-radius: 40px 40px 40px 40px;
		    font: normal normal normal normal 22px/normal Montserrat, sans-serif;
			font-size:22px;
		    margin: 1px 2.796875px;
		    outline: rgb(30, 205, 151) none 0px;
		    padding: 0px;
		    transition: background-color 0.3s ease 0s, color 0.3s ease 0s, width 0.3s ease 0s, border-width 0.3s ease 0s, border-color 0.3s ease 0s;
		}
		.submit:hover {
		   background-color:rgb(30, 205, 151);
			color:white;
		}
		}.submit:active {
		    position:relative;
		    bottom:2px;
		}

		</style>
		</head>
		<body>
		<div id="emailbody">
		<div class="container">
				<img src="http://www.technoholix-bit.com/public/images/logo.png"></img>
		</div>
		Hi there,<br/><br/>
		Someone recently requested a password change for your Technoholix account.<br/>If this was you, you can set a new password.
		<br/><br/><br/>
		<div class="container">
				<a href='.$urlform.'><input type="button" name="input" id="guest" value="Reset Password" class="submit"></a>
		</div><br/>
		If you dont want to change your password or didnt request this, just ignore and delete this message.<br/>
		To keep your account secure, please dont forward this email to anyone.<br/>
		Thanks!<br/><br/>
		Team Technoholix
		</div>
		</body>
		</html>';
		$from = "support@technoholix-bit.com";
		$headers = "From: " . strip_tags($from) . "\r\n";
		$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		//mail($email,$subject,$message,$headers);
		$return["status"] = 0;
		echo json_encode($return);
		exit;
		//email:technoholixbit@yahoo.com and password:noman.ORG1234
		
	}

	
	


	redirect_to("index.php");
	
?>