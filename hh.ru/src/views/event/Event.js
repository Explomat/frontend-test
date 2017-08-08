import Component from '../Component';
import InputText from '../input-text';
import InputTextArea from '../input-text-area';
import './event.styl';

class Event extends Component {

	constructor(props){
		super(props);
	}

	addEventListeners(){
		const domNode = document.getElementById(`${this.id}__close`);
		if (domNode){
			domNode.addEventListener('click', this.props.onClose);
		}
	}

	removeEventListeners(){
		const domNode = document.getElementById(`${this.id}__close`);
		if (domNode){
			domNode.removeEventListener('click', this.props.onClose);
		}
	}

	getPosition(){
		const { nativeEvent } = this.props;
		if (nativeEvent){
			const domNode = document.getElementById(`${this.id}`);
			const thisWidth = domNode.getBoundingClientRect().width;

			const element = nativeEvent.currentTarget;
			//const { offsetWidth, offsetHeight } = element;
			const elementRect = element.getBoundingClientRect();
			const bodyRect = document.body.getBoundingClientRect();

			const leftDiff = bodyRect.left - elementRect.left;
			const rightDiff = bodyRect.right - elementRect.right;
			/*const topDiff = bodyRect.bottom - elementRect.top;
			const bottomDiff = bodyRect.bottom - elementRect.bottom;*/
			return {
				top: elementRect.top,
				left: leftDiff > rightDiff ? elementRect.left - thisWidth : elementRect.right + thisWidth
			};
		}
		return null;
	}

	render(){
		const pos = this.getPosition() || {};
		return (
			`<div id=${this.id} class='event' style='top: ${pos.top}px; left: ${pos.left}px;'>
				<span class='event__pointer'></span>
				<div class='event__content'>
					<div class='event__header'>
						<span id='${this.id}__close' class='close-button'></span>
					</div>
					<div class='event__body'>
						${new InputText({
							placeholder: 'Событие'
						})}
						${new InputText({
							placeholder: 'Участники'
						})}
						${new InputTextArea({
							placeholder: 'Описание'
						})}
					</div>
					<div class='event__footer'>
						<button type='button' class='event__create-button'>Готово</button>
					</div>
				</div>
			</div>`
		);
	}
}

export default Event;