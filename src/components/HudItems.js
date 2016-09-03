import React, { PropTypes } from 'react';

const HudItems = ({player}) => {

    return (
        <div id="leftHudContainer">
            <section id="itemButton" className="floater">
                Items
            </section>
            <section className="goldHud">
                <img src={require('../../images/goldHud.png')} />
                <span>{player.gold}</span>
            </section>

        </div>
    );
};

HudItems.propTypes = {
    player: PropTypes.object.isRequired
};

export default HudItems;