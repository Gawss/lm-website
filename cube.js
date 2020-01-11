class Cube {
    constructor(positionX, positionY, size) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.size = size;
        this.canvas_;
        this.angle = 0;
        this.distance = 0;
        this.speed = 3;
        this.startValue = 270;
        this.progessBar_Value = this.startValue;
    }

    setUp(){
        this.canvas_ = createGraphics(this.size*2.5, this.size*2.5, WEBGL);
        this.canvas_.background(255,255,255,100);
    }

    setPosition(x, y){
        this.positionX = x;
        this.positionY = y;
    }

    draw(){
        let maxDistance = this.GetMagnitude(w/2,h/2);
    
        let directionX = ((this.positionX - mouseX)>0)? -1:1;
        let directionY = ((this.positionY - mouseY)>0)? -1:1;
        let catetoX = abs(this.positionX - mouseX);
        let catetoY = abs(this.positionY - mouseY);
        let hipothenuse = this.GetMagnitude(catetoX,catetoY);

        this.canvas_.line(this.positionX,this.positionY,this.positionX+(directionX*catetoX),this.positionY+(directionY*catetoY));
        this.distance = maxDistance - hipothenuse;
        let speed = Math.pow(this.distance*0.0006,2);
            
        if(angle >= 360){
            this.angle = 0;
        }else{
            this.angle += speed;
        }
    
        let rotation = this.angle;
        this.canvas_.background(0,0,0,0);
        this.canvas_.push();
        this.canvas_.rotateX(rotation);
        this.canvas_.rotateY(rotation);
        this.canvas_.fill(100,100,100,5);
        this.canvas_.noStroke();
        this.canvas_.stroke(200,200,200,5);
        this.canvas_.box(this.size,this.size,this.size);
        this.canvas_.stroke(200,200,200,50);
        this.canvas_.ellipseMode(CENTER);
        this.canvas_.ellipse(0,0,this.size*2);
        this.canvas_.pop();
        imageMode(CENTER);
        this.drawProgressBar(hipothenuse, this.positionX, this.positionY);
        image(this.canvas_, this.positionX,this.positionY);
    }

    drawProgressBar(distance, positionX, positionY){
        if(distance < 70){
            if(this.progessBar_Value < this.startValue+360){
                this.progessBar_Value += this.speed;
            }else{
                this.progessBar_Value = this.startValue;
            }
            push();
            noFill();
            stroke(0,200,255);
            strokeWeight(2.5);
            arc(positionX, positionY, this.size*3, this.size*3, radians(this.startValue), radians(this.progessBar_Value));
            fill(255, 50);
            noStroke();
            ellipse(positionX,positionY,this.size*3);
            pop();
        }else{
            this.progessBar_Value = this.startValue;
        }
    }

    GetMagnitude(vec1, vec2){
        let magnitude = Math.sqrt((vec1*vec1) + (vec2*vec2));
        return magnitude;
    }
    
    GetCateto(hypotenuse, cateto1){
        let cateto2 = Math.sqrt((hypotenuse*hypotenuse)-(cateto1*cateto1));
        return cateto2;
    }
}