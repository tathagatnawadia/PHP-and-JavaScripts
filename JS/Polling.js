$(window).load(function(){ 
    //setTimeout(function() { $("#ajaxloader").fadeOut("slow"); }, 5000);
    $("#ajaxloader").fadeOut("slow");
	skrollr.init({
		smoothScrolling: false,
		mobileDeceleration: 0.004
	});
	$( '#jms-slideshow' ).jmslideshow();
  $( ".shoutoutcontainer" ).fadeTo( "fast", 0.1);
  $(".shoutoutcontainer").hide();
  $(".loadedcontent").hide();
  var i;//for looping !!
  var numclick = 0,flag=0,reflag=1;//gets the number of clicks on notification
    //This will zoom out/in depending on the screen resolution 
  var width = $(window).width(), height = $(window).height();
	if ((width < 1300) && (height < 850)) {
		if ((width < 1100) && (height < 850)){//Lowest possible at 1024x768	
			$("html,body").css("zoom","0.87");
		}
		else{//Just after that 1280x800
			$("html,body").css("zoom","0.98");
		}
	}
	if ((width > 1700) && (height > 850)) {//Highest Possible support 1920x1080
	$("html,body").css("zoom","1.2");
	}

	if ((width < 1300) && (height > 900)) {//A mid support of 1280x1024
	$("html,body").css("zoom","0.95");
	}
  var idata = {
    "input": "InitialShout"
          };

  $.ajax({
      type: "POST",
      dataType: "json",
      url: "worker.php?", 
      data: idata,
        success: function(data) {
          if (typeof data["status"] != 'undefined') {
                  alert("Please Log in to continue !!");
                  window.location="http://localhost/home.php";
          }
          var newcon = data.length-1;
          if(newcon>=0){
          for(i=newcon;i>=0;i--){
            var theauthor = data[i].name;
            var year = data[i].year;
            var m = data[i].shout;
			
            m = m.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			m = replacelinks(m);
            m = m.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>");
            m = m.replace(/(^|\s)(@[a-z\d-]+)/ig, "$1<span class='refr_tag'>$2</span>");
            m = replaceEmoticons(m);
            var imageurl = "";
            var timeastring = data[i].stime;
            var z = timeastring[4]+timeastring[5] + " " + timeastring[0]+timeastring[1]+timeastring[2];
            var t = timeastring[7]+timeastring[8]+timeastring[9]+timeastring[10]+timeastring[11]+timeastring[12]+timeastring[13]+timeastring[14];
            var shoutmessage = '<div class="shoutbox"><time class="shouttime"><span>';
            shoutmessage = shoutmessage + z + '</span> <span>'
            shoutmessage = shoutmessage + t + '</span></time><div class="shoutsemester year' + year + '"><span>';
            shoutmessage = shoutmessage + year + '</span></div><div class="shoutimage"><img src="';
            shoutmessage = shoutmessage + imageurl + '" ></div><div class="shoutbody"><span id="authord">';
            shoutmessage = shoutmessage + theauthor + ' : </span>';
            shoutmessage = shoutmessage + m + '</div></div>';
             if(m!=''){
                 $(shoutmessage).insertAfter("#spacerror1");
             }

            }
            $('html, body').animate({
            scrollTop: $('.shoutoutcontainer').offset().top //.content moves to the content class 
        }, 'slow');
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
      alert("Please check your internet connection");
    }
    });

	/*This disables the right click on the entire document
	$("html").bind("contextmenu",function(){
       return false;
    });

   

	/**This just moves to the specific anchor tag on a page reload 
	and it doesnt apply to the homepage it applies to the other pages where the user has to work on the contents of the page**

	$('html, body').animate({
        scrollTop: $('.content').offset().top //.content moves to the content class 
    }, 'slow');

*/

/*this is an invoker for the colorbox video ... you can also add iframe from colorbox*/
$(".youtube").colorbox({iframe:true, innerWidth:1000, innerHeight:500});
$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});//iframe supports on screen pdf
$(".inline").colorbox({inline:true, width:"50%"});//inline triggering triggers notifications

	//this is for the scroll fixing the header after 500 or just hit a lucky number
	$(window).scroll(function(){
  			var sticky = $('.sticky'),
      	scroll = $(window).scrollTop();


 			if (scroll >= 690) {
          sticky.addClass('fixed');
          
          $( ".chatinput" ).fadeIn(2000);
          //$( "body" ).off( "click", "#notificationLink");
 		  }
  		else {
          $("#notificationContainer").fadeOut(100);
          sticky.removeClass('fixed');
          // $("#notificationLink").on("click");
          $( ".chatinput" ).fadeOut("slow");
  		}

      isOnView = isElementVisible("#spacerror2");
       if(isOnView && ($(".shoutoutcontainer").css('display') == 'block') && (flag==0)){
        flag=1;
         shoutengine(upsid,downsid,1);
       }
	});


	/**This is the code for smooth scrolling to the top of page **/

	var hashTagActive = "";
    $(".scroll").click(function (event) {
        if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html,body').animate({
                scrollTop: dest
            }, 1000, 'swing');
        }
    });

  //this will ajax the developer areas
   $("#devs").click(function(){
   		callajax("devs.php");
	});

  //Events ajax section
   $("#event-python").click(function(){
   		callajax("events/python.php");
	});

   $("#event-web").click(function(){
   		callajax("events/web.php");
	});
    $("#event-android").click(function(){
      callajax("events/androzign.php");
  });

   $("#event-html5").click(function(){
   		callajax("events/html5.php");
	});
  //Faculty ajax section
   $("#facultyspeak").click(function(){
      alert("Faculty section coming right up !")
   });

   //Contest ajax section

   $("#contests").click(function(){
      callajax("contests.php");
   });

   //Geek life ajax section
   	$("#geeklife").click(function(){
      callajax("geeklife.php");
   });
    /**this shows the form for the shoutout button **/
    $("#shoutout").click(function(){
        $(".shoutoutcontainer").show();
        $( ".shoutoutcontainer" ).fadeTo( "slow", 1.0 );
        $( ".newsfeedcontainer" ).fadeTo( "slow", 0.5);
    	  $(".newsfeedcontainer").hide();
    	  $( ".loadedcontent" ).fadeTo( "slow", 0.5 );
        $(".loadedcontent").hide();
    	  $( ".chatinput" ).fadeIn(2000);
        $('html, body').animate({
        scrollTop: $('.shoutoutcontainer').offset().top //.content moves to the content class 
    }, 'slow');

	});

	 $("#feed").click(function(){
	 	$(".loadedcontent").hide();
        $(".newsfeedcontainer").show();
         $( ".newsfeedcontainer" ).fadeTo( "slow", 1.0 );
         $( ".shoutoutcontainer" ).fadeTo( "slow", 0.5);
	 	$(".shoutoutcontainer").hide();
	 	$( ".loadedcontent" ).fadeTo( "slow", 0.5 );
        $(".loadedcontent").hide();
    	
        $('html, body').animate({
        scrollTop: $('.newsfeedcontainer').offset().top //.content moves to the content class 
    }, 'slow');
	});

//this locks the outer scroll when the user is doing an inner div scroll ... useful for notification
$('#colorbox').bind('mousewheel DOMMouseScroll', function(e) {
    var scrollTo = null;

    if (e.type == 'mousewheel') {
        scrollTo = (e.originalEvent.wheelDelta * -1);
    }
    else if (e.type == 'DOMMouseScroll') {
        scrollTo = 40 * e.originalEvent.detail;
    }

    if (scrollTo) {
        e.preventDefault();
        $(this).scrollTop(scrollTo + $(this).scrollTop());
    }
});

/**this sents an ajax request for shoutout server ... it also clears the input box .. and changes the div ... it also scrolls on top of shoutout**/
$(".shoutchat").keypress(function (e) {
    if(e.which == 13){
      var m = $(".shoutchat").val();
       $(".shoutchat").val('');
      if(m!=''){//the entire ajax works only when the value in the input box is not null
          var rdata = {
            "input": "PShout",
            "shout" : m
          }; 
          $.ajax({
            type: "POST",
            dataType: "json",
            url: "worker.php?", //Relative or absolute path to response.php file
            data: rdata,
              success: function(data) {
                if(data["status"] == -1){
                  alert("Please Log in to continue !!");
                  window.location="http://localhost/home.php";
                }
                if(data["status"] == 1){
                  $(".shoutchat").val('');
                }
              //shoutengine(upsid,downsid,0);
            },
            error: function(jqXHR, textStatus, errorThrown) {
            alert("OOPs ! Your Internet Connection doesnt seem to be working !!");
          }
          });
        }
      }                
});

window.setInterval(function(){
  if(reflag == 1){
    reflag = 0;
var rdata = {
      "input": "UShout",
      "u" : upsid
    };
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "worker.php?", 
      data: rdata,
        success: function(data) {
          if (typeof data["status"] != 'undefined') {
                  alert("Please Log in to continue !!");
                  window.location="http://localhost/home.php";
          }
          var newcon = data.length-1;
          if(newcon>=0){
          upsid = data[newcon].sid;
          for(i=0;i<=newcon;i++){
            var theauthor = data[i].name;
            var year = data[i].year;
            var m = data[i].shout;
           m = replacelinks(m);
            m = m.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>");
            m = m.replace(/(^|\s)(@[a-z\d-]+)/ig, "$1<span class='refr_tag'>$2</span>");
            m = replaceEmoticons(m);
            var imageurl = "";
            var timeastring = data[i].stime;
            var z = timeastring[4]+timeastring[5] + " " + timeastring[0]+timeastring[1]+timeastring[2];
            var t = timeastring[7]+timeastring[8]+timeastring[9]+timeastring[10]+timeastring[11]+timeastring[12]+timeastring[13]+timeastring[14];
            var shoutmessage = '<div class="shoutbox"><time class="shouttime"><span>';
            shoutmessage = shoutmessage + z + '</span> <span>'
            shoutmessage = shoutmessage + t + '</span></time><div class="shoutsemester year' + year + '"><span>';
            shoutmessage = shoutmessage + year + '</span></div><div class="shoutimage"><img src="';
            shoutmessage = shoutmessage + imageurl + '" ></div><div class="shoutbody"><span id="authord">';
            shoutmessage = shoutmessage + theauthor + ' : </span>';
            shoutmessage = shoutmessage + m + '</div></div>';
             if(m!=''){
                 $(shoutmessage).insertAfter("#spacerror1");
             }

            }
            $('#chatAudio')[0].play();
            $('html, body').animate({
            scrollTop: $('.shoutoutcontainer').offset().top //.content moves to the content class 
        }, 'slow'); 
          }
          reflag = 1;
        },
        error: function(jqXHR, textStatus, errorThrown) {
      alert("Please check your internet connection");
      reflag = 1;
    }
    });
}
}, 2000);
function shoutengine(seu,sed,control){
  if(control == 0){
    var rdata = {
      "input": "UShout",
      "u" : seu
    };
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "worker.php?", 
      data: rdata,
        success: function(data) {
          if (typeof data["status"] != 'undefined') {
                  alert("Please Log in to continue !!");
                  window.location="http://localhost/home.php";
          }
          var newcon = data.length-1;
          if(newcon>=0){
          upsid = data[newcon].sid;
          for(i=0;i<=newcon;i++){
            var theauthor = data[i].name;
            var year = data[i].year;
            var m = data[i].shout;
            m = m.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			  m = replacelinks(m);
            m = m.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>");
            m = m.replace(/(^|\s)(@[a-z\d-]+)/ig, "$1<span class='refr_tag'>$2</span>");
            m = replaceEmoticons(m);
            var imageurl = "";
            var timeastring = data[i].stime;
            var z = timeastring[4]+timeastring[5] + " " + timeastring[0]+timeastring[1]+timeastring[2];
            var t = timeastring[7]+timeastring[8]+timeastring[9]+timeastring[10]+timeastring[11]+timeastring[12]+timeastring[13]+timeastring[14];
            var shoutmessage = '<div class="shoutbox"><time class="shouttime"><span>';
            shoutmessage = shoutmessage + z + '</span> <span>'
            shoutmessage = shoutmessage + t + '</span></time><div class="shoutsemester year' + year + '"><span>';
            shoutmessage = shoutmessage + year + '</span></div><div class="shoutimage"><img src="';
            shoutmessage = shoutmessage + imageurl + '" ></div><div class="shoutbody"><span id="authord">';
            shoutmessage = shoutmessage + theauthor + ' : </span>';
            shoutmessage = shoutmessage + m + '</div></div>';
             if(m!=''){
                 $(shoutmessage).insertAfter("#spacerror1");
             }

            }
            $('#chatAudio')[0].play();
            $('html, body').animate({
            scrollTop: $('.shoutoutcontainer').offset().top //.content moves to the content class 
        }, 'slow');
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
      alert("Please check your internet connection");
    }
    });    

  }
  else{
    var rdata = {
      "input": "LShout",
      "d" : sed
    };

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "worker.php?", 
      data: rdata,
        success: function(data) {
          if (typeof data["status"] != 'undefined') {
                  alert("Please Log in to continue !!");
                  window.location="http://localhost/home.php";
          }
          var newcon = data.length-1;
          console.log("The value below which shouts has to be loaded os " + sed);
          console.log(newcon);
          if(newcon>=0){
         downsid = data[newcon].sid;
          for(i=0;i<=newcon;i++){
            var theauthor = data[i].name;
            var year = data[i].year;
            var m = data[i].shout;
            m = m.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		  m = replacelinks(m);
            m = m.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>");
            m = m.replace(/(^|\s)(@[a-z\d-]+)/ig, "$1<span class='refr_tag'>$2</span>");
            m = replaceEmoticons(m);
            var imageurl = "";
            var timeastring = data[i].stime;
            var z = timeastring[4]+timeastring[5] + " " + timeastring[0]+timeastring[1]+timeastring[2];
            var t = timeastring[7]+timeastring[8]+timeastring[9]+timeastring[10]+timeastring[11]+timeastring[12]+timeastring[13]+timeastring[14];
            var shoutmessage = '<div class="shoutbox"><time class="shouttime"><span>';
            shoutmessage = shoutmessage + z + '</span> <span>'
            shoutmessage = shoutmessage + t + '</span></time><div class="shoutsemester year' + year + '"><span>';
            shoutmessage = shoutmessage + year + '</span></div><div class="shoutimage"><img src="';
            shoutmessage = shoutmessage + imageurl + '" ></div><div class="shoutbody"><span id="authord">';
            shoutmessage = shoutmessage + theauthor + ' : </span>';
            shoutmessage = shoutmessage + m + '</div></div>';
             if(m!=''){
                 $(shoutmessage).insertBefore("#spacerror2");
             }

            }
            flag=0;
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
      alert("Please check your internet connection");
    }
    });   

  }
}

//Standalone function to replace text into smileys 
                            function replaceEmoticons(text) {
                              var emoticons = {
                                        ':-)'  : '1f600.png',
                                        ':)'   : '1f600.png',
                                        ';)'   : '1f609.png',
                                        ':$'   : '263a.png',
                                        ':@'   : '1f621.png',
                                        ':o'   : '1f62e.png',
                                        ':O'   : '1f62e.png',
                                        ':('   : '1f614.png',
                                        ':P'   : '1f61b.png',
                                        ':/'   : '1f615.png',
                                        'xD'   : '1f602.png',
                                        'XD'   : '1f602.png',
                                        ':*'   : '1f618.png',
                                        ":'("  : '1f62d.png',
                                        ':D'   : '1f603.png'
                                    }, url = "http://abs.twimg.com/emoji/v1/72x72/";
                          // a simple regex to match the characters used in the emoticons
                          patterns = [],metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

                          // build a regex pattern for each defined property
                          for (var i in emoticons) {
                            if (emoticons.hasOwnProperty(i)){ // escape metacharacters
                              patterns.push('('+i.replace(metachars, "\\$&")+')');
                            }
                          }

                          // build the regular expression and replace
                          return text.replace(new RegExp(patterns.join('|'),'g'), function (match) {
                            return typeof emoticons[match] != 'undefined' ?
                                   '<img src="'+url+emoticons[match]+'" height="25" width="25"/>' :
                                   match;
                                });
                            }
function replacelinks(m){
	if(/(ftp|http|https):(\/\/[^ "]+)/ig.test(m)) {
		m = m.replace(/(ftp|http|https):(\/\/[^ "]+)/ig, "<a href='$2' target='_blank' class='ext_link'>$1$2</a>");
		return m;
}
if(/(ftp|http|https):(\/\/www\.[^ "]+\.[^ "]+)/ig.test(m)) {
		m = m.replace(/(ftp|http|https):(\/\/www\.[^ "]+\.[^ "]+)/ig, "<a href='$2' target='_blank' class='ext_link'>$1$2</a>");
		return m;
}
if(/(ftp|http|https):(\/\/www\.[^ "]+\.[^ "]+\/[^ "]+)/ig.test(m)) {
		m = m.replace(/(ftp|http|https):(\/\/www\.[^ "]+\.[^ "]+\/[^ "]+)/ig, "<a href='$2' target='_blank' class='ext_link'>$1$2</a>");
		return m;
}
if(/(www)(\.[^ "]+\.[^ "]+\/[^ "]+)/ig.test(m)) {
		m = m.replace(/^ *(www)(\.[^ "]+\.[^ "]+\/[^ "]+)/ig, "<a href='//$1$2' target='_blank' class='ext_link'>$1$2</a>");
		return m;
}
if(/(www)(\.[^ "]+\.[^ "]+)/ig.test(m)) {
		m = m.replace(/^ *(www)(\.[^ "]+\.[^ "]+)/ig, "<a href='//$1$2' target='_blank' class='ext_link'>$1$2</a>");
		return m;
}
if(/([^ "]+\.[^ "]+\/[^ "]+)/ig.test(m)) {
		m = m.replace(/([^ "]+\.[^ "]+\/[^ "]+)/ig, "<a href='//www.$1' target='_blank' class='ext_link'>$1</a>");
		return m;
}
if(/([^ "]+\.[^ "]+)/ig.test(m)) {
		m = m.replace(/([^ "]+\.[^ "]+)/ig, "<a href='//www.$1' target='_blank' class='ext_link'>$1</a>");
		return m;
}
	return m;
}

function isElementVisible(elementToBeChecked)
{
    var TopView = $(window).scrollTop();
    var BotView = TopView + $(window).height();
    var TopElement = $(elementToBeChecked).offset().top;
    var BotElement = TopElement + $(elementToBeChecked).height();
    return ((BotElement <= BotView) && (TopElement >= TopView));
}




  //To give random colors to the .contestbox
  var colors = ['rgb(213, 0, 7)', 'rgb(16, 90, 90)', 'orange','rgb(90, 13, 88)','#E30A92','rgb(46, 38, 63)','rgb(94, 131, 93)','rgb(56, 71, 180)','black','#00933B'];
  function newsColor(){
    return colors[Math.floor(Math.random() * colors.length)];
  }
  $('.newsbox').each(function() {
              $(this).css('background',newsColor());
  });

  //This is for the new notification click on button and also handle new notification in every 5 mins
  $("#notificationLink").click(function(){
    $("#notificationContainer").fadeToggle(300);
    if(numclick==0){

                var erdata = {
                  "input": "Update Notify"
                };
                erdata = $(this).serialize()+ "&" + $.param(erdata);
                $.ajax({
                type: "POST",
                dataType: "json",
                url: "worker.php?", //Relative or absolute path to response.php file
                data: erdata,
                success: function(sudata) {
                if(sudata["success"] == 1){
                     $("#nactivebox").fadeOut(100);
                   }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  alert("OOPs !! Something wrong with your connection ?")
              }
              });
    }
    numclick++;
    return false;
  });

    //Document Click hiding the popup 
    $(document).click(function(){
      $("#notificationContainer").fadeOut(300);
    });

    //Popup on click
    $("#notificationContainer").click(function(){
      return false;
    });

//IMPORTANT : this listens for any DOM changes in the shoutout container ... (whenever ajax loads extra content)

$(".shoutoutcontainer").bind("DOMSubtreeModified", function() {
  //This logs all the image width and height
    $('div.shoutimage img').each(function() {
      var Resol = (this.width/this.height)*100;
      if(Resol<85){
        $(this).css('width',"100%");
        $(this).css('height',"125%");
      }
      else if(Resol>115){
        $(this).css('height',"100%");
        $(this).css('width',"130%");
      }
    });
});


//$('.shoutoutcontainer').trigger('contentchanged');



});
//This is the ajax event which loads a page
function callajax(link){
   		$("#ajaxloader").show();
   	$( ".loadedcontent" ).load( link, function() {
		$("#ajaxloader").fadeOut("slow");
	});

   	 $(".loadedcontent").show();
   	 $( ".loadedcontent" ).fadeTo( "slow", 1.0 );
     $( ".shoutoutcontainer" ).fadeTo( "slow", 0.5 );
     $( ".newsfeedcontainer" ).fadeTo( "slow", 0.5);
     $(".newsfeedcontainer").hide();
     $(".shoutoutcontainer").hide();
    $('html, body').animate({
        scrollTop: $('.loadedcontent').offset().top //.content moves to the content class 
    }, 'slow');
   	}
  //