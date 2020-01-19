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

// -------------------------
let projectsCanvas;
let toolImgs = [];
let numTools = 9;
let toolsCV_SizeX = (((w/4)*3)*80)/100;
let projectsCV_SizeX = (((w/4)*3)*20)/100;
let projectsCV_SizeY = h-60-(toolsCV_SizeX/numTools)/2;
let projectImgs = [];
let numProjects = 4;

let project_active;
let tools_by_project = [
    [0,2,7,8],
    [1,2,3,4],
    [4,5,6,7],
    [0,1,8]
];

let aboutMeCanvas;
let aboutCV_SizeX = w/4;
let aboutCV_SizeY = (h*100)/100;
let picture;

function setup() {

        
    canvas = createCanvas(w, h);
    canvas.style('display', 'block');
    projectsCanvas = createGraphics(toolsCV_SizeX + projectsCV_SizeX,h);
    aboutMeCanvas = createGraphics(aboutCV_SizeX,aboutCV_SizeY);

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

    if(!isPhone){
        for(let i=0; i<numProjects; i++){
            let size_ = 60;
            let x_ = (toolsCV_SizeX+projectsCV_SizeX)-(projectsCV_SizeX/2);
            let y_ = (projectsCV_SizeY/numProjects)*(i) + (projectsCV_SizeY/numProjects)/2;
    
            projectImgs.push(new imageObj(projectsCanvas, x_, y_, size_, "project"));
            projectImgs[i].loadImg(i, "projects");
            projectImgs[i].asignTools(tools_by_project[i]);
        }
    
        for(let i=0; i<numTools; i++){
            
            let size_ = 60;
            let x_ = (toolsCV_SizeX/numTools)*(i) + (toolsCV_SizeX/numTools)/2;
            let y_ = h-(toolsCV_SizeX/numTools)/2;
            
    
            toolImgs.push(new imageObj(projectsCanvas, x_, y_, size_, "tool"));
            toolImgs[i].loadImg(i, "tools");
        }

        picture = new About(aboutCV_SizeX/2,((aboutCV_SizeX*60/100)/2) + 50,aboutCV_SizeX*45/100,aboutCV_SizeX*60/100);
        picture.load();
    }
}

function draw() {
        
    background(30,30,30);
    // counterTxt.drawText();
    if(isPhone){
        for(let i=0; i<numCubes;i++){
            cubes[i].draw();
        }
        
        for(let i=0; i<numLevels;i++){
            levels[numLevels-1-i].update();
            levels[numLevels-1-i].draw();
        }
    }else{
        let projectActive = null;
        let distance;
        projectsCanvas.background(40,40,40,255);
        // projectsCanvas.fill(100,200,0,50);
        // projectsCanvas.rect(0, h-60, toolsCV_SizeX, 30);
        // projectsCanvas.rect(projectsCV_SizeX*4, 0, projectsCV_SizeX, projectsCV_SizeY);
        for(let i=0; i<numProjects; i++){
            projectsCanvas = projectImgs[i].draw(projectsCanvas);
            distance = dist(0, projectImgs[i].y, 0, mouseY);            
            if(mouseX > ((w/4)*1) & distance < 80){
                // line(((w-10)/numProjects)*(1+i), h, ((w-10)/numProjects)*(1+i), map(distance, h, 0, h, projectImgs[i].y));
                projectActive = i;
            }
        }
        for(let k=0; k<numTools; k++){
            if(projectActive != null){
                toolImgs[k].isMoving = false;
                projectImgs[projectActive].tools.forEach(element => {
                    if(k == element){
                        toolImgs[k].isMoving = true;
                        toolImgs[k].move(projectImgs[projectActive].y);
                    }
                });
                for(let l=0; l<numProjects; l++){
                    if(projectActive != l){
                        projectImgs[l].tools.forEach(element => {
                            if(!toolImgs[element].isMoving){
                                toolImgs[element].isMoving = true;
                                toolImgs[element].move(h-(toolsCV_SizeX/numTools)/2);
                            }
                        });
                    }
                }
            }else{
                toolImgs[k].move(h-(toolsCV_SizeX/numTools)/2);
            }
            projectsCanvas = toolImgs[k].draw(projectsCanvas);
        }
        aboutMeCanvas = picture.draw(aboutMeCanvas);        
        image(aboutMeCanvas, 0, 0);
        image(projectsCanvas, ((w/4)*1), 0);
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