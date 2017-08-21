import Component from '../Component';
import Element from '../Element';
import Item from './Item';
import InputText from '../input-text';
import tags from '../tags';
import './input-search.styl';

const TIMEOUT = 300;

export class InputSearch extends Component {

	constructor(props){
		super(props);

		this.state = {
			value: '',
			isDisplayItems: true
		};

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleKeyUp(e){
		this.state.value = e.target.value;
		if (this.props.onSearch){
			this.prevTime = Date.now();

			clearTimeout(this.timeout);
			this.timeout = setTimeout(
				() => {
					if ((Date.now() - this.prevTime) >= TIMEOUT){
						this.props.onSearch(e.target.value);
						e.target.focus();
					}
				},
				TIMEOUT
			);
		}
	}

	handleBlur(/*e*/){
		/*const a = e.target;
		a.focus();
		this.setState({
			isDisplayItems: false
		});
		a.focus();
		this.target = a;
		//e.target.focus();
		const b = e.target;
		console.log(a === b);*/
	}

	handleSelect(item){
		if (this.props.onSelect){
			this.props.onSelect(item);
		}
	}

	render(){
		const { value, isDisplayItems } = this.state;
		const {
			placeholder,
			className,
			items
		} = this.props;
		return (
			tags.div({
				class: `input-search ${className}`
			}, [
				InputText({
					value,
					placeholder,
					onKeyUp: this.handleKeyUp,
					onBlur: this.handleBlur
				}),
				items.length && isDisplayItems && tags.div({
					class: 'input-search__items'
				}, tags.div({
					class: 'input-search__content'
				}, items.map(i => Item({
					...i,
					onClick: this.handleSelect
				}))))]
			)
		);
	}
}

InputSearch.defaultProps = {
	value: '',
	placeholder: 'Введите значение',
	className: '',
	items: []
};

const InputSearchElement = Element.createFactory(InputSearch);
export default InputSearchElement;