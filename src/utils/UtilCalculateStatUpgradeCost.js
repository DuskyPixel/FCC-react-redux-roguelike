import * as hudTypes from './../constants/hudTypes';

export default function getStatGoldCost(statLevel, statUpgrades){
	return statLevel * hudTypes.ATTRIBUTE_STAT_LEVEL_COST + statUpgrades * hudTypes.ATTRIBUTE_UPGRADE_LEVEL_COST;
}