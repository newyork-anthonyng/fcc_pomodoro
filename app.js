// TODO: timer stops at 0 and goes into Break mode
// TODO: change the name of the play/pause button

var currentTime = 25 * 60;
var myTimerId;

$(function() {
  $('#play-pause').click(function() {
    if(myTimerId) {
      pauseTimer();
    } else {
      startTimer();
    }
  });


});

function startTimer() {
  console.log('start timer');
  myTimerId = window.setInterval(function() {
    currentTime--;
    updateDisplay();
  }, 1000);

  updatePlayPause();
};

function pauseTimer() {
  console.log('pause timer');
  clearTimeout(myTimerId);
  myTimerId = undefined;

  updatePlayPause();
};

function updatePlayPause() {
  if(myTimerId) {
    $('#play-pause').html('pause');
  } else {
    $('#play-pause').html('play');
  }
};

function updateDisplay() {
  var formattedTime = formatTime(currentTime);
  $('#timer-text').html(formattedTime);
};

function formatTime(time) {
  var minutes = String(parseInt(time / 60));
  if(minutes.length < 2) {
    minutes = '0' + minutes;
  }

  var seconds = String(parseInt(time % 60));
  if(seconds.length < 2) {
    seconds = '0' + seconds;
  }

  return minutes + ':' + seconds;
};
