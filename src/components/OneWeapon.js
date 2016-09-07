import React, { PropTypes } from 'react';

const Weapons = ({weapon, id, clickEquip, clickSell}) => {

	let classString = "weapon";
	let equipString = "Equip";
	if(weapon.equipped === true){
		classString += " equipped";
		equipString = "Unequip";
	}

	let newWeaponName = weapon.name;

	newWeaponName = newWeaponName.substr(0, newWeaponName.indexOf('_')) + ' ' + newWeaponName.substr(newWeaponName.indexOf('_') + 1);



	return (
		<div className={classString}>
			<span className="weaponName">{newWeaponName} <img src={require('../../images/items/'+weapon.name+'.png')} /> </span>
			<span className="stat">{weapon.damage}</span>
			<span className="stat">{weapon.dodge}</span>
			<span className="stat">{weapon.life}</span>
			<span className="stat">{weapon.mana}</span>
			<span className="other" onClick={()=>clickEquip(id)} >{equipString}</span>
			<span className="other" onClick={()=>clickSell(id)} >Sell</span>
		</div>
	);
};

Weapons.propTypes = {
	weapon: PropTypes.object.isRequired,
	clickEquip: PropTypes.func.isRequired,
	clickSell: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired
};

export default Weapons;