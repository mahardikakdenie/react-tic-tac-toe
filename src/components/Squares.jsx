
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

const Squares = () => {
	const squaresArray = Array(9).fill(null);
	const [xIsNext, setXIsNext] = useState(true);
	const [histories, setHistories] = useState([]);

	const [squares, setSquares] = useState(squaresArray);
	const winner = calculateWinner(squares);
	const handleClick = (index) => {
		if (squares[index] || winner) {
			alert(winner ? `The winner is ${winner}` : 'The Square is filled');
			return;
		}

		const nextSquares = squares.slice();
		nextSquares[index] = xIsNext ? 'X' : 'O';
		histories.push(nextSquares);
		setXIsNext(!xIsNext);
		setSquares(nextSquares);
		setHistories(histories);

		alert(`Next Player is ${xIsNext ? 'X' : '0'}`);
	};

	let status = `Next Player is ${xIsNext ? 'X' : '0'}`;
	if (winner) {
		status = `The winner is ${winner}`;
	}

	if (squares.every((square) => square !== null)) {
		status = 'Game is over';
		alert(status);
	}

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
			<GameHistory histories={histories} />
		</div>
	);
};

export default Squares;
