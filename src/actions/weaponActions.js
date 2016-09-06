import {WEAPON_EQUIP, WEAPON_SELL} from './../constants/actionTypes';
import * as otherTypes from './../constants/otherTypes';
import getRandInt from '../utils/UtilRandInteger';

import * as sounds from '../audio/sounds';
import * as audioTypes from './../constants/audioTypes';

export const equipWeapon = (weapons, id) =>{

	let newWeaponState = JSON.parse(JSON.stringify(weapons));


	for(let i in newWeaponState){
		
		//maybe should change double equal
		if(i == id){
			newWeaponState[i].equipped = !newWeaponState[i].equipped;
			break;
		}

	}

	return {
		type: WEAPON_EQUIP,
		newWeaponState: newWeaponState
	};
};

export const sellWeapon = (weapons, id) =>{

	let newWeaponState = JSON.parse(JSON.stringify(weapons));
	let sellValue = 0;

	sounds.play(audioTypes.SND_COIN);

	for(let i in newWeaponState){
		
		//maybe should change double equal
		if(i == id){
			newWeaponState[i].equipped = false;
			
			sellValue = (1 + newWeaponState[i].minFloor);
			
			sellValue *= getRandInt(otherTypes.SELL_FLOOR_VALUE_MIN, otherTypes.SELL_FLOOR_VALUE_MAX);
			
			break;
		}
	}
	
	newWeaponState.splice(id, 1);


	return {
		type: WEAPON_SELL,
		newWeaponState: newWeaponState,
		sellValue : sellValue
	};
};


