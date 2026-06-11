/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, V = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (r) => new ot(typeof r == "string" ? r : r + "", void 0, q), pt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new ot(e, r, q);
}, ut = (r, t) => {
  if (V) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = M.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, J = V ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return dt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $t, defineProperty: _t, getOwnPropertyDescriptor: ft, getOwnPropertyNames: mt, getOwnPropertySymbols: gt, getPrototypeOf: vt } = Object, f = globalThis, K = f.trustedTypes, yt = K ? K.emptyScript : "", z = f.reactiveElementPolyfillSupport, S = (r, t) => r, I = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? yt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, nt = (r, t) => !$t(r, t), G = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: nt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = G) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && _t(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const h = s == null ? void 0 : s.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? G;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, i = [...mt(e), ...gt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(J(s));
    } else t !== void 0 && e.push(J(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ut(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : I).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : I;
      this._$Em = s;
      const c = a.fromAttribute(e, h.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (s === !1 && (n = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? nt)(n, e) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: h } = o, a = this[n];
        h !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var n;
        return (n = s.hostUpdate) == null ? void 0 : n.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[S("elementProperties")] = /* @__PURE__ */ new Map(), b[S("finalized")] = /* @__PURE__ */ new Map(), z == null || z({ ReactiveElement: b }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, Q = (r) => r, T = C.trustedTypes, X = T ? T.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, at = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + _, bt = `<${ht}>`, y = document, U = () => y.createComment(""), k = (r) => r === null || typeof r != "object" && typeof r != "function", F = Array.isArray, At = (r) => F(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, tt = />/g, m = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, it = /"/g, lt = /^(?:script|style|textarea|title)$/i, xt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), E = xt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), g = y.createTreeWalker(y, 129);
function ct(r, t) {
  if (!F(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const wt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = w;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === w ? p[1] === "!--" ? o = Y : p[1] !== void 0 ? o = tt : p[2] !== void 0 ? (lt.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = m) : p[3] !== void 0 && (o = m) : o === m ? p[0] === ">" ? (o = s ?? w, l = -1) : p[1] === void 0 ? l = -2 : (l = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? m : p[3] === '"' ? it : et) : o === it || o === et ? o = m : o === Y || o === tt ? o = w : (o = m, s = void 0);
    const $ = o === m && r[h + 1].startsWith("/>") ? " " : "";
    n += o === w ? a + bt : l >= 0 ? (i.push(c), a.slice(0, l) + at + a.slice(l) + _ + $) : a + _ + (l === -2 ? h : $);
  }
  return [ct(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, p] = wt(t, e);
    if (this.el = N.createElement(c, i), g.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = g.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(at)) {
          const u = p[o++], $ = s.getAttribute(l).split(_), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: H[2], strings: $, ctor: H[1] === "." ? St : H[1] === "?" ? Ct : H[1] === "@" ? Pt : j }), s.removeAttribute(l);
        } else l.startsWith(_) && (a.push({ type: 6, index: n }), s.removeAttribute(l));
        if (lt.test(s.tagName)) {
          const l = s.textContent.split(_), u = l.length - 1;
          if (u > 0) {
            s.textContent = T ? T.emptyScript : "";
            for (let $ = 0; $ < u; $++) s.append(l[$], U()), g.nextNode(), a.push({ type: 2, index: ++n });
            s.append(l[u], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ht) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = s.data.indexOf(_, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function x(r, t, e = r, i) {
  var o, h;
  if (t === A) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const n = k(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = x(r, s._$AS(r, t.values), s, i)), t;
}
class Et {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? y).importNode(e, !0);
    g.currentNode = s;
    let n = g.nextNode(), o = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new O(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Ut(n, this, t)), this._$AV.push(c), a = i[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = g.nextNode(), o++);
    }
    return g.currentNode = y, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), k(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : At(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(ct(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const o = new Et(s, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new O(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = Q(t).nextSibling;
      Q(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = x(this, t, e, 0), o = !k(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = x(this, h[i + a], e, a), c === A && (c = this._$AH[a]), o || (o = !k(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class St extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ct extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Pt extends j {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? d) === A) return;
    const i = this._$AH, s = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ut {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const L = C.litHtmlPolyfillSupport;
L == null || L(N, O), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.3.3");
const kt = (r, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new O(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class P extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return A;
  }
}
var rt;
P._$litElement$ = !0, P.finalized = !0, (rt = v.litElementHydrateSupport) == null || rt.call(v, { LitElement: P });
const B = v.litElementPolyfillSupport;
B == null || B({ LitElement: P });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
const R = class R extends P {
  setConfig(t) {
    if (!t.entity) {
      this._config = t, this._error = 'Falta la opcion obligatoria "entity" en blind-control-card.';
      return;
    }
    this._config = t, this._error = void 0;
  }
  getCardSize() {
    return 4;
  }
  static getStubConfig(t) {
    return {
      type: "custom:blind-control-card",
      entity: Object.keys((t == null ? void 0 : t.states) ?? {}).find(
        (i) => i.startsWith("cover.")
      ) ?? "cover.persiana_salon",
      name: "Persiana"
    };
  }
  updated(t) {
    t.has("hass") && (this._dragPosition = void 0);
  }
  render() {
    var h;
    if (this._error)
      return this._renderError(this._error);
    if (!((h = this._config) != null && h.entity))
      return this._renderError("Configura una entidad cover para usar esta tarjeta.");
    if (!this.hass)
      return E`
        <ha-card>
          <div class="card-content muted">Cargando Home Assistant...</div>
        </ha-card>
      `;
    if (!this._config.entity.startsWith("cover."))
      return this._renderError(`La entidad "${this._config.entity}" no es de tipo cover.`);
    const t = this.hass.states[this._config.entity];
    if (!t)
      return this._renderError(`No existe la entidad "${this._config.entity}".`);
    const e = this._config.name ?? t.attributes.friendly_name ?? this._config.entity, i = this._getCurrentPosition(t), s = this._dragPosition ?? i ?? 0, n = i !== void 0 || this._dragPosition !== void 0, o = !this._supportsPosition(t);
    return E`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${e}</h2>

          <div class="slider-block">
            <div
              class=${`slider-shell${o ? " disabled" : ""}`}
              style=${`--position: ${s};`}
            >
              <span class="scale top">100</span>
              <div class="slider-track" aria-hidden="true">
                <div class="slider-fill"></div>
                <div class="slider-thumb"></div>
              </div>
              <span class="scale bottom">0</span>
              <input
                class="position-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                .value=${String(s)}
                ?disabled=${o}
                aria-label=${`Posicion de ${e}`}
                @input=${this._handleSliderInput}
                @change=${this._handlePositionChange}
              />
            </div>
            <div class="position-label">
              ${n ? `${s}%` : "Sin posicion"}
            </div>
          </div>

          ${o ? E`<div class="hint">
                Esta entidad no expone <code>current_position</code>.
              </div>` : d}

          <div class="actions">
            ${this._renderButton("Subir", "mdi:arrow-up", "open_cover")}
            ${this._renderButton("Parar", "mdi:stop", "stop_cover")}
            ${this._renderButton("Bajar", "mdi:arrow-down", "close_cover")}
          </div>
        </div>
      </ha-card>
    `;
  }
  _renderButton(t, e, i) {
    return E`
      <button type="button" @click=${() => this._callCoverService(i)}>
        <ha-icon .icon=${e}></ha-icon>
        <span>${t}</span>
      </button>
    `;
  }
  _renderError(t) {
    return E`
      <ha-card>
        <div class="card-content error" role="alert">
          <strong>Blind Control Card</strong>
          <span>${t}</span>
        </div>
      </ha-card>
    `;
  }
  _handleSliderInput(t) {
    const e = t.currentTarget;
    this._dragPosition = Number(e.value);
  }
  _handlePositionChange(t) {
    const e = t.currentTarget, i = Number(e.value);
    this._dragPosition = i, this._callCoverService("set_cover_position", { position: i });
  }
  async _callCoverService(t, e = {}) {
    var i;
    !this.hass || !((i = this._config) != null && i.entity) || await this.hass.callService("cover", t, {
      entity_id: this._config.entity,
      ...e
    });
  }
  _getCurrentPosition(t) {
    const e = t.attributes.current_position;
    if (typeof e == "number" && Number.isFinite(e))
      return this._clampPosition(e);
    if (typeof e == "string" && e.trim() !== "") {
      const i = Number(e);
      return Number.isFinite(i) ? this._clampPosition(i) : void 0;
    }
  }
  _supportsPosition(t) {
    return this._getCurrentPosition(t) !== void 0;
  }
  _clampPosition(t) {
    return Math.min(100, Math.max(0, Math.round(t)));
  }
};
R.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 },
  _dragPosition: { state: !0 }
}, R.styles = pt`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: var(--ha-card-border-width, 0) solid
        var(--ha-card-border-color, var(--divider-color));
    }

    .card-content {
      padding: 18px 16px 16px;
      display: grid;
      gap: 16px;
      justify-items: center;
    }

    .title {
      margin: 0;
      width: 100%;
      text-align: center;
      font-size: 1.15rem;
      line-height: 1.3;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow-wrap: anywhere;
    }

    .slider-block {
      display: grid;
      justify-items: center;
      gap: 10px;
      width: 100%;
    }

    .slider-shell {
      --position: 0;
      position: relative;
      width: 88px;
      height: 220px;
      display: grid;
      place-items: center;
    }

    .slider-track {
      position: relative;
      width: 14px;
      height: 190px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--divider-color);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color), transparent 88%);
    }

    .slider-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: calc(var(--position) * 1%);
      background: var(--primary-color);
    }

    .slider-thumb {
      position: absolute;
      left: 50%;
      bottom: calc(var(--position) * 1%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      transform: translate(-50%, 50%);
      background: var(--primary-color);
      border: 3px solid var(--ha-card-background, var(--card-background-color));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.24);
    }

    .position-slider {
      position: absolute;
      inset: 14px 0;
      width: 100%;
      height: calc(100% - 28px);
      margin: 0;
      opacity: 0;
      cursor: pointer;
      writing-mode: vertical-lr;
      direction: rtl;
    }

    .position-slider:disabled {
      cursor: not-allowed;
    }

    .slider-shell.disabled {
      opacity: 0.55;
    }

    .slider-shell:focus-within .slider-thumb {
      box-shadow:
        0 0 0 4px color-mix(in srgb, var(--primary-color), transparent 72%),
        0 2px 8px rgba(0, 0, 0, 0.24);
    }

    .scale {
      position: absolute;
      right: 2px;
      font-size: 0.75rem;
      line-height: 1;
      color: var(--secondary-text-color);
      pointer-events: none;
    }

    .scale.top {
      top: 8px;
    }

    .scale.bottom {
      bottom: 8px;
    }

    .position-label {
      min-height: 1.25rem;
      font-size: 0.95rem;
      color: var(--secondary-text-color);
    }

    .hint {
      margin-top: -8px;
      font-size: 0.85rem;
      line-height: 1.4;
      text-align: center;
      color: var(--secondary-text-color);
    }

    .hint code {
      font-family: var(--paper-font-code1_-_font-family, monospace);
      color: var(--primary-text-color);
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      width: 100%;
    }

    button {
      min-width: 0;
      min-height: 44px;
      padding: 8px 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
      transition:
        background 120ms ease,
        border-color 120ms ease,
        color 120ms ease;
    }

    button:hover,
    button:focus-visible {
      background: color-mix(in srgb, var(--primary-color), transparent 88%);
      border-color: var(--primary-color);
      outline: none;
    }

    button:active {
      background: color-mix(in srgb, var(--primary-color), transparent 78%);
    }

    ha-icon {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
      flex: 0 0 auto;
    }

    button span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .muted {
      color: var(--secondary-text-color);
      text-align: center;
    }

    .error {
      justify-items: start;
      gap: 6px;
      color: var(--error-color, #db4437);
    }

    .error strong {
      color: var(--primary-text-color);
    }

    @media (max-width: 360px) {
      .actions {
        grid-template-columns: 1fr;
      }

      button span {
        white-space: normal;
      }
    }
  `;
let W = R;
customElements.get("blind-control-card") || customElements.define("blind-control-card", W);
window.customCards = window.customCards ?? [];
window.customCards.some((r) => r.type === "blind-control-card") || window.customCards.push({
  type: "blind-control-card",
  name: "Blind Control Card",
  description: "Control vertical para persianas y otras entidades cover.",
  preview: !0
});
