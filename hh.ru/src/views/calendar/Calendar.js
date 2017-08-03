import Component from '../Component';
import CalendarCell from '../calendar-cell';
import './calendar.styl';

class Calendar extends Component {
	constructor(props){
		super(props);

		this.curDate = new Date();
	}

	componentDidMount(){
		this.initEventHandles();
	}

	initEventHandles(){
		const domNode = document.getElementById(`${this.id}`);
		console.log(domNode);
	}

	renderCells(date){
		const lastMonthDayInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
		const startWeekDayInPrevMonth = new Date(date.getFullYear(), date.getMonth(), -lastMonthDayInPrevMonth.getDay() + 1);
		const diffPrevDays = lastMonthDayInPrevMonth.getDate() - startWeekDayInPrevMonth.getDate() + 1;

		const rows = [];
		let cells = [];

		const curDate = startWeekDayInPrevMonth;
		for (let i = 0; i < diffPrevDays; i++) {
			cells.push(new CalendarCell({ date: new Date(curDate) }));
			curDate.setDate(curDate.getDate() + 1);
		}
		for (let i = diffPrevDays; i < 7; i++) {
			cells.push(new CalendarCell({ date: new Date(curDate) }));
			curDate.setDate(curDate.getDate() + 1);
		}
		rows.push(`<div class='calendar__row clearfix'>${cells.join('')}</div>`);

		for (let i = 1; i < 6; i++) {
			cells = [];
			for (let j = 0; j < 7; j++) {
				cells.push(new CalendarCell({ date: new Date(curDate) }));
				curDate.setDate(curDate.getDate() + 1);
			}
			rows.push(`<div class='calendar__row clearfix'>${cells.join('')}</div>`);
		}
		return rows.join('');
	}

	render(){
		const { curDate } = this;
		return (
			`<div id=${this.id}>
				<div class='calendar__header'>
				</div>
				<div class='calendar__body'>
					<div class='menu'>
						<span class='menu__prev-month'>prev</span>
						<span class='menu__cur-month'>${curDate.getMonth()}</span>
						<span class='menu__next-month'>prev</span>
					</div>
					<div class='calendar__cells'>
						${this.renderCells(curDate)}
					</div>
				</div>
			</div>`
		);
	}
}

export default Calendar;