import React, { PropTypes } from 'react';
import BigBar from './BigBar';


const HudLeft = ({player}) => {

    let lvlString = player.level;
    if(player.level<10){
        lvlString="0"+lvlString;
    }
    

    return (
        <div id="leftHudContainer">

            <div className="floater">
                <h3 id="hudLevelTextPlayer">Level {lvlString}</h3>
                <h5>Dungeon Floor {player.dungeonFloor}</h5>
                <div className="goldHud">
                    <img src={require('../../images/goldHud.png')} />
                    <span>{player.gold}</span>
                </div>
            </div>

            <div className="barContainer floater">
                <BigBar current={player.life} max={player.maxLife} barName={"life"}/>
                <BigBar current={player.mana} max={player.maxMana} barName={"mana"}/>
                <BigBar current={player.exp} max={player.expNeededToLevel} barName={"exp"}/>
            </div>



        </div>
    );
};

HudLeft.propTypes = {
    player: PropTypes.object.isRequired
};

export default HudLeft;