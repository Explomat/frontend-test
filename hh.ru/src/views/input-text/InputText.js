import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import './input-text.styl';

export class InputText extends Component {

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		if (this.props.onChange){
			this.props.onChange(e.target.value);
		}
	}

	render(){
		const { value, placeholder, className } = this.props;
		return (
			tags.input({
				type: 'text',
				placeholder,
				value,
				class: `input-text form-control ${className}`,
				onChange: this.handleChange,
				onKeyDown: this.props.onKeyDown,
				onKeyUp: this.props.onKeyUp,
				onBlur: this.props.onBlur
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