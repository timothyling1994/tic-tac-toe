let Gameboard = (() => {

	let Tile = {
		mark: '',
	};

	let gameArr = new Array();
	let tilesPlaced = 0;

	for(let i = 0;i<9;i++)
	{
		gameArr.push(JSON.parse(JSON.stringify(Tile)));
	}

	return {
		gameArr,tilesPlaced
	};

})();


let GameController = (() => {

	const winConditions = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		];

	let storeMoves = {

		player1 : [0,0,0,0,0,0,0,0],
		player2 : [0,0,0,0,0,0,0,0]
	}

	let isPlayerOneTurn = true;
	let isGameOver = false;

	let initGame = () => {

		//grab player options (human vs ai)
		DOMController.renderBoard();
		
	};

	let updategameArr = (tilePressed) => {

		let index = tilePressed.getAttribute("id");

		if(Gameboard.gameArr[index].mark == '' && (!isGameOver))
		{
			if (isPlayerOneTurn)
			{
				Gameboard.gameArr[index].mark = "x";
			}
			else
			{
				Gameboard.gameArr[index].mark = "o";
			}

			Gameboard.tilesPlaced += 1;
			DOMController.updateBoard(tilePressed);
			checkforWinner(isPlayerOneTurn,index); 
			isPlayerOneTurn = !isPlayerOneTurn;
		}
	};

	let getPlayerTurn = () =>
	{
		return isPlayerOneTurn;
	};

	let clearBoard = () => {

		for (let i=0;i<Gameboard.gameArr.length;i++)
		{
			Gameboard.gameArr[i].mark = '';
		}
		DOMController.clearBoard();
		let play_again_btn = document.querySelector("#play-again");
		play_again_btn.style.display = "none";
		isGameOver = false;
		isPlayerOneTurn = true;

	};

	let checkforWinner = (isPlayerOneTurn, index) => {

		let won = function(winningMark)
		{

			let play_again_btn = document.querySelector("#play-again");
			play_again_btn.addEventListener("click",clearBoard);
			play_again_btn.style.display ="block";
			
			isGameOver = true;
			Gameboard.tilesPlaced = 0;

			storeMoves.player1=[0,0,0,0,0,0,0,0];
			storeMoves.player2=[0,0,0,0,0,0,0,0];

			DOMController.signalWinner(winningMark);
		};

		let tie = function()
		{

			let play_again_btn = document.querySelector("#play-again");
			play_again_btn.addEventListener("click",clearBoard);
			play_again_btn.style.display ="block";
			
			isGameOver = true;
			Gameboard.tilesPlaced = 0;

			storeMoves.player1=[0,0,0,0,0,0,0,0];
			storeMoves.player2=[0,0,0,0,0,0,0,0];

			DOMController.signalTie();
		};

		let tile_num = parseInt(index);

		if(isPlayerOneTurn)
		{
			for (let i=0;i<winConditions.length;i++)
			{

				if(winConditions[i].includes(tile_num))
				{
					storeMoves.player1[i] += 1;
					

					if(storeMoves.player1[i]==3)
					{
						won(Gameboard.gameArr[index].mark);
						break;
						
					}
				}
			}
		}
		else
		{
			for (let i=0;i<winConditions.length;i++)
			{
				if(winConditions[i].includes(tile_num))
				{
					storeMoves.player2[i] += 1;
					
					if(storeMoves.player2[i]==3)
					{
						won(Gameboard.gameArr[index].mark);
						break;
					}
				}
			}
		}
		//account for ties
		if(!isGameOver && Gameboard.tilesPlaced == 9)
		{
			tie();
		}

	};	

	return {
		initGame,
		updategameArr,
		getPlayerTurn,
		clearBoard,
		checkforWinner,
		storeMoves
	};
})();

let DOMController = (() => {

	let tile_nodelist;
	let grid_container;

	let renderBoard = () => 
	{
		grid_container = document.querySelector("#grid-container");

		for (let i=0; i<Gameboard.gameArr.length; i++)
		{
			let newDiv = document.createElement("div");
			newDiv.classList.add('grid-box');
			newDiv.setAttribute("id",i);
			grid_container.appendChild(newDiv,grid_container);
		}

		tile_nodelist = document.querySelectorAll(".grid-box");

		tile_nodelist.forEach(node => {
			node.addEventListener("click", function(){
				GameController.updategameArr(this);
				
			},false);
		});
	};

	let updateBoard = (tilePressed) => {
		
		let img = document.createElement('img');

		if (GameController.getPlayerTurn())
		{
			img.src="assets/x.png";
			tilePressed.appendChild(img);
		}
		else
		{
			img.src="assets/o.png";
			tilePressed.appendChild(img);
		}
	};

	let clearBoard = () => {
		tile_nodelist.forEach(node=>{
			if(node.childNodes[0] != null)
			{
				node.removeChild(node.childNodes[0]);
			}
		});

		let winnerHTMLRow = document.querySelector("#flex-row-2");
		if(winnerHTMLRow.childNodes[0] != null)
		{
			winnerHTMLRow.removeChild(winnerHTMLRow.childNodes[0]);
		}
	};

	let signalWinner = (winningMark) => {

		let winnerHTML = document.createElement("div");
		let winnerContent;

		if(winningMark=="x")
		{
			winnerContent = document.createTextNode("Player 1 Wins!");
		}
		else
		{
			winnerContent = document.createTextNode("Player 2 Wins!");
		}

		winnerHTML.appendChild(winnerContent)
		let htmlRow = document.querySelector("#flex-row-2");
		htmlRow.appendChild(winnerHTML,htmlRow);
		

	};

	let signalTie = () => {

		let tieHTML = document.createElement("div");
		let tieContent;

	
		tieContent = document.createTextNode("It's a Tie!");
		

		tieHTML.appendChild(tieContent)
		let htmlRow = document.querySelector("#flex-row-2");
		htmlRow.appendChild(tieHTML,htmlRow);
		

	};

	return {
		
		renderBoard,updateBoard, clearBoard,signalWinner, signalTie

	};
})();


function theDomHasLoaded(e) {
	
	GameController.initGame();

}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);