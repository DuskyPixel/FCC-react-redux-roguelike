/* eslint-disable */
import * as dungeonTypes from './../constants/dungeonTypes';
import * as monsterTypes from './../constants/monsterTypes';
import * as otherTypes from './../constants/otherTypes';
import getRandInt from './UtilRandInteger';
import getRandBool from './UtilRandBool';

let playerPOS;

export default function generateDungeon(minWidth, maxWidth, dungeonFloor){

	let dungeonArray = [];
	let arrayOfMonsters = [];
	let fillCheckArray = [];
	let floorTileCount = 0
	let height = 0;
	playerPOS = {};

	// ***************************** door placed outside of array... it does not get removed because of that
	// ************************** WITH LAST CHANGE THE DOOR OUTSIDE OF ARRAY NOW GETS CHANGED TO A WALL OUTSIDE OF ARRAY
	// ******* one thing from each function
	// ************** add in gold luck chance for objects
	// ************* monsters you should be weighted to spawn to left or right of doors which would mean 1 per room
	// **************** BEFORE EVERY ALTAR there should spawn a difficult monster
	// ********** near every chest should strong medium difficult monster
	/*
	 specific amount of mobs per level of different types, floors- 8 +0 mobs, 4 +1 mobs, 2 +2 mobs
	 +0 placed randomly but can not be above or below doors
	 +1 mobs guard altars	(four altars per level)
	 +2 mobs guard one chest and the exit
	 */

	 if(dungeonFloor === dungeonTypes.BOSS_FLOOR){

	 	dungeonArray = createBossDungeonAndPlacePlayer();
	 	arrayOfMonsters = createBossArray();

	 	return {tileGrid : dungeonArray, monsterArray : arrayOfMonsters, playerPOS: playerPOS};
	 }

	while(floorTileCount < 60){
		dungeonArray = [];
		fillCheckArray = [];
		floorTileCount = 0;
		height = Math.random() < .7 ? 15 : 11;

		dungeonArray = createDungeonWalls(dungeonArray, getRandInt(minWidth, maxWidth), height );
		dungeonArray = createDungeonRooms(dungeonArray);

		//fill center row with floor tiles to make connecting rooms easier
		for(let x=1;x<dungeonArray[0].length-1;x++){
			dungeonArray[Math.floor(dungeonArray.length/2)][x] = dungeonTypes.GROUND;
		}

		dungeonArray = removeUnconnectedRooms(dungeonArray);
		dungeonArray = combineSomeRooms(dungeonArray);

		//deep copy array
		for(let y=0;y<dungeonArray.length;y++){
			let tempArr = [];
			for(let x=0;x<dungeonArray[0].length;x++){
				let temp = dungeonArray[y][x];
				tempArr.push(temp);
			}
			fillCheckArray.push(tempArr);
		}

		floodFill(fillCheckArray, Math.floor(height/2), 1, dungeonTypes.GROUND, dungeonTypes.TEST_TILE);

		floorTileCount = countFloorTiles(fillCheckArray);

	}

	dungeonArray = removeDisconnectedTiles(dungeonArray, fillCheckArray);

	dungeonArray = chopCenterLeftAndRight(dungeonArray);

	dungeonArray = placeSpecialMapObjects(dungeonArray);

	//add walls to left and right of array so when you are far left or right you will still see walls
	for(let i=0;i<dungeonArray.length;i++){
		dungeonArray[i].unshift(0,0,0);
		dungeonArray[i].push(0,0,0);
	}
	//need to move over 3 spots since added 3 0's above
	playerPOS.x = playerPOS.x + 3;
	

	//place monsters, needs to be before placing random ground tiles
	arrayOfMonsters = createMonsterArray(dungeonArray, dungeonFloor, floorTileCount);
	dungeonArray = arrayOfMonsters[1];
	arrayOfMonsters = arrayOfMonsters[0];
	dungeonArray = placeRandomGroundTiles(dungeonArray); //getRandGroundTile



	
	return {tileGrid : dungeonArray, monsterArray : arrayOfMonsters, playerPOS: playerPOS};
}

function createDungeonWalls(arr, width, height){
	// just place walls everywhere
	for(let y=0;y<height;y++){
		let tempArr = [];
		for(let x=0;x<width;x++){
			tempArr.push(dungeonTypes.WALL);
		}
		arr.push(tempArr);
		tempArr=[];
	}

	return arr;
}

function createDungeonRooms(arr){

	let roomSize = getRandInt(7,13);
	let currentStartEndPositions;

	for(let y=1;y<arr.length;y+=2){
		currentStartEndPositions = getRandInt(1,6);
		for(let x=1;x<arr[0].length-1;x++){

			//only place rooms on non room tiles while making sure they are not up against each other
			if(x >= currentStartEndPositions && arr[y][x] === dungeonTypes.WALL && arr[y][x-1] !== dungeonTypes.GROUND && x <= arr[0].length- currentStartEndPositions){
				//place room
				for(let z=x;z<roomSize+x;z++){
					if(z<=arr[0].length-2){
						arr[y][z] = dungeonTypes.GROUND;
					}

				}
				//place door somewhere around the middle
				if(y+1 < arr.length-1 && x + Math.floor(roomSize/2) < arr[y].length - 1){
					arr[y+1][x+Math.floor(roomSize/2)-getRandInt(Math.floor(roomSize/4), -Math.floor(roomSize/4))] = dungeonTypes.DOOR;
				}
				roomSize = getRandInt(7,13);
			}

		}

	}
	return arr;
}

function removeUnconnectedRooms(arr){
	//if door does not have floor above and below it remove it
	for(let i=2;i<arr.length-2;i+=2){
		for(let q=0;q<arr[i].length;q++){
			if(arr[i][q]===dungeonTypes.DOOR){
				if(arr[i-1][q] === dungeonTypes.WALL || arr[i+1][q] === dungeonTypes.WALL){
					arr[i][q] = dungeonTypes.WALL;
				}
			}
		}
	}
	return arr;
}

function combineSomeRooms(arr){
	//chance to connect rooms together to make things a bit less linear
	for(let i=0;i<arr.length;i++){
		for(let q=0;q<arr[i].length;q++){
			if(arr[i][q]===dungeonTypes.WALL && arr[i][q-1] === dungeonTypes.GROUND && arr[i][q+1]=== dungeonTypes.GROUND){
				if(getRandBool(45)){
					arr[i][q]=dungeonTypes.GROUND;
				}
			}
		}
	}

	return arr;
}

function floodFill(arr, x, y, target, replacement){
	let width = arr[0].length;
	let height = arr.length;

	//check if tile is ground or door
	if(arr[x][y] !== target && arr[x][y] !== target+1){
		return;
	}

	//change tile to testtile to count reachable tiles
	arr[x][y] = replacement;

	//left
	if(x>0){
		floodFill(arr, x, y-1, target, replacement);
	}
	//right
	if(x<arr.length-1){
		floodFill(arr, x, y+1, target, replacement);
	}
	//up
	if(y>0){
		floodFill(arr, x-1, y, target, replacement);
	}
	//down
	if(y<arr[0].length){
		floodFill(arr, x+1, y, target, replacement);
	}
}

function countFloorTiles(arr){
	let count = 0;
	for(let y=0;y<arr.length;y++){
		for(let x=0;x<arr[0].length;x++){
			if(arr[y][x]===dungeonTypes.TEST_TILE){
				count+=1;
			}
		}
	}
	return count;
}

function removeDisconnectedTiles(dungeonArray, floodFillArray){
	for(let y=0;y<dungeonArray.length;y++){
		for(let x=0;x<dungeonArray[0].length;x++){

			if(floodFillArray[y][x]!==dungeonTypes.TEST_TILE){
				dungeonArray[y][x]=dungeonTypes.WALL;
			}
		}
	}
	return dungeonArray;
}

function chopCenterLeftAndRight(arr){


	const CENTER = Math.floor(arr.length/2);
	let finished = false;
	let pos = 1;
	let chopMax = getRandInt(2,7);

	//chop left center
	while(finished===false && chopMax > pos){
		if(arr[CENTER][pos]===dungeonTypes.GROUND && arr[CENTER-1][pos]===dungeonTypes.WALL && arr[CENTER+1][pos]===dungeonTypes.WALL){
			arr[CENTER][pos]=dungeonTypes.WALL;
			pos+=1;
		}
		else{
			finished=true;
		}

	}


	finished = false;
	pos = arr[0].length - 2;
	chopMax = getRandInt(2,7);
	//chop right center
	while(finished===false && chopMax < pos){
		if(arr[CENTER][pos]===dungeonTypes.GROUND && arr[CENTER-1][pos]===dungeonTypes.WALL && arr[CENTER+1][pos]===dungeonTypes.WALL){
			arr[CENTER][pos]=dungeonTypes.WALL;
			pos-=1;
		}
		else{
			finished=true;
		}

	}

	return arr;
}

function placeSpecialMapObjects(dung){
	//nothing can above or below doors
	//player spawns at dead end
	//monsters can not spawn in dead ends
	//altars randomly placed
	//equip spawn have higher chance of spawning at dead ends
	//gold can spawn anywhere that does not already have something there so it spawns last


	//place player
	let playerFound = false;
	let stairsFound = false;
	let randX;
	let randY;
	let stairPOS = {};
	

	while(playerFound === false){
		randY = getRandInt(0,Math.floor((dung.length-2)/2));
		randY *= 2;
		randY += 1;

		randX = getRandInt(1,dung[0].length -1);
		if(checkDeadEndTile(randX, randY, dung)){
			playerFound=true;
		}

	}

	playerPOS = {x: randX, y: randY };

	while(stairsFound === false){
		randY = getRandInt(0,Math.floor((dung.length-2)/2));
		randY *= 2;
		randY += 1;

		randX = getRandInt(1,dung[0].length -1);

		if(randY !== playerPOS.y && checkDeadEndTile(randX, randY, dung)){
			stairsFound = true;
		}

	}

	stairPOS = {x: randX, y: randY };

	//place special map objects

	for(let i=1;i<dung.length;i+=2){
		for(let q=1;q<dung[0].length-1;q++){

			//if not player position then possibly place special object
			if(playerPOS.y !== i && playerPOS.x !== q){
				//if dead end then chance to spawn altars or chests
				if(checkDeadEndTile(q,i,dung)){
					//chance of something spawning in dead end
					if(getRandBool(50)){
						//50% chance for altar
						if(getRandBool(50)){
							dung[i][q] = dungeonTypes.OBJ_ALTAR;
							
						}
						else{
							dung[i][q] = dungeonTypes.OBJ_ITEM;
						
						}
					}
				}
				else if(notBelowOrAboveDoor(q,i,dung)){
					//chance of something spawning in spots other than dead ends and below/above doors
					if(getRandBool(4)){
						dung[i][q] = dungeonTypes.OBJ_GOLD;

					}
				}
			}
		}
	}

	dung[stairPOS.y][stairPOS.x] = dungeonTypes.STAIRS;



	return dung
}

















function createMonsterArray(dungeonArray, dungeonFloor, totalFloorTiles){

	let monsterArray = [];
	const MIN_TIER_TWO_SPAWN = 1;
	const MAX_TIER_TWO_SPAWN = 2;
	const tierOneMax = getRandInt(9 + dungeonFloor, 11 + dungeonFloor);
	const tierTwoMax = getRandInt(MIN_TIER_TWO_SPAWN, MAX_TIER_TWO_SPAWN + dungeonFloor);
	let tierOneCount = 0;
	let tierTwoCount = 0;

	let totalTierCount = tierOneMax + tierTwoMax;
	const MONSTERS = monsterTypes.MONSTERS;
	let mobTier = 1;
	totalFloorTiles = totalFloorTiles - 32;
	let floorTilesLeft = 0 ;

	for(let y=1;y<dungeonArray.length;y+=2){
		for(let x=3;x<dungeonArray[0].length-3;x++){
			if(dungeonArray[y][x] === dungeonTypes.GROUND && checkDeadEndTile(x, y, dungeonArray) === false && notBelowOrAboveDoor(x, y, dungeonArray)){

				floorTilesLeft += 1;

				if(dungeonArray[y][x-1] === dungeonTypes.OBJ_ALTAR || dungeonArray[y][x+1] === dungeonTypes.OBJ_ALTAR 
					|| dungeonArray[y][x-1] === dungeonTypes.OBJ_ITEM || dungeonArray[y][x+1] === dungeonTypes.OBJ_ITEM){

					mobTier = 2;

					for(let z in MONSTERS){
						if(MONSTERS[z].floor === dungeonFloor && MONSTERS[z].tier === mobTier){

							let MOB = MONSTERS[z];

							dungeonArray[y][x] = MOB.idNum ;

							

							monsterArray.push({
								name : MOB.name,
								pos : {x: x, y: y},
								maxLife: (MOB.baseVitality * otherTypes.LIFE_VIT_MULTI) + dungeonFloor * otherTypes.LIFE_LVL_MULTI + MOB.baseStrength * otherTypes.LIFE_STR_MULTI,
								life: (MOB.baseVitality * otherTypes.LIFE_VIT_MULTI) + dungeonFloor * otherTypes.LIFE_LVL_MULTI + MOB.baseStrength * otherTypes.LIFE_STR_MULTI,
								exp : MOB.baseVitality + MOB.baseAgility + MOB.baseStrength ,
								dodge : MOB.baseAgility,
								minAttack : dungeonFloor + MOB.baseStrength * otherTypes.MOB_DMG_MIN_MULTI + MOB.baseAgility,
								maxAttack : dungeonFloor + MOB.baseStrength * otherTypes.MOB_DMG_MAX_MULTI + MOB.baseAgility
							});
							break;
						}

					}
				}
				else if(getRandBool( 100 * ((totalTierCount - (tierTwoCount + tierOneCount)) / (totalFloorTiles - floorTilesLeft)))){

					if((tierTwoCount < tierTwoMax)  && (tierOneCount < tierOneMax)){

						if(getRandBool( 100 * ((tierOneMax - tierOneCount) / (totalTierCount - tierOneCount - tierTwoCount))  )){
							mobTier = 1;
							tierOneCount +=1;
						}
						else{
							mobTier = 2;
							tierTwoCount +=1;
						}
					}
					else if(tierTwoCount < tierTwoMax){
						mobTier = 2;
						tierTwoCount +=1;
					}
					else if(tierOneCount < tierOneMax){
						mobTier = 1;
						tierOneCount += 1;
					}

					for(let z in MONSTERS){
						if(MONSTERS[z].floor === dungeonFloor && MONSTERS[z].tier === mobTier){

							const MOB = MONSTERS[z];

							dungeonArray[y][x] = MOB.idNum ;

				

							monsterArray.push({
								name : MOB.name,
								pos : {x: x, y: y},
								maxLife: (MOB.baseVitality * otherTypes.LIFE_VIT_MULTI) + dungeonFloor * otherTypes.LIFE_LVL_MULTI + MOB.baseStrength * otherTypes.LIFE_STR_MULTI,
								life: (MOB.baseVitality * otherTypes.LIFE_VIT_MULTI) + dungeonFloor * otherTypes.LIFE_LVL_MULTI + MOB.baseStrength * otherTypes.LIFE_STR_MULTI,
								exp : MOB.baseVitality + MOB.baseAgility + MOB.baseStrength ,
								dodge : MOB.baseAgility,
								minAttack : dungeonFloor + MOB.baseStrength * otherTypes.MOB_DMG_MIN_MULTI + MOB.baseAgility,
								maxAttack : dungeonFloor + MOB.baseStrength * otherTypes.MOB_DMG_MAX_MULTI + MOB.baseAgility
							});
							break;
						}

					}
				}
			}
			else if(dungeonArray[y][x] === dungeonTypes.GROUND){
				floorTilesLeft += 1;
			}
		}
	}


	return [monsterArray, dungeonArray];
}










function placeRandomGroundTiles(dung){

	for(let y=1;y<dung.length;y+=2){
		for(let x=1;x<dung[0].length-1;x++){
			if(dung[y][x] === dungeonTypes.GROUND){
				dung[y][x] = getRandGroundTile();
			}
		}
	}
	return dung;
}



function getRandGroundTile(){
	let randNum = Math.random();
	let tileID = dungeonTypes.GROUND;

	//84% for normal tile and 4% for each special ground tile
	if (randNum < .60) {
		tileID = dungeonTypes.GROUND;
	}
	else if (randNum < .70) {
		tileID = dungeonTypes.GROUND2;
	}
	else if (randNum < .80) {
		tileID = dungeonTypes.GROUND3;
	}
	else if (randNum < .90) {
		tileID = dungeonTypes.GROUND4;
	}
	else {
		tileID = dungeonTypes.GROUND5;
	}

	return tileID;
}

function checkDeadEndTile(x,y, dung){
	if(notBelowOrAboveDoor(x,y,dung)){
		if(dung[y][x-1] === dungeonTypes.GROUND && dung[y][x+1] === dungeonTypes.WALL || dung[y][x-1] === dungeonTypes.WALL && dung[y][x+1] === dungeonTypes.GROUND){
			return true;
		}
	}
	return false;
}

function notBelowOrAboveDoor(x,y,dung){
	if(dung[y][x] === dungeonTypes.GROUND &&
	dung[y-1][x] === dungeonTypes.WALL &&
	dung[y+1][x] === dungeonTypes.WALL){
		return true;
	}
	return false;
}

function createBossDungeonAndPlacePlayer(){

	let dung = [
				
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,dungeonTypes.GROUND,dungeonTypes.GROUND,dungeonTypes.GROUND,dungeonTypes.GROUND,dungeonTypes.MOBID_TERRGOTH,0,0,0],
				[0,0,0,dungeonTypes.DOOR,0,0,0,0,0,0,0,0],
				[0,0,0,dungeonTypes.GROUND,0,0,0],
				[0,0,0,dungeonTypes.DOOR,0,0,0],
				[0,0,0,dungeonTypes.GROUND,0,0,0],
				[0,0,0,0,0,0,0]
				
	];

	
	playerPOS.x = 3;
	playerPOS.y = 5;

	return dung;
}

function createBossArray(){

	const MONSTERS = monsterTypes.MONSTERS;
	const MOB_TIER = dungeonTypes.MOB_TIER_BOSS;;

	for(let z in MONSTERS){
		if(MONSTERS[z].floor === dungeonTypes.BOSS_FLOOR && MONSTERS[z].tier === MOB_TIER){

			const MOB = MONSTERS[z];

			return [{
				name : MOB.name,
				pos : {x: dungeonTypes.BOSS_SPAWN_X, y: dungeonTypes.BOSS_SPAWN_Y},
				maxLife: (MOB.baseVitality * otherTypes.LIFE_VIT_MULTI) + dungeonTypes.BOSS_FLOOR * otherTypes.LIFE_LVL_MULTI + MOB.baseStrength * otherTypes.LIFE_STR_MULTI,
				life: (MOB.baseVitality * otherTypes.LIFE_VIT_MULTI) + dungeonTypes.BOSS_FLOOR * otherTypes.LIFE_LVL_MULTI + MOB.baseStrength * otherTypes.LIFE_STR_MULTI,
				exp : MOB.baseVitality + MOB.baseAgility + MOB.baseStrength ,
				dodge : MOB.baseAgility,
				minAttack : dungeonTypes.BOSS_FLOOR + MOB.baseStrength * otherTypes.MOB_DMG_MIN_MULTI + MOB.baseAgility,
				maxAttack : dungeonTypes.BOSS_FLOOR + MOB.baseStrength * otherTypes.MOB_DMG_MAX_MULTI + MOB.baseAgility
			}];
			
		}

	}
}