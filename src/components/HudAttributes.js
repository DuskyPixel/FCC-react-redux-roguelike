import React, { PropTypes } from 'react';

const HudAttributes = ({player, hud, hoverMsgCreation, hoverMsgDeletion, buyAttribute}) => {


    return (
        <div id="attributeContainer">
            <div className="flexContainer">
                <div className="hudAttriButton" onClick={()=>buyAttribute("STR")} onMouseOut={hoverMsgDeletion} onMouseOver={()=>hoverMsgCreation("STR")} >STR: {player.strength}</div>
                <div className="hudAttriButton" onClick={()=>buyAttribute("AGI")} onMouseOut={hoverMsgDeletion} onMouseOver={()=>hoverMsgCreation("AGI")} >AGI: {player.agility}</div>

                <div className="hudAttriButton" onClick={()=>buyAttribute("VIT")} onMouseOut={hoverMsgDeletion} onMouseOver={()=>hoverMsgCreation("VIT")} >VIT: {player.vitality}</div>
                <div className="hudAttriButton" onClick={()=>buyAttribute("INT")} onMouseOut={hoverMsgDeletion} onMouseOver={()=>hoverMsgCreation("INT")} >INT: {player.intelligence}</div>
            </div>

            <h6 className="attriUpgradeCost">{hud.hoverMsg}</h6>

        </div>
    );
};

HudAttributes.propTypes = {
    player: PropTypes.object.isRequired,
    hud: PropTypes.object.isRequired,
    hoverMsgCreation: PropTypes.func.isRequired,
    hoverMsgDeletion: PropTypes.func.isRequired, 
    buyAttribute: PropTypes.func.isRequired
};

export default HudAttributes;