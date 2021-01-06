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

	let initGame = () => {

		//grab player options (human vs ai)
		DOMController.renderBoard();
		
	};

	let updategameArr = (tilePressed) => {

		let index = tilePressed.getAttribute("id");

		if(Gameboard.gameArr[index].mark == '')
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
			DOMController.updateDOM(tilePressed); 
		}
	};

	let getPlayerTurn = () =>
	{
		return isPlayerOneTurn;
	};

	let clearBoard = () => {
		
	};

	let signalWinner = () => {

	};	

	return {
		initGame,
		updategameArr,
		getPlayerTurn,
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

	let updateDOM = (tilePressed) => {
		
		let img = document.createElement('img');
		console.log(tilePressed);
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

	let getTiles = () => 
	{
		return tile_nodelist;
	};

	return {
		
		renderBoard,getTiles,updateDOM

	};
})();


function theDomHasLoaded(e) {
	
	GameController.initGame();

}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);