import {CHANGE_HUD_HOVER_MESSAGE, 
		REVERT_HUD_HOVER_MESSAGE} from './../constants/actionTypes';

export const changeHudHoverMsg = (msg) =>{

	return {
		type: CHANGE_HUD_HOVER_MESSAGE,
		payload: msg
			
	};
};

export const revertHudHoverMsg = (msg) =>{
	
	return {
		type: REVERT_HUD_HOVER_MESSAGE,
		payload: msg
			
	};
};
