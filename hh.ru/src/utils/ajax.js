const AJAX_TIME_OVER = 15000;

function getXmlHttp(){
	let xmlHttp;
	try {
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e){
		try {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (err){
			xmlHttp = false;
		}
	}
	if (!xmlHttp && typeof (XMLHttpRequest) !== 'undefined'){
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}

function sendRequest(url, data, requestType){
	if (!url) return Promise.reject(Error('Unknown url'));

	const resp = new Promise((resolve, reject) => {
		const xmlHttp = getXmlHttp();
		const type = requestType || 'GET';

		xmlHttp.open(type, encodeURI(url), true);
		xmlHttp.onreadystatechange = () => {
			if (xmlHttp.readyState === 4) {
				if (timeout){
					clearTimeout(timeout);
				}

				if (xmlHttp.status === 200){
					resolve(xmlHttp.responseText);
				} else {
					console.log(xmlHttp.status);
					reject(new Error(xmlHttp.statusText || 'Ajax request error'));
				}
			}
		};
		xmlHttp.send(data || null);
		const timeout = setTimeout(() => {
			xmlHttp.abort();
			reject(new Error('Ajax request time over'));
		}, AJAX_TIME_OVER);
	});

	return resp;
}


export function get(url){
	return sendRequest(url);
}

export function post(url, data){
	return sendRequest(url, data, 'POST');
}