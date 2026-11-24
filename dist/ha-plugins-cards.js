/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, Ft = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = Symbol(), ci = /* @__PURE__ */ new WeakMap();
let es = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ft && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = ci.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ci.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Rr = (i) => new es(typeof i == "string" ? i : i + "", void 0, Ht), ce = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new es(t, i, Ht);
}, Mr = (i, e) => {
  if (Ft) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = it.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, ui = Ft ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Rr(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Lr, defineProperty: jr, getOwnPropertyDescriptor: Nr, getOwnPropertyNames: Dr, getOwnPropertySymbols: zr, getPrototypeOf: Fr } = Object, ht = globalThis, hi = ht.trustedTypes, Hr = hi ? hi.emptyScript : "", Ur = ht.reactiveElementPolyfillSupport, De = (i, e) => i, nt = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Hr : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ut = (i, e) => !Lr(i, e), di = { attribute: !0, type: String, converter: nt, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ??= Symbol("metadata"), ht.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Re = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = di) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && jr(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: n } = Nr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? di;
  }
  static _$Ei() {
    if (this.hasOwnProperty(De("elementProperties"))) return;
    const e = Fr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(De("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(De("properties"))) {
      const t = this.properties, s = [...Dr(t), ...zr(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(ui(r));
    } else e !== void 0 && t.push(ui(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Mr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : nt).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : nt;
      this._$Em = r;
      const l = o.fromAttribute(t, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Ut)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Re.elementStyles = [], Re.shadowRootOptions = { mode: "open" }, Re[De("elementProperties")] = /* @__PURE__ */ new Map(), Re[De("finalized")] = /* @__PURE__ */ new Map(), Ur?.({ ReactiveElement: Re }), (ht.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = globalThis, mi = (i) => i, ot = qt.trustedTypes, fi = ot ? ot.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ts = "$lit$", xe = `lit$${Math.random().toFixed(9).slice(2)}$`, is = "?" + xe, qr = `<${is}>`, Ae = document, ze = () => Ae.createComment(""), Fe = (i) => i === null || typeof i != "object" && typeof i != "function", Vt = Array.isArray, Vr = (i) => Vt(i) || typeof i?.[Symbol.iterator] == "function", bt = `[ 	
\f\r]`, je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pi = /-->/g, gi = />/g, Ce = RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _i = /'/g, vi = /"/g, ss = /^(?:script|style|textarea|title)$/i, Wr = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), v = Wr(1), $e = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), bi = /* @__PURE__ */ new WeakMap(), Te = Ae.createTreeWalker(Ae, 129);
function rs(i, e) {
  if (!Vt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fi !== void 0 ? fi.createHTML(e) : e;
}
const Br = (i, e) => {
  const t = i.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = je;
  for (let l = 0; l < t; l++) {
    const a = i[l];
    let c, h, u = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, h = o.exec(a), h !== null); ) f = o.lastIndex, o === je ? h[1] === "!--" ? o = pi : h[1] !== void 0 ? o = gi : h[2] !== void 0 ? (ss.test(h[2]) && (r = RegExp("</" + h[2], "g")), o = Ce) : h[3] !== void 0 && (o = Ce) : o === Ce ? h[0] === ">" ? (o = r ?? je, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? Ce : h[3] === '"' ? vi : _i) : o === vi || o === _i ? o = Ce : o === pi || o === gi ? o = je : (o = Ce, r = void 0);
    const d = o === Ce && i[l + 1].startsWith("/>") ? " " : "";
    n += o === je ? a + qr : u >= 0 ? (s.push(c), a.slice(0, u) + ts + a.slice(u) + xe + d) : a + xe + (u === -2 ? l : d);
  }
  return [rs(i, n + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class He {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, h] = Br(e, t);
    if (this.el = He.createElement(c, s), Te.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = Te.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(ts)) {
          const f = h[o++], d = r.getAttribute(u).split(xe), g = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: g[2], strings: d, ctor: g[1] === "." ? Gr : g[1] === "?" ? Yr : g[1] === "@" ? Xr : dt }), r.removeAttribute(u);
        } else u.startsWith(xe) && (a.push({ type: 6, index: n }), r.removeAttribute(u));
        if (ss.test(r.tagName)) {
          const u = r.textContent.split(xe), f = u.length - 1;
          if (f > 0) {
            r.textContent = ot ? ot.emptyScript : "";
            for (let d = 0; d < f; d++) r.append(u[d], ze()), Te.nextNode(), a.push({ type: 2, index: ++n });
            r.append(u[f], ze());
          }
        }
      } else if (r.nodeType === 8) if (r.data === is) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(xe, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += xe.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = Ae.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Le(i, e, t = i, s) {
  if (e === $e) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = Fe(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = Le(i, r._$AS(i, e.values), r, s)), e;
}
class Kr {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? Ae).importNode(t, !0);
    Te.currentNode = r;
    let n = Te.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new Ve(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new Qr(n, this, e)), this._$AV.push(c), a = s[++l];
      }
      o !== a?.index && (n = Te.nextNode(), o++);
    }
    return Te.currentNode = Ae, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class Ve {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Le(this, e, t), Fe(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== $e && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Vr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && Fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ae.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = He.createElement(rs(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new Kr(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = bi.get(e.strings);
    return t === void 0 && bi.set(e.strings, t = new He(e)), t;
  }
  k(e) {
    Vt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const n of e) r === t.length ? t.push(s = new Ve(this.O(ze()), this.O(ze()), this, this.options)) : s = t[r], s._$AI(n), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = mi(e).nextSibling;
      mi(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, r, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = Le(this, e, t, 0), o = !Fe(e) || e !== this._$AH && e !== $e, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = Le(this, l[s + a], t, a), c === $e && (c = this._$AH[a]), o ||= !Fe(c) || c !== this._$AH[a], c === p ? e = p : e !== p && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Gr extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Yr extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Xr extends dt {
  constructor(e, t, s, r, n) {
    super(e, t, s, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Le(this, e, t, 0) ?? p) === $e) return;
    const s = this._$AH, r = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Qr {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Le(this, e);
  }
}
const Jr = qt.litHtmlPolyfillSupport;
Jr?.(He, Ve), (qt.litHtmlVersions ??= []).push("3.3.3");
const Zr = (i, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = r = new Ve(e.insertBefore(ze(), n), n, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = globalThis;
let _e = class extends Re {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Zr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return $e;
  }
};
_e._$litElement$ = !0, _e.finalized = !0, Wt.litElementHydrateSupport?.({ LitElement: _e });
const en = Wt.litElementPolyfillSupport;
en?.({ LitElement: _e });
(Wt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tn = { attribute: !0, type: String, converter: nt, reflect: !1, hasChanged: Ut }, sn = (i = tn, e, t) => {
  const { kind: s, metadata: r } = t;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(t.name, i), s === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = t;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function re(i) {
  return (e, t) => typeof t == "object" ? sn(i, e, t) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(i) {
  return re({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rn = (i, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(i, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ns(i, e) {
  return (t, s, r) => {
    const n = (o) => o.renderRoot?.querySelector(i) ?? null;
    return rn(t, s, { get() {
      return n(this);
    } });
  };
}
const Y = ce`
  :host {
    --tile-color: var(--state-inactive-color, #7b7b7b);
    display: block;
  }

  /*
   * A card takes the height it is given when a height was actually given: rows
   * set by hand rather than left on auto, and something under the line to fill
   * them with. A block host with an automatic height ignores that height
   * outright — a card told to be four rows tall drew 130px inside a 248px slot
   * and left the rest as a hole — and inheriting it is what finally gives
   * ha-card's own height: 100% something to resolve against.
   *
   * On auto the card keeps its natural height even when a taller neighbour
   * makes the grid row taller, exactly as the stock tile does. Filling there
   * looked worse, not better: three rows of heating spread over 350px because
   * the card beside it had a lot to say.
   */
  :host([filled]) {
    height: 100%;
  }

  ha-card {
    height: 100%;
    transition:
      box-shadow 180ms ease-in-out,
      border-color 180ms ease-in-out;
  }

  ha-card:has(ha-tile-container[focused]) {
    --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
    --shadow-focus: 0 0 0 1px var(--tile-color);
    border-color: var(--tile-color);
    box-shadow: var(--shadow-default), var(--shadow-focus);
  }

  ha-tile-icon {
    --tile-icon-color: var(--tile-color);
  }

  hui-card-features {
    --feature-color: var(--tile-color);
  }

  /*
   * Where the spare height goes.
   *
   * ha-tile-container gives its top row flex: 1, so on a card with a fixed
   * height every extra pixel lands in the icon-and-text row — the stock tile at
   * four rows is 248px of a single line. That row is the card's identity and
   * belongs at exactly one layout row; the room underneath is what the rest of
   * the content is for. The row lives in HA's shadow and cannot be restyled
   * from out here, so it is outvoted instead: our half of the card asks for the
   * free space with a growth factor two orders of magnitude larger and the row
   * keeps its 56px minimum plus a rounding error.
   */
  .custom-features,
  hui-card-features[slot="features"] {
    flex: 100 1 auto;
    min-height: 0;
  }


  /* The texts and the right-hand column share one row of the info slot. */
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    min-width: 0;
    gap: 6px;
  }

  .info ha-tile-info {
    flex: 1;
    min-width: 0;
  }

  .info.vertical {
    flex-direction: column;
    gap: 0;
  }

  /*
   * The one departure from the tile canon: the main values are moved into the
   * right-hand column in a large font. Each next value drops the font a step,
   * otherwise the column eats the card name.
   */
  .values {
    flex: none;
    display: flex;
    align-items: baseline;
    gap: 4px;
    white-space: nowrap;
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-xl, 20px);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  .values.of-2 {
    font-size: var(--ha-font-size-l, 16px);
  }

  .values.of-3 {
    font-size: var(--ha-font-size-m, 14px);
    gap: 2px;
  }

  /* The icon names the quantity; the number stays the star, the icon is muted. */
  .values .clickable,
  .values > span,
  .values > button {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }

  .value-icon {
    flex: none;
    color: var(--secondary-text-color);
    --mdc-icon-size: 17px;
  }

  .values.of-2 .value-icon {
    --mdc-icon-size: 15px;
  }

  .values.of-3 .value-icon {
    --mdc-icon-size: 14px;
  }

  .values-separator {
    color: var(--secondary-text-color);
  }

  .unit {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
  }

  /*
   * The second departure: values are clickable one by one, and a tap on each
   * opens more-info for its entity. Tile content does not take events, so the
   * tap targets switch them back on.
   */
  .clickable {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    pointer-events: auto;
  }
  .clickable:hover {
    opacity: 0.7;
  }
  .clickable:focus-visible {
    outline: 2px solid var(--tile-color);
    outline-offset: 2px;
    border-radius: var(--ha-border-radius-sm, 6px);
  }

  /* Our own features line: the same padding as the stock row. */
  .custom-features {
    display: flex;
    flex-direction: column;
    padding: 0 var(--ha-space-3, 12px) var(--ha-space-3, 12px);
    pointer-events: auto;
  }

  /* Whatever is inside takes the whole line: rows spread, controls space out. */
  .custom-features > * {
    flex: 1;
    min-height: 0;
  }

  /*
   * The inline place is sized by ha-tile-container — half the card on the grid
   * track, --feature-height of 36px — so all this has to do is centre the
   * control in it and take taps, which the tile's row does not.
   */
  .custom-inline {
    display: flex;
    flex-direction: column;
    justify-content: center;
    pointer-events: auto;
  }

  .warning {
    display: block;
    padding: var(--ha-space-3, 12px);
    color: var(--warning-color, #ffa600);
    font-size: var(--ha-font-size-m, 14px);
  }
`, mt = /* @__PURE__ */ new Set(["unavailable", "unknown"]), nn = /* @__PURE__ */ new Set([
  "aqi",
  "battery",
  "carbon_dioxide",
  "carbon_monoxide",
  "humidity",
  "illuminance",
  "moisture",
  "nitrogen_dioxide",
  "nitrogen_monoxide",
  "nitrous_oxide",
  "ozone",
  "pm1",
  "pm10",
  "pm25",
  "sulphur_dioxide",
  "volatile_organic_compounds",
  "volatile_organic_compounds_parts"
]);
function os(i) {
  const e = i?.attributes.device_class;
  if (!e || !nn.has(e)) return !1;
  const t = Number(i.state);
  return Number.isFinite(t) && t < 0;
}
const on = " · ";
function _(i, e) {
  if (!e) return;
  const t = i?.states[e];
  return {
    entityId: e,
    stateObj: t,
    missing: !t,
    unavailable: !!t && mt.has(t.state),
    impossible: os(t)
  };
}
function Bt(i, e) {
  if (!(!i || !e || !e.stateObj || e.missing || e.unavailable) && !e.impossible)
    return i.formatEntityState(e.stateObj);
}
function yi(i, e, t) {
  const s = e?.attributes[t];
  if (!(s == null || s === ""))
    return i?.formatEntityAttributeValue?.(e, t) ?? String(s);
}
function I(i) {
  return i.filter(
    (e) => !!e && (e.content !== void 0 || (e.text ?? "").trim() !== "")
  );
}
function q(i, e) {
  const t = Bt(i, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function G(i, e) {
  const t = ft(i, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function ft(i, e) {
  if (!(!i || !e?.stateObj || !e.unavailable))
    return i.formatEntityState(e.stateObj);
}
function ee(i) {
  if (!i?.stateObj || i.impossible) return;
  const e = Number(i.stateObj.state);
  return Number.isFinite(e) ? e : void 0;
}
const an = /* @__PURE__ */ new Set([
  "off",
  "false",
  "no",
  "none",
  "not charging",
  "no charge",
  "uncharged",
  "discharging",
  "full",
  "fully charged",
  "charged",
  // ha-smart-charging's socket sensor, whose vocabulary is closed and is
  // exactly idle / charging / cooldown / sleep / generic. Its own "charging"
  // is the only one of the five that means the current is flowing; without the
  // other four an idle socket would light every bar hanging off it.
  "idle",
  "cooldown",
  "sleep",
  "generic"
]);
function ln(i) {
  if (!i?.stateObj || i.missing || i.unavailable) return !1;
  const e = i.stateObj.state.trim().toLowerCase().replace(/[_-]+/g, " ");
  return !an.has(e);
}
function Ue(i, e) {
  return i || (e?.stateObj?.attributes.friendly_name ?? e?.entityId ?? "");
}
function Kt(i, e) {
  if (!e) return { value: i };
  if (!i.endsWith(e)) return { value: i };
  const t = i.slice(0, i.length - e.length).trimEnd();
  return t ? { value: t, unit: e } : { value: i };
}
const Ct = "unavailable", cn = "unknown", un = "off", hn = /* @__PURE__ */ new Set(["button", "input_button", "scene"]), dn = /* @__PURE__ */ new Set([
  "alarm_control_panel",
  "alert",
  "automation",
  "binary_sensor",
  "calendar",
  "camera",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "group",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "plant",
  "remote",
  "schedule",
  "script",
  "siren",
  "sun",
  "switch",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
  "weather"
]), D = (i) => i.substring(0, i.indexOf(".")), as = (i) => i.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "unknown";
function at(i, e) {
  const t = D(i.entity_id), s = i.state;
  if (hn.has(t))
    return s !== Ct;
  if (s === Ct || s === cn || s === un && t !== "alert")
    return !1;
  switch (t) {
    case "alarm_control_panel":
      return s !== "disarmed";
    case "alert":
      return s !== "idle";
    case "cover":
    case "valve":
      return s !== "closed";
    case "device_tracker":
    case "person":
      return s !== "not_home";
    case "lawn_mower":
      return !["docked", "paused"].includes(s);
    case "lock":
      return s !== "locked";
    case "media_player":
      return s !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(s);
    case "plant":
      return s === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(s);
    case "timer":
      return s === "active";
    case "camera":
      return ["streaming", "recording"].includes(s);
    default:
      return !0;
  }
}
const ls = (i) => i.reduceRight(
  (e, t) => `var(${t}${e ? `, ${e}` : ""})`,
  void 0
), mn = (i) => {
  const e = Number(i);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function fn(i, e) {
  if (!i) return e;
  if (i.state === Ct)
    return "var(--state-unavailable-color)";
  const t = D(i.entity_id), s = i.attributes.device_class;
  if (t === "sensor" && s === "battery") {
    const a = mn(i.state);
    if (a) return `var(${a})`;
  }
  if (!dn.has(t))
    return e;
  const r = at(i), n = as(i.state), o = r ? "active" : "inactive", l = [];
  return s && l.push(`--state-${t}-${s}-${n}-color`), l.push(
    `--state-${t}-${n}-color`,
    `--state-${t}-${o}-color`,
    `--state-${o}-color`
  ), ls(l);
}
const yt = (i) => Math.round(i).toString(16).padStart(2, "0"), pn = ([i, e, t]) => {
  const s = Math.max(i, e, t), r = s - Math.min(i, e, t), n = r && (s === i ? (e - t) / r : s === e ? 2 + (t - i) / r : 4 + (i - e) / r);
  return [60 * (n < 0 ? n + 6 : n), s && r / s, s];
}, gn = ([i, e, t]) => {
  const s = (r) => {
    const n = (r + i / 60) % 6;
    return t - t * e * Math.max(Math.min(n, 4 - n, 1), 0);
  };
  return [s(5), s(3), s(1)];
};
function _n(i) {
  const e = i.attributes.rgb_color;
  if (!Array.isArray(e) || e.length < 3) return;
  const t = pn(e);
  t[1] < 0.4 && (t[1] < 0.1 ? t[2] = 225 : t[1] = 0.4);
  const [s, r, n] = gn(t);
  return `#${yt(s)}${yt(r)}${yt(n)}`;
}
function F(i) {
  if (!i) return "var(--state-inactive-color)";
  if (D(i.entity_id) === "light" && at(i)) {
    const t = _n(i);
    if (t) return t;
  }
  const e = fn(i);
  return e || (at(i) ? "var(--state-icon-color)" : "var(--state-inactive-color)");
}
function Se(i) {
  return i !== void 0 && i.action !== "none";
}
const vn = ["closed", "locked", "off"], bn = /* @__PURE__ */ new Set([
  "fan",
  "input_boolean",
  "light",
  "switch",
  "group",
  "automation",
  "humidifier",
  "valve"
]);
function Ee(i) {
  if (!i) return { action: "none" };
  const e = D(i);
  return { action: bn.has(e) || ["button", "input_button", "scene"].includes(e) ? "toggle" : "none" };
}
const yn = {
  button: { on: "press" },
  camera: { on: "turn_on", off: "turn_off" },
  climate: { on: "turn_on", off: "turn_off" },
  cover: { on: "open_cover", off: "close_cover" },
  input_button: { on: "press" },
  lock: { on: "unlock", off: "lock" },
  media_player: { on: "turn_on", off: "turn_off" },
  scene: { on: "turn_on" },
  siren: { on: "turn_on", off: "turn_off" },
  valve: { on: "open_valve", off: "close_valve" }
};
function wn(i, e) {
  const t = yn[i];
  return t ? (e ? t.on : t.off) ?? t.on : e ? "turn_on" : "turn_off";
}
function xn(i, e) {
  const t = i.states[e];
  if (!t) return;
  const s = D(e), r = s === "group" ? "homeassistant" : s, n = vn.includes(t.state);
  i.callService(r, wn(s, n), {
    entity_id: e
  });
}
function wi(i, e, t) {
  i.dispatchEvent(
    new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 })
  );
}
function $n(i, e) {
  e ? window.history.replaceState(null, "", i) : window.history.pushState(null, "", i), window.dispatchEvent(new CustomEvent("location-changed", { detail: {} }));
}
async function kn(i, e) {
  if (!e.confirmation) return !0;
  const t = window.loadCardHelpers;
  if (!t) return window.confirm(e.confirmation.text ?? "Are you sure?");
  const s = await t();
  return s.showConfirmationDialog ? s.showConfirmationDialog(i, {
    text: e.confirmation.text,
    title: e.confirmation.title,
    confirmText: e.confirmation.confirm_text,
    dismissText: e.confirmation.dismiss_text
  }) : window.confirm(e.confirmation.text ?? "Are you sure?");
}
async function cs(i, e, t, s) {
  let r;
  if (s === "double_tap" ? r = t.double_tap_action : s === "hold" ? r = t.hold_action : r = t.tap_action, r || (r = { action: "more-info" }), !!await kn(i, r))
    switch (r.action) {
      case "none":
        break;
      case "more-info": {
        const n = r.entity || t.entity;
        n && wi(i, "hass-more-info", { entityId: n });
        break;
      }
      case "toggle": {
        const n = r.entity || t.entity;
        n && xn(e, n);
        break;
      }
      case "navigate":
        r.navigation_path && $n(r.navigation_path, r.navigation_replace);
        break;
      case "url":
        r.url_path && window.open(r.url_path, "_blank", "noreferrer");
        break;
      case "perform-action":
      case "call-service": {
        const n = r.perform_action || r.service;
        if (!n) break;
        const [o, l] = n.split(".", 2);
        e.callService(o, l, {
          ...r.data ?? r.service_data ?? {},
          ...r.target ?? {}
        });
        break;
      }
      case "fire-dom-event":
        wi(i, "ll-custom", r);
        break;
      default:
        console.warn(
          `horos-cards: action "${r.action}" is not supported`
        );
    }
}
const En = 2;
function xi(i, e) {
  const t = i ?? [];
  if (e !== "inline")
    return { inline: [], below: t, columns: 1 };
  const s = t.slice(1);
  return {
    inline: t.slice(0, 1),
    below: s,
    columns: Math.min(s.length, En)
  };
}
function Cn(i) {
  return Math.ceil(i.below.length / Math.max(i.columns, 1));
}
const Gt = 5e3, $i = [
  "ha-tile-container",
  "ha-tile-icon",
  "ha-tile-info",
  "hui-card-features"
], ki = [
  "ha-control-button",
  "ha-control-button-group",
  "ha-control-select"
];
let Je, Ze, et;
function Yt(i, e) {
  return customElements.get(i) ? Promise.resolve(!0) : Promise.race([
    customElements.whenDefined(i).then(() => !0),
    new Promise((t) => setTimeout(() => t(!1), e))
  ]);
}
async function Sn() {
  const i = window.loadCardHelpers;
  if (i)
    try {
      (await i()).createCardElement?.({ type: "tile", entity: "sun.sun" });
    } catch {
    }
}
function pt() {
  return Je || (Je = (async () => $i.every((e) => customElements.get(e)) ? !0 : (await Sn(), (await Promise.all(
    $i.map((e) => Yt(e, Gt))
  )).every(Boolean)))(), Je);
}
function us() {
  return Ze || (Ze = (async () => {
    if (ki.every((s) => customElements.get(s))) return !0;
    await pt();
    const i = window.loadCardHelpers;
    let e;
    try {
      e = (await i?.())?.createCardElement?.({
        type: "tile",
        entity: "sun.sun",
        features: [{ type: "cover-open-close" }, { type: "climate-hvac-modes" }]
      }), e && (e.style.position = "absolute", e.style.left = "-9999px", document.body.appendChild(e));
    } catch {
    }
    const t = await Promise.all(
      ki.map((s) => Yt(s, Gt))
    );
    return e?.remove(), t.every(Boolean);
  })(), Ze);
}
function Tn() {
  return et || (et = (async () => {
    if (customElements.get("hui-card-features-editor")) return !0;
    await pt();
    const i = customElements.get("hui-tile-card");
    try {
      await i?.getConfigElement?.();
    } catch {
    }
    return Yt("hui-card-features-editor", Gt);
  })(), et);
}
const We = {
  temperature: "mdi:thermometer",
  humidity: "mdi:water-percent",
  moisture: "mdi:water-percent",
  illuminance: "mdi:brightness-5",
  pm25: "mdi:blur",
  power: "mdi:flash",
  energy: "mdi:counter",
  battery: "mdi:battery",
  disk: "mdi:harddisk",
  cpu: "mdi:cpu-64-bit",
  memory: "mdi:memory",
  gpu: "mdi:expansion-card",
  download: "mdi:download",
  upload: "mdi:upload",
  total: "mdi:flash",
  brightness: "mdi:brightness-6",
  volume: "mdi:volume-high",
  tasks: "mdi:check-circle-outline",
  updates: "mdi:package-up"
}, An = {
  "entity.missing.one": "Сущность не найдена: {list}",
  "entity.missing.many": "Сущности не найдены: {list}",
  "internals.failed": "Не удалось загрузить компоненты Home Assistant",
  "value.unknown": "нет данных",
  "batteries.title": "Батарейки",
  "batteries.allFull": "Все заряжены, {count} шт.",
  "safety.title": "Безопасность",
  "safety.calm.one": "Всё спокойно, {count} датчик",
  "safety.calm.few": "Всё спокойно, {count} датчика",
  "safety.calm.many": "Всё спокойно, {count} датчиков",
  "safety.offline": "{name}: нет связи",
  "presence.title": "Присутствие",
  "presence.empty.one": "Пусто, {count} зона",
  "presence.empty.few": "Пусто, {count} зоны",
  "presence.empty.many": "Пусто, {count} зон",
  "energy.title": "Энергия",
  "energy.consuming": "{count} потребляют",
  "energy.idle": "Никто не потребляет",
  "offline.count": "{count} без связи",
  "offline.title": "Не отвечает",
  "offline.allAnswer": "Все на связи",
  "offline.more.one": "и ещё {count}",
  "offline.more.few": "и ещё {count}",
  "offline.more.many": "и ещё {count}",
  "list.missing.one": "{count} не найдена",
  "list.missing.few": "{count} не найдены",
  "list.missing.many": "{count} не найдено",
  "alerts.title": "Оповещения",
  "alerts.calm": "Всё тихо, {count} под присмотром",
  "alerts.offline": "{name}: нет связи",
  "lamp.title": "Лампа",
  "lamp.bright": "Ярче",
  "lamp.dim": "Тусклее",
  "lamp.warm": "Теплее",
  "lamp.cold": "Холоднее",
  "weather.noForecast": "прогноза на дни нет",
  "charge.title": "Зарядка",
  "charge.forced": "Принудительно · ещё {minutes} мин",
  "charge.pulse": "Нет данных · импульс",
  "charge.noData": "Нет данных с {time}",
  "charge.charging": "Заряжается до {max}%",
  "charge.waiting": "Включится ниже {min}%",
  "charge.on": "Заряжается",
  "charge.off": "Не заряжается",
  "charge.force": "30 мин",
  "charge.forceLeft": "{minutes} мин",
  "charge.every": "{hours} ч",
  "charge.everyLabel": "Импульс без данных раз в N часов; удерживать — настроить",
  "charge.min": "Мин.",
  "charge.max": "Макс.",
  "greenhouse.title": "Оранжерея",
  "greenhouse.thirsty.one": "{count} из {total} просит воды",
  "greenhouse.thirsty.few": "{count} из {total} просят воды",
  "greenhouse.thirsty.many": "{count} из {total} просят воды",
  "greenhouse.watered.one": "Политы, {count} растение",
  "greenhouse.watered.few": "Политы, {count} растения",
  "greenhouse.watered.many": "Политы, {count} растений",
  "greenhouse.soaked.one": "{count} залит",
  "greenhouse.soaked.few": "{count} залиты",
  "greenhouse.soaked.many": "{count} залито",
  "heating.title": "Отопление",
  "heating.calling.one": "{count} из {total} просит",
  "heating.calling.few": "{count} из {total} просят",
  "heating.calling.many": "{count} из {total} просят",
  "heating.quiet": "Тепла не просят",
  "light.title": "Свет",
  "light.count": "Горит {count} из {total}",
  "light.allOff": "Все выключены",
  "light.on": "вкл",
  "light.off": "выкл",
  "media.title": "Медиа",
  "media.idle": "Ничего не играет",
  "media.playing.one": "{count} играет",
  "media.playing.few": "{count} играют",
  "media.playing.many": "{count} играют",
  "ac.title": "Кондиционер",
  "updates.title": "Обновления",
  "updates.upToDate": "Всё обновлено",
  "updates.count.one": "{count} обновление",
  "updates.count.few": "{count} обновления",
  "updates.count.many": "{count} обновлений",
  "tasks.title": "Задачи",
  "tasks.none": "Дел нет",
  "tasks.noEvents": "Событий впереди нет",
  "server.title": "Домашний сервер",
  "vacuum.title": "Пылесос",
  "printer.title": "Принтер",
  "computer.title": "Компьютер",
  "person.title": "Человек",
  "air.title": "Воздух",
  "cover.title": "Шторы",
  "level.cpu": "CPU",
  "level.memory": "Память",
  "level.gpu": "GPU",
  "level.disk": "Диск",
  "level.diskFree": "Свободно",
  "level.humidity": "Влажность",
  "level.co2": "CO₂",
  "level.voc": "ЛОС",
  "level.aqi": "Индекс воздуха",
  "level.pm25": "PM2.5",
  "level.open": "Открыто"
}, st = {
  "entity.missing.one": "Entity not found: {list}",
  "entity.missing.many": "Entities not found: {list}",
  "internals.failed": "Could not load Home Assistant components",
  "value.unknown": "no data",
  "batteries.title": "Batteries",
  "batteries.allFull": "All charged, {count} total",
  "safety.title": "Safety",
  "safety.calm.one": "All clear, {count} sensor",
  "safety.calm.many": "All clear, {count} sensors",
  "safety.offline": "{name}: no connection",
  "presence.title": "Presence",
  "presence.empty.one": "Empty, {count} area",
  "presence.empty.many": "Empty, {count} areas",
  "energy.title": "Energy",
  "energy.consuming": "{count} drawing power",
  "energy.idle": "Nothing drawing power",
  "offline.count": "{count} offline",
  "offline.title": "Not responding",
  "offline.allAnswer": "Everything is answering",
  "offline.more.one": "and {count} more",
  "offline.more.many": "and {count} more",
  "list.missing.one": "{count} not found",
  "list.missing.many": "{count} not found",
  "alerts.title": "Alerts",
  "alerts.calm": "All quiet, {count} watched",
  "alerts.offline": "{name}: no connection",
  "lamp.title": "Lamp",
  "lamp.bright": "Brighter",
  "lamp.dim": "Dimmer",
  "lamp.warm": "Warmer",
  "lamp.cold": "Colder",
  "weather.noForecast": "no daily forecast",
  "charge.title": "Charging",
  "charge.forced": "Forced · {minutes} min left",
  "charge.pulse": "No data · pulse",
  "charge.noData": "No data since {time}",
  "charge.charging": "Charging to {max}%",
  "charge.waiting": "Starts below {min}%",
  "charge.on": "Charging",
  "charge.off": "Not charging",
  "charge.force": "30 min",
  "charge.forceLeft": "{minutes} min",
  "charge.every": "{hours} h",
  "charge.everyLabel": "Blind pulse every N hours; hold to adjust",
  "charge.min": "Min",
  "charge.max": "Max",
  "greenhouse.title": "Greenhouse",
  "greenhouse.thirsty.one": "{count} of {total} needs water",
  "greenhouse.thirsty.many": "{count} of {total} need water",
  "greenhouse.watered.one": "Watered, {count} plant",
  "greenhouse.watered.many": "Watered, {count} plants",
  "greenhouse.soaked.one": "{count} overwatered",
  "greenhouse.soaked.many": "{count} overwatered",
  "heating.title": "Heating",
  "heating.calling.one": "{count} of {total} calling",
  "heating.calling.many": "{count} of {total} calling",
  "heating.quiet": "No demand",
  "light.title": "Lights",
  "light.count": "{count} of {total} on",
  "light.allOff": "All off",
  "light.on": "on",
  "light.off": "off",
  "media.title": "Media",
  "media.idle": "Nothing playing",
  "media.playing.one": "{count} playing",
  "media.playing.many": "{count} playing",
  "ac.title": "Air conditioner",
  "updates.title": "Updates",
  "updates.upToDate": "Everything up to date",
  "updates.count.one": "{count} update",
  "updates.count.many": "{count} updates",
  "tasks.title": "Tasks",
  "tasks.none": "Nothing to do",
  "tasks.noEvents": "Nothing coming up",
  "server.title": "Home server",
  "vacuum.title": "Vacuum",
  "printer.title": "Printer",
  "computer.title": "Computer",
  "person.title": "Person",
  "air.title": "Air",
  "cover.title": "Curtains",
  "level.cpu": "CPU",
  "level.memory": "Memory",
  "level.gpu": "GPU",
  "level.disk": "Disk",
  "level.diskFree": "Free",
  "level.humidity": "Humidity",
  "level.co2": "CO₂",
  "level.voc": "VOCs",
  "level.aqi": "Air quality",
  "level.pm25": "PM2.5",
  "level.open": "Open"
}, hs = { ru: An, en: st };
function $(i) {
  const t = (i?.language ?? i?.locale?.language ?? "en").split("-")[0].toLowerCase();
  return t in hs ? t : "en";
}
function On(i, e) {
  if (i !== "ru") return e === 1 ? "one" : "many";
  const t = e % 10, s = e % 100;
  return t === 1 && s !== 11 ? "one" : t >= 2 && t <= 4 && (s < 12 || s > 14) ? "few" : "many";
}
function m(i, e, t = {}) {
  const s = $(i), r = hs[s] ?? st, n = t.count, o = typeof n == "number" ? `${e}.${On(s, n)}` : void 0;
  return ((o && (r[o] ?? st[o])) ?? r[e] ?? st[e] ?? e).replace(
    /\{(\w+)\}/g,
    (a, c) => c in t ? String(t[c]) : a
  );
}
var Pn = Object.defineProperty, Xt = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Pn(e, t, r), r;
};
const In = "—";
class E extends _e {
  constructor() {
    super(...arguments), this._ready = !1, this.base = {};
  }
  static {
    this.styles = [Y];
  }
  /**
   * How much room the content below the line takes, in layout rows: level rows,
   * features, controls of our own. A subclass overrides this if it has any.
   */
  contentRows() {
    return this.fixedRows();
  }
  /**
   * Layout rows for a list of level rows: three of them fit in one, and none of
   * them are there at all when the card's own line is switched off.
   *
   * Three, not two, because that is what a level row actually measures. A
   * layout row gives the content under the line 64px (56 of row plus the 8 of
   * gap it swallows); a row is a 12px line of text and an 8px bar — 14px — and
   * with a 4px gap between them and the stock 12px of padding under the last
   * one three come to 62. Counting two per row asked the grid for a whole
   * spare row and the card then stood in a hole a third of its height.
   */
  levelRows(e) {
    return this.base.levels === !1 ? 0 : Math.ceil(e / 3);
  }
  /**
   * The part of that content which cannot be squeezed.
   *
   * A list of level rows lives with whatever height it is given — it spreads or
   * crowds. A row of buttons or a slider is 42px and stays 42px, so a card that
   * has one must not be allowed to shrink under it. This is what `min_rows`
   * reports, and it is why the two numbers are counted separately.
   */
  fixedRows() {
    return this.featureRows([]);
  }
  /**
   * Rows taken by the features line, counted the way the stock tile counts
   * them. The user's list wins over the card's own, exactly as it does in
   * render, and the layout arithmetic is HA's own.
   */
  featureRows(e, t = !1) {
    const s = this.base.features ?? e;
    if (!s.length) return 0;
    const r = t ? "bottom" : this.base.features_position ?? "bottom";
    return Cn(xi(s, r));
  }
  getCardSize() {
    return 1 + this.contentRows();
  }
  /**
   * Layout hints for a sections dashboard.
   *
   * `rows: "auto"` because the height depends on the content: a printer has five
   * ink rows, a climate card none. The stock cards with a floating height, entities
   * and heading, describe themselves the same way. Without it the card would claim
   * one row no matter what is in it.
   */
  getGridOptions() {
    return {
      columns: 6,
      rows: "auto",
      min_columns: this.base.vertical ? 3 : 6,
      // One row for the line plus whatever cannot be squeezed under it.
      min_rows: 1 + this.fixedRows()
    };
  }
  connectedCallback() {
    super.connectedCallback(), pt().then((e) => {
      this._ready = e;
    });
  }
  fireMoreInfo(e) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  // ---- actions ---------------------------------------------------------
  _handleAction(e) {
    this._runAction(e.detail.action, !1);
  }
  _handleIconAction(e) {
    e.stopPropagation(), this._runAction(e.detail.action, !0);
  }
  /**
   * A tap on the icon that the card handles itself — a popup of its own, say.
   * Returns true when it did, and the configured icon action is then skipped.
   */
  iconTap() {
    return !1;
  }
  _runAction(e, t) {
    if (!this.hass || t && e === "tap" && this.iconTap()) return;
    const s = t ? {
      entity: this._entityId,
      tap_action: this.base.icon_tap_action ?? this._defaultIconAction,
      hold_action: this.base.icon_hold_action,
      double_tap_action: this.base.icon_double_tap_action
    } : {
      entity: this._entityId,
      tap_action: this.base.tap_action,
      hold_action: this.base.hold_action,
      double_tap_action: this.base.double_tap_action
    };
    cs(this, this.hass, s, e);
  }
  // ---- rendering -------------------------------------------------------
  /** A banner instead of the card: the config is invalid or the entity is gone. */
  renderWarning(e) {
    return v`<ha-card><div class="warning">${e}</div></ha-card>`;
  }
  /**
   * The main entity's state for the secondary line.
   *
   * When `state_content` or `time_format` is set, the stock `state-display` does
   * the rendering: it handles attributes, last changed and time formats — no
   * reason to redo that by hand.
   */
  mainStateSegment(e, t) {
    if (!e?.stateObj || e.unavailable) return;
    const s = this.base.state_content ?? t;
    return !s && !this.base.time_format ? q(this.hass, e) : {
      entityId: e.entityId,
      content: v`<state-display
        .hass=${this.hass}
        .stateObj=${e.stateObj}
        .content=${s}
        .timeFormat=${this.base.time_format}
      ></state-display>`
    };
  }
  /** A message about entities that were not found, or undefined if all are there. */
  missingRolesWarning(e) {
    const t = e.filter((s) => !!s && s.missing).map((s) => s.entityId);
    if (t.length)
      return m(
        this.hass,
        t.length === 1 ? "entity.missing.one" : "entity.missing.many",
        { list: t.join(", ") }
      );
  }
  /**
   * Wraps a value in its own tap target. The click does not bubble to the body,
   * so more-info opens for that entity rather than for the main one.
   *
   * A button rather than a span with a handler: values are targets in their own
   * right, and one has to be able to tab to them and press them from the
   * keyboard. The entity name goes into title and aria-label: "63%" on its own
   * says nothing about whose it is — neither on hover nor to a screen reader.
   */
  renderClickable(e, t) {
    if (!t) return v`<span>${e}</span>`;
    const s = this.hass?.states[t]?.attributes.friendly_name ?? t;
    return v`<span
      role="button"
      tabindex="0"
      class="clickable"
      title=${s}
      aria-label=${s}
      @click=${(r) => {
      r.stopPropagation(), this.fireMoreInfo(t);
    }}
      @keydown=${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), r.stopPropagation(), this.fireMoreInfo(t));
    }}
      >${e}</span
    >`;
  }
  renderTile(e) {
    const {
      icon: t,
      color: s,
      primary: r,
      secondary: n,
      mainEntityId: o,
      imageUrl: l,
      defaultIconAction: a,
      values: c,
      ownFeatures: h,
      customFeatures: u,
      customInline: f
    } = e;
    if (this._entityId = o, this._defaultIconAction = a, !this._ready)
      return this.renderWarning(m(this.hass, "internals.failed"));
    const d = this._tileColor(s), g = this.base.icon_tap_action ?? a, w = Se(g) || Se(this.base.icon_hold_action) || Se(this.base.icon_double_tap_action), b = this.base.features ?? h, C = this.base.features_position ?? "bottom", j = this.base.levels === !1 ? void 0 : u, X = xi(
      b,
      f ? "bottom" : C
    ), B = typeof this.base.grid_options?.rows == "number";
    return this.toggleAttribute(
      "filled",
      B && !!(j || X.below.length)
    ), v`
      <ha-card style="--tile-color: ${d};">
        <ha-tile-container
          .featurePosition=${f ? "inline" : C}
          .vertical=${!!this.base.vertical}
          .fixedInfoHeight=${this.layout === "grid" && B}
          .interactive=${!0}
          .actionHandlerOptions=${{
      hasHold: Se(this.base.hold_action),
      hasDoubleClick: Se(this.base.double_tap_action)
    }}
          @action=${this._handleAction}
        >
          <ha-tile-icon
            slot="icon"
            class=${l ? "image" : ""}
            .interactive=${w}
            .imageUrl=${l}
            .icon=${this.base.icon ?? t}
            .actionHandlerOptions=${{
      hasHold: Se(this.base.icon_hold_action),
      hasDoubleClick: Se(this.base.icon_double_tap_action)
    }}
            @action=${this._handleIconAction}
          ></ha-tile-icon>

          <div slot="info" class="info ${this.base.vertical ? "vertical" : ""}">
            <ha-tile-info>
              <span slot="primary">${r}</span>
              ${n?.length && !this.base.hide_state ? v`<span slot="secondary"
                    >${n.map(
      (H, k) => v`
                        ${k ? v`<span>${on}</span>` : p}${this.renderClickable(
        H.content ?? H.text,
        H.entityId
      )}
                      `
    )}</span
                  >` : p}
            </ha-tile-info>
            ${c?.length ? v`<div class="values of-${c.length}">
                  ${c.map(
      (H, k) => v`
                      ${k ? v`<span class="values-separator">/</span>` : p}
                      ${this.renderClickable(
        v`${H.icon ? v`<ha-icon
                              class="value-icon"
                              .icon=${H.icon}
                            ></ha-icon>` : p}${H.value}${H.unit ? v`<span class="unit"> ${H.unit}</span>` : p}`,
        H.entityId
      )}
                    `
    )}
                </div>` : p}
          </div>

          ${X.inline.length ? v`<hui-card-features
                slot="features-inline"
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${X.inline}
                .position=${C}
              ></hui-card-features>` : p}
          ${f ? v`<div slot="features-inline" class="custom-inline">
                ${f}
              </div>` : p}
          ${j ? v`<div slot="features" class="custom-features">
                ${j}
              </div>` : p}
          ${X.below.length ? v`<hui-card-features
                slot="features"
                .columns=${X.columns}
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${X.below}
                .position=${"bottom"}
              ></hui-card-features>` : p}
        </ha-tile-container>
      </ha-card>
    `;
  }
  /**
   * The tile colour, by the stock tile's rule: a colour from the config counts
   * only while the entity is active — an inactive one is grey on the stock tile
   * and has to be grey here. A card assembled from a list of equal entities has
   * nothing to be active, so there its colour is taken at face value.
   */
  _tileColor(e) {
    const t = this._entityId ? this.hass?.states[this._entityId] : void 0;
    return this.base.color && (!t || at(t)) ? ds(this.base.color) : e ?? "var(--state-inactive-color)";
  }
  /**
   * The values of the right-hand column. `icons` names a value by its role key:
   * without it two percentages in a row are indistinguishable.
   */
  bigValues(e, t = We) {
    return e.map((s) => s.role ? {
      ...this.formatted(s.role.stateObj) ?? { value: In },
      entityId: s.role.entityId,
      icon: t[s.key]
    } : void 0).filter((s) => !!s);
  }
  /**
   * The entity picture URL — the same logic as _getImageUrl in the stock tile.
   * Cameras, with their separate size-aware URL, are not supported.
   */
  entityImage(e) {
    if (!this.base.show_entity_picture || !this.hass || !e)
      return;
    const t = e.attributes.entity_picture_local || e.attributes.entity_picture;
    return t ? this.hass.hassUrl(t) : void 0;
  }
  /** A large value ready to show. An unavailable entity has none. */
  formatted(e) {
    if (!(!this.hass || !e) && !mt.has(e.state) && !os(e))
      return Kt(
        this.hass.formatEntityState(e),
        e.attributes.unit_of_measurement
      );
  }
}
Xt([
  re({ attribute: !1 })
], E.prototype, "hass");
Xt([
  re({ attribute: !1 })
], E.prototype, "layout");
Xt([
  x()
], E.prototype, "_ready");
function ds(i) {
  return /^(#|rgb|hsl|var\()/.test(i) ? i : i === "state" ? "var(--state-icon-color)" : `var(--${i}-color, var(--state-icon-color))`;
}
const wt = (i) => Math.max(0, Math.min(100, i)), te = ce`
  /*
   * The rows fill whatever height they are given and spread evenly in it —
   * the same thing hui-card-features does with its own spare room, so a list
   * of rows and a stack of features behave alike on a card of a fixed height.
   *
   * Three columns for the whole list, not three parts of each row: the value
   * column is then as wide as the widest value there is, and every bar ends at
   * the same place. Rows that sized their own value drew a ragged right edge —
   * a week of weather whose "11 / 23.7 °C" is a character shorter than its
   * neighbours pushed that day's bar further right than the rest, and six bars
   * meant to be read as one scale no longer shared an end.
   *
   * The value itself is one string against the right edge. Splitting it round
   * its sign to stand the arrows in a line was tried: it left a hole after the
   * sign wherever the halves differed in width, and read worse than arrows a
   * digit apart.
   */
  .levels {
    display: grid;
    grid-template-columns: var(--level-name, 34%) minmax(0, 1fr) auto;
    align-content: space-evenly;
    row-gap: var(--ha-space-1, 4px);
    column-gap: var(--ha-space-2, 8px);
    height: 100%;
    min-height: 0;
  }

  /*
   * A row is its line of text and nothing more — no padding of its own.
   *
   * Three rows have to fit in one layout row, which is 64px of content: 3 * 14
   * of text plus two 4px gaps and the 12px of padding under the last one comes
   * to 62. Padding on the row itself pushed that to 74, and a card told to be
   * two rows tall then had its list spill over the bottom edge — the padding
   * under the last bar disappeared and the bar sat on the card's border.
   *
   * padding: 0 is written out because a button without it takes the browser's
   * own 1px 6px and the bars stop lining up with the texts above.
   */
  .level {
    display: grid;
    grid-column: 1 / -1;
    /* The row borrows the list's columns, so they line up across rows. */
    grid-template-columns: subgrid;
    align-items: center;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
    border-radius: var(--ha-border-radius-sm, 6px);
  }

  .level:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 2px;
  }

  /*
   * One width for every row, not auto: otherwise names of different lengths
   * drag the bars around and the list stops reading as one scale. A fraction
   * of the row by default, because a name is as long as the card is wide; a
   * card with short labels sets --level-name to a length of its own.
   */
  .level .name {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*
   * Every glyph of a row comes after its label, never before it, so the labels
   * of a list start on one line however many of them carry a glyph. The label
   * is the part that gives way: it is cut with an ellipsis and the glyph stays.
   */
  .level .name .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .level .name ha-icon {
    flex: none;
    color: var(--error-color, #db4437);
    --mdc-icon-size: 14px;
  }

  /* The row's own glyph is not an alarm and is not painted like one. */
  .level .name ha-icon.mark {
    color: var(--ink);
  }

  /* An old reading is a caution, not an alarm. */
  .level .name ha-icon.stale {
    color: var(--yellow-color, #fdd835);
  }

  /*
   * The bar as in the stock hui-bar-gauge-card-feature, only thinner.
   *
   * The fill is placed on the track rather than sitting before it in the row:
   * a span has to start away from the left edge, and a bar laid out as a box in
   * the line could only grow from it.
   */
  .level .bar {
    position: relative;
    min-width: 0;
    height: 8px;
    border-radius: var(--ha-border-radius-pill, 9999px);
  }

  /*
   * The track is a pill in its own right, for the same reason the fill is: the
   * bar does not clip its children, and a track relying on a clip came out a
   * rectangle with knife-cut ends under rounded fills.
   */
  .level .bar .track {
    position: absolute;
    inset: 0;
    border-radius: var(--ha-border-radius-pill, 9999px);
    background-color: var(--ink);
    opacity: 0.2;
  }

  /*
   * The fill is a pill of its own, not a rectangle the track happens to round
   * off. Clipping alone rounds only the end that touches the track's edge, so
   * a battery bar came out with a knife-cut right end while a weather span next
   * to it was rounded at both — one list of bars, two shapes.
   */
  .level .bar .fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: var(--ha-border-radius-pill, 9999px);
    background-color: var(--ink);
    transition:
      width 400ms ease-in-out,
      inset-inline-start 400ms ease-in-out;
  }

  /*
   * A span is never thinner than it is tall: a day whose night and afternoon
   * are the same would otherwise have no bar at all. A level starts at zero and
   * has no such floor — an empty tank must be able to show nothing.
   */
  .level .bar .fill.span {
    min-width: 8px;
  }

  /*
   * Charging: a shimmer runs along the fill.
   *
   * Taken as is from ha-smart-charging, which draws its own battery bars on the
   * same dashboards: a soft white band twice the width of the bar, drifting at
   * an even pace. Two plugins of ours must not have two different ways of
   * saying "charging" next to each other. What is deliberately not taken is
   * that card's pulsing thumb at the end of the fill — a level row is a scale
   * to be read, not a slider to be dragged.
   */
  .level .bar .fill.charging {
    background-image: linear-gradient(
      90deg,
      rgb(255 255 255 / 0) 0%,
      rgb(255 255 255 / 0.3) 50%,
      rgb(255 255 255 / 0) 100%
    );
    background-size: 200% 100%;
    animation: level-charging 2s linear infinite;
  }

  @keyframes level-charging {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  .level .value {
    min-width: 3.2em;
    text-align: end;
    font-size: var(--ha-font-size-s, 12px);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .level.low .value {
    color: var(--error-color, #db4437);
  }

  @media (prefers-reduced-motion: reduce) {
    .level .bar .fill {
      transition: none;
    }

    /* Motion is off, but charging still has to be visible: the band stands still. */
    .level .bar .fill.charging {
      animation: none;
    }
  }
`;
function ie(i, e, t) {
  return v`
    <div
      class="levels"
      style=${t?.nameWidth ? `--level-name: ${t.nameWidth};` : p}
    >
      ${i.map(
    (s) => v`
          <button
            class="level ${s.alarm ? "low" : ""}"
            style="--ink: ${s.ink};"
            title="${s.name}: ${s.text}${s.flagTitle ? ` — ${s.flagTitle}` : ""}${s.stale ? ` — ${s.stale}` : ""}"
            @click=${(r) => {
      r.stopPropagation(), e(s.entityId);
    }}
          >
            <span class="name">
              <span class="label">${s.name}</span>${s.alarm ? v`<ha-icon
                    icon=${s.alarmIcon ?? "mdi:alert-circle"}
                  ></ha-icon>` : s.icon ? v`<ha-icon class="mark" icon=${s.icon}></ha-icon>` : p}${s.flag ? v`<ha-icon class="flag" icon=${s.flag}></ha-icon>` : p}${s.stale ? v`<ha-icon class="stale" icon="mdi:clock-alert-outline"></ha-icon>` : p}
            </span>
            <span class="bar">
              <span class="track"></span>
              <span
                class="fill ${s.from === void 0 ? "" : "span"} ${s.charging ? "charging" : ""}"
                style="inset-inline-start: ${wt(
      s.from ?? 0
    )}%; width: ${Math.max(
      0,
      wt(s.level) - wt(s.from ?? 0)
    )}%"
              ></span>
            </span>
            <span class="value">${s.text}</span>
          </button>
        `
  )}
    </div>
  `;
}
const Rn = {
  humidity: { good: [30, 60], fair: [25, 70] },
  co2: [1e3, 1400],
  voc: [1e3, 3e3],
  aqi: [51, 101],
  pm25: [15, 35]
};
function Mn(i, e) {
  return i === "humidity" ? 100 : e[i][1] * 1.5;
}
function ms(i) {
  return { ...Rn, ...i ?? {} };
}
function fs(i, e, t) {
  if (e === void 0 || !Number.isFinite(e)) return "unknown";
  if (i === "humidity") {
    const { good: n, fair: o } = t.humidity;
    return e >= n[0] && e <= n[1] ? "good" : e >= o[0] && e <= o[1] ? "fair" : "poor";
  }
  const [s, r] = t[i];
  return e >= r ? "poor" : e >= s ? "fair" : "good";
}
function Ln(i) {
  return i.includes("poor") ? "poor" : i.includes("fair") ? "fair" : i.includes("good") ? "good" : "unknown";
}
const ps = {
  good: "var(--success-color, #4caf50)",
  fair: "var(--warning-color, #ffa600)",
  poor: "var(--error-color, #db4437)",
  unknown: "var(--state-unavailable-color)"
}, Be = ["humidity", "co2", "voc", "aqi", "pm25"];
function gs(i) {
  return Be.filter((e) => i[e]).length;
}
function _s(i, e, t) {
  return Be.filter((s) => e[s]).flatMap((s) => {
    const r = _(i, e[s]);
    if (!r) return [];
    const n = ee(r), o = fs(s, n, t);
    return [
      {
        entityId: r.entityId,
        name: m(i, `level.${s}`),
        text: Bt(i, r) ?? m(i, "value.unknown"),
        ink: ps[o],
        level: n === void 0 ? 0 : Math.max(0, n) / Mn(s, t) * 100,
        alarm: o === "poor",
        alarmIcon: "mdi:alert-circle"
      }
    ];
  });
}
function jn(i, e, t) {
  return Ln(
    Be.filter((s) => e[s]).map(
      (s) => fs(s, ee(_(i, e[s])), t)
    )
  );
}
const Ei = 3;
function ue(i, e, t) {
  if (!i || i.length === 0)
    return typeof e == "string" ? [e] : [...e];
  if (i.length > Ei)
    throw new Error(
      `At most ${Ei} large values are allowed, got ${i.length}`
    );
  const s = i.filter((n) => !t.includes(n));
  if (s.length)
    throw new Error(
      `Unknown roles in big_values: ${s.join(", ")}. Allowed: ${t.join(", ")}`
    );
  const r = i.filter(
    (n, o) => i.indexOf(n) !== o
  );
  if (r.length)
    throw new Error(`Role listed twice: ${r.join(", ")}`);
  return i;
}
function le(i, e) {
  const t = e.map((r) => i.find((n) => n.key === r)).filter((r) => !!r), s = i.filter((r) => !e.includes(r.key));
  return { big: t, rest: s };
}
let Ci = !1;
function Nn(i) {
  Ci || (Ci = !0, console.warn(
    `horos-cards: card ${i} is already registered. The bundle looks to be attached to the dashboard twice — the copy that loaded first is the one running. Check the dashboard resources.`
  ));
}
function Si() {
  const i = document.querySelector("home-assistant");
  return $(i?.hass);
}
function S(i, e, t) {
  if (customElements.get(i)) {
    Nn(i);
    return;
  }
  customElements.define(i, e), window.customCards = window.customCards ?? [], window.customCards.push({
    type: t.type,
    preview: t.preview,
    get name() {
      return typeof t.name == "string" ? t.name : t.name[Si() === "ru" ? "ru" : "en"] ?? t.name.en;
    },
    get description() {
      return typeof t.description == "string" ? t.description : t.description[Si() === "ru" ? "ru" : "en"] ?? t.description.en;
    },
    getEntitySuggestion: t.suggest
  });
}
function T(i, e) {
  customElements.get(i) || customElements.define(i, e);
}
const Qt = 20;
function de(i, e) {
  return i.states[e]?.attributes.device_class;
}
function gt(i, e) {
  return i.entities?.[e]?.hidden === !0;
}
function ye(i, e) {
  const t = i.entities?.[e]?.device_id;
  if (!t || !i.entities) return [e];
  const s = Object.keys(i.entities).filter(
    (r) => r !== e && i.entities?.[r]?.device_id === t && !gt(i, r) && i.states[r] !== void 0
  );
  return [e, ...s.sort()];
}
function W(i, e, t, ...s) {
  return e.find(
    (r) => D(r) === t && s.includes(de(i, r) ?? "")
  );
}
function Ke(i, ...e) {
  return i.find((t) => e.includes(D(t)));
}
function Ge(i, e, t, s, r = Qt, n = () => !0) {
  const o = Object.keys(i.states).filter(
    (a) => a !== e && D(a) === t && s.includes(de(i, a) ?? "") && !gt(i, a) && n(a)
  ).sort();
  return [...n(e) ? [e] : [], ...o].slice(0, r);
}
function Ti(i, e) {
  return i.entities?.[e]?.device_id !== void 0;
}
function ve(i, e) {
  const t = i.entities?.[e];
  if (t)
    return t.area_id ? t.area_id : t.device_id ? i.devices?.[t.device_id]?.area_id : void 0;
}
function Jt(i, e, t, s = Qt) {
  const r = ve(i, e);
  if (!r) return [];
  const n = Object.keys(i.states).filter(
    (l) => l !== e && D(l) === t && !gt(i, l) && ve(i, l) === r
  ).sort();
  return [...D(e) === t ? [e] : [], ...n].slice(0, s);
}
function Dn(i, e, t, s, r = Qt) {
  const n = (u) => s.indexOf(de(i, u) ?? ""), o = Object.keys(i.states).filter(
    (u) => u !== e && D(u) === t && n(u) >= 0 && !gt(i, u) && ve(i, u) !== void 0
  ).sort((u, f) => n(u) - n(f) || u.localeCompare(f)), l = /* @__PURE__ */ new Map(), a = ve(i, e);
  a && l.set(a, e);
  for (const u of o) {
    const f = ve(i, u);
    l.has(f) || l.set(f, u);
  }
  const h = [...l.values()].filter((u) => u !== e);
  return [e, ...h].slice(0, r);
}
function V(i, e, t = {}) {
  const s = { type: i, ...t };
  for (const [r, n] of Object.entries(e))
    n && (s[r] = n);
  return { config: s };
}
function Ye(i) {
  return Object.values(i).filter(Boolean).length;
}
var zn = Object.defineProperty, Fn = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && zn(e, t, r), r;
};
const Ai = [
  "temperature",
  "humidity",
  "illuminance",
  "pm25"
];
function St(i, e) {
  return e?.air_rows ? [{ type: "trend-graph", hours_to_show: 24 }] : [];
}
class vs extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? gs(e) : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(St(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => kl), document.createElement(
      "horos-climate-tile-editor"
    );
  }
  static getStubConfig() {
    return { temperature: "", humidity: "" };
  }
  setConfig(e) {
    if (!e.temperature)
      throw new Error("A temperature entity is required (temperature)");
    this._bigKeys = ue(
      e.big_values,
      "temperature",
      Ai
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Ai.map((u) => ({
      key: u,
      role: _(this.hass, e[u])
    })), s = this.missingRolesWarning([
      ...t.map((u) => u.role),
      ...["co2", "voc", "aqi"].map(
        (u) => _(this.hass, e[u])
      )
    ]);
    if (s) return this.renderWarning(s);
    const { big: r, rest: n } = le(t, this._bigKeys), o = t[0].role, l = ms(e.air_bounds), a = e.air_rows ? _s(this.hass, e, l) : [], c = e.air_rows ? n.filter((u) => !Be.includes(u.key)) : n, h = jn(this.hass, e, l);
    return this.renderTile({
      icon: e.air_rows ? "mdi:home-thermometer" : "mdi:thermometer",
      color: e.air_rows ? ps[h] : F(o?.stateObj),
      primary: Ue(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: Ee(o?.entityId),
      secondary: I([
        G(this.hass, o),
        ...c.map((u) => q(this.hass, u.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(r),
      ownFeatures: St(this.hass, e),
      customFeatures: a.length ? ie(a, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
Fn([
  x()
], vs.prototype, "_config");
S("horos-climate-tile", vs, {
  type: "horos-climate-tile",
  name: { ru: "Климат комнаты", en: "Room climate" },
  description: {
    ru: "Температура, влажность, освещённость и PM2.5 одной комнаты в одной плитке",
    en: "Temperature, humidity, illuminance and PM2.5 of one room in a single tile"
  },
  preview: !0,
  suggest: (i, e) => {
    if (D(e) !== "sensor") return null;
    const t = ye(i, e), s = {
      temperature: W(i, t, "sensor", "temperature"),
      humidity: W(i, t, "sensor", "humidity"),
      illuminance: W(i, t, "sensor", "illuminance"),
      pm25: W(i, t, "sensor", "pm25")
    };
    return !s.temperature || Ye(s) < 2 ? null : V("custom:horos-climate-tile", s);
  }
});
var Hn = Object.defineProperty, Un = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Hn(e, t, r), r;
};
const Oi = ["switch", "power", "energy"];
function Tt(i) {
  return i?.toggle_button ? [{ type: "toggle" }] : [];
}
class bs extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  fixedRows() {
    return this.featureRows(Tt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => El), document.createElement("horos-plug-tile-editor");
  }
  static getStubConfig() {
    return { switch: "", power: "" };
  }
  setConfig(e) {
    if (!e.switch)
      throw new Error("A switch is required (switch)");
    this._bigKeys = ue(e.big_values, "power", Oi), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Oi.map((a) => ({
      key: a,
      role: _(this.hass, e[a])
    })), s = this.missingRolesWarning(t.map((a) => a.role));
    if (s) return this.renderWarning(s);
    const { big: r, rest: n } = le(t, this._bigKeys), o = t[0].role, l = o.entityId;
    return this.renderTile({
      icon: "mdi:power-plug",
      color: F(o.stateObj),
      primary: Ue(e.name, o),
      secondary: I([
        // One of the two returns a piece: an available switch gives its state,
        // an unavailable one its unavailability status.
        G(this.hass, o),
        // The switch is the card's main entity, so its state can be shown
        // through state_content, just like on the stock tile.
        ...n.map(
          (a) => a.key === "switch" ? this.mainStateSegment(a.role) : q(this.hass, a.role)
        )
      ]),
      mainEntityId: l,
      imageUrl: this.entityImage(o.stateObj),
      defaultIconAction: Ee(l),
      values: this.bigValues(r),
      ownFeatures: Tt(e)
    });
  }
}
Un([
  x()
], bs.prototype, "_config");
S("horos-plug-tile", bs, {
  type: "horos-plug-tile",
  name: { ru: "Розетка", en: "Smart plug" },
  description: {
    ru: "Выключатель, текущая мощность и накопленная энергия в одной плитке",
    en: "Switch, current power draw and accumulated energy in a single tile"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ye(i, e), s = {
      switch: Ke(t, "switch"),
      power: W(i, t, "sensor", "power"),
      energy: W(i, t, "sensor", "energy")
    };
    return !s.switch || Ye(s) < 2 ? null : V("custom:horos-plug-tile", s);
  }
});
const lt = 30, ct = 70;
function ys(i, e, t) {
  return i === void 0 ? "unknown" : i < e ? "dry" : i > t ? "wet" : "ok";
}
const At = {
  dry: "var(--warning-color)",
  ok: "var(--success-color)",
  wet: "var(--info-color)",
  unknown: "var(--state-inactive-color)"
}, qn = {
  dry: "mdi:water-off",
  ok: "mdi:sprout",
  wet: "mdi:water-alert",
  unknown: "mdi:sprout"
};
var Vn = Object.defineProperty, Wn = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Vn(e, t, r), r;
};
const Pi = ["moisture", "temperature", "battery"];
function Ot(i, e) {
  const t = i?.states[e?.moisture ?? ""]?.state, s = Number(t);
  return t === void 0 || !Number.isFinite(s) ? [] : [{ type: "bar-gauge", min: 0, max: 100 }];
}
class ws extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["moisture"];
  }
  fixedRows() {
    return this.featureRows(Ot(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Cl), document.createElement(
      "horos-plant-tile-editor"
    );
  }
  static getStubConfig() {
    return { moisture: "" };
  }
  setConfig(e) {
    if (!e.moisture)
      throw new Error("A soil moisture entity is required (moisture)");
    const t = e.dry_below ?? lt, s = e.wet_above ?? ct;
    if (t >= s)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = ue(e.big_values, "moisture", Pi), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Pi.map((c) => ({
      key: c,
      role: _(this.hass, e[c])
    })), s = this.missingRolesWarning(t.map((c) => c.role));
    if (s) return this.renderWarning(s);
    const { big: r, rest: n } = le(t, this._bigKeys), o = t[0].role, l = ee(o), a = ys(
      l,
      e.dry_below ?? lt,
      e.wet_above ?? ct
    );
    return this.renderTile({
      icon: qn[a],
      color: At[a],
      primary: Ue(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: Ee(o?.entityId),
      secondary: I([
        G(this.hass, o),
        ...n.map((c) => q(this.hass, c.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(r),
      ownFeatures: Ot(this.hass, e)
    });
  }
}
Wn([
  x()
], ws.prototype, "_config");
S("horos-plant-tile", ws, {
  type: "horos-plant-tile",
  name: { ru: "Растение", en: "Plant" },
  description: {
    ru: "Влажность почвы с порогами сухости, температура почвы и заряд датчика",
    en: "Soil moisture with dryness thresholds, soil temperature and sensor battery"
  },
  preview: !0,
  suggest: (i, e) => {
    if (D(e) !== "sensor" || de(i, e) !== "moisture")
      return null;
    const t = ye(i, e);
    return V("custom:horos-plant-tile", {
      moisture: e,
      temperature: W(i, t, "sensor", "temperature"),
      battery: W(i, t, "sensor", "battery")
    });
  }
});
var Bn = Object.defineProperty, _t = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Bn(e, t, r), r;
};
class Xe extends _e {
  constructor() {
    super(...arguments), this._children = [];
  }
  static {
    this.styles = ce`
    :host {
      display: block;
    }

    .heading {
      margin-bottom: var(--ha-space-2, 8px);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--columns, 2), minmax(0, 1fr));
      gap: var(--ha-space-2, 8px);
    }

    .warning {
      display: block;
      padding: var(--ha-space-3, 12px);
      color: var(--warning-color, #ffa600);
      font-size: var(--ha-font-size-m, 14px);
    }
  `;
  }
  getCardSize() {
    return 1 + Math.ceil(this._children.length / Math.max(1, this.columns()));
  }
  /** Height depends on the number of cells, so HA computes it itself. */
  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6, min_rows: 2 };
  }
  /** A subclass must call this at the end of setConfig. */
  rebuild() {
    this._build();
  }
  async _build() {
    const e = window.loadCardHelpers;
    if (!e) {
      this._error = "Home Assistant did not provide card helpers";
      return;
    }
    const t = await e(), s = this.headingConfig();
    this._heading = s ? t.createCardElement(s) : void 0, this._children = this.childConfigs().map(
      (r) => t.createCardElement(r)
    ), this._passHass();
  }
  _passHass() {
    if (this.hass) {
      this._heading && (this._heading.hass = this.hass);
      for (const e of this._children) e.hass = this.hass;
    }
  }
  updated(e) {
    super.updated(e), e.has("hass") && this._passHass();
  }
  render() {
    return this._error ? v`<ha-card><div class="warning">${this._error}</div></ha-card>` : this._children.length ? v`
      ${this._heading ? v`<div class="heading">${this._heading}</div>` : p}
      <div class="grid" style="--columns: ${this.columns()}">
        ${this._children}
      </div>
    ` : p;
  }
}
_t([
  re({ attribute: !1 })
], Xe.prototype, "hass");
_t([
  x()
], Xe.prototype, "_heading");
_t([
  x()
], Xe.prototype, "_children");
_t([
  x()
], Xe.prototype, "_error");
function xs(i) {
  if (!i) return;
  const e = i.split(":").pop();
  return e ? e.trim() : i;
}
function Kn(i) {
  return typeof i == "string" ? { entity: i } : i;
}
var Gn = Object.defineProperty, Yn = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Gn(e, t, r), r;
};
const Xn = 3;
class $s extends Xe {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Sl), document.createElement(
      "horos-buttons-tile-editor"
    );
  }
  static getStubConfig() {
    return { buttons: [] };
  }
  setConfig(e) {
    if (!e.buttons?.length)
      throw new Error("At least one button is required (buttons)");
    this._config = e, this.rebuild();
  }
  columns() {
    return this._config?.columns ?? Xn;
  }
  headingConfig() {
    if (this._config?.name)
      return {
        type: "heading",
        heading: this._config.name,
        heading_style: "subtitle",
        icon: this._config.icon,
        tap_action: { action: "none" }
      };
  }
  childConfigs() {
    return this._config ? this._config.buttons.map((e) => {
      const t = Kn(e), s = this.hass?.states[t.entity];
      return {
        type: "button",
        entity: t.entity,
        name: t.name ?? xs(s?.attributes.friendly_name),
        icon: t.icon,
        show_state: !1,
        tap_action: { action: "toggle" }
      };
    }) : [];
  }
}
Yn([
  x()
], $s.prototype, "_config");
S("horos-buttons-tile", $s, {
  type: "horos-buttons-tile",
  name: { ru: "Кнопки скриптов", en: "Script buttons" },
  description: {
    ru: "Сетка кнопок, вызывающих скрипты, под общим заголовком",
    en: "A grid of buttons running scripts, under one heading"
  },
  preview: !0
});
function be(i, e) {
  if (i) {
    if (e && i.toLowerCase().startsWith(e.toLowerCase())) {
      const t = i.slice(e.length).trim();
      if (t) return t;
    }
    return i;
  }
}
function ks(i) {
  return i ? i.replace(/[\s—-]*(battery(\s+level)?|заряд)\s*$/i, "").trim() || i : void 0;
}
function Qn(i) {
  return i ? i.replace(
    /[\s—-]*(soil\s+)?(moisture|влажность(\s+почвы)?)\s*$/i,
    ""
  ).trim() || i : void 0;
}
function Oe(i) {
  return i === void 0 ? "var(--state-unavailable-color)" : i >= 70 ? "var(--state-sensor-battery-high-color, #4caf50)" : i >= 30 ? "var(--state-sensor-battery-medium-color, #ffa600)" : "var(--state-sensor-battery-low-color, #db4437)";
}
const Jn = Oe;
function Zn(i) {
  return i === void 0 ? "var(--state-unavailable-color)" : i >= 90 ? "var(--error-color, #db4437)" : i >= 80 ? "var(--warning-color, #ffa600)" : "var(--state-icon-color)";
}
function z(i) {
  return typeof i == "string" ? { entity: i } : i;
}
const eo = [
  [/black|pgbk|_bk(_|$)/i, "black"],
  [/cyan/i, "cyan"],
  [/magenta/i, "purple"],
  [/yellow/i, "yellow"],
  // MC is the maintenance tank, not ink. It gets its own shade, otherwise it is
  // indistinguishable from black: that one is painted in the text colour and
  [/_mc(_|$)|maintenance/i, "blue-grey"]
];
function to(i) {
  return eo.find(([t]) => t.test(i))?.[1];
}
function io(i) {
  return i === "black" ? "var(--primary-text-color)" : /^(#|rgb|hsl|var\()/.test(i) ? i : `var(--${i}-color, var(--state-icon-color))`;
}
const so = be, Ii = (i, e) => typeof i == "number" && Number.isFinite(i) ? i : e;
function ro(i, e, t) {
  const s = Number(i);
  if (!Number.isFinite(s)) return;
  const r = Ii(e.marker_high_level, 100), n = Ii(e.marker_low_level, 0), o = String(e.marker_type ?? "").includes("waste"), l = r > 0 ? Math.max(0, Math.min(100, s / r * 100)) : 0, a = o ? s >= r : s <= (t ?? n);
  return { fill: l, alarm: a, fills: o };
}
var no = Object.defineProperty, oo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && no(e, t, r), r;
};
class Es extends E {
  static {
    this.styles = [Y, te];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      (this._config?.cartridges.length ?? 0) + (this._config?.sensors?.length ?? 0)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Tl), document.createElement(
      "horos-printer-tile-editor"
    );
  }
  static getStubConfig() {
    return { cartridges: [] };
  }
  setConfig(e) {
    if (!e.cartridges?.length)
      throw new Error("At least one cartridge is required (cartridges)");
    this.base = e, this._config = e;
  }
  get _printerName() {
    return this._config?.name ? this._config.name : (this._config?.status ? this.hass?.states[this._config.status] : void 0)?.attributes.friendly_name;
  }
  _tanks() {
    if (!this._config || !this.hass) return [];
    const e = this._printerName;
    return this._config.cartridges.map((t) => z(t)).map((t) => {
      const s = this.hass.states[t.entity];
      return {
        entityId: t.entity,
        name: t.name ?? so(s?.attributes.friendly_name, e),
        ink: io(
          t.color ?? to(t.entity) ?? "grey"
        ),
        marker: s ? ro(
          s.state,
          s.attributes,
          this._config.low_below
        ) : void 0,
        text: s ? this.hass.formatEntityState(s) : "—"
      };
    });
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._tanks(), t = e.filter((a) => !a.marker && a.text === "—");
    if (t.length)
      return this.renderWarning(
        `Entities not found: ${t.map((a) => a.entityId).join(", ")}`
      );
    const r = e.filter((a) => a.marker && !a.marker.fills).reduce(
      (a, c) => !a || c.marker.fill < a.marker.fill ? c : a,
      void 0
    ), n = this._config.status ? _(this.hass, this._config.status) : void 0, o = (this._config.sensors ?? []).map((a) => z(a)).map((a) => _(this.hass, a.entity)), l = n?.stateObj;
    return this.renderTile({
      icon: "mdi:printer",
      color: l ? F(l) : "var(--state-icon-color)",
      primary: this._printerName ?? m(this.hass, "printer.title"),
      secondary: I([
        q(this.hass, n),
        ...o.map((a) => q(this.hass, a))
      ]),
      mainEntityId: this._config.status ?? r?.entityId,
      values: r ? [
        {
          value: String(Math.round(r.marker.fill)),
          unit: "%",
          entityId: r.entityId,
          icon: "mdi:water"
        }
      ] : [],
      customFeatures: ie(
        e.map((a) => ({
          entityId: a.entityId,
          name: a.name ?? a.entityId,
          text: a.text,
          ink: a.ink,
          level: a.marker?.fill ?? 0,
          alarm: a.marker?.alarm ?? !1,
          alarmIcon: a.marker?.fills ? "mdi:delete-alert" : void 0
        })),
        (a) => this.fireMoreInfo(a)
      )
    });
  }
}
oo([
  x()
], Es.prototype, "_config");
S("horos-printer-tile", Es, {
  type: "horos-printer-tile",
  name: { ru: "Принтер", en: "Printer" },
  description: {
    ru: "Уровни чернил и состояние принтера в одной плитке",
    en: "Ink levels and printer status in a single tile"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ye(i, e), s = t.filter(
      (n) => i.states[n]?.attributes.marker_type !== void 0
    );
    if (!s.length) return null;
    const r = t.find(
      (n) => D(n) === "sensor" && !s.includes(n) && Number.isNaN(Number(i.states[n]?.state))
    );
    return V(
      "custom:horos-printer-tile",
      { status: r },
      { cartridges: s }
    );
  }
});
var ao = Object.defineProperty, lo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && ao(e, t, r), r;
};
const co = 20;
class Cs extends E {
  static {
    this.styles = [Y, te];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(this._config?.consumables?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Al), document.createElement(
      "horos-vacuum-tile-editor"
    );
  }
  static getStubConfig() {
    return { vacuum: "" };
  }
  setConfig(e) {
    if (!e.vacuum)
      throw new Error("A vacuum is required (vacuum)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.vacuum), s = _(this.hass, e.battery), r = (e.sensors ?? []).map((c) => z(c)).map((c) => _(this.hass, c.entity)), n = this.missingRolesWarning([t, s, ...r]);
    if (n) return this.renderWarning(n);
    const o = t?.stateObj?.attributes.friendly_name, l = e.low_below ?? co, a = (e.consumables ?? []).map((c) => z(c)).map((c) => {
      const h = _(this.hass, c.entity), u = ee(h) ?? 0, f = c.name ?? be(h?.stateObj?.attributes.friendly_name, o);
      return {
        entityId: c.entity,
        name: f ?? c.entity,
        text: `${u}%`,
        // Painting them in the tile colour is wrong: a docked vacuum's colour
        // is the inactive one and every bar comes out the same grey. We paint
        // by level — a consumable asks the same question a battery does.
        ink: c.color ?? Oe(u),
        level: u,
        alarm: u < l
      };
    });
    return this.renderTile({
      icon: "mdi:robot-vacuum",
      color: F(t?.stateObj),
      primary: e.name ?? o ?? m(this.hass, "vacuum.title"),
      mainEntityId: t?.entityId,
      secondary: I([
        G(this.hass, t),
        this.mainStateSegment(t),
        ...r.map((c) => q(this.hass, c))
      ]),
      values: s ? this.bigValues([{ key: "battery", role: s }]) : [],
      customFeatures: a.length ? ie(a, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
lo([
  x()
], Cs.prototype, "_config");
S("horos-vacuum-tile", Cs, {
  type: "horos-vacuum-tile",
  name: { ru: "Пылесос", en: "Vacuum" },
  description: {
    ru: "Состояние робота, заряд и ресурс расходников в одной плитке",
    en: "Robot status, battery and consumable life in a single tile"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ye(i, e), s = Ke(t, "vacuum"), r = W(i, t, "sensor", "battery");
    return !s || !r ? null : V("custom:horos-vacuum-tile", { vacuum: s, battery: r });
  }
});
var uo = Object.defineProperty, ho = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && uo(e, t, r), r;
};
const mo = 30;
class Ss extends E {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ol), document.createElement(
      "horos-batteries-tile-editor"
    );
  }
  static getStubConfig() {
    return { batteries: [] };
  }
  setConfig(e) {
    if (!e.batteries?.length)
      throw new Error("At least one battery is required (batteries)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = e.low_below ?? mo, s = [], r = [];
    for (const l of e.batteries) {
      const a = z(l), c = _(this.hass, a.entity);
      if (c?.missing) {
        r.push(a.entity);
        continue;
      }
      const h = ee(c);
      h !== void 0 && s.push({
        entityId: a.entity,
        name: a.name ?? ks(c?.stateObj?.attributes.friendly_name) ?? a.entity,
        level: h
      });
    }
    const n = s.filter((l) => l.level < t).sort((l, a) => l.level - a.level), o = n[0];
    return this.renderTile({
      icon: o ? "mdi:battery-alert-variant-outline" : "mdi:battery",
      color: Jn(o?.level),
      primary: e.name ?? m(this.hass, "batteries.title"),
      mainEntityId: o?.entityId,
      secondary: I([
        ...n.length ? n.map((l) => ({
          text: `${l.name} ${l.level}%`,
          entityId: l.entityId
        })) : [
          {
            text: m(this.hass, "batteries.allFull", {
              count: s.length
            })
          }
        ],
        // A row that disappeared is dropped, but staying silent about it is not
        // an option: a list card must not go dark over one renamed entity, and
        // must not pretend the entity was never there.
        ...r.length ? [{ text: m(this.hass, "list.missing", { count: r.length }) }] : []
      ]),
      values: o ? [
        {
          value: String(o.level),
          unit: "%",
          entityId: o.entityId,
          icon: "mdi:battery"
        }
      ] : []
    });
  }
}
ho([
  x()
], Ss.prototype, "_config");
S("horos-batteries-tile", Ss, {
  type: "horos-batteries-tile",
  name: { ru: "Батарейки", en: "Batteries" },
  description: {
    ru: "Только садящиеся батарейки, от самой пустой",
    en: "Only the batteries that are running down, emptiest first"
  },
  preview: !0,
  suggest: (i, e) => D(e) !== "sensor" || de(i, e) !== "battery" ? null : V(
    "custom:horos-batteries-tile",
    {},
    { batteries: Ge(i, e, "sensor", ["battery"]) }
  )
});
var fo = Object.defineProperty, po = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && fo(e, t, r), r;
};
class Ts extends E {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Pl), document.createElement(
      "horos-safety-tile-editor"
    );
  }
  static getStubConfig() {
    return { sensors: [] };
  }
  setConfig(e) {
    if (!e.sensors?.length)
      throw new Error("At least one sensor is required (sensors)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = [], s = [], r = [];
    let n = 0;
    for (const a of e.sensors) {
      const c = z(a), h = _(this.hass, c.entity);
      if (h?.missing) {
        r.push(c.entity);
        continue;
      }
      n += 1;
      const u = c.name ?? h?.stateObj?.attributes.friendly_name ?? c.entity;
      h?.unavailable ? s.push({ text: m(this.hass, "safety.offline", { name: u }), entityId: c.entity }) : h?.stateObj?.state === "on" && t.push({ text: u, entityId: c.entity });
    }
    const o = t.length > 0, l = [...t, ...s];
    return this.renderTile({
      icon: o ? "mdi:shield-alert" : s.length ? "mdi:shield-off-outline" : "mdi:shield-check",
      color: o ? "var(--error-color, #db4437)" : s.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? m(this.hass, "safety.title"),
      mainEntityId: l[0]?.entityId,
      secondary: I([
        ...l.length ? l : [{ text: m(this.hass, "safety.calm", { count: n }) }],
        ...r.length ? [{ text: m(this.hass, "list.missing", { count: r.length }) }] : []
      ])
    });
  }
}
po([
  x()
], Ts.prototype, "_config");
S("horos-safety-tile", Ts, {
  type: "horos-safety-tile",
  name: { ru: "Безопасность", en: "Safety" },
  description: {
    ru: "Протечка, дым, газ — и датчики, потерявшие связь",
    en: "Leak, smoke, gas — and sensors that lost connection"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ["moisture", "gas", "smoke", "carbon_monoxide", "safety"];
    return D(e) !== "binary_sensor" || !t.includes(de(i, e) ?? "") ? null : V(
      "custom:horos-safety-tile",
      {},
      { sensors: Ge(i, e, "binary_sensor", t) }
    );
  }
});
var go = Object.defineProperty, _o = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && go(e, t, r), r;
};
const Ri = ["disk", "download", "upload"];
class As extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["disk"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Il), document.createElement(
      "horos-server-tile-editor"
    );
  }
  static getStubConfig() {
    return { disk: "" };
  }
  setConfig(e) {
    if (!e.disk && !e.download && !e.status)
      throw new Error(
        "At least one entity is required: status, disk or download"
      );
    this._bigKeys = ue(e.big_values, "disk", Ri), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Ri.map((a) => ({
      key: a,
      role: _(this.hass, e[a])
    })), s = _(this.hass, e.status), r = (e.services ?? []).map((a) => z(a)).map((a) => _(this.hass, a.entity)), n = this.missingRolesWarning([
      s,
      ...t.map((a) => a.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = le(t, this._bigKeys);
    return this.renderTile({
      icon: "mdi:server",
      color: s ? F(s.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? m(this.hass, "server.title"),
      mainEntityId: s?.entityId ?? t[0].role?.entityId,
      secondary: I([
        G(this.hass, s),
        this.mainStateSegment(s),
        ...l.map((a) => {
          const c = q(this.hass, a.role);
          if (!c) return;
          const h = a.key === "download" ? "↓ " : a.key === "upload" ? "↑ " : "";
          return { ...c, text: h + c.text };
        }),
        ...r.map((a) => q(this.hass, a))
      ]),
      values: this.bigValues(o)
    });
  }
}
_o([
  x()
], As.prototype, "_config");
S("horos-server-tile", As, {
  type: "horos-server-tile",
  name: { ru: "Домашний сервер", en: "Home server" },
  description: {
    ru: "Диск, скорости и состояние сервисов в одной плитке",
    en: "Disk, speeds and service status in a single tile"
  },
  preview: !0
});
var vo = Object.defineProperty, bo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && vo(e, t, r), r;
};
class Os extends E {
  static {
    this.styles = [
      Y,
      te,
      ce`
      span[slot="secondary"] {
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      span[slot="secondary"] .clickable {
        text-align: left;
        display: inline;
      }
    `
    ];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(this._config?.devices?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Rl), document.createElement(
      "horos-person-tile-editor"
    );
  }
  static getStubConfig() {
    return { person: "" };
  }
  setConfig(e) {
    if (!e.person)
      throw new Error("A person is required (person)");
    this.base = { show_entity_picture: !0, ...e }, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.person), s = _(this.hass, e.battery), r = _(this.hass, e.location), n = this.missingRolesWarning([t, s, r]);
    if (n) return this.renderWarning(n);
    const o = (e.devices ?? []).map((l) => z(l)).map((l) => {
      const a = _(this.hass, l.entity), c = ee(a), h = l.name ?? ks(
        be(
          a?.stateObj?.attributes.friendly_name,
          e.name
        )
      ) ?? l.entity, u = ln(_(this.hass, l.charging));
      return {
        entityId: l.entity,
        name: h,
        text: c === void 0 ? m(this.hass, "value.unknown") : `${c}%`,
        ink: l.color ?? Oe(c),
        level: c ?? 0,
        alarm: c !== void 0 && c < 20,
        alarmIcon: "mdi:battery-alert-variant-outline",
        charging: u,
        // A sensor that keeps its last reading says so with `stale` and
        // `last_heard` (nearby_bluetooth's AirPods).
        stale: a?.stateObj?.attributes.stale === !0 ? `last heard ${a.stateObj.attributes.last_heard ? new Date(String(a.stateObj.attributes.last_heard)).toLocaleString() : "a while ago"}` : void 0
      };
    });
    return this.renderTile({
      icon: "mdi:account",
      color: F(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? m(this.hass, "person.title"),
      mainEntityId: t?.entityId,
      imageUrl: this.entityImage(t?.stateObj),
      secondary: I([
        G(this.hass, t),
        this.mainStateSegment(t),
        q(this.hass, r)
      ]),
      values: s ? this.bigValues([{ key: "battery", role: s }]) : [],
      customFeatures: o.length ? ie(o, (l) => this.fireMoreInfo(l)) : void 0
    });
  }
}
bo([
  x()
], Os.prototype, "_config");
S("horos-person-tile", Os, {
  type: "horos-person-tile",
  name: { ru: "Человек", en: "Person" },
  description: {
    ru: "Дома ли он, где именно и заряд его устройств",
    en: "Whether they are home, where exactly, and their devices' battery"
  },
  preview: !0,
  suggest: (i, e) => {
    if (D(e) !== "person") return null;
    const s = (i.states[e]?.attributes.device_trackers ?? []).map((r) => W(i, ye(i, r), "sensor", "battery")).find(Boolean);
    return s ? V("custom:horos-person-tile", {
      person: e,
      battery: s
    }) : null;
  }
});
function xt(i, e, t) {
  if (!i || !e?.length) return;
  let s, r;
  for (const n of e) {
    const o = _(i, n), l = ee(o);
    l !== void 0 && (r === void 0 || (t === "max" ? l > r : l < r)) && (s = o, r = l);
  }
  return s ?? _(i, e[0]);
}
var yo = Object.defineProperty, wo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && yo(e, t, r), r;
};
const xo = [
  "temperature",
  "cpu",
  "memory",
  "gpu",
  "disk"
];
class Ps extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [Y, te];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    const e = this._config?.disk_rows ? this._config.disks?.length ?? 0 : 1;
    return this.levelRows(3 + Math.max(e, 1)) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ml), document.createElement(
      "horos-computer-tile-editor"
    );
  }
  static getStubConfig() {
    return { cpu: "" };
  }
  setConfig(e) {
    if (!e.cpu && !e.memory && !e.temperatures?.length && !e.disks?.length && !e.disks_free?.length)
      throw new Error(
        "At least one entity is required: cpu, memory, temperatures or disks"
      );
    this._bigKeys = ue(
      e.big_values,
      "temperature",
      xo
    ), this.base = e, this._config = e;
  }
  /** The card's roles: the lists are already reduced to their extreme sensor. */
  _roles() {
    const e = this._config;
    return [
      {
        key: "temperature",
        role: xt(this.hass, e.temperatures, "max")
      },
      { key: "cpu", role: _(this.hass, e.cpu) },
      { key: "memory", role: _(this.hass, e.memory) },
      { key: "gpu", role: _(this.hass, e.gpu) },
      { key: "disk", role: xt(this.hass, e.disks, "max") }
    ];
  }
  /** The partition with the least free space left. */
  _freeDisk() {
    return xt(this.hass, this._config?.disks_free, "min");
  }
  /**
   * With disk_rows: a bar for every listed disk, named after its entity. A full
   * disk shows in the bar's colour; a red glyph after the name is kept for the
   * drive itself reporting trouble, from the entity's `problem` attribute (with
   * `health` saying what), so a failing disk shows even when it's nearly empty.
   */
  _diskRows() {
    const e = this._config;
    return (e.disks ?? []).map((t) => {
      const s = _(this.hass, t), r = s?.stateObj?.attributes ?? {}, n = be(r.friendly_name, e.name) ?? m(this.hass, "level.disk"), o = this._levelRow(n, s);
      if (!o) return;
      const l = r.problem === !0 || r.problem === "true";
      return {
        ...o,
        alarm: !1,
        flag: l ? "mdi:alert-circle" : void 0,
        flagTitle: l && String(r.health ?? "") || void 0
      };
    });
  }
  /** The icon's colour from the load, for color_by_load. */
  _loadTint(e, t) {
    const s = this._config, r = ["off", "not reporting", "unavailable", "unknown", "not_home"], n = e?.stateObj?.state?.toLowerCase();
    if (e && (e.unavailable || e.missing || n && r.includes(n)))
      return "var(--state-unavailable-color)";
    const o = [t[1].role, t[3].role].map((a) => ee(a)).filter((a) => a !== void 0);
    if (!o.length) return "var(--state-unavailable-color)";
    const l = Math.max(...o);
    return l >= (s.load_high ?? 75) ? "var(--error-color, #db4437)" : l >= (s.load_medium ?? 30) ? "var(--warning-color, #ffa600)" : "var(--success-color, #4caf50)";
  }
  _levelRow(e, t) {
    if (!t) return;
    const s = ee(t);
    return {
      entityId: t.entityId,
      name: e,
      text: s === void 0 ? m(this.hass, "value.unknown") : `${Math.round(s)}%`,
      ink: Zn(s),
      level: s ?? 0,
      alarm: s !== void 0 && s >= 90,
      alarmIcon: "mdi:alert-circle"
    };
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = this._roles(), s = _(this.hass, e.status), r = (e.sensors ?? []).map((u) => z(u)).map((u) => _(this.hass, u.entity)), n = this.missingRolesWarning([
      s,
      ...t.map((u) => u.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((u) => z(u)).map((u) => ({ alert: u, role: _(this.hass, u.entity) })).filter(({ role: u }) => u?.stateObj?.state === "on").map(({ alert: u, role: f }) => ({
      text: u.name ?? be(
        f?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? u.entity,
      entityId: u.entity
    })), { big: l } = le(t, this._bigKeys), a = this._freeDisk(), c = ee(a), h = [
      this._levelRow(m(this.hass, "level.cpu"), t[1].role),
      this._levelRow(m(this.hass, "level.memory"), t[2].role),
      this._levelRow(m(this.hass, "level.gpu"), t[3].role),
      ...e.disk_rows ? this._diskRows() : [this._levelRow(m(this.hass, "level.disk"), t[4].role)],
      // Free space is a resource that runs out, so both the colour and the alarm
      // here behave like a battery's, not like load's.
      a ? {
        entityId: a.entityId,
        name: m(this.hass, "level.diskFree"),
        text: c === void 0 ? m(this.hass, "value.unknown") : `${Math.round(c)}%`,
        ink: Oe(c),
        level: c ?? 0,
        alarm: c !== void 0 && c < 10,
        alarmIcon: "mdi:harddisk"
      } : void 0
    ].filter((u) => !!u);
    return this.renderTile({
      icon: "mdi:desktop-tower-monitor",
      color: e.color_by_load ? this._loadTint(s, t) : s ? F(s.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? m(this.hass, "computer.title"),
      mainEntityId: s?.entityId ?? t[0].role?.entityId ?? a?.entityId,
      secondary: I([
        G(this.hass, s),
        ...o,
        ...r.map((u) => q(this.hass, u)),
        // Load and disks are already shown as bars with their own labels.
        ...this._bigKeys.includes("temperature") ? [] : [q(this.hass, t[0].role)]
      ]),
      values: this.bigValues(l),
      customFeatures: h.length ? ie(h, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
wo([
  x()
], Ps.prototype, "_config");
S("horos-computer-tile", Ps, {
  type: "horos-computer-tile",
  name: { ru: "Компьютер", en: "Computer" },
  description: {
    ru: "Самая горячая точка, загрузка и диски в одной плитке",
    en: "Hottest spot, load and disks in a single tile"
  },
  preview: !0
});
var $o = Object.defineProperty, ko = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && $o(e, t, r), r;
};
const Mi = ["pm25", "humidity", "temperature", "power"];
class Is extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["pm25"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ll), document.createElement("horos-air-tile-editor");
  }
  static getStubConfig() {
    return { appliance: "" };
  }
  setConfig(e) {
    if (!e.appliance)
      throw new Error("An appliance is required (appliance)");
    this._bigKeys = ue(e.big_values, "pm25", Mi), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.appliance), s = Mi.map((c) => ({
      key: c,
      role: _(this.hass, e[c])
    })), r = (e.sensors ?? []).map((c) => z(c)).map((c) => _(this.hass, c.entity)), n = this.missingRolesWarning([
      t,
      ...s.map((c) => c.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((c) => z(c)).map((c) => ({ alert: c, role: _(this.hass, c.entity) })).filter(({ role: c }) => c?.stateObj?.state === "on").map(({ alert: c, role: h }) => ({
      text: c.name ?? be(
        h?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? c.entity,
      entityId: c.entity
    })), { big: l, rest: a } = le(s, this._bigKeys);
    return this.renderTile({
      icon: e.humidity ? "mdi:air-humidifier" : "mdi:air-filter",
      color: F(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? m(this.hass, "air.title"),
      mainEntityId: t?.entityId,
      secondary: I([
        G(this.hass, t),
        ...o,
        this.mainStateSegment(t),
        ...r.map((c) => q(this.hass, c)),
        ...a.map((c) => q(this.hass, c.role))
      ]),
      values: this.bigValues(l)
    });
  }
}
ko([
  x()
], Is.prototype, "_config");
S("horos-air-tile", Is, {
  type: "horos-air-tile",
  name: { ru: "Воздух", en: "Air" },
  description: {
    ru: "Очиститель, рекуператор, увлажнитель — прибор и что с воздухом",
    en: "Purifier, recuperator, humidifier — the appliance and the air"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ye(i, e), s = {
      appliance: Ke(t, "fan", "humidifier"),
      pm25: W(i, t, "sensor", "pm25"),
      humidity: W(i, t, "sensor", "humidity"),
      temperature: W(i, t, "sensor", "temperature"),
      power: W(i, t, "sensor", "power")
    };
    return !s.appliance || Ye(s) < 2 ? null : V("custom:horos-air-tile", s);
  }
});
var Eo = Object.defineProperty, Co = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Eo(e, t, r), r;
};
const Li = ["illuminance", "battery"], So = 1, To = 2, Rs = 4;
function Pt(i, e) {
  if (!e || e.controls === !1) return [];
  const t = Number(
    i?.states[e.cover]?.attributes.supported_features ?? 0
  ), s = [];
  return (t & Rs) !== 0 && s.push({ type: "cover-position" }), (t & (So | To)) !== 0 && s.push({ type: "cover-open-close" }), s;
}
class Ms extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["illuminance"];
  }
  static {
    this.styles = [Y, te];
  }
  /** One row for our own bar, plus whatever controls sit under it. */
  contentRows() {
    return this.levelRows(1) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(Pt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => jl), document.createElement(
      "horos-cover-tile-editor"
    );
  }
  static getStubConfig() {
    return { cover: "" };
  }
  setConfig(e) {
    if (!e.cover)
      throw new Error("A cover is required (cover)");
    this._bigKeys = ue(e.big_values, "illuminance", Li), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.cover), s = _(this.hass, e.position), r = Li.map((d) => ({
      key: d,
      role: _(this.hass, e[d])
    })), n = this.missingRolesWarning([
      t,
      s,
      ...r.map((d) => d.role)
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = le(r, this._bigKeys), c = (Number(
      t?.stateObj?.attributes.supported_features ?? 0
    ) & Rs) !== 0, h = Pt(this.hass, e), u = ee(s), f = s && !c ? [
      {
        entityId: s.entityId,
        name: m(this.hass, "level.open"),
        text: u === void 0 ? m(this.hass, "value.unknown") : `${Math.round(u)}%`,
        ink: Oe(u),
        level: u ?? 0
      }
    ] : [];
    return this.renderTile({
      icon: "mdi:curtains",
      color: F(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? m(this.hass, "cover.title"),
      mainEntityId: t?.entityId,
      secondary: I([
        G(this.hass, t),
        this.mainStateSegment(t),
        ...l.map((d) => q(this.hass, d.role))
      ]),
      values: this.bigValues(o),
      ownFeatures: h,
      customFeatures: f.length ? ie(f, (d) => this.fireMoreInfo(d)) : void 0
    });
  }
}
Co([
  x()
], Ms.prototype, "_config");
S("horos-cover-tile", Ms, {
  type: "horos-cover-tile",
  name: { ru: "Шторы", en: "Curtains" },
  description: {
    ru: "Насколько открыты, светло ли снаружи и сколько заряда",
    en: "How far open, how bright outside, and battery"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ye(i, e), s = {
      cover: Ke(t, "cover"),
      illuminance: W(i, t, "sensor", "illuminance"),
      battery: W(i, t, "sensor", "battery")
    };
    return !s.cover || Ye(s) < 2 ? null : V("custom:horos-cover-tile", s);
  }
});
const Ao = [
  "update",
  "select",
  "text",
  "button",
  "number",
  "event",
  "notify"
];
function Oo(i, e = {}) {
  if (!i) return [];
  const t = new Set(e.ignore ?? []), s = new Set(
    e.ignoreDomains ?? Ao
  ), r = /* @__PURE__ */ new Map();
  for (const [n, o] of Object.entries(i.states)) {
    if (!o || o.state !== "unavailable" || t.has(n) || s.has(n.split(".")[0])) continue;
    const l = i.entities?.[n];
    if (l?.hidden) continue;
    const a = l?.device_id ? i.devices?.[l.device_id] : void 0, c = a?.name_by_user ?? a?.name ?? o.attributes.friendly_name ?? n, h = l?.device_id ?? n, u = r.get(h);
    u ? u.count += 1 : r.set(h, { name: c, count: 1, entityId: n });
  }
  return [...r.values()].sort(
    (n, o) => o.count - n.count || n.name.localeCompare(o.name)
  );
}
var Po = Object.defineProperty, Io = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Po(e, t, r), r;
};
const Ro = 4;
class Ls extends E {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Nl), document.createElement(
      "horos-offline-tile-editor"
    );
  }
  static getStubConfig() {
    return {};
  }
  setConfig(e) {
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Oo(this.hass, {
      ignore: e.ignore,
      ignoreDomains: e.ignore_domains
    }), s = e.limit ?? Ro, r = t.slice(0, s), n = t.length - r.length;
    return this.renderTile({
      icon: t.length ? "mdi:lan-disconnect" : "mdi:lan-check",
      color: t.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? m(this.hass, "offline.title"),
      mainEntityId: t[0]?.entityId,
      secondary: I(
        t.length ? [
          ...r.map((o) => ({
            text: o.count > 1 ? `${o.name} (${o.count})` : o.name,
            entityId: o.entityId
          })),
          n > 0 ? { text: m(this.hass, "offline.more", { count: n }) } : void 0
        ] : [{ text: m(this.hass, "offline.allAnswer") }]
      ),
      values: t.length ? [
        {
          value: String(t.length),
          entityId: t[0]?.entityId,
          icon: "mdi:devices"
        }
      ] : []
    });
  }
}
Io([
  x()
], Ls.prototype, "_config");
S("horos-offline-tile", Ls, {
  type: "horos-offline-tile",
  name: { ru: "Не отвечает", en: "Not responding" },
  description: {
    ru: "Что перестало отвечать, посчитанное по устройствам",
    en: "Devices that went silent, grouped by device"
  },
  preview: !0
});
var Mo = Object.defineProperty, Lo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Mo(e, t, r), r;
};
const jo = 5;
class js extends E {
  static {
    this.styles = [Y, te];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      Math.min(this._config?.consumers.length ?? 0, this._config?.limit ?? 5)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Dl), document.createElement(
      "horos-energy-tile-editor"
    );
  }
  static getStubConfig() {
    return { consumers: [] };
  }
  setConfig(e) {
    if (!e.consumers?.length)
      throw new Error("At least one consumer is required (consumers)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.total), s = [], r = [], n = [];
    for (const h of e.consumers) {
      const u = z(h), f = _(this.hass, u.entity);
      if (f?.missing) {
        s.push(u.entity);
        continue;
      }
      const d = u.name ?? be(f?.stateObj?.attributes.friendly_name, e.name) ?? u.entity;
      if (f?.unavailable) {
        r.push(d);
        continue;
      }
      const g = ee(f);
      g === void 0 || g <= 0 || n.push({
        watts: g,
        row: {
          entityId: u.entity,
          name: d,
          text: this.hass.formatEntityState(f.stateObj),
          ink: u.color ?? "var(--amber-color, #ffc107)"
        }
      });
    }
    n.sort((h, u) => u.watts - h.watts);
    const o = n.slice(0, e.limit ?? jo), l = o[0]?.watts ?? 0, a = o.map(({ row: h, watts: u }) => ({
      ...h,
      level: l > 0 ? u / l * 100 : 0
    })), c = [
      G(this.hass, t),
      n.length ? { text: m(this.hass, "energy.consuming", { count: n.length }) } : { text: m(this.hass, "energy.idle") },
      r.length ? { text: m(this.hass, "offline.count", { count: r.length }) } : void 0,
      s.length ? { text: m(this.hass, "list.missing", { count: s.length }) } : void 0
    ];
    return this.renderTile({
      icon: "mdi:flash",
      color: "var(--amber-color, #ffc107)",
      primary: e.name ?? m(this.hass, "energy.title"),
      mainEntityId: t?.entityId ?? o[0]?.row.entityId,
      secondary: I([this.mainStateSegment(t), ...c]),
      values: t ? this.bigValues([{ key: "total", role: t }]) : [],
      customFeatures: a.length ? ie(a, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
Lo([
  x()
], js.prototype, "_config");
S("horos-energy-tile", js, {
  type: "horos-energy-tile",
  name: { ru: "Энергия", en: "Energy" },
  description: {
    ru: "Кто в доме ест электричество, от самого прожорливого",
    en: "Who in the house draws power, hungriest first"
  },
  preview: !0,
  suggest: (i, e) => {
    if (D(e) !== "sensor" || de(i, e) !== "power")
      return null;
    const t = Ge(
      i,
      e,
      "sensor",
      ["power"],
      12,
      (s) => Ti(i, s)
    );
    return t.length ? V(
      "custom:horos-energy-tile",
      { total: Ti(i, e) ? void 0 : e },
      { consumers: t, limit: 6 }
    ) : null;
  }
});
var No = Object.defineProperty, Do = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && No(e, t, r), r;
};
class Ns extends E {
  static async getConfigElement() {
    return await Promise.resolve().then(() => zl), document.createElement(
      "horos-presence-tile-editor"
    );
  }
  static getStubConfig() {
    return { areas: [] };
  }
  setConfig(e) {
    if (!e.areas?.length)
      throw new Error("At least one area is required (areas)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = [], s = [];
    let r = 0, n = 0;
    for (const o of e.areas) {
      const l = z(o), a = _(this.hass, l.entity);
      if (a?.missing) {
        s.push(l.entity);
        continue;
      }
      if (n += 1, a?.unavailable) {
        r += 1;
        continue;
      }
      a?.stateObj?.state === "on" && t.push({
        text: l.name ?? a.stateObj.attributes.friendly_name ?? l.entity,
        entityId: l.entity
      });
    }
    return this.renderTile({
      icon: t.length ? "mdi:home-account" : "mdi:home-outline",
      color: t.length ? "var(--state-icon-color)" : "var(--state-inactive-color)",
      primary: e.name ?? m(this.hass, "presence.title"),
      mainEntityId: t[0]?.entityId,
      secondary: I([
        ...t.length ? t : [{ text: m(this.hass, "presence.empty", { count: n }) }],
        r ? { text: m(this.hass, "offline.count", { count: r }) } : void 0,
        s.length ? { text: m(this.hass, "list.missing", { count: s.length }) } : void 0
      ]),
      values: [
        {
          value: String(t.length),
          entityId: t[0]?.entityId,
          icon: "mdi:home-account"
        }
      ]
    });
  }
}
Do([
  x()
], Ns.prototype, "_config");
S("horos-presence-tile", Ns, {
  type: "horos-presence-tile",
  name: { ru: "Присутствие", en: "Presence" },
  description: {
    ru: "В каких зонах сейчас есть кто-то",
    en: "Which areas have someone in them right now"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ["occupancy", "presence", "motion"];
    return D(e) !== "binary_sensor" || !t.includes(de(i, e) ?? "") ? null : V(
      "custom:horos-presence-tile",
      {},
      // One entity per area: otherwise the kitchen gets named three times.
      { areas: Dn(i, e, "binary_sensor", t, 12) }
    );
  }
});
var zo = Object.defineProperty, Fo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && zo(e, t, r), r;
};
const Ho = 255;
function It(i) {
  return !i?.group || i.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class Ds extends E {
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    return this.levelRows(this._config?.lights.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(It(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Fl), document.createElement(
      "horos-light-tile-editor"
    );
  }
  static getStubConfig() {
    return { lights: [] };
  }
  setConfig(e) {
    if (!e.lights?.length)
      throw new Error("At least one light is required (lights)");
    this.base = e, this._config = e;
  }
  /** Brightness in per cent, or undefined when the light is off or has none. */
  _brightness(e) {
    if (!e?.stateObj || e.stateObj.state !== "on") return;
    const t = e.stateObj.attributes.brightness;
    return t === void 0 ? void 0 : Math.round(t / Ho * 100);
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.group), r = e.lights.map((d) => z(d)).map((d) => ({
      item: d,
      role: _(this.hass, d.entity)
    })), n = this.missingRolesWarning([
      t,
      ...r.map((d) => d.role)
    ]);
    if (n) return this.renderWarning(n);
    const o = r.filter((d) => d.role?.stateObj?.state === "on"), l = r.filter((d) => d.role?.unavailable), a = r.length - l.length, c = t ?? o[0]?.role ?? r[0].role, h = t?.stateObj?.attributes.friendly_name, u = r.map(({ item: d, role: g }) => {
      const w = this._brightness(g), b = g?.stateObj?.state === "on", C = ft(this.hass, g);
      return {
        entityId: d.entity,
        name: d.name ?? be(g?.stateObj?.attributes.friendly_name, h) ?? d.entity,
        // A dimmable light says how bright, a plain one only that it is on.
        text: C ?? (b ? w === void 0 ? m(this.hass, "light.on") : `${w}%` : m(this.hass, "light.off")),
        ink: d.color ?? F(g?.stateObj),
        level: b ? w ?? 100 : 0
      };
    }), f = this._brightness(c);
    return this.renderTile({
      icon: "mdi:lightbulb-group",
      color: F(c?.stateObj),
      primary: e.name ?? h ?? m(this.hass, "light.title"),
      mainEntityId: c?.entityId,
      defaultIconAction: Ee(c?.entityId),
      secondary: I([
        G(this.hass, t),
        // With nothing answering there is no "on out of" to state: the count
        // would be about lights nobody can see.
        a === 0 ? void 0 : {
          text: o.length ? m(this.hass, "light.count", {
            count: o.length,
            total: a
          }) : m(this.hass, "light.allOff")
        },
        l.length ? {
          text: m(this.hass, "offline.count", { count: l.length }),
          entityId: l[0].item.entity
        } : void 0
      ]),
      values: f === void 0 ? [] : [
        {
          value: String(f),
          unit: "%",
          entityId: c?.entityId,
          icon: We.brightness
        }
      ],
      ownFeatures: It(e),
      customFeatures: ie(
        u,
        (d) => this.fireMoreInfo(d)
      )
    });
  }
}
Fo([
  x()
], Ds.prototype, "_config");
S("horos-light-tile", Ds, {
  type: "horos-light-tile",
  name: { ru: "Свет", en: "Lights" },
  description: {
    ru: "Свет комнаты одной плиткой: что горит и насколько ярко",
    en: "A room's lights in one tile: what is on and how bright"
  },
  preview: !0,
  suggest: (i, e) => {
    if (!ve(i, e)) return null;
    const t = Jt(i, e, "light");
    return t.length < 2 ? null : V("custom:horos-light-tile", {}, { lights: t });
  }
});
var Uo = Object.defineProperty, qo = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Uo(e, t, r), r;
};
const ji = ["playing", "paused", "buffering"];
function Rt(i) {
  return !i || i.controls === !1 ? [] : [{ type: "media-player-playback" }];
}
class zs extends E {
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    return this.levelRows(this._config?.players.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(Rt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Hl), document.createElement(
      "horos-media-tile-editor"
    );
  }
  static getStubConfig() {
    return { players: [] };
  }
  setConfig(e) {
    if (!e.players?.length)
      throw new Error("At least one player is required (players)");
    this.base = e, this._config = e;
  }
  /** Volume in per cent; HA keeps it as 0..1. */
  _volume(e) {
    const t = e?.stateObj?.attributes.volume_level;
    return t === void 0 ? void 0 : Math.round(t * 100);
  }
  /** What is playing: the title, or whatever the player can name instead. */
  _title(e) {
    const t = e?.stateObj?.attributes;
    if (t)
      return t.media_title ?? t.app_name ?? t.source;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = e.players.map((a) => z(a)).map((a) => ({ item: a, role: _(this.hass, a.entity) })), s = this.missingRolesWarning(t.map((a) => a.role));
    if (s) return this.renderWarning(s);
    const r = t.filter(
      (a) => ji.includes(a.role?.stateObj?.state ?? "")
    ), n = r[0] ?? t[0], o = this._volume(n.role), l = t.map(({ item: a, role: c }) => {
      const h = this._volume(c), u = ji.includes(c?.stateObj?.state ?? "");
      return {
        entityId: a.entity,
        name: a.name ?? c?.stateObj?.attributes.friendly_name ?? a.entity,
        // The state, not the title: a row is a bar with a word at the end, and
        // a track name is a sentence — it pushed the volume bar off the card.
        // What is playing is named once, in the line above.
        text: c?.stateObj && this.hass ? this.hass.formatEntityState(c.stateObj) : m(this.hass, "value.unknown"),
        ink: a.color ?? F(c?.stateObj),
        level: u ? h ?? 0 : 0
      };
    });
    return this.renderTile({
      icon: "mdi:play-box-multiple",
      color: F(n.role?.stateObj),
      primary: e.name ?? n.role?.stateObj?.attributes.friendly_name ?? m(this.hass, "media.title"),
      mainEntityId: n.role?.entityId,
      defaultIconAction: Ee(n.role?.entityId),
      secondary: I([
        G(this.hass, n.role),
        {
          text: r.length ? this._title(n.role) ?? m(this.hass, "media.playing", { count: r.length }) : m(this.hass, "media.idle"),
          entityId: n.role?.entityId
        }
      ]),
      values: o === void 0 ? [] : [
        {
          value: String(o),
          unit: "%",
          entityId: n.role?.entityId,
          icon: We.volume
        }
      ],
      ownFeatures: Rt(e),
      customFeatures: t.length > 1 ? ie(l, (a) => this.fireMoreInfo(a)) : void 0
    });
  }
}
qo([
  x()
], zs.prototype, "_config");
S("horos-media-tile", zs, {
  type: "horos-media-tile",
  name: { ru: "Медиа", en: "Media" },
  description: {
    ru: "Что играет в доме, где и насколько громко",
    en: "What is playing in the house, where, and how loud"
  },
  preview: !0,
  suggest: (i, e) => {
    if (!ve(i, e)) return null;
    const t = Jt(i, e, "media_player");
    return t.length < 2 ? null : V("custom:horos-media-tile", {}, { players: t });
  }
});
const Fs = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Ne(i, e, t) {
  const s = i.states[e];
  if (!s) return;
  const r = t ? s.attributes[t] : s.state;
  if (r == null || Fs.has(String(r))) return;
  const n = Number(r);
  return Number.isFinite(n) ? n : void 0;
}
function Vo(i, e) {
  if (!e) return;
  const t = i.states[e]?.state;
  if (!t || Fs.has(t) || !/^\d{1,2}:\d{2}/.test(t)) return;
  const [s, r] = t.split(":").map(Number);
  return new Date(2e3, 0, 1, s, r).toLocaleTimeString(i.locale?.language ?? void 0, {
    hour: "numeric",
    minute: "2-digit"
  });
}
function Wo(i, e, t, s, r) {
  const n = Math.round((i + e * t) / t) * t, o = Number(n.toFixed(4));
  return s !== void 0 && o < s ? s : r !== void 0 && o > r ? r : o;
}
function Ni(i, e, t) {
  const s = Ne(i, e);
  if (s === void 0) return;
  const r = Wo(
    s,
    t,
    Ne(i, e, "step") ?? 1,
    Ne(i, e, "min"),
    Ne(i, e, "max")
  );
  r !== s && i.callService(e.split(".")[0], "set_value", { entity_id: e, value: r }).catch(() => {
  });
}
function Bo(i, e, t) {
  return e.length ? v`<div class="schedule">
    ${e.map((s) => {
    const r = Ne(i, s.temperature), n = i.states[s.temperature]?.attributes.unit_of_measurement ?? "", o = Vo(i, s.time), l = (a) => a.stopPropagation();
    return v`<div class="period">
        <button
          class="when"
          title=${i.states[s.time ?? s.temperature]?.attributes.friendly_name ?? ""}
          @click=${(a) => {
      l(a), t(s.time ?? s.temperature);
    }}
        >
          ${s.icon ? v`<ha-icon icon=${s.icon}></ha-icon>` : p}
          ${o ? v`<span>${o}</span>` : p}
        </button>
        <div class="stepper">
          <button
            aria-label="−"
            @click=${(a) => {
      l(a), Ni(i, s.temperature, -1);
    }}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="value">${r === void 0 ? "—" : `${r}${n}`}</span>
          <button
            aria-label="+"
            @click=${(a) => {
      l(a), Ni(i, s.temperature, 1);
    }}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`;
  })}
  </div>` : p;
}
const Ko = ce`
  .schedule {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: var(--ha-space-2, 8px);
    /* A control row: as tall as a stock feature, never squeezed. */
    height: var(--feature-height, 42px);
    flex: none;
  }

  .schedule .period {
    container-type: inline-size;
    display: flex;
    align-items: center;
    gap: var(--ha-space-1, 4px);
    min-width: 0;
    border-radius: var(--ha-border-radius-lg, 12px);
    background: var(--ha-color-fill-neutral-quiet-resting, rgba(0, 0, 0, 0.06));
    padding: 0 var(--ha-space-1, 4px);
  }

  .schedule button {
    display: flex;
    align-items: center;
    gap: 4px;
    border: none;
    background: none;
    padding: 0 6px;
    height: calc(var(--feature-height, 42px) - 8px);
    font: inherit;
    color: var(--primary-text-color);
    cursor: pointer;
    border-radius: var(--ha-border-radius-md, 10px);
    --mdc-icon-size: 18px;
  }

  .schedule button:hover {
    background: var(--ha-color-fill-neutral-quiet-hover, rgba(0, 0, 0, 0.06));
  }

  .schedule .when {
    flex: 1 1 auto;
    min-width: 0;
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
  }

  .schedule .when ha-icon {
    color: var(--primary-text-color);
  }

  .schedule .stepper {
    display: flex;
    align-items: center;
    flex: none;
  }

  .schedule .value {
    min-width: 3.2em;
    text-align: center;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    font-variant-numeric: tabular-nums;
  }

  /*
   * Half of a narrow card has no room for "10:00 PM" beside a stepper: a
   * clipped "1(" says less than nothing. The icon stays and still opens the
   * time's dialog.
   */
  @container (max-width: 190px) {
    .schedule .when span {
      display: none;
    }
  }

  .ac-stack {
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 8px);
    height: 100%;
    min-height: 0;
  }

  .ac-stack > .levels {
    flex: 1 1 auto;
  }
`, Di = ["heat_cool", "auto", "cool", "heat", "dry", "fan_only", "off"], Go = {
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};
function Yo(i) {
  const e = Array.isArray(i) ? i.map(String) : [], t = Di.filter((r) => e.includes(r)), s = e.filter((r) => !Di.includes(r));
  return [...t.filter((r) => r !== "off"), ...s, ...t.filter((r) => r === "off")];
}
function Xo(i, e, t, s) {
  if (!e) return v``;
  const r = Yo(e.attributes.hvac_modes), n = ve(i, e.entity_id), o = n ? i.areas?.[n]?.name : void 0, l = (a) => i.formatEntityState(e, a);
  return v`
    <div class="header">
      <ha-icon-button .label=${i.localize("ui.common.close")} @click=${s}>
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <div class="titles">
        ${o ? v`<div class="subtitle">${o}</div>` : p}
        <div class="title">${t}</div>
      </div>
    </div>
    <div class="state">
      <div class="value">${i.formatEntityState(e)}</div>
      <ha-relative-time
        class="since"
        .hass=${i}
        .datetime=${e.last_changed}
        capitalize
      ></ha-relative-time>
    </div>
    <div class="control">
      <ha-control-select
        vertical
        .label=${t}
        .value=${e.state}
        .options=${r.map((a) => ({
    value: a,
    label: l(a),
    icon: v`<ha-icon icon=${Go[a] ?? "mdi:thermostat"}></ha-icon>`
  }))}
        style="--control-select-color: var(--state-climate-${e.state}-color, var(--state-climate-active-color, var(--primary-color)));"
        @value-changed=${(a) => {
    const c = a.detail.value;
    !c || c === e.state || i.callService("climate", "set_hvac_mode", {
      entity_id: e.entity_id,
      hvac_mode: c
    }).catch(() => {
    });
  }}
      ></ha-control-select>
    </div>
  `;
}
const Qo = ce`
  dialog.modes {
    border: none;
    padding: var(--ha-space-4, 16px) var(--ha-space-6, 24px) var(--ha-space-6, 24px);
    width: min(580px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    box-sizing: border-box;
    border-radius: var(--ha-dialog-border-radius, 24px);
    background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
    color: var(--primary-text-color);
    box-shadow: var(--dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.24));
  }

  dialog.modes::backdrop {
    background: var(--ha-dialog-scrim-color, rgba(0, 0, 0, 0.32));
  }

  /* On a phone the stock dialog fills the screen; so does this one. */
  @media (max-width: 450px) {
    dialog.modes {
      width: 100vw;
      max-width: 100vw;
      height: 100vh;
      max-height: 100vh;
      margin: 0;
      border-radius: 0;
    }
  }

  dialog.modes .header {
    display: flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    margin-inline-start: calc(-1 * var(--ha-space-3, 12px));
  }

  dialog.modes .titles {
    min-width: 0;
  }

  dialog.modes .subtitle {
    font-size: var(--ha-font-size-s, 14px);
    color: var(--secondary-text-color);
    line-height: 1.2;
  }

  dialog.modes .title {
    font-size: var(--ha-font-size-xl, 20px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  dialog.modes .state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--ha-space-6, 24px) 0 var(--ha-space-4, 16px);
  }

  dialog.modes .value {
    font-size: var(--ha-font-size-4xl, 36px);
    line-height: 1.2;
  }

  dialog.modes .since {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  dialog.modes .control {
    display: flex;
    justify-content: center;
    padding-bottom: var(--ha-space-4, 16px);
  }

  /* The size of the stock light dialog's slider. */
  dialog.modes ha-control-select {
    height: 45vh;
    max-height: 320px;
    min-height: 200px;
    width: 130px;
    --control-select-border-radius: var(--ha-border-radius-6xl, 36px);
    --control-select-thickness: 130px;
    --mdc-icon-size: 24px;
  }
`;
var Jo = Object.defineProperty, Hs = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Jo(e, t, r), r;
};
const zi = ["temperature", "humidity", "power"];
function Mt(i) {
  return !i || i.controls === !1 ? [] : [{ type: "target-temperature" }, { type: "climate-hvac-modes" }];
}
class Zt extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [
      Y,
      te,
      Ko,
      Qo
    ];
  }
  iconTap() {
    return !this._config?.modes_popup || !this._modes ? !1 : (this._modes.showModal(), !0);
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ul), document.createElement("horos-ac-tile-editor");
  }
  static getStubConfig() {
    return { climate: "" };
  }
  setConfig(e) {
    if (!e.climate)
      throw new Error("A climate entity is required (climate)");
    const t = e.features_position ?? (e.vertical ? "bottom" : "inline");
    this._bigKeys = ue(
      e.big_values,
      // A large value and an inline control both want the right of the line;
      // the control wins, and the room temperature becomes a word among others.
      t === "inline" ? [] : "temperature",
      zi
    ), this.base = { ...e, features_position: t }, this._config = e;
  }
  /** The schedule row is a control: one layout row, never squeezed. */
  _scheduleRows() {
    return this._config?.schedule?.length ? 1 : 0;
  }
  fixedRows() {
    return this.featureRows(Mt(this._config)) + this._scheduleRows();
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? gs(e) : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.climate), s = zi.map((u) => ({
      key: u,
      role: _(this.hass, e[u])
    })), r = (e.sensors ?? []).map((u) => z(u)).map((u) => _(this.hass, u.entity)), n = this.missingRolesWarning([
      t,
      ...s.map((u) => u.role),
      ...["co2", "voc", "aqi", "pm25"].map(
        (u) => _(this.hass, e[u])
      ),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = le(s, this._bigKeys), a = e.air_rows ? _s(this.hass, e, ms(e.air_bounds)) : [], c = e.air_rows ? l.filter((u) => !Be.includes(u.key)) : l, h = this.renderTile({
      icon: "mdi:air-conditioner",
      color: F(t?.stateObj),
      primary: Ue(e.name, t) ?? m(this.hass, "ac.title"),
      mainEntityId: t?.entityId,
      // The popup needs a tappable icon; the tap itself goes to iconTap().
      defaultIconAction: e.modes_popup ? { action: "more-info" } : Ee(t?.entityId),
      secondary: I([
        G(this.hass, t),
        this.mainStateSegment(t),
        ...c.map((u) => q(this.hass, u.role)),
        ...r.map((u) => q(this.hass, u))
      ]),
      values: this.bigValues(o),
      ownFeatures: Mt(e),
      customFeatures: a.length || e.schedule?.length ? v`<div class="ac-stack">
              ${a.length ? ie(a, (u) => this.fireMoreInfo(u)) : p}
              ${Bo(
        this.hass,
        e.schedule ?? [],
        (u) => this.fireMoreInfo(u)
      )}
            </div>` : void 0
    });
    return e.modes_popup ? v`${h}
      <dialog
        class="modes"
        @click=${(u) => {
      u.target === u.currentTarget && this._modes?.close();
    }}
      >
        ${Xo(
      this.hass,
      t?.stateObj,
      Ue(e.name, t) ?? m(this.hass, "ac.title"),
      () => this._modes?.close()
    )}
      </dialog>` : h;
  }
}
Hs([
  x()
], Zt.prototype, "_config");
Hs([
  ns("dialog.modes")
], Zt.prototype, "_modes");
S("horos-ac-tile", Zt, {
  type: "horos-ac-tile",
  name: { ru: "Кондиционер", en: "Air conditioner" },
  description: {
    ru: "Климатический прибор, воздух в комнате и цена работы",
    en: "A climate unit, the air in the room, and what running it costs"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ye(i, e), s = Ke(t, "climate");
    if (!s) return null;
    const r = ve(i, s) ? Jt(i, s, "sensor") : [], n = {
      climate: s,
      temperature: W(i, r, "sensor", "temperature"),
      humidity: W(i, r, "sensor", "humidity"),
      power: W(i, t, "sensor", "power")
    };
    return Ye(n) < 2 ? null : V("custom:horos-ac-tile", n);
  }
});
function Zo(i, e = {}) {
  if (!i) return [];
  const t = new Set(e.ignore ?? []), s = [];
  for (const [r, n] of Object.entries(i.states)) {
    if (!r.startsWith("update.") || n?.state !== "on" || t.has(r)) continue;
    const o = i.entities?.[r];
    if (o?.hidden) continue;
    const l = o?.device_id ? i.devices?.[o.device_id] : void 0, a = n.attributes.latest_version;
    s.push({
      entityId: r,
      name: l?.name_by_user ?? l?.name ?? n.attributes.title ?? n.attributes.friendly_name ?? r,
      version: a,
      skipped: a !== void 0 && a === n.attributes.skipped_version
    });
  }
  return s.sort((r, n) => r.name.localeCompare(n.name));
}
var ea = Object.defineProperty, ta = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && ea(e, t, r), r;
};
const ia = 4;
class Us extends E {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ql), document.createElement(
      "horos-updates-tile-editor"
    );
  }
  static getStubConfig() {
    return {};
  }
  setConfig(e) {
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Zo(this.hass, { ignore: e.ignore }), s = e.include_skipped ? t : t.filter((l) => !l.skipped), r = e.limit ?? ia, n = s.slice(0, r), o = s.length - n.length;
    return this.renderTile({
      icon: s.length ? "mdi:package-up" : "mdi:package-variant-closed-check",
      color: s.length ? "var(--info-color, #2196f3)" : "var(--success-color, #43a047)",
      primary: e.name ?? m(this.hass, "updates.title"),
      mainEntityId: s[0]?.entityId,
      secondary: I(
        s.length ? [
          ...n.map((l) => ({
            text: l.version ? `${l.name} ${l.version}` : l.name,
            entityId: l.entityId
          })),
          o > 0 ? { text: m(this.hass, "offline.more", { count: o }) } : void 0
        ] : [{ text: m(this.hass, "updates.upToDate") }]
      ),
      values: s.length ? [
        {
          value: String(s.length),
          entityId: s[0]?.entityId,
          icon: We.updates
        }
      ] : []
    });
  }
}
ta([
  x()
], Us.prototype, "_config");
S("horos-updates-tile", Us, {
  type: "horos-updates-tile",
  name: { ru: "Обновления", en: "Updates" },
  description: {
    ru: "Что в доме просит обновления, одной плиткой вместо тридцати",
    en: "What in the house asks to be updated, one tile instead of thirty"
  },
  preview: !0,
  suggest: (i, e) => e.startsWith("update.") ? V("custom:horos-updates-tile", {}) : null
});
var sa = Object.defineProperty, ra = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && sa(e, t, r), r;
};
class qs extends E {
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    return this.levelRows(this._config?.lists.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Vl), document.createElement(
      "horos-tasks-tile-editor"
    );
  }
  static getStubConfig() {
    return { lists: [] };
  }
  setConfig(e) {
    if (!e.lists?.length)
      throw new Error("At least one list is required (lists)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.calendar), s = e.lists.map((c) => z(c)).map((c) => {
      const h = _(this.hass, c.entity);
      return { item: c, role: h, count: ee(h) ?? 0 };
    }), r = this.missingRolesWarning([
      t,
      ...s.map((c) => c.role)
    ]);
    if (r) return this.renderWarning(r);
    const n = s.reduce((c, h) => c + h.count, 0), o = Math.max(...s.map((c) => c.count), 1), l = s.filter((c) => c.count > 0).map(({ item: c, role: h, count: u }) => ({
      entityId: c.entity,
      name: c.name ?? h?.stateObj?.attributes.friendly_name ?? c.entity,
      text: String(u),
      ink: c.color ?? "var(--state-icon-color, var(--primary-color))",
      level: u / o * 100
    })), a = t?.stateObj?.attributes.message;
    return this.renderTile({
      icon: n ? "mdi:format-list-checks" : "mdi:check-all",
      color: n ? "var(--state-icon-color, var(--primary-color))" : "var(--success-color, #43a047)",
      primary: e.name ?? m(this.hass, "tasks.title"),
      mainEntityId: s[0]?.item.entity,
      secondary: I([
        G(this.hass, t),
        { text: n ? void 0 : m(this.hass, "tasks.none") },
        t ? {
          text: a ?? m(this.hass, "tasks.noEvents"),
          entityId: t.entityId
        } : void 0
      ]),
      values: n ? [
        {
          value: String(n),
          entityId: s[0]?.item.entity,
          icon: We.tasks
        }
      ] : [],
      customFeatures: l.length ? ie(l, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
ra([
  x()
], qs.prototype, "_config");
S("horos-tasks-tile", qs, {
  type: "horos-tasks-tile",
  name: { ru: "Задачи", en: "Tasks" },
  description: {
    ru: "Сколько дел на каждом списке и что ближайшее в календаре",
    en: "How much is left on each list, and what is coming up next"
  },
  preview: !0,
  suggest: (i, e) => {
    if (!e.startsWith("todo.")) return null;
    const t = Object.keys(i.states).filter((r) => r.startsWith("todo.") && !i.entities?.[r]?.hidden).sort(), s = [e, ...t.filter((r) => r !== e)];
    return s.length < 2 ? null : V("custom:horos-tasks-tile", {}, { lists: s });
  }
});
const na = "on";
function oa(i) {
  const e = i.alert_when;
  return e === void 0 ? [na] : Array.isArray(e) ? e : [e];
}
function aa(i, e) {
  return e === void 0 || e === "unavailable" || e === "unknown" ? !1 : oa(i).includes(e);
}
var la = Object.defineProperty, ca = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && la(e, t, r), r;
};
const ua = 4;
class Vs extends E {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Wl), document.createElement(
      "horos-alerts-tile-editor"
    );
  }
  static getStubConfig() {
    return { alerts: [] };
  }
  setConfig(e) {
    if (!e.alerts?.length)
      throw new Error("At least one alert is required (alerts)");
    this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = e.watch_offline !== !1, s = [], r = [], n = [];
    let o, l = 0;
    for (const f of e.alerts) {
      const d = z(f), g = _(this.hass, d.entity);
      if (g?.missing) {
        n.push(d.entity);
        continue;
      }
      l += 1;
      const w = d.name ?? g?.stateObj?.attributes.friendly_name ?? d.entity;
      if (g?.unavailable) {
        t && r.push({
          text: m(this.hass, "alerts.offline", { name: w }),
          entityId: d.entity
        });
        continue;
      }
      aa(d, g?.stateObj?.state) && (s.push({ text: w, entityId: d.entity }), o = o ?? (d.color ? ds(d.color) : void 0));
    }
    const a = [...s, ...r], c = e.limit ?? ua, h = a.slice(0, c), u = a.length - h.length;
    return this.renderTile({
      icon: s.length ? "mdi:alert" : r.length ? "mdi:bell-off-outline" : "mdi:bell-check-outline",
      color: o ?? (s.length ? "var(--error-color, #db4437)" : r.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)"),
      primary: e.name ?? m(this.hass, "alerts.title"),
      mainEntityId: a[0]?.entityId,
      secondary: I([
        ...a.length ? h : [{ text: m(this.hass, "alerts.calm", { count: l }) }],
        u > 0 ? { text: m(this.hass, "offline.more", { count: u }) } : void 0,
        ...n.length ? [{ text: m(this.hass, "list.missing", { count: n.length }) }] : []
      ]),
      values: s.length ? [
        {
          value: String(s.length),
          entityId: s[0]?.entityId,
          icon: "mdi:alert-outline"
        }
      ] : []
    });
  }
}
ca([
  x()
], Vs.prototype, "_config");
S("horos-alerts-tile", Vs, {
  type: "horos-alerts-tile",
  name: { ru: "Оповещения", en: "Alerts" },
  description: {
    ru: "Всё, о чём стоит сказать только когда оно случилось, одной плиткой",
    en: "Everything worth mentioning only once it happens, in one tile"
  },
  preview: !0,
  suggest: (i, e) => {
    const t = ["problem", "tamper"];
    return D(e) !== "binary_sensor" || !t.includes(de(i, e) ?? "") ? null : V(
      "custom:horos-alerts-tile",
      {},
      { alerts: Ge(i, e, "binary_sensor", t) }
    );
  }
});
var ha = Object.defineProperty, Ws = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && ha(e, t, r), r;
};
const tt = [
  { key: "dim", icon: "mdi:brightness-4" },
  { key: "bright", icon: "mdi:brightness-7" },
  { key: "warm", icon: "mdi:weather-sunset" },
  { key: "cold", icon: "mdi:snowflake" }
];
function Lt(i) {
  return !i?.state?.startsWith("light.") || i.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class ei extends E {
  constructor() {
    super(...arguments), this._controlsReady = !1;
  }
  static {
    this.styles = [
      Y,
      ce`
      /*
       * The sizes are the stock feature's own, taken from the same variables
       * hui-card-features sets for the features it hosts — our row lives
       * outside it, and a row of lamp buttons must not be a different height
       * from a row of climate buttons on the card next to it.
       *
       * Spare height spreads between the rows rather than growing them: a
       * button is 42px on every card, whatever the card was told to be.
       */
      .lamp-controls {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: var(--ha-card-feature-gap, 12px);
        pointer-events: auto;
      }

      ha-control-select {
        --control-select-color: var(--tile-color);
        --control-select-padding: 0;
        --control-select-thickness: var(--feature-height, 42px);
        --control-select-border-radius: 12px;
        --control-select-button-border-radius: 12px;
      }

      /*
       * The selector keeps the height a stock inline feature gets; what
       * shrinks is what goes inside it. At full size an icon over a line of
       * text is 53px of content in a 36px place and the names get clipped, so
       * both are taken down a notch. Size and font are inherited properties,
       * which is why they reach into the selector's shadow from out here.
       */
      .presets.labelled {
        --mdc-icon-size: 16px;
        font-size: var(--ha-font-size-xs, 11px);
        line-height: 1.1;
      }
    `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), us().then((e) => {
      this._controlsReady = e;
    });
  }
  /**
   * The row of steps is one layout row, the same as a stock feature: it is
   * 42px whatever happens, so the card must ask for the room and must not be
   * squeezed under it. The presets cost no row: they sit in the tile's own line,
   * where a stock inline feature would, and push the stock features below.
   */
  fixedRows() {
    const e = this._config;
    return e ? (tt.some(({ key: s }) => e[s]) ? 1 : 0) + this.featureRows(Lt(e), !!e.presets?.length) : 0;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Bl), document.createElement(
      "horos-lamp-tile-editor"
    );
  }
  static getStubConfig() {
    return { bright: "", dim: "" };
  }
  setConfig(e) {
    if (!(tt.some(({ key: s }) => e[s]) || e.presets?.length || e.power))
      throw new Error(
        "A lamp needs at least one script: bright, dim, warm, cold, power or presets"
      );
    this.base = e, this._config = e;
  }
  /** Runs a script the way a tap action would, confirmations and all. */
  _run(e) {
    this.hass && cs(
      this,
      this.hass,
      {
        tap_action: {
          action: "perform-action",
          perform_action: "homeassistant.turn_on",
          target: { entity_id: e }
        }
      },
      "tap"
    );
  }
  _stepLabel(e) {
    return m(this.hass, `lamp.${e}`);
  }
  /** The two halves of brightness and of colour, in one stock button group. */
  _renderSteps(e) {
    const t = tt.filter(({ key: s }) => e[s]);
    return t.length ? v`
      <ha-control-select
        .options=${t.map(({ key: s, icon: r }) => ({
      value: e[s],
      ariaLabel: this._stepLabel(s),
      icon: v`<ha-icon .icon=${r}></ha-icon>`
    }))}
        .value=${void 0}
        hide-option-label
        @value-changed=${(s) => {
      this._run(s.detail.value), s.target.value = void 0;
    }}
      ></ha-control-select>
    ` : p;
  }
  /** The looks the lamp can take, as the segmented selector HA uses for modes. */
  _renderPresets(e) {
    if (!e.presets?.length) return p;
    const t = e.presets.map(
      (r) => typeof r == "string" ? { entity: r } : r
    ), s = e.preset_state ? this.hass?.states[e.preset_state]?.state : void 0;
    return v`
      <ha-control-select
        class="presets ${e.preset_labels !== !1 ? "labelled" : ""}"
        .options=${t.map((r) => {
      const n = this.hass?.states[r.entity], o = r.name ?? xs(n?.attributes.friendly_name) ?? r.entity, l = r.icon ?? n?.attributes.icon;
      return {
        value: r.entity,
        label: o,
        ariaLabel: o,
        icon: l ? v`<ha-icon .icon=${l}></ha-icon>` : void 0
      };
    })}
        .value=${s ? t.find((r) => r.name === s)?.entity ?? s : void 0}
        ?hide-option-label=${e.preset_labels === !1}
        @value-changed=${(r) => {
      this._run(r.detail.value), e.preset_state || (r.target.value = void 0);
    }}
      >
      </ha-control-select>
    `;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.state), s = (e.sensors ?? []).map((n) => z(n)).map((n) => _(this.hass, n.entity)), r = this.missingRolesWarning([t, ...s]);
    return r ? this.renderWarning(r) : this.renderTile({
      icon: e.icon ?? "mdi:coach-lamp-variant",
      color: t ? F(t.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? m(this.hass, "lamp.title"),
      mainEntityId: t?.entityId,
      // The icon is the lamp's switch: it runs the power script where there is
      // one, and falls back to toggling whatever holds the state.
      defaultIconAction: e.power ? {
        action: "perform-action",
        perform_action: "homeassistant.turn_on",
        target: { entity_id: e.power }
      } : t ? { action: "toggle" } : { action: "none" },
      secondary: I([
        G(this.hass, t),
        this.mainStateSegment(t),
        ...s.map((n) => q(this.hass, n))
      ]),
      ownFeatures: Lt(e),
      customFeatures: this._controlsReady && tt.some(({ key: n }) => e[n]) ? v`<div class="lamp-controls">${this._renderSteps(e)}</div>` : void 0,
      customInline: this._controlsReady && e.presets?.length ? this._renderPresets(e) : void 0
    });
  }
}
Ws([
  x()
], ei.prototype, "_config");
Ws([
  x()
], ei.prototype, "_controlsReady");
S("horos-lamp-tile", ei, {
  type: "horos-lamp-tile",
  name: { ru: "Лампа на скриптах", en: "Script lamp" },
  description: {
    ru: "ИК-лампа или лента: ярче, теплее и режимы — скриптами, но как у лампы",
    en: "An IR lamp or a strip: brighter, warmer and presets, driven by scripts"
  },
  preview: !0
});
function da(i) {
  if (!i || mt.has(i.state)) return "offline";
  if (i.state === "off") return "off";
  const e = i.attributes.hvac_action;
  return e === void 0 ? "unknown" : e === "heating" ? "heating" : "idle";
}
function ma(i) {
  return {
    calling: i.filter((e) => e === "heating").length,
    // "unknown" is left out on purpose: a zone that does not report demand
    // must not swell the denominator of "2 of 5 calling".
    reporting: i.filter(
      (e) => e === "heating" || e === "idle" || e === "off"
    ).length,
    offline: i.filter((e) => e === "offline").length
  };
}
var fa = Object.defineProperty, pa = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && fa(e, t, r), r;
};
const Fi = ["power", "energy"];
class Bs extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    return this.levelRows(this._config?.zones?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Kl), document.createElement(
      "horos-heating-tile-editor"
    );
  }
  static getStubConfig() {
    return { zones: [] };
  }
  setConfig(e) {
    if (!e.mode && !e.burner && !e.pump && !e.switch)
      throw new Error(
        "The boiler needs at least one entity: mode, burner, pump or switch"
      );
    this._bigKeys = ue(e.big_values, "power", Fi), this.base = e, this._config = e;
  }
  /** What the row says on the right: where the room is and where it was sent. */
  _zoneText(e, t) {
    if (t === "offline") return ft(this.hass, e);
    const s = e?.stateObj;
    if (!s) return;
    const r = yi(this.hass, s, "current_temperature"), n = yi(this.hass, s, "temperature");
    if (r && n) {
      const o = n.replace(/^[\d\s\u00a0.,+-]+/, "");
      return `${Kt(r, o).value} → ${n}`;
    }
    return r ?? n ?? this.hass?.formatEntityState(s);
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.mode), s = _(this.hass, e.burner), r = _(this.hass, e.pump), n = _(this.hass, e.switch), o = Fi.map((b) => ({
      key: b,
      role: _(this.hass, e[b])
    })), l = (e.zones ?? []).map((b) => z(b)).map((b) => {
      const C = _(this.hass, b.entity);
      return { item: b, role: C, zone: da(C?.stateObj) };
    }), a = this.missingRolesWarning([
      t,
      s,
      r,
      n,
      ...o.map((b) => b.role),
      ...l.map((b) => b.role)
    ]);
    if (a) return this.renderWarning(a);
    const c = s?.stateObj?.state === "on", h = r?.stateObj?.state === "on", u = t ?? n ?? s ?? r, { calling: f, reporting: d, offline: g } = ma(
      l.map((b) => b.zone)
    ), w = l.map(({ item: b, role: C, zone: j }) => ({
      entityId: b.entity,
      name: b.name ?? be(C?.stateObj?.attributes.friendly_name, e.name) ?? b.entity,
      text: this._zoneText(C, j) ?? "",
      ink: b.color ?? F(C?.stateObj),
      // The bar is the demand, not the temperature: a room either has the
      // boiler working for it or it does not.
      level: j === "heating" ? 100 : 0,
      alarm: j === "offline",
      alarmIcon: "mdi:lan-disconnect"
    }));
    return this.renderTile({
      icon: c ? "mdi:fire" : h ? "mdi:pump" : "mdi:water-boiler",
      color: F(c ? s.stateObj : h ? r.stateObj : u?.stateObj),
      primary: e.name ?? m(this.hass, "heating.title"),
      mainEntityId: u?.entityId,
      // The icon is the boiler's own switch where there is one; without it
      // there is nothing on this card that is safe to toggle.
      defaultIconAction: e.switch ? Ee(e.switch) : { action: "none" },
      secondary: I([
        G(this.hass, u),
        this.mainStateSegment(u === t ? t : u),
        // Who is asking is the card's whole point, so it is always said. That
        // nobody is asking is only worth a word when the boiler has no mode
        // sensor to say "standby" for itself.
        f ? {
          text: m(this.hass, "heating.calling", {
            count: f,
            total: d
          })
        } : d && !t ? { text: m(this.hass, "heating.quiet") } : void 0,
        g ? { text: m(this.hass, "offline.count", { count: g }) } : void 0,
        ...le(o, this._bigKeys).rest.map(
          (b) => q(this.hass, b.role)
        )
      ]),
      values: this.bigValues(le(o, this._bigKeys).big),
      customFeatures: w.length ? ie(w, (b) => this.fireMoreInfo(b)) : void 0
    });
  }
}
pa([
  x()
], Bs.prototype, "_config");
S("horos-heating-tile", Bs, {
  type: "horos-heating-tile",
  name: { ru: "Отопление", en: "Heating" },
  description: {
    ru: "Котёл и комнаты, которые просят у него тепла, одной плиткой",
    en: "The boiler and the rooms asking it for heat, in one tile"
  },
  preview: !0
});
function ga(i) {
  const e = { thirsty: 0, soaked: 0, reporting: 0, offline: 0 };
  for (const t of i) {
    if (t.offline) {
      e.offline += 1;
      continue;
    }
    t.status !== "unknown" && (e.reporting += 1, t.status === "dry" && (e.thirsty += 1), t.status === "wet" && (e.soaked += 1));
  }
  return e;
}
function _a(i) {
  return i.thirsty ? "dry" : i.soaked ? "wet" : i.reporting ? "ok" : "unknown";
}
const va = {
  dry: "mdi:watering-can",
  ok: "mdi:greenhouse",
  wet: "mdi:water-alert",
  unknown: "mdi:greenhouse"
};
var ba = Object.defineProperty, ya = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && ba(e, t, r), r;
};
const Hi = [
  "temperature",
  "humidity",
  "illuminance"
];
class Ks extends E {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    return this.levelRows(this._config?.plants?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Gl), document.createElement(
      "horos-greenhouse-tile-editor"
    );
  }
  static getStubConfig() {
    return { plants: [] };
  }
  setConfig(e) {
    if (!e.plants?.length)
      throw new Error("At least one plant is required (plants)");
    const t = e.dry_below ?? lt, s = e.wet_above ?? ct;
    if (t >= s)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = ue(
      e.big_values,
      "temperature",
      Hi
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = Hi.map((h) => ({
      key: h,
      role: _(this.hass, e[h])
    })), s = [], r = [], n = [];
    for (const h of e.plants) {
      const u = z(h), f = _(this.hass, u.entity);
      if (f?.missing) {
        n.push(u.entity);
        continue;
      }
      const d = ee(f), g = ys(
        d,
        u.dry_below ?? e.dry_below ?? lt,
        u.wet_above ?? e.wet_above ?? ct
      ), w = !!f?.unavailable;
      r.push({ status: g, offline: w }), s.push({
        entityId: u.entity,
        name: u.name ?? Qn(f?.stateObj?.attributes.friendly_name) ?? u.entity,
        text: ft(this.hass, f) ?? Bt(this.hass, f) ?? m(this.hass, "value.unknown"),
        ink: u.color ?? At[g],
        // A silent sensor gets an empty bar, not a full one: an empty bar reads
        // as "nothing is known here", a full one as "soaked".
        level: d ?? 0,
        // Dry is the one that needs a hand today. Soaked shows in the colour.
        alarm: w || g === "dry",
        alarmIcon: w ? "mdi:lan-disconnect" : "mdi:water-off"
      });
    }
    const o = ga(r), l = _a(o), { big: a, rest: c } = le(t, this._bigKeys);
    return this.renderTile({
      icon: va[l],
      color: At[l],
      primary: e.name ?? m(this.hass, "greenhouse.title"),
      // The card is about the set, so it has no main entity to act on: the
      // driest plant is the one thing worth opening from here.
      mainEntityId: s.find((h) => h.alarm)?.entityId,
      secondary: I([
        o.thirsty ? {
          text: m(this.hass, "greenhouse.thirsty", {
            count: o.thirsty,
            total: o.reporting
          })
        } : o.reporting ? {
          text: m(this.hass, "greenhouse.watered", {
            count: o.reporting
          })
        } : void 0,
        o.soaked ? { text: m(this.hass, "greenhouse.soaked", { count: o.soaked }) } : void 0,
        o.offline ? { text: m(this.hass, "offline.count", { count: o.offline }) } : void 0,
        n.length ? { text: m(this.hass, "list.missing", { count: n.length }) } : void 0,
        ...c.map((h) => q(this.hass, h.role))
      ]),
      values: this.bigValues(a),
      customFeatures: s.length ? ie(s, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
ya([
  x()
], Ks.prototype, "_config");
S("horos-greenhouse-tile", Ks, {
  type: "horos-greenhouse-tile",
  name: { ru: "Оранжерея", en: "Greenhouse" },
  description: {
    ru: "Все растения полосками влажности почвы и воздух, которым они дышат",
    en: "Every plant as a bar of soil moisture, and the air they share"
  },
  preview: !0,
  suggest: (i, e) => {
    if (D(e) !== "sensor" || de(i, e) !== "moisture")
      return null;
    const t = Ge(i, e, "sensor", ["moisture"]);
    return t.length < 2 ? null : V("custom:horos-greenhouse-tile", {}, { plants: t });
  }
});
const wa = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant"
}, xa = "mdi:weather-partly-cloudy";
function Ui(i) {
  return i && wa[i] || xa;
}
function $a(i) {
  return i ? ls([
    `--state-weather-${as(i)}-color`,
    "--state-weather-active-color",
    "--state-active-color"
  ]) ?? "var(--state-icon-color)" : "var(--state-inactive-color)";
}
const ka = {
  temperature: "mdi:thermometer",
  apparent_temperature: "mdi:thermometer",
  dew_point: "mdi:thermometer-water",
  humidity: "mdi:water-percent",
  pressure: "mdi:gauge",
  wind_speed: "mdi:weather-windy",
  cloud_coverage: "mdi:weather-cloudy",
  uv_index: "mdi:sun-wireless",
  visibility: "mdi:weather-fog",
  precipitation: "mdi:weather-rainy",
  precipitation_probability: "mdi:weather-rainy"
}, Ea = [
  "temperature",
  "apparent_temperature",
  "dew_point",
  "humidity",
  "pressure",
  "wind_speed",
  "cloud_coverage",
  "uv_index",
  "visibility"
], Ca = {
  temperature: "temperature_unit",
  templow: "temperature_unit",
  apparent_temperature: "temperature_unit",
  dew_point: "temperature_unit",
  pressure: "pressure_unit",
  wind_speed: "wind_speed_unit",
  wind_gust_speed: "wind_speed_unit",
  visibility: "visibility_unit",
  precipitation: "precipitation_unit"
}, Gs = /* @__PURE__ */ new Set([
  "humidity",
  "cloud_coverage",
  "precipitation_probability"
]);
function Sa(i, e) {
  if (Gs.has(e)) return "%";
  const t = Ca[e];
  if (!t) return;
  const s = i?.attributes[t];
  return typeof s == "string" ? s : void 0;
}
const Ta = 1;
function qi(i) {
  return ((Number(i?.attributes.supported_features) || 0) & Ta) !== 0;
}
const jt = [
  "temperature",
  "precipitation",
  "precipitation_probability",
  "humidity",
  "wind_speed"
], Nt = (i) => typeof i == "number" && Number.isFinite(i) ? i : void 0;
function Aa(i, e) {
  if (e === "temperature") return Oa(i);
  const t = i.map((n) => Nt(n[e])), s = t.filter((n) => n !== void 0), r = Gs.has(e) ? 100 : s.length ? Math.max(...s) : 0;
  return t.map((n) => n === void 0 ? { level: 0 } : r <= 0 ? { level: 0, high: n } : { level: Math.min(100, n / r * 100), high: n });
}
function Oa(i) {
  const e = i.map((l) => Nt(l.temperature)), t = i.map((l, a) => Nt(l.templow) ?? e[a]), s = [...e, ...t].filter(
    (l) => l !== void 0
  );
  if (!s.length) return i.map(() => ({ level: 0 }));
  const r = Math.min(...s), o = Math.max(...s) - r;
  return i.map((l, a) => {
    const c = e[a], h = t[a];
    return c === void 0 || h === void 0 ? { level: 0 } : o <= 0 ? { from: 0, level: 100, low: h, high: c } : {
      from: (h - r) / o * 100,
      level: (c - r) / o * 100,
      low: h,
      high: c
    };
  });
}
var Pa = Object.defineProperty, Ys = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Pa(e, t, r), r;
};
const Ia = 7, Vi = 14, Ra = ["humidity", "wind_speed"], Wi = ["temperature", "humidity"], Ma = "3.75em";
class ti extends E {
  constructor() {
    super(...arguments), this._bigKeys = Wi;
  }
  static {
    this.styles = [Y, te];
  }
  contentRows() {
    return this.levelRows(this._days().length || this._wanted()) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Xl), document.createElement(
      "horos-weather-tile-editor"
    );
  }
  static getStubConfig() {
    return { weather: "" };
  }
  setConfig(e) {
    if (!e.weather)
      throw new Error("A weather entity is required (weather)");
    if (e.days !== void 0 && (!Number.isInteger(e.days) || e.days < 1 || e.days > Vi))
      throw new Error(`days must be a whole number between 1 and ${Vi}`);
    if (e.bar && !jt.includes(e.bar))
      throw new Error(
        `Unknown bar: ${e.bar}. Allowed: ${jt.join(", ")}`
      );
    this._bigKeys = ue(
      e.big_values,
      Wi,
      Ea
    ), this.base = e, this._config = e;
  }
  // ---- the forecast subscription --------------------------------------
  connectedCallback() {
    super.connectedCallback(), this._subscribe();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe();
  }
  updated(e) {
    super.updated(e), (e.has("_config") || !this._subscribed) && this._subscribe();
  }
  _unsubscribe() {
    this._subscribed?.then((e) => e()).catch(() => {
    }), this._subscribed = void 0, this._subscribedTo = void 0;
  }
  _subscribe() {
    const e = this._config?.weather;
    if (this._subscribed && this._subscribedTo === e) return;
    this._unsubscribe();
    const t = e ? this.hass?.states[e] : void 0;
    if (!this.isConnected || !this.hass?.connection || !e || !t || !qi(t))
      return;
    this._subscribedTo = e;
    const s = this.hass.connection.subscribeMessage(
      (r) => {
        this._forecast = r.forecast ?? [];
      },
      {
        type: "weather/subscribe_forecast",
        forecast_type: "daily",
        entity_id: e
      }
    );
    this._subscribed = s, s.catch(() => {
      this._subscribed === s && this._unsubscribe();
    });
  }
  // ---- rendering -------------------------------------------------------
  _wanted() {
    return this._config?.days ?? Ia;
  }
  /** The days actually drawn: what was asked for, or what the forecast has. */
  _days() {
    return (this._forecast ?? []).slice(0, this._wanted());
  }
  /** The weekday label, in the user's own language. */
  _weekday(e) {
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : new Intl.DateTimeFormat($(this.hass), {
      weekday: "short"
    }).format(t);
  }
  /** An attribute value with its unit split off, ready for a large value. */
  _attribute(e, t, s) {
    const r = s ?? e.attributes[t];
    if (r == null) return;
    const n = Sa(e, t), o = this.hass?.formatEntityAttributeValue?.(e, t, s) ?? `${r}${n ? ` ${n}` : ""}`;
    return Kt(o, n);
  }
  /**
   * What is written on the right of a row.
   *
   * A temperature row names both ends of its span: the night without a unit,
   * the afternoon with one. A slash between them, not the arrow the heating
   * card uses — there an arrow is the truth, the room is on its way to the
   * target; here both numbers are simply the day, and the arrow read as if the
   * morning were heading for the afternoon. Everything else is one reading.
   */
  _rowText(e, t, s) {
    if (s.high === void 0) return m(this.hass, "value.unknown");
    const r = this._attribute(
      e,
      t === "temperature" ? "temperature" : t,
      s.high
    );
    if (!r) return m(this.hass, "value.unknown");
    const n = `${r.value}${r.unit ? ` ${r.unit}` : ""}`;
    if (t !== "temperature" || s.low === void 0 || s.low === s.high)
      return n;
    const o = this._attribute(e, "templow", s.low);
    return o ? `${o.value} / ${n}` : n;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = _(this.hass, e.weather);
    if (t?.missing)
      return this.renderWarning(
        m(this.hass, "entity.missing.one", { list: e.weather })
      );
    const s = t.stateObj, r = e.bar ?? "temperature", n = this._days(), o = Aa(n, r), l = n.map((h, u) => ({
      entityId: e.weather,
      name: this._weekday(h.datetime),
      text: this._rowText(s, r, o[u]),
      ink: $a(h.condition),
      icon: Ui(h.condition),
      from: o[u].from,
      level: o[u].level
    })), a = [
      "state",
      ...Ra.filter(
        (h) => !this._bigKeys.includes(h) && s.attributes[h] !== void 0 && s.attributes[h] !== null
      )
    ], c = [];
    for (const h of this._bigKeys) {
      const u = this._attribute(s, h);
      u && c.push({
        ...u,
        entityId: e.weather,
        icon: ka[h]
      });
    }
    return this.renderTile({
      icon: Ui(s.state),
      color: F(s),
      primary: e.name ?? s.attributes.friendly_name ?? e.weather,
      mainEntityId: e.weather,
      secondary: I([
        G(this.hass, t),
        this.mainStateSegment(t, a),
        // A forecast the integration does not offer is worth saying out loud:
        // the card is otherwise a tile with an empty half.
        qi(s) ? void 0 : { text: m(this.hass, "weather.noForecast") }
      ]),
      values: c,
      customFeatures: l.length ? ie(l, (h) => this.fireMoreInfo(h), {
        nameWidth: Ma
      }) : void 0
    });
  }
}
Ys([
  x()
], ti.prototype, "_config");
Ys([
  x()
], ti.prototype, "_forecast");
S("horos-weather-tile", ti, {
  type: "horos-weather-tile",
  name: { ru: "Погода", en: "Weather" },
  description: {
    ru: "Погода на сегодня в строке и неделя полосками температуры",
    en: "Today on the line and the week as bars of temperature"
  },
  preview: !0,
  suggest: (i, e) => D(e) !== "weather" ? null : V("custom:horos-weather-tile", { weather: e })
});
function Xs(i, e) {
  for (const t of e) {
    const s = i.states[t]?.state;
    if (s === void 0 || s.trim() === "") continue;
    const r = Number(s);
    if (Number.isFinite(r)) return { entityId: t, level: r };
  }
  return {};
}
function Qs(i, e) {
  let t;
  for (const s of e) {
    const r = i.states[s], n = r?.last_reported ?? r?.last_updated ?? r?.last_changed;
    if (!n) continue;
    const o = Date.parse(n);
    Number.isFinite(o) && (t === void 0 || o > t) && (t = o);
  }
  return t === void 0 ? void 0 : new Date(t);
}
function La(i, e, t, s, r) {
  if (Xs(i, e).level === void 0) return !1;
  if (t === void 0) return !0;
  const n = r ?? Qs(i, e);
  return !!n && (s.getTime() - n.getTime()) / 1e3 < t;
}
function ja(i, e) {
  const t = i ? Date.parse(i) : NaN;
  return Number.isFinite(t) ? Math.max(0, Math.ceil((t - e.getTime()) / 6e4)) : 0;
}
const Bi = (i) => String(i).padStart(2, "0");
function Na(i) {
  if (i.forced)
    return { key: "charge.forced", params: { minutes: i.minutesLeft } };
  if (!i.fresh) {
    if (i.on && i.pulse) return { key: "charge.pulse", params: {} };
    const e = i.since;
    return {
      key: "charge.noData",
      params: {
        time: e ? `${Bi(e.getHours())}:${Bi(e.getMinutes())}` : "—"
      }
    };
  }
  if (i.on !== void 0)
    return i.on ? i.max === void 0 ? { key: "charge.on", params: {} } : { key: "charge.charging", params: { max: i.max } } : i.min === void 0 ? { key: "charge.off", params: {} } : { key: "charge.waiting", params: { min: i.min } };
}
function Da(i, e, t, s, r, n) {
  const o = s > 0 ? s : 1;
  let l = Math.round(e / o) * o;
  return t !== void 0 && (l = i === "min" ? Math.min(l, t - o) : Math.max(l, t + o)), l = Math.min(n, Math.max(r, l)), Number(l.toFixed(6));
}
function za(i) {
  return `{% set _ = now() %}{{ expand(${JSON.stringify(i)}) | map(attribute='last_reported') | map('as_timestamp') | max | default('') }}`;
}
function Fa(i, e, t, s) {
  if (i === void 0) return t;
  const r = i + (e > 0 ? e : 1);
  return r > s ? t : Number(r.toFixed(6));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Js = { ATTRIBUTE: 1 }, Zs = (i) => (...e) => ({ _$litDirective$: i, values: e });
let er = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this._$Ct = e, this._$AM = t, this._$Ci = s;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tr = "important", Ha = " !" + tr, oe = Zs(class extends er {
  constructor(i) {
    if (super(i), i.type !== Js.ATTRIBUTE || i.name !== "style" || i.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return Object.keys(i).reduce((e, t) => {
      const s = i[t];
      return s == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(i, [e]) {
    const { style: t } = i.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? t.removeProperty(s) : t[s] = null);
    for (const s in e) {
      const r = e[s];
      if (r != null) {
        this.ft.add(s);
        const n = typeof r == "string" && r.endsWith(Ha);
        s.includes("-") || n ? t.setProperty(s, n ? r.slice(0, -11) : r, n ? tr : "") : t[s] = r;
      }
    }
    return $e;
  }
});
var Ua = Object.defineProperty, we = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && Ua(e, t, r), r;
};
class me extends _e {
  constructor() {
    super(...arguments), this.step = 1, this.lo = 0, this.hi = 100, this.charging = !1, this.trackWidth = 0;
  }
  connectedCallback() {
    super.connectedCallback(), !(typeof ResizeObserver > "u") && (this._resize = new ResizeObserver((e) => {
      this.trackWidth = e[0]?.contentRect.width ?? 0;
    }), this._resize.observe(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resize?.disconnect(), this._resize = void 0;
  }
  static {
    this.styles = ce`
    :host {
      display: block;
      height: var(--feature-height, 42px);
    }

    .track {
      position: relative;
      height: 100%;
      border-radius: var(--feature-border-radius, 12px);
      overflow: hidden;
      touch-action: none;
    }

    /* The empty part of the scale, tinted with the fill's own colour as level bars are. */
    .track::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: var(--ink);
      opacity: 0.2;
    }

    .fill {
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      background-color: var(--ink);
      transition: width 400ms ease-in-out;
    }

    /*
     * Charging: the shimmer of levels.ts, copied value for value. It is the
     * household's one way of saying "charging" (ha-smart-charging draws the same);
     * keep the two in step.
     */
    .fill.charging {
      background-image: linear-gradient(
        90deg,
        rgb(255 255 255 / 0) 0%,
        rgb(255 255 255 / 0.3) 50%,
        rgb(255 255 255 / 0) 100%
      );
      background-size: 200% 100%;
      animation: level-charging 2s linear infinite;
    }

    @keyframes level-charging {
      from {
        background-position: 200% 0;
      }
      to {
        background-position: -200% 0;
      }
    }

    /* The band the automation leaves alone. */
    .band {
      position: absolute;
      inset-block: 0;
      background-color: var(--primary-text-color);
      opacity: 0.08;
      pointer-events: none;
    }

    /*
     * A handle: a wide transparent hit area (a 6px pill is too thin for a
     * finger) around a visible pill.
     */
    .handle {
      position: absolute;
      inset-block: 0;
      width: 24px;
      transform: translateX(-50%);
      cursor: ew-resize;
      outline: none;
    }

    .handle::after {
      content: "";
      position: absolute;
      inset-block: 25%;
      inset-inline-start: 9px;
      width: 6px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      background-color: var(--primary-text-color);
    }

    .handle:focus-visible::after {
      box-shadow: 0 0 0 2px var(--primary-color);
    }

    .label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--ha-font-size-s, 12px);
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
      pointer-events: none;
      white-space: nowrap;
    }

    /*
     * Inside the band, where the ends of the scale cannot cut them off; when the
     * band is too narrow for two numbers they step outside the handles instead.
     */
    .label.min {
      transform: translate(10px, -50%);
    }

    .label.max {
      transform: translate(calc(-100% - 10px), -50%);
    }

    .label.min.outside {
      transform: translate(calc(-100% - 10px), -50%);
    }

    .label.max.outside {
      transform: translate(10px, -50%);
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }

      .fill.charging {
        animation: none;
      }
    }
  `;
  }
  _value(e) {
    return this._drag?.which === e ? this._drag.value : this[e];
  }
  _other(e) {
    return this._value(e === "min" ? "max" : "min");
  }
  _clamp(e, t) {
    return Da(e, t, this._other(e), this.step, this.lo, this.hi);
  }
  _emit(e, t) {
    t !== this[e] && this.dispatchEvent(
      new CustomEvent("limit-change", {
        detail: { which: e, value: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onKey(e, t) {
    const s = t.key === "ArrowRight" || t.key === "ArrowUp" ? this.step : t.key === "ArrowLeft" || t.key === "ArrowDown" ? -this.step : 0, r = this[e];
    !s || r === void 0 || (t.preventDefault(), this._emit(e, this._clamp(e, r + s)));
  }
  _valueAt(e) {
    const s = this.shadowRoot.querySelector(".track").getBoundingClientRect(), r = s.width ? (e.clientX - s.left) / s.width : 0;
    return Math.min(1, Math.max(0, r)) * 100;
  }
  _onDown(e, t) {
    this[e] !== void 0 && (t.stopPropagation(), t.currentTarget.setPointerCapture(t.pointerId), this._drag = { which: e, value: this[e] });
  }
  _onMove(e, t) {
    this._drag?.which === e && (this._drag = { which: e, value: this._clamp(e, this._valueAt(t)) });
  }
  _onUp(e, t) {
    if (this._drag?.which !== e) return;
    t.stopPropagation();
    const { value: s } = this._drag;
    this._drag = void 0, this._emit(e, s);
  }
  /**
   * Whether the two numbers fit between the handles: each is about 2.5em of
   * text plus the 10px gap to its handle. Unknown width counts as fitting.
   */
  _labelsOutside() {
    const e = this._value("min"), t = this._value("max");
    return !this.trackWidth || e === void 0 || t === void 0 ? !1 : (t - e) / 100 * this.trackWidth < 64;
  }
  _handle(e, t) {
    const s = this._value(e);
    if (s === void 0) return p;
    const r = `${Math.min(100, Math.max(0, s))}%`;
    return v`
      <div
        class="handle ${e}"
        role="slider"
        tabindex="0"
        aria-label=${e}
        aria-valuemin=${this.lo}
        aria-valuemax=${this.hi}
        aria-valuenow=${s}
        style=${oe({ left: r })}
        @keydown=${(n) => this._onKey(e, n)}
        @pointerdown=${(n) => this._onDown(e, n)}
        @pointermove=${(n) => this._onMove(e, n)}
        @pointerup=${(n) => this._onUp(e, n)}
        @pointercancel=${() => this._drag = void 0}
        @click=${(n) => n.stopPropagation()}
      ></div>
      <span class="label ${e} ${t ? "outside" : ""}" style=${oe({ left: r })}
        >${s}</span
      >
    `;
  }
  render() {
    const e = this.level, t = this._value("min"), s = this._value("max"), r = this._labelsOutside();
    return v`
      <div class="track" style=${oe({ "--ink": Oe(e) })}>
        <div
          class="fill ${this.charging ? "charging" : ""}"
          style=${oe({ width: `${Math.min(100, Math.max(0, e ?? 0))}%` })}
        ></div>
        ${t !== void 0 && s !== void 0 ? v`<div
              class="band"
              style=${oe({ left: `${t}%`, width: `${s - t}%` })}
            ></div>` : p}
        ${this._handle("min", r)} ${this._handle("max", r)}
      </div>
    `;
  }
}
we([
  re({ type: Number })
], me.prototype, "level");
we([
  re({ type: Number })
], me.prototype, "min");
we([
  re({ type: Number })
], me.prototype, "max");
we([
  re({ type: Number })
], me.prototype, "step");
we([
  re({ type: Number })
], me.prototype, "lo");
we([
  re({ type: Number })
], me.prototype, "hi");
we([
  re({ type: Boolean })
], me.prototype, "charging");
we([
  x()
], me.prototype, "trackWidth");
we([
  x()
], me.prototype, "_drag");
customElements.get("horos-charge-range") || customElements.define("horos-charge-range", me);
var qa = Object.defineProperty, ii = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && qa(e, t, r), r;
};
const rt = (i) => (Array.isArray(i.battery) ? i.battery : [i.battery]).filter(
  (e) => typeof e == "string" && e !== ""
);
class vt extends E {
  constructor() {
    super(...arguments), this._controlsReady = !1, this._held = !1;
  }
  static {
    this.styles = [
      Y,
      ce`
      .charge-line {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--ha-card-feature-gap, 12px);
      }

      horos-charge-range {
        flex: 1 1 0;
        min-width: 0;
      }

      ha-control-button {
        flex: none;
        width: auto;
        min-width: var(--feature-height, 42px);
        height: var(--feature-height, 42px);
        --control-button-border-radius: var(--feature-border-radius, 12px);
        --control-button-padding: 0 var(--ha-space-3, 12px);
        --control-button-background-color: var(--tile-color);
        --control-button-icon-color: var(--tile-color);
        font-size: var(--ha-font-size-s, 12px);
      }

      ha-control-button.active {
        --control-button-background-color: var(--state-active-color, #ffc107);
        --control-button-icon-color: var(--state-active-color, #ffc107);
        --control-button-background-opacity: 0.3;
      }

      .force {
        display: flex;
        align-items: center;
        gap: var(--ha-space-1, 4px);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }

      .force ha-icon {
        --mdc-icon-size: 18px;
      }
    `
    ];
  }
  _subscribeReported() {
    const e = this._config, t = this.hass?.connection;
    this._unsubscribe || !e?.stale_after || !t || !this.isConnected || (this._unsubscribe = t.subscribeMessage(
      (s) => {
        const r = Number(s.result);
        this._reported = s.result !== "" && Number.isFinite(r) ? new Date(r * 1e3) : void 0;
      },
      { type: "render_template", template: za(rt(e)) }
    ).catch(() => (this._unsubscribe = void 0, async () => {
    })));
  }
  _unsubscribeReported() {
    this._unsubscribe?.then((e) => e()).catch(() => {
    }), this._unsubscribe = void 0, this._reported = void 0;
  }
  updated(e) {
    super.updated?.(e), this._subscribeReported();
  }
  connectedCallback() {
    super.connectedCallback(), us().then((e) => {
      this._controlsReady = e;
    }), this._tick = setInterval(() => this.requestUpdate(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && clearInterval(this._tick), this._tick = void 0, this._unsubscribeReported();
  }
  contentRows() {
    return 1;
  }
  fixedRows() {
    return 1;
  }
  getGridOptions() {
    return { ...super.getGridOptions(), columns: 12, rows: 2, min_rows: 2 };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ql), document.createElement("horos-charge-tile-editor");
  }
  static getStubConfig() {
    return { battery: [], switch: "", min: "", max: "" };
  }
  setConfig(e) {
    if (!rt(e).length) throw new Error("A battery sensor is required (battery)");
    const { features: t, levels: s, ...r } = e;
    this.base = r, this._unsubscribeReported(), this._config = e;
  }
  _number(e, t) {
    const s = e ? this.hass?.states[e] : void 0;
    if (!s) return;
    const r = t ? s.attributes[t] : s.state;
    if (r == null || mt.has(String(r)))
      return;
    const n = Number(r);
    return Number.isFinite(n) ? n : void 0;
  }
  _setLimit(e) {
    const t = this._config;
    if (!t || !this.hass) return;
    const s = t[e.detail.which];
    s && this.hass.callService(s.split(".")[0], "set_value", {
      entity_id: s,
      value: e.detail.value
    }).catch(() => {
    });
  }
  _periodDown() {
    this._held = !1, clearTimeout(this._holdTimer), this._holdTimer = setTimeout(() => {
      this._held = !0, this._config?.pulse_every && this.fireMoreInfo(this._config.pulse_every);
    }, 500);
  }
  _periodUp() {
    clearTimeout(this._holdTimer);
  }
  _periodTap(e) {
    if (e.stopPropagation(), this._held) {
      this._held = !1;
      return;
    }
    const t = this._config?.pulse_every;
    if (!t || !this.hass) return;
    const s = Fa(
      this._number(t),
      this._number(t, "step") ?? 1,
      this._number(t, "min") ?? 1,
      this._number(t, "max") ?? 48
    );
    this.hass.callService(t.split(".")[0], "set_value", { entity_id: t, value: s }).catch(() => {
    });
  }
  _toggleForce(e) {
    e.stopPropagation();
    const t = this._config?.force;
    if (!t || !this.hass) return;
    const s = this.hass.states[t]?.state === "active";
    this.hass.callService("timer", s ? "cancel" : "start", { entity_id: t });
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._config, t = this.hass, s = rt(e), r = /* @__PURE__ */ new Date(), n = _(t, e.switch), o = this.missingRolesWarning([
      n,
      _(t, e.min),
      _(t, e.max),
      _(t, e.force),
      _(t, e.pulse_every),
      // A battery list is fine with one of its sensors gone, not with all.
      s.every((X) => !t.states[X]) ? _(t, s[0]) : void 0
    ]);
    if (o) return this.renderWarning(o);
    const { entityId: l, level: a } = Xs(t, s), c = l ?? s[0], h = n ? n.stateObj?.state === "on" : void 0, u = e.force ? t.states[e.force] : void 0, f = u?.state === "active", d = ja(u?.attributes.finishes_at, r), g = this._number(e.min), w = this._number(e.max), b = Na({
      forced: f,
      minutesLeft: d,
      fresh: La(t, s, e.stale_after, r, this._reported),
      on: h,
      pulse: !!e.pulse_every,
      min: g,
      max: w,
      since: this._reported ?? Qs(t, s)
    }), C = t.states[c], j = this.renderTile({
      icon: "mdi:watch",
      // Lit while the port is on; the battery itself is always "active". With
      // no port there is nothing to be on, and the icon takes the battery colour.
      color: n ? h ? F(n.stateObj) : "var(--state-inactive-color)" : Oe(a),
      primary: e.name ?? C?.attributes.friendly_name ?? m(t, "charge.title"),
      secondary: I([
        G(t, n) ?? (b ? {
          text: m(t, b.key, b.params),
          entityId: f ? e.force : e.switch ?? c
        } : void 0)
      ]),
      mainEntityId: c,
      // With a port the icon switches it by hand — the card works without the
      // automation too. The action names the port itself: the card's main
      // entity is the battery, and a toggle aimed at a sensor does nothing.
      defaultIconAction: e.switch ? { action: "toggle", entity: e.switch } : Ee(c),
      values: a === void 0 ? [] : [{ value: String(Math.round(a)), unit: "%", entityId: c }],
      customFeatures: v`<div class="charge-line">
        <horos-charge-range
          .level=${a}
          .min=${g}
          .max=${w}
          .step=${this._number(e.min, "step") ?? 1}
          .lo=${this._number(e.min, "min") ?? 0}
          .hi=${this._number(e.max, "max") ?? 100}
          .charging=${h ?? !1}
          @limit-change=${this._setLimit}
        ></horos-charge-range>
        ${e.pulse_every && this._controlsReady ? v`<ha-control-button
              .label=${m(t, "charge.everyLabel")}
              title=${m(t, "charge.everyLabel")}
              @pointerdown=${this._periodDown}
              @pointerup=${this._periodUp}
              @pointercancel=${this._periodUp}
              @pointerleave=${this._periodUp}
              @click=${this._periodTap}
            >
              <span class="force">
                <ha-icon icon="mdi:timer-sync-outline"></ha-icon>
                ${m(t, "charge.every", {
        hours: this._number(e.pulse_every) ?? "—"
      })}
              </span>
            </ha-control-button>` : p}
        ${e.force && this._controlsReady ? v`<ha-control-button
              class=${f ? "active" : ""}
              .label=${m(t, "charge.force")}
              @click=${this._toggleForce}
            >
              <span class="force">
                <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                ${f ? m(t, "charge.forceLeft", { minutes: d }) : m(t, "charge.force")}
              </span>
            </ha-control-button>` : p}
      </div>`
    });
    return this.toggleAttribute("filled", !0), j;
  }
}
ii([
  x()
], vt.prototype, "_config");
ii([
  x()
], vt.prototype, "_controlsReady");
ii([
  x()
], vt.prototype, "_reported");
S("horos-charge-tile", vt, {
  type: "horos-charge-tile",
  name: { ru: "Зарядка", en: "Charge" },
  description: {
    ru: "Заряд, пределы зарядки и принудительная зарядка одного устройства",
    en: "Battery, charging limits and a forced charge for one device"
  },
  preview: !1
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ki = Zs(class extends er {
  constructor(i) {
    if (super(i), i.type !== Js.ATTRIBUTE || i.name !== "class" || i.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((e) => i[e]).join(" ") + " ";
  }
  update(i, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((s) => s !== "")));
      for (const s in e) e[s] && !this.nt?.has(s) && this.st.add(s);
      return this.render(e);
    }
    const t = i.element.classList;
    for (const s of this.st) s in e || (t.remove(s), this.st.delete(s));
    for (const s in e) {
      const r = !!e[s];
      r === this.st.has(s) || this.nt?.has(s) || (r ? (t.add(s), this.st.add(s)) : (t.remove(s), this.st.delete(s)));
    }
    return $e;
  }
});
class Va {
  constructor(e, t) {
    this.pixels = e, this.opts = t;
    const { sigBits: s } = t, r = (B, H, k) => (B << 2 * s) + (H << s) + k;
    this.getColorIndex = r;
    const n = 8 - s, o = 1 << 3 * s, l = new Uint32Array(o);
    let a, c, h, u, f, d, g, w, b, C;
    a = h = f = 0, c = u = d = Number.MAX_VALUE;
    const j = e.length / 4;
    let X = 0;
    for (; X < j; ) {
      const B = X * 4;
      if (X++, g = e[B + 0], w = e[B + 1], b = e[B + 2], C = e[B + 3], C === 0) continue;
      g = g >> n, w = w >> n, b = b >> n;
      const H = r(g, w, b);
      l[H] === void 0 && (l[H] = 0), l[H] += 1, g > a && (a = g), g < c && (c = g), w > h && (h = w), w < u && (u = w), b > f && (f = b), b < d && (d = b);
    }
    this._colorCount = l.reduce(
      (B, H) => H > 0 ? B + 1 : B,
      0
    ), this.hist = l, this.rmax = a, this.rmin = c, this.gmax = h, this.gmin = u, this.bmax = f, this.bmin = d;
  }
  get colorCount() {
    return this._colorCount;
  }
}
class Wa {
  scaleDown(e) {
    const t = this.getWidth(), s = this.getHeight();
    let r = 1;
    if (e.maxDimension > 0) {
      const n = Math.max(t, s);
      n > e.maxDimension && (r = e.maxDimension / n);
    } else
      r = 1 / e.quality;
    r < 1 && this.resize(t * r, s * r, r);
  }
}
function Ba(i, e) {
  if (e.length > 0) {
    const t = i.data, s = t.length / 4;
    let r, n, o, l, a;
    for (let c = 0; c < s; c++) {
      r = c * 4, n = t[r + 0], o = t[r + 1], l = t[r + 2], a = t[r + 3];
      for (let h = 0; h < e.length; h++)
        if (!e[h]?.(n, o, l, a)) {
          t[r + 3] = 0;
          break;
        }
    }
  }
  return i;
}
function Ka(i) {
  const e = new URL(i, location.href);
  return e.protocol === location.protocol && e.host === location.host && e.port === location.port;
}
function Ga(i, e) {
  const t = new URL(i), s = new URL(e);
  return t.protocol === s.protocol && t.hostname === s.hostname && t.port === s.port;
}
class Ya extends Wa {
  _getCanvas() {
    if (!this._canvas)
      throw new Error("Canvas is not initialized");
    return this._canvas;
  }
  _getContext() {
    if (!this._context)
      throw new Error("Context is not initialized");
    return this._context;
  }
  _getWidth() {
    if (!this._width)
      throw new Error("Width is not initialized");
    return this._width;
  }
  _getHeight() {
    if (!this._height)
      throw new Error("Height is not initialized");
    return this._height;
  }
  _initCanvas() {
    const e = this.image;
    if (!e)
      throw new Error("Image is not initialized");
    const t = this._canvas = document.createElement("canvas"), s = t.getContext("2d");
    if (!s) throw new ReferenceError("Failed to create canvas context");
    this._context = s, t.className = "@vibrant/canvas", t.style.display = "none", this._width = t.width = e.width, this._height = t.height = e.height, s.drawImage(e, 0, 0), document.body.appendChild(t);
  }
  load(e) {
    let t, s;
    if (typeof e == "string")
      t = document.createElement("img"), s = e, !Ka(s) && !Ga(window.location.href, s) && (t.crossOrigin = "anonymous"), t.src = s;
    else if (e instanceof HTMLImageElement)
      t = e, s = e.src;
    else
      return Promise.reject(
        new Error("Cannot load buffer as an image in browser")
      );
    return this.image = t, new Promise((r, n) => {
      const o = () => {
        this._initCanvas(), r(this);
      };
      t.complete ? o() : (t.onload = o, t.onerror = (l) => n(new Error(`Fail to load image: ${s}`)));
    });
  }
  clear() {
    this._getContext().clearRect(0, 0, this._getWidth(), this._getHeight());
  }
  update(e) {
    this._getContext().putImageData(e, 0, 0);
  }
  getWidth() {
    return this._getWidth();
  }
  getHeight() {
    return this._getHeight();
  }
  resize(e, t, s) {
    if (!this.image)
      throw new Error("Image is not initialized");
    this._width = this._getCanvas().width = e, this._height = this._getCanvas().height = t, this._getContext().scale(s, s), this._getContext().drawImage(this.image, 0, 0);
  }
  getPixelCount() {
    return this._getWidth() * this._getHeight();
  }
  getImageData() {
    return this._getContext().getImageData(
      0,
      0,
      this._getWidth(),
      this._getHeight()
    );
  }
  remove() {
    this._canvas && this._canvas.parentNode && this._canvas.parentNode.removeChild(this._canvas);
  }
}
function qe(i, ...e) {
  return e.forEach((t) => {
    if (t) {
      for (const s in t)
        if (t.hasOwnProperty(s)) {
          const r = t[s];
          Array.isArray(r) ? i[s] = r.slice(0) : typeof r == "object" ? (i[s] || (i[s] = {}), qe(i[s], r)) : i[s] = r;
        }
    }
  }), i;
}
function Xa(i, e) {
  const { colorCount: t, quantizer: s, generators: r, filters: n } = i, o = { colorCount: t }, l = typeof s == "string" ? { name: s, options: {} } : s;
  return l.options = qe({}, o, l.options), qe(
    {},
    {
      quantizer: l,
      generators: r,
      filters: n
    },
    e
  );
}
class Qa {
  /**
   * Arguments are the same as `Vibrant.constructor`.
   */
  constructor(e, t = {}) {
    this._src = e, this._opts = qe({}, ke.DefaultOpts, t);
  }
  /**
   * Sets `opts.colorCount` to `n`.
   * @returns this `Builder` instance.
   */
  maxColorCount(e) {
    return this._opts.colorCount = e, this;
  }
  /**
   * Sets `opts.maxDimension` to `d`.
   * @returns this `Builder` instance.
   */
  maxDimension(e) {
    return this._opts.maxDimension = e, this;
  }
  /**
   * Adds a filter function
   * @returns this `Builder` instance.
   */
  addFilter(e) {
    return this._opts.filters ? this._opts.filters.push(e) : this._opts.filters = [e], this;
  }
  /**
   * Removes a filter function.
   * @returns this `Builder` instance.
   */
  removeFilter(e) {
    if (this._opts.filters) {
      const t = this._opts.filters.indexOf(e);
      t > 0 && this._opts.filters.splice(t);
    }
    return this;
  }
  /**
   * Clear all filters.
   * @returns this `Builder` instance.
   */
  clearFilters() {
    return this._opts.filters = [], this;
  }
  /**
   * Sets `opts.quality` to `q`.
   * @returns this `Builder` instance.
   */
  quality(e) {
    return this._opts.quality = e, this;
  }
  /**
   * Specifies which `Image` implementation class to use.
   * @returns this `Builder` instance.
   */
  useImageClass(e) {
    return this._opts.ImageClass = e, this;
  }
  /**
   * Sets `opts.generator` to `generator`
   * @returns this `Builder` instance.
   */
  useGenerator(e, t) {
    return this._opts.generators || (this._opts.generators = []), this._opts.generators.push(
      t ? { name: e, options: t } : e
    ), this;
  }
  /**
   * Specifies which `Quantizer` implementation class to use
   * @returns this `Builder` instance.
   */
  useQuantizer(e, t) {
    return this._opts.quantizer = t ? { name: e, options: t } : e, this;
  }
  /**
   * Builds and returns a `Vibrant` instance as configured.
   */
  build() {
    return new ke(this._src, this._opts);
  }
  /**
   * Builds a `Vibrant` instance as configured and calls its `getPalette` method.
   */
  getPalette() {
    return this.build().getPalette();
  }
}
class $t {
  constructor(e) {
    this.pipeline = e, this._map = {};
  }
  names() {
    return Object.keys(this._map);
  }
  has(e) {
    return !!this._map[e];
  }
  get(e) {
    return this._map[e];
  }
  register(e, t) {
    return this._map[e] = t, this.pipeline;
  }
}
class Ja {
  constructor() {
    this.filter = new $t(this), this.quantizer = new $t(this), this.generator = new $t(this);
  }
  _buildProcessTasks({
    filters: e,
    quantizer: t,
    generators: s
  }) {
    return s.length === 1 && s[0] === "*" && (s = this.generator.names()), {
      filters: e.map((n) => r(this.filter, n)),
      quantizer: r(this.quantizer, t),
      generators: s.map((n) => r(this.generator, n))
    };
    function r(n, o) {
      let l, a;
      return typeof o == "string" ? l = o : (l = o.name, a = o.options), {
        name: l,
        fn: n.get(l),
        options: a
      };
    }
  }
  async process(e, t) {
    const { filters: s, quantizer: r, generators: n } = this._buildProcessTasks(t), o = await this._filterColors(s, e), l = await this._generateColors(r, o), a = await this._generatePalettes(n, l);
    return {
      colors: l,
      palettes: a
    };
  }
  _filterColors(e, t) {
    return Promise.resolve(
      Ba(
        t,
        e.map(({ fn: s }) => s)
      )
    );
  }
  _generateColors(e, t) {
    return Promise.resolve(e.fn(t.data, e.options));
  }
  async _generatePalettes(e, t) {
    const s = await Promise.all(
      e.map(({ fn: r, options: n }) => Promise.resolve(r(t, n)))
    );
    return Promise.resolve(
      s.reduce(
        (r, n, o) => (r[e[o].name] = n, r),
        {}
      )
    );
  }
}
function Za(i, e, t) {
  return "#" + ((1 << 24) + (i << 16) + (e << 8) + t).toString(16).slice(1, 7);
}
function el(i, e, t) {
  i /= 255, e /= 255, t /= 255;
  const s = Math.max(i, e, t), r = Math.min(i, e, t);
  let n = 0, o = 0;
  const l = (s + r) / 2;
  if (s !== r) {
    const a = s - r;
    switch (o = l > 0.5 ? a / (2 - s - r) : a / (s + r), s) {
      case i:
        n = (e - t) / a + (e < t ? 6 : 0);
        break;
      case e:
        n = (t - i) / a + 2;
        break;
      case t:
        n = (i - e) / a + 4;
        break;
    }
    n /= 6;
  }
  return [n, o, l];
}
function ge(i, e, t) {
  let s, r, n;
  function o(l, a, c) {
    return c < 0 && (c += 1), c > 1 && (c -= 1), c < 1 / 6 ? l + (a - l) * 6 * c : c < 1 / 2 ? a : c < 2 / 3 ? l + (a - l) * (2 / 3 - c) * 6 : l;
  }
  if (e === 0)
    s = r = n = t;
  else {
    const l = t < 0.5 ? t * (1 + e) : t + e - t * e, a = 2 * t - l;
    s = o(a, l, i + 1 / 3), r = o(a, l, i), n = o(a, l, i - 1 / 3);
  }
  return [s * 255, r * 255, n * 255];
}
class ne {
  static applyFilters(e, t) {
    return t.length > 0 ? e.filter(({ r: s, g: r, b: n }) => {
      for (let o = 0; o < t.length; o++)
        if (!t[o]?.(s, r, n, 255)) return !1;
      return !0;
    }) : e;
  }
  /**
   * Make a value copy of a swatch based on a previous one. Returns a new Swatch instance
   * @param {Swatch} swatch
   */
  static clone(e) {
    return new ne(e._rgb, e._population);
  }
  /**
   * The red value in the RGB value
   */
  get r() {
    return this._rgb[0];
  }
  /**
   * The green value in the RGB value
   */
  get g() {
    return this._rgb[1];
  }
  /**
   * The blue value in the RGB value
   */
  get b() {
    return this._rgb[2];
  }
  /**
   * The color value as a rgb value
   */
  get rgb() {
    return this._rgb;
  }
  /**
   * The color value as a hsl value
   */
  get hsl() {
    if (!this._hsl) {
      const [e, t, s] = this._rgb;
      this._hsl = el(e, t, s);
    }
    return this._hsl;
  }
  /**
   * The color value as a hex string
   */
  get hex() {
    if (!this._hex) {
      const [e, t, s] = this._rgb;
      this._hex = Za(e, t, s);
    }
    return this._hex;
  }
  get population() {
    return this._population;
  }
  /**
   * Get the JSON object for the swatch
   */
  toJSON() {
    return {
      rgb: this.rgb,
      population: this.population
    };
  }
  getYiq() {
    if (!this._yiq) {
      const e = this._rgb;
      this._yiq = (e[0] * 299 + e[1] * 587 + e[2] * 114) / 1e3;
    }
    return this._yiq;
  }
  /**
   * Returns an appropriate color to use for any 'title' text which is displayed over this Swatch's color.
   */
  get titleTextColor() {
    return this._titleTextColor || (this._titleTextColor = this.getYiq() < 200 ? "#fff" : "#000"), this._titleTextColor;
  }
  /**
   * Returns an appropriate color to use for any 'body' text which is displayed over this Swatch's color.
   */
  get bodyTextColor() {
    return this._bodyTextColor || (this._bodyTextColor = this.getYiq() < 150 ? "#fff" : "#000"), this._bodyTextColor;
  }
  /**
   * Internal use.
   * @param rgb `[r, g, b]`
   * @param population Population of the color in an image
   */
  constructor(e, t) {
    this._rgb = e, this._population = t;
  }
}
const ir = class Dt {
  /**
   *
   * @param _src Path to image file (supports HTTP/HTTPs)
   * @param opts Options (optional)
   */
  constructor(e, t) {
    this._src = e, this.opts = qe({}, Dt.DefaultOpts, t);
  }
  static use(e) {
    this._pipeline = e;
  }
  static from(e) {
    return new Qa(e);
  }
  get result() {
    return this._result;
  }
  _process(e, t) {
    e.scaleDown(this.opts);
    const s = Xa(this.opts, t);
    return Dt._pipeline.process(e.getImageData(), s);
  }
  async getPalette() {
    const e = new this.opts.ImageClass();
    try {
      const t = await e.load(this._src), s = await this._process(t, {
        generators: ["default"]
      });
      this._result = s;
      const r = s.palettes.default;
      if (!r)
        throw new Error(
          "Something went wrong and a palette was not found, please file a bug against our GitHub repo: https://github.com/vibrant-Colors/node-vibrant/"
        );
      return e.remove(), r;
    } catch (t) {
      return e.remove(), Promise.reject(t);
    }
  }
  async getPalettes() {
    const e = new this.opts.ImageClass();
    try {
      const t = await e.load(this._src), s = await this._process(t, {
        generators: ["*"]
      });
      this._result = s;
      const r = s.palettes;
      return e.remove(), r;
    } catch (t) {
      return e.remove(), Promise.reject(t);
    }
  }
};
ir.DefaultOpts = {
  colorCount: 64,
  quality: 5,
  filters: []
};
let ke = ir;
ke.DefaultOpts.quantizer = "mmcq";
ke.DefaultOpts.generators = ["default"];
ke.DefaultOpts.filters = ["default"];
ke.DefaultOpts.ImageClass = Ya;
const zt = 5, kt = 8 - zt;
class ut {
  constructor(e, t, s, r, n, o, l) {
    this.histogram = l, this._volume = -1, this._avg = null, this._count = -1, this.dimension = { r1: e, r2: t, g1: s, g2: r, b1: n, b2: o };
  }
  static build(e) {
    const t = new Va(e, { sigBits: zt }), { rmin: s, rmax: r, gmin: n, gmax: o, bmin: l, bmax: a } = t;
    return new ut(s, r, n, o, l, a, t);
  }
  invalidate() {
    this._volume = this._count = -1, this._avg = null;
  }
  volume() {
    if (this._volume < 0) {
      const { r1: e, r2: t, g1: s, g2: r, b1: n, b2: o } = this.dimension;
      this._volume = (t - e + 1) * (r - s + 1) * (o - n + 1);
    }
    return this._volume;
  }
  count() {
    if (this._count < 0) {
      const { hist: e, getColorIndex: t } = this.histogram, { r1: s, r2: r, g1: n, g2: o, b1: l, b2: a } = this.dimension;
      let c = 0;
      for (let h = s; h <= r; h++)
        for (let u = n; u <= o; u++)
          for (let f = l; f <= a; f++) {
            const d = t(h, u, f);
            e[d] && (c += e[d]);
          }
      this._count = c;
    }
    return this._count;
  }
  clone() {
    const { histogram: e } = this, { r1: t, r2: s, g1: r, g2: n, b1: o, b2: l } = this.dimension;
    return new ut(t, s, r, n, o, l, e);
  }
  avg() {
    if (!this._avg) {
      const { hist: e, getColorIndex: t } = this.histogram, { r1: s, r2: r, g1: n, g2: o, b1: l, b2: a } = this.dimension;
      let c = 0;
      const h = 1 << 8 - zt;
      let u, f, d;
      u = f = d = 0;
      for (let g = s; g <= r; g++)
        for (let w = n; w <= o; w++)
          for (let b = l; b <= a; b++) {
            const C = t(g, w, b), j = e[C];
            j && (c += j, u += j * (g + 0.5) * h, f += j * (w + 0.5) * h, d += j * (b + 0.5) * h);
          }
      c ? this._avg = [~~(u / c), ~~(f / c), ~~(d / c)] : this._avg = [
        ~~(h * (s + r + 1) / 2),
        ~~(h * (n + o + 1) / 2),
        ~~(h * (l + a + 1) / 2)
      ];
    }
    return this._avg;
  }
  contains(e) {
    let [t, s, r] = e;
    const { r1: n, r2: o, g1: l, g2: a, b1: c, b2: h } = this.dimension;
    return t >>= kt, s >>= kt, r >>= kt, t >= n && t <= o && s >= l && s <= a && r >= c && r <= h;
  }
  split() {
    const { hist: e, getColorIndex: t } = this.histogram, { r1: s, r2: r, g1: n, g2: o, b1: l, b2: a } = this.dimension, c = this.count();
    if (!c) return [];
    if (c === 1) return [this.clone()];
    const h = r - s + 1, u = o - n + 1, f = a - l + 1, d = Math.max(h, u, f);
    let g = null, w, b;
    w = b = 0;
    let C = null;
    if (d === h) {
      C = "r", g = new Uint32Array(r + 1);
      for (let k = s; k <= r; k++) {
        w = 0;
        for (let K = n; K <= o; K++)
          for (let Q = l; Q <= a; Q++) {
            const ae = t(k, K, Q);
            e[ae] && (w += e[ae]);
          }
        b += w, g[k] = b;
      }
    } else if (d === u) {
      C = "g", g = new Uint32Array(o + 1);
      for (let k = n; k <= o; k++) {
        w = 0;
        for (let K = s; K <= r; K++)
          for (let Q = l; Q <= a; Q++) {
            const ae = t(K, k, Q);
            e[ae] && (w += e[ae]);
          }
        b += w, g[k] = b;
      }
    } else {
      C = "b", g = new Uint32Array(a + 1);
      for (let k = l; k <= a; k++) {
        w = 0;
        for (let K = s; K <= r; K++)
          for (let Q = n; Q <= o; Q++) {
            const ae = t(K, Q, k);
            e[ae] && (w += e[ae]);
          }
        b += w, g[k] = b;
      }
    }
    let j = -1;
    const X = new Uint32Array(g.length);
    for (let k = 0; k < g.length; k++) {
      const K = g[k];
      K && (j < 0 && K > b / 2 && (j = k), X[k] = b - K);
    }
    const B = this;
    function H(k) {
      const K = k + "1", Q = k + "2", ae = B.dimension[K];
      let J = B.dimension[Q];
      const ri = B.clone(), ni = B.clone(), oi = j - ae, ai = J - j;
      for (oi <= ai ? (J = Math.min(J - 1, ~~(j + ai / 2)), J = Math.max(0, J)) : (J = Math.max(ae, ~~(j - 1 - oi / 2)), J = Math.min(B.dimension[Q], J)); !g[J]; ) J++;
      let li = X[J];
      for (; !li && g[J - 1]; ) li = X[--J];
      return ri.dimension[Q] = J, ni.dimension[K] = J + 1, [ri, ni];
    }
    return H(C);
  }
}
class Gi {
  _sort() {
    this._sorted || (this.contents.sort(this._comparator), this._sorted = !0);
  }
  constructor(e) {
    this._comparator = e, this.contents = [], this._sorted = !1;
  }
  push(e) {
    this.contents.push(e), this._sorted = !1;
  }
  peek(e) {
    return this._sort(), e = typeof e == "number" ? e : this.contents.length - 1, this.contents[e];
  }
  pop() {
    return this._sort(), this.contents.pop();
  }
  size() {
    return this.contents.length;
  }
  map(e) {
    return this._sort(), this.contents.map(e);
  }
}
const tl = 0.75;
function Yi(i, e) {
  let t = i.size();
  for (; i.size() < e; ) {
    const s = i.pop();
    if (s && s.count() > 0) {
      const [r, n] = s.split();
      if (!r || (i.push(r), n && n.count() > 0 && i.push(n), i.size() === t))
        break;
      t = i.size();
    } else
      break;
  }
}
const il = (i, e) => {
  if (i.length === 0 || e.colorCount < 2 || e.colorCount > 256)
    throw new Error("Wrong MMCQ parameters");
  const t = ut.build(i);
  t.histogram.colorCount;
  const s = new Gi((n, o) => n.count() - o.count());
  s.push(t), Yi(s, tl * e.colorCount);
  const r = new Gi(
    (n, o) => n.count() * n.volume() - o.count() * o.volume()
  );
  return r.contents = s.contents, Yi(r, e.colorCount - r.size()), sl(r);
};
function sl(i) {
  const e = [];
  for (; i.size(); ) {
    const t = i.pop(), s = t.avg(), [r, n, o] = s;
    e.push(new ne(s, t.count()));
  }
  return e;
}
const rl = {
  targetDarkLuma: 0.26,
  maxDarkLuma: 0.45,
  minLightLuma: 0.55,
  targetLightLuma: 0.74,
  minNormalLuma: 0.3,
  targetNormalLuma: 0.5,
  maxNormalLuma: 0.7,
  targetMutesSaturation: 0.3,
  maxMutesSaturation: 0.4,
  targetVibrantSaturation: 1,
  minVibrantSaturation: 0.35,
  weightSaturation: 3,
  weightLuma: 6.5,
  weightPopulation: 0.5
};
function nl(i) {
  let e = 0;
  return i.forEach((t) => {
    e = Math.max(e, t.population);
  }), e;
}
function ol(i, e) {
  return i.Vibrant === e || i.DarkVibrant === e || i.LightVibrant === e || i.Muted === e || i.DarkMuted === e || i.LightMuted === e;
}
function al(i, e, t, s, r, n, o) {
  function l(...c) {
    let h = 0, u = 0;
    for (let f = 0; f < c.length; f += 2) {
      const d = c[f], g = c[f + 1];
      !d || !g || (h += d * g, u += g);
    }
    return h / u;
  }
  function a(c, h) {
    return 1 - Math.abs(c - h);
  }
  return l(
    a(i, e),
    o.weightSaturation,
    a(t, s),
    o.weightLuma,
    r / n,
    o.weightPopulation
  );
}
function Pe(i, e, t, s, r, n, o, l, a, c) {
  let h = null, u = 0;
  return e.forEach((f) => {
    const [, d, g] = f.hsl;
    if (d >= l && d <= a && g >= r && g <= n && !ol(i, f)) {
      const w = al(
        d,
        o,
        g,
        s,
        f.population,
        t,
        c
      );
      (h === null || w > u) && (h = f, u = w);
    }
  }), h;
}
function ll(i, e, t) {
  const s = {
    Vibrant: null,
    DarkVibrant: null,
    LightVibrant: null,
    Muted: null,
    DarkMuted: null,
    LightMuted: null
  };
  return s.Vibrant = Pe(
    s,
    i,
    e,
    t.targetNormalLuma,
    t.minNormalLuma,
    t.maxNormalLuma,
    t.targetVibrantSaturation,
    t.minVibrantSaturation,
    1,
    t
  ), s.LightVibrant = Pe(
    s,
    i,
    e,
    t.targetLightLuma,
    t.minLightLuma,
    1,
    t.targetVibrantSaturation,
    t.minVibrantSaturation,
    1,
    t
  ), s.DarkVibrant = Pe(
    s,
    i,
    e,
    t.targetDarkLuma,
    0,
    t.maxDarkLuma,
    t.targetVibrantSaturation,
    t.minVibrantSaturation,
    1,
    t
  ), s.Muted = Pe(
    s,
    i,
    e,
    t.targetNormalLuma,
    t.minNormalLuma,
    t.maxNormalLuma,
    t.targetMutesSaturation,
    0,
    t.maxMutesSaturation,
    t
  ), s.LightMuted = Pe(
    s,
    i,
    e,
    t.targetLightLuma,
    t.minLightLuma,
    1,
    t.targetMutesSaturation,
    0,
    t.maxMutesSaturation,
    t
  ), s.DarkMuted = Pe(
    s,
    i,
    e,
    t.targetDarkLuma,
    0,
    t.maxDarkLuma,
    t.targetMutesSaturation,
    0,
    t.maxMutesSaturation,
    t
  ), s;
}
function cl(i, e, t) {
  if (!i.Vibrant && !i.DarkVibrant && !i.LightVibrant) {
    if (!i.DarkVibrant && i.DarkMuted) {
      let [s, r, n] = i.DarkMuted.hsl;
      n = t.targetDarkLuma, i.DarkVibrant = new ne(ge(s, r, n), 0);
    }
    if (!i.LightVibrant && i.LightMuted) {
      let [s, r, n] = i.LightMuted.hsl;
      n = t.targetDarkLuma, i.DarkVibrant = new ne(ge(s, r, n), 0);
    }
  }
  if (!i.Vibrant && i.DarkVibrant) {
    let [s, r, n] = i.DarkVibrant.hsl;
    n = t.targetNormalLuma, i.Vibrant = new ne(ge(s, r, n), 0);
  } else if (!i.Vibrant && i.LightVibrant) {
    let [s, r, n] = i.LightVibrant.hsl;
    n = t.targetNormalLuma, i.Vibrant = new ne(ge(s, r, n), 0);
  }
  if (!i.DarkVibrant && i.Vibrant) {
    let [s, r, n] = i.Vibrant.hsl;
    n = t.targetDarkLuma, i.DarkVibrant = new ne(ge(s, r, n), 0);
  }
  if (!i.LightVibrant && i.Vibrant) {
    let [s, r, n] = i.Vibrant.hsl;
    n = t.targetLightLuma, i.LightVibrant = new ne(ge(s, r, n), 0);
  }
  if (!i.Muted && i.Vibrant) {
    let [s, r, n] = i.Vibrant.hsl;
    n = t.targetMutesSaturation, i.Muted = new ne(ge(s, r, n), 0);
  }
  if (!i.DarkMuted && i.DarkVibrant) {
    let [s, r, n] = i.DarkVibrant.hsl;
    n = t.targetMutesSaturation, i.DarkMuted = new ne(ge(s, r, n), 0);
  }
  if (!i.LightMuted && i.LightVibrant) {
    let [s, r, n] = i.LightVibrant.hsl;
    n = t.targetMutesSaturation, i.LightMuted = new ne(ge(s, r, n), 0);
  }
}
const ul = ((i, e) => {
  e = Object.assign({}, rl, e);
  const t = nl(i), s = ll(i, t, e);
  return cl(s, t, e), s;
}), hl = new Ja().filter.register(
  "default",
  (i, e, t, s) => s >= 125 && !(i > 250 && e > 250 && t > 250)
).quantizer.register("mmcq", il).generator.register("default", ul);
ke.use(hl);
const dl = 4.5, ml = 150;
function Xi([i, e, t]) {
  const s = (r) => {
    const n = r / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * s(i) + 0.7152 * s(e) + 0.0722 * s(t);
}
function fl(i, e) {
  const [t, s] = [Xi(i), Xi(e)].sort((r, n) => n - r);
  return (t + 0.05) / (s + 0.05);
}
function pl(i) {
  if (!i.length) return;
  const e = [...i].sort((a, c) => c.population - a.population), t = e[0].rgb, s = (a) => fl(t, a) > dl;
  for (let a = 1; a < e.length; a++) {
    if (s(e[a].rgb)) return { background: t, foreground: e[a].rgb };
    for (let c = a + 1; c < e.length; c++)
      if (e[a].rgb.reduce((u, f, d) => u + Math.abs(f - e[c].rgb[d]), 0) <= ml && s(e[c].rgb))
        return { background: t, foreground: e[c].rgb };
  }
  const [r, n, o] = t, l = (r * 299 + n * 587 + o * 114) / 1e3;
  return { background: t, foreground: l < 200 ? [255, 255, 255] : [0, 0, 0] };
}
const Qi = (i) => `#${i.map((e) => Math.round(e).toString(16).padStart(2, "0")).join("")}`, Z = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  STOP: 4096,
  PLAY: 16384
}, Me = (i, e) => (Number(i.attributes.supported_features ?? 0) & e) !== 0, sr = (i) => !["off", "standby", "unavailable", "unknown"].includes(i.state);
function gl(i) {
  const e = i.state;
  if (e === "unavailable") return;
  const t = i.attributes.assumed_state === !0, s = (o) => Me(i, o);
  if (!sr(i) && !t)
    return s(Z.TURN_ON) ? [{ icon: "mdi:power-standby", action: "turn_on" }] : void 0;
  const r = [], n = e === "playing" || e === "paused" || t;
  if (t && s(Z.TURN_ON) && r.push({ icon: "mdi:power-on", action: "turn_on" }), s(Z.TURN_OFF) && r.push({ icon: t ? "mdi:power-off" : "mdi:power-standby", action: "turn_off" }), n && s(Z.PREVIOUS_TRACK) && r.push({ icon: "mdi:skip-previous", action: "media_previous_track" }), !t && e === "on" && (s(Z.PLAY) || s(Z.PAUSE)) && r.push({ icon: "mdi:play-pause", action: "media_play" }), (t || e === "paused" || e === "idle") && s(Z.PLAY) && r.push({ icon: "mdi:play", action: "media_play" }), (t || e === "playing") && s(Z.PAUSE) && r.push({ icon: "mdi:pause", action: "media_pause" }), n && s(Z.STOP) && r.push({ icon: "mdi:stop", action: "media_stop" }), n && s(Z.NEXT_TRACK) && r.push({ icon: "mdi:skip-next", action: "media_next_track" }), !!r.length)
    return !t && r.some((o) => o.action === "media_play" || o.action === "media_pause") ? r.filter((o) => o.action !== "media_stop") : r;
}
function _l(i) {
  const e = i.attributes;
  switch (e.media_content_type) {
    case "music":
    case "image":
      return e.media_artist ?? "";
    case "playlist":
      return e.media_playlist || e.media_artist || "";
    case "tvshow": {
      let t = e.media_series_title ?? "";
      return e.media_season && (t += ` S${e.media_season}`, e.media_episode && (t += `E${e.media_episode}`)), t;
    }
    case "channel":
      return e.media_channel ?? "";
    default:
      return e.app_name || "";
  }
}
function vl(i) {
  if (!i) return;
  const e = i.indexOf("?authSig=");
  let t = e > 0 ? i.slice(0, e) : i;
  return t.startsWith("http") && (t = decodeURIComponent(t.split("/").pop())), t;
}
function bl(i, e = Date.now()) {
  const t = Number(i.attributes.media_position ?? 0);
  if (i.state !== "playing") return t;
  const s = (e - new Date(String(i.attributes.media_position_updated_at)).getTime()) / 1e3, r = t + s;
  return r < 0 ? 0 : r;
}
const yl = (i) => (i.state === "playing" || i.state === "paused") && "media_duration" in i.attributes && "media_position" in i.attributes;
var wl = Object.defineProperty, fe = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && wl(e, t, r), r;
};
class he extends _e {
  constructor() {
    super(...arguments), this._narrow = !1, this._veryNarrow = !1, this._cardHeight = 0, this._marqueeActive = !1, this._marquee = !1;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Jl), document.createElement("horos-player-card-editor");
  }
  static getStubConfig(e) {
    return { entity: Object.keys(e.states).find((s) => s.startsWith("media_player.")) ?? "" };
  }
  setConfig(e) {
    if (!e.entity || e.entity.split(".")[0] !== "media_player")
      throw new Error("Specify an entity from within the media_player domain");
    this._config = e, this.updateComplete.then(() => this._measureCard());
  }
  getCardSize() {
    return 3;
  }
  connectedCallback() {
    super.connectedCallback(), pt().then(() => this.requestUpdate()), this._config && xl(this._config.entity).then((e) => this._marquee = e), this.updateComplete.then(() => this._attachObserver());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObserver?.disconnect(), this._stopInterval();
  }
  get _stateObj() {
    return this._config ? this.hass?.states[this._config.entity] : void 0;
  }
  render() {
    if (!this._config || !this.hass) return p;
    const e = this._stateObj;
    if (!e)
      return v`<hui-warning>${this._config.entity}</hui-warning>`;
    const t = this._imageOf(e), s = {
      "background-image": t ? `url(${this.hass.hassUrl(t)})` : "none",
      width: `${this._cardHeight}px`,
      "background-color": this._backgroundColor || ""
    }, r = {
      "background-image": `linear-gradient(to right, ${this._backgroundColor}, ${this._backgroundColor + "00"})`,
      width: `${this._cardHeight}px`
    }, n = e.state, o = !sr(e) && n !== "unavailable" && n !== "unknown", l = n === "unavailable" || o && !Me(e, Z.TURN_ON), a = !t, c = gl(e), h = !l && c && (!this._veryNarrow || o || n === "idle" || n === "on"), u = h && !o && Me(e, Z.VOLUME_SET), f = !this._narrow && yl(e), d = _l(e), g = vl(e.attributes.media_title), w = this._config.name ?? e.attributes.friendly_name ?? e.entity_id, b = e.attributes.is_volume_muted === !0;
    return v`
      <ha-card>
        <div
          class="background ${Ki({
      "no-image": a,
      off: o || l,
      unavailable: l
    })}"
        >
          <div
            class="color-block"
            style=${oe({ "background-color": this._backgroundColor || "" })}
          ></div>
          <div
            class="no-img"
            style=${oe({ "background-color": this._backgroundColor || "" })}
          ></div>
          <div class="image" style=${oe(s)}></div>
          ${a ? "" : v`<div class="color-gradient" style=${oe(r)}></div>`}
        </div>
        <div
          class="player ${Ki({
      "no-image": a,
      narrow: this._narrow && !this._veryNarrow,
      off: o || l,
      "no-progress": this._veryNarrow || !f,
      "no-controls": !h
    })}"
          style=${oe({ color: this._foregroundColor || "" })}
        >
          <div class="top-info">
            <div class="icon-name">
              <ha-state-icon
                class="icon"
                .hass=${this.hass}
                .stateObj=${e}
              ></ha-state-icon>
              <div>${w}</div>
            </div>
            <div>
              <ha-icon-button
                .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
                class="more-info"
                @click=${this._handleMoreInfo}
              >
                <ha-icon icon="mdi:dots-vertical"></ha-icon>
              </ha-icon-button>
            </div>
          </div>
          ${!l && (d || g || h) ? v`
                <div>
                  <div class="title-controls">
                    ${!d && !g ? "" : v`
                          <div class="media-info">
                            ${this._marquee ? v`<hui-marquee
                                  .text=${g || d}
                                  .active=${this._marqueeActive}
                                  @mouseover=${this._marqueeMouseOver}
                                  @mouseleave=${this._marqueeMouseLeave}
                                ></hui-marquee>` : v`<div class="title">
                                  ${g || d}
                                </div>`}
                            ${g ? d : ""}
                          </div>
                        `}
                    ${h ? v`
                          <div class="controls">
                            <div class="start">
                              ${c.map(
      (C) => v`
                                  <ha-icon-button
                                    .label=${this.hass.localize(
        `ui.card.media_player.${C.action}`
      )}
                                    action=${C.action}
                                    @click=${this._handleClick}
                                  >
                                    <ha-icon .icon=${C.icon}></ha-icon>
                                  </ha-icon-button>
                                `
    )}
                            </div>
                            ${u ? v`<div class="volume">
                                  ${Me(e, Z.VOLUME_MUTE) ? v`<ha-icon-button
                                        class="mute"
                                        .label=${this.hass.localize(
      "ui.card.media_player.media_volume_mute"
    )}
                                        @click=${this._handleMute}
                                      >
                                        <ha-icon
                                          .icon=${b ? "mdi:volume-off" : "mdi:volume-high"}
                                        ></ha-icon>
                                      </ha-icon-button>` : v`<ha-icon
                                        class="mute"
                                        icon="mdi:volume-high"
                                      ></ha-icon>`}
                                  <ha-slider
                                    class="volume-bar"
                                    min="0"
                                    max="100"
                                    step="1"
                                    labeled
                                    .value=${Math.round(
      Number(e.attributes.volume_level ?? 0) * 100
    )}
                                    style=${oe({
      "--ha-slider-indicator-color": this._foregroundColor || "var(--accent-color)"
    })}
                                    @change=${this._handleVolume}
                                  ></ha-slider>
                                </div>` : p}
                          </div>
                        ` : ""}
                  </div>
                  ${f ? v`
                        <ha-slider
                          class="progress"
                          min="0"
                          max=${Number(e.attributes.media_duration) || 0}
                          step="1"
                          style=${oe({
      "--ha-slider-indicator-color": this._foregroundColor || "var(--accent-color)",
      cursor: Me(e, Z.SEEK) ? "pointer" : "initial"
    })}
                          @change=${this._handleSeek}
                        ></ha-slider>
                      ` : ""}
                </div>
              ` : ""}
        </div>
      </ha-card>
    `;
  }
  firstUpdated() {
    this._attachObserver(), this._measureCard();
  }
  updated(e) {
    super.updated(e);
    const t = this._stateObj, s = t ? this._imageOf(t) : void 0;
    s !== this._image && (this._image = s, s ? this._setColors(s) : (this._foregroundColor = void 0, this._backgroundColor = void 0)), this._writeProgress(), this._syncInterval();
  }
  _imageOf(e) {
    return e.attributes.entity_picture_local || e.attributes.entity_picture;
  }
  async _setColors(e) {
    try {
      const t = new ke(this.hass.hassUrl(e), { colorCount: 16 });
      await t.getPalette();
      const s = pl(t.result?.colors ?? []);
      if (this._image !== e) return;
      this._backgroundColor = s ? Qi(s.background) : void 0, this._foregroundColor = s ? Qi(s.foreground) : void 0;
    } catch {
      this._foregroundColor = void 0, this._backgroundColor = void 0;
    }
  }
  /** The stock controller owns the bar's value: written here, never bound, so a drag is not undone. */
  _writeProgress() {
    const e = this._progressBar, t = this._stateObj;
    !e || !t || e.customStates?.has("dragging") || (e.value = bl(t));
  }
  _syncInterval() {
    const e = this._stateObj, t = e?.state === "playing" && e.attributes.media_duration && e.attributes.media_position !== void 0;
    t && !this._interval ? this._interval = setInterval(() => this._writeProgress(), 1e3) : t || this._stopInterval();
  }
  _stopInterval() {
    this._interval && clearInterval(this._interval), this._interval = void 0;
  }
  _measureCard() {
    const e = this.shadowRoot?.querySelector("ha-card");
    e && (this._narrow = e.offsetWidth < 350, this._veryNarrow = e.offsetWidth < 300, this._cardHeight = e.offsetHeight);
  }
  async _attachObserver() {
    if (!this._resizeObserver) {
      let t;
      this._resizeObserver = new ResizeObserver(() => {
        clearTimeout(t), t = setTimeout(() => this._measureCard(), 250);
      });
    }
    const e = this.shadowRoot?.querySelector("ha-card");
    e && this._resizeObserver.observe(e);
  }
  _call(e, t = {}) {
    !this.hass || !this._config || this.hass.callService("media_player", e, { entity_id: this._config.entity, ...t }).catch(() => {
    });
  }
  _handleMoreInfo() {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config?.entity },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleClick(e) {
    this._call(e.currentTarget.getAttribute("action"));
  }
  _handleMute() {
    this._call("volume_mute", {
      is_volume_muted: this._stateObj?.attributes.is_volume_muted !== !0
    });
  }
  _handleVolume(e) {
    this._call("volume_set", { volume_level: Number(e.target.value) / 100 });
  }
  _handleSeek() {
    const e = this._stateObj;
    !e || !Me(e, Z.SEEK) || this._call("media_seek", { seek_position: this._progressBar?.value ?? 0 });
  }
  _marqueeMouseOver() {
    this._marqueeActive || (this._marqueeActive = !0);
  }
  _marqueeMouseLeave() {
    this._marqueeActive && (this._marqueeActive = !1);
  }
  static {
    this.styles = ce`
    ha-card {
      overflow: hidden;
      height: 100%;
    }

    .background {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: filter 0.8s;
    }

    .color-block {
      background-color: var(--primary-color);
      transition: background-color 0.8s;
      width: 100%;
    }

    .color-gradient {
      position: absolute;
      background-image: linear-gradient(to right, var(--primary-color), transparent);
      height: 100%;
      right: 0;
      opacity: 1;
      transition:
        width 0.8s,
        opacity 0.8s linear 0.8s;
    }

    .image {
      background-color: var(--primary-color);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      height: 100%;
      opacity: 1;
      transition:
        width 0.8s,
        background-image 0.8s,
        background-color 0.8s,
        background-size 0.8s,
        opacity 0.8s linear 0.8s;
    }

    .no-image .image {
      opacity: 0;
    }

    .no-img {
      background-color: var(--primary-color);
      background-size: initial;
      background-repeat: no-repeat;
      background-position: center center;
      padding-bottom: 0;
      position: absolute;
      right: 0;
      height: 100%;
      background-image: url("/static/images/card_media_player_bg.png");
      width: 50%;
      transition:
        opacity 0.8s,
        background-color 0.8s;
    }

    .off .image,
    .off .color-gradient {
      opacity: 0;
      transition:
        opacity 0s,
        width 0.8s;
      width: 0;
    }

    .unavailable .no-img,
    .background:not(.off):not(.no-image) .no-img {
      opacity: 0;
    }

    .player {
      position: relative;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--text-primary-color);
      transition-property: color, padding;
      transition-duration: 0.4s;
    }

    .controls {
      padding: 8px 8px 8px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: padding, color;
      transition-duration: 0.4s;
      margin-left: -12px;
      margin-inline-start: -12px;
      margin-inline-end: initial;
      padding-inline-start: 0;
      padding-inline-end: 8px;
      direction: ltr;
    }

    .controls > div {
      display: flex;
      align-items: center;
    }

    .controls > .start {
      flex-grow: 1;
    }

    .controls ha-icon-button {
      --ha-icon-button-size: 44px;
      --mdc-icon-size: 30px;
    }

    ha-icon-button[action="media_play"],
    ha-icon-button[action="media_play_pause"],
    ha-icon-button[action="media_pause"],
    ha-icon-button[action="media_stop"] {
      --ha-icon-button-size: 56px;
      --mdc-icon-size: 40px;
    }

    .top-info {
      display: flex;
      justify-content: space-between;
    }

    .icon-name {
      display: flex;
      height: fit-content;
      align-items: center;
    }

    .icon-name ha-state-icon {
      padding-right: 8px;
      padding-inline-start: initial;
      padding-inline-end: 8px;
      direction: var(--direction);
    }

    .more-info {
      position: absolute;
      top: 4px;
      right: 4px;
      inset-inline-start: initial;
      inset-inline-end: 4px;
      direction: var(--direction);
    }

    .media-info {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    hui-marquee,
    .title {
      font-size: 1.2em;
      margin: 0px 0 4px;
    }

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title-controls {
      padding-top: 16px;
    }

    ha-slider {
      --track-size: 8px;
      width: 100%;
      --ha-slider-track-color: rgba(200, 200, 200, 0.5);
    }

    ha-slider::part(thumb) {
      display: none;
    }

    /*
     * The one addition: the volume, at the end of the button row where the
     * stock card keeps its secondary buttons, drawn as its progress bar is.
     * On a card too narrow for both it wraps under the buttons.
     */
    .controls {
      flex-wrap: wrap;
    }

    .controls > .volume {
      flex: 1 1 140px;
      max-width: 50%;
      min-width: 140px;
      --mdc-icon-size: 24px;
    }

    .narrow .controls > .volume {
      max-width: none;
    }

    .volume .mute {
      flex: none;
      --ha-icon-button-size: 44px;
      --mdc-icon-size: 24px;
    }

    ha-icon.mute {
      display: flex;
      justify-content: center;
      width: 44px;
    }

    .volume-bar {
      flex: 1;
      min-width: 0;
    }

    .no-image .controls {
      padding: 0;
    }

    .off.background {
      filter: grayscale(1);
    }

    .narrow .controls,
    .no-progress .controls {
      padding-bottom: 0;
    }

    .narrow ha-icon-button {
      --ha-icon-button-size: 40px;
      --mdc-icon-size: 28px;
    }

    .narrow ha-icon-button[action="media_play"],
    .narrow ha-icon-button[action="media_play_pause"],
    .narrow ha-icon-button[action="media_pause"],
    .narrow ha-icon-button[action="media_stop"] {
      --ha-icon-button-size: 50px;
      --mdc-icon-size: 36px;
    }

    .no-progress.player:not(.no-controls) {
      padding-bottom: 0px;
    }
  `;
  }
}
fe([
  re({ attribute: !1 })
], he.prototype, "hass");
fe([
  x()
], he.prototype, "_config");
fe([
  x()
], he.prototype, "_foregroundColor");
fe([
  x()
], he.prototype, "_backgroundColor");
fe([
  x()
], he.prototype, "_narrow");
fe([
  x()
], he.prototype, "_veryNarrow");
fe([
  x()
], he.prototype, "_cardHeight");
fe([
  x()
], he.prototype, "_marqueeActive");
fe([
  x()
], he.prototype, "_marquee");
fe([
  ns("ha-slider.progress")
], he.prototype, "_progressBar");
let Ji;
function xl(i) {
  return customElements.get("hui-marquee") ? Promise.resolve(!0) : (Ji ??= (async () => {
    const e = window.loadCardHelpers;
    try {
      (await e?.())?.createCardElement?.({ type: "media-control", entity: i });
    } catch {
    }
    return Promise.race([
      customElements.whenDefined("hui-marquee").then(() => !0),
      new Promise((t) => setTimeout(() => t(!1), 5e3))
    ]);
  })(), Ji);
}
S("horos-player-card", he, {
  type: "horos-player-card",
  name: { ru: "Плеер", en: "Player" },
  description: {
    ru: "Стандартная карточка медиа с полосой громкости",
    en: "The stock media card with a volume bar"
  },
  preview: !0
});
console.info(
  "%c HOROS-CARDS %c 0.7.0 ",
  "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
  "background:#555;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
);
var $l = Object.defineProperty, si = (i, e, t, s) => {
  for (var r = void 0, n = i.length - 1, o; n >= 0; n--)
    (o = i[n]) && (r = o(e, t, r) || r);
  return r && $l(e, t, r), r;
};
class Qe extends _e {
  constructor() {
    super(...arguments), this._computeHelper = (e) => e.name === "color" ? this.pick({
      ru: {
        color: "Неактивное состояние (например, off или closed) окрашено не будет."
      },
      en: {
        color: "Inactive state (for example, off or closed) will not be coloured."
      }
    }).color : void 0, this._computeLabel = (e) => this.labels[e.name] ?? this.pick({ ru: O, en: P })[e.name] ?? e.name;
  }
  static {
    this.styles = ce`
    ha-form {
      display: block;
      margin-bottom: var(--ha-space-6, 24px);
    }

    ha-expansion-panel {
      display: block;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-border-radius-md, 12px);
      --ha-card-border-radius: var(--ha-border-radius-md, 12px);
    }

    ha-expansion-panel .content {
      padding: var(--ha-space-3, 12px);
    }

    ha-expansion-panel > *[slot="header"] {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }

    ha-expansion-panel ha-icon,
    ha-expansion-panel ha-svg-icon {
      color: var(--secondary-text-color);
    }

    /* The features position selector sits inside the panel, not after it. */
    .features-form {
      margin-top: var(--ha-space-6, 24px);
      margin-bottom: 0;
    }
  `;
  }
  setConfig(e) {
    this._config = e;
  }
  /** What to show the form. The config itself by default. */
  get formData() {
    return this._config ?? {};
  }
  /** What to put into the config from the form. */
  fromForm(e) {
    return e;
  }
  /**
   * Labels in the user's language. They are kept as a pair right next to the card
   * rather than in a shared dictionary: the same field is called differently on
   * different cards — "Battery", "Sensor battery", "Main device battery".
   */
  pick(e) {
    return $(this.hass) === "ru" ? e.ru : e.en;
  }
  fireConfigChanged(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _valueChanged(e) {
    e.stopPropagation(), this.fireConfigChanged(
      this.fromForm(e.detail.value)
    );
  }
  renderForm() {
    return !this.hass || !this._config ? p : v`
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${this.schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  render() {
    return this.renderForm();
  }
}
si([
  re({ attribute: !1 })
], Qe.prototype, "hass");
si([
  x()
], Qe.prototype, "_config");
class A extends Qe {
  constructor() {
    super(...arguments), this._featuresEditorReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Tn().then((e) => {
      this._featuresEditorReady = e;
    });
  }
  /**
   * The form shows the layout as pictures (content_layout) while the config holds
   * a boolean vertical — exactly as in the stock tile's editor.
   */
  get formData() {
    const { vertical: e, ...t } = this._config ?? {};
    return {
      ...t,
      content_layout: e ? "vertical" : "horizontal"
    };
  }
  /**
   * What the card puts under the line when the config says nothing about it.
   * The editor shows those as the current list — that is what makes them
   * switchable: a card's own controls are removed the same way a stock feature
   * is, and there is no second switch for them anywhere else.
   */
  defaultFeatures() {
    return [];
  }
  /** Where the card puts its features when the config says nothing. */
  defaultFeaturesPosition() {
    return "bottom";
  }
  _featuresChanged(e) {
    e.stopPropagation(), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: {
          config: { ...this._config, features: e.detail.features }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * A feature with settings of its own — a gauge's bounds, the list of modes —
   * is edited in a sub-view of the card dialog. The dialog opens it in response
   * to `edit-sub-element`; without this the pencil on a feature does nothing.
   */
  _editFeature(e) {
    e.stopPropagation();
    const t = e.detail.subElementConfig?.index;
    if (t === void 0) return;
    const s = this._config?.features ?? this.defaultFeatures();
    this.dispatchEvent(
      new CustomEvent("edit-sub-element", {
        detail: {
          type: "feature",
          config: s[t],
          context: { entity_id: this.featuresEntity },
          saveConfig: (r) => {
            const n = [...s];
            n[t] = r, this.dispatchEvent(
              new CustomEvent("config-changed", {
                detail: { config: { ...this._config, features: n } },
                bubbles: !0,
                composed: !0
              })
            );
          }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  fromForm(e) {
    const { content_layout: t, ...s } = e, r = { ...s };
    return t === "vertical" && (r.vertical = !0), r;
  }
  /** The features section repeats the markup of the stock tile's editor. */
  /**
   * The entity the features act on. Usually the card's main one; a card built
   * from a list of equal entities has to name one itself, or the panel has
   * nothing to address the features to and stays hidden.
   */
  get featuresEntity() {
    return this.entityField ? this._config?.[this.entityField] : void 0;
  }
  _renderFeatures() {
    const e = this.featuresEntity;
    if (!e) return p;
    const t = this._config?.features ?? this.defaultFeatures(), s = this.pick({ ru: O, en: P }), r = this.pick({
      ru: {
        bottom: "Снизу",
        bottom_description: "Все features друг под другом",
        inline: "В строке",
        inline_description: "Features в две колонки, начиная со строки с названием",
        helper_vertical: "При вертикальном содержимом всегда отображаются снизу"
      },
      en: {
        bottom: "Bottom",
        bottom_description: "Displays all features stacked",
        inline: "Inline",
        inline_description: "Displays features in two columns, starting next to the name",
        helper_vertical: "Always displayed at the bottom if the content layout is vertical"
      }
    }), n = (a, c) => this.hass?.localize(`ui.panel.lovelace.editor.card.tile.${a}`) || c, o = !!this._config?.vertical, l = {
      ...this._config,
      features_position: o ? "bottom" : this._config?.features_position ?? this.defaultFeaturesPosition()
    };
    return v`
      <ha-expansion-panel outlined>
        <ha-icon slot="leading-icon" icon="mdi:list-box"></ha-icon>
        <h3 slot="header">${s.features}</h3>
        <div class="content">
          <hui-card-features-editor
            .hass=${this.hass}
            .context=${{ entity_id: e }}
            .features=${t}
            @features-changed=${this._featuresChanged}
            @edit-detail-element=${this._editFeature}
          ></hui-card-features-editor>
          ${t.length ? v`
                <ha-form
                  class="features-form"
                  .hass=${this.hass}
                  .data=${l}
                  .schema=${[
      {
        name: "features_position",
        required: !0,
        selector: {
          select: {
            mode: "box",
            options: ["bottom", "inline"].map(
              (a) => ({
                value: a,
                label: n(
                  `features_position_options.${a}`,
                  r[a]
                ),
                description: n(
                  `features_position_options.${a}_description`,
                  r[`${a}_description`]
                ),
                image: {
                  src: `/static/images/form/tile_features_position_${a}.svg`,
                  src_dark: `/static/images/form/tile_features_position_${a}_dark.svg`,
                  flip_rtl: !0
                },
                disabled: o && a === "inline"
              })
            )
          }
        }
      }
    ]}
                  .computeLabel=${this._computeLabel}
                  .computeHelper=${() => o ? n(
      "features_position_helper_vertical",
      r.helper_vertical
    ) : void 0}
                  @value-changed=${this._valueChanged}
                ></ha-form>
              ` : p}
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return !this.hass || !this._config ? p : v`
      ${this.renderForm()}
      ${this._featuresEditorReady ? this._renderFeatures() : p}
    `;
  }
}
si([
  x()
], A.prototype, "_featuresEditorReady");
const R = (i, e, t = []) => ({
  name: "content",
  type: "expandable",
  flatten: !0,
  icon: "mdi:text-short",
  schema: [
    i ? {
      name: "name",
      selector: { entity_name: {} },
      context: { entity: i }
    } : { name: "name", selector: { text: {} } },
    {
      name: "",
      type: "grid",
      schema: [
        {
          name: "icon",
          selector: { icon: {} },
          ...i ? { context: { icon_entity: i } } : {}
        },
        {
          name: "color",
          // include_state is mandatory: without it the value "state" counts as
          // invalid and the field is highlighted as an error.
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "show_entity_picture", selector: { boolean: {} } },
        { name: "hide_state", selector: { boolean: {} } }
      ]
    },
    ...i ? [
      {
        name: "state_content",
        selector: { ui_state_content: { allow_context: !0 } },
        context: { filter_entity: i }
      },
      { name: "time_format", selector: { ui_time_format: {} } }
    ] : [],
    {
      name: "content_layout",
      required: !0,
      selector: {
        select: {
          mode: "box",
          options: [
            {
              value: "horizontal",
              label: e === "ru" ? "Горизонтальная" : "Horizontal",
              image: {
                src: "/static/images/form/tile_content_layout_horizontal.svg",
                src_dark: "/static/images/form/tile_content_layout_horizontal_dark.svg",
                flip_rtl: !0
              }
            },
            {
              value: "vertical",
              label: e === "ru" ? "Вертикальная" : "Vertical",
              image: {
                src: "/static/images/form/tile_content_layout_vertical.svg",
                src_dark: "/static/images/form/tile_content_layout_vertical_dark.svg",
                flip_rtl: !0
              }
            }
          ]
        }
      }
    },
    ...t
  ]
}), Et = (i) => i ? { entity_id: i, area_id: "area" } : void 0, M = (i, e) => ({
  name: "interactions",
  type: "expandable",
  flatten: !0,
  icon: "mdi:gesture-tap",
  schema: [
    {
      name: "tap_action",
      selector: { ui_action: { default_action: "more-info" } },
      context: Et(i)
    },
    { name: "", type: "divider" },
    {
      name: "icon_tap_action",
      selector: { ui_action: { default_action: e } },
      context: Et(i)
    },
    {
      name: "",
      type: "optional_actions",
      flatten: !0,
      schema: [
        "hold_action",
        "icon_hold_action",
        "double_tap_action",
        "icon_double_tap_action"
      ].map((t) => ({
        name: t,
        selector: { ui_action: { default_action: "none" } },
        context: Et(i)
      }))
    }
  ]
}), O = {
  content: "Содержимое",
  state_content: "Что показывать про сущность",
  time_format: "Формат времени",
  interactions: "Взаимодействия",
  icon: "Иконка",
  color: "Цвет",
  content_layout: "Раскладка",
  show_entity_picture: "Показывать картинку сущности",
  hide_state: "Скрыть состояние",
  features: "Features",
  features_position: "Расположение features",
  tap_action: "Тап по карточке",
  hold_action: "Долгое нажатие на карточку",
  double_tap_action: "Двойной тап по карточке",
  icon_tap_action: "Тап по иконке",
  icon_hold_action: "Долгое нажатие на иконку",
  icon_double_tap_action: "Двойной тап по иконке"
}, P = {
  content: "Content",
  state_content: "State content",
  time_format: "Time format",
  interactions: "Interactions",
  icon: "Icon",
  color: "Colour",
  content_layout: "Layout",
  show_entity_picture: "Show entity picture",
  hide_state: "Hide state",
  features: "Features",
  features_position: "Features position",
  tap_action: "Tap on card",
  hold_action: "Hold on card",
  double_tap_action: "Double tap on card",
  icon_tap_action: "Tap on icon",
  icon_hold_action: "Hold on icon",
  icon_double_tap_action: "Double tap on icon"
}, y = (i, e) => ({
  entity: {
    filter: e ? { domain: i, device_class: e } : { domain: i }
  }
}), se = (i, e, t) => ({
  number: { min: i, max: e, mode: "box", unit_of_measurement: t }
}), rr = { text: {} }, pe = (i) => ({
  select: { multiple: !0, mode: "list", options: i }
}), U = { boolean: {} };
class nr extends A {
  get entityField() {
    return "temperature";
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "temperature",
        required: !0,
        selector: y("sensor", "temperature")
      },
      { name: "humidity", selector: y("sensor", "humidity") },
      {
        name: "illuminance",
        selector: y("sensor", "illuminance")
      },
      { name: "pm25", selector: y("sensor", "pm25") },
      { name: "co2", selector: y("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: y("sensor", "volatile_organic_compounds")
      },
      { name: "aqi", selector: y("sensor", "aqi") },
      { name: "air_rows", selector: U },
      R("temperature", e, [
        {
          name: "big_values",
          selector: pe([
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "illuminance", label: e === "ru" ? "Освещённость" : "Illuminance" },
            { value: "pm25", label: "PM2.5" }
          ])
        }
      ]),
      M("temperature", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return St(this.hass, e);
  }
  get labels() {
    return this.pick({
      ru: {
        name: "Название",
        temperature: "Температура",
        humidity: "Влажность",
        illuminance: "Освещённость",
        pm25: "PM2.5",
        co2: "CO₂",
        voc: "Летучие органические соединения",
        aqi: "Индекс качества воздуха",
        air_rows: "Строки качества воздуха (хорошо, так себе, плохо)",
        big_values: "Крупно справа (не больше двух)"
      },
      en: {
        name: "Name",
        temperature: "Temperature",
        humidity: "Humidity",
        illuminance: "Illuminance",
        pm25: "PM2.5",
        co2: "CO₂",
        voc: "VOCs",
        aqi: "Air quality index",
        air_rows: "Air quality rows (good, fair, poor)",
        big_values: "Large on the right (up to two)"
      }
    });
  }
}
T("horos-climate-tile-editor", nr);
const kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosClimateTileEditor: nr
}, Symbol.toStringTag, { value: "Module" }));
class or extends A {
  get entityField() {
    return "switch";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "switch", required: !0, selector: y("switch") },
      { name: "power", selector: y("sensor", "power") },
      { name: "energy", selector: y("sensor", "energy") },
      R("switch", e, [
        {
          name: "big_values",
          selector: pe([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" },
            { value: "switch", label: e === "ru" ? "Состояние" : "State" }
          ])
        }
      ]),
      M("switch", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return Tt(e);
  }
  get labels() {
    return this.pick({
      ru: {
        name: "Название",
        switch: "Выключатель",
        power: "Мощность",
        energy: "Энергия",
        big_values: "Крупно справа (не больше двух)"
      },
      en: {
        name: "Name",
        switch: "Switch",
        power: "Power",
        energy: "Energy",
        big_values: "Large on the right (up to two)"
      }
    });
  }
}
T("horos-plug-tile-editor", or);
const El = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlugTileEditor: or
}, Symbol.toStringTag, { value: "Module" }));
class ar extends A {
  get entityField() {
    return "moisture";
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "moisture",
        required: !0,
        selector: y("sensor", "moisture")
      },
      {
        name: "temperature",
        selector: y("sensor", "temperature")
      },
      { name: "battery", selector: y("sensor", "battery") },
      { name: "dry_below", selector: se(0, 100, "%") },
      { name: "wet_above", selector: se(0, 100, "%") },
      R("moisture", e, [
        {
          name: "big_values",
          selector: pe([
            { value: "moisture", label: e === "ru" ? "Влажность почвы" : "Soil moisture" },
            { value: "temperature", label: e === "ru" ? "Температура почвы" : "Soil temperature" },
            { value: "battery", label: e === "ru" ? "Заряд датчика" : "Sensor battery" }
          ])
        }
      ]),
      M("moisture", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return Ot(this.hass, e);
  }
  get labels() {
    return this.pick({
      ru: {
        name: "Название",
        moisture: "Влажность почвы",
        temperature: "Температура почвы",
        battery: "Заряд датчика",
        dry_below: "Ниже этого — сухо",
        wet_above: "Выше этого — залито",
        big_values: "Крупно справа (не больше двух)"
      },
      en: {
        name: "Name",
        moisture: "Soil moisture",
        temperature: "Soil temperature",
        battery: "Sensor battery",
        dry_below: "Dry below",
        wet_above: "Wet above",
        big_values: "Large on the right (up to two)"
      }
    });
  }
}
T("horos-plant-tile-editor", ar);
const Cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlantTileEditor: ar
}, Symbol.toStringTag, { value: "Module" }));
function N(i, e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of i ?? [])
    t.set(typeof s == "string" ? s : s.entity, s);
  return e.map((s) => t.get(s) ?? s);
}
function L(i) {
  return (i ?? []).map(
    (e) => typeof e == "string" ? e : e.entity
  );
}
class lr extends Qe {
  get schema() {
    return [
      { name: "name", selector: rr },
      { name: "icon", selector: { icon: {} } },
      { name: "columns", selector: se(1, 6) },
      {
        name: "buttons",
        required: !0,
        selector: {
          entity: {
            multiple: !0,
            filter: [
              { domain: "script" },
              { domain: "scene" },
              { domain: "button" },
              { domain: "input_button" },
              { domain: "switch" }
            ]
          }
        }
      }
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Заголовок",
        columns: "Кнопок в ряд",
        buttons: "Кнопки"
      },
      en: {
        ...P,
        name: "Heading",
        columns: "Buttons per row",
        buttons: "Buttons"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      buttons: L(e.buttons)
    };
  }
  fromForm(e) {
    return {
      ...e,
      buttons: N(
        this._config?.buttons,
        e.buttons ?? []
      )
    };
  }
}
T("horos-buttons-tile-editor", lr);
const Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosButtonsTileEditor: lr
}, Symbol.toStringTag, { value: "Module" }));
class cr extends A {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "icon", selector: { icon: {} } },
      { name: "status", selector: y("sensor") },
      {
        name: "cartridges",
        required: !0,
        selector: {
          entity: { multiple: !0, filter: [{ domain: "sensor" }] }
        }
      },
      {
        name: "low_below",
        selector: {
          number: { min: 0, max: 100, mode: "box", unit_of_measurement: "%" }
        }
      },
      {
        name: "sensors",
        selector: { entity: { multiple: !0 } }
      },
      R("status", e, [
        { name: "levels", selector: U }
      ]),
      M("status", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки уровней",
        name: "Название принтера",
        status: "Состояние принтера",
        cartridges: "Картриджи",
        low_below: "Мало чернил ниже",
        sensors: "Прочее про принтер"
      },
      en: {
        ...P,
        levels: "Level rows",
        name: "Printer name",
        status: "Printer status",
        cartridges: "Cartridges",
        low_below: "Low ink below",
        sensors: "Other printer sensors"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      cartridges: L(e.cartridges),
      sensors: L(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      cartridges: N(
        this._config?.cartridges,
        e.cartridges ?? []
      ),
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
T("horos-printer-tile-editor", cr);
const Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPrinterTileEditor: cr
}, Symbol.toStringTag, { value: "Module" }));
class ur extends A {
  get entityField() {
    return "vacuum";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "vacuum", required: !0, selector: y("vacuum") },
      { name: "battery", selector: y("sensor", "battery") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "consumables", selector: { entity: { multiple: !0 } } },
      { name: "low_below", selector: se(0, 100, "%") },
      R("vacuum", e, [
        { name: "levels", selector: U }
      ]),
      M("vacuum", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки уровней",
        name: "Название",
        vacuum: "Пылесос",
        battery: "Заряд",
        sensors: "Что ещё сказать",
        consumables: "Расходники",
        low_below: "Просит замены ниже"
      },
      en: {
        ...P,
        levels: "Level rows",
        name: "Name",
        vacuum: "Vacuum",
        battery: "Battery",
        sensors: "What else to show",
        consumables: "Consumables",
        low_below: "Needs replacing below"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      sensors: L(e.sensors),
      consumables: L(e.consumables)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      ),
      consumables: N(
        this._config?.consumables,
        e.consumables ?? []
      )
    };
  }
}
T("horos-vacuum-tile-editor", ur);
const Al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosVacuumTileEditor: ur
}, Symbol.toStringTag, { value: "Module" }));
class hr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "batteries",
        required: !0,
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "battery" }]
          }
        }
      },
      { name: "low_below", selector: se(0, 100, "%") },
      R(void 0, e),
      M(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        batteries: "Батарейки",
        low_below: "Показывать ниже"
      },
      en: {
        ...P,
        name: "Name",
        batteries: "Batteries",
        low_below: "Show below"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      batteries: L(e.batteries)
    };
  }
  fromForm(e) {
    return {
      ...e,
      batteries: N(
        this._config?.batteries,
        e.batteries ?? []
      )
    };
  }
}
T("horos-batteries-tile-editor", hr);
const Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosBatteriesTileEditor: hr
}, Symbol.toStringTag, { value: "Module" }));
class dr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "sensors",
        required: !0,
        selector: { entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] } }
      },
      R(void 0, e),
      M(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        sensors: "Датчики"
      },
      en: {
        ...P,
        name: "Name",
        sensors: "Sensors"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      sensors: L(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
T("horos-safety-tile-editor", dr);
const Pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosSafetyTileEditor: dr
}, Symbol.toStringTag, { value: "Module" }));
class mr extends A {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "disk", selector: y("sensor", "data_size") },
      { name: "download", selector: y("sensor", "data_rate") },
      { name: "upload", selector: y("sensor", "data_rate") },
      { name: "services", selector: { entity: { multiple: !0 } } },
      R("status", e),
      M("status", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        status: "Состояние",
        disk: "Свободное место",
        download: "Скорость приёма",
        upload: "Скорость отдачи",
        services: "Что ещё сказать"
      },
      en: {
        ...P,
        name: "Name",
        status: "Status",
        disk: "Free space",
        download: "Download speed",
        upload: "Upload speed",
        services: "What else to show"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      services: L(e.services)
    };
  }
  fromForm(e) {
    return {
      ...e,
      services: N(
        this._config?.services,
        e.services ?? []
      )
    };
  }
}
T("horos-server-tile-editor", mr);
const Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosServerTileEditor: mr
}, Symbol.toStringTag, { value: "Module" }));
class fr extends A {
  get entityField() {
    return "person";
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "person",
        required: !0,
        selector: {
          entity: {
            filter: [{ domain: "person" }, { domain: "device_tracker" }]
          }
        }
      },
      { name: "battery", selector: y("sensor", "battery") },
      { name: "location", selector: y("sensor") },
      {
        name: "devices",
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "battery" }]
          }
        }
      },
      R("person", e, [
        { name: "levels", selector: U }
      ]),
      M("person", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки устройств",
        name: "Имя",
        person: "Человек",
        battery: "Заряд основного устройства",
        location: "Где именно",
        devices: "Остальные устройства"
      },
      en: {
        ...P,
        levels: "Device rows",
        name: "Name",
        person: "Person",
        battery: "Main device battery",
        location: "Location",
        devices: "Other devices"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      devices: L(e.devices)
    };
  }
  fromForm(e) {
    return {
      ...e,
      devices: N(
        this._config?.devices,
        e.devices ?? []
      )
    };
  }
}
T("horos-person-tile-editor", fr);
const Rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPersonTileEditor: fr
}, Symbol.toStringTag, { value: "Module" }));
class pr extends A {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "cpu", selector: y("sensor") },
      { name: "memory", selector: y("sensor") },
      { name: "gpu", selector: y("sensor") },
      {
        name: "temperatures",
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "temperature" }]
          }
        }
      },
      { name: "disks", selector: { entity: { multiple: !0 } } },
      { name: "disk_rows", selector: U },
      { name: "color_by_load", selector: U },
      { name: "disks_free", selector: { entity: { multiple: !0 } } },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: {
          entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] }
        }
      },
      R("status", e, [
        {
          name: "big_values",
          selector: pe([
            {
              value: "temperature",
              label: e === "ru" ? "Самая горячая точка" : "Hottest spot"
            },
            { value: "cpu", label: e === "ru" ? "Процессор" : "CPU" },
            { value: "memory", label: e === "ru" ? "Память" : "Memory" },
            { value: "gpu", label: e === "ru" ? "Видеокарта" : "GPU" },
            {
              value: "disk",
              label: e === "ru" ? "Самый полный диск" : "Fullest disk"
            }
          ])
        },
        { name: "levels", selector: U }
      ]),
      M("status", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки нагрузки",
        name: "Название",
        status: "Состояние",
        cpu: "Процессор",
        memory: "Память",
        gpu: "Видеокарта",
        temperatures: "Датчики температуры",
        disks: "Разделы диска (занято)",
        disks_free: "Разделы диска (свободно)",
        disk_rows: "Строка для каждого диска",
        color_by_load: "Цвет по нагрузке",
        sensors: "Что ещё сказать",
        alerts: "Сообщать, когда сработало",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        levels: "Load rows",
        name: "Name",
        status: "Status",
        cpu: "CPU",
        memory: "Memory",
        gpu: "GPU",
        temperatures: "Temperature sensors",
        disks: "Disks (used)",
        disks_free: "Disks (free)",
        disk_rows: "A row for each disk",
        color_by_load: "Color by load (low, medium, high, offline)",
        sensors: "What else to show",
        alerts: "Report only when triggered",
        big_values: "Large on the right (up to three)"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      sensors: L(e.sensors),
      alerts: L(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      ),
      alerts: N(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
T("horos-computer-tile-editor", pr);
const Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosComputerTileEditor: pr
}, Symbol.toStringTag, { value: "Module" }));
class gr extends A {
  get entityField() {
    return "appliance";
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "appliance",
        required: !0,
        selector: {
          entity: {
            filter: [
              { domain: "fan" },
              { domain: "humidifier" },
              { domain: "switch" }
            ]
          }
        }
      },
      { name: "pm25", selector: y("sensor", "pm25") },
      { name: "humidity", selector: y("sensor", "humidity") },
      { name: "temperature", selector: y("sensor", "temperature") },
      { name: "power", selector: y("sensor", "power") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: { entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] } }
      },
      R("appliance", e, [
        {
          name: "big_values",
          selector: pe([
            { value: "pm25", label: "PM2.5" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "power", label: e === "ru" ? "Мощность" : "Power" }
          ])
        }
      ]),
      M("appliance", "toggle")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        appliance: "Прибор",
        pm25: "PM2.5",
        humidity: "Влажность",
        temperature: "Температура",
        power: "Мощность",
        sensors: "Что ещё сказать",
        alerts: "Сообщать, когда сработало",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        name: "Name",
        appliance: "Appliance",
        pm25: "PM2.5",
        humidity: "Humidity",
        temperature: "Temperature",
        power: "Power",
        sensors: "What else to show",
        alerts: "Report only when triggered",
        big_values: "Large on the right (up to three)"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      sensors: L(e.sensors),
      alerts: L(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      ),
      alerts: N(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
T("horos-air-tile-editor", gr);
const Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAirTileEditor: gr
}, Symbol.toStringTag, { value: "Module" }));
class _r extends A {
  get entityField() {
    return "cover";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "cover", required: !0, selector: y("cover") },
      { name: "position", selector: y("sensor") },
      {
        name: "illuminance",
        selector: y("sensor", "illuminance")
      },
      { name: "battery", selector: y("sensor", "battery") },
      R("cover", e, [
        {
          name: "big_values",
          selector: pe([
            {
              value: "illuminance",
              label: e === "ru" ? "Освещённость" : "Illuminance"
            },
            { value: "battery", label: e === "ru" ? "Заряд" : "Battery" }
          ])
        },
        { name: "levels", selector: U }
      ]),
      M("cover", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return Pt(this.hass, e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строка положения",
        name: "Название",
        cover: "Штора",
        position: "Насколько открыто",
        illuminance: "Освещённость",
        battery: "Заряд",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        levels: "Position row",
        name: "Name",
        cover: "Cover",
        position: "Position",
        illuminance: "Illuminance",
        battery: "Battery",
        big_values: "Large on the right (up to three)"
      }
    });
  }
}
T("horos-cover-tile-editor", _r);
const jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosCoverTileEditor: _r
}, Symbol.toStringTag, { value: "Module" }));
class vr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "limit", selector: se(1, 12) },
      { name: "ignore", selector: { entity: { multiple: !0 } } },
      R(void 0, e),
      M(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        limit: "Сколько устройств называть",
        ignore: "Молчание этих — норма"
      },
      en: {
        ...P,
        limit: "How many devices to name",
        ignore: "Silence of these is normal"
      }
    });
  }
}
T("horos-offline-tile-editor", vr);
const Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosOfflineTileEditor: vr
}, Symbol.toStringTag, { value: "Module" }));
class br extends A {
  get entityField() {
    return "total";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "total", selector: y("sensor", "power") },
      {
        name: "consumers",
        required: !0,
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "power" }]
          }
        }
      },
      { name: "limit", selector: se(1, 12) },
      R("total", e, [
        { name: "levels", selector: U }
      ]),
      M("total", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки потребителей",
        name: "Название",
        total: "Общая мощность",
        consumers: "Потребители",
        limit: "Сколько показывать"
      },
      en: {
        ...P,
        levels: "Consumer rows",
        name: "Name",
        total: "Total power",
        consumers: "Consumers",
        limit: "How many to show"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      consumers: L(e.consumers)
    };
  }
  fromForm(e) {
    return {
      ...e,
      consumers: N(
        this._config?.consumers,
        e.consumers ?? []
      )
    };
  }
}
T("horos-energy-tile-editor", br);
const Dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosEnergyTileEditor: br
}, Symbol.toStringTag, { value: "Module" }));
class yr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "areas",
        required: !0,
        selector: {
          entity: {
            multiple: !0,
            filter: [
              { domain: "binary_sensor", device_class: "occupancy" },
              { domain: "binary_sensor", device_class: "presence" },
              { domain: "binary_sensor", device_class: "motion" }
            ]
          }
        }
      },
      R(void 0, e),
      M(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        areas: "Зоны"
      },
      en: {
        ...P,
        name: "Name",
        areas: "Areas"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      areas: L(e.areas)
    };
  }
  fromForm(e) {
    return {
      ...e,
      areas: N(
        this._config?.areas,
        e.areas ?? []
      )
    };
  }
}
T("horos-presence-tile-editor", yr);
const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPresenceTileEditor: yr
}, Symbol.toStringTag, { value: "Module" }));
class wr extends A {
  get entityField() {
    return "group";
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "lights",
        required: !0,
        selector: { entity: { multiple: !0, filter: { domain: "light" } } }
      },
      { name: "group", selector: y("light") },
      R("group", e, [
        { name: "levels", selector: U }
      ]),
      M("group", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return It(e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки ламп",
        name: "Название",
        lights: "Лампы",
        group: "Группа (главная сущность)"
      },
      en: {
        ...P,
        levels: "Light rows",
        name: "Name",
        lights: "Lights",
        group: "Group (the main entity)"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      lights: L(e.lights)
    };
  }
  fromForm(e) {
    return {
      ...e,
      lights: N(
        this._config?.lights,
        e.lights ?? []
      )
    };
  }
}
T("horos-light-tile-editor", wr);
const Fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLightTileEditor: wr
}, Symbol.toStringTag, { value: "Module" }));
class xr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "players",
        required: !0,
        selector: {
          entity: { multiple: !0, filter: { domain: "media_player" } }
        }
      },
      R(void 0, e, [
        { name: "levels", selector: U }
      ]),
      M(void 0, "more-info")
    ];
  }
  /** The playback buttons act on the first player in the list. */
  get featuresEntity() {
    const e = this._config?.players ?? [];
    return L(e)[0];
  }
  defaultFeatures() {
    const e = this._config;
    return Rt(e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки плееров",
        name: "Название",
        players: "Проигрыватели"
      },
      en: {
        ...P,
        levels: "Player rows",
        name: "Name",
        players: "Players"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      players: L(e.players)
    };
  }
  fromForm(e) {
    return {
      ...e,
      players: N(
        this._config?.players,
        e.players ?? []
      )
    };
  }
}
T("horos-media-tile-editor", xr);
const Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosMediaTileEditor: xr
}, Symbol.toStringTag, { value: "Module" }));
class $r extends A {
  get entityField() {
    return "climate";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "climate", required: !0, selector: y("climate") },
      { name: "temperature", selector: y("sensor", "temperature") },
      { name: "humidity", selector: y("sensor", "humidity") },
      { name: "power", selector: y("sensor", "power") },
      { name: "co2", selector: y("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: y("sensor", "volatile_organic_compounds")
      },
      { name: "aqi", selector: y("sensor", "aqi") },
      { name: "pm25", selector: y("sensor", "pm25") },
      { name: "air_rows", selector: U },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      R("climate", e, [
        {
          name: "big_values",
          selector: pe([
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "power", label: e === "ru" ? "Мощность" : "Power" }
          ])
        }
      ]),
      M("climate", "more-info")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return Mt(e);
  }
  defaultFeaturesPosition() {
    return "inline";
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        climate: "Прибор",
        temperature: "Температура в комнате",
        humidity: "Влажность в комнате",
        power: "Мощность",
        co2: "CO₂",
        voc: "Летучие органические соединения",
        aqi: "Индекс качества воздуха",
        pm25: "PM2.5",
        air_rows: "Строки качества воздуха (хорошо, так себе, плохо)",
        sensors: "Что ещё сказать",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        name: "Name",
        climate: "Climate entity",
        temperature: "Room temperature",
        humidity: "Room humidity",
        power: "Power",
        co2: "CO₂",
        voc: "VOCs",
        aqi: "Air quality index",
        pm25: "PM2.5",
        air_rows: "Air quality rows (good, fair, poor)",
        sensors: "What else to show",
        big_values: "Large on the right (up to three)"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      sensors: L(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
T("horos-ac-tile-editor", $r);
const Ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAcTileEditor: $r
}, Symbol.toStringTag, { value: "Module" }));
class kr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "limit", selector: se(1, 20) },
      { name: "include_skipped", selector: U },
      { name: "ignore", selector: { entity: { multiple: !0, filter: { domain: "update" } } } },
      R(void 0, e),
      M(void 0, "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        limit: "Сколько называть поимённо",
        include_skipped: "Считать и пропущенные версии",
        ignore: "Не считать"
      },
      en: {
        ...P,
        name: "Name",
        limit: "How many to name",
        include_skipped: "Count skipped versions too",
        ignore: "Do not count"
      }
    });
  }
}
T("horos-updates-tile-editor", kr);
const ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosUpdatesTileEditor: kr
}, Symbol.toStringTag, { value: "Module" }));
class Er extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "lists",
        required: !0,
        selector: { entity: { multiple: !0, filter: { domain: "todo" } } }
      },
      { name: "calendar", selector: y("calendar") },
      R(void 0, e, [
        { name: "levels", selector: U }
      ]),
      M(void 0, "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки списков",
        name: "Название",
        lists: "Списки дел",
        calendar: "Календарь"
      },
      en: {
        ...P,
        levels: "List rows",
        name: "Name",
        lists: "To-do lists",
        calendar: "Calendar"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      lists: L(e.lists)
    };
  }
  fromForm(e) {
    return {
      ...e,
      lists: N(
        this._config?.lists,
        e.lists ?? []
      )
    };
  }
}
T("horos-tasks-tile-editor", Er);
const Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosTasksTileEditor: Er
}, Symbol.toStringTag, { value: "Module" }));
class Cr extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "alerts", required: !0, selector: { entity: { multiple: !0 } } },
      { name: "limit", selector: se(1, 20) },
      { name: "watch_offline", selector: U },
      R(void 0, e),
      M(void 0, "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        alerts: "Оповещения",
        limit: "Сколько называть поимённо",
        watch_offline: "Считать потерю связи оповещением"
      },
      en: {
        ...P,
        name: "Name",
        alerts: "Alerts",
        limit: "How many to name",
        watch_offline: "Count a lost connection as an alert"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      alerts: L(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      alerts: N(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
T("horos-alerts-tile-editor", Cr);
const Wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAlertsTileEditor: Cr
}, Symbol.toStringTag, { value: "Module" })), Ie = {
  entity: {
    filter: [
      { domain: "script" },
      { domain: "scene" },
      { domain: "button" },
      { domain: "input_button" }
    ]
  }
};
class Sr extends A {
  get entityField() {
    return "state";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "state", selector: y("input_boolean") },
      { name: "power", selector: Ie },
      { name: "bright", selector: Ie },
      { name: "dim", selector: Ie },
      { name: "warm", selector: Ie },
      { name: "cold", selector: Ie },
      {
        name: "presets",
        selector: { entity: { ...Ie.entity, multiple: !0 } }
      },
      { name: "preset_state", selector: y("input_select") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "preset_labels", selector: U },
      R("state", e, [
        { name: "levels", selector: U }
      ]),
      M("state", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return Lt(e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Кнопки и режимы",
        name: "Название",
        state: "Где лежит состояние",
        power: "Включить/выключить",
        bright: "Ярче",
        dim: "Тусклее",
        warm: "Теплее",
        cold: "Холоднее",
        presets: "Режимы",
        preset_state: "Где лежит текущий режим",
        sensors: "Что ещё сказать",
        preset_labels: "Подписи у режимов"
      },
      en: {
        ...P,
        levels: "Buttons and presets",
        name: "Name",
        state: "Where the state lives",
        power: "Power on/off",
        bright: "Brighter",
        dim: "Dimmer",
        warm: "Warmer",
        cold: "Colder",
        presets: "Presets",
        preset_state: "Where the current preset lives",
        sensors: "What else to show",
        preset_labels: "Names next to the presets"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      presets: L(e.presets),
      sensors: L(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      presets: N(
        this._config?.presets,
        e.presets ?? []
      ),
      sensors: N(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
T("horos-lamp-tile-editor", Sr);
const Bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLampTileEditor: Sr
}, Symbol.toStringTag, { value: "Module" }));
class Tr extends A {
  get entityField() {
    return "mode";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "mode", selector: y("sensor") },
      {
        name: "burner",
        selector: y("binary_sensor", "heat")
      },
      {
        name: "pump",
        selector: y("binary_sensor", "heat")
      },
      {
        name: "switch",
        selector: { entity: { filter: [{ domain: "switch" }] } }
      },
      { name: "power", selector: y("sensor", "power") },
      { name: "energy", selector: y("sensor", "energy") },
      {
        name: "zones",
        selector: {
          entity: { multiple: !0, filter: [{ domain: "climate" }] }
        }
      },
      R("mode", e, [
        {
          name: "big_values",
          selector: pe([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" }
          ])
        },
        { name: "levels", selector: U }
      ]),
      M("mode", "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        levels: "Строки комнат",
        name: "Название",
        mode: "Что котёл делает сейчас",
        burner: "Горелка",
        pump: "Насос",
        switch: "Питание котла",
        power: "Мощность",
        energy: "Энергия",
        zones: "Комнаты",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        levels: "Room rows",
        name: "Name",
        mode: "What the boiler is doing",
        burner: "Burner",
        pump: "Pump",
        switch: "Power to the boiler",
        power: "Power",
        energy: "Energy",
        zones: "Rooms",
        big_values: "Large on the right (up to three)"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      zones: L(e.zones)
    };
  }
  fromForm(e) {
    return {
      ...e,
      zones: N(
        this._config?.zones,
        e.zones ?? []
      )
    };
  }
}
T("horos-heating-tile-editor", Tr);
const Kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosHeatingTileEditor: Tr
}, Symbol.toStringTag, { value: "Module" }));
class Ar extends A {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      {
        name: "plants",
        required: !0,
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "moisture" }]
          }
        }
      },
      {
        name: "",
        type: "grid",
        schema: [
          { name: "dry_below", selector: se(0, 100, "%") },
          { name: "wet_above", selector: se(0, 100, "%") }
        ]
      },
      {
        name: "temperature",
        selector: y("sensor", "temperature")
      },
      { name: "humidity", selector: y("sensor", "humidity") },
      {
        name: "illuminance",
        selector: y("sensor", "illuminance")
      },
      R(void 0, e, [
        {
          name: "big_values",
          selector: pe([
            {
              value: "temperature",
              label: e === "ru" ? "Температура воздуха" : "Air temperature"
            },
            {
              value: "humidity",
              label: e === "ru" ? "Влажность воздуха" : "Air humidity"
            },
            {
              value: "illuminance",
              label: e === "ru" ? "Освещённость" : "Light"
            }
          ])
        },
        { name: "levels", selector: U }
      ]),
      M(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        plants: "Растения",
        levels: "Строки растений",
        dry_below: "Ниже этого — сухо",
        wet_above: "Выше этого — залито",
        temperature: "Температура воздуха",
        humidity: "Влажность воздуха",
        illuminance: "Освещённость",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        name: "Name",
        plants: "Plants",
        levels: "Plant rows",
        dry_below: "Dry below",
        wet_above: "Wet above",
        temperature: "Air temperature",
        humidity: "Air humidity",
        illuminance: "Light",
        big_values: "Large on the right (up to three)"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      plants: L(e.plants)
    };
  }
  fromForm(e) {
    return {
      ...e,
      // The thresholds a plant was given by hand in YAML survive a pick here.
      plants: N(
        this._config?.plants,
        e.plants ?? []
      )
    };
  }
}
T("horos-greenhouse-tile-editor", Ar);
const Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosGreenhouseTileEditor: Ar
}, Symbol.toStringTag, { value: "Module" })), Yl = {
  temperature: { ru: "Температура, от ночи до дня", en: "Temperature, night to day" },
  precipitation: { ru: "Осадки", en: "Precipitation" },
  precipitation_probability: { ru: "Вероятность осадков", en: "Chance of rain" },
  humidity: { ru: "Влажность", en: "Humidity" },
  wind_speed: { ru: "Ветер", en: "Wind" }
}, Zi = {
  temperature: { ru: "Температура", en: "Temperature" },
  apparent_temperature: { ru: "Ощущается как", en: "Feels like" },
  dew_point: { ru: "Точка росы", en: "Dew point" },
  humidity: { ru: "Влажность", en: "Humidity" },
  pressure: { ru: "Давление", en: "Pressure" },
  wind_speed: { ru: "Ветер", en: "Wind" },
  cloud_coverage: { ru: "Облачность", en: "Cloud coverage" },
  uv_index: { ru: "УФ-индекс", en: "UV index" },
  visibility: { ru: "Видимость", en: "Visibility" }
};
class Or extends A {
  get entityField() {
    return "weather";
  }
  get schema() {
    const e = $(this.hass) === "ru" ? "ru" : "en";
    return [
      {
        name: "weather",
        required: !0,
        selector: { entity: { filter: [{ domain: "weather" }] } }
      },
      {
        name: "",
        type: "grid",
        schema: [
          { name: "days", selector: se(1, 14) },
          {
            name: "bar",
            selector: {
              select: {
                mode: "dropdown",
                options: jt.map((t) => ({
                  value: t,
                  label: Yl[t][e]
                }))
              }
            }
          }
        ]
      },
      R("weather", $(this.hass), [
        {
          name: "big_values",
          selector: pe(
            Object.keys(Zi).map((t) => ({
              value: t,
              label: Zi[t][e]
            }))
          )
        },
        { name: "levels", selector: U }
      ]),
      M("weather", "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        weather: "Погода",
        days: "Дней в прогнозе",
        bar: "Что показывают полоски",
        levels: "Строки прогноза",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...P,
        name: "Name",
        weather: "Weather",
        days: "Days in the forecast",
        bar: "What the bars measure",
        levels: "Forecast rows",
        big_values: "Large on the right (up to three)"
      }
    });
  }
}
T("horos-weather-tile-editor", Or);
const Xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosWeatherTileEditor: Or
}, Symbol.toStringTag, { value: "Module" }));
class Pr extends A {
  /**
   * No main entity for the features panel: the control line is the card's own
   * and is not removable (see the card).
   */
  get entityField() {
  }
  get schema() {
    const e = $(this.hass), t = {
      entity: { filter: [{ domain: "input_number" }, { domain: "number" }] }
    };
    return [
      {
        name: "battery",
        required: !0,
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "battery" }]
          }
        }
      },
      { name: "switch", selector: y("switch") },
      { name: "min", selector: t },
      { name: "max", selector: t },
      { name: "force", selector: y("timer") },
      { name: "pulse_every", selector: y("input_number") },
      { name: "stale_after", selector: se(0, 86400, "s") },
      R(void 0, e),
      M(void 0, "more-info")
    ];
  }
  /** The form always edits a list, whatever the YAML holds. */
  get formData() {
    const e = super.formData;
    return {
      ...e,
      battery: rt(e)
    };
  }
  get labels() {
    return this.pick({
      ru: {
        ...O,
        name: "Название",
        battery: "Заряд (первый числовой)",
        switch: "Порт зарядки",
        min: "Нижний предел",
        max: "Верхний предел",
        force: "Таймер принудительной зарядки",
        pulse_every: "Период импульса без данных, ч",
        stale_after: "Нет данных через, секунд"
      },
      en: {
        ...P,
        name: "Name",
        battery: "Battery (first numeric)",
        switch: "Charger port",
        min: "Lower limit",
        max: "Upper limit",
        force: "Forced charge timer",
        pulse_every: "Blind pulse period, h",
        stale_after: "No data after, seconds"
      }
    });
  }
}
T("horos-charge-tile-editor", Pr);
const Ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosChargeTileEditor: Pr
}, Symbol.toStringTag, { value: "Module" }));
class Ir extends Qe {
  get schema() {
    return [
      {
        name: "entity",
        required: !0,
        selector: { entity: { filter: { domain: "media_player" } } }
      },
      { name: "name", selector: rr }
    ];
  }
  get labels() {
    return this.pick({
      ru: { ...O, entity: "Проигрыватель", name: "Название" },
      en: { ...P, entity: "Media player", name: "Name" }
    });
  }
}
T("horos-player-card-editor", Ir);
const Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlayerCardEditor: Ir
}, Symbol.toStringTag, { value: "Module" }));
