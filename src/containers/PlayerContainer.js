import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PlayerDisplay from '../components/PlayerDisplay';

import * as keyTypes from './../constants/keyTypes';

import * as dungeonTypes from './../constants/dungeonTypes';
import * as playerActions from '../actions/playerActions';
import * as mapActions from '../actions/mapActions';



class PlayerContainer extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount() {

		window.addEventListener("keyup", this.movePlayer.bind(this));
	}

	componentWillUpdate(nextProps) {

		const PLAYER_POS_TILE_ID = nextProps.tileGrid[nextProps.player.pos.y][nextProps.player.pos.x];
		if(PLAYER_POS_TILE_ID === dungeonTypes.OBJ_GOLD){
			this.props.actions.touchedGold(nextProps.player.pos.x, 
											nextProps.player.pos.y, 
											nextProps.player.level,
											nextProps.player.dungeonFloor); 
		}
		else if(PLAYER_POS_TILE_ID === dungeonTypes.OBJ_ALTAR){
			this.props.actions.touchedAltar(nextProps.player.pos.x, 
											nextProps.player.pos.y); 
		}
		else if(PLAYER_POS_TILE_ID === dungeonTypes.STAIRS){

			this.props.actions.generateMap(nextProps.player.dungeonFloor + 1);
		}

		if(nextProps.player.exp >= nextProps.player.expNeededToLevel){
			this.props.actions.playerLevelUp();
		}
		//dont need to check heal if you level up
		else if(nextProps.player.killedMonster === true){
			this.props.actions.playerRegen(nextProps.player);
		}

		//check if player is dead then dispatch game over

		

	}

	movePlayer(e){
		e.preventDefault();
		e.stopPropagation();

		let key = e.keyCode ? e.keyCode : e.which;

		let playerY = this.props.player.pos.y;
		let playerX = this.props.player.pos.x;

		let tileID = 0;

		let moveDirection = 0;

		switch(key)
		{
			// eslint-disable-next-line
			case keyTypes.KEY_UP:{}
			// eslint-disable-next-line
			case keyTypes.KEY_W: {
				moveDirection = -1;
			}
			// eslint-disable-next-line
			case keyTypes.KEY_DOWN:{}
			// eslint-disable-next-line
			case keyTypes.KEY_S: {
				moveDirection = moveDirection < 0 ? -1 : 1;

				tileID = this.props.tileGrid[playerY + moveDirection][playerX];

				if(tileID === dungeonTypes.WALL){
					return;
				}
				else if(tileID === dungeonTypes.DOOR){
					this.props.actions.moveY(moveDirection, true);
				}
				else{
					//door is already opened so do not play sound
					this.props.actions.moveY(moveDirection, false);
				}

				break;
			}
			// eslint-disable-next-line
			case keyTypes.KEY_LEFT:{}
			// eslint-disable-next-line
			case keyTypes.KEY_A: {
				moveDirection = -1;
			}
			// eslint-disable-next-line
			case keyTypes.KEY_RIGHT:{}
			// eslint-disable-next-line
			case keyTypes.KEY_D: {
				moveDirection = moveDirection < 0 ? -1 : 1;

				tileID = this.props.tileGrid[playerY][playerX + moveDirection];

				if(tileID === dungeonTypes.WALL){
					return false;
				}
				else if(tileID >= dungeonTypes.MOBID_RAT && tileID <= dungeonTypes.MOBID_TERRGOTH){
					this.props.actions.playerAttack(this.props.player, playerX + moveDirection, this.props.monsters);
					return;
				}
				this.props.actions.moveX(moveDirection);

				break;
			}

		}

		//upgrade object grid array

		this.props.actions.updateStats(this.props.player);
	}


	

	render() {
		return (
			<PlayerDisplay />
		);
	}
}

PlayerContainer.propTypes = {
	tileGrid: PropTypes.array.isRequired,
	player: PropTypes.object.isRequired,
	monsters: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		tileGrid: state.tileGrid,
		player: state.player,
		monsters: state.monsters
	};
}

function mapDispatchToProps(dispatch) {
	return {
		
		actions: bindActionCreators(Object.assign({}, playerActions, mapActions), dispatch)
	};
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(PlayerContainer);