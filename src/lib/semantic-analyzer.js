const Lexeme = require("./lexeme");

class SemanticAnalyzer {
	constructor(tokens) {
		this.tokens = tokens;
		this.symbolTable = [];
		this.variables = [];
	}
	data() {
		return {
			symbolTable: this.symbolTable,
			variables: this.variables,
		};
	}
	isLiteral(i) {
		if (
			i.match(Lexeme.NUMBR) ||
			i.match(Lexeme.NUMBAR) ||
			i.match(Lexeme.YARN) ||
			i.match(Lexeme.WIN) ||
			i.match(Lexeme.FAIL)
		)
			return true;
		return false;
	}

	whatType(literal) {
		if (literal.match(Lexeme.NUMBR)) return "Int";
		else if (literal.match(Lexeme.NUMBAR)) return "Float";
		else if (literal.match(Lexeme.YARN)) return "String";
		else if (literal.match(Lexeme.WIN)) return "Bool";
		else if (literal.match(Lexeme.FAIL)) return "Bool";
	}

	toTroof(variable) {
		if (variable === "NOOB") return 0;
		else if (variable === "FAIL") return 0;
		else if (variable === "") return 0;
		else if (variable === 0) return 0;
		else return 1;
	}

	executeCommandStack(stack) {
		for (let i = stack.length - 1; i > -1; i--) {
			if (this.isLiteral(stack[i])) continue;
			else if (stack[i] === "AN") {
				if (i + 1 === stack.length || !this.isLiteral(stack[i + 1])) {
					console.log("Expected expression");
					return true;
				}
				stack[i] = stack[i + 1];
			} else if (stack[i] === "ADD") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = x + y;
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === "SUB") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = x - y;
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === "MUL") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = x * y;
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === "DIV") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = x / y;
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === "MOD") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = x % y;
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === ">") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = Math.max(x, y);
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === "<") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = Number(stack[i + 1]);
					y = Number(stack[i + 2]);
					stack[i] = Math.min(x, y);
				} catch (e) {
					console.log("Cannot typecast to int");
					return true;
				}
			} else if (stack[i] === "&&") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = this.toTroof(stack[i + 1]);
					y = this.toTroof(stack[i + 2]);
					stack[i] = x && y;
				} catch (e) {
					console.log("Cannot typecast to bool");
					return true;
				}
			} else if (stack[i] === "||") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = this.toTroof(stack[i + 1]);
					y = this.toTroof(stack[i + 2]);
					stack[i] = x || y;
				} catch (e) {
					console.log("Cannot typecast to bool");
					return true;
				}
			} else if (stack[i] === "^") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = this.toTroof(stack[i + 1]);
					y = this.toTroof(stack[i + 2]);
					stack[i] = x ^ y;
				} catch (e) {
					console.log("Cannot typecast to bool");
					return true;
				}
			} else if (stack[i] === "!") {
				let x, y;
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				try {
					x = this.toTroof(stack[i + 1]);
					stack[i] = !x;
				} catch (e) {
					console.log("Cannot typecast to bool");
					return true;
				}
			} else if (stack[i] === "===") {
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				stack[i + 1] === stack[i + 2] ? (stack[i] = 1) : (stack[i] = 0);
			} else if (stack[i] === "!==") {
				if (i + 2 === stack.length) {
					console.log("Invalid number of arguments");
					return true;
				}
				stack[i + 1] !== stack[i + 2] ? (stack[i] = 1) : (stack[i] = 0);
			} else if (stack[i] === "ASSIGN") {
				if (i + 1 === stack.length) {
					console.log("Expected expression");
					return true;
				}
				if (!this.variables.includes(stack[i - 1])) {
					this.variables.push(stack[i - 1]);
					this.symbolTable.push({
						variableName: stack[i - 1],
						type: this.whatType(stack[i + 1]),
						value: stack[i + 1],
					});
				} else {
					console.log("Variable already exists");
					return true;
				}
				return false;
			} else if (stack[i] === "DECLARE") {
				if (i + 1 === stack.length) {
					console.log("Expected expression");
					return true;
				}
				if (!this.variables.includes(stack[i + 1])) {
					this.variables.push(stack[i + 1]);
					this.symbolTable.push({
						variableName: stack[i + 1],
						type: null,
						value: null,
					});
				} else {
					console.log("Variable already exists");
					return true;
				}
				return false;
			} else if (this.isLiteral(stack[i])) continue;
			else if (stack[i].match(Lexeme.VARIDENT)) {
				if (this.variables.includes(stack[i])) {
					for (let j = 0; j < this.symbolTable.length; j++)
						if (this.symbolTable[j].variableName === stack[i])
							stack[i] = this.symbolTable[j].value;
				}
			}
		}
		console.log(stack);
		if (stack.length !== 0) return true;
		return false;
	}
	main() {
		let line = 1;
		let commandStack = [];

		// let variables = ["IT"];
		let match;
		for (let i = 0; i < this.tokens.length; i++) {
			const token = this.tokens[i];
			console.log(token);
			if (token.line === line) {
				if (token.lexeme === "SUM OF") commandStack.push("ADD");
				else if (token.lexeme === "DIFF OF") commandStack.push("SUB");
				else if (token.lexeme === "PRODUKT OF") commandStack.push("MUL");
				else if (token.lexeme === "QUOSHUNT OF") commandStack.push("DIV");
				else if (token.lexeme === "MOD OF") commandStack.push("MOD");
				else if (token.lexeme === "BIGGR OF") commandStack.push(">");
				else if (token.lexeme === "SMALLR OF") commandStack.push("<");
				else if (token.lexeme === "BOTH OF") commandStack.push("&&");
				else if (token.lexeme === "EITHER OF") commandStack.push("||");
				else if (token.lexeme === "WON OF") commandStack.push("^");
				else if (token.lexeme === "NOT") commandStack.push("!");
				else if (token.lexeme === "ANY OF") commandStack.push("ANY");
				else if (token.lexeme === "ALL OF") commandStack.push("ALL");
				else if (token.lexeme === "BOTH SAEM") commandStack.push("===");
				else if (token.lexeme === "DIFFRINT") commandStack.push("!==");
				else if (token.lexeme === "SMOOSH") commandStack.push("CONCAT");
				else if (token.lexeme === "MAEK") commandStack.push("MAEK");
				else if (token.lexeme === "IS NOW A") commandStack.push("IS NOW A");
				else if (token.lexeme === "I HAS A") commandStack.push("DECLARE");
				else if (token.lexeme === "ITZ") commandStack.push("ASSIGN");
				else if (token.lexeme === "VISIBLE") commandStack.push("STDOUT");
				else if (token.lexeme === "GIMMEH") commandStack.push("STDIN");
				else if (token.lexeme === "AN") commandStack.push("AN");
				else if ((match = token.lexeme.match(Lexeme.VARIDENT)))
					commandStack.push(match[0]);
				// else if (tokens[i].lexeme === "O RLY?") commandStack.push("IF-START")
				// else if (tokens[i].lexeme === "YA RLY") commandStack.push("THEN")
				// else if (tokens[i].lexeme === "NO WAI") commandStack.push("ELSE")
				// else if (tokens[i].lexeme === "OIC") commandStack.push("IF-END")
			} else {
				if (this.executeCommandStack(commandStack)) break;
				line++;
			}
		}
	}
}

module.exports = SemanticAnalyzer;
