const SymbolTable = require('./SymbolTable')

class SymbolTableBuilder {

  constructor() {
    this.symtab = new SymbolTable()
  }

  visit(node) {
    return node.accept(this)
  }

}

module.exports = SymbolTableBuilder