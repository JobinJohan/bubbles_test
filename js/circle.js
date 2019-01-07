class Circle{

  constructor(maxWidth, maxHeight, isBlue){
    this.x = parseInt(Math.floor(Math.random() * Math.floor(maxWidth)));
    this.y = parseInt(Math.floor(Math.random() * Math.floor(maxHeight)));
    this.r = getRandomArbitrary(30, 150);
    this.selected = false;
    const color = ['red', 'green', 'yellow', 'blue'];
    if(isBlue){
      this.label = color[3];
    }
    else{
      this.label = color[Math.floor(Math.random()*2)];
    }
    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    this.fillColor = hue;

    do{
      var textColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      this.textRandomColor= textColor;
    }while(textColor==hue);
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getRadius(){
    return this.r;
  }
  getLabel(){
    return this.label;
  }
  getFillColor(){
    return this.fillColor;
  }
  getState(){
    return this.selected;
  }

  circleDraw(){
    fill(this.fillColor);
    noStroke();
    ellipse(this.x,this.y,this.r, this.r);
    fill(this.textRandomColor);
    text(this.label, this.x, this.y);
    return this; // allows method chaining
  }



}
