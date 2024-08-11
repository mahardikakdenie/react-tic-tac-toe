
import Square from './Square';
import GameHistory from './GameHistory';
import { useState } from 'react';

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let index = 0; index < lines.length; index++) {
		const [a, b, c] = lines[index];

		if (
			squares[a] &&
			squares[b] &&
			squares[c] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}

	return false;
};

const SQUARE_FILLED_MESSAGE = 'The Square is filled';

const Squares = () => {
	const squaresArray = Array(9).fill(null);
	const [xIsNext, setXIsNext] = useState(true);
	const [histories, setHistories] = useState([]);
    const [playerHistory, setPlayerHistory] = useState([]);

	const [squares, setSquares] = useState(squaresArray);
	const winner = calculateWinner(squares);
	const handleClick = (index) => {
		if (squares[index] || winner) {
			alert(winner ? `The winner is ${winner}` : SQUARE_FILLED_MESSAGE);
			return;
		}

		const nextSquares = squares.slice();
		nextSquares[index] = xIsNext ? 'X' : 'O';
		histories.push(nextSquares);
        const playerContainer = playerHistory;
        playerContainer.push(xIsNext ? 'X' : 'O');
        setPlayerHistory(playerContainer);
		setXIsNext(!xIsNext);
		setSquares(nextSquares);
		setHistories(histories);

		alert(`Next Player is ${xIsNext ? 'O' : 'X'}`);
	};

	let status = `Current Player is ${xIsNext ? 'X' : '0'}`;
	if (winner) {
		status = `The winner is ${winner}`;
	}

	if (squares.every((square) => square !== null)) {
		status = 'Game is over';
		alert(status);
	}

    const onClickHistory = (history) => {
        const steps = history?.filter(curr => curr !== null);
        setXIsNext(history?.filter(curr => curr !== null)[steps.length-1] === 'X' ? false : true);
        setSquares(history);
    };

	return (
		<div className='board-wrapper'>
			<div className='board-status'>{status}</div>
			<div className='board'>
				{squaresArray.map((_, index) => (
					<Square
						key={index}
						value={squares[index]}
						index={index}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>
			<GameHistory histories={histories} playerTurn={playerHistory} onClickHistory={(history, playerTurn) => onClickHistory(history, playerTurn)} />
		</div>
	);
};

export default Squares;
