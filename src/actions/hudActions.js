import * as sounds from '../audio/sounds';
import * as hudTypes from './../constants/hudTypes';
import * as otherTypes from './../constants/otherTypes';
import * as actionTypes from './../constants/actionTypes';
import * as itemTypes from './../constants/itemTypes';
import {SND_COIN} from './../constants/audioTypes';

export const useHealthPotion = (player) =>{

	let usedPotion = false;
	let newLife = player.life;

	if(player.life !== player.maxLife && player.healthPotions > 0){
		usedPotion = true;

		newLife = player.maxLife * itemTypes.POTION_PERCENT;
		newLife = Math.floor(player.life + newLife);

		if(newLife > player.maxLife){
			newLife = player.maxLife;
		}
	}

	return {
		type : actionTypes.PLAYER_USE_HEALTH_POTION,
		newLife : newLife,
		usedPotion : usedPotion
	};
};

export const useManaPotion = (player) =>{
	let usedPotion = false;
	let newMana = player.mana;

	if(player.mana !== player.maxMana && player.manaPotions > 0){
		usedPotion = true;

		newMana = player.maxMana * itemTypes.POTION_PERCENT;
		newMana = Math.floor(player.mana + newMana);

		if(newMana > player.maxMana){
			newMana = player.maxMana;
		}
	}

	return {
		type : actionTypes.PLAYER_USE_MANA_POTION,
		newLife : newMana,
		usedPotion : usedPotion
	};
};

export const changeHudHoverMsg = (msg) =>{

	return {
		type: actionTypes.CHANGE_HUD_HOVER_MESSAGE,
		payload: msg
			
	};
};

export const revertHudHoverMsg = () =>{
	
	return {
		type: actionTypes.REVERT_HUD_HOVER_MESSAGE,
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
		type: actionTypes.HUD_BUY_ATTRIBUTE_UPGRADE,
		upgrade: upgrade
			
	};
};
