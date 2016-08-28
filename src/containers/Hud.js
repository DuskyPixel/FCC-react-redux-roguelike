import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import HudAttributes from '../components/HudAttributes';
import HudLeft from '../components/HudLeft';
import HudRight from '../components/HudRight';

import {MOBID_RAT, MOBID_TERRGOTH} from './../constants/dungeonTypes';

function checkIsMonster(tileID){
	if(tileID >= MOBID_RAT && tileID <= MOBID_TERRGOTH){
		return true;
	}
	return false;
}

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


	return (
		<div id="hudContainer">

			<HudLeft player={props.player} />
			<HudAttributes player={props.player} />
			<HudRight monster={monster} />

		</div>

	);
};

Hud.propTypes = {
	player: PropTypes.object.isRequired,
	monsters: PropTypes.array.isRequired,
	tileGrid: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		player: state.player,
		monsters: state.monsters,
		tileGrid: state.tileGrid
	};
}

export default connect(
	mapStateToProps
)(Hud);