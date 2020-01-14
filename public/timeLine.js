class Timeline {
    constructor(x, y, size, numEvents) {
        this.posX = x;
        this.posY = y;
        this.size = size;
        this.canvasTl;
        this.angle = 0;

        this.events = (numEvents>5)?5:numEvents;
    }

    setUp(){
        this.canvasTl = createGraphics(this.size*2.5, this.size*2.5, WEBGL);
        this.canvasTl.background(255,255,255,0);
        this.canvasTl.rotateX(radians(75));
    }

    draw(){
        this.canvasTl.background(0,0,0,0);
        this.canvasTl.push();
        this.canvasTl.stroke(255, 200);
        this.canvasTl.noFill();        
        this.canvasTl.rectMode(CENTER);
        //this.canvasTl.rect(0, 0, this.size, this.size);
        this.polygon(0, 0, this.size/2, this.events);
        this.canvasTl.translate(0,0,30);
        this.canvasTl.stroke(70,200,100, 200);
        this.polygon(0, 0, this.size/2, this.events);
        this.canvasTl.fill(0,200,100, 200);
        this.canvasTl.noStroke();
        this.canvasTl.translate(0,0,70);
        this.canvasTl.sphere(this.size/18);
        this.canvasTl.pop();
        // this.rotateLeft();
        imageMode(CENTER);
        image(this.canvasTl, this.posX, this.posY);
    }

    rotateLeft(){
        this.canvasTl.rotateZ(radians(5));
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