import * as actionTypes from './../constants/actionTypes';
import getDungeon from "../utils/UtilDungeonGenerator";

export const generateMap = () =>{
	return {
		type: actionTypes.MAPGENERATE,
		mapGrid : getDungeon(30,36)
			
	};
};
