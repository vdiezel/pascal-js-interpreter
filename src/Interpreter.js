const NodeVisitor = require('./NodeVisitor')

class Interpreter extends NodeVisitor {
  
  constructor(parser) {
    super()
    this.parser = parser
  }

  interpret() {
    const tree = this.parser.parse()
    console.log(tree)
    return this.visit(tree)
  }

}

module.exports = Interpreter