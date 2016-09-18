import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as hudActions from '../actions/hudActions';

import * as spellTypes from './../constants/spellTypes';

import getHealPercent from '../utils/UtilCalculatePlayerHeal';

class HudSpellContainer extends Component {

    constructor(props){

        super(props);
        this.state = {spellDescription: "heyzzz"};
        this.attackOpacityClass = props.player.attackBuff === true ? "spellOn" : "";
        this.dodgeOpacityClass = props.player.dodgeBuff === true ? "spellOn" : "";
        this.clickedSpell = this.clickedSpell.bind(this);
        this.hoverSpell = this.hoverSpell.bind(this);
    }

    clickedSpell(spell){

        let manaCost = 0;

        switch(spell){
            case spellTypes.SPELL_ATTACK:{
                if(this.props.player.attackBuff){
                    return;
                }

                manaCost = spellTypes.MANA_SPELL_COST_ATTACK;

            }break;

            case spellTypes.SPELL_HEAL:{
                if(this.props.player.life === this.props.player.maxLife){
                    return;
                }
                manaCost = spellTypes.MANA_SPELL_COST_HEAL;

            }break;

            case spellTypes.SPELL_DODGE:{
                if(this.props.player.dodgeBuff){
                    return;
                }
                manaCost = spellTypes.MANA_SPELL_COST_DODGE;

            }break;
        }

        if(this.props.player.mana >= manaCost){
            this.props.actions.castSpell(this.props.player, spell, manaCost);
        }



    }

    hoverSpell(spell){
        switch(spell){
            case spellTypes.SPELL_ATTACK:{
                this.setState({spellDescription : "Increases damage by "+(spellTypes.ATTACK_BUFF_INCREASE * 100)+"% ["+spellTypes.MANA_SPELL_COST_ATTACK+" mana]"});
                break;
            }

            case spellTypes.SPELL_HEAL:{
                this.setState({spellDescription : "Heals player for ~"+getHealPercent(this.props.player.intelligence, true)+" hp ["+spellTypes.MANA_SPELL_COST_HEAL+" mana]"});
                break;
            }

            case spellTypes.SPELL_DODGE:{
                this.setState({spellDescription : "Increases dodge by "+spellTypes.DODGE_BUFF_INCREASE+"% for "+spellTypes.DODGE_BUFF_DURATION+" turns. ["+spellTypes.MANA_SPELL_COST_DODGE+" mana]"});
                break;
            }

            default:{
                this.setState({spellDescription : ""});
                break;
            }
        }
    }


    render() {
        return (
            <div id="spellContainer">
                <img    classNameObject={this.attackOpacityClass} 
                        onClick={()=>this.clickedSpell(spellTypes.SPELL_ATTACK)} 
                        onMouseOver={()=>this.hoverSpell(spellTypes.SPELL_ATTACK)}
                        onMouseOut={()=>this.hoverSpell("")}
                        src={require('../../images/spells/'+spellTypes.SPELL_ATTACK+'.png')} />

                <img    classNameObject={{}} 
                        onClick={()=>this.clickedSpell(spellTypes.SPELL_HEAL)} 
                        onMouseOver={()=>this.hoverSpell(spellTypes.SPELL_HEAL)}
                        onMouseOut={()=>this.hoverSpell("")}
                        src={require('../../images/spells/'+spellTypes.SPELL_HEAL+'.png')} />

                <img    classNameObject={this.dodgeOpacityClass} 
                        onClick={()=>this.clickedSpell(spellTypes.SPELL_DODGE)} 
                        onMouseOver={()=>this.hoverSpell(spellTypes.SPELL_DODGE)}
                        onMouseOut={()=>this.hoverSpell("")}
                        src={require('../../images/spells/'+spellTypes.SPELL_DODGE+'.png')} />
        
                <div className="hoverTest">{this.state.spellDescription}</div>
            </div>
        );
    }
}

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