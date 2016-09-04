import React, { PropTypes } from 'react';
import Weapons from '../components/Weapons';

const HudItems = ({player, clickHealthPotion, clickManaPotion}) => {

    return (
        <div id="itemHudContainer">
            <div className="floater">
                <div className="itemButton">
                    Items
                </div>
                <Weapons player={player} />
            </div>

            <div className="potions">
                <img onClick={clickHealthPotion} src={require('../../images/items/Health_Potion.png')} />
                x {player.healthPotions}
            </div>

            <div className="potions">
                <img onClick={clickManaPotion} src={require('../../images/items/Mana_Potion.png')} />
                x {player.manaPotions}
            </div>
        </div>
    );
};

HudItems.propTypes = {
    player: PropTypes.object.isRequired,
    clickHealthPotion: PropTypes.func.isRequired,
    clickManaPotion: PropTypes.func.isRequired
};

export default HudItems;