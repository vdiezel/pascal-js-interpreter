const AST = require('./AST')
const { getVar, isStored } = require('./ADT')

class Var extends AST {

  constructor(token) {
    super()
    this.token = token
  }

  get value() {
    return this.token.value
  }

  accept() {
    const varName = this.value
    if (!isStored(varName)) {
      throw new Error(`No variable ${varName} defined`)
    }

    return getVar(varName)
  }
   
}

module.exports = Var