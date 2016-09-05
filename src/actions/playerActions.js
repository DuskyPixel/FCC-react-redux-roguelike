import * as actionTypes from './../constants/actionTypes';

import * as audioTypes from './../constants/audioTypes';
import * as otherTypes from './../constants/otherTypes';
import * as itemTypes from './../constants/itemTypes';
import * as sounds from '../audio/sounds';
import getRandInt from '../utils/UtilRandInteger';
import getRandBool from '../utils/UtilRandBool';
import {getRandPlayerDamage} from '../utils/UtilCalculatePlayerDamage';
import getPlayerLife from '../utils/UtilCalculatePlayerLife';
import getPlayerMana from '../utils/UtilCalculatePlayerMana';


export const updateStats = (player) =>{
	return {
		type: actionTypes.PLAYER_UPDATE_STATS,
		life: getPlayerLife(player),
		mana: getPlayerMana(player)
	};
};

export const playerLevelUp = () =>{

	sounds.play(audioTypes.SND_LEVEL_UP);

	const MIN = 1;
	const MAX = 2;

	return {
		type: actionTypes.PLAYER_LEVEL_UP ,
		stats : {
			str: getRandInt(MIN, MAX),
			agi: getRandInt(MIN, MAX),
			vit: getRandInt(MIN, MAX),
			int: getRandInt(MIN, MAX),
			}
	};
};

//altar
function gettouchAltarObject(posX, posY){
	let touchAltarObject = {
		type: actionTypes.PLAYER_TOUCHED_ALTAR,
		strength: 0,
		agility: 0,
		vitality: 0,
		intelligence: 0,
		life: 0,
		mana: 0,
		pos: {x: posX, y: posY}
	};

	const randNum = Math.random();
	const MIN = 1;
	const MAX = 2;

	//16% chance for each attribute
	if(randNum <= .25){
		touchAltarObject.strength = getRandInt(MIN, MAX);
	}
	else if(randNum <= .50 && randNum > .25){
		touchAltarObject.agility = getRandInt(MIN, MAX);
	}
	else if(randNum <= .75 && randNum > .50){
		touchAltarObject.vitality = getRandInt(MIN, MAX);
	}
	else{
		touchAltarObject.intelligence = getRandInt(MIN, MAX);
	}

	touchAltarObject.life = touchAltarObject.vitality * otherTypes.LIFE_VIT_MULTI + touchAltarObject.strength * otherTypes.LIFE_STR_MULTI;
	touchAltarObject.mana = touchAltarObject.intelligence * otherTypes.MANA_INT_MULTI;

	return touchAltarObject;
}

export const touchedAltar = (posX, posY) =>{
	sounds.play(audioTypes.SND_ALTAR);
	return gettouchAltarObject(posX, posY);
};

//gold
export const touchedGold = (posX, posY, playerLevel, dungeonFloor) =>{
	sounds.play(audioTypes.SND_COIN);
	let goldDropAmount = getRandInt(playerLevel, playerLevel * otherTypes.GOLD_PLAYER_LEVEL_MULTIPLIER);
	goldDropAmount += getRandInt(dungeonFloor * otherTypes.GOLD_DUNGEON_FLOOR_MIN_MULTIPLIER, dungeonFloor * otherTypes.GOLD_DUNGEON_FLOOR_MAX_MULTIPLIER);
	return {
		type: actionTypes.PLAYER_TOUCHED_GOLD,
		payload: goldDropAmount,
		pos: {x: posX, y: posY}
	};
};

//item
export const touchedItem = (posX, posY, player) =>{
	let foundHealthPotion = false;
	let foundManaPotion = false;
	let foundWeapon = false;
	let weaponStats = [];

	//66% chance for potion
	if(getRandBool(66)){
		sounds.play(audioTypes.SND_DRINK_POTION);

		//50% chance for health potion
		if(getRandBool(50)){
			foundHealthPotion = true;
		}
		else{
			foundManaPotion = true;
		}

	}
	//item
	else{

		sounds.play(audioTypes.SND_OHH);
		foundWeapon = true;

		let weapons = itemTypes.WEAPONS;
		let counter = 0;

		for(let i in weapons){
			//weapons drop equal to floor or - 1, 33.4 chance for each to drop
			if(weapons[i].minFloor === player.dungeonFloor || weapons[i].minFloor === player.dungeonFloor - 1){
		
				if(getRandBool(33.4 + counter * 33.4)){

					weaponStats = weapons[i];
					weaponStats["equipped"] = false;

					break;
				}
				else{
					counter += 1;
				}
			
			}
		}
	}


	return {
		type: actionTypes.PLAYER_TOUCHED_ITEM,
		pos: {x: posX, y: posY},
		foundHealthPotion : foundHealthPotion,
		foundManaPotion : foundManaPotion,
		foundWeapon : foundWeapon,
		weaponStats : weaponStats

	};
};

//movement
export const moveX = (moveDirection) =>{
	return {
		type: actionTypes.PLAYER_MOVE_X,
		payload: moveDirection
	};
};





export const moveY = (moveDirection, shouldPlaySound) =>{

	if(shouldPlaySound === true){
		sounds.play(audioTypes.SND_DOOR);
	}

	return {
		type: actionTypes.PLAYER_MOVE_Y,
		payload: moveDirection
	};
};

export const playerRegen = (player) =>{
	return {
		type: actionTypes.PLAYER_REGEN,
		life: player.vitality,
		mana : player.intelligence
	};
};



//player attacks/kills monster and monsters damage, exp, and whether to remove mob from map is returned
export const playerAttack = (player, monsterPositionX, monsters) =>{

	sounds.play(audioTypes.SND_ATTACK);

	let damage = getRandPlayerDamage(player);

	let newMonsterState = JSON.parse(JSON.stringify(monsters));
	let killedPOS = -1;
	let mapNeedsUpdating = false;
	let monsterDamage = 0;
	let mobExp = 0;
	let mobGold = 0;
	let killedMonster = false;

	for(let i in newMonsterState){
		if(newMonsterState[i].pos.x === monsterPositionX && newMonsterState[i].pos.y=== player.pos.y){


			if(getRandBool(newMonsterState[i].dodge) === false){
				newMonsterState[i].life -= damage;
			}

			if(newMonsterState[i].life <= 0){
				killedPOS = i;
				killedMonster = true;
				mapNeedsUpdating = true;

			}
			else{

				monsterDamage = getRandInt(newMonsterState[i].minAttack, newMonsterState[i].maxAttack );
			}


			break;
		}
	}

	if(killedPOS>-1){
		mobExp = newMonsterState[killedPOS].exp;
		newMonsterState.splice(killedPOS,1);
		mobGold = getRandInt(player.dungeonFloor * otherTypes.GOLD_DUNGEON_FLOOR_MIN_MULTIPLIER, player.dungeonFloor * otherTypes.GOLD_DUNGEON_FLOOR_MAX_MULTIPLIER);

	}
	//dodge monster attack
	else if(getRandBool(player.agility)){

		monsterDamage=0;
	}


	return {
		type: actionTypes.PLAYER_ATTACKS_MOB,
		pos : {x: monsterPositionX, y: player.pos.y},
		monsterDamage : monsterDamage,
		newMonsterState : newMonsterState,
		mobExp : mobExp,
		mobGold : mobGold,
		mapNeedsUpdating : mapNeedsUpdating,
		readyToRegen : killedMonster
	};
};