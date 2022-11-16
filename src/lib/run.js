const fs = require("fs");
const LexicalAnalyzer = require("./lexicalAnalyzer");
const SyntaxAnalyzer = require("./syntaxAnalyzer");
const SemanticAnalyzer = require("./semanticAnalyzer");

const sample = fs.readFileSync("./input.lol", "utf-8");
const lex = new LexicalAnalyzer(sample);

lex.run();
// console.log(lex.data().error);
// console.log(lex.data().tokens ? lex.data().tokens : lex.data().error);
if (!lex.data().error) {
	const tokens = lex.data().tokens
	const syntax = new SyntaxAnalyzer([...tokens]);
	syntax.run();
	if(!syntax.data().error) {
		console.log(tokens)
		//execute
		const semantic = new SemanticAnalyzer([...tokens]);
		semantic.run();
		console.log(semantic.data());
		// if(semantic.data().error) console.log(semantic.data().error);
	}
	else console.log(syntax.data().error);
}
else console.log(lex.data().error);
