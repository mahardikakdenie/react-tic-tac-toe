import { useState } from 'react';

const Square = ({ value = '', onSquareClick, index = 0 }) => {
  const setRoundedClass = (index) => {
    let className = '';

    if (index === 0) {
      className = 'board-top-left-radius';
    }

    if (index === 2) {
      className = 'board-top-right-radius'
    }

    if (index === 6) {
      className = 'board-bottom-left-radius'
    }

    if (index === 8) {
      className = 'board-bottom-right-radius'
    }

    return className;
  };
	return (
		<button className={`square ${setRoundedClass(index)}`} onClick={() => onSquareClick()}>
			{value}
		</button>
	);
};

const App = () => {
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
	};

  
  let status = `Next Player is ${xIsNext ? 'X' : '0'}`;
  if (winner) {
    status = `The winner is ${winner}`;
  }

	return (
		<div className='board-wrapper'>
        <div className='board-status'>
          {status}
        </div>
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

const GameHistory = ({ histories, isX}) => {

  return (
    <div className='board-history'>
      <div className='board-history__title'>
        <h4>Board History</h4>
      </div>
      <ol>
        {
          histories.map((history, index) => {
            return <li key={index}>{history}</li>
          })
        }
      </ol>
    </div>
  )
}

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

export default App;
