class NodeVisitor {

  constructor() {}

  visit(node) {
    return node.accept(this)
  }

}

module.exports = NodeVisitor