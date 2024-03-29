const Lexeme = {
	VARIDENT: /^[a-zA-Z][\w]*$/,
	NUMBR: /^[0-9]+$/,
	NUMBAR: /^[0-9]+\.[0-9]+$/,
	YARN: /^".*?"/,
	WIN: /^WIN$/,
	FAIL: /^FAIL$/,
	TYPE: /^(NOOB|TROOF|YARN|NUMBR|NUMBAR)$/,
	HAI: /^HAI$/,
	KTHXBYE: /^KTHXBYE$/,
	BTW: /^BTW$/,
	OBTW: /^OBTW$/,
	TLDR: /^TLDR$/,
	IHASA: /^I HAS A$/,
	ITZ: /^ITZ$/,
	R: /^R$/,
	SUMOF: /^SUM OF$/,
	DIFFOF: /^DIFF OF$/,
	PRODUKTOF: /^PRODUKT OF$/,
	QUOSHUNTOF: /^QUOSHUNT OF$/,
	MODOF: /^MOD OF$/,
	BIGGROF: /^BIGGR OF$/,
	SMALLROF: /^SMALLR OF$/,
	BOTHOF: /^BOTH OF$/,
	EITHEROF: /^EITHER OF$/,
	WONOF: /^WON OF$/,
	NOT: /^NOT$/,
	ANYOF: /^ANY OF$/,
	ALLOF: /^ALL OF$/,
	BOTHSAEM: /^BOTH SAEM$/,
	DIRRFRINT: /^DIFFRINT$/,
	SMOOSH: /^SMOOSH$/,
	MAEK: /^MAEK$/,
	A: /^A$/,
	ISNOWA: /^IS NOW A$/,
	VISIBLE: /^VISIBLE$/,
	GIMMEH: /^GIMMEH$/,
	ORLY: /^O RLY\?$/,
	YARLY: /^YA RLY$/,
	MEBBE: /^MEBBE$/,
	NOWAI: /^NO WAI$/,
	OIC: /^OIC$/,
	WTF: /^WTF\?$/,
	OMG: /^OMG$/,
	GTFO: /^GTFO$/,
	OMGWTF: /^OMGWTF$/,
	IMINYR: /^IM IN YR$/,
	UPPIN: /^UPPIN YR$/,
	NERFIN: /^NERFIN YR$/,
	YR: /^YR$/,
	TIL: /^TIL$/,
	WILE: /^WILE$/,
	IMOUTTAYR: /^IM OUTTA YR$/,
	MKAY: /^MKAY$/,
	AN: /^AN$/,
};

module.exports = Lexeme;
