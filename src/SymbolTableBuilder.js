const ScopedSymbolTable = require('./ScopedSymbolTable')

class SymbolTableBuilder {

  constructor() {
    this.scope = null
  }

  visit(node) {
    return node.accept(this)
  }

}

module.exports = SymbolTableBuilder