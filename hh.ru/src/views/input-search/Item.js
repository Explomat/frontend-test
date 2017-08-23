import Component from '../Component';
import Element from '../Element';
import tags from '../tags';
import { omitBy } from '../../utils/omit';

export class Item extends Component {

	constructor(props){
		super(props);

		this._filterProp = this._filterProp.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	_filterProp(key){
		return typeof this.props[key] !== 'function';
	}

	handleClick(){
		const ommitedProps = omitBy(this.props, this._filterProp);
		if (this.props.onClick){
			this.props.onClick(ommitedProps);
		}
	}

	render(){
		const {
			title,
			description,
			tabindex
		} = this.props;
		return (
			tags.div({
				class: 'input-search__item',
				tabindex,
				onKeyUp: console.log,
				onClick: this.handleClick
			}, [
				tags.div({
					class: 'input-search__item-title'
				}, title),
				tags.div({
					class: 'input-search__item-description'
				}, description)]
			)
		);
	}
}

Item.defaultProps = {
	title: '',
	description: ''
};

const ItemElement = Element.createFactory(Item);
export default ItemElement;