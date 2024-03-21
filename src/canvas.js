import {socket} from "./socket";

export const canvasFunc = (sharedKey,isHost)=>{

    const countdownContainer = document.querySelector("#countDown")
    var canvas = document.querySelector("canvas")
    const innerWidth = 900;
    const innerHeight = 900;
    let endGame = false;
    canvas.width = innerWidth;
    canvas.height = innerHeight

    window.onresize=()=>{
    }
    let c = canvas.getContext("2d")







    let initialWidth = 200;

    const resetGame =()=>{

        ball.positionX = innerWidth / 2
        ball.positionY = innerHeight / 2
        ball.radius = 20
        ball.velocityX = Math.random()*3 + 12 * (Math.floor(Math.random() * 2) ? 1 : -1)
        ball.velocityY = Math.random()*3 + 12 * (Math.floor(Math.random() * 2) ? 1 : -1)
    }
    const updatePoints=(isMe)=>{
        if (isHost){
            if (isMe){
                player.point++
            }else{
                enemy.point++
            }
            document.querySelector("#pointPreview").innerHTML = `Enemy ${enemy.point} : ${player.point} You`
            socket.emit("points",sharedKey,player.point,enemy.point)
            resetGame()
        }


        if (player.point == 5){
            document.querySelector("#endgame").innerHTML = `You win!`
            endGame = true
            setTimeout(()=>{
                window.location.href = "/"
            },3000)
        }
        if (enemy.point == 5){
            document.querySelector("#endgame").innerHTML = `You lose!`
            endGame = true
            setTimeout(()=>{
                window.location.href = "/"
            },3000)
        }


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
               updatePoints(false)
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
                updatePoints(true)
            }
        }
    }

    let ball = {
        positionX : innerWidth / 2,
        positionY : innerHeight / 2,
        radius : 20,
        velocityX :  Math.random()*3 + 12 * (Math.floor(Math.random() * 2) ? 1 : -1),
        velocityY :  Math.random()*3 + 12 * (Math.floor(Math.random() * 2) ? 1 : -1),
        ballPrint :()=>{
            c.beginPath()
            c.arc(ball.positionX,ball.positionY,ball.radius,0,Math.PI*2,false)
            c.fillStyle = "green"
            c.fill()
        },
        ballMovement :()=>{
            ball.positionY += ball.velocityY
            ball.positionX += ball.velocityX
            if (ball.positionY> (player.positionY - ball.radius) - ball.velocityY && ball.positionY <  (player.positionY - ball.radius) + ball.velocityY && ball.positionX > player.positionX && ball.positionX < (player.positionX + player.elementWidth)){
                if (ball.velocityY > 0) {
                    ball.velocityY = -ball.velocityY
                }
            }

            if (ball.positionY < (enemy.positionY + enemy.elementHeight + ball.radius) - ball.velocityY && ball.positionY >  (enemy.positionY + enemy.elementHeight + ball.radius) + ball.velocityY && ball.positionX > enemy.positionX && ball.positionX < (enemy.positionX + enemy.elementWidth)){
                if (ball.velocityY < 0) {
                    ball.velocityY = -ball.velocityY
                }
            }

            if (ball.positionX> (innerWidth - ball.radius - wallHeight)){
                ball.velocityX = -ball.velocityX
            }
            if( ball.positionX < ball.radius + wallHeight){
                ball.velocityX = -ball.velocityX
            }
            walls.wallBallEncounter();



            let calculatedX = innerWidth - ball.positionX
            let calculatedY = innerHeight - ball.positionY
            if (isHost){
                socket.emit("ball_moved", sharedKey,calculatedX,calculatedY)
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

                socket.emit("player_moved", sharedKey, innerWidth - player.positionX - player.elementWidth)
            }

        }
        if (e.key == "a" || e.key =="A"){
            if ( player.positionX > player.movementSpeed + wallHeight){
                player.positionX -= player.movementSpeed;
                socket.emit("player_moved", sharedKey, innerWidth - player.positionX - player.elementWidth)
            }
        }

        if (e.key == "r" || e.key =="R"){
            resetGame()
        }
        // end player movement

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

        ball.ballPrint()

        if (totalElapsedTime > 5.5){
            countdownContainer.innerHTML = ""
            countdownContainer.classList.remove("w-[200px]","h-[200px]")
            if (isHost && !endGame){
                ball.ballMovement()
            }
        }else if(totalElapsedTime == 5){
            countdownContainer.innerHTML = "Go"
        }
        else{
            countdownContainer.classList.add("w-[200px]","h-[200px]")
            countdownContainer.innerHTML = 5 - Math.ceil( totalElapsedTime)
        }

        walls.makeWalls();
        c.fillStyle = "blue"
        c.fillRect(player.positionX, player.positionY, player.elementWidth, player.elementHeight)
        c.fillStyle = "red"
        c.fillRect(enemy.positionX, enemy.positionY, enemy.elementWidth, enemy.elementHeight)

    }
        animate();



    document.querySelector("#pointPreview").innerHTML = `Enemy ${enemy.point} : ${player.point} You`

    socket.on("enemy_moved",(x)=>{
        enemy.positionX = x
    })

    if (!isHost){
        socket.on("ball_moved",(x,y)=>{
            ball.positionY=y
            ball.positionX=x
        })
        socket.on("points",(e,me)=>{
            enemy.point = e
            player.point = me
            document.querySelector("#pointPreview").innerHTML = `Enemy ${enemy.point} : ${player.point} You`
            if (player.point == 3){
                countdownContainer.innerHTML = `You won!`
                endGame = true
            }
            if (enemy.point == 3){
                countdownContainer.innerHTML = `Enemy won!`
                endGame = true
            }
        })

    }



}


