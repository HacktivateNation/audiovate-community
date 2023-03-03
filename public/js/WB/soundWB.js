const WIDTH = 1500;
const HEIGHT = 1000;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let analyzer;
canvas.width = WIDTH;
canvas.height = HEIGHT;


function handleError(err) {
    console.log('You must give access to your mic in order to proceed');
  }

  function drawTimeData(timeData) {
    analyzer.getByteTimeDomainData(timeData);
    ctx.lineWidth = 10;
  ctx.strokeStyle = "#ffc600";
  ctx.beginPath();
  }

async function getAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(handleError());
    const audioCtx = new AudioContext();
    analyzer = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);

  // How much data should we collect
  analyzer.fftSize = 2 ** 8;
  // pull the data off the audio
  bufferLength = analyzer.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
  }
  
  getAudio();