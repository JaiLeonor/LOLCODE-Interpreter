const Lexeme = {
	VARIDENT: /^[a-zA-Z][a-zA-Z_]*/,
	NUMBR: /^[0-9]+/,
	NUMBAR: /^[0-9]+\.[0-9]+/,
	YARN: /^".*"/,
	WIN: /^WIN/,
	FAIL: /^FAIL/,
	TYPE: /^(NOOB|TROOF|YARN|NUMBR|NUMBAR)/,
	HAI: /^HAI/,
	KTHXBYE: /^KTHXBYE/,
	BTW: /^BTW/,
	OBTW: /^OBTW/,
	TLDR: /^TLDR/,
	IHASA: /^I HAS A(?= )/,
	ITZ: /^ITZ(?= )/,
	R: /^R(?= )/,
	SUMOF: /^SUM OF(?= )/,
	DIFFOF: /^DIFF OF(?= )/,
	PRODUKTOF: /^PRODUKT OF(?= )/,
	QUOSHUNTOF: /^QUOSHUNT OF(?= )/,
	MODOF: /^MOD OF(?= )/,
	BIGGROF: /^BIGGR OF(?= )/,
	SMALLROF: /^SMALLR OF(?= )/,
	BOTHOF: /^BOTH OF(?= )/,
	EITHEROF: /^EITHER OF(?= )/,
	WONOF: /^WON OF(?= )/,
	NOT: /^NOT(?= )/,
	ANYOF: /^ANY OF(?= )/,
	ALLOF: /^ALL OF(?= )/,
	BOTHSAEM: /^BOTH SAEM(?= )/,
	DIRRFRINT: /^DIFFRINT(?= )/,
	SMOOSH: /^SMOOSH(?= )/,
	MAEK: /^MAEK(?= )/,
	A: /^A(?= )/,
	ISNOWA: /^IS NOW A(?= )/,
	VISIBLE: /^VISIBLE(?= )/,
	GIMMEH: /^GIMMEH(?= )/,
	ORLY: /^O RLY\?/,
	YARLY: /^YA RLY/,
	MEBBE: /^MEBBE(?= )/,
	NOWAI: /^NO WAI(?= )/,
	OIC: /^OIC(?= )/,
	WTF: /^WTF\?(?= )/,
	OMG: /^OMG(?= )/,
	OMGWTF: /^OMGWTF(?= )/,
	IMINYR: /^IM IN YR(?= )/,
	UPPIN: /^UPPIN(?= )/,
	NERFIN: /^NERFIN(?= )/,
	YR: /^YR(?= )/,
	TIL: /^TIL(?= )/,
	WILE: /^WILE(?= )/,
	IMOUTTAYR: /^IM OUTTA YR(?= )/,
	MKAY: /^MKAY/,
	AN: /^AN(?= )/,
};

// function removeComments(sample) {
//   sample = sample.replace(/( | \n)OBTW([\s\S]*?)TLDR/g, "")
//   sample = sample.replace(/( |\n)BTW.*/g, "")
//   return sample
// }

// let code = removeComments(sample)

// // let tokens = []
// let lines = code.split('\n')

// function lexer(line, index) {
//   for(let i = 0; i < line.length; i++) {
//     let str = line.substring(i)
//     let match
//     if(match = Lexeme.NUMBAR.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Float literal",
//         line: index
//       })
//     else if(match = Lexeme.NUMBR.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Integer literal",
//         line: index
//       })
//     else if(match = Lexeme.YARN.exec(str)) {
//       tokens.push({
//         lexeme: match[0],
//         description: "String literal",
//         line: index
//       })
//     }
//     else if(match = Lexeme.WIN.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Bool literal",
//         line: index
//       })
//     else if(match = Lexeme.FAIL.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Bool literal",
//         line: index
//       })
//     else if(match = Lexeme.TYPE.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Variable type",
//         line: index
//       })
//     else if(match = Lexeme.HAI.exec(str)) {
//       tokens.push({
//         lexeme: match[0],
//         description: "Start of the program",
//         line: index
//       })
//       if(match = Lexeme.NUMBAR.exec(str.substring(match[0].length + 1))) {
//         tokens.push({
//           lexeme: match[0],
//           description: "LOLCODE version",
//           line: index
//         })
//         i += match[0].length + 3
//         continue
//       }
//     }
//     else if(match = Lexeme.KTHXBYE.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "End of program",
//         line: index
//       })
//     else if(match = Lexeme.IHASA.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Variable declaration",
//         line: index
//       })
//     else if(match = Lexeme.ITZ.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Variable initialization",
//         line: index
//       })
//     else if(match = Lexeme.R.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Assigns value to a variable",
//         line: index
//       })
//     else if(match = Lexeme.SUMOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Performs addition on expressions",
//         line: index
//       })
//     else if(match = Lexeme.DIFFOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Performs subtraction on expressions",
//         line: index
//       })
//     else if(match = Lexeme.DIFFOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Performs subtraction on expressions",
//         line: index
//       })
//     else if(match = Lexeme.PRODUKTOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Performs multiplication on expressions",
//         line: index
//       })
//     else if(match = Lexeme.QUOSHUNTOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Performs division on expressions",
//         line: index
//       })
//     else if(match = Lexeme.MODOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Performs modulo on expressions",
//         line: index
//       })
//     else if(match = Lexeme.BIGGROF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Comparison operator which returns the expression with the largest value",
//         line: index
//       })
//     else if(match = Lexeme.SMALLROF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Comparison operator which returns the expression with the smallest value",
//         line: index
//       })
//     else if(match = Lexeme.BOTHOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Logical operator AND",
//         line: index
//       })
//     else if(match = Lexeme.EITHEROF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Logical operator OR",
//         line: index
//       })
//     else if(match = Lexeme.WONOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Logical operator XOR",
//         line: index
//       })
//     else if(match = Lexeme.NOT.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Logical operator NOT",
//         line: index
//       })
//     else if(match = Lexeme.ANYOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Logical operator OR with infinite arguments",
//         line: index
//       })
//     else if(match = Lexeme.ALLOF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Logical operator AND with infinite arguments",
//         line: index
//       })
//     else if(match = Lexeme.BOTHSAEM.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Comparison operator for equality",
//         line: index
//       })
//     else if(match = Lexeme.DIRRFRINT.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Comparison operator for inequality",
//         line: index
//       })
//     else if(match = Lexeme.SMOOSH.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Concatenates strings",
//         line: index
//       })
//     else if(match = Lexeme.MAEK.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Type cast indicator",
//         line: index
//       })
//     else if(match = Lexeme.A.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Type cast argument",
//         line: index
//       })
//     else if(match = Lexeme.MAEK.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Typecast an expressions value",
//         line: index
//       })
//     else if(match = Lexeme.A.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Type assignment",
//         line: index
//       })
//     else if(match = Lexeme.ISNOWA.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Typecast an expressions value",
//         line: index
//       })
//     else if(match = Lexeme.VISIBLE.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Standard output",
//         line: index
//       })
//     else if(match = Lexeme.GIMMEH.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Standard input",
//         line: index
//       })
//     else if(match = Lexeme.ORLY.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator IF start",
//         line: index
//       })
//     else if(match = Lexeme.YARLY.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator THEN",
//         line: index
//       })
//     else if(match = Lexeme.MEBBE.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator ELSE-IF",
//         line: index
//       })
//     else if(match = Lexeme.NOWAI.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator ELSE",
//         line: index
//       })
//     else if(match = Lexeme.OIC.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator IF end",
//         line: index
//       })
//     else if(match = Lexeme.WTF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator SWITCH start",
//         line: index
//       })
//     else if(match = Lexeme.OMG.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator CASE",
//         line: index
//       })
//     else if(match = Lexeme.OMGWTF.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Conditional operator default CASE",
//         line: index
//       })
//     else if(match = Lexeme.IMINYR.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Loop delimeter start",
//         line: index
//       })
//     else if(match = Lexeme.UPPIN.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Increment loop variable",
//         line: index
//       })
//     else if(match = Lexeme.NERFIN.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Decrement loop variable",
//         line: index
//       })
//     else if(match = Lexeme.TIL.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Loop terminating condition until TRUE",
//         line: index
//       })
//     else if(match = Lexeme.TIL.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Loop terminating condition while TRUE",
//         line: index
//       })
//     else if(match = Lexeme.IMOUTTAYR.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Loop delimeter end",
//         line: index
//       })
//     else if(match = Lexeme.MKAY.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Infinite arity end",
//         line: index
//       })
//     else if(match = Lexeme.AN.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Operand separator",
//         line: index
//       })
//     else if(match = Lexeme.VARIDENT.exec(str))
//       tokens.push({
//         lexeme: match[0],
//         description: "Variable identifier",
//         line: index
//       })
//     if(match)
//       i += match[0].length
//     else {
//       console.log("Encountered unrecognized token while tokenizing")
//       break
//     }
//   }
// }

// for(let i = 0; i < lines.length; i++)
//   lexer(lines[i].trim(), i + 1)

// function expression(code) {
//   let match
//   if(code.match(Lexeme.YARN)) return false
//   else if(code.match(Lexeme.NUMBR)) return false
//   else if(code.match(Lexeme.NUMBAR)) return false
//   else if(code.match(Lexeme.WIN)) return false
//   else if(code.match(Lexeme.FAIL)) return false
//   else if(code.match(Lexeme.VARIDENT)) return false
//   else if(match = code.match(/^SUM OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^DIFF OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^PRODUKT OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^QUOSHUNT OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^MOD OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^BIGGR OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^SMALLR OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^BOTH OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^EITHER OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^WON OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^NOT (.+)/)) return expression(match[1])
//   else if(match = code.match(/^ANY OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^ALL OF (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^BOTH SAEM (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^DIFFRINT (.+) AN (.+)/)) return expression(match[2])
//   else if(match = code.match(/^SMOOSH (.+) AN (.+)/)) return expression(match[1]) || expression(match[2])
//   else if(match = code.match(/^MAEK (.+) A (NOOB|TROOF|YARN|NUMBR|NUMBAR)/)) return expression(match[1])
//   else if(match = code.match(/^(.+) IS NOW A (NOOB|TROOF|YARN|NUMBR|NUMBAR)/)) return expression(match[1])
//   else if(match = code.match(/^(.+) R MAEK (.+) A (NOOB|TROOF|YARN|NUMBR|NUMBAR)/)) return expression(match[1]) || expression(match[2])
//   return true
// }

// function body(code) {
//   let match, error = false
//   if(match = code.match(/^I HAS A [a-zA-Z][a-zA-Z_]*( ITZ (.+))?/)) {
//     if(match[1].match(/ ITZ .+/)) error = expression(match[2])
//     if(!error) body(code.replace(/^I HAS A.+\n/, ""))
//     else console.log("Expected expression")
//   }
//   else if(match = code.match(/^VISIBLE (.+)/)) {
//     let args = match[1].split(" ")
//     for(let i = 0; i < args.length; i++) error = expression(args[i])
//     if(!error) body(code.replace(/^VISIBLE .+\n/, ""))
//     else console.log("Expected expression")
//   }
//   else if(match = code.match(/^MAEK (.+) A (.+)/)) {
//     error = expression(match[1])
//     if(!error) {
//       if(match[2].match(/(NOOB|TROOF|YARN|NUMBR|NUMBAR)/)) body(code.replace(/^MAEK (.+) A (.+)/, ""))
//       else console.log("Expected type")
//     }
//     else console.log("Expected expression")
//   }
// }

// function parser(code) {
//   let match
//   if(match = code.match(/^(HAI)( [0-9]+\.[0-9]+)?([\s\S]*?)KTHXBYE/)) {
//     if(match[2].match(/ [0-9]+\.[0-9]+/)) body(match[3].slice(1, -1))
//     else body(match[2].slice(1, -1))
//   }
//   else if(code.match(/^HAI/)) console.log("Expected KTHXBYE")
//   else console.log("Expected HAI")
// }

// parser(code)

let line = 1;
let commandStack = [];

let symbolTable = [
	{
		variableName: "IT",
		type: null,
		value: null,
	},
];

let variables = ["IT"];

function isLiteral(i) {
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

function whatType(literal) {
	if (literal.match(Lexeme.NUMBR)) return "Int";
	else if (literal.match(Lexeme.NUMBAR)) return "Float";
	else if (literal.match(Lexeme.YARN)) return "String";
	else if (literal.match(Lexeme.WIN)) return "Bool";
	else if (literal.match(Lexeme.FAIL)) return "Bool";
	else return false;
}

function toTroof(variable) {
	if (variable === "NOOB") return 0;
	else if (variable === "FAIL") return 0;
	else if (variable === "") return 0;
	else if (variable === 0) return 0;
	else return 1;
}

function executeCommandStack(stack) {
	for (let i = stack.length - 1; i > -1; i--) {
		if (isLiteral(stack[i])) continue;
		else if (stack[i] === "AN") {
			if (i + 1 === stack.length || !isLiteral(stack[i - 1])) {
				console.log("Expected expression");
				return true;
			}
			stack.splice(i, 1);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				x = toTroof(stack[i + 1]);
				y = toTroof(stack[i + 2]);
				stack[i] = x && y;
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				x = toTroof(stack[i + 1]);
				y = toTroof(stack[i + 2]);
				stack[i] = x || y;
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
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
				x = toTroof(stack[i + 1]);
				y = toTroof(stack[i + 2]);
				stack[i] = x ^ y;
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 2);
			} catch (e) {
				console.log("Cannot typecast to bool");
				return true;
			}
		} else if (stack[i] === "!") {
			let x;
			if (i + 1 === stack.length) {
				console.log("Invalid number of arguments");
				return true;
			}
			try {
				x = toTroof(stack[i + 1]);
				stack[i] = x === 1 ? 0 : 1;
				stack[i] = stack[i].toString();
				stack.splice(i + 1, 1);
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
			stack[i] = stack[i].toString();
			stack.splice(i + 1, 2);
		} else if (stack[i] === "!==") {
			if (i + 2 === stack.length) {
				console.log("Invalid number of arguments");
				return true;
			}
			stack[i + 1] !== stack[i + 2] ? (stack[i] = 1) : (stack[i] = 0);
			stack[i] = stack[i].toString();
			stack.splice(i + 1, 2);
		} else if (stack[i] === "STDOUT") {
			console.log(stack);
			for (let j = 1; j < stack.length; j++) {
				if (!isLiteral(stack[j])) {
					console.log("Expected expression");
					return true;
				}
			}
			let len = stack.length;
			for (let j = 1; j < len; j++) {
				// process.stdout.write(stack[1]);
				console.log(stack[1]);
				stack.splice(1, 1);
			}
			console.log();
		} else if (stack[i] === "ASSIGN") {
			if (i + 1 === stack.length) {
				console.log("Expected expression");
				return true;
			}
			if (!variables.includes(stack[i - 1])) {
				variables.push(stack[i - 1]);
				symbolTable.push({
					variableName: stack[i - 1],
					type: whatType(stack[i + 1]),
					value: stack[i + 1],
				});
				stack.splice(i - 1, 3);
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
			if (!variables.includes(stack[i + 1])) {
				variables.push(stack[i + 1]);
				symbolTable.push({
					variableName: stack[i + 1],
					type: null,
					value: null,
				});
				stack.splice(i + 1, 1);
			} else {
				console.log("Variable already exists");
				return true;
			}
			return false;
		} else if (isLiteral(stack[i])) continue;
		else if (stack[i].match(Lexeme.VARIDENT)) {
			if (variables.includes(stack[i])) {
				for (let j = 0; j < symbolTable.length; j++)
					if (symbolTable[j].variableName === stack[i])
						stack[i] = symbolTable[j].value;
			}
		}
	}

	console.log(`stack: ${stack.join(",")}`);
	if (stack.length !== 1) {
		console.log("Syntax error");
		return true;
	}
	return false;
}

module.exports = function (tokens) {
	console.log(tokens);
	// let tokens = [
	// 	{ lexeme: "SUM OF", line: 1 },
	// 	{ lexeme: "SUM OF", line: 1 },
	// 	{ lexeme: "1", line: 1 },
	// 	{ lexeme: "AN", line: 1 },
	// 	{ lexeme: "2", line: 1 },
	// 	{ lexeme: "AN", line: 1 },
	// 	{ lexeme: "1", line: 1 },
	// 	{ lexeme: "VISIBLE", line: 2 },
	// 	{ lexeme: "SUM OF", line: 2 },
	// 	{ lexeme: "1", line: 2 },
	// 	{ lexeme: "AN", line: 2 },
	// 	{ lexeme: "2", line: 2 },
	// 	{ lexeme: "SUM OF", line: 2 },
	// 	{ lexeme: "SUM OF", line: 2 },
	// 	{ lexeme: "1", line: 2 },
	// 	{ lexeme: "AN", line: 2 },
	// 	{ lexeme: "2", line: 2 },
	// 	{ lexeme: "AN", line: 2 },
	// 	{ lexeme: "1", line: 2 },
	// 	{ lexeme: "KTHXBYE", line: 3 },
	// ];
	for (let i in tokens) {
		// console.log(commandStack);
		if (tokens[i].line === line) {
			if (tokens[i].lexeme === "HAI") continue;
			else if (tokens[i].lexeme === "SUM OF") commandStack.push("ADD");
			else if (tokens[i].lexeme === "DIFF OF") commandStack.push("SUB");
			else if (tokens[i].lexeme === "PRODUKT OF") commandStack.push("MUL");
			else if (tokens[i].lexeme === "QUOSHUNT OF") commandStack.push("DIV");
			else if (tokens[i].lexeme === "MOD OF") commandStack.push("MOD");
			else if (tokens[i].lexeme === "BIGGR OF") commandStack.push(">");
			else if (tokens[i].lexeme === "SMALLR OF") commandStack.push("<");
			else if (tokens[i].lexeme === "BOTH OF") commandStack.push("&&");
			else if (tokens[i].lexeme === "EITHER OF") commandStack.push("||");
			else if (tokens[i].lexeme === "WON OF") commandStack.push("^");
			else if (tokens[i].lexeme === "NOT") commandStack.push("!");
			else if (tokens[i].lexeme === "ANY OF") commandStack.push("ANY");
			else if (tokens[i].lexeme === "ALL OF") commandStack.push("ALL");
			else if (tokens[i].lexeme === "BOTH SAEM") commandStack.push("===");
			else if (tokens[i].lexeme === "DIFFRINT") commandStack.push("!==");
			else if (tokens[i].lexeme === "SMOOSH") commandStack.push("CONCAT");
			else if (tokens[i].lexeme === "MAEK") commandStack.push("MAEK");
			else if (tokens[i].lexeme === "IS NOW A") commandStack.push("IS NOW A");
			else if (tokens[i].lexeme === "I HAS A") commandStack.push("DECLARE");
			else if (tokens[i].lexeme === "ITZ") commandStack.push("ASSIGN");
			else if (tokens[i].lexeme === "VISIBLE") commandStack.push("STDOUT");
			else if (tokens[i].lexeme === "GIMMEH") commandStack.push("STDIN");
			else if (tokens[i].lexeme === "AN") commandStack.push("AN");
			else if (isLiteral(tokens[i].lexeme)) commandStack.push(tokens[i].lexeme);
			else if (tokens[i].description === "Variable identifier")
				commandStack.push(tokens[i].lexeme);
			// else if (tokens[i].lexeme === "O RLY?") commandStack.push("IF-START")
			// else if (tokens[i].lexeme === "YA RLY") commandStack.push("THEN")
			// else if (tokens[i].lexeme === "NO WAI") commandStack.push("ELSE")
			// else if (tokens[i].lexeme === "OIC") commandStack.push("IF-END")
			else if (tokens[i].lexeme === "KTHXBYE") break;
		} else {
			if (executeCommandStack(commandStack)) break;
			commandStack = [];
			if (tokens[i].lexeme === "SUM OF") commandStack.push("ADD");
			else if (tokens[i].lexeme === "DIFF OF") commandStack.push("SUB");
			else if (tokens[i].lexeme === "PRODUKT OF") commandStack.push("MUL");
			else if (tokens[i].lexeme === "QUOSHUNT OF") commandStack.push("DIV");
			else if (tokens[i].lexeme === "MOD OF") commandStack.push("MOD");
			else if (tokens[i].lexeme === "BIGGR OF") commandStack.push(">");
			else if (tokens[i].lexeme === "SMALLR OF") commandStack.push("<");
			else if (tokens[i].lexeme === "BOTH OF") commandStack.push("&&");
			else if (tokens[i].lexeme === "EITHER OF") commandStack.push("||");
			else if (tokens[i].lexeme === "WON OF") commandStack.push("^");
			else if (tokens[i].lexeme === "NOT") commandStack.push("!");
			else if (tokens[i].lexeme === "ANY OF") commandStack.push("ANY");
			else if (tokens[i].lexeme === "ALL OF") commandStack.push("ALL");
			else if (tokens[i].lexeme === "BOTH SAEM") commandStack.push("===");
			else if (tokens[i].lexeme === "DIFFRINT") commandStack.push("!==");
			else if (tokens[i].lexeme === "SMOOSH") commandStack.push("CONCAT");
			else if (tokens[i].lexeme === "MAEK") commandStack.push("MAEK");
			else if (tokens[i].lexeme === "IS NOW A") commandStack.push("IS NOW A");
			else if (tokens[i].lexeme === "I HAS A") commandStack.push("DECLARE");
			else if (tokens[i].lexeme === "ITZ") commandStack.push("ASSIGN");
			else if (tokens[i].lexeme === "VISIBLE") commandStack.push("STDOUT");
			else if (tokens[i].lexeme === "GIMMEH") commandStack.push("STDIN");
			else if (tokens[i].lexeme === "AN") commandStack.push("AN");
			else if (isLiteral(tokens[i].lexeme)) commandStack.push(tokens[i].lexeme);
			else if (tokens[i].description === "Variable identifier")
				commandStack.push(tokens[i].lexeme);
			line++;
		}
	}
};

// IHASA: /^I HAS A(?= )/,
// ITZ: /^ITZ(?= )/,
// VISIBLE: /^VISIBLE(?= )/,
// GIMMEH: /^GIMMEH(?= )/,
// ORLY: /^O RLY\?/,
// YARLY: /^YA RLY/,
// MEBBE: /^MEBBE(?= )/,
// NOWAI: /^NO WAI(?= )/,
// OIC: /^OIC(?= )/,
// WTF: /^WTF\?(?= )/,
// OMG: /^OMG(?= )/,
// OMGWTF: /^OMGWTF(?= )/,
// IMINYR: /^IM IN YR(?= )/,
// UPPIN: /^UPPIN(?= )/,
// NERFIN: /^NERFIN(?= )/,
// YR: /^YR(?= )/,
// TIL: /^TIL(?= )/,
// WILE: /^WILE(?= )/,
// IMOUTTAYR: /^IM OUTTA YR(?= )/
