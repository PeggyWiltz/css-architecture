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
  
$('#player__video').on('timeupdate', function() {
    var video = $('#player__video');
    
    var currentPos = video[0].currentTime; 
    var maxduration = video[0].duration; 
    
    var percentage = 100 * (currentPos  / maxduration); 
    $('#player__button--progress').css('width', percentage+'%');
});
  
});