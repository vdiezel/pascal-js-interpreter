const BuiltInTypeSymbol = require("./BuiltInTypeSymbol")

class ScopedSymbolTable {

  constructor(scopeName, scopeLevel, enclosingScope = null) {
    this._symbols = {}
    this.scopeName = scopeName
    this.scopeLevel = scopeLevel
    this.enclosingScope = enclosingScope
  }

  _initBuiltIns() {
    this.define(new BuiltInTypeSymbol('REAL'))
    this.define(new BuiltInTypeSymbol('INTEGER'))
  }

  getSymbols() { return this._symbols }

  has(name, currentScopeOnly = false) {
    const hasSymbol = name in this._symbols
    if (currentScopeOnly) return hasSymbol
    return hasSymbol || this.enclosingScope.has(name)
  }

  define(symbol) {
    this._symbols[symbol.name] = symbol
  }

  lookup(name, currentScopeOnly = false) {
    const symbol = this._symbols[name]

    if (symbol !== undefined) return symbol

    if (currentScopeOnly || this.enclosingScope === null) return undefined

    if (this.enclosingScope !== null) return this.enclosingScope.lookup(name)
  }

}

module.exports = ScopedSymbolTable