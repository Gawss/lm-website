class CustomText {
    constructor(label, x, y, fontSize) {
        this.label = label;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;
    }

    setLabel(newLabel){
        this.label = newLabel;
    }

    drawText(){
        push();
        fill(255);
        text(this.label, this.x, this.y);
        pop();
    }
}