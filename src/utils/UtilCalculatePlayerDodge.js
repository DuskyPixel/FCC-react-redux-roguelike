export default function getPlayerDodge(player) {
	let dodge = player.agility;

	for(let i in player.weapons){
		if(player.weapons[i]){
			if(player.weapons[i].equipped === true){
				dodge += player.weapons[i].dodge;
			}
		}
	}
	
	return dodge;
}