import React, { PropTypes } from 'react';

const HudItems = ({player}) => {

    return (
        <div id="itemHudContainer">
            <div className="itemButton floater">
                Items
            </div>
            <div className="goldHud">
                <img src={require('../../images/goldHud.png')} />
                <span>{player.gold}</span>
            </div>
  

        </div>
    );
};

HudItems.propTypes = {
    player: PropTypes.object.isRequired
};

export default HudItems;