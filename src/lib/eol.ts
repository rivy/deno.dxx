// EOL conversion handler

const allNewlines = /\r?\n|\r/g;
const CR_ = '\r';
const LF_ = '\n';
const CRLF_ = '\r\n';

export const eol = {
	CR(s: string) {
		return s.replace(allNewlines, CR_);
	},
	CRLF(s: string) {
		return s.replace(allNewlines, CRLF_);
	},
	LF(s: string) {
		return s.replace(allNewlines, LF_);
	},
};
