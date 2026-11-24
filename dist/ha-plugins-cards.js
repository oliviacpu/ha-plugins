/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = globalThis, yt = De.ShadowRoot && (De.ShadyCSS === void 0 || De.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Dt = /* @__PURE__ */ new WeakMap();
let Es = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (yt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Dt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Dt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Xr = (s) => new Es(typeof s == "string" ? s : s + "", void 0, wt), Q = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new Es(t, s, wt);
}, Zr = (s, e) => {
  if (yt) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = De.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, s.appendChild(r);
  }
}, zt = yt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Xr(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jr, defineProperty: Qr, getOwnPropertyDescriptor: ei, getOwnPropertyNames: ti, getOwnPropertySymbols: si, getPrototypeOf: ri } = Object, Ge = globalThis, Ut = Ge.trustedTypes, ii = Ut ? Ut.emptyScript : "", ni = Ge.reactiveElementPolyfillSupport, ke = (s, e) => s, We = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? ii : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, xt = (s, e) => !Jr(s, e), Wt = { attribute: !0, type: String, converter: We, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= Symbol("metadata"), Ge.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let be = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Wt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Qr(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: n } = ei(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      n?.call(this, o), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const e = ri(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const t = this.properties, r = [...ti(t), ...si(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(zt(i));
    } else e !== void 0 && t.push(zt(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : We).toAttribute(t, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : We;
      this._$Em = i;
      const l = o.fromAttribute(t, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[e]), r ??= o.getPropertyOptions(e), !((r.hasChanged ?? xt)(n, t) || r.useDefault && r.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, n] of r) {
        const { wrapped: o } = n, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
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
be.elementStyles = [], be.shadowRootOptions = { mode: "open" }, be[ke("elementProperties")] = /* @__PURE__ */ new Map(), be[ke("finalized")] = /* @__PURE__ */ new Map(), ni?.({ ReactiveElement: be }), (Ge.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, qt = (s) => s, qe = $t.trustedTypes, Bt = qe ? qe.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Cs = "$lit$", ce = `lit$${Math.random().toFixed(9).slice(2)}$`, Ss = "?" + ce, oi = `<${Ss}>`, fe = document, Ee = () => fe.createComment(""), Ce = (s) => s === null || typeof s != "object" && typeof s != "function", kt = Array.isArray, ai = (s) => kt(s) || typeof s?.[Symbol.iterator] == "function", rt = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vt = /-->/g, Kt = />/g, de = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, Yt = /"/g, As = /^(?:script|style|textarea|title)$/i, li = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), _ = li(1), ge = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Xt = /* @__PURE__ */ new WeakMap(), pe = fe.createTreeWalker(fe, 129);
function Ts(s, e) {
  if (!kt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(e) : e;
}
const ci = (s, e) => {
  const t = s.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = we;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, h, u = -1, v = 0;
    for (; v < a.length && (o.lastIndex = v, h = o.exec(a), h !== null); ) v = o.lastIndex, o === we ? h[1] === "!--" ? o = Vt : h[1] !== void 0 ? o = Kt : h[2] !== void 0 ? (As.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = de) : h[3] !== void 0 && (o = de) : o === de ? h[0] === ">" ? (o = i ?? we, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? de : h[3] === '"' ? Yt : Gt) : o === Yt || o === Gt ? o = de : o === Vt || o === Kt ? o = we : (o = de, i = void 0);
    const f = o === de && s[l + 1].startsWith("/>") ? " " : "";
    n += o === we ? a + oi : u >= 0 ? (r.push(c), a.slice(0, u) + Cs + a.slice(u) + ce + f) : a + ce + (u === -2 ? l : f);
  }
  return [Ts(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Se {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, h] = ci(e, t);
    if (this.el = Se.createElement(c, r), pe.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = pe.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Cs)) {
          const v = h[o++], f = i.getAttribute(u).split(ce), y = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: n, name: y[2], strings: f, ctor: y[1] === "." ? hi : y[1] === "?" ? di : y[1] === "@" ? mi : Ye }), i.removeAttribute(u);
        } else u.startsWith(ce) && (a.push({ type: 6, index: n }), i.removeAttribute(u));
        if (As.test(i.tagName)) {
          const u = i.textContent.split(ce), v = u.length - 1;
          if (v > 0) {
            i.textContent = qe ? qe.emptyScript : "";
            for (let f = 0; f < v; f++) i.append(u[f], Ee()), pe.nextNode(), a.push({ type: 2, index: ++n });
            i.append(u[v], Ee());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ss) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(ce, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += ce.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = fe.createElement("template");
    return r.innerHTML = e, r;
  }
}
function ye(s, e, t = s, r) {
  if (e === ge) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const n = Ce(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = ye(s, i._$AS(s, e.values), i, r)), e;
}
class ui {
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
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? fe).importNode(t, !0);
    pe.currentNode = i;
    let n = pe.nextNode(), o = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new Te(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new pi(n, this, e)), this._$AV.push(c), a = r[++l];
      }
      o !== a?.index && (n = pe.nextNode(), o++);
    }
    return pe.currentNode = fe, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class Te {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = ye(this, e, t), Ce(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== ge && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ai(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && Ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(fe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Se.createElement(Ts(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new ui(i, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Xt.get(e.strings);
    return t === void 0 && Xt.set(e.strings, t = new Se(e)), t;
  }
  k(e) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const n of e) i === t.length ? t.push(r = new Te(this.O(Ee()), this.O(Ee()), this, this.options)) : r = t[i], r._$AI(n), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = qt(e).nextSibling;
      qt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ye {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(e, t = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = ye(this, e, t, 0), o = !Ce(e) || e !== this._$AH && e !== ge, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = ye(this, l[r + a], t, a), c === ge && (c = this._$AH[a]), o ||= !Ce(c) || c !== this._$AH[a], c === m ? e = m : e !== m && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class hi extends Ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class di extends Ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class mi extends Ye {
  constructor(e, t, r, i, n) {
    super(e, t, r, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ye(this, e, t, 0) ?? m) === ge) return;
    const r = this._$AH, i = e === m && r !== m || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== m && (r === m || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class pi {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
}
const fi = $t.litHtmlPolyfillSupport;
fi?.(Se, Te), ($t.litHtmlVersions ??= []).push("3.3.3");
const gi = (s, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    r._$litPart$ = i = new Te(e.insertBefore(Ee(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = globalThis;
let ue = class extends be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = gi(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ge;
  }
};
ue._$litElement$ = !0, ue.finalized = !0, Et.litElementHydrateSupport?.({ LitElement: ue });
const vi = Et.litElementPolyfillSupport;
vi?.({ LitElement: ue });
(Et.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _i = { attribute: !0, type: String, converter: We, reflect: !1, hasChanged: xt }, bi = (s = _i, e, t) => {
  const { kind: r, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), r === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, s, l), l;
    } };
  }
  if (r === "setter") {
    const { name: o } = t;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Y(s) {
  return (e, t) => typeof t == "object" ? bi(s, e, t) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(s) {
  return Y({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yi = (s, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(s, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function wi(s, e) {
  return (t, r, i) => {
    const n = (o) => o.renderRoot?.querySelector(s) ?? null;
    return yi(t, r, { get() {
      return n(this);
    } });
  };
}
const W = Q`
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
`, Xe = /* @__PURE__ */ new Set(["unavailable", "unknown"]), xi = /* @__PURE__ */ new Set([
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
function Os(s) {
  const e = s?.attributes.device_class;
  if (!e || !xi.has(e)) return !1;
  const t = Number(s.state);
  return Number.isFinite(t) && t < 0;
}
const $i = " · ";
function p(s, e) {
  if (!e) return;
  const t = s?.states[e];
  return {
    entityId: e,
    stateObj: t,
    missing: !t,
    unavailable: !!t && Xe.has(t.state),
    impossible: Os(t)
  };
}
function Ct(s, e) {
  if (!(!s || !e || !e.stateObj || e.missing || e.unavailable) && !e.impossible)
    return s.formatEntityState(e.stateObj);
}
function Zt(s, e, t) {
  const r = e?.attributes[t];
  if (!(r == null || r === ""))
    return s?.formatEntityAttributeValue?.(e, t) ?? String(r);
}
function S(s) {
  return s.filter(
    (e) => !!e && (e.content !== void 0 || (e.text ?? "").trim() !== "")
  );
}
function L(s, e) {
  const t = Ct(s, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function U(s, e) {
  const t = Ze(s, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function Ze(s, e) {
  if (!(!s || !e?.stateObj || !e.unavailable))
    return s.formatEntityState(e.stateObj);
}
function B(s) {
  if (!s?.stateObj || s.impossible) return;
  const e = Number(s.stateObj.state);
  return Number.isFinite(e) ? e : void 0;
}
const ki = /* @__PURE__ */ new Set([
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
function Ei(s) {
  if (!s?.stateObj || s.missing || s.unavailable) return !1;
  const e = s.stateObj.state.trim().toLowerCase().replace(/[_-]+/g, " ");
  return !ki.has(e);
}
function Ae(s, e) {
  return s || (e?.stateObj?.attributes.friendly_name ?? e?.entityId ?? "");
}
function St(s, e) {
  if (!e) return { value: s };
  if (!s.endsWith(e)) return { value: s };
  const t = s.slice(0, s.length - e.length).trimEnd();
  return t ? { value: t, unit: e } : { value: s };
}
const lt = "unavailable", Ci = "unknown", Si = "off", Ai = /* @__PURE__ */ new Set(["button", "input_button", "scene"]), Ti = /* @__PURE__ */ new Set([
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
]), M = (s) => s.substring(0, s.indexOf(".")), Ps = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "unknown";
function Be(s, e) {
  const t = M(s.entity_id), r = s.state;
  if (Ai.has(t))
    return r !== lt;
  if (r === lt || r === Ci || r === Si && t !== "alert")
    return !1;
  switch (t) {
    case "alarm_control_panel":
      return r !== "disarmed";
    case "alert":
      return r !== "idle";
    case "cover":
    case "valve":
      return r !== "closed";
    case "device_tracker":
    case "person":
      return r !== "not_home";
    case "lawn_mower":
      return !["docked", "paused"].includes(r);
    case "lock":
      return r !== "locked";
    case "media_player":
      return r !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(r);
    case "plant":
      return r === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(r);
    case "timer":
      return r === "active";
    case "camera":
      return ["streaming", "recording"].includes(r);
    default:
      return !0;
  }
}
const Rs = (s) => s.reduceRight(
  (e, t) => `var(${t}${e ? `, ${e}` : ""})`,
  void 0
), Oi = (s) => {
  const e = Number(s);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function Pi(s, e) {
  if (!s) return e;
  if (s.state === lt)
    return "var(--state-unavailable-color)";
  const t = M(s.entity_id), r = s.attributes.device_class;
  if (t === "sensor" && r === "battery") {
    const a = Oi(s.state);
    if (a) return `var(${a})`;
  }
  if (!Ti.has(t))
    return e;
  const i = Be(s), n = Ps(s.state), o = i ? "active" : "inactive", l = [];
  return r && l.push(`--state-${t}-${r}-${n}-color`), l.push(
    `--state-${t}-${n}-color`,
    `--state-${t}-${o}-color`,
    `--state-${o}-color`
  ), Rs(l);
}
const it = (s) => Math.round(s).toString(16).padStart(2, "0"), Ri = ([s, e, t]) => {
  const r = Math.max(s, e, t), i = r - Math.min(s, e, t), n = i && (r === s ? (e - t) / i : r === e ? 2 + (t - s) / i : 4 + (s - e) / i);
  return [60 * (n < 0 ? n + 6 : n), r && i / r, r];
}, Ii = ([s, e, t]) => {
  const r = (i) => {
    const n = (i + s / 60) % 6;
    return t - t * e * Math.max(Math.min(n, 4 - n, 1), 0);
  };
  return [r(5), r(3), r(1)];
};
function Mi(s) {
  const e = s.attributes.rgb_color;
  if (!Array.isArray(e) || e.length < 3) return;
  const t = Ri(e);
  t[1] < 0.4 && (t[1] < 0.1 ? t[2] = 225 : t[1] = 0.4);
  const [r, i, n] = Ii(t);
  return `#${it(r)}${it(i)}${it(n)}`;
}
function N(s) {
  if (!s) return "var(--state-inactive-color)";
  if (M(s.entity_id) === "light" && Be(s)) {
    const t = Mi(s);
    if (t) return t;
  }
  const e = Pi(s);
  return e || (Be(s) ? "var(--state-icon-color)" : "var(--state-inactive-color)");
}
function me(s) {
  return s !== void 0 && s.action !== "none";
}
const ji = ["closed", "locked", "off"], Ni = /* @__PURE__ */ new Set([
  "fan",
  "input_boolean",
  "light",
  "switch",
  "group",
  "automation",
  "humidifier",
  "valve"
]);
function he(s) {
  if (!s) return { action: "none" };
  const e = M(s);
  return { action: Ni.has(e) || ["button", "input_button", "scene"].includes(e) ? "toggle" : "none" };
}
const Fi = {
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
function Li(s, e) {
  const t = Fi[s];
  return t ? (e ? t.on : t.off) ?? t.on : e ? "turn_on" : "turn_off";
}
function Hi(s, e) {
  const t = s.states[e];
  if (!t) return;
  const r = M(e), i = r === "group" ? "homeassistant" : r, n = ji.includes(t.state);
  s.callService(i, Li(r, n), {
    entity_id: e
  });
}
function Jt(s, e, t) {
  s.dispatchEvent(
    new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 })
  );
}
function Di(s, e) {
  e ? window.history.replaceState(null, "", s) : window.history.pushState(null, "", s), window.dispatchEvent(new CustomEvent("location-changed", { detail: {} }));
}
async function zi(s, e) {
  if (!e.confirmation) return !0;
  const t = window.loadCardHelpers;
  if (!t) return window.confirm(e.confirmation.text ?? "Are you sure?");
  const r = await t();
  return r.showConfirmationDialog ? r.showConfirmationDialog(s, {
    text: e.confirmation.text,
    title: e.confirmation.title,
    confirmText: e.confirmation.confirm_text,
    dismissText: e.confirmation.dismiss_text
  }) : window.confirm(e.confirmation.text ?? "Are you sure?");
}
async function Is(s, e, t, r) {
  let i;
  if (r === "double_tap" ? i = t.double_tap_action : r === "hold" ? i = t.hold_action : i = t.tap_action, i || (i = { action: "more-info" }), !!await zi(s, i))
    switch (i.action) {
      case "none":
        break;
      case "more-info": {
        const n = i.entity || t.entity;
        n && Jt(s, "hass-more-info", { entityId: n });
        break;
      }
      case "toggle": {
        const n = i.entity || t.entity;
        n && Hi(e, n);
        break;
      }
      case "navigate":
        i.navigation_path && Di(i.navigation_path, i.navigation_replace);
        break;
      case "url":
        i.url_path && window.open(i.url_path, "_blank", "noreferrer");
        break;
      case "perform-action":
      case "call-service": {
        const n = i.perform_action || i.service;
        if (!n) break;
        const [o, l] = n.split(".", 2);
        e.callService(o, l, {
          ...i.data ?? i.service_data ?? {},
          ...i.target ?? {}
        });
        break;
      }
      case "fire-dom-event":
        Jt(s, "ll-custom", i);
        break;
      default:
        console.warn(
          `horos-cards: action "${i.action}" is not supported`
        );
    }
}
const Ui = 2;
function Qt(s, e) {
  const t = s ?? [];
  if (e !== "inline")
    return { inline: [], below: t, columns: 1 };
  const r = t.slice(1);
  return {
    inline: t.slice(0, 1),
    below: r,
    columns: Math.min(r.length, Ui)
  };
}
function Wi(s) {
  return Math.ceil(s.below.length / Math.max(s.columns, 1));
}
const At = 5e3, es = [
  "ha-tile-container",
  "ha-tile-icon",
  "ha-tile-info",
  "hui-card-features"
], ts = [
  "ha-control-button",
  "ha-control-button-group",
  "ha-control-select"
];
let Ne, Fe, Le;
function Tt(s, e) {
  return customElements.get(s) ? Promise.resolve(!0) : Promise.race([
    customElements.whenDefined(s).then(() => !0),
    new Promise((t) => setTimeout(() => t(!1), e))
  ]);
}
async function qi() {
  const s = window.loadCardHelpers;
  if (s)
    try {
      (await s()).createCardElement?.({ type: "tile", entity: "sun.sun" });
    } catch {
    }
}
function Ot() {
  return Ne || (Ne = (async () => es.every((e) => customElements.get(e)) ? !0 : (await qi(), (await Promise.all(
    es.map((e) => Tt(e, At))
  )).every(Boolean)))(), Ne);
}
function Ms() {
  return Fe || (Fe = (async () => {
    if (ts.every((r) => customElements.get(r))) return !0;
    await Ot();
    const s = window.loadCardHelpers;
    let e;
    try {
      e = (await s?.())?.createCardElement?.({
        type: "tile",
        entity: "sun.sun",
        features: [{ type: "cover-open-close" }, { type: "climate-hvac-modes" }]
      }), e && (e.style.position = "absolute", e.style.left = "-9999px", document.body.appendChild(e));
    } catch {
    }
    const t = await Promise.all(
      ts.map((r) => Tt(r, At))
    );
    return e?.remove(), t.every(Boolean);
  })(), Fe);
}
function Bi() {
  return Le || (Le = (async () => {
    if (customElements.get("hui-card-features-editor")) return !0;
    await Ot();
    const s = customElements.get("hui-tile-card");
    try {
      await s?.getConfigElement?.();
    } catch {
    }
    return Tt("hui-card-features-editor", At);
  })(), Le);
}
const Oe = {
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
}, Vi = {
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
}, ze = {
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
}, js = { ru: Vi, en: ze };
function x(s) {
  const t = (s?.language ?? s?.locale?.language ?? "en").split("-")[0].toLowerCase();
  return t in js ? t : "en";
}
function Ki(s, e) {
  if (s !== "ru") return e === 1 ? "one" : "many";
  const t = e % 10, r = e % 100;
  return t === 1 && r !== 11 ? "one" : t >= 2 && t <= 4 && (r < 12 || r > 14) ? "few" : "many";
}
function d(s, e, t = {}) {
  const r = x(s), i = js[r] ?? ze, n = t.count, o = typeof n == "number" ? `${e}.${Ki(r, n)}` : void 0;
  return ((o && (i[o] ?? ze[o])) ?? i[e] ?? ze[e] ?? e).replace(
    /\{(\w+)\}/g,
    (a, c) => c in t ? String(t[c]) : a
  );
}
var Gi = Object.defineProperty, Pt = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Gi(e, t, i), i;
};
const Yi = "—";
class $ extends ue {
  constructor() {
    super(...arguments), this._ready = !1, this.base = {};
  }
  static {
    this.styles = [W];
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
    const r = this.base.features ?? e;
    if (!r.length) return 0;
    const i = t ? "bottom" : this.base.features_position ?? "bottom";
    return Wi(Qt(r, i));
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
    super.connectedCallback(), Ot().then((e) => {
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
    const r = t ? {
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
    Is(this, this.hass, r, e);
  }
  // ---- rendering -------------------------------------------------------
  /** A banner instead of the card: the config is invalid or the entity is gone. */
  renderWarning(e) {
    return _`<ha-card><div class="warning">${e}</div></ha-card>`;
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
    const r = this.base.state_content ?? t;
    return !r && !this.base.time_format ? L(this.hass, e) : {
      entityId: e.entityId,
      content: _`<state-display
        .hass=${this.hass}
        .stateObj=${e.stateObj}
        .content=${r}
        .timeFormat=${this.base.time_format}
      ></state-display>`
    };
  }
  /** A message about entities that were not found, or undefined if all are there. */
  missingRolesWarning(e) {
    const t = e.filter((r) => !!r && r.missing).map((r) => r.entityId);
    if (t.length)
      return d(
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
    if (!t) return _`<span>${e}</span>`;
    const r = this.hass?.states[t]?.attributes.friendly_name ?? t;
    return _`<span
      role="button"
      tabindex="0"
      class="clickable"
      title=${r}
      aria-label=${r}
      @click=${(i) => {
      i.stopPropagation(), this.fireMoreInfo(t);
    }}
      @keydown=${(i) => {
      (i.key === "Enter" || i.key === " ") && (i.preventDefault(), i.stopPropagation(), this.fireMoreInfo(t));
    }}
      >${e}</span
    >`;
  }
  renderTile(e) {
    const {
      icon: t,
      color: r,
      primary: i,
      secondary: n,
      mainEntityId: o,
      imageUrl: l,
      defaultIconAction: a,
      values: c,
      ownFeatures: h,
      customFeatures: u,
      customInline: v
    } = e;
    if (this._entityId = o, this._defaultIconAction = a, !this._ready)
      return this.renderWarning(d(this.hass, "internals.failed"));
    const f = this._tileColor(r), y = this.base.icon_tap_action ?? a, z = me(y) || me(this.base.icon_hold_action) || me(this.base.icon_double_tap_action), w = this.base.features ?? h, q = this.base.features_position ?? "bottom", re = this.base.levels === !1 ? void 0 : u, le = Qt(
      w,
      v ? "bottom" : q
    ), Ht = typeof this.base.grid_options?.rows == "number";
    return this.toggleAttribute(
      "filled",
      Ht && !!(re || le.below.length)
    ), _`
      <ha-card style="--tile-color: ${f};">
        <ha-tile-container
          .featurePosition=${v ? "inline" : q}
          .vertical=${!!this.base.vertical}
          .fixedInfoHeight=${this.layout === "grid" && Ht}
          .interactive=${!0}
          .actionHandlerOptions=${{
      hasHold: me(this.base.hold_action),
      hasDoubleClick: me(this.base.double_tap_action)
    }}
          @action=${this._handleAction}
        >
          <ha-tile-icon
            slot="icon"
            class=${l ? "image" : ""}
            .interactive=${z}
            .imageUrl=${l}
            .icon=${this.base.icon ?? t}
            .actionHandlerOptions=${{
      hasHold: me(this.base.icon_hold_action),
      hasDoubleClick: me(this.base.icon_double_tap_action)
    }}
            @action=${this._handleIconAction}
          ></ha-tile-icon>

          <div slot="info" class="info ${this.base.vertical ? "vertical" : ""}">
            <ha-tile-info>
              <span slot="primary">${i}</span>
              ${n?.length && !this.base.hide_state ? _`<span slot="secondary"
                    >${n.map(
      (J, st) => _`
                        ${st ? _`<span>${$i}</span>` : m}${this.renderClickable(
        J.content ?? J.text,
        J.entityId
      )}
                      `
    )}</span
                  >` : m}
            </ha-tile-info>
            ${c?.length ? _`<div class="values of-${c.length}">
                  ${c.map(
      (J, st) => _`
                      ${st ? _`<span class="values-separator">/</span>` : m}
                      ${this.renderClickable(
        _`${J.icon ? _`<ha-icon
                              class="value-icon"
                              .icon=${J.icon}
                            ></ha-icon>` : m}${J.value}${J.unit ? _`<span class="unit"> ${J.unit}</span>` : m}`,
        J.entityId
      )}
                    `
    )}
                </div>` : m}
          </div>

          ${le.inline.length ? _`<hui-card-features
                slot="features-inline"
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${le.inline}
                .position=${q}
              ></hui-card-features>` : m}
          ${v ? _`<div slot="features-inline" class="custom-inline">
                ${v}
              </div>` : m}
          ${re ? _`<div slot="features" class="custom-features">
                ${re}
              </div>` : m}
          ${le.below.length ? _`<hui-card-features
                slot="features"
                .columns=${le.columns}
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${le.below}
                .position=${"bottom"}
              ></hui-card-features>` : m}
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
    return this.base.color && (!t || Be(t)) ? Ns(this.base.color) : e ?? "var(--state-inactive-color)";
  }
  /**
   * The values of the right-hand column. `icons` names a value by its role key:
   * without it two percentages in a row are indistinguishable.
   */
  bigValues(e, t = Oe) {
    return e.map((r) => r.role ? {
      ...this.formatted(r.role.stateObj) ?? { value: Yi },
      entityId: r.role.entityId,
      icon: t[r.key]
    } : void 0).filter((r) => !!r);
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
    if (!(!this.hass || !e) && !Xe.has(e.state) && !Os(e))
      return St(
        this.hass.formatEntityState(e),
        e.attributes.unit_of_measurement
      );
  }
}
Pt([
  Y({ attribute: !1 })
], $.prototype, "hass");
Pt([
  Y({ attribute: !1 })
], $.prototype, "layout");
Pt([
  b()
], $.prototype, "_ready");
function Ns(s) {
  return /^(#|rgb|hsl|var\()/.test(s) ? s : s === "state" ? "var(--state-icon-color)" : `var(--${s}-color, var(--state-icon-color))`;
}
const nt = (s) => Math.max(0, Math.min(100, s)), V = Q`
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
function K(s, e, t) {
  return _`
    <div
      class="levels"
      style=${t?.nameWidth ? `--level-name: ${t.nameWidth};` : m}
    >
      ${s.map(
    (r) => _`
          <button
            class="level ${r.alarm ? "low" : ""}"
            style="--ink: ${r.ink};"
            title="${r.name}: ${r.text}${r.flagTitle ? ` — ${r.flagTitle}` : ""}${r.stale ? ` — ${r.stale}` : ""}"
            @click=${(i) => {
      i.stopPropagation(), e(r.entityId);
    }}
          >
            <span class="name">
              <span class="label">${r.name}</span>${r.alarm ? _`<ha-icon
                    icon=${r.alarmIcon ?? "mdi:alert-circle"}
                  ></ha-icon>` : r.icon ? _`<ha-icon class="mark" icon=${r.icon}></ha-icon>` : m}${r.flag ? _`<ha-icon class="flag" icon=${r.flag}></ha-icon>` : m}${r.stale ? _`<ha-icon class="stale" icon="mdi:clock-alert-outline"></ha-icon>` : m}
            </span>
            <span class="bar">
              <span class="track"></span>
              <span
                class="fill ${r.from === void 0 ? "" : "span"} ${r.charging ? "charging" : ""}"
                style="inset-inline-start: ${nt(
      r.from ?? 0
    )}%; width: ${Math.max(
      0,
      nt(r.level) - nt(r.from ?? 0)
    )}%"
              ></span>
            </span>
            <span class="value">${r.text}</span>
          </button>
        `
  )}
    </div>
  `;
}
const Xi = {
  humidity: { good: [30, 60], fair: [25, 70] },
  co2: [1e3, 1400],
  voc: [1e3, 3e3],
  aqi: [51, 101],
  pm25: [15, 35]
};
function Zi(s, e) {
  return s === "humidity" ? 100 : e[s][1] * 1.5;
}
function Fs(s) {
  return { ...Xi, ...s ?? {} };
}
function Ls(s, e, t) {
  if (e === void 0 || !Number.isFinite(e)) return "unknown";
  if (s === "humidity") {
    const { good: n, fair: o } = t.humidity;
    return e >= n[0] && e <= n[1] ? "good" : e >= o[0] && e <= o[1] ? "fair" : "poor";
  }
  const [r, i] = t[s];
  return e >= i ? "poor" : e >= r ? "fair" : "good";
}
function Ji(s) {
  return s.includes("poor") ? "poor" : s.includes("fair") ? "fair" : s.includes("good") ? "good" : "unknown";
}
const Hs = {
  good: "var(--success-color, #4caf50)",
  fair: "var(--warning-color, #ffa600)",
  poor: "var(--error-color, #db4437)",
  unknown: "var(--state-unavailable-color)"
}, Pe = ["humidity", "co2", "voc", "aqi", "pm25"];
function Ds(s) {
  return Pe.filter((e) => s[e]).length;
}
function zs(s, e, t) {
  return Pe.filter((r) => e[r]).flatMap((r) => {
    const i = p(s, e[r]);
    if (!i) return [];
    const n = B(i), o = Ls(r, n, t);
    return [
      {
        entityId: i.entityId,
        name: d(s, `level.${r}`),
        text: Ct(s, i) ?? d(s, "value.unknown"),
        ink: Hs[o],
        level: n === void 0 ? 0 : Math.max(0, n) / Zi(r, t) * 100,
        alarm: o === "poor",
        alarmIcon: "mdi:alert-circle"
      }
    ];
  });
}
function Qi(s, e, t) {
  return Ji(
    Pe.filter((r) => e[r]).map(
      (r) => Ls(r, B(p(s, e[r])), t)
    )
  );
}
const ss = 3;
function Z(s, e, t) {
  if (!s || s.length === 0)
    return typeof e == "string" ? [e] : [...e];
  if (s.length > ss)
    throw new Error(
      `At most ${ss} large values are allowed, got ${s.length}`
    );
  const r = s.filter((n) => !t.includes(n));
  if (r.length)
    throw new Error(
      `Unknown roles in big_values: ${r.join(", ")}. Allowed: ${t.join(", ")}`
    );
  const i = s.filter(
    (n, o) => s.indexOf(n) !== o
  );
  if (i.length)
    throw new Error(`Role listed twice: ${i.join(", ")}`);
  return s;
}
function X(s, e) {
  const t = e.map((i) => s.find((n) => n.key === i)).filter((i) => !!i), r = s.filter((i) => !e.includes(i.key));
  return { big: t, rest: r };
}
let rs = !1;
function en(s) {
  rs || (rs = !0, console.warn(
    `horos-cards: card ${s} is already registered. The bundle looks to be attached to the dashboard twice — the copy that loaded first is the one running. Check the dashboard resources.`
  ));
}
function is() {
  const s = document.querySelector("home-assistant");
  return x(s?.hass);
}
function k(s, e, t) {
  if (customElements.get(s)) {
    en(s);
    return;
  }
  customElements.define(s, e), window.customCards = window.customCards ?? [], window.customCards.push({
    type: t.type,
    preview: t.preview,
    get name() {
      return typeof t.name == "string" ? t.name : t.name[is() === "ru" ? "ru" : "en"] ?? t.name.en;
    },
    get description() {
      return typeof t.description == "string" ? t.description : t.description[is() === "ru" ? "ru" : "en"] ?? t.description.en;
    },
    getEntitySuggestion: t.suggest
  });
}
function E(s, e) {
  customElements.get(s) || customElements.define(s, e);
}
const Rt = 20;
function ee(s, e) {
  return s.states[e]?.attributes.device_class;
}
function Je(s, e) {
  return s.entities?.[e]?.hidden === !0;
}
function oe(s, e) {
  const t = s.entities?.[e]?.device_id;
  if (!t || !s.entities) return [e];
  const r = Object.keys(s.entities).filter(
    (i) => i !== e && s.entities?.[i]?.device_id === t && !Je(s, i) && s.states[i] !== void 0
  );
  return [e, ...r.sort()];
}
function D(s, e, t, ...r) {
  return e.find(
    (i) => M(i) === t && r.includes(ee(s, i) ?? "")
  );
}
function Re(s, ...e) {
  return s.find((t) => e.includes(M(t)));
}
function Ie(s, e, t, r, i = Rt, n = () => !0) {
  const o = Object.keys(s.states).filter(
    (a) => a !== e && M(a) === t && r.includes(ee(s, a) ?? "") && !Je(s, a) && n(a)
  ).sort();
  return [...n(e) ? [e] : [], ...o].slice(0, i);
}
function ns(s, e) {
  return s.entities?.[e]?.device_id !== void 0;
}
function ie(s, e) {
  const t = s.entities?.[e];
  if (t)
    return t.area_id ? t.area_id : t.device_id ? s.devices?.[t.device_id]?.area_id : void 0;
}
function It(s, e, t, r = Rt) {
  const i = ie(s, e);
  if (!i) return [];
  const n = Object.keys(s.states).filter(
    (l) => l !== e && M(l) === t && !Je(s, l) && ie(s, l) === i
  ).sort();
  return [...M(e) === t ? [e] : [], ...n].slice(0, r);
}
function tn(s, e, t, r, i = Rt) {
  const n = (u) => r.indexOf(ee(s, u) ?? ""), o = Object.keys(s.states).filter(
    (u) => u !== e && M(u) === t && n(u) >= 0 && !Je(s, u) && ie(s, u) !== void 0
  ).sort((u, v) => n(u) - n(v) || u.localeCompare(v)), l = /* @__PURE__ */ new Map(), a = ie(s, e);
  a && l.set(a, e);
  for (const u of o) {
    const v = ie(s, u);
    l.has(v) || l.set(v, u);
  }
  const h = [...l.values()].filter((u) => u !== e);
  return [e, ...h].slice(0, i);
}
function H(s, e, t = {}) {
  const r = { type: s, ...t };
  for (const [i, n] of Object.entries(e))
    n && (r[i] = n);
  return { config: r };
}
function Me(s) {
  return Object.values(s).filter(Boolean).length;
}
var sn = Object.defineProperty, rn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && sn(e, t, i), i;
};
const os = [
  "temperature",
  "humidity",
  "illuminance",
  "pm25"
];
function ct(s, e) {
  return e?.air_rows ? [{ type: "trend-graph", hours_to_show: 24 }] : [];
}
class Us extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [W, V];
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? Ds(e) : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(ct(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ma), document.createElement(
      "horos-climate-tile-editor"
    );
  }
  static getStubConfig() {
    return { temperature: "", humidity: "" };
  }
  setConfig(e) {
    if (!e.temperature)
      throw new Error("A temperature entity is required (temperature)");
    this._bigKeys = Z(
      e.big_values,
      "temperature",
      os
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = os.map((u) => ({
      key: u,
      role: p(this.hass, e[u])
    })), r = this.missingRolesWarning([
      ...t.map((u) => u.role),
      ...["co2", "voc", "aqi"].map(
        (u) => p(this.hass, e[u])
      )
    ]);
    if (r) return this.renderWarning(r);
    const { big: i, rest: n } = X(t, this._bigKeys), o = t[0].role, l = Fs(e.air_bounds), a = e.air_rows ? zs(this.hass, e, l) : [], c = e.air_rows ? n.filter((u) => !Pe.includes(u.key)) : n, h = Qi(this.hass, e, l);
    return this.renderTile({
      icon: e.air_rows ? "mdi:home-thermometer" : "mdi:thermometer",
      color: e.air_rows ? Hs[h] : N(o?.stateObj),
      primary: Ae(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: he(o?.entityId),
      secondary: S([
        U(this.hass, o),
        ...c.map((u) => L(this.hass, u.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(i),
      ownFeatures: ct(this.hass, e),
      customFeatures: a.length ? K(a, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
rn([
  b()
], Us.prototype, "_config");
k("horos-climate-tile", Us, {
  type: "horos-climate-tile",
  name: { ru: "Климат комнаты", en: "Room climate" },
  description: {
    ru: "Температура, влажность, освещённость и PM2.5 одной комнаты в одной плитке",
    en: "Temperature, humidity, illuminance and PM2.5 of one room in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor") return null;
    const t = oe(s, e), r = {
      temperature: D(s, t, "sensor", "temperature"),
      humidity: D(s, t, "sensor", "humidity"),
      illuminance: D(s, t, "sensor", "illuminance"),
      pm25: D(s, t, "sensor", "pm25")
    };
    return !r.temperature || Me(r) < 2 ? null : H("custom:horos-climate-tile", r);
  }
});
var nn = Object.defineProperty, on = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && nn(e, t, i), i;
};
const as = ["switch", "power", "energy"];
function ut(s) {
  return s?.toggle_button ? [{ type: "toggle" }] : [];
}
class Ws extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  fixedRows() {
    return this.featureRows(ut(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => pa), document.createElement("horos-plug-tile-editor");
  }
  static getStubConfig() {
    return { switch: "", power: "" };
  }
  setConfig(e) {
    if (!e.switch)
      throw new Error("A switch is required (switch)");
    this._bigKeys = Z(e.big_values, "power", as), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = as.map((a) => ({
      key: a,
      role: p(this.hass, e[a])
    })), r = this.missingRolesWarning(t.map((a) => a.role));
    if (r) return this.renderWarning(r);
    const { big: i, rest: n } = X(t, this._bigKeys), o = t[0].role, l = o.entityId;
    return this.renderTile({
      icon: "mdi:power-plug",
      color: N(o.stateObj),
      primary: Ae(e.name, o),
      secondary: S([
        // One of the two returns a piece: an available switch gives its state,
        // an unavailable one its unavailability status.
        U(this.hass, o),
        // The switch is the card's main entity, so its state can be shown
        // through state_content, just like on the stock tile.
        ...n.map(
          (a) => a.key === "switch" ? this.mainStateSegment(a.role) : L(this.hass, a.role)
        )
      ]),
      mainEntityId: l,
      imageUrl: this.entityImage(o.stateObj),
      defaultIconAction: he(l),
      values: this.bigValues(i),
      ownFeatures: ut(e)
    });
  }
}
on([
  b()
], Ws.prototype, "_config");
k("horos-plug-tile", Ws, {
  type: "horos-plug-tile",
  name: { ru: "Розетка", en: "Smart plug" },
  description: {
    ru: "Выключатель, текущая мощность и накопленная энергия в одной плитке",
    en: "Switch, current power draw and accumulated energy in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = oe(s, e), r = {
      switch: Re(t, "switch"),
      power: D(s, t, "sensor", "power"),
      energy: D(s, t, "sensor", "energy")
    };
    return !r.switch || Me(r) < 2 ? null : H("custom:horos-plug-tile", r);
  }
});
const Ve = 30, Ke = 70;
function qs(s, e, t) {
  return s === void 0 ? "unknown" : s < e ? "dry" : s > t ? "wet" : "ok";
}
const ht = {
  dry: "var(--warning-color)",
  ok: "var(--success-color)",
  wet: "var(--info-color)",
  unknown: "var(--state-inactive-color)"
}, an = {
  dry: "mdi:water-off",
  ok: "mdi:sprout",
  wet: "mdi:water-alert",
  unknown: "mdi:sprout"
};
var ln = Object.defineProperty, cn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && ln(e, t, i), i;
};
const ls = ["moisture", "temperature", "battery"];
function dt(s, e) {
  const t = s?.states[e?.moisture ?? ""]?.state, r = Number(t);
  return t === void 0 || !Number.isFinite(r) ? [] : [{ type: "bar-gauge", min: 0, max: 100 }];
}
class Bs extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["moisture"];
  }
  fixedRows() {
    return this.featureRows(dt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => fa), document.createElement(
      "horos-plant-tile-editor"
    );
  }
  static getStubConfig() {
    return { moisture: "" };
  }
  setConfig(e) {
    if (!e.moisture)
      throw new Error("A soil moisture entity is required (moisture)");
    const t = e.dry_below ?? Ve, r = e.wet_above ?? Ke;
    if (t >= r)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = Z(e.big_values, "moisture", ls), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = ls.map((c) => ({
      key: c,
      role: p(this.hass, e[c])
    })), r = this.missingRolesWarning(t.map((c) => c.role));
    if (r) return this.renderWarning(r);
    const { big: i, rest: n } = X(t, this._bigKeys), o = t[0].role, l = B(o), a = qs(
      l,
      e.dry_below ?? Ve,
      e.wet_above ?? Ke
    );
    return this.renderTile({
      icon: an[a],
      color: ht[a],
      primary: Ae(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: he(o?.entityId),
      secondary: S([
        U(this.hass, o),
        ...n.map((c) => L(this.hass, c.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(i),
      ownFeatures: dt(this.hass, e)
    });
  }
}
cn([
  b()
], Bs.prototype, "_config");
k("horos-plant-tile", Bs, {
  type: "horos-plant-tile",
  name: { ru: "Растение", en: "Plant" },
  description: {
    ru: "Влажность почвы с порогами сухости, температура почвы и заряд датчика",
    en: "Soil moisture with dryness thresholds, soil temperature and sensor battery"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor" || ee(s, e) !== "moisture")
      return null;
    const t = oe(s, e);
    return H("custom:horos-plant-tile", {
      moisture: e,
      temperature: D(s, t, "sensor", "temperature"),
      battery: D(s, t, "sensor", "battery")
    });
  }
});
var un = Object.defineProperty, Qe = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && un(e, t, i), i;
};
class je extends ue {
  constructor() {
    super(...arguments), this._children = [];
  }
  static {
    this.styles = Q`
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
    const t = await e(), r = this.headingConfig();
    this._heading = r ? t.createCardElement(r) : void 0, this._children = this.childConfigs().map(
      (i) => t.createCardElement(i)
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
    return this._error ? _`<ha-card><div class="warning">${this._error}</div></ha-card>` : this._children.length ? _`
      ${this._heading ? _`<div class="heading">${this._heading}</div>` : m}
      <div class="grid" style="--columns: ${this.columns()}">
        ${this._children}
      </div>
    ` : m;
  }
}
Qe([
  Y({ attribute: !1 })
], je.prototype, "hass");
Qe([
  b()
], je.prototype, "_heading");
Qe([
  b()
], je.prototype, "_children");
Qe([
  b()
], je.prototype, "_error");
function Vs(s) {
  if (!s) return;
  const e = s.split(":").pop();
  return e ? e.trim() : s;
}
function hn(s) {
  return typeof s == "string" ? { entity: s } : s;
}
var dn = Object.defineProperty, mn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && dn(e, t, i), i;
};
const pn = 3;
class Ks extends je {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ga), document.createElement(
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
    return this._config?.columns ?? pn;
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
      const t = hn(e), r = this.hass?.states[t.entity];
      return {
        type: "button",
        entity: t.entity,
        name: t.name ?? Vs(r?.attributes.friendly_name),
        icon: t.icon,
        show_state: !1,
        tap_action: { action: "toggle" }
      };
    }) : [];
  }
}
mn([
  b()
], Ks.prototype, "_config");
k("horos-buttons-tile", Ks, {
  type: "horos-buttons-tile",
  name: { ru: "Кнопки скриптов", en: "Script buttons" },
  description: {
    ru: "Сетка кнопок, вызывающих скрипты, под общим заголовком",
    en: "A grid of buttons running scripts, under one heading"
  },
  preview: !0
});
function ne(s, e) {
  if (s) {
    if (e && s.toLowerCase().startsWith(e.toLowerCase())) {
      const t = s.slice(e.length).trim();
      if (t) return t;
    }
    return s;
  }
}
function Gs(s) {
  return s ? s.replace(/[\s—-]*(battery(\s+level)?|заряд)\s*$/i, "").trim() || s : void 0;
}
function fn(s) {
  return s ? s.replace(
    /[\s—-]*(soil\s+)?(moisture|влажность(\s+почвы)?)\s*$/i,
    ""
  ).trim() || s : void 0;
}
function ve(s) {
  return s === void 0 ? "var(--state-unavailable-color)" : s >= 70 ? "var(--state-sensor-battery-high-color, #4caf50)" : s >= 30 ? "var(--state-sensor-battery-medium-color, #ffa600)" : "var(--state-sensor-battery-low-color, #db4437)";
}
const gn = ve;
function vn(s) {
  return s === void 0 ? "var(--state-unavailable-color)" : s >= 90 ? "var(--error-color, #db4437)" : s >= 80 ? "var(--warning-color, #ffa600)" : "var(--state-icon-color)";
}
function j(s) {
  return typeof s == "string" ? { entity: s } : s;
}
const _n = [
  [/black|pgbk|_bk(_|$)/i, "black"],
  [/cyan/i, "cyan"],
  [/magenta/i, "purple"],
  [/yellow/i, "yellow"],
  // MC is the maintenance tank, not ink. It gets its own shade, otherwise it is
  // indistinguishable from black: that one is painted in the text colour and
  [/_mc(_|$)|maintenance/i, "blue-grey"]
];
function bn(s) {
  return _n.find(([t]) => t.test(s))?.[1];
}
function yn(s) {
  return s === "black" ? "var(--primary-text-color)" : /^(#|rgb|hsl|var\()/.test(s) ? s : `var(--${s}-color, var(--state-icon-color))`;
}
const wn = ne, cs = (s, e) => typeof s == "number" && Number.isFinite(s) ? s : e;
function xn(s, e, t) {
  const r = Number(s);
  if (!Number.isFinite(r)) return;
  const i = cs(e.marker_high_level, 100), n = cs(e.marker_low_level, 0), o = String(e.marker_type ?? "").includes("waste"), l = i > 0 ? Math.max(0, Math.min(100, r / i * 100)) : 0, a = o ? r >= i : r <= (t ?? n);
  return { fill: l, alarm: a, fills: o };
}
var $n = Object.defineProperty, kn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && $n(e, t, i), i;
};
class Ys extends $ {
  static {
    this.styles = [W, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      (this._config?.cartridges.length ?? 0) + (this._config?.sensors?.length ?? 0)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => va), document.createElement(
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
    return this._config.cartridges.map((t) => j(t)).map((t) => {
      const r = this.hass.states[t.entity];
      return {
        entityId: t.entity,
        name: t.name ?? wn(r?.attributes.friendly_name, e),
        ink: yn(
          t.color ?? bn(t.entity) ?? "grey"
        ),
        marker: r ? xn(
          r.state,
          r.attributes,
          this._config.low_below
        ) : void 0,
        text: r ? this.hass.formatEntityState(r) : "—"
      };
    });
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._tanks(), t = e.filter((a) => !a.marker && a.text === "—");
    if (t.length)
      return this.renderWarning(
        `Entities not found: ${t.map((a) => a.entityId).join(", ")}`
      );
    const i = e.filter((a) => a.marker && !a.marker.fills).reduce(
      (a, c) => !a || c.marker.fill < a.marker.fill ? c : a,
      void 0
    ), n = this._config.status ? p(this.hass, this._config.status) : void 0, o = (this._config.sensors ?? []).map((a) => j(a)).map((a) => p(this.hass, a.entity)), l = n?.stateObj;
    return this.renderTile({
      icon: "mdi:printer",
      color: l ? N(l) : "var(--state-icon-color)",
      primary: this._printerName ?? d(this.hass, "printer.title"),
      secondary: S([
        L(this.hass, n),
        ...o.map((a) => L(this.hass, a))
      ]),
      mainEntityId: this._config.status ?? i?.entityId,
      values: i ? [
        {
          value: String(Math.round(i.marker.fill)),
          unit: "%",
          entityId: i.entityId,
          icon: "mdi:water"
        }
      ] : [],
      customFeatures: K(
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
kn([
  b()
], Ys.prototype, "_config");
k("horos-printer-tile", Ys, {
  type: "horos-printer-tile",
  name: { ru: "Принтер", en: "Printer" },
  description: {
    ru: "Уровни чернил и состояние принтера в одной плитке",
    en: "Ink levels and printer status in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = oe(s, e), r = t.filter(
      (n) => s.states[n]?.attributes.marker_type !== void 0
    );
    if (!r.length) return null;
    const i = t.find(
      (n) => M(n) === "sensor" && !r.includes(n) && Number.isNaN(Number(s.states[n]?.state))
    );
    return H(
      "custom:horos-printer-tile",
      { status: i },
      { cartridges: r }
    );
  }
});
var En = Object.defineProperty, Cn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && En(e, t, i), i;
};
const Sn = 20;
class Xs extends $ {
  static {
    this.styles = [W, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(this._config?.consumables?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => _a), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.vacuum), r = p(this.hass, e.battery), i = (e.sensors ?? []).map((c) => j(c)).map((c) => p(this.hass, c.entity)), n = this.missingRolesWarning([t, r, ...i]);
    if (n) return this.renderWarning(n);
    const o = t?.stateObj?.attributes.friendly_name, l = e.low_below ?? Sn, a = (e.consumables ?? []).map((c) => j(c)).map((c) => {
      const h = p(this.hass, c.entity), u = B(h) ?? 0, v = c.name ?? ne(h?.stateObj?.attributes.friendly_name, o);
      return {
        entityId: c.entity,
        name: v ?? c.entity,
        text: `${u}%`,
        // Painting them in the tile colour is wrong: a docked vacuum's colour
        // is the inactive one and every bar comes out the same grey. We paint
        // by level — a consumable asks the same question a battery does.
        ink: c.color ?? ve(u),
        level: u,
        alarm: u < l
      };
    });
    return this.renderTile({
      icon: "mdi:robot-vacuum",
      color: N(t?.stateObj),
      primary: e.name ?? o ?? d(this.hass, "vacuum.title"),
      mainEntityId: t?.entityId,
      secondary: S([
        U(this.hass, t),
        this.mainStateSegment(t),
        ...i.map((c) => L(this.hass, c))
      ]),
      values: r ? this.bigValues([{ key: "battery", role: r }]) : [],
      customFeatures: a.length ? K(a, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
Cn([
  b()
], Xs.prototype, "_config");
k("horos-vacuum-tile", Xs, {
  type: "horos-vacuum-tile",
  name: { ru: "Пылесос", en: "Vacuum" },
  description: {
    ru: "Состояние робота, заряд и ресурс расходников в одной плитке",
    en: "Robot status, battery and consumable life in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = oe(s, e), r = Re(t, "vacuum"), i = D(s, t, "sensor", "battery");
    return !r || !i ? null : H("custom:horos-vacuum-tile", { vacuum: r, battery: i });
  }
});
var An = Object.defineProperty, Tn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && An(e, t, i), i;
};
const On = 30;
class Zs extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ba), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = e.low_below ?? On, r = [], i = [];
    for (const l of e.batteries) {
      const a = j(l), c = p(this.hass, a.entity);
      if (c?.missing) {
        i.push(a.entity);
        continue;
      }
      const h = B(c);
      h !== void 0 && r.push({
        entityId: a.entity,
        name: a.name ?? Gs(c?.stateObj?.attributes.friendly_name) ?? a.entity,
        level: h
      });
    }
    const n = r.filter((l) => l.level < t).sort((l, a) => l.level - a.level), o = n[0];
    return this.renderTile({
      icon: o ? "mdi:battery-alert-variant-outline" : "mdi:battery",
      color: gn(o?.level),
      primary: e.name ?? d(this.hass, "batteries.title"),
      mainEntityId: o?.entityId,
      secondary: S([
        ...n.length ? n.map((l) => ({
          text: `${l.name} ${l.level}%`,
          entityId: l.entityId
        })) : [
          {
            text: d(this.hass, "batteries.allFull", {
              count: r.length
            })
          }
        ],
        // A row that disappeared is dropped, but staying silent about it is not
        // an option: a list card must not go dark over one renamed entity, and
        // must not pretend the entity was never there.
        ...i.length ? [{ text: d(this.hass, "list.missing", { count: i.length }) }] : []
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
Tn([
  b()
], Zs.prototype, "_config");
k("horos-batteries-tile", Zs, {
  type: "horos-batteries-tile",
  name: { ru: "Батарейки", en: "Batteries" },
  description: {
    ru: "Только садящиеся батарейки, от самой пустой",
    en: "Only the batteries that are running down, emptiest first"
  },
  preview: !0,
  suggest: (s, e) => M(e) !== "sensor" || ee(s, e) !== "battery" ? null : H(
    "custom:horos-batteries-tile",
    {},
    { batteries: Ie(s, e, "sensor", ["battery"]) }
  )
});
var Pn = Object.defineProperty, Rn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Pn(e, t, i), i;
};
class Js extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ya), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = [], r = [], i = [];
    let n = 0;
    for (const a of e.sensors) {
      const c = j(a), h = p(this.hass, c.entity);
      if (h?.missing) {
        i.push(c.entity);
        continue;
      }
      n += 1;
      const u = c.name ?? h?.stateObj?.attributes.friendly_name ?? c.entity;
      h?.unavailable ? r.push({ text: d(this.hass, "safety.offline", { name: u }), entityId: c.entity }) : h?.stateObj?.state === "on" && t.push({ text: u, entityId: c.entity });
    }
    const o = t.length > 0, l = [...t, ...r];
    return this.renderTile({
      icon: o ? "mdi:shield-alert" : r.length ? "mdi:shield-off-outline" : "mdi:shield-check",
      color: o ? "var(--error-color, #db4437)" : r.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "safety.title"),
      mainEntityId: l[0]?.entityId,
      secondary: S([
        ...l.length ? l : [{ text: d(this.hass, "safety.calm", { count: n }) }],
        ...i.length ? [{ text: d(this.hass, "list.missing", { count: i.length }) }] : []
      ])
    });
  }
}
Rn([
  b()
], Js.prototype, "_config");
k("horos-safety-tile", Js, {
  type: "horos-safety-tile",
  name: { ru: "Безопасность", en: "Safety" },
  description: {
    ru: "Протечка, дым, газ — и датчики, потерявшие связь",
    en: "Leak, smoke, gas — and sensors that lost connection"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["moisture", "gas", "smoke", "carbon_monoxide", "safety"];
    return M(e) !== "binary_sensor" || !t.includes(ee(s, e) ?? "") ? null : H(
      "custom:horos-safety-tile",
      {},
      { sensors: Ie(s, e, "binary_sensor", t) }
    );
  }
});
var In = Object.defineProperty, Mn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && In(e, t, i), i;
};
const us = ["disk", "download", "upload"];
class Qs extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["disk"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => wa), document.createElement(
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
    this._bigKeys = Z(e.big_values, "disk", us), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = us.map((a) => ({
      key: a,
      role: p(this.hass, e[a])
    })), r = p(this.hass, e.status), i = (e.services ?? []).map((a) => j(a)).map((a) => p(this.hass, a.entity)), n = this.missingRolesWarning([
      r,
      ...t.map((a) => a.role),
      ...i
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = X(t, this._bigKeys);
    return this.renderTile({
      icon: "mdi:server",
      color: r ? N(r.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "server.title"),
      mainEntityId: r?.entityId ?? t[0].role?.entityId,
      secondary: S([
        U(this.hass, r),
        this.mainStateSegment(r),
        ...l.map((a) => {
          const c = L(this.hass, a.role);
          if (!c) return;
          const h = a.key === "download" ? "↓ " : a.key === "upload" ? "↑ " : "";
          return { ...c, text: h + c.text };
        }),
        ...i.map((a) => L(this.hass, a))
      ]),
      values: this.bigValues(o)
    });
  }
}
Mn([
  b()
], Qs.prototype, "_config");
k("horos-server-tile", Qs, {
  type: "horos-server-tile",
  name: { ru: "Домашний сервер", en: "Home server" },
  description: {
    ru: "Диск, скорости и состояние сервисов в одной плитке",
    en: "Disk, speeds and service status in a single tile"
  },
  preview: !0
});
var jn = Object.defineProperty, Nn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && jn(e, t, i), i;
};
class er extends $ {
  static {
    this.styles = [
      W,
      V,
      Q`
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
    return await Promise.resolve().then(() => xa), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.person), r = p(this.hass, e.battery), i = p(this.hass, e.location), n = this.missingRolesWarning([t, r, i]);
    if (n) return this.renderWarning(n);
    const o = (e.devices ?? []).map((l) => j(l)).map((l) => {
      const a = p(this.hass, l.entity), c = B(a), h = l.name ?? Gs(
        ne(
          a?.stateObj?.attributes.friendly_name,
          e.name
        )
      ) ?? l.entity, u = Ei(p(this.hass, l.charging));
      return {
        entityId: l.entity,
        name: h,
        text: c === void 0 ? d(this.hass, "value.unknown") : `${c}%`,
        ink: l.color ?? ve(c),
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
      color: N(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "person.title"),
      mainEntityId: t?.entityId,
      imageUrl: this.entityImage(t?.stateObj),
      secondary: S([
        U(this.hass, t),
        this.mainStateSegment(t),
        L(this.hass, i)
      ]),
      values: r ? this.bigValues([{ key: "battery", role: r }]) : [],
      customFeatures: o.length ? K(o, (l) => this.fireMoreInfo(l)) : void 0
    });
  }
}
Nn([
  b()
], er.prototype, "_config");
k("horos-person-tile", er, {
  type: "horos-person-tile",
  name: { ru: "Человек", en: "Person" },
  description: {
    ru: "Дома ли он, где именно и заряд его устройств",
    en: "Whether they are home, where exactly, and their devices' battery"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "person") return null;
    const r = (s.states[e]?.attributes.device_trackers ?? []).map((i) => D(s, oe(s, i), "sensor", "battery")).find(Boolean);
    return r ? H("custom:horos-person-tile", {
      person: e,
      battery: r
    }) : null;
  }
});
function ot(s, e, t) {
  if (!s || !e?.length) return;
  let r, i;
  for (const n of e) {
    const o = p(s, n), l = B(o);
    l !== void 0 && (i === void 0 || (t === "max" ? l > i : l < i)) && (r = o, i = l);
  }
  return r ?? p(s, e[0]);
}
var Fn = Object.defineProperty, Ln = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Fn(e, t, i), i;
};
const Hn = [
  "temperature",
  "cpu",
  "memory",
  "gpu",
  "disk"
];
class tr extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [W, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    const e = this._config?.disk_rows ? this._config.disks?.length ?? 0 : 1;
    return this.levelRows(3 + Math.max(e, 1)) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => $a), document.createElement(
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
    this._bigKeys = Z(
      e.big_values,
      "temperature",
      Hn
    ), this.base = e, this._config = e;
  }
  /** The card's roles: the lists are already reduced to their extreme sensor. */
  _roles() {
    const e = this._config;
    return [
      {
        key: "temperature",
        role: ot(this.hass, e.temperatures, "max")
      },
      { key: "cpu", role: p(this.hass, e.cpu) },
      { key: "memory", role: p(this.hass, e.memory) },
      { key: "gpu", role: p(this.hass, e.gpu) },
      { key: "disk", role: ot(this.hass, e.disks, "max") }
    ];
  }
  /** The partition with the least free space left. */
  _freeDisk() {
    return ot(this.hass, this._config?.disks_free, "min");
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
      const r = p(this.hass, t), i = r?.stateObj?.attributes ?? {}, n = ne(i.friendly_name, e.name) ?? d(this.hass, "level.disk"), o = this._levelRow(n, r);
      if (!o) return;
      const l = i.problem === !0 || i.problem === "true";
      return {
        ...o,
        alarm: !1,
        flag: l ? "mdi:alert-circle" : void 0,
        flagTitle: l && String(i.health ?? "") || void 0
      };
    });
  }
  /** The icon's colour from the load, for color_by_load. */
  _loadTint(e, t) {
    const r = this._config, i = ["off", "not reporting", "unavailable", "unknown", "not_home"], n = e?.stateObj?.state?.toLowerCase();
    if (e && (e.unavailable || e.missing || n && i.includes(n)))
      return "var(--state-unavailable-color)";
    const o = [t[1].role, t[3].role].map((a) => B(a)).filter((a) => a !== void 0);
    if (!o.length) return "var(--state-unavailable-color)";
    const l = Math.max(...o);
    return l >= (r.load_high ?? 75) ? "var(--error-color, #db4437)" : l >= (r.load_medium ?? 30) ? "var(--warning-color, #ffa600)" : "var(--success-color, #4caf50)";
  }
  _levelRow(e, t) {
    if (!t) return;
    const r = B(t);
    return {
      entityId: t.entityId,
      name: e,
      text: r === void 0 ? d(this.hass, "value.unknown") : `${Math.round(r)}%`,
      ink: vn(r),
      level: r ?? 0,
      alarm: r !== void 0 && r >= 90,
      alarmIcon: "mdi:alert-circle"
    };
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = this._roles(), r = p(this.hass, e.status), i = (e.sensors ?? []).map((u) => j(u)).map((u) => p(this.hass, u.entity)), n = this.missingRolesWarning([
      r,
      ...t.map((u) => u.role),
      ...i
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((u) => j(u)).map((u) => ({ alert: u, role: p(this.hass, u.entity) })).filter(({ role: u }) => u?.stateObj?.state === "on").map(({ alert: u, role: v }) => ({
      text: u.name ?? ne(
        v?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? u.entity,
      entityId: u.entity
    })), { big: l } = X(t, this._bigKeys), a = this._freeDisk(), c = B(a), h = [
      this._levelRow(d(this.hass, "level.cpu"), t[1].role),
      this._levelRow(d(this.hass, "level.memory"), t[2].role),
      this._levelRow(d(this.hass, "level.gpu"), t[3].role),
      ...e.disk_rows ? this._diskRows() : [this._levelRow(d(this.hass, "level.disk"), t[4].role)],
      // Free space is a resource that runs out, so both the colour and the alarm
      // here behave like a battery's, not like load's.
      a ? {
        entityId: a.entityId,
        name: d(this.hass, "level.diskFree"),
        text: c === void 0 ? d(this.hass, "value.unknown") : `${Math.round(c)}%`,
        ink: ve(c),
        level: c ?? 0,
        alarm: c !== void 0 && c < 10,
        alarmIcon: "mdi:harddisk"
      } : void 0
    ].filter((u) => !!u);
    return this.renderTile({
      icon: "mdi:desktop-tower-monitor",
      color: e.color_by_load ? this._loadTint(r, t) : r ? N(r.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "computer.title"),
      mainEntityId: r?.entityId ?? t[0].role?.entityId ?? a?.entityId,
      secondary: S([
        U(this.hass, r),
        ...o,
        ...i.map((u) => L(this.hass, u)),
        // Load and disks are already shown as bars with their own labels.
        ...this._bigKeys.includes("temperature") ? [] : [L(this.hass, t[0].role)]
      ]),
      values: this.bigValues(l),
      customFeatures: h.length ? K(h, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
Ln([
  b()
], tr.prototype, "_config");
k("horos-computer-tile", tr, {
  type: "horos-computer-tile",
  name: { ru: "Компьютер", en: "Computer" },
  description: {
    ru: "Самая горячая точка, загрузка и диски в одной плитке",
    en: "Hottest spot, load and disks in a single tile"
  },
  preview: !0
});
var Dn = Object.defineProperty, zn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Dn(e, t, i), i;
};
const hs = ["pm25", "humidity", "temperature", "power"];
class sr extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["pm25"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ka), document.createElement("horos-air-tile-editor");
  }
  static getStubConfig() {
    return { appliance: "" };
  }
  setConfig(e) {
    if (!e.appliance)
      throw new Error("An appliance is required (appliance)");
    this._bigKeys = Z(e.big_values, "pm25", hs), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.appliance), r = hs.map((c) => ({
      key: c,
      role: p(this.hass, e[c])
    })), i = (e.sensors ?? []).map((c) => j(c)).map((c) => p(this.hass, c.entity)), n = this.missingRolesWarning([
      t,
      ...r.map((c) => c.role),
      ...i
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((c) => j(c)).map((c) => ({ alert: c, role: p(this.hass, c.entity) })).filter(({ role: c }) => c?.stateObj?.state === "on").map(({ alert: c, role: h }) => ({
      text: c.name ?? ne(
        h?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? c.entity,
      entityId: c.entity
    })), { big: l, rest: a } = X(r, this._bigKeys);
    return this.renderTile({
      icon: e.humidity ? "mdi:air-humidifier" : "mdi:air-filter",
      color: N(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "air.title"),
      mainEntityId: t?.entityId,
      secondary: S([
        U(this.hass, t),
        ...o,
        this.mainStateSegment(t),
        ...i.map((c) => L(this.hass, c)),
        ...a.map((c) => L(this.hass, c.role))
      ]),
      values: this.bigValues(l)
    });
  }
}
zn([
  b()
], sr.prototype, "_config");
k("horos-air-tile", sr, {
  type: "horos-air-tile",
  name: { ru: "Воздух", en: "Air" },
  description: {
    ru: "Очиститель, рекуператор, увлажнитель — прибор и что с воздухом",
    en: "Purifier, recuperator, humidifier — the appliance and the air"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = oe(s, e), r = {
      appliance: Re(t, "fan", "humidifier"),
      pm25: D(s, t, "sensor", "pm25"),
      humidity: D(s, t, "sensor", "humidity"),
      temperature: D(s, t, "sensor", "temperature"),
      power: D(s, t, "sensor", "power")
    };
    return !r.appliance || Me(r) < 2 ? null : H("custom:horos-air-tile", r);
  }
});
var Un = Object.defineProperty, Wn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Un(e, t, i), i;
};
const ds = ["illuminance", "battery"], qn = 1, Bn = 2, rr = 4;
function mt(s, e) {
  if (!e || e.controls === !1) return [];
  const t = Number(
    s?.states[e.cover]?.attributes.supported_features ?? 0
  ), r = [];
  return (t & rr) !== 0 && r.push({ type: "cover-position" }), (t & (qn | Bn)) !== 0 && r.push({ type: "cover-open-close" }), r;
}
class ir extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["illuminance"];
  }
  static {
    this.styles = [W, V];
  }
  /** One row for our own bar, plus whatever controls sit under it. */
  contentRows() {
    return this.levelRows(1) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(mt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ea), document.createElement(
      "horos-cover-tile-editor"
    );
  }
  static getStubConfig() {
    return { cover: "" };
  }
  setConfig(e) {
    if (!e.cover)
      throw new Error("A cover is required (cover)");
    this._bigKeys = Z(e.big_values, "illuminance", ds), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.cover), r = p(this.hass, e.position), i = ds.map((f) => ({
      key: f,
      role: p(this.hass, e[f])
    })), n = this.missingRolesWarning([
      t,
      r,
      ...i.map((f) => f.role)
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = X(i, this._bigKeys), c = (Number(
      t?.stateObj?.attributes.supported_features ?? 0
    ) & rr) !== 0, h = mt(this.hass, e), u = B(r), v = r && !c ? [
      {
        entityId: r.entityId,
        name: d(this.hass, "level.open"),
        text: u === void 0 ? d(this.hass, "value.unknown") : `${Math.round(u)}%`,
        ink: ve(u),
        level: u ?? 0
      }
    ] : [];
    return this.renderTile({
      icon: "mdi:curtains",
      color: N(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "cover.title"),
      mainEntityId: t?.entityId,
      secondary: S([
        U(this.hass, t),
        this.mainStateSegment(t),
        ...l.map((f) => L(this.hass, f.role))
      ]),
      values: this.bigValues(o),
      ownFeatures: h,
      customFeatures: v.length ? K(v, (f) => this.fireMoreInfo(f)) : void 0
    });
  }
}
Wn([
  b()
], ir.prototype, "_config");
k("horos-cover-tile", ir, {
  type: "horos-cover-tile",
  name: { ru: "Шторы", en: "Curtains" },
  description: {
    ru: "Насколько открыты, светло ли снаружи и сколько заряда",
    en: "How far open, how bright outside, and battery"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = oe(s, e), r = {
      cover: Re(t, "cover"),
      illuminance: D(s, t, "sensor", "illuminance"),
      battery: D(s, t, "sensor", "battery")
    };
    return !r.cover || Me(r) < 2 ? null : H("custom:horos-cover-tile", r);
  }
});
const Vn = [
  "update",
  "select",
  "text",
  "button",
  "number",
  "event",
  "notify"
];
function Kn(s, e = {}) {
  if (!s) return [];
  const t = new Set(e.ignore ?? []), r = new Set(
    e.ignoreDomains ?? Vn
  ), i = /* @__PURE__ */ new Map();
  for (const [n, o] of Object.entries(s.states)) {
    if (!o || o.state !== "unavailable" || t.has(n) || r.has(n.split(".")[0])) continue;
    const l = s.entities?.[n];
    if (l?.hidden) continue;
    const a = l?.device_id ? s.devices?.[l.device_id] : void 0, c = a?.name_by_user ?? a?.name ?? o.attributes.friendly_name ?? n, h = l?.device_id ?? n, u = i.get(h);
    u ? u.count += 1 : i.set(h, { name: c, count: 1, entityId: n });
  }
  return [...i.values()].sort(
    (n, o) => o.count - n.count || n.name.localeCompare(o.name)
  );
}
var Gn = Object.defineProperty, Yn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Gn(e, t, i), i;
};
const Xn = 4;
class nr extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ca), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = Kn(this.hass, {
      ignore: e.ignore,
      ignoreDomains: e.ignore_domains
    }), r = e.limit ?? Xn, i = t.slice(0, r), n = t.length - i.length;
    return this.renderTile({
      icon: t.length ? "mdi:lan-disconnect" : "mdi:lan-check",
      color: t.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "offline.title"),
      mainEntityId: t[0]?.entityId,
      secondary: S(
        t.length ? [
          ...i.map((o) => ({
            text: o.count > 1 ? `${o.name} (${o.count})` : o.name,
            entityId: o.entityId
          })),
          n > 0 ? { text: d(this.hass, "offline.more", { count: n }) } : void 0
        ] : [{ text: d(this.hass, "offline.allAnswer") }]
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
Yn([
  b()
], nr.prototype, "_config");
k("horos-offline-tile", nr, {
  type: "horos-offline-tile",
  name: { ru: "Не отвечает", en: "Not responding" },
  description: {
    ru: "Что перестало отвечать, посчитанное по устройствам",
    en: "Devices that went silent, grouped by device"
  },
  preview: !0
});
var Zn = Object.defineProperty, Jn = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Zn(e, t, i), i;
};
const Qn = 5;
class or extends $ {
  static {
    this.styles = [W, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      Math.min(this._config?.consumers.length ?? 0, this._config?.limit ?? 5)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Sa), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.total), r = [], i = [], n = [];
    for (const h of e.consumers) {
      const u = j(h), v = p(this.hass, u.entity);
      if (v?.missing) {
        r.push(u.entity);
        continue;
      }
      const f = u.name ?? ne(v?.stateObj?.attributes.friendly_name, e.name) ?? u.entity;
      if (v?.unavailable) {
        i.push(f);
        continue;
      }
      const y = B(v);
      y === void 0 || y <= 0 || n.push({
        watts: y,
        row: {
          entityId: u.entity,
          name: f,
          text: this.hass.formatEntityState(v.stateObj),
          ink: u.color ?? "var(--amber-color, #ffc107)"
        }
      });
    }
    n.sort((h, u) => u.watts - h.watts);
    const o = n.slice(0, e.limit ?? Qn), l = o[0]?.watts ?? 0, a = o.map(({ row: h, watts: u }) => ({
      ...h,
      level: l > 0 ? u / l * 100 : 0
    })), c = [
      U(this.hass, t),
      n.length ? { text: d(this.hass, "energy.consuming", { count: n.length }) } : { text: d(this.hass, "energy.idle") },
      i.length ? { text: d(this.hass, "offline.count", { count: i.length }) } : void 0,
      r.length ? { text: d(this.hass, "list.missing", { count: r.length }) } : void 0
    ];
    return this.renderTile({
      icon: "mdi:flash",
      color: "var(--amber-color, #ffc107)",
      primary: e.name ?? d(this.hass, "energy.title"),
      mainEntityId: t?.entityId ?? o[0]?.row.entityId,
      secondary: S([this.mainStateSegment(t), ...c]),
      values: t ? this.bigValues([{ key: "total", role: t }]) : [],
      customFeatures: a.length ? K(a, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
Jn([
  b()
], or.prototype, "_config");
k("horos-energy-tile", or, {
  type: "horos-energy-tile",
  name: { ru: "Энергия", en: "Energy" },
  description: {
    ru: "Кто в доме ест электричество, от самого прожорливого",
    en: "Who in the house draws power, hungriest first"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor" || ee(s, e) !== "power")
      return null;
    const t = Ie(
      s,
      e,
      "sensor",
      ["power"],
      12,
      (r) => ns(s, r)
    );
    return t.length ? H(
      "custom:horos-energy-tile",
      { total: ns(s, e) ? void 0 : e },
      { consumers: t, limit: 6 }
    ) : null;
  }
});
var eo = Object.defineProperty, to = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && eo(e, t, i), i;
};
class ar extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Aa), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = [], r = [];
    let i = 0, n = 0;
    for (const o of e.areas) {
      const l = j(o), a = p(this.hass, l.entity);
      if (a?.missing) {
        r.push(l.entity);
        continue;
      }
      if (n += 1, a?.unavailable) {
        i += 1;
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
      primary: e.name ?? d(this.hass, "presence.title"),
      mainEntityId: t[0]?.entityId,
      secondary: S([
        ...t.length ? t : [{ text: d(this.hass, "presence.empty", { count: n }) }],
        i ? { text: d(this.hass, "offline.count", { count: i }) } : void 0,
        r.length ? { text: d(this.hass, "list.missing", { count: r.length }) } : void 0
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
to([
  b()
], ar.prototype, "_config");
k("horos-presence-tile", ar, {
  type: "horos-presence-tile",
  name: { ru: "Присутствие", en: "Presence" },
  description: {
    ru: "В каких зонах сейчас есть кто-то",
    en: "Which areas have someone in them right now"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["occupancy", "presence", "motion"];
    return M(e) !== "binary_sensor" || !t.includes(ee(s, e) ?? "") ? null : H(
      "custom:horos-presence-tile",
      {},
      // One entity per area: otherwise the kitchen gets named three times.
      { areas: tn(s, e, "binary_sensor", t, 12) }
    );
  }
});
var so = Object.defineProperty, ro = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && so(e, t, i), i;
};
const io = 255;
function pt(s) {
  return !s?.group || s.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class lr extends $ {
  static {
    this.styles = [W, V];
  }
  contentRows() {
    return this.levelRows(this._config?.lights.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(pt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ta), document.createElement(
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
    return t === void 0 ? void 0 : Math.round(t / io * 100);
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.group), i = e.lights.map((f) => j(f)).map((f) => ({
      item: f,
      role: p(this.hass, f.entity)
    })), n = this.missingRolesWarning([
      t,
      ...i.map((f) => f.role)
    ]);
    if (n) return this.renderWarning(n);
    const o = i.filter((f) => f.role?.stateObj?.state === "on"), l = i.filter((f) => f.role?.unavailable), a = i.length - l.length, c = t ?? o[0]?.role ?? i[0].role, h = t?.stateObj?.attributes.friendly_name, u = i.map(({ item: f, role: y }) => {
      const z = this._brightness(y), w = y?.stateObj?.state === "on", q = Ze(this.hass, y);
      return {
        entityId: f.entity,
        name: f.name ?? ne(y?.stateObj?.attributes.friendly_name, h) ?? f.entity,
        // A dimmable light says how bright, a plain one only that it is on.
        text: q ?? (w ? z === void 0 ? d(this.hass, "light.on") : `${z}%` : d(this.hass, "light.off")),
        ink: f.color ?? N(y?.stateObj),
        level: w ? z ?? 100 : 0
      };
    }), v = this._brightness(c);
    return this.renderTile({
      icon: "mdi:lightbulb-group",
      color: N(c?.stateObj),
      primary: e.name ?? h ?? d(this.hass, "light.title"),
      mainEntityId: c?.entityId,
      defaultIconAction: he(c?.entityId),
      secondary: S([
        U(this.hass, t),
        // With nothing answering there is no "on out of" to state: the count
        // would be about lights nobody can see.
        a === 0 ? void 0 : {
          text: o.length ? d(this.hass, "light.count", {
            count: o.length,
            total: a
          }) : d(this.hass, "light.allOff")
        },
        l.length ? {
          text: d(this.hass, "offline.count", { count: l.length }),
          entityId: l[0].item.entity
        } : void 0
      ]),
      values: v === void 0 ? [] : [
        {
          value: String(v),
          unit: "%",
          entityId: c?.entityId,
          icon: Oe.brightness
        }
      ],
      ownFeatures: pt(e),
      customFeatures: K(
        u,
        (f) => this.fireMoreInfo(f)
      )
    });
  }
}
ro([
  b()
], lr.prototype, "_config");
k("horos-light-tile", lr, {
  type: "horos-light-tile",
  name: { ru: "Свет", en: "Lights" },
  description: {
    ru: "Свет комнаты одной плиткой: что горит и насколько ярко",
    en: "A room's lights in one tile: what is on and how bright"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!ie(s, e)) return null;
    const t = It(s, e, "light");
    return t.length < 2 ? null : H("custom:horos-light-tile", {}, { lights: t });
  }
});
var no = Object.defineProperty, oo = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && no(e, t, i), i;
};
const ms = ["playing", "paused", "buffering"];
function ft(s) {
  return !s || s.controls === !1 ? [] : [{ type: "media-player-playback" }];
}
class cr extends $ {
  static {
    this.styles = [W, V];
  }
  contentRows() {
    return this.levelRows(this._config?.players.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(ft(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Oa), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = e.players.map((a) => j(a)).map((a) => ({ item: a, role: p(this.hass, a.entity) })), r = this.missingRolesWarning(t.map((a) => a.role));
    if (r) return this.renderWarning(r);
    const i = t.filter(
      (a) => ms.includes(a.role?.stateObj?.state ?? "")
    ), n = i[0] ?? t[0], o = this._volume(n.role), l = t.map(({ item: a, role: c }) => {
      const h = this._volume(c), u = ms.includes(c?.stateObj?.state ?? "");
      return {
        entityId: a.entity,
        name: a.name ?? c?.stateObj?.attributes.friendly_name ?? a.entity,
        // The state, not the title: a row is a bar with a word at the end, and
        // a track name is a sentence — it pushed the volume bar off the card.
        // What is playing is named once, in the line above.
        text: c?.stateObj && this.hass ? this.hass.formatEntityState(c.stateObj) : d(this.hass, "value.unknown"),
        ink: a.color ?? N(c?.stateObj),
        level: u ? h ?? 0 : 0
      };
    });
    return this.renderTile({
      icon: "mdi:play-box-multiple",
      color: N(n.role?.stateObj),
      primary: e.name ?? n.role?.stateObj?.attributes.friendly_name ?? d(this.hass, "media.title"),
      mainEntityId: n.role?.entityId,
      defaultIconAction: he(n.role?.entityId),
      secondary: S([
        U(this.hass, n.role),
        {
          text: i.length ? this._title(n.role) ?? d(this.hass, "media.playing", { count: i.length }) : d(this.hass, "media.idle"),
          entityId: n.role?.entityId
        }
      ]),
      values: o === void 0 ? [] : [
        {
          value: String(o),
          unit: "%",
          entityId: n.role?.entityId,
          icon: Oe.volume
        }
      ],
      ownFeatures: ft(e),
      customFeatures: t.length > 1 ? K(l, (a) => this.fireMoreInfo(a)) : void 0
    });
  }
}
oo([
  b()
], cr.prototype, "_config");
k("horos-media-tile", cr, {
  type: "horos-media-tile",
  name: { ru: "Медиа", en: "Media" },
  description: {
    ru: "Что играет в доме, где и насколько громко",
    en: "What is playing in the house, where, and how loud"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!ie(s, e)) return null;
    const t = It(s, e, "media_player");
    return t.length < 2 ? null : H("custom:horos-media-tile", {}, { players: t });
  }
});
const ur = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function $e(s, e, t) {
  const r = s.states[e];
  if (!r) return;
  const i = t ? r.attributes[t] : r.state;
  if (i == null || ur.has(String(i))) return;
  const n = Number(i);
  return Number.isFinite(n) ? n : void 0;
}
function ao(s, e) {
  if (!e) return;
  const t = s.states[e]?.state;
  if (!t || ur.has(t) || !/^\d{1,2}:\d{2}/.test(t)) return;
  const [r, i] = t.split(":").map(Number);
  return new Date(2e3, 0, 1, r, i).toLocaleTimeString(s.locale?.language ?? void 0, {
    hour: "numeric",
    minute: "2-digit"
  });
}
function lo(s, e, t, r, i) {
  const n = Math.round((s + e * t) / t) * t, o = Number(n.toFixed(4));
  return r !== void 0 && o < r ? r : i !== void 0 && o > i ? i : o;
}
function ps(s, e, t) {
  const r = $e(s, e);
  if (r === void 0) return;
  const i = lo(
    r,
    t,
    $e(s, e, "step") ?? 1,
    $e(s, e, "min"),
    $e(s, e, "max")
  );
  i !== r && s.callService(e.split(".")[0], "set_value", { entity_id: e, value: i }).catch(() => {
  });
}
function co(s, e, t) {
  return e.length ? _`<div class="schedule">
    ${e.map((r) => {
    const i = $e(s, r.temperature), n = s.states[r.temperature]?.attributes.unit_of_measurement ?? "", o = ao(s, r.time), l = (a) => a.stopPropagation();
    return _`<div class="period">
        <button
          class="when"
          title=${s.states[r.time ?? r.temperature]?.attributes.friendly_name ?? ""}
          @click=${(a) => {
      l(a), t(r.time ?? r.temperature);
    }}
        >
          ${r.icon ? _`<ha-icon icon=${r.icon}></ha-icon>` : m}
          ${o ? _`<span>${o}</span>` : m}
        </button>
        <div class="stepper">
          <button
            aria-label="−"
            @click=${(a) => {
      l(a), ps(s, r.temperature, -1);
    }}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="value">${i === void 0 ? "—" : `${i}${n}`}</span>
          <button
            aria-label="+"
            @click=${(a) => {
      l(a), ps(s, r.temperature, 1);
    }}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`;
  })}
  </div>` : m;
}
const uo = Q`
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
`, fs = ["heat_cool", "auto", "cool", "heat", "dry", "fan_only", "off"], ho = {
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};
function mo(s) {
  const e = Array.isArray(s) ? s.map(String) : [], t = fs.filter((i) => e.includes(i)), r = e.filter((i) => !fs.includes(i));
  return [...t.filter((i) => i !== "off"), ...r, ...t.filter((i) => i === "off")];
}
function po(s, e, t, r) {
  if (!e) return _``;
  const i = mo(e.attributes.hvac_modes), n = ie(s, e.entity_id), o = n ? s.areas?.[n]?.name : void 0, l = (a) => s.formatEntityState(e, a);
  return _`
    <div class="header">
      <ha-icon-button .label=${s.localize("ui.common.close")} @click=${r}>
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <div class="titles">
        ${o ? _`<div class="subtitle">${o}</div>` : m}
        <div class="title">${t}</div>
      </div>
    </div>
    <div class="state">
      <div class="value">${s.formatEntityState(e)}</div>
      <ha-relative-time
        class="since"
        .hass=${s}
        .datetime=${e.last_changed}
        capitalize
      ></ha-relative-time>
    </div>
    <div class="control">
      <ha-control-select
        vertical
        .label=${t}
        .value=${e.state}
        .options=${i.map((a) => ({
    value: a,
    label: l(a),
    icon: _`<ha-icon icon=${ho[a] ?? "mdi:thermostat"}></ha-icon>`
  }))}
        style="--control-select-color: var(--state-climate-${e.state}-color, var(--state-climate-active-color, var(--primary-color)));"
        @value-changed=${(a) => {
    const c = a.detail.value;
    !c || c === e.state || s.callService("climate", "set_hvac_mode", {
      entity_id: e.entity_id,
      hvac_mode: c
    }).catch(() => {
    });
  }}
      ></ha-control-select>
    </div>
  `;
}
const fo = Q`
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
var go = Object.defineProperty, hr = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && go(e, t, i), i;
};
const gs = ["temperature", "humidity", "power"];
function gt(s) {
  return !s || s.controls === !1 ? [] : [{ type: "target-temperature" }, { type: "climate-hvac-modes" }];
}
class Mt extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [
      W,
      V,
      uo,
      fo
    ];
  }
  iconTap() {
    return !this._config?.modes_popup || !this._modes ? !1 : (this._modes.showModal(), !0);
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Pa), document.createElement("horos-ac-tile-editor");
  }
  static getStubConfig() {
    return { climate: "" };
  }
  setConfig(e) {
    if (!e.climate)
      throw new Error("A climate entity is required (climate)");
    const t = e.features_position ?? (e.vertical ? "bottom" : "inline");
    this._bigKeys = Z(
      e.big_values,
      // A large value and an inline control both want the right of the line;
      // the control wins, and the room temperature becomes a word among others.
      t === "inline" ? [] : "temperature",
      gs
    ), this.base = { ...e, features_position: t }, this._config = e;
  }
  /** The schedule row is a control: one layout row, never squeezed. */
  _scheduleRows() {
    return this._config?.schedule?.length ? 1 : 0;
  }
  fixedRows() {
    return this.featureRows(gt(this._config)) + this._scheduleRows();
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? Ds(e) : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.climate), r = gs.map((u) => ({
      key: u,
      role: p(this.hass, e[u])
    })), i = (e.sensors ?? []).map((u) => j(u)).map((u) => p(this.hass, u.entity)), n = this.missingRolesWarning([
      t,
      ...r.map((u) => u.role),
      ...["co2", "voc", "aqi", "pm25"].map(
        (u) => p(this.hass, e[u])
      ),
      ...i
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = X(r, this._bigKeys), a = e.air_rows ? zs(this.hass, e, Fs(e.air_bounds)) : [], c = e.air_rows ? l.filter((u) => !Pe.includes(u.key)) : l, h = this.renderTile({
      icon: "mdi:air-conditioner",
      color: N(t?.stateObj),
      primary: Ae(e.name, t) ?? d(this.hass, "ac.title"),
      mainEntityId: t?.entityId,
      // The popup needs a tappable icon; the tap itself goes to iconTap().
      defaultIconAction: e.modes_popup ? { action: "more-info" } : he(t?.entityId),
      secondary: S([
        U(this.hass, t),
        this.mainStateSegment(t),
        ...c.map((u) => L(this.hass, u.role)),
        ...i.map((u) => L(this.hass, u))
      ]),
      values: this.bigValues(o),
      ownFeatures: gt(e),
      customFeatures: a.length || e.schedule?.length ? _`<div class="ac-stack">
              ${a.length ? K(a, (u) => this.fireMoreInfo(u)) : m}
              ${co(
        this.hass,
        e.schedule ?? [],
        (u) => this.fireMoreInfo(u)
      )}
            </div>` : void 0
    });
    return e.modes_popup ? _`${h}
      <dialog
        class="modes"
        @click=${(u) => {
      u.target === u.currentTarget && this._modes?.close();
    }}
      >
        ${po(
      this.hass,
      t?.stateObj,
      Ae(e.name, t) ?? d(this.hass, "ac.title"),
      () => this._modes?.close()
    )}
      </dialog>` : h;
  }
}
hr([
  b()
], Mt.prototype, "_config");
hr([
  wi("dialog.modes")
], Mt.prototype, "_modes");
k("horos-ac-tile", Mt, {
  type: "horos-ac-tile",
  name: { ru: "Кондиционер", en: "Air conditioner" },
  description: {
    ru: "Климатический прибор, воздух в комнате и цена работы",
    en: "A climate unit, the air in the room, and what running it costs"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = oe(s, e), r = Re(t, "climate");
    if (!r) return null;
    const i = ie(s, r) ? It(s, r, "sensor") : [], n = {
      climate: r,
      temperature: D(s, i, "sensor", "temperature"),
      humidity: D(s, i, "sensor", "humidity"),
      power: D(s, t, "sensor", "power")
    };
    return Me(n) < 2 ? null : H("custom:horos-ac-tile", n);
  }
});
function vo(s, e = {}) {
  if (!s) return [];
  const t = new Set(e.ignore ?? []), r = [];
  for (const [i, n] of Object.entries(s.states)) {
    if (!i.startsWith("update.") || n?.state !== "on" || t.has(i)) continue;
    const o = s.entities?.[i];
    if (o?.hidden) continue;
    const l = o?.device_id ? s.devices?.[o.device_id] : void 0, a = n.attributes.latest_version;
    r.push({
      entityId: i,
      name: l?.name_by_user ?? l?.name ?? n.attributes.title ?? n.attributes.friendly_name ?? i,
      version: a,
      skipped: a !== void 0 && a === n.attributes.skipped_version
    });
  }
  return r.sort((i, n) => i.name.localeCompare(n.name));
}
var _o = Object.defineProperty, bo = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && _o(e, t, i), i;
};
const yo = 4;
class dr extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ra), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = vo(this.hass, { ignore: e.ignore }), r = e.include_skipped ? t : t.filter((l) => !l.skipped), i = e.limit ?? yo, n = r.slice(0, i), o = r.length - n.length;
    return this.renderTile({
      icon: r.length ? "mdi:package-up" : "mdi:package-variant-closed-check",
      color: r.length ? "var(--info-color, #2196f3)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "updates.title"),
      mainEntityId: r[0]?.entityId,
      secondary: S(
        r.length ? [
          ...n.map((l) => ({
            text: l.version ? `${l.name} ${l.version}` : l.name,
            entityId: l.entityId
          })),
          o > 0 ? { text: d(this.hass, "offline.more", { count: o }) } : void 0
        ] : [{ text: d(this.hass, "updates.upToDate") }]
      ),
      values: r.length ? [
        {
          value: String(r.length),
          entityId: r[0]?.entityId,
          icon: Oe.updates
        }
      ] : []
    });
  }
}
bo([
  b()
], dr.prototype, "_config");
k("horos-updates-tile", dr, {
  type: "horos-updates-tile",
  name: { ru: "Обновления", en: "Updates" },
  description: {
    ru: "Что в доме просит обновления, одной плиткой вместо тридцати",
    en: "What in the house asks to be updated, one tile instead of thirty"
  },
  preview: !0,
  suggest: (s, e) => e.startsWith("update.") ? H("custom:horos-updates-tile", {}) : null
});
var wo = Object.defineProperty, xo = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && wo(e, t, i), i;
};
class mr extends $ {
  static {
    this.styles = [W, V];
  }
  contentRows() {
    return this.levelRows(this._config?.lists.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ia), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.calendar), r = e.lists.map((c) => j(c)).map((c) => {
      const h = p(this.hass, c.entity);
      return { item: c, role: h, count: B(h) ?? 0 };
    }), i = this.missingRolesWarning([
      t,
      ...r.map((c) => c.role)
    ]);
    if (i) return this.renderWarning(i);
    const n = r.reduce((c, h) => c + h.count, 0), o = Math.max(...r.map((c) => c.count), 1), l = r.filter((c) => c.count > 0).map(({ item: c, role: h, count: u }) => ({
      entityId: c.entity,
      name: c.name ?? h?.stateObj?.attributes.friendly_name ?? c.entity,
      text: String(u),
      ink: c.color ?? "var(--state-icon-color, var(--primary-color))",
      level: u / o * 100
    })), a = t?.stateObj?.attributes.message;
    return this.renderTile({
      icon: n ? "mdi:format-list-checks" : "mdi:check-all",
      color: n ? "var(--state-icon-color, var(--primary-color))" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "tasks.title"),
      mainEntityId: r[0]?.item.entity,
      secondary: S([
        U(this.hass, t),
        { text: n ? void 0 : d(this.hass, "tasks.none") },
        t ? {
          text: a ?? d(this.hass, "tasks.noEvents"),
          entityId: t.entityId
        } : void 0
      ]),
      values: n ? [
        {
          value: String(n),
          entityId: r[0]?.item.entity,
          icon: Oe.tasks
        }
      ] : [],
      customFeatures: l.length ? K(l, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
xo([
  b()
], mr.prototype, "_config");
k("horos-tasks-tile", mr, {
  type: "horos-tasks-tile",
  name: { ru: "Задачи", en: "Tasks" },
  description: {
    ru: "Сколько дел на каждом списке и что ближайшее в календаре",
    en: "How much is left on each list, and what is coming up next"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!e.startsWith("todo.")) return null;
    const t = Object.keys(s.states).filter((i) => i.startsWith("todo.") && !s.entities?.[i]?.hidden).sort(), r = [e, ...t.filter((i) => i !== e)];
    return r.length < 2 ? null : H("custom:horos-tasks-tile", {}, { lists: r });
  }
});
const $o = "on";
function ko(s) {
  const e = s.alert_when;
  return e === void 0 ? [$o] : Array.isArray(e) ? e : [e];
}
function Eo(s, e) {
  return e === void 0 || e === "unavailable" || e === "unknown" ? !1 : ko(s).includes(e);
}
var Co = Object.defineProperty, So = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Co(e, t, i), i;
};
const Ao = 4;
class pr extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ma), document.createElement(
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
    if (!this._config || !this.hass) return m;
    const e = this._config, t = e.watch_offline !== !1, r = [], i = [], n = [];
    let o, l = 0;
    for (const v of e.alerts) {
      const f = j(v), y = p(this.hass, f.entity);
      if (y?.missing) {
        n.push(f.entity);
        continue;
      }
      l += 1;
      const z = f.name ?? y?.stateObj?.attributes.friendly_name ?? f.entity;
      if (y?.unavailable) {
        t && i.push({
          text: d(this.hass, "alerts.offline", { name: z }),
          entityId: f.entity
        });
        continue;
      }
      Eo(f, y?.stateObj?.state) && (r.push({ text: z, entityId: f.entity }), o = o ?? (f.color ? Ns(f.color) : void 0));
    }
    const a = [...r, ...i], c = e.limit ?? Ao, h = a.slice(0, c), u = a.length - h.length;
    return this.renderTile({
      icon: r.length ? "mdi:alert" : i.length ? "mdi:bell-off-outline" : "mdi:bell-check-outline",
      color: o ?? (r.length ? "var(--error-color, #db4437)" : i.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)"),
      primary: e.name ?? d(this.hass, "alerts.title"),
      mainEntityId: a[0]?.entityId,
      secondary: S([
        ...a.length ? h : [{ text: d(this.hass, "alerts.calm", { count: l }) }],
        u > 0 ? { text: d(this.hass, "offline.more", { count: u }) } : void 0,
        ...n.length ? [{ text: d(this.hass, "list.missing", { count: n.length }) }] : []
      ]),
      values: r.length ? [
        {
          value: String(r.length),
          entityId: r[0]?.entityId,
          icon: "mdi:alert-outline"
        }
      ] : []
    });
  }
}
So([
  b()
], pr.prototype, "_config");
k("horos-alerts-tile", pr, {
  type: "horos-alerts-tile",
  name: { ru: "Оповещения", en: "Alerts" },
  description: {
    ru: "Всё, о чём стоит сказать только когда оно случилось, одной плиткой",
    en: "Everything worth mentioning only once it happens, in one tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["problem", "tamper"];
    return M(e) !== "binary_sensor" || !t.includes(ee(s, e) ?? "") ? null : H(
      "custom:horos-alerts-tile",
      {},
      { alerts: Ie(s, e, "binary_sensor", t) }
    );
  }
});
var To = Object.defineProperty, fr = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && To(e, t, i), i;
};
const He = [
  { key: "dim", icon: "mdi:brightness-4" },
  { key: "bright", icon: "mdi:brightness-7" },
  { key: "warm", icon: "mdi:weather-sunset" },
  { key: "cold", icon: "mdi:snowflake" }
];
function vt(s) {
  return !s?.state?.startsWith("light.") || s.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class jt extends $ {
  constructor() {
    super(...arguments), this._controlsReady = !1;
  }
  static {
    this.styles = [
      W,
      Q`
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
    super.connectedCallback(), Ms().then((e) => {
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
    return e ? (He.some(({ key: r }) => e[r]) ? 1 : 0) + this.featureRows(vt(e), !!e.presets?.length) : 0;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ja), document.createElement(
      "horos-lamp-tile-editor"
    );
  }
  static getStubConfig() {
    return { bright: "", dim: "" };
  }
  setConfig(e) {
    if (!(He.some(({ key: r }) => e[r]) || e.presets?.length || e.power))
      throw new Error(
        "A lamp needs at least one script: bright, dim, warm, cold, power or presets"
      );
    this.base = e, this._config = e;
  }
  /** Runs a script the way a tap action would, confirmations and all. */
  _run(e) {
    this.hass && Is(
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
    return d(this.hass, `lamp.${e}`);
  }
  /** The two halves of brightness and of colour, in one stock button group. */
  _renderSteps(e) {
    const t = He.filter(({ key: r }) => e[r]);
    return t.length ? _`
      <ha-control-select
        .options=${t.map(({ key: r, icon: i }) => ({
      value: e[r],
      ariaLabel: this._stepLabel(r),
      icon: _`<ha-icon .icon=${i}></ha-icon>`
    }))}
        .value=${void 0}
        hide-option-label
        @value-changed=${(r) => {
      this._run(r.detail.value), r.target.value = void 0;
    }}
      ></ha-control-select>
    ` : m;
  }
  /** The looks the lamp can take, as the segmented selector HA uses for modes. */
  _renderPresets(e) {
    if (!e.presets?.length) return m;
    const t = e.presets.map(
      (i) => typeof i == "string" ? { entity: i } : i
    ), r = e.preset_state ? this.hass?.states[e.preset_state]?.state : void 0;
    return _`
      <ha-control-select
        class="presets ${e.preset_labels !== !1 ? "labelled" : ""}"
        .options=${t.map((i) => {
      const n = this.hass?.states[i.entity], o = i.name ?? Vs(n?.attributes.friendly_name) ?? i.entity, l = i.icon ?? n?.attributes.icon;
      return {
        value: i.entity,
        label: o,
        ariaLabel: o,
        icon: l ? _`<ha-icon .icon=${l}></ha-icon>` : void 0
      };
    })}
        .value=${r ? t.find((i) => i.name === r)?.entity ?? r : void 0}
        ?hide-option-label=${e.preset_labels === !1}
        @value-changed=${(i) => {
      this._run(i.detail.value), e.preset_state || (i.target.value = void 0);
    }}
      >
      </ha-control-select>
    `;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.state), r = (e.sensors ?? []).map((n) => j(n)).map((n) => p(this.hass, n.entity)), i = this.missingRolesWarning([t, ...r]);
    return i ? this.renderWarning(i) : this.renderTile({
      icon: e.icon ?? "mdi:coach-lamp-variant",
      color: t ? N(t.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "lamp.title"),
      mainEntityId: t?.entityId,
      // The icon is the lamp's switch: it runs the power script where there is
      // one, and falls back to toggling whatever holds the state.
      defaultIconAction: e.power ? {
        action: "perform-action",
        perform_action: "homeassistant.turn_on",
        target: { entity_id: e.power }
      } : t ? { action: "toggle" } : { action: "none" },
      secondary: S([
        U(this.hass, t),
        this.mainStateSegment(t),
        ...r.map((n) => L(this.hass, n))
      ]),
      ownFeatures: vt(e),
      customFeatures: this._controlsReady && He.some(({ key: n }) => e[n]) ? _`<div class="lamp-controls">${this._renderSteps(e)}</div>` : void 0,
      customInline: this._controlsReady && e.presets?.length ? this._renderPresets(e) : void 0
    });
  }
}
fr([
  b()
], jt.prototype, "_config");
fr([
  b()
], jt.prototype, "_controlsReady");
k("horos-lamp-tile", jt, {
  type: "horos-lamp-tile",
  name: { ru: "Лампа на скриптах", en: "Script lamp" },
  description: {
    ru: "ИК-лампа или лента: ярче, теплее и режимы — скриптами, но как у лампы",
    en: "An IR lamp or a strip: brighter, warmer and presets, driven by scripts"
  },
  preview: !0
});
function Oo(s) {
  if (!s || Xe.has(s.state)) return "offline";
  if (s.state === "off") return "off";
  const e = s.attributes.hvac_action;
  return e === void 0 ? "unknown" : e === "heating" ? "heating" : "idle";
}
function Po(s) {
  return {
    calling: s.filter((e) => e === "heating").length,
    // "unknown" is left out on purpose: a zone that does not report demand
    // must not swell the denominator of "2 of 5 calling".
    reporting: s.filter(
      (e) => e === "heating" || e === "idle" || e === "off"
    ).length,
    offline: s.filter((e) => e === "offline").length
  };
}
var Ro = Object.defineProperty, Io = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Ro(e, t, i), i;
};
const vs = ["power", "energy"];
class gr extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  static {
    this.styles = [W, V];
  }
  contentRows() {
    return this.levelRows(this._config?.zones?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Na), document.createElement(
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
    this._bigKeys = Z(e.big_values, "power", vs), this.base = e, this._config = e;
  }
  /** What the row says on the right: where the room is and where it was sent. */
  _zoneText(e, t) {
    if (t === "offline") return Ze(this.hass, e);
    const r = e?.stateObj;
    if (!r) return;
    const i = Zt(this.hass, r, "current_temperature"), n = Zt(this.hass, r, "temperature");
    if (i && n) {
      const o = n.replace(/^[\d\s\u00a0.,+-]+/, "");
      return `${St(i, o).value} → ${n}`;
    }
    return i ?? n ?? this.hass?.formatEntityState(r);
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.mode), r = p(this.hass, e.burner), i = p(this.hass, e.pump), n = p(this.hass, e.switch), o = vs.map((w) => ({
      key: w,
      role: p(this.hass, e[w])
    })), l = (e.zones ?? []).map((w) => j(w)).map((w) => {
      const q = p(this.hass, w.entity);
      return { item: w, role: q, zone: Oo(q?.stateObj) };
    }), a = this.missingRolesWarning([
      t,
      r,
      i,
      n,
      ...o.map((w) => w.role),
      ...l.map((w) => w.role)
    ]);
    if (a) return this.renderWarning(a);
    const c = r?.stateObj?.state === "on", h = i?.stateObj?.state === "on", u = t ?? n ?? r ?? i, { calling: v, reporting: f, offline: y } = Po(
      l.map((w) => w.zone)
    ), z = l.map(({ item: w, role: q, zone: re }) => ({
      entityId: w.entity,
      name: w.name ?? ne(q?.stateObj?.attributes.friendly_name, e.name) ?? w.entity,
      text: this._zoneText(q, re) ?? "",
      ink: w.color ?? N(q?.stateObj),
      // The bar is the demand, not the temperature: a room either has the
      // boiler working for it or it does not.
      level: re === "heating" ? 100 : 0,
      alarm: re === "offline",
      alarmIcon: "mdi:lan-disconnect"
    }));
    return this.renderTile({
      icon: c ? "mdi:fire" : h ? "mdi:pump" : "mdi:water-boiler",
      color: N(c ? r.stateObj : h ? i.stateObj : u?.stateObj),
      primary: e.name ?? d(this.hass, "heating.title"),
      mainEntityId: u?.entityId,
      // The icon is the boiler's own switch where there is one; without it
      // there is nothing on this card that is safe to toggle.
      defaultIconAction: e.switch ? he(e.switch) : { action: "none" },
      secondary: S([
        U(this.hass, u),
        this.mainStateSegment(u === t ? t : u),
        // Who is asking is the card's whole point, so it is always said. That
        // nobody is asking is only worth a word when the boiler has no mode
        // sensor to say "standby" for itself.
        v ? {
          text: d(this.hass, "heating.calling", {
            count: v,
            total: f
          })
        } : f && !t ? { text: d(this.hass, "heating.quiet") } : void 0,
        y ? { text: d(this.hass, "offline.count", { count: y }) } : void 0,
        ...X(o, this._bigKeys).rest.map(
          (w) => L(this.hass, w.role)
        )
      ]),
      values: this.bigValues(X(o, this._bigKeys).big),
      customFeatures: z.length ? K(z, (w) => this.fireMoreInfo(w)) : void 0
    });
  }
}
Io([
  b()
], gr.prototype, "_config");
k("horos-heating-tile", gr, {
  type: "horos-heating-tile",
  name: { ru: "Отопление", en: "Heating" },
  description: {
    ru: "Котёл и комнаты, которые просят у него тепла, одной плиткой",
    en: "The boiler and the rooms asking it for heat, in one tile"
  },
  preview: !0
});
function Mo(s) {
  const e = { thirsty: 0, soaked: 0, reporting: 0, offline: 0 };
  for (const t of s) {
    if (t.offline) {
      e.offline += 1;
      continue;
    }
    t.status !== "unknown" && (e.reporting += 1, t.status === "dry" && (e.thirsty += 1), t.status === "wet" && (e.soaked += 1));
  }
  return e;
}
function jo(s) {
  return s.thirsty ? "dry" : s.soaked ? "wet" : s.reporting ? "ok" : "unknown";
}
const No = {
  dry: "mdi:watering-can",
  ok: "mdi:greenhouse",
  wet: "mdi:water-alert",
  unknown: "mdi:greenhouse"
};
var Fo = Object.defineProperty, Lo = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Fo(e, t, i), i;
};
const _s = [
  "temperature",
  "humidity",
  "illuminance"
];
class vr extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [W, V];
  }
  contentRows() {
    return this.levelRows(this._config?.plants?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Fa), document.createElement(
      "horos-greenhouse-tile-editor"
    );
  }
  static getStubConfig() {
    return { plants: [] };
  }
  setConfig(e) {
    if (!e.plants?.length)
      throw new Error("At least one plant is required (plants)");
    const t = e.dry_below ?? Ve, r = e.wet_above ?? Ke;
    if (t >= r)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = Z(
      e.big_values,
      "temperature",
      _s
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = _s.map((h) => ({
      key: h,
      role: p(this.hass, e[h])
    })), r = [], i = [], n = [];
    for (const h of e.plants) {
      const u = j(h), v = p(this.hass, u.entity);
      if (v?.missing) {
        n.push(u.entity);
        continue;
      }
      const f = B(v), y = qs(
        f,
        u.dry_below ?? e.dry_below ?? Ve,
        u.wet_above ?? e.wet_above ?? Ke
      ), z = !!v?.unavailable;
      i.push({ status: y, offline: z }), r.push({
        entityId: u.entity,
        name: u.name ?? fn(v?.stateObj?.attributes.friendly_name) ?? u.entity,
        text: Ze(this.hass, v) ?? Ct(this.hass, v) ?? d(this.hass, "value.unknown"),
        ink: u.color ?? ht[y],
        // A silent sensor gets an empty bar, not a full one: an empty bar reads
        // as "nothing is known here", a full one as "soaked".
        level: f ?? 0,
        // Dry is the one that needs a hand today. Soaked shows in the colour.
        alarm: z || y === "dry",
        alarmIcon: z ? "mdi:lan-disconnect" : "mdi:water-off"
      });
    }
    const o = Mo(i), l = jo(o), { big: a, rest: c } = X(t, this._bigKeys);
    return this.renderTile({
      icon: No[l],
      color: ht[l],
      primary: e.name ?? d(this.hass, "greenhouse.title"),
      // The card is about the set, so it has no main entity to act on: the
      // driest plant is the one thing worth opening from here.
      mainEntityId: r.find((h) => h.alarm)?.entityId,
      secondary: S([
        o.thirsty ? {
          text: d(this.hass, "greenhouse.thirsty", {
            count: o.thirsty,
            total: o.reporting
          })
        } : o.reporting ? {
          text: d(this.hass, "greenhouse.watered", {
            count: o.reporting
          })
        } : void 0,
        o.soaked ? { text: d(this.hass, "greenhouse.soaked", { count: o.soaked }) } : void 0,
        o.offline ? { text: d(this.hass, "offline.count", { count: o.offline }) } : void 0,
        n.length ? { text: d(this.hass, "list.missing", { count: n.length }) } : void 0,
        ...c.map((h) => L(this.hass, h.role))
      ]),
      values: this.bigValues(a),
      customFeatures: r.length ? K(r, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
Lo([
  b()
], vr.prototype, "_config");
k("horos-greenhouse-tile", vr, {
  type: "horos-greenhouse-tile",
  name: { ru: "Оранжерея", en: "Greenhouse" },
  description: {
    ru: "Все растения полосками влажности почвы и воздух, которым они дышат",
    en: "Every plant as a bar of soil moisture, and the air they share"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor" || ee(s, e) !== "moisture")
      return null;
    const t = Ie(s, e, "sensor", ["moisture"]);
    return t.length < 2 ? null : H("custom:horos-greenhouse-tile", {}, { plants: t });
  }
});
const Ho = {
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
}, Do = "mdi:weather-partly-cloudy";
function bs(s) {
  return s && Ho[s] || Do;
}
function zo(s) {
  return s ? Rs([
    `--state-weather-${Ps(s)}-color`,
    "--state-weather-active-color",
    "--state-active-color"
  ]) ?? "var(--state-icon-color)" : "var(--state-inactive-color)";
}
const Uo = {
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
}, Wo = [
  "temperature",
  "apparent_temperature",
  "dew_point",
  "humidity",
  "pressure",
  "wind_speed",
  "cloud_coverage",
  "uv_index",
  "visibility"
], qo = {
  temperature: "temperature_unit",
  templow: "temperature_unit",
  apparent_temperature: "temperature_unit",
  dew_point: "temperature_unit",
  pressure: "pressure_unit",
  wind_speed: "wind_speed_unit",
  wind_gust_speed: "wind_speed_unit",
  visibility: "visibility_unit",
  precipitation: "precipitation_unit"
}, _r = /* @__PURE__ */ new Set([
  "humidity",
  "cloud_coverage",
  "precipitation_probability"
]);
function Bo(s, e) {
  if (_r.has(e)) return "%";
  const t = qo[e];
  if (!t) return;
  const r = s?.attributes[t];
  return typeof r == "string" ? r : void 0;
}
const Vo = 1;
function ys(s) {
  return ((Number(s?.attributes.supported_features) || 0) & Vo) !== 0;
}
const _t = [
  "temperature",
  "precipitation",
  "precipitation_probability",
  "humidity",
  "wind_speed"
], bt = (s) => typeof s == "number" && Number.isFinite(s) ? s : void 0;
function Ko(s, e) {
  if (e === "temperature") return Go(s);
  const t = s.map((n) => bt(n[e])), r = t.filter((n) => n !== void 0), i = _r.has(e) ? 100 : r.length ? Math.max(...r) : 0;
  return t.map((n) => n === void 0 ? { level: 0 } : i <= 0 ? { level: 0, high: n } : { level: Math.min(100, n / i * 100), high: n });
}
function Go(s) {
  const e = s.map((l) => bt(l.temperature)), t = s.map((l, a) => bt(l.templow) ?? e[a]), r = [...e, ...t].filter(
    (l) => l !== void 0
  );
  if (!r.length) return s.map(() => ({ level: 0 }));
  const i = Math.min(...r), o = Math.max(...r) - i;
  return s.map((l, a) => {
    const c = e[a], h = t[a];
    return c === void 0 || h === void 0 ? { level: 0 } : o <= 0 ? { from: 0, level: 100, low: h, high: c } : {
      from: (h - i) / o * 100,
      level: (c - i) / o * 100,
      low: h,
      high: c
    };
  });
}
var Yo = Object.defineProperty, br = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && Yo(e, t, i), i;
};
const Xo = 7, ws = 14, Zo = ["humidity", "wind_speed"], xs = ["temperature", "humidity"], Jo = "3.75em";
class Nt extends $ {
  constructor() {
    super(...arguments), this._bigKeys = xs;
  }
  static {
    this.styles = [W, V];
  }
  contentRows() {
    return this.levelRows(this._days().length || this._wanted()) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ha), document.createElement(
      "horos-weather-tile-editor"
    );
  }
  static getStubConfig() {
    return { weather: "" };
  }
  setConfig(e) {
    if (!e.weather)
      throw new Error("A weather entity is required (weather)");
    if (e.days !== void 0 && (!Number.isInteger(e.days) || e.days < 1 || e.days > ws))
      throw new Error(`days must be a whole number between 1 and ${ws}`);
    if (e.bar && !_t.includes(e.bar))
      throw new Error(
        `Unknown bar: ${e.bar}. Allowed: ${_t.join(", ")}`
      );
    this._bigKeys = Z(
      e.big_values,
      xs,
      Wo
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
    if (!this.isConnected || !this.hass?.connection || !e || !t || !ys(t))
      return;
    this._subscribedTo = e;
    const r = this.hass.connection.subscribeMessage(
      (i) => {
        this._forecast = i.forecast ?? [];
      },
      {
        type: "weather/subscribe_forecast",
        forecast_type: "daily",
        entity_id: e
      }
    );
    this._subscribed = r, r.catch(() => {
      this._subscribed === r && this._unsubscribe();
    });
  }
  // ---- rendering -------------------------------------------------------
  _wanted() {
    return this._config?.days ?? Xo;
  }
  /** The days actually drawn: what was asked for, or what the forecast has. */
  _days() {
    return (this._forecast ?? []).slice(0, this._wanted());
  }
  /** The weekday label, in the user's own language. */
  _weekday(e) {
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : new Intl.DateTimeFormat(x(this.hass), {
      weekday: "short"
    }).format(t);
  }
  /** An attribute value with its unit split off, ready for a large value. */
  _attribute(e, t, r) {
    const i = r ?? e.attributes[t];
    if (i == null) return;
    const n = Bo(e, t), o = this.hass?.formatEntityAttributeValue?.(e, t, r) ?? `${i}${n ? ` ${n}` : ""}`;
    return St(o, n);
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
  _rowText(e, t, r) {
    if (r.high === void 0) return d(this.hass, "value.unknown");
    const i = this._attribute(
      e,
      t === "temperature" ? "temperature" : t,
      r.high
    );
    if (!i) return d(this.hass, "value.unknown");
    const n = `${i.value}${i.unit ? ` ${i.unit}` : ""}`;
    if (t !== "temperature" || r.low === void 0 || r.low === r.high)
      return n;
    const o = this._attribute(e, "templow", r.low);
    return o ? `${o.value} / ${n}` : n;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.weather);
    if (t?.missing)
      return this.renderWarning(
        d(this.hass, "entity.missing.one", { list: e.weather })
      );
    const r = t.stateObj, i = e.bar ?? "temperature", n = this._days(), o = Ko(n, i), l = n.map((h, u) => ({
      entityId: e.weather,
      name: this._weekday(h.datetime),
      text: this._rowText(r, i, o[u]),
      ink: zo(h.condition),
      icon: bs(h.condition),
      from: o[u].from,
      level: o[u].level
    })), a = [
      "state",
      ...Zo.filter(
        (h) => !this._bigKeys.includes(h) && r.attributes[h] !== void 0 && r.attributes[h] !== null
      )
    ], c = [];
    for (const h of this._bigKeys) {
      const u = this._attribute(r, h);
      u && c.push({
        ...u,
        entityId: e.weather,
        icon: Uo[h]
      });
    }
    return this.renderTile({
      icon: bs(r.state),
      color: N(r),
      primary: e.name ?? r.attributes.friendly_name ?? e.weather,
      mainEntityId: e.weather,
      secondary: S([
        U(this.hass, t),
        this.mainStateSegment(t, a),
        // A forecast the integration does not offer is worth saying out loud:
        // the card is otherwise a tile with an empty half.
        ys(r) ? void 0 : { text: d(this.hass, "weather.noForecast") }
      ]),
      values: c,
      customFeatures: l.length ? K(l, (h) => this.fireMoreInfo(h), {
        nameWidth: Jo
      }) : void 0
    });
  }
}
br([
  b()
], Nt.prototype, "_config");
br([
  b()
], Nt.prototype, "_forecast");
k("horos-weather-tile", Nt, {
  type: "horos-weather-tile",
  name: { ru: "Погода", en: "Weather" },
  description: {
    ru: "Погода на сегодня в строке и неделя полосками температуры",
    en: "Today on the line and the week as bars of temperature"
  },
  preview: !0,
  suggest: (s, e) => M(e) !== "weather" ? null : H("custom:horos-weather-tile", { weather: e })
});
function yr(s, e) {
  for (const t of e) {
    const r = s.states[t]?.state;
    if (r === void 0 || r.trim() === "") continue;
    const i = Number(r);
    if (Number.isFinite(i)) return { entityId: t, level: i };
  }
  return {};
}
function wr(s, e) {
  let t;
  for (const r of e) {
    const i = s.states[r], n = i?.last_reported ?? i?.last_updated ?? i?.last_changed;
    if (!n) continue;
    const o = Date.parse(n);
    Number.isFinite(o) && (t === void 0 || o > t) && (t = o);
  }
  return t === void 0 ? void 0 : new Date(t);
}
function Qo(s, e, t, r, i) {
  if (yr(s, e).level === void 0) return !1;
  if (t === void 0) return !0;
  const n = i ?? wr(s, e);
  return !!n && (r.getTime() - n.getTime()) / 1e3 < t;
}
function ea(s, e) {
  const t = s ? Date.parse(s) : NaN;
  return Number.isFinite(t) ? Math.max(0, Math.ceil((t - e.getTime()) / 6e4)) : 0;
}
const $s = (s) => String(s).padStart(2, "0");
function ta(s) {
  if (s.forced)
    return { key: "charge.forced", params: { minutes: s.minutesLeft } };
  if (!s.fresh) {
    if (s.on && s.pulse) return { key: "charge.pulse", params: {} };
    const e = s.since;
    return {
      key: "charge.noData",
      params: {
        time: e ? `${$s(e.getHours())}:${$s(e.getMinutes())}` : "—"
      }
    };
  }
  if (s.on !== void 0)
    return s.on ? s.max === void 0 ? { key: "charge.on", params: {} } : { key: "charge.charging", params: { max: s.max } } : s.min === void 0 ? { key: "charge.off", params: {} } : { key: "charge.waiting", params: { min: s.min } };
}
function sa(s, e, t, r, i, n) {
  const o = r > 0 ? r : 1;
  let l = Math.round(e / o) * o;
  return t !== void 0 && (l = s === "min" ? Math.min(l, t - o) : Math.max(l, t + o)), l = Math.min(n, Math.max(i, l)), Number(l.toFixed(6));
}
function ra(s) {
  return `{% set _ = now() %}{{ expand(${JSON.stringify(s)}) | map(attribute='last_reported') | map('as_timestamp') | max | default('') }}`;
}
function ia(s, e, t, r) {
  if (s === void 0) return t;
  const i = s + (e > 0 ? e : 1);
  return i > r ? t : Number(i.toFixed(6));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const na = { ATTRIBUTE: 1 }, oa = (s) => (...e) => ({ _$litDirective$: s, values: e });
let aa = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
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
const xr = "important", la = " !" + xr, xe = oa(class extends aa {
  constructor(s) {
    if (super(s), s.type !== na.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((e, t) => {
      const r = s[t];
      return r == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(s, [e]) {
    const { style: t } = s.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const r of this.ft) e[r] == null && (this.ft.delete(r), r.includes("-") ? t.removeProperty(r) : t[r] = null);
    for (const r in e) {
      const i = e[r];
      if (i != null) {
        this.ft.add(r);
        const n = typeof i == "string" && i.endsWith(la);
        r.includes("-") || n ? t.setProperty(r, n ? i.slice(0, -11) : i, n ? xr : "") : t[r] = i;
      }
    }
    return ge;
  }
});
var ca = Object.defineProperty, ae = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && ca(e, t, i), i;
};
class te extends ue {
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
    this.styles = Q`
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
    return sa(e, t, this._other(e), this.step, this.lo, this.hi);
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
    const r = t.key === "ArrowRight" || t.key === "ArrowUp" ? this.step : t.key === "ArrowLeft" || t.key === "ArrowDown" ? -this.step : 0, i = this[e];
    !r || i === void 0 || (t.preventDefault(), this._emit(e, this._clamp(e, i + r)));
  }
  _valueAt(e) {
    const r = this.shadowRoot.querySelector(".track").getBoundingClientRect(), i = r.width ? (e.clientX - r.left) / r.width : 0;
    return Math.min(1, Math.max(0, i)) * 100;
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
    const { value: r } = this._drag;
    this._drag = void 0, this._emit(e, r);
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
    const r = this._value(e);
    if (r === void 0) return m;
    const i = `${Math.min(100, Math.max(0, r))}%`;
    return _`
      <div
        class="handle ${e}"
        role="slider"
        tabindex="0"
        aria-label=${e}
        aria-valuemin=${this.lo}
        aria-valuemax=${this.hi}
        aria-valuenow=${r}
        style=${xe({ left: i })}
        @keydown=${(n) => this._onKey(e, n)}
        @pointerdown=${(n) => this._onDown(e, n)}
        @pointermove=${(n) => this._onMove(e, n)}
        @pointerup=${(n) => this._onUp(e, n)}
        @pointercancel=${() => this._drag = void 0}
        @click=${(n) => n.stopPropagation()}
      ></div>
      <span class="label ${e} ${t ? "outside" : ""}" style=${xe({ left: i })}
        >${r}</span
      >
    `;
  }
  render() {
    const e = this.level, t = this._value("min"), r = this._value("max"), i = this._labelsOutside();
    return _`
      <div class="track" style=${xe({ "--ink": ve(e) })}>
        <div
          class="fill ${this.charging ? "charging" : ""}"
          style=${xe({ width: `${Math.min(100, Math.max(0, e ?? 0))}%` })}
        ></div>
        ${t !== void 0 && r !== void 0 ? _`<div
              class="band"
              style=${xe({ left: `${t}%`, width: `${r - t}%` })}
            ></div>` : m}
        ${this._handle("min", i)} ${this._handle("max", i)}
      </div>
    `;
  }
}
ae([
  Y({ type: Number })
], te.prototype, "level");
ae([
  Y({ type: Number })
], te.prototype, "min");
ae([
  Y({ type: Number })
], te.prototype, "max");
ae([
  Y({ type: Number })
], te.prototype, "step");
ae([
  Y({ type: Number })
], te.prototype, "lo");
ae([
  Y({ type: Number })
], te.prototype, "hi");
ae([
  Y({ type: Boolean })
], te.prototype, "charging");
ae([
  b()
], te.prototype, "trackWidth");
ae([
  b()
], te.prototype, "_drag");
customElements.get("horos-charge-range") || customElements.define("horos-charge-range", te);
var ua = Object.defineProperty, Ft = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && ua(e, t, i), i;
};
const Ue = (s) => (Array.isArray(s.battery) ? s.battery : [s.battery]).filter(
  (e) => typeof e == "string" && e !== ""
);
class et extends $ {
  constructor() {
    super(...arguments), this._controlsReady = !1, this._held = !1;
  }
  static {
    this.styles = [
      W,
      Q`
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
      (r) => {
        const i = Number(r.result);
        this._reported = r.result !== "" && Number.isFinite(i) ? new Date(i * 1e3) : void 0;
      },
      { type: "render_template", template: ra(Ue(e)) }
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
    super.connectedCallback(), Ms().then((e) => {
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
    return await Promise.resolve().then(() => Da), document.createElement("horos-charge-tile-editor");
  }
  static getStubConfig() {
    return { battery: [], switch: "", min: "", max: "" };
  }
  setConfig(e) {
    if (!Ue(e).length) throw new Error("A battery sensor is required (battery)");
    const { features: t, levels: r, ...i } = e;
    this.base = i, this._unsubscribeReported(), this._config = e;
  }
  _number(e, t) {
    const r = e ? this.hass?.states[e] : void 0;
    if (!r) return;
    const i = t ? r.attributes[t] : r.state;
    if (i == null || Xe.has(String(i)))
      return;
    const n = Number(i);
    return Number.isFinite(n) ? n : void 0;
  }
  _setLimit(e) {
    const t = this._config;
    if (!t || !this.hass) return;
    const r = t[e.detail.which];
    r && this.hass.callService(r.split(".")[0], "set_value", {
      entity_id: r,
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
    const r = ia(
      this._number(t),
      this._number(t, "step") ?? 1,
      this._number(t, "min") ?? 1,
      this._number(t, "max") ?? 48
    );
    this.hass.callService(t.split(".")[0], "set_value", { entity_id: t, value: r }).catch(() => {
    });
  }
  _toggleForce(e) {
    e.stopPropagation();
    const t = this._config?.force;
    if (!t || !this.hass) return;
    const r = this.hass.states[t]?.state === "active";
    this.hass.callService("timer", r ? "cancel" : "start", { entity_id: t });
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = this.hass, r = Ue(e), i = /* @__PURE__ */ new Date(), n = p(t, e.switch), o = this.missingRolesWarning([
      n,
      p(t, e.min),
      p(t, e.max),
      p(t, e.force),
      p(t, e.pulse_every),
      // A battery list is fine with one of its sensors gone, not with all.
      r.every((le) => !t.states[le]) ? p(t, r[0]) : void 0
    ]);
    if (o) return this.renderWarning(o);
    const { entityId: l, level: a } = yr(t, r), c = l ?? r[0], h = n ? n.stateObj?.state === "on" : void 0, u = e.force ? t.states[e.force] : void 0, v = u?.state === "active", f = ea(u?.attributes.finishes_at, i), y = this._number(e.min), z = this._number(e.max), w = ta({
      forced: v,
      minutesLeft: f,
      fresh: Qo(t, r, e.stale_after, i, this._reported),
      on: h,
      pulse: !!e.pulse_every,
      min: y,
      max: z,
      since: this._reported ?? wr(t, r)
    }), q = t.states[c], re = this.renderTile({
      icon: "mdi:watch",
      // Lit while the port is on; the battery itself is always "active". With
      // no port there is nothing to be on, and the icon takes the battery colour.
      color: n ? h ? N(n.stateObj) : "var(--state-inactive-color)" : ve(a),
      primary: e.name ?? q?.attributes.friendly_name ?? d(t, "charge.title"),
      secondary: S([
        U(t, n) ?? (w ? {
          text: d(t, w.key, w.params),
          entityId: v ? e.force : e.switch ?? c
        } : void 0)
      ]),
      mainEntityId: c,
      // With a port the icon switches it by hand — the card works without the
      // automation too. The action names the port itself: the card's main
      // entity is the battery, and a toggle aimed at a sensor does nothing.
      defaultIconAction: e.switch ? { action: "toggle", entity: e.switch } : he(c),
      values: a === void 0 ? [] : [{ value: String(Math.round(a)), unit: "%", entityId: c }],
      customFeatures: _`<div class="charge-line">
        <horos-charge-range
          .level=${a}
          .min=${y}
          .max=${z}
          .step=${this._number(e.min, "step") ?? 1}
          .lo=${this._number(e.min, "min") ?? 0}
          .hi=${this._number(e.max, "max") ?? 100}
          .charging=${h ?? !1}
          @limit-change=${this._setLimit}
        ></horos-charge-range>
        ${e.pulse_every && this._controlsReady ? _`<ha-control-button
              .label=${d(t, "charge.everyLabel")}
              title=${d(t, "charge.everyLabel")}
              @pointerdown=${this._periodDown}
              @pointerup=${this._periodUp}
              @pointercancel=${this._periodUp}
              @pointerleave=${this._periodUp}
              @click=${this._periodTap}
            >
              <span class="force">
                <ha-icon icon="mdi:timer-sync-outline"></ha-icon>
                ${d(t, "charge.every", {
        hours: this._number(e.pulse_every) ?? "—"
      })}
              </span>
            </ha-control-button>` : m}
        ${e.force && this._controlsReady ? _`<ha-control-button
              class=${v ? "active" : ""}
              .label=${d(t, "charge.force")}
              @click=${this._toggleForce}
            >
              <span class="force">
                <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                ${v ? d(t, "charge.forceLeft", { minutes: f }) : d(t, "charge.force")}
              </span>
            </ha-control-button>` : m}
      </div>`
    });
    return this.toggleAttribute("filled", !0), re;
  }
}
Ft([
  b()
], et.prototype, "_config");
Ft([
  b()
], et.prototype, "_controlsReady");
Ft([
  b()
], et.prototype, "_reported");
k("horos-charge-tile", et, {
  type: "horos-charge-tile",
  name: { ru: "Зарядка", en: "Charge" },
  description: {
    ru: "Заряд, пределы зарядки и принудительная зарядка одного устройства",
    en: "Battery, charging limits and a forced charge for one device"
  },
  preview: !1
});
console.info(
  "%c HOROS-CARDS %c 0.7.0 ",
  "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
  "background:#555;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
);
var ha = Object.defineProperty, Lt = (s, e, t, r) => {
  for (var i = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = o(e, t, i) || i);
  return i && ha(e, t, i), i;
};
class tt extends ue {
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
    this.styles = Q`
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
    return x(this.hass) === "ru" ? e.ru : e.en;
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
    return !this.hass || !this._config ? m : _`
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
Lt([
  Y({ attribute: !1 })
], tt.prototype, "hass");
Lt([
  b()
], tt.prototype, "_config");
class C extends tt {
  constructor() {
    super(...arguments), this._featuresEditorReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Bi().then((e) => {
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
    const r = this._config?.features ?? this.defaultFeatures();
    this.dispatchEvent(
      new CustomEvent("edit-sub-element", {
        detail: {
          type: "feature",
          config: r[t],
          context: { entity_id: this.featuresEntity },
          saveConfig: (i) => {
            const n = [...r];
            n[t] = i, this.dispatchEvent(
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
    const { content_layout: t, ...r } = e, i = { ...r };
    return t === "vertical" && (i.vertical = !0), i;
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
    if (!e) return m;
    const t = this._config?.features ?? this.defaultFeatures(), r = this.pick({ ru: O, en: P }), i = this.pick({
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
    return _`
      <ha-expansion-panel outlined>
        <ha-icon slot="leading-icon" icon="mdi:list-box"></ha-icon>
        <h3 slot="header">${r.features}</h3>
        <div class="content">
          <hui-card-features-editor
            .hass=${this.hass}
            .context=${{ entity_id: e }}
            .features=${t}
            @features-changed=${this._featuresChanged}
            @edit-detail-element=${this._editFeature}
          ></hui-card-features-editor>
          ${t.length ? _`
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
                  i[a]
                ),
                description: n(
                  `features_position_options.${a}_description`,
                  i[`${a}_description`]
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
      i.helper_vertical
    ) : void 0}
                  @value-changed=${this._valueChanged}
                ></ha-form>
              ` : m}
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return !this.hass || !this._config ? m : _`
      ${this.renderForm()}
      ${this._featuresEditorReady ? this._renderFeatures() : m}
    `;
  }
}
Lt([
  b()
], C.prototype, "_featuresEditorReady");
const A = (s, e, t = []) => ({
  name: "content",
  type: "expandable",
  flatten: !0,
  icon: "mdi:text-short",
  schema: [
    s ? {
      name: "name",
      selector: { entity_name: {} },
      context: { entity: s }
    } : { name: "name", selector: { text: {} } },
    {
      name: "",
      type: "grid",
      schema: [
        {
          name: "icon",
          selector: { icon: {} },
          ...s ? { context: { icon_entity: s } } : {}
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
    ...s ? [
      {
        name: "state_content",
        selector: { ui_state_content: { allow_context: !0 } },
        context: { filter_entity: s }
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
}), at = (s) => s ? { entity_id: s, area_id: "area" } : void 0, T = (s, e) => ({
  name: "interactions",
  type: "expandable",
  flatten: !0,
  icon: "mdi:gesture-tap",
  schema: [
    {
      name: "tap_action",
      selector: { ui_action: { default_action: "more-info" } },
      context: at(s)
    },
    { name: "", type: "divider" },
    {
      name: "icon_tap_action",
      selector: { ui_action: { default_action: e } },
      context: at(s)
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
        context: at(s)
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
}, g = (s, e) => ({
  entity: {
    filter: e ? { domain: s, device_class: e } : { domain: s }
  }
}), G = (s, e, t) => ({
  number: { min: s, max: e, mode: "box", unit_of_measurement: t }
}), da = { text: {} }, se = (s) => ({
  select: { multiple: !0, mode: "list", options: s }
}), F = { boolean: {} };
class $r extends C {
  get entityField() {
    return "temperature";
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "temperature",
        required: !0,
        selector: g("sensor", "temperature")
      },
      { name: "humidity", selector: g("sensor", "humidity") },
      {
        name: "illuminance",
        selector: g("sensor", "illuminance")
      },
      { name: "pm25", selector: g("sensor", "pm25") },
      { name: "co2", selector: g("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: g("sensor", "volatile_organic_compounds")
      },
      { name: "aqi", selector: g("sensor", "aqi") },
      { name: "air_rows", selector: F },
      A("temperature", e, [
        {
          name: "big_values",
          selector: se([
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "illuminance", label: e === "ru" ? "Освещённость" : "Illuminance" },
            { value: "pm25", label: "PM2.5" }
          ])
        }
      ]),
      T("temperature", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return ct(this.hass, e);
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
E("horos-climate-tile-editor", $r);
const ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosClimateTileEditor: $r
}, Symbol.toStringTag, { value: "Module" }));
class kr extends C {
  get entityField() {
    return "switch";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "switch", required: !0, selector: g("switch") },
      { name: "power", selector: g("sensor", "power") },
      { name: "energy", selector: g("sensor", "energy") },
      A("switch", e, [
        {
          name: "big_values",
          selector: se([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" },
            { value: "switch", label: e === "ru" ? "Состояние" : "State" }
          ])
        }
      ]),
      T("switch", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return ut(e);
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
E("horos-plug-tile-editor", kr);
const pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlugTileEditor: kr
}, Symbol.toStringTag, { value: "Module" }));
class Er extends C {
  get entityField() {
    return "moisture";
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "moisture",
        required: !0,
        selector: g("sensor", "moisture")
      },
      {
        name: "temperature",
        selector: g("sensor", "temperature")
      },
      { name: "battery", selector: g("sensor", "battery") },
      { name: "dry_below", selector: G(0, 100, "%") },
      { name: "wet_above", selector: G(0, 100, "%") },
      A("moisture", e, [
        {
          name: "big_values",
          selector: se([
            { value: "moisture", label: e === "ru" ? "Влажность почвы" : "Soil moisture" },
            { value: "temperature", label: e === "ru" ? "Температура почвы" : "Soil temperature" },
            { value: "battery", label: e === "ru" ? "Заряд датчика" : "Sensor battery" }
          ])
        }
      ]),
      T("moisture", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return dt(this.hass, e);
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
E("horos-plant-tile-editor", Er);
const fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlantTileEditor: Er
}, Symbol.toStringTag, { value: "Module" }));
function I(s, e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of s ?? [])
    t.set(typeof r == "string" ? r : r.entity, r);
  return e.map((r) => t.get(r) ?? r);
}
function R(s) {
  return (s ?? []).map(
    (e) => typeof e == "string" ? e : e.entity
  );
}
class Cr extends tt {
  get schema() {
    return [
      { name: "name", selector: da },
      { name: "icon", selector: { icon: {} } },
      { name: "columns", selector: G(1, 6) },
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
      buttons: R(e.buttons)
    };
  }
  fromForm(e) {
    return {
      ...e,
      buttons: I(
        this._config?.buttons,
        e.buttons ?? []
      )
    };
  }
}
E("horos-buttons-tile-editor", Cr);
const ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosButtonsTileEditor: Cr
}, Symbol.toStringTag, { value: "Module" }));
class Sr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "icon", selector: { icon: {} } },
      { name: "status", selector: g("sensor") },
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
      A("status", e, [
        { name: "levels", selector: F }
      ]),
      T("status", "none")
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
      cartridges: R(e.cartridges),
      sensors: R(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      cartridges: I(
        this._config?.cartridges,
        e.cartridges ?? []
      ),
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-printer-tile-editor", Sr);
const va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPrinterTileEditor: Sr
}, Symbol.toStringTag, { value: "Module" }));
class Ar extends C {
  get entityField() {
    return "vacuum";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "vacuum", required: !0, selector: g("vacuum") },
      { name: "battery", selector: g("sensor", "battery") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "consumables", selector: { entity: { multiple: !0 } } },
      { name: "low_below", selector: G(0, 100, "%") },
      A("vacuum", e, [
        { name: "levels", selector: F }
      ]),
      T("vacuum", "none")
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
      sensors: R(e.sensors),
      consumables: R(e.consumables)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      ),
      consumables: I(
        this._config?.consumables,
        e.consumables ?? []
      )
    };
  }
}
E("horos-vacuum-tile-editor", Ar);
const _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosVacuumTileEditor: Ar
}, Symbol.toStringTag, { value: "Module" }));
class Tr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
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
      { name: "low_below", selector: G(0, 100, "%") },
      A(void 0, e),
      T(void 0, "none")
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
      batteries: R(e.batteries)
    };
  }
  fromForm(e) {
    return {
      ...e,
      batteries: I(
        this._config?.batteries,
        e.batteries ?? []
      )
    };
  }
}
E("horos-batteries-tile-editor", Tr);
const ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosBatteriesTileEditor: Tr
}, Symbol.toStringTag, { value: "Module" }));
class Or extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "sensors",
        required: !0,
        selector: { entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] } }
      },
      A(void 0, e),
      T(void 0, "none")
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
      sensors: R(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-safety-tile-editor", Or);
const ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosSafetyTileEditor: Or
}, Symbol.toStringTag, { value: "Module" }));
class Pr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "disk", selector: g("sensor", "data_size") },
      { name: "download", selector: g("sensor", "data_rate") },
      { name: "upload", selector: g("sensor", "data_rate") },
      { name: "services", selector: { entity: { multiple: !0 } } },
      A("status", e),
      T("status", "none")
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
      services: R(e.services)
    };
  }
  fromForm(e) {
    return {
      ...e,
      services: I(
        this._config?.services,
        e.services ?? []
      )
    };
  }
}
E("horos-server-tile-editor", Pr);
const wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosServerTileEditor: Pr
}, Symbol.toStringTag, { value: "Module" }));
class Rr extends C {
  get entityField() {
    return "person";
  }
  get schema() {
    const e = x(this.hass);
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
      { name: "battery", selector: g("sensor", "battery") },
      { name: "location", selector: g("sensor") },
      {
        name: "devices",
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "battery" }]
          }
        }
      },
      A("person", e, [
        { name: "levels", selector: F }
      ]),
      T("person", "none")
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
      devices: R(e.devices)
    };
  }
  fromForm(e) {
    return {
      ...e,
      devices: I(
        this._config?.devices,
        e.devices ?? []
      )
    };
  }
}
E("horos-person-tile-editor", Rr);
const xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPersonTileEditor: Rr
}, Symbol.toStringTag, { value: "Module" }));
class Ir extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "cpu", selector: g("sensor") },
      { name: "memory", selector: g("sensor") },
      { name: "gpu", selector: g("sensor") },
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
      { name: "disk_rows", selector: F },
      { name: "color_by_load", selector: F },
      { name: "disks_free", selector: { entity: { multiple: !0 } } },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: {
          entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] }
        }
      },
      A("status", e, [
        {
          name: "big_values",
          selector: se([
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
        { name: "levels", selector: F }
      ]),
      T("status", "none")
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
      sensors: R(e.sensors),
      alerts: R(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      ),
      alerts: I(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
E("horos-computer-tile-editor", Ir);
const $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosComputerTileEditor: Ir
}, Symbol.toStringTag, { value: "Module" }));
class Mr extends C {
  get entityField() {
    return "appliance";
  }
  get schema() {
    const e = x(this.hass);
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
      { name: "pm25", selector: g("sensor", "pm25") },
      { name: "humidity", selector: g("sensor", "humidity") },
      { name: "temperature", selector: g("sensor", "temperature") },
      { name: "power", selector: g("sensor", "power") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: { entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] } }
      },
      A("appliance", e, [
        {
          name: "big_values",
          selector: se([
            { value: "pm25", label: "PM2.5" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "power", label: e === "ru" ? "Мощность" : "Power" }
          ])
        }
      ]),
      T("appliance", "toggle")
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
      sensors: R(e.sensors),
      alerts: R(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      ),
      alerts: I(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
E("horos-air-tile-editor", Mr);
const ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAirTileEditor: Mr
}, Symbol.toStringTag, { value: "Module" }));
class jr extends C {
  get entityField() {
    return "cover";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "cover", required: !0, selector: g("cover") },
      { name: "position", selector: g("sensor") },
      {
        name: "illuminance",
        selector: g("sensor", "illuminance")
      },
      { name: "battery", selector: g("sensor", "battery") },
      A("cover", e, [
        {
          name: "big_values",
          selector: se([
            {
              value: "illuminance",
              label: e === "ru" ? "Освещённость" : "Illuminance"
            },
            { value: "battery", label: e === "ru" ? "Заряд" : "Battery" }
          ])
        },
        { name: "levels", selector: F }
      ]),
      T("cover", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return mt(this.hass, e);
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
E("horos-cover-tile-editor", jr);
const Ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosCoverTileEditor: jr
}, Symbol.toStringTag, { value: "Module" }));
class Nr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "limit", selector: G(1, 12) },
      { name: "ignore", selector: { entity: { multiple: !0 } } },
      A(void 0, e),
      T(void 0, "none")
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
E("horos-offline-tile-editor", Nr);
const Ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosOfflineTileEditor: Nr
}, Symbol.toStringTag, { value: "Module" }));
class Fr extends C {
  get entityField() {
    return "total";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "total", selector: g("sensor", "power") },
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
      { name: "limit", selector: G(1, 12) },
      A("total", e, [
        { name: "levels", selector: F }
      ]),
      T("total", "none")
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
      consumers: R(e.consumers)
    };
  }
  fromForm(e) {
    return {
      ...e,
      consumers: I(
        this._config?.consumers,
        e.consumers ?? []
      )
    };
  }
}
E("horos-energy-tile-editor", Fr);
const Sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosEnergyTileEditor: Fr
}, Symbol.toStringTag, { value: "Module" }));
class Lr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
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
      A(void 0, e),
      T(void 0, "none")
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
      areas: R(e.areas)
    };
  }
  fromForm(e) {
    return {
      ...e,
      areas: I(
        this._config?.areas,
        e.areas ?? []
      )
    };
  }
}
E("horos-presence-tile-editor", Lr);
const Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPresenceTileEditor: Lr
}, Symbol.toStringTag, { value: "Module" }));
class Hr extends C {
  get entityField() {
    return "group";
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "lights",
        required: !0,
        selector: { entity: { multiple: !0, filter: { domain: "light" } } }
      },
      { name: "group", selector: g("light") },
      A("group", e, [
        { name: "levels", selector: F }
      ]),
      T("group", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return pt(e);
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
      lights: R(e.lights)
    };
  }
  fromForm(e) {
    return {
      ...e,
      lights: I(
        this._config?.lights,
        e.lights ?? []
      )
    };
  }
}
E("horos-light-tile-editor", Hr);
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLightTileEditor: Hr
}, Symbol.toStringTag, { value: "Module" }));
class Dr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "players",
        required: !0,
        selector: {
          entity: { multiple: !0, filter: { domain: "media_player" } }
        }
      },
      A(void 0, e, [
        { name: "levels", selector: F }
      ]),
      T(void 0, "more-info")
    ];
  }
  /** The playback buttons act on the first player in the list. */
  get featuresEntity() {
    const e = this._config?.players ?? [];
    return R(e)[0];
  }
  defaultFeatures() {
    const e = this._config;
    return ft(e);
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
      players: R(e.players)
    };
  }
  fromForm(e) {
    return {
      ...e,
      players: I(
        this._config?.players,
        e.players ?? []
      )
    };
  }
}
E("horos-media-tile-editor", Dr);
const Oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosMediaTileEditor: Dr
}, Symbol.toStringTag, { value: "Module" }));
class zr extends C {
  get entityField() {
    return "climate";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "climate", required: !0, selector: g("climate") },
      { name: "temperature", selector: g("sensor", "temperature") },
      { name: "humidity", selector: g("sensor", "humidity") },
      { name: "power", selector: g("sensor", "power") },
      { name: "co2", selector: g("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: g("sensor", "volatile_organic_compounds")
      },
      { name: "aqi", selector: g("sensor", "aqi") },
      { name: "pm25", selector: g("sensor", "pm25") },
      { name: "air_rows", selector: F },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      A("climate", e, [
        {
          name: "big_values",
          selector: se([
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "power", label: e === "ru" ? "Мощность" : "Power" }
          ])
        }
      ]),
      T("climate", "more-info")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return gt(e);
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
      sensors: R(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-ac-tile-editor", zr);
const Pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAcTileEditor: zr
}, Symbol.toStringTag, { value: "Module" }));
class Ur extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "limit", selector: G(1, 20) },
      { name: "include_skipped", selector: F },
      { name: "ignore", selector: { entity: { multiple: !0, filter: { domain: "update" } } } },
      A(void 0, e),
      T(void 0, "more-info")
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
E("horos-updates-tile-editor", Ur);
const Ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosUpdatesTileEditor: Ur
}, Symbol.toStringTag, { value: "Module" }));
class Wr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "lists",
        required: !0,
        selector: { entity: { multiple: !0, filter: { domain: "todo" } } }
      },
      { name: "calendar", selector: g("calendar") },
      A(void 0, e, [
        { name: "levels", selector: F }
      ]),
      T(void 0, "more-info")
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
      lists: R(e.lists)
    };
  }
  fromForm(e) {
    return {
      ...e,
      lists: I(
        this._config?.lists,
        e.lists ?? []
      )
    };
  }
}
E("horos-tasks-tile-editor", Wr);
const Ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosTasksTileEditor: Wr
}, Symbol.toStringTag, { value: "Module" }));
class qr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "alerts", required: !0, selector: { entity: { multiple: !0 } } },
      { name: "limit", selector: G(1, 20) },
      { name: "watch_offline", selector: F },
      A(void 0, e),
      T(void 0, "more-info")
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
      alerts: R(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      alerts: I(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
E("horos-alerts-tile-editor", qr);
const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAlertsTileEditor: qr
}, Symbol.toStringTag, { value: "Module" })), _e = {
  entity: {
    filter: [
      { domain: "script" },
      { domain: "scene" },
      { domain: "button" },
      { domain: "input_button" }
    ]
  }
};
class Br extends C {
  get entityField() {
    return "state";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "state", selector: g("input_boolean") },
      { name: "power", selector: _e },
      { name: "bright", selector: _e },
      { name: "dim", selector: _e },
      { name: "warm", selector: _e },
      { name: "cold", selector: _e },
      {
        name: "presets",
        selector: { entity: { ..._e.entity, multiple: !0 } }
      },
      { name: "preset_state", selector: g("input_select") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "preset_labels", selector: F },
      A("state", e, [
        { name: "levels", selector: F }
      ]),
      T("state", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return vt(e);
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
      presets: R(e.presets),
      sensors: R(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      presets: I(
        this._config?.presets,
        e.presets ?? []
      ),
      sensors: I(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-lamp-tile-editor", Br);
const ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLampTileEditor: Br
}, Symbol.toStringTag, { value: "Module" }));
class Vr extends C {
  get entityField() {
    return "mode";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "mode", selector: g("sensor") },
      {
        name: "burner",
        selector: g("binary_sensor", "heat")
      },
      {
        name: "pump",
        selector: g("binary_sensor", "heat")
      },
      {
        name: "switch",
        selector: { entity: { filter: [{ domain: "switch" }] } }
      },
      { name: "power", selector: g("sensor", "power") },
      { name: "energy", selector: g("sensor", "energy") },
      {
        name: "zones",
        selector: {
          entity: { multiple: !0, filter: [{ domain: "climate" }] }
        }
      },
      A("mode", e, [
        {
          name: "big_values",
          selector: se([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" }
          ])
        },
        { name: "levels", selector: F }
      ]),
      T("mode", "more-info")
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
      zones: R(e.zones)
    };
  }
  fromForm(e) {
    return {
      ...e,
      zones: I(
        this._config?.zones,
        e.zones ?? []
      )
    };
  }
}
E("horos-heating-tile-editor", Vr);
const Na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosHeatingTileEditor: Vr
}, Symbol.toStringTag, { value: "Module" }));
class Kr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
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
          { name: "dry_below", selector: G(0, 100, "%") },
          { name: "wet_above", selector: G(0, 100, "%") }
        ]
      },
      {
        name: "temperature",
        selector: g("sensor", "temperature")
      },
      { name: "humidity", selector: g("sensor", "humidity") },
      {
        name: "illuminance",
        selector: g("sensor", "illuminance")
      },
      A(void 0, e, [
        {
          name: "big_values",
          selector: se([
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
        { name: "levels", selector: F }
      ]),
      T(void 0, "none")
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
      plants: R(e.plants)
    };
  }
  fromForm(e) {
    return {
      ...e,
      // The thresholds a plant was given by hand in YAML survive a pick here.
      plants: I(
        this._config?.plants,
        e.plants ?? []
      )
    };
  }
}
E("horos-greenhouse-tile-editor", Kr);
const Fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosGreenhouseTileEditor: Kr
}, Symbol.toStringTag, { value: "Module" })), La = {
  temperature: { ru: "Температура, от ночи до дня", en: "Temperature, night to day" },
  precipitation: { ru: "Осадки", en: "Precipitation" },
  precipitation_probability: { ru: "Вероятность осадков", en: "Chance of rain" },
  humidity: { ru: "Влажность", en: "Humidity" },
  wind_speed: { ru: "Ветер", en: "Wind" }
}, ks = {
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
class Gr extends C {
  get entityField() {
    return "weather";
  }
  get schema() {
    const e = x(this.hass) === "ru" ? "ru" : "en";
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
          { name: "days", selector: G(1, 14) },
          {
            name: "bar",
            selector: {
              select: {
                mode: "dropdown",
                options: _t.map((t) => ({
                  value: t,
                  label: La[t][e]
                }))
              }
            }
          }
        ]
      },
      A("weather", x(this.hass), [
        {
          name: "big_values",
          selector: se(
            Object.keys(ks).map((t) => ({
              value: t,
              label: ks[t][e]
            }))
          )
        },
        { name: "levels", selector: F }
      ]),
      T("weather", "more-info")
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
E("horos-weather-tile-editor", Gr);
const Ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosWeatherTileEditor: Gr
}, Symbol.toStringTag, { value: "Module" }));
class Yr extends C {
  /**
   * No main entity for the features panel: the control line is the card's own
   * and is not removable (see the card).
   */
  get entityField() {
  }
  get schema() {
    const e = x(this.hass), t = {
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
      { name: "switch", selector: g("switch") },
      { name: "min", selector: t },
      { name: "max", selector: t },
      { name: "force", selector: g("timer") },
      { name: "pulse_every", selector: g("input_number") },
      { name: "stale_after", selector: G(0, 86400, "s") },
      A(void 0, e),
      T(void 0, "more-info")
    ];
  }
  /** The form always edits a list, whatever the YAML holds. */
  get formData() {
    const e = super.formData;
    return {
      ...e,
      battery: Ue(e)
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
E("horos-charge-tile-editor", Yr);
const Da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosChargeTileEditor: Yr
}, Symbol.toStringTag, { value: "Module" }));
