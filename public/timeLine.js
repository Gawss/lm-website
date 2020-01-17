class Timeline {
    constructor(x, y, size, numEvents, color_) {
        this.posX = x;
        this.posY = y;
        this.size = size;
        this.canvasTl;

        this.numEvents = numEvents;
        this.events = [];

        this.isActive = false;
        this.color_ = color_;
        this.dColor = color(200,200,200,150);

        this.isMoving = false;
        this.force = 0;
        this.direction = 1;

        this.eventPoints = [];
        this.angle = 0;
    }

    setUp(){
        this.canvasTl = createGraphics(this.size*2.5, this.size*2.5, WEBGL);
        this.canvasTl.background(255,255,255,0);
        this.canvasTl.rotateX(radians(75));
        for(let i=0; i<this.numEvents;i++){
            this.events.push(new EventTL(this.size/25));
            this.eventPoints.push(createVector(0,0,0));
        }
    }

    update(){
        this.canvasTl.background(0,0,0,0);        
        this.canvasTl.stroke((this.isActive)?this.color_:this.dColor);
        this.canvasTl.noFill();
        this.polygon(0, 0, (this.size/2)-((this.size/2)/this.numEvents), this.numEvents);
        this.createSpheres();
        this.createSign(); 
        this.move();
    }

    draw(){
        imageMode(CENTER);
        image(this.canvasTl, this.posX, this.posY);
    }

    setStatus(x,y){
        this.posX = x;
        this.posY = y;
    }

    rotate(direction){
        this.isMoving = true;
        this.force = 3;
        this.direction = direction;
    }

    move(){
        if(this.force > 0 & this.isMoving){
            this.angle = this.angle + this.direction*this.force;
            this.canvasTl.rotateZ(radians(this.direction*this.force));
            for(let i=0; i<this.numEvents;i++){
                this.events[i].rotationY = (-this.direction*this.force)/10;
            }
            this.force -= 0.1;      
        }else{
            this.isMoving = false;
        }
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        let i = 0;        
        this.canvasTl.beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            this.canvasTl.vertex(sx, sy);
            this.eventPoints[i].set(sx, sy, radians(75));
            i++;
        }
        this.canvasTl.endShape(CLOSE);
    }

    createSpheres(){
        for(let i=0;i<this.numEvents;i++){
            var sphSize = this.size/25;

            this.canvasTl.push();
            this.canvasTl.translate(this.eventPoints[i].x, this.eventPoints[i].y, 0);
            this.canvasTl.sphere(sphSize);
            // this.canvasTl = this.events[i].draw(this.canvasTl);
            this.canvasTl.pop();
        }
    }

    createSign(){
        for(let i=0;i<this.numEvents;i++){
            this.canvasTl.push();
            this.canvasTl.translate(this.eventPoints[i].x, this.eventPoints[i].y, 0);
            this.canvasTl.stroke(255);
            this.canvasTl.rotateX(radians(90));
            this.canvasTl.fill(200);
            this.canvasTl.rotateY(radians(-this.angle)); 
            this.canvasTl.rectMode(CENTER);
            this.canvasTl.rect(10,20,20,20);
            this.canvasTl.pop();
        }
    }
}

class EventTL{
    constructor(size){
        this.size = size;
        this.rotationY = 0;
    }

    draw(canvas, sx, sy){
        canvas.stroke(255);
        canvas.line(0,0,0,0,0,this.size*2);
        canvas.rotateX(radians(90));       
        canvas.line(0,0,0,0,0,this.size*2); 
        canvas.rotateY(radians(this.rotationY));
        canvas.fill(200);
        canvas.rect(10,30,20,20);        
        return canvas;
    }
}