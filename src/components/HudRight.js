import React, { PropTypes } from 'react';
import BigBar from './BigBar';


const HudRight = ({monster}) => {

    let life = 1;
    let maxLife = 1;
    let imageName = "empty";
    let exp = 0;
    let dodge = 0;
    let avgDmg = 0;

    if(Object.keys(monster).length !== 0){
        life = monster.life;
        maxLife = monster.maxLife;
        imageName = monster.name;
        exp = monster.exp;
        dodge = monster.dodge;
        avgDmg = Math.ceil((monster.minAttack + monster.maxAttack) / 2);

    }



    return (
        <div id="rightHudContainer">

            <div className="flexContainer">
                <div className="mobSprite"><img src={require('../../images/'+imageName+'.png')} /></div>

                <h3 id={imageName === "empty" ? "emptyMonsterName" : "fullMonsterName"}>{imageName}</h3>

            </div>

            <div className="flexContainer">
                <h6>EXP : {exp} </h6>
                <h6>Dodge: {dodge}%</h6>
                <h6>~Dmg: {avgDmg}</h6>
            </div>

            <div className="mobBarContainer" >
                <BigBar current={life} max={maxLife} barName={"life"}/>
            </div>

            
        </div>
    );
};

HudRight.propTypes = {
    monster: PropTypes.object
};

export default HudRight;