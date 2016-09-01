import {CHANGE_HUD_HOVER_MESSAGE, 
		REVERT_HUD_HOVER_MESSAGE,
		HUD_BUY_ATTRIBUTE_UPGRADE} from './../constants/actionTypes';
import * as sounds from '../audio/sounds';
import * as hudTypes from './../constants/hudTypes';
import * as otherTypes from './../constants/otherTypes';
import {SND_COIN} from './../constants/audioTypes';

export const changeHudHoverMsg = (msg) =>{

	return {
		type: CHANGE_HUD_HOVER_MESSAGE,
		payload: msg
			
	};
};

export const revertHudHoverMsg = () =>{
	
	return {
		type: REVERT_HUD_HOVER_MESSAGE,
		payload: hudTypes.DEFAULT_HOVER_MSG
			
	};
};

export const buyAttributeUpgrade = (attributeString, goldCost) =>{

	sounds.play(SND_COIN);

	let upgrade = {
		strength: 0,
		agility: 0,
		vitality: 0,
		intelligence: 0,

		life: 0,
		mana: 0,
		goldCost: goldCost,
		hoverMsg: ""
	};
	

	switch(attributeString){
		case hudTypes.ATTR_STR:{
			upgrade.strength = 1;
			
			break;
		}
		case hudTypes.ATTR_AGI:{
			upgrade.agility = 1;
			break;
		}
		case hudTypes.ATTR_VIT:{
			upgrade.vitality = 1;
			break;
		}
		case hudTypes.ATTR_INT:{
			upgrade.intelligence = 1;
			break;
		}
	}

	upgrade.life = upgrade.vitality * otherTypes.LIFE_VIT_MULTI + upgrade.strength * otherTypes.LIFE_STR_MULTI;
	upgrade.mana = upgrade.intelligence * otherTypes.MANA_INT_MULTI;

	let updatedGoldCost = Math.floor((goldCost / hudTypes.ATTRIBUTE_UPGRADE_COST) + 1) * 2;
	upgrade.hoverMsg = `Upgrade ${attributeString} by 1 for ${updatedGoldCost} gold`;

	return {
		type: HUD_BUY_ATTRIBUTE_UPGRADE,
		upgrade: upgrade
			
	};
};
