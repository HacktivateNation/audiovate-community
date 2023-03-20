class Waveform {
    constructor(){}

    static drawWaveform(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '50%';
        x = 0;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            barWidth = canvas.width/bufferLength;
            ctx.fillStyle = 'rgb(142, 80, 219)';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    }
}