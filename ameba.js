//-------------------------------
//
//--------------------------------
function DNA(genes) {
    this.activeLevel = 0.1
    this.genes = [];
    if(genes){
        this.genes = genes;
    }else{
        // make new gene ~
        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(this.activeLevel);
        }
    }


    this.crossover = function(partnerDNA){
        var newGenes = [];
        var midPoint = floor(random(this.genes.length))
        for(var i =0;i<this.genes.length; i++){
            if(i<midPoint){
                newGenes[i] = this.genes[i];
            }
            else{
                newGenes[i] = partnerDNA.genes[i];
            }
        }

        return new DNA(newGenes);
    }

    this.mutation = function(){
        var mutationRate = 0.01;
        for(var i =0;i<this.genes.length; i++){
            if(random(1) < mutationRate){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(this.activeLevel);
            }
        }
    }

}

function Ameba(dna) {
    this.pos = createVector(width - 50, height - 50);
    this.vel = createVector();
    this.acc = createVector();
    this.fitness = 0;
    
    if(dna){
        this.dna = dna;
    }else{
        this.dna = new DNA();
    }
    
    this.isDied = false;

    this.applyForce = function (force) {
        this.acc.add(force)
    }

    // The closer to food, the better.
    this.calcFitness = function(food_pos){
        var d = dist(food_pos.x,
                    food_pos.y, 
                    this.pos.x, 
                    this.pos.y);

        this.fitness = map(d, 0, 400, 100, 0);
        
        // console.log(d )
        // sucessfully eat food?
        // I need you to the next gen.
        if(d < 16){
            this.fitness += 100
            this.die();
        }
        
    }


    this.die = function(){
        this.isDied = true;
        this.fitness -= 10;
    }

    this.getEatten = function(){
        this.fitness -= 100;
        this.die();
    }

    this.update = function (time) {

        if (!this.isDied) {
            this.applyForce(this.dna.genes[time])
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

    }

    this.show = function () {
        if (!this.isDied) {
            push();
            noStroke();
            fill(100, 255, 100, 150);
            translate(this.pos.x, this.pos.y);
            rotate(this.vel.heading());
            rectMode(CENTER);
            rect(0, 0, 10, 3);
            pop();
        } else {
            push();
            noStroke();
            fill(255, 100, 100, 150);
            translate(this.pos.x, this.pos.y);
            rotate(this.vel.heading());
            rectMode(CENTER);
            rect(0, 0, 10, 3);
            pop();
        }

    }

}