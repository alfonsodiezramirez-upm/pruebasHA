/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, st = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (st && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = lt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && lt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (s) => new wt(typeof s == "string" ? s : s + "", void 0, rt), St = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[r + 1], s[0]);
  return new wt(e, s, rt);
}, Ot = (s, t) => {
  if (st) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = B.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, ct = st ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ut(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Nt, defineProperty: Rt, getOwnPropertyDescriptor: Ht, getOwnPropertyNames: Mt, getOwnPropertySymbols: Dt, getPrototypeOf: It } = Object, b = globalThis, dt = b.trustedTypes, Lt = dt ? dt.emptyScript : "", K = b.reactiveElementPolyfillSupport, z = (s, t) => s, Y = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Lt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, At = (s, t) => !Nt(s, t), ht = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: At };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Rt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: r } = Ht(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const l = o == null ? void 0 : o.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = It(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, i = [...Mt(e), ...Dt(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(ct(o));
    } else t !== void 0 && e.push(ct(t));
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
    return Ot(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Y).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, n;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const l = i.getPropertyOptions(o), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : Y;
      this._$Em = o;
      const d = a.fromAttribute(e, l.type);
      this[o] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, r) {
    var n;
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? At)(r, e) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, n] of o) {
        const { wrapped: l } = n, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[z("elementProperties")] = /* @__PURE__ */ new Map(), S[z("finalized")] = /* @__PURE__ */ new Map(), K == null || K({ ReactiveElement: S }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, ut = (s) => s, W = U.trustedTypes, pt = W ? W.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, xt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, Et = "?" + g, Ft = `<${Et}>`, y = document, O = () => y.createComment(""), N = (s) => s === null || typeof s != "object" && typeof s != "function", nt = Array.isArray, Bt = (s) => nt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, mt = />/g, f = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, bt = /"/g, Pt = /^(?:script|style|textarea|title)$/i, Wt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), _ = Wt(1), P = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), $ = y.createTreeWalker(y, 129);
function Ct(s, t) {
  if (!nt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(t) : t;
}
const jt = (s, t) => {
  const e = s.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = k;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let d, u, c = -1, p = 0;
    for (; p < a.length && (n.lastIndex = p, u = n.exec(a), u !== null); ) p = n.lastIndex, n === k ? u[1] === "!--" ? n = _t : u[1] !== void 0 ? n = mt : u[2] !== void 0 ? (Pt.test(u[2]) && (o = RegExp("</" + u[2], "g")), n = f) : u[3] !== void 0 && (n = f) : n === f ? u[0] === ">" ? (n = o ?? k, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? f : u[3] === '"' ? bt : gt) : n === bt || n === gt ? n = f : n === _t || n === mt ? n = k : (n = f, o = void 0);
    const m = n === f && s[l + 1].startsWith("/>") ? " " : "";
    r += n === k ? a + Ft : c >= 0 ? (i.push(d), a.slice(0, c) + xt + a.slice(c) + g + m) : a + g + (c === -2 ? l : m);
  }
  return [Ct(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class R {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, u] = jt(t, e);
    if (this.el = R.createElement(d, i), $.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = $.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(xt)) {
          const p = u[n++], m = o.getAttribute(c).split(g), w = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: w[2], strings: m, ctor: w[1] === "." ? qt : w[1] === "?" ? Zt : w[1] === "@" ? Kt : q }), o.removeAttribute(c);
        } else c.startsWith(g) && (a.push({ type: 6, index: r }), o.removeAttribute(c));
        if (Pt.test(o.tagName)) {
          const c = o.textContent.split(g), p = c.length - 1;
          if (p > 0) {
            o.textContent = W ? W.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(c[m], O()), $.nextNode(), a.push({ type: 2, index: ++r });
            o.append(c[p], O());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Et) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(g, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += g.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(s, t, e = s, i) {
  var n, l;
  if (t === P) return t;
  let o = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const r = N(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), r === void 0 ? o = void 0 : (o = new r(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = C(s, o._$AS(s, t.values), o, i)), t;
}
class Vt {
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
    const { el: { content: e }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? y).importNode(e, !0);
    $.currentNode = o;
    let r = $.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new L(r, r.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (d = new Jt(r, this, t)), this._$AV.push(d), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (r = $.nextNode(), n++);
    }
    return $.currentNode = y, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = C(this, t, e), N(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Bt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = R.createElement(Ct(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(e);
    else {
      const n = new Vt(o, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const r of t) o === e.length ? e.push(i = new L(this.O(O()), this.O(O()), this, this.options)) : i = e[o], i._$AI(r), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = ut(t).nextSibling;
      ut(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = C(this, t, e, 0), n = !N(t) || t !== this._$AH && t !== P, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = r[0], a = 0; a < r.length - 1; a++) d = C(this, l[i + a], e, a), d === P && (d = this._$AH[a]), n || (n = !N(d) || d !== this._$AH[a]), d === h ? t = h : t !== h && (t += (d ?? "") + r[a + 1]), this._$AH[a] = d;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Zt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Kt extends q {
  constructor(t, e, i, o, r) {
    super(t, e, i, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? h) === P) return;
    const i = this._$AH, o = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== h && (i === h || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const G = U.litHtmlPolyfillSupport;
G == null || G(R, L), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.3");
const Gt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new L(t.insertBefore(O(), r), r, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class x extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gt(e, this.renderRoot, this.renderOptions);
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
    return P;
  }
}
var yt;
x._$litElement$ = !0, x.finalized = !0, (yt = v.litElementHydrateSupport) == null || yt.call(v, { LitElement: x });
const X = v.litElementPolyfillSupport;
X == null || X({ LitElement: x });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
const Xt = 1, Yt = 2, Q = 4, Qt = 8, E = "medium", Z = "default", H = !0, M = !0, D = !0, I = !0, $t = {
  small: {
    sliderHeight: 150,
    sliderWidth: 14,
    sliderTouchWidth: 26,
    buttonSize: 38,
    iconSize: 20,
    padding: 12,
    gap: 10,
    cardSize: 3
  },
  medium: {
    sliderHeight: 210,
    sliderWidth: 14,
    sliderTouchWidth: 28,
    buttonSize: 44,
    iconSize: 22,
    padding: 16,
    gap: 14,
    cardSize: 4
  },
  large: {
    sliderHeight: 280,
    sliderWidth: 16,
    sliderTouchWidth: 30,
    buttonSize: 54,
    iconSize: 26,
    padding: 20,
    gap: 18,
    cardSize: 5
  }
}, te = {
  entity: "Entidad cover",
  name: "Nombre",
  icon: "Icono junto al nombre",
  size: "Tamano",
  card_theme: "Tema de tarjeta",
  slider_height: "Altura de barra",
  slider_width: "Ancho de barra",
  slider_touch_width: "Zona tactil del slider",
  button_size: "Tamano de botones",
  show_name: "Mostrar nombre",
  show_position: "Mostrar porcentaje",
  show_slider: "Mostrar slider",
  show_buttons: "Mostrar botones",
  button_background_color: "Fondo de todos los botones",
  open_button_background_color: "Fondo boton subir",
  stop_button_background_color: "Fondo boton parar",
  close_button_background_color: "Fondo boton bajar"
}, ee = [
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
    name: "icon",
    selector: {
      icon: {}
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
    name: "card_theme",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "default", label: "Home Assistant" },
          { value: "minimal", label: "Minimal" },
          { value: "filled", label: "Relleno" },
          { value: "outline", label: "Borde" }
        ]
      }
    }
  },
  {
    name: "show_slider",
    selector: {
      boolean: {}
    }
  },
  {
    name: "show_buttons",
    selector: {
      boolean: {}
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
    name: "slider_width",
    selector: {
      number: {
        min: 8,
        max: 44,
        step: 1,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "slider_touch_width",
    selector: {
      number: {
        min: 18,
        max: 72,
        step: 2,
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
  },
  {
    name: "button_background_color",
    selector: {
      text: {}
    }
  },
  {
    name: "open_button_background_color",
    selector: {
      text: {}
    }
  },
  {
    name: "stop_button_background_color",
    selector: {
      text: {}
    }
  },
  {
    name: "close_button_background_color",
    selector: {
      text: {}
    }
  }
], j = class j extends x {
  constructor() {
    super(...arguments), this._isSliding = !1;
  }
  setConfig(t) {
    const e = it(t);
    if (!e.entity) {
      this._config = e, this._error = 'Falta la opcion obligatoria "entity" en blind-control-card.';
      return;
    }
    this._config = e, this._error = void 0;
  }
  getCardSize() {
    var a, d, u, c;
    const t = this._getSizeSettings(), e = ((a = this._config) == null ? void 0 : a.show_name) ?? H, i = ((d = this._config) == null ? void 0 : d.show_position) ?? M, o = ((u = this._config) == null ? void 0 : u.show_slider) ?? D, r = ((c = this._config) == null ? void 0 : c.show_buttons) ?? I, n = [
      e ? 30 : 0,
      o ? t.sliderHeight + (i ? 22 : 0) : 0,
      r ? t.buttonSize : 0
    ].filter((p) => p > 0), l = t.padding * 2 + n.reduce((p, m) => p + m, 0) + Math.max(0, n.length - 1) * t.gap;
    return Math.max(2, Math.ceil(l / 50));
  }
  static async getConfigElement() {
    return document.createElement("blind-control-card-editor");
  }
  static getStubConfig(t) {
    return {
      entity: Object.keys((t == null ? void 0 : t.states) ?? {}).find(
        (i) => i.startsWith("cover.")
      ) ?? "cover.persiana_salon",
      size: E
    };
  }
  updated(t) {
    t.has("hass") && !this._isSliding && (this._dragPosition = void 0);
  }
  render() {
    var at;
    if (this._error)
      return this._renderError(this._error);
    if (!((at = this._config) != null && at.entity))
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
    const e = this._config.name ?? t.attributes.friendly_name ?? this._config.entity, i = this._getCurrentPosition(t), o = this._dragPosition ?? i ?? this._positionFromState(t), r = i !== void 0 || this._dragPosition !== void 0, n = this._isUnavailable(t), l = this._supportsFeature(
      t,
      Q,
      i !== void 0
    ), a = !l || n, d = this._config.show_name ?? H, u = this._config.show_position ?? M, c = this._config.show_slider ?? D, p = this._config.show_buttons ?? I, m = this._config.card_theme ?? Z, w = this._getSizeSettings(), zt = this._getCardStyle(w);
    return !c && !p ? this._renderError("Activa show_slider o show_buttons para mostrar controles.") : _`
      <ha-card class=${`theme-${m}`} style=${zt}>
        <div class="card-content">
          ${d ? this._renderTitle(e) : h}

          ${c ? _`
                <div class="slider-block">
                  <div
                    class=${`slider-shell${a ? " disabled" : ""}`}
                    style=${`--position: ${o};`}
                  >
                    <span class="scale top">100</span>
                    <div class="slider-track" aria-hidden="true">
                      <div class="slider-fill"></div>
                      <div class="slider-thumb"></div>
                    </div>
                    <span class="scale bottom">0</span>
                    <div
                      class=${`position-slider${a ? " disabled" : ""}`}
                      role="slider"
                      tabindex=${a ? "-1" : "0"}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${String(o)}
                      aria-valuetext=${`${o}%`}
                      aria-disabled=${String(a)}
                      aria-label=${`Posicion de ${e}`}
                      @pointerdown=${this._handleSliderPointerDown}
                      @pointermove=${this._handleSliderPointerMove}
                      @pointerup=${this._handleSliderPointerUp}
                      @pointercancel=${this._handleSliderPointerCancel}
                      @keydown=${this._handleSliderKeyDown}
                    ></div>
                  </div>

                  ${u ? _`
                        <div class="position-label">
                          ${r ? `${o}%` : this._getStateLabel(t)}
                        </div>
                      ` : h}
                </div>
              ` : h}

          ${c && !l && !n ? _`<div class="hint">
                Esta entidad no permite fijar posicion desde Home Assistant.
              </div>` : h}

          ${c && n ? _`<div class="hint">La entidad esta ${t.state}.</div>` : h}

          ${p ? _`
                <div class="actions">
                  ${this._renderButton(
      "Subir",
      "mdi:arrow-up-bold",
      "open_cover",
      n || !this._supportsFeature(t, Xt, !0),
      this._getButtonBackground("open")
    )}
                  ${this._renderButton(
      "Parar",
      "mdi:stop",
      "stop_cover",
      n || !this._supportsFeature(t, Qt, !0),
      this._getButtonBackground("stop")
    )}
                  ${this._renderButton(
      "Bajar",
      "mdi:arrow-down-bold",
      "close_cover",
      n || !this._supportsFeature(t, Yt, !0),
      this._getButtonBackground("close")
    )}
                </div>
              ` : h}
        </div>
      </ha-card>
    `;
  }
  _renderTitle(t) {
    const e = this._getIcon();
    return _`
      <div class="title-row">
        ${e ? _`<ha-icon class="title-icon" .icon=${e}></ha-icon>` : h}
        <h2 class="title">${t}</h2>
        ${e ? _`<ha-icon class="title-icon" .icon=${e}></ha-icon>` : h}
      </div>
    `;
  }
  _renderButton(t, e, i, o, r) {
    return _`
      <button
        type="button"
        title=${t}
        aria-label=${t}
        style=${r ? `--blind-button-bg: ${r};` : ""}
        ?disabled=${o}
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
  _handleSliderPointerDown(t) {
    if (!t.isPrimary || !this._canUseSlider())
      return;
    const e = t.currentTarget;
    this._activePointerId = t.pointerId, this._isSliding = !0, e.setPointerCapture(t.pointerId), this._dragPosition = this._positionFromPointerEvent(t, e), t.preventDefault();
  }
  _handleSliderPointerMove(t) {
    if (t.pointerId === this._activePointerId) {
      if (!this._canUseSlider()) {
        this._activePointerId = void 0, this._isSliding = !1;
        return;
      }
      this._dragPosition = this._positionFromPointerEvent(
        t,
        t.currentTarget
      ), t.preventDefault();
    }
  }
  _handleSliderPointerUp(t) {
    if (t.pointerId !== this._activePointerId)
      return;
    const e = t.currentTarget;
    if (!this._canUseSlider()) {
      this._activePointerId = void 0, this._isSliding = !1, e.releasePointerCapture(t.pointerId);
      return;
    }
    const i = this._positionFromPointerEvent(t, e);
    this._activePointerId = void 0, this._isSliding = !1, this._dragPosition = i, e.releasePointerCapture(t.pointerId), this._callCoverService("set_cover_position", { position: i }), t.preventDefault();
  }
  _handleSliderPointerCancel(t) {
    t.pointerId === this._activePointerId && (this._activePointerId = void 0, this._isSliding = !1);
  }
  _handleSliderKeyDown(t) {
    if (!this._canUseSlider())
      return;
    const e = this._getVisibleSliderPosition(), i = t.shiftKey ? 10 : 5;
    let o;
    if (t.key === "ArrowUp" || t.key === "ArrowRight" ? o = e + i : t.key === "ArrowDown" || t.key === "ArrowLeft" ? o = e - i : t.key === "Home" ? o = 0 : t.key === "End" && (o = 100), o === void 0)
      return;
    const r = this._clampPosition(o);
    this._dragPosition = r, this._callCoverService("set_cover_position", { position: r }), t.preventDefault();
  }
  _positionFromPointerEvent(t, e) {
    const i = e.getBoundingClientRect(), o = (i.bottom - t.clientY) / i.height;
    return this._clampPosition(o * 100);
  }
  async _callCoverService(t, e = {}) {
    var i;
    if (!(!this.hass || !((i = this._config) != null && i.entity)))
      try {
        await this.hass.callService("cover", t, {
          entity_id: this._config.entity,
          ...e
        });
      } catch (o) {
        console.error("blind-control-card service call failed", o);
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
    const o = t.attributes.supported_features, r = typeof o == "number" ? o : Number(o);
    return Number.isFinite(r) ? (r & e) !== 0 : i;
  }
  _isUnavailable(t) {
    return t.state === "unavailable" || t.state === "unknown";
  }
  _canUseSlider() {
    var e;
    if (!this.hass || !((e = this._config) != null && e.entity))
      return !1;
    const t = this.hass.states[this._config.entity];
    return !t || this._isUnavailable(t) ? !1 : this._supportsFeature(
      t,
      Q,
      this._getCurrentPosition(t) !== void 0
    );
  }
  _getVisibleSliderPosition() {
    var e;
    if (!this.hass || !((e = this._config) != null && e.entity))
      return this._dragPosition ?? 0;
    const t = this.hass.states[this._config.entity];
    return t ? this._dragPosition ?? this._getCurrentPosition(t) ?? this._positionFromState(t) : this._dragPosition ?? 0;
  }
  _getIcon() {
    var e, i;
    return ((i = (e = this._config) == null ? void 0 : e.icon) == null ? void 0 : i.trim()) || void 0;
  }
  _getButtonBackground(t) {
    var i, o, r, n;
    const e = t === "open" ? (i = this._config) == null ? void 0 : i.open_button_background_color : t === "stop" ? (o = this._config) == null ? void 0 : o.stop_button_background_color : (r = this._config) == null ? void 0 : r.close_button_background_color;
    return A(e) ?? A((n = this._config) == null ? void 0 : n.button_background_color);
  }
  _getSizeSettings() {
    var i, o, r, n, l;
    const t = ((i = this._config) == null ? void 0 : i.size) ?? E, e = $t[t] ?? $t[E];
    return {
      ...e,
      sliderHeight: F(
        (o = this._config) == null ? void 0 : o.slider_height,
        120,
        420,
        e.sliderHeight
      ),
      sliderWidth: F(
        (r = this._config) == null ? void 0 : r.slider_width,
        8,
        44,
        e.sliderWidth
      ),
      sliderTouchWidth: F(
        (n = this._config) == null ? void 0 : n.slider_touch_width,
        18,
        72,
        e.sliderTouchWidth
      ),
      buttonSize: F(
        (l = this._config) == null ? void 0 : l.button_size,
        34,
        72,
        e.buttonSize
      )
    };
  }
  _getCardStyle(t) {
    return [
      `--blind-slider-height: ${t.sliderHeight}px`,
      `--blind-slider-width: ${t.sliderWidth}px`,
      `--blind-slider-touch-width: ${t.sliderTouchWidth}px`,
      `--blind-thumb-size: ${Math.max(30, t.sliderWidth + 16)}px`,
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
j.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 },
  _dragPosition: { state: !0 }
}, j.styles = St`
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

    ha-card.theme-minimal {
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    ha-card.theme-filled {
      background: color-mix(
        in srgb,
        var(--primary-color),
        var(--ha-card-background, var(--card-background-color)) 88%
      );
    }

    ha-card.theme-outline {
      background: transparent;
      border-width: max(1px, var(--ha-card-border-width, 1px));
      border-color: color-mix(in srgb, var(--primary-color), var(--divider-color) 55%);
      box-shadow: none;
    }

    .card-content {
      width: 100%;
      box-sizing: border-box;
      padding: var(--blind-card-padding, 16px);
      display: grid;
      gap: var(--blind-card-gap, 14px);
      justify-items: center;
    }

    .title-row {
      width: 100%;
      display: grid;
      grid-template-columns: auto minmax(0, auto) auto;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
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

    .title-icon {
      --mdc-icon-size: calc(var(--blind-icon-size, 22px) * 0.95);
      color: var(--primary-color);
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
    }

    .slider-track {
      position: relative;
      width: var(--blind-slider-width, 14px);
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
      width: var(--blind-thumb-size, 30px);
      height: var(--blind-thumb-size, 30px);
      border-radius: 50%;
      transform: translate(-50%, 50%);
      background: var(--primary-color);
      border: 3px solid var(--ha-card-background, var(--card-background-color));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.24);
    }

    .position-slider {
      position: absolute;
      top: 14px;
      bottom: 14px;
      left: 50%;
      width: var(--blind-slider-touch-width, 28px);
      height: calc(100% - 28px);
      margin: 0;
      opacity: 0;
      cursor: pointer;
      transform: translateX(-50%);
      touch-action: none;
      writing-mode: vertical-lr;
      direction: rtl;
    }

    .position-slider.disabled,
    .slider-shell.disabled {
      opacity: 0.55;
      cursor: not-allowed;
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
      background: var(--blind-button-bg, var(--secondary-background-color, transparent));
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
let tt = j;
const V = class V extends x {
  constructor() {
    super(...arguments), this._computeLabel = (t) => te[t.name] ?? t.name;
  }
  setConfig(t) {
    this._config = it(t);
  }
  render() {
    return _`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._getEditorData()}
          .schema=${ee}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._handleValueChanged}
        ></ha-form>
      </div>
    `;
  }
  _getEditorData() {
    return {
      type: "custom:blind-control-card",
      size: E,
      card_theme: Z,
      show_name: H,
      show_position: M,
      show_slider: D,
      show_buttons: I,
      ...this._config
    };
  }
  _handleValueChanged(t) {
    const e = t.detail.value, i = ie({
      ...this._config,
      ...e,
      type: "custom:blind-control-card"
    });
    this._config = it(i), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
V.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, V.styles = St`
    .editor {
      display: block;
    }
  `;
let et = V;
function it(s) {
  const t = kt(s.size) ? s.size : E, e = Tt(s.card_theme) ? s.card_theme : Z;
  return {
    ...s,
    type: s.type || "custom:blind-control-card",
    size: t,
    card_theme: e,
    show_name: s.show_name ?? H,
    show_position: s.show_position ?? M,
    show_slider: s.show_slider ?? D,
    show_buttons: s.show_buttons ?? I
  };
}
function ie(s) {
  const t = {
    ...s,
    type: "custom:blind-control-card"
  };
  typeof t.name == "string" && (t.name = t.name.trim()), typeof t.icon == "string" && (t.icon = t.icon.trim()), t.name || delete t.name, t.icon || delete t.icon, t.entity || delete t.entity, (!kt(t.size) || t.size === E) && delete t.size, (!Tt(t.card_theme) || t.card_theme === Z) && delete t.card_theme, t.show_name === H && delete t.show_name, t.show_position === M && delete t.show_position, t.show_slider === D && delete t.show_slider, t.show_buttons === I && delete t.show_buttons;
  const e = T(t.slider_height, 120, 420), i = T(t.slider_width, 8, 44), o = T(t.slider_touch_width, 18, 72), r = T(t.button_size, 34, 72);
  return e === void 0 ? delete t.slider_height : t.slider_height = e, i === void 0 ? delete t.slider_width : t.slider_width = i, o === void 0 ? delete t.slider_touch_width : t.slider_touch_width = o, r === void 0 ? delete t.button_size : t.button_size = r, t.button_background_color = A(t.button_background_color), t.open_button_background_color = A(t.open_button_background_color), t.stop_button_background_color = A(t.stop_button_background_color), t.close_button_background_color = A(t.close_button_background_color), t.button_background_color || delete t.button_background_color, t.open_button_background_color || delete t.open_button_background_color, t.stop_button_background_color || delete t.stop_button_background_color, t.close_button_background_color || delete t.close_button_background_color, t;
}
function kt(s) {
  return s === "small" || s === "medium" || s === "large";
}
function Tt(s) {
  return s === "default" || s === "minimal" || s === "filled" || s === "outline";
}
function T(s, t, e) {
  const i = typeof s == "number" ? s : Number(s);
  if (Number.isFinite(i))
    return Math.min(e, Math.max(t, Math.round(i)));
}
function F(s, t, e, i) {
  return T(s, t, e) ?? i;
}
function A(s) {
  if (typeof s != "string")
    return;
  const t = s.trim();
  if (!(!t || /[;{}]/.test(t)))
    return t;
}
function oe(s, t) {
  if (t.split(".")[0] !== "cover")
    return null;
  const e = s.states[t], i = [
    {
      label: "Completa",
      config: {
        type: "custom:blind-control-card",
        entity: t,
        icon: "mdi:blinds"
      }
    }
  ];
  return (!e || se(e)) && i.push({
    label: "Solo slider",
    config: {
      type: "custom:blind-control-card",
      entity: t,
      icon: "mdi:blinds",
      show_buttons: !1
    }
  }), i.push({
    label: "Solo botones",
    config: {
      type: "custom:blind-control-card",
      entity: t,
      icon: "mdi:blinds",
      show_slider: !1
    }
  }), i;
}
function se(s) {
  const t = s.attributes.supported_features, e = typeof t == "number" ? t : Number(t);
  return Number.isFinite(e) ? (e & Q) !== 0 : s.attributes.current_position !== void 0;
}
customElements.get("blind-control-card") || customElements.define("blind-control-card", tt);
customElements.get("blind-control-card-editor") || customElements.define("blind-control-card-editor", et);
window.customCards = window.customCards ?? [];
const ot = {
  type: "blind-control-card",
  name: "Blind Control Card",
  description: "Control responsive para persianas y covers Shelly.",
  preview: !0,
  documentationURL: "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/#suggesting-your-card-for-an-entity",
  getEntitySuggestion: oe
}, vt = window.customCards.find(
  (s) => s.type === ot.type
);
vt ? Object.assign(vt, ot) : window.customCards.push(ot);
window.__BLIND_CONTROL_CARD_VERSION__ || (console.info(
  "%cBLIND-CONTROL-CARD%c 0.6.0 loaded",
  "color: var(--primary-color); font-weight: 700;",
  "color: inherit;"
), window.__BLIND_CONTROL_CARD_VERSION__ = "0.6.0");
