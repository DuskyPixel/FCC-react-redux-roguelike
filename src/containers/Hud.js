import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import HudAttributes from '../components/HudAttributes';
import HudLeft from '../components/HudLeft';
import HudRight from '../components/HudRight';

import * as hudActions from '../actions/hudActions';

import {MOBID_RAT, MOBID_TERRGOTH} from './../constants/dungeonTypes';
import * as hudTypes from './../constants/hudTypes';



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

	function hoverMsgCreation(statString, statAmount){


		props.actions.changeHudHoverMsg(`Upgrade ${statString} by 1 for ${statAmount * hudTypes.ATTRIBUTE_UPGRADE_COST} gold`);
	}

	function hoverMsgDeletion(){
		
		props.actions.revertHudHoverMsg();
	}

	function buyAttributeUpgrade(attrString){

		let goldCost = 0;

		switch(attrString){
			case hudTypes.ATTR_STR:{
				goldCost = props.player.strength * hudTypes.ATTRIBUTE_UPGRADE_COST;break;
			}
			case hudTypes.ATTR_AGI:{
				goldCost = props.player.agility * hudTypes.ATTRIBUTE_UPGRADE_COST;break;
			}
			case hudTypes.ATTR_VIT:{
				goldCost = props.player.vitality * hudTypes.ATTRIBUTE_UPGRADE_COST;break;
			}
			case hudTypes.ATTR_INT:{
				goldCost = props.player.intelligence * hudTypes.ATTRIBUTE_UPGRADE_COST;break;
			}
		}

		
		if(props.player.gold < goldCost){
			return;
		}

		props.actions.buyAttributeUpgrade(attrString, goldCost);
	}


	return (
		<div id="hudContainer">

			<HudLeft player={props.player} />
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