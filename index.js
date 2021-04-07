const Interpreter = require('./src/Interpreter')
const LexicalAnalyzer = require('./src/LexicalAnalyzer')
const Parser = require('./src/Parser')
const { getTable } = require('./src/ADT')
const fs = require('fs');

fs.readFile('./src/programs/lecture_12.pas', 'utf8', function(err, data) {
    if (err) throw err;

    const lex = new LexicalAnalyzer(data)

    const parser = new Parser(lex)
    const interpreter = new Interpreter(parser)
    interpreter.interpret()

    console.log(getTable())
});

