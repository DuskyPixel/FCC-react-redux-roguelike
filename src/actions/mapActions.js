import {MAPGENERATE} from './../constants/actionTypes';
import getDungeon from "../utils/UtilDungeonGenerator";

export const generateMap = (dungeonFloor) =>{
	return {
		type: MAPGENERATE,
		mapGrid : getDungeon(30,36, dungeonFloor)
			
	};
};
