// TODO: timer stops at 0 and goes into Break mode

var workingTime = 25 * 60;
var breakTime = 5 * 60;
var currentTime = workingTime;
var myTimerId;
var currentMode = 'work';  // can be either 'work' or 'break'

$(function() {
  $('#play-pause').click(function() {
    if(myTimerId) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  $('#reset').click(function() {
    pauseTimer();
    resetTimer();
  });

  $('#incWorkingTime').click(function() {
    increaseWorkingTime();
  });

  $('#decWorkingTime').click(function() {
    decreaseWorkingTime();
  });

  $('#incBreakTime').click(function() {
    increaseBreakTime();
  });

  $('#decBreakTime').click(function() {
    decreaseBreakTime();
  });

});

function startTimer() {
  myTimerId = window.setInterval(function() {
    updateTime();
    updateDisplay();
  }, 1000);

  updatePlayPause();
}

function updateTime() {
  if(currentTime > 0) {
    currentTime--;
  } else {
  if(!myTimerId) return false;

  // time is over
  if(currentMode === 'work') {
    currentTime = breakTime;
    currentMode = 'break';
  } else if(currentMode === 'break') {
    currentTime = workingTime;
    currentMode = 'work';
  }

  updateDisplay();  
  pauseTimer();

  }
}

function pauseTimer() {
  clearTimeout(myTimerId);
  myTimerId = undefined;

  updatePlayPause();
}

function updatePlayPause() {
  if(myTimerId) {
    $('#play-pause').html('pause');
  } else {
    $('#play-pause').html('play');
  }
}

function updateDisplay() {
  var formattedTime = formatTime(currentTime);
  $('#timer-text').html(formattedTime);
}

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
}

function resetTimer() {
  currentTime = workingTime;  
  updateDisplay();
}

function changeWorkingTime(increase) {
  // update the working time
  if(increase === 1) {
    workingTime += 60;
  } else {
    if(workingTime > 60) workingTime -= 60;
  } 
  
  // change the display
  var myText = 'working time | ' + (workingTime / 60);
  $('#working-text').text(myText);
}

function increaseWorkingTime() {
  changeWorkingTime(1);
}

function decreaseWorkingTime() {
  changeWorkingTime(-1);
}

function changeBreakTime(increase) {
  // update the break time
  if(increase === 1) {
    breakTime += 60;
  } else {
    if(breakTime > 60) breakTime -= 60;
  } 
  
  // change the display
  var myText = 'break time | ' + (breakTime / 60);
  $('#break-text').text(myText); 
}

function increaseBreakTime() {
  changeBreakTime(1);
}

function decreaseBreakTime() {
  changeBreakTime(-1);
}
