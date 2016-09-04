import React, { PropTypes } from 'react';
import getPlayerDamage from '../utils/UtilCalculatePlayerDamage';
import getPlayerDodge from '../utils/UtilCalculatePlayerDodge';
import getPlayerLife from '../utils/UtilCalculatePlayerLife';
import getPlayerMana from '../utils/UtilCalculatePlayerMana';

const Weapons = ({player}) => {

	const damage = getPlayerDamage(player);
	const dodge = getPlayerDodge(player);
	const life = getPlayerLife(player);
	const mana = getPlayerMana(player);

	return (
		<div id="weaponContainer">
			<div>Damage: ~{damage}</div>
			<div>Dodge: {dodge}%</div>
			<div>Life: {life}</div>
			<div>Mana: {mana}</div>
			
		</div>
	);
};

Weapons.propTypes = {
	player: PropTypes.object.isRequired
};

export default Weapons;