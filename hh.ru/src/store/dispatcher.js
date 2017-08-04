
const funcs = [];

export function register(func){
	funcs.push(func);
}

export function unregister(func){
	for (let i = funcs.length - 1; i >= 0; i--) {
		if (funcs[i] === func){
			funcs.splice(i, 1);
		}
	}
}

export function dispatch(payload){
	for (let i = 0, len = funcs.length; i < len; i++) {
		funcs[i](payload);
	}
}