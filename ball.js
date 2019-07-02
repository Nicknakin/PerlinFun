class Ball{
    constructor(x, y, c){
        this.pos = createVector(x,y);
        this.c = c;
        this.a = createVector(0,0);
        this.v = createVector(0,0);
        this.antiBall = random(1) > 0.5;
        if(this.antiBall){
            this.c.g = map(this.c.r, 0, 255, 0, 128);
            this.c.b = 0;
        } else{
            this.c.r = 0
            this.c.g = map(this.c.b, 0, 255, 0, 128);
        }
    }

    draw(){
        fill(this.c.r, this.c.g, this.c.b);
        stroke(this.c.r, this.c.g, this.c.b);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        //line(this.pos.x, this.pos.y, this.v.x+this.pos.x, this.v.y+this.pos.y);
        strokeWeight(1);
    }

    move(){        
        this.v.add(this.a);
        this.v.add(p5.Vector.mag(this.pos.x-width/2, this.pos.y-height/2));
        if(this.antiBall){
            this.pos.sub(this.v);
        } else{
            this.pos.add(this.v);
        }
    }
}

function randomBall(n){
    if(!n)
        return new Ball(random(width), random(height),randomColor());
    else
        return new Ball(n%width, Math.floor(n/width), randomColor())
}

function randomColor(){
    return {r:random(128, 255), g:random(128, 255), b:random(128, 255)};
}