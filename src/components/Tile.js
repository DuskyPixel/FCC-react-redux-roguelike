import React, { PropTypes } from 'react';
import * as dungeonTypes from './../constants/dungeonTypes';


const Tile = ({tileType}) => {
	let getTile;


	switch (tileType) {
		case dungeonTypes.WALL :
		{
			getTile = dungeonTypes.STR_WALL;
			break;
		}

		case dungeonTypes.GROUND:
		{
			getTile = dungeonTypes.STR_GROUND_1;
			break;
		}
		case dungeonTypes.GROUND2:
		{
			getTile = dungeonTypes.STR_GROUND_2;
			break;
		}
		case dungeonTypes.GROUND3:
		{
			getTile = dungeonTypes.STR_GROUND_3;
			break;
		}
		case dungeonTypes.GROUND4:
		{
			getTile = dungeonTypes.STR_GROUND_4;
			break;
		}
		case dungeonTypes.GROUND5:
		{
			getTile = dungeonTypes.STR_GROUND_5;
			break;
		}


		case dungeonTypes.DOOR:
		{
			getTile = dungeonTypes.STR_DOOR;

			break;
		}

		case dungeonTypes.OPEN_DOOR:{
			getTile = dungeonTypes.STR_OPEN_DOOR;

			break;
		}

		//BELOW TEMP ONLY!!!!!!!!!!!!!!!!!
		case dungeonTypes.OBJ_PLAYER:
		{
			getTile = "player";

			break;
		}
		case dungeonTypes.OBJ_MOB:
		{
			getTile = "rat";

			break;
		}
		case dungeonTypes.OBJ_ALTAR:
		{
			getTile = "altar";

			break;
		}
		case dungeonTypes.OBJ_GOLD:
		{
			getTile = "gold";

			break;
		}
		case dungeonTypes.OBJ_ITEM:
		{
			getTile = "item";

			break;
		}

		default: getTile = "empty";

	}


	return (
		<td className="tile" >
			{[<img key={getTile} src={require('../../images/'+getTile+'.png')} />]}
		</td>
	);
};

Tile.propTypes = {
	tileType : PropTypes.number.isRequired
};

export default Tile;