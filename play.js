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

function bestMove(){

	let bestScore = -Infinity; 
	let bestMove;
	for (let i=0;i<9;i++)
	{
		if(Gameboard.gameArr[i].mark == '')
		{
			Gameboard.gameArr[i].mark = 'o';
			let score = minimax(i,true);
			Gameboard.gameArr[i].mark = '';
			if (score>bestScore)
			{
				bestScore = score;
				bestMove = i;
			}
		}
	}

	return bestMove;
}

let minimax = (move,depth,isMaximizing) => {
	GameController.checkforWinner(move,!isMaximizing);	

	if()
	{

	}
};

let TreeNode = () => {

	let nodeValue = '';
	let parentNode = null;
	let arrayofChildNodes = [];
	let valuesofParents = [];

	return {nodeValue,parentNode,arrayofChildNodes,valuesofParents};
};


//tree of all tic-tac-toe possibilities

let Tree = (playerInput) => {

	let totalNodeCounter = 0;
	let depth = 9;

	let root = TreeNode();
	root.nodeValue=playerInput; 

	totalNodeCounter =+ 1;

//first layer of the tree (blank board)
	for (let i = 0; i<depth; i++)
	{
		if(i != root.nodeValue)
		{
			let node = TreeNode();
			node.parentNode=root; 
			node.nodeValue=i; 
			root.arrayofChildNodes.push(node);
			node.valuesofParents.push(root.nodeValue);

			totalNodeCounter =+ 1;

			buildTree(node);
		}

	}

	//console.log(totalNodeCounter);

	function buildTree (newParent){

		for(let i = 0;i<depth;i++)
		{	
		
			if(!newParent.valuesofParents.includes(i) && (i != newParent.nodeValue))
			{
				let node = TreeNode();
				node.parentNode=newParent; 
				node.nodeValue=i;
				newParent.arrayofChildNodes.push(node);

				node.valuesofParents = newParent.valuesofParents.concat(newParent.nodeValue);

				totalNodeCounter =+ 1;

				buildTree(node);
			}
		}
	};

	function traverseTree(playerInput){

	};	

	function displayTree()
	{
		/*
		let displayString = '';
		tree.root.arrayofChildNodes.forEach((node) => {

		});

		return displayString;*/
	};
	/*
	let buildTree = (newParent,alreadyAdded,depth) => {

		for(let i = 0;i<3;i++)
		{
			if(!alreadyAdded.includes(i))
			{
				let node = TreeNode();
				node.parentNode=newParent; 
				node.nodeValue=i;
				newParent.arrayofChildNodes.push(node);
				alreadyAdded.push(i);

				buildTree(node,alreadyAdded,depth-1);
			}
		}
	};*/

	return{root,buildTree};
};


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
	let isAIselected = true;

	let initGame = () => {

		//grab player options (human vs ai)
		DOMController.renderDOMBoard();
		
	};

	let updategameArr = (tilePressed) => {

		let num = tilePressed.getAttribute("id").indexOf("-");
		let tile_index = tilePressed.getAttribute("id").substring(num+1);

		if(Gameboard.gameArr[tile_index].mark == '' && (!isGameOver))
		{
			if (isPlayerOneTurn && isAIselected)
			{
				//player 1 
				Gameboard.gameArr[tile_index].mark = "x";
				Gameboard.tilesPlaced += 1;
				console.log(tilePressed);
				DOMController.updateDOMBoard(tilePressed);
				checkforWinner(isPlayerOneTurn,tile_index); 
				isPlayerOneTurn = false;

				//AI's move
				let selected_index = bestMove();
				console.log(selected_index);

				Gameboard.gameArr[selected_index].mark = "o";
				Gameboard.tilesPlaced += 1;
				let searchStr = selected_index.toString();
				let selected_tile_element = document.querySelector("#tile-"+selected_index); 
				console.log(selected_tile_element);

				DOMController.updateDOMBoard(selected_tile_element);
				checkforWinner(isPlayerOneTurn,selected_index); 
				isPlayerOneTurn = true;
			}
			else if (isPlayerOneTurn)
			{
				Gameboard.gameArr[tile_index].mark = "x";
				Gameboard.tilesPlaced += 1;
				DOMController.updateDOMBoard(tilePressed);
				checkforWinner(isPlayerOneTurn,tile_index); 
				isPlayerOneTurn = false;
			}
			else
			{
				Gameboard.gameArr[tile_index].mark = "o";
				Gameboard.tilesPlaced += 1;
				DOMController.updateDOMBoard(tilePressed);
				checkforWinner(isPlayerOneTurn,tile_index); 
				isPlayerOneTurn = true;
			}

			
		}
	};

	let getComputersMove = (tile_pressed_index) => {
		
		let tree = Tree(tile_pressed_index);
		let selected_index; 

		return 1;

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
			newDiv.setAttribute("id","tile-"+i);
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
			
			function removeAllChildNodes(parent){
				while(parent.firstChild)
				{
					parent.removeChild(parent.firstChild);
				}
			}

			removeAllChildNodes(node);
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
	
	GameController.initGame();
	//let test_tree = Tree(0);
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);