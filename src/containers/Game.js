import React from 'react';

import TileMapContainer from '../containers/TileMapContainer';
import PlayerContainer from '../containers/PlayerContainer';

const Game = () => {
	return (
		<div id="outerBoundingBox">
			<TileMapContainer />
			<PlayerContainer />
		</div>
	);
};




export default Game;