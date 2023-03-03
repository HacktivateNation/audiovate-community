// Events
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
    console.log(this.files);
  });
  
  document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      playStop();
      document.getElementById('fileSelect').style.display = 'none';
    }
  }