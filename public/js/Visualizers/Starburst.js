class Starburst {
    constructor(){}

    static drawStarburst(bufferLength, x, barWidth, barHeight, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '0';

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 4;
            barWidth = bufferLength/500;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2)
            ctx.rotate( i * 2.8);
            const hue = i * 10;
            ctx.fillStyle = `hsl(${hue}, 100%, ${barHeight/10}%)`;
            ctx.fillRect(0, 0, barWidth/3, barHeight);
            x += barWidth;
            ctx.restore();
        }
    }
}