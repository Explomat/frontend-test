import Component from '../Component';
import InputText from '../input-text';
import './short-event.styl';

class ShortEvent extends Component {

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

	render(){
		return (
			`<div id=${this.id} class='short-event'>
				<span class='short-event__pointer'></span>
				<div class='short-event__content'>
					<div class='short-event__header'>
						<span id='${this.id}__close' class='close-button'></span>
					</div>
					<div class='short-event__body'>
						${new InputText()}
					</div>
					<div class='short-event__footer'>
						<button type='button' class='short-event__create-button'>Создать</button>
					</div>
				</div>
			</div>`
		);
	}
}

export default ShortEvent;