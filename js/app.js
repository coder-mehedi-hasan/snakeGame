// data & variable declare 
let inputDir = {x:0,y:0}
const moveSound = new Audio('media/move.mp3');
const foodSound = new Audio('media/food.mp3');
const overSound = new Audio('media/gameover.mp3');
const bgMusic = new Audio('media/music.mp3');
bgMusic.volume = 0.5
let paintTime = 0;
let speed = 5;
let snakeArr = [{x:13,y:15}];
let food = {x:6,y:7}
let score = 0;


function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - paintTime )/1000 < 1/speed){
        return;
    }
    paintTime = ctime
    gameEngine()
}
// reset snake 
function snakeReset(snake){
    for(i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }
    }
    if(snake[0].x <0 || snake[0].x >18 || snake[0].y<0 || snake[0].y>18){
        return true
    }
}

function gameEngine(){
    //snake array and food update
    if(snakeReset(snakeArr)){
        overSound.play();
        bgMusic.pause();
        inputDir = {x:0,y:0};
        score = 0;
        alert('Game Over Press any key & game restart');
        snakeArr = [{x:13,y:15}];
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }
    // food eat
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        score+=1
        document.getElementById('score').innerHTML = 'Score: ' + score;
        if(score>=30){
            speed = 6
        }else if(score>=50){
            speed=7
        }else if(score>=70){
            speed=9
        }else{
            speed=5
        }
        a = 1
        b = 18
        food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
    }
    // snake run 
    for(i = snakeArr.length - 2 ;i >=0;i--){
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    //display snake and food
    //display snake
    board.innerHTML=""
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if(index === 0){
            snakeElement.classList.add('head')
            if(inputDir.x === 0 && inputDir.y===-1){
                snakeElement.classList.add('headUp')
            }else if(inputDir.x === 0 && inputDir.y===1){
                snakeElement.classList.add('headBtm')
            }else if(inputDir.x === 1 && inputDir.y===0){
                snakeElement.classList.add('headRight')
            }else if(inputDir.x === -1 && inputDir.y===0){
                snakeElement.classList.add('headLeft')
            }
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    //display food
    foodElement = document.createElement('div')    
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// main logic
window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    bgMusic.play()
    inputDir = {x:0,y:1}
    switch(e.key){
        case 'ArrowUp' :
            inputDir.x = 0;
            inputDir.y = -1;
        break;

        case 'ArrowDown' :
            inputDir.x = 0;
            inputDir.y = 1;
        break;

        case 'ArrowRight' :
            inputDir.x = 1;
            inputDir.y = 0;
        break;

        case 'ArrowLeft' :
            inputDir.x = -1;
            inputDir.y = 0;
        break;

        default :
        break;

    }
})