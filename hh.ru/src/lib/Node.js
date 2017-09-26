function Node(key, id, type, parent, props, instance, domNode) {
	this.key = key;
	this.id = id;
	this.type = type;
	this.parent = parent;
	this.props = props;
	this.instance = instance;
	this.domNode = domNode;
}


Node.prototype.getContainerInstance = function getContainerInstance(){
	let node = this;
	if (typeof node.type === 'string' && node.parent) {
		while (node.parent && typeof node.type !== 'function'){
			node = node.parent;
		}
	}
	return node && node.instance;
};

export default Node;