import * as actionTypes from './../constants/actionTypes';
import initialState from './initialState';

export default function monsters (state = initialState.monsters, action) {
	switch(action.type)
	{
		case actionTypes.MAPGENERATE:{
			return action.mapGrid.monsterArray;
		}

		case actionTypes.PLAYER_ATTACKS_MOB:{


			return action.newMonsterState;
		}

		default: return state;
	}
}