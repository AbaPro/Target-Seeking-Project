let vehicle,target;
let imgg,imgr;
let img,imgX,imgY,img_siz=60;
let rct_siz=300,rctX=100,rctY=100;
function preload(){
  img=loadImage('https://www.i2clipart.com/cliparts/a/e/6/4/clipart-target-512x512-ae64.png')
}
function setup() {
    var canv=createCanvas(750, 500);
     canv.parent("sketch-holder");
    vehicle = new Vehicle(200, 200);
}

function draw() {
  background(51);
   
    textSize(52);
  text("Seek the target.",50,87);

  fill(255, 0, 255);
  noStroke();
  target = createVector(mouseX, mouseY);
  imgX=target.x-img_siz/2;
  imgY=target.y-img_siz/2;

  image(img,imgX,imgY,img_siz,img_siz);

  vehicle.seek(target);
  vehicle.update();
  vehicle.show();
  textSize(19);
  noStroke();
  text("Abanob Raffet @2022",290,450);

}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.25;
    this.r = 16;
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}
