// EOL conversion handler

const newline = /\r?\n|\n/g;
const CR_ = '\r';
const LF_ = '\n';
const CRLF_ = '\r\n';

export const eol = {
	CR(s: string,) {
		return s.replace(newline, CR_,);
	},
	CRLF(s: string,) {
		return s.replace(newline, CRLF_,);
	},
	LF(s: string,) {
		return s.replace(newline, LF_,);
	},
};
