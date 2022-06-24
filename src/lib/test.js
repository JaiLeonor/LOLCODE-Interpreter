let string1 = '"str1" AN x AN "str3" AN "str4" AN "str5"';
let string2 = 'SMOOSH "1" AN';
let string3 = 'SMOOSH "st r1" AN x AN "str3" AN "str4" AN str5';

let match = string2.match(/^SMOOSH (.+)/);

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

console.log(checkSmoosh(match[1]));
