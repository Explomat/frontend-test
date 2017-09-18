import Component from 'src/lib/Component';
import Element from 'src/lib/Element';
import tags from 'src/lib/tags';
import { omitBy } from 'src/utils/omit';

export class Item extends Component {

	constructor(props){
		super(props);

		this._filterProp = this._filterProp.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
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

	handleKeyDown(e){
		const item = this.refs.item;
		if (e.keyCode === 13 && this.props.onClick){
			const ommitedProps = omitBy(this.props, this._filterProp);
			this.props.onClick(ommitedProps);
		} else {
			const nextNode =
				e.keyCode === 40 ? item.nextSibling :
				e.keyCode === 38 ? item.previousSibling :
				null;
			if (nextNode){
				e.preventDefault();
				nextNode.focus();
			}
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
				ref: 'item',
				class: 'input-search__item',
				tabindex,
				onKeyDown: this.handleKeyDown,
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