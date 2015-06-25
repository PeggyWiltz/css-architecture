$(document).ready(function() {

  $("#player__video").addClass('paused');
  $("#player__video").addClass('unmuted');
  
  $('#player__button--play').click(function() {
    var player = $("#player__video");
    var playBtn = $('#player__button--play');
    
    if (player.hasClass('paused')) {
      player.removeClass('paused');
      player[0].play();
      player.addClass('playing');
      playBtn.html('Pause');
    } else {
      player.removeClass('playing');
      player[0].pause();
      player.addClass('paused');
      playBtn.html('Play');
    }
  });
  
   $('#player__button--mute').click(function() {
     var player = $("#player__video");
      var muteBtn = $('#player__button--mute');
    
    if (player.hasClass('muted')) {
      player.removeClass('muted');
      player.prop('muted', false); 
      player.addClass('unmuted');
      muteBtn.html('Mute');
    } else {
      player.removeClass('unmuted');
      player.prop('muted', true); 
      player.addClass('muted');
      muteBtn.html('Unmute');
    }
  });
  
   //***************************************************
/*    Given a <video> element with an id of ‘v':

<progress id='p' max='100' value='0'><span>0</span>% played</progress>
Use this JavaScript:

var video = document.getElementById('v');
var pBar = document.getElementById('p');
video.addEventListener('timeupdate', function() {
  var percent = Math.floor((100 / video.duration) * video.currentTime);
  pBar.value = percent;
  pBar.getElementsByTagName('span')[0].innerHTML = percent;
}, false);
The JavaScript uses the timeupdate event, which is constantly triggered as the video is being played. 
The value is converted into a percentage value using the video’s duration 
(full length) and currentTime (where in the video it currently is). */
   //****************************************************
  $("#player__video").prop('muted', true); //mute
  
  $("#player__video").prop('muted', false); //unmute
  
  
});