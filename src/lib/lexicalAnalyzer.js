const Lexeme = require("./lexeme");
const { removeComments } = require("./utilities");

class LexicalAnalyzer {
	constructor(code) {
		const removedComments = removeComments(code);
		this.tokens = [];
		this.code = removedComments;
		this.lines = removedComments.split("\n");
		this.errorMessage = "";
	}

	data() {
		return !this.errorMessage
		? { tokens: this.tokens, lines: this.lines, code: this.code }
		: { error: this.errorMessage };
	}

	lexer(line, index) {
		for (let i = 0; i < line.length; i++) {
			let str = line.substring(i).trim();
			let match;
			if ((match = Lexeme.YARN.exec(str))) {
				this.tokens.push({
					lexeme: match[0].slice(1, -1),
					description: "String literal",
					line: index,
				});

				i += match[0].length;
				continue;
			}
			str = str.split(" ");
			if ((match = Lexeme.NUMBAR.exec(str[0])))
				this.tokens.push({
					lexeme: parseFloat(match[0]),
					description: "Float literal",
					line: index,
				});
			else if ((match = Lexeme.NUMBR.exec(str[0])))
				this.tokens.push({
					lexeme: parseInt(match[0]),
					description: "Integer literal",
					line: index,
				});
			else if ((match = Lexeme.WIN.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Bool literal",
					line: index,
				});
			else if ((match = Lexeme.FAIL.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Bool literal",
					line: index,
				});
			else if ((match = Lexeme.BTW.exec(str[0])) || (match = Lexeme.OBTW.exec(str[0])) || (match = Lexeme.TLDR.exec(str[0]))) {
				this.errorMessage = `Encountered unrecognized token '${match[0]}' while tokenizing at line ${index}`;
				break;
			}
			else if ((match = Lexeme.TYPE.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Variable type",
					line: index,
				});
			else if ((match = Lexeme.HAI.exec(str[0]))) {
				this.tokens.push({
					lexeme: match[0],
					description: "Start of the program",
					line: index,
				});
				let version;
				if ((version = Lexeme.NUMBAR.exec(str[1]))) {
					this.tokens.push({
						lexeme: version[0],
						description: "LOLCODE version",
						line: index,
					});
					i += match[0].length + version[0].length;
					continue;
				}
			}
			else if ((match = Lexeme.KTHXBYE.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "End of program",
					line: index,
				});
			else if ((match = Lexeme.IHASA.exec(`${str[0]} ${str[1]} ${str[2]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Variable declaration",
					line: index,
				});
			else if ((match = Lexeme.ITZ.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Variable initialization",
					line: index,
				});
			else if ((match = Lexeme.R.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Assigns value to a variable",
					line: index,
				});
			else if ((match = Lexeme.SUMOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Performs addition on expressions",
					line: index,
				});
			else if ((match = Lexeme.DIFFOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Performs subtraction on expressions",
					line: index,
				});
			else if ((match = Lexeme.PRODUKTOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Performs multiplication on expressions",
					line: index,
				});
			else if ((match = Lexeme.QUOSHUNTOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Performs division on expressions",
					line: index,
				});
			else if ((match = Lexeme.MODOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Performs modulo on expressions",
					line: index,
				});
			else if ((match = Lexeme.BIGGROF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description:
						"Comparison operator which returns the expression with the largest value",
					line: index,
				});
			else if ((match = Lexeme.SMALLROF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description:
						"Comparison operator which returns the expression with the smallest value",
					line: index,
				});
			else if ((match = Lexeme.BOTHOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Logical operator AND",
					line: index,
				});
			else if ((match = Lexeme.EITHEROF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Logical operator OR",
					line: index,
				});
			else if ((match = Lexeme.WONOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Logical operator XOR",
					line: index,
				});
			else if ((match = Lexeme.NOT.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Logical operator NOT",
					line: index,
				});
			else if ((match = Lexeme.ANYOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Logical operator OR with infinite arguments",
					line: index,
				});
			else if ((match = Lexeme.ALLOF.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Logical operator AND with infinite arguments",
					line: index,
				});
			else if ((match = Lexeme.BOTHSAEM.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Comparison operator for equality",
					line: index,
				});
			else if ((match = Lexeme.DIRRFRINT.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Comparison operator for inequality",
					line: index,
				});
			else if ((match = Lexeme.SMOOSH.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Concatenates strings",
					line: index,
				});
			else if ((match = Lexeme.MAEK.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Typecast indicator",
					line: index,
				});
			else if ((match = Lexeme.A.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Typecast argument",
					line: index,
				});
			else if ((match = Lexeme.ISNOWA.exec(`${str[0]} ${str[1]} ${str[2]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Typecast an identifier's value",
					line: index,
				});
			else if ((match = Lexeme.VISIBLE.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Standard output",
					line: index,
				});
			else if ((match = Lexeme.GIMMEH.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Standard input",
					line: index,
				});
			else if ((match = Lexeme.ORLY.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator IF start",
					line: index,
				});
			else if ((match = Lexeme.YARLY.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator THEN",
					line: index,
				});
			else if ((match = Lexeme.MEBBE.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator ELSE-IF",
					line: index,
				});
			else if ((match = Lexeme.NOWAI.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator ELSE",
					line: index,
				});
			else if ((match = Lexeme.OIC.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator end",
					line: index,
				});
			else if ((match = Lexeme.WTF.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator SWITCH start",
					line: index,
				});
			else if ((match = Lexeme.OMG.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator CASE",
					line: index,
				});
			else if ((match = Lexeme.GTFO.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Break statement",
					line: index,
				});
			else if ((match = Lexeme.OMGWTF.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Conditional operator default CASE",
					line: index,
				});
			else if ((match = Lexeme.IMINYR.exec(`${str[0]} ${str[1]} ${str[2]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Loop delimeter start",
					line: index,
				});
			else if ((match = Lexeme.UPPIN.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Increment loop variable",
					line: index,
				});
			else if ((match = Lexeme.NERFIN.exec(`${str[0]} ${str[1]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Decrement loop variable",
					line: index,
				});
			else if ((match = Lexeme.TIL.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Loop terminating condition until TRUE",
					line: index,
				});
			else if ((match = Lexeme.WILE.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Loop terminating condition until FALSE",
					line: index,
				});
			else if ((match = Lexeme.IMOUTTAYR.exec(`${str[0]} ${str[1]} ${str[2]}`)))
				this.tokens.push({
					lexeme: match[0],
					description: "Loop delimeter end",
					line: index,
				});
			else if ((match = Lexeme.MKAY.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Infinite arity end",
					line: index,
				});
			else if ((match = Lexeme.AN.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Operand separator",
					line: index,
				});
			else if ((match = Lexeme.VARIDENT.exec(str[0])))
				this.tokens.push({
					lexeme: match[0],
					description: "Variable identifier",
					line: index,
				});
			if (!match) {
				this.errorMessage = `Encountered unrecognized token '${str[0]}' while tokenizing at line ${index}`;
				break;
			}
			i += match[0].length;
		}
	}

	run() {
			for (let i = 0; i < this.lines.length; i++) {
				if (this.errorMessage) break;
				this.lexer(this.lines[i].trim(), i + 1);
			}
	}
}

module.exports = LexicalAnalyzer;
