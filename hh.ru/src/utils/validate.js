export function isNumber(val){
	return /^[0-9]{1,}$/.test(val);
}

export function isDay(val){
	return /^[0-9]{1,2}$/.test(val);
}

export function isYear(val){
	return /^[0-9]{4}$/.test(val);
}