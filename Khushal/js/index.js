//*******************PRELOADER**********************************

$(window).on('load',function(){
  $('.preloader').fadeOut('slow');
})

var navHeight = $(".navbar").height();

//******************CANVAS****************************************

var canvas = $("#canvas")[0];
canvas.width = window.innerWidth;
var canvasHeight = window.innerHeight - (navHeight);
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');
// ctx.fillStyle = 'rgba(255,0,0,0.1)';
// ctx.fillRect(100,100,100,100);
// ctx.fillRect(200,200,100,100);
// ctx.fillRect(300,300,100,100);

//line

// ctx.beginPath();
// ctx.moveTo(50,300);
// ctx.lineTo(300,100);
// ctx.strokeStyle = "#fa34a3";
// ctx.stroke();

//circle

var mouse = {
  x: undefined,
  y: undefined
}
$("canvas").mousemove(function(event){
  mouse.x = event.pageX;
  mouse.y = event.pageY - navHeight;
})

$(window).resize(function(){
  canvas.width = window.innerWidth;
  var canvasHeight = window.innerHeight - (navHeight);
  canvas.height = canvasHeight;
})

function Circle(x,y,radius,dx,dy,color,minRadius){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.minRadius = radius;
  this.draw = function(){
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // ctx.stroke(); removing stroking to remove borders from circles
    ctx.fillStyle = this.color;
    ctx.fill();

  }
  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > canvasHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    //Interactivity
    if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
      if(this.radius<40){
        this.radius += 1;
      }
    }
    else if(this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray = [];

for(var i = 0; i < 200; i++){
  var radius = Math.random()*10 + 5;
  var x = Math.random()*(innerWidth - 2*radius) + radius;
  var y = Math.random()*(canvasHeight - 2*radius) + radius;
  var dx = (Math.random()-0.5) * 4;
  var dy = (Math.random()-0.5) * 4;
  var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

  circleArray.push(new Circle(x,y,radius,dx,dy,color));
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,canvasHeight);
  for(var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }

}
animate();
