class Circles {
    constructor(){

    }

    drawCircles(bufferLength, x, y, radius, dataArray){
        let el = document.getElementById('canvas');
        el.style.bottom = '50%';
        x = canvas.width / 2;
        y = canvas.height / 2;

        for(let i = 0; i < bufferLength; i++) {
            radius = dataArray[i];
            ctx.fillStyle = getRandomColor();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            x += (radius/2);
        }
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }