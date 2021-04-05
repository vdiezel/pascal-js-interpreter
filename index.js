const Interpreter = require('./src/Interpreter')
const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')
const { getTable } = require('./src/ADT')

const lex = new LexicalAnalyzer('BEGIN BEGIN number := 2; a := number; b := 10 * a + 10 * number / 4; c := a - - b END; x := 11; END.')

const parser = new Parser(lex)
const interpreter = new Interpreter(parser)
interpreter.interpret()

console.log(getTable())