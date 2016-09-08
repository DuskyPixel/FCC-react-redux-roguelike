import React, { PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as playerActions from '../actions/playerActions';
import * as hudActions from '../actions/hudActions';
import * as weaponActions from '../actions/weaponActions';

import Weapons from '../components/Weapons';

const HudItemContainer = (props) => {

    function clickHealthPotion(){
        props.actions.useHealthPotion(props.player);
    }
    
    function clickManaPotion(){
        props.actions.useManaPotion(props.player);
    }

    function clickEquip(id){

        props.actions.equipWeapon(props.player.weapons, id);
    }

    function clickSell(id){
        props.actions.sellWeapon(props.player.weapons, id);
    }

    function toggleInventory(){
        props.actions.toggleInventory();
    }

    return (
        <div id="itemHudContainer">
            <div className="floater">
                <div className="itemButton" onClick={toggleInventory}>
                    Items
                </div>
                {props.hud.displayInventory ? <Weapons player={props.player} clickEquip={clickEquip} clickSell={clickSell} /> : null}
                
            </div>

            <div className="potions">
                <img onClick={clickHealthPotion} src={require('../../images/items/Health_Potion.png')} />
                x {props.player.healthPotions}
            </div>

            <div className="potions">
                <img onClick={clickManaPotion} src={require('../../images/items/Mana_Potion.png')} />
                x {props.player.manaPotions}
            </div>
        </div>
    );
};

HudItemContainer.propTypes = {
    player: PropTypes.object.isRequired,
    hud: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired

};

function mapStateToProps(state) {
    return {
        player: state.player,
        hud: state.hud
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
        actions: bindActionCreators(Object.assign({}, playerActions, hudActions, weaponActions), dispatch)
    };
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HudItemContainer);