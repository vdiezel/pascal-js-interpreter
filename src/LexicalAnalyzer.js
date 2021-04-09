const { LexerError } = require('./Error')
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
    this.lineno = 1
    this.column = 1
  }

  static get ALLOWED_KEYWORDS() {
    return [
      TokenTypes.BEGIN, 
      TokenTypes.END,
      TokenTypes.VAR,
      TokenTypes.DIV,
      TokenTypes.REAL,
      TokenTypes.INTEGER,
      TokenTypes.PROGRAM,
      TokenTypes.PROCEDURE,
    ]
  }

  createToken(type, value) {
    return { type, value, lineno: this.lineno, column: this.column }
  }

  nextChar() {
    this.pos += 1
    if (this.pos === this.text.length) {
      this.currentChar = null
    } else {
      this.currentChar = this.text[this.pos]
      this.column += 1
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

  isUnderScore(char) { return char === '_' }

  error() {
    const message = `Unexpected character on ${this.currentChar} line: ${this.lineno} column ${this.column}`
    throw new LexerError({ message })
  }

  skipWhiteSpaces() {
    while (this.currentChar === ' ' && this.currentChar !== null) {
      this.nextChar()
    }
  }

  skipComments() {
    while (this.currentChar !== '}') {
      this.nextChar()
    }
    this.nextChar()
  }

  skipNewlineCharacters() {
    while (this.currentChar === '\n' && this.currentChar !== null) {
      this.nextChar()
      this.lineno += 1
      this.column = 0
    }
  }

  grabNumericalSequence() {
    let res = ''
    while (this.isDigitString(this.currentChar)) {
      res += this.currentChar
      this.nextChar()
    }

    return res
  }

  number() {
    let res = this.grabNumericalSequence()

    if (this.currentChar === '.') {
      res += this.currentChar
      this.nextChar()
      res += this.grabNumericalSequence()

      return this.createToken(TokenTypes.REAL_CONST, Number(res))
    } 

    return this.createToken(TokenTypes.INTEGER_CONST, Number(res))
  }

  _id() {
    let res = ''
    while (this.isAlphaNumeric(this.currentChar) || (res.length === 0 && this.isUnderScore(this.currentChar))) {
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

      if (this.currentChar === ' ') {
        this.skipWhiteSpaces()
        continue
      }

      if (this.currentChar === '\n') {
        this.skipNewlineCharacters()
        continue
      }

      if (this.currentChar === '{') {
        this.nextChar()
        this.skipComments()
        continue
      }

      if (this.isAlphabeticalLetter(this.currentChar) || this.isUnderScore(this.currentChar)) {
        const res = this._id().toUpperCase()
        if (LexicalAnalyzer.ALLOWED_KEYWORDS.includes(res)) {

          if (res === 'DIV') {
            return this.createToken(TokenTypes.INT_DIVIDE_OP, TokenTypes.INT_DIVIDE_OP)
          }

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

      if (this.currentChar === ':') {
        this.nextChar()
        return this.createToken(TokenTypes.COLON, ':')
      }

      if (this.currentChar === ',') {
        this.nextChar()
        return this.createToken(TokenTypes.COMMA, ':')
      }

      if (this.isDigitString(this.currentChar)) 
        return this.number()

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