
var started = false;
var ended=false;
let score = 0;
let life = 3;

var circles = [];
var level = 1;
var timers = [];

function setup() {
  createCanvas(windowWidth, windowHeight-100);
  noLoop();
}

function draw() {
  if(started){
    background(220);
    fill(50);
    text("Score: " + score, 10, 20);
    text("Life: " + life, windowWidth-100, 20);
    text("Level: " + level, 10, 40);

    for(i=0;i<circles.length;++i){
      circles[i].circleDraw();
    }
  }
  else if(ended){
    background(220);
    fill(50);
    text("End of the game, your score is " + score, 10, 20);


  }

}

function mousePressed(){

  for(i=0;i<circles.length; ++i){
    let d = dist(mouseX, mouseY, circles[i].getX(), circles[i].getY());
    if(d < circles[i].getRadius()){
      if(circles[i].getLabel()=='blue' && circles[i].getState()==false){
        circles[i].selected=true;
        score++;
        if(score==(level*(level+1))/2){
          level+=1;
          timers.forEach(function(element){
            window.clearInterval(element);
          });
          start();
        }
        circles.splice(i,1);
        break;
      }
      else if(circles[i].getLabel()!='blue'){
        life--;
        if(life==0){
          document.getElementById("timer").hidden=true;
          started =false;
          ended=true;
        }
        break;
      }
    }
  }

}

function start(){
  if(document.getElementById("mainMenu")!= null){
    document.getElementById("mainMenu").remove();
  }
  startTimer();
  initCircles();
  started=true;
  loop();
}

function startTimer(){
  var timeleft = 10;
  document.getElementById("timer").hidden=false;
  var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 10 - --timeleft;
    document.getElementById("remainingTime").innerHTML= timeleft;
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      document.getElementById("timer").hidden=true;
      started = false;
      ended= true;
    }
    },1000);
  timers.push(downloadTimer);
  console.log(downloadTimer);
}

function initCircles(){
circles=[];
  for(i=0;i<level*5;++i){
    if(i<level){
      var newCircle = new Circle(windowWidth-150, windowHeight-150, true);
    }
    else{
      var newCircle = new Circle(windowWidth-150, windowHeight-150, false);
    }
    circles.push(newCircle);
    console.log(circles);
  }

}
