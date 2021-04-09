const NodeVisitor = require('./NodeVisitor')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class Interpreter extends NodeVisitor {
  
  constructor(parser) {
    super()
    this.parser = parser
  }

  interpret() {
    const tree = this.parser.parse()
    const symTableBuilder = new SymbolTableBuilder()
    symTableBuilder.visit(tree)
    console.log(symTableBuilder.scope)
    return this.visit(tree)
  }

}

module.exports = Interpreter