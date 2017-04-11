function loadImages()
{
	playerImage=new Image;
	playerImage.src="assets/pika.png";
	
	enemyImage=[];
	for(var i=0;i<4;i++)
  {    var r=Math.floor(Math.random()*3)+1;
	  enemyImage.push(new Image);
	  var str="assets/"+r+".png";
	  enemyImage[i].src=str;
	  
	   console.log(enemyImage[i]);
  }
	
	goalImage=new Image;
	goalImage.src="assets/ball.png";
}


function init() {
	console.log("in init");
	canvas=document.getElementById("mycanvas");
	resultdec=document.getElementById("div1")
		;
	GAME_OVER=false;
	resultdec.style.display="none";
	score=0;
	pen=canvas.getContext('2d');
	
	W=canvas.width;
	H=canvas.height;

	
	function Enemy(x,y,w,h,speedY)
	{
		this.x=x;
		this.y=y;
		this.w=w,
		this.h=h,
		this.speedY=speedY
	}
//	enemy={
//		
//		x:50,
//		y:50,
//		w:40,
//	    h:40,
//			speedY:4,
//		speedX:4
//	};
//	enemy=new Enemy(150,150,60,60,3);
//	enemy1=new Enemy(350,350,60,60,3);
	
	
	//additionn;
	enemyarr=new Array;
	for(var i=0;i<4;i++)
	{    var x=150+i*200;
	     var y=0+i*(H/4);
	 
	     var speedy=Math.random()*4+2;
		enemyarr.push(new Enemy(x,y,60,60,speedy));
	}
	
	player={
		x:0,
		y:H/2-20,
		w:70,
		h:70,
		speedX:0,
	};
	goal={
		x:W-60,
		y:H/2-20,
		w:60,
		h:60,
	}
	
	
	function movePlayer()
	{
		player.speedX=5;//function to update player speed
	}
	
	function stopPlayer()
	{
		player.speedX=0;//function to update player speed
	}
   canvas.addEventListener('mousedown',movePlayer);
	canvas.addEventListener('mouseup',stopPlayer);
//	function moveSelection(event) {                    
//                switch (event.keyCode) {
//                    case 37:
//                        leftArrowPressed();
//                    break;
//
//                    case 39:
//                        rightArrowPressed();
//                    break;
//
//                    case 38:
//                        upArrowPressed();
//                    break;
//
//                    case 40:
//                        downArrowPressed();
//                    break;
//                }
//            };
	
	
}



function draw()
{  pen.clearRect(0,0,canvas.width,canvas.height);
	pen.fillStyle="blue";
// pen.drawImage(enemyImage,enemy.x,enemy.y,enemy.w,enemy.h);
// pen.drawImage(enemyImage,enemy1.x,enemy1.y,enemy1.w,enemy1.h);
 pen.drawImage(playerImage,player.x,player.y,player.w,player.h);
 pen.drawImage(goalImage,goal.x,goal.y,goal.w,goal.h);
 for(var i=0;i<4;i++)
{
	pen.drawImage(enemyImage[i],enemyarr[i].x,enemyarr[i].y,enemyarr[i].w,enemyarr[i].h);
}
 pen.fillStyle="white";
 pen.font="20px arial";
pen.fillText("score : "+score,30,30);
	
	//console.log("in draw");
	
}

//if enemy and player are colliding
function iscolliding(r1,r2)
{
	var first=Math.abs(r1.x-r2.x)<=Math.max(r1.w,r2.w)-30;
	var second=Math.abs(r1.y-r2.y)<=Math.max(r1.h,r2.h)-30;
	return first && second;
}



function update()
{
	//console.log("in update");
	
	player.x+=player.speedX;
	for(var i=0;i<4;i++)
  {
	enemyarr[i].y+=enemyarr[i].speedY;
	if(enemyarr[i].y>=canvas.height-enemyarr[i].h||enemyarr[i].y<=0)
		enemyarr[i].speedY=-enemyarr[i].speedY;
	
	score=parseInt(player.x/10.0);
  
	
//	enemy.x+=enemy.speedX;
//	
//	if(enemy.x>=canvas.width-enemy.w||enemy.x<=0)
//		enemy.speedX*=-1;
	
	
	if(iscolliding(player,enemyarr[i]))
	{
//		pen.clearRect(0,0,W,H);
//		canvas.fillText("Game Over",H/2,200);
		console.log("game over");
		GAME_OVER=true;
		
	}
	  
  }
	
	if(iscolliding(player,goal))
	{
//		pen.clearRect(0,0,W,H);
//		canvas.fillText("Game Won",H/2,200);
		console.log("game won");
		GAME_OVER=true;
	}
	
	
}


function gameLoop()
{
	draw();
	update();
	
	// instead of set interval we can use this ,this will give best fraame rate for a given computer
	if(GAME_OVER==false)
	{ 
	  window.requestAnimationFrame(gameLoop);
		
	}
	else
	{    
		pen.clearRect(0,0,W,H);
		pen.fillText("score : "+score,30,30);
		
		resultdec.style.display="block";
	    s=resultdec.getElementsByTagName("span")[0];
		s.innerHTML=score;
	    yes=resultdec.getElementsByTagName("button")[0];
	      no=resultdec.getElementsByTagName("button")[1];
	 
	 yes.onclick=function()
	 { 
		 restartGame();
		 
	 }
	 no.onclick=function(){
		 resultdec.innerHTML='<h3 style="text-align:centre"> Thank you for playing</h3>'
		 
	 }
	 
	}
}



loadImages();
function restartGame(){
    init();
	
    gameLoop();
	
}
init();
gameLoop();


//setInterval(gameLoop,30);