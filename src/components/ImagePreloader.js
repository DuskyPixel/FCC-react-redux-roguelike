/* eslint-disable */
import React, { PropTypes } from 'react';
import * as dungeonTypes from './../constants/dungeonTypes';

const ImagePreloader = () => {
	return (
		<div id="preloadContainer">

			weapons
			{[<img  src={require('../../images/items/Axe.png')} />]}
			{[<img  src={require('../../images/items/Battle_Axe.png')} />]}
			{[<img  src={require('../../images/items/Club.png')} />]}
			{[<img  src={require('../../images/items/Dagger.png')} />]}
			{[<img  src={require('../../images/items/Glaive.png')} />]}
			{[<img  src={require('../../images/items/Health_Potion.png')} />]}
			{[<img  src={require('../../images/items/Katana.png')} />]}
			{[<img  src={require('../../images/items/Knife.png')} />]}
			{[<img  src={require('../../images/items/Long_Sword.png')} />]}
			{[<img  src={require('../../images/items/Sceptre.png')} />]}
			{[<img  src={require('../../images/items/Spiked_Club.png')} />]}
			{[<img  src={require('../../images/items/Staff.png')} />]}


			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_RAT+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_GOBLIN+'.png')} />]}

			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_SLIME+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_GHOUL+'.png')} />]}

			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_TROLL+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_OGRE+'.png')} />]}

			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_SOULTAKER+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_GOLEM+'.png')} />]}

			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_WYVERN+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_DRAGON+'.png')} />]}

			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_TERRGOTH+'.png')} />]}




			{[<img  src={require('../../images/gold.png')} />]}
			{[<img  src={require('../../images/goldHud.png')} />]}


			{[<img  src={require('../../images/'+dungeonTypes.STR_WALL+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_GROUND_1+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_GROUND_2+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_GROUND_3+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_GROUND_4+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_GROUND_5+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_DOOR+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_OPEN_DOOR+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_EMPTY+'.png')} />]}

			{[<img  src={require('../../images/'+dungeonTypes.STR_PLAYER+'.png')} />]}


			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_RAT+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_ALTAR+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_ITEM+'.png')} />]}


		</div>
	);
};

export default ImagePreloader;