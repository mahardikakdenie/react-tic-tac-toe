const GameHistory = ({ histories, playerTurn = [], onClickHistory }) => {
	return (
		<div className='board-history'>
			<div className='board-history__title'>
				<h4>Board History</h4>
			</div>
			<ol>
				{histories.map((history, index) => {
					return <li key={index} onClick={() => onClickHistory(history, playerTurn[index])}>Go to move #{index+1}</li>;
				})}
			</ol>
		</div>
	);
};

export default GameHistory;
