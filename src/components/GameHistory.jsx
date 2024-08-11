const GameHistory = ({ histories, isX }) => {
	return (
		<div className='board-history'>
			<div className=''>
				<h4>Board History</h4>
			</div>
			<ol>
				{histories.map((history, index) => {
					return <li key={index}>{history}</li>;
				})}
			</ol>
		</div>
	);
};

export default GameHistory;
