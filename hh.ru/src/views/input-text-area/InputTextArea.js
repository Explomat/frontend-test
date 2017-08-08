import Component from '../Component';
import './input-text-area.styl';

class InputTextArea extends Component {

	constructor(props){
		super(props);

		this.props = {
			value: '',
			placeholder: 'Введите значение',
			...props
		};
		//this.handleClick = this.handleClick.bind(this);
	}

	addEventListeners(){
		/*const domNode = document.getElementById(`${this.id}`);
		domNode.addEventListener('click', this.handleClick);*/
	}

	render(){
		const { value, placeholder } = this.props;
		return (
			`<textarea
				id=${this.id}
				placeholder='${placeholder}'
				class='input-text-area'
			>
				${value}
			</textarea>`
		);
	}
}

export default InputTextArea;