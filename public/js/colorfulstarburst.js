const actionBtn = document.getElementById('action');
const file = document.getElementById('fileSelect');
let canvas = document.getElementById('canvas');
// let canvasRigt = document.getElementById('canvasRight');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
// const ctxRt = canvasRight.getContext('2d');
// let audio1 = new Audio();
// const audioCtx = new (window.AudioContext || window.webkitAudioContext);
let audioSource = null;
let analyser;
let filepath;
const basepath = './sounds/';
let playing = false;
let colors;
let audio1 = new Audio();
let count = 0;

let warmColors = [
  '#370617'
  ,'#6a040f'
  ,'#9d0208'
  ,'#d00000'
  ,'#dc2f02'
  ,'#e85d04'
  ,'#f48c06'
  ,'#faa307'
  ,'#ffba08' 
];

let coolColors = [
  '#5e60ce'
  ,'#5390d9'
  ,'#4ea8de'
  ,'#48bfe3'
  ,'#56cfe1'
  ,'#64dfdf'
  ,'#72efdd'
  ,'#80ffdb'
];

let neonPinkBlue = [
  '#04031a'
  ,'#04031a'
  ,'#04031a'
  ,'#04031a'
  ,'#0609ae'
  ,'#0609ae'
  ,'#0609ae'
  ,'#0609ae'
  ,'#910ad5'
  ,'#910ad5'
  ,'#910ad5'
  ,'#910ad5'
  ,'#ed39ee'
  ,'#ed39ee'
  ,'#ed39ee'
  ,'#ed39ee'
  ,'#40aaf4'
  ,'#40aaf4'
  ,'#40aaf4'
  ,'#40aaf4'
  ,'#40aaf4'
  ,'#40aaf4'
  ,'#40aaf4'
  ,'#ed39ee'
  ,'#ed39ee'
  ,'#ed39ee'
  ,'#ed39ee'
  ,'#910ad5'
  ,'#910ad5'
  ,'#910ad5'
  ,'#910ad5'
  ,'#0609ae'
  ,'#0609ae'
  ,'#0609ae'
  ,'#0609ae'
];

var methods = {
  // Fire Bars
  0: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;

        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 2;
          barWidth = bufferLength/500;
          ctx.fillStyle = warmColors[currentCount];
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;

          if(currentCount >= warmColors.length) 
          {
            currentCount = 0;
          }
          else currentCount++;
        }
  },
  // Cool Color Bars
  1: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;
  
          for(let i = 0; i < bufferLength; i++) {
  
            barHeight = dataArray[i] * 3.5;
            barWidth = bufferLength/500;
            // ****************************************
            // const red = i * barHeight/15;
            // const green = i * 20;
            // const blue = i * barHeight/10;
            // ****************************************
            // const red = i * 20 <= 255 ? i * 20 : i * 10;
            // const green = i * 15 <= 255 ? i * 15 : i / 10;
            // const blue = i * 50 <= 255 ? i * 50 : i * 20;

            const red = i * 20;
            const green = i * 2;
            const blue = i * 47;
            

            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            // ctx.lineWidth = 1;
            // ctx.strokeStyle('#000000');
            // ctx.strokeRect(x, canvas.height - barHeight, barWidth, barHeight);
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
  
            // if(currentCount >= colors.length) 
            // {
            //   currentCount = 0;
            // }
            // else currentCount++;
          }
  },
  // *** Full Starburst
  2: (bufferLength, x, barWidth, barHeight, dataArray) => {

    // *** Thin Lines Starburst ***
    for (let i = 0; i < bufferLength; i++) {
      //  barHeight = dataArray[i] * 1.2;
       barHeight = dataArray[i] * 8;
       barWidth = bufferLength/400;
       ctx.save();
      //  let x = Math.sin(i/30 * Math.PI / 180) * 200;
      //  let y = Math.cos(i/30 * Math.PI / 180) * 200;
       ctx.translate(canvas.width/2, canvas.height/2)
       ctx.rotate( i * 2.8);
       const hue = i * 4;
       ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/4}%)`;
      //  ctx.strokeStyle = 'hsl(1, 100%, ' + i/2 + '%)';

       ctx.fillRect(0, 0, barWidth/3, barHeight);
      //  ctx.strokeRect(x, y, barWidth, barHeight);
      x += barWidth;
       ctx.restore();
    }
    
    // *** Thick Lines Starburst ***
    for (let i = 0; i < bufferLength; i++) {
      //  barHeight = dataArray[i] * 1.2;
       barHeight = dataArray[i] * 1.5;
       barWidth = bufferLength/200;
       ctx.save();
      //  let x = Math.sin(i/30 * Math.PI / 180) * 200;
      //  let y = Math.cos(i/30 * Math.PI / 180) * 200;
       ctx.translate(canvas.width/2, canvas.height/2)
       ctx.rotate( i * 2);
       const hue = i * 4;
       ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/5}%)`;
       ctx.strokeStyle = '#000000';

       ctx.fillRect(0, 0, barWidth, barHeight);
      //  ctx.strokeRect(x, y, 1, 1);
      x += barWidth;
       ctx.restore();
    }
  },
  // *** Thick Starburst Only
  3: (bufferLength, x, barWidth, barHeight, dataArray) => {
    // *** Thick Lines Starburst ***
    for (let i = 0; i < bufferLength; i++) {
      //  barHeight = dataArray[i] * 1.2;
       barHeight = dataArray[i] * 2;
       barWidth = bufferLength/1000;
       ctx.save();
      //  let x = Math.sin(i/30 * Math.PI / 180) * 200;
      //  let y = Math.cos(i/30 * Math.PI / 180) * 200;
       ctx.translate(canvas.width/2, canvas.height/2);
       ctx.rotate( i * 2);
       const hue = i * 4 <= bufferLength ? i * 4 : i / 2;
       ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/5}%)`;
       ctx.strokeStyle = '#000000';

       ctx.fillRect(0, 0, barWidth, barHeight);
      //  ctx.strokeRect(x, y, 1, 1);
      x += barWidth;
       ctx.restore();
    }
  },
  // *** Thin Starburst Only
  4: (bufferLength, x, barWidth, barHeight, dataArray) => {
    // *** Thin Lines Starburst ***
    for (let i = 0; i < bufferLength; i++) {
      //  barHeight = dataArray[i] * 1.2;
       barHeight = dataArray[i] * 4;
       barWidth = bufferLength/500;
       ctx.save();
      //  let x = Math.sin(i/30 * Math.PI / 180) * 200;
      //  let y = Math.cos(i/30 * Math.PI / 180) * 200;
       ctx.translate(canvas.width/2, canvas.height/2)
       ctx.rotate( i * 2.8);
       const hue = i * 10;
       ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/10}%)`;
      //  ctx.strokeStyle = 'hsl(1, 100%, ' + i/2 + '%)';

       ctx.fillRect(0, 0, barWidth/3, barHeight);
      //  ctx.strokeRect(x, y, barWidth, barHeight);
      x += barWidth;
       ctx.restore();
    }
  },
  // Blue Bars
  5: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;
        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 5;
          barWidth = bufferLength/800;
          
          ctx.fillStyle = coolColors[currentCount];
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          // ctx.translate(canvas.width/2, canvas.height/2);
          x += barWidth;

          if(currentCount >= coolColors.length) 
          {
            currentCount = 0;
          }
          else currentCount++;
        }
  },
  // Fire Starburst
  6: (bufferLength, x, barWidth, barHeight, dataArray) => {
        let currentCount = 0;
        for (let i = 0; i < bufferLength; i++) {
          //  barHeight = dataArray[i] * 1.2;
            barHeight = dataArray[i] * 4;
            barWidth = bufferLength/300;
            ctx.save();
          //  let x = Math.sin(i/30 * Math.PI / 180) * 200;
          //  let y = Math.cos(i/30 * Math.PI / 180) * 200;
            ctx.translate(canvas.width/2, canvas.height/2)
            ctx.rotate( i * 2.8);
            const hue = i * 10;
            ctx.fillStyle = warmColors[currentCount];
          //  ctx.strokeStyle = 'hsl(1, 100%, ' + i/2 + '%)';
    
            ctx.fillRect(0, 0, barWidth/3, barHeight);
          //  ctx.strokeRect(x, y, barWidth, barHeight);
          if(currentCount >= warmColors.length) 
          {
            currentCount = 0;
          }
          else currentCount++;
          x += barWidth;
            ctx.restore();
        }
      },
      // Centered Combo Bars
      7: (bufferLength, x, barWidth, barHeight, dataArray) => {
        let currentCount = 0;
        analyser.fftSize = 1024;

        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 2;
          barWidth = (canvas.width/0.1)/bufferLength;
          
          ctx.fillStyle = warmColors[currentCount];
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;

          if(currentCount >= warmColors.length) 
          {
            currentCount = 0;
          }
          else currentCount++;
        }

        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 2;
          barWidth = (canvas.width/-0.1)/bufferLength;
          
          ctx.fillStyle = warmColors[currentCount];
          ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;

          if(currentCount >= warmColors.length) 
          {
            currentCount = 0;
          }
          else currentCount++;
        }
      },
      // Neon Bars / Dark Blue Bars
  8: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;

        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 1.25;
          barWidth = bufferLength/5000;
          ctx.fillStyle = '#04031a';
          // ctx.fillStyle = neonPinkBlue[currentCount];
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;

          // if(currentCount >= neonPinkBlue.length) 
          // {
          //   currentCount = 0;
          // }
          // else currentCount++;
        }
  },
  // White Bars Forward
  9: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;

        for(let i = 0; i < bufferLength; i++) {

          // barHeight = dataArray[i] * 2;
          barHeight = dataArray[i];
          barWidth = bufferLength/2500;
          // ctx.fillStyle = '#FFFFFF';
          ctx.fillStyle = '#04b8ba';
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;
           
          // if(currentCount >= neonPinkBlue.length) 
          // {
          //   currentCount = 0;
          // }
          // else currentCount++;
        }
  },
  // Black Bars
  10: (bufferLength, x, barWidth, barHeight, dataArray) => {
        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 2.5;
          barWidth = bufferLength/500;
          ctx.fillStyle = '#FFFFF';
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;
        }
  },
  // Grey Bars
  11: (bufferLength, x, barWidth, barHeight, dataArray) => {
    for(let i = 0; i < bufferLength; i++) {

      barHeight = dataArray[i] * 2.6;
      barWidth = bufferLength/500;
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  },
    // Black Tips
    12: (bufferLength, x, barWidth, barHeight, dataArray) => {
      for(let i = 0; i < bufferLength; i++) {
  
        barHeight = dataArray[i] * 2.65;
        barWidth = bufferLength/500;
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
      }
    },
    // Line
    13: (bufferLength, x, barWidth, barHeight, dataArray) => {
      const drawLineSegment = (ctx, x, y, width, isEven) => {
        ctx.lineWidth = 1; // how thick the line is
        ctx.strokeStyle = "#fff"; // what color our line is
        ctx.beginPath();
        y = isEven ? y : -y;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, y);
        ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
        ctx.lineTo(x + width, 0);
        ctx.stroke();
      };

      const width = canvas.offsetWidth / dataArray.length;
      for (let i = 0; i < bufferLength; i++) {
        const x = width * i;
        let height = dataArray[i] * canvas.offsetHeight - 20;
        if (height < 0) {
            height = 0;
        } else if (height > canvas.offsetHeight / 2) {
            height = height > canvas.offsetHeight / 2;
        }
        drawLineSegment(ctx, x, height, width, (i + 1) % 2);
    }
  },
  // White Bars Reverse
  14: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;
        for(let i = 0; i < bufferLength; i++) {

          // barHeight = dataArray[i] * 2;
          barHeight = dataArray[i];
          barWidth = bufferLength/2500;
          // ctx.fillStyle = '#FFFFFF';
          ctx.fillStyle = '#ff4c4a';
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x -= barWidth;
           
          // if(currentCount >= neonPinkBlue.length) 
          // {
          //   currentCount = 0;
          // }
          // else currentCount++;
        }
  },
  // White Bars Reverse
  15: (bufferLength, x, barWidth, barHeight, dataArray) => {
    let currentCount = 0;
        for(let i = 0; i < bufferLength; i++) {

          // barHeight = dataArray[i] * 2;
          barHeight = dataArray[i];
          barWidth = bufferLength/2500;
          // ctx.fillStyle = '#FFFFFF';
          ctx.fillStyle = '#ff4c4a';
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;
           
          // if(currentCount >= neonPinkBlue.length) 
          // {
          //   currentCount = 0;
          // }
          // else currentCount++;
        }
  },
};

function playStop() {
  audio1.src = filepath;
  audio1.load();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext);

    playing = !playing ? audio1.play() : audio1.pause();

    // may need to adjust
    if(playing) {
      audioSource = audioCtx.createMediaElementSource(audio1);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 2 ** 9;
      // analyser.fftSize = 4096;
      // const bufferLength = analyser.frequencyBinCount * 10;
      const bufferLength = analyser.frequencyBinCount * 75;
      const dataArray = new Uint8Array(bufferLength);

      // const barWidth = canvas.width/bufferLength;
      const barWidth = (canvas.width/2)/bufferLength;
      let barHeight;
      let x;
      let x2;
      // animate(dataArray);

      /***********
       * Break the animate function out
       * Call from color scheme selection
       */

      function animate(idx) {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        
        // Math.random(file.files.length);
        
        // ******** Cycle through visualizations
        // ****** This idx is broken methods[idx](bufferLength, x, barWidth, barHeight, dataArray);
        
        // Pink Blue Bars
        // methods[1](bufferLength, x, barWidth, barHeight, dataArray);

        // Fat Starburst
        // methods[2](bufferLength, x, barWidth, barHeight, dataArray);        

        // Colorful Starburst
        // methods[3](bufferLength, x, barWidth, barHeight, dataArray);

        // **** Best Starburst ****
        // methods[10](bufferLength, x, barWidth, barHeight, dataArray);
        methods[4](bufferLength, x, barWidth, barHeight, dataArray);

        // Fire
        // methods[0](bufferLength, x, barWidth, barHeight, dataArray);

        // ===============================================================
        
        // Stacked Bars
        // ??? methods[5](bufferLength, x, barWidth, barHeight, dataArray);
        // Black Tips
        // methods[12](bufferLength, x, barWidth, barHeight, dataArray);
        // Grey Bars
        // methods[11](bufferLength, x, barWidth, barHeight, dataArray);
        // Black Bars
        // methods[10](bufferLength, x, barWidth, barHeight, dataArray);
        // White Bars Forward
        // methods[9](bufferLength, x, barWidth, barHeight, dataArray);
        // Neon Bars / Dark Grey Bars
        // methods[8](bufferLength, x, barWidth, barHeight, dataArray);
        
        // ===============================================================

        // Line *** Not working
        // methods[13](bufferLength, x, barWidth, barHeight, dataArray);


        // **** Fire Starburst ****
        // methods[6](bufferLength, x, barWidth, barHeight, dataArray);

        // ****  ****
        // methods[7](bufferLength, x, barWidth, barHeight, dataArray);

        // White Bars Reverse
        // methods[14](bufferLength, x, barWidth, barHeight, dataArray);
        // methods[15](bufferLength, x, barWidth, barHeight, dataArray);


        // switch(count){
        //   case 0:
        //     drawBars(bufferLength, x, barWidth, barHeight, dataArray);
        //     break;
        //     case 1:
        //       drawCircle(bufferLength, x, barWidth, barHeight, dataArray);
        //       break;
        //       case 2:
        //         drawGradientBars(bufferLength, x, barWidth, barHeight, dataArray);
        //         break;
        //         default:
        //           drawGradientBars(bufferLength, x, barWidth, barHeight, dataArray);
        //           break;
        // }
        // drawBars(bufferLength, x, barWidth, barHeight, dataArray);
        // drawGradientBars(bufferLength, x, barWidth, barHeight, dataArray);

        requestAnimationFrame(animate);
      }

      //**************** File based index length */
      // let idx = Math.floor(Math.random() * (file.files.length - 0 + 1)) + 0;

      //**************** visualization methods length based */
      let idx = Math.floor(Math.random() * (Object.keys(methods).length - 1 + 1)) + 0;
      
        console.log('index', idx);
      animate(idx);
    }
  }

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

let colorSelections = document.getElementsByClassName('colorSchemeSelector');
// colorSelections.forEach((item, index) => {
//   item.addEventListener('click', function(e){
//     console.log(this);
//   });
// });

// Register color scheme click events
for (var i = 0; i < colorSelections.length; i++) {
  colorSelections[i].addEventListener('click', function(e) {
    e.preventDefault();
    let id = this.id;
    console.log(id);
    
    switch(id){
      case 'warmColors':
        drawBars();
        break;
        case 'coolColors':
          drawGradientBars();
        break;
    }
  });
}


document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    playStop();
    document.getElementById('fileSelect').style.display = 'none';
  }
}

// Create color scheme selectors
document.addEventListener('DOMContentLoaded', () => {
    colors = warmColors;

  warmColors.forEach((item, index) => {
    document.getElementById('warmColors').innerHTML += `<div class="d-block h-100" style="background-color: ${item}"></div>`;
  });

  coolColors.forEach((item, index) => {
    document.getElementById('coolColors').innerHTML += `<div class="d-block h-100" style="background-color: ${item}"></div>`;
  });
});



// opengameart.org - free sounds and game art