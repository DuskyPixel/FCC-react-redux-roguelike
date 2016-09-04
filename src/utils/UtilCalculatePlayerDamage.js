import * as otherTypes from './../constants/otherTypes';
import getRandInt from '../utils/UtilRandInteger';

export function getPlayerDamage(player) {

	let damage = player.agility * otherTypes.AGI_DMG_INC;
	let minDamage = player.level * otherTypes.LVL_DMG_MIN_MULTI + player.strength * otherTypes.STR_DMG_MIN_MULTI;
	let maxDamage = player.level * otherTypes.LVL_DMG_MAX_MULTI + player.strength * otherTypes.STR_DMG_MAX_MULTI;

	damage += Math.floor((minDamage + maxDamage) / 2);

	for(let i in player.weapons){
		if(player.weapons[i]){
			if(player.weapons[i].equipped === true){
				damage += player.weapons[i].damage;

			}
		}
	}

	return damage;
}

export function getRandPlayerDamage(player) {

	let damage = player.agility * otherTypes.AGI_DMG_INC;
	damage += getRandInt(player.level * otherTypes.LVL_DMG_MIN_MULTI + player.strength * otherTypes.STR_DMG_MIN_MULTI, 
					player.level * otherTypes.LVL_DMG_MAX_MULTI + player.strength * otherTypes.STR_DMG_MAX_MULTI);

	for(let i in player.weapons){
		if(player.weapons[i]){
			if(player.weapons[i].equipped === true){
				damage += player.weapons[i].damage;

			}
		}
	}

	return damage;
}