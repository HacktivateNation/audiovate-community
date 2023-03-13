class VisualParams {
    constructor(bufferLength, x, barWidth, barHeight, dataArray, name = null,){
        this.name = name;
        this.bufferLength = bufferLength;
        this.x = x;
        this.barWidth = barWidth;
        this.barHeight = barHeight;
        this.dataArray = dataArray;
    }
}