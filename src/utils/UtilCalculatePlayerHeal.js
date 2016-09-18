import * as spellTypes from './../constants/spellTypes';
import getRandInt from '../utils/UtilRandInteger';

export default function getHealPercent(intelligence, average){

	let healPercentMin = spellTypes.HEAL_BUFF_BASE_INCREASE_MIN;
	let healPercentMax = spellTypes.HEAL_BUFF_BASE_INCREASE_MAX;

	healPercentMin += intelligence * spellTypes.HEAL_BUFF_INTELLIGENCE_INCREASE;
	healPercentMax += intelligence * spellTypes.HEAL_BUFF_INTELLIGENCE_INCREASE;

	//for hud spell description
	if(average){
		return Math.floor((healPercentMin + healPercentMax)/2);
	}

	//for healing
	return getRandInt(healPercentMin, healPercentMax);
}