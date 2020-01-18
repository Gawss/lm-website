var w = window.innerWidth;
var h = window.innerHeight;
var isPhone = false;
let canvas;

let cubes = [];
let numCubes = 3;
const cubeTitles = ["A b o u t  m e", "P r o j e c t s", "T o o l s"];
let cubeSize = 20/(h/w);
let cubesLocation = [
    {
        x:cubeSize+50,
        y:cubeSize+70
    },
    {
        x:cubeSize+50,
        y:(cubeSize+70)*3
    },
    {
        x:cubeSize+50,
        y:(cubeSize+70)*5
    }
];
let cubeColors = [];

let levels = [];
let numLevels = 3;
let lvlEvents = [1,3,9];
let lvlColors = [];
let timeLine_radio;
let counterTxt;

let mouseCube;
let cubeCv;

function setup() {

    if(w<600){
        isPhone = true;
        cubesLocation = [
            {
                x:(w/4)*(0+1),
                y:(h/4)*3
            },
            {
                x:(w/4)*(1+1),
                y:(h/4)*3
            },
            {
                x:(w/4)*(2+1),
                y:(h/4)*3
            }
        ];
    }
    canvas = createCanvas(w, h);
    canvas.style('display', 'block');
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

    cubeColors = [color(75,255,100), color(0,200,255), color(240,60,50)];
    lvlColors = [color(75,255,100, 180), color(0,200,255,180), color(240,60,50,180)];
    setUpSocket();
    cubeSize = (cubeSize<25)?25:cubeSize;
    for(let i=0; i<numCubes;i++){        
        cubes.push(new Cube(cubeTitles[i],cubesLocation[i].x,cubesLocation[i].y,cubeSize, cubeColors[i]));
        cubes[i].setUp();
    }

    timeLine_radio = 400;
    if(w<600){
        timeLine_radio = 200;
    }
    for(let i=0; i<numLevels;i++){
        levels.push(new Timeline(w/2, (h/3)+((h/(numLevels*3))*(i)), timeLine_radio, lvlEvents[i], lvlColors[i], i));
    }
    counterTxt = new CustomText(0, 200,200);

    for(let i=0; i<numLevels;i++){
        levels[i].setUp();
    }

    cubeCv = createGraphics(w,h, WEBGL);
    mouseCube = new Projects(cubeCv, 1);
    mouseCube.setUp();

}

function draw() {
        
    background(30,30,30); 
    // counterTxt.drawText();

    for(let i=0; i<numCubes;i++){
        cubes[i].draw();
    }
    
    for(let i=0; i<numLevels;i++){
        // var angle = angle + levels[i].force;
        levels[numLevels-1-i].update();
        levels[numLevels-1-i].draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = window.innerWidth;
    h = window.innerHeight;
    isPhone = (w<600)?true:false;
    timeLine_radio = (w<600)?200:400;
    cubeSize = 20/(h/w);
    cubeSize = (cubeSize<25)?25:cubeSize;

    if(w<600){
        cubesLocation = [
            {
                x:(w/4)*(0+1),
                y:(h/4)*3
            },
            {
                x:(w/4)*(1+1),
                y:(h/4)*3
            },
            {
                x:(w/4)*(2+1),
                y:(h/4)*3
            }
        ];
    }else{
        cubesLocation = [
            {
                x:cubeSize+50,
                y:cubeSize+70
            },
            {
                x:cubeSize+50,
                y:(cubeSize+70)*3
            },
            {
                x:cubeSize+50,
                y:(cubeSize+70)*5
            }
        ];
    }
    for(let i=0; i<numCubes;i++){
        cubes[i].setStatus(cubesLocation[i].x,cubesLocation[i].y, cubeSize);
    }
    for(let i=0; i<numLevels;i++){
        levels[i].setStatus(w/2, (h/3)+((h/(numLevels*3))*i), timeLine_radio);
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
    
    // for(let i=0; i<numLevels;i++){
    //     levels[i].rotate(5);
    // }
    for(let i=0; i<numCubes;i++){
        if(cubes[i].clickAvailable){
           cubes[i].onMousePressed(pressed(cubes[i].title, i));
           levels[i].isActive = !levels[i].isActive;
        }
    }
}

function pressed(x, i){
    console.log(x)
    levels[i].rotate(-1);
    // for(let i=0; i<numLevels;i++){
        
    // }
}

function swiped(event) {
    let msg;
    if (event.direction == 4) {
        msg = "you swiped right";
        for(let i=0; i<numLevels;i++){
            levels[i].rotate(-1);
        }
    } else if (event.direction == 8) {
        msg = "you swiped up";
    } else if (event.direction == 16) {
        msg = "you swiped down";
        location.reload();
    } else if (event.direction == 2) {
        msg = "you swiped left";
        for(let i=0; i<numLevels;i++){
            levels[i].rotate(1);
        }
    }
  }