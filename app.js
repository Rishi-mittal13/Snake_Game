const can = document.getElementById("canvas");
const pen = can.getContext("2d");

const cs = 40;
const W = 1100;
const H = 660;
let food = null;
let score = 0 ;

const snake = {
    inLen: 5,
    direction: 'right',
    cells: [],

    //create Snake . initially .
    createSnake: function () {
        for (let i = 0; i < this.inLen; i++) {
            this.cells.push({
                x: i,
                y: 0
            });
        }
    },

    //draw Snake 
    drawSnake: function () {
        for (let obj of this.cells) {
            pen.fillRect(obj.x * cs, obj.y * cs, cs - 1, cs - 1);
        }
    },

    //update Snake . 
    updateSnake: function () {
        let headX = this.cells[this.cells.length - 1].x;
        let headY = this.cells[this.cells.length - 1].y;
        if (headX == food.x && headY === food.y) {
            food =  getRandomFood();
            score++;
        }
        else {
            //remove first element .
            this.cells.shift();

        }

        let nextX;
        let nextY;

        //updating the direction .
        if (this.direction === "up") {
            nextX = headX;
            nextY = headY - 1;
            if(nextY*cs<0){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over` , 50 ,  100);
                clearInterval(id);
            }
        }
        else if (this.direction === "down") {
            nextX = headX;
            nextY = headY + 1;
            if(nextY*cs>=(H-19.66)){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over` , 50 ,  100);
                clearInterval(id);
            }
        }
        else if (this.direction === "left") {
            nextX = headX - 1;
            nextY = headY;
            if(nextX*cs<0){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over` , 50 ,  100);
                clearInterval(id);
            }
        }
        else if (this.direction === "right") {
            nextX = headX + 1;
            nextY = headY;
            if(nextX*cs>=W){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over` , 50 ,  100);
                clearInterval(id);
            }
        }



        //push new rectangle.
        this.cells.push({
            x: nextX,
            y: nextY
        });
    }

}

function init() {
    snake.createSnake();

    food = getRandomFood();

    function keypress(e) {
        if (e.key === "ArrowUp") {
            snake.direction = "up"
        }
        else if (e.key === "ArrowDown") {
            snake.direction = "down";
        }
        else if (e.key === "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key === "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key === "Enter" || e.key === "r") {
            location.reload();
        }
    }

    document.addEventListener('keydown', keypress);


}

function update() {
    snake.updateSnake();

}

function draw() {
    pen.clearRect(0, 0, W, H);
    pen.font = "40px sans-serif"
    pen.fillText(`Score: ${score}` ,  50 , 50);
    pen.fillStyle = 'blue';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}

function gameloop() {
    draw();
    update();
}

//function for get food for snake .
function getRandomFood() {
    let fx = Math.round(Math.random() * (W - cs) / cs);
    let fy = Math.round(Math.random() * (H - cs) / cs);
    food = {
        x: fx,
        y: fy
    }
    return food;
}
init();

let id = null ;
const levelpage = document.querySelector("#label-page");
const list = document.querySelectorAll('#ullist li')
for (let obj of list) {
    let levels = obj.addEventListener('click', deficulty)
    function deficulty(e) {
        let text =  obj.textContent;
        if(text==="Easy"){
            id = setInterval(gameloop, 180);
        }
        else if(text === "Medium"){
            id = setInterval(gameloop, 120);
        }
        else if(text === "Hard"){
            id = setInterval(gameloop, 60);
        }
        levelpage.style.display = "none";

    }
}
