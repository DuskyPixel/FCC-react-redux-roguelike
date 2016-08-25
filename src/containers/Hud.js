import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import HudAttributes from '../components/HudAttributes';
import HudLeft from '../components/HudLeft';
import HudRight from '../components/HudRight';


const Hud = (props) => {

	return (
		<div id="hudContainer">

			<HudLeft player={props.player} />
			<HudAttributes player={props.player} />
			<HudRight player={props.player} />

		</div>

	);
};

Hud.propTypes = {
	player: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		player: state.player
	};
}

export default connect(
	mapStateToProps
)(Hud);