/* =========================================================
 *  西安三日游 · 交互与渲染
 *  依赖 data.js（window.XIAN）
 * ========================================================= */
(function () {
  "use strict";

  const D = window.XIAN;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const yuan = (n) => "¥" + Math.round(n).toLocaleString("zh-CN");

  /* =========================================================
   *  一、景点插画（纯 SVG，无外部图片）
   * ========================================================= */
  const ART = {
    /* 兵马俑：俑坑军阵 */
    terracotta(id) {
      const man = (x, y, s, o) => `
        <g transform="translate(${x} ${y}) scale(${s})" fill="#2a1d12" opacity="${o}">
          <circle cx="0" cy="-34" r="7.5"/>
          <path d="M-8 -25 L8 -25 L11 -4 L-11 -4 Z"/>
          <path d="M-12 -6 L12 -6 L12 12 L-12 12 Z"/>
          <rect x="-9" y="12" width="7" height="22"/>
          <rect x="2" y="12" width="7" height="22"/>
        </g>`;
      let rows = "";
      for (let i = 0; i < 5; i++) rows += man(60 + i * 70, 150, 0.7, 0.5);
      for (let i = 0; i < 4; i++) rows += man(95 + i * 72, 182, 0.95, 0.72);
      for (let i = 0; i < 3; i++) rows += man(130 + i * 74, 226, 1.25, 0.92);
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f7e3c1"/><stop offset="100%" stop-color="#dfae72"/>
          </linearGradient>
          <linearGradient id="gr-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a97c46"/><stop offset="100%" stop-color="#6d4b26"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="318" cy="58" r="34" fill="#fff4d8" opacity=".7"/>
        <path d="M0 96 Q80 74 150 92 T300 88 T400 92 L400 132 L0 132 Z" fill="#c99a63" opacity=".45"/>
        <rect y="132" width="400" height="108" fill="url(#gr-${id})"/>
        <rect y="124" width="400" height="10" fill="#4b3319" opacity=".5"/>
        <g opacity=".28" stroke="#3a2611" stroke-width="3" fill="none">
          <path d="M20 0 L20 240 M380 0 L380 240"/>
        </g>
        ${rows}
        <g fill="#3d2a14" opacity=".85">
          <rect x="0" y="0" width="400" height="16"/>
          <rect x="120" y="10" width="14" height="26"/>
          <rect x="266" y="10" width="14" height="26"/>
        </g>`;
    },

    /* 西安城墙：城楼与垛口 */
    citywall(id) {
      let teeth = "";
      for (let x = 10; x < 400; x += 34) teeth += `<rect x="${x}" y="128" width="20" height="14"/>`;
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f9d9a8"/><stop offset="55%" stop-color="#e9a877"/><stop offset="100%" stop-color="#c26a4d"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="200" cy="112" r="46" fill="#fff0cc" opacity=".55"/>
        <path d="M0 116 Q70 100 140 112 T280 108 T400 112 L400 140 L0 140 Z" fill="#8e5a41" opacity=".5"/>
        <g fill="#3a2417">
          <rect x="0" y="142" width="400" height="98"/>
          ${teeth}
          <rect x="150" y="60" width="100" height="82"/>
          <path d="M132 62 Q200 26 268 62 L256 74 L144 74 Z"/>
          <rect x="176" y="82" width="18" height="26" fill="#1d120b"/>
          <rect x="206" y="82" width="18" height="26" fill="#1d120b"/>
          <rect x="140" y="36" width="6" height="30"/>
          <path d="M146 38 L182 48 L146 58 Z" fill="#b4462f"/>
        </g>
        <g fill="#241609" opacity=".9">
          <rect x="0" y="228" width="400" height="12"/>
          <rect x="60" y="204" width="26" height="24" opacity=".7"/>
          <rect x="316" y="204" width="26" height="24" opacity=".7"/>
        </g>`;
    },

    /* 大雁塔：五层唐塔 */
    pagoda(id) {
      const tiers = [
        { y: 76, w: 46 }, { y: 108, w: 56 }, { y: 142, w: 66 }, { y: 176, w: 76 }
      ];
      let body = "";
      tiers.forEach((t) => {
        body += `<path d="M${200 - t.w / 2} ${t.y} L${200 + t.w / 2} ${t.y} L${200 + t.w / 2 + 12} ${t.y + 8} L${200 - t.w / 2 - 12} ${t.y + 8} Z"/>`;
        body += `<rect x="${200 - t.w / 2 + 4}" y="${t.y + 8}" width="${t.w - 8}" height="26"/>`;
      });
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#cfe0e8"/><stop offset="100%" stop-color="#f3d9b4"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="316" cy="62" r="26" fill="#fff6e2" opacity=".75"/>
        <path d="M0 150 Q60 132 130 148 T260 144 T400 148 L400 200 L0 200 Z" fill="#9fb6a8" opacity=".5"/>
        <g fill="#33251b">
          ${body}
          <rect x="196" y="46" width="8" height="32"/>
          <circle cx="200" cy="42" r="6"/>
          <rect x="182" y="204" width="36" height="36"/>
        </g>
        <g fill="#2c3f34" opacity=".85">
          <circle cx="60" cy="206" r="26"/><rect x="55" y="206" width="10" height="34"/>
          <circle cx="342" cy="212" r="22"/><rect x="337" y="212" width="10" height="28"/>
        </g>
        <rect y="236" width="400" height="4" fill="#241a12" opacity=".6"/>`;
    },

    /* 钟楼：三重檐 */
    belltower(id) {
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#16223d"/><stop offset="60%" stop-color="#3d3357"/><stop offset="100%" stop-color="#7a4f4a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="316" cy="54" r="22" fill="#ffeec9" opacity=".9"/>
        <g fill="#fff" opacity=".5">
          <circle cx="60" cy="30" r="1.6"/><circle cx="140" cy="52" r="1.2"/>
          <circle cx="230" cy="24" r="1.5"/><circle cx="368" cy="96" r="1.3"/>
        </g>
        <g fill="#120c14">
          <rect x="196" y="46" width="8" height="14"/>
          <path d="M146 60 Q200 34 254 60 L244 70 L156 70 Z"/>
          <rect x="170" y="70" width="60" height="28"/>
          <path d="M140 98 Q200 66 260 98 L248 108 L152 108 Z"/>
          <rect x="162" y="108" width="76" height="30"/>
          <path d="M126 138 Q200 102 274 138 L260 150 L140 150 Z"/>
          <rect x="154" y="150" width="92" height="40"/>
          <rect x="136" y="190" width="128" height="16"/>
        </g>
        <g fill="#ffce7a" opacity=".9">
          <rect x="176" y="118" width="10" height="12"/><rect x="214" y="118" width="10" height="12"/>
          <rect x="168" y="160" width="12" height="14"/><rect x="196" y="160" width="12" height="14"/>
          <rect x="224" y="160" width="12" height="14"/>
        </g>
        <rect y="206" width="400" height="34" fill="#0c0810"/>`;
    },

    /* 陕历博：唐风大殿 */
    museum(id) {
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#eef2f4"/><stop offset="100%" stop-color="#d5cbbd"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="72" cy="54" r="28" fill="#fff" opacity=".8"/>
        <path d="M0 140 Q90 126 180 138 T400 134 L400 180 L0 180 Z" fill="#b3a893" opacity=".45"/>
        <g fill="#4a4238">
          <path d="M56 106 L344 106 L318 82 L82 82 Z"/>
          <rect x="66" y="106" width="268" height="12"/>
          <rect x="88" y="118" width="224" height="66"/>
        </g>
        <g fill="#6b6152">
          <rect x="104" y="118" width="14" height="66"/>
          <rect x="152" y="118" width="14" height="66"/>
          <rect x="200" y="118" width="14" height="66"/>
          <rect x="248" y="118" width="14" height="66"/>
          <rect x="290" y="118" width="14" height="66"/>
        </g>
        <rect x="60" y="184" width="280" height="8" fill="#3b352c"/>
        <rect x="40" y="192" width="320" height="10" fill="#565043"/>
        <g fill="#2f2a22"><rect x="0" y="202" width="400" height="38"/></g>
        <g fill="#3f6b5c" opacity=".8">
          <circle cx="26" cy="196" r="20"/><rect x="22" y="196" width="8" height="30"/>
          <circle cx="376" cy="196" r="20"/><rect x="372" y="196" width="8" height="30"/>
        </g>`;
    },

    /* 大唐不夜城：灯组夜色 */
    nightcity(id) {
      const lantern = (x, y, r, o) => `
        <g opacity="${o}">
          <circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="#ffb35c" opacity=".16"/>
          <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.15}" fill="#ff8a3d"/>
          <rect x="${x - r}" y="${y - r * 1.15}" width="${r * 2}" height="3" fill="#f6d089"/>
        </g>`;
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#131a33"/><stop offset="100%" stop-color="#4a2a44"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <g fill="#fff" opacity=".45">
          <circle cx="52" cy="34" r="1.4"/><circle cx="132" cy="22" r="1.1"/>
          <circle cx="248" cy="40" r="1.5"/><circle cx="352" cy="26" r="1.2"/>
        </g>
        <g fill="#1a1020">
          <path d="M0 138 L56 118 L112 138 L112 176 L0 176 Z"/>
          <path d="M288 138 L344 118 L400 138 L400 176 L288 176 Z"/>
          <rect x="120" y="140" width="160" height="36"/>
          <path d="M112 140 Q200 112 288 140 L276 150 L124 150 Z"/>
        </g>
        <g fill="#ffce7a" opacity=".85">
          <rect x="132" y="152" width="12" height="10"/><rect x="164" y="152" width="12" height="10"/>
          <rect x="196" y="152" width="12" height="10"/><rect x="228" y="152" width="12" height="10"/>
          <rect x="258" y="152" width="12" height="10"/>
        </g>
        <g fill="#241528"><rect y="176" width="400" height="64"/></g>
        <path d="M24 74 Q200 34 376 74" stroke="#6a4a6e" stroke-width="1.6" fill="none" opacity=".8"/>
        ${lantern(110, 88, 9, 1)}
        ${lantern(200, 76, 11, 1)}
        ${lantern(290, 88, 9, 1)}
        <g fill="#3a2340">
          <rect x="30" y="176" width="46" height="64"/><rect x="324" y="176" width="46" height="64"/>
        </g>
        <g fill="#ffb85c" opacity=".7">
          <rect x="40" y="196" width="26" height="4"/><rect x="40" y="212" width="26" height="4"/>
          <rect x="334" y="196" width="26" height="4"/><rect x="334" y="212" width="26" height="4"/>
        </g>`;
    },

    /* 华清宫：骊山与宫苑 */
    palace(id) {
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f6cf9f"/><stop offset="100%" stop-color="#c98a63"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="88" cy="56" r="26" fill="#fff2d4" opacity=".75"/>
        <path d="M0 128 L70 74 L130 118 L196 58 L268 118 L332 82 L400 126 L400 200 L0 200 Z" fill="#8a6a52" opacity=".6"/>
        <path d="M0 152 Q90 138 180 150 T400 146 L400 200 L0 200 Z" fill="#7d5a45" opacity=".55"/>
        <g fill="#3c2a20">
          <path d="M96 168 L304 168 L282 146 L118 146 Z"/>
          <rect x="112" y="168" width="176" height="34"/>
          <rect x="140" y="176" width="14" height="26" fill="#20140e"/>
          <rect x="180" y="176" width="14" height="26" fill="#20140e"/>
          <rect x="220" y="176" width="14" height="26" fill="#20140e"/>
          <rect x="258" y="176" width="14" height="26" fill="#20140e"/>
        </g>
        <rect y="202" width="400" height="38" fill="#2e2018"/>
        <g fill="#f0c58a" opacity=".5"><rect y="196" width="400" height="6"/></g>`;
    },

    /* 华山：峭壁云海 */
    mountain(id) {
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bcd9e6"/><stop offset="100%" stop-color="#f0e4d2"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="312" cy="52" r="30" fill="#fff8e8" opacity=".85"/>
        <path d="M0 176 L56 118 L96 152 L156 62 L222 140 L268 96 L330 152 L400 118 L400 240 L0 240 Z" fill="#6d7f8e"/>
        <path d="M156 62 L196 118 L176 130 L204 168 L150 176 Z" fill="#4f5f6d"/>
        <path d="M156 62 L176 100 L160 106 L186 148 L146 154 Z" fill="#eef3f6" opacity=".75"/>
        <g fill="#fff" opacity=".75">
          <ellipse cx="80" cy="196" rx="70" ry="14"/>
          <ellipse cx="250" cy="212" rx="90" ry="16"/>
          <ellipse cx="360" cy="188" rx="56" ry="12"/>
        </g>
        <path d="M0 216 Q120 200 240 216 T400 210 L400 240 L0 240 Z" fill="#8fa3ae" opacity=".8"/>`;
    },

    /* 回民街：夜市街巷 */
    street(id) {
      const lantern = (x, y) => `
        <g>
          <circle cx="${x}" cy="${y}" r="16" fill="#ff9a4d" opacity=".2"/>
          <ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="#ff7a37"/>
          <rect x="${x - 7}" y="${y - 10}" width="14" height="3" fill="#ffd79a"/>
          <rect x="${x}" y="${y - 22}" width="1.6" height="12" fill="#8a5a3a"/>
        </g>`;
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1b1730"/><stop offset="100%" stop-color="#54303a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <g fill="#1c1120">
          <path d="M0 96 L74 108 L74 180 L0 180 Z"/>
          <path d="M400 92 L326 104 L326 180 L400 180 Z"/>
          <rect x="90" y="120" width="220" height="60"/>
          <path d="M78 122 Q200 92 322 122 L308 134 L92 134 Z"/>
        </g>
        <g fill="#241528"><rect y="180" width="400" height="60"/></g>
        <g fill="#ffce7a" opacity=".85">
          <rect x="104" y="142" width="20" height="14"/><rect x="146" y="142" width="20" height="14"/>
          <rect x="188" y="142" width="20" height="14"/><rect x="230" y="142" width="20" height="14"/>
          <rect x="272" y="142" width="20" height="14"/>
        </g>
        <path d="M0 60 Q200 24 400 60" stroke="#6c4a56" stroke-width="1.6" fill="none"/>
        ${lantern(60, 78)}
        ${lantern(140, 66)}
        ${lantern(220, 62)}
        ${lantern(300, 70)}
        ${lantern(374, 82)}
        <g fill="#3a2340">
          <rect x="16" y="180" width="70" height="60"/>
          <rect x="314" y="180" width="70" height="60"/>
        </g>
        <g fill="#ffb85c" opacity=".65">
          <rect x="28" y="200" width="44" height="5"/><rect x="28" y="216" width="44" height="5"/>
          <rect x="326" y="200" width="44" height="5"/><rect x="326" y="216" width="44" height="5"/>
        </g>`;
    },

    /* 碑林：石碑庭院 */
    stele(id) {
      const stone = (x, y, w, h, o) => `
        <g opacity="${o}">
          <path d="M${x} ${y + h} L${x} ${y + 16} Q${x + w / 2} ${y - 10} ${x + w} ${y + 16} L${x + w} ${y + h} Z" fill="#5b564c"/>
          <rect x="${x + w * 0.2}" y="${y + 16}" width="${w * 0.6}" height="${h - 20}" fill="#6f695d" opacity=".7"/>
        </g>`;
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e7ebe4"/><stop offset="100%" stop-color="#c6c2b2"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <path d="M0 128 Q110 112 220 126 T400 122 L400 180 L0 180 Z" fill="#a8ad9c" opacity=".5"/>
        <rect y="180" width="400" height="60" fill="#8c8779"/>
        <g opacity=".6" stroke="#767161" stroke-width="1.4" fill="none">
          <path d="M0 196 H400 M0 214 H400 M0 232 H400"/>
        </g>
        ${stone(40, 96, 52, 90, 0.85)}
        ${stone(120, 78, 60, 108, 1)}
        ${stone(206, 96, 52, 90, 0.85)}
        ${stone(280, 84, 58, 102, 1)}
        <g fill="#3b4a3a" opacity=".85">
          <circle cx="20" cy="150" r="26"/><rect x="16" y="150" width="8" height="40"/>
          <circle cx="386" cy="146" r="26"/><rect x="382" y="146" width="8" height="44"/>
        </g>`;
    },

    /* 大唐芙蓉园：湖景园林 */
    lake(id) {
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2b2a4c"/><stop offset="55%" stop-color="#6b4a63"/><stop offset="100%" stop-color="#c47a63"/>
          </linearGradient>
          <linearGradient id="water-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5a4a66"/><stop offset="100%" stop-color="#241d33"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="300" cy="60" r="24" fill="#ffe6b8" opacity=".85"/>
        <g fill="#181228">
          <path d="M110 128 L290 128 L266 106 L134 106 Z"/>
          <rect x="126" y="128" width="148" height="30"/>
          <rect x="150" y="136" width="12" height="22" fill="#ffce7a" opacity=".8"/>
          <rect x="184" y="136" width="12" height="22" fill="#ffce7a" opacity=".8"/>
          <rect x="218" y="136" width="12" height="22" fill="#ffce7a" opacity=".8"/>
          <rect x="252" y="136" width="12" height="22" fill="#ffce7a" opacity=".8"/>
          <rect x="198" y="86" width="6" height="20"/>
        </g>
        <rect y="158" width="400" height="82" fill="url(#water-${id})"/>
        <g fill="#ffce7a" opacity=".35">
          <rect x="150" y="166" width="12" height="30"/>
          <rect x="184" y="166" width="12" height="38"/>
          <rect x="218" y="166" width="12" height="28"/>
          <rect x="252" y="166" width="12" height="34"/>
        </g>
        <g fill="#0f0b1c" opacity=".9">
          <path d="M0 196 Q60 186 120 196 T240 196 T400 192 L400 240 L0 240 Z"/>
        </g>
        <g fill="#ff9a6b" opacity=".7">
          <ellipse cx="60" cy="210" rx="12" ry="5"/><ellipse cx="330" cy="216" rx="14" ry="5"/>
        </g>`;
    },

    /* 大明宫：遗址台基 */
    minggong(id) {
      return `
        <defs>
          <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f0d9b6"/><stop offset="100%" stop-color="#d9b98f"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-${id})"/>
        <circle cx="86" cy="60" r="30" fill="#fff6e0" opacity=".8"/>
        <path d="M0 132 Q110 118 220 130 T400 126 L400 172 L0 172 Z" fill="#bfa27a" opacity=".5"/>
        <g fill="#6a5a45">
          <rect x="120" y="150" width="160" height="34"/>
          <rect x="100" y="184" width="200" height="14"/>
          <rect x="60" y="198" width="280" height="12" opacity=".7"/>
        </g>
        <g fill="#4b3d2d" opacity=".55">
          <rect x="136" y="126" width="10" height="24"/>
          <rect x="176" y="126" width="10" height="24"/>
          <rect x="216" y="126" width="10" height="24"/>
          <rect x="254" y="126" width="10" height="24"/>
        </g>
        <rect y="210" width="400" height="30" fill="#8a7355"/>
        <g fill="#7a8a6a" opacity=".8">
          <circle cx="34" cy="198" r="22"/><rect x="30" y="198" width="8" height="30"/>
          <circle cx="370" cy="202" r="18"/><rect x="366" y="202" width="8" height="26"/>
        </g>`;
    }
  };

  const art = (key, id) => (ART[key] ? ART[key](id) : ART.minggong(id));
  const media = (key, id, alt) =>
    `<div class="card__media"><svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(alt)}">${art(key, id)}</svg></div>`;

  /* =========================================================
   *  二、渲染
   * ========================================================= */

  /* --- 2.1 行程总览三张卡 --- */
  function renderDayCards() {
    $("#dayCards").innerHTML = D.days.map((d, i) => `
      <article class="daycard reveal" data-goto-day="${d.id}" tabindex="0" role="button"
               aria-label="查看${d.label}详细路线" style="--accent:${d.color}">
        <div class="daycard__top">
          <span class="daycard__no">DAY ${i + 1}</span>
          <span class="daycard__tag">${esc(d.tag)}</span>
        </div>
        <h3>${esc(d.title)}</h3>
        <p class="daycard__sum">${esc(d.summary)}</p>
        <ul class="daycard__hl">
          ${d.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
        </ul>
        <div class="daycard__foot">
          <span>${esc(d.walk)}</span>
          <span class="daycard__more">查看时间轴 →</span>
        </div>
      </article>`).join("");
  }

  /* --- 2.2 三日路线 --- */
  let curDay = D.days[0].id;

  function renderDayTabs() {
    $("#dayTabs").innerHTML = D.days.map((d, i) => `
      <button type="button" role="tab" data-day="${d.id}"
              class="tab${d.id === curDay ? " is-on" : ""}"
              aria-selected="${d.id === curDay}" aria-controls="dayPanel">
        <span class="tab__no">D${i + 1}</span>
        <span class="tab__label">第${i + 1}天</span>
        <span class="tab__tag">${esc(d.tag)}</span>
      </button>`).join("");
  }

  function renderDayPanel() {
    const d = D.days.find((x) => x.id === curDay);
    $("#dayPanel").innerHTML = `
      <div class="daypanel__head">
        <div>
          <span class="daypanel__tag" style="background:${d.color}">${esc(d.tag)}</span>
          <h3>${esc(d.title)}</h3>
          <p>${esc(d.summary)}</p>
        </div>
        <dl class="daypanel__meta">
          <div><dt>出发</dt><dd>${esc(d.start)}</dd></div>
          <div><dt>强度</dt><dd>${esc(d.walk)}</dd></div>
          <div><dt>住宿</dt><dd>${esc(d.stay)}</dd></div>
        </dl>
      </div>

      <ol class="timeline">
        ${d.items.map((it) => `
          <li class="tl">
            <span class="tl__time">${esc(it.time)}</span>
            <span class="tl__dot"></span>
            <div class="tl__body">
              <div class="tl__head">
                <h4>${esc(it.title)}</h4>
                <span class="tl__dur">${esc(it.dur)}</span>
              </div>
              <p class="tl__text">${esc(it.text)}</p>
              <div class="tl__foot">
                <span class="chip chip--ghost">${esc(it.transport)}</span>
                ${it.tip ? `<p class="tl__tip"><b>建议</b>${esc(it.tip)}</p>` : ""}
              </div>
            </div>
          </li>`).join("")}
      </ol>

      <div class="daypanel__foot">
        <div class="planb">
          <span class="planb__label">Plan B</span>
          <p>${esc(d.planB)}</p>
        </div>
        <div class="daypanel__food">
          <span>当天吃什么</span>
          <ul>${d.food.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        </div>
      </div>`;
  }

  /* --- 2.3 景点 --- */
  const ATTR_CATS = ["全部", "历史古迹", "博物馆", "自然风光", "夜景打卡", "园林", "街区美食", "亲子", "户外"];
  let curCat = "全部";

  function renderAttrFilters() {
    const used = ATTR_CATS.filter((c) => c === "全部" || D.attractions.some((a) => a.cats.includes(c)));
    $("#attrFilters").innerHTML = used.map((c) => `
      <button type="button" class="chip chip--filter${c === curCat ? " is-on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  }

  function renderAttrGrid() {
    const list = curCat === "全部" ? D.attractions : D.attractions.filter((a) => a.cats.includes(curCat));
    $("#attrEmpty").hidden = list.length > 0;
    $("#attrGrid").innerHTML = list.map((a) => `
      <article class="card reveal" data-id="${esc(a.id)}">
        ${media(a.art, a.id, a.name)}
        <div class="card__body">
          <div class="card__head">
            <h3>${esc(a.name)}</h3>
            <span class="card__rating" title="推荐指数">${a.rating}</span>
          </div>
          <p class="card__meta">
            <span class="chip chip--sm">${esc(a.area)}</span>
            <span class="chip chip--sm chip--ghost">${esc(a.duration)}</span>
          </p>
          <p class="card__desc">${esc(a.desc)}</p>
          <dl class="card__facts">
            <div><dt>门票</dt><dd>${esc(a.ticket)}</dd></div>
            <div><dt>预约</dt><dd>${esc(a.book)}</dd></div>
          </dl>
          <p class="card__tip"><b>实话建议</b>${esc(a.tip)}</p>
          <div class="card__tags">${a.cats.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
  }

  /* --- 2.4 美食 --- */
  const FOOD_CATS = ["全部", "主食", "小吃", "饮品"];
  let curFoodCat = "全部";

  function renderFoodFilters() {
    $("#foodFilters").innerHTML = FOOD_CATS.map((c) => `
      <button type="button" class="chip chip--filter${c === curFoodCat ? " is-on" : ""}" data-foodcat="${esc(c)}">${esc(c)}</button>`).join("");
  }

  function renderFoodGrid() {
    const list = curFoodCat === "全部" ? D.foods : D.foods.filter((f) => f.cat === curFoodCat);
    $("#foodGrid").innerHTML = list.map((f, i) => `
      <article class="food reveal" style="--i:${i % 6}">
        <div class="food__seal" data-cat="${esc(f.cat)}"><span>${esc(f.char)}</span></div>
        <div class="food__body">
          <div class="food__head">
            <h3>${esc(f.name)}</h3>
            <span class="food__price">${esc(f.price)}</span>
          </div>
          <p class="food__desc">${esc(f.desc)}</p>
          <p class="food__where"><b>本地人常去</b>${esc(f.where)}</p>
        </div>
      </article>`).join("");
  }

  /* --- 2.5 住宿 --- */
  let curHotel = D.hotelAreas[0].id;

  function renderHotelTabs() {
    $("#hotelTabs").innerHTML = D.hotelAreas.map((h) => `
      <button type="button" role="tab" data-hotel="${esc(h.id)}"
              class="tab tab--light${h.id === curHotel ? " is-on" : ""}"
              aria-selected="${h.id === curHotel}" aria-controls="hotelPanel">
        <span class="tab__label">${esc(h.name)}</span>
        <span class="tab__tag">${esc(h.tagline)}</span>
      </button>`).join("");
  }

  function renderHotelPanel() {
    const h = D.hotelAreas.find((x) => x.id === curHotel);
    $("#hotelPanel").innerHTML = `
      <div class="hotelpanel__head">
        <div>
          <h3>${esc(h.name)}</h3>
          <p>${esc(h.tagline)}</p>
        </div>
        <p class="hotelpanel__best"><span>适合</span>${esc(h.best)}</p>
      </div>

      <div class="proscons">
        <div class="proscons__col proscons__col--pro">
          <h4>优点</h4>
          <ul>${h.pros.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>
        <div class="proscons__col proscons__col--con">
          <h4>注意</h4>
          <ul>${h.cons.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>
      </div>

      <div class="tiers">
        ${h.tiers.map((t) => `
          <div class="tier tier--${t.tier === "品质" ? "high" : t.tier === "舒适" ? "mid" : "low"}">
            <div class="tier__head">
              <span class="tier__name">${esc(t.tier)}</span>
              <span class="tier__price">${esc(t.price)}</span>
            </div>
            <ul>${t.list.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>

      <p class="hotelpanel__note"><b>选址提示</b>${esc(h.note)}</p>`;
  }

  /* --- 2.6 预算 --- */
  const calc = { people: 2, tier: "comfort" };

  function renderBudget() {
    const t = D.budgetTiers[calc.tier];
    const nights = 2;
    const rooms = Math.ceil(calc.people / 2);
    const roomTotal = t.room * nights * rooms;
    const ticketTotal = t.ticket * calc.people;
    const mealTotal = t.mealPerDay * 3 * calc.people;
    const transitTotal = t.transitPerDay * 3 * calc.people;
    const total = roomTotal + ticketTotal + mealTotal + transitTotal;
    const per = total / calc.people;

    $("#calcPer").textContent = yuan(per);
    $("#heroBudget").textContent = yuan(per);
    $("#calcTeam").innerHTML =
      `<span>${calc.people} 人 · ${esc(t.name)}档 · ${nights} 晚 · ${rooms} 间房</span>` +
      `<b>合计 ${yuan(total)}</b>`;

    const rows = [
      ["住宿", roomTotal, `${t.room} 元/间/晚 × ${nights} 晚 × ${rooms} 间`],
      ["门票 + 演出", ticketTotal, `人均 ${t.ticket} 元`],
      ["餐饮", mealTotal, `人均 ${t.mealPerDay} 元/天 × 3 天`],
      ["市内交通", transitTotal, `人均 ${t.transitPerDay} 元/天 × 3 天`]
    ];
    $("#calcBreakdown").innerHTML = rows.map((r) => `
      <li>
        <span class="bd__k">${r[0]}</span>
        <span class="bd__n">${r[2]}</span>
        <span class="bd__v">${yuan(r[1])}</span>
      </li>`).join("") + `
      <li class="bd__note">
        <span class="bd__k">档位说明</span>
        <span class="bd__n">${esc(t.note)}</span>
        <span class="bd__v"></span>
      </li>`;

    $$("#tierSeg button").forEach((b) => b.classList.toggle("is-on", b.dataset.tier === calc.tier));
    $$("#peopleSeg button").forEach((b) => b.classList.toggle("is-on", +b.dataset.people === calc.people));
  }

  /* --- 2.7 贴士 + 清单 --- */
  function renderTips() {
    $("#tipsGrid").innerHTML = D.tips.map((t) => `
      <section class="tip reveal">
        <h3><span class="tip__icon" aria-hidden="true">${t.icon}</span>${esc(t.title)}</h3>
        <ul>${t.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </section>`).join("");

    $("#checklist").innerHTML = D.checklist.map((c, i) => `
      <li class="check">
        <label>
          <input type="checkbox" id="chk-${i}" />
          <span class="check__box" aria-hidden="true"></span>
          <span class="check__text">${esc(c)}</span>
        </label>
      </li>`).join("");
  }

  /* =========================================================
   *  三、交互
   * ========================================================= */
  function bind() {
    /* 路线：tab 切换 */
    $("#dayTabs").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-day]");
      if (!btn) return;
      curDay = btn.dataset.day;
      $$("#dayTabs .tab").forEach((t) => {
        const on = t.dataset.day === curDay;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", String(on));
      });
      renderDayPanel();
      revealInit($("#dayPanel"));
    });

    /* 总览卡 → 跳到对应天 */
    $("#dayCards").addEventListener("click", (e) => {
      const card = e.target.closest("[data-goto-day]");
      if (!card) return;
      curDay = card.dataset.gotoDay;
      renderDayTabs();
      renderDayPanel();
      revealInit($("#dayPanel"));
      $("#itinerary").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $("#dayCards").addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest("[data-goto-day]");
      if (!card) return;
      e.preventDefault();
      card.click();
    });

    /* 景点筛选 */
    $("#attrFilters").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      curCat = btn.dataset.cat;
      renderAttrFilters();
      renderAttrGrid();
      revealInit($("#attrGrid"));
    });

    /* 美食筛选 */
    $("#foodFilters").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-foodcat]");
      if (!btn) return;
      curFoodCat = btn.dataset.foodcat;
      renderFoodFilters();
      renderFoodGrid();
      revealInit($("#foodGrid"));
    });

    /* 住宿切换 */
    $("#hotelTabs").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-hotel]");
      if (!btn) return;
      curHotel = btn.dataset.hotel;
      $$("#hotelTabs .tab").forEach((t) => {
        const on = t.dataset.hotel === curHotel;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", String(on));
      });
      renderHotelPanel();
      revealInit($("#hotelPanel"));
    });

    /* 预算 */
    $("#peopleSeg").addEventListener("click", (e) => {
      const b = e.target.closest("[data-people]");
      if (!b) return;
      calc.people = +b.dataset.people;
      renderBudget();
    });
    $("#tierSeg").addEventListener("click", (e) => {
      const b = e.target.closest("[data-tier]");
      if (!b) return;
      calc.tier = b.dataset.tier;
      renderBudget();
    });

    /* 打印 */
    $("#printBtn").addEventListener("click", () => window.print());

    /* 移动端菜单 */
    const nav = $("#nav");
    $("#navToggle").addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      $("#navToggle").setAttribute("aria-expanded", String(open));
    });
    $("#navLinks").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        $("#navToggle").setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 滚动：顶栏状态、进度条、当前章节高亮 */
  function scrollFX() {
    const nav = $("#nav");
    const bar = $("#navProgress");
    const links = $$("#navLinks a");
    const sections = links
      .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("is-stuck", y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})`;

      let active = null;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= 140) active = s.id;
      });
      links.forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + active));
    };

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    }, { passive: true });
    onScroll();
  }

  /* 入场动画 */
  let io = null;
  function revealInit(root) {
    const nodes = $$(".reveal", root || document).filter((n) => !n.classList.contains("is-in"));
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    nodes.forEach((n) => io.observe(n));
  }

  /* =========================================================
   *  四、启动
   * ========================================================= */
  renderDayCards();
  renderDayTabs();
  renderDayPanel();
  renderAttrFilters();
  renderAttrGrid();
  renderFoodFilters();
  renderFoodGrid();
  renderHotelTabs();
  renderHotelPanel();
  renderBudget();
  renderTips();
  bind();
  scrollFX();
  revealInit();
})();
