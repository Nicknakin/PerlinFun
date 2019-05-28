class Ball{
    constructor(x, y, c){
        this.pos = createVector(x,y);
        this.c = c;
        this.a = createVector(0,0);
        this.v = createVector(0,0);
        this.antiBall = random(1) > 0.5;
    }

    draw(){
        if(this.antiBall) {
            this.c = {r: this.c.r, g: 128*this.c.r/255, b: 0};
        } else {
            this.c = {r: 0, g: 128*this.c.b/255, b: this.c.b};
        }
        fill(this.c.r, this.c.g, this.c.b);
        stroke(this.c.r, this.c.g, this.c.b);
        strokeWeight(1);
        point(this.pos.x, this.pos.y);
        strokeWeight(1);
    }

    move(){        
        this.v = this.v.add(this.a);
        if(this.antiBall){
            this.pos = this.pos.sub(this.v);
        } else{
            this.pos = this.pos.add(this.v);
        }
    }
}

function randomBall(){
    return new Ball(random(width), random(height), randomColor());
}

function randomColor(){
    return {r:random(255), g:random(255), b:random(255)};
}