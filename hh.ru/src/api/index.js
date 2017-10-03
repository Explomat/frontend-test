const storage = window.localStorage;

export function getEvents(){
	const events = storage.getItem('events');
	if (events !== null){
		return Promise.resolve(JSON.parse(events));
	}
	return Promise.resolve([]);
}

export function saveEvent(event){
	const obj = storage.getItem('events');
	let events = [];
	if (obj !== null){
		events = JSON.parse(obj);
	}
	const idx = events.findIndex(e => e.date === event.date);
	if (~idx){
		events[idx] = event;
	} else {
		events.push(event);
	}
	
	storage.setItem('events', JSON.stringify(events));
	return Promise.resolve();
}

export function deleteEvent(date){
	const obj = storage.getItem('events');
	let events = [];
	if (obj !== null){
		events = JSON.parse(obj);
	}
	const idx = events.findIndex(e => e.date === date);
	if (~idx){
		events.splice(idx, 1);
		storage.setItem('events', JSON.stringify(events));
	}
	return Promise.resolve();
}