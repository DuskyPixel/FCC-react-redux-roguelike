import * as otherTypes from './../constants/otherTypes';

export default function getPlayerMana(player) {
	
	let mana = player.intelligence * otherTypes.MANA_INT_MULTI;
	mana += player.level * otherTypes.MANA_LVL_MULTI;


	for(let i in player.weapons){
		if(player.weapons[i]){
			if(player.weapons[i].equipped === true){
				mana += player.weapons[i].mana;
			}
		}
	}
	
	return mana;
}