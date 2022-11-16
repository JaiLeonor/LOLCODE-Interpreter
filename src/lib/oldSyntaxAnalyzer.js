class SyntaxAnalyzer {
	constructor(tokens) {
		this.tokens = tokens;
		this.errorMessage = "";
		this.stack = [];
		this.prevLine = 1;
	}

	data () {
		return { error: this.errorMessage };
	}

	//Do not put typecast in expression. Lagyan na lang ng special case sa assignment
	statement() {
		//If there's already an error, return
		if(this.errorMessage) return;

		//Check if tokens is empty
		if(this.tokens.length === 0) {
			this.errorMessage = `Expected KTHXBYE at: end of file`;
			return;
		}

		//Check if there are two statements in a line
		if(this.prevLine >= this.tokens[0].line) {
			this.errorMessage = `Unexpected token: ${this.tokens[0].lexeme} at line ${this.tokens[0].line}`;
			return;
		}

		this.prevLine = this.tokens[0].line;
		
		if(this.tokens[0].description === "End of program") {
			let start = this.stack.shift();
			
			if(start.description !== "Start of the program") this.errorMessage = `Expecting delimeter for token: ${start.lexeme} at line ${start.line}`;
			else if(start.line === this.tokens[0].line) this.errorMessage = `Unexpected token: ${start.lexeme} at line ${start.line}`;
			return;
		}
		else if(this.tokens[0].description === "Standard output") this.print();
		else if(this.tokens[0].description === "Loop delimeter start") this.loop();
		else if(this.tokens[0].description === "Variable declaration") this.declaration();
		else if(this.tokens[0].description === "Break statement") this.tokens.shift();
		else if(this.tokens[0].description === "Variable identifier") {
			if(this.tokens[1].description === "Assigns value to a variable") this.assignment();
			else if(this.tokens[1].description === "Typecast an identifier's value") this.typecast();
			else this.expression();
		}
		else if(this.tokens[0].description === "Typecast indicator") this.typecast();
		else if(this.tokens[0].description === "Float literal" || this.tokens[0].description === "Integer literal" || this.tokens[0].description === "String literal" || this.tokens[0].description === "Bool literal" || this.tokens[0].description === "Performs addition on expressions" || this.tokens[0].description === "Performs subtraction on expressions" || this.tokens[0].description === "Performs multiplication on expressions" || this.tokens[0].description === "Performs division on expressions" || this.tokens[0].description === "Performs modulo on expressions" || this.tokens[0].description === "Comparison operator which returns the expression with the largest value" || this.tokens[0].description === "Comparison operator which returns the expression with the smallest value" || this.tokens[0].description === "Logical operator AND" || this.tokens[0].description === "Logical operator OR" || this.tokens[0].description === "Logical operator NOT" || this.tokens[0].description === "Logical operator XOR" || this.tokens[0].description === "Logical operator OR with infinite arguments" || this.tokens[0].description === "Logical operator AND with infinite arguments" || this.tokens[0].description === "Comparison operator for equality" || this.tokens[0].description === "Comparison operator for inequality" || this.tokens[0].description === "Concatenates strings") this.expression();
		else if(this.tokens[0].description === "Conditional operator SWITCH start") this.switchCase();
		else if(this.tokens[0].description === "Conditional operator IF start") this.ifBlock();
		else if(this.tokens[0].description === "Standard input") this.input();
		else this.errorMessage = `Unexpected token: ${this.tokens[0].lexeme} at line ${this.tokens[0].line}`;

		this.statement();
	}

	//Statement subgroup
	expression() {
		//If there's already an error, return
		if(this.errorMessage) return;

		if(this.tokens[0].line !== this.prevLine) {
			this.errorMessage = `Expected expression at line ${this.prevLine}`;
			return;
		}

		if(this.tokens[0].description === "Variable identifier") this.tokens.shift();
		else if(this.literal()) this.tokens.shift();
		else if(this.tokens[0].description === "Performs addition on expressions") this.add();
		else if(this.tokens[0].description === "Performs subtraction on expressions") this.sub();
		else if(this.tokens[0].description === "Performs multiplication on expressions") this.mul();
		else if(this.tokens[0].description === "Performs division on expressions") this.div();
		else if(this.tokens[0].description === "Performs modulo on expressions") this.mod();
		else if(this.tokens[0].description === "Comparison operator which returns the expression with the largest value") this.greater();
		else if(this.tokens[0].description === "Comparison operator which returns the expression with the smallest value") this.less();
		else if(this.tokens[0].description === "Logical operator AND") this.both();
		else if(this.tokens[0].description === "Logical operator OR") this.either();
		else if(this.tokens[0].description === "Logical operator NOT") this.not();
		else if(this.tokens[0].description === "Logical operator XOR") this.xor();
		else if(this.tokens[0].description === "Logical operator OR with infinite arguments") this.any();
		else if(this.tokens[0].description === "Logical operator AND with infinite arguments")this.all();
		else if(this.tokens[0].description === "Comparison operator for equality") this.equals();
		else if(this.tokens[0].description === "Comparison operator for inequality") this.notEquals();
		else if(this.tokens[0].description === "Concatenates strings") this.concat();
		else {
			this.errorMessage = `Expected expression at line ${this.prevLine}`;
			return;
		}
	}

	print() {
		//Remove operator
		this.tokens.shift();
		while(this.prevLine === this.tokens[0].line)
			this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		this.an();
	}

	loop() {
		//Remove IM IN YR
		this.prevLine = this.tokens.shift().line;

		if(this.tokens[0].description !== "Variable identifier") {
			this.errorMessage = `Expected identifier at line ${this.prevLine}`;
			return;
		}

		//Remove label
		this.tokens.shift();

		if(this.tokens[0].description === "Increment loop variable" || this.tokens[0].description === "Decrement loop variable") {
			//Remove loop operator
			this.tokens.shift();

			if(this.tokens[0].description !== "Variable identifier") {
				this.errorMessage = `Expected identifier at line ${this.prevLine}`;
				return;
			}

			//Remove varident
			this.tokens.shift();

			if(this.tokens[0].description === "Loop terminating condition until TRUE" || this.tokens[0].description === "Loop terminating condition until FALSE") {
				//Remove loop terminating condition
				this.tokens.shift();

				this.expression();

				//Check if an error occured
				if(this.errorMessage) return;
			}

			this.statement();

			if(this.errorMessage === `Unexpected token: IM OUTTA YR at line ${this.prevLine}`) {
				this.errorMessage = "";

				this.tokens.shift();

				if(this.tokens[0].description !== "Variable identifier") {
					this.errorMessage = `Expected identifier at line ${this.prevLine}`;
					return;
				}

				this.tokens.shift();
			}
		}
		else {
			this.errorMessage = `Expected loop operator at line ${this.prevLine}`;
			return;
		}
	}

	typecast() {
		if(this.tokens[0].description === "Variable identifier") {
			this.tokens.splice(0, 2);

			if(this.tokens[0].description !== "Variable type") {
				this.errorMessage = `Expected variable type at line ${this.prevLine}`;
				return;
			}

			this.tokens.shift();
		}
		else if(this.tokens[0].description === "Typecast indicator") {
			this.tokens.shift();

			this.expression();

			//Check if an error occured
			if(this.errorMessage) return;

			if(this.tokens[0].description === "Typecast argument") this.tokens.shift();

			if(this.tokens[0].description !== "Variable type") {
				this.errorMessage = `Expected variable type at line ${this.prevLine}`;
				return;
			}

			this.tokens.shift();
		}
	}

	declaration() {
		//Remove operator
		this.tokens.shift();
		if(this.tokens[0].description !== "Variable identifier") {
			this.errorMessage = `Expected variable identifier at line: ${this.prevLine}`;
			return;
		}

		//Remove varident
		this.tokens.shift();

		//Check if the next token is ITZ
		if(this.tokens[0].description === "Variable initialization") {
			//Remove ITZ
			this.tokens.shift();

			this.expression();
		}
	}

	assignment() {
		//Remove varident and R
		this.tokens.splice(0, 2);

		if(this.tokens[0].description === "Typecast indicator") {
			//Remove MAEK
			this.tokens.shift();

			if(this.tokens[0].description !== "Variable identifier") {
				this.errorMessage = `Expected variable identifier at line: ${this.prevLine}`;
				return;
			}

			//Remove varident
			this.tokens.shift();

			if(this.tokens[0].description === "Typecast argument") this.tokens.shift();

			if(this.tokens[0].description !== "Variable type") {
				this.errorMessage = `Expected variable type at line ${this.prevLine}`;
				return;
			}

			this.tokens.shift();
		}
		else if(this.tokens[0].description === "Typecast an identifier's value") {
			//Remove IS NOW A
			this.tokens.shift();

			if(this.tokens[0].description !== "Variable type") {
				this.errorMessage = `Expected variable type at line ${this.prevLine}`;
				return;
			}

			this.tokens.shift();
		}
		else this.expression();
	}

	switchCase() {
		//Remove delimeter
		this.tokens.shift();

		if(this.prevLine >= this.tokens[0].line) {
			this.errorMessage = `Unxpected token: ${this.tokens[0].lexeme} at line ${this.prevLine}`;
			return;
		}

		if(this.tokens[0].description === "Conditional operator CASE") {
			this.prevLine = this.tokens.shift().line;
			if(this.literal()) {
				this.tokens.shift();

				this.statement();
				this.switchBlock();
			}
			else {
				this.errorMessage = `Expected value literal at line ${this.prevLine}`;
				return;
			}
		}
		else {
			this.errorMessage = `Expected token: OMG at line ${this.prevLine}`;
			return;
		}
	}

	switchBlock() {
		if(this.errorMessage === `Unexpected token: OIC at line ${this.prevLine}`) {
			this.tokens.shift();
			this.errorMessage = "";
			return;
		}
		else if(this.errorMessage === `Unexpected token: OMG at line ${this.prevLine}` || this.errorMessage === `Unexpected token: OMGWTF at line ${this.prevLine}`) {
			this.errorMessage = "";

			//Check if OMG or OMGWTF
			if(this.tokens[0].description === "Conditional operator CASE") {
				this.prevLine = this.tokens.shift().line;
				if(this.literal()) {
					this.tokens.shift();
				}
				else {
					this.errorMessage = `Expected value literal at line ${this.prevLine}`;
					return;
				}
			}
			else if(this.tokens[0].description === "Conditional operator default CASE") {
				this.prevLine = this.tokens.shift().line;
			}
			else {
				this.errorMessage = `Expected conditional operator at line ${this.prevLine}`;
				return;
			}

			this.statement();
			this.switchBlock();
		}
	}

	ifBlock() {
		//Remove delimiter
		this.tokens.shift();

		if(this.prevLine >= this.tokens[0].line) {
			this.errorMessage = `Unxpected token: ${this.tokens[0].lexeme} at line ${this.prevLine}`;
			return;
		}

		this.prevLine = this.tokens[0].line;

		if(this.tokens[0].description !== "Conditional operator THEN") {
			this.errorMessage = `Expected token: YA RLY at line ${this.prevLine}`;
			return;
		}

		this.tokens.shift();

		if(this.tokens[0].description === "Conditional operator end") {
			this.errorMessage = `Expected statement at line ${this.prevLine + 1}`
			return;
		}

		this.statement();

		if(this.errorMessage === `Unexpected token: NO WAI at line ${this.prevLine}`) {
			this.errorMessage = '';
			this.tokens.shift();

			if(this.tokens[0].description === "Conditional operator end") {
				this.errorMessage = `Expected statement at line ${this.prevLine + 1}`
				return;
			}

			this.statement();
		}

		if(this.errorMessage === `Unexpected token: OIC at line ${this.prevLine}`) {
			this.errorMessage = '';
			this.tokens.shift();
		}
	}

	input() {
		//Remove operator
		this.tokens.shift();
		if(this.tokens[0].description === "Variable identifier") this.tokens.shift();
		else this.errorMessage = `Expected variable identifier at line ${this.prevLine}`;
	}

	//Expression subgroup
	equals() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	both() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	either() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	notEquals() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	greater() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	less() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	add() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	sub() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	mul() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	div() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	mod() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	all() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		this.an();

		//Check if an error occured
		if(this.errorMessage) return;

		if(this.tokens[0].description !== "Infinite arity end") {
			this.errorMessage = `Expected token: MKAY at line ${this.prevLine}`;
			return;
		}
		//Remove MKAY
		this.tokens.shift();
	}

	any() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		this.an();

		//Check if an error occured
		if(this.errorMessage) return;

		if(this.tokens[0].description !== "Infinite arity end") {
			this.errorMessage = `Expected token: MKAY at line ${this.prevLine}`;
			return;
		}
		//Remove MKAY
		this.tokens.shift();
	}

	not() {
		//Remove operator
		this.tokens.shift();
		this.expression();
	}

	xor() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		//Check if the next token is AN
		if(this.tokens[0].description !== "Operand separator") {
			this.errorMessage = `Expected token: AN at line ${this.prevLine}`;
			return;
		}
		//Remove operator separator
		this.tokens.shift();
		this.expression();
	}

	concat() {
		//Remove operator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		this.an();
	}

	literal() {
		if(this.tokens[0].description === "Float literal" || this.tokens[0].description === "Integer literal" || this.tokens[0].description === "String literal" || this.tokens[0].description === "Bool literal") return true;
	}

	an() {
		if(this.tokens[0].description !== "Operand separator") return;

		//Remove operator separator
		this.tokens.shift();
		this.expression();

		//Check if an error occured
		if(this.errorMessage) return;

		this.an();
	}

	run() {
		// console.log(this.tokens);
		//Check if the first token is HAI
		if(this.tokens[0].description !== "Start of the program") this.errorMessage = `Unexpected token: ${this.tokens[0].lexeme} at line ${this.tokens[0].line}`;

		else {
			//Push HAI to stack and delete it from tokens list
			this.stack.unshift(this.tokens[0]);
			this.tokens.shift(this.tokens);

			//If there's a lolcode version, ignore it
			if(this.tokens[0].description === "LOLCODE version") this.tokens.shift(this.tokens);

			this.statement(0);
		}
	}
}

module.exports = SyntaxAnalyzer;
