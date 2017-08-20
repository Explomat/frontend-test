import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import './input-text.styl';

export class InputText extends Component {

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleChange(e){
		if (this.props.onChange){
			this.props.onChange(e.target.value);
		}
	}

	handleKeyDown(e){
		if (this.props.onKeyDown){
			this.props.onKeyDown(e);
		}
	}

	render(){
		const { value, placeholder, className } = this.props;
		return (
			tags.input({
				type: 'input',
				placeholder,
				value,
				class: `input-text form-control ${className}`,
				onChange: this.handleChange,
				onKeyDown: this.handleKeyDown
			})
		);
	}
}

InputText.defaultProps = {
	value: '',
	placeholder: 'Введите значение',
	className: ''
};

const InputTextElement = Element.createFactory(InputText);
export default InputTextElement;