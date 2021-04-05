const Interpreter = require('./src/Interpreter')
const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')
const { getTable } = require('./src/ADT')

const lex = new LexicalAnalyzer('BEGIN BEGIn numbeR := 2; _a := Number; b := 10 * _a + 10 * number / 4; c := _a - - b END; x := 11; END.')

const parser = new Parser(lex)
const interpreter = new Interpreter(parser)
interpreter.interpret()

console.log(getTable())