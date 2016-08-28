import * as actionTypes from './../constants/actionTypes';
import * as otherTypes from './../constants/otherTypes';
import getRandInt from '../utils/UtilRandInteger';
import getRandBool from '../utils/UtilRandBool';


export const updateStats = () =>{
	return {
		type: actionTypes.PLAYER_UPDATE_STATS,
		payload: ""
	};
};

export const playerLevelUp = () =>{

	const min = otherTypes.LEVEL_UP_MIN_INCREASE;
	const max = otherTypes.LEVEL_UP_MAX_INCREASE;

	return {
		type: actionTypes.PLAYER_LEVEL_UP ,
		stats : {
			str: getRandInt(min, max),
			agi: getRandInt(min, max),
			vit: getRandInt(min, max),
			int: getRandInt(min, max),
			cha: getRandInt(min, max),
			luk: getRandInt(min, max)
			}
	};
};

//altar
function gettouchAltarObject(posX, posY){
	const touchAltarObject = {
		type: actionTypes.PLAYER_TOUCHED_ALTAR,
		strength: 0,
        agility: 0,
        vitality: 0,
        intelligence: 0,
        charisma: 0,
        luck: 0,
        life: 0,
        mana: 0,
        pos: {x: posX, y: posY}
	};

	const randNum = Math.random();
	const min = otherTypes.ALTAR_MIN_INCREASE;
	const max = otherTypes.ALTAR_MAX_INCREASE;

	//16% chance for each attribute
	if(randNum <= .16){
		touchAltarObject.strength = getRandInt(min, max);
	}
	else if(randNum <= .33 && randNum > .16){
		touchAltarObject.agility = getRandInt(min, max);
	}
	else if(randNum <= .5 && randNum > .33){
		touchAltarObject.vitality = getRandInt(min, max);
	}
	else if(randNum <= .66 && randNum > .5){
		touchAltarObject.intelligence = getRandInt(min, max);
	}
	else if(randNum <= .83 && randNum > .66){
		touchAltarObject.charisma = getRandInt(min, max);
	}
	else{
		touchAltarObject.luck = getRandInt(min, max);
	}

	touchAltarObject.life = touchAltarObject.vitality * otherTypes.LIFE_VIT_MULTI + touchAltarObject.strength * otherTypes.LIFE_STR_MULTI;
    touchAltarObject.mana = touchAltarObject.intelligence * otherTypes.MANA_INT_MULTI;

	return touchAltarObject;
}
export const touchedAltar = (posX, posY) =>{

	return gettouchAltarObject(posX, posY);
};

//gold
export const touchedGold = (posX, posY, playerLevel, dungeonFloor) =>{
	let goldDropAmount = getRandInt(playerLevel, playerLevel * otherTypes.GOLD_PLAYER_LEVEL_MULTIPLIER);
	goldDropAmount += getRandInt(dungeonFloor * otherTypes.GOLD_DUNGEON_FLOOR_MIN_MULTIPLIER, dungeonFloor * otherTypes.GOLD_DUNGEON_FLOOR_MAX_MULTIPLIER);
	return {
		type: actionTypes.PLAYER_TOUCHED_GOLD,
		payload: goldDropAmount,
		pos: {x: posX, y: posY}
	};
};


//movement
export const moveX = (moveDirection) =>{
	return {
		type: actionTypes.PLAYER_MOVE_X,
		payload: moveDirection
	};
};

export const moveY = (moveDirection) =>{
	return {
		type: actionTypes.PLAYER_MOVE_Y,
		payload: moveDirection
	};
};



//player attacks/kills monster and monsters damage, exp, and whether to remove mob from map is returned
export const playerAttack = (player, monsterPositionX, monsters) =>{

	let damage = player.agility * otherTypes.AGI_DMG_INC;
	damage += getRandInt(player.level * otherTypes.LVL_DMG_MIN_MULTI, player.level * otherTypes.LVL_DMG_MAX_MULTI);
	damage += getRandInt(player.strength * otherTypes.STR_DMG_MIN_MULTI, player.strength * otherTypes.STR_DMG_MAX_MULTI);

	let newMonsterState = JSON.parse(JSON.stringify(monsters));
	let killedPOS = -1;
	let mapNeedsUpdating = false;
	let monsterDamage = 0;
	let mobExp = 0;
	let mobGold = 0;

    for(let i in newMonsterState){
        if(newMonsterState[i].pos.x === monsterPositionX && newMonsterState[i].pos.y=== player.pos.y){

            newMonsterState[i].life -= damage;

            monsterDamage = getRandInt(newMonsterState[i].minAttack, newMonsterState[i].maxAttack );

            if(newMonsterState[i].life <= 0){
                killedPOS = i;
                mapNeedsUpdating = true;

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
	if(getRandBool(player.agility)){
		monsterDamage=0;
	}

	return {
		type: actionTypes.PLAYER_ATTACKS_MOB,
		pos : {x: monsterPositionX, y: player.pos.y},
        monsterDamage : monsterDamage,
        newMonsterState : newMonsterState,
        mobExp : mobExp,
        mobGold : mobGold,
        mapNeedsUpdating : mapNeedsUpdating
	};
};