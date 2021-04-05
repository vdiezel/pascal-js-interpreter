const Interpreter = require('./src/Interpreter')
const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')

const lex = new LexicalAnalyzer('--2')
const parser = new Parser(lex)
const interpreter = new Interpreter(parser)
const res = interpreter.interpret()

console.log(res)