import Component from '../Component';
import Element from '../Element';
import InputText from '../input-text';
import Error from '../error';
import tags from '../tags';
import { parseDateFromString } from  '../../utils/date';
import './short-event.styl';

export class ShortEvent extends Component {

	constructor(props){
		super(props);

		this.state = {
			text: '',
			error: null
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	_save(){
		const val = this.state.text;
		if (val){
			let [dateString, event] = val.split(',');
			if (dateString) {
				dateString = dateString.trim();
				const parsedDate = parseDateFromString(dateString);

				if (parsedDate) {
					event = event.trim();
					if (event){
						this.props.onSave(
							event,
							parsedDate
						);
					} else {
						this.setState({
							error: 'Не указано название мероприятия'
						});
					}
				} else {
					this.setState({
						error: 'Неверный формат даты'
					});
				}
			} else {
				this.setState({
					error: 'Не указана дата'
				});
			}
		} else {
			this.setState({
				error: 'Необходимо заполнить дату и название'
			});
		}
	}

	handleClose(){
		if (this.props.onClose){
			this.state.error = null;
			this.props.onClose();
		}
	}

	handleClick(e){
		if (this.props.onSave){
			e.preventDefault();
			this.state.error = null;
			this._save();
		}
	}

	handleKeyDown(e){
		this.state.text = e.target.value;
		if (e.keyCode === 13 && this.props.onSave){
			e.preventDefault();
			this.state.error = null;
			this._save();
		}
	}

	render(){
		const { error, text } = this.state;
		return (
			tags.div({
				class: 'short-event'
			}, tags.div({
				class: 'short-event__content'
			}, [
				tags.div({
					class: 'short-event__header'
				}, tags.span({
					class: 'close-button',
					onClick: this.handleClose })
				),
				tags.div({
					class: 'short-event__body'
				}, InputText({
					value: text,
					placeholder: `${new Date().toLocaleString('ru', { month: 'long', day: 'numeric' })}, День рождение`,
					onKeyDown: this.handleKeyDown
				})),
				tags.div({
					class: 'short-event__footer'
				}, [
					tags.button({
						type: 'button',
						class: 'short-event__create-button',
						onClick: this.handleClick
					}, 'Создать'),
					error && Error({
						className: 'short-event__error',
						text: error
					})
				])
			]))
		);
	}
}

const ShortEventElement = Element.createFactory(ShortEvent);
export default ShortEventElement;