class Cube {
    constructor(title, positionX, positionY, size, color_) {
        this.title = title;
        this.positionX = positionX;
        this.positionY = positionY;
        this.size = size;
        this.canvas_;
        this.angle = 0;
        this.distance = 0;
        this.speed = 3;
        this.startValue = 270;
        this.progessBar_Value = this.startValue;
        this.clickAvailable = false;
        this.isActive = false;
        this.color_ = color_;
        this.dColor = color(200,200,200,220);
    }

    setUp(){
        this.canvas_ = createGraphics(this.size*2.5, this.size*2.5, WEBGL);
        this.canvas_.background(255,255,255,0);
    }

    setStatus(x, y, size_){
        this.positionX = x;
        this.positionY = y;
        this.size = size_;
    }

    draw(){
        
        this.distance = GetDistance(this.positionX, this.positionY, mouseX, mouseY);
        let maxDistance = GetMagnitude(w/2,h/2);
        let distanceInvert = maxDistance - this.distance;

        let speed = Math.pow(distanceInvert*0.006,2);
            
        if(this.angle >= 360){
            this.angle = 0;
        }else{
            this.angle += speed;
        }
    
        let rotation = radians(this.angle);
        this.canvas_.background(0,0,0,0);
        this.canvas_.push();
        this.canvas_.rotateX(rotation);
        this.canvas_.rotateY(rotation);
        this.canvas_.fill(100,100,100,5);
        this.canvas_.noStroke();
        this.canvas_.stroke((this.isActive)?this.color_:this.dColor);
        this.canvas_.box(this.size,this.size,this.size);
        this.canvas_.stroke((this.isActive)?this.color_:this.dColor);
        // this.canvas_.ellipseMode(CENTER);
        // this.canvas_.ellipse(0,0,this.size*2);
        this.canvas_.pop();
        push();
        this.onMouseEnter();
        textAlign(CENTER);
        textSize(this.size/2);
        text(this.title, this.positionX, this.positionY+((this.size*2.2)));
        imageMode(CENTER);
        image(this.canvas_, this.positionX,this.positionY);
        pop();
    }

    drawProgressBar(positionX, positionY){
        if(this.progessBar_Value < this.startValue+360){
            this.progessBar_Value += this.speed;
        }else{
            this.progessBar_Value = this.startValue;
        }
        push();
        noFill();
        stroke(this.color_);
        strokeWeight(2.5);
        arc(positionX, positionY, this.size*3, this.size*3, radians(this.startValue), radians(this.progessBar_Value));
        fill(255, 50);
        noStroke();
        ellipse(positionX,positionY,this.size*3);
        pop();
    }

    onMouseEnter(){
        if(this.distance < (this.size*3)/2){
            this.clickAvailable = true;
            this.drawProgressBar(this.positionX, this.positionY);
        }else{
            this.progessBar_Value = this.startValue;
            this.clickAvailable = false;
        }
    }

    onMousePressed(){
        this.isActive = !this.isActive;
    }
}