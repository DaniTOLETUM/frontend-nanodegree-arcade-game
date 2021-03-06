/*----------ENEMIES----------*/
/*---------------------------*/

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //Enemy variables
    this.x =x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //check colisions with player
    if (player.x < this.x + 60 &&
        player.x +37 > this.x &&
        player.y < this.y +25 &&
        30 + player.y > this.y){
        player.x = 200;
        player.y = 380;
    }

    //Reset position of enemies when they go out of canvas and new speed
    if (this.x > 550){
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/*----------PLAYER----------*/
/*--------------------------*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    //Player's variables
    this.x = x;
    this.y = y;
    this.speed = speed;
    //The image/sprite for our player
    this.sprite = 'images/char-boy.png';
};

//Player Prototype
Player.prototype.update = function() {
    //Player can't go out of screen
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    //If Player reach top of canvas, he wins
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//Initial position of enemies
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
