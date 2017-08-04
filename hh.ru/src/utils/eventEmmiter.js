
const callbacks = {};

export function subscribe(eventName, cb) {
	if (!callbacks[eventName]) {
		callbacks[eventName] = [];
		callbacks[eventName].push(cb);
	} else {
		callbacks[eventName].push(cb);
	}
}

export function unsubscribe(eventName, cb) {
	const funcs = callbacks[eventName];
	if (!funcs) return;

	if (!cb){
		delete callbacks[eventName];
		return;
	}

	for (let i = 0, len = funcs.length; i < len; i++) {
		if (funcs[i] === cb){
			funcs.splice(i, 1);
		}
	}
}

export function emit(eventName, rest) {
	const funcs = callbacks[eventName];
	if (!funcs) return;

	for (let i = 0, len = funcs.length; i < len; i++) {
		funcs[i](rest);
	}
}