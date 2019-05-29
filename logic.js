/*jshint esversion: 6 */

let xOffset, yOffset;
let xOffsetStart, yOffsetStart;
let xInc, yInc;
let time = 0;
let dims = [8, 8];
let balls = [];
let numBalls = 2500;
let maxSpeed = 4;

let currentX, currentY;

function setup(){
    createCanvas(floor(window.innerWidth*0.95), floor(window.innerHeight*0.95));
    position = createVector(width/2, height/2);
    xInc = 0.01;
    yInc = 0.01;
    xOffset = xOffsetStart = 0;
    yOffset = yOffsetStart = 0;
    currentX = 0;
    currentY = height/2;
    for(let i = 0; i < numBalls; i++){
        balls.push(randomBall());
        currentX %= width;
        if(currentX == 0) currentY = (currentY+1)%height;
    }
    noiseDetail(32);
    background(0);
}

function draw(){
    balls.forEach((ball) => {
        const noiseX = ball.pos.x/dims[0]*xInc+xOffsetStart;
        const noiseY = ball.pos.y/dims[1]*yInc+yOffsetStart;
        const noiseNum = noise(noiseX, noiseY);
        const noiseAngle = map(noiseNum, 0, 1, -2*PI, 2*PI);
        const noiseVector = p5.Vector.fromAngle(noiseAngle);
        ball.c.r = ball.c.g = ball.c.b = map(noise(noiseAngle, time), 0, 1, 0, 255);
        ball.v = (noiseVector);
        if(ball.v.mag() > maxSpeed){
            ball.v = ball.v.normalize();
            ball.v = ball.v.mult(maxSpeed);
        }
        ball.move();
        ball.draw();
        if((ball.pos.x < 0 || ball.pos.x > width) || (ball.pos.y < 0 || ball.pos.y > height)){
            ball.pos = createVector(random(width), random(height));
            ball.v = ball.v.mult(-1);
        }
    });

    time += 0.005;
}