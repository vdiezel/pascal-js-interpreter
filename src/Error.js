const ERROR_CODES = {
  UNEXPECTED_TOKEN: 'Unexpected token found',
  ID_NOT_FOUND: 'Identifier not found',
  DUPLICATE_ID: 'Duplicate id found',
  WRONG_ARGUMENT_NUMBER: 'Number of passed arguments does not match the defined parameters',
}

class CustomError extends Error {

  constructor({ errorCode = null, token = null, message = null } = {}) {
      super()
      this.errorCode = errorCode
      this.token = token
      this.message = message
  }

}

class LexerError extends CustomError { }

class ParserError extends CustomError { }

class SemanticError extends CustomError { }


module.exports = {
  LexerError,
  ParserError,
  SemanticError,
  ERROR_CODES,
}