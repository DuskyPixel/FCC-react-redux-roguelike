import * as actionTypes from './../constants/actionTypes';
import initialState from './initialState';
import * as dungeonTypes from './../constants/dungeonTypes';

export default function tileGrid (state = initialState.tileGrid, action) {
	let newState = [];

	switch(action.type) 
	{

		case actionTypes.MAPGENERATE:{
			
			newState = action.mapGrid.tileGrid;
			return newState;
		}

		case actionTypes.PLAYER_ATTACKS_MOB:{
			if(action.mapNeedsUpdating === true){
				for(let i=0;i<state.length;i++){
					let tempArr = [];
					for(let z=0;z<state[0].length;z++){
						tempArr.push(state[i][z]);
					}
					newState.push(tempArr);
				}

				newState[action.pos.y][action.pos.x] = dungeonTypes.GROUND;

				return newState;
			}
			else{
				return state;
			}

		}
		
		// eslint-disable-next-line
		case actionTypes.PLAYER_TOUCHED_ALTAR: {}
		// eslint-disable-next-line
		case actionTypes.PLAYER_TOUCHED_GOLD: {}
		// eslint-disable-next-line
		case actionTypes.PLAYER_TOUCHED_ITEM: {

			for(let i=0;i<state.length;i++){
				let tempArr = [];
				for(let z=0;z<state[0].length;z++){
					tempArr.push(state[i][z]);
				}
				newState.push(tempArr);
			}

			newState[action.pos.y][action.pos.x] = dungeonTypes.GROUND;

			return newState;
		}

		default: return state;
	}
}