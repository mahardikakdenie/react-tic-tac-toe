const Square = ({ value = '', onSquareClick, index = 0 }) => {
	const setRoundedClass = (index) => {
		let className = '';

		if (index === 0) {
			className = 'board-top-left-radius';
		}

		if (index === 2) {
			className = 'board-top-right-radius';
		}

		if (index === 6) {
			className = 'board-bottom-left-radius';
		}

		if (index === 8) {
			className = 'board-bottom-right-radius';
		}

		return className;
	};

	return (
		<button
			className={`square ${setRoundedClass(index)}`}
			onClick={() => onSquareClick()}>
			{value}
		</button>
	);
};

export default Square;
