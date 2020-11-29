import React, { Component } from "react";
import aud1 from "./audio/1.wav";
import aud2 from "./audio/2.wav";
import aud3 from "./audio/3.wav";
import aud4 from "./audio/4.wav";
import aud5 from "./audio/5.wav";
import aud6 from "./audio/6.wav";
import aud7 from "./audio/7.wav";
import aud8 from "./audio/8.wav";
import aud9 from "./audio/9.wav";
import aud0 from "./audio/0.wav";
import a from "./audio/a.wav";
import b from "./audio/b.wav";
import c from "./audio/c.wav";
import d from "./audio/d.wav";
import e from "./audio/e.wav";
import f from "./audio/f.wav";
import g from "./audio/g.wav";
import h from "./audio/h.wav";
import i from "./audio/i.wav";
import j from "./audio/j.wav";
import k from "./audio/k.wav";
import l from "./audio/l.wav";
import m from "./audio/m.wav";
import n from "./audio/n.wav";
import o from "./audio/o.wav";
import p from "./audio/p.wav";
import q from "./audio/q.wav";
import r from "./audio/r.wav";
import s from "./audio/s.wav";
import t from "./audio/t.wav";
import u from "./audio/u.wav";
import v from "./audio/v.wav";
import w from "./audio/w.wav";
import x from "./audio/x.wav";
import y from "./audio/y.wav";
import z from "./audio/z.wav";

export default class audio extends Component {
  render() {
    return (
      <div className="audio__container">
        <audio src={aud1} data-key="49"></audio>
        <audio src={aud2} data-key="50"></audio>
        <audio src={aud3} data-key="51"></audio>
        <audio src={aud4} data-key="52"></audio>
        <audio src={aud5} data-key="53"></audio>
        <audio src={aud6} data-key="54"></audio>
        <audio src={aud7} data-key="55"></audio>
        <audio src={aud8} data-key="56"></audio>
        <audio src={aud9} data-key="57"></audio>
        <audio src={aud0} data-key="48"></audio>
        <audio src={a} data-key="65"></audio>
        <audio src={b} data-key="66"></audio>
        <audio src={c} data-key="67"></audio>
        <audio src={d} data-key="68"></audio>
        <audio src={e} data-key="69"></audio>
        <audio src={f} data-key="70"></audio>
        <audio src={g} data-key="71"></audio>
        <audio src={h} data-key="72"></audio>
        <audio src={i} data-key="73"></audio>
        <audio src={j} data-key="74"></audio>
        <audio src={k} data-key="75"></audio>
        <audio src={l} data-key="76"></audio>
        <audio src={m} data-key="77"></audio>
        <audio src={n} data-key="78"></audio>
        <audio src={o} data-key="79"></audio>
        <audio src={p} data-key="80"></audio>
        <audio src={q} data-key="81"></audio>
        <audio src={r} data-key="82"></audio>
        <audio src={s} data-key="83"></audio>
        <audio src={t} data-key="84"></audio>
        <audio src={u} data-key="85"></audio>
        <audio src={v} data-key="86"></audio>
        <audio src={w} data-key="87"></audio>
        <audio src={x} data-key="88"></audio>
        <audio src={y} data-key="89"></audio>
        <audio src={z} data-key="90"></audio>
      </div>
    );
  }
}
