const CallStack = require('./CallStack')
const NodeVisitor = require('./NodeVisitor')
const SymbolTableBuilder = require('./SymbolTableBuilder')

class Interpreter extends NodeVisitor {
  
  constructor(parser) {
    super()
    this.parser = parser
    this.callStack = new CallStack()
  }

  interpret() {
    const tree = this.parser.parse()
    const symTableBuilder = new SymbolTableBuilder()
    symTableBuilder.visit(tree)
    return this.visit(tree)
  }

}

module.exports = Interpreter