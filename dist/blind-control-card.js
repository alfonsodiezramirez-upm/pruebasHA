/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, it = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (s) => new $t(typeof s == "string" ? s : s + "", void 0, ot), vt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new $t(e, s, ot);
}, Pt = (s, t) => {
  if (it) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = F.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, at = it ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return kt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: Tt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Ht, getOwnPropertySymbols: Mt, getPrototypeOf: Nt } = Object, g = globalThis, ct = g.trustedTypes, Ot = ct ? ct.emptyScript : "", Z = g.reactiveElementPolyfillSupport, z = (s, t) => s, X = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Ot : null;
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
} }, yt = (s, t) => !zt(s, t), lt = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Tt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = Ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const c = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = Nt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, i = [...Ht(e), ...Mt(e)];
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
      for (const o of i) e.unshift(at(o));
    } else t !== void 0 && e.push(at(t));
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
    return Pt(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : X).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : X;
      this._$Em = o;
      const d = a.fromAttribute(e, c.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (n = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? yt)(n, e) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: c } = r, a = this[n];
        c !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[z("elementProperties")] = /* @__PURE__ */ new Map(), A[z("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: A }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, dt = (s) => s, j = T.trustedTypes, ht = j ? j.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, wt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + b, Rt = `<${At}>`, y = document, U = () => y.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", st = Array.isArray, Lt = (s) => st(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, pt = />/g, f = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, mt = /"/g, xt = /^(?:script|style|textarea|title)$/i, Dt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), _ = Dt(1), C = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), bt = /* @__PURE__ */ new WeakMap(), $ = y.createTreeWalker(y, 129);
function St(s, t) {
  if (!st(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Ft = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = P;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let d, u, l = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, u = r.exec(a), u !== null); ) p = r.lastIndex, r === P ? u[1] === "!--" ? r = ut : u[1] !== void 0 ? r = pt : u[2] !== void 0 ? (xt.test(u[2]) && (o = RegExp("</" + u[2], "g")), r = f) : u[3] !== void 0 && (r = f) : r === f ? u[0] === ">" ? (r = o ?? P, l = -1) : u[1] === void 0 ? l = -2 : (l = r.lastIndex - u[2].length, d = u[1], r = u[3] === void 0 ? f : u[3] === '"' ? mt : _t) : r === mt || r === _t ? r = f : r === ut || r === pt ? r = P : (r = f, o = void 0);
    const m = r === f && s[c + 1].startsWith("/>") ? " " : "";
    n += r === P ? a + Rt : l >= 0 ? (i.push(d), a.slice(0, l) + wt + a.slice(l) + b + m) : a + b + (l === -2 ? c : m);
  }
  return [St(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [d, u] = Ft(t, e);
    if (this.el = M.createElement(d, i), $.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = $.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(wt)) {
          const p = u[r++], m = o.getAttribute(l).split(b), w = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: w[2], strings: m, ctor: w[1] === "." ? jt : w[1] === "?" ? Bt : w[1] === "@" ? Wt : V }), o.removeAttribute(l);
        } else l.startsWith(b) && (a.push({ type: 6, index: n }), o.removeAttribute(l));
        if (xt.test(o.tagName)) {
          const l = o.textContent.split(b), p = l.length - 1;
          if (p > 0) {
            o.textContent = j ? j.emptyScript : "";
            for (let m = 0; m < p; m++) o.append(l[m], U()), $.nextNode(), a.push({ type: 2, index: ++n });
            o.append(l[p], U());
          }
        }
      } else if (o.nodeType === 8) if (o.data === At) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(b, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += b.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function k(s, t, e = s, i) {
  var r, c;
  if (t === C) return t;
  let o = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const n = H(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = o : e._$Cl = o), o !== void 0 && (t = k(s, o._$AS(s, t.values), o, i)), t;
}
class It {
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
    let n = $.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new D(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new Vt(n, this, t)), this._$AV.push(d), a = i[++c];
      }
      r !== (a == null ? void 0 : a.index) && (n = $.nextNode(), r++);
    }
    return $.currentNode = y, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class D {
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
    t = k(this, t, e), H(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Lt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(St(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const r = new It(o, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = bt.get(t.strings);
    return e === void 0 && bt.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new D(this.O(U()), this.O(U()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = dt(t).nextSibling;
      dt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = k(this, t, e, 0), r = !H(t) || t !== this._$AH && t !== C, r && (this._$AH = t);
    else {
      const c = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = k(this, c[i + a], e, a), d === C && (d = this._$AH[a]), r || (r = !H(d) || d !== this._$AH[a]), d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Bt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Wt extends V {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = k(this, t, e, 0) ?? h) === C) return;
    const i = this._$AH, o = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== h && (i === h || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const K = T.litHtmlPolyfillSupport;
K == null || K(M, D), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.3");
const qt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = o = new D(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qt(e, this.renderRoot, this.renderOptions);
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
    return C;
  }
}
var ft;
S._$litElement$ = !0, S.finalized = !0, (ft = v.litElementHydrateSupport) == null || ft.call(v, { LitElement: S });
const G = v.litElementPolyfillSupport;
G == null || G({ LitElement: S });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
const Zt = 1, Jt = 2, Kt = 4, Gt = 8, E = "medium", q = "default", N = !0, O = !0, R = !0, L = !0, gt = {
  small: {
    sliderHeight: 150,
    sliderWidth: 14,
    buttonSize: 38,
    iconSize: 20,
    padding: 12,
    gap: 10,
    cardSize: 3
  },
  medium: {
    sliderHeight: 210,
    sliderWidth: 14,
    buttonSize: 44,
    iconSize: 22,
    padding: 16,
    gap: 14,
    cardSize: 4
  },
  large: {
    sliderHeight: 280,
    sliderWidth: 16,
    buttonSize: 54,
    iconSize: 26,
    padding: 20,
    gap: 18,
    cardSize: 5
  }
}, Qt = {
  entity: "Entidad cover",
  name: "Nombre",
  icon: "Icono junto al nombre",
  size: "Tamano",
  card_theme: "Tema de tarjeta",
  slider_height: "Altura de barra",
  slider_width: "Ancho de barra",
  button_size: "Tamano de botones",
  show_name: "Mostrar nombre",
  show_position: "Mostrar porcentaje",
  show_slider: "Mostrar slider",
  show_buttons: "Mostrar botones",
  button_background_color: "Fondo de todos los botones",
  open_button_background_color: "Fondo boton subir",
  stop_button_background_color: "Fondo boton parar",
  close_button_background_color: "Fondo boton bajar"
}, Xt = [
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
], B = class B extends S {
  constructor() {
    super(...arguments), this._isSliding = !1;
  }
  setConfig(t) {
    const e = et(t);
    if (!e.entity) {
      this._config = e, this._error = 'Falta la opcion obligatoria "entity" en blind-control-card.';
      return;
    }
    this._config = e, this._error = void 0;
  }
  getCardSize() {
    var a, d, u, l;
    const t = this._getSizeSettings(), e = ((a = this._config) == null ? void 0 : a.show_name) ?? N, i = ((d = this._config) == null ? void 0 : d.show_position) ?? O, o = ((u = this._config) == null ? void 0 : u.show_slider) ?? R, n = ((l = this._config) == null ? void 0 : l.show_buttons) ?? L, r = [
      e ? 30 : 0,
      o ? t.sliderHeight + (i ? 22 : 0) : 0,
      n ? t.buttonSize : 0
    ].filter((p) => p > 0), c = t.padding * 2 + r.reduce((p, m) => p + m, 0) + Math.max(0, r.length - 1) * t.gap;
    return Math.max(2, Math.ceil(c / 50));
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
      size: E
    };
  }
  updated(t) {
    t.has("hass") && !this._isSliding && (this._dragPosition = void 0);
  }
  render() {
    var rt;
    if (this._error)
      return this._renderError(this._error);
    if (!((rt = this._config) != null && rt.entity))
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
    const e = this._config.name ?? t.attributes.friendly_name ?? this._config.entity, i = this._getCurrentPosition(t), o = this._dragPosition ?? i ?? this._positionFromState(t), n = i !== void 0 || this._dragPosition !== void 0, r = this._isUnavailable(t), c = this._supportsFeature(
      t,
      Kt,
      i !== void 0
    ), a = this._config.show_name ?? N, d = this._config.show_position ?? O, u = this._config.show_slider ?? R, l = this._config.show_buttons ?? L, p = this._config.card_theme ?? q, m = this._getSizeSettings(), w = this._getCardStyle(m);
    return !u && !l ? this._renderError("Activa show_slider o show_buttons para mostrar controles.") : _`
      <ha-card class=${`theme-${p}`} style=${w}>
        <div class="card-content">
          ${a ? this._renderTitle(e) : h}

          ${u ? _`
                <div class="slider-block">
                  <div
                    class=${`slider-shell${c && !r ? "" : " disabled"}`}
                    style=${`--position: ${o};`}
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
                      .value=${String(o)}
                      ?disabled=${!c || r}
                      aria-label=${`Posicion de ${e}`}
                      @input=${this._handleSliderInput}
                      @change=${this._handlePositionChange}
                    />
                  </div>

                  ${d ? _`
                        <div class="position-label">
                          ${n ? `${o}%` : this._getStateLabel(t)}
                        </div>
                      ` : h}
                </div>
              ` : h}

          ${u && !c && !r ? _`<div class="hint">
                Esta entidad no permite fijar posicion desde Home Assistant.
              </div>` : h}

          ${u && r ? _`<div class="hint">La entidad esta ${t.state}.</div>` : h}

          ${l ? _`
                <div class="actions">
                  ${this._renderButton(
      "Subir",
      "mdi:arrow-up-bold",
      "open_cover",
      r || !this._supportsFeature(t, Zt, !0),
      this._getButtonBackground("open")
    )}
                  ${this._renderButton(
      "Parar",
      "mdi:stop",
      "stop_cover",
      r || !this._supportsFeature(t, Gt, !0),
      this._getButtonBackground("stop")
    )}
                  ${this._renderButton(
      "Bajar",
      "mdi:arrow-down-bold",
      "close_cover",
      r || !this._supportsFeature(t, Jt, !0),
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
  _renderButton(t, e, i, o, n) {
    return _`
      <button
        type="button"
        title=${t}
        aria-label=${t}
        style=${n ? `--blind-button-bg: ${n};` : ""}
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
    const o = t.attributes.supported_features, n = typeof o == "number" ? o : Number(o);
    return Number.isFinite(n) ? (n & e) !== 0 : i;
  }
  _isUnavailable(t) {
    return t.state === "unavailable" || t.state === "unknown";
  }
  _getIcon() {
    var e, i;
    return ((i = (e = this._config) == null ? void 0 : e.icon) == null ? void 0 : i.trim()) || void 0;
  }
  _getButtonBackground(t) {
    var i, o, n, r;
    const e = t === "open" ? (i = this._config) == null ? void 0 : i.open_button_background_color : t === "stop" ? (o = this._config) == null ? void 0 : o.stop_button_background_color : (n = this._config) == null ? void 0 : n.close_button_background_color;
    return x(e) ?? x((r = this._config) == null ? void 0 : r.button_background_color);
  }
  _getSizeSettings() {
    var i, o, n, r;
    const t = ((i = this._config) == null ? void 0 : i.size) ?? E, e = gt[t] ?? gt[E];
    return {
      ...e,
      sliderHeight: Q(
        (o = this._config) == null ? void 0 : o.slider_height,
        120,
        420,
        e.sliderHeight
      ),
      sliderWidth: Q(
        (n = this._config) == null ? void 0 : n.slider_width,
        8,
        44,
        e.sliderWidth
      ),
      buttonSize: Q(
        (r = this._config) == null ? void 0 : r.button_size,
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
B.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 },
  _dragPosition: { state: !0 }
}, B.styles = vt`
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
      touch-action: none;
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
let Y = B;
const W = class W extends S {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Qt[t.name] ?? t.name;
  }
  setConfig(t) {
    this._config = et(t);
  }
  render() {
    return _`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._getEditorData()}
          .schema=${Xt}
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
      card_theme: q,
      show_name: N,
      show_position: O,
      show_slider: R,
      show_buttons: L,
      ...this._config
    };
  }
  _handleValueChanged(t) {
    const e = t.detail.value, i = Yt({
      ...this._config,
      ...e,
      type: "custom:blind-control-card"
    });
    this._config = et(i), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
W.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, W.styles = vt`
    .editor {
      display: block;
    }
  `;
let tt = W;
function et(s) {
  const t = Et(s.size) ? s.size : E, e = Ct(s.card_theme) ? s.card_theme : q;
  return {
    ...s,
    type: s.type || "custom:blind-control-card",
    size: t,
    card_theme: e,
    show_name: s.show_name ?? N,
    show_position: s.show_position ?? O,
    show_slider: s.show_slider ?? R,
    show_buttons: s.show_buttons ?? L
  };
}
function Yt(s) {
  const t = {
    ...s,
    type: "custom:blind-control-card"
  };
  typeof t.name == "string" && (t.name = t.name.trim()), typeof t.icon == "string" && (t.icon = t.icon.trim()), t.name || delete t.name, t.icon || delete t.icon, t.entity || delete t.entity, (!Et(t.size) || t.size === E) && delete t.size, (!Ct(t.card_theme) || t.card_theme === q) && delete t.card_theme, t.show_name === N && delete t.show_name, t.show_position === O && delete t.show_position, t.show_slider === R && delete t.show_slider, t.show_buttons === L && delete t.show_buttons;
  const e = I(t.slider_height, 120, 420), i = I(t.slider_width, 8, 44), o = I(t.button_size, 34, 72);
  return e === void 0 ? delete t.slider_height : t.slider_height = e, i === void 0 ? delete t.slider_width : t.slider_width = i, o === void 0 ? delete t.button_size : t.button_size = o, t.button_background_color = x(t.button_background_color), t.open_button_background_color = x(t.open_button_background_color), t.stop_button_background_color = x(t.stop_button_background_color), t.close_button_background_color = x(t.close_button_background_color), t.button_background_color || delete t.button_background_color, t.open_button_background_color || delete t.open_button_background_color, t.stop_button_background_color || delete t.stop_button_background_color, t.close_button_background_color || delete t.close_button_background_color, t;
}
function Et(s) {
  return s === "small" || s === "medium" || s === "large";
}
function Ct(s) {
  return s === "default" || s === "minimal" || s === "filled" || s === "outline";
}
function I(s, t, e) {
  const i = typeof s == "number" ? s : Number(s);
  if (Number.isFinite(i))
    return Math.min(e, Math.max(t, Math.round(i)));
}
function Q(s, t, e, i) {
  return I(s, t, e) ?? i;
}
function x(s) {
  if (typeof s != "string")
    return;
  const t = s.trim();
  if (!(!t || /[;{}]/.test(t)))
    return t;
}
customElements.get("blind-control-card") || customElements.define("blind-control-card", Y);
customElements.get("blind-control-card-editor") || customElements.define("blind-control-card-editor", tt);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "blind-control-card") || window.customCards.push({
  type: "blind-control-card",
  name: "Blind Control Card",
  description: "Control responsive para persianas y covers Shelly.",
  preview: !0
});
