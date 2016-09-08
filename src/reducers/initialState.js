export default{
	tileGrid : [
				[0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	objectGrid : [
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
	],
	hud:{
		hoverMsg: "Hover to see upgrade cost",
		displayInventory: false,
		strengthUpgrades: 1,
		agilityUpgrades: 1,
		intelligenceUpgrades: 1,
		vitalityUpgrades: 1
	},
	player: {
		pos: {x: 4, y: 5},

		class: "Stalker",
		level: 1,
		dungeonFloor: 1,
		exp: 0,
		gold: 0,

		expNeededToLevel: 25, //the amount of exp needed for next level

		maxLife: 27,
		maxMana: 17,
		life: 27,
		mana: 17,

		healthPotions : 1,
		manaPotions : 0,
		
		weapons : [
			{
				name: "Dagger",
				damage : 2,
				dodge : 0,
				life : 0,
				mana : 3,
				minFloor : 0,
				equipped: true
			}
		],

		killedMonster : false, //for regen after killing mob

		strength: 3,
		agility: 3,
		vitality: 3,
		intelligence: 3,

		attackBuff: false,
		dodgeBuff: false,
		dodgeDuration: 0
	},
	monsters: [
		{
			name : "rat",
			pos : {x: -5, y: -5},
			life : 7,
			maxLife : 7,
			exp : 4,
			minAttack : 2,
			maxAttack : 3
		}]
};