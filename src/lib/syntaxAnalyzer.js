class SyntaxAnalyzer {
	constructor(tokens) {
		this.tokens = tokens;
		this.errorMessage = "";
		this.prevLine = 1;
	}

	data () {
		return { error: this.errorMessage };
	}

	code(type) {
		let delimeters = {
			MAIN: ["End of program"],
			IF: ["Conditional operator end", "Conditional operator ELSE-IF", "Conditional operator ELSE"],
			ELSE: ["Conditional operator end"],
			CASE: ["Conditional operator end", "Conditional operator CASE", "Conditional operator default CASE"],
			LOOP: ["Loop delimeter end"]
		};

		while(true) {
			//If there's already an error, return
			if(this.errorMessage) return;

			//Check if tokens is empty
			if(this.tokens.length === 0) {
				this.errorMessage = `Expected ${delimeters[type][0]} after line: ${this.prevLine}`;
				return;
			}

			//Check if there are two statements in a line(lookbehind)
			if(this.prevLine >= this.tokens[0].line) {
				this.errorMessage = `Unexpected token: ${this.tokens[0].lexeme} at line ${this.tokens[0].line}`;
				return;
			}

			if(delimeters[type].indexOf(this.tokens[0].description) > -1) {
				this.prevLine = this.tokens[0].line;
				if(this.tokens[0].description === "End of program" || this.tokens[0].description === "Conditional operator end") {
					//Check if delimeter is alone in the line

					if(!!this.tokens[1] && this.prevLine >= this.tokens[1].line) {
						this.errorMessage = `Unexpected token: ${this.tokens[1].lexeme} at line ${this.tokens[1].line}`;
						return;
					}
				}

				return;
			}

			this.prevLine = this.tokens[0].line;

			this.statement();
		}
	}

	//Do not put typecast in expression. Lagyan na lang ng special case sa assignment
	statement() {
		if(this.tokens[0].description === "Standard output") this.print();
		else if(this.tokens[0].description === "Loop delimeter start") this.loop();
		else if(this.tokens[0].description === "Variable declaration") this.declaration();
		else if(this.tokens[0].description === "Break statement") this.tokens.shift();
		else if(this.tokens[0].description === "Variable identifier") {
			if(this.tokens[1].description === "Assigns value to a variable") this.assignment();
			else if(this.tokens[1].description === "Typecast an identifier's value") this.recast();
			else this.expression();
		}
		else if(this.tokens[0].description === "Typecast indicator" || this.tokens[0].description === "Float literal" || this.tokens[0].description === "Integer literal" || this.tokens[0].description === "String literal" || this.tokens[0].description === "Bool literal" || this.tokens[0].description === "Performs addition on expressions" || this.tokens[0].description === "Performs subtraction on expressions" || this.tokens[0].description === "Performs multiplication on expressions" || this.tokens[0].description === "Performs division on expressions" || this.tokens[0].description === "Performs modulo on expressions" || this.tokens[0].description === "Comparison operator which returns the expression with the largest value" || this.tokens[0].description === "Comparison operator which returns the expression with the smallest value" || this.tokens[0].description === "Logical operator AND" || this.tokens[0].description === "Logical operator OR" || this.tokens[0].description === "Logical operator NOT" || this.tokens[0].description === "Logical operator XOR" || this.tokens[0].description === "Logical operator OR with infinite arguments" || this.tokens[0].description === "Logical operator AND with infinite arguments" || this.tokens[0].description === "Comparison operator for equality" || this.tokens[0].description === "Comparison operator for inequality" || this.tokens[0].description === "Concatenates strings") this.expression();
		else if(this.tokens[0].description === "Conditional operator SWITCH start") this.switchCase();
		else if(this.tokens[0].description === "Conditional operator IF start") this.ifBlock();
		else if(this.tokens[0].description === "Standard input") this.input();
		else this.errorMessage = `Unexpected token: ${this.tokens[0].lexeme} at line ${this.tokens[0].line}`;
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
		else if(this.tokens[0].description === "Typecast indicator") this.typecast();
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
		while(this.prevLine === this.tokens[0].line) {
			if(this.errorMessage) return;
			this.expression();
		}
	}

	loop() {
		//Remove IM IN YR
		this.prevLine = this.tokens.shift().line;

		if(this.tokens[0].description !== "Variable identifier") {
			this.errorMessage = `Expected identifier at line ${this.prevLine}`;
			return;
		}

		//Remove label
		let label = this.tokens.shift().lexeme;

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

			this.code("LOOP");

			if(this.errorMessage) return;

			//Remove IMM OUTTA YR
			this.prevLine = this.tokens.shift().line;

			if(this.tokens[0].description !== "Variable identifier") {
				this.errorMessage = `Expected identifier at line ${this.prevLine}`;
				return;
			}

			if(label !== this.tokens.shift().lexeme) {
				this.errorMessage = `Expected identifier at line ${this.prevLine}`;
			}
		}
		else {
			this.errorMessage = `Expected loop operator at line ${this.prevLine}`;
			return;
		}
	}

	recast() {
		this.tokens.splice(0, 2);

		if(this.tokens[0].description !== "Variable type") {
			this.errorMessage = `Expected variable type at line ${this.prevLine}`;
			return;
		}

		this.tokens.shift();
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

		this.expression();
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

				this.code("CASE");
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
		while(this.tokens[0].description !== "Conditional operator end") {
			if(this.errorMessage) return;

			if(this.tokens[0].description === "Conditional operator CASE") {
				this.prevLine = this.tokens.shift().line;
				if(this.literal()) {
					this.tokens.shift();
	
					this.code("CASE");
				}
				else {
					this.errorMessage = `Expected value literal at line ${this.prevLine}`;
					return;
				}
			}

			else if(this.tokens[0].description === "Conditional operator default CASE") {
				this.prevLine = this.tokens.shift().line;

				this.code("ELSE");
			}
		}

		//Remove OIC
		this.prevLine = this.tokens.shift().line;
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

		this.code("IF");
		while(this.tokens[0].description !== "Conditional operator end") {
			if(this.errorMessage) return;

			if(this.tokens[0].description === "Conditional operator ELSE-IF") {
				//Remove MEBBE
				this.prevLine = this.tokens.shift().line;

				//Expect expression
				this.expression();
				this.code("IF");
			}
			else if(this.tokens[0].description === "Conditional operator ELSE") {
				//Remove NO WAI
				this.prevLine = this.tokens.shift().line;
				
				this.code("ELSE");
			}
		}

		//Remove OIC
		this.prevLine = this.tokens.shift().line;
	}

	input() {
		//Remove operator
		this.tokens.shift();
		if(this.tokens[0].description === "Variable identifier") this.tokens.shift();
		else this.errorMessage = `Expected variable identifier at line ${this.prevLine}`;
	}

	//Expression subgroup
	typecast() {
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
		//Check if file has tokens
		if(this.tokens.length === 0) this.errorMessage = `Expected token: HAI at line 1`;
		
		//Check if the first token is HAI
		else if(this.tokens[0].description !== "Start of the program") this.errorMessage = `Unexpected token: ${this.tokens[0].lexeme} at line ${this.tokens[0].line}`;

		else {
			this.tokens.shift(this.tokens);

			//If there's a lolcode version, ignore it
			if(this.tokens[0].description === "LOLCODE version") this.tokens.shift(this.tokens);

			this.code("MAIN");
		}
	}
}

export { SyntaxAnalyzer };
