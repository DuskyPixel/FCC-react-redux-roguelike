import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Tile from '../components/Tile';

import * as dungeonTypes from './../constants/dungeonTypes';
import * as mapActions from '../actions/mapActions';
import * as playerActions from '../actions/playerActions';



class TileMapContainer extends Component {



	constructor(props){
		super(props);
		this.tiles = [];
		this.tiles2 = [];
		this.tiles3 = [];
		
	}

	componentWillUpdate(nextProps) {
		

		let playerPOSGridID = nextProps.tileGrid[nextProps.player.pos.y][nextProps.player.pos.x];
		let CENTER_POS = 3;

		this.tiles = [];

		function getTileType(){
			let newTileID;
			switch(playerPOSGridID){
				case dungeonTypes.DOOR: newTileID = dungeonTypes.OPEN_DOOR; break;
			}

			return newTileID!==undefined ? newTileID : playerPOSGridID;
		}

		for (let z = 0; z < 7 ; z++) {

			this.tiles.push(<Tile key={(z+100)} tileType={
				nextProps.tileGrid[nextProps.player.pos.y-1][nextProps.player.pos.x - 3 + z]} />);
		}


		this.tiles2 = [];
		for (let z = 0; z < 7 ; z++) {
			if(z===CENTER_POS){
				//this.tiles2.push(<Tile key={(z+200)} tileType={OPEN_DOOR} />);

				this.tiles2.push(<Tile key={(z+200)} tileType={getTileType()} />);
			}
			else{
				this.tiles2.push(<Tile key={(z+200)} tileType={
					nextProps.tileGrid[nextProps.player.pos.y][nextProps.player.pos.x - 3 + z]} />);
			}
		}


		this.tiles3 = [];
		for (let z = 0; z < 7 ; z++) {

			this.tiles3.push(<Tile key={(z+300)} tileType={
				nextProps.tileGrid[nextProps.player.pos.y+1][nextProps.player.pos.x - 3 + z]} />);
		}



	}

	

	//remove tiles2, tiles3 stuff
	render() {
		return (
			<div id="tilemap" >
				<table>
					<tbody>
						<tr >
						{this.tiles}
						</tr>
						<tr >
						{this.tiles2}
						</tr>
						<tr >
						{this.tiles3}
						</tr>
					</tbody>
				</table>

			</div>
		);
	}
}

TileMapContainer.propTypes = {
	tileGrid: PropTypes.array.isRequired,
	player: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        tileGrid: state.tileGrid,
        player: state.player
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
)(TileMapContainer);