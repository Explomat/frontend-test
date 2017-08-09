import Component from '../Component';
import './input-text.styl';

class InputText extends Component {

	constructor(props){
		super(props);

		this.props = {
			value: (props || {}).value || '',
			placeholder: 'Введите значение',
			...props
		};
		this.handleChange = this.handleChange.bind(this);
	}

	addEventListeners(){
		const domNode = document.getElementById(`${this.id}`);
		if (domNode){
			domNode.addEventListener('change', this.handleChange);
		}
	}

	removeEventListeners(){
		const domNode = document.getElementById(`${this.id}`);
		if (domNode){
			domNode.removeEventListener('change', this.handleChange);
		}
	}

	handleChange(e){
		if (this.props.onChange){
			this.props.onChange(e.target.value);
		}
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