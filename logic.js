/*jshint esversion: 6 */
let time = 0;
let dims = new Array(2).fill(0.01886);
let balls;
let numBalls = 1000;
let maxSpeed = 5;

let currentX, currentY;

var backgroundImage;

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    xOffset = xOffsetStart = 0;
    yOffset = yOffsetStart = 0;
    currentX = 0;
    currentY = height/2;

    balls = new Array(numBalls).fill().map(() =>  randomBall());

    backgroundImage = createGraphics(width, height);
    for(let y = 0; y < height; y+=20){
        for(let x = 0; x < width; x+=20){x
            const noiseX = x*dims[0];
            const noiseY = y*dims[1];
            const noiseNum = noise(noiseX, noiseY, time);
            const noiseAngle = map(noiseNum, 0, 1, -PI, PI);
            backgroundImage.push();
            backgroundImage.stroke(128);
            backgroundImage.strokeWeight(1);
            backgroundImage.translate(x,y);
            backgroundImage.rotate(noiseAngle);
            backgroundImage.line(0,0,15,0);
            backgroundImage.strokeWeight(4);
            backgroundImage.point(0,0);
            backgroundImage.pop();
        }
    }

    noiseDetail(2);
    background(0);
}

function draw(){
    background(0, 0, 0, 16);
    //image(backgroundImage, 0, 0);
    balls.forEach((ball) => {
        const noiseX = ball.pos.x*dims[0];
        const noiseY = ball.pos.y*dims[1];
        const noiseNum = noise(noiseX, noiseY, time);
        const noiseAngle = map(noiseNum, 0, 1, -PI, PI);
        const noiseVector = p5.Vector.fromAngle(noiseAngle);
        ball.v = noiseVector;
        ball.move();
        ball.draw();
        if((ball.pos.x < 0 || ball.pos.x > width) || (ball.pos.y < 0 || ball.pos.y > height)){
            ball.pos = createVector(random(width), random(height));
            ball.v = ball.v.mult(0);
        }
    });
    // time += 0.00001;
}