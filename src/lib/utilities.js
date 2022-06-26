function removeComments(sample) {
	sample = sample.replace(/\n(\s|\n)*OBTW([\s\S]*?)\n[\s\S]*TLDR\s*\n/g, "");
	sample = sample.replace(/(\s|\n)+BTW.*/g, "");
	return sample.trim();
}

module.exports = { removeComments };
