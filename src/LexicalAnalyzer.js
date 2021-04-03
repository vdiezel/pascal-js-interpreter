const TokenTypes = require('./TokenTypes')
const allowedOperators = [
  '+',
  '-',
  '*',
  '/',
]

class LexicalAnalyzer {

  constructor(text) {
    this.text = text.replace(' ', '')
    this.currentChar = text[0]
    this.pos = 0
    this.tokens = []
  }

  createToken(type, value) {
    return { type, value }
  }

  next() {
    this.pos += 1
    if (this.pos === this.text.length) {
      this.currentChar = null
    } else {
      this.currentChar = this.text[this.pos]
    }

  }

  isDigitString(str) {
    return /\d/.test(str)
  }

  error() {
    throw new Error(`Syntax error at ${this.currentChar}`)
  }

  grabFullNumber() {
    // could be solved much shorter using regex but I don't know about performance here
    let res = ''
    let foundDecimalSeperator = false
    while (this.isDigitString(this.currentChar) || (this.currentChar === '.' && !foundDecimalSeperator) ) {
      if (this.currentChar === '.') {
        foundDecimalSeperator = true
      }
      res += this.currentChar
      this.next()
    }

    return res
  }

  getOperatorMap() {
    return {
      '+': TokenTypes.PLUS_OP,
      '-': TokenTypes.MINUS_OP,
      '*': TokenTypes.MULTIPLY_OP,
      '/': TokenTypes.DIVIDE_OP,
    }
  }

  run() {
    while (this.currentChar !== null) {

      if (this.isDigitString(this.currentChar)) {
        this.tokens.push(this.createToken(TokenTypes.NUMBER, Number(this.grabFullNumber())))
        continue
      }

      if (allowedOperators.includes(this.currentChar)) {
        this.tokens.push(this.createToken(TokenTypes.NUMBER, this.currentChar))
        this.next()
        continue
      }

      this.error()
    }

    this.tokens.push(this.createToken(TokenTypes.EOF, null))
  }

}

module.exports = LexicalAnalyzer