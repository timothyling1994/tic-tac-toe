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

let minimax = ((node, depth, maximizingPLayer) => {
	//if(depth == 0 || node)
	//depth is 8
	{

	}
});

let TreeNode = () => {

	let nodeName = '';
	let parentNode = null;
	let arrayofChildNodes = [];

	return {nodeName,parentNode,arrayofChildNodes};
};


//tree of all tic-tac-toe possibilities

let tree = (() =>
{
	let root = TreeNode();
	let childNodeCounter = 0;
	root.nodeName = 'root';
	let depth = 3;

//first layer of the tree (blank board)
	for (let i = 0; i<1; i++)
	{
		let alreadyAdded = [];

		let node = TreeNode();
		node.parentNode=root; 
		node.nodeName=i; 
		root.arrayofChildNodes.push(node);
		alreadyAdded.push(i);

		addNodes(node,alreadyAdded,depth-1);

	}

	function addNodes (newParent,alreadyAdded,depth){

		for(let i = 0;i<3;i++)
		{	
			console.log(alreadyAdded);
			if(!alreadyAdded.includes(i))
			{
				let node = TreeNode();
				node.parentNode=newParent; 
				node.nodeName=i;
				newParent.arrayofChildNodes.push(node);
				alreadyAdded.push(i);

				addNodes(node,alreadyAdded,depth-1);
			}
			else
			{
				console.log(i + "alreadyadded");
			}
		}
	};

	/*
	let addNodes = (newParent,alreadyAdded,depth) => {

		for(let i = 0;i<3;i++)
		{
			if(!alreadyAdded.includes(i))
			{
				let node = TreeNode();
				node.parentNode=newParent; 
				node.nodeName=i;
				newParent.arrayofChildNodes.push(node);
				alreadyAdded.push(i);

				addNodes(node,alreadyAdded,depth-1);
			}
		}
	};*/

	return{root,addNodes};
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

	let checkWinConditions = {

		player1 : [0,0,0,0,0,0,0,0],
		player2 : [0,0,0,0,0,0,0,0]
	}

	let isPlayerOneTurn = true;
	let isGameOver = false;
	let isAIselected = false;

	let initGame = () => {

		//grab player options (human vs ai)
		DOMController.renderDOMBoard();
		
	};

	let updategameArr = (tilePressed) => {

		let index = tilePressed.getAttribute("id");

		if(Gameboard.gameArr[index].mark == '' && (!isGameOver))
		{
			if (isPlayerOneTurn)
			{
				Gameboard.gameArr[index].mark = "x";

				if(isAIselected)
				{
					isPlayerOneTurn = !isPlayerOneTurn;

					let selected_index = getComputersMove();
					console.log(selected_index);
					//Gameboard.gameArr[selected_index].mark = "x";
				}

			}
			else
			{
				Gameboard.gameArr[index].mark = "o";
			}

			Gameboard.tilesPlaced += 1;
			DOMController.updateDOMBoard(tilePressed);
			checkforWinner(isPlayerOneTurn,index); 
			isPlayerOneTurn = !isPlayerOneTurn;
		}
	};

	let getComputersMove = () => {
		let selected_index; 


		//return selected_index;
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
		DOMController.clearDOMBoard();
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

			checkWinConditions.player1=[0,0,0,0,0,0,0,0];
			checkWinConditions.player2=[0,0,0,0,0,0,0,0];

			DOMController.showDOMWinner(winningMark);
		};

		let tie = function()
		{

			let play_again_btn = document.querySelector("#play-again");
			play_again_btn.addEventListener("click",clearBoard);
			play_again_btn.style.display ="block";
			
			isGameOver = true;
			Gameboard.tilesPlaced = 0;

			checkWinConditions.player1=[0,0,0,0,0,0,0,0];
			checkWinConditions.player2=[0,0,0,0,0,0,0,0];

			DOMController.showDOMTie();
		};

		let tile_num = parseInt(index);

		if(isPlayerOneTurn)
		{
			for (let i=0;i<winConditions.length;i++)
			{

				if(winConditions[i].includes(tile_num))
				{
					checkWinConditions.player1[i] += 1;
					

					if(checkWinConditions.player1[i]==3)
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
					checkWinConditions.player2[i] += 1;
					
					if(checkWinConditions.player2[i]==3)
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
		checkWinConditions
	};
})();

let DOMController = (() => {

	let tile_nodelist;
	let grid_container;

	let renderDOMBoard = () => 
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

	let updateDOMBoard = (tilePressed) => {
		
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

	let clearDOMBoard = () => {
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

	let showDOMWinner = (winningMark) => {

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

	let showDOMTie = () => {

		let tieHTML = document.createElement("div");
		let tieContent;

	
		tieContent = document.createTextNode("It's a Tie!");
		

		tieHTML.appendChild(tieContent)
		let htmlRow = document.querySelector("#flex-row-2");
		htmlRow.appendChild(tieHTML,htmlRow);
		

	};

	return {
		
		renderDOMBoard,updateDOMBoard, clearDOMBoard,showDOMWinner, showDOMTie

	};
})();


function theDomHasLoaded(e) {
	
	//GameController.initGame();
	tree;

}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);