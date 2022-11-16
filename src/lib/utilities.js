function removeComments(code) {
	let lines = code.split('\n');

	for(let i = 0; i < lines.length; i++)
		lines[i].replace(/[^\S\r\n]+$/gm, "");

	while(true) {
		let match = /^\s*OBTW\s[\s\S]*?(?<=\s)TLDR$/m.exec(code);
		if(!match) break;

		code = code.replace(match, '\n'.repeat(match[0].split(/\n/).length - 1))
	}

	code = code.replace(/(?<!\S)BTW .*/g, "");

	return code;
}

module.exports = { removeComments };
