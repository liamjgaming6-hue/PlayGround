/* Procedural anime portraits. Every egirl gets a unique face built from
   palette, hair, eye, accessory, and outfit parameters. */

let portraitCount = 0;

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function starPoints(cx, cy, outer, inner, points = 5) {
  const coords = [];
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    coords.push(`${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`);
  }
  return coords.join(' ');
}

function heartPath(cx, cy, scale = 1) {
  return `M ${cx} ${cy + 9 * scale}
    C ${cx - 18 * scale} ${cy - 2 * scale}, ${cx - 15 * scale} ${cy - 17 * scale}, ${cx} ${cy - 8 * scale}
    C ${cx + 15 * scale} ${cy - 17 * scale}, ${cx + 18 * scale} ${cy - 2 * scale}, ${cx} ${cy + 9 * scale} Z`;
}

function backHair(style, uid, c) {
  const fill = `url(#${uid}-hair)`;
  const stroke = c.palette.hairShade;

  const cap = `<path d="M93 239 C82 113 145 55 210 55 C278 55 340 113 328 239 C323 294 303 337 281 356 L139 356 C117 337 97 294 93 239 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

  switch (style) {
    case 'twintails':
      return `${cap}
        <path d="M116 176 C75 202 55 291 79 395 C83 420 111 430 126 407 C143 359 128 278 158 224 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M304 176 C345 202 365 291 341 395 C337 420 309 430 294 407 C277 359 292 278 262 224 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M92 201 C82 273 91 339 103 378 M328 201 C338 273 329 339 317 378" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5"/>
        <ellipse cx="126" cy="183" rx="17" ry="13" fill="${c.palette.accent}" transform="rotate(-26 126 183)"/>
        <ellipse cx="294" cy="183" rx="17" ry="13" fill="${c.palette.accent}" transform="rotate(26 294 183)"/>`;
    case 'bob':
      return `<path d="M94 242 C79 119 144 58 210 58 C279 58 343 120 327 242 L319 322 C306 338 283 342 268 330 L263 270 L157 270 L152 330 C137 342 114 338 101 322 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M101 207 C94 264 101 307 112 329 M319 207 C326 264 319 307 308 329" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5"/>`;
    case 'long':
      return `<path d="M92 229 C80 107 145 54 210 54 C280 54 342 109 330 229 L352 478 L293 446 L279 260 L141 260 L127 446 L68 478 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M110 252 C99 335 102 399 94 446 M310 252 C321 335 318 399 326 446" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".45"/>`;
    case 'ponytail':
      return `${cap}
        <path d="M300 110 C365 70 398 151 384 229 C372 300 343 355 315 376 C337 308 331 236 295 185 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M310 127 C351 123 369 174 361 224" fill="none" stroke="${c.palette.hairLight}" stroke-width="4" opacity=".55" stroke-linecap="round"/>
        <ellipse cx="301" cy="133" rx="20" ry="13" fill="${c.palette.accent}" transform="rotate(43 301 133)"/>`;
    case 'hime':
      return `<path d="M92 227 C81 106 145 53 210 53 C279 53 341 107 329 227 L339 442 L294 442 L289 260 L131 260 L126 442 L81 442 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M104 244 L97 432 M316 244 L323 432" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5"/>
        <path d="M102 250 L101 331 L122 316 L126 251 M318 250 L319 331 L298 316 L294 251" fill="${c.palette.hairShade}" opacity=".22"/>`;
    case 'curls':
      return `<path d="M91 233 C80 107 145 54 210 54 C280 54 343 110 330 233 L353 466 L295 442 L279 260 L141 260 L125 442 L67 466 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        ${[
          [88, 210, 31], [80, 272, 34], [78, 338, 35], [83, 402, 37], [99, 453, 31],
          [332, 210, 31], [340, 272, 34], [342, 338, 35], [337, 402, 37], [321, 453, 31]
        ].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`).join('')}
        <path d="M72 234 C59 285 68 344 80 391 M348 234 C361 285 352 344 340 391" fill="none" stroke="${c.palette.hairLight}" stroke-width="4" opacity=".45" stroke-linecap="round"/>`;
    case 'wolf':
      return `<path d="M95 230 L83 156 L116 177 L103 107 L143 148 L149 69 L187 118 L210 52 L233 118 L271 69 L277 148 L317 107 L304 177 L337 156 L325 230 L347 420 L300 432 L281 260 L139 260 L120 432 L73 420 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M118 126 L128 183 L151 160 M302 126 L292 183 L269 160" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".4"/>`;
    case 'wavy':
      return `<path d="M91 229 C80 107 145 54 210 54 C280 54 342 109 330 229 C344 293 327 338 349 396 C365 441 339 476 316 463 C299 453 316 486 293 479 C278 474 286 438 278 412 L280 260 L140 260 L142 412 C134 438 142 474 127 479 C104 486 121 453 104 463 C81 476 55 441 71 396 C93 338 76 293 91 229 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M107 245 C95 326 91 375 82 415 M313 245 C325 326 329 375 338 415" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".45"/>`;
    case 'spacebuns':
      return `${cap}
        <circle cx="113" cy="105" r="47" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="307" cy="105" r="47" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M83 95 C97 73 119 70 137 83 M287 84 C305 69 329 74 339 97" fill="none" stroke="${c.palette.hairLight}" stroke-width="5" opacity=".55" stroke-linecap="round"/>
        <ellipse cx="112" cy="139" rx="15" ry="9" fill="${c.palette.accent}" transform="rotate(20 112 139)"/>
        <ellipse cx="308" cy="139" rx="15" ry="9" fill="${c.palette.accent}" transform="rotate(-20 308 139)"/>`;
    case 'highpony':
      return `${cap}
        <path d="M307 103 C369 63 411 121 405 192 C400 245 380 284 353 311 C369 262 369 206 343 169 C327 146 312 134 293 127 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <path d="M334 109 C382 95 396 154 386 211" fill="none" stroke="${c.palette.hairLight}" stroke-width="5" opacity=".55" stroke-linecap="round"/>
        <path d="M293 115 C300 91 330 89 339 113 C344 129 325 141 309 134 C299 130 293 124 293 115 Z" fill="${c.palette.accent}" stroke="${c.palette.hairShade}" stroke-width="2"/>`;
    default:
      return cap;
  }
}

function bangs(style, uid, c) {
  const fill = `url(#${uid}-hair)`;
  const stroke = c.palette.hairShade;
  const common = `stroke="${stroke}" stroke-width="2" fill="${fill}"`;

  switch (style) {
    case 'side':
      return `<path d="M117 231 C114 138 153 94 210 94 C268 94 307 141 301 227 C284 192 258 168 227 158 C213 191 196 207 177 213 C160 198 145 186 136 181 C130 198 123 214 117 231 Z" ${common}/>
        <path d="M139 177 C166 187 190 207 198 235" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5" stroke-linecap="round"/>`;
    case 'curtain':
      return `<path d="M118 232 C115 143 149 96 210 96 C270 96 305 143 301 232 C287 200 268 174 243 160 C233 191 223 211 210 224 C197 209 186 190 177 160 C151 174 132 200 118 232 Z" ${common}/>
        <path d="M176 162 C181 186 189 207 207 224 M244 162 C239 187 231 207 213 224" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5"/>`;
    case 'hime':
      return `<path d="M119 230 C116 140 151 95 210 95 C269 95 304 140 301 230 L286 203 L279 229 L265 202 L257 228 L243 202 L235 226 L221 201 L213 225 L200 200 L190 226 L178 201 L169 228 L156 202 L145 228 L133 202 L119 230 Z" ${common}/>
        <path d="M137 168 C163 151 190 145 210 146 C232 145 260 152 283 170" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".45"/>`;
    case 'curly':
      return `<path d="M115 232 C112 146 149 96 210 96 C271 96 308 147 304 232 C293 203 276 180 256 169 C250 196 236 214 218 219 C205 204 195 186 190 168 C171 181 151 203 137 233 C132 207 124 217 115 232 Z" ${common}/>
        <circle cx="133" cy="154" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="171" cy="127" r="24" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="217" cy="118" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="261" cy="128" r="23" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="289" cy="158" r="21" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
    case 'spiky':
      return `<path d="M116 232 C113 141 149 95 210 95 C271 95 307 141 303 232 L284 194 L269 222 L256 179 L236 212 L219 170 L203 211 L186 171 L168 212 L151 180 L136 222 L122 193 Z" ${common}/>
        <path d="M143 166 C161 143 184 129 211 126" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5" stroke-linecap="round"/>`;
    default:
      return `<path d="M118 231 C116 140 151 95 210 95 C269 95 304 140 302 231 C288 200 271 181 248 168 C238 202 225 216 210 220 C193 216 180 201 170 168 C147 181 131 201 118 231 Z" ${common}/>
        <path d="M139 177 C166 186 187 202 201 224" fill="none" stroke="${c.palette.hairLight}" stroke-width="3" opacity=".5" stroke-linecap="round"/>`;
  }
}

function eyeShape(style) {
  const shapes = {
    doe: 'M-25 2 C-24 -21 -12 -32 3 -32 C19 -32 28 -18 27 2 C26 21 15 31 1 31 C-15 31 -25 19 -25 2 Z',
    sharp: 'M-26 7 C-18 -19 0 -30 20 -27 C30 -25 31 -14 27 -2 C20 23 5 30 -8 26 C-20 22 -27 16 -26 7 Z',
    sleepy: 'M-25 2 C-12 -17 10 -22 27 -6 C31 4 25 22 8 27 C-8 31 -22 19 -25 2 Z',
    sporty: 'M-25 4 C-21 -20 -4 -30 13 -28 C26 -27 29 -14 26 1 C22 23 7 30 -8 27 C-20 24 -26 16 -25 4 Z',
    cool: 'M-26 7 C-20 -11 0 -25 21 -20 C30 -18 31 -7 27 3 C20 24 4 30 -10 25 C-21 21 -27 15 -26 7 Z',
    cat: 'M-26 9 C-17 -17 4 -30 24 -22 C32 -18 30 -7 26 3 C19 24 2 31 -12 25 C-22 21 -28 16 -26 9 Z',
    warm: 'M-25 2 C-21 -20 -5 -31 12 -30 C26 -29 29 -15 26 2 C23 23 7 31 -8 28 C-20 25 -25 16 -25 2 Z',
    soft: 'M-25 1 C-23 -20 -9 -31 5 -31 C21 -31 29 -18 27 1 C25 21 13 30 -2 30 C-16 30 -25 18 -25 1 Z',
    galaxy: 'M-26 2 C-24 -22 -7 -33 8 -33 C24 -33 31 -18 28 2 C25 24 11 32 -4 31 C-19 30 -26 18 -26 2 Z',
    fierce: 'M-26 8 C-17 -20 2 -31 22 -27 C32 -25 31 -12 27 -1 C20 24 3 31 -10 26 C-21 22 -28 17 -26 8 Z'
  };
  return shapes[style] || shapes.doe;
}

function lashPath(style) {
  const paths = {
    doe: 'M-27 1 C-22 -22 -4 -35 24 -20',
    sharp: 'M-28 8 C-19 -18 2 -31 28 -19',
    sleepy: 'M-27 0 C-13 -17 12 -20 28 -4',
    sporty: 'M-27 3 C-19 -21 2 -32 27 -19',
    cool: 'M-27 7 C-18 -13 2 -27 28 -17',
    cat: 'M-28 9 C-17 -16 6 -29 29 -17',
    warm: 'M-27 2 C-20 -22 -2 -33 27 -19',
    soft: 'M-27 1 C-21 -23 -4 -33 27 -20',
    galaxy: 'M-27 2 C-20 -24 0 -35 29 -21',
    fierce: 'M-28 9 C-17 -18 3 -31 28 -20'
  };
  return paths[style] || paths.doe;
}

function eye(uid, cx, cy, side, c, style) {
  const shape = eyeShape(style);
  const lash = lashPath(style);
  const flip = side === 'right' ? -1 : 1;
  const wing = ['cat', 'sharp', 'fierce'].includes(style)
    ? `<path d="M${23 * flip} -19 Q${35 * flip} -23 ${41 * flip} -15" fill="none" stroke="${c.palette.ink}" stroke-width="5" stroke-linecap="round"/>`
    : '';
  const lower = style === 'sleepy'
    ? `<path d="M-20 24 Q0 30 22 18" fill="none" stroke="${c.palette.ink}" stroke-width="2.5" opacity=".65" stroke-linecap="round"/>`
    : `<path d="M-16 27 Q0 31 18 25" fill="none" stroke="${c.palette.hairShade}" stroke-width="2" opacity=".5" stroke-linecap="round"/>`;

  return `<g transform="translate(${cx} ${cy}) scale(${flip} 1)">
    <clipPath id="${uid}-eye-${side}"><path d="${shape}"/></clipPath>
    <path d="${shape}" fill="#fffdfb" stroke="${c.palette.ink}" stroke-width="2.5"/>
    <g clip-path="url(#${uid}-eye-${side})">
      <ellipse cx="3" cy="2" rx="16" ry="23" fill="url(#${uid}-iris)"/>
      <ellipse cx="3" cy="2" rx="16" ry="23" fill="none" stroke="${c.palette.eye}" stroke-width="2" opacity=".7"/>
      <ellipse cx="3" cy="3" rx="7" ry="13" fill="${c.palette.ink}"/>
      <ellipse cx="12" cy="11" rx="5" ry="7" fill="${c.palette.eye}" opacity=".55"/>
      <circle cx="-5" cy="-9" r="6" fill="#ffffff"/>
      <circle cx="12" cy="-4" r="3" fill="#ffffff" opacity=".9"/>
      <circle cx="5" cy="14" r="2.4" fill="#ffffff" opacity=".8"/>
      <path d="M-20 -23 Q3 -37 27 -16 L27 -28 L-20 -28 Z" fill="${c.palette.ink}" opacity=".13"/>
    </g>
    <path d="${lash}" fill="none" stroke="${c.palette.ink}" stroke-width="6.5" stroke-linecap="round"/>
    ${wing}
    ${lower}
    <path d="M-20 -37 Q0 -45 23 -37" fill="none" stroke="${c.palette.hairShade}" stroke-width="4.5" opacity=".75" stroke-linecap="round"/>
  </g>`;
}

function mouthShape(style, c) {
  const lip = c.palette.ink;
  const accent = c.palette.accent;
  switch (style) {
    case 'grin':
      return `<path d="M194 299 Q210 325 226 299 Q210 312 194 299 Z" fill="${lip}" stroke="${lip}" stroke-width="2"/>
        <path d="M201 311 Q210 318 219 311" fill="${accent}" opacity=".8"/>
        <path d="M226 299 Q232 300 234 296" fill="none" stroke="${lip}" stroke-width="2.5" stroke-linecap="round"/>`;
    case 'smirk':
      return `<path d="M196 303 Q212 316 229 302" fill="none" stroke="${lip}" stroke-width="5" stroke-linecap="round"/>
        <path d="M228 302 Q234 300 236 296" fill="none" stroke="${lip}" stroke-width="3" stroke-linecap="round"/>`;
    case 'soft':
      return `<path d="M198 303 Q210 310 222 303" fill="none" stroke="${lip}" stroke-width="4" stroke-linecap="round"/>
        <path d="M202 316 Q210 320 218 316" fill="none" stroke="${accent}" stroke-width="2.5" opacity=".6" stroke-linecap="round"/>`;
    case 'cat':
      return `<path d="M194 299 Q202 308 210 301 Q218 308 226 299" fill="none" stroke="${lip}" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M195 299 L198 306 L201 299" fill="#fff" stroke="${lip}" stroke-width="1"/>
        <path d="M219 299 L222 306 L225 299" fill="#fff" stroke="${lip}" stroke-width="1"/>`;
    case 'fierce':
      return `<path d="M193 300 Q210 321 228 300 Q210 306 193 300 Z" fill="${lip}" stroke="${lip}" stroke-width="2"/>
        <path d="M200 310 Q210 315 220 310" fill="none" stroke="#fff7f8" stroke-width="2" opacity=".7"/>`;
    case 'sleepy':
      return `<path d="M200 305 Q210 309 220 304" fill="none" stroke="${lip}" stroke-width="4" stroke-linecap="round"/>`;
    default:
      return `<path d="M195 302 Q210 314 225 302" fill="none" stroke="${lip}" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M201 315 Q210 319 219 315" fill="none" stroke="${accent}" stroke-width="2.5" opacity=".55" stroke-linecap="round"/>`;
  }
}

function accessory(kind, c, uid) {
  const accent = c.palette.accent;
  const accent2 = c.palette.accent2;
  const ink = c.palette.ink;
  switch (kind) {
    case 'heart':
      return `<g transform="rotate(-12 300 170)">
        <path d="${heartPath(300, 167, 1.05)}" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <path d="M292 158 Q294 153 300 156" fill="none" stroke="${accent2}" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <path d="${heartPath(126, 300, .48)}" fill="${accent}" opacity=".8"/>`;
    case 'headset':
      return `<path d="M104 221 C96 122 152 73 210 73 C270 73 327 120 320 221" fill="none" stroke="${ink}" stroke-width="15" stroke-linecap="round"/>
        <path d="M107 216 C100 126 154 81 210 81 C267 81 322 126 316 216" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
        <rect x="84" y="205" width="42" height="74" rx="20" fill="${ink}" stroke="${accent}" stroke-width="3"/>
        <rect x="296" y="205" width="42" height="74" rx="20" fill="${ink}" stroke="${accent}" stroke-width="3"/>
        <path d="M312 279 Q312 320 276 327" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="275" cy="327" rx="12" ry="8" fill="${accent}" transform="rotate(-10 275 327)"/>
        <circle cx="105" cy="242" r="9" fill="${accent}"/>
        <path d="M108 233 L108 251 M99 242 L117 242" stroke="${ink}" stroke-width="2"/>`;
    case 'stars':
      return `<polygon points="${starPoints(305, 163, 17, 7)}" fill="${accent}" stroke="${ink}" stroke-width="1.5"/>
        <polygon points="${starPoints(129, 151, 11, 4.5)}" fill="${accent2}" stroke="${ink}" stroke-width="1.2"/>
        <polygon points="${starPoints(330, 232, 8, 3.5)}" fill="${accent2}" opacity=".85"/>
        <path d="M105 87 L109 100 L122 104 L109 108 L105 121 L101 108 L88 104 L101 100 Z" fill="${accent}" opacity=".7"/>`;
    case 'headband':
      return `<path d="M117 178 C146 144 178 133 210 133 C245 133 279 146 304 178" fill="none" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>
        <path d="M117 178 C146 144 178 133 210 133 C245 133 279 146 304 178" fill="none" stroke="${accent}" stroke-width="11" stroke-linecap="round"/>
        <path d="M209 133 L209 119 M199 123 L219 123" stroke="${accent2}" stroke-width="3" opacity=".8"/>`;
    case 'snowflake':
      return `<g transform="translate(306 163)" stroke="${accent}" stroke-width="4" stroke-linecap="round">
        <path d="M0 -18 L0 18 M-16 -9 L16 9 M-16 9 L16 -9"/>
        <path d="M0 -18 L-5 -12 M0 -18 L5 -12 M0 18 L-5 12 M0 18 L5 12"/>
        <path d="M-16 -9 L-8 -9 M-16 -9 L-12 -15 M16 9 L8 9 M16 9 L12 15"/>
      </g>
      <circle cx="121" cy="316" r="10" fill="none" stroke="${accent}" stroke-width="5"/>
      <circle cx="299" cy="316" r="10" fill="none" stroke="${accent}" stroke-width="5"/>`;
    case 'hoops':
      return `<circle cx="118" cy="319" r="21" fill="none" stroke="${accent}" stroke-width="5"/>
        <circle cx="302" cy="319" r="21" fill="none" stroke="${accent}" stroke-width="5"/>
        <circle cx="118" cy="319" r="3" fill="${accent2}"/>
        <circle cx="302" cy="319" r="3" fill="${accent2}"/>
        <path d="${heartPath(305, 171, .7)}" fill="${accent}" opacity=".9"/>`;
    case 'choker':
      return `<path d="M171 377 Q210 391 249 377 L247 392 Q210 406 173 392 Z" fill="${ink}" stroke="${accent}" stroke-width="2"/>
        <path d="${heartPath(210, 394, .42)}" fill="${accent}"/>
        <path d="M112 195 L95 150 L75 165" fill="none" stroke="${accent}" stroke-width="3" opacity=".55"/>
        <circle cx="73" cy="166" r="4" fill="${accent}"/>`;
    case 'flowers':
      return `<g>
        ${[[126, 154, 13], [151, 126, 15], [188, 112, 13], [231, 112, 13], [269, 126, 15], [294, 154, 13]].map(([x, y, r], i) => `
          <circle cx="${x + r * .75}" cy="${y}" r="${r * .72}" fill="${i % 2 ? accent2 : '#fff4ea'}" opacity=".96"/>
          <circle cx="${x - r * .75}" cy="${y}" r="${r * .72}" fill="${i % 2 ? accent2 : '#fff4ea'}" opacity=".96"/>
          <circle cx="${x}" cy="${y - r * .8}" r="${r * .72}" fill="${i % 2 ? accent2 : '#fff4ea'}" opacity=".96"/>
          <circle cx="${x}" cy="${y + r * .65}" r="${r * .7}" fill="${i % 2 ? accent2 : '#fff4ea'}" opacity=".9"/>
          <circle cx="${x}" cy="${y}" r="${r * .6}" fill="${accent}" stroke="${ink}" stroke-width="1"/>
        `).join('')}
        <path d="M106 161 Q128 137 155 124" fill="none" stroke="${c.palette.hairShade}" stroke-width="4" opacity=".4"/>
      </g>`;
    case 'cat':
      return `<path d="M104 117 L135 63 L161 121 Z" fill="${c.palette.hairShade}" stroke="${ink}" stroke-width="3"/>
        <path d="M316 117 L285 63 L259 121 Z" fill="${c.palette.hairShade}" stroke="${ink}" stroke-width="3"/>
        <path d="M116 111 L135 79 L149 116 Z" fill="${accent2}" opacity=".75"/>
        <path d="M304 111 L285 79 L271 116 Z" fill="${accent2}" opacity=".75"/>
        <path d="M108 211 C101 126 150 84 210 84 C270 84 320 126 312 211" fill="none" stroke="${ink}" stroke-width="13" stroke-linecap="round"/>
        <path d="M108 211 C101 126 150 84 210 84 C270 84 320 126 312 211" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
        <path d="M141 302 L117 296 M141 310 L115 312 M279 302 L303 296 M279 310 L305 312" stroke="${ink}" stroke-width="2" opacity=".35" stroke-linecap="round"/>`;
    case 'shades':
      return `<path d="M137 157 Q210 139 283 157" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <path d="M137 157 Q210 139 283 157" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
        <path d="M147 160 Q174 168 204 160 L200 182 Q169 188 151 177 Z" fill="${ink}" opacity=".9"/>
        <path d="M216 160 Q246 168 273 160 L269 177 Q251 188 220 182 Z" fill="${ink}" opacity=".9"/>
        <path d="M159 167 L183 165 M228 165 L252 167" stroke="${accent2}" stroke-width="3" opacity=".55"/>`;
    default:
      return '';
  }
}

function outfit(style, c, uid) {
  const fill = `url(#${uid}-outfit)`;
  const ink = c.palette.ink;
  const accent = c.palette.accent;
  const light = c.palette.accent2;

  const shoulders = `<path d="M71 520 C76 453 115 407 166 392 L183 379 L237 379 L254 392 C305 407 344 453 349 520 Z" fill="${fill}" stroke="${ink}" stroke-width="2"/>`;
  const neck = `<path d="M181 338 L181 374 C181 395 239 395 239 374 L239 338 Z" fill="${c.palette.skin}" stroke="${ink}" stroke-width="2" opacity=".95"/>`;
  const neckShade = `<path d="M181 338 L181 361 C197 373 223 373 239 361 L239 338 Z" fill="${ink}" opacity=".1"/>`;

  switch (style) {
    case 'sailor':
      return `${shoulders}${neck}${neckShade}
        <path d="M166 394 L210 435 L254 394 L238 386 L210 408 L182 386 Z" fill="${light}" stroke="${ink}" stroke-width="2"/>
        <path d="M178 391 L210 429 L242 391 L227 389 L210 408 L193 389 Z" fill="${accent}" opacity=".9"/>
        <path d="M210 408 L202 432 L210 443 L218 432 Z" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <path d="M166 394 Q144 436 127 520 M254 394 Q276 436 293 520" fill="none" stroke="${light}" stroke-width="4" opacity=".8"/>
        <path d="M117 486 Q210 509 303 486" fill="none" stroke="${accent}" stroke-width="3" opacity=".5"/>`;
    case 'hoodie':
      return `${shoulders}${neck}${neckShade}
        <path d="M156 387 C167 342 253 342 264 387 C258 414 162 414 156 387 Z" fill="${accent}" opacity=".33"/>
        <path d="M171 396 Q210 423 249 396" fill="none" stroke="${light}" stroke-width="3" opacity=".65"/>
        <path d="M157 388 L156 478 M263 388 L264 478" fill="none" stroke="${light}" stroke-width="2.5" opacity=".55"/>
        <circle cx="158" cy="475" r="5" fill="${accent}" stroke="${ink}" stroke-width="1.5"/>
        <circle cx="262" cy="475" r="5" fill="${accent}" stroke="${ink}" stroke-width="1.5"/>
        <path d="M137 468 Q210 445 283 468 L278 514 Q210 492 142 514 Z" fill="${accent}" opacity=".2" stroke="${light}" stroke-width="2"/>
        <path d="M305 407 Q317 448 316 520" fill="none" stroke="${light}" stroke-width="3" opacity=".5"/>`;
    case 'sweater':
      return `${shoulders}${neck}${neckShade}
        <path d="M173 388 Q210 404 247 388" fill="none" stroke="${light}" stroke-width="8" stroke-linecap="round" opacity=".6"/>
        <path d="M126 421 Q147 459 143 520 M294 421 Q273 459 277 520" fill="none" stroke="${ink}" stroke-width="2" opacity=".15"/>
        <path d="M178 438 Q210 453 242 438" fill="none" stroke="${light}" stroke-width="2.5" opacity=".55"/>
        <circle cx="210" cy="443" r="4" fill="${accent}" opacity=".75"/>`;
    case 'track':
      return `${shoulders}${neck}${neckShade}
        <path d="M210 406 L210 520" stroke="${ink}" stroke-width="3" opacity=".5"/>
        <path d="M175 392 L210 432 L245 392" fill="none" stroke="${light}" stroke-width="5"/>
        <path d="M143 414 Q132 468 139 520 M277 414 Q288 468 281 520" fill="none" stroke="${light}" stroke-width="5" opacity=".65"/>
        <path d="M104 448 Q130 478 129 520 M316 448 Q290 478 291 520" fill="none" stroke="${accent}" stroke-width="4" opacity=".7"/>
        <path d="M193 401 L227 401 L227 412 L193 412 Z" fill="${light}" opacity=".9"/>`;
    case 'blazer':
      return `${shoulders}${neck}${neckShade}
        <path d="M168 390 L210 456 L252 390 L232 383 L210 423 L188 383 Z" fill="#fffaf8" stroke="${ink}" stroke-width="2"/>
        <path d="M168 390 L189 456 L153 520 L127 520 L142 443 Z" fill="${fill}" stroke="${ink}" stroke-width="2"/>
        <path d="M252 390 L231 456 L267 520 L293 520 L278 443 Z" fill="${fill}" stroke="${ink}" stroke-width="2"/>
        <path d="M210 423 L201 456 L210 469 L219 456 Z" fill="${accent}"/>
        <path d="M187 448 L177 520 M233 448 L243 520" fill="none" stroke="${light}" stroke-width="2" opacity=".5"/>`;
    case 'jacket':
      return `${shoulders}${neck}${neckShade}
        <path d="M163 394 L210 457 L257 394 L241 385 L210 423 L179 385 Z" fill="${light}" stroke="${ink}" stroke-width="2" opacity=".9"/>
        <path d="M154 395 L184 520 L135 520 L129 446 Z" fill="${accent}" opacity=".3" stroke="${ink}" stroke-width="2"/>
        <path d="M266 395 L236 520 L285 520 L291 446 Z" fill="${accent}" opacity=".3" stroke="${ink}" stroke-width="2"/>
        <path d="M122 473 Q210 490 298 473" fill="none" stroke="${light}" stroke-width="3" opacity=".55"/>`;
    case 'leather':
      return `${shoulders}${neck}${neckShade}
        <path d="M164 393 L210 462 L256 393 L237 384 L210 425 L183 384 Z" fill="${ink}" stroke="${accent}" stroke-width="2"/>
        <path d="M164 393 L190 520 L129 520 L125 442 Z" fill="${fill}" stroke="${accent}" stroke-width="2"/>
        <path d="M256 393 L230 520 L291 520 L295 442 Z" fill="${fill}" stroke="${accent}" stroke-width="2"/>
        <path d="M210 430 L210 520" stroke="${accent}" stroke-width="3" opacity=".65"/>
        <path d="M131 441 L121 520 M289 441 L299 520" fill="none" stroke="${light}" stroke-width="2" opacity=".45"/>
        <path d="M205 456 L215 456 L215 463 L205 463 Z" fill="${accent}"/>`;
    case 'sundress':
      return `${shoulders}${neck}${neckShade}
        <path d="M158 403 L132 520 L288 520 L262 403 Q238 423 210 424 Q182 423 158 403 Z" fill="${light}" stroke="${ink}" stroke-width="2"/>
        <path d="M158 403 L173 520 M262 403 L247 520" fill="none" stroke="${accent}" stroke-width="2" opacity=".45"/>
        <path d="M181 394 Q177 369 166 356 M239 394 Q243 369 254 356" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="187" cy="469" r="4" fill="${accent}"/><circle cx="206" cy="486" r="3" fill="${accent}"/><circle cx="230" cy="459" r="3.5" fill="${accent}"/>`;
    case 'varsity':
      return `${shoulders}${neck}${neckShade}
        <path d="M163 391 L210 460 L257 391 L237 383 L210 421 L183 383 Z" fill="#fbf8f1" stroke="${ink}" stroke-width="2"/>
        <path d="M163 391 L184 520 L127 520 L123 440 Z" fill="${fill}" stroke="${ink}" stroke-width="2"/>
        <path d="M257 391 L236 520 L293 520 L297 440 Z" fill="${fill}" stroke="${ink}" stroke-width="2"/>
        <path d="M125 476 L184 520 M295 476 L236 520" fill="none" stroke="${accent}" stroke-width="8"/>
        <path d="M210 421 L201 456 L210 471 L219 456 Z" fill="${accent}" stroke="${ink}" stroke-width="1.5"/>
        <path d="M144 436 Q153 446 146 462" fill="none" stroke="${light}" stroke-width="3" opacity=".5"/>`;
    default:
      return `${shoulders}${neck}${neckShade}`;
  }
}

function sparkles(c) {
  return `<g opacity=".85">
    <path d="M69 311 L73 323 L85 327 L73 331 L69 343 L65 331 L53 327 L65 323 Z" fill="${c.palette.accent2}"/>
    <path d="M352 273 L355 282 L364 285 L355 288 L352 297 L349 288 L340 285 L349 282 Z" fill="${c.palette.accent}"/>
    <circle cx="58" cy="255" r="4" fill="${c.palette.accent2}" opacity=".8"/>
    <circle cx="365" cy="338" r="3" fill="${c.palette.accent2}" opacity=".7"/>
    <circle cx="351" cy="91" r="5" fill="${c.palette.accent}" opacity=".6"/>
    <circle cx="74" cy="117" r="3" fill="${c.palette.accent2}" opacity=".8"/>
  </g>`;
}

const mouthByStyle = {
  doe: 'smile', sharp: 'smirk', sleepy: 'sleepy', sporty: 'grin', cool: 'soft',
  cat: 'cat', warm: 'smile', soft: 'soft', galaxy: 'cat', fierce: 'fierce'
};

export function portrait(character, options = {}) {
  const c = character;
  const uid = `p${++portraitCount}`;
  const look = c.look || {};
  const eyeStyle = look.eyeStyle || 'doe';
  const mouth = mouthByStyle[eyeStyle] || 'smile';
  const title = options.decorative ? '' : `<title>${esc(c.name)}</title>`;
  const label = options.decorative ? 'aria-hidden="true"' : `role="img" aria-label="${esc(c.name)} portrait"`;

  return `<svg class="portrait-svg" viewBox="0 0 420 520" ${label} xmlns="http://www.w3.org/2000/svg">
    ${title}
    <defs>
      <linearGradient id="${uid}-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c.palette.bg1}"/>
        <stop offset=".56" stop-color="${c.palette.accent}"/>
        <stop offset="1" stop-color="${c.palette.bg2}"/>
      </linearGradient>
      <radialGradient id="${uid}-halo" cx=".5" cy=".42" r=".55">
        <stop offset="0" stop-color="${c.palette.accent2}" stop-opacity=".8"/>
        <stop offset=".7" stop-color="${c.palette.accent}" stop-opacity=".12"/>
        <stop offset="1" stop-color="${c.palette.bg2}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${uid}-hair" x1=".18" y1="0" x2=".82" y2="1">
        <stop offset="0" stop-color="${c.palette.hairLight}"/>
        <stop offset=".28" stop-color="${c.palette.hair}"/>
        <stop offset="1" stop-color="${c.palette.hairShade}"/>
      </linearGradient>
      <radialGradient id="${uid}-iris" cx=".42" cy=".3" r=".75">
        <stop offset="0" stop-color="${c.palette.accent2}"/>
        <stop offset=".35" stop-color="${c.palette.eye}"/>
        <stop offset="1" stop-color="${c.palette.ink}"/>
      </radialGradient>
      <linearGradient id="${uid}-outfit" x1="0" y1=".1" x2=".9" y2="1">
        <stop offset="0" stop-color="${c.palette.outfit1}"/>
        <stop offset="1" stop-color="${c.palette.outfit2}"/>
      </linearGradient>
      <radialGradient id="${uid}-blush" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="${c.palette.accent}" stop-opacity=".55"/>
        <stop offset="1" stop-color="${c.palette.accent}" stop-opacity="0"/>
      </radialGradient>
      <filter id="${uid}-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="9"/>
      </filter>
      <pattern id="${uid}-dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="${c.palette.ink}" opacity=".2"/>
      </pattern>
      <clipPath id="${uid}-face">
        <path d="M210 120 C268 120 300 165 300 222 C300 286 272 332 210 357 C148 332 120 286 120 222 C120 165 152 120 210 120 Z"/>
      </clipPath>
      <clipPath id="${uid}-frame"><rect width="420" height="520" rx="0"/></clipPath>
    </defs>
    <g clip-path="url(#${uid}-frame)">
      <rect width="420" height="520" fill="url(#${uid}-bg)"/>
      <rect width="420" height="520" fill="url(#${uid}-dots)" opacity=".45"/>
      <circle cx="210" cy="225" r="194" fill="url(#${uid}-halo)"/>
      <circle cx="210" cy="238" r="174" fill="none" stroke="${c.palette.accent2}" stroke-width="2" opacity=".4"/>
      <circle cx="210" cy="238" r="193" fill="none" stroke="${c.palette.accent2}" stroke-width="1" opacity=".25" stroke-dasharray="4 14"/>
      <path d="M15 438 Q80 401 54 338" fill="none" stroke="${c.palette.accent2}" stroke-width="2" opacity=".25"/>
      <path d="M405 409 Q354 376 376 314" fill="none" stroke="${c.palette.accent2}" stroke-width="2" opacity=".2"/>
      <g class="portrait-aura" opacity=".55" filter="url(#${uid}-soft)">
        <circle cx="210" cy="235" r="118" fill="${c.palette.accent2}" opacity=".24"/>
      </g>
      <g class="hair-back">${backHair(look.hairStyle, uid, c)}</g>
      <g class="outfit">${outfit(look.outfit, c, uid)}</g>
      <g class="face">
        <ellipse cx="125" cy="256" rx="18" ry="29" fill="${c.palette.skin}" stroke="${c.palette.ink}" stroke-width="2"/>
        <ellipse cx="295" cy="256" rx="18" ry="29" fill="${c.palette.skin}" stroke="${c.palette.ink}" stroke-width="2"/>
        <path d="M210 120 C268 120 300 165 300 222 C300 286 272 332 210 357 C148 332 120 286 120 222 C120 165 152 120 210 120 Z" fill="${c.palette.skin}" stroke="${c.palette.ink}" stroke-width="2.5"/>
        <g clip-path="url(#${uid}-face)">
          <ellipse cx="157" cy="278" rx="34" ry="23" fill="url(#${uid}-blush)"/>
          <ellipse cx="263" cy="278" rx="34" ry="23" fill="url(#${uid}-blush)"/>
          <path d="M120 204 C145 194 168 196 186 209 L184 327 C158 321 136 302 122 273 Z" fill="${c.palette.ink}" opacity=".055"/>
          <path d="M210 120 C268 120 300 165 300 222 C300 257 292 286 278 309 C284 273 286 242 278 218 C269 188 246 164 210 154 C174 164 151 188 142 218 C134 242 136 273 142 309 C128 286 120 257 120 222 C120 165 152 120 210 120 Z" fill="${c.palette.ink}" opacity=".05"/>
        </g>
        ${eye(uid, 172, 247, 'left', c, eyeStyle)}
        ${eye(uid, 248, 247, 'right', c, eyeStyle)}
        <path d="M209 271 Q214 279 207 282" fill="none" stroke="${c.palette.hairShade}" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
        <g class="mouth-group">${mouthShape(mouth, c)}</g>
        ${['hoops', 'flowers', 'stars'].includes(look.accessory) ? `<g opacity=".55">
          ${[[165, 289], [255, 289], [176, 296], [244, 296]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="${c.palette.hairShade}"/>`).join('')}
        </g>` : ''}
      </g>
      <g class="hair-front">${bangs(look.bangs, uid, c)}</g>
      <g class="accessory">${accessory(look.accessory, c, uid)}</g>
      ${sparkles(c)}
      <g opacity=".9">
        <path d="M52 472 Q210 500 368 472" fill="none" stroke="${c.palette.accent2}" stroke-width="1.5" opacity=".4"/>
        <circle cx="210" cy="490" r="3" fill="${c.palette.accent2}" opacity=".7"/>
      </g>
    </g>
  </svg>`;
}

export function faceIcon(character) {
  return `<span class="face-icon">${portrait(character, { decorative: true })}</span>`;
}
