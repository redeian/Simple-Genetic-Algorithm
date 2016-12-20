function Food(){
    this.energy = 16;
    this.pos = createVector(100, 100);

    this.init = function(){
        this.energy = 16;
    }

    this.update = function(){
        // this.energy--;
        // if(this.energy <= 0){
        //     this.energy = 16;
        // }
    }

    this.show = function(){
        ellipse(this.pos.x, this.pos.y, this.energy, this.energy);
    }

}