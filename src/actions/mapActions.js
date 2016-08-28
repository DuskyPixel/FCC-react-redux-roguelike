import * as actionTypes from './../constants/actionTypes';
import getDungeon from "../utils/UtilDungeonGenerator";

export const generateMap = (dungeonFloor) =>{
	return {
		type: actionTypes.MAPGENERATE,
		mapGrid : getDungeon(30,36, dungeonFloor)
			
	};
};
