import React, { PropTypes } from 'react';

const HudAttributes = ({player}) => {
    return (
        <div id="attributeContainer">

                <div className="hudAttriButton">STR: {player.strength}</div>
                <div className="hudAttriButton">AGI: {player.agility}</div>

                <div className="hudAttriButton">VIT: {player.vitality}</div>
                <div className="hudAttriButton">INT: {player.intelligence}</div>


        </div>
    );
};

HudAttributes.propTypes = {
    player: PropTypes.object.isRequired
};

export default HudAttributes;