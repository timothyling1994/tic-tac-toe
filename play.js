let Gameboard = (() => {

	let Tile = {
		mark: '',
	};

	let gameArr = new Array();

	for(let i = 0;i<9;i++)
	{
		//clone Tile objects into Array
		gameArr.push(JSON.parse(JSON.stringify(Tile)));
	}

	return {
		gameArr,
	};

})();


let GameController = (() => {

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

			isPlayerOneTurn = !isPlayerOneTurn;
			DOMController.updateBoard(tilePressed);
			checkforWinner(); 
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

	};

	let checkforWinner = () => {
	

		let won = function()
		{

			let play_again_btn = document.querySelector("#play-again");
			play_again_btn.addEventListener("click",clearBoard);
			play_again_btn.style.display ="block";
			isGameOver = true;
		};

		if((Gameboard.gameArr[0].mark === Gameboard.gameArr[1].mark) && (Gameboard.gameArr[1].mark === Gameboard.gameArr[2].mark) && (Gameboard.gameArr[2].mark) !== '')
		{
			won();
		}
		else if((Gameboard.gameArr[0].mark === Gameboard.gameArr[3].mark) && (Gameboard.gameArr[3].mark === Gameboard.gameArr[6].mark)&& (Gameboard.gameArr[6].mark) !== '')
		{
			won();
		}
		else if((Gameboard.gameArr[0].mark === Gameboard.gameArr[4].mark) && (Gameboard.gameArr[4].mark === Gameboard.gameArr[8].mark)&& (Gameboard.gameArr[8].mark) !== '')
		{
			won();
		}

		else if((Gameboard.gameArr[3].mark === Gameboard.gameArr[4].mark) && (Gameboard.gameArr[4].mark === Gameboard.gameArr[5].mark)&& (Gameboard.gameArr[5].mark) !== '')
		{
			won();
		}

		else if((Gameboard.gameArr[1].mark === Gameboard.gameArr[4].mark) && (Gameboard.gameArr[4].mark === Gameboard.gameArr[7].mark)&& (Gameboard.gameArr[7].mark) !== '')
		{
			won();
		}
		else if((Gameboard.gameArr[2].mark === Gameboard.gameArr[4].mark) && (Gameboard.gameArr[4].mark === Gameboard.gameArr[6].mark)&& (Gameboard.gameArr[6].mark) !== '')
		{
			won();
		}
		else if((Gameboard.gameArr[6].mark === Gameboard.gameArr[7].mark) && (Gameboard.gameArr[7].mark === Gameboard.gameArr[8].mark)&& (Gameboard.gameArr[8].mark) !== '')
		{
			won();
		}
		else if((Gameboard.gameArr[2].mark === Gameboard.gameArr[5].mark) && (Gameboard.gameArr[5].mark === Gameboard.gameArr[8].mark)&& (Gameboard.gameArr[8].mark) !== '')
		{
			won();
		}
	};	

	return {
		initGame,
		updategameArr,
		getPlayerTurn,
		clearBoard,
		checkforWinner,
	};
})();

let DOMController = (() => {

	let tile_nodelist;

	let renderBoard = () => 
	{
		let grid_container = document.querySelector("#grid-container");

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
			img.src="assets/o.png";
			tilePressed.appendChild(img);
		}
		else
		{
			img.src="assets/x.png";
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
	};

	let signalWinner = () => {

	};

	return {
		
		renderBoard,updateBoard, clearBoard

	};
})();


function theDomHasLoaded(e) {
	
	GameController.initGame();

}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);