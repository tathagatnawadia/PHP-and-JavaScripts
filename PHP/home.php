<?php require_once("./includes/session.php"); ?>
<?php require_once("./includes/db_connection.php"); ?>
<?php require_once("./includes/functions.php"); ?>
<?php
//here we do some session management so that we maintain a signin session
if(!isset($_COOKIE["cryptlogin"]) || !isset($_SESSION["cryptlogin"]) || !isset($_SESSION["cryptusername"]) || !isset($_SESSION["cryptname"])){
  redirect_to("index.php");
}
?>

<?php include("/includes/commons/head-technoholix.php");
    include("/includes/commons/menu-gallery-technoholix.php");
?>
<audio id="chatAudio"><source src="/public/notify.mp3" type="audio/mpeg"></audio>
<div id="ajaxloader">
</div>
<!-------------------------------------------------SHOUTOUT------------------------------------------------- -->
<div class="shoutoutcontainer">
<div id="spacerror1"><br/><br/><br/><br/><br/><br/></div>

<div class="shoutbox">
      <time class="shouttime"><span>Welcome</span> <span>Pinned</span></time>
    <div class="shoutsemester year3"><span>3</span></div>
      <div class="shoutimage"><img src="" style="max-width:150%; max-height:150%;"></div>
      <div class="shoutbody"><b><span id="authord">Tathagat Nawadia : </span>Guys !! Welcome to Technoholix ... You can chat in this area .. with a maximum of 180 characters :D :D :P :$ xD :P :) :( :'( :/ :* ;) :@ :o</div></b>
    </div> 
<?php 
$query = "SELECT s.sid,p.name,s.shout,date_format(s.stime,'%b %d %h:%i %p') as stime,p.year from profile p,shoutout s where p.usnid=s.usnid order by s.sid desc LIMIT 30";
$result = mysqli_query($connection, $query);
$counter=0;
while($userdata = mysqli_fetch_assoc($result)) {
  if($counter == 0){
    echo "<script>upsid=".$userdata["sid"].";console.log(upsid);</script>";
  }
  $counter++;
  if($counter==mysqli_num_rows($result)){
    echo "<script>downsid=".$userdata["sid"].";console.log(downsid);</script>";
  }

  }
?> 

<div id="spacerror2"></div>
  <div class="chatinput">
      <input type="text" name="shoutchat" id="shoutchat" class="shoutchat" placeholder="Shout Now :)" spellcheck="false" maxlength="180" autofocus/>
  </div>
</div>



<!-------------------------------------------------NEWSFEED------------------------------------------------- -->
    <div class="newsfeedcontainer">
    <br/><br/><br/><br/>
    
    <div class="newsbox">
    <div class="newsimage"><img src="http://o.aolcdn.com/hss/storage/midas/2fc2a6adb62964e71de31134fcd9172c/200861453/Roku_Settings_ScreenMirroring_Enable1.jpg"/></div>
    <div class="newsbody">
    	<h>Roku tries out screen mirroring from phones and PCs</h><hr/>
	    <article>Roku has unveiled its latest shot in the increasingly-crowded set-top box wars: screen mirroring. Even Microsoft and Firefox OS are lining up to challenge Google's Chromecast and Apple's AirPlay, so Roku had to compete somehow. Launching in beta, Roku's version of the tech works from (some) Android, Windows Phone and Windows 8.1 devices, and broadcasts to Roku 3 or the Roku Streaming Stick. There's no mention of the word 'Miracast' but that appears to be the tech in use. If your Roku has the latest update (rolling out over the next few weeks) it should show up as an option to pair, and have a connection good enough to display presentations, emails or even video</article>
    </div>
    </div><br/>
    <div class="newsbox">
      <div class="newsimage"><img src="http://o.aolcdn.com/hss/storage/midas/34caaa900930da64a4aa83a3b7c785b5/200868345/ativ.jpg"/></div>
      <div class="newsbody">
      	<h>Microsoft sues Samsung for the interest on its $1 billion+ patent payment</h><hr/>
      	<article>Microsoft had over a billion reasons (per year) to pursue a patent licensing deal with Samsung back in 2011 over the latter's use of Android. That fact is laid bare by a lawsuit today over the interest on payments (based on the number of Android devices sold) that are supposed to flow from Korea to Redmond. Re/code posted the unsealed lawsuit this evening, showing how despite the existing deal, Microsoft's purchase of Nokia last year lead to Samsung holding up its payment for the second fiscal year of the deal, and then refusing to pay interest on it. All of that is according to Microsoft, which also claims Samsung is threatening to hold off on paying its end for the third year of the seven-year deal. The documents reveal Microsoft's patent licenses cover some 80 percent of the Android phones sold in the US (up from 70 percent in 2012), and that the deal includes provisions for Samsung to lower the amount owed by developing and marketing Windows phones and tablets, and for Microsoft's use of Samsung patents. The amount in question? A paltry $6.9 million, although a decision on whether the deal will remain in force going forward is clearly worth more than that.</article>
      </div>
    </div><br/>
    <div class="newsbox">
      <div class="newsimage"><img src="http://o.aolcdn.com/hss/storage/midas/d9b78036a351acd661ed3dc368a96dd7/200853391/apple-activation-lock-status-2014-10-02-01.jpg"/></div>
      <div class="newsbody">
      <h>Apple's new iCloud tool can show if a used iPhone is stolen</h><hr/>
      <article>The market for used iPhones is fraught with risk, because you may end up paying hundreds of dollars for a locked off device, or worse -- one that appears legit but can't make calls. However, Apple has just revealed an iCloud tool that lets you check a device's activation lock status. All you'll need is the iPhone's IMEI or serial number, and if you're the rightful owner, you'll get info on how to disable any activation locks before selling. Meanwhile, buyers will be shown how to remove the previous account (with the seller's permission). The tool will be particularly useful at sussing out "doulCi" devices, which bypass iCloud to enable activation but won't actually connect to a cell network. That'll prevent you from being fooled by a stolen or lost iPhone that appears to work, but is effectively... an iPod.</article>
      </div>
    </div><br/>
    <div class="newsbox">
      <div class="newsimage"><img src="http://o.aolcdn.com/hss/storage/midas/bec350c4c10bd6a435429ff1a1aed56b/200867121/lamborghini-asterian-2014-10-03-01.jpg"/></div>
      <div class="newsbody">
      	<h>Lamborghini's 910HP plug-in hybrid goes 30 miles on a charge (hands-on)</h><hr/>
	    <article>Lamborghini knows what you want -- ridiculous, excessive power. But hey, if you need to pick up some groceries, the Italian automaker can do that too. We just got a look at the concept car that proves it, the Lamborghini Asterion, at the Paris Auto Show. It can run in three modes: the first two use either the rear-drive 610HP V10 gas engine or "eco-friendly" 300HP front-drive electric motor system. And if you really need those groceries now, both can join forces to bring an unholy 910 combined horsepower. For those times when you'll settle for 300HP on the battery alone, you can even drive it up to 30 miles if you charge it up using the plug-in mode.Lamborghini told us that it has packed in a lot of tech concepts that it might bring later in production cars. For example, the dual electric motors are front drive -- rather bizarre on a Lambo -- so they can provide torque vector steering, useful on a high-powered vehicle. It also looks decidedly different from current models, with a curved rear section that resembles a vintage Lamborghini Miura. The Asterion even has more interior space thanks to a higher profile than, say, the Aventador. Unfortunately, it's strictly a (fully functioning) concept car that'll never reach the market, so don't sell off that Hurrican yet</article>
      </div>
    </div><br/>
    <div class="newsbox" style="display:none">
      <div class="newsimage"><img src=""/></div>
      <div class="newsbody">
      	<h></h><hr/>
	    <article></article>
      </div>
    </div><br/>
  
    </div>
<!-------------------------------------------------LOADEDCONTENT------------------------------------------------- -->
    <div class="loadedcontent">
    </div>
<!--Reusable footer -->
<div id="fixedsocial">
    <a href="https://www.facebook.com/sharer/sharer.php?u=www.technoholix-bit.com" target="_blank"><div class="facebookflat"></div></a>
    <a href="https://plus.google.com/share?url=http://technoholix-bit.com/" target="_blank"><div class="googleflat"></div></a>
    <a href="https://twitter.com/home?status=Club%20Technoholix%20@%20http://technoholix-bit.com/" target="_blank"><div class="twitterflat"></div> 
</div>
    <div class="copyright">
    	<div class="social">
			<a href="https://www.facebook.com/technoholixbitcse" target="_blank"><div class="soc" id="soc1">&nbsp;</div></a>
			<a href="https://twitter.com/ClubTechnoholix" target="_blank"><div class="soc" id="soc2">&nbsp;</div></a>
			<a href="https://twitter.com/ClubTechnoholix" target="_blank"><div class="soc" id="soc3">&nbsp;</div></a>
		</div><br/><br/>
    	&copy;Copyright with Developers 2014
    </div>
</body>
</html>