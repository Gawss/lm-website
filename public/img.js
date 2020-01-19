class imageObj{
    constructor(canvas_, x, y, size, type){
        this.canvas_ = canvas_;
        this.x = x;
        this.y = y;
        this.size = size;
        this.img;
        this.tools = [];
        this.isMoving = false;
        this.type = type;
    }

    loadImg(i, topic){
        this.img = loadImage("./resources/" + topic + "/" + i + ".jpg");
    }
    draw(canvas_){
        // this.canvas_.push();
        this.canvas_ = canvas_;
        this.canvas_.imageMode(CENTER);
        this.canvas_.push();
        this.canvas_.rectMode(CENTER);
        if(this.type == "tool"){
            this.canvas_.fill(100,255,200,255);
            this.canvas_.stroke(100,255,200,255);
            this.canvas_.rect(this.x, (h-(toolsCV_SizeX/numTools)/2)+(this.size/2), this.size+(this.size/2), 20);
            this.canvas_.line(this.x, (h-(toolsCV_SizeX/numTools)/2)+(this.size/2), this.x, this.y+(this.size/2)+5);
        }
        this.canvas_.fill(200,200);
        this.canvas_.noStroke();
        this.canvas_.rect(this.x, this.y, this.size+10, this.size+10);
        this.canvas_.pop();
        this.canvas_.image(this.img, this.x, this.y, this.size, this.size);
        // this.canvas_.pop();
        return this.canvas_;
    }

    asignTools(tools){
        this.tools = tools;
    }

    move(newPosition){
        if(newPosition > this.y){
            this.y += 15;
            if(this.y > newPosition){
                this.y = newPosition;
            }
        }
        if(newPosition < this.y){
            this.y -= 15;
            if(this.y < newPosition){
                this.y = newPosition;
            }
        }
    }
}