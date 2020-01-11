var w = window.innerWidth;
var h = window.innerHeight;
let pg;
let canvas;
let leftMenu;
let dGraphic;

let positionX = [];
let positionY = [];

let distance=0;
let angle = 0;

function setup() {
    canvas = createCanvas(w, h);
    canvas.style('display', 'block');
    pg = createGraphics(w, h);
    leftMenu = createGraphics(w/5,h);
    dGraphic = createGraphics(w/5, w/5, WEBGL);
    leftMenu.background(0,255,0);
    pg.background(255,255,255,0);
    noCursor();

    positionX = [w/2];
    positionY = [(h/4)*3];
    //pixelDensity(1);
}

function draw() {
    background(0,3,10);
    canvas.fill(255,200);
    canvas.stroke(255);
    // line(0, mouseY, windowWidth, mouseY);
    // line(mouseX, 0, mouseX, windowHeight);
    // rectMode(CENTER);
    // rect(mouseX,mouseY,20,20);
    ellipseMode(CENTER);
    
    ellipse(mouseX+random(-10,10),mouseY+random(-10,10),10,10);
    ellipse(mouseX+random(-10,10),mouseY+random(-10,10),10,10);
    ellipse(mouseX+random(-10,10),mouseY+random(-10,10),10,10);
    // drawLines();
    // image(pg, 0, 0);
    // image(leftMenu,0,0);
    draw3DCude();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = window.innerWidth;
    h = window.innerHeight;
    positionX = [w/2];
    positionY = [(h/4)*3];
}

function drawLines(){
    for(let i = 0; i < h/20;i++){
        let mouseDistance = Math.abs(((h/20)*(i+1)-mouseY)/h);
        line(0, (h/20)*(i+1), mouseX-(6500*mouseDistance), (h/20)*(i+1));
        line(w, (h/20)*(i+1), mouseX+(6500*mouseDistance), (h/20)*(i+1));
    }
}

function draw3DCude(){

    let maxDistance = GetMagnitude(w/2,h/2);
    
    let directionX = ((positionX[0] - mouseX)>0)? -1:1;
    let directionY = ((positionY[0] - mouseY)>0)? -1:1;
    let catetoX = abs(positionX[0] - mouseX);
    let catetoY = abs(positionY[0] - mouseY);
    let hipothenuse = GetMagnitude(catetoX,catetoY);

    //line(positionX[0],positionY[0], positionX[0]+(directionX*catetoX),positionY[0]);
    //line(positionX[0]+(directionX*catetoX),positionY[0], positionX[0]+(directionX*catetoX),positionY[0]+(directionY*catetoY));
    line(positionX[0],positionY[0],positionX[0]+(directionX*catetoX),positionY[0]+(directionY*catetoY));
    distance = maxDistance - hipothenuse;
    let speed = Math.pow(distance*0.0006,2);
        
    if(angle >= 360){
        angle = 0;
    }else{
        angle += speed;
    }

    let rotation = angle;
    dGraphic.background(0,0,0,0);
    dGraphic.push();
    dGraphic.rotateX(rotation);
    dGraphic.rotateY(rotation);
    dGraphic.fill(100,100,100,5);
    dGraphic.noStroke();
    dGraphic.stroke(200,200,200,5);
    dGraphic.box(50,50,50);
    dGraphic.stroke(200,200,200,50);
    dGraphic.ellipseMode(CENTER);
    dGraphic.ellipse(0,0,100);
    dGraphic.pop();
    imageMode(CENTER);
    drawMenu(hipothenuse, positionX[0], positionY[0])
    image(dGraphic, positionX[0],positionY[0]);
}

function GetMagnitude(vec1, vec2){
    let magnitude = Math.sqrt((vec1*vec1) + (vec2*vec2));
    return magnitude;
}

function GetCateto(hypotenuse, cateto1){
    let cateto2 = Math.sqrt((hypotenuse*hypotenuse)-(cateto1*cateto1));
    return cateto2;
}

function mousePressed(){
    pg.fill(0);
    pg.rectMode(CENTER);
    pg.rect(mouseX,mouseY,20,20);
}