class SemanticAnalyzer {
	constructor(tokens) {
		this.tokens = tokens;
		this.symbolTable = {};
		this.errorMessage = "";
	}
	data() {
		return {
			symbolTable: this.symbolTable,
			error: this.errorMessage,
		};
	}

	toYarn(variable) {
		if(typeof variable === 'string') return variable;

		if(variable === null) return "";

		if(typeof variable === 'boolean') return variable ? "WIN" : "FAIL";

		return `${variable}`;
	}

	toNumbr(variable) {
		if(typeof variable === 'number') return variable;

		if(typeof variable === 'string') return !!parseInt(variable) ? parseInt(variable) : 0;

		return variable ? 1 : 0;
	}

	toNumbar(variable) {
		if(typeof variable === 'number') return variable;

		if(typeof variable === 'string') return !!parseFloat(variable) ? parseFloat(variable) : 0.00;

		return variable ? 1.00 : 0.00;
	}

	typecast(type, input) {
		if(type === "YARN") return(this.toYarn(input));
		else if(type === "NUMBR") return(this.toNumbr(input));
		else if(type === "NUMBAR") return(this.toNumbar(input));
		else if(type === "TROOF") return(!!input);
		else if(type === "NOOB") return(null);
	}

	expression(commandStack, symbolTable) {
		let values = []
		let pop;
		while((pop = commandStack.pop()) !== undefined) {
			if(this.errorMessage) break;

			if(pop.description === "Operand separator" || pop.description === "Typecast argument") continue;
			else if(pop.description === "Infinite arity end" || pop.description === "Variable type") values.push(pop);
			else if(pop.description === "Float literal" || pop.description === "Integer literal" || pop.description === "String literal") values.push(pop.lexeme);
			else if(pop.description === "Bool literal") pop.lexeme === "WIN" ? values.push(true) : values.push(false);
			else if(pop.description === "Variable identifier") pop.lexeme in symbolTable ? values.push(symbolTable[pop.lexeme]) : this.errorMessage = `Variable does not exist: ${pop.lexeme} at line ${pop.line}`;
			else {
				let x = values.pop();
				if(pop.description === "Logical operator NOT") {

					values.push(!x);
					continue;
				}

				let y = values.pop();

				if(pop.description === "Typecast indicator") values.push(this.typecast(y.lexeme, x));

				else if(pop.description === "Comparison operator which returns the expression with the largest value" || pop.description === "Comparison operator which returns the expression with the smallest value" || pop.description === "Performs addition on expressions" || pop.description === "Performs subtraction on expressions" || pop.description === "Performs multiplication on expressions" || pop.description === "Performs division on expressions" || pop.description === "Performs modulo on expressions") {
					if(x === null || y === null) {
						this.errorMessage = `Cannot implicitly cast nil at line ${pop.line}`;
						values = [null];
						break;
					}

					x = this.toNumbar(x);
					y = this.toNumbar(y);
					
					if(pop.description === "Performs addition on expressions") values.push(x + y);
					else if(pop.description === "Performs subtraction on expressions") values.push(x - y);
					else if(pop.description === "Performs multiplication on expressions") values.push(x * y);
					else if(pop.description === "Performs division on expressions") {
						if(y === 0) this.errorMessage = `Cannot divide by 0 at line ${pop.line}`
						else values.push(x / y);
					}
					else if(pop.description === "Performs modulo on expressions") values.push(x % y);
					else if(pop.description === "Comparison operator which returns the expression with the largest value") values.push(Math.max(x, y));
					else if(pop.description === "Comparison operator which returns the expression with the smallest value") values.push(Math.min(x, y));
				}
				else if(pop.description === "Logical operator AND") values.push(!!(x && y));
				else if(pop.description === "Logical operator OR") values.push(!!(x || y));
				else if(pop.description === "Logical operator XOR") values.push(!!(x ? !y : y));
				else if(pop.description === "Comparison operator for equality") values.push(x === y);
				else if(pop.description === "Comparison operator for inequality") values.push(x !== y);

				else if(pop.description === "Concatenates strings") {
					x = typeof x === 'string' ? x : this.toString(x);
					y = typeof y === 'string' ? y : this.toString(y);

					values.push(`${x}${y}`);

					while(values.length !== 1) {
						x = values.pop();
						y = values.pop();

						if(typeof y === 'object') {
							values.push(y);
							values.push(x);
							break;
						}

						x = typeof x === 'string' ? x : this.toString(x);
						y = typeof y === 'string' ? y : this.toString(y);

						values.push(`${x}${y}`);
					}
				}

				else if(pop.description === "Logical operator OR with infinite arguments") {
					values.push(!!(x || y));
					while(values.length !== 1) {
						x = values.pop();
						y = values.pop();

						if(typeof y === 'object') {
							values.push(x);
							break;
						}

						values.push(!!(x || y));
					}
				}

				else if(pop.description === "Logical operator AND with infinite arguments") {
					values.push(!!(x && y));
					while(values.length !== 1) {
						x = values.pop();
						y = values.pop();

						if(typeof y === 'object') {
							values.push(x);
							break;
						}

						values.push(!!(x && y));
					}
				}
			}
		}
		return values;
	}

	print(commandStack, symbolTable) {
		commandStack.shift();	//Remove VISIBLE
		let values = this.expression(commandStack, symbolTable);

		if(this.errorMessage) return;

		console.log(values.reverse().join(""));
	}

	//TBC pag icoconnect na sa UI
	input(commandStack, symbolTable) {
		//Check if variable exists
		commandStack.shift();
		let input = "69";
		symbolTable[commandStack[0].lexeme] = input;
	}

	declaration(commandStack, symbolTable) {
		let line = commandStack.shift().line; // Remove I HAS A and get line
		let variable = commandStack.shift().lexeme;
		let value = null;

		if(commandStack.length) {
			commandStack.shift(); // Remove ITZ
			value = this.expression(commandStack, symbolTable)[0]
		}

		if(symbolTable[variable] === undefined)	symbolTable[variable] = value;
		else this.errorMessage = `Variable '${variable}' already exists at line ${line}`
	}

	assignment(commandStack, symbolTable) {
		if(commandStack[0].lexeme in symbolTable) {
			let variable = commandStack.shift().lexeme;
			commandStack.shift();
			symbolTable[variable] = this.expression(commandStack, symbolTable)[0];
		}
		else this.errorMessage = `Variable does not exist: ${commandStack[0].lexeme} at line ${commandStack[0].line}`;
	}

	recast(commandStack, symbolTable) {
		if(commandStack[0].lexeme in symbolTable) {
			let variable = commandStack.shift().lexeme;
			commandStack.shift();

			symbolTable[variable] = this.typecast(commandStack.shift().lexeme, symbolTable[variable]);
		}
		else this.errorMessage = `Variable does not exist: ${commandStack[0].lexeme} at line ${commandStack[0].line}`;
	}

	ifBlock(symbolTable) {
		let skip = false;
		let br = null;
		let ifSymbolTable = {...symbolTable};

		this.tokens.shift();	//Remove O RLY?

		while(this.tokens[0].description !== "Conditional operator end") {
			if(this.errorMessage) return;

			if(skip) this.tokens.shift();

			else if(this.tokens[0].description === "Conditional operator THEN" && ifSymbolTable.IT) {
				this.tokens.shift(); //Remove YA RLY
				ifSymbolTable = this.code("IF", ifSymbolTable);
				for(const key in symbolTable) if(key in ifSymbolTable) symbolTable[key] = ifSymbolTable[key];
				if(this.tokens[0].description === "Break statement") br = this.tokens[0];
				skip = true;
			}

			else if(this.tokens[0].description === "Conditional operator ELSE-IF") {
				let line = this.tokens.shift().line; //Remove MEBBE
				if(this.expression(this.tokens.filter((token) => token.line === line), ifSymbolTable)[0]) {
					if(this.errorMessage) break;

					this.tokens = this.tokens.filter((token) => token.line !== line); // Remove MEBBE <expression>
					ifSymbolTable = this.code("IF", ifSymbolTable);
					for(const key in symbolTable) if(key in ifSymbolTable) symbolTable[key] = ifSymbolTable[key];
					if(this.tokens[0].description === "Break statement") br = this.tokens[0];
					skip = true;
				}
			}

			else if(this.tokens[0].description === "Conditional operator ELSE") {
				this.tokens.shift(); //Remove NO WAI
				ifSymbolTable = this.code("IF", ifSymbolTable);
				for(const key in symbolTable) if(key in ifSymbolTable) symbolTable[key] = ifSymbolTable[key];
				if(this.tokens[0].description === "Break statement") br = this.tokens[0];
				skip = true;
			}

			else this.tokens.shift();
		}

		this.tokens.shift(); //Remove OIC
		if(br) this.tokens.unshift(br);
	}

	switchBlock(symbolTable) {
		let skip = false;
		let found = false;
		let switchSymbolTable = {...symbolTable};

		this.tokens.shift();	//Remove WTF?

		while(this.tokens[0].description !== "Conditional operator end") {
			if(this.errorMessage) return;

			if(skip) this.tokens.shift();

			else if(this.tokens[0].description === "Conditional operator CASE") {
				let line = this.tokens.shift().line;	//Remove OMG
				if(found || (!found && switchSymbolTable.IT === this.expression(this.tokens.filter(token => token.line === line))[0])) {
					if(!found) found = true;
					this.tokens = this.tokens.filter(token => token.line !== line); //Remove <expression>
					switchSymbolTable = this.code("SWITCH", switchSymbolTable);
					for(const key in symbolTable) if(key in switchSymbolTable) symbolTable[key] = switchSymbolTable[key];
					if(this.tokens[0].description === "Break statement") {
						this.tokens.shift();
						skip = true;
					}
				}
			}

			else if(this.tokens[0].description === "Conditional operator default CASE") {
				this.tokens.shift();	//Remove OMGWTF
				switchSymbolTable = this.code("SWITCH", symbolTable);
				for(const key in symbolTable) if(key in switchSymbolTable) symbolTable[key] = switchSymbolTable[key];
				if(this.tokens[0].description === "Break statement") {
					this.tokens.shift();
					skip = true;
				}
			}

			else this.tokens.shift();
		}

		this.tokens.shift(); //Remove OIC
	}

	loop(symbolTable) {
		let loopSymbolTable = {...symbolTable};
		let line = this.tokens.shift().line;	//Remove IM IN YR
		this.tokens.shift();	//Remove label
		let operation = this.tokens.shift();	//Remove operation
		let variable = this.tokens.shift();	//Remove variable

		//Check if variable exists
		if(!(variable.lexeme in loopSymbolTable)) {
			this.errorMessage = `Variable does not exist: ${variable.lexeme} at line ${variable.line}`;
			return;
		}

		let condition = null;
		let expressionStack = null;

		if(this.tokens[0].lexeme === "TIL" || this.tokens[0].lexeme === "WILE") {
			condition = this.tokens.shift();
			expressionStack = this.tokens.filter((token) => token.line === line);
			this.tokens = this.tokens.filter((token) => token.line !== line);
		}

		let loopBlock = [];

		while(this.tokens[0].description !== "Loop delimeter end") loopBlock.push(this.tokens.shift());

		this.tokens.unshift(...loopBlock);

		while(condition.lexeme === null || (condition.lexeme === "TIL" && !this.expression([...expressionStack], loopSymbolTable)[0]) || (condition.lexeme === "WILE" && this.expression([...expressionStack], loopSymbolTable)[0])) {
			if(this.errorMessage) return;

			let loopLine = this.tokens[0].line;
			loopSymbolTable = this.executeCommandStack(this.tokens.filter(token => token.line === loopLine), loopSymbolTable);
			this.tokens = this.tokens.filter(token => token.line !== loopLine);

			if(this.tokens[0].description === "Break statement") {
				this.tokens = this.tokens.filter(token => !loopBlock.includes(token))
				break;
			}

			if(this.tokens[0].description === "Loop delimeter end") {
				if(operation.lexeme === "UPPIN YR") loopSymbolTable[variable.lexeme] += 1;
				else if(operation.lexeme === "NERFIN YR") loopSymbolTable[variable.lexeme] -= 1;
				this.tokens.unshift(...loopBlock);
			}
		}

		this.tokens.shift();	//Remove IM OUTTA YR
		this.tokens.shift();	//Remove Loop identifier
	}

	executeCommandStack(commandStack, symbolTable) {
		if(commandStack[0].description === "Start of the program") return symbolTable;
		else if(commandStack[0].description === "Variable identifier") {
			if(!!commandStack[1]) {
				if(commandStack[1].description === "Assigns value to a variable") this.assignment(commandStack, symbolTable);
				else if(commandStack[1].description === "Typecast an identifier's value") this.recast(commandStack, symbolTable);
			}
			else symbolTable.IT = this.expression(commandStack, symbolTable)[0];
		}
		else if(commandStack[0].description === "Typecast indicator" || commandStack[0].description === "Float literal" || commandStack[0].description === "Integer literal" || commandStack[0].description === "String literal" || commandStack[0].description === "Bool literal" || commandStack[0].description === "Performs addition on expressions" || commandStack[0].description === "Performs subtraction on expressions" || commandStack[0].description === "Performs multiplication on expressions" || commandStack[0].description === "Performs division on expressions" || commandStack[0].description === "Performs modulo on expressions" || commandStack[0].description === "Comparison operator which returns the expression with the largest value" || commandStack[0].description === "Comparison operator which returns the expression with the smallest value" || commandStack[0].description === "Logical operator AND" || commandStack[0].description === "Logical operator OR" || commandStack[0].description === "Logical operator NOT" || commandStack[0].description === "Logical operator XOR" || commandStack[0].description === "Logical operator OR with infinite arguments" || commandStack[0].description === "Logical operator AND with infinite arguments" || commandStack[0].description === "Comparison operator for equality" || commandStack[0].description === "Comparison operator for inequality" || commandStack[0].description === "Concatenates strings") symbolTable.IT = this.expression(commandStack, symbolTable)[0];
		else if(commandStack[0].description === "Standard output") this.print(commandStack, symbolTable);
		else if(commandStack[0].description === "Standard input") this.input(commandStack, symbolTable);
		else if(commandStack[0].description === "Variable declaration") this.declaration(commandStack, symbolTable);
		else if(commandStack[0].description === "Conditional operator IF start") this.ifBlock(symbolTable);
		else if(commandStack[0].description === "Conditional operator SWITCH start") this.switchBlock(symbolTable);
		else if(commandStack[0].description === "Loop delimeter start") this.loop(symbolTable);

		return symbolTable;
	}

	code(type, symbolTable) {
		let types = {
			MAIN: ["End of program"],
			IF: ["Conditional operator end", "Conditional operator ELSE-IF", "Conditional operator ELSE"],
			SWITCH: ["Conditional operator end", "Conditional operator CASE", "Conditional operator default CASE"]
		}

		while(!(types[type].indexOf(this.tokens[0].description) > -1) && this.tokens[0].description !== "Break statement") {
			if(this.errorMessage) break;

			let line = this.tokens[0].line;
			this.executeCommandStack(this.tokens.filter(token => token.line === line), symbolTable);
			this.tokens = this.tokens.filter(token => token.line !== line);
		}
		return symbolTable;
	}

	run() {
		this.symbolTable = this.code("MAIN", { IT: null });
		this.tokens.shift();
	}
}

module.exports = SemanticAnalyzer;
