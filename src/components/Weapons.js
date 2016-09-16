import React, { PropTypes } from 'react';
import {getPlayerDamage} from '../utils/UtilCalculatePlayerDamage';
import getPlayerDodge from '../utils/UtilCalculatePlayerDodge';
import getPlayerLife from '../utils/UtilCalculatePlayerLife';
import getPlayerMana from '../utils/UtilCalculatePlayerMana';
import OneWeapon from '../components/OneWeapon';

const Weapons = ({player, clickEquip, clickSell, opacity}) => {

	const damage = getPlayerDamage(player);
	const dodge = getPlayerDodge(player);
	const life = getPlayerLife(player);
	const mana = getPlayerMana(player);

	let OneWeaponGroup = [];

	for(let i in player.weapons){
		OneWeaponGroup.push(<OneWeapon clickEquip={clickEquip} clickSell={clickSell} key={i} id={i} weapon={player.weapons[i]} />);
	}

	return (
		<div id="weaponContainer" className={opacity}>
			<div className="flexor">
				<div>Damage: ~{damage}</div>
				<div>Dodge: {dodge}%</div>
				<div>Life: {life}</div>
				<div>Mana: {mana}</div>
			</div>
			<div className="header">
				<span className="weaponName">Weapon Name</span>
				<span className="stat">DMG</span>
				<span className="stat">DODGE</span>
				<span className="stat">LIFE</span>
				<span className="stat">MANA</span>
				<span className="other">Equip</span>
				<span className="other">Sell</span>
			</div>

			{OneWeaponGroup}

		</div>
	);
};

Weapons.propTypes = {
	player: PropTypes.object.isRequired,
	clickEquip: PropTypes.func.isRequired,
	clickSell: PropTypes.func.isRequired, 
	opacity: PropTypes.string.isRequired
};

export default Weapons;