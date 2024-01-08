const gameboard=document.getElementById('gameboard')
const context=gameboard.getContext('2d')
const WIDTH=gameboard.width;
const HEIGHT=gameboard.height;
const scoreval=document.getElementById('scoreval')
let score=0
const UNIT=25;
let xvel=25;
let yvel=0;
let active=true;
let started=false;
let snake=[{
    x:UNIT*3,y:0
},
{
    x:UNIT*2,y:0
},
{
    x:UNIT,y:0
},
{
    x:0,y:0
}]
window.addEventListener('keydown',keypress)

startgame();

function startgame(){
    let active=true
    context.fillStyle='#000';
    context.fillRect(0,0,WIDTH,HEIGHT);
   createfood();
   displayfood()
 drawsnake()
 
    }
    function clearboard(){
        context.fillStyle='#000';
    context.fillRect(0,0,WIDTH,HEIGHT);
    }

   
    function createfood(){
        foodx = Math.floor(Math.random()*WIDTH/UNIT)*UNIT
        foody = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT
    }


    function displayfood(){
        context.fillStyle ='red';
        context.fillRect(foodx,foody,UNIT,UNIT);
    }
    
    function drawsnake(){
      
        context.fillStyle='aqua';
        context.strokeStyle='#000';
       snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)
       })
    }
    function movesnake(){
        const head={x:snake[0].x+xvel,
                     y:snake[0].y+yvel}
                     snake.unshift(head)
            if(snake[0].x==foodx && snake[0].y==foody){
                score+=1;
                scoreval.textContent=score;
                createfood()
           }
        else{snake.pop()}
                     
    }
    function nexttick(){
        if(active){
       setTimeout(() => {
        
        clearboard()
        displayfood()
        movesnake()
        drawsnake()
        gamechecker()
        nexttick()
        
       }, 500);
       
    }
    else{
clearboard();
context.font="bold 50px serif"
context.fillStyle='white'
context.textAlign='center'
context.fillText('Game Over!!',WIDTH/2,HEIGHT/2)
    }
    }
    
    function keypress(event){
       if(!started){
        started=true
        nexttick()
       }
        const LEFT=37
        const UP=38
        const  RIGHT=39
        const DOWN=40
       
switch(true){
    
case(event.keyCode==LEFT &&  xvel!=UNIT):
   xvel=-UNIT;
   yvel=0;
   break;
   case(event.keyCode==RIGHT &&  xvel!=-UNIT ):
   xvel=UNIT;
   yvel=0;
break;
   case(event.keyCode==UP && yvel!=UNIT):
   xvel=0;
   yvel=-UNIT;
   break;
   
   case(event.keyCode==DOWN &&  yvel!=-UNIT  ):
   xvel=0;
   yvel=UNIT;
  break;


}
    }
    function gamechecker(){
        switch(true){
            case(snake[0].x<0):
            case(snake[0].x>=WIDTH):
            case(snake[0].y<0):
            case(snake[0].y>=HEIGHT):

            active=false;
            break;
        }
    }
  