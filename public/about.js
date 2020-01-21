const aboutMeTitle = "Luis Miguel Palacio Restrepo";
const aboutMeTxt = "Interested in the design of digital and physical interfaces, highlighting its impact on the user's emotions; looking to generate meaningful experiences. Furthermore, with knowledge of animation, videogames, mobile applications, Internet of Things and exploration of new technologies.";

class About{
    constructor(x, y, sizeX, sizeY){
        this.MiguelGif;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.x = x;
        this.y = y;

        this.pictureDiv;
        this.picture;
        this.textDiv;
        this.textTitle;
        this.textInfo;
    }

    load(){
        this.MiguelGif = loadImage("./resources/MiguelPicture.PNG");
        // this.textTitle = createDiv(aboutMeTxt);
        // this.textTitle.position(10, this.y + 40 + this.sizeY/2);

        this.pictureDiv = createDiv();
        this.pictureDiv.parent("informativeCanvas");
        this.pictureDiv.id("infoCV-profilePic");
        this.pictureDiv.class("profilePic");
        this.picture = createImg("./resources/MiguelPicture.PNG", "Profile Picture");
        this.picture.parent("infoCV-profilePic");
        // this.picture.src = "./resources/MiguelPicture.PNG";
        
        this.textInfo = createP(aboutMeTxt);
        this.textInfo.id("infoCV-textInfo");
        this.textInfo.parent("informativeCanvas");
    }

    draw(canvas_){
        canvas_.background(0,0,0,0);
        canvas_.push();
        canvas_.textAlign(CENTER);
        canvas_.textSize(16);
        canvas_.noStroke();
        canvas_.fill(75,255,100, 5);
        canvas_.text(aboutMeTitle, this.x, this.y + 16 + 15 + this.sizeY/2);
        canvas_.pop();

        // canvas_.push();
        // canvas_.textAlign(LEFT);
        // canvas_.fill(255);
        // canvas_.textSize(14);
        // canvas_.textLeading(16);
        // canvas_.text(aboutMeTxt, 10, this.y + 40 + this.sizeY/2, aboutCV_SizeX-20);
        // let text_ = text(aboutMeTxt, 10, this.y + 40 + this.sizeY/2, aboutCV_SizeX-20);
        // text_.style('text-align: justify;');        
        // this.textTitle.style('text-align: justify; width:' + 320 + 'px;');

        canvas_.imageMode(CENTER);
        canvas_.image(this.MiguelGif, this.x, this.y, this.sizeX, this.sizeY);
        canvas_.noFill();
        canvas_.stroke(75,255,100);
        canvas_.rectMode(CENTER);
        canvas_.rect(this.x,this.y, this.sizeX+10,this.sizeY+10);
        return canvas_;
    }

}