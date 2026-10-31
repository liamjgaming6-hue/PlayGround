import { characters, characterById, gameConfig, stageFor } from './data.js';
import { portrait } from './faces.js';
import { SoundEngine } from './audio.js';

const app = document.querySelector('#app');
const sfx = new SoundEngine();

const state = {
  screen: 'title',
  character: null,
  love: gameConfig.startingLove,
  prevLove: gameConfig.startingLove,
  turn: 0,
  deck: [],
  lastSceneIndex: -1,
  scene: null,
  currentOptions: [],
  answered: false,
  lastAnswer: null,
  lastDelta: 0,
  lastTone: null,
  muted: false,
  struggleCount: 0,
  stayCount: 0,
  bellyLine: '',
  bellyStarted: 0,
  clockTimer: null,
  ambientTimer: null,
  transitionTimer: null,
  reactionTimer: null,
  totalDates: 0
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatClock(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(total / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function paletteStyle(character) {
  const p = character.palette;
  return `--accent:${p.accent};--accent-2:${p.accent2};--char-bg1:${p.bg1};--char-bg2:${p.bg2};--char-ink:${p.ink};--char-hair:${p.hair};--char-eye:${p.eye};`;
}

function icon(name) {
  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor"/><path d="m16 9 5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    help: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 9a2.8 2.8 0 1 1 4.5 2.3c-1 .7-1.9 1.3-1.9 2.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="18.5" r="1.2" fill="currentColor"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21S3.5 15.7 3.5 9.3A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.5 2.9C20.5 15.7 12 21 12 21Z" fill="currentColor"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2Z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    wiggle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c2-5 4 5 6 0s4 5 6 0 4 5 5 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M5 6c2-3 4 3 6 0s4 3 6 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    door: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  return icons[name] || '';
}

function brand() {
  return `<button class="brand" type="button" data-action="title" aria-label="Heartbite home">
    <span class="brand-heart">${icon('heart')}</span>
    <span class="brand-word">HEART<span>BITE</span></span>
  </button>`;
}

function soundButton() {
  return `<button class="icon-btn sound-btn ${state.muted ? 'is-muted' : ''}" type="button" data-action="toggle-sound" aria-label="${state.muted ? 'Unmute sound' : 'Mute sound'}" aria-pressed="${state.muted}">
    ${state.muted ? icon('muted') : icon('sound')}
    <span class="sound-state">${state.muted ? 'OFF' : 'ON'}</span>
  </button>`;
}

function topbar(options = {}) {
  const back = options.back
    ? `<button class="back-link" type="button" data-action="${options.backAction || 'select'}">
        ${icon('back')}<span>${esc(options.backLabel || 'ROSTER')}</span>
      </button>`
    : '';
  return `<header class="topbar">
    <div class="topbar-left">
      ${back}
      ${brand()}
    </div>
    <div class="topbar-right">
      <span class="age-chip">18+</span>
      ${soundButton()}
      <button class="icon-btn" type="button" data-action="how" aria-label="How to play">${icon('help')}</button>
    </div>
  </header>`;
}

function contentNote() {
  return `<p class="content-note"><span>♥</span> All characters are adults (21+). A non-graphic cartoon vore fantasy. No sexual content, no gore.</p>`;
}

/* ------------------------------------------------------------------ */
/* Title                                                               */
/* ------------------------------------------------------------------ */

function renderTitle() {
  stopGameAudio();
  state.screen = 'title';
  document.body.dataset.screen = 'title';
  const mina = characters[0];
  const rei = characters[6];

  app.innerHTML = `<section class="screen title-screen" style="${paletteStyle(mina)}">
    <div class="title-orbs" aria-hidden="true"><i></i><i></i><i></i></div>
    ${topbar()}
    <main class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> A COZY LITTLE VORE DATING SIM</p>
        <h1 class="hero-logo" aria-label="Heartbite">
          <span class="logo-heart">HEART</span>
          <span class="logo-bite">BITE</span>
          <span class="logo-pulse" aria-hidden="true">${icon('heart')}</span>
        </h1>
        <p class="tagline">Pick an egirl. Say the right thing. Fill her heart — <strong>before she decides you are the main course.</strong></p>
        <div class="hero-actions">
          <button class="btn primary large" type="button" data-action="select">
            Choose your egirl ${icon('arrow')}
          </button>
          <button class="btn ghost large" type="button" data-action="how">How it works</button>
        </div>
        <div class="hero-metrics">
          <div><b>10</b><span>egirl routes</span></div>
          <div><b>4</b><span>answers each</span></div>
          <div><b>1</b><span>warm destination</span></div>
        </div>
        ${contentNote()}
      </div>
      <div class="hero-art" aria-label="Mina Hoshino, one of ten egirls">
        <div class="hero-orbit orbit-a" aria-hidden="true"></div>
        <div class="hero-orbit orbit-b" aria-hidden="true"></div>
        <div class="hero-orbit orbit-c" aria-hidden="true"></div>
        <article class="hero-card hero-card-back" aria-hidden="true">
          ${portrait(rei, { decorative: true })}
        </article>
        <article class="hero-card hero-card-front">
          ${portrait(mina)}
          <div class="hero-card-top">
            <span class="live-dot"></span> ROUTE 01
          </div>
          <div class="hero-card-bottom">
            <span class="hero-card-archetype">${esc(mina.archetype)}</span>
            <strong>${esc(mina.name)}</strong>
            <span class="hero-card-handle">${esc(mina.handle)} · ${mina.age}</span>
          </div>
        </article>
        <div class="sticker sticker-yellow" aria-hidden="true">
          <span>100%</span>
          <strong>ORGANIC</strong>
          <small>BAD DECISIONS</small>
        </div>
        <div class="sticker sticker-cream" aria-hidden="true">
          <span class="sticker-heart">♥</span>
          <div><b>SHE IS</b><strong>HUNGRY.</strong></div>
        </div>
        <div class="float-chip chip-love" aria-hidden="true">
          <span class="chip-icon">${icon('heart')}</span>
          <div><small>HEART METER</small><b>FULL <span>♥</span></b></div>
        </div>
        <div class="float-chip chip-voice" aria-hidden="true">
          <span class="voice-bars"><i></i><i></i><i></i><i></i><i></i></span>
          <div><small>10 GENERATED VOICES</small><b>HEAR HER OUT</b></div>
        </div>
        <span class="hero-spark spark-a" aria-hidden="true">✦</span>
        <span class="hero-spark spark-b" aria-hidden="true">✦</span>
        <span class="hero-spark spark-c" aria-hidden="true">✧</span>
      </div>
    </main>
    <footer class="title-footer">
      <span>♥ Original art. Generated voices. Synthesized stomach acoustics.</span>
      <span class="title-footer-right">NO TIMER INSIDE · LEAVE WHENEVER YOU LIKE</span>
    </footer>
  </section>`;
}

/* ------------------------------------------------------------------ */
/* Roster                                                              */
/* ------------------------------------------------------------------ */

function renderSelect() {
  stopGameAudio();
  state.screen = 'select';
  state.character = null;
  document.body.dataset.screen = 'select';
  window.scrollTo({ top: 0, behavior: 'instant' });

  const cards = characters.map((character) => `
    <button class="egirl-card" type="button" data-action="pick" data-id="${character.id}" style="${paletteStyle(character)}" aria-label="Start a date with ${esc(character.name)}, ${esc(character.archetype)}">
      <span class="card-art">
        ${portrait(character, { decorative: true })}
        <span class="card-number">${character.number}</span>
        <span class="card-age">${character.age}+</span>
        <span class="card-hover">START ROUTE ${icon('arrow')}</span>
        <span class="card-sheen" aria-hidden="true"></span>
      </span>
      <span class="card-info">
        <span class="card-name-row"><strong class="card-name">${esc(character.name)}</strong><span class="card-heart">${icon('heart')}</span></span>
        <span class="card-archetype">${esc(character.archetype)}</span>
        <span class="card-quote">“${esc(character.quote)}”</span>
        <span class="card-tags">
          <span title="Generated voice style">VOICE · ${esc(character.voice.label)}</span>
          <span title="Synthesized belly sound">BELLY · ${esc(character.belly.label)}</span>
        </span>
      </span>
    </button>
  `).join('');

  app.innerHTML = `<section class="screen roster-screen">
    ${topbar()}
    <main class="roster-main">
      <div class="roster-heading">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> STEP 01 / 02 · ROUTE SELECT</p>
          <h1>Pick your <em>problem.</em></h1>
          <p class="roster-lede">Ten egirls. Four replies each. Every one has a different face, a different voice, and very different stomach acoustics.</p>
        </div>
        <aside class="roster-note">
          <span class="note-kicker">${icon('heart')} HOUSE RULES</span>
          <p>Fill her heart to 100 and she eats you. Empty it to 0 and she <em>also</em> eats you. At least one of those is a happy ending.</p>
        </aside>
      </div>
      <div class="roster-grid">${cards}</div>
      <div class="roster-footer">
        ${contentNote()}
        <span class="roster-counter">10 / 10 ROUTES ONLINE</span>
      </div>
    </main>
  </section>`;
}

/* ------------------------------------------------------------------ */
/* Date                                                                */
/* ------------------------------------------------------------------ */

function refillDeck() {
  const indexes = shuffle(state.character.scenes.map((_, index) => index));
  if (indexes.length > 1 && indexes[0] === state.lastSceneIndex) {
    [indexes[0], indexes[1]] = [indexes[1], indexes[0]];
  }
  state.deck = indexes;
}

function advanceScene() {
  if (!state.character) return;
  if (!state.deck.length) refillDeck();
  const index = state.deck.pop();
  state.lastSceneIndex = index;
  state.scene = state.character.scenes[index];
  state.currentOptions = shuffle(state.scene.options.map((option, optionIndex) => ({ ...option, optionIndex })));
  state.answered = false;
  state.lastAnswer = null;
  state.lastDelta = 0;
  state.lastTone = null;
  state.turn += 1;
}

function startDate(characterId) {
  const character = characterById(characterId);
  if (!character) return;
  haltTimers();
  stopGameAudio();
  state.character = character;
  state.love = gameConfig.startingLove;
  state.prevLove = state.love;
  state.turn = 0;
  state.deck = [];
  state.lastSceneIndex = -1;
  state.answered = false;
  state.struggleCount = 0;
  state.stayCount = 0;
  state.totalDates += 1;
  advanceScene();
  state.screen = 'date';
  document.body.dataset.screen = 'date';
  renderDate({ speak: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function loveDelta(tone) {
  if (tone === 'good') return gameConfig.goodGain;
  if (tone === 'bad') return -gameConfig.badLoss;
  return 0;
}

function deltaLabel(tone, delta) {
  if (tone === 'good') return `+${delta} LOVE`;
  if (tone === 'bad') return `−${Math.abs(delta)} LOVE`;
  return '±0 LOVE';
}

function toneLabel(tone) {
  if (tone === 'good') return 'HEART HIT';
  if (tone === 'bad') return 'HEARTBREAK';
  return 'FLAT';
}

function renderDate(options = {}) {
  const character = state.character;
  if (!character) return;
  const stage = stageFor(state.love);
  const low = state.love <= 25;
  const full = state.love >= 100;
  const tone = state.lastTone;
  const terminal = state.love >= 100 || state.love <= 0;
  const optionsHtml = state.answered ? '' : state.currentOptions.map((option, index) => `
    <button class="option-btn" type="button" data-action="answer" data-index="${index}">
      <span class="option-key">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${esc(option.text)}</span>
      <span class="option-arrow">${icon('arrow')}</span>
    </button>
  `).join('');

  const answer = state.lastAnswer;
  const reactionHtml = state.answered && answer ? `
    <div class="answer-reaction" data-tone="${tone}">
      <div class="you-said">
        <span class="mini-label">YOU SAID</span>
        <p>“${esc(answer.text)}”</p>
      </div>
      <div class="her-reply">
        <span class="mini-label">${esc(character.name.split(' ')[0].toUpperCase())} SAYS</span>
        <p>“${esc(answer.reply)}”</p>
      </div>
      <div class="reaction-footer">
        <div class="reaction-readout">
          <span class="delta-chip ${tone}">${deltaLabel(tone, state.lastDelta)}</span>
          <span class="tone-chip">${toneLabel(tone)}</span>
        </div>
        <button class="btn primary next-btn" type="button" data-action="next">
          ${terminal ? (state.love >= 100 ? 'Face the music' : 'Uh oh...') : 'Next question'} ${icon('arrow')}
        </button>
      </div>
    </div>
  ` : `<div class="options-wrap">
      <div class="options-heading"><span>PICK YOUR REPLY</span><span class="options-hint">One of these is the right thing to say.</span></div>
      <div class="options-grid">${optionsHtml}</div>
    </div>`;

  app.innerHTML = `<section class="screen date-screen" style="${paletteStyle(character)}" data-tone="${tone || ''}">
    <div class="date-bg-orb orb-one" aria-hidden="true"></div>
    <div class="date-bg-orb orb-two" aria-hidden="true"></div>
    <div class="heart-burst-layer" aria-hidden="true"></div>
    ${topbar({ back: true, backLabel: 'ROSTER' })}
    <main class="date-layout">
      <section class="date-stage" aria-label="${esc(character.name)} is on a date with you">
        <div class="stage-noise" aria-hidden="true"></div>
        <div class="stage-halo" aria-hidden="true"></div>
        <div class="stage-portrait ${state.answered ? `is-reacting tone-${tone}` : ''}">
          ${portrait(character)}
        </div>
        <div class="stage-topline">
          <span class="route-pill"><span class="live-dot"></span> ROUTE ${character.number}</span>
          <span class="stage-age">${character.age}+</span>
        </div>
        <div class="stage-nameplate">
          <span class="nameplate-archetype">${esc(character.archetype)}</span>
          <h2>${esc(character.name)}</h2>
          <span class="nameplate-handle">${esc(character.handle)}</span>
        </div>
        <div class="stage-voice">
          <span class="voice-bars"><i></i><i></i><i></i><i></i><i></i></span>
          <span><small>VOICE</small>${esc(character.voice.label)}</span>
        </div>
        <div class="stage-heart-note" aria-hidden="true">
          <span>♥</span>
          <small>HEART STATUS</small>
          <strong>${esc(stage.label)}</strong>
        </div>
      </section>

      <section class="chat-panel" aria-label="Date conversation">
        <div class="love-panel ${low ? 'is-low' : ''} ${full ? 'is-full' : ''}">
          <div class="love-heading">
            <span class="love-title">${icon('heart')} HEART METER</span>
            <span class="love-status">${esc(stage.label)}</span>
            <span class="love-value">${state.love}<small>/100</small></span>
          </div>
          <div class="love-track" role="progressbar" aria-label="Love meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${state.love}">
            <div class="love-fill" data-love-fill style="width:${state.love}%"></div>
            <div class="love-shine" aria-hidden="true"></div>
            <span class="love-tick t1" aria-hidden="true"></span>
            <span class="love-tick t2" aria-hidden="true"></span>
            <span class="love-tick t3" aria-hidden="true"></span>
            <span class="love-tick t4" aria-hidden="true"></span>
          </div>
          <p class="love-hint">${esc(stage.hint)}</p>
        </div>

        <div class="dialogue-card">
          <div class="dialogue-meta">
            <span class="speaker-dot" style="background:${character.palette.accent}"></span>
            <span class="speaker-name">${esc(character.name.split(' ')[0])} SAYS</span>
            <span class="beat-count">BEAT ${String(state.turn).padStart(2, '0')}</span>
          </div>
          <p class="dialogue-text" aria-live="polite">“${esc(state.scene.prompt)}”</p>
          <div class="speech-tail" aria-hidden="true"></div>
        </div>

        ${reactionHtml}
        <div class="date-footnote">
          <span>${icon('heart')} Answer like you actually know her.</span>
          <span class="date-footnote-right">${state.love >= 100 ? 'HER HEART IS FULL' : state.love <= 0 ? 'HER HEART IS EMPTY' : 'NO TIMER · NO MERCY'}</span>
        </div>
      </section>
    </main>
  </section>`;

  requestAnimationFrame(() => {
    animateLove(state.prevLove, state.love);
    if (state.answered && tone === 'good') spawnHearts(13, character.palette.accent);
    if (state.answered && tone === 'bad') shakeDate();
    if (state.answered) {
      const nextButton = app.querySelector('[data-action="next"]');
      nextButton?.focus({ preventScroll: true });
    }
  });

  if (options.speak && !state.answered) {
    window.setTimeout(() => {
      if (state.screen === 'date' && state.scene === state.currentSceneRef) {
        // Scene identity check is intentionally loose; no-op guard below handles stale screens.
      }
    }, 0);
    window.setTimeout(() => {
      if (state.screen === 'date' && !state.answered) sfx.speak(state.scene.prompt, character);
    }, 420);
  }
}

function animateLove(from, to) {
  const fill = app.querySelector('[data-love-fill]');
  if (!fill) return;
  if (reduceMotion.matches) {
    fill.style.width = `${to}%`;
    return;
  }
  fill.style.transition = 'none';
  fill.style.width = `${from}%`;
  fill.getBoundingClientRect();
  requestAnimationFrame(() => {
    fill.style.transition = '';
    fill.style.width = `${to}%`;
  });
}

function spawnHearts(count, color) {
  const layer = app.querySelector('.heart-burst-layer');
  if (!layer) return;
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = i % 3 === 0 ? '♥' : '✦';
    heart.style.left = `${14 + Math.random() * 72}%`;
    heart.style.top = `${38 + Math.random() * 36}%`;
    heart.style.color = i % 4 === 0 ? '#fff5f8' : color;
    heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 180}px`);
    heart.style.setProperty('--dy', `${-80 - Math.random() * 220}px`);
    heart.style.setProperty('--rot', `${(Math.random() - 0.5) * 100}deg`);
    heart.style.animationDelay = `${Math.random() * 0.16}s`;
    layer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1500);
  }
}

function shakeDate() {
  const screen = app.querySelector('.date-screen');
  if (!screen) return;
  screen.classList.add('is-shaking');
  window.setTimeout(() => screen.classList.remove('is-shaking'), 480);
}

function answerQuestion(index) {
  if (state.screen !== 'date' || state.answered) return;
  const option = state.currentOptions[index];
  if (!option) return;

  state.prevLove = state.love;
  const delta = loveDelta(option.tone);
  state.love = clamp(state.love + delta, 0, 100);
  state.lastAnswer = option;
  state.lastDelta = delta;
  state.lastTone = option.tone;
  state.answered = true;

  if (option.tone === 'good') sfx.heartUp(state.character);
  else if (option.tone === 'bad') sfx.heartDown();
  else sfx.neutral();

  renderDate({ speak: false });
  window.setTimeout(() => {
    if (state.screen === 'date' && state.answered) sfx.speak(option.reply, state.character, { rate: 0.02 });
  }, 260);
}

function nextTurn() {
  if (state.screen !== 'date' || !state.answered) return;
  if (state.love >= gameConfig.winAt) {
    triggerSwallow('good');
    return;
  }
  if (state.love <= gameConfig.loseAt) {
    triggerSwallow('bad');
    return;
  }
  sfx.click();
  advanceScene();
  renderDate({ speak: true });
}

/* ------------------------------------------------------------------ */
/* Swallow transition                                                  */
/* ------------------------------------------------------------------ */

function triggerSwallow(mode) {
  const character = state.character;
  if (!character) return;
  haltTimers();
  state.screen = 'swallow';
  state.answered = false;
  document.body.dataset.screen = 'swallow';
  const good = mode === 'good';
  sfx.swallow(character, mode);
  sfx.speak(good ? character.winLine : character.lossLine, character, { rate: -0.04 });

  app.innerHTML = `<section class="screen swallow-screen ${good ? 'swallow-good' : 'swallow-bad'}" style="${paletteStyle(character)}">
    <div class="swallow-vignette" aria-hidden="true"></div>
    <div class="swallow-rings" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <div class="swallow-portrait" aria-hidden="true">${portrait(character, { decorative: true })}</div>
    <div class="swallow-copy">
      <p class="eyebrow">${good ? 'HEART METER · 100%' : 'HEART METER · 0%'}</p>
      <h1>${good ? 'SHE SAID YES.' : 'SHE SAID NOTHING.'}</h1>
      <p class="swallow-line">“${esc(good ? character.winLine : character.lossLine)}”</p>
      <div class="swallow-status">
        <span class="swallow-dot"></span>
        ${good ? 'ONE VERY COZY DESTINATION' : 'STOMACH ACID · RISING'}
      </div>
    </div>
    <div class="swallow-heart" aria-hidden="true">${icon('heart')}</div>
    <div class="swallow-flash" aria-hidden="true"></div>
  </section>`;

  state.transitionTimer = window.setTimeout(() => {
    if (state.screen !== 'swallow') return;
    if (good) enterBelly();
    else enterBadBelly();
  }, reduceMotion.matches ? 900 : 2400);
}

/* ------------------------------------------------------------------ */
/* Good belly                                                          */
/* ------------------------------------------------------------------ */

function blobMarkup() {
  return `<div class="player-blob" id="playerBlob" aria-label="You, inside the belly">
    <svg viewBox="0 0 140 160" role="img" aria-hidden="true">
      <ellipse cx="70" cy="148" rx="40" ry="9" fill="#3b1027" opacity=".3"/>
      <path d="M35 126 Q24 105 42 93 L52 104 Q45 118 51 133 Z" fill="#ffd8c61" opacity="0"/>
      <path d="M34 123 Q27 110 40 101" fill="none" stroke="#ffe3d4" stroke-width="10" stroke-linecap="round"/>
      <path d="M106 123 Q113 110 100 101" fill="none" stroke="#ffe3d4" stroke-width="10" stroke-linecap="round"/>
      <path d="M39 111 Q42 86 70 84 Q98 86 101 111 L105 140 Q70 151 35 140 Z" fill="#fff3ea" stroke="#301426" stroke-width="3"/>
      <path d="M47 111 Q50 91 70 89 Q90 91 93 111" fill="#ff7ca9" opacity=".28"/>
      <circle cx="70" cy="72" r="39" fill="#ffe3d4" stroke="#301426" stroke-width="3"/>
      <path d="M32 70 C31 38 49 24 72 24 C97 24 113 43 108 73 C99 56 87 48 74 49 C62 50 51 56 44 68 C40 61 36 64 32 70 Z" fill="#4e263d" stroke="#301426" stroke-width="2"/>
      <path d="M48 70 Q55 64 63 70" fill="none" stroke="#301426" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M77 70 Q84 64 92 70" fill="none" stroke="#301426" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="55" cy="80" r="7" fill="#ff9dbb" opacity=".45"/>
      <circle cx="85" cy="80" r="7" fill="#ff9dbb" opacity=".45"/>
      <path d="M62 88 Q70 95 78 88" fill="none" stroke="#301426" stroke-width="3" stroke-linecap="round"/>
      <path d="M66 104 L70 110 L74 104" fill="none" stroke="#ff7ca9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>`;
}

function enterBelly() {
  const character = state.character;
  haltTimers();
  state.screen = 'belly';
  state.bellyStarted = Date.now();
  state.struggleCount = 0;
  state.stayCount = 0;
  state.bellyLine = pick(character.idleLines);
  document.body.dataset.screen = 'belly';
  window.scrollTo({ top: 0, behavior: 'instant' });

  app.innerHTML = `<section class="screen belly-screen" style="${paletteStyle(character)}">
    <div class="belly-bg-glow glow-a" aria-hidden="true"></div>
    <div class="belly-bg-glow glow-b" aria-hidden="true"></div>
    ${topbar({ back: true, backLabel: 'ROSTER' })}
    <main class="belly-layout">
      <section class="belly-chamber-column">
        <div class="belly-heading">
          <div>
            <p class="eyebrow"><span class="live-dot"></span> LIVE FROM INSIDE ${esc(character.name.split(' ')[0].toUpperCase())}</p>
            <h1>Cozy. Warm. <em>Mine.</em></h1>
          </div>
          <div class="cozy-badge">${icon('heart')} SAFE ENDING UNLOCKED</div>
        </div>
        <div class="belly-chamber" id="bellyChamber">
          <div class="belly-wall fold-a" aria-hidden="true"></div>
          <div class="belly-wall fold-b" aria-hidden="true"></div>
          <div class="belly-wall fold-c" aria-hidden="true"></div>
          <div class="belly-glow" aria-hidden="true"></div>
          <div class="belly-bubble bubble-a" aria-hidden="true"></div>
          <div class="belly-bubble bubble-b" aria-hidden="true"></div>
          <div class="belly-bubble bubble-c" aria-hidden="true"></div>
          <div class="belly-chip chip-top">${icon('heart')} HEARTBEAT · STEADY</div>
          <div class="belly-chip chip-bottom">NO TIMER · LEAVE ANYTIME</div>
          ${blobMarkup()}
          <div class="struggle-ring" id="struggleRing" aria-hidden="true"></div>
          <div class="belly-sparkle bs-a" aria-hidden="true">✦</div>
          <div class="belly-sparkle bs-b" aria-hidden="true">✧</div>
          <div class="belly-sparkle bs-c" aria-hidden="true">✦</div>
        </div>
        <div class="belly-controls">
          <button class="btn primary xl" type="button" data-action="struggle">
            ${icon('wiggle')}<span>Struggle</span><kbd>S</kbd>
          </button>
          <button class="btn ghost" type="button" data-action="stay">${icon('heart')} Stay a while</button>
          <button class="btn ghost leave-btn" type="button" data-action="leave">${icon('door')} Leave</button>
        </div>
        <p class="belly-hint">Struggle to move around. She will absolutely giggle about it. There is no timer, and leaving is always allowed.</p>
      </section>

      <aside class="belly-side">
        <div class="belly-portrait" id="bellyPortrait">
          ${portrait(character)}
          <div class="belly-portrait-tag">${esc(character.archetype)}</div>
        </div>
        <div class="belly-dialogue">
          <div class="belly-dialogue-head">
            <span class="speaker-dot" style="background:${character.palette.accent}"></span>
            <span>${esc(character.name.split(' ')[0]).toUpperCase()} SAYS</span>
            <span class="belly-mode">COZY MODE</span>
          </div>
          <p class="belly-quote" id="bellyQuote" aria-live="polite">“${esc(state.bellyLine)}”</p>
          <div class="belly-stats">
            <div><span>STRUGGLES</span><b id="struggleCount">0</b></div>
            <div><span>COZY TIME</span><b id="cozyClock">00:00</b></div>
            <div><span>BELLY SOUND</span><b class="stat-word">${esc(character.belly.label.split(' ')[0])}</b></div>
          </div>
          <div class="belly-actions-mini">
            <span>${icon('spark')} SHE IS VERY PLEASED WITH HERSELF.</span>
          </div>
        </div>
      </aside>
    </main>
    <footer class="belly-footer">
      <span>You can stay as long as you want. Nothing bad happens in here.</span>
      <span class="belly-footer-right">♥ SHE WILL NOT ADMIT SHE LIKES THE WIGGLING</span>
    </footer>
  </section>`;

  startClock();
  scheduleAmbient();
  window.setTimeout(() => {
    if (state.screen === 'belly') sfx.speak(state.bellyLine, character, { rate: -0.05, volume: 0.8 });
  }, 700);
}

function startClock() {
  window.clearInterval(state.clockTimer);
  state.clockTimer = window.setInterval(() => {
    const clock = document.getElementById('cozyClock');
    if (!clock) return;
    clock.textContent = formatClock(Date.now() - state.bellyStarted);
  }, 1000);
}

function scheduleAmbient() {
  window.clearTimeout(state.ambientTimer);
  const delay = 7000 + Math.random() * 4500;
  state.ambientTimer = window.setTimeout(() => {
    if (state.screen !== 'belly') return;
    sfx.belly(state.character, 0.45);
    scheduleAmbient();
  }, delay);
}

function struggle() {
  if (state.screen !== 'belly' || !state.character) return;
  const character = state.character;
  state.struggleCount += 1;
  const line = pick(character.struggleLines);
  state.bellyLine = line;

  const quote = document.getElementById('bellyQuote');
  const count = document.getElementById('struggleCount');
  const chamber = document.getElementById('bellyChamber');
  const blob = document.getElementById('playerBlob');
  const portraitWrap = document.getElementById('bellyPortrait');
  const ring = document.getElementById('struggleRing');
  if (quote) quote.textContent = `“${line}”`;
  if (count) count.textContent = String(state.struggleCount);

  if (blob && chamber) {
    const width = chamber.clientWidth;
    const height = chamber.clientHeight;
    const x = (Math.random() * 2 - 1) * Math.min(width * 0.28, 150);
    const y = (Math.random() * 2 - 1) * Math.min(height * 0.18, 70);
    const rotation = (Math.random() * 2 - 1) * 18;
    blob.style.setProperty('--x', `${x}px`);
    blob.style.setProperty('--y', `${y}px`);
    blob.style.setProperty('--rot', `${rotation}deg`);
    blob.classList.remove('is-struggling');
    blob.getBoundingClientRect();
    blob.classList.add('is-struggling');
    window.setTimeout(() => blob.classList.remove('is-struggling'), 720);
  }

  if (chamber) {
    chamber.classList.remove('is-shaking');
    chamber.getBoundingClientRect();
    chamber.classList.add('is-shaking');
    window.setTimeout(() => chamber.classList.remove('is-shaking'), 650);
  }
  if (ring) {
    ring.classList.remove('is-active');
    ring.getBoundingClientRect();
    ring.classList.add('is-active');
    window.setTimeout(() => ring.classList.remove('is-active'), 820);
  }
  if (portraitWrap) {
    portraitWrap.classList.remove('is-giggling');
    portraitWrap.getBoundingClientRect();
    portraitWrap.classList.add('is-giggling');
    window.setTimeout(() => portraitWrap.classList.remove('is-giggling'), 760);
  }

  sfx.belly(character, 1.25, 'struggle');
  sfx.giggle(character, line);
  spawnHearts(5, character.palette.accent);
}

function stayAWhile() {
  if (state.screen !== 'belly' || !state.character) return;
  const character = state.character;
  state.stayCount += 1;
  const line = pick(character.idleLines);
  state.bellyLine = line;
  const quote = document.getElementById('bellyQuote');
  if (quote) quote.textContent = `“${line}”`;
  const portraitWrap = document.getElementById('bellyPortrait');
  if (portraitWrap) {
    portraitWrap.classList.remove('is-cozy');
    portraitWrap.getBoundingClientRect();
    portraitWrap.classList.add('is-cozy');
    window.setTimeout(() => portraitWrap.classList.remove('is-cozy'), 900);
  }
  sfx.belly(character, 0.8);
  sfx.speak(line, character, { rate: -0.03, volume: 0.78 });
  const chamber = document.getElementById('bellyChamber');
  if (chamber) {
    chamber.classList.add('is-cozy');
    window.setTimeout(() => chamber.classList.remove('is-cozy'), 1000);
  }
}

function leaveBelly() {
  if (state.screen !== 'belly' || !state.character) return;
  const character = state.character;
  haltTimers();
  stopGameAudio();
  state.screen = 'goodend';
  document.body.dataset.screen = 'goodend';
  sfx.success();
  const elapsed = formatClock(Date.now() - state.bellyStarted);
  sfx.speak(character.leaveLine, character, { rate: -0.03 });
  window.scrollTo({ top: 0, behavior: 'instant' });

  app.innerHTML = `<section class="screen end-screen good-end" style="${paletteStyle(character)}">
    <div class="end-rays" aria-hidden="true"></div>
    <div class="end-hearts" aria-hidden="true"><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span></div>
    ${topbar({ back: true, backLabel: 'ROSTER' })}
    <main class="end-main">
      <div class="end-badge">${icon('heart')} GOOD END · YOU LEFT</div>
      <h1>YOU <em>LIVED.</em></h1>
      <p class="end-lede">You climbed out of ${esc(character.name.split(' ')[0])}'s belly with your dignity mostly intact. She is pretending not to miss you. You are both pretending.</p>
      <div class="end-layout">
        <div class="end-portrait">
          ${portrait(character)}
          <div class="end-sticker">♥ STILL TEXTING</div>
        </div>
        <div class="end-card">
          <span class="end-reaction-label">HER FINAL WORD</span>
          <p class="end-quote">“${esc(character.leaveLine)}”</p>
          <div class="end-stats">
            <div><span>TIME INSIDE</span><b>${elapsed}</b></div>
            <div><span>STRUGGLES</span><b>${state.struggleCount}</b></div>
            <div><span>COZY STAYS</span><b>${state.stayCount}</b></div>
            <div><span>HEART</span><b>100%</b></div>
          </div>
          <div class="end-actions">
            <button class="btn primary" type="button" data-action="restart">Date ${esc(character.name.split(' ')[0])} again ${icon('arrow')}</button>
            <button class="btn ghost" type="button" data-action="select">Choose another egirl</button>
          </div>
          <p class="end-footnote">You can always go back. She would like that.</p>
        </div>
      </div>
    </main>
    <footer class="title-footer">
      <span>♥ Good end: ${esc(character.name)} · ${esc(character.archetype)}</span>
      <span class="title-footer-right">SHE WILL REMEMBER THIS</span>
    </footer>
  </section>`;
}

/* ------------------------------------------------------------------ */
/* Bad belly + death                                                   */
/* ------------------------------------------------------------------ */

function enterBadBelly() {
  const character = state.character;
  if (!character) return;
  state.screen = 'badbelly';
  document.body.dataset.screen = 'badbelly';
  window.scrollTo({ top: 0, behavior: 'instant' });
  sfx.acidRise(reduceMotion.matches ? 1.2 : 4.4);

  app.innerHTML = `<section class="screen badbelly-screen" style="${paletteStyle(character)}">
    <div class="bad-cinematic-bar" aria-hidden="true"></div>
    <header class="bad-topbar">
      <span class="bad-route">${icon('heart')} HEART METER · 0%</span>
      <span class="bad-warning"><i></i> STOMACH ACID RISING</span>
      <span class="bad-route">ROUTE ${character.number} · ${esc(character.name.toUpperCase())}</span>
    </header>
    <main class="bad-chamber" id="badChamber">
      <div class="belly-wall fold-a" aria-hidden="true"></div>
      <div class="belly-wall fold-b" aria-hidden="true"></div>
      <div class="belly-wall fold-c" aria-hidden="true"></div>
      <div class="acid" aria-hidden="true">
        <div class="acid-bubbles"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>
      <div class="bad-player" aria-label="You, sinking">
        ${blobMarkup().replace('id="playerBlob"', 'id="badBlob"')}
      </div>
      <div class="bad-message">
        <p class="eyebrow">BAD END · ${esc(character.name.split(' ')[0]).toUpperCase()} ROUTE</p>
        <h1>You lost her heart.</h1>
        <p>“${esc(character.lossLine)}”</p>
      </div>
      <div class="acid-meter">
        <span>ACID LEVEL</span>
        <div class="acid-meter-track"><i></i><b>RISING</b></div>
      </div>
      <div class="bad-corner-note">NO HEARTS LEFT · NO WAY OUT</div>
    </main>
  </section>`;

  state.transitionTimer = window.setTimeout(() => {
    if (state.screen === 'badbelly') renderDeath();
  }, reduceMotion.matches ? 1600 : 5200);
}

function renderDeath() {
  const character = state.character;
  if (!character) return;
  haltTimers();
  stopGameAudio();
  state.screen = 'death';
  document.body.dataset.screen = 'death';
  sfx.death();
  window.scrollTo({ top: 0, behavior: 'instant' });

  app.innerHTML = `<section class="screen death-screen" style="${paletteStyle(character)}">
    <div class="death-scanlines" aria-hidden="true"></div>
    <div class="death-glow" aria-hidden="true"></div>
    <div class="death-noise" aria-hidden="true"></div>
    <main class="death-main">
      <p class="death-kicker">BAD END · ROUTE ${character.number} · ${esc(character.name.toUpperCase())}</p>
      <h1 class="death-title">YOU <span>DIED</span></h1>
      <p class="death-sub">Her heart emptied. Her stomach did not.</p>
      <div class="death-card">
        <div class="death-heart" aria-hidden="true">${icon('heart')}</div>
        <p class="death-quote">“${esc(character.lossLine)}”</p>
        <div class="death-stats">
          <div><span>FINAL HEART</span><b>0%</b></div>
          <div><span>BEATS SURVIVED</span><b>${state.turn}</b></div>
          <div><span>CAUSE</span><b>BAD VIBES</b></div>
        </div>
        <div class="death-actions">
          <button class="btn primary large" type="button" data-action="restart">Restart date ${icon('arrow')}</button>
          <button class="btn ghost" type="button" data-action="select">Choose another egirl</button>
        </div>
        <p class="death-hint">Tip: the right answer sounds like something <em>she</em> would say.</p>
      </div>
    </main>
    <footer class="death-footer">
      <span>♥ YOU CAN RESTART AS MANY TIMES AS YOU NEED</span>
      <span>${esc(character.belly.label).toUpperCase()} · STILL GURGLING</span>
    </footer>
  </section>`;
}

/* ------------------------------------------------------------------ */
/* How to play                                                         */
/* ------------------------------------------------------------------ */

function openHow() {
  if (document.querySelector('.modal-backdrop')) return;
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `<div class="modal how-modal" role="dialog" aria-modal="true" aria-labelledby="how-title">
    <button class="modal-close" type="button" data-modal-close aria-label="Close how to play">${icon('close')}</button>
    <p class="eyebrow">THE RULES OF ATTRACTION</p>
    <h2 id="how-title">HOW TO <em>PLAY.</em></h2>
    <div class="how-steps">
      <div class="how-step"><span>01</span><div><b>Pick an egirl.</b><p>Ten routes. Each has her own face, voice, answers, and belly soundtrack.</p></div></div>
      <div class="how-step"><span>02</span><div><b>Read her vibe.</b><p>Every prompt has four replies. One raises her heart meter, one lowers it, and two leave it exactly where it is.</p></div></div>
      <div class="how-step"><span>03</span><div><b>Fill her heart — or empty it.</b><p>Reach 100% and she eats you. Reach 0% and she eats you. One of these is much nicer than the other.</p></div></div>
      <div class="how-step"><span>04</span><div><b>Get comfortable.</b><p>At 100% you wake up in her belly. Press Struggle to wiggle (she giggles). Stay as long as you like. Leave whenever you want.</p></div></div>
    </div>
    <div class="how-note">
      <span class="how-note-heart">♥</span>
      <p>Cartoon vore fantasy. Non-graphic, non-sexual, and all characters are adults (21+). The only thing in danger is your heart.</p>
    </div>
    <button class="btn primary" type="button" data-modal-close>Got it ${icon('arrow')}</button>
  </div>`;
  document.body.appendChild(modal);
  document.body.classList.add('modal-open');
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-modal-close]')) closeModal();
  });
  window.requestAnimationFrame(() => modal.querySelector('.modal-close')?.focus());
}

function closeModal() {
  const modal = document.querySelector('.modal-backdrop');
  if (!modal) return;
  modal.classList.add('is-closing');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => modal.remove(), 180);
}

/* ------------------------------------------------------------------ */
/* Audio / timers / routing                                            */
/* ------------------------------------------------------------------ */

function stopGameAudio() {
  sfx.stopSpeaking();
}

function haltTimers() {
  window.clearInterval(state.clockTimer);
  window.clearTimeout(state.ambientTimer);
  window.clearTimeout(state.transitionTimer);
  state.clockTimer = null;
  state.ambientTimer = null;
  state.transitionTimer = null;
}

function toggleSound() {
  state.muted = !state.muted;
  sfx.setMuted(state.muted);
  document.querySelectorAll('.sound-btn').forEach((button) => {
    button.classList.toggle('is-muted', state.muted);
    button.setAttribute('aria-pressed', String(state.muted));
    button.setAttribute('aria-label', state.muted ? 'Unmute sound' : 'Mute sound');
    button.innerHTML = `${state.muted ? icon('muted') : icon('sound')}<span class="sound-state">${state.muted ? 'OFF' : 'ON'}</span>`;
  });
  if (!state.muted) {
    sfx.click();
    if (state.screen === 'date' && state.character) {
      const prompt = state.answered && state.lastAnswer ? state.lastAnswer.reply : state.scene?.prompt;
      if (prompt) sfx.speak(prompt, state.character);
    } else if (state.screen === 'belly' && state.character) {
      sfx.speak(state.bellyLine, state.character);
    }
  }
}

function backToSelect() {
  haltTimers();
  stopGameAudio();
  renderSelect();
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  sfx.unlock();

  switch (action) {
    case 'title':
      haltTimers();
      stopGameAudio();
      renderTitle();
      break;
    case 'select':
      backToSelect();
      break;
    case 'pick':
      sfx.click();
      startDate(target.dataset.id);
      break;
    case 'answer':
      answerQuestion(Number(target.dataset.index));
      break;
    case 'next':
      nextTurn();
      break;
    case 'struggle':
      struggle();
      break;
    case 'stay':
      stayAWhile();
      break;
    case 'leave':
      leaveBelly();
      break;
    case 'restart':
      if (state.character) startDate(state.character.id);
      break;
    case 'toggle-sound':
      toggleSound();
      break;
    case 'how':
      openHow();
      break;
    default:
      break;
  }
});

app.addEventListener('pointerover', (event) => {
  const card = event.target.closest('.egirl-card');
  if (card && !card.dataset.hovered) {
    card.dataset.hovered = '1';
    sfx.hover();
    window.setTimeout(() => { delete card.dataset.hovered; }, 900);
  }
});

document.addEventListener('pointerdown', () => sfx.unlock(), { once: true });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    return;
  }
  if (document.querySelector('.modal-backdrop')) return;
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

  if (state.screen === 'date') {
    if (!state.answered && /^[1-4]$/.test(event.key)) {
      event.preventDefault();
      answerQuestion(Number(event.key) - 1);
    } else if (state.answered && (event.key === 'Enter' || event.key === ' ')) {
      const active = document.activeElement;
      if (active?.matches('[data-action="next"]')) return;
      event.preventDefault();
      nextTurn();
    }
  }

  if (state.screen === 'belly') {
    if (event.key.toLowerCase() === 's') {
      event.preventDefault();
      struggle();
    } else if (event.key.toLowerCase() === 'l') {
      event.preventDefault();
      leaveBelly();
    }
  }
});

window.addEventListener('beforeunload', () => {
  haltTimers();
  sfx.stopSpeaking();
});

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

renderTitle();
