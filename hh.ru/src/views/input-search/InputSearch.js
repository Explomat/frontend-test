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
		this.handleClick = this.handleClick.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount(){
		document.addEventListener('click', this.handleClickOutside);
	}

	_onSearch(value, cb){
		if (this.props.onSearch){
			this.prevTime = Date.now();

			clearTimeout(this.timeout);
			this.timeout = setTimeout(
				() => {
					if ((Date.now() - this.prevTime) >= TIMEOUT){
						this.props.onSearch(value);
						if (cb){
							cb();
						}
					}
				},
				TIMEOUT
			);
		}
	}

	handleKeyUp(e){
		this.state.value = e.target.value;
		this.state.isDisplayItems = true;

		this._onSearch(e.target.value, () => {
			e.target.focus();
		});
	}

	handleClickOutside(e){
		const { isDisplayItems } = this.state;

		if (isDisplayItems && !this.domNode.contains(e.target)){
			this.setState({
				isDisplayItems: false
			});
		}
	}

	handleClick(e){
		this.state.isDisplayItems = true;
		this._onSearch(e.target.value, () => {
			e.target.focus();
		});
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
					onClick: this.handleClick
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