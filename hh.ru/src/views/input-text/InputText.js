import Component from '../Component';
import './input-text.styl';

class InputText extends Component {

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
			`<input
				id=${this.id}
				type='input'
				placeholder='${placeholder}'
				value='${value}'
				class='input-text' />`
		);
	}
}

export default InputText;