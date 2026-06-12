/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, Q = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (r) => new _t(typeof r == "string" ? r : r + "", void 0, X), mt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new _t(e, r, X);
}, St = (r, t) => {
  if (Q) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = R.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, et = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return At(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wt, defineProperty: xt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Ct, getOwnPropertySymbols: Pt, getPrototypeOf: zt } = Object, f = globalThis, it = f.trustedTypes, Nt = it ? it.emptyScript : "", j = f.reactiveElementPolyfillSupport, P = (r, t) => r, q = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Nt : null;
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
} }, gt = (r, t) => !wt(r, t), st = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: gt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && xt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const l = s == null ? void 0 : s.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Ct(e), ...Pt(e)];
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
      for (const s of i) e.unshift(et(s));
    } else t !== void 0 && e.push(et(t));
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
    return St(t, this.constructor.elementStyles), t;
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
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : q).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : q;
      this._$Em = s;
      const h = a.fromAttribute(e, l.type);
      this[s] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (n = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? gt)(n, e) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
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
        const { wrapped: l } = o, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[P("elementProperties")] = /* @__PURE__ */ new Map(), A[P("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: A }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, rt = (r) => r, L = z.trustedTypes, ot = L ? L.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ft = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + g, Tt = `<${$t}>`, y = document, N = () => y.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", Y = Array.isArray, Ut = (r) => Y(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, at = />/g, $ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, ct = /"/g, bt = /^(?:script|style|textarea|title)$/i, Ht = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), _ = Ht(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), b = y.createTreeWalker(y, 129);
function vt(r, t) {
  if (!Y(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const Ot = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, p, c = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === C ? p[1] === "!--" ? o = nt : p[1] !== void 0 ? o = at : p[2] !== void 0 ? (bt.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = $) : p[3] !== void 0 && (o = $) : o === $ ? p[0] === ">" ? (o = s ?? C, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? $ : p[3] === '"' ? ct : lt) : o === ct || o === lt ? o = $ : o === nt || o === at ? o = C : (o = $, s = void 0);
    const m = o === $ && r[l + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + Tt : c >= 0 ? (i.push(h), a.slice(0, c) + ft + a.slice(c) + g + m) : a + g + (c === -2 ? l : m);
  }
  return [vt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, p] = Ot(t, e);
    if (this.el = U.createElement(h, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = b.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ft)) {
          const u = p[o++], m = s.getAttribute(c).split(g), k = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: k[2], strings: m, ctor: k[1] === "." ? kt : k[1] === "?" ? Rt : k[1] === "@" ? Lt : F }), s.removeAttribute(c);
        } else c.startsWith(g) && (a.push({ type: 6, index: n }), s.removeAttribute(c));
        if (bt.test(s.tagName)) {
          const c = s.textContent.split(g), u = c.length - 1;
          if (u > 0) {
            s.textContent = L ? L.emptyScript : "";
            for (let m = 0; m < u; m++) s.append(c[m], N()), b.nextNode(), a.push({ type: 2, index: ++n });
            s.append(c[u], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $t) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(g, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(r, t, e = r, i) {
  var o, l;
  if (t === x) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = E(r, s._$AS(r, t.values), s, i)), t;
}
class Mt {
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
    b.currentNode = s;
    let n = b.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new M(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Dt(n, this, t)), this._$AV.push(h), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = b.nextNode(), o++);
    }
    return b.currentNode = y, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class M {
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
    t = E(this, t, e), T(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = U.createElement(vt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const o = new Mt(s, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new M(this.O(N()), this.O(N()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = rt(t).nextSibling;
      rt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class F {
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
    if (n === void 0) t = E(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== x, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = E(this, l[i + a], e, a), h === x && (h = this._$AH[a]), o || (o = !T(h) || h !== this._$AH[a]), h === d ? t = d : t !== d && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class kt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Rt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Lt extends F {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === x) return;
    const i = this._$AH, s = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Dt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const B = z.litHtmlPolyfillSupport;
B == null || B(U, M), (z.litHtmlVersions ?? (z.litHtmlVersions = [])).push("3.3.3");
const It = (r, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new M(t.insertBefore(N(), n), n, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class S extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = It(e, this.renderRoot, this.renderOptions);
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
    return x;
  }
}
var ut;
S._$litElement$ = !0, S.finalized = !0, (ut = v.litElementHydrateSupport) == null || ut.call(v, { LitElement: S });
const W = v.litElementPolyfillSupport;
W == null || W({ LitElement: S });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
const Ft = 1, jt = 2, Vt = 4, Bt = 8, w = "medium", H = !0, O = !0, dt = {
  small: {
    sliderHeight: 150,
    buttonSize: 38,
    iconSize: 20,
    padding: 12,
    gap: 10,
    cardSize: 3
  },
  medium: {
    sliderHeight: 210,
    buttonSize: 44,
    iconSize: 22,
    padding: 16,
    gap: 14,
    cardSize: 4
  },
  large: {
    sliderHeight: 280,
    buttonSize: 54,
    iconSize: 26,
    padding: 20,
    gap: 18,
    cardSize: 5
  }
}, Wt = {
  entity: "Entidad cover",
  name: "Nombre",
  size: "Tamano",
  slider_height: "Altura de barra",
  button_size: "Tamano de botones",
  show_name: "Mostrar nombre",
  show_position: "Mostrar porcentaje"
}, qt = [
  {
    name: "entity",
    required: !0,
    selector: {
      entity: {
        domain: "cover"
      }
    }
  },
  {
    name: "name",
    selector: {
      text: {}
    }
  },
  {
    name: "size",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "small", label: "Pequena" },
          { value: "medium", label: "Media" },
          { value: "large", label: "Grande" }
        ]
      }
    }
  },
  {
    name: "slider_height",
    selector: {
      number: {
        min: 120,
        max: 420,
        step: 10,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "button_size",
    selector: {
      number: {
        min: 34,
        max: 72,
        step: 2,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "show_name",
    selector: {
      boolean: {}
    }
  },
  {
    name: "show_position",
    selector: {
      boolean: {}
    }
  }
], D = class D extends S {
  constructor() {
    super(...arguments), this._isSliding = !1;
  }
  setConfig(t) {
    const e = K(t);
    if (!e.entity) {
      this._config = e, this._error = 'Falta la opcion obligatoria "entity" en blind-control-card.';
      return;
    }
    this._config = e, this._error = void 0;
  }
  getCardSize() {
    var n, o;
    const t = this._getSizeSettings(), e = ((n = this._config) == null ? void 0 : n.show_name) ?? H, i = ((o = this._config) == null ? void 0 : o.show_position) ?? O, s = t.sliderHeight + t.buttonSize + t.padding * 2 + t.gap * 2 + (e ? 30 : 0) + (i ? 22 : 0);
    return Math.max(2, Math.ceil(s / 50));
  }
  static async getConfigElement() {
    return document.createElement("blind-control-card-editor");
  }
  static getStubConfig(t) {
    return {
      type: "custom:blind-control-card",
      entity: Object.keys((t == null ? void 0 : t.states) ?? {}).find(
        (i) => i.startsWith("cover.")
      ) ?? "cover.persiana_salon",
      name: "Persiana",
      size: w
    };
  }
  updated(t) {
    t.has("hass") && !this._isSliding && (this._dragPosition = void 0);
  }
  render() {
    var u;
    if (this._error)
      return this._renderError(this._error);
    if (!((u = this._config) != null && u.entity))
      return this._renderError("Configura una entidad cover para usar esta tarjeta.");
    if (!this.hass)
      return _`
        <ha-card>
          <div class="card-content muted">Cargando Home Assistant...</div>
        </ha-card>
      `;
    if (!this._config.entity.startsWith("cover."))
      return this._renderError(`La entidad "${this._config.entity}" no es de tipo cover.`);
    const t = this.hass.states[this._config.entity];
    if (!t)
      return this._renderError(`No existe la entidad "${this._config.entity}".`);
    const e = this._config.name ?? t.attributes.friendly_name ?? this._config.entity, i = this._getCurrentPosition(t), s = this._dragPosition ?? i ?? this._positionFromState(t), n = i !== void 0 || this._dragPosition !== void 0, o = this._isUnavailable(t), l = this._supportsFeature(
      t,
      Vt,
      i !== void 0
    ), a = this._config.show_name ?? H, h = this._config.show_position ?? O, p = this._getSizeSettings(), c = this._getCardStyle(p);
    return _`
      <ha-card style=${c}>
        <div class="card-content">
          ${a ? _`<h2 class="title">${e}</h2>` : d}

          <div class="slider-block">
            <div
              class=${`slider-shell${l && !o ? "" : " disabled"}`}
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
                ?disabled=${!l || o}
                aria-label=${`Posicion de ${e}`}
                @input=${this._handleSliderInput}
                @change=${this._handlePositionChange}
              />
            </div>

            ${h ? _`
                  <div class="position-label">
                    ${n ? `${s}%` : this._getStateLabel(t)}
                  </div>
                ` : d}
          </div>

          ${!l && !o ? _`<div class="hint">
                Esta entidad no permite fijar posicion desde Home Assistant.
              </div>` : d}

          ${o ? _`<div class="hint">La entidad esta ${t.state}.</div>` : d}

          <div class="actions">
            ${this._renderButton(
      "Subir",
      "mdi:arrow-up-bold",
      "open_cover",
      o || !this._supportsFeature(t, Ft, !0)
    )}
            ${this._renderButton(
      "Parar",
      "mdi:stop",
      "stop_cover",
      o || !this._supportsFeature(t, Bt, !0)
    )}
            ${this._renderButton(
      "Bajar",
      "mdi:arrow-down-bold",
      "close_cover",
      o || !this._supportsFeature(t, jt, !0)
    )}
          </div>
        </div>
      </ha-card>
    `;
  }
  _renderButton(t, e, i, s) {
    return _`
      <button
        type="button"
        title=${t}
        aria-label=${t}
        ?disabled=${s}
        @click=${() => this._callCoverService(i)}
      >
        <ha-icon .icon=${e}></ha-icon>
      </button>
    `;
  }
  _renderError(t) {
    return _`
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
    this._isSliding = !0, this._dragPosition = Number(e.value);
  }
  _handlePositionChange(t) {
    const e = t.currentTarget, i = Number(e.value);
    this._isSliding = !1, this._dragPosition = i, this._callCoverService("set_cover_position", { position: i });
  }
  async _callCoverService(t, e = {}) {
    var i;
    if (!(!this.hass || !((i = this._config) != null && i.entity)))
      try {
        await this.hass.callService("cover", t, {
          entity_id: this._config.entity,
          ...e
        });
      } catch (s) {
        console.error("blind-control-card service call failed", s);
      }
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
  _positionFromState(t) {
    return t.state === "open" ? 100 : t.state === "closed" ? 0 : 50;
  }
  _getStateLabel(t) {
    return t.state === "unknown" || t.state === "unavailable" ? t.state : "Sin posicion";
  }
  _supportsFeature(t, e, i) {
    const s = t.attributes.supported_features, n = typeof s == "number" ? s : Number(s);
    return Number.isFinite(n) ? (n & e) !== 0 : i;
  }
  _isUnavailable(t) {
    return t.state === "unavailable" || t.state === "unknown";
  }
  _getSizeSettings() {
    var i, s, n;
    const t = ((i = this._config) == null ? void 0 : i.size) ?? w, e = dt[t] ?? dt[w];
    return {
      ...e,
      sliderHeight: pt(
        (s = this._config) == null ? void 0 : s.slider_height,
        120,
        420,
        e.sliderHeight
      ),
      buttonSize: pt(
        (n = this._config) == null ? void 0 : n.button_size,
        34,
        72,
        e.buttonSize
      )
    };
  }
  _getCardStyle(t) {
    return [
      `--blind-slider-height: ${t.sliderHeight}px`,
      `--blind-button-size: ${t.buttonSize}px`,
      `--blind-icon-size: ${t.iconSize}px`,
      `--blind-card-padding: ${t.padding}px`,
      `--blind-card-gap: ${t.gap}px`
    ].join(";");
  }
  _clampPosition(t) {
    return Math.min(100, Math.max(0, Math.round(t)));
  }
};
D.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 },
  _dragPosition: { state: !0 }
}, D.styles = mt`
    :host {
      display: block;
      color: var(--primary-text-color);
      container-type: inline-size;
    }

    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: var(--ha-card-border-width, 0) solid
        var(--ha-card-border-color, var(--divider-color));
      overflow: hidden;
    }

    .card-content {
      width: 100%;
      box-sizing: border-box;
      padding: var(--blind-card-padding, 16px);
      display: grid;
      gap: var(--blind-card-gap, 14px);
      justify-items: center;
    }

    .title {
      margin: 0;
      width: 100%;
      text-align: center;
      font-size: 1.05rem;
      line-height: 1.25;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow-wrap: anywhere;
    }

    .slider-block {
      display: grid;
      justify-items: center;
      gap: 8px;
      width: 100%;
    }

    .slider-shell {
      --position: 0;
      position: relative;
      width: min(96px, 100%);
      height: var(--blind-slider-height, 210px);
      display: grid;
      place-items: center;
      touch-action: none;
    }

    .slider-track {
      position: relative;
      width: 14px;
      height: calc(var(--blind-slider-height, 210px) - 30px);
      min-height: 86px;
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
      right: 0;
      font-size: 0.72rem;
      line-height: 1;
      color: var(--secondary-text-color);
      pointer-events: none;
    }

    .scale.top {
      top: 6px;
    }

    .scale.bottom {
      bottom: 6px;
    }

    .position-label {
      min-height: 1.1rem;
      font-size: 0.9rem;
      line-height: 1.1;
      color: var(--secondary-text-color);
    }

    .hint {
      margin-top: calc(var(--blind-card-gap, 14px) * -0.5);
      max-width: 100%;
      font-size: 0.82rem;
      line-height: 1.35;
      text-align: center;
      color: var(--secondary-text-color);
      overflow-wrap: anywhere;
    }

    .actions {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, var(--blind-button-size, 44px)));
      justify-content: center;
      gap: max(6px, calc(var(--blind-button-size, 44px) * 0.18));
    }

    button {
      width: 100%;
      height: var(--blind-button-size, 44px);
      min-width: 0;
      min-height: 34px;
      padding: 0;
      display: inline-grid;
      place-items: center;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
      transition:
        background 120ms ease,
        border-color 120ms ease,
        color 120ms ease,
        opacity 120ms ease;
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

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    ha-icon {
      --mdc-icon-size: var(--blind-icon-size, 22px);
      color: var(--primary-color);
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

    @container (max-width: 170px) {
      .card-content {
        padding-inline: 8px;
      }

      .actions {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 5px;
      }

      .scale {
        right: 2px;
      }
    }
  `;
let Z = D;
const I = class I extends S {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Wt[t.name] ?? t.name;
  }
  setConfig(t) {
    this._config = K(t);
  }
  render() {
    return _`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._getEditorData()}
          .schema=${qt}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._handleValueChanged}
        ></ha-form>
      </div>
    `;
  }
  _getEditorData() {
    return {
      type: "custom:blind-control-card",
      size: w,
      show_name: H,
      show_position: O,
      ...this._config
    };
  }
  _handleValueChanged(t) {
    const e = t.detail.value, i = Zt({
      ...this._config,
      ...e,
      type: "custom:blind-control-card"
    });
    this._config = K(i), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
I.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, I.styles = mt`
    .editor {
      display: block;
    }
  `;
let J = I;
function K(r) {
  const t = yt(r.size) ? r.size : w;
  return {
    ...r,
    type: r.type || "custom:blind-control-card",
    size: t,
    show_name: r.show_name ?? H,
    show_position: r.show_position ?? O
  };
}
function Zt(r) {
  const t = {
    ...r,
    type: "custom:blind-control-card"
  };
  typeof t.name == "string" && (t.name = t.name.trim()), t.name || delete t.name, t.entity || delete t.entity, (!yt(t.size) || t.size === w) && delete t.size, t.show_name === H && delete t.show_name, t.show_position === O && delete t.show_position;
  const e = G(t.slider_height, 120, 420), i = G(t.button_size, 34, 72);
  return e === void 0 ? delete t.slider_height : t.slider_height = e, i === void 0 ? delete t.button_size : t.button_size = i, t;
}
function yt(r) {
  return r === "small" || r === "medium" || r === "large";
}
function G(r, t, e) {
  const i = typeof r == "number" ? r : Number(r);
  if (Number.isFinite(i))
    return Math.min(e, Math.max(t, Math.round(i)));
}
function pt(r, t, e, i) {
  return G(r, t, e) ?? i;
}
customElements.get("blind-control-card") || customElements.define("blind-control-card", Z);
customElements.get("blind-control-card-editor") || customElements.define("blind-control-card-editor", J);
window.customCards = window.customCards ?? [];
window.customCards.some((r) => r.type === "blind-control-card") || window.customCards.push({
  type: "blind-control-card",
  name: "Blind Control Card",
  description: "Control responsive para persianas y covers Shelly.",
  preview: !0
});
