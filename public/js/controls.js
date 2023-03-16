const audioFileUpload = document.getElementById('audioFileUpload');
const bg = document.getElementById('bgSelect');

function triggerPlayState(){
  if(audio1.src === '') audio1.src = filepath;

  if(playing){
    audio1.play();
    document.getElementById('playState').style.display = 'none';
    document.getElementById('audioContainer').style.display = 'flex';
  } 
  else {
    audio1.pause()
  };
  playStop();
  const audioFileInput = document.getElementById('audioFileUpload');
  const audioFileBtn = document.getElementById('songSelectLabel');
  audioFileInput.setAttribute('disabled', true);
  audioFileBtn.style.opacity = '0.3';
}

function hideControlPanel(){
  document.getElementById('controlPanel').style.transform = 'translateX(-100%)';
}

// Events
audio1.addEventListener('playing', () => {
  document.getElementById('playState').style.display = 'none';
});

audio1.addEventListener('ended', () => {
    if(count < audioFileUpload.files.length) count = ++count;
    else count = 0;
    
    filepath = URL.createObjectURL(audioFileUpload.files[count]);
    audio1.src = filepath;
    audio1.load();
    audio1.play();
  });
  
  audioFileUpload.addEventListener('change', function() {
    filepath = URL.createObjectURL(this.files[0]);

    if(audio1.src === '')
    {
      audio1.src = filepath;
      audio1.load();
      document.getElementById('playState').style.display = 'flex';
    }
  });

  // audio1.addEventListener('pause', () => {
    
  // });

  bg.addEventListener('change', function() {
    let bgfilepath = URL.createObjectURL(this.files[0]);
    body.style.background = `url("${bgfilepath}") no-repeat center center`;
    body.style.backgroundSize = "contain";
  });
  
  document.getElementById('playButton').addEventListener('click', function(e) {
    e.preventDefault();
    playing = !playing ? audio1.play() : audio1.pause();
    document.getElementById('playState').style.display = 'none';
    triggerPlayState();
  });

  document.getElementById('blackBars').addEventListener('click', function(e) {
    e.preventDefault();
    visual = 'blackBars';


    document.removeChild(document.getElementById('canvas'));
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    playStop();
  });

  document.getElementById('smallBars').addEventListener('click', function(e) {
    e.preventDefault();
    visual = 'smallBars';


    document.removeChild(document.getElementById('canvas'));
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    playStop();
  });

  document.getElementById('starburst').addEventListener('click', function(e) {
    e.preventDefault();
    visual = 'starburst';

    document.removeChild(document.getElementById('canvas'));
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    playStop();
  });

  document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      playing = !playing;
      triggerPlayState();
    }

    if (e.keyCode == 37) {
      document.getElementById('controlPanel').style.transform = 'translateX(-100%)';
    }

    if (e.keyCode == 39) {
      document.getElementById('controlPanel').style.transform = 'translateX(0)';
    }
    console.log(document.getElementById('controlPanel').offsetLeft);
  };