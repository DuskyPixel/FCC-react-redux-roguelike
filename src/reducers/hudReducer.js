import {CHANGE_HUD_HOVER_MESSAGE,
		REVERT_HUD_HOVER_MESSAGE,
		HUD_BUY_ATTRIBUTE_UPGRADE} from './../constants/actionTypes';
import initialState from './initialState';

export default function monsters (state = initialState.hud, action) {

	switch(action.type)
	{
		case CHANGE_HUD_HOVER_MESSAGE:{

			return Object.assign({}, state, {
				hoverMsg: action.payload
			});
		}

		case REVERT_HUD_HOVER_MESSAGE:{

			return Object.assign({}, state, {
				hoverMsg: action.payload
			});
		}

		case HUD_BUY_ATTRIBUTE_UPGRADE:{

			return Object.assign({}, state, {
				hoverMsg: action.upgrade.hoverMsg
			});
		}

		default: return state;
	}
}