function triggerPlayState(){
  if(audio1.src === '') audio1.src = filepath;

  if(playing){
    audio1.play();
    document.getElementById('playState').style.display = 'none';
    document.getElementById('audioContainer').style.display = 'flex';
  } 
  else {
    audio1.pause()
    // document.getElementById('playState').style.display = 'flex';
  };
  // audio1.play();
  playStop();
  document.getElementById('songSelectLabel').style.display = 'none';
  
}

// Events
audio1.addEventListener('playing', () => {
  document.getElementById('playState').style.display = 'none';
});

audio1.addEventListener('ended', () => {
    if(count < file.files.length) count = ++count;
    else count = 0;
    
    filepath = URL.createObjectURL(file.files[count]);
    audio1.src = filepath;
    audio1.load();
    audio1.play();
  });
  
  file.addEventListener('change', function() {
    filepath = URL.createObjectURL(this.files[0]);

    if(audio1.src === '')
    {
      audio1.src = filepath;
      audio1.load();
      document.getElementById('playState').style.display = 'flex';
    }
  });

  audio1.addEventListener('pause', () => {
    console.log('paused');
    // document.getElementById('playState').style.display = 'flex';
  });

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

  document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      playing = !playing;
      triggerPlayState();
    }
  }