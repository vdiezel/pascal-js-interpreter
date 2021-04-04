const TokenTypes = require('./TokenTypes')
const allowedOperators = [
  '+',
  '-',
  '*',
  '/',
  '(',
  ')'
]

class LexicalAnalyzer {

  constructor(text) {
    this.text = text
    this.currentChar = text[0]
    this.pos = 0
  }

  createToken(type, value) {
    return { type, value }
  }

  nextChar() {
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

  skipWhiteSpaces() {
    while (this.currentChar === ' ' && this.currentChar !== null) {
      this.nextChar()
    }
  }

  grabFullInteger() {
    // could be solved much shorter using regex but I don't know about performance here
    let res = ''
    while (this.isDigitString(this.currentChar)) {
      if (this.currentChar === '.') {
        foundDecimalSeperator = true
      }
      res += this.currentChar
      this.nextChar()
    }

    return res
  }

  getOperatorMap() {
    return {
      '+': TokenTypes.PLUS_OP,
      '-': TokenTypes.MINUS_OP,
      '*': TokenTypes.MULTIPLY_OP,
      '/': TokenTypes.DIVIDE_OP,
      '(': TokenTypes.L_PAREN,
      ')': TokenTypes.R_PAREN,
    }
  }

  getNextToken() {

    while (this.currentChar !== null) {

      if (this.currentChar === ' ') {
        this.skipWhiteSpaces()
        continue
      }

      if (this.isDigitString(this.currentChar)) 
        return this.createToken(TokenTypes.NUMBER, Number(this.grabFullInteger()))

      if (allowedOperators.includes(this.currentChar)) {
        const op = this.currentChar
        this.nextChar()
        return this.createToken(this.getOperatorMap()[op], op)
      }

      this.error()
    }

    return this.createToken(TokenTypes.EOF, null)
  }

}

module.exports = LexicalAnalyzer