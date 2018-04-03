export default {
	url: 'https://search-maps.yandex.ru/v1',
	proxyUrl: `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 8081}`,
	apiKey: 'eb9db35e-8dbf-42ee-8fbc-dbc45b1e07d6',
	lang: 'ru_RU',
	type: 'geo,biz'
};