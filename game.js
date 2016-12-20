var lifespan = 300;

//--------------------------------
// Game Object
//--------------------------------
function Game(width, height) {
    this.width = width;
    this.height = height;
    this.numGeneration = 0;
    this.maxFitness = 0;
    
    this.wallLength = 200;

    this.amebas = [];
    this.popsize = 50;
    this.time = 0;
    this.food = new Food();
    this.preys = []
    this.n_prey = 1;

    this.matingPool = [];

    this.init = function () {
        // Create initial Amebas
        for (var i = 0; i < this.popsize; i++) {
            this.amebas[i] = new Ameba();
        }
        // Create Preys
        for (var i = 0; i < this.n_prey; i++) {
            this.preys[i] = new Prey(createVector(width / 2, random(100)),
                15,
                this.wallLength);
        }
    }

    this.isOutOfBound = function (pos) {
        return (pos.x <= 0 || pos.y <= 0 ||
            pos.x >= this.width || pos.y >= this.height)
    }

    this.isEatten = function (pos) {
        for (var i = 0; i < this.n_prey; i++) {

            if (pos.x >= this.preys[i].pos.x &&
                pos.y >= this.preys[i].pos.y &&
                pos.x <= this.preys[i].pos.x + this.preys[i].width &&
                pos.y <= this.preys[i].pos.y + this.preys[i].height) {
                return true;
            }

        }
        return false;
    }

    this.resetGame = function () {
        this.time = 0;
        this.numGeneration++;
    }

    this.run = function () {

        if (this.time >= lifespan) {
            this.evaluate();
            this.resetGame();
        }

        this.food.update();
        this.food.show();

        for (var i = 0; i < this.n_prey; i++) {
            this.preys[i].update();
            this.preys[i].show();
        }

        for (var i = 0; i < this.amebas.length; i++) {
            this.amebas[i].update(this.time);

            this.amebas[i].calcFitness(this.food.pos);

            if (this.isOutOfBound(this.amebas[i].pos)) {
                this.amebas[i].die();
            }

            if (this.isEatten(this.amebas[i].pos)) {
                this.amebas[i].getEatten();
            }

            
            this.amebas[i].show();
        }

        this.time++;
    }

    this.evaluate = function () {
        console.log('evaluating...');

        // Find max
        var maxFitness = -100;
        for (var i = 0; i < this.amebas.length; i++) {
            if (maxFitness < this.amebas[i].fitness) {
                maxFitness = this.amebas[i].fitness;

            }
        }

        this.maxFitness = maxFitness;

        // normalize fitness
        for (var i = 0; i < this.amebas.length; i++) {
            this.amebas[i].fitness /= maxFitness;
        }

        // put amebas to the pool
        this.matingPool = [];
        for (var i = 0; i < this.amebas.length; i++) {
            var n = this.amebas[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.amebas[i]);
            }
        }

        // selection
        var newGeneration = [];
        for (var i = 0; i < this.amebas.length; i++) {
            var parentA_DNA = random(this.matingPool).dna;
            var parentB_DNA = random(this.matingPool).dna;
            var childDNA = parentA_DNA.crossover(parentB_DNA);
            childDNA.mutation();
            newGeneration[i] = new Ameba(childDNA);
        }

        this.amebas = newGeneration;
    }

}