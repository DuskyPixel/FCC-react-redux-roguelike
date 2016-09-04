import {Howl} from 'howler';
import * as audioTypes from './../constants/audioTypes';

let sounds = {};

sounds[audioTypes.SND_ALTAR] = new Howl({
    src: [require('./../../sounds/altar.mp3')]
});

sounds[audioTypes.SND_COIN] = new Howl({
    src: [require('./../../sounds/coin.mp3')]
});

sounds[audioTypes.SND_DOOR] = new Howl({
    src: [require('./../../sounds/door.mp3')],
    volume: 0.3
});

sounds[audioTypes.SND_GAME_OVER] = new Howl({
    src: [require('./../../sounds/gameOver.mp3')]
});

sounds[audioTypes.SND_LEVEL_UP] = new Howl({
    src: [require('./../../sounds/levelUp.mp3')]
});

sounds[audioTypes.SND_ATTACK] = new Howl({
    src: [require('./../../sounds/attack.mp3')]
});

sounds[audioTypes.SND_DRINK_POTION] = new Howl({
    src: [require('./../../sounds/potionDrinking.mp3')]
});

sounds[audioTypes.SND_DRINK_POTION] = new Howl({
    src: [require('./../../sounds/ohh.mp3')]
});

export const play = (sound) =>{
	if(sounds[sound]){
		sounds[sound].play();
	}
};