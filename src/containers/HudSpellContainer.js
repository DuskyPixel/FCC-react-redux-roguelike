import React, { PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as hudActions from '../actions/hudActions';

import * as spellTypes from './../constants/spellTypes';

const HudSpellContainer = (props) => {

    function clickedSpell(spell){

        let manaCost = 0;

        switch(spell){
            case spellTypes.SPELL_ATTACK:{
                manaCost = spellTypes.MANA_SPELL_COST_ATTACK;

            }break;

            case spellTypes.SPELL_HEAL:{
                manaCost = spellTypes.MANA_SPELL_COST_HEAL;

            }break;

            case spellTypes.SPELL_DODGE:{
                manaCost = spellTypes.MANA_SPELL_COST_DODGE;

            }break;
        }

        if(props.player.mana >= manaCost){
            props.actions.castSpell(props.player, spell, manaCost);
        }



    }

    let attackOpacityClass = props.player.attackBuff === true ? "spellOn" : "";
    let dodgeOpacityClass = props.player.dodgeBuff === true ? "spellOn" : "";

    return (
        <div id="spellContainer">
            <img className={attackOpacityClass} onClick={()=>clickedSpell(spellTypes.SPELL_ATTACK)} src={require('../../images/spells/'+spellTypes.SPELL_ATTACK+'.png')} />
            <img onClick={()=>clickedSpell(spellTypes.SPELL_HEAL)} src={require('../../images/spells/'+spellTypes.SPELL_HEAL+'.png')} />
            <img className={dodgeOpacityClass} onClick={()=>clickedSpell(spellTypes.SPELL_DODGE)} src={require('../../images/spells/'+spellTypes.SPELL_DODGE+'.png')} />

        </div>
    );
};

HudSpellContainer.propTypes = {
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
        
        actions: bindActionCreators(hudActions, dispatch)
    };
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HudSpellContainer);