class img{
    constructor(x, y, size, img_, amount){
        this.x = x;
        this.y = y;
        this.size = size;
        this.isActive = false;
        this.img_ = img_;
        this.scrollPos = amount;
        this.isHover = false;
    }

    draw = function(x, y, size) {

        this.isHover = (dist(mouseX, mouseY, this.x, this.y)<this.size/2)? true:false;
        let noise
        if(this.isHover){
            noise = random(-3, 3);
        }else{
            noise = 0;
        }
        this.x = x;
        this.y = y;
        this.size = size;
        image(this.img_, noise, noise, this.size, this.size);
    }

    isClicked = function(){
        // var d = dist(mouseX, mouseY, this.x, this.y);
        if(this.isHover){
            return true;
        }
        return false;
    }
}