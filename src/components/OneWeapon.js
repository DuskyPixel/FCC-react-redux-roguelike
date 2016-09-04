import React, { PropTypes } from 'react';

const Weapons = ({weapon}) => {

	let classString = "weapon";
	let equipString = "Equip";
	if(weapon.equipped === true){
		classString += " equipped";
		equipString = "Unequip";
	}

	return (
		<div className={classString}>
			<span className="weaponName">{weapon.name} <img src={require('../../images/items/'+weapon.name+'.png')} /> </span>
			<span className="stat">{weapon.damage}</span>
			<span className="stat">{weapon.dodge}</span>
			<span className="stat">{weapon.life}</span>
			<span className="stat">{weapon.mana}</span>
			<span className="other">{equipString}</span>
			<span className="other">Sell</span>
		</div>
	);
};

Weapons.propTypes = {
	weapon: PropTypes.object.isRequired
};

export default Weapons;