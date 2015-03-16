$(window).load(function() {
	/** basic proces */
	$(".loader").fadeOut("slow");
	$( "#signUpBox" ).fadeTo( "slow", 0.1 );
	$( "#signUpBox" ).hide(600);
	$("#forgotten").hide();
	$( "#signUpBox" ).fadeTo( "fast", 0.1 );
  var flag = 0;

/*this disables right click on the entire document !! and also disables the control shift !!
	$("html").bind("contextmenu",function(){
       return false;
    });

    $(document).keyup(function(evtobj) {     
	    if (!(evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey)){
	    	if (evtobj.keyCode == 16) {return false;}
	        if (evtobj.keyCode == 17) {return false;}
	    }
	});
*/

window.setInterval(function(){
var rdata = {
      "input": "Check"
    };
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "verify.php?", 
      data: rdata,
        success: function(data) {
          	if(data["status"] == 1){
                  window.location="http://localhost/home.php";
              }
        },
        error: function(jqXHR, textStatus, errorThrown) {
      alert("Security Breach Alert !!");
    }
    });
}, 3000);

//This removes the option from the dropdown menu for 3rd and 4th year students
$( "#signup-year" ).click(function() {
if($( "#signup-year" ).val()==3 || $( "#signup-year" ).val()==4){
	$("option[value='C']").remove();
}
else if($("#signup-section option[value='C']").length < 1){
	$("#signup-section").append('<option value="C">Section C</option>');
}
});

//Validates the signin form

var validid = new LiveValidation( "userid", { validMessage: " ", wait: 500 } );
	validid.add( Validate.Presence, 
              { failureMessage: "UserID is required !!" } );
	validid.add( Validate.Format, 
              { pattern: /(^1BI(00|12|13|14)CS[0-5][0-9][0-9]$|^1GSA[0-9][0-9][0-9][0-9][0-9][0-9]$)/i, failureMessage: "Invalid UserID !!" } );
	var validloginpassword = new LiveValidation( "password", { validMessage: " ", wait: 500 } );
	validloginpassword.add( Validate.Presence, 
              { failureMessage: "Password cant be blank" } );
//Validates the signup form

var validname = new LiveValidation( "signup-name", { validMessage: "Your name seems right", wait: 500 } );
	validname.add( Validate.Presence, 
              { failureMessage: "Dont be shy to tell your name" } );
var validemail = new LiveValidation( "signup-email", { validMessage: "Your email is set !", wait: 500 } );
	validemail.add( Validate.Presence, 
              { failureMessage: "We need your email !!" } );
	validemail.add( Validate.Format, 
              { pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@(yahoo|gmail|live|outlook).(com|in)$/i, failureMessage: "Your email doesnt sound right !!" } );
var validpassword = new LiveValidation( "signup-password", { validMessage: "Nice Password", wait: 500 } );
	validpassword.add( Validate.Presence, 
              { failureMessage: "You cant keep a password as blank" } );
	validpassword.add( Validate.Format, 
              { pattern: /^.{8,}$/i, failureMessage: "Minimum of 8 characters" } );
var validphonenumber = new LiveValidation("signup-PhoneNumber", { validMessage: "We will get in touch with you on this !", wait: 500 } );
	validphonenumber.add( Validate.Presence, 
              { failureMessage: "We need your phone number !!" } );
	validphonenumber.add( Validate.Format, 
              { pattern: /^(7|8|9)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/i, failureMessage: "Please give a phone number " } );
var validrpassword = new LiveValidation("signup-rpassword", { validMessage: " ", wait: 500 } );
	validrpassword.add( Validate.Confirmation, { match: 'signup-password' } );
var validdate = new LiveValidation( "signup-dob", { validMessage: "We will happy birthday you on time", wait: 500 } );
	validdate.add( Validate.Presence, 
              { failureMessage: "When where you born ?" } );
	validdate.add( Validate.Format, 
              { pattern: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, failureMessage: "This isnt a valid date !!" } );
//validates the email validation form 
var validemailforgot = new LiveValidation( "email", { validMessage: " ", wait: 500 } );
	validemailforgot.add( Validate.Presence, 
              { failureMessage: "Give the registered emailID" } );
	validemailforgot.add( Validate.Format, 
              { pattern: /^\w+@(yahoo|gmail|live|outlook).(com|in)$/i, failureMessage: "Your email doesnt sound right !!" } );

$("#signUpBox").submit(function(e) {
	e.preventDefault();
	if($('#male').is(':checked')) { }
	if($('#female').is(':checked')) { }
	if($("#signup-human").val() < 9){
		alert("Sorry we dont serve the robots");
		return false;
	}
	var erdata = {
      "input": "Sign Up"
    };
    erdata = $(this).serialize()+ "&" + $.param(erdata);
	$.ajax({
      type: "POST",
      dataType: "json",
      url: "verify.php?", //Relative or absolute path to response.php file
      data: erdata,
      success: function(sudata) {
      	console.log(sudata);
 		if(sudata["status"] == -2){
 			alert("Phone/Email not unique !");
 			$("#signupalertmessagebox").html("<p>Your <b>EMAIL</b> or <b>PHONE NUMBER</b> isnt unique</p>");
 			$("#signup-password").val("");
 			$("#signup-rpassword").val("");
 		}
 		if(sudata["status"] == -1){
 			alert("Inappropriate Data");
 			$("#signupalertmessagebox").html("<p>Your data doesnt match with the criteria !</p>");
 			$("#signup-password").val("");
 			$("#signup-rpassword").val("");
 		}
 		if(sudata["status"] == 9){
 			alert("Image upload Error");
 			$("#signupalertmessagebox").html("<p>Provide an image less than 1Mb and JPG format</p>");
 			$("#signup-password").val("");
 			$("#signup-rpassword").val("");
 		}
 		if(sudata["status"] == 2){
 			window.location="http://localhost/home.php";
 		}
      },
      error: function(jqXHR, textStatus, errorThrown) {
			$("#signupalertmessagebox").html("<p>Your session has expired</p>");
			alert("You session has expired !");
 			window.location="http://localhost/index.php";
		}
    });

});


$("#signInBox").submit(function(e) {
	e.preventDefault();
  if (flag == 0){
    flag = 1;
	var rdata = {
      "input": "Login"
    };
    rdata = $(this).serialize()+ "&" + $.param(rdata);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "verify.php?", //Relative or absolute path to response.php file
      data: rdata,
      success: function(data) {
      	
      	if(data["fac"] == 1){
      		$("#signup-section,#signup-year").hide();
      	}
 		if(data["status"] == -2){
 			$("#alertmessagebox").html("<p>Sorry we dont know you !!</p>");
 			$("#password").val("");
 		}
 		if(data["status"] == -1){
 			$("#alertmessagebox").html("<p>Wrong Username / Password</p>");
 			$("#password").val("");
 		}
 		if(data["status"] == 0){
 			$( "#SignIn" ).hide();
 			var message = "<p>Hi there !!<br/><b>"+data["userid"]+"</b>, You are almost there !!</p>";
 			$("#checkpoint").html(message);
 			$( "#signInBox" ).hide(700);
			$( "#signUpBox" ).show(500);
			$( "#signUpBox" ).fadeTo( "slow", 1.0 );
			$( "#signInBox" ).fadeTo( "slow", 0.1 );
 		}
 		if(data["status"] == 2){
 			alert("Sucessful login");
 			window.location="http://localhost/home.php";
 		}
    flag = 0;
      },
      error: function(jqXHR, textStatus, errorThrown) {
			$("#alertmessagebox").html("<p>Please check your Internet Connection</p>");
 			$("#password").val("");
		}
    });
}
});






$("#forgotten").submit(function(e) {
	e.preventDefault();
	var rdata = {
      "input": "Proceed"
    };
    rdata = $(this).serialize()+ "&" + $.param(rdata);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "verify.php?", //Relative or absolute path to response.php file
      data: rdata,
      success: function(data) {
 		if(data["status"] == -1){
 			$("#forgottenconfirm").html("Sorry, no records found !!");
 		}
 		if(data["status"] == 0){
 			$("#forgottenconfirm").html("Check your mail now !!");
 			$(".container1").hide();
 			$("#emailoptions").show();
 		}
      },
      error: function(jqXHR, textStatus, errorThrown) {
			$("#forgottenconfirm").html("Please check your Internet Connection");
		}
    });

})
//THe transition when a user clicks on the guest button
	$("#guest").click(function(){
		alert("We are not accepting guest tickets for now !!! \nReach adminstrators of Technoholix Team for autopasswords of your USN")
		/*disabled because we arent ready
		$( "#signInBox" ).hide(700);
		$( "#signUpBox" ).show(500);
		$( "#signUpBox" ).fadeTo( "slow", 1.0 );
		$( "#signInBox" ).fadeTo( "slow", 0.1 );*/

	})
//The transition when a user clicks on the tak
    $("#SignIn").click(function(){
		$( "#signUpBox" ).hide(700);
		$( "#signInBox" ).show(500);
		$( "#signInBox" ).fadeTo( "fast", 1.0 );
		$( "#signUpBox" ).fadeTo( "slow", 0.1 );
	})

	$("#iForgot").click(function(){
		$("#signInBox" ).hide(400);
		$("#forgotten").show(400);
		$( "#forgotten" ).fadeTo( "fast", 1.0 );
		$( "#signInBox" ).fadeTo( "slow", 0.1 );
	})
	$("#SignIn2").click(function(){
		$("#forgotten").hide(500);
		$("#signInBox" ).show(500);
		$( "#signInBox" ).fadeTo( "fast", 1.0 );
		$( "#forgotten" ).fadeTo( "slow", 0.1 );
	})
//this code handles the response request cycle of contact the admin thru ajax calls 
	$("#pform").submit(function(e)
	{
	var rdata = {
      "input": "Contact Us"
    };
    rdata = $(this).serialize()+ "&" + $.param(rdata);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "verify.php?", //Relative or absolute path to response.php file
      data: rdata,
      success: function(data) {
      	console.log(data);
			$("#pname,#pemail,#pmsg,#psubmit").hide();
			$('#palert').text("We have heard from you !! If your problem doesnt get resolved in 24hrs Contact tathagatnawadia1234@yahoo");
      },
      error: function(jqXHR, textStatus, errorThrown) {
			alert("Something went wrong !!");
		}
    });
    e.preventDefault();
	
   //STOP default action
	});
})

//this is for the popup email box !!!!
function check_empty() {
if (document.getElementById('pname').value == "" || document.getElementById('pemail').value == "" || document.getElementById('pmsg').value == "") {
alert("Fill All Fields !");
} 
}
//Function To Display Popup
function div_show() {
document.getElementById('abc').style.display = "block";
}
//Function To Check Target Element
function check(e) {
var target = (e && e.target) || (event && event.srcElement);
var obj = document.getElementById('abc');
var obj2 = document.getElementById('popup');
checkParent(target) ? obj.style.display = 'none' : null;
target == obj2 ? obj.style.display = 'block' : null;
}
//Function To Check Parent Node And Return Result Accordingly
function checkParent(t) {
while (t.parentNode) {
if (t == document.getElementById('abc')) {
return false
} else if (t == document.getElementById('close')) {
return true
}
t = t.parentNode
}
return true
}
