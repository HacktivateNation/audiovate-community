class FullScreenBars {
    constructor(){}

    static drawFullScreenBars(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '50%';
        x = 0;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            barWidth = canvas.width/bufferLength;
            ctx.fillStyle = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    }
}