import {CHANGE_HUD_HOVER_MESSAGE,
		REVERT_HUD_HOVER_MESSAGE,
		TOGGLE_INVENTORY,
		HUD_BUY_ATTRIBUTE_UPGRADE} from './../constants/actionTypes';
import initialState from './initialState';

export default function monsters (state = initialState.hud, action) {

	switch(action.type)
	{

		case TOGGLE_INVENTORY:{

			return Object.assign({}, state, {
				displayInventory: !state.displayInventory
			});
		}

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
				strengthUpgrades: state.strengthUpgrades + action.upgrade.strength,
				agilityUpgrades: state.agilityUpgrades + action.upgrade.agility,
				vitalityUpgrades: state.vitalityUpgrades + action.upgrade.vitality,
				intelligenceUpgrades: state.intelligenceUpgrades + action.upgrade.intelligence,
				hoverMsg: action.upgrade.hoverMsg
			});
		}

		default: return state;
	}
}