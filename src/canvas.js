export const canvasFunc = ()=>{

    const countdownContainer = document.querySelector("#countDown")
    var canvas = document.querySelector("canvas")
    const innerWidth = window.innerHeight - 100;
    const innerHeight = window.innerHeight -200;

    canvas.width = innerWidth;
    canvas.height = innerHeight

    window.onresize=()=>{
        console.log(window.innerWidth)
    }
    let c = canvas.getContext("2d")







    let initialWidth = 300;

    const resetGame =()=>{
        ball.positionX = innerWidth / 2
        ball.positionY = innerHeight / 2
        ball.radius = 20
        ball.velocityX = (Math.random()  * 2 + 5 ) * (Math.floor(Math.random() * 2) ? 1 : -1)
        ball.velocityY = (Math.random()  * 2 + 5 ) * (Math.floor(Math.random() * 2) ? 1 : -1)
    }

    let player = {
        positionX: innerWidth/2 - initialWidth/2,
        positionY:innerHeight-70,
        elementWidth:initialWidth,
        elementHeight:30,
        movementSpeed : 50,
        point:0,
        lose : ()=>{
            if(ball.positionY > innerHeight){
                player.point++
                document.querySelector("#pointPreview").innerHTML = `${enemy.point} : ${player.point}`
                resetGame()
            }
        }
    }

    let enemy = {
        positionX: innerWidth/2 - initialWidth/2,
        positionY: 70,
        elementWidth:initialWidth,
        elementHeight:30,
        movementSpeed : 50,
        point:0,
        lose : ()=>{
            if(ball.positionY < 0){
                enemy.point++
                document.querySelector("#pointPreview").innerHTML = `${enemy.point} : ${player.point}`
                resetGame()

            }
        }
    }

    let ball = {
        positionX : innerWidth / 2,
        positionY : innerHeight / 2,
        radius : 20,
        velocityX : (Math.random()  * 2 + 5 ) * (Math.floor(Math.random() * 2) ? 1 : -1),
        velocityY : (Math.random()  * 2 + 5 ) * (Math.floor(Math.random() * 2) ? 1 : -1),
        ballMovement :()=>{
            c.beginPath()
            c.arc(ball.positionX,ball.positionY,ball.radius,0,Math.PI*2,false)
            c.fillStyle = "green"
            c.fill()

            ball.positionY += ball.velocityY
            ball.positionX += ball.velocityX

            if (ball.positionY> (player.positionY - ball.radius) - ball.velocityY && ball.positionY <  (player.positionY - ball.radius) + ball.velocityY && ball.positionX > player.positionX && ball.positionX < (player.positionX + player.elementWidth)){
                if (ball.velocityY > 0) {
                    ball.velocityY = -ball.velocityY
                    console.log(ball.positionY)
                }
            }

            if (ball.positionY < (enemy.positionY + enemy.elementHeight + ball.radius) - ball.velocityY && ball.positionY >  (enemy.positionY + enemy.elementHeight + ball.radius) + ball.velocityY && ball.positionX > enemy.positionX && ball.positionX < (enemy.positionX + enemy.elementWidth)){
                if (ball.velocityY < 0) {
                    ball.velocityY = -ball.velocityY
                    console.log(ball.positionY)
                }
            }


            walls.wallBallEncounter();

            if (ball.positionX> (innerWidth - ball.radius - wallHeight)){
                ball.velocityX = -ball.velocityX
            }
            if( ball.positionX < ball.radius + wallHeight){
                ball.velocityX = -ball.velocityX
            }




        }
    }
    const goalWidth = innerWidth * 50 /100;
    const wallWidth = (innerWidth - goalWidth) /2;
    const wallHeight = 30;
    let walls = {
        wallsArray : [
            {
                positionX: 0,
                positionY: 0,
                elementWidth: wallWidth,
                elementHeight: wallHeight,
            },{
                positionX: innerWidth - wallWidth,
                positionY: 0,
                elementWidth: wallWidth,
                elementHeight: wallHeight,
            },{
                positionX: 0,
                positionY: innerHeight - wallHeight,
                elementWidth: wallWidth,
                elementHeight: wallHeight,
            },{
                positionX: innerWidth - wallWidth,
                positionY: innerHeight - wallHeight,
                elementWidth: wallWidth,
                elementHeight: wallHeight,
            },
            {
                positionX: 0,
                positionY: 0,
                elementWidth: wallHeight,
                elementHeight: innerHeight,
            },
            {
                positionX: innerWidth - wallHeight,
                positionY: 0,
                elementWidth: wallHeight,
                elementHeight: innerHeight,
            }
        ],
        makeWalls: () => {
            c.fillStyle = "black"
            walls.wallsArray.map(i => (
                c.fillRect(i.positionX, i.positionY, i.elementWidth, i.elementHeight)
            ))
        },
        wallBallEncounter: () => {
            walls.wallsArray.map((i,index) => {
                if (index == 0 || index == 1)
                {
                    if (ball.positionY < (i.positionY + ball.radius + i.elementHeight) && ball.positionX > i.positionX && ball.positionX < (i.positionX + i.elementWidth) ){
                        ball.velocityY = -ball.velocityY
                    }
                }
                if (index==2 || index == 3){
                    if (ball.positionY > (i.positionY - ball.radius) && ball.positionX > i.positionX && ball.positionX < (i.positionX + i.elementWidth)){
                        if (ball.velocityY > 0) {
                            ball.velocityY = -ball.velocityY
                            console.log(ball.positionY)
                        }
                    }
                }
            })

        }

    }




    window.onkeydown =(e)=>{

        // start player movement
        if (e.key == "d" || e.key =="D" ){
            if ( player.positionX < innerWidth - player.elementWidth -player.movementSpeed - wallHeight){
                player.positionX += player.movementSpeed;
            }

        }
        if (e.key == "a" || e.key =="A"){
            if ( player.positionX > player.movementSpeed + wallHeight){
                player.positionX -= player.movementSpeed;
            }
        }
        // end player movement

        // start enemy movement
        if (e.key == "l" || e.key =="L" ){
            if ( enemy.positionX < innerWidth - enemy.elementWidth -enemy.movementSpeed -wallHeight){
                enemy.positionX += enemy.movementSpeed;
            }

        }
        if (e.key == "j" || e.key =="J"){
            if ( enemy.positionX > enemy.movementSpeed +wallHeight){
                enemy.positionX -= enemy.movementSpeed;
            }
        }
        // end enemy movement
    }


    var startingTime;
    var lastTime;
    var totalElapsedTime;
    var elapsedSinceLastLoop;

    const animate=(currentTime)=>{
        if(!startingTime){startingTime=currentTime;}
        if(!lastTime){lastTime=currentTime;}
        totalElapsedTime=Math.ceil((currentTime-startingTime)/1000);


        requestAnimationFrame(animate)
        player.lose();
        enemy.lose();

        c.clearRect(0, 0, innerWidth, innerHeight)

        if (totalElapsedTime > 5.5){
            countdownContainer.innerHTML = ""
            ball.ballMovement()
        }else if(totalElapsedTime == 5){
            countdownContainer.innerHTML = "go"
        }
        else{
            countdownContainer.innerHTML = 5 - Math.ceil( totalElapsedTime)
        }

        walls.makeWalls();
        c.fillStyle = "blue"
        c.fillRect(player.positionX, player.positionY, player.elementWidth, player.elementHeight)
        c.fillStyle = "red"
        c.fillRect(enemy.positionX, enemy.positionY, enemy.elementWidth, enemy.elementHeight)

    }
        animate();



    const pointPreview = document.querySelector("#pointPreview").innerHTML = `${enemy.point} : ${player.point}`
}
