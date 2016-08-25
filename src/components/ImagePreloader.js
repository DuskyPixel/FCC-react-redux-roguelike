/* eslint-disable */
import React, { PropTypes } from 'react';
import * as dungeonTypes from './../constants/dungeonTypes';

const ImagePreloader = () => {
	return (
		<div id="preloadContainer">
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
			{[<img  src={require('../../images/'+dungeonTypes.STR_PLAYER_ASSASSIN+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_PLAYER_MAGE+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_PLAYER_WARRIOR+'.png')} />]}


			{[<img  src={require('../../images/'+dungeonTypes.STR_MOB_RAT+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_ALTAR+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_GOLD+'.png')} />]}
			{[<img  src={require('../../images/'+dungeonTypes.STR_ITEM+'.png')} />]}
		</div>
	);
};

export default ImagePreloader;