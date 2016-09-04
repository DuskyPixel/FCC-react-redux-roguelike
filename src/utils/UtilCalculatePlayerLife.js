import * as otherTypes from './../constants/otherTypes';

export default function getPlayerLife(player) {
	let life = player.vitality * otherTypes.LIFE_VIT_MULTI;
	life += player.level * otherTypes.LIFE_LVL_MULTI;
	life += otherTypes.BASE_LIFE;
	life += player.strength * otherTypes.LIFE_STR_MULTI;
	console.log("first life: "+life);

	for(let i in player.weapons){
		if(player.weapons[i]){
			if(player.weapons[i].equipped === true){
				life += player.weapons[i].life;
			}
		}
	}

	console.log("secon life: "+life);
	
	return life;
}