const actionBtn = document.getElementById('action');
// const file = document.getElementById('fileSelect');
// const bg = document.getElementById('bgSelect');
const body = document.getElementById('body');
let canvas = document.getElementById('canvas');
// const player = document.getElementById('audioPlayer');
// let canvasRigt = document.getElementById('canvasRight');
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
// const ctxRt = canvasRight.getContext('2d');
let audio1 = document.getElementById('audioPlayer');
var audioSource = null;
var analyser = null;
// audioSource.connect(analyser);
// analyser.connect(audioCtx.destination);
var bufferLength = null;
var dataArray = null;
const visualParams = new VisualParams();
var visual = null;



let filepath;
const basepath = './sounds/';
let playing = false;
let colors;
// let audio1 = new Audio();

let count = 0;

var methods = {
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
  // Black Bars
  10: (bufferLength, x, barWidth, barHeight, dataArray) => {
        for(let i = 0; i < bufferLength; i++) {

          barHeight = dataArray[i] * 1.5;
          barWidth = bufferLength/500;
          ctx.fillStyle = '#000000';
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;
        }
  },
  // Grey Bars
  11: (bufferLength, x, barWidth, barHeight, dataArray) => {
    for(let i = 0; i < bufferLength; i++) {

      barHeight = dataArray[i] * 1.6;
      barWidth = bufferLength/500;
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  },
  // Black Tips
  12: (bufferLength, x, barWidth, barHeight, dataArray) => {
    for(let i = 0; i < bufferLength; i++) {

      barHeight = dataArray[i] * 1.65;
      barWidth = bufferLength/500;
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  },
  // Black Tips
  blackBarsWithTips: (bufferLength, x, barWidth, barHeight, dataArray) => {
    for(let i = 0; i < bufferLength; i++) {

      barHeight = dataArray[i] * 1.65;
      barWidth = bufferLength/500;
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }

    for(let i = 0; i < bufferLength; i++) {

      barHeight = dataArray[i] * 1.6;
      barWidth = bufferLength/500;
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += 
      
      barWidth;
    }

    for(let i = 0; i < bufferLength; i++) {

      barHeight = dataArray[i] * 1.5;
      barWidth = bufferLength/500;
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  } 
};

//   //**************** File based index length */
//   // let idx = Math.floor(Math.random() * (file.files.length - 0 + 1)) + 0;

//   //**************** visualization methods length based */
//   let idx = Math.floor(Math.random() * (Object.keys(methods).length - 1 + 1)) + 0;
  
//     console.log('index', idx);
//   animate(idx);
// }

function drawVisualizer(visualParams){
  switch(visualParams.name){
    case 'starburst':
      break;
    default:
      drawGreyBars(visualParams);
      // drawBlackBars(visualParams);
      break;
  }
}

function drawBlackBars (bufferLength, x, barWidth, barHeight, dataArray) {
  for(let i = 0; i < bufferLength; i++) {

    barHeight = dataArray[i] * 1.5;
    barWidth = bufferLength/500;
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}

function drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray) {

  for(let i = 0; i < bufferLength; i++) {

    barHeight = dataArray[i] * 1.6;
    barWidth = bufferLength/500;
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }

  for(let i = 0; i < bufferLength; i++) {

    barHeight = dataArray[i] * 1.5;
    barWidth = bufferLength/500;
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}

var drawStarburst = (bufferLength, x, barWidth, barHeight, dataArray) => {
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
}

var drawLine = (bufferLength, x, barWidth, barHeight, dataArray) => {
  analyser.getByteTimeDomainData(dataArray);

  barHeight = 20;
  barWidth = bufferLength/500;
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.fillRect(0, 0, barWidth, barHeight);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(0, 0, 0)";

  ctx.beginPath();

  const sliceWidth = (barWidth * 1.0) / bufferLength;
  x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * barHeight) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
};

function playStop() {
  // if(audio1.src === '')
  // {
  //   audio1.src = filepath;
  //   audio1.load();
  // }

  // const audioCtx = new (window.AudioContext || window.webkitAudioContext);

    // playing = !playing ? audio1.play() : audio1.pause();

    // may need to adjust
    // drawVisuals();

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
            drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray);
            drawBlackBars(bufferLength, x, barWidth, barHeight, dataArray);
            break;
          case 'starburst':
            drawStarburst(bufferLength, x, barWidth, barHeight, dataArray);
            break;
          default:
            drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray);
            drawBlackBars(bufferLength, x, barWidth, barHeight, dataArray);
            // drawLine(bufferLength, x, barWidth, barHeight, dataArray);
            break;
        }
        
        

        requestAnimationFrame(animate);
      }

      // let idx = Math.floor(Math.random() * (Object.keys(methods).length - 1 + 1)) + 0;
      
      animate();
    }
  }



  function runMemoryMeasurements() {
    const interval = -Math.log(Math.random()) * 5 * 60 * 1000;
    console.log(`Next measurement in ${Math.round(interval / 1000)} seconds.`);
    setTimeout(measureMemory, interval);
  }
  
  async function measureMemory() {
    const memorySample = await performance.measureUserAgentSpecificMemory();
    console.log(memorySample);
    runMemoryMeasurements();
  }

  runMemoryMeasurements();
  
  if (crossOriginIsolated) {
    runMemoryMeasurements();
  }