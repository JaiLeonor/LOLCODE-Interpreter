const Lexeme = require("./lexeme");

class SyntaxAnalyzer {
	constructor(code) {
		this.code = this.removeComments(code);
	}

	body(code) {
		let match,
			error = false;
		// catch case if the string is empty
		code = code.trim();
		// console.log(code);
		if (code === "") return;
		if ((match = code.match(/^I HAS A [a-zA-Z][a-zA-Z0-9_]*( ITZ (.+))?/))) {
			if (match[1] && match[1].match(/ ITZ .+/))
				error = this.checkIfExpression(match[2]);
			if (!error) this.body(code.replace(/^I HAS A.+\n?/, ""));
			else console.log("Expected expression");
		} else if ((match = code.match(/^VISIBLE(.*)/))) {
			// VISIBLE

			let [, args] = match;
			if (args.trim() === "") {
				console.log("Expected arguments");
				return;
			}
			// let args = match[1];
			error = this.checkIfExpression(args.trim());
			// VISIBLE var1 AN "text" AN var2 AN "some value"
			if (!error) {
				const newBody = code.replace(/^VISIBLE .+\n?/, "");
				this.body(newBody);
			} else console.log("Expected expression");
		} else if ((match = code.match(/^MAEK (.*) A (.*)/))) {
			error = this.checkIfExpression(match[1]);

			if (!error) {
				if (match[2] && match[2].match(/(NOOB|TROOF|YARN|NUMBR|NUMBAR)/)) {
					this.body(code.replace(/^MAEK (.+) A (.+)\n?/, ""));
				} else console.log("Expected type");
			} else console.log("Expected expression");
		}
		// Concatenation
		else if ((match = code.match(/^SMOOSH (.*)\n?/))) {
			let [statement] = match;
			error = this.checkIfExpression(statement.trim());
			console.log(`error: ${error}`);
			if (!error) {
				const newBody = code.replace(/^SMOOSH .+\n?/, "");
				this.body(newBody);
			} else console.log("Expected expression");
			// } else if ((match = code.match(/^BOTH SAEM .*\n/))) {
		} else if (
			code.match(/(.*)\n\s*O RLY\?/) &&
			!this.checkIfExpression(code.match(/(.*)\n\s*O RLY\?/)[1])
		) {
			let newBody = code.replace(/^(.*)\n/, "").trimStart();
			// console.log(`newBody: ${newBody}`);

			// if may MEBBE, check if tama syntax, kunin statements
			// if may NO WAI, check if tama syntax, kunin statements
			const ORLY = /O RLY\?/;
			const OIC = /O RLY\?(.|\n)+?\n\s*OIC/;

			if (!newBody.match(ORLY)) {
				console.log("Not an if statement");
				return;
			}
			// const placeholder = newBody.replace(ORLY, "");
			// console.log(newBody.match(OIC));
			const entireBlock = newBody.match(OIC);
			// check if there's another ORLY, if true then print error
			if (!entireBlock) {
				console.log("Expected OIC");
				return;
			}

			// this is to check if may OIC ba talaga sa dulo
			// this is just a workaround
			const [args] = entireBlock;
			const placeholder = args.replace(ORLY, "");
			if (placeholder.match(ORLY)) {
				console.log("Bawal nested, expected OIC");
				return;
			}

			// then detect if may YA RLY, kunin lahat ng statements don
			// let yaRlyRes = ;
			if (!placeholder.match(/YA RLY/)) {
				console.log("Expected YA RLY");
				return;
			}

			// get all statements under YA RLY (if block)
			// in this part, may YA RLY part ka na

			let [, yaRlyStatements] = placeholder.match(
				/YA RLY\n((.|\n)+?\n)\s*(NO WAI|OIC|MEBBE)/
			);
			// nakukuha ko na yung statements
			// console.log(`yaRlyStatements: ${yaRlyStatements.trimStart().split("\n")}`);
			yaRlyStatements
				.trim()
				.split("\n")
				.forEach((statement, idx) => {
					// console.log(`expression ${idx}: ${statement.trimStart()}`);
					this.body(statement);
				});

			// now, for the mebbes get all mebbe blocks
			let mebbes = placeholder.match(/(MEBBE (.|\n)+?\n)\s*(NO WAI|OIC)/);
			if (mebbes) {
				[, mebbes] = mebbes;
				mebbes.split("MEBBE").forEach((clause) => {
					if (!clause || clause === "") return;
					const [expression, ...statements] = clause
						.split("\n")
						.map((text) => text.trim());
					// console.log(`expression: ${expression}`);
					// console.log(`statements: ${statements.join(", ")}`);
					// check expression here

					if (expression !== "" && this.checkIfExpression(expression)) {
						console.log(`Expected expression on ${expression}`);
						return;
					}
					statements.forEach((statement) => this.body(statement));
				});
			}

			// now, for the no wai (else)
			let noWai = placeholder.match(/(NO WAI((.|\n)+?)\n)\s*(OIC)/);
			if (noWai) {
				// console.log(noWai);
				const [, , statements] = noWai;
				statements.split("\n").forEach((statement) => {
					if (!statement || statement === "") return;
					statement = statement.trim();
					this.body(statement);
				});
			}
			newBody = newBody.replace(OIC, "");

			this.body(newBody);
		}
		// loop
		else if ((match = code.match(/IM IN YR/))) {
			const IMINYR = /IM IN YR/;
			// const IMOUTTAYR = /IM IN YR(.|\n)+?\n\s*IM OUTTA YR/;
			const LOOP =
				/IM IN YR (.*) (UPPIN|NERFIN) YR (.*) (TIL|WILE) (.*)((.|\n)+?\n)\s*IM OUTTA YR (.*)/;
			// const placeholder = newBody.replace(ORLY, "");
			// console.log(newBody.match(OIC));
			const entireBlock = code.match(LOOP);
			// check if there's another ORLY, if true then print error
			if (!entireBlock) {
				console.log("Expected IM OUTTA YR");
				return;
			}

			const [args] = entireBlock;
			const placeholder = args.replace(IMINYR, "");
			if (placeholder.match(IMINYR)) {
				console.log("Expected IM OUTTA YR");
				return;
			}
			// action = UPPIN | NERFIN
			// term = TIL | WILE
			const [
				,
				loopIdent,
				action,
				varIdent,
				term,
				exp,
				statements,
				,
				loopIdent2,
			] = args.match(LOOP);
			if (this.checkIfExpression(exp)) {
				console.log("Expected expression");
				return;
			}
			// first, check if loop identifiers match
			if (loopIdent !== loopIdent2) {
				console.log("Loop identifiers must be the same");
				return;
			}
			if (!["UPPIN", "NERFIN"].includes(action)) {
				console.log("Action should be either 'UPPIN' or 'NERFIN'");
				return;
			}

			// check varident using regex
			if (!Lexeme.VARIDENT.exec(varIdent)) {
				console.log("Expected variable identifier");
				return;
			}

			if (!["TIL", "WILE"].includes(term)) {
				console.log("Expected 'TIL' or 'WILE'");
				return;
			}

			// check expressions here
			statements
				.trim()
				.split("\n")
				.forEach((statement) => this.body(statement.trim()));

			const newBody = code.replace(LOOP, "");
			// console.log(newBody);
			this.body(newBody);
		}
	}

	parse() {
		let match;
		if (
			(match = this.code.match(/^(HAI)( [0-9]+\.[0-9]+)?([\s\S]*?)KTHXBYE/))
		) {
			if (match[2].match(/ [0-9]+\.[0-9]+/)) this.body(match[3].slice(1, -1));
			else this.body(match[2].slice(1, -1));
		} else if (this.code.match(/^HAI/)) console.log("Expected KTHXBYE");
		else console.log("Expected HAI");
	}

	checkSmoosh(passedString) {
		const keyWords = [
			"GIMMEH",
			"I",
			"HAS",
			"A",
			"ITZ",
			"YA",
			"RLY",
			"NO",
			"WAI",
			"OMG",
			"OMGWTF",
			"GTFO",
			"UPPIN",
			"NERFIN",
			"TIL",
			"WILE",
			"NOOB",
			"TROOF",
			"YARN",
			"NUMBR",
			"NUMBAR",
			"HAI",
			"KTHXBYE",
			"BTW",
			"OBTW",
			"TLDR",
			"R",
			"OF",
			"SUM",
			"DIFF",
			"PRODUKT",
			"QUOSHUNT",
			"MOD",
			"BIGGR",
			"SMALLR",
			"BOTH",
			"EITHER",
			"WON",
			"NOT",
			"ANY",
			"ALL",
			"BOTH",
			"SAEM",
			"DIFFRINT",
			"SMOOSH",
			"MAEK",
			"NOW",
			"OIC",
			"WTF",
			"IM",
			"IN",
			"YR",
			"OUTTA",
			"MKAY",
		];
		let tokenized = [];
		let strings = [];
		let varCount = 0;
		let anCount = 0;

		for (let i = 0; i < passedString.length; i++) {
			tokenized.push(passedString.charAt(i));
		}

		for (let i = 0; i < tokenized.length; i++) {
			if (tokenized[i] === '"') {
				let count = i + 1;
				let temp = '"';
				for (let j = 0; j < tokenized.length; j++) {
					if (tokenized[count] === '"') {
						temp = temp.concat(tokenized[count]);
						i = count + 1;
						strings.push(temp);
						break;
					}
					temp = temp.concat(tokenized[count]);
					count++;
				}
			} else {
				let count = i + 1;
				let temp = tokenized[i];
				for (let j = 0; j < tokenized.length; j++) {
					let len = tokenized.length - 1;
					if (tokenized[count + 1] === " ") {
						temp = temp.concat(tokenized[count]);
						i = count + 1;
						strings.push(temp);
						break;
					} else if (count === len) {
						temp = temp.concat(tokenized[count]);
						i = count + 1;
						strings.push(temp);
						break;
					}
					temp = temp.concat(tokenized[count]);
					count++;
				}
			}
		}

		for (let i = 0; i < strings.length; i++) {
			if (strings[i] === " ") {
				strings.splice(i, 1);
			}
		}
		for (let i = 0; i < strings.length; i++) {
			if (strings[i] === "AN") {
				anCount++;
			} else {
				varCount++;
			}
		}
		console.log(`varCount: ${varCount}\nanCount: ${anCount}`);
		if (varCount !== anCount + 1) {
			console.log('Error unexpected number of Variables/"AN"');
			return true;
		}

		for (let i = 0; i < strings.length; i++) {
			if (i % 2 !== 0) {
				if (strings[i] === "AN") {
					//pass
				} else {
					console.log('Error exptected "AN"');
					return true;
				}
			} else if (i % 2 === 0) {
				if (keyWords.includes(strings[i])) {
					console.log("Error you are using a key word");
					return true;
				} else if (/^".*"/.test(strings[i])) {
					//matches yarns
				} else if (/[a-zA-Z0-9][a-zA-Z0-9_]*/.test(strings[i])) {
					//matches variables
				} else if (/[0-9]*/.test(strings[i])) {
					//matches integers
				} else if (/[0-9]*.[0-9]*/.test(strings[i])) {
					//matches floats
				} else if (/WIN|FAIL/.test(strings[i])) {
					//matches booleans
				}
			}
		}

		return false;
	}

	checkBool(passedString) {
		const keyWords = [
			"GIMMEH",
			"I",
			"HAS",
			"A",
			"ITZ",
			"YA",
			"RLY",
			"NO",
			"WAI",
			"OMG",
			"OMGWTF",
			"GTFO",
			"UPPIN",
			"NERFIN",
			"TIL",
			"WILE",
			"NOOB",
			"TROOF",
			"YARN",
			"NUMBR",
			"NUMBAR",
			"HAI",
			"KTHXBYE",
			"BTW",
			"OBTW",
			"TLDR",
			"R",
			"OF",
			"SUM",
			"DIFF",
			"PRODUKT",
			"QUOSHUNT",
			"MOD",
			"BIGGR",
			"SMALLR",
			"BOTH",
			"EITHER",
			"WON",
			"NOT",
			"ANY",
			"ALL",
			"BOTH",
			"SAEM",
			"DIFFRINT",
			"SMOOSH",
			"MAEK",
			"NOW",
			"OIC",
			"WTF",
			"IM",
			"IN",
			"YR",
			"OUTTA",
		];
		let tokenized = [];
		let booleans = [];
		let boolCount = 0;
		let anCount = 0;
		let mkayCount = 0;
		for (let i = 0; i < passedString.length; i++) {
			tokenized.push(passedString.charAt(i));
		}

		for (let i = 0; i < tokenized.length; i++) {
			let count = i + 1;
			let temp = tokenized[i];
			let len = tokenized.length - 1;
			for (let j = 0; j < tokenized.length; j++) {
				if (tokenized[count + 1] === " ") {
					temp = temp.concat(tokenized[count]);
					i = count + 1;
					booleans.push(temp);
					break;
				} else if (count === len) {
					temp = temp.concat(tokenized[count]);
					i = count + 1;
					booleans.push(temp);
					break;
				}
				temp = temp.concat(tokenized[count]);
				count++;
			}
		}

		for (let i = 0; i < booleans.length; i++) {
			if (booleans[i] === " ") {
				booleans.splice(i, 1);
			}
		}

		for (let i = 0; i < booleans.length; i++) {
			if (booleans[i] === "AN") {
				anCount++;
			} else {
				boolCount++;
			}
		}

		if (boolCount !== anCount + 2) {
			return true;
		}

		let temp2 = booleans.length - 1;
		if (booleans[temp2] !== "MKAY") {
			return true;
		}
		for (let i = 0; i < booleans.length; i++) {
			if (booleans[i] === "MKAY") {
				mkayCount += 1;
			}
		}
		if (mkayCount > 1) {
			return true;
		}

		for (let i = 0; i < booleans.length; i++) {
			if (i % 2 !== 0) {
				if (booleans[i] === "AN") {
					//pass
				} else if (booleans[i] === "MKAY") {
					//pass
				} else {
					console.log('Error exptected "AN"');
					//pass
				}
			} else if (i % 2 === 0) {
				if (keyWords.includes(booleans[i])) {
					return true;
				} else if (/^".*"/.test(booleans[i])) {
					//matches yarns
				} else if (/[a-zA-Z0-9][a-zA-Z0-9_]*/.test(booleans[i])) {
					//matches variables
				} else if (/WIN|FAIL/.test(booleans[i])) {
					//matches booleans
				}
			}
		}
		return false;
	}

	removeComments(sample) {
		sample = sample.replace(/(\s|\n)*OBTW([\s\S]*?)TLDR/g, "");
		sample = sample.replace(/(\s|\n)*BTW.*/g, "");
		return sample.trim();
	}
	
	checkIfExpression(code) {
		let match;
		if (code.match(Lexeme.YARN)) return false;
		else if (code.match(Lexeme.NUMBR)) return false;
		else if (code.match(Lexeme.NUMBAR)) return false;
		else if (code.match(Lexeme.WIN)) return false;
		else if (code.match(Lexeme.FAIL)) return false;
		else if ((match = code.match(/^SUM OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^DIFF OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^PRODUKT OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^QUOSHUNT OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^MOD OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^BIGGR OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^SMALLR OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^BOTH OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^EITHER OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^WON OF (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^NOT (.+)/)))
			return this.checkIfExpression(match[1]);
		else if ((match = code.match(/^ANY OF (.+)/)))
			return this.checkBool(match[1]);
		else if ((match = code.match(/^ALL OF (.+)/)))
			return this.checkBool(match[1]);
		else if ((match = code.match(/^BOTH SAEM (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^DIFFRINT (.+) AN (.+)/)))
			return this.checkIfExpression(match[2]);
		else if ((match = code.match(/^SMOOSH (.+)\n?/))) {
			return this.checkSmoosh(match[1]);
		} else if (
			(match = code.match(/^MAEK (.+) A (NOOB|TROOF|YARN|NUMBR|NUMBAR)/))
		)
			return this.checkIfExpression(match[1]);
		else if (
			(match = code.match(/^(.+) IS NOW A (NOOB|TROOF|YARN|NUMBR|NUMBAR)/))
		)
			return this.checkIfExpression(match[1]);
		else if (
			(match = code.match(/^(.+) R MAEK (.+) A (NOOB|TROOF|YARN|NUMBR|NUMBAR)/))
		)
			return (
				this.checkIfExpression(match[1]) || this.checkIfExpression(match[2])
			);
		else if (code.match(Lexeme.VARIDENT)) return false;
		return true;
	}
}

module.exports = SyntaxAnalyzer;
