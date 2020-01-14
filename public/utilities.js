function GetDistance(x1,y1,x2,y2){

    let directionX = ((x1 - x2)>0)? -1:1;
    let directionY = ((y1 - y2)>0)? -1:1;
    let catetoX = abs(x1 - x2);
    let catetoY = abs(y1 - y2);
    let hipothenuse = GetMagnitude(catetoX,catetoY);

    // push();
    // stroke(255);
    // line(x1,y1,x1+(directionX*catetoX),y1+(directionY*catetoY));
    // pop();
    return hipothenuse;
}

function GetMagnitude(vec1, vec2){
    let magnitude = Math.sqrt((vec1*vec1) + (vec2*vec2));
    return magnitude;
}

function GetCateto(hypotenuse, cateto1){
    let cateto2 = Math.sqrt((hypotenuse*hypotenuse)-(cateto1*cateto1));
    return cateto2;
}