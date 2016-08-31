import { combineReducers } from 'redux';
import player from './playerReducer';
import monsters from './monsterReducer';
import tileGrid from './tileMapReducer';
import hud from './hudReducer';

const rootReducer = combineReducers({
	player, monsters, tileGrid, hud
});

export default rootReducer;