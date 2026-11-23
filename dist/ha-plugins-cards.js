/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = globalThis, yt = Le.ShadowRoot && (Le.ShadyCSS === void 0 || Le.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), Lt = /* @__PURE__ */ new WeakMap();
let xs = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (yt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Lt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Lt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const zr = (s) => new xs(typeof s == "string" ? s : s + "", void 0, bt), ue = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new xs(t, s, bt);
}, Wr = (s, e) => {
  if (yt) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Le.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  }
}, Ht = yt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return zr(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Br, defineProperty: qr, getOwnPropertyDescriptor: Vr, getOwnPropertyNames: Kr, getOwnPropertySymbols: Gr, getPrototypeOf: Yr } = Object, Ve = globalThis, Dt = Ve.trustedTypes, Xr = Dt ? Dt.emptyScript : "", Zr = Ve.reactiveElementPolyfillSupport, xe = (s, e) => s, Ue = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Xr : null;
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
} }, wt = (s, e) => !Br(s, e), Ut = { attribute: !0, type: String, converter: Ue, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ??= Symbol("metadata"), Ve.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ye = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ut) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && qr(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: n } = Vr(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xe("elementProperties"))) return;
    const e = Yr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xe("properties"))) {
      const t = this.properties, i = [...Kr(t), ...Gr(t)];
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
      for (const r of i) t.unshift(Ht(r));
    } else e !== void 0 && t.push(Ht(e));
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
    return Wr(e, this.constructor.elementStyles), e;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ue).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ue;
      this._$Em = r;
      const l = o.fromAttribute(t, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? wt)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
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
ye.elementStyles = [], ye.shadowRootOptions = { mode: "open" }, ye[xe("elementProperties")] = /* @__PURE__ */ new Map(), ye[xe("finalized")] = /* @__PURE__ */ new Map(), Zr?.({ ReactiveElement: ye }), (Ve.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, zt = (s) => s, ze = $t.trustedTypes, Wt = ze ? ze.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Es = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, ks = "?" + ae, Jr = `<${ks}>`, fe = document, Ee = () => fe.createComment(""), ke = (s) => s === null || typeof s != "object" && typeof s != "function", xt = Array.isArray, Qr = (s) => xt(s) || typeof s?.[Symbol.iterator] == "function", st = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bt = /-->/g, qt = />/g, de = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Kt = /"/g, Cs = /^(?:script|style|textarea|title)$/i, ei = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), v = ei(1), ge = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Gt = /* @__PURE__ */ new WeakMap(), pe = fe.createTreeWalker(fe, 129);
function Ss(s, e) {
  if (!xt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(e) : e;
}
const ti = (s, e) => {
  const t = s.length - 1, i = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = we;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, h, u = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, h = o.exec(a), h !== null); ) g = o.lastIndex, o === we ? h[1] === "!--" ? o = Bt : h[1] !== void 0 ? o = qt : h[2] !== void 0 ? (Cs.test(h[2]) && (r = RegExp("</" + h[2], "g")), o = de) : h[3] !== void 0 && (o = de) : o === de ? h[0] === ">" ? (o = r ?? we, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? de : h[3] === '"' ? Kt : Vt) : o === Kt || o === Vt ? o = de : o === Bt || o === qt ? o = we : (o = de, r = void 0);
    const f = o === de && s[l + 1].startsWith("/>") ? " " : "";
    n += o === we ? a + Jr : u >= 0 ? (i.push(c), a.slice(0, u) + Es + a.slice(u) + ae + f) : a + ae + (u === -2 ? l : f);
  }
  return [Ss(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Ce {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, h] = ti(e, t);
    if (this.el = Ce.createElement(c, i), pe.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = pe.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Es)) {
          const g = h[o++], f = r.getAttribute(u).split(ae), b = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: b[2], strings: f, ctor: b[1] === "." ? ri : b[1] === "?" ? ii : b[1] === "@" ? ni : Ke }), r.removeAttribute(u);
        } else u.startsWith(ae) && (a.push({ type: 6, index: n }), r.removeAttribute(u));
        if (Cs.test(r.tagName)) {
          const u = r.textContent.split(ae), g = u.length - 1;
          if (g > 0) {
            r.textContent = ze ? ze.emptyScript : "";
            for (let f = 0; f < g; f++) r.append(u[f], Ee()), pe.nextNode(), a.push({ type: 2, index: ++n });
            r.append(u[g], Ee());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ks) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(ae, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += ae.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = fe.createElement("template");
    return i.innerHTML = e, i;
  }
}
function be(s, e, t = s, i) {
  if (e === ge) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const n = ke(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = be(s, r._$AS(s, e.values), r, i)), e;
}
class si {
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
        a.type === 2 ? c = new Se(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new oi(n, this, e)), this._$AV.push(c), a = i[++l];
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
class Se {
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
    e = be(this, e, t), ke(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== ge && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && ke(this._$AH) ? this._$AA.nextSibling.data = e : this.T(fe.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ce.createElement(Ss(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new si(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Gt.get(e.strings);
    return t === void 0 && Gt.set(e.strings, t = new Ce(e)), t;
  }
  k(e) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const n of e) r === t.length ? t.push(i = new Se(this.O(Ee()), this.O(Ee()), this, this.options)) : i = t[r], i._$AI(n), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = zt(e).nextSibling;
      zt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ke {
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
    if (n === void 0) e = be(this, e, t, 0), o = !ke(e) || e !== this._$AH && e !== ge, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = be(this, l[i + a], t, a), c === ge && (c = this._$AH[a]), o ||= !ke(c) || c !== this._$AH[a], c === m ? e = m : e !== m && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ri extends Ke {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class ii extends Ke {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class ni extends Ke {
  constructor(e, t, i, r, n) {
    super(e, t, i, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = be(this, e, t, 0) ?? m) === ge) return;
    const i = this._$AH, r = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== m && (i === m || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class oi {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    be(this, e);
  }
}
const ai = $t.litHtmlPolyfillSupport;
ai?.(Ce, Se), ($t.litHtmlVersions ??= []).push("3.3.3");
const li = (s, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    i._$litPart$ = r = new Se(e.insertBefore(Ee(), n), n, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = globalThis;
let le = class extends ye {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = li(t, this.renderRoot, this.renderOptions);
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
le._$litElement$ = !0, le.finalized = !0, Et.litElementHydrateSupport?.({ LitElement: le });
const ci = Et.litElementPolyfillSupport;
ci?.({ LitElement: le });
(Et.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ui = { attribute: !0, type: String, converter: Ue, reflect: !1, hasChanged: wt }, hi = (s = ui, e, t) => {
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
  return (e, t) => typeof t == "object" ? hi(s, e, t) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(s) {
  return Y({ ...s, state: !0, attribute: !1 });
}
const W = ue`
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
`, Ge = /* @__PURE__ */ new Set(["unavailable", "unknown"]), di = /* @__PURE__ */ new Set([
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
function As(s) {
  const e = s?.attributes.device_class;
  if (!e || !di.has(e)) return !1;
  const t = Number(s.state);
  return Number.isFinite(t) && t < 0;
}
const mi = " · ";
function p(s, e) {
  if (!e) return;
  const t = s?.states[e];
  return {
    entityId: e,
    stateObj: t,
    missing: !t,
    unavailable: !!t && Ge.has(t.state),
    impossible: As(t)
  };
}
function kt(s, e) {
  if (!(!s || !e || !e.stateObj || e.missing || e.unavailable) && !e.impossible)
    return s.formatEntityState(e.stateObj);
}
function Yt(s, e, t) {
  const i = e?.attributes[t];
  if (!(i == null || i === ""))
    return s?.formatEntityAttributeValue?.(e, t) ?? String(i);
}
function S(s) {
  return s.filter(
    (e) => !!e && (e.content !== void 0 || (e.text ?? "").trim() !== "")
  );
}
function F(s, e) {
  const t = kt(s, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function z(s, e) {
  const t = Ye(s, e);
  return t ? { text: t, entityId: e?.entityId } : void 0;
}
function Ye(s, e) {
  if (!(!s || !e?.stateObj || !e.unavailable))
    return s.formatEntityState(e.stateObj);
}
function q(s) {
  if (!s?.stateObj || s.impossible) return;
  const e = Number(s.stateObj.state);
  return Number.isFinite(e) ? e : void 0;
}
const pi = /* @__PURE__ */ new Set([
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
function fi(s) {
  if (!s?.stateObj || s.missing || s.unavailable) return !1;
  const e = s.stateObj.state.trim().toLowerCase().replace(/[_-]+/g, " ");
  return !pi.has(e);
}
function Xe(s, e) {
  return s || (e?.stateObj?.attributes.friendly_name ?? e?.entityId ?? "");
}
function Ct(s, e) {
  if (!e) return { value: s };
  if (!s.endsWith(e)) return { value: s };
  const t = s.slice(0, s.length - e.length).trimEnd();
  return t ? { value: t, unit: e } : { value: s };
}
const at = "unavailable", gi = "unknown", _i = "off", vi = /* @__PURE__ */ new Set(["button", "input_button", "scene"]), yi = /* @__PURE__ */ new Set([
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
]), j = (s) => s.substring(0, s.indexOf(".")), Ts = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "unknown";
function We(s, e) {
  const t = j(s.entity_id), i = s.state;
  if (vi.has(t))
    return i !== at;
  if (i === at || i === gi || i === _i && t !== "alert")
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
const Os = (s) => s.reduceRight(
  (e, t) => `var(${t}${e ? `, ${e}` : ""})`,
  void 0
), bi = (s) => {
  const e = Number(s);
  if (!isNaN(e))
    return e >= 70 ? "--state-sensor-battery-high-color" : e >= 30 ? "--state-sensor-battery-medium-color" : "--state-sensor-battery-low-color";
};
function wi(s, e) {
  if (!s) return e;
  if (s.state === at)
    return "var(--state-unavailable-color)";
  const t = j(s.entity_id), i = s.attributes.device_class;
  if (t === "sensor" && i === "battery") {
    const a = bi(s.state);
    if (a) return `var(${a})`;
  }
  if (!yi.has(t))
    return e;
  const r = We(s), n = Ts(s.state), o = r ? "active" : "inactive", l = [];
  return i && l.push(`--state-${t}-${i}-${n}-color`), l.push(
    `--state-${t}-${n}-color`,
    `--state-${t}-${o}-color`,
    `--state-${o}-color`
  ), Os(l);
}
const rt = (s) => Math.round(s).toString(16).padStart(2, "0"), $i = ([s, e, t]) => {
  const i = Math.max(s, e, t), r = i - Math.min(s, e, t), n = r && (i === s ? (e - t) / r : i === e ? 2 + (t - s) / r : 4 + (s - e) / r);
  return [60 * (n < 0 ? n + 6 : n), i && r / i, i];
}, xi = ([s, e, t]) => {
  const i = (r) => {
    const n = (r + s / 60) % 6;
    return t - t * e * Math.max(Math.min(n, 4 - n, 1), 0);
  };
  return [i(5), i(3), i(1)];
};
function Ei(s) {
  const e = s.attributes.rgb_color;
  if (!Array.isArray(e) || e.length < 3) return;
  const t = $i(e);
  t[1] < 0.4 && (t[1] < 0.1 ? t[2] = 225 : t[1] = 0.4);
  const [i, r, n] = xi(t);
  return `#${rt(i)}${rt(r)}${rt(n)}`;
}
function N(s) {
  if (!s) return "var(--state-inactive-color)";
  if (j(s.entity_id) === "light" && We(s)) {
    const t = Ei(s);
    if (t) return t;
  }
  const e = wi(s);
  return e || (We(s) ? "var(--state-icon-color)" : "var(--state-inactive-color)");
}
function me(s) {
  return s !== void 0 && s.action !== "none";
}
const ki = ["closed", "locked", "off"], Ci = /* @__PURE__ */ new Set([
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
  const e = j(s);
  return { action: Ci.has(e) || ["button", "input_button", "scene"].includes(e) ? "toggle" : "none" };
}
const Si = {
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
function Ai(s, e) {
  const t = Si[s];
  return t ? (e ? t.on : t.off) ?? t.on : e ? "turn_on" : "turn_off";
}
function Ti(s, e) {
  const t = s.states[e];
  if (!t) return;
  const i = j(e), r = i === "group" ? "homeassistant" : i, n = ki.includes(t.state);
  s.callService(r, Ai(i, n), {
    entity_id: e
  });
}
function Xt(s, e, t) {
  s.dispatchEvent(
    new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 })
  );
}
function Oi(s, e) {
  e ? window.history.replaceState(null, "", s) : window.history.pushState(null, "", s), window.dispatchEvent(new CustomEvent("location-changed", { detail: {} }));
}
async function Pi(s, e) {
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
async function Ps(s, e, t, i) {
  let r;
  if (i === "double_tap" ? r = t.double_tap_action : i === "hold" ? r = t.hold_action : r = t.tap_action, r || (r = { action: "more-info" }), !!await Pi(s, r))
    switch (r.action) {
      case "none":
        break;
      case "more-info": {
        const n = r.entity || t.entity;
        n && Xt(s, "hass-more-info", { entityId: n });
        break;
      }
      case "toggle": {
        const n = r.entity || t.entity;
        n && Ti(e, n);
        break;
      }
      case "navigate":
        r.navigation_path && Oi(r.navigation_path, r.navigation_replace);
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
        Xt(s, "ll-custom", r);
        break;
      default:
        console.warn(
          `horos-cards: action "${r.action}" is not supported`
        );
    }
}
const Ii = 2;
function Zt(s, e) {
  const t = s ?? [];
  if (e !== "inline")
    return { inline: [], below: t, columns: 1 };
  const i = t.slice(1);
  return {
    inline: t.slice(0, 1),
    below: i,
    columns: Math.min(i.length, Ii)
  };
}
function Ri(s) {
  return Math.ceil(s.below.length / Math.max(s.columns, 1));
}
const St = 5e3, Jt = [
  "ha-tile-container",
  "ha-tile-icon",
  "ha-tile-info",
  "hui-card-features"
], Qt = [
  "ha-control-button",
  "ha-control-button-group",
  "ha-control-select"
];
let Re, je, Me;
function At(s, e) {
  return customElements.get(s) ? Promise.resolve(!0) : Promise.race([
    customElements.whenDefined(s).then(() => !0),
    new Promise((t) => setTimeout(() => t(!1), e))
  ]);
}
async function ji() {
  const s = window.loadCardHelpers;
  if (s)
    try {
      (await s()).createCardElement?.({ type: "tile", entity: "sun.sun" });
    } catch {
    }
}
function Tt() {
  return Re || (Re = (async () => Jt.every((e) => customElements.get(e)) ? !0 : (await ji(), (await Promise.all(
    Jt.map((e) => At(e, St))
  )).every(Boolean)))(), Re);
}
function Is() {
  return je || (je = (async () => {
    if (Qt.every((i) => customElements.get(i))) return !0;
    await Tt();
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
      Qt.map((i) => At(i, St))
    );
    return e?.remove(), t.every(Boolean);
  })(), je);
}
function Mi() {
  return Me || (Me = (async () => {
    if (customElements.get("hui-card-features-editor")) return !0;
    await Tt();
    const s = customElements.get("hui-tile-card");
    try {
      await s?.getConfigElement?.();
    } catch {
    }
    return At("hui-card-features-editor", St);
  })(), Me);
}
const Ae = {
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
}, Ni = {
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
}, He = {
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
}, Rs = { ru: Ni, en: He };
function $(s) {
  const t = (s?.language ?? s?.locale?.language ?? "en").split("-")[0].toLowerCase();
  return t in Rs ? t : "en";
}
function Fi(s, e) {
  if (s !== "ru") return e === 1 ? "one" : "many";
  const t = e % 10, i = e % 100;
  return t === 1 && i !== 11 ? "one" : t >= 2 && t <= 4 && (i < 12 || i > 14) ? "few" : "many";
}
function d(s, e, t = {}) {
  const i = $(s), r = Rs[i] ?? He, n = t.count, o = typeof n == "number" ? `${e}.${Fi(i, n)}` : void 0;
  return ((o && (r[o] ?? He[o])) ?? r[e] ?? He[e] ?? e).replace(
    /\{(\w+)\}/g,
    (a, c) => c in t ? String(t[c]) : a
  );
}
var Li = Object.defineProperty, Ot = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Li(e, t, r), r;
};
const Hi = "—";
class x extends le {
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
    const i = this.base.features ?? e;
    if (!i.length) return 0;
    const r = t ? "bottom" : this.base.features_position ?? "bottom";
    return Ri(Zt(i, r));
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
    super.connectedCallback(), Tt().then((e) => {
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
  _runAction(e, t) {
    if (!this.hass) return;
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
    Ps(this, this.hass, i, e);
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
    const i = this.base.state_content ?? t;
    return !i && !this.base.time_format ? F(this.hass, e) : {
      entityId: e.entityId,
      content: v`<state-display
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
    if (!t) return v`<span>${e}</span>`;
    const i = this.hass?.states[t]?.attributes.friendly_name ?? t;
    return v`<span
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
      customInline: g
    } = e;
    if (this._entityId = o, this._defaultIconAction = a, !this._ready)
      return this.renderWarning(d(this.hass, "internals.failed"));
    const f = this._tileColor(i), b = this.base.icon_tap_action ?? a, U = me(b) || me(this.base.icon_hold_action) || me(this.base.icon_double_tap_action), w = this.base.features ?? h, B = this.base.features_position ?? "bottom", se = this.base.levels === !1 ? void 0 : u, oe = Zt(
      w,
      g ? "bottom" : B
    ), Ft = typeof this.base.grid_options?.rows == "number";
    return this.toggleAttribute(
      "filled",
      Ft && !!(se || oe.below.length)
    ), v`
      <ha-card style="--tile-color: ${f};">
        <ha-tile-container
          .featurePosition=${g ? "inline" : B}
          .vertical=${!!this.base.vertical}
          .fixedInfoHeight=${this.layout === "grid" && Ft}
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
            .interactive=${U}
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
              ${n?.length && !this.base.hide_state ? v`<span slot="secondary"
                    >${n.map(
      (J, tt) => v`
                        ${tt ? v`<span>${mi}</span>` : m}${this.renderClickable(
        J.content ?? J.text,
        J.entityId
      )}
                      `
    )}</span
                  >` : m}
            </ha-tile-info>
            ${c?.length ? v`<div class="values of-${c.length}">
                  ${c.map(
      (J, tt) => v`
                      ${tt ? v`<span class="values-separator">/</span>` : m}
                      ${this.renderClickable(
        v`${J.icon ? v`<ha-icon
                              class="value-icon"
                              .icon=${J.icon}
                            ></ha-icon>` : m}${J.value}${J.unit ? v`<span class="unit"> ${J.unit}</span>` : m}`,
        J.entityId
      )}
                    `
    )}
                </div>` : m}
          </div>

          ${oe.inline.length ? v`<hui-card-features
                slot="features-inline"
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${oe.inline}
                .position=${B}
              ></hui-card-features>` : m}
          ${g ? v`<div slot="features-inline" class="custom-inline">
                ${g}
              </div>` : m}
          ${se ? v`<div slot="features" class="custom-features">
                ${se}
              </div>` : m}
          ${oe.below.length ? v`<hui-card-features
                slot="features"
                .columns=${oe.columns}
                .hass=${this.hass}
                .context=${{ entity_id: o }}
                .color=${this.base.color}
                .features=${oe.below}
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
    return this.base.color && (!t || We(t)) ? js(this.base.color) : e ?? "var(--state-inactive-color)";
  }
  /**
   * The values of the right-hand column. `icons` names a value by its role key:
   * without it two percentages in a row are indistinguishable.
   */
  bigValues(e, t = Ae) {
    return e.map((i) => i.role ? {
      ...this.formatted(i.role.stateObj) ?? { value: Hi },
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
    if (!(!this.hass || !e) && !Ge.has(e.state) && !As(e))
      return Ct(
        this.hass.formatEntityState(e),
        e.attributes.unit_of_measurement
      );
  }
}
Ot([
  Y({ attribute: !1 })
], x.prototype, "hass");
Ot([
  Y({ attribute: !1 })
], x.prototype, "layout");
Ot([
  y()
], x.prototype, "_ready");
function js(s) {
  return /^(#|rgb|hsl|var\()/.test(s) ? s : s === "state" ? "var(--state-icon-color)" : `var(--${s}-color, var(--state-icon-color))`;
}
const it = (s) => Math.max(0, Math.min(100, s)), K = ue`
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

  .level .name ha-icon {
    flex: none;
    color: var(--error-color, #db4437);
    --mdc-icon-size: 14px;
  }

  /* The row's own glyph is not an alarm and is not painted like one. */
  .level .name ha-icon.mark {
    color: var(--ink);
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
function G(s, e, t) {
  return v`
    <div
      class="levels"
      style=${t?.nameWidth ? `--level-name: ${t.nameWidth};` : m}
    >
      ${s.map(
    (i) => v`
          <button
            class="level ${i.alarm ? "low" : ""}"
            style="--ink: ${i.ink};"
            title="${i.name}: ${i.text}${i.flagTitle ? ` — ${i.flagTitle}` : ""}"
            @click=${(r) => {
      r.stopPropagation(), e(i.entityId);
    }}
          >
            <span class="name">
              ${i.alarm ? v`<ha-icon
                    icon=${i.alarmIcon ?? "mdi:alert-circle"}
                  ></ha-icon>` : i.icon ? v`<ha-icon class="mark" icon=${i.icon}></ha-icon>` : m}${i.name}${i.flag ? v`<ha-icon class="flag" icon=${i.flag}></ha-icon>` : m}
            </span>
            <span class="bar">
              <span class="track"></span>
              <span
                class="fill ${i.from === void 0 ? "" : "span"} ${i.charging ? "charging" : ""}"
                style="inset-inline-start: ${it(
      i.from ?? 0
    )}%; width: ${Math.max(
      0,
      it(i.level) - it(i.from ?? 0)
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
const Di = {
  humidity: { good: [30, 60], fair: [25, 70] },
  co2: [1e3, 1400],
  voc: [1e3, 3e3],
  aqi: [51, 101],
  pm25: [15, 35]
};
function Ui(s, e) {
  return s === "humidity" ? 100 : e[s][1] * 1.5;
}
function zi(s) {
  return { ...Di, ...s ?? {} };
}
function es(s, e, t) {
  if (e === void 0 || !Number.isFinite(e)) return "unknown";
  if (s === "humidity") {
    const { good: n, fair: o } = t.humidity;
    return e >= n[0] && e <= n[1] ? "good" : e >= o[0] && e <= o[1] ? "fair" : "poor";
  }
  const [i, r] = t[s];
  return e >= r ? "poor" : e >= i ? "fair" : "good";
}
function Wi(s) {
  return s.includes("poor") ? "poor" : s.includes("fair") ? "fair" : s.includes("good") ? "good" : "unknown";
}
const ts = {
  good: "var(--success-color, #4caf50)",
  fair: "var(--warning-color, #ffa600)",
  poor: "var(--error-color, #db4437)",
  unknown: "var(--state-unavailable-color)"
}, ss = 3;
function Z(s, e, t) {
  if (!s || s.length === 0)
    return typeof e == "string" ? [e] : [...e];
  if (s.length > ss)
    throw new Error(
      `At most ${ss} large values are allowed, got ${s.length}`
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
function X(s, e) {
  const t = e.map((r) => s.find((n) => n.key === r)).filter((r) => !!r), i = s.filter((r) => !e.includes(r.key));
  return { big: t, rest: i };
}
let rs = !1;
function Bi(s) {
  rs || (rs = !0, console.warn(
    `horos-cards: card ${s} is already registered. The bundle looks to be attached to the dashboard twice — the copy that loaded first is the one running. Check the dashboard resources.`
  ));
}
function is() {
  const s = document.querySelector("home-assistant");
  return $(s?.hass);
}
function E(s, e, t) {
  if (customElements.get(s)) {
    Bi(s);
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
function k(s, e) {
  customElements.get(s) || customElements.define(s, e);
}
const Pt = 20;
function Q(s, e) {
  return s.states[e]?.attributes.device_class;
}
function Ze(s, e) {
  return s.entities?.[e]?.hidden === !0;
}
function ie(s, e) {
  const t = s.entities?.[e]?.device_id;
  if (!t || !s.entities) return [e];
  const i = Object.keys(s.entities).filter(
    (r) => r !== e && s.entities?.[r]?.device_id === t && !Ze(s, r) && s.states[r] !== void 0
  );
  return [e, ...i.sort()];
}
function H(s, e, t, ...i) {
  return e.find(
    (r) => j(r) === t && i.includes(Q(s, r) ?? "")
  );
}
function Te(s, ...e) {
  return s.find((t) => e.includes(j(t)));
}
function Oe(s, e, t, i, r = Pt, n = () => !0) {
  const o = Object.keys(s.states).filter(
    (a) => a !== e && j(a) === t && i.includes(Q(s, a) ?? "") && !Ze(s, a) && n(a)
  ).sort();
  return [...n(e) ? [e] : [], ...o].slice(0, r);
}
function ns(s, e) {
  return s.entities?.[e]?.device_id !== void 0;
}
function ce(s, e) {
  const t = s.entities?.[e];
  if (t)
    return t.area_id ? t.area_id : t.device_id ? s.devices?.[t.device_id]?.area_id : void 0;
}
function It(s, e, t, i = Pt) {
  const r = ce(s, e);
  if (!r) return [];
  const n = Object.keys(s.states).filter(
    (l) => l !== e && j(l) === t && !Ze(s, l) && ce(s, l) === r
  ).sort();
  return [...j(e) === t ? [e] : [], ...n].slice(0, i);
}
function qi(s, e, t, i, r = Pt) {
  const n = (u) => i.indexOf(Q(s, u) ?? ""), o = Object.keys(s.states).filter(
    (u) => u !== e && j(u) === t && n(u) >= 0 && !Ze(s, u) && ce(s, u) !== void 0
  ).sort((u, g) => n(u) - n(g) || u.localeCompare(g)), l = /* @__PURE__ */ new Map(), a = ce(s, e);
  a && l.set(a, e);
  for (const u of o) {
    const g = ce(s, u);
    l.has(g) || l.set(g, u);
  }
  const h = [...l.values()].filter((u) => u !== e);
  return [e, ...h].slice(0, r);
}
function L(s, e, t = {}) {
  const i = { type: s, ...t };
  for (const [r, n] of Object.entries(e))
    n && (i[r] = n);
  return { config: i };
}
function Pe(s) {
  return Object.values(s).filter(Boolean).length;
}
var Vi = Object.defineProperty, Ki = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Vi(e, t, r), r;
};
const os = [
  "temperature",
  "humidity",
  "illuminance",
  "pm25"
], Ne = ["humidity", "co2", "voc", "aqi", "pm25"];
function lt(s, e) {
  return e?.air_rows ? [{ type: "trend-graph", hours_to_show: 24 }] : [];
}
class Ms extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [W, K];
  }
  contentRows() {
    const e = this._config, t = e?.air_rows ? Ne.filter((i) => e[i]).length : 0;
    return this.levelRows(t) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(lt(this.hass, this._config));
  }
  /** One row per configured air measure, coloured by its band. */
  _airRows(e) {
    const t = this._config;
    return Ne.filter((i) => t[i]).flatMap((i) => {
      const r = p(this.hass, t[i]);
      if (!r) return [];
      const n = q(r), o = es(i, n, e);
      return [
        {
          entityId: r.entityId,
          name: d(this.hass, `level.${i}`),
          text: kt(this.hass, r) ?? d(this.hass, "value.unknown"),
          ink: ts[o],
          level: n === void 0 ? 0 : Math.max(0, n) / Ui(i, e) * 100,
          alarm: o === "poor",
          alarmIcon: "mdi:alert-circle"
        }
      ];
    });
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Xo), document.createElement(
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
    })), i = this.missingRolesWarning([
      ...t.map((u) => u.role),
      ...["co2", "voc", "aqi"].map(
        (u) => p(this.hass, e[u])
      )
    ]);
    if (i) return this.renderWarning(i);
    const { big: r, rest: n } = X(t, this._bigKeys), o = t[0].role, l = zi(e.air_bounds), a = e.air_rows ? this._airRows(l) : [], c = e.air_rows ? n.filter((u) => !Ne.includes(u.key)) : n, h = Wi(
      Ne.filter((u) => e[u]).map(
        (u) => es(u, q(p(this.hass, e[u])), l)
      )
    );
    return this.renderTile({
      icon: e.air_rows ? "mdi:home-thermometer" : "mdi:thermometer",
      color: e.air_rows ? ts[h] : N(o?.stateObj),
      primary: Xe(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: he(o?.entityId),
      secondary: S([
        z(this.hass, o),
        ...c.map((u) => F(this.hass, u.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(r),
      ownFeatures: lt(this.hass, e),
      customFeatures: a.length ? G(a, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
Ki([
  y()
], Ms.prototype, "_config");
E("horos-climate-tile", Ms, {
  type: "horos-climate-tile",
  name: { ru: "Климат комнаты", en: "Room climate" },
  description: {
    ru: "Температура, влажность, освещённость и PM2.5 одной комнаты в одной плитке",
    en: "Temperature, humidity, illuminance and PM2.5 of one room in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    if (j(e) !== "sensor") return null;
    const t = ie(s, e), i = {
      temperature: H(s, t, "sensor", "temperature"),
      humidity: H(s, t, "sensor", "humidity"),
      illuminance: H(s, t, "sensor", "illuminance"),
      pm25: H(s, t, "sensor", "pm25")
    };
    return !i.temperature || Pe(i) < 2 ? null : L("custom:horos-climate-tile", i);
  }
});
var Gi = Object.defineProperty, Yi = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Gi(e, t, r), r;
};
const as = ["switch", "power", "energy"];
function ct(s) {
  return s?.toggle_button ? [{ type: "toggle" }] : [];
}
class Ns extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  fixedRows() {
    return this.featureRows(ct(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Zo), document.createElement("horos-plug-tile-editor");
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
    })), i = this.missingRolesWarning(t.map((a) => a.role));
    if (i) return this.renderWarning(i);
    const { big: r, rest: n } = X(t, this._bigKeys), o = t[0].role, l = o.entityId;
    return this.renderTile({
      icon: "mdi:power-plug",
      color: N(o.stateObj),
      primary: Xe(e.name, o),
      secondary: S([
        // One of the two returns a piece: an available switch gives its state,
        // an unavailable one its unavailability status.
        z(this.hass, o),
        // The switch is the card's main entity, so its state can be shown
        // through state_content, just like on the stock tile.
        ...n.map(
          (a) => a.key === "switch" ? this.mainStateSegment(a.role) : F(this.hass, a.role)
        )
      ]),
      mainEntityId: l,
      imageUrl: this.entityImage(o.stateObj),
      defaultIconAction: he(l),
      values: this.bigValues(r),
      ownFeatures: ct(e)
    });
  }
}
Yi([
  y()
], Ns.prototype, "_config");
E("horos-plug-tile", Ns, {
  type: "horos-plug-tile",
  name: { ru: "Розетка", en: "Smart plug" },
  description: {
    ru: "Выключатель, текущая мощность и накопленная энергия в одной плитке",
    en: "Switch, current power draw and accumulated energy in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ie(s, e), i = {
      switch: Te(t, "switch"),
      power: H(s, t, "sensor", "power"),
      energy: H(s, t, "sensor", "energy")
    };
    return !i.switch || Pe(i) < 2 ? null : L("custom:horos-plug-tile", i);
  }
});
const Be = 30, qe = 70;
function Fs(s, e, t) {
  return s === void 0 ? "unknown" : s < e ? "dry" : s > t ? "wet" : "ok";
}
const ut = {
  dry: "var(--warning-color)",
  ok: "var(--success-color)",
  wet: "var(--info-color)",
  unknown: "var(--state-inactive-color)"
}, Xi = {
  dry: "mdi:water-off",
  ok: "mdi:sprout",
  wet: "mdi:water-alert",
  unknown: "mdi:sprout"
};
var Zi = Object.defineProperty, Ji = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Zi(e, t, r), r;
};
const ls = ["moisture", "temperature", "battery"];
function ht(s, e) {
  const t = s?.states[e?.moisture ?? ""]?.state, i = Number(t);
  return t === void 0 || !Number.isFinite(i) ? [] : [{ type: "bar-gauge", min: 0, max: 100 }];
}
class Ls extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["moisture"];
  }
  fixedRows() {
    return this.featureRows(ht(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Jo), document.createElement(
      "horos-plant-tile-editor"
    );
  }
  static getStubConfig() {
    return { moisture: "" };
  }
  setConfig(e) {
    if (!e.moisture)
      throw new Error("A soil moisture entity is required (moisture)");
    const t = e.dry_below ?? Be, i = e.wet_above ?? qe;
    if (t >= i)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = Z(e.big_values, "moisture", ls), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = ls.map((c) => ({
      key: c,
      role: p(this.hass, e[c])
    })), i = this.missingRolesWarning(t.map((c) => c.role));
    if (i) return this.renderWarning(i);
    const { big: r, rest: n } = X(t, this._bigKeys), o = t[0].role, l = q(o), a = Fs(
      l,
      e.dry_below ?? Be,
      e.wet_above ?? qe
    );
    return this.renderTile({
      icon: Xi[a],
      color: ut[a],
      primary: Xe(e.name, o),
      imageUrl: this.entityImage(o?.stateObj),
      defaultIconAction: he(o?.entityId),
      secondary: S([
        z(this.hass, o),
        ...n.map((c) => F(this.hass, c.role))
      ]),
      mainEntityId: o?.entityId,
      values: this.bigValues(r),
      ownFeatures: ht(this.hass, e)
    });
  }
}
Ji([
  y()
], Ls.prototype, "_config");
E("horos-plant-tile", Ls, {
  type: "horos-plant-tile",
  name: { ru: "Растение", en: "Plant" },
  description: {
    ru: "Влажность почвы с порогами сухости, температура почвы и заряд датчика",
    en: "Soil moisture with dryness thresholds, soil temperature and sensor battery"
  },
  preview: !0,
  suggest: (s, e) => {
    if (j(e) !== "sensor" || Q(s, e) !== "moisture")
      return null;
    const t = ie(s, e);
    return L("custom:horos-plant-tile", {
      moisture: e,
      temperature: H(s, t, "sensor", "temperature"),
      battery: H(s, t, "sensor", "battery")
    });
  }
});
var Qi = Object.defineProperty, Je = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Qi(e, t, r), r;
};
class Ie extends le {
  constructor() {
    super(...arguments), this._children = [];
  }
  static {
    this.styles = ue`
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
    return this._error ? v`<ha-card><div class="warning">${this._error}</div></ha-card>` : this._children.length ? v`
      ${this._heading ? v`<div class="heading">${this._heading}</div>` : m}
      <div class="grid" style="--columns: ${this.columns()}">
        ${this._children}
      </div>
    ` : m;
  }
}
Je([
  Y({ attribute: !1 })
], Ie.prototype, "hass");
Je([
  y()
], Ie.prototype, "_heading");
Je([
  y()
], Ie.prototype, "_children");
Je([
  y()
], Ie.prototype, "_error");
function Hs(s) {
  if (!s) return;
  const e = s.split(":").pop();
  return e ? e.trim() : s;
}
function en(s) {
  return typeof s == "string" ? { entity: s } : s;
}
var tn = Object.defineProperty, sn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && tn(e, t, r), r;
};
const rn = 3;
class Ds extends Ie {
  static async getConfigElement() {
    return await Promise.resolve().then(() => Qo), document.createElement(
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
    return this._config?.columns ?? rn;
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
      const t = en(e), i = this.hass?.states[t.entity];
      return {
        type: "button",
        entity: t.entity,
        name: t.name ?? Hs(i?.attributes.friendly_name),
        icon: t.icon,
        show_state: !1,
        tap_action: { action: "toggle" }
      };
    }) : [];
  }
}
sn([
  y()
], Ds.prototype, "_config");
E("horos-buttons-tile", Ds, {
  type: "horos-buttons-tile",
  name: { ru: "Кнопки скриптов", en: "Script buttons" },
  description: {
    ru: "Сетка кнопок, вызывающих скрипты, под общим заголовком",
    en: "A grid of buttons running scripts, under one heading"
  },
  preview: !0
});
function re(s, e) {
  if (s) {
    if (e && s.toLowerCase().startsWith(e.toLowerCase())) {
      const t = s.slice(e.length).trim();
      if (t) return t;
    }
    return s;
  }
}
function Us(s) {
  return s ? s.replace(/[\s—-]*(battery(\s+level)?|заряд)\s*$/i, "").trim() || s : void 0;
}
function nn(s) {
  return s ? s.replace(
    /[\s—-]*(soil\s+)?(moisture|влажность(\s+почвы)?)\s*$/i,
    ""
  ).trim() || s : void 0;
}
function _e(s) {
  return s === void 0 ? "var(--state-unavailable-color)" : s >= 70 ? "var(--state-sensor-battery-high-color, #4caf50)" : s >= 30 ? "var(--state-sensor-battery-medium-color, #ffa600)" : "var(--state-sensor-battery-low-color, #db4437)";
}
const on = _e;
function an(s) {
  return s === void 0 ? "var(--state-unavailable-color)" : s >= 90 ? "var(--error-color, #db4437)" : s >= 80 ? "var(--warning-color, #ffa600)" : "var(--state-icon-color)";
}
function M(s) {
  return typeof s == "string" ? { entity: s } : s;
}
const ln = [
  [/black|pgbk|_bk(_|$)/i, "black"],
  [/cyan/i, "cyan"],
  [/magenta/i, "purple"],
  [/yellow/i, "yellow"],
  // MC is the maintenance tank, not ink. It gets its own shade, otherwise it is
  // indistinguishable from black: that one is painted in the text colour and
  [/_mc(_|$)|maintenance/i, "blue-grey"]
];
function cn(s) {
  return ln.find(([t]) => t.test(s))?.[1];
}
function un(s) {
  return s === "black" ? "var(--primary-text-color)" : /^(#|rgb|hsl|var\()/.test(s) ? s : `var(--${s}-color, var(--state-icon-color))`;
}
const hn = re, cs = (s, e) => typeof s == "number" && Number.isFinite(s) ? s : e;
function dn(s, e, t) {
  const i = Number(s);
  if (!Number.isFinite(i)) return;
  const r = cs(e.marker_high_level, 100), n = cs(e.marker_low_level, 0), o = String(e.marker_type ?? "").includes("waste"), l = r > 0 ? Math.max(0, Math.min(100, i / r * 100)) : 0, a = o ? i >= r : i <= (t ?? n);
  return { fill: l, alarm: a, fills: o };
}
var mn = Object.defineProperty, pn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && mn(e, t, r), r;
};
class zs extends x {
  static {
    this.styles = [W, K];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      (this._config?.cartridges.length ?? 0) + (this._config?.sensors?.length ?? 0)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ea), document.createElement(
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
    return this._config.cartridges.map((t) => M(t)).map((t) => {
      const i = this.hass.states[t.entity];
      return {
        entityId: t.entity,
        name: t.name ?? hn(i?.attributes.friendly_name, e),
        ink: un(
          t.color ?? cn(t.entity) ?? "grey"
        ),
        marker: i ? dn(
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
    ), n = this._config.status ? p(this.hass, this._config.status) : void 0, o = (this._config.sensors ?? []).map((a) => M(a)).map((a) => p(this.hass, a.entity)), l = n?.stateObj;
    return this.renderTile({
      icon: "mdi:printer",
      color: l ? N(l) : "var(--state-icon-color)",
      primary: this._printerName ?? d(this.hass, "printer.title"),
      secondary: S([
        F(this.hass, n),
        ...o.map((a) => F(this.hass, a))
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
      customFeatures: G(
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
pn([
  y()
], zs.prototype, "_config");
E("horos-printer-tile", zs, {
  type: "horos-printer-tile",
  name: { ru: "Принтер", en: "Printer" },
  description: {
    ru: "Уровни чернил и состояние принтера в одной плитке",
    en: "Ink levels and printer status in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ie(s, e), i = t.filter(
      (n) => s.states[n]?.attributes.marker_type !== void 0
    );
    if (!i.length) return null;
    const r = t.find(
      (n) => j(n) === "sensor" && !i.includes(n) && Number.isNaN(Number(s.states[n]?.state))
    );
    return L(
      "custom:horos-printer-tile",
      { status: r },
      { cartridges: i }
    );
  }
});
var fn = Object.defineProperty, gn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && fn(e, t, r), r;
};
const _n = 20;
class Ws extends x {
  static {
    this.styles = [W, K];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(this._config?.consumables?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ta), document.createElement(
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
    const e = this._config, t = p(this.hass, e.vacuum), i = p(this.hass, e.battery), r = (e.sensors ?? []).map((c) => M(c)).map((c) => p(this.hass, c.entity)), n = this.missingRolesWarning([t, i, ...r]);
    if (n) return this.renderWarning(n);
    const o = t?.stateObj?.attributes.friendly_name, l = e.low_below ?? _n, a = (e.consumables ?? []).map((c) => M(c)).map((c) => {
      const h = p(this.hass, c.entity), u = q(h) ?? 0, g = c.name ?? re(h?.stateObj?.attributes.friendly_name, o);
      return {
        entityId: c.entity,
        name: g ?? c.entity,
        text: `${u}%`,
        // Painting them in the tile colour is wrong: a docked vacuum's colour
        // is the inactive one and every bar comes out the same grey. We paint
        // by level — a consumable asks the same question a battery does.
        ink: c.color ?? _e(u),
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
        z(this.hass, t),
        this.mainStateSegment(t),
        ...r.map((c) => F(this.hass, c))
      ]),
      values: i ? this.bigValues([{ key: "battery", role: i }]) : [],
      customFeatures: a.length ? G(a, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
gn([
  y()
], Ws.prototype, "_config");
E("horos-vacuum-tile", Ws, {
  type: "horos-vacuum-tile",
  name: { ru: "Пылесос", en: "Vacuum" },
  description: {
    ru: "Состояние робота, заряд и ресурс расходников в одной плитке",
    en: "Robot status, battery and consumable life in a single tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ie(s, e), i = Te(t, "vacuum"), r = H(s, t, "sensor", "battery");
    return !i || !r ? null : L("custom:horos-vacuum-tile", { vacuum: i, battery: r });
  }
});
var vn = Object.defineProperty, yn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && vn(e, t, r), r;
};
const bn = 30;
class Bs extends x {
  static async getConfigElement() {
    return await Promise.resolve().then(() => sa), document.createElement(
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
    const e = this._config, t = e.low_below ?? bn, i = [], r = [];
    for (const l of e.batteries) {
      const a = M(l), c = p(this.hass, a.entity);
      if (c?.missing) {
        r.push(a.entity);
        continue;
      }
      const h = q(c);
      h !== void 0 && i.push({
        entityId: a.entity,
        name: a.name ?? Us(c?.stateObj?.attributes.friendly_name) ?? a.entity,
        level: h
      });
    }
    const n = i.filter((l) => l.level < t).sort((l, a) => l.level - a.level), o = n[0];
    return this.renderTile({
      icon: o ? "mdi:battery-alert-variant-outline" : "mdi:battery",
      color: on(o?.level),
      primary: e.name ?? d(this.hass, "batteries.title"),
      mainEntityId: o?.entityId,
      secondary: S([
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
yn([
  y()
], Bs.prototype, "_config");
E("horos-batteries-tile", Bs, {
  type: "horos-batteries-tile",
  name: { ru: "Батарейки", en: "Batteries" },
  description: {
    ru: "Только садящиеся батарейки, от самой пустой",
    en: "Only the batteries that are running down, emptiest first"
  },
  preview: !0,
  suggest: (s, e) => j(e) !== "sensor" || Q(s, e) !== "battery" ? null : L(
    "custom:horos-batteries-tile",
    {},
    { batteries: Oe(s, e, "sensor", ["battery"]) }
  )
});
var wn = Object.defineProperty, $n = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && wn(e, t, r), r;
};
class qs extends x {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ra), document.createElement(
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
      const c = M(a), h = p(this.hass, c.entity);
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
      secondary: S([
        ...l.length ? l : [{ text: d(this.hass, "safety.calm", { count: n }) }],
        ...r.length ? [{ text: d(this.hass, "list.missing", { count: r.length }) }] : []
      ])
    });
  }
}
$n([
  y()
], qs.prototype, "_config");
E("horos-safety-tile", qs, {
  type: "horos-safety-tile",
  name: { ru: "Безопасность", en: "Safety" },
  description: {
    ru: "Протечка, дым, газ — и датчики, потерявшие связь",
    en: "Leak, smoke, gas — and sensors that lost connection"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["moisture", "gas", "smoke", "carbon_monoxide", "safety"];
    return j(e) !== "binary_sensor" || !t.includes(Q(s, e) ?? "") ? null : L(
      "custom:horos-safety-tile",
      {},
      { sensors: Oe(s, e, "binary_sensor", t) }
    );
  }
});
var xn = Object.defineProperty, En = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && xn(e, t, r), r;
};
const us = ["disk", "download", "upload"];
class Vs extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["disk"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ia), document.createElement(
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
    })), i = p(this.hass, e.status), r = (e.services ?? []).map((a) => M(a)).map((a) => p(this.hass, a.entity)), n = this.missingRolesWarning([
      i,
      ...t.map((a) => a.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = X(t, this._bigKeys);
    return this.renderTile({
      icon: "mdi:server",
      color: i ? N(i.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "server.title"),
      mainEntityId: i?.entityId ?? t[0].role?.entityId,
      secondary: S([
        z(this.hass, i),
        this.mainStateSegment(i),
        ...l.map((a) => {
          const c = F(this.hass, a.role);
          if (!c) return;
          const h = a.key === "download" ? "↓ " : a.key === "upload" ? "↑ " : "";
          return { ...c, text: h + c.text };
        }),
        ...r.map((a) => F(this.hass, a))
      ]),
      values: this.bigValues(o)
    });
  }
}
En([
  y()
], Vs.prototype, "_config");
E("horos-server-tile", Vs, {
  type: "horos-server-tile",
  name: { ru: "Домашний сервер", en: "Home server" },
  description: {
    ru: "Диск, скорости и состояние сервисов в одной плитке",
    en: "Disk, speeds and service status in a single tile"
  },
  preview: !0
});
var kn = Object.defineProperty, Cn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && kn(e, t, r), r;
};
class Ks extends x {
  static {
    this.styles = [
      W,
      K,
      ue`
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
    return await Promise.resolve().then(() => na), document.createElement(
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
    const o = (e.devices ?? []).map((l) => M(l)).map((l) => {
      const a = p(this.hass, l.entity), c = q(a), h = l.name ?? Us(
        re(
          a?.stateObj?.attributes.friendly_name,
          e.name
        )
      ) ?? l.entity, u = fi(p(this.hass, l.charging));
      return {
        entityId: l.entity,
        name: h,
        text: c === void 0 ? d(this.hass, "value.unknown") : `${c}%`,
        ink: l.color ?? _e(c),
        level: c ?? 0,
        alarm: c !== void 0 && c < 20,
        alarmIcon: "mdi:battery-alert-variant-outline",
        charging: u
      };
    });
    return this.renderTile({
      icon: "mdi:account",
      color: N(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "person.title"),
      mainEntityId: t?.entityId,
      imageUrl: this.entityImage(t?.stateObj),
      secondary: S([
        z(this.hass, t),
        this.mainStateSegment(t),
        F(this.hass, r)
      ]),
      values: i ? this.bigValues([{ key: "battery", role: i }]) : [],
      customFeatures: o.length ? G(o, (l) => this.fireMoreInfo(l)) : void 0
    });
  }
}
Cn([
  y()
], Ks.prototype, "_config");
E("horos-person-tile", Ks, {
  type: "horos-person-tile",
  name: { ru: "Человек", en: "Person" },
  description: {
    ru: "Дома ли он, где именно и заряд его устройств",
    en: "Whether they are home, where exactly, and their devices' battery"
  },
  preview: !0,
  suggest: (s, e) => {
    if (j(e) !== "person") return null;
    const i = (s.states[e]?.attributes.device_trackers ?? []).map((r) => H(s, ie(s, r), "sensor", "battery")).find(Boolean);
    return i ? L("custom:horos-person-tile", {
      person: e,
      battery: i
    }) : null;
  }
});
function nt(s, e, t) {
  if (!s || !e?.length) return;
  let i, r;
  for (const n of e) {
    const o = p(s, n), l = q(o);
    l !== void 0 && (r === void 0 || (t === "max" ? l > r : l < r)) && (i = o, r = l);
  }
  return i ?? p(s, e[0]);
}
var Sn = Object.defineProperty, An = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Sn(e, t, r), r;
};
const Tn = [
  "temperature",
  "cpu",
  "memory",
  "gpu",
  "disk"
];
class Gs extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [W, K];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    const e = this._config?.disk_rows ? this._config.disks?.length ?? 0 : 1;
    return this.levelRows(3 + Math.max(e, 1)) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => oa), document.createElement(
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
      Tn
    ), this.base = e, this._config = e;
  }
  /** The card's roles: the lists are already reduced to their extreme sensor. */
  _roles() {
    const e = this._config;
    return [
      {
        key: "temperature",
        role: nt(this.hass, e.temperatures, "max")
      },
      { key: "cpu", role: p(this.hass, e.cpu) },
      { key: "memory", role: p(this.hass, e.memory) },
      { key: "gpu", role: p(this.hass, e.gpu) },
      { key: "disk", role: nt(this.hass, e.disks, "max") }
    ];
  }
  /** The partition with the least free space left. */
  _freeDisk() {
    return nt(this.hass, this._config?.disks_free, "min");
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
      const i = p(this.hass, t), r = i?.stateObj?.attributes ?? {}, n = re(r.friendly_name, e.name) ?? d(this.hass, "level.disk"), o = this._levelRow(n, i);
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
    const o = [t[1].role, t[3].role].map((a) => q(a)).filter((a) => a !== void 0);
    if (!o.length) return "var(--state-unavailable-color)";
    const l = Math.max(...o);
    return l >= (i.load_high ?? 75) ? "var(--error-color, #db4437)" : l >= (i.load_medium ?? 30) ? "var(--warning-color, #ffa600)" : "var(--success-color, #4caf50)";
  }
  _levelRow(e, t) {
    if (!t) return;
    const i = q(t);
    return {
      entityId: t.entityId,
      name: e,
      text: i === void 0 ? d(this.hass, "value.unknown") : `${Math.round(i)}%`,
      ink: an(i),
      level: i ?? 0,
      alarm: i !== void 0 && i >= 90,
      alarmIcon: "mdi:alert-circle"
    };
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = this._roles(), i = p(this.hass, e.status), r = (e.sensors ?? []).map((u) => M(u)).map((u) => p(this.hass, u.entity)), n = this.missingRolesWarning([
      i,
      ...t.map((u) => u.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((u) => M(u)).map((u) => ({ alert: u, role: p(this.hass, u.entity) })).filter(({ role: u }) => u?.stateObj?.state === "on").map(({ alert: u, role: g }) => ({
      text: u.name ?? re(
        g?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? u.entity,
      entityId: u.entity
    })), { big: l } = X(t, this._bigKeys), a = this._freeDisk(), c = q(a), h = [
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
        ink: _e(c),
        level: c ?? 0,
        alarm: c !== void 0 && c < 10,
        alarmIcon: "mdi:harddisk"
      } : void 0
    ].filter((u) => !!u);
    return this.renderTile({
      icon: "mdi:desktop-tower-monitor",
      color: e.color_by_load ? this._loadTint(i, t) : i ? N(i.stateObj) : "var(--state-icon-color)",
      primary: e.name ?? d(this.hass, "computer.title"),
      mainEntityId: i?.entityId ?? t[0].role?.entityId ?? a?.entityId,
      secondary: S([
        z(this.hass, i),
        ...o,
        ...r.map((u) => F(this.hass, u)),
        // Load and disks are already shown as bars with their own labels.
        ...this._bigKeys.includes("temperature") ? [] : [F(this.hass, t[0].role)]
      ]),
      values: this.bigValues(l),
      customFeatures: h.length ? G(h, (u) => this.fireMoreInfo(u)) : void 0
    });
  }
}
An([
  y()
], Gs.prototype, "_config");
E("horos-computer-tile", Gs, {
  type: "horos-computer-tile",
  name: { ru: "Компьютер", en: "Computer" },
  description: {
    ru: "Самая горячая точка, загрузка и диски в одной плитке",
    en: "Hottest spot, load and disks in a single tile"
  },
  preview: !0
});
var On = Object.defineProperty, Pn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && On(e, t, r), r;
};
const hs = ["pm25", "humidity", "temperature", "power"];
class Ys extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["pm25"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => aa), document.createElement("horos-air-tile-editor");
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
    const e = this._config, t = p(this.hass, e.appliance), i = hs.map((c) => ({
      key: c,
      role: p(this.hass, e[c])
    })), r = (e.sensors ?? []).map((c) => M(c)).map((c) => p(this.hass, c.entity)), n = this.missingRolesWarning([
      t,
      ...i.map((c) => c.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const o = (e.alerts ?? []).map((c) => M(c)).map((c) => ({ alert: c, role: p(this.hass, c.entity) })).filter(({ role: c }) => c?.stateObj?.state === "on").map(({ alert: c, role: h }) => ({
      text: c.name ?? re(
        h?.stateObj?.attributes.friendly_name,
        e.name
      ) ?? c.entity,
      entityId: c.entity
    })), { big: l, rest: a } = X(i, this._bigKeys);
    return this.renderTile({
      icon: e.humidity ? "mdi:air-humidifier" : "mdi:air-filter",
      color: N(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "air.title"),
      mainEntityId: t?.entityId,
      secondary: S([
        z(this.hass, t),
        ...o,
        this.mainStateSegment(t),
        ...r.map((c) => F(this.hass, c)),
        ...a.map((c) => F(this.hass, c.role))
      ]),
      values: this.bigValues(l)
    });
  }
}
Pn([
  y()
], Ys.prototype, "_config");
E("horos-air-tile", Ys, {
  type: "horos-air-tile",
  name: { ru: "Воздух", en: "Air" },
  description: {
    ru: "Очиститель, рекуператор, увлажнитель — прибор и что с воздухом",
    en: "Purifier, recuperator, humidifier — the appliance and the air"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ie(s, e), i = {
      appliance: Te(t, "fan", "humidifier"),
      pm25: H(s, t, "sensor", "pm25"),
      humidity: H(s, t, "sensor", "humidity"),
      temperature: H(s, t, "sensor", "temperature"),
      power: H(s, t, "sensor", "power")
    };
    return !i.appliance || Pe(i) < 2 ? null : L("custom:horos-air-tile", i);
  }
});
var In = Object.defineProperty, Rn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && In(e, t, r), r;
};
const ds = ["illuminance", "battery"], jn = 1, Mn = 2, Xs = 4;
function dt(s, e) {
  if (!e || e.controls === !1) return [];
  const t = Number(
    s?.states[e.cover]?.attributes.supported_features ?? 0
  ), i = [];
  return (t & Xs) !== 0 && i.push({ type: "cover-position" }), (t & (jn | Mn)) !== 0 && i.push({ type: "cover-open-close" }), i;
}
class Zs extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["illuminance"];
  }
  static {
    this.styles = [W, K];
  }
  /** One row for our own bar, plus whatever controls sit under it. */
  contentRows() {
    return this.levelRows(1) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(dt(this.hass, this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => la), document.createElement(
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
    const e = this._config, t = p(this.hass, e.cover), i = p(this.hass, e.position), r = ds.map((f) => ({
      key: f,
      role: p(this.hass, e[f])
    })), n = this.missingRolesWarning([
      t,
      i,
      ...r.map((f) => f.role)
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = X(r, this._bigKeys), c = (Number(
      t?.stateObj?.attributes.supported_features ?? 0
    ) & Xs) !== 0, h = dt(this.hass, e), u = q(i), g = i && !c ? [
      {
        entityId: i.entityId,
        name: d(this.hass, "level.open"),
        text: u === void 0 ? d(this.hass, "value.unknown") : `${Math.round(u)}%`,
        ink: _e(u),
        level: u ?? 0
      }
    ] : [];
    return this.renderTile({
      icon: "mdi:curtains",
      color: N(t?.stateObj),
      primary: e.name ?? t?.stateObj?.attributes.friendly_name ?? d(this.hass, "cover.title"),
      mainEntityId: t?.entityId,
      secondary: S([
        z(this.hass, t),
        this.mainStateSegment(t),
        ...l.map((f) => F(this.hass, f.role))
      ]),
      values: this.bigValues(o),
      ownFeatures: h,
      customFeatures: g.length ? G(g, (f) => this.fireMoreInfo(f)) : void 0
    });
  }
}
Rn([
  y()
], Zs.prototype, "_config");
E("horos-cover-tile", Zs, {
  type: "horos-cover-tile",
  name: { ru: "Шторы", en: "Curtains" },
  description: {
    ru: "Насколько открыты, светло ли снаружи и сколько заряда",
    en: "How far open, how bright outside, and battery"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ie(s, e), i = {
      cover: Te(t, "cover"),
      illuminance: H(s, t, "sensor", "illuminance"),
      battery: H(s, t, "sensor", "battery")
    };
    return !i.cover || Pe(i) < 2 ? null : L("custom:horos-cover-tile", i);
  }
});
const Nn = [
  "update",
  "select",
  "text",
  "button",
  "number",
  "event",
  "notify"
];
function Fn(s, e = {}) {
  if (!s) return [];
  const t = new Set(e.ignore ?? []), i = new Set(
    e.ignoreDomains ?? Nn
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
var Ln = Object.defineProperty, Hn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Ln(e, t, r), r;
};
const Dn = 4;
class Js extends x {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ca), document.createElement(
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
    const e = this._config, t = Fn(this.hass, {
      ignore: e.ignore,
      ignoreDomains: e.ignore_domains
    }), i = e.limit ?? Dn, r = t.slice(0, i), n = t.length - r.length;
    return this.renderTile({
      icon: t.length ? "mdi:lan-disconnect" : "mdi:lan-check",
      color: t.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "offline.title"),
      mainEntityId: t[0]?.entityId,
      secondary: S(
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
Hn([
  y()
], Js.prototype, "_config");
E("horos-offline-tile", Js, {
  type: "horos-offline-tile",
  name: { ru: "Не отвечает", en: "Not responding" },
  description: {
    ru: "Что перестало отвечать, посчитанное по устройствам",
    en: "Devices that went silent, grouped by device"
  },
  preview: !0
});
var Un = Object.defineProperty, zn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Un(e, t, r), r;
};
const Wn = 5;
class Qs extends x {
  static {
    this.styles = [W, K];
  }
  /** Level rows under the tile: roughly two per grid row. */
  contentRows() {
    return this.levelRows(
      Math.min(this._config?.consumers.length ?? 0, this._config?.limit ?? 5)
    ) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ua), document.createElement(
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
      const u = M(h), g = p(this.hass, u.entity);
      if (g?.missing) {
        i.push(u.entity);
        continue;
      }
      const f = u.name ?? re(g?.stateObj?.attributes.friendly_name, e.name) ?? u.entity;
      if (g?.unavailable) {
        r.push(f);
        continue;
      }
      const b = q(g);
      b === void 0 || b <= 0 || n.push({
        watts: b,
        row: {
          entityId: u.entity,
          name: f,
          text: this.hass.formatEntityState(g.stateObj),
          ink: u.color ?? "var(--amber-color, #ffc107)"
        }
      });
    }
    n.sort((h, u) => u.watts - h.watts);
    const o = n.slice(0, e.limit ?? Wn), l = o[0]?.watts ?? 0, a = o.map(({ row: h, watts: u }) => ({
      ...h,
      level: l > 0 ? u / l * 100 : 0
    })), c = [
      z(this.hass, t),
      n.length ? { text: d(this.hass, "energy.consuming", { count: n.length }) } : { text: d(this.hass, "energy.idle") },
      r.length ? { text: d(this.hass, "offline.count", { count: r.length }) } : void 0,
      i.length ? { text: d(this.hass, "list.missing", { count: i.length }) } : void 0
    ];
    return this.renderTile({
      icon: "mdi:flash",
      color: "var(--amber-color, #ffc107)",
      primary: e.name ?? d(this.hass, "energy.title"),
      mainEntityId: t?.entityId ?? o[0]?.row.entityId,
      secondary: S([this.mainStateSegment(t), ...c]),
      values: t ? this.bigValues([{ key: "total", role: t }]) : [],
      customFeatures: a.length ? G(a, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
zn([
  y()
], Qs.prototype, "_config");
E("horos-energy-tile", Qs, {
  type: "horos-energy-tile",
  name: { ru: "Энергия", en: "Energy" },
  description: {
    ru: "Кто в доме ест электричество, от самого прожорливого",
    en: "Who in the house draws power, hungriest first"
  },
  preview: !0,
  suggest: (s, e) => {
    if (j(e) !== "sensor" || Q(s, e) !== "power")
      return null;
    const t = Oe(
      s,
      e,
      "sensor",
      ["power"],
      12,
      (i) => ns(s, i)
    );
    return t.length ? L(
      "custom:horos-energy-tile",
      { total: ns(s, e) ? void 0 : e },
      { consumers: t, limit: 6 }
    ) : null;
  }
});
var Bn = Object.defineProperty, qn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Bn(e, t, r), r;
};
class er extends x {
  static async getConfigElement() {
    return await Promise.resolve().then(() => ha), document.createElement(
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
      const l = M(o), a = p(this.hass, l.entity);
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
      secondary: S([
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
qn([
  y()
], er.prototype, "_config");
E("horos-presence-tile", er, {
  type: "horos-presence-tile",
  name: { ru: "Присутствие", en: "Presence" },
  description: {
    ru: "В каких зонах сейчас есть кто-то",
    en: "Which areas have someone in them right now"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["occupancy", "presence", "motion"];
    return j(e) !== "binary_sensor" || !t.includes(Q(s, e) ?? "") ? null : L(
      "custom:horos-presence-tile",
      {},
      // One entity per area: otherwise the kitchen gets named three times.
      { areas: qi(s, e, "binary_sensor", t, 12) }
    );
  }
});
var Vn = Object.defineProperty, Kn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Vn(e, t, r), r;
};
const Gn = 255;
function mt(s) {
  return !s?.group || s.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class tr extends x {
  static {
    this.styles = [W, K];
  }
  contentRows() {
    return this.levelRows(this._config?.lights.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(mt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => da), document.createElement(
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
    return t === void 0 ? void 0 : Math.round(t / Gn * 100);
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.group), r = e.lights.map((f) => M(f)).map((f) => ({
      item: f,
      role: p(this.hass, f.entity)
    })), n = this.missingRolesWarning([
      t,
      ...r.map((f) => f.role)
    ]);
    if (n) return this.renderWarning(n);
    const o = r.filter((f) => f.role?.stateObj?.state === "on"), l = r.filter((f) => f.role?.unavailable), a = r.length - l.length, c = t ?? o[0]?.role ?? r[0].role, h = t?.stateObj?.attributes.friendly_name, u = r.map(({ item: f, role: b }) => {
      const U = this._brightness(b), w = b?.stateObj?.state === "on", B = Ye(this.hass, b);
      return {
        entityId: f.entity,
        name: f.name ?? re(b?.stateObj?.attributes.friendly_name, h) ?? f.entity,
        // A dimmable light says how bright, a plain one only that it is on.
        text: B ?? (w ? U === void 0 ? d(this.hass, "light.on") : `${U}%` : d(this.hass, "light.off")),
        ink: f.color ?? N(b?.stateObj),
        level: w ? U ?? 100 : 0
      };
    }), g = this._brightness(c);
    return this.renderTile({
      icon: "mdi:lightbulb-group",
      color: N(c?.stateObj),
      primary: e.name ?? h ?? d(this.hass, "light.title"),
      mainEntityId: c?.entityId,
      defaultIconAction: he(c?.entityId),
      secondary: S([
        z(this.hass, t),
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
      values: g === void 0 ? [] : [
        {
          value: String(g),
          unit: "%",
          entityId: c?.entityId,
          icon: Ae.brightness
        }
      ],
      ownFeatures: mt(e),
      customFeatures: G(
        u,
        (f) => this.fireMoreInfo(f)
      )
    });
  }
}
Kn([
  y()
], tr.prototype, "_config");
E("horos-light-tile", tr, {
  type: "horos-light-tile",
  name: { ru: "Свет", en: "Lights" },
  description: {
    ru: "Свет комнаты одной плиткой: что горит и насколько ярко",
    en: "A room's lights in one tile: what is on and how bright"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!ce(s, e)) return null;
    const t = It(s, e, "light");
    return t.length < 2 ? null : L("custom:horos-light-tile", {}, { lights: t });
  }
});
var Yn = Object.defineProperty, Xn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Yn(e, t, r), r;
};
const ms = ["playing", "paused", "buffering"];
function pt(s) {
  return !s || s.controls === !1 ? [] : [{ type: "media-player-playback" }];
}
class sr extends x {
  static {
    this.styles = [W, K];
  }
  contentRows() {
    return this.levelRows(this._config?.players.length ?? 0) + this.fixedRows();
  }
  fixedRows() {
    return this.featureRows(pt(this._config));
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ma), document.createElement(
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
    const e = this._config, t = e.players.map((a) => M(a)).map((a) => ({ item: a, role: p(this.hass, a.entity) })), i = this.missingRolesWarning(t.map((a) => a.role));
    if (i) return this.renderWarning(i);
    const r = t.filter(
      (a) => ms.includes(a.role?.stateObj?.state ?? "")
    ), n = r[0] ?? t[0], o = this._volume(n.role), l = t.map(({ item: a, role: c }) => {
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
        z(this.hass, n.role),
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
          icon: Ae.volume
        }
      ],
      ownFeatures: pt(e),
      customFeatures: t.length > 1 ? G(l, (a) => this.fireMoreInfo(a)) : void 0
    });
  }
}
Xn([
  y()
], sr.prototype, "_config");
E("horos-media-tile", sr, {
  type: "horos-media-tile",
  name: { ru: "Медиа", en: "Media" },
  description: {
    ru: "Что играет в доме, где и насколько громко",
    en: "What is playing in the house, where, and how loud"
  },
  preview: !0,
  suggest: (s, e) => {
    if (!ce(s, e)) return null;
    const t = It(s, e, "media_player");
    return t.length < 2 ? null : L("custom:horos-media-tile", {}, { players: t });
  }
});
var Zn = Object.defineProperty, Jn = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Zn(e, t, r), r;
};
const ps = ["temperature", "humidity", "power"];
function ft(s) {
  return !s || s.controls === !1 ? [] : [{ type: "target-temperature" }, { type: "climate-hvac-modes" }];
}
class rr extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => pa), document.createElement("horos-ac-tile-editor");
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
      ps
    ), this.base = { ...e, features_position: t }, this._config = e;
  }
  fixedRows() {
    return this.featureRows(ft(this._config));
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.climate), i = ps.map((a) => ({
      key: a,
      role: p(this.hass, e[a])
    })), r = (e.sensors ?? []).map((a) => M(a)).map((a) => p(this.hass, a.entity)), n = this.missingRolesWarning([
      t,
      ...i.map((a) => a.role),
      ...r
    ]);
    if (n) return this.renderWarning(n);
    const { big: o, rest: l } = X(i, this._bigKeys);
    return this.renderTile({
      icon: "mdi:air-conditioner",
      color: N(t?.stateObj),
      primary: Xe(e.name, t) ?? d(this.hass, "ac.title"),
      mainEntityId: t?.entityId,
      defaultIconAction: he(t?.entityId),
      secondary: S([
        z(this.hass, t),
        this.mainStateSegment(t),
        ...l.map((a) => F(this.hass, a.role)),
        ...r.map((a) => F(this.hass, a))
      ]),
      values: this.bigValues(o),
      ownFeatures: ft(e)
    });
  }
}
Jn([
  y()
], rr.prototype, "_config");
E("horos-ac-tile", rr, {
  type: "horos-ac-tile",
  name: { ru: "Кондиционер", en: "Air conditioner" },
  description: {
    ru: "Климатический прибор, воздух в комнате и цена работы",
    en: "A climate unit, the air in the room, and what running it costs"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ie(s, e), i = Te(t, "climate");
    if (!i) return null;
    const r = ce(s, i) ? It(s, i, "sensor") : [], n = {
      climate: i,
      temperature: H(s, r, "sensor", "temperature"),
      humidity: H(s, r, "sensor", "humidity"),
      power: H(s, t, "sensor", "power")
    };
    return Pe(n) < 2 ? null : L("custom:horos-ac-tile", n);
  }
});
function Qn(s, e = {}) {
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
var eo = Object.defineProperty, to = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && eo(e, t, r), r;
};
const so = 4;
class ir extends x {
  static async getConfigElement() {
    return await Promise.resolve().then(() => fa), document.createElement(
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
    const e = this._config, t = Qn(this.hass, { ignore: e.ignore }), i = e.include_skipped ? t : t.filter((l) => !l.skipped), r = e.limit ?? so, n = i.slice(0, r), o = i.length - n.length;
    return this.renderTile({
      icon: i.length ? "mdi:package-up" : "mdi:package-variant-closed-check",
      color: i.length ? "var(--info-color, #2196f3)" : "var(--success-color, #43a047)",
      primary: e.name ?? d(this.hass, "updates.title"),
      mainEntityId: i[0]?.entityId,
      secondary: S(
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
          icon: Ae.updates
        }
      ] : []
    });
  }
}
to([
  y()
], ir.prototype, "_config");
E("horos-updates-tile", ir, {
  type: "horos-updates-tile",
  name: { ru: "Обновления", en: "Updates" },
  description: {
    ru: "Что в доме просит обновления, одной плиткой вместо тридцати",
    en: "What in the house asks to be updated, one tile instead of thirty"
  },
  preview: !0,
  suggest: (s, e) => e.startsWith("update.") ? L("custom:horos-updates-tile", {}) : null
});
var ro = Object.defineProperty, io = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && ro(e, t, r), r;
};
class nr extends x {
  static {
    this.styles = [W, K];
  }
  contentRows() {
    return this.levelRows(this._config?.lists.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ga), document.createElement(
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
    const e = this._config, t = p(this.hass, e.calendar), i = e.lists.map((c) => M(c)).map((c) => {
      const h = p(this.hass, c.entity);
      return { item: c, role: h, count: q(h) ?? 0 };
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
      secondary: S([
        z(this.hass, t),
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
          icon: Ae.tasks
        }
      ] : [],
      customFeatures: l.length ? G(l, (c) => this.fireMoreInfo(c)) : void 0
    });
  }
}
io([
  y()
], nr.prototype, "_config");
E("horos-tasks-tile", nr, {
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
    return i.length < 2 ? null : L("custom:horos-tasks-tile", {}, { lists: i });
  }
});
const no = "on";
function oo(s) {
  const e = s.alert_when;
  return e === void 0 ? [no] : Array.isArray(e) ? e : [e];
}
function ao(s, e) {
  return e === void 0 || e === "unavailable" || e === "unknown" ? !1 : oo(s).includes(e);
}
var lo = Object.defineProperty, co = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && lo(e, t, r), r;
};
const uo = 4;
class or extends x {
  static async getConfigElement() {
    return await Promise.resolve().then(() => _a), document.createElement(
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
    for (const g of e.alerts) {
      const f = M(g), b = p(this.hass, f.entity);
      if (b?.missing) {
        n.push(f.entity);
        continue;
      }
      l += 1;
      const U = f.name ?? b?.stateObj?.attributes.friendly_name ?? f.entity;
      if (b?.unavailable) {
        t && r.push({
          text: d(this.hass, "alerts.offline", { name: U }),
          entityId: f.entity
        });
        continue;
      }
      ao(f, b?.stateObj?.state) && (i.push({ text: U, entityId: f.entity }), o = o ?? (f.color ? js(f.color) : void 0));
    }
    const a = [...i, ...r], c = e.limit ?? uo, h = a.slice(0, c), u = a.length - h.length;
    return this.renderTile({
      icon: i.length ? "mdi:alert" : r.length ? "mdi:bell-off-outline" : "mdi:bell-check-outline",
      color: o ?? (i.length ? "var(--error-color, #db4437)" : r.length ? "var(--warning-color, #ffa600)" : "var(--success-color, #43a047)"),
      primary: e.name ?? d(this.hass, "alerts.title"),
      mainEntityId: a[0]?.entityId,
      secondary: S([
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
co([
  y()
], or.prototype, "_config");
E("horos-alerts-tile", or, {
  type: "horos-alerts-tile",
  name: { ru: "Оповещения", en: "Alerts" },
  description: {
    ru: "Всё, о чём стоит сказать только когда оно случилось, одной плиткой",
    en: "Everything worth mentioning only once it happens, in one tile"
  },
  preview: !0,
  suggest: (s, e) => {
    const t = ["problem", "tamper"];
    return j(e) !== "binary_sensor" || !t.includes(Q(s, e) ?? "") ? null : L(
      "custom:horos-alerts-tile",
      {},
      { alerts: Oe(s, e, "binary_sensor", t) }
    );
  }
});
var ho = Object.defineProperty, ar = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && ho(e, t, r), r;
};
const Fe = [
  { key: "dim", icon: "mdi:brightness-4" },
  { key: "bright", icon: "mdi:brightness-7" },
  { key: "warm", icon: "mdi:weather-sunset" },
  { key: "cold", icon: "mdi:snowflake" }
];
function gt(s) {
  return !s?.state?.startsWith("light.") || s.brightness === !1 ? [] : [{ type: "light-brightness" }];
}
class Rt extends x {
  constructor() {
    super(...arguments), this._controlsReady = !1;
  }
  static {
    this.styles = [
      W,
      ue`
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
    super.connectedCallback(), Is().then((e) => {
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
    return e ? (Fe.some(({ key: i }) => e[i]) ? 1 : 0) + this.featureRows(gt(e), !!e.presets?.length) : 0;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => va), document.createElement(
      "horos-lamp-tile-editor"
    );
  }
  static getStubConfig() {
    return { bright: "", dim: "" };
  }
  setConfig(e) {
    if (!(Fe.some(({ key: i }) => e[i]) || e.presets?.length || e.power))
      throw new Error(
        "A lamp needs at least one script: bright, dim, warm, cold, power or presets"
      );
    this.base = e, this._config = e;
  }
  /** Runs a script the way a tap action would, confirmations and all. */
  _run(e) {
    this.hass && Ps(
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
    const t = Fe.filter(({ key: i }) => e[i]);
    return t.length ? v`
      <ha-control-select
        .options=${t.map(({ key: i, icon: r }) => ({
      value: e[i],
      ariaLabel: this._stepLabel(i),
      icon: v`<ha-icon .icon=${r}></ha-icon>`
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
    return v`
      <ha-control-select
        class="presets ${e.preset_labels !== !1 ? "labelled" : ""}"
        .options=${t.map((r) => {
      const n = this.hass?.states[r.entity], o = r.name ?? Hs(n?.attributes.friendly_name) ?? r.entity, l = r.icon ?? n?.attributes.icon;
      return {
        value: r.entity,
        label: o,
        ariaLabel: o,
        icon: l ? v`<ha-icon .icon=${l}></ha-icon>` : void 0
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
    const e = this._config, t = p(this.hass, e.state), i = (e.sensors ?? []).map((n) => M(n)).map((n) => p(this.hass, n.entity)), r = this.missingRolesWarning([t, ...i]);
    return r ? this.renderWarning(r) : this.renderTile({
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
        z(this.hass, t),
        this.mainStateSegment(t),
        ...i.map((n) => F(this.hass, n))
      ]),
      ownFeatures: gt(e),
      customFeatures: this._controlsReady && Fe.some(({ key: n }) => e[n]) ? v`<div class="lamp-controls">${this._renderSteps(e)}</div>` : void 0,
      customInline: this._controlsReady && e.presets?.length ? this._renderPresets(e) : void 0
    });
  }
}
ar([
  y()
], Rt.prototype, "_config");
ar([
  y()
], Rt.prototype, "_controlsReady");
E("horos-lamp-tile", Rt, {
  type: "horos-lamp-tile",
  name: { ru: "Лампа на скриптах", en: "Script lamp" },
  description: {
    ru: "ИК-лампа или лента: ярче, теплее и режимы — скриптами, но как у лампы",
    en: "An IR lamp or a strip: brighter, warmer and presets, driven by scripts"
  },
  preview: !0
});
function mo(s) {
  if (!s || Ge.has(s.state)) return "offline";
  if (s.state === "off") return "off";
  const e = s.attributes.hvac_action;
  return e === void 0 ? "unknown" : e === "heating" ? "heating" : "idle";
}
function po(s) {
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
var fo = Object.defineProperty, go = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && fo(e, t, r), r;
};
const fs = ["power", "energy"];
class lr extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["power"];
  }
  static {
    this.styles = [W, K];
  }
  contentRows() {
    return this.levelRows(this._config?.zones?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ya), document.createElement(
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
    this._bigKeys = Z(e.big_values, "power", fs), this.base = e, this._config = e;
  }
  /** What the row says on the right: where the room is and where it was sent. */
  _zoneText(e, t) {
    if (t === "offline") return Ye(this.hass, e);
    const i = e?.stateObj;
    if (!i) return;
    const r = Yt(this.hass, i, "current_temperature"), n = Yt(this.hass, i, "temperature");
    if (r && n) {
      const o = n.replace(/^[\d\s\u00a0.,+-]+/, "");
      return `${Ct(r, o).value} → ${n}`;
    }
    return r ?? n ?? this.hass?.formatEntityState(i);
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = p(this.hass, e.mode), i = p(this.hass, e.burner), r = p(this.hass, e.pump), n = p(this.hass, e.switch), o = fs.map((w) => ({
      key: w,
      role: p(this.hass, e[w])
    })), l = (e.zones ?? []).map((w) => M(w)).map((w) => {
      const B = p(this.hass, w.entity);
      return { item: w, role: B, zone: mo(B?.stateObj) };
    }), a = this.missingRolesWarning([
      t,
      i,
      r,
      n,
      ...o.map((w) => w.role),
      ...l.map((w) => w.role)
    ]);
    if (a) return this.renderWarning(a);
    const c = i?.stateObj?.state === "on", h = r?.stateObj?.state === "on", u = t ?? n ?? i ?? r, { calling: g, reporting: f, offline: b } = po(
      l.map((w) => w.zone)
    ), U = l.map(({ item: w, role: B, zone: se }) => ({
      entityId: w.entity,
      name: w.name ?? re(B?.stateObj?.attributes.friendly_name, e.name) ?? w.entity,
      text: this._zoneText(B, se) ?? "",
      ink: w.color ?? N(B?.stateObj),
      // The bar is the demand, not the temperature: a room either has the
      // boiler working for it or it does not.
      level: se === "heating" ? 100 : 0,
      alarm: se === "offline",
      alarmIcon: "mdi:lan-disconnect"
    }));
    return this.renderTile({
      icon: c ? "mdi:fire" : h ? "mdi:pump" : "mdi:water-boiler",
      color: N(c ? i.stateObj : h ? r.stateObj : u?.stateObj),
      primary: e.name ?? d(this.hass, "heating.title"),
      mainEntityId: u?.entityId,
      // The icon is the boiler's own switch where there is one; without it
      // there is nothing on this card that is safe to toggle.
      defaultIconAction: e.switch ? he(e.switch) : { action: "none" },
      secondary: S([
        z(this.hass, u),
        this.mainStateSegment(u === t ? t : u),
        // Who is asking is the card's whole point, so it is always said. That
        // nobody is asking is only worth a word when the boiler has no mode
        // sensor to say "standby" for itself.
        g ? {
          text: d(this.hass, "heating.calling", {
            count: g,
            total: f
          })
        } : f && !t ? { text: d(this.hass, "heating.quiet") } : void 0,
        b ? { text: d(this.hass, "offline.count", { count: b }) } : void 0,
        ...X(o, this._bigKeys).rest.map(
          (w) => F(this.hass, w.role)
        )
      ]),
      values: this.bigValues(X(o, this._bigKeys).big),
      customFeatures: U.length ? G(U, (w) => this.fireMoreInfo(w)) : void 0
    });
  }
}
go([
  y()
], lr.prototype, "_config");
E("horos-heating-tile", lr, {
  type: "horos-heating-tile",
  name: { ru: "Отопление", en: "Heating" },
  description: {
    ru: "Котёл и комнаты, которые просят у него тепла, одной плиткой",
    en: "The boiler and the rooms asking it for heat, in one tile"
  },
  preview: !0
});
function _o(s) {
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
function vo(s) {
  return s.thirsty ? "dry" : s.soaked ? "wet" : s.reporting ? "ok" : "unknown";
}
const yo = {
  dry: "mdi:watering-can",
  ok: "mdi:greenhouse",
  wet: "mdi:water-alert",
  unknown: "mdi:greenhouse"
};
var bo = Object.defineProperty, wo = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && bo(e, t, r), r;
};
const gs = [
  "temperature",
  "humidity",
  "illuminance"
];
class cr extends x {
  constructor() {
    super(...arguments), this._bigKeys = ["temperature"];
  }
  static {
    this.styles = [W, K];
  }
  contentRows() {
    return this.levelRows(this._config?.plants?.length ?? 0) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => ba), document.createElement(
      "horos-greenhouse-tile-editor"
    );
  }
  static getStubConfig() {
    return { plants: [] };
  }
  setConfig(e) {
    if (!e.plants?.length)
      throw new Error("At least one plant is required (plants)");
    const t = e.dry_below ?? Be, i = e.wet_above ?? qe;
    if (t >= i)
      throw new Error("dry_below must be smaller than wet_above");
    this._bigKeys = Z(
      e.big_values,
      "temperature",
      gs
    ), this.base = e, this._config = e;
  }
  render() {
    if (!this._config || !this.hass) return m;
    const e = this._config, t = gs.map((h) => ({
      key: h,
      role: p(this.hass, e[h])
    })), i = [], r = [], n = [];
    for (const h of e.plants) {
      const u = M(h), g = p(this.hass, u.entity);
      if (g?.missing) {
        n.push(u.entity);
        continue;
      }
      const f = q(g), b = Fs(
        f,
        u.dry_below ?? e.dry_below ?? Be,
        u.wet_above ?? e.wet_above ?? qe
      ), U = !!g?.unavailable;
      r.push({ status: b, offline: U }), i.push({
        entityId: u.entity,
        name: u.name ?? nn(g?.stateObj?.attributes.friendly_name) ?? u.entity,
        text: Ye(this.hass, g) ?? kt(this.hass, g) ?? d(this.hass, "value.unknown"),
        ink: u.color ?? ut[b],
        // A silent sensor gets an empty bar, not a full one: an empty bar reads
        // as "nothing is known here", a full one as "soaked".
        level: f ?? 0,
        // Dry is the one that needs a hand today. Soaked shows in the colour.
        alarm: U || b === "dry",
        alarmIcon: U ? "mdi:lan-disconnect" : "mdi:water-off"
      });
    }
    const o = _o(r), l = vo(o), { big: a, rest: c } = X(t, this._bigKeys);
    return this.renderTile({
      icon: yo[l],
      color: ut[l],
      primary: e.name ?? d(this.hass, "greenhouse.title"),
      // The card is about the set, so it has no main entity to act on: the
      // driest plant is the one thing worth opening from here.
      mainEntityId: i.find((h) => h.alarm)?.entityId,
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
        ...c.map((h) => F(this.hass, h.role))
      ]),
      values: this.bigValues(a),
      customFeatures: i.length ? G(i, (h) => this.fireMoreInfo(h)) : void 0
    });
  }
}
wo([
  y()
], cr.prototype, "_config");
E("horos-greenhouse-tile", cr, {
  type: "horos-greenhouse-tile",
  name: { ru: "Оранжерея", en: "Greenhouse" },
  description: {
    ru: "Все растения полосками влажности почвы и воздух, которым они дышат",
    en: "Every plant as a bar of soil moisture, and the air they share"
  },
  preview: !0,
  suggest: (s, e) => {
    if (j(e) !== "sensor" || Q(s, e) !== "moisture")
      return null;
    const t = Oe(s, e, "sensor", ["moisture"]);
    return t.length < 2 ? null : L("custom:horos-greenhouse-tile", {}, { plants: t });
  }
});
const $o = {
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
}, xo = "mdi:weather-partly-cloudy";
function _s(s) {
  return s && $o[s] || xo;
}
function Eo(s) {
  return s ? Os([
    `--state-weather-${Ts(s)}-color`,
    "--state-weather-active-color",
    "--state-active-color"
  ]) ?? "var(--state-icon-color)" : "var(--state-inactive-color)";
}
const ko = {
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
}, Co = [
  "temperature",
  "apparent_temperature",
  "dew_point",
  "humidity",
  "pressure",
  "wind_speed",
  "cloud_coverage",
  "uv_index",
  "visibility"
], So = {
  temperature: "temperature_unit",
  templow: "temperature_unit",
  apparent_temperature: "temperature_unit",
  dew_point: "temperature_unit",
  pressure: "pressure_unit",
  wind_speed: "wind_speed_unit",
  wind_gust_speed: "wind_speed_unit",
  visibility: "visibility_unit",
  precipitation: "precipitation_unit"
}, ur = /* @__PURE__ */ new Set([
  "humidity",
  "cloud_coverage",
  "precipitation_probability"
]);
function Ao(s, e) {
  if (ur.has(e)) return "%";
  const t = So[e];
  if (!t) return;
  const i = s?.attributes[t];
  return typeof i == "string" ? i : void 0;
}
const To = 1;
function vs(s) {
  return ((Number(s?.attributes.supported_features) || 0) & To) !== 0;
}
const _t = [
  "temperature",
  "precipitation",
  "precipitation_probability",
  "humidity",
  "wind_speed"
], vt = (s) => typeof s == "number" && Number.isFinite(s) ? s : void 0;
function Oo(s, e) {
  if (e === "temperature") return Po(s);
  const t = s.map((n) => vt(n[e])), i = t.filter((n) => n !== void 0), r = ur.has(e) ? 100 : i.length ? Math.max(...i) : 0;
  return t.map((n) => n === void 0 ? { level: 0 } : r <= 0 ? { level: 0, high: n } : { level: Math.min(100, n / r * 100), high: n });
}
function Po(s) {
  const e = s.map((l) => vt(l.temperature)), t = s.map((l, a) => vt(l.templow) ?? e[a]), i = [...e, ...t].filter(
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
var Io = Object.defineProperty, hr = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Io(e, t, r), r;
};
const Ro = 7, ys = 14, jo = ["humidity", "wind_speed"], bs = ["temperature", "humidity"], Mo = "3.75em";
class jt extends x {
  constructor() {
    super(...arguments), this._bigKeys = bs;
  }
  static {
    this.styles = [W, K];
  }
  contentRows() {
    return this.levelRows(this._days().length || this._wanted()) + this.fixedRows();
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => $a), document.createElement(
      "horos-weather-tile-editor"
    );
  }
  static getStubConfig() {
    return { weather: "" };
  }
  setConfig(e) {
    if (!e.weather)
      throw new Error("A weather entity is required (weather)");
    if (e.days !== void 0 && (!Number.isInteger(e.days) || e.days < 1 || e.days > ys))
      throw new Error(`days must be a whole number between 1 and ${ys}`);
    if (e.bar && !_t.includes(e.bar))
      throw new Error(
        `Unknown bar: ${e.bar}. Allowed: ${_t.join(", ")}`
      );
    this._bigKeys = Z(
      e.big_values,
      bs,
      Co
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
    if (!this.isConnected || !this.hass?.connection || !e || !t || !vs(t))
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
    return this._config?.days ?? Ro;
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
  _attribute(e, t, i) {
    const r = i ?? e.attributes[t];
    if (r == null) return;
    const n = Ao(e, t), o = this.hass?.formatEntityAttributeValue?.(e, t, i) ?? `${r}${n ? ` ${n}` : ""}`;
    return Ct(o, n);
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
    const i = t.stateObj, r = e.bar ?? "temperature", n = this._days(), o = Oo(n, r), l = n.map((h, u) => ({
      entityId: e.weather,
      name: this._weekday(h.datetime),
      text: this._rowText(i, r, o[u]),
      ink: Eo(h.condition),
      icon: _s(h.condition),
      from: o[u].from,
      level: o[u].level
    })), a = [
      "state",
      ...jo.filter(
        (h) => !this._bigKeys.includes(h) && i.attributes[h] !== void 0 && i.attributes[h] !== null
      )
    ], c = [];
    for (const h of this._bigKeys) {
      const u = this._attribute(i, h);
      u && c.push({
        ...u,
        entityId: e.weather,
        icon: ko[h]
      });
    }
    return this.renderTile({
      icon: _s(i.state),
      color: N(i),
      primary: e.name ?? i.attributes.friendly_name ?? e.weather,
      mainEntityId: e.weather,
      secondary: S([
        z(this.hass, t),
        this.mainStateSegment(t, a),
        // A forecast the integration does not offer is worth saying out loud:
        // the card is otherwise a tile with an empty half.
        vs(i) ? void 0 : { text: d(this.hass, "weather.noForecast") }
      ]),
      values: c,
      customFeatures: l.length ? G(l, (h) => this.fireMoreInfo(h), {
        nameWidth: Mo
      }) : void 0
    });
  }
}
hr([
  y()
], jt.prototype, "_config");
hr([
  y()
], jt.prototype, "_forecast");
E("horos-weather-tile", jt, {
  type: "horos-weather-tile",
  name: { ru: "Погода", en: "Weather" },
  description: {
    ru: "Погода на сегодня в строке и неделя полосками температуры",
    en: "Today on the line and the week as bars of temperature"
  },
  preview: !0,
  suggest: (s, e) => j(e) !== "weather" ? null : L("custom:horos-weather-tile", { weather: e })
});
function dr(s, e) {
  for (const t of e) {
    const i = s.states[t]?.state;
    if (i === void 0 || i.trim() === "") continue;
    const r = Number(i);
    if (Number.isFinite(r)) return { entityId: t, level: r };
  }
  return {};
}
function mr(s, e) {
  let t;
  for (const i of e) {
    const r = s.states[i], n = r?.last_reported ?? r?.last_updated ?? r?.last_changed;
    if (!n) continue;
    const o = Date.parse(n);
    Number.isFinite(o) && (t === void 0 || o > t) && (t = o);
  }
  return t === void 0 ? void 0 : new Date(t);
}
function No(s, e, t, i, r) {
  if (dr(s, e).level === void 0) return !1;
  if (t === void 0) return !0;
  const n = r ?? mr(s, e);
  return !!n && (i.getTime() - n.getTime()) / 1e3 < t;
}
function Fo(s, e) {
  const t = s ? Date.parse(s) : NaN;
  return Number.isFinite(t) ? Math.max(0, Math.ceil((t - e.getTime()) / 6e4)) : 0;
}
const ws = (s) => String(s).padStart(2, "0");
function Lo(s) {
  if (s.forced)
    return { key: "charge.forced", params: { minutes: s.minutesLeft } };
  if (!s.fresh) {
    if (s.on && s.pulse) return { key: "charge.pulse", params: {} };
    const e = s.since;
    return {
      key: "charge.noData",
      params: {
        time: e ? `${ws(e.getHours())}:${ws(e.getMinutes())}` : "—"
      }
    };
  }
  if (s.on !== void 0)
    return s.on ? s.max === void 0 ? { key: "charge.on", params: {} } : { key: "charge.charging", params: { max: s.max } } : s.min === void 0 ? { key: "charge.off", params: {} } : { key: "charge.waiting", params: { min: s.min } };
}
function Ho(s, e, t, i, r, n) {
  const o = i > 0 ? i : 1;
  let l = Math.round(e / o) * o;
  return t !== void 0 && (l = s === "min" ? Math.min(l, t - o) : Math.max(l, t + o)), l = Math.min(n, Math.max(r, l)), Number(l.toFixed(6));
}
function Do(s) {
  return `{% set _ = now() %}{{ expand(${JSON.stringify(s)}) | map(attribute='last_reported') | map('as_timestamp') | max | default('') }}`;
}
function Uo(s, e, t, i) {
  if (s === void 0) return t;
  const r = s + (e > 0 ? e : 1);
  return r > i ? t : Number(r.toFixed(6));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zo = { ATTRIBUTE: 1 }, Wo = (s) => (...e) => ({ _$litDirective$: s, values: e });
let Bo = class {
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
const pr = "important", qo = " !" + pr, $e = Wo(class extends Bo {
  constructor(s) {
    if (super(s), s.type !== zo.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof r == "string" && r.endsWith(qo);
        i.includes("-") || n ? t.setProperty(i, n ? r.slice(0, -11) : r, n ? pr : "") : t[i] = r;
      }
    }
    return ge;
  }
});
var Vo = Object.defineProperty, ne = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Vo(e, t, r), r;
};
class ee extends le {
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
    this.styles = ue`
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
    return Ho(e, t, this._other(e), this.step, this.lo, this.hi);
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
    return v`
      <div
        class="handle ${e}"
        role="slider"
        tabindex="0"
        aria-label=${e}
        aria-valuemin=${this.lo}
        aria-valuemax=${this.hi}
        aria-valuenow=${i}
        style=${$e({ left: r })}
        @keydown=${(n) => this._onKey(e, n)}
        @pointerdown=${(n) => this._onDown(e, n)}
        @pointermove=${(n) => this._onMove(e, n)}
        @pointerup=${(n) => this._onUp(e, n)}
        @pointercancel=${() => this._drag = void 0}
        @click=${(n) => n.stopPropagation()}
      ></div>
      <span class="label ${e} ${t ? "outside" : ""}" style=${$e({ left: r })}
        >${i}</span
      >
    `;
  }
  render() {
    const e = this.level, t = this._value("min"), i = this._value("max"), r = this._labelsOutside();
    return v`
      <div class="track" style=${$e({ "--ink": _e(e) })}>
        <div
          class="fill ${this.charging ? "charging" : ""}"
          style=${$e({ width: `${Math.min(100, Math.max(0, e ?? 0))}%` })}
        ></div>
        ${t !== void 0 && i !== void 0 ? v`<div
              class="band"
              style=${$e({ left: `${t}%`, width: `${i - t}%` })}
            ></div>` : m}
        ${this._handle("min", r)} ${this._handle("max", r)}
      </div>
    `;
  }
}
ne([
  Y({ type: Number })
], ee.prototype, "level");
ne([
  Y({ type: Number })
], ee.prototype, "min");
ne([
  Y({ type: Number })
], ee.prototype, "max");
ne([
  Y({ type: Number })
], ee.prototype, "step");
ne([
  Y({ type: Number })
], ee.prototype, "lo");
ne([
  Y({ type: Number })
], ee.prototype, "hi");
ne([
  Y({ type: Boolean })
], ee.prototype, "charging");
ne([
  y()
], ee.prototype, "trackWidth");
ne([
  y()
], ee.prototype, "_drag");
customElements.get("horos-charge-range") || customElements.define("horos-charge-range", ee);
var Ko = Object.defineProperty, Mt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Ko(e, t, r), r;
};
const De = (s) => (Array.isArray(s.battery) ? s.battery : [s.battery]).filter(
  (e) => typeof e == "string" && e !== ""
);
class Qe extends x {
  constructor() {
    super(...arguments), this._controlsReady = !1, this._held = !1;
  }
  static {
    this.styles = [
      W,
      ue`
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
      { type: "render_template", template: Do(De(e)) }
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
    super.connectedCallback(), Is().then((e) => {
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
    return await Promise.resolve().then(() => xa), document.createElement("horos-charge-tile-editor");
  }
  static getStubConfig() {
    return { battery: [], switch: "", min: "", max: "" };
  }
  setConfig(e) {
    if (!De(e).length) throw new Error("A battery sensor is required (battery)");
    const { features: t, levels: i, ...r } = e;
    this.base = r, this._unsubscribeReported(), this._config = e;
  }
  _number(e, t) {
    const i = e ? this.hass?.states[e] : void 0;
    if (!i) return;
    const r = t ? i.attributes[t] : i.state;
    if (r == null || Ge.has(String(r)))
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
    const i = Uo(
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
    const e = this._config, t = this.hass, i = De(e), r = /* @__PURE__ */ new Date(), n = p(t, e.switch), o = this.missingRolesWarning([
      n,
      p(t, e.min),
      p(t, e.max),
      p(t, e.force),
      p(t, e.pulse_every),
      // A battery list is fine with one of its sensors gone, not with all.
      i.every((oe) => !t.states[oe]) ? p(t, i[0]) : void 0
    ]);
    if (o) return this.renderWarning(o);
    const { entityId: l, level: a } = dr(t, i), c = l ?? i[0], h = n ? n.stateObj?.state === "on" : void 0, u = e.force ? t.states[e.force] : void 0, g = u?.state === "active", f = Fo(u?.attributes.finishes_at, r), b = this._number(e.min), U = this._number(e.max), w = Lo({
      forced: g,
      minutesLeft: f,
      fresh: No(t, i, e.stale_after, r, this._reported),
      on: h,
      pulse: !!e.pulse_every,
      min: b,
      max: U,
      since: this._reported ?? mr(t, i)
    }), B = t.states[c], se = this.renderTile({
      icon: "mdi:watch",
      // Lit while the port is on; the battery itself is always "active". With
      // no port there is nothing to be on, and the icon takes the battery colour.
      color: n ? h ? N(n.stateObj) : "var(--state-inactive-color)" : _e(a),
      primary: e.name ?? B?.attributes.friendly_name ?? d(t, "charge.title"),
      secondary: S([
        z(t, n) ?? (w ? {
          text: d(t, w.key, w.params),
          entityId: g ? e.force : e.switch ?? c
        } : void 0)
      ]),
      mainEntityId: c,
      // With a port the icon switches it by hand — the card works without the
      // automation too. The action names the port itself: the card's main
      // entity is the battery, and a toggle aimed at a sensor does nothing.
      defaultIconAction: e.switch ? { action: "toggle", entity: e.switch } : he(c),
      values: a === void 0 ? [] : [{ value: String(Math.round(a)), unit: "%", entityId: c }],
      customFeatures: v`<div class="charge-line">
        <horos-charge-range
          .level=${a}
          .min=${b}
          .max=${U}
          .step=${this._number(e.min, "step") ?? 1}
          .lo=${this._number(e.min, "min") ?? 0}
          .hi=${this._number(e.max, "max") ?? 100}
          .charging=${h ?? !1}
          @limit-change=${this._setLimit}
        ></horos-charge-range>
        ${e.pulse_every && this._controlsReady ? v`<ha-control-button
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
        ${e.force && this._controlsReady ? v`<ha-control-button
              class=${g ? "active" : ""}
              .label=${d(t, "charge.force")}
              @click=${this._toggleForce}
            >
              <span class="force">
                <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                ${g ? d(t, "charge.forceLeft", { minutes: f }) : d(t, "charge.force")}
              </span>
            </ha-control-button>` : m}
      </div>`
    });
    return this.toggleAttribute("filled", !0), se;
  }
}
Mt([
  y()
], Qe.prototype, "_config");
Mt([
  y()
], Qe.prototype, "_controlsReady");
Mt([
  y()
], Qe.prototype, "_reported");
E("horos-charge-tile", Qe, {
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
var Go = Object.defineProperty, Nt = (s, e, t, i) => {
  for (var r = void 0, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = o(e, t, r) || r);
  return r && Go(e, t, r), r;
};
class et extends le {
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
    this.styles = ue`
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
    return !this.hass || !this._config ? m : v`
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
Nt([
  Y({ attribute: !1 })
], et.prototype, "hass");
Nt([
  y()
], et.prototype, "_config");
class C extends et {
  constructor() {
    super(...arguments), this._featuresEditorReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Mi().then((e) => {
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
    const t = this._config?.features ?? this.defaultFeatures(), i = this.pick({ ru: O, en: P }), r = this.pick({
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
        <h3 slot="header">${i.features}</h3>
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
              ` : m}
        </div>
      </ha-expansion-panel>
    `;
  }
  render() {
    return !this.hass || !this._config ? m : v`
      ${this.renderForm()}
      ${this._featuresEditorReady ? this._renderFeatures() : m}
    `;
  }
}
Nt([
  y()
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
}), ot = (s) => s ? { entity_id: s, area_id: "area" } : void 0, T = (s, e) => ({
  name: "interactions",
  type: "expandable",
  flatten: !0,
  icon: "mdi:gesture-tap",
  schema: [
    {
      name: "tap_action",
      selector: { ui_action: { default_action: "more-info" } },
      context: ot(s)
    },
    { name: "", type: "divider" },
    {
      name: "icon_tap_action",
      selector: { ui_action: { default_action: e } },
      context: ot(s)
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
        context: ot(s)
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
}, _ = (s, e) => ({
  entity: {
    filter: e ? { domain: s, device_class: e } : { domain: s }
  }
}), V = (s, e, t) => ({
  number: { min: s, max: e, mode: "box", unit_of_measurement: t }
}), Yo = { text: {} }, te = (s) => ({
  select: { multiple: !0, mode: "list", options: s }
}), D = { boolean: {} };
class fr extends C {
  get entityField() {
    return "temperature";
  }
  get schema() {
    const e = $(this.hass);
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
      { name: "air_rows", selector: D },
      A("temperature", e, [
        {
          name: "big_values",
          selector: te([
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
    return lt(this.hass, e);
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
k("horos-climate-tile-editor", fr);
const Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosClimateTileEditor: fr
}, Symbol.toStringTag, { value: "Module" }));
class gr extends C {
  get entityField() {
    return "switch";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "switch", required: !0, selector: _("switch") },
      { name: "power", selector: _("sensor", "power") },
      { name: "energy", selector: _("sensor", "energy") },
      A("switch", e, [
        {
          name: "big_values",
          selector: te([
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
    return ct(e);
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
k("horos-plug-tile-editor", gr);
const Zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlugTileEditor: gr
}, Symbol.toStringTag, { value: "Module" }));
class _r extends C {
  get entityField() {
    return "moisture";
  }
  get schema() {
    const e = $(this.hass);
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
      { name: "dry_below", selector: V(0, 100, "%") },
      { name: "wet_above", selector: V(0, 100, "%") },
      A("moisture", e, [
        {
          name: "big_values",
          selector: te([
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
    return ht(this.hass, e);
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
k("horos-plant-tile-editor", _r);
const Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPlantTileEditor: _r
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
class vr extends et {
  get schema() {
    return [
      { name: "name", selector: Yo },
      { name: "icon", selector: { icon: {} } },
      { name: "columns", selector: V(1, 6) },
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
k("horos-buttons-tile-editor", vr);
const Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosButtonsTileEditor: vr
}, Symbol.toStringTag, { value: "Module" }));
class yr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = $(this.hass);
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
      A("status", e, [
        { name: "levels", selector: D }
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
k("horos-printer-tile-editor", yr);
const ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPrinterTileEditor: yr
}, Symbol.toStringTag, { value: "Module" }));
class br extends C {
  get entityField() {
    return "vacuum";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "vacuum", required: !0, selector: _("vacuum") },
      { name: "battery", selector: _("sensor", "battery") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "consumables", selector: { entity: { multiple: !0 } } },
      { name: "low_below", selector: V(0, 100, "%") },
      A("vacuum", e, [
        { name: "levels", selector: D }
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
k("horos-vacuum-tile-editor", br);
const ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosVacuumTileEditor: br
}, Symbol.toStringTag, { value: "Module" }));
class wr extends C {
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
      { name: "low_below", selector: V(0, 100, "%") },
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
k("horos-batteries-tile-editor", wr);
const sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosBatteriesTileEditor: wr
}, Symbol.toStringTag, { value: "Module" }));
class $r extends C {
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
k("horos-safety-tile-editor", $r);
const ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosSafetyTileEditor: $r
}, Symbol.toStringTag, { value: "Module" }));
class xr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "status", selector: { entity: {} } },
      { name: "disk", selector: _("sensor", "data_size") },
      { name: "download", selector: _("sensor", "data_rate") },
      { name: "upload", selector: _("sensor", "data_rate") },
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
k("horos-server-tile-editor", xr);
const ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosServerTileEditor: xr
}, Symbol.toStringTag, { value: "Module" }));
class Er extends C {
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
      A("person", e, [
        { name: "levels", selector: D }
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
k("horos-person-tile-editor", Er);
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPersonTileEditor: Er
}, Symbol.toStringTag, { value: "Module" }));
class kr extends C {
  get entityField() {
    return "status";
  }
  get schema() {
    const e = $(this.hass);
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
      { name: "disk_rows", selector: D },
      { name: "color_by_load", selector: D },
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
          selector: te([
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
        { name: "levels", selector: D }
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
k("horos-computer-tile-editor", kr);
const oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosComputerTileEditor: kr
}, Symbol.toStringTag, { value: "Module" }));
class Cr extends C {
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
      { name: "pm25", selector: _("sensor", "pm25") },
      { name: "humidity", selector: _("sensor", "humidity") },
      { name: "temperature", selector: _("sensor", "temperature") },
      { name: "power", selector: _("sensor", "power") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      {
        name: "alerts",
        selector: { entity: { multiple: !0, filter: [{ domain: "binary_sensor" }] } }
      },
      A("appliance", e, [
        {
          name: "big_values",
          selector: te([
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
k("horos-air-tile-editor", Cr);
const aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAirTileEditor: Cr
}, Symbol.toStringTag, { value: "Module" }));
class Sr extends C {
  get entityField() {
    return "cover";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "cover", required: !0, selector: _("cover") },
      { name: "position", selector: _("sensor") },
      {
        name: "illuminance",
        selector: _("sensor", "illuminance")
      },
      { name: "battery", selector: _("sensor", "battery") },
      A("cover", e, [
        {
          name: "big_values",
          selector: te([
            {
              value: "illuminance",
              label: e === "ru" ? "Освещённость" : "Illuminance"
            },
            { value: "battery", label: e === "ru" ? "Заряд" : "Battery" }
          ])
        },
        { name: "levels", selector: D }
      ]),
      T("cover", "none")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return dt(this.hass, e);
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
k("horos-cover-tile-editor", Sr);
const la = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosCoverTileEditor: Sr
}, Symbol.toStringTag, { value: "Module" }));
class Ar extends C {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "limit", selector: V(1, 12) },
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
k("horos-offline-tile-editor", Ar);
const ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosOfflineTileEditor: Ar
}, Symbol.toStringTag, { value: "Module" }));
class Tr extends C {
  get entityField() {
    return "total";
  }
  get schema() {
    const e = $(this.hass);
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
      { name: "limit", selector: V(1, 12) },
      A("total", e, [
        { name: "levels", selector: D }
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
k("horos-energy-tile-editor", Tr);
const ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosEnergyTileEditor: Tr
}, Symbol.toStringTag, { value: "Module" }));
class Or extends C {
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
k("horos-presence-tile-editor", Or);
const ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosPresenceTileEditor: Or
}, Symbol.toStringTag, { value: "Module" }));
class Pr extends C {
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
      { name: "group", selector: _("light") },
      A("group", e, [
        { name: "levels", selector: D }
      ]),
      T("group", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return mt(e);
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
k("horos-light-tile-editor", Pr);
const da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLightTileEditor: Pr
}, Symbol.toStringTag, { value: "Module" }));
class Ir extends C {
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
      A(void 0, e, [
        { name: "levels", selector: D }
      ]),
      T(void 0, "more-info")
    ];
  }
  /** The playback buttons act on the first player in the list. */
  get featuresEntity() {
    const e = this._config?.players ?? [];
    return I(e)[0];
  }
  defaultFeatures() {
    const e = this._config;
    return pt(e);
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
k("horos-media-tile-editor", Ir);
const ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosMediaTileEditor: Ir
}, Symbol.toStringTag, { value: "Module" }));
class Rr extends C {
  get entityField() {
    return "climate";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "climate", required: !0, selector: _("climate") },
      { name: "temperature", selector: _("sensor", "temperature") },
      { name: "humidity", selector: _("sensor", "humidity") },
      { name: "power", selector: _("sensor", "power") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      A("climate", e, [
        {
          name: "big_values",
          selector: te([
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
    return ft(e);
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
k("horos-ac-tile-editor", Rr);
const pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAcTileEditor: Rr
}, Symbol.toStringTag, { value: "Module" }));
class jr extends C {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "limit", selector: V(1, 20) },
      { name: "include_skipped", selector: D },
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
k("horos-updates-tile-editor", jr);
const fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosUpdatesTileEditor: jr
}, Symbol.toStringTag, { value: "Module" }));
class Mr extends C {
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
      { name: "calendar", selector: _("calendar") },
      A(void 0, e, [
        { name: "levels", selector: D }
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
k("horos-tasks-tile-editor", Mr);
const ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosTasksTileEditor: Mr
}, Symbol.toStringTag, { value: "Module" }));
class Nr extends C {
  get entityField() {
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "alerts", required: !0, selector: { entity: { multiple: !0 } } },
      { name: "limit", selector: V(1, 20) },
      { name: "watch_offline", selector: D },
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
k("horos-alerts-tile-editor", Nr);
const _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosAlertsTileEditor: Nr
}, Symbol.toStringTag, { value: "Module" })), ve = {
  entity: {
    filter: [
      { domain: "script" },
      { domain: "scene" },
      { domain: "button" },
      { domain: "input_button" }
    ]
  }
};
class Fr extends C {
  get entityField() {
    return "state";
  }
  get schema() {
    const e = $(this.hass);
    return [
      { name: "state", selector: _("input_boolean") },
      { name: "power", selector: ve },
      { name: "bright", selector: ve },
      { name: "dim", selector: ve },
      { name: "warm", selector: ve },
      { name: "cold", selector: ve },
      {
        name: "presets",
        selector: { entity: { ...ve.entity, multiple: !0 } }
      },
      { name: "preset_state", selector: _("input_select") },
      { name: "sensors", selector: { entity: { multiple: !0 } } },
      { name: "preset_labels", selector: D },
      A("state", e, [
        { name: "levels", selector: D }
      ]),
      T("state", "toggle")
    ];
  }
  defaultFeatures() {
    const e = this._config;
    return gt(e);
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
k("horos-lamp-tile-editor", Fr);
const va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosLampTileEditor: Fr
}, Symbol.toStringTag, { value: "Module" }));
class Lr extends C {
  get entityField() {
    return "mode";
  }
  get schema() {
    const e = $(this.hass);
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
      A("mode", e, [
        {
          name: "big_values",
          selector: te([
            { value: "power", label: e === "ru" ? "Мощность" : "Power" },
            { value: "energy", label: e === "ru" ? "Энергия" : "Energy" }
          ])
        },
        { name: "levels", selector: D }
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
k("horos-heating-tile-editor", Lr);
const ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosHeatingTileEditor: Lr
}, Symbol.toStringTag, { value: "Module" }));
class Hr extends C {
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
          { name: "dry_below", selector: V(0, 100, "%") },
          { name: "wet_above", selector: V(0, 100, "%") }
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
      A(void 0, e, [
        {
          name: "big_values",
          selector: te([
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
        { name: "levels", selector: D }
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
k("horos-greenhouse-tile-editor", Hr);
const ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosGreenhouseTileEditor: Hr
}, Symbol.toStringTag, { value: "Module" })), wa = {
  temperature: { ru: "Температура, от ночи до дня", en: "Temperature, night to day" },
  precipitation: { ru: "Осадки", en: "Precipitation" },
  precipitation_probability: { ru: "Вероятность осадков", en: "Chance of rain" },
  humidity: { ru: "Влажность", en: "Humidity" },
  wind_speed: { ru: "Ветер", en: "Wind" }
}, $s = {
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
class Dr extends C {
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
          { name: "days", selector: V(1, 14) },
          {
            name: "bar",
            selector: {
              select: {
                mode: "dropdown",
                options: _t.map((t) => ({
                  value: t,
                  label: wa[t][e]
                }))
              }
            }
          }
        ]
      },
      A("weather", $(this.hass), [
        {
          name: "big_values",
          selector: te(
            Object.keys($s).map((t) => ({
              value: t,
              label: $s[t][e]
            }))
          )
        },
        { name: "levels", selector: D }
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
k("horos-weather-tile-editor", Dr);
const $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosWeatherTileEditor: Dr
}, Symbol.toStringTag, { value: "Module" }));
class Ur extends C {
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
      { name: "switch", selector: _("switch") },
      { name: "min", selector: t },
      { name: "max", selector: t },
      { name: "force", selector: _("timer") },
      { name: "pulse_every", selector: _("input_number") },
      { name: "stale_after", selector: V(0, 86400, "s") },
      A(void 0, e),
      T(void 0, "more-info")
    ];
  }
  /** The form always edits a list, whatever the YAML holds. */
  get formData() {
    const e = super.formData;
    return {
      ...e,
      battery: De(e)
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
k("horos-charge-tile-editor", Ur);
const xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HorosChargeTileEditor: Ur
}, Symbol.toStringTag, { value: "Module" }));
