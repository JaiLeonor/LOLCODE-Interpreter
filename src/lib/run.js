const fs = require("fs");
const LexicalAnalyzer = require("./lexicalAnalyzer");
const SyntaxAnalyzer = require("./syntax-analyzer");
// const sample =
// 	'HAI 1.2\nI HAS A food ITZ "111.00033"\nVISIBLE food\nBTW this is how we do type casting\nMAEK food A NUMBAR\nVISIBLE food\nKTHXBYE';

try {
	const sample = fs.readFileSync("./input.lol", "utf-8");
	const lex = new LexicalAnalyzer(sample);

	lex.run();
	console.log(lex.data());
	const { code } = lex.data();
	const syntax = new SyntaxAnalyzer(code);
	syntax.parse();
} catch (error) {
	console.log(error);
}
