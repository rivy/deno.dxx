/* esm.sh - zod@4.0.10/v4/locales */
function a(o, i = "|") {
  return o.map((u) => l(u)).join(i);
}
function s(o) {
  return {
    get value() {
      {
        let u = o();
        return Object.defineProperty(this, "value", { value: u }), u;
      }
      throw new Error("cached value already set");
    },
  };
}
var qr = "captureStackTrace" in Error ? Error.captureStackTrace : (...o) => {};
var Br = s(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) {
    return !1;
  }
  try {
    let o = Function;
    return new o(""), !0;
  } catch {
    return !1;
  }
});
function l(o) {
  return typeof o == "bigint"
    ? o.toString() + "n"
    : typeof o == "string"
    ? `"${o}"`
    : `${o}`;
}
var Yr = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
var p = () => {
  let o = {
    string: {
      unit: "\u062D\u0631\u0641",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
    file: {
      unit: "\u0628\u0627\u064A\u062A",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
    array: {
      unit: "\u0639\u0646\u0635\u0631",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
    set: {
      unit: "\u0639\u0646\u0635\u0631",
      verb: "\u0623\u0646 \u064A\u062D\u0648\u064A",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0645\u062F\u062E\u0644",
      email:
        "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      url: "\u0631\u0627\u0628\u0637",
      emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      date:
        "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
      ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
      ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
      cidrv4:
        "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
      cidrv6:
        "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
      base64:
        "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
      base64url:
        "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
      json_string:
        "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
      e164:
        "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
      jwt: "JWT",
      template_literal: "\u0645\u062F\u062E\u0644",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${r.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${
            l(r.values[0])
          }`
          : `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${
            r.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"
          } ${e} ${r.maximum.toString()} ${
            t.unit ?? "\u0639\u0646\u0635\u0631"
          }`
          : `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${
            r.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"
          } ${e} ${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${r.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${e} ${r.minimum.toString()} ${t.unit}`
          : `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${r.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${e} ${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${r.prefix}"`
          : e.format === "ends_with"
          ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${e.suffix}"`
          : e.format === "includes"
          ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${e.includes}"`
          : e.format === "regex"
          ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${e.pattern}`
          : `${
            n[e.format] ?? r.format
          } \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${r.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${
          r.keys.length > 1 ? "\u0627\u062A" : ""
        } \u063A\u0631\u064A\u0628${r.keys.length > 1 ? "\u0629" : ""}: ${
          a(r.keys, "\u060C ")
        }`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${r.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${r.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function $() {
  return { localeError: p() };
}
var b = () => {
  let o = {
    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
    set: { unit: "element", verb: "olmal\u0131d\u0131r" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${r.expected}, daxil olan ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${
            l(r.values[0])
          }`
          : `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${
            r.origin ?? "d\u0259y\u0259r"
          } ${e}${r.maximum.toString()} ${t.unit ?? "element"}`
          : `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${
            r.origin ?? "d\u0259y\u0259r"
          } ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${r.origin} ${e}${r.minimum.toString()} ${t.unit}`
          : `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${r.origin} ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Yanl\u0131\u015F m\u0259tn: "${e.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`
          : e.format === "ends_with"
          ? `Yanl\u0131\u015F m\u0259tn: "${e.suffix}" il\u0259 bitm\u0259lidir`
          : e.format === "includes"
          ? `Yanl\u0131\u015F m\u0259tn: "${e.includes}" daxil olmal\u0131d\u0131r`
          : e.format === "regex"
          ? `Yanl\u0131\u015F m\u0259tn: ${e.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`
          : `Yanl\u0131\u015F ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${r.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${r.keys.length > 1 ? "lar" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `${r.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${r.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return "Yanl\u0131\u015F d\u0259y\u0259r";
    }
  };
};
function y() {
  return { localeError: b() };
}
function f(o, i, u, n) {
  let r = Math.abs(o), e = r % 10, t = r % 100;
  return t >= 11 && t <= 19 ? n : e === 1 ? i : e >= 2 && e <= 4 ? u : n;
}
var _ = () => {
  let o = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E",
      },
      verb: "\u043C\u0435\u0446\u044C",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u043B\u0456\u043A";
        case "object": {
          if (Array.isArray(r)) {
            return "\u043C\u0430\u0441\u0456\u045E";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0443\u0432\u043E\u0434",
      email: "email \u0430\u0434\u0440\u0430\u0441",
      url: "URL",
      emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
      date: "ISO \u0434\u0430\u0442\u0430",
      time: "ISO \u0447\u0430\u0441",
      duration:
        "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
      ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
      ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
      cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
      cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
      base64:
        "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
      base64url:
        "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
      json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
      e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
      jwt: "JWT",
      template_literal: "\u0443\u0432\u043E\u0434",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${r.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${
            l(r.values[0])
          }`
          : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        if (t) {
          let d = Number(r.maximum),
            m = f(d, t.unit.one, t.unit.few, t.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${
            r.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"
          } \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${t.verb} ${e}${r.maximum.toString()} ${m}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${
          r.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"
        } \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        if (t) {
          let d = Number(r.minimum),
            m = f(d, t.unit.one, t.unit.few, t.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${r.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${t.verb} ${e}${r.minimum.toString()} ${m}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${r.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${e.prefix}"`
          : e.format === "ends_with"
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${e.suffix}"`
          : e.format === "includes"
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${e.includes}"`
          : e.format === "regex"
          ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${e.pattern}`
          : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${
            n[e.format] ?? r.format
          }`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${r.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${
          r.keys.length > 1
            ? "\u043A\u043B\u044E\u0447\u044B"
            : "\u043A\u043B\u044E\u0447"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${r.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${r.origin}`;
      default:
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
    }
  };
};
function I() {
  return { localeError: _() };
}
var k = () => {
  let o = {
    string: { unit: "car\xE0cters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "entrada",
      email: "adre\xE7a electr\xF2nica",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data i hora ISO",
      date: "data ISO",
      time: "hora ISO",
      duration: "durada ISO",
      ipv4: "adre\xE7a IPv4",
      ipv6: "adre\xE7a IPv6",
      cidrv4: "rang IPv4",
      cidrv6: "rang IPv6",
      base64: "cadena codificada en base64",
      base64url: "cadena codificada en base64url",
      json_string: "cadena JSON",
      e164: "n\xFAmero E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Tipus inv\xE0lid: s'esperava ${r.expected}, s'ha rebut ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Valor inv\xE0lid: s'esperava ${l(r.values[0])}`
          : `Opci\xF3 inv\xE0lida: s'esperava una de ${a(r.values, " o ")}`;
      case "too_big": {
        let e = r.inclusive ? "com a m\xE0xim" : "menys de", t = i(r.origin);
        return t
          ? `Massa gran: s'esperava que ${
            r.origin ?? "el valor"
          } contingu\xE9s ${e} ${r.maximum.toString()} ${t.unit ?? "elements"}`
          : `Massa gran: s'esperava que ${
            r.origin ?? "el valor"
          } fos ${e} ${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? "com a m\xEDnim" : "m\xE9s de", t = i(r.origin);
        return t
          ? `Massa petit: s'esperava que ${r.origin} contingu\xE9s ${e} ${r.minimum.toString()} ${t.unit}`
          : `Massa petit: s'esperava que ${r.origin} fos ${e} ${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Format inv\xE0lid: ha de comen\xE7ar amb "${e.prefix}"`
          : e.format === "ends_with"
          ? `Format inv\xE0lid: ha d'acabar amb "${e.suffix}"`
          : e.format === "includes"
          ? `Format inv\xE0lid: ha d'incloure "${e.includes}"`
          : e.format === "regex"
          ? `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${e.pattern}`
          : `Format inv\xE0lid per a ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${r.divisor}`;
      case "unrecognized_keys":
        return `Clau${r.keys.length > 1 ? "s" : ""} no reconeguda${
          r.keys.length > 1 ? "s" : ""
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${r.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      case "invalid_element":
        return `Element inv\xE0lid a ${r.origin}`;
      default:
        return "Entrada inv\xE0lida";
    }
  };
};
function h() {
  return { localeError: k() };
}
var j = () => {
  let o = {
    string: { unit: "znak\u016F", verb: "m\xEDt" },
    file: { unit: "bajt\u016F", verb: "m\xEDt" },
    array: { unit: "prvk\u016F", verb: "m\xEDt" },
    set: { unit: "prvk\u016F", verb: "m\xEDt" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u010D\xEDslo";
        case "string":
          return "\u0159et\u011Bzec";
        case "boolean":
          return "boolean";
        case "bigint":
          return "bigint";
        case "function":
          return "funkce";
        case "symbol":
          return "symbol";
        case "undefined":
          return "undefined";
        case "object": {
          if (Array.isArray(r)) {
            return "pole";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "regul\xE1rn\xED v\xFDraz",
      email: "e-mailov\xE1 adresa",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "datum a \u010Das ve form\xE1tu ISO",
      date: "datum ve form\xE1tu ISO",
      time: "\u010Das ve form\xE1tu ISO",
      duration: "doba trv\xE1n\xED ISO",
      ipv4: "IPv4 adresa",
      ipv6: "IPv6 adresa",
      cidrv4: "rozsah IPv4",
      cidrv6: "rozsah IPv6",
      base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
      base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
      json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
      e164: "\u010D\xEDslo E.164",
      jwt: "JWT",
      template_literal: "vstup",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${r.expected}, obdr\u017Eeno ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${l(r.values[0])}`
          : `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${
            r.origin ?? "hodnota"
          } mus\xED m\xEDt ${e}${r.maximum.toString()} ${
            t.unit ?? "prvk\u016F"
          }`
          : `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${
            r.origin ?? "hodnota"
          } mus\xED b\xFDt ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${
            r.origin ?? "hodnota"
          } mus\xED m\xEDt ${e}${r.minimum.toString()} ${
            t.unit ?? "prvk\u016F"
          }`
          : `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${
            r.origin ?? "hodnota"
          } mus\xED b\xFDt ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${e.prefix}"`
          : e.format === "ends_with"
          ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${e.suffix}"`
          : e.format === "includes"
          ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${e.includes}"`
          : e.format === "regex"
          ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${e.pattern}`
          : `Neplatn\xFD form\xE1t ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${r.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${r.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${r.origin}`;
      default:
        return "Neplatn\xFD vstup";
    }
  };
};
function S() {
  return { localeError: j() };
}
var x = () => {
  let o = {
      string: { unit: "tegn", verb: "havde" },
      file: { unit: "bytes", verb: "havde" },
      array: { unit: "elementer", verb: "indeholdt" },
      set: { unit: "elementer", verb: "indeholdt" },
    },
    i = {
      string: "streng",
      number: "tal",
      boolean: "boolean",
      array: "liste",
      object: "objekt",
      set: "s\xE6t",
      file: "fil",
    };
  function u(t) {
    return o[t] ?? null;
  }
  function n(t) {
    return i[t] ?? t;
  }
  let r = (t) => {
      let d = typeof t;
      switch (d) {
        case "number":
          return Number.isNaN(t) ? "NaN" : "tal";
        case "object":
          return Array.isArray(t)
            ? "liste"
            : t === null
            ? "null"
            : Object.getPrototypeOf(t) !== Object.prototype && t.constructor
            ? t.constructor.name
            : "objekt";
      }
      return d;
    },
    e = {
      regex: "input",
      email: "e-mailadresse",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dato- og klokkesl\xE6t",
      date: "ISO-dato",
      time: "ISO-klokkesl\xE6t",
      duration: "ISO-varighed",
      ipv4: "IPv4-omr\xE5de",
      ipv6: "IPv6-omr\xE5de",
      cidrv4: "IPv4-spektrum",
      cidrv6: "IPv6-spektrum",
      base64: "base64-kodet streng",
      base64url: "base64url-kodet streng",
      json_string: "JSON-streng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "input",
    };
  return (t) => {
    switch (t.code) {
      case "invalid_type":
        return `Ugyldigt input: forventede ${n(t.expected)}, fik ${
          n(r(t.input))
        }`;
      case "invalid_value":
        return t.values.length === 1
          ? `Ugyldig v\xE6rdi: forventede ${l(t.values[0])}`
          : `Ugyldigt valg: forventede en af f\xF8lgende ${a(t.values, "|")}`;
      case "too_big": {
        let d = t.inclusive ? "<=" : "<", m = u(t.origin), v = n(t.origin);
        return m
          ? `For stor: forventede ${
            v ?? "value"
          } ${m.verb} ${d} ${t.maximum.toString()} ${m.unit ?? "elementer"}`
          : `For stor: forventede ${
            v ?? "value"
          } havde ${d} ${t.maximum.toString()}`;
      }
      case "too_small": {
        let d = t.inclusive ? ">=" : ">", m = u(t.origin), v = n(t.origin);
        return m
          ? `For lille: forventede ${v} ${m.verb} ${d} ${t.minimum.toString()} ${m.unit}`
          : `For lille: forventede ${v} havde ${d} ${t.minimum.toString()}`;
      }
      case "invalid_format": {
        let d = t;
        return d.format === "starts_with"
          ? `Ugyldig streng: skal starte med "${d.prefix}"`
          : d.format === "ends_with"
          ? `Ugyldig streng: skal ende med "${d.suffix}"`
          : d.format === "includes"
          ? `Ugyldig streng: skal indeholde "${d.includes}"`
          : d.format === "regex"
          ? `Ugyldig streng: skal matche m\xF8nsteret ${d.pattern}`
          : `Ugyldig ${e[d.format] ?? t.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${t.divisor}`;
      case "unrecognized_keys":
        return `${
          t.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"
        }: ${a(t.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${t.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${t.origin}`;
      default:
        return "Ugyldigt input";
    }
  };
};
function U() {
  return { localeError: x() };
}
var O = () => {
  let o = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "Zahl";
        case "object": {
          if (Array.isArray(r)) {
            return "Array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "Eingabe",
      email: "E-Mail-Adresse",
      url: "URL",
      emoji: "Emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-Datum und -Uhrzeit",
      date: "ISO-Datum",
      time: "ISO-Uhrzeit",
      duration: "ISO-Dauer",
      ipv4: "IPv4-Adresse",
      ipv6: "IPv6-Adresse",
      cidrv4: "IPv4-Bereich",
      cidrv6: "IPv6-Bereich",
      base64: "Base64-codierter String",
      base64url: "Base64-URL-codierter String",
      json_string: "JSON-String",
      e164: "E.164-Nummer",
      jwt: "JWT",
      template_literal: "Eingabe",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Ung\xFCltige Eingabe: erwartet ${r.expected}, erhalten ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Ung\xFCltige Eingabe: erwartet ${l(r.values[0])}`
          : `Ung\xFCltige Option: erwartet eine von ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Zu gro\xDF: erwartet, dass ${
            r.origin ?? "Wert"
          } ${e}${r.maximum.toString()} ${t.unit ?? "Elemente"} hat`
          : `Zu gro\xDF: erwartet, dass ${
            r.origin ?? "Wert"
          } ${e}${r.maximum.toString()} ist`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Zu klein: erwartet, dass ${r.origin} ${e}${r.minimum.toString()} ${t.unit} hat`
          : `Zu klein: erwartet, dass ${r.origin} ${e}${r.minimum.toString()} ist`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Ung\xFCltiger String: muss mit "${e.prefix}" beginnen`
          : e.format === "ends_with"
          ? `Ung\xFCltiger String: muss mit "${e.suffix}" enden`
          : e.format === "includes"
          ? `Ung\xFCltiger String: muss "${e.includes}" enthalten`
          : e.format === "regex"
          ? `Ung\xFCltiger String: muss dem Muster ${e.pattern} entsprechen`
          : `Ung\xFCltig: ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${r.divisor} sein`;
      case "unrecognized_keys":
        return `${
          r.keys.length > 1
            ? "Unbekannte Schl\xFCssel"
            : "Unbekannter Schl\xFCssel"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${r.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${r.origin}`;
      default:
        return "Ung\xFCltige Eingabe";
    }
  };
};
function N() {
  return { localeError: O() };
}
var w = (o) => {
    let i = typeof o;
    switch (i) {
      case "number":
        return Number.isNaN(o) ? "NaN" : "number";
      case "object": {
        if (Array.isArray(o)) {
          return "array";
        }
        if (o === null) {
          return "null";
        }
        if (Object.getPrototypeOf(o) !== Object.prototype && o.constructor) {
          return o.constructor.name;
        }
      }
    }
    return i;
  },
  z = () => {
    let o = {
      string: { unit: "characters", verb: "to have" },
      file: { unit: "bytes", verb: "to have" },
      array: { unit: "items", verb: "to have" },
      set: { unit: "items", verb: "to have" },
    };
    function i(n) {
      return o[n] ?? null;
    }
    let u = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      jwt: "JWT",
      template_literal: "input",
    };
    return (n) => {
      switch (n.code) {
        case "invalid_type":
          return `Invalid input: expected ${n.expected}, received ${
            w(n.input)
          }`;
        case "invalid_value":
          return n.values.length === 1
            ? `Invalid input: expected ${l(n.values[0])}`
            : `Invalid option: expected one of ${a(n.values, "|")}`;
        case "too_big": {
          let r = n.inclusive ? "<=" : "<", e = i(n.origin);
          return e
            ? `Too big: expected ${
              n.origin ?? "value"
            } to have ${r}${n.maximum.toString()} ${e.unit ?? "elements"}`
            : `Too big: expected ${
              n.origin ?? "value"
            } to be ${r}${n.maximum.toString()}`;
        }
        case "too_small": {
          let r = n.inclusive ? ">=" : ">", e = i(n.origin);
          return e
            ? `Too small: expected ${n.origin} to have ${r}${n.minimum.toString()} ${e.unit}`
            : `Too small: expected ${n.origin} to be ${r}${n.minimum.toString()}`;
        }
        case "invalid_format": {
          let r = n;
          return r.format === "starts_with"
            ? `Invalid string: must start with "${r.prefix}"`
            : r.format === "ends_with"
            ? `Invalid string: must end with "${r.suffix}"`
            : r.format === "includes"
            ? `Invalid string: must include "${r.includes}"`
            : r.format === "regex"
            ? `Invalid string: must match pattern ${r.pattern}`
            : `Invalid ${u[r.format] ?? n.format}`;
        }
        case "not_multiple_of":
          return `Invalid number: must be a multiple of ${n.divisor}`;
        case "unrecognized_keys":
          return `Unrecognized key${n.keys.length > 1 ? "s" : ""}: ${
            a(n.keys, ", ")
          }`;
        case "invalid_key":
          return `Invalid key in ${n.origin}`;
        case "invalid_union":
          return "Invalid input";
        case "invalid_element":
          return `Invalid value in ${n.origin}`;
        default:
          return "Invalid input";
      }
    };
  };
function D() {
  return { localeError: z() };
}
var P = (o) => {
    let i = typeof o;
    switch (i) {
      case "number":
        return Number.isNaN(o) ? "NaN" : "nombro";
      case "object": {
        if (Array.isArray(o)) {
          return "tabelo";
        }
        if (o === null) {
          return "senvalora";
        }
        if (Object.getPrototypeOf(o) !== Object.prototype && o.constructor) {
          return o.constructor.name;
        }
      }
    }
    return i;
  },
  T = () => {
    let o = {
      string: { unit: "karaktrojn", verb: "havi" },
      file: { unit: "bajtojn", verb: "havi" },
      array: { unit: "elementojn", verb: "havi" },
      set: { unit: "elementojn", verb: "havi" },
    };
    function i(n) {
      return o[n] ?? null;
    }
    let u = {
      regex: "enigo",
      email: "retadreso",
      url: "URL",
      emoji: "emo\u011Dio",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-datotempo",
      date: "ISO-dato",
      time: "ISO-tempo",
      duration: "ISO-da\u016Dro",
      ipv4: "IPv4-adreso",
      ipv6: "IPv6-adreso",
      cidrv4: "IPv4-rango",
      cidrv6: "IPv6-rango",
      base64: "64-ume kodita karaktraro",
      base64url: "URL-64-ume kodita karaktraro",
      json_string: "JSON-karaktraro",
      e164: "E.164-nombro",
      jwt: "JWT",
      template_literal: "enigo",
    };
    return (n) => {
      switch (n.code) {
        case "invalid_type":
          return `Nevalida enigo: atendi\u011Dis ${n.expected}, ricevi\u011Dis ${
            P(n.input)
          }`;
        case "invalid_value":
          return n.values.length === 1
            ? `Nevalida enigo: atendi\u011Dis ${l(n.values[0])}`
            : `Nevalida opcio: atendi\u011Dis unu el ${a(n.values, "|")}`;
        case "too_big": {
          let r = n.inclusive ? "<=" : "<", e = i(n.origin);
          return e
            ? `Tro granda: atendi\u011Dis ke ${
              n.origin ?? "valoro"
            } havu ${r}${n.maximum.toString()} ${e.unit ?? "elementojn"}`
            : `Tro granda: atendi\u011Dis ke ${
              n.origin ?? "valoro"
            } havu ${r}${n.maximum.toString()}`;
        }
        case "too_small": {
          let r = n.inclusive ? ">=" : ">", e = i(n.origin);
          return e
            ? `Tro malgranda: atendi\u011Dis ke ${n.origin} havu ${r}${n.minimum.toString()} ${e.unit}`
            : `Tro malgranda: atendi\u011Dis ke ${n.origin} estu ${r}${n.minimum.toString()}`;
        }
        case "invalid_format": {
          let r = n;
          return r.format === "starts_with"
            ? `Nevalida karaktraro: devas komenci\u011Di per "${r.prefix}"`
            : r.format === "ends_with"
            ? `Nevalida karaktraro: devas fini\u011Di per "${r.suffix}"`
            : r.format === "includes"
            ? `Nevalida karaktraro: devas inkluzivi "${r.includes}"`
            : r.format === "regex"
            ? `Nevalida karaktraro: devas kongrui kun la modelo ${r.pattern}`
            : `Nevalida ${u[r.format] ?? n.format}`;
        }
        case "not_multiple_of":
          return `Nevalida nombro: devas esti oblo de ${n.divisor}`;
        case "unrecognized_keys":
          return `Nekonata${n.keys.length > 1 ? "j" : ""} \u015Dlosilo${
            n.keys.length > 1 ? "j" : ""
          }: ${a(n.keys, ", ")}`;
        case "invalid_key":
          return `Nevalida \u015Dlosilo en ${n.origin}`;
        case "invalid_union":
          return "Nevalida enigo";
        case "invalid_element":
          return `Nevalida valoro en ${n.origin}`;
        default:
          return "Nevalida enigo";
      }
    };
  };
function E() {
  return { localeError: T() };
}
var V = () => {
  let o = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "n\xFAmero";
        case "object": {
          if (Array.isArray(r)) {
            return "arreglo";
          }
          if (r === null) {
            return "nulo";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "entrada",
      email: "direcci\xF3n de correo electr\xF3nico",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "fecha y hora ISO",
      date: "fecha ISO",
      time: "hora ISO",
      duration: "duraci\xF3n ISO",
      ipv4: "direcci\xF3n IPv4",
      ipv6: "direcci\xF3n IPv6",
      cidrv4: "rango IPv4",
      cidrv6: "rango IPv6",
      base64: "cadena codificada en base64",
      base64url: "URL codificada en base64",
      json_string: "cadena JSON",
      e164: "n\xFAmero E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Entrada inv\xE1lida: se esperaba ${r.expected}, recibido ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Entrada inv\xE1lida: se esperaba ${l(r.values[0])}`
          : `Opci\xF3n inv\xE1lida: se esperaba una de ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Demasiado grande: se esperaba que ${
            r.origin ?? "valor"
          } tuviera ${e}${r.maximum.toString()} ${t.unit ?? "elementos"}`
          : `Demasiado grande: se esperaba que ${
            r.origin ?? "valor"
          } fuera ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Demasiado peque\xF1o: se esperaba que ${r.origin} tuviera ${e}${r.minimum.toString()} ${t.unit}`
          : `Demasiado peque\xF1o: se esperaba que ${r.origin} fuera ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Cadena inv\xE1lida: debe comenzar con "${e.prefix}"`
          : e.format === "ends_with"
          ? `Cadena inv\xE1lida: debe terminar en "${e.suffix}"`
          : e.format === "includes"
          ? `Cadena inv\xE1lida: debe incluir "${e.includes}"`
          : e.format === "regex"
          ? `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${e.pattern}`
          : `Inv\xE1lido ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${r.divisor}`;
      case "unrecognized_keys":
        return `Llave${r.keys.length > 1 ? "s" : ""} desconocida${
          r.keys.length > 1 ? "s" : ""
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${r.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${r.origin}`;
      default:
        return "Entrada inv\xE1lida";
    }
  };
};
function A() {
  return { localeError: V() };
}
var L = () => {
  let o = {
    string: {
      unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
    file: {
      unit: "\u0628\u0627\u06CC\u062A",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
    array: {
      unit: "\u0622\u06CC\u062A\u0645",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
    set: {
      unit: "\u0622\u06CC\u062A\u0645",
      verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0639\u062F\u062F";
        case "object": {
          if (Array.isArray(r)) {
            return "\u0622\u0631\u0627\u06CC\u0647";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0648\u0631\u0648\u062F\u06CC",
      email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
      url: "URL",
      emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
      date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
      time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
      duration:
        "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
      ipv4: "IPv4 \u0622\u062F\u0631\u0633",
      ipv6: "IPv6 \u0622\u062F\u0631\u0633",
      cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
      cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
      base64: "base64-encoded \u0631\u0634\u062A\u0647",
      base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
      json_string: "JSON \u0631\u0634\u062A\u0647",
      e164: "E.164 \u0639\u062F\u062F",
      jwt: "JWT",
      template_literal: "\u0648\u0631\u0648\u062F\u06CC",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${r.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${
          u(r.input)
        } \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${
            l(r.values[0])
          } \u0645\u06CC\u200C\u0628\u0648\u062F`
          : `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${
            a(r.values, "|")
          } \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${
            r.origin ?? "\u0645\u0642\u062F\u0627\u0631"
          } \u0628\u0627\u06CC\u062F ${e}${r.maximum.toString()} ${
            t.unit ?? "\u0639\u0646\u0635\u0631"
          } \u0628\u0627\u0634\u062F`
          : `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${
            r.origin ?? "\u0645\u0642\u062F\u0627\u0631"
          } \u0628\u0627\u06CC\u062F ${e}${r.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${r.origin} \u0628\u0627\u06CC\u062F ${e}${r.minimum.toString()} ${t.unit} \u0628\u0627\u0634\u062F`
          : `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${r.origin} \u0628\u0627\u06CC\u062F ${e}${r.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${e.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`
          : e.format === "ends_with"
          ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${e.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`
          : e.format === "includes"
          ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${e.includes}" \u0628\u0627\u0634\u062F`
          : e.format === "regex"
          ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${e.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`
          : `${
            n[e.format] ?? r.format
          } \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${r.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${
          r.keys.length > 1 ? "\u0647\u0627\u06CC" : ""
        } \u0646\u0627\u0634\u0646\u0627\u0633: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${r.origin}`;
      case "invalid_union":
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${r.origin}`;
      default:
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
    }
  };
};
function J() {
  return { localeError: L() };
}
var R = () => {
  let o = {
    string: { unit: "merkki\xE4", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "s\xE4\xE4nn\xF6llinen lauseke",
      email: "s\xE4hk\xF6postiosoite",
      url: "URL-osoite",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-aikaleima",
      date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
      time: "ISO-aika",
      duration: "ISO-kesto",
      ipv4: "IPv4-osoite",
      ipv6: "IPv6-osoite",
      cidrv4: "IPv4-alue",
      cidrv6: "IPv6-alue",
      base64: "base64-koodattu merkkijono",
      base64url: "base64url-koodattu merkkijono",
      json_string: "JSON-merkkijono",
      e164: "E.164-luku",
      jwt: "JWT",
      template_literal: "templaattimerkkijono",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Virheellinen tyyppi: odotettiin ${r.expected}, oli ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Virheellinen sy\xF6te: t\xE4ytyy olla ${l(r.values[0])}`
          : `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Liian suuri: ${t.subject} t\xE4ytyy olla ${e}${r.maximum.toString()} ${t.unit}`
            .trim()
          : `Liian suuri: arvon t\xE4ytyy olla ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Liian pieni: ${t.subject} t\xE4ytyy olla ${e}${r.minimum.toString()} ${t.unit}`
            .trim()
          : `Liian pieni: arvon t\xE4ytyy olla ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${e.prefix}"`
          : e.format === "ends_with"
          ? `Virheellinen sy\xF6te: t\xE4ytyy loppua "${e.suffix}"`
          : e.format === "includes"
          ? `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${e.includes}"`
          : e.format === "regex"
          ? `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${e.pattern}`
          : `Virheellinen ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${r.divisor} monikerta`;
      case "unrecognized_keys":
        return `${
          r.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return "Virheellinen sy\xF6te";
    }
  };
};
function G() {
  return { localeError: R() };
}
var K = () => {
  let o = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "nombre";
        case "object": {
          if (Array.isArray(r)) {
            return "tableau";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "entr\xE9e",
      email: "adresse e-mail",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "date et heure ISO",
      date: "date ISO",
      time: "heure ISO",
      duration: "dur\xE9e ISO",
      ipv4: "adresse IPv4",
      ipv6: "adresse IPv6",
      cidrv4: "plage IPv4",
      cidrv6: "plage IPv6",
      base64: "cha\xEEne encod\xE9e en base64",
      base64url: "cha\xEEne encod\xE9e en base64url",
      json_string: "cha\xEEne JSON",
      e164: "num\xE9ro E.164",
      jwt: "JWT",
      template_literal: "entr\xE9e",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Entr\xE9e invalide : ${r.expected} attendu, ${
          u(r.input)
        } re\xE7u`;
      case "invalid_value":
        return r.values.length === 1
          ? `Entr\xE9e invalide : ${l(r.values[0])} attendu`
          : `Option invalide : une valeur parmi ${a(r.values, "|")} attendue`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Trop grand : ${
            r.origin ?? "valeur"
          } doit ${t.verb} ${e}${r.maximum.toString()} ${
            t.unit ?? "\xE9l\xE9ment(s)"
          }`
          : `Trop grand : ${
            r.origin ?? "valeur"
          } doit \xEAtre ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Trop petit : ${r.origin} doit ${t.verb} ${e}${r.minimum.toString()} ${t.unit}`
          : `Trop petit : ${r.origin} doit \xEAtre ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Cha\xEEne invalide : doit commencer par "${e.prefix}"`
          : e.format === "ends_with"
          ? `Cha\xEEne invalide : doit se terminer par "${e.suffix}"`
          : e.format === "includes"
          ? `Cha\xEEne invalide : doit inclure "${e.includes}"`
          : e.format === "regex"
          ? `Cha\xEEne invalide : doit correspondre au mod\xE8le ${e.pattern}`
          : `${n[e.format] ?? r.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${r.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${r.keys.length > 1 ? "s" : ""} non reconnue${
          r.keys.length > 1 ? "s" : ""
        } : ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${r.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${r.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function W() {
  return { localeError: K() };
}
var X = () => {
  let o = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "entr\xE9e",
      email: "adresse courriel",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "date-heure ISO",
      date: "date ISO",
      time: "heure ISO",
      duration: "dur\xE9e ISO",
      ipv4: "adresse IPv4",
      ipv6: "adresse IPv6",
      cidrv4: "plage IPv4",
      cidrv6: "plage IPv6",
      base64: "cha\xEEne encod\xE9e en base64",
      base64url: "cha\xEEne encod\xE9e en base64url",
      json_string: "cha\xEEne JSON",
      e164: "num\xE9ro E.164",
      jwt: "JWT",
      template_literal: "entr\xE9e",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Entr\xE9e invalide : attendu ${r.expected}, re\xE7u ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Entr\xE9e invalide : attendu ${l(r.values[0])}`
          : `Option invalide : attendu l'une des valeurs suivantes ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "\u2264" : "<", t = i(r.origin);
        return t
          ? `Trop grand : attendu que ${
            r.origin ?? "la valeur"
          } ait ${e}${r.maximum.toString()} ${t.unit}`
          : `Trop grand : attendu que ${
            r.origin ?? "la valeur"
          } soit ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? "\u2265" : ">", t = i(r.origin);
        return t
          ? `Trop petit : attendu que ${r.origin} ait ${e}${r.minimum.toString()} ${t.unit}`
          : `Trop petit : attendu que ${r.origin} soit ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Cha\xEEne invalide : doit commencer par "${e.prefix}"`
          : e.format === "ends_with"
          ? `Cha\xEEne invalide : doit se terminer par "${e.suffix}"`
          : e.format === "includes"
          ? `Cha\xEEne invalide : doit inclure "${e.includes}"`
          : e.format === "regex"
          ? `Cha\xEEne invalide : doit correspondre au motif ${e.pattern}`
          : `${n[e.format] ?? r.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${r.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${r.keys.length > 1 ? "s" : ""} non reconnue${
          r.keys.length > 1 ? "s" : ""
        } : ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${r.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${r.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function F() {
  return { localeError: X() };
}
var C = () => {
  let o = {
    string: {
      unit: "\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA",
      verb: "\u05DC\u05DB\u05DC\u05D5\u05DC",
    },
    file: {
      unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD",
      verb: "\u05DC\u05DB\u05DC\u05D5\u05DC",
    },
    array: {
      unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD",
      verb: "\u05DC\u05DB\u05DC\u05D5\u05DC",
    },
    set: {
      unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD",
      verb: "\u05DC\u05DB\u05DC\u05D5\u05DC",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u05E7\u05DC\u05D8",
      email:
        "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC",
      url: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA",
      emoji: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO",
      date: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO",
      time: "\u05D6\u05DE\u05DF ISO",
      duration: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO",
      ipv4: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4",
      ipv6: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6",
      cidrv4: "\u05D8\u05D5\u05D5\u05D7 IPv4",
      cidrv6: "\u05D8\u05D5\u05D5\u05D7 IPv6",
      base64:
        "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64",
      base64url:
        "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA",
      json_string: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON",
      e164: "\u05DE\u05E1\u05E4\u05E8 E.164",
      jwt: "JWT",
      template_literal: "\u05E7\u05DC\u05D8",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA ${r.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA ${
            l(r.values[0])
          }`
          : `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05D0\u05D7\u05EA \u05DE\u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA  ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${
            r.origin ?? "value"
          } \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${e}${r.maximum.toString()} ${
            t.unit ?? "elements"
          }`
          : `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${
            r.origin ?? "value"
          } \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${r.origin} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${e}${r.minimum.toString()} ${t.unit}`
          : `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${r.origin} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1"${e.prefix}"`
          : e.format === "ends_with"
          ? `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${e.suffix}"`
          : e.format === "includes"
          ? `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${e.includes}"`
          : e.format === "regex"
          ? `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${e.pattern}`
          : `${n[e.format] ?? r.format} \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${r.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${
          r.keys.length > 1 ? "\u05D5\u05EA" : ""
        } \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${
          r.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `\u05DE\u05E4\u05EA\u05D7 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${r.origin}`;
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element":
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${r.origin}`;
      default:
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
    }
  };
};
function M() {
  return { localeError: C() };
}
var q = () => {
  let o = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "sz\xE1m";
        case "object": {
          if (Array.isArray(r)) {
            return "t\xF6mb";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "bemenet",
      email: "email c\xEDm",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO id\u0151b\xE9lyeg",
      date: "ISO d\xE1tum",
      time: "ISO id\u0151",
      duration: "ISO id\u0151intervallum",
      ipv4: "IPv4 c\xEDm",
      ipv6: "IPv6 c\xEDm",
      cidrv4: "IPv4 tartom\xE1ny",
      cidrv6: "IPv6 tartom\xE1ny",
      base64: "base64-k\xF3dolt string",
      base64url: "base64url-k\xF3dolt string",
      json_string: "JSON string",
      e164: "E.164 sz\xE1m",
      jwt: "JWT",
      template_literal: "bemenet",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${r.expected}, a kapott \xE9rt\xE9k ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${l(r.values[0])}`
          : `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `T\xFAl nagy: ${
            r.origin ?? "\xE9rt\xE9k"
          } m\xE9rete t\xFAl nagy ${e}${r.maximum.toString()} ${
            t.unit ?? "elem"
          }`
          : `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${
            r.origin ?? "\xE9rt\xE9k"
          } t\xFAl nagy: ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${r.origin} m\xE9rete t\xFAl kicsi ${e}${r.minimum.toString()} ${t.unit}`
          : `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${r.origin} t\xFAl kicsi ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\xC9rv\xE9nytelen string: "${e.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`
          : e.format === "ends_with"
          ? `\xC9rv\xE9nytelen string: "${e.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`
          : e.format === "includes"
          ? `\xC9rv\xE9nytelen string: "${e.includes}" \xE9rt\xE9ket kell tartalmaznia`
          : e.format === "regex"
          ? `\xC9rv\xE9nytelen string: ${e.pattern} mint\xE1nak kell megfelelnie`
          : `\xC9rv\xE9nytelen ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${r.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${r.keys.length > 1 ? "s" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${r.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${r.origin}`;
      default:
        return "\xC9rv\xE9nytelen bemenet";
    }
  };
};
function B() {
  return { localeError: q() };
}
var Y = () => {
  let o = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "input",
      email: "alamat email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "tanggal dan waktu format ISO",
      date: "tanggal format ISO",
      time: "jam format ISO",
      duration: "durasi format ISO",
      ipv4: "alamat IPv4",
      ipv6: "alamat IPv6",
      cidrv4: "rentang alamat IPv4",
      cidrv6: "rentang alamat IPv6",
      base64: "string dengan enkode base64",
      base64url: "string dengan enkode base64url",
      json_string: "string JSON",
      e164: "angka E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Input tidak valid: diharapkan ${r.expected}, diterima ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Input tidak valid: diharapkan ${l(r.values[0])}`
          : `Pilihan tidak valid: diharapkan salah satu dari ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Terlalu besar: diharapkan ${
            r.origin ?? "value"
          } memiliki ${e}${r.maximum.toString()} ${t.unit ?? "elemen"}`
          : `Terlalu besar: diharapkan ${
            r.origin ?? "value"
          } menjadi ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Terlalu kecil: diharapkan ${r.origin} memiliki ${e}${r.minimum.toString()} ${t.unit}`
          : `Terlalu kecil: diharapkan ${r.origin} menjadi ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `String tidak valid: harus dimulai dengan "${e.prefix}"`
          : e.format === "ends_with"
          ? `String tidak valid: harus berakhir dengan "${e.suffix}"`
          : e.format === "includes"
          ? `String tidak valid: harus menyertakan "${e.includes}"`
          : e.format === "regex"
          ? `String tidak valid: harus sesuai pola ${e.pattern}`
          : `${n[e.format] ?? r.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${r.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${r.keys.length > 1 ? "s" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `Kunci tidak valid di ${r.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${r.origin}`;
      default:
        return "Input tidak valid";
    }
  };
};
function Z() {
  return { localeError: Y() };
}
var H = (o) => {
    let i = typeof o;
    switch (i) {
      case "number":
        return Number.isNaN(o) ? "NaN" : "n\xFAmer";
      case "object": {
        if (Array.isArray(o)) {
          return "fylki";
        }
        if (o === null) {
          return "null";
        }
        if (Object.getPrototypeOf(o) !== Object.prototype && o.constructor) {
          return o.constructor.name;
        }
      }
    }
    return i;
  },
  Q = () => {
    let o = {
      string: { unit: "stafi", verb: "a\xF0 hafa" },
      file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
      array: { unit: "hluti", verb: "a\xF0 hafa" },
      set: { unit: "hluti", verb: "a\xF0 hafa" },
    };
    function i(n) {
      return o[n] ?? null;
    }
    let u = {
      regex: "gildi",
      email: "netfang",
      url: "vefsl\xF3\xF0",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dagsetning og t\xEDmi",
      date: "ISO dagsetning",
      time: "ISO t\xEDmi",
      duration: "ISO t\xEDmalengd",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded strengur",
      base64url: "base64url-encoded strengur",
      json_string: "JSON strengur",
      e164: "E.164 t\xF6lugildi",
      jwt: "JWT",
      template_literal: "gildi",
    };
    return (n) => {
      switch (n.code) {
        case "invalid_type":
          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${
            H(n.input)
          } \xFEar sem \xE1 a\xF0 vera ${n.expected}`;
        case "invalid_value":
          return n.values.length === 1
            ? `Rangt gildi: gert r\xE1\xF0 fyrir ${l(n.values[0])}`
            : `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${
              a(n.values, "|")
            }`;
        case "too_big": {
          let r = n.inclusive ? "<=" : "<", e = i(n.origin);
          return e
            ? `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${
              n.origin ?? "gildi"
            } hafi ${r}${n.maximum.toString()} ${e.unit ?? "hluti"}`
            : `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${
              n.origin ?? "gildi"
            } s\xE9 ${r}${n.maximum.toString()}`;
        }
        case "too_small": {
          let r = n.inclusive ? ">=" : ">", e = i(n.origin);
          return e
            ? `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${n.origin} hafi ${r}${n.minimum.toString()} ${e.unit}`
            : `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${n.origin} s\xE9 ${r}${n.minimum.toString()}`;
        }
        case "invalid_format": {
          let r = n;
          return r.format === "starts_with"
            ? `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${r.prefix}"`
            : r.format === "ends_with"
            ? `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${r.suffix}"`
            : r.format === "includes"
            ? `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${r.includes}"`
            : r.format === "regex"
            ? `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${r.pattern}`
            : `Rangt ${u[r.format] ?? n.format}`;
        }
        case "not_multiple_of":
          return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${n.divisor}`;
        case "unrecognized_keys":
          return `\xD3\xFEekkt ${
            n.keys.length > 1 ? "ir lyklar" : "ur lykill"
          }: ${a(n.keys, ", ")}`;
        case "invalid_key":
          return `Rangur lykill \xED ${n.origin}`;
        case "invalid_union":
          return "Rangt gildi";
        case "invalid_element":
          return `Rangt gildi \xED ${n.origin}`;
        default:
          return "Rangt gildi";
      }
    };
  };
function rr() {
  return { localeError: Q() };
}
var er = () => {
  let o = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "numero";
        case "object": {
          if (Array.isArray(r)) {
            return "vettore";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "input",
      email: "indirizzo email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data e ora ISO",
      date: "data ISO",
      time: "ora ISO",
      duration: "durata ISO",
      ipv4: "indirizzo IPv4",
      ipv6: "indirizzo IPv6",
      cidrv4: "intervallo IPv4",
      cidrv6: "intervallo IPv6",
      base64: "stringa codificata in base64",
      base64url: "URL codificata in base64",
      json_string: "stringa JSON",
      e164: "numero E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Input non valido: atteso ${r.expected}, ricevuto ${u(r.input)}`;
      case "invalid_value":
        return r.values.length === 1
          ? `Input non valido: atteso ${l(r.values[0])}`
          : `Opzione non valida: atteso uno tra ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Troppo grande: ${
            r.origin ?? "valore"
          } deve avere ${e}${r.maximum.toString()} ${t.unit ?? "elementi"}`
          : `Troppo grande: ${
            r.origin ?? "valore"
          } deve essere ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Troppo piccolo: ${r.origin} deve avere ${e}${r.minimum.toString()} ${t.unit}`
          : `Troppo piccolo: ${r.origin} deve essere ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Stringa non valida: deve iniziare con "${e.prefix}"`
          : e.format === "ends_with"
          ? `Stringa non valida: deve terminare con "${e.suffix}"`
          : e.format === "includes"
          ? `Stringa non valida: deve includere "${e.includes}"`
          : e.format === "regex"
          ? `Stringa non valida: deve corrispondere al pattern ${e.pattern}`
          : `Invalid ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${r.divisor}`;
      case "unrecognized_keys":
        return `Chiav${r.keys.length > 1 ? "i" : "e"} non riconosciut${
          r.keys.length > 1 ? "e" : "a"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${r.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${r.origin}`;
      default:
        return "Input non valido";
    }
  };
};
function tr() {
  return { localeError: er() };
}
var nr = () => {
  let o = {
    string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
    file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
    array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
    set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u6570\u5024";
        case "object": {
          if (Array.isArray(r)) {
            return "\u914D\u5217";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u5165\u529B\u5024",
      email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
      url: "URL",
      emoji: "\u7D75\u6587\u5B57",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO\u65E5\u6642",
      date: "ISO\u65E5\u4ED8",
      time: "ISO\u6642\u523B",
      duration: "ISO\u671F\u9593",
      ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
      ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
      cidrv4: "IPv4\u7BC4\u56F2",
      cidrv6: "IPv6\u7BC4\u56F2",
      base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
      base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
      json_string: "JSON\u6587\u5B57\u5217",
      e164: "E.164\u756A\u53F7",
      jwt: "JWT",
      template_literal: "\u5165\u529B\u5024",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u7121\u52B9\u306A\u5165\u529B: ${r.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${
          u(r.input)
        }\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u7121\u52B9\u306A\u5165\u529B: ${
            l(r.values[0])
          }\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`
          : `\u7121\u52B9\u306A\u9078\u629E: ${
            a(r.values, "\u3001")
          }\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        let e = r.inclusive
            ? "\u4EE5\u4E0B\u3067\u3042\u308B"
            : "\u3088\u308A\u5C0F\u3055\u3044",
          t = i(r.origin);
        return t
          ? `\u5927\u304D\u3059\u304E\u308B\u5024: ${
            r.origin ?? "\u5024"
          }\u306F${r.maximum.toString()}${
            t.unit ?? "\u8981\u7D20"
          }${e}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : `\u5927\u304D\u3059\u304E\u308B\u5024: ${
            r.origin ?? "\u5024"
          }\u306F${r.maximum.toString()}${e}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        let e = r.inclusive
            ? "\u4EE5\u4E0A\u3067\u3042\u308B"
            : "\u3088\u308A\u5927\u304D\u3044",
          t = i(r.origin);
        return t
          ? `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${r.origin}\u306F${r.minimum.toString()}${t.unit}${e}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${r.origin}\u306F${r.minimum.toString()}${e}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${e.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : e.format === "ends_with"
          ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${e.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : e.format === "includes"
          ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${e.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : e.format === "regex"
          ? `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${e.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`
          : `\u7121\u52B9\u306A${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${r.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${
          r.keys.length > 1 ? "\u7FA4" : ""
        }: ${a(r.keys, "\u3001")}`;
      case "invalid_key":
        return `${r.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${r.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return "\u7121\u52B9\u306A\u5165\u529B";
    }
  };
};
function ir() {
  return { localeError: nr() };
}
var or = () => {
  let o = {
    string: {
      unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
    file: {
      unit: "\u1794\u17C3",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
    array: {
      unit: "\u1792\u17B6\u178F\u17BB",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
    set: {
      unit: "\u1792\u17B6\u178F\u17BB",
      verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r)
            ? "\u1798\u17B7\u1793\u1798\u17C2\u1793\u1787\u17B6\u179B\u17C1\u1781 (NaN)"
            : "\u179B\u17C1\u1781";
        case "object": {
          if (Array.isArray(r)) {
            return "\u17A2\u17B6\u179A\u17C1 (Array)";
          }
          if (r === null) {
            return "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex:
        "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
      email:
        "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
      url: "URL",
      emoji:
        "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
      date:
        "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
      time: "\u1798\u17C9\u17C4\u1784 ISO",
      duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
      ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
      ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
      cidrv4:
        "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
      cidrv6:
        "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
      base64:
        "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
      base64url:
        "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
      json_string:
        "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
      e164: "\u179B\u17C1\u1781 E.164",
      jwt: "JWT",
      template_literal:
        "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${r.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${
            l(r.values[0])
          }`
          : `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${
            r.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"
          } ${e} ${r.maximum.toString()} ${
            t.unit ?? "\u1792\u17B6\u178F\u17BB"
          }`
          : `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${
            r.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"
          } ${e} ${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${r.origin} ${e} ${r.minimum.toString()} ${t.unit}`
          : `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${r.origin} ${e} ${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${e.prefix}"`
          : e.format === "ends_with"
          ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${e.suffix}"`
          : e.format === "includes"
          ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${e.includes}"`
          : e.format === "regex"
          ? `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${e.pattern}`
          : `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${
            n[e.format] ?? r.format
          }`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${r.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${r.origin}`;
      case "invalid_union":
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${r.origin}`;
      default:
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
    }
  };
};
function ar() {
  return { localeError: or() };
}
var ur = () => {
  let o = {
    string: { unit: "\uBB38\uC790", verb: "to have" },
    file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
    array: { unit: "\uAC1C", verb: "to have" },
    set: { unit: "\uAC1C", verb: "to have" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\uC785\uB825",
      email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
      url: "URL",
      emoji: "\uC774\uBAA8\uC9C0",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
      date: "ISO \uB0A0\uC9DC",
      time: "ISO \uC2DC\uAC04",
      duration: "ISO \uAE30\uAC04",
      ipv4: "IPv4 \uC8FC\uC18C",
      ipv6: "IPv6 \uC8FC\uC18C",
      cidrv4: "IPv4 \uBC94\uC704",
      cidrv6: "IPv6 \uBC94\uC704",
      base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
      base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
      json_string: "JSON \uBB38\uC790\uC5F4",
      e164: "E.164 \uBC88\uD638",
      jwt: "JWT",
      template_literal: "\uC785\uB825",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${r.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${
          u(r.input)
        }\uC785\uB2C8\uB2E4`;
      case "invalid_value":
        return r.values.length === 1
          ? `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${
            l(r.values[0])
          } \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`
          : `\uC798\uBABB\uB41C \uC635\uC158: ${
            a(r.values, "\uB610\uB294 ")
          } \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        let e = r.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC",
          t = e === "\uBBF8\uB9CC"
            ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"
            : "\uC5EC\uC57C \uD569\uB2C8\uB2E4",
          d = i(r.origin),
          m = d?.unit ?? "\uC694\uC18C";
        return d
          ? `${
            r.origin ?? "\uAC12"
          }\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${r.maximum.toString()}${m} ${e}${t}`
          : `${
            r.origin ?? "\uAC12"
          }\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${r.maximum.toString()} ${e}${t}`;
      }
      case "too_small": {
        let e = r.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC",
          t = e === "\uC774\uC0C1"
            ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"
            : "\uC5EC\uC57C \uD569\uB2C8\uB2E4",
          d = i(r.origin),
          m = d?.unit ?? "\uC694\uC18C";
        return d
          ? `${
            r.origin ?? "\uAC12"
          }\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${r.minimum.toString()}${m} ${e}${t}`
          : `${
            r.origin ?? "\uAC12"
          }\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${r.minimum.toString()} ${e}${t}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${e.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`
          : e.format === "ends_with"
          ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${e.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`
          : e.format === "includes"
          ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${e.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`
          : e.format === "regex"
          ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${e.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`
          : `\uC798\uBABB\uB41C ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${r.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${r.origin}`;
      case "invalid_union":
        return "\uC798\uBABB\uB41C \uC785\uB825";
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${r.origin}`;
      default:
        return "\uC798\uBABB\uB41C \uC785\uB825";
    }
  };
};
function lr() {
  return { localeError: ur() };
}
var cr = () => {
  let o = {
    string: {
      unit: "\u0437\u043D\u0430\u0446\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
    file: {
      unit: "\u0431\u0430\u0458\u0442\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
    array: {
      unit: "\u0441\u0442\u0430\u0432\u043A\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
    set: {
      unit: "\u0441\u0442\u0430\u0432\u043A\u0438",
      verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0431\u0440\u043E\u0458";
        case "object": {
          if (Array.isArray(r)) {
            return "\u043D\u0438\u0437\u0430";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0432\u043D\u0435\u0441",
      email:
        "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
      url: "URL",
      emoji: "\u0435\u043C\u043E\u045F\u0438",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
      date: "ISO \u0434\u0430\u0442\u0443\u043C",
      time: "ISO \u0432\u0440\u0435\u043C\u0435",
      duration:
        "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
      ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
      ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
      cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
      cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
      base64:
        "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
      base64url:
        "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
      json_string: "JSON \u043D\u0438\u0437\u0430",
      e164: "E.164 \u0431\u0440\u043E\u0458",
      jwt: "JWT",
      template_literal: "\u0432\u043D\u0435\u0441",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${r.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Invalid input: expected ${l(r.values[0])}`
          : `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${
            r.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"
          } \u0434\u0430 \u0438\u043C\u0430 ${e}${r.maximum.toString()} ${
            t.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"
          }`
          : `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${
            r.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"
          } \u0434\u0430 \u0431\u0438\u0434\u0435 ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${r.origin} \u0434\u0430 \u0438\u043C\u0430 ${e}${r.minimum.toString()} ${t.unit}`
          : `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${r.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${e.prefix}"`
          : e.format === "ends_with"
          ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${e.suffix}"`
          : e.format === "includes"
          ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${e.includes}"`
          : e.format === "regex"
          ? `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${e.pattern}`
          : `Invalid ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${r.divisor}`;
      case "unrecognized_keys":
        return `${
          r.keys.length > 1
            ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438"
            : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${r.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${r.origin}`;
      default:
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
    }
  };
};
function dr() {
  return { localeError: cr() };
}
var mr = () => {
  let o = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "nombor";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "input",
      email: "alamat e-mel",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "tarikh masa ISO",
      date: "tarikh ISO",
      time: "masa ISO",
      duration: "tempoh ISO",
      ipv4: "alamat IPv4",
      ipv6: "alamat IPv6",
      cidrv4: "julat IPv4",
      cidrv6: "julat IPv6",
      base64: "string dikodkan base64",
      base64url: "string dikodkan base64url",
      json_string: "string JSON",
      e164: "nombor E.164",
      jwt: "JWT",
      template_literal: "input",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Input tidak sah: dijangka ${r.expected}, diterima ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Input tidak sah: dijangka ${l(r.values[0])}`
          : `Pilihan tidak sah: dijangka salah satu daripada ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Terlalu besar: dijangka ${
            r.origin ?? "nilai"
          } ${t.verb} ${e}${r.maximum.toString()} ${t.unit ?? "elemen"}`
          : `Terlalu besar: dijangka ${
            r.origin ?? "nilai"
          } adalah ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Terlalu kecil: dijangka ${r.origin} ${t.verb} ${e}${r.minimum.toString()} ${t.unit}`
          : `Terlalu kecil: dijangka ${r.origin} adalah ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `String tidak sah: mesti bermula dengan "${e.prefix}"`
          : e.format === "ends_with"
          ? `String tidak sah: mesti berakhir dengan "${e.suffix}"`
          : e.format === "includes"
          ? `String tidak sah: mesti mengandungi "${e.includes}"`
          : e.format === "regex"
          ? `String tidak sah: mesti sepadan dengan corak ${e.pattern}`
          : `${n[e.format] ?? r.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${r.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${r.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${r.origin}`;
      default:
        return "Input tidak sah";
    }
  };
};
function vr() {
  return { localeError: mr() };
}
var fr = () => {
  let o = {
    string: { unit: "tekens" },
    file: { unit: "bytes" },
    array: { unit: "elementen" },
    set: { unit: "elementen" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "getal";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "invoer",
      email: "emailadres",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datum en tijd",
      date: "ISO datum",
      time: "ISO tijd",
      duration: "ISO duur",
      ipv4: "IPv4-adres",
      ipv6: "IPv6-adres",
      cidrv4: "IPv4-bereik",
      cidrv6: "IPv6-bereik",
      base64: "base64-gecodeerde tekst",
      base64url: "base64 URL-gecodeerde tekst",
      json_string: "JSON string",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "invoer",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Ongeldige invoer: verwacht ${r.expected}, ontving ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Ongeldige invoer: verwacht ${l(r.values[0])}`
          : `Ongeldige optie: verwacht \xE9\xE9n van ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Te lang: verwacht dat ${
            r.origin ?? "waarde"
          } ${e}${r.maximum.toString()} ${t.unit ?? "elementen"} bevat`
          : `Te lang: verwacht dat ${
            r.origin ?? "waarde"
          } ${e}${r.maximum.toString()} is`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Te kort: verwacht dat ${r.origin} ${e}${r.minimum.toString()} ${t.unit} bevat`
          : `Te kort: verwacht dat ${r.origin} ${e}${r.minimum.toString()} is`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Ongeldige tekst: moet met "${e.prefix}" beginnen`
          : e.format === "ends_with"
          ? `Ongeldige tekst: moet op "${e.suffix}" eindigen`
          : e.format === "includes"
          ? `Ongeldige tekst: moet "${e.includes}" bevatten`
          : e.format === "regex"
          ? `Ongeldige tekst: moet overeenkomen met patroon ${e.pattern}`
          : `Ongeldig: ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${r.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${r.keys.length > 1 ? "s" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `Ongeldige key in ${r.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${r.origin}`;
      default:
        return "Ongeldige invoer";
    }
  };
};
function gr() {
  return { localeError: fr() };
}
var sr = () => {
  let o = {
    string: { unit: "tegn", verb: "\xE5 ha" },
    file: { unit: "bytes", verb: "\xE5 ha" },
    array: { unit: "elementer", verb: "\xE5 inneholde" },
    set: { unit: "elementer", verb: "\xE5 inneholde" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "tall";
        case "object": {
          if (Array.isArray(r)) {
            return "liste";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "input",
      email: "e-postadresse",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO dato- og klokkeslett",
      date: "ISO-dato",
      time: "ISO-klokkeslett",
      duration: "ISO-varighet",
      ipv4: "IPv4-omr\xE5de",
      ipv6: "IPv6-omr\xE5de",
      cidrv4: "IPv4-spekter",
      cidrv6: "IPv6-spekter",
      base64: "base64-enkodet streng",
      base64url: "base64url-enkodet streng",
      json_string: "JSON-streng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "input",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Ugyldig input: forventet ${r.expected}, fikk ${u(r.input)}`;
      case "invalid_value":
        return r.values.length === 1
          ? `Ugyldig verdi: forventet ${l(r.values[0])}`
          : `Ugyldig valg: forventet en av ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `For stor(t): forventet ${
            r.origin ?? "value"
          } til \xE5 ha ${e}${r.maximum.toString()} ${t.unit ?? "elementer"}`
          : `For stor(t): forventet ${
            r.origin ?? "value"
          } til \xE5 ha ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `For lite(n): forventet ${r.origin} til \xE5 ha ${e}${r.minimum.toString()} ${t.unit}`
          : `For lite(n): forventet ${r.origin} til \xE5 ha ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Ugyldig streng: m\xE5 starte med "${e.prefix}"`
          : e.format === "ends_with"
          ? `Ugyldig streng: m\xE5 ende med "${e.suffix}"`
          : e.format === "includes"
          ? `Ugyldig streng: m\xE5 inneholde "${e.includes}"`
          : e.format === "regex"
          ? `Ugyldig streng: m\xE5 matche m\xF8nsteret ${e.pattern}`
          : `Ugyldig ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${r.divisor}`;
      case "unrecognized_keys":
        return `${
          r.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${r.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${r.origin}`;
      default:
        return "Ugyldig input";
    }
  };
};
function pr() {
  return { localeError: sr() };
}
var $r = () => {
  let o = {
    string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
    set: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "numara";
        case "object": {
          if (Array.isArray(r)) {
            return "saf";
          }
          if (r === null) {
            return "gayb";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "giren",
      email: "epostag\xE2h",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO heng\xE2m\u0131",
      date: "ISO tarihi",
      time: "ISO zaman\u0131",
      duration: "ISO m\xFCddeti",
      ipv4: "IPv4 ni\u015F\xE2n\u0131",
      ipv6: "IPv6 ni\u015F\xE2n\u0131",
      cidrv4: "IPv4 menzili",
      cidrv6: "IPv6 menzili",
      base64: "base64-\u015Fifreli metin",
      base64url: "base64url-\u015Fifreli metin",
      json_string: "JSON metin",
      e164: "E.164 say\u0131s\u0131",
      jwt: "JWT",
      template_literal: "giren",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `F\xE2sit giren: umulan ${r.expected}, al\u0131nan ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `F\xE2sit giren: umulan ${l(r.values[0])}`
          : `F\xE2sit tercih: m\xFBteberler ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Fazla b\xFCy\xFCk: ${
            r.origin ?? "value"
          }, ${e}${r.maximum.toString()} ${
            t.unit ?? "elements"
          } sahip olmal\u0131yd\u0131.`
          : `Fazla b\xFCy\xFCk: ${
            r.origin ?? "value"
          }, ${e}${r.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Fazla k\xFC\xE7\xFCk: ${r.origin}, ${e}${r.minimum.toString()} ${t.unit} sahip olmal\u0131yd\u0131.`
          : `Fazla k\xFC\xE7\xFCk: ${r.origin}, ${e}${r.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `F\xE2sit metin: "${e.prefix}" ile ba\u015Flamal\u0131.`
          : e.format === "ends_with"
          ? `F\xE2sit metin: "${e.suffix}" ile bitmeli.`
          : e.format === "includes"
          ? `F\xE2sit metin: "${e.includes}" ihtiv\xE2 etmeli.`
          : e.format === "regex"
          ? `F\xE2sit metin: ${e.pattern} nak\u015F\u0131na uymal\u0131.`
          : `F\xE2sit ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${r.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${r.keys.length > 1 ? "s" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `${r.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${r.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return "K\u0131ymet tan\u0131namad\u0131.";
    }
  };
};
function br() {
  return { localeError: $r() };
}
var yr = () => {
  let o = {
    string: {
      unit: "\u062A\u0648\u06A9\u064A",
      verb: "\u0648\u0644\u0631\u064A",
    },
    file: {
      unit: "\u0628\u0627\u06CC\u067C\u0633",
      verb: "\u0648\u0644\u0631\u064A",
    },
    array: {
      unit: "\u062A\u0648\u06A9\u064A",
      verb: "\u0648\u0644\u0631\u064A",
    },
    set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0639\u062F\u062F";
        case "object": {
          if (Array.isArray(r)) {
            return "\u0627\u0631\u06D0";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0648\u0631\u0648\u062F\u064A",
      email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
      url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
      emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
      date: "\u0646\u06D0\u067C\u0647",
      time: "\u0648\u062E\u062A",
      duration: "\u0645\u0648\u062F\u0647",
      ipv4: "\u062F IPv4 \u067E\u062A\u0647",
      ipv6: "\u062F IPv6 \u067E\u062A\u0647",
      cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
      cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
      base64: "base64-encoded \u0645\u062A\u0646",
      base64url: "base64url-encoded \u0645\u062A\u0646",
      json_string: "JSON \u0645\u062A\u0646",
      e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
      jwt: "JWT",
      template_literal: "\u0648\u0631\u0648\u062F\u064A",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${r.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${
          u(r.input)
        } \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${
            l(r.values[0])
          } \u0648\u0627\u06CC`
          : `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${
            a(r.values, "|")
          } \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${
            r.origin ?? "\u0627\u0631\u0632\u069A\u062A"
          } \u0628\u0627\u06CC\u062F ${e}${r.maximum.toString()} ${
            t.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"
          } \u0648\u0644\u0631\u064A`
          : `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${
            r.origin ?? "\u0627\u0631\u0632\u069A\u062A"
          } \u0628\u0627\u06CC\u062F ${e}${r.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${r.origin} \u0628\u0627\u06CC\u062F ${e}${r.minimum.toString()} ${t.unit} \u0648\u0644\u0631\u064A`
          : `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${r.origin} \u0628\u0627\u06CC\u062F ${e}${r.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${e.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`
          : e.format === "ends_with"
          ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${e.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`
          : e.format === "includes"
          ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${e.includes}" \u0648\u0644\u0631\u064A`
          : e.format === "regex"
          ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${e.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`
          : `${n[e.format] ?? r.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${r.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${
          r.keys.length > 1
            ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647"
            : "\u06A9\u0644\u06CC\u0689"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${r.origin} \u06A9\u06D0`;
      case "invalid_union":
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${r.origin} \u06A9\u06D0`;
      default:
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
    }
  };
};
function _r() {
  return { localeError: yr() };
}
var Ir = () => {
  let o = {
    string: { unit: "znak\xF3w", verb: "mie\u0107" },
    file: { unit: "bajt\xF3w", verb: "mie\u0107" },
    array: { unit: "element\xF3w", verb: "mie\u0107" },
    set: { unit: "element\xF3w", verb: "mie\u0107" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "liczba";
        case "object": {
          if (Array.isArray(r)) {
            return "tablica";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "wyra\u017Cenie",
      email: "adres email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data i godzina w formacie ISO",
      date: "data w formacie ISO",
      time: "godzina w formacie ISO",
      duration: "czas trwania ISO",
      ipv4: "adres IPv4",
      ipv6: "adres IPv6",
      cidrv4: "zakres IPv4",
      cidrv6: "zakres IPv6",
      base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
      base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
      json_string: "ci\u0105g znak\xF3w w formacie JSON",
      e164: "liczba E.164",
      jwt: "JWT",
      template_literal: "wej\u015Bcie",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${r.expected}, otrzymano ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${
            l(r.values[0])
          }`
          : `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${
            r.origin ?? "warto\u015B\u0107"
          } b\u0119dzie mie\u0107 ${e}${r.maximum.toString()} ${
            t.unit ?? "element\xF3w"
          }`
          : `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${
            r.origin ?? "warto\u015B\u0107"
          } b\u0119dzie wynosi\u0107 ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${
            r.origin ?? "warto\u015B\u0107"
          } b\u0119dzie mie\u0107 ${e}${r.minimum.toString()} ${
            t.unit ?? "element\xF3w"
          }`
          : `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${
            r.origin ?? "warto\u015B\u0107"
          } b\u0119dzie wynosi\u0107 ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${e.prefix}"`
          : e.format === "ends_with"
          ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${e.suffix}"`
          : e.format === "includes"
          ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${e.includes}"`
          : e.format === "regex"
          ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${e.pattern}`
          : `Nieprawid\u0142ow(y/a/e) ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${r.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${r.keys.length > 1 ? "s" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${r.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${r.origin}`;
      default:
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
    }
  };
};
function kr() {
  return { localeError: Ir() };
}
var hr = () => {
  let o = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "n\xFAmero";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "nulo";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "padr\xE3o",
      email: "endere\xE7o de e-mail",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "data e hora ISO",
      date: "data ISO",
      time: "hora ISO",
      duration: "dura\xE7\xE3o ISO",
      ipv4: "endere\xE7o IPv4",
      ipv6: "endere\xE7o IPv6",
      cidrv4: "faixa de IPv4",
      cidrv6: "faixa de IPv6",
      base64: "texto codificado em base64",
      base64url: "URL codificada em base64",
      json_string: "texto JSON",
      e164: "n\xFAmero E.164",
      jwt: "JWT",
      template_literal: "entrada",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Tipo inv\xE1lido: esperado ${r.expected}, recebido ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Entrada inv\xE1lida: esperado ${l(r.values[0])}`
          : `Op\xE7\xE3o inv\xE1lida: esperada uma das ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Muito grande: esperado que ${
            r.origin ?? "valor"
          } tivesse ${e}${r.maximum.toString()} ${t.unit ?? "elementos"}`
          : `Muito grande: esperado que ${
            r.origin ?? "valor"
          } fosse ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Muito pequeno: esperado que ${r.origin} tivesse ${e}${r.minimum.toString()} ${t.unit}`
          : `Muito pequeno: esperado que ${r.origin} fosse ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Texto inv\xE1lido: deve come\xE7ar com "${e.prefix}"`
          : e.format === "ends_with"
          ? `Texto inv\xE1lido: deve terminar com "${e.suffix}"`
          : e.format === "includes"
          ? `Texto inv\xE1lido: deve incluir "${e.includes}"`
          : e.format === "regex"
          ? `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${e.pattern}`
          : `${n[e.format] ?? r.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${r.divisor}`;
      case "unrecognized_keys":
        return `Chave${r.keys.length > 1 ? "s" : ""} desconhecida${
          r.keys.length > 1 ? "s" : ""
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${r.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${r.origin}`;
      default:
        return "Campo inv\xE1lido";
    }
  };
};
function jr() {
  return { localeError: hr() };
}
function g(o, i, u, n) {
  let r = Math.abs(o), e = r % 10, t = r % 100;
  return t >= 11 && t <= 19 ? n : e === 1 ? i : e >= 2 && e <= 4 ? u : n;
}
var Sr = () => {
  let o = {
    string: {
      unit: {
        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u0430",
        many: "\u0431\u0430\u0439\u0442",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432",
      },
      verb: "\u0438\u043C\u0435\u0442\u044C",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0447\u0438\u0441\u043B\u043E";
        case "object": {
          if (Array.isArray(r)) {
            return "\u043C\u0430\u0441\u0441\u0438\u0432";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0432\u0432\u043E\u0434",
      email: "email \u0430\u0434\u0440\u0435\u0441",
      url: "URL",
      emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
      date: "ISO \u0434\u0430\u0442\u0430",
      time: "ISO \u0432\u0440\u0435\u043C\u044F",
      duration:
        "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
      ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
      ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
      cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
      base64:
        "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
      base64url:
        "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
      json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
      e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
      jwt: "JWT",
      template_literal: "\u0432\u0432\u043E\u0434",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${r.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${
            l(r.values[0])
          }`
          : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        if (t) {
          let d = Number(r.maximum),
            m = g(d, t.unit.one, t.unit.few, t.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${
            r.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"
          } \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${e}${r.maximum.toString()} ${m}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${
          r.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"
        } \u0431\u0443\u0434\u0435\u0442 ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        if (t) {
          let d = Number(r.minimum),
            m = g(d, t.unit.one, t.unit.few, t.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${r.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${e}${r.minimum.toString()} ${m}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${r.origin} \u0431\u0443\u0434\u0435\u0442 ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${e.prefix}"`
          : e.format === "ends_with"
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${e.suffix}"`
          : e.format === "includes"
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${e.includes}"`
          : e.format === "regex"
          ? `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${e.pattern}`
          : `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${
            n[e.format] ?? r.format
          }`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${r.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${
          r.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"
        } \u043A\u043B\u044E\u0447${r.keys.length > 1 ? "\u0438" : ""}: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${r.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${r.origin}`;
      default:
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
    }
  };
};
function xr() {
  return { localeError: Sr() };
}
var Ur = () => {
  let o = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0161tevilo";
        case "object": {
          if (Array.isArray(r)) {
            return "tabela";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "vnos",
      email: "e-po\u0161tni naslov",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datum in \u010Das",
      date: "ISO datum",
      time: "ISO \u010Das",
      duration: "ISO trajanje",
      ipv4: "IPv4 naslov",
      ipv6: "IPv6 naslov",
      cidrv4: "obseg IPv4",
      cidrv6: "obseg IPv6",
      base64: "base64 kodiran niz",
      base64url: "base64url kodiran niz",
      json_string: "JSON niz",
      e164: "E.164 \u0161tevilka",
      jwt: "JWT",
      template_literal: "vnos",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Neveljaven vnos: pri\u010Dakovano ${r.expected}, prejeto ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Neveljaven vnos: pri\u010Dakovano ${l(r.values[0])}`
          : `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Preveliko: pri\u010Dakovano, da bo ${
            r.origin ?? "vrednost"
          } imelo ${e}${r.maximum.toString()} ${t.unit ?? "elementov"}`
          : `Preveliko: pri\u010Dakovano, da bo ${
            r.origin ?? "vrednost"
          } ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Premajhno: pri\u010Dakovano, da bo ${r.origin} imelo ${e}${r.minimum.toString()} ${t.unit}`
          : `Premajhno: pri\u010Dakovano, da bo ${r.origin} ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Neveljaven niz: mora se za\u010Deti z "${e.prefix}"`
          : e.format === "ends_with"
          ? `Neveljaven niz: mora se kon\u010Dati z "${e.suffix}"`
          : e.format === "includes"
          ? `Neveljaven niz: mora vsebovati "${e.includes}"`
          : e.format === "regex"
          ? `Neveljaven niz: mora ustrezati vzorcu ${e.pattern}`
          : `Neveljaven ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${r.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${
          r.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${r.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${r.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function Or() {
  return { localeError: Ur() };
}
var Nr = () => {
  let o = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att inneh\xE5lla" },
    set: { unit: "objekt", verb: "att inneh\xE5lla" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "antal";
        case "object": {
          if (Array.isArray(r)) {
            return "lista";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "regulj\xE4rt uttryck",
      email: "e-postadress",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO-datum och tid",
      date: "ISO-datum",
      time: "ISO-tid",
      duration: "ISO-varaktighet",
      ipv4: "IPv4-intervall",
      ipv6: "IPv6-intervall",
      cidrv4: "IPv4-spektrum",
      cidrv6: "IPv6-spektrum",
      base64: "base64-kodad str\xE4ng",
      base64url: "base64url-kodad str\xE4ng",
      json_string: "JSON-str\xE4ng",
      e164: "E.164-nummer",
      jwt: "JWT",
      template_literal: "mall-literal",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${r.expected}, fick ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `Ogiltig inmatning: f\xF6rv\xE4ntat ${l(r.values[0])}`
          : `Ogiltigt val: f\xF6rv\xE4ntade en av ${a(r.values, "|")}`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `F\xF6r stor(t): f\xF6rv\xE4ntade ${
            r.origin ?? "v\xE4rdet"
          } att ha ${e}${r.maximum.toString()} ${t.unit ?? "element"}`
          : `F\xF6r stor(t): f\xF6rv\xE4ntat ${
            r.origin ?? "v\xE4rdet"
          } att ha ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `F\xF6r lite(t): f\xF6rv\xE4ntade ${
            r.origin ?? "v\xE4rdet"
          } att ha ${e}${r.minimum.toString()} ${t.unit}`
          : `F\xF6r lite(t): f\xF6rv\xE4ntade ${
            r.origin ?? "v\xE4rdet"
          } att ha ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${e.prefix}"`
          : e.format === "ends_with"
          ? `Ogiltig str\xE4ng: m\xE5ste sluta med "${e.suffix}"`
          : e.format === "includes"
          ? `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${e.includes}"`
          : e.format === "regex"
          ? `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${e.pattern}"`
          : `Ogiltig(t) ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${r.divisor}`;
      case "unrecognized_keys":
        return `${
          r.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${r.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${r.origin ?? "v\xE4rdet"}`;
      default:
        return "Ogiltig input";
    }
  };
};
function wr() {
  return { localeError: Nr() };
}
var zr = () => {
  let o = {
    string: {
      unit:
        "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD",
      verb:
        "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
    file: {
      unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD",
      verb:
        "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
    array: {
      unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
      verb:
        "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
    set: {
      unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
      verb:
        "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r)
            ? "\u0B8E\u0BA3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BBE\u0BA4\u0BA4\u0BC1"
            : "\u0B8E\u0BA3\u0BCD";
        case "object": {
          if (Array.isArray(r)) {
            return "\u0B85\u0BA3\u0BBF";
          }
          if (r === null) {
            return "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
      email:
        "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
      date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
      time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
      duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
      ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
      ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
      cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
      cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
      base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
      base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
      json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
      e164: "E.164 \u0B8E\u0BA3\u0BCD",
      jwt: "JWT",
      template_literal: "input",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${r.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${
            l(r.values[0])
          }`
          : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${
            a(r.values, "|")
          } \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${
            r.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"
          } ${e}${r.maximum.toString()} ${
            t.unit ??
              "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"
          } \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${
            r.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"
          } ${e}${r.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${r.origin} ${e}${r.minimum.toString()} ${t.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${r.origin} ${e}${r.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${e.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : e.format === "ends_with"
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${e.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : e.format === "includes"
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${e.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : e.format === "regex"
          ? `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${e.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`
          : `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${r.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${
          r.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `${r.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${r.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
    }
  };
};
function Dr() {
  return { localeError: zr() };
}
var Pr = () => {
  let o = {
    string: {
      unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
    file: {
      unit: "\u0E44\u0E1A\u0E15\u0E4C",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
    array: {
      unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
    set: {
      unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
      verb: "\u0E04\u0E27\u0E23\u0E21\u0E35",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r)
            ? "\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02 (NaN)"
            : "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02";
        case "object": {
          if (Array.isArray(r)) {
            return "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)";
          }
          if (r === null) {
            return "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex:
        "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
      email:
        "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
      url: "URL",
      emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime:
        "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
      date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
      time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
      duration:
        "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
      ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
      ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
      cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
      cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
      base64:
        "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
      base64url:
        "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
      json_string:
        "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
      e164:
        "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
      jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
      template_literal:
        "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${r.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${
            l(r.values[0])
          }`
          : `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive
            ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19"
            : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32",
          t = i(r.origin);
        return t
          ? `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${
            r.origin ?? "\u0E04\u0E48\u0E32"
          } \u0E04\u0E27\u0E23\u0E21\u0E35${e} ${r.maximum.toString()} ${
            t.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"
          }`
          : `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${
            r.origin ?? "\u0E04\u0E48\u0E32"
          } \u0E04\u0E27\u0E23\u0E21\u0E35${e} ${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive
            ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22"
            : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32",
          t = i(r.origin);
        return t
          ? `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${r.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${e} ${r.minimum.toString()} ${t.unit}`
          : `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${r.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${e} ${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${e.prefix}"`
          : e.format === "ends_with"
          ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${e.suffix}"`
          : e.format === "includes"
          ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${e.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`
          : e.format === "regex"
          ? `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${e.pattern}`
          : `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${
            n[e.format] ?? r.format
          }`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${r.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${r.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${r.origin}`;
      default:
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07";
    }
  };
};
function Tr() {
  return { localeError: Pr() };
}
var Er = (o) => {
    let i = typeof o;
    switch (i) {
      case "number":
        return Number.isNaN(o) ? "NaN" : "number";
      case "object": {
        if (Array.isArray(o)) {
          return "array";
        }
        if (o === null) {
          return "null";
        }
        if (Object.getPrototypeOf(o) !== Object.prototype && o.constructor) {
          return o.constructor.name;
        }
      }
    }
    return i;
  },
  Vr = () => {
    let o = {
      string: { unit: "karakter", verb: "olmal\u0131" },
      file: { unit: "bayt", verb: "olmal\u0131" },
      array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
      set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
    };
    function i(n) {
      return o[n] ?? null;
    }
    let u = {
      regex: "girdi",
      email: "e-posta adresi",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO tarih ve saat",
      date: "ISO tarih",
      time: "ISO saat",
      duration: "ISO s\xFCre",
      ipv4: "IPv4 adresi",
      ipv6: "IPv6 adresi",
      cidrv4: "IPv4 aral\u0131\u011F\u0131",
      cidrv6: "IPv6 aral\u0131\u011F\u0131",
      base64: "base64 ile \u015Fifrelenmi\u015F metin",
      base64url: "base64url ile \u015Fifrelenmi\u015F metin",
      json_string: "JSON dizesi",
      e164: "E.164 say\u0131s\u0131",
      jwt: "JWT",
      template_literal: "\u015Eablon dizesi",
    };
    return (n) => {
      switch (n.code) {
        case "invalid_type":
          return `Ge\xE7ersiz de\u011Fer: beklenen ${n.expected}, al\u0131nan ${
            Er(n.input)
          }`;
        case "invalid_value":
          return n.values.length === 1
            ? `Ge\xE7ersiz de\u011Fer: beklenen ${l(n.values[0])}`
            : `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${
              a(n.values, "|")
            }`;
        case "too_big": {
          let r = n.inclusive ? "<=" : "<", e = i(n.origin);
          return e
            ? `\xC7ok b\xFCy\xFCk: beklenen ${
              n.origin ?? "de\u011Fer"
            } ${r}${n.maximum.toString()} ${e.unit ?? "\xF6\u011Fe"}`
            : `\xC7ok b\xFCy\xFCk: beklenen ${
              n.origin ?? "de\u011Fer"
            } ${r}${n.maximum.toString()}`;
        }
        case "too_small": {
          let r = n.inclusive ? ">=" : ">", e = i(n.origin);
          return e
            ? `\xC7ok k\xFC\xE7\xFCk: beklenen ${n.origin} ${r}${n.minimum.toString()} ${e.unit}`
            : `\xC7ok k\xFC\xE7\xFCk: beklenen ${n.origin} ${r}${n.minimum.toString()}`;
        }
        case "invalid_format": {
          let r = n;
          return r.format === "starts_with"
            ? `Ge\xE7ersiz metin: "${r.prefix}" ile ba\u015Flamal\u0131`
            : r.format === "ends_with"
            ? `Ge\xE7ersiz metin: "${r.suffix}" ile bitmeli`
            : r.format === "includes"
            ? `Ge\xE7ersiz metin: "${r.includes}" i\xE7ermeli`
            : r.format === "regex"
            ? `Ge\xE7ersiz metin: ${r.pattern} desenine uymal\u0131`
            : `Ge\xE7ersiz ${u[r.format] ?? n.format}`;
        }
        case "not_multiple_of":
          return `Ge\xE7ersiz say\u0131: ${n.divisor} ile tam b\xF6l\xFCnebilmeli`;
        case "unrecognized_keys":
          return `Tan\u0131nmayan anahtar${n.keys.length > 1 ? "lar" : ""}: ${
            a(n.keys, ", ")
          }`;
        case "invalid_key":
          return `${n.origin} i\xE7inde ge\xE7ersiz anahtar`;
        case "invalid_union":
          return "Ge\xE7ersiz de\u011Fer";
        case "invalid_element":
          return `${n.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
        default:
          return "Ge\xE7ersiz de\u011Fer";
      }
    };
  };
function Ar() {
  return { localeError: Vr() };
}
var Lr = () => {
  let o = {
    string: {
      unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
    file: {
      unit: "\u0431\u0430\u0439\u0442\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
    array: {
      unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
    set: {
      unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432",
      verb: "\u043C\u0430\u0442\u0438\u043C\u0435",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0447\u0438\u0441\u043B\u043E";
        case "object": {
          if (Array.isArray(r)) {
            return "\u043C\u0430\u0441\u0438\u0432";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
      email:
        "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
      url: "URL",
      emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
      date: "\u0434\u0430\u0442\u0430 ISO",
      time: "\u0447\u0430\u0441 ISO",
      duration:
        "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
      ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
      ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
      cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
      cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
      base64:
        "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
      base64url:
        "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
      json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
      e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
      jwt: "JWT",
      template_literal:
        "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${r.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${
            l(r.values[0])
          }`
          : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${
            r.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"
          } ${t.verb} ${e}${r.maximum.toString()} ${
            t.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"
          }`
          : `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${
            r.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"
          } \u0431\u0443\u0434\u0435 ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${r.origin} ${t.verb} ${e}${r.minimum.toString()} ${t.unit}`
          : `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${r.origin} \u0431\u0443\u0434\u0435 ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${e.prefix}"`
          : e.format === "ends_with"
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${e.suffix}"`
          : e.format === "includes"
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${e.includes}"`
          : e.format === "regex"
          ? `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${e.pattern}`
          : `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${
            n[e.format] ?? r.format
          }`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${r.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${
          r.keys.length > 1 ? "\u0456" : ""
        }: ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${r.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${r.origin}`;
      default:
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
    }
  };
};
function Jr() {
  return { localeError: Lr() };
}
var Rr = () => {
  let o = {
    string: {
      unit: "\u062D\u0631\u0648\u0641",
      verb: "\u06C1\u0648\u0646\u0627",
    },
    file: {
      unit: "\u0628\u0627\u0626\u0679\u0633",
      verb: "\u06C1\u0648\u0646\u0627",
    },
    array: {
      unit: "\u0622\u0626\u0679\u0645\u0632",
      verb: "\u06C1\u0648\u0646\u0627",
    },
    set: {
      unit: "\u0622\u0626\u0679\u0645\u0632",
      verb: "\u06C1\u0648\u0646\u0627",
    },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "\u0646\u0645\u0628\u0631";
        case "object": {
          if (Array.isArray(r)) {
            return "\u0622\u0631\u06D2";
          }
          if (r === null) {
            return "\u0646\u0644";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0627\u0646 \u067E\u0679",
      email:
        "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
      url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
      emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
      uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      uuidv4:
        "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
      uuidv6:
        "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
      nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
      ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
      xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
      ksuid:
        "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
      datetime:
        "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
      date:
        "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
      time:
        "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
      duration:
        "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
      ipv4:
        "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
      ipv6:
        "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
      cidrv4:
        "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
      cidrv6:
        "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
      base64:
        "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
      base64url:
        "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
      json_string:
        "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
      e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
      jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
      template_literal: "\u0627\u0646 \u067E\u0679",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${r.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${
          u(r.input)
        } \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${
            l(r.values[0])
          } \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`
          : `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${
            a(r.values, "|")
          } \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u0628\u06C1\u062A \u0628\u0691\u0627: ${
            r.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"
          } \u06A9\u06D2 ${e}${r.maximum.toString()} ${
            t.unit ?? "\u0639\u0646\u0627\u0635\u0631"
          } \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`
          : `\u0628\u06C1\u062A \u0628\u0691\u0627: ${
            r.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"
          } \u06A9\u0627 ${e}${r.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${r.origin} \u06A9\u06D2 ${e}${r.minimum.toString()} ${t.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`
          : `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${r.origin} \u06A9\u0627 ${e}${r.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${e.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
          : e.format === "ends_with"
          ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${e.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
          : e.format === "includes"
          ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${e.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
          : e.format === "regex"
          ? `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${e.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`
          : `\u063A\u0644\u0637 ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${r.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${
          r.keys.length > 1 ? "\u0632" : ""
        }: ${a(r.keys, "\u060C ")}`;
      case "invalid_key":
        return `${r.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${r.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
    }
  };
};
function Gr() {
  return { localeError: Rr() };
}
var Kr = () => {
  let o = {
    string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
    file: { unit: "byte", verb: "c\xF3" },
    array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
    set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "s\u1ED1";
        case "object": {
          if (Array.isArray(r)) {
            return "m\u1EA3ng";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u0111\u1EA7u v\xE0o",
      email: "\u0111\u1ECBa ch\u1EC9 email",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ng\xE0y gi\u1EDD ISO",
      date: "ng\xE0y ISO",
      time: "gi\u1EDD ISO",
      duration: "kho\u1EA3ng th\u1EDDi gian ISO",
      ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
      ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
      cidrv4: "d\u1EA3i IPv4",
      cidrv6: "d\u1EA3i IPv6",
      base64: "chu\u1ED7i m\xE3 h\xF3a base64",
      base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
      json_string: "chu\u1ED7i JSON",
      e164: "s\u1ED1 E.164",
      jwt: "JWT",
      template_literal: "\u0111\u1EA7u v\xE0o",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${r.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${
            l(r.values[0])
          }`
          : `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${
            r.origin ?? "gi\xE1 tr\u1ECB"
          } ${t.verb} ${e}${r.maximum.toString()} ${
            t.unit ?? "ph\u1EA7n t\u1EED"
          }`
          : `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${
            r.origin ?? "gi\xE1 tr\u1ECB"
          } ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${r.origin} ${t.verb} ${e}${r.minimum.toString()} ${t.unit}`
          : `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${r.origin} ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${e.prefix}"`
          : e.format === "ends_with"
          ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${e.suffix}"`
          : e.format === "includes"
          ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${e.includes}"`
          : e.format === "regex"
          ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${e.pattern}`
          : `${n[e.format] ?? r.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${r.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${
          a(r.keys, ", ")
        }`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${r.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${r.origin}`;
      default:
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
    }
  };
};
function Wr() {
  return { localeError: Kr() };
}
var Xr = () => {
  let o = {
    string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
    file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
    array: { unit: "\u9879", verb: "\u5305\u542B" },
    set: { unit: "\u9879", verb: "\u5305\u542B" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "\u975E\u6570\u5B57(NaN)" : "\u6570\u5B57";
        case "object": {
          if (Array.isArray(r)) {
            return "\u6570\u7EC4";
          }
          if (r === null) {
            return "\u7A7A\u503C(null)";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u8F93\u5165",
      email: "\u7535\u5B50\u90AE\u4EF6",
      url: "URL",
      emoji: "\u8868\u60C5\u7B26\u53F7",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO\u65E5\u671F\u65F6\u95F4",
      date: "ISO\u65E5\u671F",
      time: "ISO\u65F6\u95F4",
      duration: "ISO\u65F6\u957F",
      ipv4: "IPv4\u5730\u5740",
      ipv6: "IPv6\u5730\u5740",
      cidrv4: "IPv4\u7F51\u6BB5",
      cidrv6: "IPv6\u7F51\u6BB5",
      base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
      base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
      json_string: "JSON\u5B57\u7B26\u4E32",
      e164: "E.164\u53F7\u7801",
      jwt: "JWT",
      template_literal: "\u8F93\u5165",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${r.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${l(r.values[0])}`
          : `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${
            r.origin ?? "\u503C"
          } ${e}${r.maximum.toString()} ${t.unit ?? "\u4E2A\u5143\u7D20"}`
          : `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${
            r.origin ?? "\u503C"
          } ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${r.origin} ${e}${r.minimum.toString()} ${t.unit}`
          : `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${r.origin} ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${e.prefix}" \u5F00\u5934`
          : e.format === "ends_with"
          ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${e.suffix}" \u7ED3\u5C3E`
          : e.format === "includes"
          ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${e.includes}"`
          : e.format === "regex"
          ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${e.pattern}`
          : `\u65E0\u6548${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${r.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${a(r.keys, ", ")}`;
      case "invalid_key":
        return `${r.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${r.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return "\u65E0\u6548\u8F93\u5165";
    }
  };
};
function Fr() {
  return { localeError: Xr() };
}
var Cr = () => {
  let o = {
    string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
    file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
    array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
    set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
  };
  function i(r) {
    return o[r] ?? null;
  }
  let u = (r) => {
      let e = typeof r;
      switch (e) {
        case "number":
          return Number.isNaN(r) ? "NaN" : "number";
        case "object": {
          if (Array.isArray(r)) {
            return "array";
          }
          if (r === null) {
            return "null";
          }
          if (Object.getPrototypeOf(r) !== Object.prototype && r.constructor) {
            return r.constructor.name;
          }
        }
      }
      return e;
    },
    n = {
      regex: "\u8F38\u5165",
      email: "\u90F5\u4EF6\u5730\u5740",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO \u65E5\u671F\u6642\u9593",
      date: "ISO \u65E5\u671F",
      time: "ISO \u6642\u9593",
      duration: "ISO \u671F\u9593",
      ipv4: "IPv4 \u4F4D\u5740",
      ipv6: "IPv6 \u4F4D\u5740",
      cidrv4: "IPv4 \u7BC4\u570D",
      cidrv6: "IPv6 \u7BC4\u570D",
      base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
      base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
      json_string: "JSON \u5B57\u4E32",
      e164: "E.164 \u6578\u503C",
      jwt: "JWT",
      template_literal: "\u8F38\u5165",
    };
  return (r) => {
    switch (r.code) {
      case "invalid_type":
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${r.expected}\uFF0C\u4F46\u6536\u5230 ${
          u(r.input)
        }`;
      case "invalid_value":
        return r.values.length === 1
          ? `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${
            l(r.values[0])
          }`
          : `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${
            a(r.values, "|")
          }`;
      case "too_big": {
        let e = r.inclusive ? "<=" : "<", t = i(r.origin);
        return t
          ? `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${
            r.origin ?? "\u503C"
          } \u61C9\u70BA ${e}${r.maximum.toString()} ${
            t.unit ?? "\u500B\u5143\u7D20"
          }`
          : `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${
            r.origin ?? "\u503C"
          } \u61C9\u70BA ${e}${r.maximum.toString()}`;
      }
      case "too_small": {
        let e = r.inclusive ? ">=" : ">", t = i(r.origin);
        return t
          ? `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${r.origin} \u61C9\u70BA ${e}${r.minimum.toString()} ${t.unit}`
          : `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${r.origin} \u61C9\u70BA ${e}${r.minimum.toString()}`;
      }
      case "invalid_format": {
        let e = r;
        return e.format === "starts_with"
          ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${e.prefix}" \u958B\u982D`
          : e.format === "ends_with"
          ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${e.suffix}" \u7D50\u5C3E`
          : e.format === "includes"
          ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${e.includes}"`
          : e.format === "regex"
          ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${e.pattern}`
          : `\u7121\u6548\u7684 ${n[e.format] ?? r.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${r.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${
          r.keys.length > 1 ? "\u5011" : ""
        }\uFF1A${a(r.keys, "\u3001")}`;
      case "invalid_key":
        return `${r.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${r.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
    }
  };
};
function Mr() {
  return { localeError: Cr() };
}
export {
  $ as ar,
  _r as ps,
  A as es,
  Ar as tr,
  ar as kh,
  B as hu,
  br as ota,
  D as en,
  Dr as ta,
  dr as mk,
  E as eo,
  F as frCA,
  Fr as zhCN,
  G as fi,
  Gr as ur,
  gr as nl,
  h as ca,
  I as be,
  ir as ja,
  J as fa,
  Jr as ua,
  jr as pt,
  kr as pl,
  lr as ko,
  M as he,
  Mr as zhTW,
  N as de,
  Or as sl,
  pr as no,
  rr as is,
  S as cs,
  Tr as th,
  tr as it,
  U as da,
  vr as ms,
  W as fr,
  Wr as vi,
  wr as sv,
  xr as ru,
  y as az,
  Z as id,
};
//# sourceMappingURL=locales.mjs.map
