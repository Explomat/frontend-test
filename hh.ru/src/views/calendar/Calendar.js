import Component from '../Component';
import { addEventListener } from '../../store/calendarStore';
import {
	getState,
	prevMonth,
	nextMonth,
	saveEvent,
	deleteEvent
} from '../../actions/calendarActions';
import CalendarCell from '../calendar-cell';
import ShortEvent from '../short-event';
import Event from '../event';
import InputSearch from '../input-search';
import tags from '../tags';
import Element from '../Element';
import {
	getMonthName,
	getWeekDayName,
	equalDates,
	dateToString
} from '../../utils/date';
import './calendar.styl';

function updateState(st) {
	this.setState({
		...this.state,
		...st
	});
}

export class Calendar extends Component {
	constructor(props){
		super(props);

		this.state = {
			curEvent: null,
			isDisplayEvent: false,
			isDisplayShortEvent: false
		};
		
		this.handleToggleDisplayShortEvent = this.handleToggleDisplayShortEvent.bind(this);
		this.handleDisplayEvent = this.handleDisplayEvent.bind(this);
		this.handleHideEvent = this.handleHideEvent.bind(this);
		this.handleSaveEvent = this.handleSaveEvent.bind(this);
		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
		//this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentWillMount(){
		addEventListener(updateState.bind(this));
		getState();
	}

	componentDidMount(){

	}

	handleToggleDisplayShortEvent(){
		this.setState({
			isDisplayShortEvent: !this.state.isDisplayShortEvent,
			isDisplayEvent: false
		});
	}

	handleHideEvent(){
		this.setState({
			isDisplayEvent: false
		});
	}

	handleDisplayEvent(elementRect, date){
		const { events } = this.state;

		this.setState({
			isDisplayEvent: true,
			isDisplayShortEvent: false,
			curEvent: {
				elementRect,
				date,
				...events[dateToString(date)]
			}
		});
	}

	handleSaveEvent(event, date){
		this.setState({
			isDisplayEvent: false
		});
		saveEvent(event, date);
	}

	handleDeleteEvent(date){
		this.setState({
			isDisplayEvent: false
		});
		deleteEvent(date);
	}

	/*handleClickOutside(e){
		const shortEventNode = document.getElementById(`${this.id}__short-event`);
		const { isDisplayShortEvent, isDisplayEvent } = this.state;

		if (shortEventNode && !shortEventNode.contains(e.target) && isDisplayShortEvent){
			this.setState({
				isDisplayShortEvent: false
			});
		}

		const eventNode = document.getElementById(`${this.id}__event`);
		if (eventNode && !eventNode.contains(e.target) && isDisplayEvent){
			this.setState({
				isDisplayEvent: false
			});
		}
	}*/

	renderCells(date){
		const year = date.getFullYear();
		const month = date.getMonth();
		const lastMonthDayInPrevMonth = new Date(year, month, 0);
		let startWeekDayInPrevMonth = new Date(year, month, -lastMonthDayInPrevMonth.getDay() + 1);
		let diffPrevDays = lastMonthDayInPrevMonth.getDate() - startWeekDayInPrevMonth.getDate() + 1;
		if (diffPrevDays >= 28){
			startWeekDayInPrevMonth = new Date(year, month, -lastMonthDayInPrevMonth.getDay() - 6);
			diffPrevDays = lastMonthDayInPrevMonth.getDate() - startWeekDayInPrevMonth.getDate() + 1;
		}

		const rows = [];
		let cells = [];

		const curDate = startWeekDayInPrevMonth;
		const dateNow = new Date();

		const { events } = this.state;
		let ev;
		for (let i = 0; i < diffPrevDays; i++) {
			ev = events[dateToString(curDate)];
			cells.push(CalendarCell({
				title: `${getWeekDayName(curDate)}, ${curDate.getDate()}`,
				isCurDate: equalDates(dateNow, curDate),
				date: new Date(curDate),
				event: ev ? ev : undefined,
				onClick: this.handleDisplayEvent
			}));
			curDate.setDate(curDate.getDate() + 1);
		}
		for (let i = diffPrevDays; i < 7; i++) {
			ev = events[dateToString(curDate)];
			cells.push(CalendarCell({
				title: `${getWeekDayName(curDate)}, ${curDate.getDate()}`,
				date: new Date(curDate),
				event: ev ? ev : undefined,
				isCurMonth: true,
				isCurDate: equalDates(dateNow, curDate),
				onClick: this.handleDisplayEvent
			}));
			curDate.setDate(curDate.getDate() + 1);
		}

		rows.push(tags.div({
			class: 'calendar__row clearfix'
		}, cells));

		const lastDayInCurMonth = new Date(year, month + 1, 0);
		for (let i = 1; i < 6; i++) {
			cells = [];
			for (let j = 0; j < 7; j++) {
				ev = events[dateToString(curDate)];
				cells.push(CalendarCell({
					title: curDate.getDate(),
					date: new Date(curDate),
					event: ev ? ev : undefined,
					isCurDate: equalDates(dateNow, curDate),
					isCurMonth: curDate <= lastDayInCurMonth,
					onClick: this.handleDisplayEvent
				}));
				curDate.setDate(curDate.getDate() + 1);
			}
			rows.push(tags.div({
				class: 'calendar__row clearfix'
			}, cells));
		}
		return rows;
	}

	render(){
		const {
			isFetching,
			isDisplayShortEvent,
			isDisplayEvent,
			curDate,
			curEvent
		} = this.state;

		if (isFetching){
			return tags.div({
				class: 'overlay-loading overlay-loading--show'
			});
		}
		
		return tags.div({
			class: 'calendar'
		}, [
			tags.div({
				class: 'calendar__header'
			}, [
				tags.div({
					class: 'calendar__valign'
				}),
				tags.div({
					class: 'calendar__buttons'
				}, [
					tags.button({
						type: 'button',
						class: 'form-control calendar__buttons--add',
						onClick: this.handleToggleDisplayShortEvent
					}, 'Добавить'),
					tags.button({
						type: 'button',
						class: 'form-control calendar__buttons--refresh'
					}, 'Обновить'),
					isDisplayShortEvent && ShortEvent({
						onClose: this.handleToggleDisplayShortEvent
					}),
					InputSearch({
						className: 'calendar__search'
					})
				])
			]),
			tags.div({
				class: 'calendar__body'
			}, [
				tags.div({
					class: 'calendar__menu'
				}, [
					tags.span({
						class: 'menu__prev-month',
						onClick: prevMonth
					}, 'prev'),
					tags.span({
						class: 'menu__cur-date'
					}, `${getMonthName(curDate)} ${curDate.getFullYear()}`),
					tags.span({
						class: 'menu__next-month',
						onClick: nextMonth
					}, 'next')
				]),
				tags.div({
					class: 'calendar__rows'
				}, this.renderCells(curDate))
			]),
			Event({
				isDisplay: isDisplayEvent,
				onClose: this.handleHideEvent,
				onSave: this.handleSaveEvent,
				onDelete: this.handleDeleteEvent,
				...curEvent
			})
		]);
	}
}

const CalendarElement = Element.createFactory(Calendar);
export default CalendarElement;