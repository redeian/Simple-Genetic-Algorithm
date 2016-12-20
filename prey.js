function Prey(pos, width, height){
    this.pos = pos;
    this.width = width;
    this.height = height

    this.update = function(){

    }

    this.show = function(){
        push();
        noStroke();
        fill(200,50,50);
        rect(this.pos.x, this.pos.y, this.width, this.height);
        rectMode(CENTER);
        pop();
    }
}