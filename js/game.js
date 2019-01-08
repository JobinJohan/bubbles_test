
var started = false;
var ended=false;
let score = 0;
let life = 3;

var circles = [];
var level = 1;
var timers = [];

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  noLoop();
}

function draw() {
  if(started){
    background(220);
    fill(50);
    text("Score: " + score, 10, 20);
    text("Life: " + life, windowWidth-140, 20);
    text("Level: " + level, 10, 40);

    for(i=0;i<circles.length;++i){
      circles[i].circleDraw();
    }
  }
  else if(ended){
    circles=[];
    background(220);
    fill(50);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("End of the game, your score is " + score, (windowWidth-140)/2, 300);
    var button = createButton('Play again');
    button.addClass('flat-button');
    button.position((windowWidth-350)/2, 350);
    button.mousePressed(function(){location.reload();});


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
  if(document.getElementById("header")!=null){
    document.getElementById("header").remove();
  }
  startTimer();
  initCircles();
  started=true;
  loop();
}

function startTimer(){
  var timeleft = 20;
  document.getElementById("timer").hidden=false;
  var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 20 - --timeleft;
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
  var protection = 0;

  // Try to get to 500
  var k=0;
  while (circles.length <=level*5) {
    if(k<level){
        var newCircle = new Circle(windowWidth-150, windowHeight-150, true);
      }
      else{
        var newCircle = new Circle(windowWidth-150, windowHeight-150, false);
      }

    // Does it overlap any previous circles?
    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(newCircle.getX(), newCircle.getY(), other.getX(), other.getY());
      if (d < newCircle.getRadius() + other.getRadius()) {
        overlapping = true;
      }
    }

    // If not keep it!
    if (!overlapping) {
      k++;
      circles.push(newCircle);
    }

    // Are we stuck?
    protection++;
    if (protection > 10000) {
      break;
    }
}


}
