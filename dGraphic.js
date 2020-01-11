let speed = 3;
let startValue = 270;
let progessBar_Value = startValue;

function drawMenu(distance, positionX, positionY){
    if(distance < 70){
        if(progessBar_Value < startValue+360){
            progessBar_Value += speed;
        }else{
            progessBar_Value = startValue;
        }
        push();
        noFill();
        stroke(0,200,255);
        strokeWeight(2.5);
        arc(positionX, positionY, 150, 150, radians(startValue), radians(progessBar_Value));
        fill(255, 50);
        noStroke();
        ellipse(positionX,positionY,150);
        pop();
    }else{
        progessBar_Value = startValue;
    }
}