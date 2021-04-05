const NodeVisitor = require('./NodeVisitor')

class Interpreter extends NodeVisitor {
  
  constructor(parser) {
    super()
    this.parser = parser
  }

  interpret() {
    const tree = this.parser.parse()
    return this.visit(tree)
  }

}

module.exports = Interpreter