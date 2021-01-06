let Gameboard = (() => {
	
	'use strict';

	let Tile = {
		mark: '',
	};

	let gameArr = new Array(9).fill(Tile);

	return {gameArr};

})();


let GameController = (() => {
	'use strict';

	let initGame = () => {
		DOMController.renderBoard();
		
		DOMController.getTiles();

	};


	let validateMove = () => {

	};

	let updateBoard = (tile_num,player) => {
		console.log(tile_num);
		console.log(player);
	};

	let clearBoard = () => {

	};

	let signalWinner = () => {

	};	

	return {
		initGame,
		updateBoard
	};
})();

let DOMController = (() => {

	let tile_nodelist;

	let renderBoard = () => 
	{
		let grid_container = document.querySelector("#grid-container");

		for (let i=0;i<Gameboard.gameArr.length;i++)
		{
			let newDiv = document.createElement("div");
			newDiv.classList.add('grid-box');
			newDiv.setAttribute("id",i);
			grid_container.appendChild(newDiv,grid_container);
		}

		tile_nodelist = document.querySelectorAll(".grid-box");
		tile_nodelist.forEach(node => {
			node.addEventListener("click", function(){
				GameController.updateBoard(0,"player1"); 
			},false);
		});
	};

	let getTiles = () => 
	{
		return tile_nodelist;
	}

	return {
		
		renderBoard,getTiles //tile_nodelist //getTiles

	};
})();


function theDomHasLoaded(e) {
	
	GameController.initGame();

}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);