var w = window.innerWidth;
var h = window.innerHeight;
let canvas;

let cube;
let cube2;
let cube3;

function setup() {
    canvas = createCanvas(w, h);
    canvas.style('display', 'block');
    
    cube = new Cube((w/4)*1,(h/4)*3,30);
    cube2 = new Cube((w/4)*2,(h/4)*3,30);
    cube3 = new Cube((w/4)*3,(h/4)*3,30);
    cube.setUp();
    cube2.setUp();
    cube3.setUp();
}

function draw() {
    background(0,3,10);
    fill(255);
    text("Working!",100,100);
    cube.draw();
    cube2.draw();
    cube3.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = window.innerWidth;
    h = window.innerHeight;
    cube.setPosition((w/4)*1,(h/4)*3);
    cube2.setPosition((w/4)*2,(h/4)*3);
    cube3.setPosition((w/4)*3,(h/4)*3);
}

function drawLines(){
    for(let i = 0; i < h/20;i++){
        let mouseDistance = Math.abs(((h/20)*(i+1)-mouseY)/h);
        line(0, (h/20)*(i+1), mouseX-(6500*mouseDistance), (h/20)*(i+1));
        line(w, (h/20)*(i+1), mouseX+(6500*mouseDistance), (h/20)*(i+1));
    }
}

function mousePressed(){

}