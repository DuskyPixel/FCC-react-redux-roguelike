import { combineReducers } from 'redux';
import player from './playerReducer';
import monsters from './monsterReducer';
import tileGrid from './tileMapReducer';

const rootReducer = combineReducers({
	player, monsters, tileGrid
});

export default rootReducer;