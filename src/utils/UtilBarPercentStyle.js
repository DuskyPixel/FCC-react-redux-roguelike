export default function getBarPercentStyle(currentValue, maxValue){
	return Math.floor(currentValue/maxValue * 200);
} 