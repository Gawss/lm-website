var w = window.innerWidth;
var h = window.innerHeight;

let segoeUI_Font;
let isPhone = false;
let canvas;

let global_state = 0;
let scrollVal = 0;

let txtPosX_1 = w/2;
let txtPosY_1 = h/2;
let txtPosX_2 = w*18/100;
let txtPosY_2 = h*10/100;
let titleSize = w/50;

let mainLinePosX_01 = w/2-135;
let mainLinePosY_01 = h/2+5;
let mainLinePosX_02 = w*2/100;
let mainLinePosY_02 = h*10/100;

let mainLinePosX_11 = w/2+400;
let mainLinePosY_11 = h/2+5;
let mainLinePosX_12 = w*2/100;
let mainLinePosY_12 = h - h*2/100;

let scrollTriangPosX_1 = w*30/100;
let scrollTriangPosY_1 = h*80/100;
let scrollTriangPosX_2 = w*2/100;
let scrollTriangPosY_2 = h*15/100;
let scrollTriangSize_1 = 100;
let scrollTriangSize_2 = 18;
let scrollTriangRotation_1 = 110;
let scrollTriangRotation_2 = 180;

let rectPicturePosX_0 = w*20/100;
let rectPicturePosY_0 = h*20/100;
let rectPicturePosX_1 = w*5/100;
let rectPicturePosY_1 = h*12/100;
let rectPicutureWidth_0 = 50;
let rectPicutureWidth_1 = 180;
let rectPicutureHeight_0 = 50;
let rectPicutureHeight_1 = 240;
let profilePicture;

let amount = 0;
let step = 1;

let sizeTriangle_Index = 30;
let locationTriangle_Index;
let locationTriangleIndexX_0 = w*80/100;
let locationTriangleIndexY_0 = h*20/100;
let locationTriangleIndexX_1 = w*70/100;
let locationTriangleIndexY_1 = h*53/100;
let rotationTriangleIndex_0 = 200;
let rotationTriangleIndex_1 = 0;

let sizeTriangle_Scroll;
let locationTriangle_Scroll;

let profileTitle;
let profileTxt;
let profileYear;

let projectTxt;
let projectImgs = [];
let numProjects = 4;

let ellipsePosX;
let ellipsePosY;
let ellipseSize;
let ellipsePosX_0 = (w*75)/100;
let ellipsePosY_0 = (h*70)/100;
// let ellipsePosX_1 = (w*70)/100;
// let ellipsePosY_1 = (h*65)/100;
let ellipsePosX_1 = (w*70)/100;
let ellipsePosY_1 = (h*30)/100;
let ellipseSize_0 = 40;
let ellipseSize_1 = 250;

function preload(){
    segoeUI_Font = loadFont('./resources/fonts/Segoe UI.ttf');
    profilePicture = loadImage('./resources/MiguelPicture.PNG');

    for(let i=0; i<numProjects;i++){
        // projectImgs.push(loadImage('./resources/projects/' + i + '.jpg'));
        projectImgs.push(new img(0,0,0,loadImage('./resources/projects/' + i + '.jpg'),30+(30*(numProjects-i))));
    }
}

function setup() {

    document.getElementById("profileContent").style.display = "none";
    profileTitle = createP(profileTitle_);
    profileTitle.parent("profileContent");
    profileTitle.class("profileTxt");

    profileTxt = createP(profileTxt_);
    profileTxt.parent("profileContent");
    profileTxt.class("profileTxt");
    
    profileYear = createP(profileYear_);
    profileYear.parent("profileContent");

    projectTxt = createP("Project Content - Empty");
    projectTxt.parent("projectContent");
    projectTxt.class("projectText");

    canvas = createCanvas(w, h);
    canvas.parent("mainCanvas");
    canvas.id("canvasP5");

    angleMode(DEGREES);

    if(w<600){
        isPhone = true;

        // set options to prevent default behaviors for swipe, pinch, etc
        var options = {
            preventDefault: true
        };

        // document.body registers gestures anywhere on the page
        var hammer = new Hammer(document.body, options);
        hammer.get('swipe').set({
            direction: Hammer.DIRECTION_ALL
        });

        hammer.on("swipe", swiped);
        console.log(isPhone);  
    }

    resizeContent();
}

function draw() {
    isPhone = (w<600)?true:false;
    background(255);

    if(global_state == 0){
        noStroke();
        fill(0,135,255,255);
        textFont(segoeUI_Font);
        textAlign(CENTER, BOTTOM);
        textSize(titleSize);
        if(scrollVal<0)scrollVal=0;
        if(amount>179){scrollVal=60; amount=60;}
        if(amount < scrollVal){
            amount += step;
        }else if(amount > scrollVal){
            amount -= step;
        }
        var m = map(amount, 0, 20, 0, 1);
        m = constrain(m, 0,1);
        let titlePosX = lerp(txtPosX_1, txtPosX_2, m);
        let titlePosY = lerp(txtPosY_1, txtPosY_2, m);
        text('LUIS MIGUEL PALACIO RESTREPO', titlePosX, titlePosY);
        textSize(20);
        fill(0,135,255,lerp(255/2,0,m));
        text('Scroll down to begin.', w/2, h*90/100);
        stroke(0,135,255,255/2);
        noFill();
        var m = map(amount, 10, 30, 0, 1);
        m = constrain(m, 0,1);

        let mainLinePosX_0 = lerp(mainLinePosX_01, mainLinePosX_02, m);
        let mainLinePosY_0 = lerp(mainLinePosY_01, mainLinePosY_02, m);
        let mainLinePosX_1 = lerp(mainLinePosX_11, mainLinePosX_12, m);
        let mainLinePosY_1 = lerp(mainLinePosY_11, mainLinePosY_12, m);
        line(mainLinePosX_0, mainLinePosY_0, mainLinePosX_1, mainLinePosY_1);

        var m = map(amount, 20, 35, 0, 1);
        m = constrain(m, 0,1);
        var mScroll = map(amount, 40, 180, 0,1);
        mScroll = constrain(mScroll, 0, 1);
        sizeTriangle_Scroll = lerp(scrollTriangSize_1,scrollTriangSize_2, m);
        let scrollTriang_PosX = lerp(scrollTriangPosX_1, scrollTriangPosX_2, m);
        let scrollTriang_PosY = lerp(scrollTriangPosY_1, lerp(scrollTriangPosY_2, mainLinePosY_1-15, mScroll), m);
        locationTriangle_Scroll = createVector(scrollTriang_PosX,scrollTriang_PosY);

        push();
        fill(255);
        translate(locationTriangle_Scroll);
        rotate(lerp(scrollTriangRotation_1, scrollTriangRotation_2,m));
        triangle(0, 0, -1*sizeTriangle_Scroll, 1.2*sizeTriangle_Scroll, 1*sizeTriangle_Scroll, 1.2*sizeTriangle_Scroll);
        pop();

        var m = map(amount, 35, 45, 0, 1);
        m = constrain(m, 0,1);
        let rectPicturePosX = lerp(rectPicturePosX_0, rectPicturePosX_1, m);
        let rectPicturePosY = lerp(rectPicturePosY_0, rectPicturePosY_1, m);
        let rectPictureWidth = lerp(rectPicutureWidth_0, rectPicutureWidth_1, m);
        let rectPictureHeight = lerp(rectPicutureHeight_0, rectPicutureHeight_1, m);
        
        rect(rectPicturePosX, rectPicturePosY, rectPictureWidth, rectPictureHeight);
        push();
        tint(255, lerp(0,255,m));
        image(profilePicture, rectPicturePosX+(w*0.5/100), rectPicturePosY+(w*0.5/100), rectPictureWidth-(w*1/100), rectPictureHeight-(w*1/100));
        pop();

        var m = map(amount, 40, 50, 0, 1);
        m = constrain(m, 0,1);
        if(m>0){document.getElementById("profileContent").style.display = "flex";}
        else{document.getElementById("profileContent").style.display = "none";}
        profileTitle.style("color: rgba(50,50,50," + m + ");");
        profileTxt.style("color: rgba(50,50,50," + m + ");");
        profileYear.style("color: rgba(50,50,50," + m + ");");

        var m = map(amount, 45, 55, 0, 1);
        m = constrain(m, 0,1);
        
        sizeTriangle_Index = 30;
        locationTriangleIndex_X = lerp(locationTriangleIndexX_0, locationTriangleIndexX_1, m);
        locationTriangleIndex_Y = lerp(locationTriangleIndexY_0, locationTriangleIndexY_1, m);
        locationTriangle_Index = createVector(locationTriangleIndex_X,locationTriangleIndex_Y);

        push();        
        translate(locationTriangle_Index);
        rotate(lerp(rotationTriangleIndex_0, rotationTriangleIndex_1, m));
        triangle(0, 0, -1*sizeTriangle_Index, 1.2*sizeTriangle_Index, 1*sizeTriangle_Index, 1.2*sizeTriangle_Index);
        pop();

        var m = map(amount, 48, 60, 0, 1);
        m = constrain(m, 0,1);
        ellipsePosX = lerp(ellipsePosX_0, ellipsePosX_1, m);
        ellipsePosY = lerp(ellipsePosY_0, ellipsePosY_1, m);
        ellipseSize = lerp(ellipseSize_0, ellipseSize_1, m);
        
        var m_ = map(amount, 60, 180, 0, 1);
        m_ = constrain(m_, 0,1);
        
        push();
        translate(ellipsePosX, ellipsePosY);
        rotate(lerp( 0, 360, m_));
        ellipse(0, 0, ellipseSize);
        push();
        rotate(lerp(0,360,m));
        tint(255, lerp(0,255,m));
        fill(255, lerp(0,255,m));
        stroke(0,135,255,lerp(0,255,m))
        polygon(0, 0, ellipseSize/2, numProjects, m_, lerp( 0, 360, m_));
        pop();
        pop();

        push();
        noStroke();
        fill(0,135,255,lerp(0,255,m));
        text(projectTitles[GetProjectActive(scrollVal)], locationTriangle_Index.x, locationTriangle_Index.y+sizeTriangle_Index*2+10);
        projectTxt.style("color: rgba(50,50,50," + m + ");");
        pop();

        fill(100,100,100,255);
        text(mouseX + ", " + mouseY, mouseX+5, mouseY-5);
    }
}

function polygon(x, y, radius, npoints, m_, angle_) {

    imageMode(CENTER);
    rectMode(CENTER);

    let angle = TWO_PI / npoints;
    let i = 0;
    // beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        angleMode(RADIANS);
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        var xAngle = cos(radians(angle_)+a)*radius;
        var yAngle = sin(radians(angle_)+a)*radius;
        angleMode(DEGREES);
    
    //   vertex(sx, sy);
        push();
        translate(sx, sy);
        rotate(-360*m_);
        rect(0, 0, ((radius*2)/npoints)+10, ((radius*2)/npoints)+10);
        // image(projectImgs[i], 0, 0, (radius*2)/npoints, (radius*2)/npoints);
        projectImgs[i].draw(ellipsePosX+xAngle, ellipsePosY+yAngle, (radius*2)/npoints, (radius*2)/npoints);
        pop();
        i++;
    }
    // endShape(CLOSE);
}

function GetProjectActive(scrollPosition_){
    for(let i = 0; i<projectImgs.length;i++){
        if(projectImgs[i].scrollPos == scrollPosition_) {return i+1;}
    }
    return 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = window.innerWidth;
    h = window.innerHeight;
    isPhone = (w<600)?true:false;
}

function swiped(event) {
    let msg;
    if (event.direction == 4) {
        msg = "you swiped right";
    } else if (event.direction == 8) {
        msg = "you swiped up";
        scrollVal -= 10;
    } else if (event.direction == 16) {
        msg = "you swiped down";
        scrollVal += 10;
    } else if (event.direction == 2) {
        msg = "you swiped left";
    }
    console.log(msg);
}

function resizeContent(){
    if(isPhone){
        rectPicutureWidth_0 = 50;
        rectPicutureHeight_0 = 50;
        rectPicutureWidth_1 = 130;
        rectPicutureHeight_1 = 165;
        rectPicturePosX_0 = (w*20/100);
        rectPicturePosY_0 = h*20/100;
        rectPicturePosX_1 = (w*23/100)-rectPicutureWidth_1/2;
        rectPicturePosY_1 = h*3/100;

        titleSize = w/18;
        txtPosX_1 = w/2;
        txtPosY_1 = h/2;
        txtPosX_2 = w*47/100;
        txtPosY_2 = (h*4/100) + rectPicutureHeight_1 + titleSize;
        document.getElementById("profileContent").style.left = "5%";
        document.getElementById("profileContent").style.top = "33%";
        document.getElementById("profileContent").style.width = "80%";

        mainLinePosX_01 = w/2-135;
        mainLinePosY_01 = h/2+5;
        mainLinePosX_02 = w;
        mainLinePosY_02 = h*25/100;
        
        mainLinePosX_11 = w/2+400;
        mainLinePosY_11 = h/2+5;
        mainLinePosX_12 = 0;
        mainLinePosY_12 = h*25/100;

        ellipsePosX_0 = (w*75)/100;
        ellipsePosY_0 = (h*70)/100;
        ellipsePosX_1 = (w*50)/100;
        ellipsePosY_1 = (h*70)/100;
        ellipseSize_0 = 40;
        ellipseSize_1 = 150;
    }
}

function mouseWheel(event) {  
    //move the square according to the vertical scroll amount
    let force = 10;
    if(scrollVal>60){
        force = 5;
    }
    if(event.delta > 0){
        scrollVal += force;
        if(scrollVal > 61 && scrollVal < 89){
            scrollVal = 90;
        }
        if(scrollVal > 91 && scrollVal < 119){
            scrollVal = 120;
        }
        if(scrollVal > 121 && scrollVal < 149){
            scrollVal = 150;
        }
        if(scrollVal > 151 && scrollVal < 179){
            scrollVal = 180;
        }
    }else{
        scrollVal -= force;
        if(scrollVal > 61 && scrollVal < 89){
            scrollVal = 60;
        }
        if(scrollVal > 91 && scrollVal < 119){
            scrollVal = 90;
        }
        if(scrollVal > 121 && scrollVal < 149){
            scrollVal = 120;
        }
        if(scrollVal > 151 && scrollVal < 179){
            scrollVal = 150;
        }
    }
    projectTxt.html(projectContents[projectTitles[GetProjectActive(scrollVal)]]);
    //uncomment to block page scrolling
    // return false;
}

function mousePressed(){
    // console.log(amount);
    for(let i=0;i<projectImgs.length;i++){
        if(projectImgs[i].isClicked()) {
            console.log(projectImgs[i].scrollPos);
            scrollVal = projectImgs[i].scrollPos;
            projectTxt.html(projectContents[projectTitles[GetProjectActive(scrollVal)]]);
        }
    }
}