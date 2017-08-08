export function tryDateParse(date){
	if (date === null){
		return '';
	}
	const _date = Date.parse(date);
	if (!isNaN(_date)){
		return new Date(_date);
	}
	return '';
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