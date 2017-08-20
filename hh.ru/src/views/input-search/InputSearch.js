import Component from '../Component';
import Element from '../Element';
import InputText from '../input-text';
import tags from '../tags';
import './input-search.styl';

export class InputSearch extends Component {

	constructor(props){
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(e){
		if (e.keyCode === 13 && this.props.onSearch){
			this.props.onSearch(e.target.value);
		}
	}

	render(){
		const { value, placeholder, className } = this.props;
		return (
			tags.div({
				class: `input-search ${className}`
			}, InputText({
				value,
				placeholder,
				onKeyDown: this.handleKeyDown
			}))
		);
	}
}

InputSearch.defaultProps = {
	value: '',
	placeholder: 'Введите значение',
	className: ''
};

const InputSearchElement = Element.createFactory(InputSearch);
export default InputSearchElement;