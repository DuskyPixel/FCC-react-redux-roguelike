import * as dungeonTypes from './../constants/dungeonTypes';
import {PLAYER_ATTACKS_MOB} from './../constants/actionTypes';
import * as audioTypes from './../constants/audioTypes';
import * as sounds from '../audio/sounds';


/*
todo
-------
0 = do no action cuz its wall most likely
1 = move to that position
2 = stay in currently position and attack monster there
*/


export function moveYEffect(playerID, tileID){
	if(tileID === dungeonTypes.WALL){
		return false;
	}
	else if(tileID === dungeonTypes.DOOR){
		sounds.play(audioTypes.SND_DOOR);
	}
	return true;
}

export function moveXEffect(playerID, tileID){
	if(tileID === dungeonTypes.WALL){
		return false;
	}
	else if(tileID === dungeonTypes.OBJ_ALTAR){
		sounds.play(audioTypes.SND_ALTAR);
		//return actionTypes.PLAYER_TOUCHED_ALTAR;
	}
	else if(tileID === dungeonTypes.OBJ_GOLD){
		sounds.play(audioTypes.SND_COIN);
		//return ;
	}
	else if(tileID === dungeonTypes.OBJ_MOB){
		sounds.play(audioTypes.SND_ATTACK);
		return PLAYER_ATTACKS_MOB;
	}
	return "";
}