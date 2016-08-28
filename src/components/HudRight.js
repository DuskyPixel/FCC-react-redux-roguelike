import React, { PropTypes } from 'react';
import BigBar from './BigBar';


const HudRight = ({monster}) => {

    let life = 1;
    let maxLife = 1;
    let imageName = "empty";
    let exp = 0;
    let minAtk = 0;
    let maxAtk = 0;

    if(Object.keys(monster).length !== 0){
        life = monster.life;
        maxLife = monster.maxLife;
        imageName = monster.name;
        exp = monster.exp;
        minAtk = monster.minAttack;
        maxAtk = monster.maxAttack;
    }

    return (
        <div id="rightHudContainer">

            
            <h3 id={imageName === "empty" ? "emptyMonsterName" : "fullMonsterName"}>{imageName}</h3>
            <section id="barContainer" className="floater">
                <BigBar current={life} max={maxLife} barName={"life"}/>

            </section>

            <section className="floater">
                <div className="outline"><img src={require('../../images/'+imageName+'.png')} /></div>
            </section>

            <section className = "monsterStats">
                <h6>EXP : {exp} </h6>
                <h6>Min. Dmg: {minAtk}</h6>
                <h6>Max. Dmg: {maxAtk}</h6>
            </section>
        </div>
    );
};

HudRight.propTypes = {
    monster: PropTypes.object
};

export default HudRight;