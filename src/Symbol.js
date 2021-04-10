class Symbol {

  constructor(name, type = null) {
    this.name = name
    this.type = type
    this.scopeLevel = 0
  }

}

module.exports = Symbol