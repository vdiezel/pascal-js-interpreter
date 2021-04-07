const BuiltInTypeSymbol = require("./BuiltInTypeSymbol")

class SymbolTable {

  constructor() {
    this._symbols = {}
    this._initBuiltIns()
  }

  _initBuiltIns() {
    this.define(new BuiltInTypeSymbol('REAL'))
    this.define(new BuiltInTypeSymbol('INTEGER'))
  }

  getSymbols() { return this._symbols }

  has(name) {
    return name in this._symbols
  }

  define(symbol) {
    this._symbols[symbol.name] = symbol
  }

  lookup(name) {
    return this._symbols[name]
  }

}

module.exports = SymbolTable