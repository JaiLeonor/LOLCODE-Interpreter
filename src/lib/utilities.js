function removeComments(sample) {
	sample = sample.replace(/(\s|\n)*OBTW([\s\S]*?)TLDR/g, "");
	sample = sample.replace(/(\s|\n)*BTW.*/g, "");
	return sample.trim();
}

module.exports = { removeComments };
