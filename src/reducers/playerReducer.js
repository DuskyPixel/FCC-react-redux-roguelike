import * as actionTypes from './../constants/actionTypes';
import * as otherTypes from './../constants/otherTypes';
import initialState from './initialState';

export default function player (state = initialState.player, action) {

switch(action.type) 
{

	case actionTypes.PLAYER_TOUCHED_ITEM:{
		console.log(state.gold);
		return Object.assign({}, state, {
			healthPotions : action.foundHealthPotion === true ? state.healthPotions + 1 : state.healthPotions,
			manaPotions : action.foundManaPotion === true ? state.manaPotions + 1 : state.manaPotions
		});
	}

	case actionTypes.PLAYER_USE_HEALTH_POTION:{

		return Object.assign({}, state, {
			life : action.usedPotion === true ? action.newLife : state.life,
			healthPotions : action.usedPotion === true ? state.healthPotions - 1 : state.healthPotions
		});
	}

	case actionTypes.PLAYER_USE_MANA_POTION:{
		return Object.assign({}, state, 
		{
			mana: action.usedPotion === true ? action.newMana : state.mana,
			manaPotions : action.usedPotion === true ? state.manaPotions - 1 : state.manaPotions
		});
	}

	case actionTypes.MAPGENERATE:{
		return Object.assign({}, state, 
		{
			pos: {
				x: action.mapGrid.playerPOS.x,
				y: action.mapGrid.playerPOS.y},
			dungeonFloor: action.dungeonFloor
		});
	}

	case actionTypes.HUD_BUY_ATTRIBUTE_UPGRADE:{


		return Object.assign({},state, {
			strength: state.strength + action.upgrade.strength,
			agility: state.agility + action.upgrade.agility,
			vitality: state.vitality + action.upgrade.vitality,
			intelligence: state.intelligence + action.upgrade.intelligence,

			life: state.life + action.upgrade.life,
			mana: state.mana + action.upgrade.mana,
			maxLife: state.maxLife + action.upgrade.life,
			maxMana: state.maxMana + action.upgrade.mana,
			gold: state.gold - action.upgrade.goldCost
		});
	}

	case actionTypes.PLAYER_REGEN:{

		let newLife = state.life + action.life;
		let newMana = state.mana + action.mana;

		if(newLife > state.maxLife){
			newLife = state.maxLife;
		}
		if(newMana > state.maxMana){
			newMana = state.maxMana;
		}

		return Object.assign({}, state, {
			life: newLife,
			mana: newMana
		});
	}

	case actionTypes.PLAYER_ATTACKS_MOB:{
			return Object.assign({}, state, {
				life : state.life - action.monsterDamage,
				exp : state.exp + action.mobExp,
				gold : state.gold + action.mobGold,
				killedMonster : action.killedMonster
			});
	}

	case actionTypes.PLAYER_TOUCHED_ALTAR: {
		return Object.assign({},state, {
			strength: state.strength + action.strength,
			agility: state.agility + action.agility,
			vitality: state.vitality + action.vitality,
			intelligence: state.intelligence + action.intelligence,

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






	case actionTypes.PLAYER_LEVEL_UP: {

		const newStr = state.strength + action.stats.str;
		const newVit = state.vitality + action.stats.vit;
		const newLvl = state.level + 1;
		const newInt = state.intelligence + action.stats.int;
		const newMaxLife = newVit * otherTypes.LIFE_VIT_MULTI + newLvl * otherTypes.LIFE_LVL_MULTI + otherTypes.BASE_LIFE + newStr * otherTypes.LIFE_STR_MULTI;
		const newMaxMana = newInt * otherTypes.LIFE_VIT_MULTI + newLvl * otherTypes.LIFE_LVL_MULTI;

		return Object.assign({},state, {
			level: newLvl,

			strength: newStr,
			agility: state.agility + action.stats.agi,
			vitality: newVit,
			intelligence: newInt,

			maxLife: newMaxLife,
			life: newMaxLife,
			maxMana: newMaxMana,
			mana: newMaxMana,
			exp:  state.exp - state.expNeededToLevel,
			expNeededToLevel: Math.floor(otherTypes.EXP_MULTIPLIER * Math.pow(otherTypes.EXP_EXPONENT, state.level))
		});
	}

	case actionTypes.PLAYER_UPDATE_STATS: {

		return Object.assign({},state, {
			maxLife: action.life,
			maxMana: action.mana
		});
	}

	default:
		return state;
	}
}

