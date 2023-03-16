class BlackBars {
    constructor(){}

    static drawBlackBars(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '0';

        for(let i = 0; i < bufferLength; i++) {

            barHeight = dataArray[i] * 1.5;
            barWidth = bufferLength/500;
            ctx.fillStyle = '#000000';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    }

    static drawGreyBars(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '0';

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
}