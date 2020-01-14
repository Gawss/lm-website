var w = window.innerWidth;
var h = window.innerHeight;
let canvas;

let cubes = [];
let numCubes = 3;
const cubeTitles = ["A b o u t  m e", "P r o j e c t s", "T o o l s"];
let cubeColors = [];
let cubeSize = 20/(h/w);

let timeLine;
let counterTxt;

function setup() {
    canvas = createCanvas(w, h);
    canvas.style('display', 'block');
    cubeColors = [color(75,255,100), color(0,200,255), color(240,60,50)];
    setUpSocket();
    cubeSize = (cubeSize<25)?25:cubeSize;
    for(let i=0; i<numCubes;i++){
        cubes.push(new Cube(cubeTitles[i],(w/4)*(i+1),(h/4)*3,cubeSize, cubeColors[i]));
        cubes[i].setUp();
    }

    timeLine = new Timeline(w/2, h/2, 200, 10);
    counterTxt = new CustomText(0, 200,200);
    timeLine.setUp();
}

function draw() {
    background(0,3,10);
    fill(255);
    text("Working!",100,100);
    counterTxt.drawText();

    for(let i=0; i<numCubes;i++){
        cubes[i].draw();
    }

    timeLine.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = window.innerWidth;
    h = window.innerHeight;
    cubeSize = 20/(h/w);
    cubeSize = (cubeSize<25)?25:cubeSize;
    for(let i=0; i<numCubes;i++){
        cubes[i].setStatus((w/4)*(i+1),(h/4)*3, cubeSize);
    }
}

function drawLines(){
    for(let i = 0; i < h/20;i++){
        let mouseDistance = Math.abs(((h/20)*(i+1)-mouseY)/h);
        line(0, (h/20)*(i+1), mouseX-(6500*mouseDistance), (h/20)*(i+1));
        line(w, (h/20)*(i+1), mouseX+(6500*mouseDistance), (h/20)*(i+1));
    }
}

function mousePressed(){
    // console.log("sending message...");
    // socket.emit('message', "123");
    timeLine.rotateLeft();
    
    for(let i=0; i<numCubes;i++){
        if(cubes[i].clickAvailable){
           cubes[i].onMousePressed(pressed(cubes[i].title));
        }
    }
}

function pressed(x){
    console.log(x)
}