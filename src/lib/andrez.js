function checkSmoosh(passedString) {
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
		if (tokenized[i] == '"') {
			let count = i + 1;
			let temp = '"';
			for (let j = 0; j < tokenized.length; j++) {
				if (tokenized[count] == '"') {
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
				if (tokenized[count + 1] == " ") {
					temp = temp.concat(tokenized[count]);
					i = count + 1;
					strings.push(temp);
					break;
				} else if (count == len) {
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
		if (strings[i] == " ") {
			strings.splice(i, 1);
		}
	}

	for (let i = 0; i < strings.length; i++) {
		if (strings[i] == "AN") {
			anCount++;
		} else {
			varCount++;
		}
	}

	if (varCount != anCount + 1) {
		console.log('Error unexpected number of Variables/"AN"');
		return true;
	}

	for (let i = 0; i < strings.length; i++) {
		if (i % 2 != 0) {
			if (strings[i] == "AN") {
				//pass
			} else {
				console.log('Error exptected "AN"');
				return true;
			}
		} else if (i % 2 == 0) {
			if (keyWords.includes(strings[i])) {
				console.log("Error you are using a key word");
				return true;
			} else if (/^".*"/.test(strings[i])) {
				//matches yarns
			} else if (/[a-zA-Z0-9][a-zA-Z0-9_]*/.test(strings[i])) {
				//matches variables
			} else if (/[0-9]*/.test(booleans[i])) {
				//matches integers
			} else if (/[0-9]*.[0-9]*/.test(booleans[i])) {
				//matches floats
			} else if (/WIN|FAIL/.test(booleans[i])) {
				//matches booleans
			}
		}
	}

	return false;
}

function checkBool(passedString) {
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
			if (tokenized[count + 1] == " ") {
				temp = temp.concat(tokenized[count]);
				i = count + 1;
				booleans.push(temp);
				break;
			} else if (count == len) {
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
		if (booleans[i] == " ") {
			booleans.splice(i, 1);
		}
	}

	for (let i = 0; i < booleans.length; i++) {
		if (booleans[i] == "AN") {
			anCount++;
		} else {
			boolCount++;
		}
	}

	if (boolCount != anCount + 2) {
		return true;
	}

	let temp2 = booleans.length - 1;
	if (booleans[temp2] != "MKAY") {
		return true;
	}
	for (let i = 0; i < booleans.length; i++) {
		if (booleans[i] == "MKAY") {
			mkayCount += 1;
		}
	}
	if (mkayCount > 1) {
		return true;
	}

	for (let i = 0; i < booleans.length; i++) {
		if (i % 2 != 0) {
			if (booleans[i] == "AN") {
				//pass
			} else if (booleans[i] == "MKAY") {
				//pass
			} else {
				console.log('Error exptected "AN"');
				//pass
			}
		} else if (i % 2 == 0) {
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
function expression(code) {
	let match;
	if (code.match(Lexeme.YARN)) return false;
	else if (code.match(Lexeme.NUMBR)) return false;
	else if (code.match(Lexeme.NUMBAR)) return false;
	else if (code.match(Lexeme.WIN)) return false;
	else if (code.match(Lexeme.FAIL)) return false;
	else if (code.match(Lexeme.TYPE)) return false;
	else if ((match = code.match(/^SUM OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^DIFF OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^PRODUKT OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^QUOSHUNT OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^MOD OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^BIGGR OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^SMALLR OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^BOTH OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^EITHER OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^WON OF (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^NOT (.+)/))) return expression(match[1]);
	else if ((match = code.match(/^ANY OF (.+)/))) return checkBool(match[1]);
	else if ((match = code.match(/^ALL OF (.+)/))) return checkBool(match[1]);
	else if ((match = code.match(/^BOTH SAEM (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^DIFFRINT (.+) AN (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/^SMOOSH (.+)/))) return checkSmoosh(match[1]);
	else if ((match = code.match(/^MAEK (.+) A (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/(.+) IS NOW A (.+)/)))
		return expression(match[1]) || expression(match[2]);
	else if ((match = code.match(/(.+) R MAEK (.+) A (.+)/)))
		return expression(match[1]) || expression(match[2]) || expression(match[3]);
	else if (code.match(Lexeme.VARIDENT)) return false;
	return true;
}
