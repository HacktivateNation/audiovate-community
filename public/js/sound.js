const actionBtn = document.getElementById('action');
const body = document.getElementById('body');
let canvas = document.getElementById('canvas');
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let audio1 = document.getElementById('audioPlayer');
var audioSource = null;
var analyser = null;
var bufferLength = null;
var dataArray = null;
var visual = null;
let filepath;
const basepath = './sounds/';
let playing = false;
let colors;
let count = 0;



// function drawBlackBars (bufferLength, x, barWidth, barHeight, dataArray) {
//   let el = document.getElementById('canvas');
//   el.style.bottom = '0';

//   for(let i = 0; i < bufferLength; i++) {

//     barHeight = dataArray[i] * 1.5;
//     barWidth = bufferLength/500;
//     ctx.fillStyle = '#000000';
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x += barWidth;
//   }
// }

// function drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray) {
//   let el = document.getElementById('canvas');
//   el.style.bottom = '0';

//   for(let i = 0; i < bufferLength; i++) {

//     barHeight = dataArray[i] * 1.6;
//     barWidth = bufferLength/500;
//     ctx.fillStyle = '#CCCCCC';
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x += barWidth;
//   }

//   for(let i = 0; i < bufferLength; i++) {

//     barHeight = dataArray[i] * 1.5;
//     barWidth = bufferLength/500;
//     ctx.fillStyle = '#000000';
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x += barWidth;
//   }
// }

// var drawStarburst = (bufferLength, x, barWidth, barHeight, dataArray) => {
//   let el = document.getElementById('canvas');
//   el.style.bottom = '0';

//   // *** Thin Lines Starburst ***
//   for (let i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i] * 4;
//     barWidth = bufferLength/500;
//      ctx.save();
//      ctx.translate(canvas.width/2, canvas.height/2)
//      ctx.rotate( i * 2.8);
//      const hue = i * 10;
//      ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/10}%)`;
//      ctx.fillRect(0, 0, barWidth/3, barHeight);
//     x += barWidth;
//      ctx.restore();
//   }
// }

// var drawSmallLeftBars = (bufferLength, x, barWidth, barHeight, dataArray) => {
//   let el = document.getElementById('canvas');
//   // el.style.bottom = '50%';
//   el.style.bottom = '10%';
//   x = canvas.width / 2;

//   for(let i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i];
//     barWidth = bufferLength/5000;
//     ctx.fillStyle = '#ff4c4a';
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x -= barWidth;
//   }
// }

// var drawSmallRightBars = (bufferLength, x, barWidth, barHeight, dataArray) => {
//   let el = document.getElementById('canvas');
//   el.style.bottom = '10%';
//   ctx.y = canvas.height/2;
//   x = canvas.width / 2;

//   for(let i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i];
//     barWidth = bufferLength/5000;
//     ctx.fillStyle = '#ff4c4a';
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x += barWidth;
//   }
// }

// var drawLine = (bufferLength, x, barWidth, barHeight, dataArray) => {
//   analyser.getByteTimeDomainData(dataArray);

//   barHeight = 20;
//   barWidth = bufferLength/500;
//   ctx.fillStyle = "rgb(200, 200, 200)";
//   ctx.fillRect(0, 0, barWidth, barHeight);``

//   ctx.lineWidth = 2;
//   ctx.strokeStyle = "rgb(0, 0, 0)";

//   ctx.beginPath();

//   const sliceWidth = (barWidth * 1.0) / bufferLength;
//   x = 0;

//   for (let i = 0; i < bufferLength; i++) {
//     const v = dataArray[i] / 128.0;
//     const y = (v * barHeight) / 2;

//     if (i === 0) {
//       ctx.moveTo(x, y);
//     } else {
//       ctx.lineTo(x, y);
//     }

//     x += sliceWidth;
//   }

//   ctx.lineTo(canvas.width, canvas.height / 2);
//   ctx.stroke();
// };

function playStop() {
    if(playing) {
      if(audioSource === null) audioSource = audioCtx.createMediaElementSource(audio1);
      if(analyser === null) {
        analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 2 ** 9;
        bufferLength = analyser.frequencyBinCount * 75;
        dataArray = new Uint8Array(bufferLength);
      }

      barWidth = (canvas.width/2)/bufferLength;
      let barHeight;
      let x;

      function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        switch(visual){
          case 'blackBars':
            BlackBars.drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray);
            BlackBars.drawBlackBars(bufferLength, x, barWidth, barHeight, dataArray);
            break;
            case 'smallBars':
            MiniBars.drawSmallLeftBars(bufferLength, x, barWidth, barHeight, dataArray);
            MiniBars.drawSmallRightBars(bufferLength, x, barWidth, barHeight, dataArray);
            break;
          case 'starburst':
            Starburst.drawStarburst(bufferLength, x, barWidth, barHeight, dataArray);
            break;
          default:
            BlackBars.drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray);
            BlackBars.drawBlackBars(bufferLength, x, barWidth, barHeight, dataArray);
            break;
        }
        
        

        requestAnimationFrame(animate);
      }
      
      animate();
    }
  }



  // function runMemoryMeasurements() {
  //   const interval = -Math.log(Math.random()) * 5 * 60 * 1000;
  //   console.log(`Next measurement in ${Math.round(interval / 1000)} seconds.`);
  //   setTimeout(measureMemory, interval);
  // }
  
  // async function measureMemory() {
  //   const memorySample = await performance.measureUserAgentSpecificMemory();
  //   console.log(memorySample);
  //   runMemoryMeasurements();
  // }

  // runMemoryMeasurements();
  
  // if (crossOriginIsolated) {
  //   runMemoryMeasurements();
  // }