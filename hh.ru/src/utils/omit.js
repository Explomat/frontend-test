function arrayMirrorToObject(arr){
	const obj = {};

	for (let i = arr.length - 1; i >= 0; i--) {
		obj[arr[i]] = arr[i];
	}
	return obj;
}

export function omit(obj, keys) {
	const keysObj = arrayMirrorToObject(keys);

	const outObj = {};

	for (const o in obj){
		if (obj.hasOwnProperty(o) &&
			!keysObj.hasOwnProperty(o)){
			outObj[o] = obj[o];
		}
	}
	return outObj;
}

export function omitBy(obj, cb) {
	const outObj = {};

	for (const o in obj){
		if (obj.hasOwnProperty(o) && cb(o)){
			outObj[o] = obj[o];
		}
	}
	return outObj;
}