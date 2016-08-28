/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from '../actions/mapActions';

import Hud from '../containers/Hud';
import Game from '../containers/Game';
import ImagePreloader from '../components/ImagePreloader';


class App extends Component {

	//preload all tile assets?

	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.props.actions.generateMap(1); //dungeon floor level 1 at start
		
	}

	render() {
		return (
			<div>
				<ImagePreloader />
				<Hud />
				<Game />
			</div>
		);
	}
}

App.propTypes = {
	actions: PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch) {
	return {
		
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default App = connect(
	null,
	mapDispatchToProps
)(App);