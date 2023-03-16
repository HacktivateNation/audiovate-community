class Base {
    constructor(){}

    static drawBars(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '0';

        for(let i = 0; i < bufferLength; i++) {

            barHeight = dataArray[i] * 1.5;
            barWidth = bufferLength/500;
            ctx.fillStyle = 'rgb(142, 80, 219)';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    }
}