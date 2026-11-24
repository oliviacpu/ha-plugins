/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = globalThis, kt = We.ShadowRoot && (We.ShadyCSS === void 0 || We.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let Ss = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (kt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ut.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ut.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ei = (s) => new Ss(typeof s == "string" ? s : s + "", void 0, Et), J = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new Ss(t, s, Et);
}, ti = (s, e) => {
  if (kt) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = We.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  }
}, Wt = kt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ei(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: si, defineProperty: ri, getOwnPropertyDescriptor: ii, getOwnPropertyNames: ni, getOwnPropertySymbols: oi, getPrototypeOf: ai } = Object, Ze = globalThis, qt = Ze.trustedTypes, li = qt ? qt.emptyScript : "", ci = Ze.reactiveElementPolyfillSupport, ke = (s, e) => s, Ve = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? li : null;
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
} }, Ct = (s, e) => !si(s, e), Bt = { attribute: !0, type: String, converter: Ve, reflect: !1, useDefault: !1, hasChanged: Ct };
Symbol.metadata ??= Symbol("metadata"), Ze.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let be = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Bt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && ri(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: n } = ii(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const e = ai(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const t = this.properties, i = [...ni(t), ...oi(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(Wt(r));
    } else e !== void 0 && t.push(Wt(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ti(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ve).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ve;
      this._$Em = r;
      const l = o.fromAttribute(t, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Ct)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
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
be.elementStyles = [], be.shadowRootOptions = { mode: "open" }, be[ke("elementProperties")] = /* @__PURE__ */ new Map(), be[ke("finalized")] = /* @__PURE__ */ new Map(), ci?.({ ReactiveElement: be }), (Ze.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, Vt = (s) => s, Ke = St.trustedTypes, Kt = Ke ? Ke.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, As = "$lit$", ue = `lit$${Math.random().toFixed(9).slice(2)}$`, Ts = "?" + ue, ui = `<${Ts}>`, fe = document, Ee = () => fe.createComment(""), Ce = (s) => s === null || typeof s != "object" && typeof s != "function", At = Array.isArray, hi = (s) => At(s) || typeof s?.[Symbol.iterator] == "function", at = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Yt = />/g, de = RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xt = /'/g, Zt = /"/g, Os = /^(?:script|style|textarea|title)$/i, di = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), g = di(1), ge = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Jt = /* @__PURE__ */ new WeakMap(), pe = fe.createTreeWalker(fe, 129);
function Ps(s, e) {
  if (!At(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Kt !== void 0 ? Kt.createHTML(e) : e;
}
const mi = (s, e) => {
  const t = s.length - 1, i = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = we;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, h, u = -1, v = 0;
    for (; v < a.length && (o.lastIndex = v, h = o.exec(a), h !== null); ) v = o.lastIndex, o === we ? h[1] === "!--" ? o = Gt : h[1] !== void 0 ? o = Yt : h[2] !== void 0 ? (Os.test(h[2]) && (r = RegExp("</" + h[2], "g")), o = de) : h[3] !== void 0 && (o = de) : o === de ? h[0] === ">" ? (o = r ?? we, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? de : h[3] === '"' ? Zt : Xt) : o === Zt || o === Xt ? o = de : o === Gt || o === Yt ? o = we : (o = de, r = void 0);
    const f = o === de && s[l + 1].startsWith("/>") ? " " : "";
    n += o === we ? a + ui : u >= 0 ? (i.push(c), a.slice(0, u) + As + a.slice(u) + ue + f) : a + ue + (u === -2 ? l : f);
  }
  return [Ps(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Se {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, h] = mi(e, t);
    if (this.el = Se.createElement(c, i), pe.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = pe.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(As)) {
          const v = h[o++], f = r.getAttribute(u).split(ue), w = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: n, name: w[2], strings: f, ctor: w[1] === "." ? fi : w[1] === "?" ? gi : w[1] === "@" ? vi : Je }), r.removeAttribute(u);
        } else u.startsWith(ue) && (a.push({ type: 6, index: n }), r.removeAttribute(u));
        if (Os.test(r.tagName)) {
          const u = r.textContent.split(ue), v = u.length - 1;
          if (v > 0) {
            r.textContent = Ke ? Ke.emptyScript : "";
            for (let f = 0; f < v; f++) r.append(u[f], Ee()), pe.nextNode(), a.push({ type: 2, index: ++n });
            r.append(u[v], Ee());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ts) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(ue, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += ue.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = fe.createElement("template");
    return i.innerHTML = e, i;
  }
}
function ye(s, e, t = s, i) {
  if (e === ge) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const n = Ce(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = ye(s, r._$AS(s, e.values), r, i)), e;
}
class pi {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? fe).importNode(t, !0);
    pe.currentNode = r;
    let n = pe.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new Te(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new _i(n, this, e)), this._$AV.push(c), a = i[++l];
      }
      o !== a?.index && (n = pe.nextNode(), o++);
    }
    return pe.currentNode = fe, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Te {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = ye(this, e, t), Ce(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== ge && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : hi(e) ? this.k(e) : this._(e);
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
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Se.createElement(Ps(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new pi(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Jt.get(e.strings);
    return t === void 0 && Jt.set(e.strings, t = new Se(e)), t;
  }
  k(e) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const n of e) r === t.length ? t.push(i = new Te(this.O(Ee()), this.O(Ee()), this, this.options)) : i = t[r], i._$AI(n), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Vt(e).nextSibling;
      Vt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Je {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = ye(this, e, t, 0), o = !Ce(e) || e !== this._$AH && e !== ge, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = ye(this, l[i + a], t, a), c === ge && (c = this._$AH[a]), o ||= !Ce(c) || c !== this._$AH[a], c === m ? e = m : e !== m && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class fi extends Je {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class gi extends Je {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class vi extends Je {
  constructor(e, t, i, r, n) {
    super(e, t, i, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ye(this, e, t, 0) ?? m) === ge) return;
    const i = this._$AH, r = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== m && (i === m || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class _i {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
}
const bi = St.litHtmlPolyfillSupport;
bi?.(Se, Te), (St.litHtmlVersions ??= []).push("3.3.3");
const yi = (s, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    i._$litPart$ = r = new Te(e.insertBefore(Ee(), n), n, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis;
let ne = class extends be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = yi(t, this.renderRoot, this.renderOptions);
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
ne._$litElement$ = !0, ne.finalized = !0, Tt.litElementHydrateSupport?.({ LitElement: ne });
const wi = Tt.litElementPolyfillSupport;
wi?.({ LitElement: ne });
(Tt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xi = { attribute: !0, type: String, converter: Ve, reflect: !1, hasChanged: Ct }, $i = (s = xi, e, t) => {
  const { kind: i, metadata: r } = t;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), i === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Y(s) {
  return (e, t) => typeof t == "object" ? $i(s, e, t) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
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
const ki = (s, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(s, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ei(s, e) {
  return (t, i, r) => {
    const n = (o) => o.renderRoot?.querySelector(s) ?? null;
    return ki(t, i, { get() {
      return n(this);
    } });
  };
}
const q = J`
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
`, Qe = /* @__PURE__ */ new Set(["unavailable", "unknown"]), Ci = /* @__PURE__ */ new Set([
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
function Is(s) {
  const e = s?.attributes.device_class;
  if (!e || !Ci.has(e)) return !1;
  const t = Number(s.state);
  return Number.isFinite(t) && t < 0;
}
const Si = " · ";
function p(s, e) {
  if (!e) return;
  const t = s?.states[e];
  return {
    entityId: e,
    stateObj: t,
    missing: !t,
    unavailable: !!t && Qe.has(t.state),
    impossible: Is(t)
  };
}
function Ot(s, e) {
  if (!(!s || !e || !e.stateObj || e.missing || e.unavailable) && !e.impossible)
    return s.formatEntityState(e.stateObj);
}
function Qt(s, e, t) {
  const i = e?.attributes[t];
  if (!(i == null || i === ""))
    return s?.formatEntityAttributeValue?.(e, t) ?? String(i);
}
function T(s) {
  return s.filter(
    (e) => !!e && (e.content !== void 0 || (e.text ?? "").trim() !== "")
  );
}
function z(s, e) {
  const t = Ot(s, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function W(s, e) {
  const t = et(s, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function et(s, e) {
  if (!(!s || !e?.stateObj || !e.unavailable))
    return s.formatEntityState(e.stateObj);
}
function B(s) {
  if (!s?.stateObj || s.impossible) return;
  const e = Number(s.stateObj.state);
  return Number.isFinite(e) ? e : void 0;
}
const Ai = /* @__PURE__ */ new Set([
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
function Ti(s) {
  if (!s?.stateObj || s.missing || s.unavailable) return !1;
  const e = s.stateObj.state.trim().toLowerCase().replace(/[_-]+/g, " ");
  return !Ai.has(e);
}
function Ae(s, e) {
  return s || (e?.stateObj?.attributes.friendly_name ?? e?.entityId ?? "");
}
function Pt(s, e) {
  if (!e) return { value: s };
  if (!s.endsWith(e)) return { value: s };
  const t = s.slice(0, s.length - e.length).trimEnd();
  return t ? { value: t, unit: e } : { value: s };
}
const dt = "unavailable", Oi = "unknown", Pi = "off", Ii = /* @__PURE__ */ new Set(["button", "input_button", "scene"]), Ri = /* @__PURE__ */ new Set([
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
]), M = (s) => s.substring(0, s.indexOf(".")), Rs = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "unknown";
function Ge(s, e) {
  const t = M(s.entity_id), i = s.state;
  if (Ii.has(t))
    return i !== dt;
  if (i === dt || i === Oi || i === Pi && t !== "alert")
    return !1;
  switch (t) {
    case "alarm_control_panel":
      return i !== "disarmed";
    case "alert":
      return i !== "idle";
    case "cover":
    case "valve":
      return i !== "closed";
    case "device_tracker":
    case "person":
      return i !== "not_home";
    case "lawn_mower":
      return !["docked", "paused"].includes(i);
    case "lock":
      return i !== "locked";
    case "media_player":
      return i !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(i);
    case "plant":
      return i === "problem";
    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(i);
    case "timer":
      return i === "active";
    case "camera":
      return ["streaming", "recording"].includes(i);
    default:
      return !0;
  }
}
const Ms = (s) => s.reduceRight(
  (e, t) => `var(${t}${e ? `, ${e}` : ""})`,
  void 0
), Mi = (s) => {
  const e = Number(s);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function ji(s, e) {
  if (!s) return e;
  if (s.state === dt)
    return "var(--state-unavailable-color)";
  const t = M(s.entity_id), i = s.attributes.device_class;
  if (t === "sensor" && i === "battery") {
    const a = Mi(s.state);
    if (a) return `var(${a})`;
  }
  if (!Ri.has(t))
    return e;
  const r = Ge(s), n = Rs(s.state), o = r ? "active" : "inactive", l = [];
  return i && l.push(`--state-${t}-${i}-${n}-color`), l.push(
    `--state-${t}-${n}-color`,
    `--state-${t}-${o}-color`,
    `--state-${o}-color`
  ), Ms(l);
}
const lt = (s) => Math.round(s).toString(16).padStart(2, "0"), Ni = ([s, e, t]) => {
  const i = Math.max(s, e, t), r = i - Math.min(s, e, t), n = r && (i === s ? (e - t) / r : i === e ? 2 + (t - s) / r : 4 + (s - e) / r);
  return [60 * (n < 0 ? n + 6 : n), i && r / i, i];
}, Fi = ([s, e, t]) => {
  const i = (r) => {
    const n = (r + s / 60) % 6;
    return t - t * e * Math.max(Math.min(n, 4 - n, 1), 0);
  };
  return [i(5), i(3), i(1)];
};
function Li(s) {
  const e = s.attributes.rgb_color;
  if (!Array.isArray(e) || e.length < 3) return;
  const t = Ni(e);
  t[1] < 0.4 && (t[1] < 0.1 ? t[2] = 225 : t[1] = 0.4);
  const [i, r, n] = Fi(t);
  return `#${lt(i)}${lt(r)}${lt(n)}`;
}
function F(s) {
  if (!s) return "var(--state-inactive-color)";
  if (M(s.entity_id) === "light" && Ge(s)) {
    const t = Li(s);
    if (t) return t;
  }
  const e = ji(s);
  return e || (Ge(s) ? "var(--state-icon-color)" : "var(--state-inactive-color)");
}
function me(s) {
  return s !== void 0 && s.action !== "none";
}
const Hi = ["closed", "locked", "off"], zi = /* @__PURE__ */ new Set([
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
  return { action: zi.has(e) || ["button", "input_button", "scene"].includes(e) ? "toggle" : "none" };
}
const Di = {
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
function Ui(s, e) {
  const t = Di[s];
  return t ? (e ? t.on : t.off) ?? t.on : e ? "turn_on" : "turn_off";
}
function Wi(s, e) {
  const t = s.states[e];
  if (!t) return;
  const i = M(e), r = i === "group" ? "homeassistant" : i, n = Hi.includes(t.state);
  s.callService(r, Ui(i, n), {
    entity_id: e
  });
}
function es(s, e, t) {
  s.dispatchEvent(
    new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 })
  );
}
function qi(s, e) {
  e ? window.history.replaceState(null, "", s) : window.history.pushState(null, "", s), window.dispatchEvent(new CustomEvent("location-changed", { detail: {} }));
}
async function Bi(s, e) {
  if (!e.confirmation) return !0;
  const t = window.loadCardHelpers;
  if (!t) return window.confirm(e.confirmation.text ?? "Are you sure?");
  const i = await t();
  return i.showConfirmationDialog ? i.showConfirmationDialog(s, {
    text: e.confirmation.text,
    title: e.confirmation.title,
    confirmText: e.confirmation.confirm_text,
    dismissText: e.confirmation.dismiss_text
  }) : window.confirm(e.confirmation.text ?? "Are you sure?");
}
async function js(s, e, t, i) {
  let r;
  if (i === "double_tap" ? r = t.double_tap_action : i === "hold" ? r = t.hold_action : r = t.tap_action, r || (r = { action: "more-info" }), !!await Bi(s, r))
    switch (r.action) {
      case "none":
        break;
      case "more-info": {
        const n = r.entity || t.entity;
        n && es(s, "hass-more-info", { entityId: n });
        break;
      }
      case "toggle": {
        const n = r.entity || t.entity;
        n && Wi(e, n);
        break;
      }
      case "navigate":
        r.navigation_path && qi(r.navigation_path, r.navigation_replace);
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
        es(s, "ll-custom", r);
        break;
      default:
        console.warn(
          `horos-cards: action "${r.action}" is not supported`
        );
    }
}
const Vi = 2;
function ts(s, e) {
  const t = s ?? [];
  if (e !== "inline")
    return { inline: [], below: t, columns: 1 };
  const i = t.slice(1);
  return {
    inline: t.slice(0, 1),
    below: i,
    columns: Math.min(i.length, Vi)
  };
}
function Ki(s) {
  return Math.ceil(s.below.length / Math.max(s.columns, 1));
}
const It = 5e3, ss = [
  "ha-tile-container",
  "ha-tile-icon",
  "ha-tile-info",
  "hui-card-features"
], rs = [
  "ha-control-button",
  "ha-control-button-group",
  "ha-control-select"
];
let He, ze, De;
function Rt(s, e) {
  return customElements.get(s) ? Promise.resolve(!0) : Promise.race([
    customElements.whenDefined(s).then(() => !0),
    new Promise((t) => setTimeout(() => t(!1), e))
  ]);
}
async function Gi() {
  const s = window.loadCardHelpers;
  if (s)
    try {
      (await s()).createCardElement?.({ type: "tile", entity: "sun.sun" });
    } catch {
    }
}
function tt() {
  return He || (He = (async () => ss.every((e) => customElements.get(e)) ? !0 : (await Gi(), (await Promise.all(
    ss.map((e) => Rt(e, It))
  )).every(Boolean)))(), He);
}
function Ns() {
  return ze || (ze = (async () => {
    if (rs.every((i) => customElements.get(i))) return !0;
    await tt();
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
      rs.map((i) => Rt(i, It))
    );
    return e?.remove(), t.every(Boolean);
  })(), ze);
}
function Yi() {
  return De || (De = (async () => {
    if (customElements.get("hui-card-features-editor")) return !0;
    await tt();
    const s = customElements.get("hui-tile-card");
    try {
      await s?.getConfigElement?.();
    } catch {
    }
    return Rt("hui-card-features-editor", It);
  })(), De);
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
}, Xi = {
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
}, qe = {
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
}, Fs = { ru: Xi, en: qe };
function x(s) {
  const t = (s?.language ?? s?.locale?.language ?? "en").split("-")[0].toLowerCase();
  return t in Fs ? t : "en";
}
function Zi(s, e) {
  if (s !== "ru") return e === 1 ? "one" : "many";
  const t = e % 10, i = e % 100;
  return t === 1 && i !== 11 ? "one" : t >= 2 && t <= 4 && (i < 12 || i > 14) ? "few" : "many";
}
function d(s, e, t = {}) {
  const i = x(s), r = Fs[i] ?? qe, n = t.count, o = typeof n == "number" ? `${e}.${Zi(i, n)}` : void 0;
  return ((o && (r[o] ?? qe[o])) ?? r[e] ?? qe[e] ?? e).replace(
    /\{(\w+)\}/g,
    (a, c) => c in t ? String(t[c]) : a
  );
}
var Ji = Object.defineProperty, Mt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Ji(e, t, r), r;
};
const Qi = "—";
class $ extends ne {
  constructor() {
    super(...arguments), this._ready = !1, this.base = {};
  }
  static {
    this.styles = [q];
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
    const i = this.base.features ?? e;
    if (!i.length) return 0;
    const r = t ? "bottom" : this.base.features_position ?? "bottom";
    return Ki(ts(i, r));
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
    super.connectedCallback(), tt().then((e) => {
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
    const i = t ? {
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
    js(this, this.hass, i, e);
  }
  // ---- rendering -------------------------------------------------------
  /** A banner instead of the card: the config is invalid or the entity is gone. */
  renderWarning(e) {
    return g`<ha-card><div class="warning">${e}</div></ha-card>`;
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
    const i = this.base.state_content ?? t;
    return !i && !this.base.time_format ? z(this.hass, e) : {
      entityId: e.entityId,
      content: g`<state-display
        .hass=${this.hass}
        .stateObj=${e.stateObj}
        .content=${i}
        .timeFormat=${this.base.time_format}
      ></state-display>`
    };
  }
  /** A message about entities that were not found, or undefined if all are there. */
  missingRolesWarning(e) {
    const t = e.filter((i) => !!i && i.missing).map((i) => i.entityId);
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
    if (!t) return g`<span>${e}</span>`;
    const i = this.hass?.states[t]?.attributes.friendly_name ?? t;
    return g`<span
      role="button"
      tabindex="0"
      class="clickable"
      title=${i}
      aria-label=${i}
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
      color: i,
      primary: r,
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
    const f = this._tileColor(i), w = this.base.icon_tap_action ?? a, L = me(w) || me(this.base.icon_hold_action) || me(this.base.icon_double_tap_action), y = this.base.features ?? h, N = this.base.features_position ?? "bottom", X = this.base.levels === !1 ? void 0 : u, ee = ts(
      y,
      v ? "bottom" : N
    ), Le = typeof this.base.grid_options?.rows == "number";
    return this.toggleAttribute(
      "filled",
      Le && !!(X || ee.below.length)
    ), g`
      <ha-card style="--tile-color: ${f};">
        <ha-tile-container
          .featurePosition=${v ? "inline" : N}
          .vertical=${!!this.base.vertical}
          .fixedInfoHeight=${this.layout === "grid" && Le}
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
            .interactive=${L}
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
              <span slot="primary">${r}</span>
              ${n?.length && !this.base.hide_state ? g`<span slot="secondary"
                    >${n.map(
      (te, ot) => g`
                        ${ot ? g`<span>${Si}</span>` : m}${this.renderClickable(
        te.content ?? te.text,
        te.entityId
      )}
                      `
    )}</span
                  >` : m}
            </ha-tile-info>
            ${c?.length ? g`<div class="values of-${c.length}">
                  ${c.map(
      (te, ot) => g`
                      ${ot ? g`<span class="values-separator">/</span>` : m}
                      ${this.renderClickable(
        g`${te.icon ? g`<ha-icon
                              class="value-icon"
                              .icon=${te.icon}
                            ></ha-icon>` : m}${te.value}${te.unit ? g`<span class="unit"> ${te.unit}</span>` : m}`,
        te.entityId
      )}
                    `
    )}
                </div>` : m}
          </div>

          ${ee.inline.length ? g`<hui-card-features
                slot="features-inline"
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${ee.inline}
                .position=${N}
              ></hui-card-features>` : m}
          ${v ? g`<div slot="features-inline" class="custom-inline">
                ${v}
              </div>` : m}
          ${X ? g`<div slot="features" class="custom-features">
                ${X}
              </div>` : m}
          ${ee.below.length ? g`<hui-card-features
                slot="features"
                .columns=${ee.columns}
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${ee.below}
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
    return this.base.color && (!t || Ge(t)) ? Ls(this.base.color) : e ?? "var(--state-inactive-color)";
  }
  /**
   * The values of the right-hand column. `icons` names a value by its role key:
   * without it two percentages in a row are indistinguishable.
   */
  bigValues(e, t = Oe) {
    return e.map((i) => i.role ? {
      ...this.formatted(i.role.stateObj) ?? { value: Qi },
      entityId: i.role.entityId,
      icon: t[i.key]
    } : void 0).filter((i) => !!i);
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
    if (!(!this.hass || !e) && !Qe.has(e.state) && !Is(e))
      return Pt(
        this.hass.formatEntityState(e),
        e.attributes.unit_of_measurement
      );
  }
}
Mt([
  Y({ attribute: !1 })
], $.prototype, "hass");
Mt([
  Y({ attribute: !1 })
], $.prototype, "layout");
Mt([
  b()
], $.prototype, "_ready");
function Ls(s) {
  return /^(#|rgb|hsl|var\()/.test(s) ? s : s === "state" ? "var(--state-icon-color)" : `var(--${s}-color, var(--state-icon-color))`;
}
const ct = (s) => Math.max(0, Math.min(100, s)), V = J`
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
  return g`
    <div
      class="levels"
      style=${t?.nameWidth ? `--level-name: ${t.nameWidth};` : m}
    >
      ${s.map(
    (i) => g`
          <button
            class="level ${i.alarm ? "low" : ""}"
            style="--ink: ${i.ink};"
            title="${i.name}: ${i.text}${i.flagTitle ? ` — ${i.flagTitle}` : ""}${i.stale ? ` — ${i.stale}` : ""}"
            @click=${(r) => {
      r.stopPropagation(), e(i.entityId);
    }}
          >
            <span class="name">
              <span class="label">${i.name}</span>${i.alarm ? g`<ha-icon
                    icon=${i.alarmIcon ?? "mdi:alert-circle"}
                  ></ha-icon>` : i.icon ? g`<ha-icon class="mark" icon=${i.icon}></ha-icon>` : m}${i.flag ? g`<ha-icon class="flag" icon=${i.flag}></ha-icon>` : m}${i.stale ? g`<ha-icon class="stale" icon="mdi:clock-alert-outline"></ha-icon>` : m}
            </span>
            <span class="bar">
              <span class="track"></span>
              <span
                class="fill ${i.from === void 0 ? "" : "span"} ${i.charging ? "charging" : ""}"
                style="inset-inline-start: ${ct(
      i.from ?? 0
    )}%; width: ${Math.max(
      0,
      ct(i.level) - ct(i.from ?? 0)
    )}%"
              ></span>
            </span>
            <span class="value">${i.text}</span>
          </button>
        `
  )}
    </div>
  `;
}
const en = {
  humidity: { good: [30, 60], fair: [25, 70] },
  co2: [1e3, 1400],
  voc: [1e3, 3e3],
  aqi: [51, 101],
  pm25: [15, 35]
};
function tn(s, e) {
  return s === "humidity" ? 100 : e[s][1] * 1.5;
}
function Hs(s) {
  return { ...en, ...s ?? {} };
}
function zs(s, e, t) {
  if (e === void 0 || !Number.isFinite(e)) return "unknown";
  if (s === "humidity") {
    const { good: n, fair: o } = t.humidity;
    return e >= n[0] && e <= n[1] ? "good" : e >= o[0] && e <= o[1] ? "fair" : "poor";
  }
  const [i, r] = t[s];
  return e >= r ? "poor" : e >= i ? "fair" : "good";
}
function sn(s) {
  return s.includes("poor") ? "poor" : s.includes("fair") ? "fair" : s.includes("good") ? "good" : "unknown";
}
const Ds = {
  good: "var(--success-color, #4caf50)",
  fair: "var(--warning-color, #ffa600)",
  poor: "var(--error-color, #db4437)",
  unknown: "var(--state-unavailable-color)"
}, Pe = ["humidity", "co2", "voc", "aqi", "pm25"];
function Us(s) {
  return Pe.filter((e) => s[e]).length;
}
function Ws(s, e, t) {
  return Pe.filter((i) => e[i]).flatMap((i) => {
    const r = p(s, e[i]);
    if (!r) return [];
    const n = B(r), o = zs(i, n, t);
    return [
      {
        entityId: r.entityId,
        name: d(s, `level.${i}`),
        text: Ot(s, r) ?? d(s, "value.unknown"),
        ink: Ds[o],
        level: n === void 0 ? 0 : Math.max(0, n) / tn(i, t) * 100,
        alarm: o === "poor",
        alarmIcon: "mdi:alert-circle"
      }
    ];
  });
}
function rn(s, e, t) {
  return sn(
    Pe.filter((i) => e[i]).map(
      (i) => zs(i, B(p(s, e[i])), t)
    )
  );
}
const is = 3;
function Q(s, e, t) {
  if (!s || s.length === 0)
    return typeof e == "string" ? [e] : [...e];
  if (s.length > is)
    throw new Error(
      `At most ${is} large values are allowed, got ${s.length}`
    );
  const i = s.filter((n) => !t.includes(n));
  if (i.length)
    throw new Error(
      `Unknown roles in big_values: ${i.join(", ")}. Allowed: ${t.join(", ")}`
    );
  const r = s.filter(
    (n, o) => s.indexOf(n) !== o
  );
  if (r.length)
    throw new Error(`Role listed twice: ${r.join(", ")}`);
  return s;
}
function Z(s, e) {
  const t = e.map((r) => s.find((n) => n.key === r)).filter((r) => !!r), i = s.filter((r) => !e.includes(r.key));
  return { big: t, rest: i };
}
let ns = !1;
function nn(s) {
  ns || (ns = !0, console.warn(
    `horos-cards: card ${s} is already registered. The bundle looks to be attached to the dashboard twice — the copy that loaded first is the one running. Check the dashboard resources.`
  ));
}
function os() {
  const s = document.querySelector("home-assistant");
  return x(s?.hass);
}
function k(s, e, t) {
  if (customElements.get(s)) {
    nn(s);
    return;
  }
  customElements.define(s, e), window.customCards = window.customCards ?? [], window.customCards.push({
    type: t.type,
    preview: t.preview,
    get name() {
      return typeof t.name == "string" ? t.name : t.name[os() === "ru" ? "ru" : "en"] ?? t.name.en;
    },
    get description() {
      return typeof t.description == "string" ? t.description : t.description[os() === "ru" ? "ru" : "en"] ?? t.description.en;
    },
    getEntitySuggestion: t.suggest
  });
}
function E(s, e) {
  customElements.get(s) || customElements.define(s, e);
}
const jt = 20;
function se(s, e) {
  return s.states[e]?.attributes.device_class;
}
function st(s, e) {
  return s.entities?.[e]?.hidden === !0;
}
function le(s, e) {
  const t = s.entities?.[e]?.device_id;
  if (!t || !s.entities) return [e];
  const i = Object.keys(s.entities).filter(
    (r) => r !== e && s.entities?.[r]?.device_id === t && !st(s, r) && s.states[r] !== void 0
  );
  return [e, ...i.sort()];
}
function U(s, e, t, ...i) {
  return e.find(
    (r) => M(r) === t && i.includes(se(s, r) ?? "")
  );
}
function Ie(s, ...e) {
  return s.find((t) => e.includes(M(t)));
}
function Re(s, e, t, i, r = jt, n = () => !0) {
  const o = Object.keys(s.states).filter(
    (a) => a !== e && M(a) === t && i.includes(se(s, a) ?? "") && !st(s, a) && n(a)
  ).sort();
  return [...n(e) ? [e] : [], ...o].slice(0, r);
}
function as(s, e) {
  return s.entities?.[e]?.device_id !== void 0;
}
function oe(s, e) {
  const t = s.entities?.[e];
  if (t)
    return t.area_id ? t.area_id : t.device_id ? s.devices?.[t.device_id]?.area_id : void 0;
}
function Nt(s, e, t, i = jt) {
  const r = oe(s, e);
  if (!r) return [];
  const n = Object.keys(s.states).filter(
    (l) => l !== e && M(l) === t && !st(s, l) && oe(s, l) === r
  ).sort();
  return [...M(e) === t ? [e] : [], ...n].slice(0, i);
}
function on(s, e, t, i, r = jt) {
  const n = (u) => i.indexOf(se(s, u) ?? ""), o = Object.keys(s.states).filter(
    (u) => u !== e && M(u) === t && n(u) >= 0 && !st(s, u) && oe(s, u) !== void 0
  ).sort((u, v) => n(u) - n(v) || u.localeCompare(v)), l = /* @__PURE__ */ new Map(), a = oe(s, e);
  a && l.set(a, e);
  for (const u of o) {
    const v = oe(s, u);
    l.has(v) || l.set(v, u);
  }
  const h = [...l.values()].filter((u) => u !== e);
  return [e, ...h].slice(0, r);
}
function D(s, e, t = {}) {
  const i = { type: s, ...t };
  for (const [r, n] of Object.entries(e))
    n && (i[r] = n);
  return { config: i };
}
function Me(s) {
  return Object.values(s).filter(Boolean).length;
}
var an = Object.defineProperty, ln = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && an(e, t, r), r;
};
const ls = [
  "temperature",
  "humidity",
  "illuminance",
  "pm25"
];
function mt(s, e) {
  return e?.air_rows ? [{ type: "trend-graph", hours_to_show: 24 }] : [];
}
class qs extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [q, V];
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? Us(e) : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(mt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Sa), document.createElement(
      "horos-climate-tile-editor"
    );
  }
  static getStubConfig() {
    return { temperature: "", humidity: "" };
  }
  setConfig(e) {
    if (!e.temperature)
      throw new Error("A temperature entity is required (temperature)");
    this._bigKeys = Q(
      e.big_values,
      "temperature",
      ls
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = ls.map((u) => ({
      key: u,
      role: p(this.hass, e[u])
    })), i = this.missingRolesWarning([
      ...t.map((u) => u.role),
      ...["co2", "voc", "aqi"].map(
        (u) => p(this.hass, e[u])
      )
    ]);
    if (i) return this.renderWarning(i);
    const { big: r, rest: n } = Z(t, this._bigKeys), o = t[0].role, l = Hs(e.air_bounds), a = e.air_rows ? Ws(this.hass, e, l) : [], c = e.air_rows ? n.filter((u) => !Pe.includes(u.key)) : n, h = rn(this.hass, e, l);
    return this.renderTile({
      icon: e.air_rows ? "mdi:home-thermometer" : "mdi:thermometer",
      color: e.air_rows ? Ds[h] : F(o?.stateObj),
      primary: Ae(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: he(o?.entityId),
      secondary: T([
        W(this.hass, o),
        ...c.map((u) => z(this.hass, u.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(r),
      ownFeatures: mt(this.hass, e),
      customFeatures: a.length ? K(a, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
ln([
  b()
], qs.prototype, "_config");
k("horos-climate-tile", qs, {
  type: "horos-climate-tile",
  name: { ru: "Климат комнаты", en: "Room climate" },
  description: {
    ru: "Температура, влажность, освещённость и PM2.5 одной комнаты в одной плитке",
    en: "Temperature, humidity, illuminance and PM2.5 of one room in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor") return null;
    const t = le(s, e), i = {
      temperature: U(s, t, "sensor", "temperature"),
      humidity: U(s, t, "sensor", "humidity"),
      illuminance: U(s, t, "sensor", "illuminance"),
      pm25: U(s, t, "sensor", "pm25")
    };
    return !i.temperature || Me(i) < 2 ? null : D("custom:horos-climate-tile", i);
  }
});
var cn = Object.defineProperty, un = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && cn(e, t, r), r;
};
const cs = ["switch", "power", "energy"];
function pt(s) {
  return s?.toggle_button ? [{ type: "toggle" }] : [];
}
class Bs extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  fixedRows() {
    return this.featureRows(pt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Aa), document.createElement("horos-plug-tile-editor");
  }
  static getStubConfig() {
    return { switch: "", power: "" };
  }
  setConfig(e) {
    if (!e.switch)
      throw new Error("A switch is required (switch)");
    this._bigKeys = Q(e.big_values, "power", cs), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = cs.map((a) => ({
      key: a,
      role: p(this.hass, e[a])
    })), i = this.missingRolesWarning(t.map((a) => a.role));
    if (i) return this.renderWarning(i);
    const { big: r, rest: n } = Z(t, this._bigKeys), o = t[0].role, l = o.entityId;
    return this.renderTile({
      icon: "mdi:power-plug",
      color: F(o.stateObj),
      primary: Ae(e.name, o),
      secondary: T([
        // One of the two returns a piece: an available switch gives its state,
        // an unavailable one its unavailability status.
        W(this.hass, o),
        // The switch is the card's main entity, so its state can be shown
        // through state_content, just like on the stock tile.
        ...n.map(
          (a) => a.key === "switch" ? this.mainStateSegment(a.role) : z(this.hass, a.role)
        )
      ]),
      mainEntityId: l,
      imageUrl: this.entityImage(o.stateObj),
      defaultIconAction: he(l),
      values: this.bigValues(r),
      ownFeatures: pt(e)
    });
  }
}
un([
  b()
], Bs.prototype, "_config");
k("horos-plug-tile", Bs, {
  type: "horos-plug-tile",
  name: { ru: "Розетка", en: "Smart plug" },
  description: {
    ru: "Выключатель, текущая мощность и накопленная энергия в одной плитке",
    en: "Switch, current power draw and accumulated energy in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = le(s, e), i = {
      switch: Ie(t, "switch"),
      power: U(s, t, "sensor", "power"),
      energy: U(s, t, "sensor", "energy")
    };
    return !i.switch || Me(i) < 2 ? null : D("custom:horos-plug-tile", i);
  }
});
const Ye = 30, Xe = 70;
function Vs(s, e, t) {
  return s === void 0 ? "unknown" : s < e ? "dry" : s > t ? "wet" : "ok";
}
const ft = {
  dry: "var(--warning-color)",
  ok: "var(--success-color)",
  wet: "var(--info-color)",
  unknown: "var(--state-inactive-color)"
}, hn = {
  dry: "mdi:water-off",
  ok: "mdi:sprout",
  wet: "mdi:water-alert",
  unknown: "mdi:sprout"
};
var dn = Object.defineProperty, mn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && dn(e, t, r), r;
};
const us = ["moisture", "temperature", "battery"];
function gt(s, e) {
  const t = s?.states[e?.moisture ?? ""]?.state, i = Number(t);
  return t === void 0 || !Number.isFinite(i) ? [] : [{ type: "bar-gauge", min: 0, max: 100 }];
}
class Ks extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["moisture"];
  }
  fixedRows() {
    return this.featureRows(gt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ta), document.createElement(
      "horos-plant-tile-editor"
    );
  }
  static getStubConfig() {
    return { moisture: "" };
  }
  setConfig(e) {
    if (!e.moisture)
      throw new Error("A soil moisture entity is required (moisture)");
    const t = e.dry_below ?? Ye, i = e.wet_above ?? Xe;
    if (t >= i)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = Q(e.big_values, "moisture", us), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = us.map((c) => ({
      key: c,
      role: p(this.hass, e[c])
    })), i = this.missingRolesWarning(t.map((c) => c.role));
    if (i) return this.renderWarning(i);
    const { big: r, rest: n } = Z(t, this._bigKeys), o = t[0].role, l = B(o), a = Vs(
      l,
      e.dry_below ?? Ye,
      e.wet_above ?? Xe
    );
    return this.renderTile({
      icon: hn[a],
      color: ft[a],
      primary: Ae(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: he(o?.entityId),
      secondary: T([
        W(this.hass, o),
        ...n.map((c) => z(this.hass, c.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(r),
      ownFeatures: gt(this.hass, e)
    });
  }
}
mn([
  b()
], Ks.prototype, "_config");
k("horos-plant-tile", Ks, {
  type: "horos-plant-tile",
  name: { ru: "Растение", en: "Plant" },
  description: {
    ru: "Влажность почвы с порогами сухости, температура почвы и заряд датчика",
    en: "Soil moisture with dryness thresholds, soil temperature and sensor battery"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor" || se(s, e) !== "moisture")
      return null;
    const t = le(s, e);
    return D("custom:horos-plant-tile", {
      moisture: e,
      temperature: U(s, t, "sensor", "temperature"),
      battery: U(s, t, "sensor", "battery")
    });
  }
});
var pn = Object.defineProperty, rt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && pn(e, t, r), r;
};
class je extends ne {
  constructor() {
    super(...arguments), this._children = [];
  }
  static {
    this.styles = J`
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
    const t = await e(), i = this.headingConfig();
    this._heading = i ? t.createCardElement(i) : void 0, this._children = this.childConfigs().map(
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
    return this._error ? g`<ha-card><div class="warning">${this._error}</div></ha-card>` : this._children.length ? g`
      ${this._heading ? g`<div class="heading">${this._heading}</div>` : m}
      <div class="grid" style="--columns: ${this.columns()}">
        ${this._children}
      </div>
    ` : m;
  }
}
rt([
  Y({ attribute: !1 })
], je.prototype, "hass");
rt([
  b()
], je.prototype, "_heading");
rt([
  b()
], je.prototype, "_children");
rt([
  b()
], je.prototype, "_error");
function Gs(s) {
  if (!s) return;
  const e = s.split(":").pop();
  return e ? e.trim() : s;
}
function fn(s) {
  return typeof s == "string" ? { entity: s } : s;
}
var gn = Object.defineProperty, vn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && gn(e, t, r), r;
};
const _n = 3;
class Ys extends je {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Oa), document.createElement(
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
    return this._config?.columns ?? _n;
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
      const t = fn(e), i = this.hass?.states[t.entity];
      return {
        type: "button",
        entity: t.entity,
        name: t.name ?? Gs(i?.attributes.friendly_name),
        icon: t.icon,
        show_state: !1,
        tap_action: { action: "toggle" }
      };
    }) : [];
  }
}
vn([
  b()
], Ys.prototype, "_config");
k("horos-buttons-tile", Ys, {
  type: "horos-buttons-tile",
  name: { ru: "Кнопки скриптов", en: "Script buttons" },
  description: {
    ru: "Сетка кнопок, вызывающих скрипты, под общим заголовком",
    en: "A grid of buttons running scripts, under one heading"
  },
  preview: !0
});
function ae(s, e) {
  if (s) {
    if (e && s.toLowerCase().startsWith(e.toLowerCase())) {
      const t = s.slice(e.length).trim();
      if (t) return t;
    }
    return s;
  }
}
function Xs(s) {
  return s ? s.replace(/[\s—-]*(battery(\s+level)?|заряд)\s*$/i, "").trim() || s : void 0;
}
function bn(s) {
  return s ? s.replace(
    /[\s—-]*(soil\s+)?(moisture|влажность(\s+почвы)?)\s*$/i,
    ""
  ).trim() || s : void 0;
}
function ve(s) {
  return s === void 0 ? "var(--state-unavailable-color)" : s >= 70 ? "var(--state-sensor-battery-high-color, #4caf50)" : s >= 30 ? "var(--state-sensor-battery-medium-color, #ffa600)" : "var(--state-sensor-battery-low-color, #db4437)";
}
const yn = ve;
function wn(s) {
  return s === void 0 ? "var(--state-unavailable-color)" : s >= 90 ? "var(--error-color, #db4437)" : s >= 80 ? "var(--warning-color, #ffa600)" : "var(--state-icon-color)";
}
function j(s) {
  return typeof s == "string" ? { entity: s } : s;
}
const xn = [
  [/black|pgbk|_bk(_|$)/i, "black"],
  [/cyan/i, "cyan"],
  [/magenta/i, "purple"],
  [/yellow/i, "yellow"],
  // MC is the maintenance tank, not ink. It gets its own shade, otherwise it is
  // indistinguishable from black: that one is painted in the text colour and
  [/_mc(_|$)|maintenance/i, "blue-grey"]
];
function $n(s) {
  return xn.find(([t]) => t.test(s))?.[1];
}
function kn(s) {
  return s === "black" ? "var(--primary-text-color)" : /^(#|rgb|hsl|var\()/.test(s) ? s : `var(--${s}-color, var(--state-icon-color))`;
}
const En = ae, hs = (s, e) => typeof s == "number" && Number.isFinite(s) ? s : e;
function Cn(s, e, t) {
  const i = Number(s);
  if (!Number.isFinite(i)) return;
  const r = hs(e.marker_high_level, 100), n = hs(e.marker_low_level, 0), o = String(e.marker_type ?? "").includes("waste"), l = r > 0 ? Math.max(0, Math.min(100, i / r * 100)) : 0, a = o ? i >= r : i <= (t ?? n);
  return { fill: l, alarm: a, fills: o };
}
var Sn = Object.defineProperty, An = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Sn(e, t, r), r;
};
class Zs extends $ {
  static {
    this.styles = [q, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      (this._config?.cartridges.length ?? 0) + (this._config?.sensors?.length ?? 0)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Pa), document.createElement(
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
      const i = this.hass.states[t.entity];
      return {
        entityId: t.entity,
        name: t.name ?? En(i?.attributes.friendly_name, e),
        ink: kn(
          t.color ?? $n(t.entity) ?? "grey"
        ),
        marker: i ? Cn(
          i.state,
          i.attributes,
          this._config.low_below
        ) : void 0,
        text: i ? this.hass.formatEntityState(i) : "—"
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
    const r = e.filter((a) => a.marker && !a.marker.fills).reduce(
      (a, c) => !a || c.marker.fill < a.marker.fill ? c : a,
      void 0
    ), n = this._config.status ? p(this.hass, this._config.status) : void 0, o = (this._config.sensors ?? []).map((a) => j(a)).map((a) => p(this.hass, a.entity)), l = n?.stateObj;
    return this.renderTile({
      icon: "mdi:printer",
      color: l ? F(l) : "var(--state-icon-color)",
      primary: this._printerName ?? d(this.hass, "printer.title"),
      secondary: T([
        z(this.hass, n),
        ...o.map((a) => z(this.hass, a))
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
An([
  b()
], Zs.prototype, "_config");
k("horos-printer-tile", Zs, {
  type: "horos-printer-tile",
  name: { ru: "Принтер", en: "Printer" },
  description: {
    ru: "Уровни чернил и состояние принтера в одной плитке",
    en: "Ink levels and printer status in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = le(s, e), i = t.filter(
      (n) => s.states[n]?.attributes.marker_type !== void 0
    );
    if (!i.length) return null;
    const r = t.find(
      (n) => M(n) === "sensor" && !i.includes(n) && Number.isNaN(Number(s.states[n]?.state))
    );
    return D(
      "custom:horos-printer-tile",
      { status: r },
      { cartridges: i }
    );
  }
});
var Tn = Object.defineProperty, On = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Tn(e, t, r), r;
};
const Pn = 20;
class Js extends $ {
  static {
    this.styles = [q, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(this._config?.consumables?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ia), document.createElement(
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
    const e = this._config, t = p(this.hass, e.vacuum), i = p(this.hass, e.battery), r = (e.sensors ?? []).map((c) => j(c)).map((c) => p(this.hass, c.entity)), n = this.missingRolesWarning([t, i, ...r]);
    if (n) return this.renderWarning(n);
    const o = t?.stateObj?.attributes.friendly_name, l = e.low_below ?? Pn, a = (e.consumables ?? []).map((c) => j(c)).map((c) => {
      const h = p(this.hass, c.entity), u = B(h) ?? 0, v = c.name ?? ae(h?.stateObj?.attributes.friendly_name, o);
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
      color: F(t?.stateObj),
      primary: e.name ?? o ?? d(this.hass, "vacuum.title"),
      mainEntityId: t?.entityId,
      secondary: T([
        W(this.hass, t),
        this.mainStateSegment(t),
        ...r.map((c) => z(this.hass, c))
      ]),
      values: i ? this.bigValues([{ key: "battery", role: i }]) : [],
      customFeatures: a.length ? K(a, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
On([
  b()
], Js.prototype, "_config");
k("horos-vacuum-tile", Js, {
  type: "horos-vacuum-tile",
  name: { ru: "Пылесос", en: "Vacuum" },
  description: {
    ru: "Состояние робота, заряд и ресурс расходников в одной плитке",
    en: "Robot status, battery and consumable life in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = le(s, e), i = Ie(t, "vacuum"), r = U(s, t, "sensor", "battery");
    return !i || !r ? null : D("custom:horos-vacuum-tile", { vacuum: i, battery: r });
  }
});
var In = Object.defineProperty, Rn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && In(e, t, r), r;
};
const Mn = 30;
class Qs extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ra), document.createElement(
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
    const e = this._config, t = e.low_below ?? Mn, i = [], r = [];
    for (const l of e.batteries) {
      const a = j(l), c = p(this.hass, a.entity);
      if (c?.missing) {
        r.push(a.entity);
        continue;
      }
      const h = B(c);
      h !== void 0 && i.push({
        entityId: a.entity,
        name: a.name ?? Xs(c?.stateObj?.attributes.friendly_name) ?? a.entity,
        level: h
      });
    }
    const n = i.filter((l) => l.level < t).sort((l, a) => l.level - a.level), o = n[0];
    return this.renderTile({
      icon: o ? "mdi:battery-alert-variant-outline" : "mdi:battery",
      color: yn(o?.level),
      primary: e.name ?? d(this.hass, "batteries.title"),
      mainEntityId: o?.entityId,
      secondary: T([
        ...n.length ? n.map((l) => ({
          text: `${l.name} ${l.level}%`,
          entityId: l.entityId
        })) : [
          {
            text: d(this.hass, "batteries.allFull", {
              count: i.length
            })
          }
        ],
        // A row that disappeared is dropped, but staying silent about it is not
        // an option: a list card must not go dark over one renamed entity, and
        // must not pretend the entity was never there.
        ...r.length ? [{ text: d(this.hass, "list.missing", { count: r.length }) }] : []
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
Rn([
  b()
], Qs.prototype, "_config");
k("horos-batteries-tile", Qs, {
  type: "horos-batteries-tile",
  name: { ru: "Батарейки", en: "Batteries" },
  description: {
    ru: "Только садящиеся батарейки, от самой пустой",
    en: "Only the batteries that are running down, emptiest first"
  },
  preview: !0,
  suggest: (s, e) => M(e) !== "sensor" || se(s, e) !== "battery" ? null : D(
    "custom:horos-batteries-tile",
    {},
    { batteries: Re(s, e, "sensor", ["battery"]) }
  )
});
var jn = Object.defineProperty, Nn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && jn(e, t, r), r;
};
class er extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ma), document.createElement(
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
    const e = this._config, t = [], i = [], r = [];
    let n = 0;
    for (const a of e.sensors) {
      const c = j(a), h = p(this.hass, c.entity);
      if (h?.missing) {
        r.push(c.entity);
        continue;
      }
      n += 1;
      const u = c.name ?? h?.stateObj?.attributes.friendly_name ?? c.entity;
      h?.unavailable ? i.push({ text: d(this.hass, "safety.offline", { name: u }), entityId: c.entity }) : h?.stateObj?.state === "on" && t.push({ text: u, entityId: c.entity });
    }
    const o = t.length > 0, l = [...t, ...i];
    return this.renderTile({
      icon: o ? "mdi:shield-alert" : i.length ? "mdi:shield-off-outline" : "mdi:shield-check",
      color: o ? "var(--error-color, #db4437)" : i.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "safety.title"),
      mainEntityId: l[0]?.entityId,
      secondary: T([
        ...l.length ? l : [{ text: d(this.hass, "safety.calm", { count: n }) }],
        ...r.length ? [{ text: d(this.hass, "list.missing", { count: r.length }) }] : []
      ])
    });
  }
}
Nn([
  b()
], er.prototype, "_config");
k("horos-safety-tile", er, {
  type: "horos-safety-tile",
  name: { ru: "Безопасность", en: "Safety" },
  description: {
    ru: "Протечка, дым, газ — и датчики, потерявшие связь",
    en: "Leak, smoke, gas — and sensors that lost connection"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["moisture", "gas", "smoke", "carbon_monoxide", "safety"];
    return M(e) !== "binary_sensor" || !t.includes(se(s, e) ?? "") ? null : D(
      "custom:horos-safety-tile",
      {},
      { sensors: Re(s, e, "binary_sensor", t) }
    );
  }
});
var Fn = Object.defineProperty, Ln = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Fn(e, t, r), r;
};
const ds = ["disk", "download", "upload"];
class tr extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["disk"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ja), document.createElement(
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
    this._bigKeys = Q(e.big_values, "disk", ds), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = ds.map((a) => ({
      key: a,
      role: p(this.hass, e[a])
    })), i = p(this.hass, e.status), r = (e.services ?? []).map((a) => j(a)).map((a) => p(this.hass, a.entity)), n = this.missingRolesWarning([
      i,
      ...t.map((a) => a.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = Z(t, this._bigKeys);
    return this.renderTile({
      icon: "mdi:server",
      color: i ? F(i.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "server.title"),
      mainEntityId: i?.entityId ?? t[0].role?.entityId,
      secondary: T([
        W(this.hass, i),
        this.mainStateSegment(i),
        ...l.map((a) => {
          const c = z(this.hass, a.role);
          if (!c) return;
          const h = a.key === "download" ? "↓ " : a.key === "upload" ? "↑ " : "";
          return { ...c, text: h + c.text };
        }),
        ...r.map((a) => z(this.hass, a))
      ]),
      values: this.bigValues(o)
    });
  }
}
Ln([
  b()
], tr.prototype, "_config");
k("horos-server-tile", tr, {
  type: "horos-server-tile",
  name: { ru: "Домашний сервер", en: "Home server" },
  description: {
    ru: "Диск, скорости и состояние сервисов в одной плитке",
    en: "Disk, speeds and service status in a single tile"
  },
  preview: !0
});
var Hn = Object.defineProperty, zn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Hn(e, t, r), r;
};
class sr extends $ {
  static {
    this.styles = [
      q,
      V,
      J`
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
    return await Promise.resolve().then(() => Na), document.createElement(
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
    const e = this._config, t = p(this.hass, e.person), i = p(this.hass, e.battery), r = p(this.hass, e.location), n = this.missingRolesWarning([t, i, r]);
    if (n) return this.renderWarning(n);
    const o = (e.devices ?? []).map((l) => j(l)).map((l) => {
      const a = p(this.hass, l.entity), c = B(a), h = l.name ?? Xs(
        ae(
          a?.stateObj?.attributes.friendly_name,
          e.name
        )
      ) ?? l.entity, u = Ti(p(this.hass, l.charging));
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
      color: F(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "person.title"),
      mainEntityId: t?.entityId,
      imageUrl: this.entityImage(t?.stateObj),
      secondary: T([
        W(this.hass, t),
        this.mainStateSegment(t),
        z(this.hass, r)
      ]),
      values: i ? this.bigValues([{ key: "battery", role: i }]) : [],
      customFeatures: o.length ? K(o, (l) => this.fireMoreInfo(l)) : void 0
    });
  }
}
zn([
  b()
], sr.prototype, "_config");
k("horos-person-tile", sr, {
  type: "horos-person-tile",
  name: { ru: "Человек", en: "Person" },
  description: {
    ru: "Дома ли он, где именно и заряд его устройств",
    en: "Whether they are home, where exactly, and their devices' battery"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "person") return null;
    const i = (s.states[e]?.attributes.device_trackers ?? []).map((r) => U(s, le(s, r), "sensor", "battery")).find(Boolean);
    return i ? D("custom:horos-person-tile", {
      person: e,
      battery: i
    }) : null;
  }
});
function ut(s, e, t) {
  if (!s || !e?.length) return;
  let i, r;
  for (const n of e) {
    const o = p(s, n), l = B(o);
    l !== void 0 && (r === void 0 || (t === "max" ? l > r : l < r)) && (i = o, r = l);
  }
  return i ?? p(s, e[0]);
}
var Dn = Object.defineProperty, Un = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Dn(e, t, r), r;
};
const Wn = [
  "temperature",
  "cpu",
  "memory",
  "gpu",
  "disk"
];
class rr extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [q, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    const e = this._config?.disk_rows ? this._config.disks?.length ?? 0 : 1;
    return this.levelRows(3 + Math.max(e, 1)) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Fa), document.createElement(
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
    this._bigKeys = Q(
      e.big_values,
      "temperature",
      Wn
    ), this.base = e, this._config = e;
  }
  /** The card's roles: the lists are already reduced to their extreme sensor. */
  _roles() {
    const e = this._config;
    return [
      {
        key: "temperature",
        role: ut(this.hass, e.temperatures, "max")
      },
      { key: "cpu", role: p(this.hass, e.cpu) },
      { key: "memory", role: p(this.hass, e.memory) },
      { key: "gpu", role: p(this.hass, e.gpu) },
      { key: "disk", role: ut(this.hass, e.disks, "max") }
    ];
  }
  /** The partition with the least free space left. */
  _freeDisk() {
    return ut(this.hass, this._config?.disks_free, "min");
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
      const i = p(this.hass, t), r = i?.stateObj?.attributes ?? {}, n = ae(r.friendly_name, e.name) ?? d(this.hass, "level.disk"), o = this._levelRow(n, i);
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
    const i = this._config, r = ["off", "not reporting", "unavailable", "unknown", "not_home"], n = e?.stateObj?.state?.toLowerCase();
    if (e && (e.unavailable || e.missing || n && r.includes(n)))
      return "var(--state-unavailable-color)";
    const o = [t[1].role, t[3].role].map((a) => B(a)).filter((a) => a !== void 0);
    if (!o.length) return "var(--state-unavailable-color)";
    const l = Math.max(...o);
    return l >= (i.load_high ?? 75) ? "var(--error-color, #db4437)" : l >= (i.load_medium ?? 30) ? "var(--warning-color, #ffa600)" : "var(--success-color, #4caf50)";
  }
  _levelRow(e, t) {
    if (!t) return;
    const i = B(t);
    return {
      entityId: t.entityId,
      name: e,
      text: i === void 0 ? d(this.hass, "value.unknown") : `${Math.round(i)}%`,
      ink: wn(i),
      level: i ?? 0,
      alarm: i !== void 0 && i >= 90,
      alarmIcon: "mdi:alert-circle"
    };
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = this._roles(), i = p(this.hass, e.status), r = (e.sensors ?? []).map((u) => j(u)).map((u) => p(this.hass, u.entity)), n = this.missingRolesWarning([
      i,
      ...t.map((u) => u.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((u) => j(u)).map((u) => ({ alert: u, role: p(this.hass, u.entity) })).filter(({ role: u }) => u?.stateObj?.state === "on").map(({ alert: u, role: v }) => ({
      text: u.name ?? ae(
        v?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? u.entity,
      entityId: u.entity
    })), { big: l } = Z(t, this._bigKeys), a = this._freeDisk(), c = B(a), h = [
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
      color: e.color_by_load ? this._loadTint(i, t) : i ? F(i.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "computer.title"),
      mainEntityId: i?.entityId ?? t[0].role?.entityId ?? a?.entityId,
      secondary: T([
        W(this.hass, i),
        ...o,
        ...r.map((u) => z(this.hass, u)),
        // Load and disks are already shown as bars with their own labels.
        ...this._bigKeys.includes("temperature") ? [] : [z(this.hass, t[0].role)]
      ]),
      values: this.bigValues(l),
      customFeatures: h.length ? K(h, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
Un([
  b()
], rr.prototype, "_config");
k("horos-computer-tile", rr, {
  type: "horos-computer-tile",
  name: { ru: "Компьютер", en: "Computer" },
  description: {
    ru: "Самая горячая точка, загрузка и диски в одной плитке",
    en: "Hottest spot, load and disks in a single tile"
  },
  preview: !0
});
var qn = Object.defineProperty, Bn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && qn(e, t, r), r;
};
const ms = ["pm25", "humidity", "temperature", "power"];
class ir extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["pm25"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => La), document.createElement("horos-air-tile-editor");
  }
  static getStubConfig() {
    return { appliance: "" };
  }
  setConfig(e) {
    if (!e.appliance)
      throw new Error("An appliance is required (appliance)");
    this._bigKeys = Q(e.big_values, "pm25", ms), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.appliance), i = ms.map((c) => ({
      key: c,
      role: p(this.hass, e[c])
    })), r = (e.sensors ?? []).map((c) => j(c)).map((c) => p(this.hass, c.entity)), n = this.missingRolesWarning([
      t,
      ...i.map((c) => c.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((c) => j(c)).map((c) => ({ alert: c, role: p(this.hass, c.entity) })).filter(({ role: c }) => c?.stateObj?.state === "on").map(({ alert: c, role: h }) => ({
      text: c.name ?? ae(
        h?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? c.entity,
      entityId: c.entity
    })), { big: l, rest: a } = Z(i, this._bigKeys);
    return this.renderTile({
      icon: e.humidity ? "mdi:air-humidifier" : "mdi:air-filter",
      color: F(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "air.title"),
      mainEntityId: t?.entityId,
      secondary: T([
        W(this.hass, t),
        ...o,
        this.mainStateSegment(t),
        ...r.map((c) => z(this.hass, c)),
        ...a.map((c) => z(this.hass, c.role))
      ]),
      values: this.bigValues(l)
    });
  }
}
Bn([
  b()
], ir.prototype, "_config");
k("horos-air-tile", ir, {
  type: "horos-air-tile",
  name: { ru: "Воздух", en: "Air" },
  description: {
    ru: "Очиститель, рекуператор, увлажнитель — прибор и что с воздухом",
    en: "Purifier, recuperator, humidifier — the appliance and the air"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = le(s, e), i = {
      appliance: Ie(t, "fan", "humidifier"),
      pm25: U(s, t, "sensor", "pm25"),
      humidity: U(s, t, "sensor", "humidity"),
      temperature: U(s, t, "sensor", "temperature"),
      power: U(s, t, "sensor", "power")
    };
    return !i.appliance || Me(i) < 2 ? null : D("custom:horos-air-tile", i);
  }
});
var Vn = Object.defineProperty, Kn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Vn(e, t, r), r;
};
const ps = ["illuminance", "battery"], Gn = 1, Yn = 2, nr = 4;
function vt(s, e) {
  if (!e || e.controls === !1) return [];
  const t = Number(
    s?.states[e.cover]?.attributes.supported_features ?? 0
  ), i = [];
  return (t & nr) !== 0 && i.push({ type: "cover-position" }), (t & (Gn | Yn)) !== 0 && i.push({ type: "cover-open-close" }), i;
}
class or extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["illuminance"];
  }
  static {
    this.styles = [q, V];
  }
  /** One row for our own bar, plus whatever controls sit under it. */
  contentRows() {
    return this.levelRows(1) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(vt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ha), document.createElement(
      "horos-cover-tile-editor"
    );
  }
  static getStubConfig() {
    return { cover: "" };
  }
  setConfig(e) {
    if (!e.cover)
      throw new Error("A cover is required (cover)");
    this._bigKeys = Q(e.big_values, "illuminance", ps), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.cover), i = p(this.hass, e.position), r = ps.map((f) => ({
      key: f,
      role: p(this.hass, e[f])
    })), n = this.missingRolesWarning([
      t,
      i,
      ...r.map((f) => f.role)
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = Z(r, this._bigKeys), c = (Number(
      t?.stateObj?.attributes.supported_features ?? 0
    ) & nr) !== 0, h = vt(this.hass, e), u = B(i), v = i && !c ? [
      {
        entityId: i.entityId,
        name: d(this.hass, "level.open"),
        text: u === void 0 ? d(this.hass, "value.unknown") : `${Math.round(u)}%`,
        ink: ve(u),
        level: u ?? 0
      }
    ] : [];
    return this.renderTile({
      icon: "mdi:curtains",
      color: F(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "cover.title"),
      mainEntityId: t?.entityId,
      secondary: T([
        W(this.hass, t),
        this.mainStateSegment(t),
        ...l.map((f) => z(this.hass, f.role))
      ]),
      values: this.bigValues(o),
      ownFeatures: h,
      customFeatures: v.length ? K(v, (f) => this.fireMoreInfo(f)) : void 0
    });
  }
}
Kn([
  b()
], or.prototype, "_config");
k("horos-cover-tile", or, {
  type: "horos-cover-tile",
  name: { ru: "Шторы", en: "Curtains" },
  description: {
    ru: "Насколько открыты, светло ли снаружи и сколько заряда",
    en: "How far open, how bright outside, and battery"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = le(s, e), i = {
      cover: Ie(t, "cover"),
      illuminance: U(s, t, "sensor", "illuminance"),
      battery: U(s, t, "sensor", "battery")
    };
    return !i.cover || Me(i) < 2 ? null : D("custom:horos-cover-tile", i);
  }
});
const Xn = [
  "update",
  "select",
  "text",
  "button",
  "number",
  "event",
  "notify"
];
function Zn(s, e = {}) {
  if (!s) return [];
  const t = new Set(e.ignore ?? []), i = new Set(
    e.ignoreDomains ?? Xn
  ), r = /* @__PURE__ */ new Map();
  for (const [n, o] of Object.entries(s.states)) {
    if (!o || o.state !== "unavailable" || t.has(n) || i.has(n.split(".")[0])) continue;
    const l = s.entities?.[n];
    if (l?.hidden) continue;
    const a = l?.device_id ? s.devices?.[l.device_id] : void 0, c = a?.name_by_user ?? a?.name ?? o.attributes.friendly_name ?? n, h = l?.device_id ?? n, u = r.get(h);
    u ? u.count += 1 : r.set(h, { name: c, count: 1, entityId: n });
  }
  return [...r.values()].sort(
    (n, o) => o.count - n.count || n.name.localeCompare(o.name)
  );
}
var Jn = Object.defineProperty, Qn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Jn(e, t, r), r;
};
const eo = 4;
class ar extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => za), document.createElement(
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
    const e = this._config, t = Zn(this.hass, {
      ignore: e.ignore,
      ignoreDomains: e.ignore_domains
    }), i = e.limit ?? eo, r = t.slice(0, i), n = t.length - r.length;
    return this.renderTile({
      icon: t.length ? "mdi:lan-disconnect" : "mdi:lan-check",
      color: t.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "offline.title"),
      mainEntityId: t[0]?.entityId,
      secondary: T(
        t.length ? [
          ...r.map((o) => ({
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
Qn([
  b()
], ar.prototype, "_config");
k("horos-offline-tile", ar, {
  type: "horos-offline-tile",
  name: { ru: "Не отвечает", en: "Not responding" },
  description: {
    ru: "Что перестало отвечать, посчитанное по устройствам",
    en: "Devices that went silent, grouped by device"
  },
  preview: !0
});
var to = Object.defineProperty, so = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && to(e, t, r), r;
};
const ro = 5;
class lr extends $ {
  static {
    this.styles = [q, V];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      Math.min(this._config?.consumers.length ?? 0, this._config?.limit ?? 5)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Da), document.createElement(
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
    const e = this._config, t = p(this.hass, e.total), i = [], r = [], n = [];
    for (const h of e.consumers) {
      const u = j(h), v = p(this.hass, u.entity);
      if (v?.missing) {
        i.push(u.entity);
        continue;
      }
      const f = u.name ?? ae(v?.stateObj?.attributes.friendly_name, e.name) ?? u.entity;
      if (v?.unavailable) {
        r.push(f);
        continue;
      }
      const w = B(v);
      w === void 0 || w <= 0 || n.push({
        watts: w,
        row: {
          entityId: u.entity,
          name: f,
          text: this.hass.formatEntityState(v.stateObj),
          ink: u.color ?? "var(--amber-color, #ffc107)"
        }
      });
    }
    n.sort((h, u) => u.watts - h.watts);
    const o = n.slice(0, e.limit ?? ro), l = o[0]?.watts ?? 0, a = o.map(({ row: h, watts: u }) => ({
      ...h,
      level: l > 0 ? u / l * 100 : 0
    })), c = [
      W(this.hass, t),
      n.length ? { text: d(this.hass, "energy.consuming", { count: n.length }) } : { text: d(this.hass, "energy.idle") },
      r.length ? { text: d(this.hass, "offline.count", { count: r.length }) } : void 0,
      i.length ? { text: d(this.hass, "list.missing", { count: i.length }) } : void 0
    ];
    return this.renderTile({
      icon: "mdi:flash",
      color: "var(--amber-color, #ffc107)",
      primary: e.name ?? d(this.hass, "energy.title"),
      mainEntityId: t?.entityId ?? o[0]?.row.entityId,
      secondary: T([this.mainStateSegment(t), ...c]),
      values: t ? this.bigValues([{ key: "total", role: t }]) : [],
      customFeatures: a.length ? K(a, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
so([
  b()
], lr.prototype, "_config");
k("horos-energy-tile", lr, {
  type: "horos-energy-tile",
  name: { ru: "Энергия", en: "Energy" },
  description: {
    ru: "Кто в доме ест электричество, от самого прожорливого",
    en: "Who in the house draws power, hungriest first"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor" || se(s, e) !== "power")
      return null;
    const t = Re(
      s,
      e,
      "sensor",
      ["power"],
      12,
      (i) => as(s, i)
    );
    return t.length ? D(
      "custom:horos-energy-tile",
      { total: as(s, e) ? void 0 : e },
      { consumers: t, limit: 6 }
    ) : null;
  }
});
var io = Object.defineProperty, no = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && io(e, t, r), r;
};
class cr extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ua), document.createElement(
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
    const e = this._config, t = [], i = [];
    let r = 0, n = 0;
    for (const o of e.areas) {
      const l = j(o), a = p(this.hass, l.entity);
      if (a?.missing) {
        i.push(l.entity);
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
      primary: e.name ?? d(this.hass, "presence.title"),
      mainEntityId: t[0]?.entityId,
      secondary: T([
        ...t.length ? t : [{ text: d(this.hass, "presence.empty", { count: n }) }],
        r ? { text: d(this.hass, "offline.count", { count: r }) } : void 0,
        i.length ? { text: d(this.hass, "list.missing", { count: i.length }) } : void 0
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
no([
  b()
], cr.prototype, "_config");
k("horos-presence-tile", cr, {
  type: "horos-presence-tile",
  name: { ru: "Присутствие", en: "Presence" },
  description: {
    ru: "В каких зонах сейчас есть кто-то",
    en: "Which areas have someone in them right now"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["occupancy", "presence", "motion"];
    return M(e) !== "binary_sensor" || !t.includes(se(s, e) ?? "") ? null : D(
      "custom:horos-presence-tile",
      {},
      // One entity per area: otherwise the kitchen gets named three times.
      { areas: on(s, e, "binary_sensor", t, 12) }
    );
  }
});
var oo = Object.defineProperty, ao = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && oo(e, t, r), r;
};
const lo = 255;
function _t(s) {
  return !s?.group || s.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class ur extends $ {
  static {
    this.styles = [q, V];
  }
  contentRows() {
    return this.levelRows(this._config?.lights.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(_t(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Wa), document.createElement(
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
    return t === void 0 ? void 0 : Math.round(t / lo * 100);
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.group), r = e.lights.map((f) => j(f)).map((f) => ({
      item: f,
      role: p(this.hass, f.entity)
    })), n = this.missingRolesWarning([
      t,
      ...r.map((f) => f.role)
    ]);
    if (n) return this.renderWarning(n);
    const o = r.filter((f) => f.role?.stateObj?.state === "on"), l = r.filter((f) => f.role?.unavailable), a = r.length - l.length, c = t ?? o[0]?.role ?? r[0].role, h = t?.stateObj?.attributes.friendly_name, u = r.map(({ item: f, role: w }) => {
      const L = this._brightness(w), y = w?.stateObj?.state === "on", N = et(this.hass, w);
      return {
        entityId: f.entity,
        name: f.name ?? ae(w?.stateObj?.attributes.friendly_name, h) ?? f.entity,
        // A dimmable light says how bright, a plain one only that it is on.
        text: N ?? (y ? L === void 0 ? d(this.hass, "light.on") : `${L}%` : d(this.hass, "light.off")),
        ink: f.color ?? F(w?.stateObj),
        level: y ? L ?? 100 : 0
      };
    }), v = this._brightness(c);
    return this.renderTile({
      icon: "mdi:lightbulb-group",
      color: F(c?.stateObj),
      primary: e.name ?? h ?? d(this.hass, "light.title"),
      mainEntityId: c?.entityId,
      defaultIconAction: he(c?.entityId),
      secondary: T([
        W(this.hass, t),
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
      ownFeatures: _t(e),
      customFeatures: K(
        u,
        (f) => this.fireMoreInfo(f)
      )
    });
  }
}
ao([
  b()
], ur.prototype, "_config");
k("horos-light-tile", ur, {
  type: "horos-light-tile",
  name: { ru: "Свет", en: "Lights" },
  description: {
    ru: "Свет комнаты одной плиткой: что горит и насколько ярко",
    en: "A room's lights in one tile: what is on and how bright"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!oe(s, e)) return null;
    const t = Nt(s, e, "light");
    return t.length < 2 ? null : D("custom:horos-light-tile", {}, { lights: t });
  }
});
var co = Object.defineProperty, uo = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && co(e, t, r), r;
};
const fs = ["playing", "paused", "buffering"];
function bt(s) {
  return !s || s.controls === !1 ? [] : [{ type: "media-player-playback" }];
}
class hr extends $ {
  static {
    this.styles = [q, V];
  }
  contentRows() {
    return this.levelRows(this._config?.players.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(bt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => qa), document.createElement(
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
    const e = this._config, t = e.players.map((a) => j(a)).map((a) => ({ item: a, role: p(this.hass, a.entity) })), i = this.missingRolesWarning(t.map((a) => a.role));
    if (i) return this.renderWarning(i);
    const r = t.filter(
      (a) => fs.includes(a.role?.stateObj?.state ?? "")
    ), n = r[0] ?? t[0], o = this._volume(n.role), l = t.map(({ item: a, role: c }) => {
      const h = this._volume(c), u = fs.includes(c?.stateObj?.state ?? "");
      return {
        entityId: a.entity,
        name: a.name ?? c?.stateObj?.attributes.friendly_name ?? a.entity,
        // The state, not the title: a row is a bar with a word at the end, and
        // a track name is a sentence — it pushed the volume bar off the card.
        // What is playing is named once, in the line above.
        text: c?.stateObj && this.hass ? this.hass.formatEntityState(c.stateObj) : d(this.hass, "value.unknown"),
        ink: a.color ?? F(c?.stateObj),
        level: u ? h ?? 0 : 0
      };
    });
    return this.renderTile({
      icon: "mdi:play-box-multiple",
      color: F(n.role?.stateObj),
      primary: e.name ?? n.role?.stateObj?.attributes.friendly_name ?? d(this.hass, "media.title"),
      mainEntityId: n.role?.entityId,
      defaultIconAction: he(n.role?.entityId),
      secondary: T([
        W(this.hass, n.role),
        {
          text: r.length ? this._title(n.role) ?? d(this.hass, "media.playing", { count: r.length }) : d(this.hass, "media.idle"),
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
      ownFeatures: bt(e),
      customFeatures: t.length > 1 ? K(l, (a) => this.fireMoreInfo(a)) : void 0
    });
  }
}
uo([
  b()
], hr.prototype, "_config");
k("horos-media-tile", hr, {
  type: "horos-media-tile",
  name: { ru: "Медиа", en: "Media" },
  description: {
    ru: "Что играет в доме, где и насколько громко",
    en: "What is playing in the house, where, and how loud"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!oe(s, e)) return null;
    const t = Nt(s, e, "media_player");
    return t.length < 2 ? null : D("custom:horos-media-tile", {}, { players: t });
  }
});
const dr = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function $e(s, e, t) {
  const i = s.states[e];
  if (!i) return;
  const r = t ? i.attributes[t] : i.state;
  if (r == null || dr.has(String(r))) return;
  const n = Number(r);
  return Number.isFinite(n) ? n : void 0;
}
function ho(s, e) {
  if (!e) return;
  const t = s.states[e]?.state;
  if (!t || dr.has(t) || !/^\d{1,2}:\d{2}/.test(t)) return;
  const [i, r] = t.split(":").map(Number);
  return new Date(2e3, 0, 1, i, r).toLocaleTimeString(s.locale?.language ?? void 0, {
    hour: "numeric",
    minute: "2-digit"
  });
}
function mo(s, e, t, i, r) {
  const n = Math.round((s + e * t) / t) * t, o = Number(n.toFixed(4));
  return i !== void 0 && o < i ? i : r !== void 0 && o > r ? r : o;
}
function gs(s, e, t) {
  const i = $e(s, e);
  if (i === void 0) return;
  const r = mo(
    i,
    t,
    $e(s, e, "step") ?? 1,
    $e(s, e, "min"),
    $e(s, e, "max")
  );
  r !== i && s.callService(e.split(".")[0], "set_value", { entity_id: e, value: r }).catch(() => {
  });
}
function po(s, e, t) {
  return e.length ? g`<div class="schedule">
    ${e.map((i) => {
    const r = $e(s, i.temperature), n = s.states[i.temperature]?.attributes.unit_of_measurement ?? "", o = ho(s, i.time), l = (a) => a.stopPropagation();
    return g`<div class="period">
        <button
          class="when"
          title=${s.states[i.time ?? i.temperature]?.attributes.friendly_name ?? ""}
          @click=${(a) => {
      l(a), t(i.time ?? i.temperature);
    }}
        >
          ${i.icon ? g`<ha-icon icon=${i.icon}></ha-icon>` : m}
          ${o ? g`<span>${o}</span>` : m}
        </button>
        <div class="stepper">
          <button
            aria-label="−"
            @click=${(a) => {
      l(a), gs(s, i.temperature, -1);
    }}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="value">${r === void 0 ? "—" : `${r}${n}`}</span>
          <button
            aria-label="+"
            @click=${(a) => {
      l(a), gs(s, i.temperature, 1);
    }}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`;
  })}
  </div>` : m;
}
const fo = J`
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
`, vs = ["heat_cool", "auto", "cool", "heat", "dry", "fan_only", "off"], go = {
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power"
};
function vo(s) {
  const e = Array.isArray(s) ? s.map(String) : [], t = vs.filter((r) => e.includes(r)), i = e.filter((r) => !vs.includes(r));
  return [...t.filter((r) => r !== "off"), ...i, ...t.filter((r) => r === "off")];
}
function _o(s, e, t, i) {
  if (!e) return g``;
  const r = vo(e.attributes.hvac_modes), n = oe(s, e.entity_id), o = n ? s.areas?.[n]?.name : void 0, l = (a) => s.formatEntityState(e, a);
  return g`
    <div class="header">
      <ha-icon-button .label=${s.localize("ui.common.close")} @click=${i}>
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <div class="titles">
        ${o ? g`<div class="subtitle">${o}</div>` : m}
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
        .options=${r.map((a) => ({
    value: a,
    label: l(a),
    icon: g`<ha-icon icon=${go[a] ?? "mdi:thermostat"}></ha-icon>`
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
const bo = J`
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
var yo = Object.defineProperty, mr = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && yo(e, t, r), r;
};
const _s = ["temperature", "humidity", "power"];
function yt(s) {
  return !s || s.controls === !1 ? [] : [{ type: "target-temperature" }, { type: "climate-hvac-modes" }];
}
class Ft extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [
      q,
      V,
      fo,
      bo
    ];
  }
  iconTap() {
    return !this._config?.modes_popup || !this._modes ? !1 : (this._modes.showModal(), !0);
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ba), document.createElement("horos-ac-tile-editor");
  }
  static getStubConfig() {
    return { climate: "" };
  }
  setConfig(e) {
    if (!e.climate)
      throw new Error("A climate entity is required (climate)");
    const t = e.features_position ?? (e.vertical ? "bottom" : "inline");
    this._bigKeys = Q(
      e.big_values,
      // A large value and an inline control both want the right of the line;
      // the control wins, and the room temperature becomes a word among others.
      t === "inline" ? [] : "temperature",
      _s
    ), this.base = { ...e, features_position: t }, this._config = e;
  }
  /** The schedule row is a control: one layout row, never squeezed. */
  _scheduleRows() {
    return this._config?.schedule?.length ? 1 : 0;
  }
  fixedRows() {
    return this.featureRows(yt(this._config)) + this._scheduleRows();
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? Us(e) : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.climate), i = _s.map((u) => ({
      key: u,
      role: p(this.hass, e[u])
    })), r = (e.sensors ?? []).map((u) => j(u)).map((u) => p(this.hass, u.entity)), n = this.missingRolesWarning([
      t,
      ...i.map((u) => u.role),
      ...["co2", "voc", "aqi", "pm25"].map(
        (u) => p(this.hass, e[u])
      ),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = Z(i, this._bigKeys), a = e.air_rows ? Ws(this.hass, e, Hs(e.air_bounds)) : [], c = e.air_rows ? l.filter((u) => !Pe.includes(u.key)) : l, h = this.renderTile({
      icon: "mdi:air-conditioner",
      color: F(t?.stateObj),
      primary: Ae(e.name, t) ?? d(this.hass, "ac.title"),
      mainEntityId: t?.entityId,
      // The popup needs a tappable icon; the tap itself goes to iconTap().
      defaultIconAction: e.modes_popup ? { action: "more-info" } : he(t?.entityId),
      secondary: T([
        W(this.hass, t),
        this.mainStateSegment(t),
        ...c.map((u) => z(this.hass, u.role)),
        ...r.map((u) => z(this.hass, u))
      ]),
      values: this.bigValues(o),
      ownFeatures: yt(e),
      customFeatures: a.length || e.schedule?.length ? g`<div class="ac-stack">
              ${a.length ? K(a, (u) => this.fireMoreInfo(u)) : m}
              ${po(
        this.hass,
        e.schedule ?? [],
        (u) => this.fireMoreInfo(u)
      )}
            </div>` : void 0
    });
    return e.modes_popup ? g`${h}
      <dialog
        class="modes"
        @click=${(u) => {
      u.target === u.currentTarget && this._modes?.close();
    }}
      >
        ${_o(
      this.hass,
      t?.stateObj,
      Ae(e.name, t) ?? d(this.hass, "ac.title"),
      () => this._modes?.close()
    )}
      </dialog>` : h;
  }
}
mr([
  b()
], Ft.prototype, "_config");
mr([
  Ei("dialog.modes")
], Ft.prototype, "_modes");
k("horos-ac-tile", Ft, {
  type: "horos-ac-tile",
  name: { ru: "Кондиционер", en: "Air conditioner" },
  description: {
    ru: "Климатический прибор, воздух в комнате и цена работы",
    en: "A climate unit, the air in the room, and what running it costs"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = le(s, e), i = Ie(t, "climate");
    if (!i) return null;
    const r = oe(s, i) ? Nt(s, i, "sensor") : [], n = {
      climate: i,
      temperature: U(s, r, "sensor", "temperature"),
      humidity: U(s, r, "sensor", "humidity"),
      power: U(s, t, "sensor", "power")
    };
    return Me(n) < 2 ? null : D("custom:horos-ac-tile", n);
  }
});
function wo(s, e = {}) {
  if (!s) return [];
  const t = new Set(e.ignore ?? []), i = [];
  for (const [r, n] of Object.entries(s.states)) {
    if (!r.startsWith("update.") || n?.state !== "on" || t.has(r)) continue;
    const o = s.entities?.[r];
    if (o?.hidden) continue;
    const l = o?.device_id ? s.devices?.[o.device_id] : void 0, a = n.attributes.latest_version;
    i.push({
      entityId: r,
      name: l?.name_by_user ?? l?.name ?? n.attributes.title ?? n.attributes.friendly_name ?? r,
      version: a,
      skipped: a !== void 0 && a === n.attributes.skipped_version
    });
  }
  return i.sort((r, n) => r.name.localeCompare(n.name));
}
var xo = Object.defineProperty, $o = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && xo(e, t, r), r;
};
const ko = 4;
class pr extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Va), document.createElement(
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
    const e = this._config, t = wo(this.hass, { ignore: e.ignore }), i = e.include_skipped ? t : t.filter((l) => !l.skipped), r = e.limit ?? ko, n = i.slice(0, r), o = i.length - n.length;
    return this.renderTile({
      icon: i.length ? "mdi:package-up" : "mdi:package-variant-closed-check",
      color: i.length ? "var(--info-color, #2196f3)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "updates.title"),
      mainEntityId: i[0]?.entityId,
      secondary: T(
        i.length ? [
          ...n.map((l) => ({
            text: l.version ? `${l.name} ${l.version}` : l.name,
            entityId: l.entityId
          })),
          o > 0 ? { text: d(this.hass, "offline.more", { count: o }) } : void 0
        ] : [{ text: d(this.hass, "updates.upToDate") }]
      ),
      values: i.length ? [
        {
          value: String(i.length),
          entityId: i[0]?.entityId,
          icon: Oe.updates
        }
      ] : []
    });
  }
}
$o([
  b()
], pr.prototype, "_config");
k("horos-updates-tile", pr, {
  type: "horos-updates-tile",
  name: { ru: "Обновления", en: "Updates" },
  description: {
    ru: "Что в доме просит обновления, одной плиткой вместо тридцати",
    en: "What in the house asks to be updated, one tile instead of thirty"
  },
  preview: !0,
  suggest: (s, e) => e.startsWith("update.") ? D("custom:horos-updates-tile", {}) : null
});
var Eo = Object.defineProperty, Co = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Eo(e, t, r), r;
};
class fr extends $ {
  static {
    this.styles = [q, V];
  }
  contentRows() {
    return this.levelRows(this._config?.lists.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ka), document.createElement(
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
    const e = this._config, t = p(this.hass, e.calendar), i = e.lists.map((c) => j(c)).map((c) => {
      const h = p(this.hass, c.entity);
      return { item: c, role: h, count: B(h) ?? 0 };
    }), r = this.missingRolesWarning([
      t,
      ...i.map((c) => c.role)
    ]);
    if (r) return this.renderWarning(r);
    const n = i.reduce((c, h) => c + h.count, 0), o = Math.max(...i.map((c) => c.count), 1), l = i.filter((c) => c.count > 0).map(({ item: c, role: h, count: u }) => ({
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
      mainEntityId: i[0]?.item.entity,
      secondary: T([
        W(this.hass, t),
        { text: n ? void 0 : d(this.hass, "tasks.none") },
        t ? {
          text: a ?? d(this.hass, "tasks.noEvents"),
          entityId: t.entityId
        } : void 0
      ]),
      values: n ? [
        {
          value: String(n),
          entityId: i[0]?.item.entity,
          icon: Oe.tasks
        }
      ] : [],
      customFeatures: l.length ? K(l, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
Co([
  b()
], fr.prototype, "_config");
k("horos-tasks-tile", fr, {
  type: "horos-tasks-tile",
  name: { ru: "Задачи", en: "Tasks" },
  description: {
    ru: "Сколько дел на каждом списке и что ближайшее в календаре",
    en: "How much is left on each list, and what is coming up next"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!e.startsWith("todo.")) return null;
    const t = Object.keys(s.states).filter((r) => r.startsWith("todo.") && !s.entities?.[r]?.hidden).sort(), i = [e, ...t.filter((r) => r !== e)];
    return i.length < 2 ? null : D("custom:horos-tasks-tile", {}, { lists: i });
  }
});
const So = "on";
function Ao(s) {
  const e = s.alert_when;
  return e === void 0 ? [So] : Array.isArray(e) ? e : [e];
}
function To(s, e) {
  return e === void 0 || e === "unavailable" || e === "unknown" ? !1 : Ao(s).includes(e);
}
var Oo = Object.defineProperty, Po = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Oo(e, t, r), r;
};
const Io = 4;
class gr extends $ {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ga), document.createElement(
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
    const e = this._config, t = e.watch_offline !== !1, i = [], r = [], n = [];
    let o, l = 0;
    for (const v of e.alerts) {
      const f = j(v), w = p(this.hass, f.entity);
      if (w?.missing) {
        n.push(f.entity);
        continue;
      }
      l += 1;
      const L = f.name ?? w?.stateObj?.attributes.friendly_name ?? f.entity;
      if (w?.unavailable) {
        t && r.push({
          text: d(this.hass, "alerts.offline", { name: L }),
          entityId: f.entity
        });
        continue;
      }
      To(f, w?.stateObj?.state) && (i.push({ text: L, entityId: f.entity }), o = o ?? (f.color ? Ls(f.color) : void 0));
    }
    const a = [...i, ...r], c = e.limit ?? Io, h = a.slice(0, c), u = a.length - h.length;
    return this.renderTile({
      icon: i.length ? "mdi:alert" : r.length ? "mdi:bell-off-outline" : "mdi:bell-check-outline",
      color: o ?? (i.length ? "var(--error-color, #db4437)" : r.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)"),
      primary: e.name ?? d(this.hass, "alerts.title"),
      mainEntityId: a[0]?.entityId,
      secondary: T([
        ...a.length ? h : [{ text: d(this.hass, "alerts.calm", { count: l }) }],
        u > 0 ? { text: d(this.hass, "offline.more", { count: u }) } : void 0,
        ...n.length ? [{ text: d(this.hass, "list.missing", { count: n.length }) }] : []
      ]),
      values: i.length ? [
        {
          value: String(i.length),
          entityId: i[0]?.entityId,
          icon: "mdi:alert-outline"
        }
      ] : []
    });
  }
}
Po([
  b()
], gr.prototype, "_config");
k("horos-alerts-tile", gr, {
  type: "horos-alerts-tile",
  name: { ru: "Оповещения", en: "Alerts" },
  description: {
    ru: "Всё, о чём стоит сказать только когда оно случилось, одной плиткой",
    en: "Everything worth mentioning only once it happens, in one tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["problem", "tamper"];
    return M(e) !== "binary_sensor" || !t.includes(se(s, e) ?? "") ? null : D(
      "custom:horos-alerts-tile",
      {},
      { alerts: Re(s, e, "binary_sensor", t) }
    );
  }
});
var Ro = Object.defineProperty, vr = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Ro(e, t, r), r;
};
const Ue = [
  { key: "dim", icon: "mdi:brightness-4" },
  { key: "bright", icon: "mdi:brightness-7" },
  { key: "warm", icon: "mdi:weather-sunset" },
  { key: "cold", icon: "mdi:snowflake" }
];
function wt(s) {
  return !s?.state?.startsWith("light.") || s.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class Lt extends $ {
  constructor() {
    super(...arguments), this._controlsReady = !1;
  }
  static {
    this.styles = [
      q,
      J`
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
    super.connectedCallback(), Ns().then((e) => {
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
    return e ? (Ue.some(({ key: i }) => e[i]) ? 1 : 0) + this.featureRows(wt(e), !!e.presets?.length) : 0;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ya), document.createElement(
      "horos-lamp-tile-editor"
    );
  }
  static getStubConfig() {
    return { bright: "", dim: "" };
  }
  setConfig(e) {
    if (!(Ue.some(({ key: i }) => e[i]) || e.presets?.length || e.power))
      throw new Error(
        "A lamp needs at least one script: bright, dim, warm, cold, power or presets"
      );
    this.base = e, this._config = e;
  }
  /** Runs a script the way a tap action would, confirmations and all. */
  _run(e) {
    this.hass && js(
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
    const t = Ue.filter(({ key: i }) => e[i]);
    return t.length ? g`
      <ha-control-select
        .options=${t.map(({ key: i, icon: r }) => ({
      value: e[i],
      ariaLabel: this._stepLabel(i),
      icon: g`<ha-icon .icon=${r}></ha-icon>`
    }))}
        .value=${void 0}
        hide-option-label
        @value-changed=${(i) => {
      this._run(i.detail.value), i.target.value = void 0;
    }}
      ></ha-control-select>
    ` : m;
  }
  /** The looks the lamp can take, as the segmented selector HA uses for modes. */
  _renderPresets(e) {
    if (!e.presets?.length) return m;
    const t = e.presets.map(
      (r) => typeof r == "string" ? { entity: r } : r
    ), i = e.preset_state ? this.hass?.states[e.preset_state]?.state : void 0;
    return g`
      <ha-control-select
        class="presets ${e.preset_labels !== !1 ? "labelled" : ""}"
        .options=${t.map((r) => {
      const n = this.hass?.states[r.entity], o = r.name ?? Gs(n?.attributes.friendly_name) ?? r.entity, l = r.icon ?? n?.attributes.icon;
      return {
        value: r.entity,
        label: o,
        ariaLabel: o,
        icon: l ? g`<ha-icon .icon=${l}></ha-icon>` : void 0
      };
    })}
        .value=${i ? t.find((r) => r.name === i)?.entity ?? i : void 0}
        ?hide-option-label=${e.preset_labels === !1}
        @value-changed=${(r) => {
      this._run(r.detail.value), e.preset_state || (r.target.value = void 0);
    }}
      >
      </ha-control-select>
    `;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.state), i = (e.sensors ?? []).map((n) => j(n)).map((n) => p(this.hass, n.entity)), r = this.missingRolesWarning([t, ...i]);
    return r ? this.renderWarning(r) : this.renderTile({
      icon: e.icon ?? "mdi:coach-lamp-variant",
      color: t ? F(t.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "lamp.title"),
      mainEntityId: t?.entityId,
      // The icon is the lamp's switch: it runs the power script where there is
      // one, and falls back to toggling whatever holds the state.
      defaultIconAction: e.power ? {
        action: "perform-action",
        perform_action: "homeassistant.turn_on",
        target: { entity_id: e.power }
      } : t ? { action: "toggle" } : { action: "none" },
      secondary: T([
        W(this.hass, t),
        this.mainStateSegment(t),
        ...i.map((n) => z(this.hass, n))
      ]),
      ownFeatures: wt(e),
      customFeatures: this._controlsReady && Ue.some(({ key: n }) => e[n]) ? g`<div class="lamp-controls">${this._renderSteps(e)}</div>` : void 0,
      customInline: this._controlsReady && e.presets?.length ? this._renderPresets(e) : void 0
    });
  }
}
vr([
  b()
], Lt.prototype, "_config");
vr([
  b()
], Lt.prototype, "_controlsReady");
k("horos-lamp-tile", Lt, {
  type: "horos-lamp-tile",
  name: { ru: "Лампа на скриптах", en: "Script lamp" },
  description: {
    ru: "ИК-лампа или лента: ярче, теплее и режимы — скриптами, но как у лампы",
    en: "An IR lamp or a strip: brighter, warmer and presets, driven by scripts"
  },
  preview: !0
});
function Mo(s) {
  if (!s || Qe.has(s.state)) return "offline";
  if (s.state === "off") return "off";
  const e = s.attributes.hvac_action;
  return e === void 0 ? "unknown" : e === "heating" ? "heating" : "idle";
}
function jo(s) {
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
var No = Object.defineProperty, Fo = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && No(e, t, r), r;
};
const bs = ["power", "energy"];
class _r extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  static {
    this.styles = [q, V];
  }
  contentRows() {
    return this.levelRows(this._config?.zones?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Xa), document.createElement(
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
    this._bigKeys = Q(e.big_values, "power", bs), this.base = e, this._config = e;
  }
  /** What the row says on the right: where the room is and where it was sent. */
  _zoneText(e, t) {
    if (t === "offline") return et(this.hass, e);
    const i = e?.stateObj;
    if (!i) return;
    const r = Qt(this.hass, i, "current_temperature"), n = Qt(this.hass, i, "temperature");
    if (r && n) {
      const o = n.replace(/^[\d\s\u00a0.,+-]+/, "");
      return `${Pt(r, o).value} → ${n}`;
    }
    return r ?? n ?? this.hass?.formatEntityState(i);
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.mode), i = p(this.hass, e.burner), r = p(this.hass, e.pump), n = p(this.hass, e.switch), o = bs.map((y) => ({
      key: y,
      role: p(this.hass, e[y])
    })), l = (e.zones ?? []).map((y) => j(y)).map((y) => {
      const N = p(this.hass, y.entity);
      return { item: y, role: N, zone: Mo(N?.stateObj) };
    }), a = this.missingRolesWarning([
      t,
      i,
      r,
      n,
      ...o.map((y) => y.role),
      ...l.map((y) => y.role)
    ]);
    if (a) return this.renderWarning(a);
    const c = i?.stateObj?.state === "on", h = r?.stateObj?.state === "on", u = t ?? n ?? i ?? r, { calling: v, reporting: f, offline: w } = jo(
      l.map((y) => y.zone)
    ), L = l.map(({ item: y, role: N, zone: X }) => ({
      entityId: y.entity,
      name: y.name ?? ae(N?.stateObj?.attributes.friendly_name, e.name) ?? y.entity,
      text: this._zoneText(N, X) ?? "",
      ink: y.color ?? F(N?.stateObj),
      // The bar is the demand, not the temperature: a room either has the
      // boiler working for it or it does not.
      level: X === "heating" ? 100 : 0,
      alarm: X === "offline",
      alarmIcon: "mdi:lan-disconnect"
    }));
    return this.renderTile({
      icon: c ? "mdi:fire" : h ? "mdi:pump" : "mdi:water-boiler",
      color: F(c ? i.stateObj : h ? r.stateObj : u?.stateObj),
      primary: e.name ?? d(this.hass, "heating.title"),
      mainEntityId: u?.entityId,
      // The icon is the boiler's own switch where there is one; without it
      // there is nothing on this card that is safe to toggle.
      defaultIconAction: e.switch ? he(e.switch) : { action: "none" },
      secondary: T([
        W(this.hass, u),
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
        w ? { text: d(this.hass, "offline.count", { count: w }) } : void 0,
        ...Z(o, this._bigKeys).rest.map(
          (y) => z(this.hass, y.role)
        )
      ]),
      values: this.bigValues(Z(o, this._bigKeys).big),
      customFeatures: L.length ? K(L, (y) => this.fireMoreInfo(y)) : void 0
    });
  }
}
Fo([
  b()
], _r.prototype, "_config");
k("horos-heating-tile", _r, {
  type: "horos-heating-tile",
  name: { ru: "Отопление", en: "Heating" },
  description: {
    ru: "Котёл и комнаты, которые просят у него тепла, одной плиткой",
    en: "The boiler and the rooms asking it for heat, in one tile"
  },
  preview: !0
});
function Lo(s) {
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
function Ho(s) {
  return s.thirsty ? "dry" : s.soaked ? "wet" : s.reporting ? "ok" : "unknown";
}
const zo = {
  dry: "mdi:watering-can",
  ok: "mdi:greenhouse",
  wet: "mdi:water-alert",
  unknown: "mdi:greenhouse"
};
var Do = Object.defineProperty, Uo = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Do(e, t, r), r;
};
const ys = [
  "temperature",
  "humidity",
  "illuminance"
];
class br extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [q, V];
  }
  contentRows() {
    return this.levelRows(this._config?.plants?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Za), document.createElement(
      "horos-greenhouse-tile-editor"
    );
  }
  static getStubConfig() {
    return { plants: [] };
  }
  setConfig(e) {
    if (!e.plants?.length)
      throw new Error("At least one plant is required (plants)");
    const t = e.dry_below ?? Ye, i = e.wet_above ?? Xe;
    if (t >= i)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = Q(
      e.big_values,
      "temperature",
      ys
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = ys.map((h) => ({
      key: h,
      role: p(this.hass, e[h])
    })), i = [], r = [], n = [];
    for (const h of e.plants) {
      const u = j(h), v = p(this.hass, u.entity);
      if (v?.missing) {
        n.push(u.entity);
        continue;
      }
      const f = B(v), w = Vs(
        f,
        u.dry_below ?? e.dry_below ?? Ye,
        u.wet_above ?? e.wet_above ?? Xe
      ), L = !!v?.unavailable;
      r.push({ status: w, offline: L }), i.push({
        entityId: u.entity,
        name: u.name ?? bn(v?.stateObj?.attributes.friendly_name) ?? u.entity,
        text: et(this.hass, v) ?? Ot(this.hass, v) ?? d(this.hass, "value.unknown"),
        ink: u.color ?? ft[w],
        // A silent sensor gets an empty bar, not a full one: an empty bar reads
        // as "nothing is known here", a full one as "soaked".
        level: f ?? 0,
        // Dry is the one that needs a hand today. Soaked shows in the colour.
        alarm: L || w === "dry",
        alarmIcon: L ? "mdi:lan-disconnect" : "mdi:water-off"
      });
    }
    const o = Lo(r), l = Ho(o), { big: a, rest: c } = Z(t, this._bigKeys);
    return this.renderTile({
      icon: zo[l],
      color: ft[l],
      primary: e.name ?? d(this.hass, "greenhouse.title"),
      // The card is about the set, so it has no main entity to act on: the
      // driest plant is the one thing worth opening from here.
      mainEntityId: i.find((h) => h.alarm)?.entityId,
      secondary: T([
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
        ...c.map((h) => z(this.hass, h.role))
      ]),
      values: this.bigValues(a),
      customFeatures: i.length ? K(i, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
Uo([
  b()
], br.prototype, "_config");
k("horos-greenhouse-tile", br, {
  type: "horos-greenhouse-tile",
  name: { ru: "Оранжерея", en: "Greenhouse" },
  description: {
    ru: "Все растения полосками влажности почвы и воздух, которым они дышат",
    en: "Every plant as a bar of soil moisture, and the air they share"
  },
  preview: !0,
  suggest: (s, e) => {
    if (M(e) !== "sensor" || se(s, e) !== "moisture")
      return null;
    const t = Re(s, e, "sensor", ["moisture"]);
    return t.length < 2 ? null : D("custom:horos-greenhouse-tile", {}, { plants: t });
  }
});
const Wo = {
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
}, qo = "mdi:weather-partly-cloudy";
function ws(s) {
  return s && Wo[s] || qo;
}
function Bo(s) {
  return s ? Ms([
    `--state-weather-${Rs(s)}-color`,
    "--state-weather-active-color",
    "--state-active-color"
  ]) ?? "var(--state-icon-color)" : "var(--state-inactive-color)";
}
const Vo = {
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
}, Ko = [
  "temperature",
  "apparent_temperature",
  "dew_point",
  "humidity",
  "pressure",
  "wind_speed",
  "cloud_coverage",
  "uv_index",
  "visibility"
], Go = {
  temperature: "temperature_unit",
  templow: "temperature_unit",
  apparent_temperature: "temperature_unit",
  dew_point: "temperature_unit",
  pressure: "pressure_unit",
  wind_speed: "wind_speed_unit",
  wind_gust_speed: "wind_speed_unit",
  visibility: "visibility_unit",
  precipitation: "precipitation_unit"
}, yr = /* @__PURE__ */ new Set([
  "humidity",
  "cloud_coverage",
  "precipitation_probability"
]);
function Yo(s, e) {
  if (yr.has(e)) return "%";
  const t = Go[e];
  if (!t) return;
  const i = s?.attributes[t];
  return typeof i == "string" ? i : void 0;
}
const Xo = 1;
function xs(s) {
  return ((Number(s?.attributes.supported_features) || 0) & Xo) !== 0;
}
const xt = [
  "temperature",
  "precipitation",
  "precipitation_probability",
  "humidity",
  "wind_speed"
], $t = (s) => typeof s == "number" && Number.isFinite(s) ? s : void 0;
function Zo(s, e) {
  if (e === "temperature") return Jo(s);
  const t = s.map((n) => $t(n[e])), i = t.filter((n) => n !== void 0), r = yr.has(e) ? 100 : i.length ? Math.max(...i) : 0;
  return t.map((n) => n === void 0 ? { level: 0 } : r <= 0 ? { level: 0, high: n } : { level: Math.min(100, n / r * 100), high: n });
}
function Jo(s) {
  const e = s.map((l) => $t(l.temperature)), t = s.map((l, a) => $t(l.templow) ?? e[a]), i = [...e, ...t].filter(
    (l) => l !== void 0
  );
  if (!i.length) return s.map(() => ({ level: 0 }));
  const r = Math.min(...i), o = Math.max(...i) - r;
  return s.map((l, a) => {
    const c = e[a], h = t[a];
    return c === void 0 || h === void 0 ? { level: 0 } : o <= 0 ? { from: 0, level: 100, low: h, high: c } : {
      from: (h - r) / o * 100,
      level: (c - r) / o * 100,
      low: h,
      high: c
    };
  });
}
var Qo = Object.defineProperty, wr = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Qo(e, t, r), r;
};
const ea = 7, $s = 14, ta = ["humidity", "wind_speed"], ks = ["temperature", "humidity"], sa = "3.75em";
class Ht extends $ {
  constructor() {
    super(...arguments), this._bigKeys = ks;
  }
  static {
    this.styles = [q, V];
  }
  contentRows() {
    return this.levelRows(this._days().length || this._wanted()) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Qa), document.createElement(
      "horos-weather-tile-editor"
    );
  }
  static getStubConfig() {
    return { weather: "" };
  }
  setConfig(e) {
    if (!e.weather)
      throw new Error("A weather entity is required (weather)");
    if (e.days !== void 0 && (!Number.isInteger(e.days) || e.days < 1 || e.days > $s))
      throw new Error(`days must be a whole number between 1 and ${$s}`);
    if (e.bar && !xt.includes(e.bar))
      throw new Error(
        `Unknown bar: ${e.bar}. Allowed: ${xt.join(", ")}`
      );
    this._bigKeys = Q(
      e.big_values,
      ks,
      Ko
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
    if (!this.isConnected || !this.hass?.connection || !e || !t || !xs(t))
      return;
    this._subscribedTo = e;
    const i = this.hass.connection.subscribeMessage(
      (r) => {
        this._forecast = r.forecast ?? [];
      },
      {
        type: "weather/subscribe_forecast",
        forecast_type: "daily",
        entity_id: e
      }
    );
    this._subscribed = i, i.catch(() => {
      this._subscribed === i && this._unsubscribe();
    });
  }
  // ---- rendering -------------------------------------------------------
  _wanted() {
    return this._config?.days ?? ea;
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
  _attribute(e, t, i) {
    const r = i ?? e.attributes[t];
    if (r == null) return;
    const n = Yo(e, t), o = this.hass?.formatEntityAttributeValue?.(e, t, i) ?? `${r}${n ? ` ${n}` : ""}`;
    return Pt(o, n);
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
  _rowText(e, t, i) {
    if (i.high === void 0) return d(this.hass, "value.unknown");
    const r = this._attribute(
      e,
      t === "temperature" ? "temperature" : t,
      i.high
    );
    if (!r) return d(this.hass, "value.unknown");
    const n = `${r.value}${r.unit ? ` ${r.unit}` : ""}`;
    if (t !== "temperature" || i.low === void 0 || i.low === i.high)
      return n;
    const o = this._attribute(e, "templow", i.low);
    return o ? `${o.value} / ${n}` : n;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.weather);
    if (t?.missing)
      return this.renderWarning(
        d(this.hass, "entity.missing.one", { list: e.weather })
      );
    const i = t.stateObj, r = e.bar ?? "temperature", n = this._days(), o = Zo(n, r), l = n.map((h, u) => ({
      entityId: e.weather,
      name: this._weekday(h.datetime),
      text: this._rowText(i, r, o[u]),
      ink: Bo(h.condition),
      icon: ws(h.condition),
      from: o[u].from,
      level: o[u].level
    })), a = [
      "state",
      ...ta.filter(
        (h) => !this._bigKeys.includes(h) && i.attributes[h] !== void 0 && i.attributes[h] !== null
      )
    ], c = [];
    for (const h of this._bigKeys) {
      const u = this._attribute(i, h);
      u && c.push({
        ...u,
        entityId: e.weather,
        icon: Vo[h]
      });
    }
    return this.renderTile({
      icon: ws(i.state),
      color: F(i),
      primary: e.name ?? i.attributes.friendly_name ?? e.weather,
      mainEntityId: e.weather,
      secondary: T([
        W(this.hass, t),
        this.mainStateSegment(t, a),
        // A forecast the integration does not offer is worth saying out loud:
        // the card is otherwise a tile with an empty half.
        xs(i) ? void 0 : { text: d(this.hass, "weather.noForecast") }
      ]),
      values: c,
      customFeatures: l.length ? K(l, (h) => this.fireMoreInfo(h), {
        nameWidth: sa
      }) : void 0
    });
  }
}
wr([
  b()
], Ht.prototype, "_config");
wr([
  b()
], Ht.prototype, "_forecast");
k("horos-weather-tile", Ht, {
  type: "horos-weather-tile",
  name: { ru: "Погода", en: "Weather" },
  description: {
    ru: "Погода на сегодня в строке и неделя полосками температуры",
    en: "Today on the line and the week as bars of temperature"
  },
  preview: !0,
  suggest: (s, e) => M(e) !== "weather" ? null : D("custom:horos-weather-tile", { weather: e })
});
function xr(s, e) {
  for (const t of e) {
    const i = s.states[t]?.state;
    if (i === void 0 || i.trim() === "") continue;
    const r = Number(i);
    if (Number.isFinite(r)) return { entityId: t, level: r };
  }
  return {};
}
function $r(s, e) {
  let t;
  for (const i of e) {
    const r = s.states[i], n = r?.last_reported ?? r?.last_updated ?? r?.last_changed;
    if (!n) continue;
    const o = Date.parse(n);
    Number.isFinite(o) && (t === void 0 || o > t) && (t = o);
  }
  return t === void 0 ? void 0 : new Date(t);
}
function ra(s, e, t, i, r) {
  if (xr(s, e).level === void 0) return !1;
  if (t === void 0) return !0;
  const n = r ?? $r(s, e);
  return !!n && (i.getTime() - n.getTime()) / 1e3 < t;
}
function ia(s, e) {
  const t = s ? Date.parse(s) : NaN;
  return Number.isFinite(t) ? Math.max(0, Math.ceil((t - e.getTime()) / 6e4)) : 0;
}
const Es = (s) => String(s).padStart(2, "0");
function na(s) {
  if (s.forced)
    return { key: "charge.forced", params: { minutes: s.minutesLeft } };
  if (!s.fresh) {
    if (s.on && s.pulse) return { key: "charge.pulse", params: {} };
    const e = s.since;
    return {
      key: "charge.noData",
      params: {
        time: e ? `${Es(e.getHours())}:${Es(e.getMinutes())}` : "—"
      }
    };
  }
  if (s.on !== void 0)
    return s.on ? s.max === void 0 ? { key: "charge.on", params: {} } : { key: "charge.charging", params: { max: s.max } } : s.min === void 0 ? { key: "charge.off", params: {} } : { key: "charge.waiting", params: { min: s.min } };
}
function oa(s, e, t, i, r, n) {
  const o = i > 0 ? i : 1;
  let l = Math.round(e / o) * o;
  return t !== void 0 && (l = s === "min" ? Math.min(l, t - o) : Math.max(l, t + o)), l = Math.min(n, Math.max(r, l)), Number(l.toFixed(6));
}
function aa(s) {
  return `{% set _ = now() %}{{ expand(${JSON.stringify(s)}) | map(attribute='last_reported') | map('as_timestamp') | max | default('') }}`;
}
function la(s, e, t, i) {
  if (s === void 0) return t;
  const r = s + (e > 0 ? e : 1);
  return r > i ? t : Number(r.toFixed(6));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ca = { ATTRIBUTE: 1 }, ua = (s) => (...e) => ({ _$litDirective$: s, values: e });
let ha = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
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
const kr = "important", da = " !" + kr, xe = ua(class extends ha {
  constructor(s) {
    if (super(s), s.type !== ca.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((e, t) => {
      const i = s[t];
      return i == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [e]) {
    const { style: t } = s.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const i of this.ft) e[i] == null && (this.ft.delete(i), i.includes("-") ? t.removeProperty(i) : t[i] = null);
    for (const i in e) {
      const r = e[i];
      if (r != null) {
        this.ft.add(i);
        const n = typeof r == "string" && r.endsWith(da);
        i.includes("-") || n ? t.setProperty(i, n ? r.slice(0, -11) : r, n ? kr : "") : t[i] = r;
      }
    }
    return ge;
  }
});
var ma = Object.defineProperty, ce = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && ma(e, t, r), r;
};
class re extends ne {
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
    this.styles = J`
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
    return oa(e, t, this._other(e), this.step, this.lo, this.hi);
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
    const i = t.key === "ArrowRight" || t.key === "ArrowUp" ? this.step : t.key === "ArrowLeft" || t.key === "ArrowDown" ? -this.step : 0, r = this[e];
    !i || r === void 0 || (t.preventDefault(), this._emit(e, this._clamp(e, r + i)));
  }
  _valueAt(e) {
    const i = this.shadowRoot.querySelector(".track").getBoundingClientRect(), r = i.width ? (e.clientX - i.left) / i.width : 0;
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
    const { value: i } = this._drag;
    this._drag = void 0, this._emit(e, i);
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
    const i = this._value(e);
    if (i === void 0) return m;
    const r = `${Math.min(100, Math.max(0, i))}%`;
    return g`
      <div
        class="handle ${e}"
        role="slider"
        tabindex="0"
        aria-label=${e}
        aria-valuemin=${this.lo}
        aria-valuemax=${this.hi}
        aria-valuenow=${i}
        style=${xe({ left: r })}
        @keydown=${(n) => this._onKey(e, n)}
        @pointerdown=${(n) => this._onDown(e, n)}
        @pointermove=${(n) => this._onMove(e, n)}
        @pointerup=${(n) => this._onUp(e, n)}
        @pointercancel=${() => this._drag = void 0}
        @click=${(n) => n.stopPropagation()}
      ></div>
      <span class="label ${e} ${t ? "outside" : ""}" style=${xe({ left: r })}
        >${i}</span
      >
    `;
  }
  render() {
    const e = this.level, t = this._value("min"), i = this._value("max"), r = this._labelsOutside();
    return g`
      <div class="track" style=${xe({ "--ink": ve(e) })}>
        <div
          class="fill ${this.charging ? "charging" : ""}"
          style=${xe({ width: `${Math.min(100, Math.max(0, e ?? 0))}%` })}
        ></div>
        ${t !== void 0 && i !== void 0 ? g`<div
              class="band"
              style=${xe({ left: `${t}%`, width: `${i - t}%` })}
            ></div>` : m}
        ${this._handle("min", r)} ${this._handle("max", r)}
      </div>
    `;
  }
}
ce([
  Y({ type: Number })
], re.prototype, "level");
ce([
  Y({ type: Number })
], re.prototype, "min");
ce([
  Y({ type: Number })
], re.prototype, "max");
ce([
  Y({ type: Number })
], re.prototype, "step");
ce([
  Y({ type: Number })
], re.prototype, "lo");
ce([
  Y({ type: Number })
], re.prototype, "hi");
ce([
  Y({ type: Boolean })
], re.prototype, "charging");
ce([
  b()
], re.prototype, "trackWidth");
ce([
  b()
], re.prototype, "_drag");
customElements.get("horos-charge-range") || customElements.define("horos-charge-range", re);
var pa = Object.defineProperty, zt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && pa(e, t, r), r;
};
const Be = (s) => (Array.isArray(s.battery) ? s.battery : [s.battery]).filter(
  (e) => typeof e == "string" && e !== ""
);
class it extends $ {
  constructor() {
    super(...arguments), this._controlsReady = !1, this._held = !1;
  }
  static {
    this.styles = [
      q,
      J`
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
      (i) => {
        const r = Number(i.result);
        this._reported = i.result !== "" && Number.isFinite(r) ? new Date(r * 1e3) : void 0;
      },
      { type: "render_template", template: aa(Be(e)) }
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
    super.connectedCallback(), Ns().then((e) => {
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
    return await Promise.resolve().then(() => el), document.createElement("horos-charge-tile-editor");
  }
  static getStubConfig() {
    return { battery: [], switch: "", min: "", max: "" };
  }
  setConfig(e) {
    if (!Be(e).length) throw new Error("A battery sensor is required (battery)");
    const { features: t, levels: i, ...r } = e;
    this.base = r, this._unsubscribeReported(), this._config = e;
  }
  _number(e, t) {
    const i = e ? this.hass?.states[e] : void 0;
    if (!i) return;
    const r = t ? i.attributes[t] : i.state;
    if (r == null || Qe.has(String(r)))
      return;
    const n = Number(r);
    return Number.isFinite(n) ? n : void 0;
  }
  _setLimit(e) {
    const t = this._config;
    if (!t || !this.hass) return;
    const i = t[e.detail.which];
    i && this.hass.callService(i.split(".")[0], "set_value", {
      entity_id: i,
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
    const i = la(
      this._number(t),
      this._number(t, "step") ?? 1,
      this._number(t, "min") ?? 1,
      this._number(t, "max") ?? 48
    );
    this.hass.callService(t.split(".")[0], "set_value", { entity_id: t, value: i }).catch(() => {
    });
  }
  _toggleForce(e) {
    e.stopPropagation();
    const t = this._config?.force;
    if (!t || !this.hass) return;
    const i = this.hass.states[t]?.state === "active";
    this.hass.callService("timer", i ? "cancel" : "start", { entity_id: t });
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = this.hass, i = Be(e), r = /* @__PURE__ */ new Date(), n = p(t, e.switch), o = this.missingRolesWarning([
      n,
      p(t, e.min),
      p(t, e.max),
      p(t, e.force),
      p(t, e.pulse_every),
      // A battery list is fine with one of its sensors gone, not with all.
      i.every((ee) => !t.states[ee]) ? p(t, i[0]) : void 0
    ]);
    if (o) return this.renderWarning(o);
    const { entityId: l, level: a } = xr(t, i), c = l ?? i[0], h = n ? n.stateObj?.state === "on" : void 0, u = e.force ? t.states[e.force] : void 0, v = u?.state === "active", f = ia(u?.attributes.finishes_at, r), w = this._number(e.min), L = this._number(e.max), y = na({
      forced: v,
      minutesLeft: f,
      fresh: ra(t, i, e.stale_after, r, this._reported),
      on: h,
      pulse: !!e.pulse_every,
      min: w,
      max: L,
      since: this._reported ?? $r(t, i)
    }), N = t.states[c], X = this.renderTile({
      icon: "mdi:watch",
      // Lit while the port is on; the battery itself is always "active". With
      // no port there is nothing to be on, and the icon takes the battery colour.
      color: n ? h ? F(n.stateObj) : "var(--state-inactive-color)" : ve(a),
      primary: e.name ?? N?.attributes.friendly_name ?? d(t, "charge.title"),
      secondary: T([
        W(t, n) ?? (y ? {
          text: d(t, y.key, y.params),
          entityId: v ? e.force : e.switch ?? c
        } : void 0)
      ]),
      mainEntityId: c,
      // With a port the icon switches it by hand — the card works without the
      // automation too. The action names the port itself: the card's main
      // entity is the battery, and a toggle aimed at a sensor does nothing.
      defaultIconAction: e.switch ? { action: "toggle", entity: e.switch } : he(c),
      values: a === void 0 ? [] : [{ value: String(Math.round(a)), unit: "%", entityId: c }],
      customFeatures: g`<div class="charge-line">
        <horos-charge-range
          .level=${a}
          .min=${w}
          .max=${L}
          .step=${this._number(e.min, "step") ?? 1}
          .lo=${this._number(e.min, "min") ?? 0}
          .hi=${this._number(e.max, "max") ?? 100}
          .charging=${h ?? !1}
          @limit-change=${this._setLimit}
        ></horos-charge-range>
        ${e.pulse_every && this._controlsReady ? g`<ha-control-button
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
        ${e.force && this._controlsReady ? g`<ha-control-button
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
    return this.toggleAttribute("filled", !0), X;
  }
}
zt([
  b()
], it.prototype, "_config");
zt([
  b()
], it.prototype, "_controlsReady");
zt([
  b()
], it.prototype, "_reported");
k("horos-charge-tile", it, {
  type: "horos-charge-tile",
  name: { ru: "Зарядка", en: "Charge" },
  description: {
    ru: "Заряд, пределы зарядки и принудительная зарядка одного устройства",
    en: "Battery, charging limits and a forced charge for one device"
  },
  preview: !1
});
function fa([s, e, t]) {
  const i = (r) => {
    const n = r / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * i(s) + 0.7152 * i(e) + 0.0722 * i(t);
}
function ga(s) {
  let e = 0, t = 0, i = 0, r = 0;
  for (let n = 0; n + 3 < s.length; n += 4) {
    const [o, l, a, c] = [s[n], s[n + 1], s[n + 2], s[n + 3]];
    if (c < 128) continue;
    const h = Math.max(o, l, a), u = Math.min(o, l, a);
    h < 24 || u > 232 || (e += o, t += l, i += a, r++);
  }
  if (r)
    return [Math.round(e / r), Math.round(t / r), Math.round(i / r)];
}
var va = Object.defineProperty, nt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && va(e, t, r), r;
};
const _a = 1, ba = 4, ya = 16, wa = 32, xa = 128, $a = 256, ka = 16384, Ea = /* @__PURE__ */ new Set(["off", "unavailable", "unknown", "standby"]);
class Ne extends ne {
  constructor() {
    super(...arguments), this._ready = !1;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => tl), document.createElement("horos-player-card-editor");
  }
  static getStubConfig(e) {
    return { entity: Object.keys(e.states).find((i) => i.startsWith("media_player.")) ?? "" };
  }
  setConfig(e) {
    if (!e.entity) throw new Error("A media player is required (entity)");
    this._config = e;
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6, min_rows: 3 };
  }
  connectedCallback() {
    super.connectedCallback(), tt().then((e) => this._ready = e);
  }
  updated(e) {
    super.updated(e);
    const i = (this._config ? this.hass?.states[this._config.entity] : void 0)?.attributes.entity_picture;
    i !== this._picture && (this._picture = i, this._colour = void 0, i && this._readColour(i));
  }
  _readColour(e) {
    const t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => {
      if (this._picture !== e) return;
      const i = document.createElement("canvas");
      i.width = 24, i.height = 24;
      const r = i.getContext("2d", { willReadFrequently: !0 });
      if (r)
        try {
          r.drawImage(t, 0, 0, 24, 24), this._colour = ga(r.getImageData(0, 0, 24, 24).data);
        } catch {
          this._colour = void 0;
        }
    }, t.src = this.hass?.hassUrl(e) ?? e;
  }
  _call(e) {
    !this.hass || !this._config || this.hass.callService("media_player", e, { entity_id: this._config.entity }).catch(() => {
    });
  }
  _moreInfo() {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config?.entity },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this.hass.states[this._config.entity];
    if (!e)
      return g`<ha-card><div class="warning">${this._config.entity}</div></ha-card>`;
    const t = e.attributes, i = Number(t.supported_features ?? 0), r = Ea.has(e.state), n = e.state === "playing", o = r ? void 0 : t.entity_picture, l = this._config.name ?? t.friendly_name ?? this._config.entity, a = r ? this.hass.formatEntityState(e) : t.media_title ?? this.hass.formatEntityState(e), c = (N) => typeof N == "string" && N && !["unknown", "unavailable", "none"].includes(N.toLowerCase()) ? N : void 0, h = r ? "" : c(t.media_artist) ?? c(t.media_series_title) ?? c(t.app_name) ?? c(t.source) ?? "", u = t.icon ?? (t.device_class === "speaker" ? "mdi:speaker" : t.device_class === "receiver" ? "mdi:audio-video" : "mdi:television"), v = this._colour, f = v ? `rgb(${v.join(",")})` : r ? "var(--card-background-color, var(--ha-card-background))" : "var(--primary-color)", w = v ? fa(v) < 0.4 : !r, L = r && !v ? "var(--primary-text-color)" : w ? "#fff" : "#000", y = (N, X, ee, Le) => Le ? g`<ha-icon-button .label=${X} @click=${() => this._call(ee)}>
            <ha-icon icon=${N}></ha-icon>
          </ha-icon-button>` : m;
    return g`
      <ha-card style="--player-bg: ${f}; --player-fg: ${L};" class=${r ? "off" : ""}>
        ${o ? g`<div
              class="art"
              style="background-image: url('${this.hass.hassUrl(o)}')"
            ></div>` : g`<div class="art placeholder">
              <ha-icon icon=${u}></ha-icon>
            </div>`}
        <div class="content">
          <div class="top">
            <ha-icon class="state-icon" icon=${t.icon ?? "mdi:cast"}></ha-icon>
            <span class="name">${l}</span>
            <ha-icon-button class="more" .label=${l} @click=${this._moreInfo}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="title">${a}</div>
          ${h ? g`<div class="subtitle">${h}</div>` : m}
          <div class="controls">
            ${y(
      "mdi:power",
      "Power",
      r ? "turn_on" : "turn_off",
      !!(i & (r ? xa : $a))
    )}
            ${r ? m : g`${y("mdi:skip-previous", "Previous", "media_previous_track", !!(i & ya))}
                ${y(
      n ? "mdi:pause" : "mdi:play",
      n ? "Pause" : "Play",
      "media_play_pause",
      !!(i & (_a | ka))
    )}
                ${y("mdi:skip-next", "Next", "media_next_track", !!(i & wa))}`}
          </div>
          ${this._ready && !r && i & ba ? g`<hui-card-features
                class="volume"
                .hass=${this.hass}
                .context=${{ entity_id: this._config.entity }}
                .features=${[{ type: "media-player-volume-slider", show_mute_button: !0 }]}
              ></hui-card-features>` : m}
        </div>
      </ha-card>
    `;
  }
  static {
    this.styles = J`
    ha-card {
      position: relative;
      overflow: hidden;
      height: 100%;
      box-sizing: border-box;
      background: var(--player-bg);
      color: var(--player-fg);
      transition: background-color 0.6s ease;
    }

    ha-card.off {
      color: var(--primary-text-color);
    }

    /* The artwork fills the right half and fades into the card's colour, as on
       the stock media card. */
    .art {
      position: absolute;
      inset: 0 0 0 auto;
      width: 55%;
      background-size: cover;
      background-position: center;
    }

    .art::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, var(--player-bg) 0%, transparent 60%);
    }

    .art.placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.25;
      --mdc-icon-size: 72px;
    }

    .art.placeholder::before {
      display: none;
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--ha-space-1, 4px);
      padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px) var(--ha-space-4, 16px);
    }

    .top {
      display: flex;
      align-items: center;
      gap: var(--ha-space-2, 8px);
      font-size: var(--ha-font-size-m, 14px);
      --mdc-icon-size: 20px;
    }

    .top .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.85;
    }

    .top .more {
      margin-inline-end: calc(-1 * var(--ha-space-2, 8px));
    }

    .title {
      margin-top: var(--ha-space-2, 8px);
      font-size: var(--ha-font-size-l, 18px);
      font-weight: var(--ha-font-weight-medium, 500);
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .subtitle {
      font-size: var(--ha-font-size-s, 13px);
      opacity: 0.8;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1, 4px);
      margin: var(--ha-space-2, 8px) 0 0 calc(-1 * var(--ha-space-2, 8px));
      --mdc-icon-size: 28px;
      --mdc-icon-button-size: 44px;
    }

    ha-icon-button {
      color: inherit;
    }

    /* The stock slider in the text's colour, its track a faint wash of it, so
       it reads on any artwork colour the way the buttons do. */
    .volume {
      margin-top: var(--ha-space-2, 8px);
      max-width: 62%;
      --feature-height: 36px;
      --feature-color: var(--player-fg);
      --control-slider-color: var(--player-fg);
      --control-slider-background: var(--player-fg);
      --control-slider-background-opacity: 0.25;
      --control-button-icon-color: var(--player-fg);
      --control-button-background-color: var(--player-fg);
      --control-button-background-opacity: 0.2;
    }

    .warning {
      padding: var(--ha-space-4, 16px);
    }
  `;
  }
}
nt([
  Y({ attribute: !1 })
], Ne.prototype, "hass");
nt([
  b()
], Ne.prototype, "_config");
nt([
  b()
], Ne.prototype, "_colour");
nt([
  b()
], Ne.prototype, "_ready");
k("horos-player-card", Ne, {
  type: "horos-player-card",
  name: { ru: "Плеер", en: "Player" },
  description: {
    ru: "Как стандартная карточка медиа — обложка, цвет, кнопки — и громкость в ней же",
    en: "Like the stock media card — artwork, colour, buttons — with the volume in the same card"
  },
  preview: !0
});
console.info(
  "%c HOROS-CARDS %c 0.7.0 ",
  "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
  "background:#555;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
);
var Ca = Object.defineProperty, Dt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Ca(e, t, r), r;
};
class Fe extends ne {
  constructor() {
    super(...arguments), this._computeHelper = (e) => e.name === "color" ? this.pick({
      ru: {
        color: "Неактивное состояние (например, off или closed) окрашено не будет."
      },
      en: {
        color: "Inactive state (for example, off or closed) will not be coloured."
      }
    }).color : void 0, this._computeLabel = (e) => this.labels[e.name] ?? this.pick({ ru: S, en: A })[e.name] ?? e.name;
  }
  static {
    this.styles = J`
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
    return !this.hass || !this._config ? m : g`
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
Dt([
  Y({ attribute: !1 })
], Fe.prototype, "hass");
Dt([
  b()
], Fe.prototype, "_config");
class C extends Fe {
  constructor() {
    super(...arguments), this._featuresEditorReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Yi().then((e) => {
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
    const i = this._config?.features ?? this.defaultFeatures();
    this.dispatchEvent(
      new CustomEvent("edit-sub-element", {
        detail: {
          type: "feature",
          config: i[t],
          context: { entity_id: this.featuresEntity },
          saveConfig: (r) => {
            const n = [...i];
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
    const { content_layout: t, ...i } = e, r = { ...i };
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
    if (!e) return m;
    const t = this._config?.features ?? this.defaultFeatures(), i = this.pick({ ru: S, en: A }), r = this.pick({
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
    return g`
      <ha-expansion-panel outlined>
        <ha-icon slot="leading-icon" icon="mdi:list-box"></ha-icon>
        <h3 slot="header">${i.features}</h3>
        <div class="content">
          <hui-card-features-editor
            .hass=${this.hass}
            .context=${{ entity_id: e }}
            .features=${t}
            @features-changed=${this._featuresChanged}
            @edit-detail-element=${this._editFeature}
          ></hui-card-features-editor>
          ${t.length ? g`
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
              ` : m}
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return !this.hass || !this._config ? m : g`
      ${this.renderForm()}
      ${this._featuresEditorReady ? this._renderFeatures() : m}
    `;
  }
}
Dt([
  b()
], C.prototype, "_featuresEditorReady");
const O = (s, e, t = []) => ({
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
}), ht = (s) => s ? { entity_id: s, area_id: "area" } : void 0, P = (s, e) => ({
  name: "interactions",
  type: "expandable",
  flatten: !0,
  icon: "mdi:gesture-tap",
  schema: [
    {
      name: "tap_action",
      selector: { ui_action: { default_action: "more-info" } },
      context: ht(s)
    },
    { name: "", type: "divider" },
    {
      name: "icon_tap_action",
      selector: { ui_action: { default_action: e } },
      context: ht(s)
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
        context: ht(s)
      }))
    }
  ]
}), S = {
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
}, A = {
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
}, _ = (s, e) => ({
  entity: {
    filter: e ? { domain: s, device_class: e } : { domain: s }
  }
}), G = (s, e, t) => ({
  number: { min: s, max: e, mode: "box", unit_of_measurement: t }
}), Er = { text: {} }, ie = (s) => ({
  select: { multiple: !0, mode: "list", options: s }
}), H = { boolean: {} };
class Cr extends C {
  get entityField() {
    return "temperature";
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "temperature",
        required: !0,
        selector: _("sensor", "temperature")
      },
      { name: "humidity", selector: _("sensor", "humidity") },
      {
        name: "illuminance",
        selector: _("sensor", "illuminance")
      },
      { name: "pm25", selector: _("sensor", "pm25") },
      { name: "co2", selector: _("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: _("sensor", "volatile_organic_compounds")
      },
      { name: "aqi", selector: _("sensor", "aqi") },
      { name: "air_rows", selector: H },
      O("temperature", e, [
        {
          name: "big_values",
          selector: ie([
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "illuminance", label: e === "ru" ? "Освещённость" : "Illuminance" },
            { value: "pm25", label: "PM2.5" }
          ])
        }
      ]),
      P("temperature", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return mt(this.hass, e);
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
E("horos-climate-tile-editor", Cr);
const Sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosClimateTileEditor: Cr
}, Symbol.toStringTag, { value: "Module" }));
class Sr extends C {
  get entityField() {
    return "switch";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "switch", required: !0, selector: _("switch") },
      { name: "power", selector: _("sensor", "power") },
      { name: "energy", selector: _("sensor", "energy") },
      O("switch", e, [
        {
          name: "big_values",
          selector: ie([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" },
            { value: "switch", label: e === "ru" ? "Состояние" : "State" }
          ])
        }
      ]),
      P("switch", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return pt(e);
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
E("horos-plug-tile-editor", Sr);
const Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlugTileEditor: Sr
}, Symbol.toStringTag, { value: "Module" }));
class Ar extends C {
  get entityField() {
    return "moisture";
  }
  get schema() {
    const e = x(this.hass);
    return [
      {
        name: "moisture",
        required: !0,
        selector: _("sensor", "moisture")
      },
      {
        name: "temperature",
        selector: _("sensor", "temperature")
      },
      { name: "battery", selector: _("sensor", "battery") },
      { name: "dry_below", selector: G(0, 100, "%") },
      { name: "wet_above", selector: G(0, 100, "%") },
      O("moisture", e, [
        {
          name: "big_values",
          selector: ie([
            { value: "moisture", label: e === "ru" ? "Влажность почвы" : "Soil moisture" },
            { value: "temperature", label: e === "ru" ? "Температура почвы" : "Soil temperature" },
            { value: "battery", label: e === "ru" ? "Заряд датчика" : "Sensor battery" }
          ])
        }
      ]),
      P("moisture", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return gt(this.hass, e);
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
E("horos-plant-tile-editor", Ar);
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlantTileEditor: Ar
}, Symbol.toStringTag, { value: "Module" }));
function R(s, e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of s ?? [])
    t.set(typeof i == "string" ? i : i.entity, i);
  return e.map((i) => t.get(i) ?? i);
}
function I(s) {
  return (s ?? []).map(
    (e) => typeof e == "string" ? e : e.entity
  );
}
class Tr extends Fe {
  get schema() {
    return [
      { name: "name", selector: Er },
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
        ...S,
        name: "Заголовок",
        columns: "Кнопок в ряд",
        buttons: "Кнопки"
      },
      en: {
        ...A,
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
      buttons: I(e.buttons)
    };
  }
  fromForm(e) {
    return {
      ...e,
      buttons: R(
        this._config?.buttons,
        e.buttons ?? []
      )
    };
  }
}
E("horos-buttons-tile-editor", Tr);
const Oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosButtonsTileEditor: Tr
}, Symbol.toStringTag, { value: "Module" }));
class Or extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "icon", selector: { icon: {} } },
      { name: "status", selector: _("sensor") },
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
      O("status", e, [
        { name: "levels", selector: H }
      ]),
      P("status", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки уровней",
        name: "Название принтера",
        status: "Состояние принтера",
        cartridges: "Картриджи",
        low_below: "Мало чернил ниже",
        sensors: "Прочее про принтер"
      },
      en: {
        ...A,
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
      cartridges: I(e.cartridges),
      sensors: I(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      cartridges: R(
        this._config?.cartridges,
        e.cartridges ?? []
      ),
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-printer-tile-editor", Or);
const Pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPrinterTileEditor: Or
}, Symbol.toStringTag, { value: "Module" }));
class Pr extends C {
  get entityField() {
    return "vacuum";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "vacuum", required: !0, selector: _("vacuum") },
      { name: "battery", selector: _("sensor", "battery") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "consumables", selector: { entity: { multiple: !0 } } },
      { name: "low_below", selector: G(0, 100, "%") },
      O("vacuum", e, [
        { name: "levels", selector: H }
      ]),
      P("vacuum", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки уровней",
        name: "Название",
        vacuum: "Пылесос",
        battery: "Заряд",
        sensors: "Что ещё сказать",
        consumables: "Расходники",
        low_below: "Просит замены ниже"
      },
      en: {
        ...A,
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
      sensors: I(e.sensors),
      consumables: I(e.consumables)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      ),
      consumables: R(
        this._config?.consumables,
        e.consumables ?? []
      )
    };
  }
}
E("horos-vacuum-tile-editor", Pr);
const Ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosVacuumTileEditor: Pr
}, Symbol.toStringTag, { value: "Module" }));
class Ir extends C {
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
      O(void 0, e),
      P(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        batteries: "Батарейки",
        low_below: "Показывать ниже"
      },
      en: {
        ...A,
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
      batteries: I(e.batteries)
    };
  }
  fromForm(e) {
    return {
      ...e,
      batteries: R(
        this._config?.batteries,
        e.batteries ?? []
      )
    };
  }
}
E("horos-batteries-tile-editor", Ir);
const Ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosBatteriesTileEditor: Ir
}, Symbol.toStringTag, { value: "Module" }));
class Rr extends C {
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
      O(void 0, e),
      P(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        sensors: "Датчики"
      },
      en: {
        ...A,
        name: "Name",
        sensors: "Sensors"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      sensors: I(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-safety-tile-editor", Rr);
const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosSafetyTileEditor: Rr
}, Symbol.toStringTag, { value: "Module" }));
class Mr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "disk", selector: _("sensor", "data_size") },
      { name: "download", selector: _("sensor", "data_rate") },
      { name: "upload", selector: _("sensor", "data_rate") },
      { name: "services", selector: { entity: { multiple: !0 } } },
      O("status", e),
      P("status", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        status: "Состояние",
        disk: "Свободное место",
        download: "Скорость приёма",
        upload: "Скорость отдачи",
        services: "Что ещё сказать"
      },
      en: {
        ...A,
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
      services: I(e.services)
    };
  }
  fromForm(e) {
    return {
      ...e,
      services: R(
        this._config?.services,
        e.services ?? []
      )
    };
  }
}
E("horos-server-tile-editor", Mr);
const ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosServerTileEditor: Mr
}, Symbol.toStringTag, { value: "Module" }));
class jr extends C {
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
      { name: "battery", selector: _("sensor", "battery") },
      { name: "location", selector: _("sensor") },
      {
        name: "devices",
        selector: {
          entity: {
            multiple: !0,
            filter: [{ domain: "sensor", device_class: "battery" }]
          }
        }
      },
      O("person", e, [
        { name: "levels", selector: H }
      ]),
      P("person", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки устройств",
        name: "Имя",
        person: "Человек",
        battery: "Заряд основного устройства",
        location: "Где именно",
        devices: "Остальные устройства"
      },
      en: {
        ...A,
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
      devices: I(e.devices)
    };
  }
  fromForm(e) {
    return {
      ...e,
      devices: R(
        this._config?.devices,
        e.devices ?? []
      )
    };
  }
}
E("horos-person-tile-editor", jr);
const Na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPersonTileEditor: jr
}, Symbol.toStringTag, { value: "Module" }));
class Nr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "cpu", selector: _("sensor") },
      { name: "memory", selector: _("sensor") },
      { name: "gpu", selector: _("sensor") },
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
      { name: "disk_rows", selector: H },
      { name: "color_by_load", selector: H },
      { name: "disks_free", selector: { entity: { multiple: !0 } } },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: {
          entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] }
        }
      },
      O("status", e, [
        {
          name: "big_values",
          selector: ie([
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
        { name: "levels", selector: H }
      ]),
      P("status", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
      sensors: I(e.sensors),
      alerts: I(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      ),
      alerts: R(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
E("horos-computer-tile-editor", Nr);
const Fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosComputerTileEditor: Nr
}, Symbol.toStringTag, { value: "Module" }));
class Fr extends C {
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
      { name: "pm25", selector: _("sensor", "pm25") },
      { name: "humidity", selector: _("sensor", "humidity") },
      { name: "temperature", selector: _("sensor", "temperature") },
      { name: "power", selector: _("sensor", "power") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: { entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] } }
      },
      O("appliance", e, [
        {
          name: "big_values",
          selector: ie([
            { value: "pm25", label: "PM2.5" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "power", label: e === "ru" ? "Мощность" : "Power" }
          ])
        }
      ]),
      P("appliance", "toggle")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
      sensors: I(e.sensors),
      alerts: I(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      ),
      alerts: R(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
E("horos-air-tile-editor", Fr);
const La = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAirTileEditor: Fr
}, Symbol.toStringTag, { value: "Module" }));
class Lr extends C {
  get entityField() {
    return "cover";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "cover", required: !0, selector: _("cover") },
      { name: "position", selector: _("sensor") },
      {
        name: "illuminance",
        selector: _("sensor", "illuminance")
      },
      { name: "battery", selector: _("sensor", "battery") },
      O("cover", e, [
        {
          name: "big_values",
          selector: ie([
            {
              value: "illuminance",
              label: e === "ru" ? "Освещённость" : "Illuminance"
            },
            { value: "battery", label: e === "ru" ? "Заряд" : "Battery" }
          ])
        },
        { name: "levels", selector: H }
      ]),
      P("cover", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return vt(this.hass, e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строка положения",
        name: "Название",
        cover: "Штора",
        position: "Насколько открыто",
        illuminance: "Освещённость",
        battery: "Заряд",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...A,
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
E("horos-cover-tile-editor", Lr);
const Ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosCoverTileEditor: Lr
}, Symbol.toStringTag, { value: "Module" }));
class Hr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "limit", selector: G(1, 12) },
      { name: "ignore", selector: { entity: { multiple: !0 } } },
      O(void 0, e),
      P(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        limit: "Сколько устройств называть",
        ignore: "Молчание этих — норма"
      },
      en: {
        ...A,
        limit: "How many devices to name",
        ignore: "Silence of these is normal"
      }
    });
  }
}
E("horos-offline-tile-editor", Hr);
const za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosOfflineTileEditor: Hr
}, Symbol.toStringTag, { value: "Module" }));
class zr extends C {
  get entityField() {
    return "total";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "total", selector: _("sensor", "power") },
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
      O("total", e, [
        { name: "levels", selector: H }
      ]),
      P("total", "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки потребителей",
        name: "Название",
        total: "Общая мощность",
        consumers: "Потребители",
        limit: "Сколько показывать"
      },
      en: {
        ...A,
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
      consumers: I(e.consumers)
    };
  }
  fromForm(e) {
    return {
      ...e,
      consumers: R(
        this._config?.consumers,
        e.consumers ?? []
      )
    };
  }
}
E("horos-energy-tile-editor", zr);
const Da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosEnergyTileEditor: zr
}, Symbol.toStringTag, { value: "Module" }));
class Dr extends C {
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
      O(void 0, e),
      P(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        areas: "Зоны"
      },
      en: {
        ...A,
        name: "Name",
        areas: "Areas"
      }
    });
  }
  get formData() {
    const e = this._config ?? {};
    return {
      ...e,
      areas: I(e.areas)
    };
  }
  fromForm(e) {
    return {
      ...e,
      areas: R(
        this._config?.areas,
        e.areas ?? []
      )
    };
  }
}
E("horos-presence-tile-editor", Dr);
const Ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPresenceTileEditor: Dr
}, Symbol.toStringTag, { value: "Module" }));
class Ur extends C {
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
      { name: "group", selector: _("light") },
      O("group", e, [
        { name: "levels", selector: H }
      ]),
      P("group", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return _t(e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки ламп",
        name: "Название",
        lights: "Лампы",
        group: "Группа (главная сущность)"
      },
      en: {
        ...A,
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
      lights: I(e.lights)
    };
  }
  fromForm(e) {
    return {
      ...e,
      lights: R(
        this._config?.lights,
        e.lights ?? []
      )
    };
  }
}
E("horos-light-tile-editor", Ur);
const Wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLightTileEditor: Ur
}, Symbol.toStringTag, { value: "Module" }));
class Wr extends C {
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
      O(void 0, e, [
        { name: "levels", selector: H }
      ]),
      P(void 0, "more-info")
    ];
  }
  /** The playback buttons act on the first player in the list. */
  get featuresEntity() {
    const e = this._config?.players ?? [];
    return I(e)[0];
  }
  defaultFeatures() {
    const e = this._config;
    return bt(e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки плееров",
        name: "Название",
        players: "Проигрыватели"
      },
      en: {
        ...A,
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
      players: I(e.players)
    };
  }
  fromForm(e) {
    return {
      ...e,
      players: R(
        this._config?.players,
        e.players ?? []
      )
    };
  }
}
E("horos-media-tile-editor", Wr);
const qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosMediaTileEditor: Wr
}, Symbol.toStringTag, { value: "Module" }));
class qr extends C {
  get entityField() {
    return "climate";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "climate", required: !0, selector: _("climate") },
      { name: "temperature", selector: _("sensor", "temperature") },
      { name: "humidity", selector: _("sensor", "humidity") },
      { name: "power", selector: _("sensor", "power") },
      { name: "co2", selector: _("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: _("sensor", "volatile_organic_compounds")
      },
      { name: "aqi", selector: _("sensor", "aqi") },
      { name: "pm25", selector: _("sensor", "pm25") },
      { name: "air_rows", selector: H },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      O("climate", e, [
        {
          name: "big_values",
          selector: ie([
            { value: "temperature", label: e === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: e === "ru" ? "Влажность" : "Humidity" },
            { value: "power", label: e === "ru" ? "Мощность" : "Power" }
          ])
        }
      ]),
      P("climate", "more-info")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return yt(e);
  }
  defaultFeaturesPosition() {
    return "inline";
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
      sensors: I(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-ac-tile-editor", qr);
const Ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAcTileEditor: qr
}, Symbol.toStringTag, { value: "Module" }));
class Br extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "limit", selector: G(1, 20) },
      { name: "include_skipped", selector: H },
      { name: "ignore", selector: { entity: { multiple: !0, filter: { domain: "update" } } } },
      O(void 0, e),
      P(void 0, "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        limit: "Сколько называть поимённо",
        include_skipped: "Считать и пропущенные версии",
        ignore: "Не считать"
      },
      en: {
        ...A,
        name: "Name",
        limit: "How many to name",
        include_skipped: "Count skipped versions too",
        ignore: "Do not count"
      }
    });
  }
}
E("horos-updates-tile-editor", Br);
const Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosUpdatesTileEditor: Br
}, Symbol.toStringTag, { value: "Module" }));
class Vr extends C {
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
      { name: "calendar", selector: _("calendar") },
      O(void 0, e, [
        { name: "levels", selector: H }
      ]),
      P(void 0, "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        levels: "Строки списков",
        name: "Название",
        lists: "Списки дел",
        calendar: "Календарь"
      },
      en: {
        ...A,
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
      lists: I(e.lists)
    };
  }
  fromForm(e) {
    return {
      ...e,
      lists: R(
        this._config?.lists,
        e.lists ?? []
      )
    };
  }
}
E("horos-tasks-tile-editor", Vr);
const Ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosTasksTileEditor: Vr
}, Symbol.toStringTag, { value: "Module" }));
class Kr extends C {
  get entityField() {
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "alerts", required: !0, selector: { entity: { multiple: !0 } } },
      { name: "limit", selector: G(1, 20) },
      { name: "watch_offline", selector: H },
      O(void 0, e),
      P(void 0, "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        alerts: "Оповещения",
        limit: "Сколько называть поимённо",
        watch_offline: "Считать потерю связи оповещением"
      },
      en: {
        ...A,
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
      alerts: I(e.alerts)
    };
  }
  fromForm(e) {
    return {
      ...e,
      alerts: R(
        this._config?.alerts,
        e.alerts ?? []
      )
    };
  }
}
E("horos-alerts-tile-editor", Kr);
const Ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAlertsTileEditor: Kr
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
class Gr extends C {
  get entityField() {
    return "state";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "state", selector: _("input_boolean") },
      { name: "power", selector: _e },
      { name: "bright", selector: _e },
      { name: "dim", selector: _e },
      { name: "warm", selector: _e },
      { name: "cold", selector: _e },
      {
        name: "presets",
        selector: { entity: { ..._e.entity, multiple: !0 } }
      },
      { name: "preset_state", selector: _("input_select") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "preset_labels", selector: H },
      O("state", e, [
        { name: "levels", selector: H }
      ]),
      P("state", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return wt(e);
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
      presets: I(e.presets),
      sensors: I(e.sensors)
    };
  }
  fromForm(e) {
    return {
      ...e,
      presets: R(
        this._config?.presets,
        e.presets ?? []
      ),
      sensors: R(
        this._config?.sensors,
        e.sensors ?? []
      )
    };
  }
}
E("horos-lamp-tile-editor", Gr);
const Ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLampTileEditor: Gr
}, Symbol.toStringTag, { value: "Module" }));
class Yr extends C {
  get entityField() {
    return "mode";
  }
  get schema() {
    const e = x(this.hass);
    return [
      { name: "mode", selector: _("sensor") },
      {
        name: "burner",
        selector: _("binary_sensor", "heat")
      },
      {
        name: "pump",
        selector: _("binary_sensor", "heat")
      },
      {
        name: "switch",
        selector: { entity: { filter: [{ domain: "switch" }] } }
      },
      { name: "power", selector: _("sensor", "power") },
      { name: "energy", selector: _("sensor", "energy") },
      {
        name: "zones",
        selector: {
          entity: { multiple: !0, filter: [{ domain: "climate" }] }
        }
      },
      O("mode", e, [
        {
          name: "big_values",
          selector: ie([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" }
          ])
        },
        { name: "levels", selector: H }
      ]),
      P("mode", "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
      zones: I(e.zones)
    };
  }
  fromForm(e) {
    return {
      ...e,
      zones: R(
        this._config?.zones,
        e.zones ?? []
      )
    };
  }
}
E("horos-heating-tile-editor", Yr);
const Xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosHeatingTileEditor: Yr
}, Symbol.toStringTag, { value: "Module" }));
class Xr extends C {
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
        selector: _("sensor", "temperature")
      },
      { name: "humidity", selector: _("sensor", "humidity") },
      {
        name: "illuminance",
        selector: _("sensor", "illuminance")
      },
      O(void 0, e, [
        {
          name: "big_values",
          selector: ie([
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
        { name: "levels", selector: H }
      ]),
      P(void 0, "none")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
      plants: I(e.plants)
    };
  }
  fromForm(e) {
    return {
      ...e,
      // The thresholds a plant was given by hand in YAML survive a pick here.
      plants: R(
        this._config?.plants,
        e.plants ?? []
      )
    };
  }
}
E("horos-greenhouse-tile-editor", Xr);
const Za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosGreenhouseTileEditor: Xr
}, Symbol.toStringTag, { value: "Module" })), Ja = {
  temperature: { ru: "Температура, от ночи до дня", en: "Temperature, night to day" },
  precipitation: { ru: "Осадки", en: "Precipitation" },
  precipitation_probability: { ru: "Вероятность осадков", en: "Chance of rain" },
  humidity: { ru: "Влажность", en: "Humidity" },
  wind_speed: { ru: "Ветер", en: "Wind" }
}, Cs = {
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
class Zr extends C {
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
                options: xt.map((t) => ({
                  value: t,
                  label: Ja[t][e]
                }))
              }
            }
          }
        ]
      },
      O("weather", x(this.hass), [
        {
          name: "big_values",
          selector: ie(
            Object.keys(Cs).map((t) => ({
              value: t,
              label: Cs[t][e]
            }))
          )
        },
        { name: "levels", selector: H }
      ]),
      P("weather", "more-info")
    ];
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
        name: "Название",
        weather: "Погода",
        days: "Дней в прогнозе",
        bar: "Что показывают полоски",
        levels: "Строки прогноза",
        big_values: "Крупно справа (не больше трёх)"
      },
      en: {
        ...A,
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
E("horos-weather-tile-editor", Zr);
const Qa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosWeatherTileEditor: Zr
}, Symbol.toStringTag, { value: "Module" }));
class Jr extends C {
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
      { name: "switch", selector: _("switch") },
      { name: "min", selector: t },
      { name: "max", selector: t },
      { name: "force", selector: _("timer") },
      { name: "pulse_every", selector: _("input_number") },
      { name: "stale_after", selector: G(0, 86400, "s") },
      O(void 0, e),
      P(void 0, "more-info")
    ];
  }
  /** The form always edits a list, whatever the YAML holds. */
  get formData() {
    const e = super.formData;
    return {
      ...e,
      battery: Be(e)
    };
  }
  get labels() {
    return this.pick({
      ru: {
        ...S,
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
        ...A,
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
E("horos-charge-tile-editor", Jr);
const el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosChargeTileEditor: Jr
}, Symbol.toStringTag, { value: "Module" }));
class Qr extends Fe {
  get schema() {
    return [
      {
        name: "entity",
        required: !0,
        selector: { entity: { filter: { domain: "media_player" } } }
      },
      { name: "name", selector: Er }
    ];
  }
  get labels() {
    return this.pick({
      ru: { ...S, entity: "Проигрыватель", name: "Название" },
      en: { ...A, entity: "Media player", name: "Name" }
    });
  }
}
E("horos-player-card-editor", Qr);
const tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlayerCardEditor: Qr
}, Symbol.toStringTag, { value: "Module" }));
