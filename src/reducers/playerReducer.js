import * as actionTypes from './../constants/actionTypes';
import * as otherTypes from './../constants/otherTypes';
import initialState from './initialState';

export default function player (state = initialState.player, action) {


switch(action.type) 
{

	case actionTypes.MAPGENERATE:{
		return Object.assign({}, state, {pos: {
			x: action.mapGrid.playerPOS.x,
			y: action.mapGrid.playerPOS.y
		}});
	}

	case actionTypes.PLAYER_ATTACKS_MOB:{
		return Object.assign({}, state, {
			life : state.life - action.monsterDamage,
			exp : state.exp + action.mobExp,
			gold : state.gold + action.mobGold
		});
}

	case actionTypes.PLAYER_TOUCHED_ALTAR: {
		return Object.assign({},state, {
			strength: state.strength + action.strength,
			agility: state.agility + action.agility,
			vitality: state.vitality + action.vitality,
			intelligence: state.intelligence + action.intelligence,
			charisma: state.charisma + action.charisma,
			luck: state.luck + action.luck,

			life: state.life + action.life,
			mana: state.mana + action.mana
		});
	}

	case actionTypes.PLAYER_TOUCHED_GOLD: {
	  return Object.assign({}, state, {
		gold: state.gold + action.payload
	  });
	}

	case actionTypes.PLAYER_MOVE_X:{
	  return Object.assign({}, state, {pos: {
		x: state.pos.x + action.payload,
		y: state.pos.y
	  }});
	}

	case actionTypes.PLAYER_MOVE_Y:{
	  return Object.assign({}, state, {pos: {
		x: state.pos.x,
		y: state.pos.y + action.payload
	  }});
	}






	case actionTypes.PLAYERLEVELUP: {
		let newStr = state.strength + action.stats.str;
		let newVit = state.vitality + action.stats.vit;
		let newLvl = state.level + 1;
		let newInt = state.intelligence + action.stats.int;
		let newMaxLife = newVit * otherTypes.LIFE_VIT_MULTI + newLvl * otherTypes.LIFE_LVL_MULTI + otherTypes.BASE_LIFE + newStr * otherTypes.LIFE_STR_MULTI;
		let newMaxMana = newInt * otherTypes.LIFE_VIT_MULTI + newLvl * otherTypes.LIFE_LVL_MULTI;

		return Object.assign({},state, {
			level: newLvl,

			strength: newStr,
			agility: state.agility + action.stats.agi,
			vitality: newVit,
			intelligence: newInt,
			charisma: state.charisma + action.stats.cha,
			luck: state.luck + action.stats.luk,

			maxLife: newMaxLife,
			life: newMaxLife,
			maxMana: newMaxMana,
			mana: newMaxMana,
			exp: state.expNeededToLevel - state.exp,
			expNeededToLevel: Math.floor(otherTypes.EXP_MULTIPLIER * Math.pow(otherTypes.EXP_EXPONENT, state.level))
		});
	}

	case actionTypes.PLAYER_UPDATE_STATS: {

		return Object.assign({},state, {
			maxLife: (state.vitality * otherTypes.LIFE_VIT_MULTI) + state.level * otherTypes.LIFE_LVL_MULTI + otherTypes.BASE_LIFE,
			maxMana: (state.intelligence * otherTypes.MANA_INT_MULTI) + state.level * otherTypes.MANA_LVL_MULTI,
		});
	}

	default:
		return state;
	}
}

