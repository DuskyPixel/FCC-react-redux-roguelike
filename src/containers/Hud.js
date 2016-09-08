import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import HudLeft from '../components/HudLeft';
import HudItemContainer from '../containers/HudItemContainer';
import HudAttributes from '../components/HudAttributes';
import HudRight from '../components/HudRight';


import * as hudActions from '../actions/hudActions';

import {MOBID_RAT, MOBID_TERRGOTH} from './../constants/dungeonTypes';
import * as hudTypes from './../constants/hudTypes';

import getStatGoldCost from '../utils/UtilCalculateStatUpgradeCost';

const Hud = (props) => {

	

	let monster = {};
	if(checkIsMonster( props.tileGrid[props.player.pos.y][props.player.pos.x-1] )){
		for(let i in props.monsters){
			if(props.monsters[i].pos.y === props.player.pos.y && props.monsters[i].pos.x === props.player.pos.x - 1){
				monster = props.monsters[i];
				break;
			}
		}
	}
	else if(checkIsMonster( props.tileGrid[props.player.pos.y][props.player.pos.x+1] )){
		for(let i in props.monsters){
			if(props.monsters[i].pos.y === props.player.pos.y && props.monsters[i].pos.x === props.player.pos.x + 1){
				monster = props.monsters[i];
				break;
			}
		}
	}

	function checkIsMonster(tileID){
		if(tileID >= MOBID_RAT && tileID <= MOBID_TERRGOTH){
			return true;
		}
		return false;
	}

	

	function hoverMsgDeletion(){
		
		props.actions.revertHudHoverMsg();
	}

	function getStatLevelsByString(statString){
		switch(statString){
			case hudTypes.ATTR_STR:{
				return [props.player.strength, props.hud.strengthUpgrades];
			}
			case hudTypes.ATTR_AGI:{
				return [props.player.agility, props.hud.agilityUpgrades];
			}
			case hudTypes.ATTR_VIT:{
				return [props.player.vitality, props.hud.vitalityUpgrades];
			}
			case hudTypes.ATTR_INT:{
				return [props.player.intelligence, props.hud.intelligenceUpgrades];
			}
		}
	}

	function hoverMsgCreation(statString){

		props.actions.changeHudHoverMsg(`Upgrade ${statString} by 1 for ${getStatGoldCost(getStatLevelsByString(statString)[0], getStatLevelsByString(statString)[1])} gold`);
	}

	function buyAttributeUpgrade(statString){



		let statLevel = getStatLevelsByString(statString)[0];
		let statUpgradeLevel = getStatLevelsByString(statString)[1];

		let goldCost = getStatGoldCost(statLevel, statUpgradeLevel);
		
		if(props.player.gold < goldCost){
			return;
		}

		props.actions.buyAttributeUpgrade(statString, statLevel, statUpgradeLevel);
	}

	


	return (
		<div id="hudContainer">

			<HudLeft player={props.player} />
			<HudItemContainer />
			<HudAttributes player={props.player} buyAttribute={buyAttributeUpgrade} hud={props.hud} hoverMsgCreation={hoverMsgCreation} hoverMsgDeletion={hoverMsgDeletion}/>
			<HudRight monster={monster} />
			
		</div>

	);
};

Hud.propTypes = {
	player: PropTypes.object.isRequired,
	monsters: PropTypes.array.isRequired,
	tileGrid: PropTypes.array.isRequired,
	hud: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		player: state.player,
		monsters: state.monsters,
		tileGrid: state.tileGrid,
		hud: state.hud
	};
}

function mapDispatchToProps(dispatch) {
	return {
		
		actions: bindActionCreators(hudActions, dispatch)
	};
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Hud);