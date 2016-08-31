import React, { PropTypes } from 'react';

const HudAttributes = ({player, hud, hoverMsgCreation, hoverMsgDeletion}) => {

	function hoverAttribute(str, stat){
        console.log("hudattr function");
		hoverMsgCreation(str,stat);

	}

    function reverMessage(){
        hoverMsgDeletion();
    }

    return (
        <div id="attributeContainer">
            <div className="flexContainer">
                <div className="hudAttriButton" onMouseOut={reverMessage} onMouseOver={()=>hoverAttribute("STR", player.strength)} >STR: {player.strength}</div>
                <div className="hudAttriButton" onMouseOut={reverMessage} onMouseOver={()=>hoverAttribute("AGI", player.agility)} >AGI: {player.agility}</div>

                <div className="hudAttriButton" onMouseOut={reverMessage} onMouseOver={()=>hoverAttribute("VIT", player.vitality)} >VIT: {player.vitality}</div>
                <div className="hudAttriButton" onMouseOut={reverMessage} onMouseOver={()=>hoverAttribute("INT", player.intelligence)} >INT: {player.intelligence}</div>
            </div>

            <h6 className="attriUpgradeCost">{hud.hoverMsg}</h6>

        </div>
    );
};

HudAttributes.propTypes = {
    player: PropTypes.object.isRequired,
    hud: PropTypes.object.isRequired,
    hoverMsgCreation: PropTypes.func.isRequired,
    hoverMsgDeletion: PropTypes.func.isRequired
};

export default HudAttributes;