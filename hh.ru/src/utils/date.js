export function tryDateParse(date){
	const _date = Date.parse(date);
	if (!isNaN(_date)){
		return new Date(date);
	}
	return null;
}

export function getMonthName(date){
	const _date = tryDateParse(date);
	if (_date){
		const months = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь'
		];
		return months[_date.getMonth()];
	}
	return null;
}

export function getWeekDayName(date){
	const _date = tryDateParse(date);
	if (_date){
		const weekDays = [
			'Воскресенье',
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота'
		];
		return weekDays[_date.getDay()];
	}
	return null;
}

export function equalDates(fDate, sDate){
	const _fDate = tryDateParse(fDate);
	const _sDate = tryDateParse(sDate);
	return (
		(_fDate && _sDate) &&
		(_fDate.getFullYear() === _sDate.getFullYear()) &&
		(_fDate.getMonth() === _sDate.getMonth()) &&
		(_fDate.getDate() === _sDate.getDate())
	);
}

export function dateToString(date){
	const d = tryDateParse(date);
	if (d){
		const options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		};
		return d.toLocaleString('en', options);
		/*return (
			d.getFullYear() + '.' +
			d.getMonth() + '.' +
			d.getDate()
		);*/
	}
	return '';
}

export function dateToStringForList(date){
	const d = tryDateParse(date);
	if (d){
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return d.toLocaleString('ru', options);
	}
	return '';
}

export function getEnMonth(month){
	if (!month){
		return;
	}

	const ruMonths = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря'
	];
	const enMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let index = null;
	for (let i = 0; i < ruMonths.length; i++) {
		if (ruMonths[i].toLowerCase() === month.toLowerCase()) {
			index = i;
			break;
		}
	}

	return enMonths[index];
}