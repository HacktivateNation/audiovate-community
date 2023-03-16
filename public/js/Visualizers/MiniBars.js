class MiniBars {
    constructor(){}

    static drawSmallLeftBars(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '50%';
        x = canvas.width / 2;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            barWidth = bufferLength/5000;
            ctx.fillStyle = 'rgb(142, 80, 219)';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x -= barWidth;
        }
    }

    static drawSmallRightBars(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '50%';
        ctx.y = canvas.height/2;
        x = canvas.width / 2;
        // analyser.fftSize = 2 ** 12;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            barWidth = bufferLength/5000;
            ctx.fillStyle = 'rgb(142, 80, 219)';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    }
}