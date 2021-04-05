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

  static get ALLOWED_KEYWORDS() {
    return [
      TokenTypes.BEGIN, 
      TokenTypes.END,
    ]
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

  isDigitString(char) {
    return /\d/.test(char)
  }

  isAlphaNumeric(char) {
    return /[0-9a-z]/i.test(char)
  }

  isAlphabeticalLetter(char) {
    return /[a-z]/i.test(char)
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
      res += this.currentChar
      this.nextChar()
    }

    return res
  }

  _id() {
    let res = ''
    while (this.isAlphaNumeric(this.currentChar)) {
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

  peak() {
    const peekPos = this.pos + 1
    if (peekPos > (this.text.length - 1)) {
      return null
    }
    return this.text[peekPos]
  }

  getNextToken() {

    while (this.currentChar !== null) {

      if (this.isAlphabeticalLetter(this.currentChar)) {
        const res = this._id()
        if (LexicalAnalyzer.ALLOWED_KEYWORDS.includes(res)) {
          return this.createToken(res, res)
        }

        return this.createToken(TokenTypes.ID, res)
      }

      if (this.currentChar === ':' && this.peak() === '=') {
        this.nextChar()
        this.nextChar()
        return this.createToken(TokenTypes.ASSIGN, ':=')
      }

      if (this.currentChar === ';') {
        this.nextChar()
        return this.createToken(TokenTypes.SEMI, ';')
      }

      if (this.currentChar === '.') {
        this.nextChar()
        return this.createToken(TokenTypes.DOT, '.')
      }

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