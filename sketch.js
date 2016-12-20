var game;

var amebaNumberSlider;
var amebaNumberDiv;

var wallSlider;
var wallDiv;

function setup() {
    createCanvas(400, 400);
    initGame();
    // Create UI
    lifeP = createP();
    amebaNumberDiv = createDiv();
    amebaNumberSlider = createSlider(0, 200, 25);

    wallDiv = createDiv();
    wallSlider = createSlider(0, 300, 200);

    button = createButton('reset game');
    button.mousePressed(initGame);
}

function draw() {
    background(0);
    game.run();

    lifeP.html('Generation ' + game.numGeneration + ', time ' + game.time + ', Max Fitness ' + game.maxFitness);
    amebaNumberDiv.html('Number of Ameba ' + amebaNumberSlider.value());
    wallDiv.html('Wall length ' + wallSlider.value());
}

function initGame(){
    game = new Game(400, 400);
    
    if(amebaNumberSlider){
        game.popsize = amebaNumberSlider.value();
        game.wallLength = wallSlider.value();
    }

    game.init();
        
}