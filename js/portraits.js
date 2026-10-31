/* ------------------------------------------------------------------
   Hand-built SVG portraits. No external image assets, no licensing
   surprises, and every girl gets her own silhouette and palette.
------------------------------------------------------------------- */

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

function mix(hex, target, amount) {
  const a = hex.replace('#', '');
  const b = target.replace('#', '');
  const parse = (s) => [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  return `#${[ar + (br - ar) * amount, ag + (bg - ag) * amount, ab + (bb - ab) * amount]
    .map((v) => clamp(v).toString(16).padStart(2, '0'))
    .join('')}`;
}

function heart(cx, cy, size, color, rotate = 0) {
  return `<path d="M0 ${size * 0.35} C${-size * 0.95} ${-size * 0.28} ${-size * 0.55} ${-size * 0.95} 0 ${-size * 0.42} C${size * 0.55} ${-size * 0.95} ${size * 0.95} ${-size * 0.28} 0 ${size * 0.35}Z" fill="${color}" transform="translate(${cx} ${cy}) rotate(${rotate})"/>`;
}

function sparkle(cx, cy, size, color, opacity = 1) {
  return `<path d="M${cx} ${cy - size} L${cx + size * 0.22} ${cy - size * 0.22} L${cx + size} ${cy} L${cx + size * 0.22} ${cy + size * 0.22} L${cx} ${cy + size} L${cx - size * 0.22} ${cy + size * 0.22} L${cx - size} ${cy} L${cx - size * 0.22} ${cy - size * 0.22}Z" fill="${color}" opacity="${opacity}"/>`;
}

function backdrop(art, u) {
  return `
    <rect width="400" height="520" fill="url(#${u}-bg)"/>
    <circle cx="200" cy="205" r="156" fill="url(#${u}-halo)" opacity=".78"/>
    <circle cx="200" cy="205" r="157" fill="none" stroke="#fff" stroke-opacity=".28"/>
    <circle cx="200" cy="205" r="119" fill="none" stroke="#fff" stroke-opacity=".16" stroke-dasharray="2 9"/>
    <path d="M0 430 C85 395 151 448 221 427 C292 406 343 430 400 410 L400 520 L0 520Z" fill="#170b19" opacity=".16"/>
    <g opacity=".52">
      ${sparkle(63, 96, 11, '#fff', 0.75)}
      ${sparkle(330, 145, 7, art.accent2 ? '#fff' : '#fff', 0.6)}
      ${sparkle(300, 72, 5, '#fff', 0.45)}
      ${sparkle(82, 294, 4, '#fff', 0.4)}
    </g>
    <g fill="#fff" opacity=".14">
      <circle cx="42" cy="195" r="2.4"/><circle cx="54" cy="208" r="1.6"/><circle cx="37" cy="217" r="1.2"/>
      <circle cx="345" cy="264" r="2.1"/><circle cx="358" cy="250" r="1.4"/><circle cx="329" cy="292" r="1.2"/>
      <circle cx="70" cy="340" r="1.3"/><circle cx="335" cy="334" r="1.8"/>
    </g>
    <path d="M34 520 C37 446 26 389 47 324" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="1"/>
    <path d="M366 520 C363 446 374 389 353 324" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="1"/>
  `;
}

function neck(art) {
  return `
    <path d="M177 262 L177 326 Q200 344 223 326 L223 262Z" fill="${art.skin}"/>
    <path d="M177 279 Q198 299 223 279 L223 323 Q200 340 177 323Z" fill="${art.skinShade}" opacity=".34"/>
    <ellipse cx="200" cy="292" rx="32" ry="10" fill="${art.skinShade}" opacity=".2"/>
  `;
}

function body(art, c, u) {
  const o = art.outfit;
  const d = art.outfitDark;
  const skinN = mix(art.skin, '#ffffff', 0.08);
  const neckline = {
    hoodie: `
      <path d="M156 326 C161 359 239 359 244 326 C229 309 171 309 156 326Z" fill="${d}" opacity=".9"/>
      <path d="M184 356 L181 424" stroke="${mix(o, '#000000', 0.2)}" stroke-width="3" stroke-linecap="round"/>
      <path d="M216 356 L219 424" stroke="${mix(o, '#000000', 0.2)}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="181" cy="427" r="4" fill="${art.blush}"/><circle cx="219" cy="427" r="4" fill="${art.blush}"/>
      <path d="M143 427 Q200 449 257 427" fill="none" stroke="${d}" stroke-width="2" opacity=".6"/>`,
    blazer: `
      <path d="M167 326 L200 397 L233 326 L247 333 L229 520 L171 520 L153 333Z" fill="${mix(o, '#ffffff', 0.16)}"/>
      <path d="M200 397 L187 426 L200 458 L213 426Z" fill="${d}"/>
      <path d="M161 327 L200 407 L176 435 L139 359Z" fill="${d}"/>
      <path d="M239 327 L200 407 L224 435 L261 359Z" fill="${d}"/>
      <circle cx="200" cy="447" r="3" fill="${art.accent2 || '#fff'}" opacity=".75"/>`,
    dress: `
      <path d="M151 336 Q200 382 249 336 Q239 393 200 407 Q161 393 151 336Z" fill="${d}"/>
      <path d="M158 331 Q200 363 242 331" fill="none" stroke="${mix(o, '#ffffff', 0.22)}" stroke-width="2"/>
      <path d="M200 402 L200 446" stroke="${mix(o, '#ffffff', 0.2)}" stroke-width="1.5"/>
      <circle cx="200" cy="433" r="4" fill="${art.accent2 || '#ffffff'}" opacity=".85"/>
      ${heart(200, 454, 7, art.accent || art.blush, 0)}`,
    tank: `
      <path d="M160 326 C177 365 223 365 240 326 L250 334 C235 383 165 383 150 334Z" fill="${skinN}"/>
      <path d="M157 333 C177 370 223 370 243 333" fill="none" stroke="${d}" stroke-width="2" opacity=".7"/>
      <path d="M166 328 L178 309" stroke="${o}" stroke-width="9" stroke-linecap="round"/>
      <path d="M234 328 L222 309" stroke="${o}" stroke-width="9" stroke-linecap="round"/>
      <path d="M134 405 Q200 425 266 405" fill="none" stroke="${d}" stroke-width="2" opacity=".5"/>`,
    apron: `
      <path d="M169 335 Q200 360 231 335 L242 520 L158 520Z" fill="${mix(art.outfit, '#ffffff', 0.5)}"/>
      <path d="M172 340 L156 520 M228 340 L244 520" stroke="${d}" stroke-width="2" opacity=".5"/>
      <path d="M168 339 L154 520 M232 339 L246 520" fill="none" stroke="${art.accent}" stroke-width="5" opacity=".85"/>
      <path d="M174 432 Q200 449 226 432 L225 467 Q200 480 175 467Z" fill="${d}" opacity=".36"/>
      <path d="M200 338 L200 520" stroke="${d}" stroke-width="1.4" opacity=".35"/>
      ${heart(213, 408, 5, art.blush, 12)}`,
    jacket: `
      <path d="M163 326 L200 392 L178 415 L150 354Z" fill="${d}"/>
      <path d="M237 326 L200 392 L222 415 L250 354Z" fill="${d}"/>
      <path d="M182 340 Q200 365 218 340 L211 422 L189 422Z" fill="${mix(o, '#ffffff', 0.08)}"/>
      <path d="M200 398 L200 520" stroke="${mix(o, '#ffffff', 0.38)}" stroke-width="2" stroke-dasharray="3 4"/>
      <circle cx="208" cy="378" r="2.5" fill="#d9e7ec"/><circle cx="208" cy="392" r="2.5" fill="#d9e7ec"/>
      <circle cx="208" cy="406" r="2.5" fill="#d9e7ec"/>
      <path d="M138 370 L148 366 M137 382 L148 378" stroke="#d9e7ec" stroke-width="2" opacity=".65"/>`,
    corset: `
      <path d="M156 344 Q200 369 244 344 L253 466 Q200 504 147 466Z" fill="${d}"/>
      <path d="M158 344 Q200 366 242 344" fill="none" stroke="${art.accent}" stroke-width="2" opacity=".8"/>
      <path d="M177 365 L164 460 M223 365 L236 460" stroke="${art.accent}" stroke-width="1.4" opacity=".65"/>
      <path d="M180 380 L220 400 M180 405 L220 425 M180 430 L220 450 M180 455 L220 475" stroke="${art.accent}" stroke-width="1.2" opacity=".52"/>
      <g fill="${art.accent}" opacity=".85">
        <circle cx="177" cy="372" r="2"/><circle cx="223" cy="372" r="2"/>
        <circle cx="174" cy="398" r="2"/><circle cx="226" cy="398" r="2"/>
        <circle cx="171" cy="424" r="2"/><circle cx="229" cy="424" r="2"/>
        <circle cx="168" cy="450" r="2"/><circle cx="232" cy="450" r="2"/>
      </g>`,
    tee: `
      <path d="M161 328 Q200 363 239 328 L247 338 Q231 380 169 380 L153 338Z" fill="${skinN}"/>
      <path d="M160 329 Q200 366 240 329" fill="none" stroke="${d}" stroke-width="2.5"/>
      ${heart(200, 431, 15, art.accent || art.blush, 0)}
      <path d="M119 405 Q200 433 281 405" fill="none" stroke="${d}" stroke-width="1.4" opacity=".5"/>`,
    stage: `
      <path d="M142 343 Q200 395 258 343 Q252 406 200 426 Q148 406 142 343Z" fill="${d}"/>
      <path d="M144 345 Q200 396 256 345" fill="none" stroke="${art.accent2 || '#ffffff'}" stroke-width="2.2" opacity=".9"/>
      <path d="M121 364 Q143 406 158 520 M279 364 Q257 406 242 520" fill="none" stroke="${o}" stroke-width="4" opacity=".6" stroke-dasharray="1 7"/>
      <g fill="${art.accent2 || '#ffffff'}">
        ${sparkle(171, 457, 5, art.accent2 || '#ffffff', 0.8)}
        ${sparkle(228, 480, 3.5, art.accent2 || '#ffffff', 0.7)}
        ${sparkle(199, 445, 3, art.accent2 || '#ffffff', 0.65)}
      </g>
      <circle cx="200" cy="433" r="5" fill="${art.accent2 || '#ffffff'}" opacity=".9"/>`
  }[art.outfitStyle] || '';

  return `
    <path d="M200 322 C151 322 88 353 67 419 L43 520 H357 L333 419 C312 353 249 322 200 322Z" fill="url(#${u}-outfit)"/>
    <path d="M200 323 C171 323 145 329 122 341 C156 356 244 356 278 341 C255 329 229 323 200 323Z" fill="${d}" opacity=".36"/>
    ${neckline}
    <path d="M67 419 C104 442 152 454 200 454 C248 454 296 442 333 419" fill="none" stroke="${mix(o, '#000000', 0.15)}" stroke-width="1.4" opacity=".4"/>
  `;
}

function ears(art) {
  return `
    <ellipse cx="128" cy="205" rx="13" ry="21" fill="${art.skin}"/>
    <ellipse cx="272" cy="205" rx="13" ry="21" fill="${art.skin}"/>
    <path d="M124 199 Q127 207 124 214" fill="none" stroke="${art.skinShade}" stroke-width="2" stroke-linecap="round"/>
    <path d="M276 199 Q273 207 276 214" fill="none" stroke="${art.skinShade}" stroke-width="2" stroke-linecap="round"/>
  `;
}

function face(art) {
  return `
    <path d="M200 89 C161 89 133 118 131 170 C129 211 141 254 176 284 C189 295 211 295 224 284 C259 254 271 211 269 170 C267 118 239 89 200 89Z" fill="${art.skin}"/>
    <path d="M200 89 C161 89 133 118 131 170 C129 190 132 209 138 228 C146 181 163 144 200 135 C237 144 254 181 262 228 C268 209 271 190 269 170 C267 118 239 89 200 89Z" fill="#ffffff" opacity=".08"/>
    <path d="M132 201 C134 240 147 267 174 287 C154 293 137 284 130 263 C125 246 126 220 132 201Z" fill="${art.skinShade}" opacity=".15"/>
    <ellipse cx="148" cy="233" rx="20" ry="10" fill="${art.blush}" opacity=".38"/>
    <ellipse cx="252" cy="233" rx="20" ry="10" fill="${art.blush}" opacity=".38"/>
    <ellipse cx="200" cy="221" rx="25" ry="6" fill="${art.blush}" opacity=".08"/>
  `;
}

function features(art) {
  const u = art._u;
  const lash = '#2a1624';
  const brow = art.hairDark;
  const eyeStyle = art.eyeStyle || 'round';
  const eyePaths = {
    round: {
      left: 'M146 193 C152 174 177 174 184 193 C177 209 153 209 146 193 Z',
      right: 'M216 193 C223 174 248 174 254 193 C247 209 223 209 216 193 Z',
      upperL: 'M145 192 C152 172 178 172 185 191',
      upperR: 'M215 191 C222 172 248 172 255 192',
      wingL: '', wingR: ''
    },
    soft: {
      left: 'M146 194 C153 178 177 178 184 194 C176 207 154 207 146 194 Z',
      right: 'M216 194 C223 178 247 178 254 194 C246 207 224 207 216 194 Z',
      upperL: 'M145 193 C153 176 178 176 185 192',
      upperR: 'M215 192 C222 176 247 176 255 193',
      wingL: '', wingR: ''
    },
    sharp: {
      left: 'M145 195 C153 176 178 177 185 192 C177 208 154 210 145 195 Z',
      right: 'M215 195 C222 177 247 176 255 192 C246 210 223 208 215 195 Z',
      upperL: 'M144 194 C153 173 178 175 186 191',
      upperR: 'M214 191 C222 175 247 173 256 194',
      wingL: 'M145 194 L136 187', wingR: 'M255 194 L264 187'
    }
  }[eyeStyle];

  const mouth = {
    beam: `<path d="M187 248 Q200 267 213 248 Q200 255 187 248Z" fill="#a9435f"/><path d="M193 252 Q200 258 207 252 Q200 255 193 252Z" fill="#f08a9d"/>`,
    smile: `<path d="M189 249 Q200 259 211 249" fill="none" stroke="#a9435f" stroke-width="2.6" stroke-linecap="round"/><path d="M193 254 Q200 258 207 254" fill="none" stroke="#fff" stroke-width="1" opacity=".45"/>`,
    smirk: `<path d="M189 250 Q201 259 212 247" fill="none" stroke="#a9435f" stroke-width="2.6" stroke-linecap="round"/>`,
    soft: `<path d="M190 250 Q200 258 210 250" fill="none" stroke="#a9435f" stroke-width="2.5" stroke-linecap="round"/><path d="M194 254 Q200 257 206 254" fill="none" stroke="#fff" stroke-width="1" opacity=".4"/>`,
    neutral: `<path d="M191 251 Q200 255 209 251" fill="none" stroke="#a9435f" stroke-width="2.4" stroke-linecap="round"/>`
  }[art.expression] || '';

  return `
    <g class="portrait-eyes">
      <path d="${eyePaths.left}" fill="#fffaf8"/>
      <path d="${eyePaths.right}" fill="#fffaf8"/>
      <clipPath id="${u}-eyeL"><path d="${eyePaths.left}"/></clipPath>
      <clipPath id="${u}-eyeR"><path d="${eyePaths.right}"/></clipPath>
      <ellipse cx="165" cy="193" rx="9.3" ry="11.5" fill="${art.eye}" clip-path="url(#${u}-eyeL)"/>
      <ellipse cx="235" cy="193" rx="9.3" ry="11.5" fill="${art.eye}" clip-path="url(#${u}-eyeR)"/>
      <ellipse cx="165" cy="193" rx="4.2" ry="8.5" fill="#20131e" clip-path="url(#${u}-eyeL)"/>
      <ellipse cx="235" cy="193" rx="4.2" ry="8.5" fill="#20131e" clip-path="url(#${u}-eyeR)"/>
      <circle cx="161.5" cy="187" r="3.3" fill="#fff" clip-path="url(#${u}-eyeL)"/>
      <circle cx="231.5" cy="187" r="3.3" fill="#fff" clip-path="url(#${u}-eyeR)"/>
      <circle cx="168" cy="199" r="1.8" fill="${mix(art.eye, '#ffffff', 0.65)}" clip-path="url(#${u}-eyeL)"/>
      <circle cx="238" cy="199" r="1.8" fill="${mix(art.eye, '#ffffff', 0.65)}" clip-path="url(#${u}-eyeR)"/>
      <path d="${eyePaths.upperL}" fill="none" stroke="${lash}" stroke-width="3" stroke-linecap="round"/>
      <path d="${eyePaths.upperR}" fill="none" stroke="${lash}" stroke-width="3" stroke-linecap="round"/>
      <path d="${eyePaths.wingL}" fill="none" stroke="${lash}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="${eyePaths.wingR}" fill="none" stroke="${lash}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M145 191 L141 187 M145 195 L140 194" stroke="${lash}" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M255 191 L259 187 M255 195 L260 194" stroke="${lash}" stroke-width="1.4" stroke-linecap="round"/>
    </g>
    <path d="M148 166 Q164 158 181 164" fill="none" stroke="${brow}" stroke-width="2.5" stroke-linecap="round" opacity=".78"/>
    <path d="M219 164 Q236 158 252 166" fill="none" stroke="${brow}" stroke-width="2.5" stroke-linecap="round" opacity=".78"/>
    <path d="M199 218 Q204 224 210 220" fill="none" stroke="${art.skinShade}" stroke-width="2" stroke-linecap="round" opacity=".65"/>
    ${mouth}
    ${art.freckles ? `<g fill="${art.skinShade}" opacity=".55"><circle cx="156" cy="227" r="1"/><circle cx="164" cy="231" r=".8"/><circle cx="151" cy="235" r=".7"/><circle cx="245" cy="228" r=".9"/><circle cx="237" cy="233" r=".7"/><circle cx="249" cy="237" r=".6"/></g>` : ''}
    <path d="M188 267 Q200 270 212 267" fill="none" stroke="${art.skinShade}" stroke-width="1" opacity=".25"/>
  `;
}

function hairBack(art) {
  const h = art.hair;
  const u = art._u;
  const fill = `url(#${u}-hair)`;
  const style = art.style;
  if (style === 'bob') {
    return `<path d="M200 62 C130 62 97 121 106 207 C109 246 104 280 120 319 C138 301 151 277 157 249 L243 249 C249 277 262 301 280 319 C296 280 291 246 294 207 C303 121 270 62 200 62Z" fill="${fill}"/>
      <path d="M111 216 C108 272 108 297 120 319 C130 307 139 294 144 280" fill="none" stroke="${art.hairDark}" stroke-width="3" opacity=".45"/>`;
  }
  if (style === 'twin') {
    return `<path d="M200 62 C136 62 103 110 108 191 C111 227 119 249 130 270 L270 270 C281 249 289 227 292 191 C297 110 264 62 200 62Z" fill="${fill}"/>
      <path d="M116 157 C82 172 66 218 77 273 C84 307 75 342 96 385 C111 362 114 331 119 303 C124 269 122 238 130 210Z" fill="${fill}"/>
      <path d="M284 157 C318 172 334 218 323 273 C316 307 325 342 304 385 C289 362 286 331 281 303 C276 269 278 238 270 210Z" fill="${fill}"/>
      <path d="M95 214 C87 253 88 298 98 342" fill="none" stroke="${mix(art.hair, '#ffffff', 0.26)}" stroke-width="4" stroke-linecap="round" opacity=".55"/>
      <path d="M305 214 C313 253 312 298 302 342" fill="none" stroke="${art.hairDark}" stroke-width="4" stroke-linecap="round" opacity=".45"/>
      <circle cx="118" cy="162" r="7" fill="${art.accent2 || art.blush}"/><circle cx="282" cy="162" r="7" fill="${art.accent2 || art.blush}"/>`;
  }
  if (style === 'pony') {
    return `<path d="M200 62 C137 62 104 112 108 192 C111 229 119 253 132 275 L268 275 C281 253 289 229 292 192 C296 112 263 62 200 62Z" fill="${fill}"/>
      <path d="M258 117 C300 92 346 119 348 166 C350 207 326 232 307 204 C292 181 281 153 247 145Z" fill="${fill}"/>
      <path d="M266 127 C302 112 328 133 334 166" fill="none" stroke="${mix(art.hair, '#ffffff', 0.3)}" stroke-width="5" stroke-linecap="round" opacity=".5"/>
      <path d="M258 117 C276 122 287 135 292 151" fill="none" stroke="${art.hairDark}" stroke-width="4" opacity=".55"/>
      <ellipse cx="259" cy="121" rx="11" ry="8" fill="${art.accent2 || art.blush}" transform="rotate(-22 259 121)"/>`;
  }
  if (style === 'hime') {
    return `<path d="M200 62 C132 62 98 111 105 190 C108 260 102 350 110 471 L149 471 C146 392 142 319 144 246 L256 246 C258 319 254 392 251 471 L290 471 C298 350 292 260 295 190 C302 111 268 62 200 62Z" fill="${fill}"/>
      <path d="M122 264 C116 326 119 405 125 461" fill="none" stroke="${mix(art.hair, '#ffffff', 0.25)}" stroke-width="5" opacity=".4"/>
      <path d="M278 264 C284 326 281 405 275 461" fill="none" stroke="${art.hairDark}" stroke-width="5" opacity=".3"/>`;
  }
  if (style === 'short') {
    return `<path d="M200 62 C136 62 100 114 108 203 C112 243 122 272 138 300 C151 283 160 264 164 244 L236 244 C240 264 249 283 262 300 C278 272 288 243 292 203 C300 114 264 62 200 62Z" fill="${fill}"/>
      <path d="M112 202 C124 181 139 169 158 166" fill="none" stroke="${mix(art.hair, '#ffffff', 0.3)}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`;
  }
  if (style === 'bun') {
    return `<circle cx="200" cy="67" r="31" fill="${fill}"/><circle cx="200" cy="67" r="19" fill="none" stroke="${mix(art.hair, '#ffffff', 0.2)}" stroke-width="2" opacity=".55"/>
      <path d="M200 62 C135 62 101 111 107 194 C110 233 121 260 137 284 L263 284 C279 260 290 233 293 194 C299 111 265 62 200 62Z" fill="${fill}"/>
      <ellipse cx="200" cy="68" rx="18" ry="7" fill="${art.accent2 || art.blush}" opacity=".85"/>`;
  }
  if (style === 'space') {
    return `<circle cx="129" cy="84" r="29" fill="${fill}"/><circle cx="271" cy="84" r="29" fill="${fill}"/>
      <path d="M200 62 C137 62 104 112 108 193 C111 231 121 257 135 280 L265 280 C279 257 289 231 292 193 C296 112 263 62 200 62Z" fill="${fill}"/>
      <path d="M118 84 C124 73 135 69 143 74" fill="none" stroke="${mix(art.hair, '#ffffff', 0.4)}" stroke-width="3" opacity=".5"/>
      <path d="M260 84 C266 73 277 69 285 74" fill="none" stroke="${mix(art.hair, '#ffffff', 0.4)}" stroke-width="3" opacity=".5"/>
      <ellipse cx="200" cy="72" rx="16" ry="7" fill="${art.accent2 || art.blush}" opacity=".8"/>`;
  }
  if (style === 'shag') {
    return `<path d="M200 62 C134 62 99 118 108 212 C113 252 126 280 142 302 L258 302 C274 280 287 252 292 212 C301 118 266 62 200 62Z" fill="${fill}"/>
      <path d="M113 230 C121 218 132 210 145 208 M287 230 C279 218 268 210 255 208" fill="none" stroke="${art.hairDark}" stroke-width="6" stroke-linecap="round" opacity=".55"/>`;
  }
  if (style === 'wavy') {
    return `<path d="M200 62 C136 62 99 110 105 190 C109 238 90 310 101 402 C104 433 110 452 122 472 C131 442 145 412 151 374 C145 318 138 267 144 219 L256 219 C262 267 255 318 249 374 C255 412 269 442 278 472 C290 452 296 433 299 402 C310 310 291 238 295 190 C301 110 264 62 200 62Z" fill="${fill}"/>
      <path d="M108 274 C101 333 104 388 113 431" fill="none" stroke="${mix(art.hair, '#ffffff', 0.22)}" stroke-width="5" stroke-linecap="round" opacity=".45"/>
      <path d="M292 274 C299 333 296 388 287 431" fill="none" stroke="${art.hairDark}" stroke-width="5" stroke-linecap="round" opacity=".36"/>`;
  }
  // long
  return `<path d="M200 62 C136 62 100 108 106 187 C110 239 94 318 103 442 C104 458 112 467 121 471 C133 431 145 400 151 364 C145 309 139 261 143 216 L257 216 C261 261 255 309 249 364 C255 400 267 431 279 471 C288 467 296 458 297 442 C306 318 290 239 294 187 C300 108 264 62 200 62Z" fill="${fill}"/>
    <path d="M109 247 C102 322 107 388 113 436" fill="none" stroke="${mix(art.hair, '#ffffff', 0.25)}" stroke-width="5" stroke-linecap="round" opacity=".48"/>
    <path d="M291 247 C298 322 293 388 287 436" fill="none" stroke="${art.hairDark}" stroke-width="5" stroke-linecap="round" opacity=".38"/>`;
}

function hairFront(art) {
  const u = art._u;
  const fill = `url(#${u}-hair)`;
  const styles = {
    wispy: `
      <path d="M116 174 C120 120 151 92 200 92 C241 92 271 113 285 154 C267 153 254 164 244 182 C237 157 225 142 213 133 C207 155 195 174 180 188 C172 164 160 149 146 142 C139 158 129 170 116 174Z" fill="${fill}"/>
      <path d="M169 105 C185 95 208 91 226 97" fill="none" stroke="${mix(art.hair, '#ffffff', 0.3)}" stroke-width="4" stroke-linecap="round" opacity=".55"/>`,
    side: `
      <path d="M112 173 C116 117 150 92 200 93 C244 93 275 112 288 151 C271 145 254 153 243 172 C234 151 221 138 205 131 C189 150 171 164 151 172 C143 160 129 157 112 173Z" fill="${fill}"/>
      <path d="M152 104 C175 92 209 89 234 101" fill="none" stroke="${mix(art.hair, '#ffffff', 0.3)}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`,
    blunt: `
      <path d="M112 175 C112 116 146 90 200 90 C254 90 288 116 288 175 C274 166 261 169 251 181 L251 146 C233 156 217 159 200 159 C183 159 167 156 149 146 L149 181 C139 169 126 166 112 175Z" fill="${fill}"/>
      <path d="M150 108 C174 95 224 92 253 113" fill="none" stroke="${mix(art.hair, '#ffffff', 0.3)}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`,
    curtain: `
      <path d="M112 171 C116 118 150 92 200 94 C193 119 185 148 178 186 C173 164 163 149 150 142 C141 157 129 167 112 171Z" fill="${fill}"/>
      <path d="M288 171 C284 118 250 92 200 94 C207 119 215 148 222 186 C227 164 237 149 250 142 C259 157 271 167 288 171Z" fill="${fill}"/>
      <path d="M144 111 C155 102 170 96 186 94" fill="none" stroke="${mix(art.hair, '#ffffff', 0.28)}" stroke-width="3.5" stroke-linecap="round" opacity=".5"/>`
  };
  return styles[art.bangs] || styles.wispy;
}

function accessory(art) {
  const a = art.accessory;
  if (a === 'hearts') {
    return `
      ${heart(282, 126, 13, '#ff5f9e', 15)}
      ${heart(266, 151, 9, '#ff8db8', -12)}
      ${heart(121, 145, 7, '#ffe5f1', 10)}`;
  }
  if (a === 'headphones') {
    return `
      <path d="M106 194 C101 96 145 57 200 57 C255 57 299 96 294 194" fill="none" stroke="#2b2148" stroke-width="14"/>
      <path d="M110 189 C106 104 148 66 200 66 C252 66 294 104 290 189" fill="none" stroke="${art.accent}" stroke-width="4" opacity=".85"/>
      <rect x="86" y="169" width="34" height="62" rx="16" fill="#2b2148"/>
      <rect x="280" y="169" width="34" height="62" rx="16" fill="#2b2148"/>
      <rect x="94" y="179" width="18" height="42" rx="9" fill="${art.accent}"/>
      <rect x="288" y="179" width="18" height="42" rx="9" fill="${art.accent}"/>
      <path d="M294 231 C302 244 301 257 294 266" fill="none" stroke="#2b2148" stroke-width="3"/>
      <circle cx="293" cy="269" r="4" fill="${art.accent2 || '#fff'}"/>`;
  }
  if (a === 'hoops') {
    return `
      <circle cx="126" cy="221" r="13" fill="none" stroke="${art.accent2}" stroke-width="3"/>
      <circle cx="274" cy="221" r="13" fill="none" stroke="${art.accent2}" stroke-width="3"/>
      <path d="M200 313 L188 329 L200 338 L212 329Z" fill="${art.accent2}" opacity=".92"/>
      <path d="M200 313 L188 329 L200 338 L212 329Z" fill="none" stroke="#2b1520" stroke-width="1" opacity=".5"/>`;
  }
  if (a === 'glasses') {
    return `
      <rect x="141" y="176" width="49" height="35" rx="13" fill="none" stroke="#d9c58f" stroke-width="2.2"/>
      <rect x="210" y="176" width="49" height="35" rx="13" fill="none" stroke="#d9c58f" stroke-width="2.2"/>
      <path d="M190 190 Q200 185 210 190" fill="none" stroke="#d9c58f" stroke-width="2"/>
      <path d="M141 185 L124 179 M259 185 L276 179" fill="none" stroke="#d9c58f" stroke-width="2"/>
      <path d="M147 182 L161 205" stroke="#fff" stroke-width="1.2" opacity=".45"/>`;
  }
  if (a === 'headband') {
    return `
      <path d="M109 153 C118 100 153 72 200 72 C247 72 282 100 291 153" fill="none" stroke="${art.accent2}" stroke-width="9" stroke-linecap="round"/>
      <path d="M112 149 C122 102 154 78 200 78 C246 78 278 102 288 149" fill="none" stroke="${mix(art.accent2, '#ffffff', 0.35)}" stroke-width="2.5" opacity=".8"/>
      <path d="M281 130 L292 119" stroke="${art.accent}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="294" cy="116" r="4" fill="${art.accent}"/>`;
  }
  if (a === 'crescent') {
    return `
      <path d="M53 111 C42 96 48 76 66 68 C56 84 57 98 69 107 C64 114 58 114 53 111Z" fill="${art.accent2}" opacity=".95"/>
      ${sparkle(74, 92, 5, '#fff', 0.8)}
      <path d="M200 313 L188 329 L200 338 L212 329Z" fill="${art.accent}" opacity=".9"/>
      <circle cx="200" cy="326" r="2.2" fill="#24122b"/>`;
  }
  if (a === 'bandana') {
    return `
      <path d="M113 145 C120 93 154 67 200 67 C246 67 280 93 287 145 C257 130 230 123 200 123 C170 123 143 130 113 145Z" fill="${art.accent}"/>
      <path d="M113 145 C143 131 170 125 200 125 C230 125 257 131 287 145" fill="none" stroke="${art.accent2}" stroke-width="3" opacity=".85"/>
      <g fill="#fff" opacity=".55">
        <circle cx="150" cy="104" r="2.4"/><circle cx="174" cy="88" r="1.8"/><circle cx="203" cy="81" r="2.2"/>
        <circle cx="229" cy="90" r="1.7"/><circle cx="251" cy="108" r="2.4"/><circle cx="267" cy="128" r="1.5"/>
        <circle cx="134" cy="130" r="1.5"/><circle cx="187" cy="108" r="1.3"/><circle cx="219" cy="105" r="1.6"/>
      </g>
      <path d="M111 143 C96 138 86 146 81 159 C94 158 103 163 108 173" fill="${art.accent}"/>
      <path d="M86 157 C78 161 75 168 76 177 C84 172 92 172 99 176" fill="${art.accent}"/>
      <circle cx="112" cy="145" r="7" fill="${art.accent2}" opacity=".9"/>`;
  }
  if (a === 'pins') {
    return `
      <path d="M130 120 C140 105 155 96 172 92" fill="none" stroke="${art.hairStreak || art.accent}" stroke-width="10" stroke-linecap="round" opacity=".9"/>
      ${heart(274, 126, 10, art.accent2 || '#ff5580', -15)}
      ${sparkle(255, 105, 6, '#e9fbff', 0.9)}
      <circle cx="128" cy="226" r="4" fill="#cfd9df"/><circle cx="128" cy="238" r="3" fill="#cfd9df"/>`;
  }
  if (a === 'beanie') {
    return `
      <path d="M107 145 C107 86 148 57 200 57 C252 57 293 86 293 145Z" fill="${mix(art.accent, '#5a352f', 0.25)}"/>
      <path d="M154 143 C151 102 169 76 200 73 C231 76 249 102 246 143" fill="none" stroke="${mix(art.accent, '#ffffff', 0.15)}" stroke-width="2" opacity=".38"/>
      <rect x="101" y="133" width="198" height="35" rx="16" fill="${mix(art.accent, '#4e2f28', 0.18)}"/>
      <path d="M108 147 C148 140 252 140 292 147 M107 158 C150 151 250 151 293 158" fill="none" stroke="${mix(art.accent, '#ffffff', 0.2)}" stroke-width="2" opacity=".55"/>
      <circle cx="200" cy="56" r="7" fill="${art.accent2 || '#f4d28c'}"/>`;
  }
  if (a === 'halo') {
    return `
      <ellipse cx="200" cy="40" rx="55" ry="10" fill="none" stroke="${art.accent2 || '#f9e6ff'}" stroke-width="4" opacity=".95"/>
      <ellipse cx="200" cy="40" rx="55" ry="10" fill="none" stroke="#fff" stroke-width="1" opacity=".55"/>
      ${sparkle(139, 53, 6, '#fff', 0.7)}
      ${sparkle(267, 55, 4, '#fff', 0.55)}
      ${heart(278, 128, 9, art.accent2 || '#ff8bc6', 12)}
      <path d="M200 313 L188 329 L200 338 L212 329Z" fill="${art.accent2 || '#fff'}" opacity=".9"/>`;
  }
  return '';
}

function choker(art) {
  const color = art.outfitStyle === 'hoodie' ? art.accent : '#201320';
  return `
    <path d="M179 312 Q200 321 221 312" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    <path d="M179 312 Q200 321 221 312" fill="none" stroke="${mix(color, '#ffffff', 0.25)}" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>
    ${art.outfitStyle === 'dress' || art.outfitStyle === 'stage' ? `<circle cx="200" cy="322" r="3.2" fill="${art.accent2 || '#fff'}"/>` : ''}
  `;
}

export function portraitSVG(c, variant = '') {
  const art = { ...c.art, accent: c.accent, accent2: c.accent2, _u: `pt-${c.id}${variant}` };
  const u = art._u;
  const hairLight = mix(art.hair, '#ffffff', 0.2);
  const hairMid = art.hair;

  return `<svg class="portrait-svg" viewBox="0 0 400 520" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stylized portrait of ${c.name}">
    <defs>
      <linearGradient id="${u}-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${art.bg1}"/>
        <stop offset=".58" stop-color="${mix(art.bg1, art.bg2, 0.55)}"/>
        <stop offset="1" stop-color="${art.bg2}"/>
      </linearGradient>
      <radialGradient id="${u}-halo" cx=".5" cy=".42" r=".55">
        <stop offset="0" stop-color="#fff" stop-opacity=".62"/>
        <stop offset=".55" stop-color="#fff" stop-opacity=".12"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${u}-hair" x1=".2" y1="0" x2=".8" y2="1">
        <stop offset="0" stop-color="${hairLight}"/>
        <stop offset=".32" stop-color="${hairMid}"/>
        <stop offset="1" stop-color="${art.hairDark}"/>
      </linearGradient>
      <linearGradient id="${u}-outfit" x1=".2" y1="0" x2=".8" y2="1">
        <stop offset="0" stop-color="${mix(art.outfit, '#ffffff', 0.12)}"/>
        <stop offset=".6" stop-color="${art.outfit}"/>
        <stop offset="1" stop-color="${art.outfitDark}"/>
      </linearGradient>
    </defs>
    ${backdrop(art, u)}
    ${hairBack(art)}
    ${neck(art)}
    ${ears(art)}
    ${face(art)}
    ${body(art, c, u)}
    ${choker(art)}
    ${features(art)}
    ${hairFront(art)}
    ${accessory(art)}
  </svg>`;
}
