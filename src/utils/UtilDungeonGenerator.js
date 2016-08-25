/* eslint-disable */
import * as dungeonTypes from './../constants/dungeonTypes';
import getRandInt from './UtilRandInteger';
import getRandBool from './UtilRandBool';

let playerPOS;

export default function generateDungeon(minWidth, maxWidth){

	let dungeonArray = [];
	let fillCheckArray = [];
	let objectArray = [];
	let floorTileCount = 0;
	
	let height = 0;

	// ***************************** door placed outside of array... it does not get removed because of that
	// ************************** WITH LAST CHANGE THE DOOR OUTSIDE OF ARRAY NOW GETS CHANGED TO A WALL OUTSIDE OF ARRAY
	// ******* one thing from each function
	// ************** add in gold luck chance for objects
	// ************* monsters you should be weighted to spawn to left or right of doors which would mean 1 per room
	// **************** BEFORE EVERY ALTAR there should spawn a difficult monster
	// ********** near every chest should strong medium difficult monster

	while(floorTileCount < 60){
		dungeonArray = [];
		fillCheckArray = [];
		floorTileCount = 0;
		height = Math.random() < .7 ? 15 : 11;

		dungeonArray = createDungeonWallsAndFloors(dungeonArray, getRandInt(minWidth, maxWidth), height );
		dungeonArray = createDungeonRooms(dungeonArray);
		dungeonArray = expandCenterDoorFixRoomConnector(dungeonArray);

		for(let i=0;i<dungeonArray.length;i++){
			let tempArr = [];
			for(let z=0;z<dungeonArray[0].length;z++){
				let temp = dungeonArray[i][z];
				tempArr.push(temp);
			}
			fillCheckArray.push(tempArr);
		}

		floodFill(fillCheckArray, Math.floor(height/2), 1, dungeonTypes.GROUND, dungeonTypes.TEST_TILE);

		floorTileCount = countFloorTiles(fillCheckArray);

	}

	dungeonArray = removeDisconnectedTilesAndChopCenter(dungeonArray, fillCheckArray);

	console.log("------got to before objectCreation--------");

	objectArray = placeObjects(objectArray, dungeonArray);

	console.log("------got to end of dungeon generator--------");

	


	for(let i=0;i<objectArray.length;i++){
		objectArray[i].unshift(0,0,0);
		objectArray[i].push(0,0,0);
		dungeonArray[i].unshift(0,0,0);
		dungeonArray[i].push(0,0,0);
	}

	console.log("BEFORE OBJECT dungeon");
	console.log(objectArray);
	console.log(dungeonArray);
	console.log(objectArray.length+" "+objectArray[0].length);
	console.log(dungeonArray.length+" "+dungeonArray[0].length);
	
	for(let i=0;i<dungeonArray.length;i++){
		for(let q=0;q<dungeonArray[0].length;q++){
			if(objectArray[i][q]!==dungeonTypes.OBJ_EMPTY){
				
				if(objectArray[i][q]===dungeonTypes.OBJ_PLAYER){
					playerPOS = {x: q, y: i };
					console.log("player is at "+i+" "+q);
				}
				else{
					dungeonArray[i][q] = objectArray[i][q];	
				}
			}
			else if(dungeonArray[i][q]===dungeonTypes.GROUND){
				dungeonArray[i][q] = getRandGroundTile();
			}
		}
	}

	console.log("playerPOS: "+playerPOS.y+" "+playerPOS.x);

	tempTESTONLY();

	let arrayOfMonsters = createMonsterArray(dungeonArray);
    console.log("array of monsters");
    console.log(arrayOfMonsters);
    console.log(playerPOS);
	
	return {tileGrid : dungeonArray, monsterArray : arrayOfMonsters, playerPOS: playerPOS};
}

function createMonsterArray(dungeonArray){

    let monsterArray = [];

	for(let y=0;y<dungeonArray.length;y++){
		for(let x=0;x<dungeonArray[0].length;x++){
			if(dungeonArray[y][x] === dungeonTypes.OBJ_MOB ){
                monsterArray.push({
                        name : "rat",
                            pos : {x: x, y: y},
                        life : 18,
                        minAttack : 2,
                        maxAttack : 3
                })
			}
		}
	}
    return monsterArray;
}

function tempTESTONLY(){

    console.log("==============");
    let test = [
            {
                name : "rat",
                pos : {x: 3, y: 5},
                life : 7
            },
            {
                name : "zombie",
                pos : {x: 7, y: 3},
                life : 12
            },
            {
                name : "dragon",
                pos : {x: 11, y: 19},
                life : 16
            }
        ];
    console.log(test);
    console.log("------")
    let newTest = JSON.parse(JSON.stringify(test));
    console.log(newTest);
    let foundPOS = -1;
    for(let i in newTest){
        if(newTest[i].pos.x === 7 && newTest[i].pos.y===3){
            foundPOS=i;
            console.log("found "+newTest[i].name);
            break;
        }
    }
    console.log("------")
    console.log("FP: "+foundPOS);
    if(foundPOS>-1){
        newTest.splice(foundPOS,1);
    }
    console.log(newTest);
    console.log("==============");
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

function countFloorTiles(arr){
	let count = 0;
	for(let i=0;i<arr.length;i++){
		for(let q=0;q<arr[0].length;q++){
			if(arr[i][q]===dungeonTypes.TEST_TILE){
				count+=1;
			}
		}
	}
	return count;
}

function createDungeonWallsAndFloors(arr, width, height){

	let tempArr = [];

	for(let i=0;i<height;i++){
		for(let q=0;q<width;q++){

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


	for(let i=1;i<arr.length;i+=2){
		currentStartEndPositions = getRandInt(1,6);
		for(let q=1;q<arr[i].length-1;q++){

			//only place room on non room tiles while making sure they are not up against each other
			if(arr[i][q] === dungeonTypes.WALL && arr[i][q-1] !== dungeonTypes.GROUND && q>=currentStartEndPositions && q<=arr[i].length- currentStartEndPositions){
				//place room
				for(let z=q;z<roomSize+q;z++){
					if(z<=arr[i].length-2){
						arr[i][z] = dungeonTypes.GROUND;
					}
					
				}
				//place door
				if(i+1 < arr.length-1 && q + Math.floor(roomSize/2) < arr[i].length - 1){
					arr[i+1][q+Math.floor(roomSize/2)-getRandInt(Math.floor(roomSize/4), -Math.floor(roomSize/4))] = dungeonTypes.DOOR;
				}
				roomSize = getRandInt(7,13);
			}
			
		}
		
	}



	return arr;
}

function expandCenterDoorFixRoomConnector(arr){
	
	//fill center with floor tiles to make connecting easier
	for(let i=1;i<arr[0].length-1;i++){
		arr[Math.floor(arr.length/2)][i] = dungeonTypes.GROUND;
	}

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


								//1		3
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

function removeDisconnectedTilesAndChopCenter(realArray, floodFillArray){

	

	//remove disconnected tiles
	for(let i=0;i<realArray.length;i++){
		for(let q=0;q<realArray[i].length;q++){

			if(floodFillArray[i][q]!==dungeonTypes.TEST_TILE){
				realArray[i][q]=dungeonTypes.WALL;
			}
		}
	}

	const CENTER = Math.floor(realArray.length/2);
	let finished = false;
	let pos = 1;
	let chopMax = getRandInt(2,7);

	//chop left center
	while(finished===false && chopMax > pos){
		if(realArray[CENTER][pos]===dungeonTypes.GROUND && realArray[CENTER-1][pos]===dungeonTypes.WALL && realArray[CENTER+1][pos]===dungeonTypes.WALL){
			realArray[CENTER][pos]=dungeonTypes.WALL;
			pos+=1;
		}
		else{
			finished=true;
		}
		
	}
	

	finished = false;
	pos = realArray[0].length - 2;
	chopMax = getRandInt(2,7);
	//chop right center
	while(finished===false && chopMax < pos){
		if(realArray[CENTER][pos]===dungeonTypes.GROUND && realArray[CENTER-1][pos]===dungeonTypes.WALL && realArray[CENTER+1][pos]===dungeonTypes.WALL){
			realArray[CENTER][pos]=dungeonTypes.WALL;
			pos-=1;
		}
		else{
			finished=true;
		}
		
	}

	return realArray;
}

function placeObjects(objs, dung){
	//nothing can above or below doors
	//player spawns at dead end
	//monsters can not spawn in dead ends
	//altars randomly placed
	//equip spawn have higher chance of spawning at dead ends
	//gold can spawn anywhere that does not already have something there so it spawns last, luck increases gold chance


	let playerFound = false;
	let randX;
	let randY;
	playerPOS = {};

	console.log("BEFORE PLAYER");

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

	console.log("AFTER PLAYER")
	for(let i=0;i<dung.length;i++){
		let temp = [];
		for(let q=0;q<dung[i].length;q++){
			temp.push(dungeonTypes.OBJ_EMPTY);
		}
		objs.push(temp);
	}

	console.log("AFTER OBJS CREATIOn");

	for(let i=1;i<dung.length;i+=2){
		for(let q=0;q<dung[i].length;q++){
			
			if(randY === i && randX ===q){
				console.log("player call start");
				objs[randY][randX] = dungeonTypes.OBJ_PLAYER;
				console.log("player call end");
			}
			else{
				
				
				//items, altars
				if(checkDeadEndTile(q,i,dung)){
					//chance of something spawning in dead end
					if(getRandBool(25)){
						if(getRandBool(75)){
							objs[i][q] = dungeonTypes.OBJ_ALTAR;
						}
						else{
							objs[i][q] = dungeonTypes.OBJ_ITEM;
						}
					}
				}
				else if(notBelowOrAboveDoor(q,i,dung)){
					//chance of something spawning not below or above door
					if(getRandBool(13)){
						if(getRandBool(65) && !checkDeadEndTile(q,i,dung)){
							objs[i][q] = dungeonTypes.OBJ_MOB;
						}
						else{
							objs[i][q] = dungeonTypes.OBJ_GOLD;
						}
					}
				}
				else{
					objs[i][q] = dungeonTypes.OBJ_EMPTY;
				}
			}
		}
	}

	return objs
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