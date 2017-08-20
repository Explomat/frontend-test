import eventList from './eventList';

const EXCLUDED_PROPS = {
	children: true
};
let rootDomNode = null;
const nodes = {};

export function update(id){
	const obj = nodes[id];
	const parentDomNode = (obj.parent && obj.parent.domNode ? obj.parent.domNode : rootDomNode);
	const instDomNode = obj.instance.domNode;
	_renderTree(obj, parentDomNode);
	if (instDomNode && obj.instance.domNode){
		parentDomNode.replaceChild(obj.instance.domNode, instDomNode);
	}
}

export function render({ type, props, parent, id }, container) {
	rootDomNode = container;
	_renderTree({ type, props, parent, id }, container);
}

function _renderTree({ type, props, parent, id }, domNode) {
	const elId = id ? id.toString().substr(id.length - 1) : '0';
	const newId = parent ? `${parent.id}.${elId}` : '0';

	const obj = {
		id: newId,
		type,
		parent
	};
	
	if (typeof type === 'function'){
		const isSameComponent = (newId in nodes) &&
								nodes[newId].type === type;
		let Component = null;
		if (isSameComponent){
			Component = nodes[newId].instance;
		} else {
			Component = new type(props);
			Component.id = newId;
		}

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
			}, domNode);
			Component.domNode = child.domNode;

			if (Component.componentDidMount && !isSameComponent){
				Component.componentDidMount();
			}
		}
		return obj;
	} else if (typeof type === 'string') {
		obj.domNode = document.createElement(type);
		//obj.domNode.setAttribute('id', newId);

		if (props){
			obj.props = Object.assign({}, props);

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

			if (props.children) {
				if (Array.isArray(props.children)){
					for (let i = 0, len = props.children.length; i < len; i++) {
						if (props.children[i]){
							const child = {
								type: props.children[i].type,
								props: props.children[i].props,
								parent: obj,
								id: i
							};
							_renderTree(child, obj.domNode);
						}
					}
				} else if (typeof props.children === 'object'){
					const child = {
						type: props.children.type,
						props: props.children.props,
						parent: obj,
						id: '0'
					};
					_renderTree(child, obj.domNode);
				} else {
					obj.domNode.textContent = props.children.toString();
				}
			}
		}
		domNode.appendChild(obj.domNode);
		return obj;
	}
}