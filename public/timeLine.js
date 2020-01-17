class Timeline {
    constructor(x, y, size, numEvents, color_, level) {
        this.posX = x;
        this.posY = y;
        this.size = size;
        this.canvasTl;

        this.numEvents = numEvents;        

        this.isActive = false;
        this.color_ = color_;
        this.dColor = color(200,200,200,150);

        this.isMoving = false;
        this.force = 0;
        this.direction = 1;

        this.eventPoints = [];
        this.angle = 0;

        this.level = level;
        this.aboutme;
    }

    setUp(){
        this.canvasTl = createGraphics(this.size*2.5, this.size*2.5, WEBGL);
        this.canvasTl.background(255,255,255,0);
        this.canvasTl.rotateX(radians(75));
        for(let i=0; i<this.numEvents;i++){
            this.eventPoints.push(createVector(0,0,0));
        }

        if(this.level == 0){
            this.aboutme = new AboutMe(this.canvasT1, this.color_);
            this.aboutme.setUp();
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
        this.force = 5;
        this.direction = direction;
    }

    move(){
        if(this.force > 0 & this.isMoving){
            this.angle = this.angle + this.direction*this.force;
            this.canvasTl.rotateZ(radians(this.direction*this.force));
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
            // this.canvasTl.rotateY(radians(-this.angle));
            if(this.level == 0){
                this.aboutme.x = this.eventPoints[i].x + this.posX;
                this.aboutme.y = this.eventPoints[i].y + this.posY;
                this.aboutme.canvas = this.canvasTl;
                this.canvasT1 = this.aboutme.draw(this.isActive);
            }
            // this.canvasTl.rectMode(CENTER);
            // this.canvasTl.rect(10,20,20,20);
            this.canvasTl.pop();
        }
    }
}

const aboutMeTitle = "Luis Miguel Palacio Restrepo";
const aboutMeTxt = "Interested in the design of digital and physical interfaces, highlighting its impact on the user's emotions; looking to generate meaningful experiences. Furthermore, with knowledge of animation, videogames, mobile applications, Internet of Things and exploration of new technologies.";

class AboutMe{
    constructor(canvas, color){
        this.canvas = canvas;
        this.MiguelGif;
        this.sizeX = 100;
        this.sizeY = 140;
        this.color = color;
        this.x;
        this.y;
    }

    setUp(){
        this.MiguelGif = createImg("./resources/MiguelGif.gif", "Profile Picture",'');
    }

    resize(){
        console.log("CONFIG");
        this.MiguelGif.size(this.sizeX,this.sizeY);
        this.MiguelGif.position(this.x-150,this.y-this.sizeY-20);
    }

    draw(isActive){
        if(isActive){
            this.resize();
            push();
            noFill();
            stroke(this.color);
            rect(this.x-155,this.y-this.sizeY-25, this.sizeX+10,this.sizeY+10);
            noStroke();
            // fill(75,255,100, 40);
            // rect(this.x-155,this.y-this.sizeY-25, this.sizeX+325,this.sizeY+10);
            fill(this.color);
            textSize(16);
            text(aboutMeTitle, this.x-20, this.y-this.sizeY-15, this.sizeX+(w/5),this.sizeY);
            fill(255);
            textSize(12);
            text(aboutMeTxt, this.x-20, this.y-this.sizeY+10, this.sizeX+150,this.sizeY);
            pop();
            // this.MiguelGif.show();
        }else{
            // this.MiguelGif.hide();
            this.MiguelGif.size(this.sizeX/2,this.sizeY/2);
            this.MiguelGif.position(this.x-(this.sizeX/4),this.y-(this.sizeY/2)-20);
            push();
            noFill();
            stroke(this.color);
            rect(this.x-(this.sizeX/4)-5,this.y-(this.sizeY/2)-25, (this.sizeX/2)+10,(this.sizeY/2)+10);
            pop();
        }
        return this.canvas;
    }
}

class Tools{
    constructor(canvas, color){
        this.canvas = canvas;
    }

    draw(){

    }
}