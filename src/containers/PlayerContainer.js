import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PlayerDisplay from '../components/PlayerDisplay';

import * as keyTypes from './../constants/keyTypes';

import * as dungeonTypes from './../constants/dungeonTypes';
import * as playerActions from '../actions/playerActions';
import {PLAYER_ATTACKS_MOB} from './../constants/actionTypes';

import {moveYEffect, moveXEffect} from "../utils/UtilMovementEffects";


class PlayerContainer extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount() {

		window.addEventListener("keyup", this.movePlayer.bind(this));
	}

	componentWillUpdate(nextProps) {

		if(nextProps.tileGrid[nextProps.player.pos.y][nextProps.player.pos.x] === dungeonTypes.OBJ_GOLD){
			this.props.actions.touchedGold(nextProps.player.pos.x, 
											nextProps.player.pos.y, 
											nextProps.player.level,
											nextProps.player.dungeonFloor); 
		}
		else if(nextProps.tileGrid[nextProps.player.pos.y][nextProps.player.pos.x] === dungeonTypes.OBJ_ALTAR){
			this.props.actions.touchedAltar(nextProps.player.pos.x, 
											nextProps.player.pos.y); 
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
		let playerTileID = this.props.tileGrid[this.props.player.pos.y][this.props.player.pos.x];
		let playerY = this.props.player.pos.y;
		let playerX = this.props.player.pos.x;

		let actionChecker = "";
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

				if(this.props.tileGrid[playerY + moveDirection][playerX] === dungeonTypes.WALL){
					return;
				}
				else if(this.props.tileGrid[playerY + moveDirection][playerX] === dungeonTypes.DOOR){
					this.props.actions.moveY(moveDirection, true);
				}
				else{
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

				actionChecker = moveXEffect(playerTileID, this.props.tileGrid[playerY][playerX + moveDirection]);

				if(actionChecker === false){

					return;
				}
				else if(actionChecker === PLAYER_ATTACKS_MOB){
					this.props.actions.playerAttack(this.props.player, playerX + moveDirection, this.props.monsters);
					return;
				}

				this.props.actions.moveX(moveDirection);

				break;
			}

		}

		//upgrade object grid array

		this.props.actions.updateStats();
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
		
		actions: bindActionCreators(playerActions, dispatch)
	};
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(PlayerContainer);