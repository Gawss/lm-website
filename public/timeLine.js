class Timeline {
    constructor(x, y, size, numEvents, color_) {
        this.posX = x;
        this.posY = y;
        this.size = size;
        this.canvasTl;
        this.angle = 0;
        this.events = numEvents;

        this.isActive = false;
        this.color_ = color_;
        this.dColor = color(200,200,200,150);
    }

    setUp(){
        this.canvasTl = createGraphics(this.size*2.5, this.size*2.5, WEBGL);
        this.canvasTl.background(255,255,255,0);
        this.canvasTl.rotateX(radians(75));
    }

    draw(){
        this.canvasTl.background(0,0,0,0);
        this.canvasTl.push();
        this.canvasTl.stroke((this.isActive)?this.color_:this.dColor);
        this.canvasTl.noFill();        
        this.canvasTl.rectMode(CENTER);
        //this.canvasTl.rect(0, 0, this.size, this.size);
        this.polygon(0, 0, (this.size/2)-((this.size/2)/this.events), this.events);
        this.canvasTl.translate(0,0,30);
        this.canvasTl.fill((this.isActive)?this.color_:this.dColor);
        this.canvasTl.noStroke();
        this.canvasTl.pop();
        // this.rotateLeft();
        imageMode(CENTER);
        image(this.canvasTl, this.posX, this.posY);
    }

    setStatus(x,y){
        this.posX = x;
        this.posY = y;
    }

    rotate(value){
        this.canvasTl.rotateZ(radians(value));
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        this.canvasTl.beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
          let sx = x + cos(a) * radius;
          let sy = y + sin(a) * radius;
          this.canvasTl.vertex(sx, sy);
        }
        this.canvasTl.endShape(CLOSE);

        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            this.canvasTl.push();
            this.canvasTl.translate(sx,sy,0);
            this.canvasTl.sphere(this.size/25);
            this.canvasTl.pop();
        }
      }
}