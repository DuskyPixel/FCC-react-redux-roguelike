import React, { PropTypes } from 'react';
import BigBar from './BigBar';


const HudLeft = ({player}) => {

    let lvlString = player.level;
    if(player.level<10){
        lvlString="0"+lvlString;
    }
    

    return (
        <div id="leftHudContainer">

            <section className="floater">
                <h3 id="hudLevelTextPlayer">Level {lvlString}</h3>
                <div className="outline"><img src={require('../../images/player.png')} /></div>
            </section>

            <section className="barContainer floater">
                <BigBar current={player.life} max={player.maxLife} barName={"life"}/>
                <BigBar current={player.mana} max={player.maxMana} barName={"mana"}/>
                <BigBar current={player.exp} max={player.expNeededToLevel} barName={"exp"}/>
            </section>

        </div>
    );
};

HudLeft.propTypes = {
    player: PropTypes.object.isRequired
};

export default HudLeft;