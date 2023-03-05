const actionBtn = document.getElementById('action');
const file = document.getElementById('fileSelect');
const bg = document.getElementById('bgSelect');
const body = document.getElementById('body');
let canvas = document.getElementById('canvas');
// const player = document.getElementById('audioPlayer');
// let canvasRigt = document.getElementById('canvasRight');
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
// const ctxRt = canvasRight.getContext('2d');
// let audio1 = new Audio();
let audioSource = null;
let analyser;
let filepath;
const basepath = './sounds/';
let playing = false;
let colors;
// let audio1 = new Audio();
let audio1 = document.getElementById('audioPlayer');
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
    } 
};

function drawVisuals(audioCtx, analyser){
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext);
  // audioSource = audioSource === null ? audioCtx.createMediaElementSource(audio1) : audioSource;
  // analyser = audioCtx.createAnalyser();
  // audioSource.connect(analyser);
  
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

    // Black Tips
    methods[12](bufferLength, x, barWidth, barHeight, dataArray);
    // Grey Bars
    methods[11](bufferLength, x, barWidth, barHeight, dataArray);
    // Black Bars
    methods[10](bufferLength, x, barWidth, barHeight, dataArray);

    requestAnimationFrame(animate);
  }

  //**************** File based index length */
  // let idx = Math.floor(Math.random() * (file.files.length - 0 + 1)) + 0;

  //**************** visualization methods length based */
  let idx = Math.floor(Math.random() * (Object.keys(methods).length - 1 + 1)) + 0;
  
    console.log('index', idx);
  animate(idx);
}

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
      const audioCtx = new (window.AudioContext || window.webkitAudioContext);
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

        // Black Tips
        methods[12](bufferLength, x, barWidth, barHeight, dataArray);
        // Grey Bars
        methods[11](bufferLength, x, barWidth, barHeight, dataArray);
        // Black Bars
        methods[10](bufferLength, x, barWidth, barHeight, dataArray);

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