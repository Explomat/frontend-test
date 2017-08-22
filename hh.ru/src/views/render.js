import eventList from './eventList';

const EXCLUDED_PROPS = {
	children: true
};
let rootDomNode = null;
const nodes = {};
//let curComponent = null;

export function update(id){
	const obj = nodes[id];
	const parentDomNode = (obj.parent && obj.parent.domNode ? obj.parent.domNode : rootDomNode);
	_renderTree(obj, parentDomNode);
}

export function render({ type, props, parent, id }, container) {
	rootDomNode = container;
	_renderTree({ type, props, parent, id }, container);
}

function _clearNode(id){
	const node = nodes[id];

	if (node && node.domNode){
		if (node.domNode.hasAttributes()) {
			const attrs = node.domNode.attributes;
			for (let i = attrs.length - 1; i >= 0; i--) {
				node.domNode.removeAttribute(attrs[i].name);
			}
		}

		if (node.props) {
			for (const p in node.props){
				if (node.props.hasOwnProperty(p) &&
					eventList.hasOwnProperty(p)
				){
					const ev = p.substr(2).toLowerCase();
					node.domNode.removeEventListener(ev, node.props[p]);
				}
			}
		}
	}
}

function _renderTree({ type, props, parent, id }, parentDomNode) {
	const elId = id !== undefined ?
		id.toString()[(id.toString().length - 1)] : '0';
	const newId = parent ? `${parent.id}.${elId}` : '0';

	const obj = {
		id: newId,
		type,
		parent
	};
	
	const isSameComponent = (newId in nodes) &&
								nodes[newId].type === type;
	
	if (typeof type === 'function'){
		let Component = null;
		if (isSameComponent){
			Component = nodes[newId].instance;
		} else {
			Component = new type(props);
			Component.id = newId;
		}

		//curComponent = Component;
		obj.props = props;
		obj.instance = Component;
		nodes[newId] = obj;

		if (Component.componentWillMount && !isSameComponent){
			Component.componentWillMount();
			return;
		}
		
		Component.props = props;
		const el = Component.render();

		if (el){
			const child = _renderTree({
				type: el.type,
				props: el.props,
				parent: obj,
				id: '0'
			}, parentDomNode);
			Component.domNode = child.domNode;

			if (Component.componentDidMount && !isSameComponent){
				Component.componentDidMount();
			}
		}
		return obj;
	} else if (typeof type === 'string') {
		if (isSameComponent){
			obj.domNode = nodes[newId].domNode;
			_clearNode(newId);
		} else {
			obj.domNode = document.createElement(type);
		}

		obj.domNode.setAttribute('id', newId);

		if (props){
			obj.props = Object.assign({}, props);

			/*if (props.ref && curComponent){
				curComponent.refs = curComponent.refs || {};
				curComponent.refs[props.ref] = obj.domNode;
			}*/

			for (const p in props){
				if (props.hasOwnProperty(p)){
					if (eventList.hasOwnProperty(p)) {
						const ev = p.substr(2).toLowerCase();
						obj.domNode.addEventListener(ev, props[p]);
					} else if (!EXCLUDED_PROPS.hasOwnProperty(p)){
						obj.domNode.setAttribute(p, props[p]);
					}
				}
			}

			if (props.children !== undefined) {
				if (Array.isArray(props.children)){
					let i, j, k, len;
					const childs = [];
					for (i = 0, len = props.children.length; i < len; i++) {
						const ch = props.children[i];
						if (ch){
							childs.push(_renderTree({
								type: ch.type,
								props: ch.props,
								parent: obj,
								id: i
							}, obj.domNode));
						}
					}
					for (j = obj.domNode.childNodes.length - 1; j >= 0; j--) {
						const childNode = obj.domNode.childNodes[j];
						let isEqual = false;
						for (k = childs.length - 1; k >= 0; k--) {
							const equalNode = childs[k].domNode || childs[k].instance.domNode;
							if (childNode.isEqualNode(equalNode)){
								isEqual = true;
							}
						}
						if (!isEqual){
							obj.domNode.removeChild(childNode);
						}
					}
				} else if (typeof props.children === 'object'){
					_renderTree({
						type: props.children.type,
						props: props.children.props,
						parent: obj,
						id: '0'
					}, obj.domNode);
				} else if (typeof props.children === 'boolean'){
					if (obj.domNode.firstChild){
						obj.domNode.removeChild(obj.domNode.firstChild);
					}
				} else {
					obj.domNode.textContent = props.children.toString();
				}
			}
		}

		nodes[newId] = obj;
		parentDomNode.appendChild(obj.domNode);
		return obj;
	}
}